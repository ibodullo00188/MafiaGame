"""Persists a JSON snapshot of a live GameState after significant gameplay
events, so a server restart mid-match can reconstruct it instead of losing
it (spec item 3: "LIVE GAME STATE PERSISTENCE").

This is deliberately event-based, not a fixed-interval poll — save_checkpoint
is called from app/websocket/handlers.py right after every message the
engine actually handles and every automatic phase transition the ticker
makes, which already covers every event the spec lists: player join
(app/api/routes_game.py), role assignment, night action, night resolution,
death, day start, mayor reveal, gunner shot, vote, vote resolution, phase
change, and game over.
"""
from __future__ import annotations
import asyncio
from weakref import WeakKeyDictionary
_checkpoint_locks = WeakKeyDictionary()
from sqlalchemy import select

from app.database import AsyncSessionLocal
from app.game_engine.engine import GameEngine
from app.game_engine.state import Phase
from app.game_engine.persistence import state_to_dict, state_from_dict
from app.models.models import GameCheckpoint


async def save_checkpoint(engine: GameEngine) -> None:
    async with _checkpoint_locks.setdefault(engine, asyncio.Lock()):
        await _save_checkpoint_locked(engine)


async def _save_checkpoint_locked(engine: GameEngine) -> None:
    """Upserts this game's checkpoint row. Once the game reaches
    GAME_OVER, the checkpoint is deleted instead — `games`/`game_history`
    (see persist_finished_game) are the durable record from that point,
    and recovery must never try to resurrect a match that already ended."""
    state = engine.state
    real_group = bool(state.chat_id and not state.chat_id.startswith("botlab:"))
    if state.phase == Phase.GAME_OVER and state.finished_persisted and (
        not real_group or (state.group_end_announced and not state.public_events)
    ):
        await delete_checkpoint(state.game_id)
        return
    data = state_to_dict(state)
    async with AsyncSessionLocal() as session:
        existing = await session.get(GameCheckpoint, state.game_id)
        if existing:
            existing.phase = state.phase.value
            existing.state_json = data
        else:
            session.add(GameCheckpoint(
                game_id=state.game_id, phase=state.phase.value, state_json=data,
            ))
        await session.commit()


async def delete_checkpoint(game_id: str) -> None:
    async with AsyncSessionLocal() as session:
        row = await session.get(GameCheckpoint, game_id)
        if row:
            await session.delete(row)
            await session.commit()


async def load_all_checkpoints() -> list[GameEngine]:
    """Called once at startup (see app/main.py's lifespan) to rebuild
    every still-in-progress match from its last checkpoint. A row that
    fails to deserialize (corrupt JSON, a role name from a since-removed
    role, ...) is skipped rather than crashing the whole boot — one bad
    match shouldn't take the rest of the server down with it. The
    reconstructed engine picks its phase timer back up exactly where the
    checkpoint left off: if that timer already elapsed while the server
    was down, the phase_ticker just resolves it on its very first tick,
    same as it would for any other expired phase."""
    engines: list[GameEngine] = []
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(GameCheckpoint))
        rows = result.scalars().all()
    for row in rows:
        try:
            state = state_from_dict(row.state_json)
            engines.append(GameEngine.from_state(state))
        except Exception:
            continue
    return engines
