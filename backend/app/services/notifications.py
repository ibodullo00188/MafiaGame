"""Best-effort Telegram-group notifications about a match's lifecycle.

The group join button (post_join_button) tells everyone the lobby exists;
these two announcements tell the group what actually happened without ever
leaking who holds which role. Both are deliberately vague — a game started /
a game ended with the winning faction — exactly the public information the
final role reveal shares anyway.

Sending is fire-and-forget and fails silently (see
app/services/telegram_bot_api.py's send_telegram_message): a bot that can't
reach Telegram (bad token, removed from the group, network hiccup) must
never slow down or crash a running game. Tests monkeypatch the send helper
to stay offline.

_state_phase remembers each game's last seen phase so the announcement fires
exactly once per transition, whether the change was noticed by the WebSocket
handler or the background phase ticker first — whichever call sees the
transition wins, and the other is a no-op.
"""
from __future__ import annotations
import asyncio
from collections import Counter
from html import escape
from time import monotonic

from app.game_engine.state import Phase
from app.services.game_service import BOT_GAME_CHAT_PREFIX
from app.services.telegram_bot_api import send_telegram_message, bot_deep_link
from app.config import settings

# game_id -> last phase value this process has announced/observed.
_state_phase: dict[str, str] = {}
_locks: dict[str, asyncio.Lock] = {}
_retry_after: dict[str, float] = {}
_dm_retry_after: dict[int, float] = {}
ROLE_LABELS = {
    "Citizen": "Tinch aholi", "Commissioner": "Komissar",
    "Sergeant": "Serjant", "Doctor": "Doktor", "Lucky": "Omadli",
    "Kamikaze": "Qasoskor", "Don": "Don", "Mafia": "Mafia",
    "Maniac": "Yakka o‘yinchi", "Mistress": "Xonim", "Lawyer": "Advokat",
    "Suicide": "Ayyor", "Vagabond": "Sayyoh",
}


def role_label(player) -> str:
    value = player.role.value if player.role else "?"
    return ROLE_LABELS.get(value, value)


def start_message(state) -> str:
    counts = Counter(role_label(p) for p in state.players.values())
    return "♠️ <b>O‘yin boshlandi</b>\n\n<b>Tarqatilgan rollar</b>\n" + "\n".join(
        f"• {escape(role)} — {count}" for role, count in sorted(counts.items())
    )


def end_message(state) -> str:
    winner = state.winner
    faction = winner.faction.value if winner.faction else None
    label = FACTION_LABELS.get(faction, "Yakka g‘alaba" if winner.winners else "Durang")
    winners = set(winner.winners + winner.individual_winners)
    lines = ["🏆 <b>O‘yin tugadi!</b>", f"Natija: <b>{label}</b>",
             f"👥 Ishtirokchilar: {len(state.players)} · Kun: {state.day_number}", ""]
    for pid, player in state.players.items():
        badge = "🏆" if pid in winners else "•"
        lines.append(f"{badge} {escape(player.display_name[:40])} — {escape(role_label(player))}")
    lines.extend(["", "Yangi o‘yin uchun /start"])
    return "\n".join(lines)

# game_id -> player_id -> how many of that player's state.outcome_messages
# this process has already sent as a personal Telegram DM. outcome_messages
# only ever grows (see GameState.outcome_messages), so "already sent" is
# just a count, and this function is safe to call as often as we like —
# exactly like _state_phase above for the group announcements.
_sent_message_counts: dict[str, dict[str, int]] = {}

# Public, language-neutral faction label for the group announcement. The
# group already has a dedicated join message; this read-out is the same
# single-message-shared-by-everyone scope, so Uzbek is the consistent choice.
FACTION_LABELS = {
    "mafia": "Mafia",
    "town": "Shahar",
    "neutral": "Neytral",
}


def remember_phase(game_id: str, phase: Phase) -> str | None:
    """Records the current phase for `game_id` and returns the previous one
    (or None on the first observation, e.g. after a server restart)."""
    previous = _state_phase.get(game_id)
    _state_phase[game_id] = phase.value
    return previous


def forget_game(game_id: str) -> None:
    _state_phase.pop(game_id, None)
    _sent_message_counts.pop(game_id, None)
    _locks.pop(game_id, None)
    _retry_after.pop(game_id, None)


def public_event_message(event: dict) -> str:
    """Only explicit public fields enter the group; never night targets or DMs."""
    kind, d = event["type"], event.get("data", {})
    name = lambda key: escape(str(d.get(key + "_name", "O‘yinchi")))
    if kind == "phase_night":
        return f"🌙 <b>{event['night']}-tun boshlandi</b>\nTungi rollar o‘z vazifasini bajaradi."
    if kind == "phase_morning":
        return f"🌅 <b>{event['night']}-tun yakunlandi</b>\nTong otdi."
    if kind == "phase_day":
        return f"☀️ <b>{event['day']}-kun — muhokama</b>\nFikrlaringizni o‘yinning chatida yozing."
    if kind == "phase_voting":
        return f"🗳 <b>{event['day']}-kun — ovoz berish</b>\nHar kim bir marta ovoz beradi. Ovozlar ochiq."
    if kind == "phase_revote":
        return "🔁 <b>Ovozlar teng!</b>\nTeng ovoz olgan nomzodlar orasida qayta ovoz beriladi."
    if kind == "public_vote":
        choice = name("target_id") if d.get("target_id") else "Betaraf"
        return f"🗳 <b>{event['day']}-kun · Ovoz</b>\n{name('voter_id')} ➜ <b>{choice}</b>"
    if kind == "player_eliminated":
        causes = {"mafia": "mafiya hujumi", "maniac": "yakka qotil hujumi", "commissioner": "Komissar zarbasi",
                  "day_vote": "kunduzgi hukm", "kamikaze": "Kamikaze zarbasi", "removed_by_admin": "admin qarori"}
        reason = ", ".join(causes.get(x, "o‘yin hodisasi") for x in str(d.get("reason", "")).split("/"))
        role = "\nRoli: <b>" + escape(ROLE_LABELS.get(d["role"], d["role"])) + "</b>" if d.get("role") else ""
        return f"☠️ <b>O‘yinchi o‘yindan chiqdi</b>\n{name('player_id')}\nSabab: {reason}{role}"
    if kind == "phase_lynch_confirmation":
        return "⚖️ <b>Hukmni tasdiqlash</b>\nTanlangan nomzod bo‘yicha Ha / Yo‘q ovozini bering."
    if kind == "phase_kamikaze_strike":
        return "💥 <b>Kamikazening so‘nggi zarbasi</b>\nU bitta nishon tanlaydi."
    if kind == "lynch_cancelled":
        return "🕊 <b>Hukm bekor qilindi</b>\nTasdiqlashda yetarli Ha ovozi olinmadi."
    if kind == "host_transferred":
        return f"👑 <b>Yangi xona egasi</b>\n{name('host_id')}"
    return ""


_group_links: dict[str, tuple[float, str | None]] = {}

async def group_return_link(chat_id: str) -> str | None:
    # Resolve only for a real webhook deployment; local/test mode never calls Telegram.
    if not settings.telegram_webhook_enabled or ":" not in settings.telegram_bot_token:
        return None
    cached = _group_links.get(chat_id)
    if cached and monotonic() - cached[0] < (3600 if cached[1] else 60):
        return cached[1]
    link = await bot_deep_link(chat_id)
    _group_links[chat_id] = (monotonic(), link)
    return link


async def notify_group_if_phase_changed(engine) -> None:
    """Drain one durable public event, paced per group; called by background worker."""
    state = engine.state
    if not state.chat_id or state.chat_id.startswith(BOT_GAME_CHAT_PREFIX):
        return
    remember_phase(state.game_id, state.phase)
    async with _locks.setdefault(str(state.chat_id), asyncio.Lock()):
        if monotonic() < _retry_after.get(str(state.chat_id), 0):
            return
        flag = None
        event = None
        if state.phase != Phase.GAME_OVER and not state.group_start_announced and (state.phase == Phase.ROLE_ASSIGNMENT or any(p.role for p in state.players.values())):
            flag, text = "group_start_announced", start_message(state)
        elif state.public_events:
            event = state.public_events[0]
            text = public_event_message(event)
        elif state.phase == Phase.GAME_OVER and state.winner and not state.group_end_announced:
            flag, text = "group_end_announced", end_message(state)
        else:
            return
        if text:
            text += f"\n\n<code>MAFIA · {escape(str(state.game_id))}</code>"
        link = None
        if flag or (event and event["type"] in ("phase_night", "phase_day", "phase_voting", "phase_revote")):
            link = await group_return_link(state.chat_id)
        delivered = not text or (await send_telegram_message(state.chat_id, text, "O‘yinga qaytish", link)
                                if link else await send_telegram_message(state.chat_id, text))
        if delivered:
            if flag:
                setattr(state, flag, True)
            if event:
                state.public_events.pop(0)
            _retry_after[str(state.chat_id)] = monotonic() + 3.2
            from app.services.checkpoint_service import save_checkpoint
            await save_checkpoint(engine)
        else:
            _retry_after[str(state.chat_id)] = monotonic() + 30


async def notification_worker() -> None:
    """Telegram latency never holds the phase ticker or a player's action."""
    from app.services.game_service import registry
    pending = {}
    limiter = asyncio.Semaphore(12)
    async def deliver(engine):
        async with limiter:
            try:
                await notify_group_if_phase_changed(engine)
                await notify_players_outcome_messages(engine)
            except Exception:
                import logging
                logging.getLogger("mafia.notifications").exception("Notification delivery failed")
    try:
        while True:
            for engine in registry.all_engines():
                gid = engine.state.game_id
                if gid not in pending or pending[gid].done():
                    pending[gid] = asyncio.create_task(deliver(engine))
            for gid in list(pending):
                if pending[gid].done():
                    pending.pop(gid)
            await asyncio.sleep(0.5)
    finally:
        for task in pending.values():
            task.cancel()
        await asyncio.gather(*pending.values(), return_exceptions=True)


async def notify_players_outcome_messages(engine) -> None:
    """Sends each real player, as a private Telegram message, any lines in
    their state.outcome_messages this process hasn't already sent for this
    game — Doctor saves, Mistress blocks, Commissioner reads, Mafia/Maniac
    kills, Lucky saves, Vagabond reports, the Sergeant's promotion, the
    Suicide's win, the Kamikaze's last strike, and so on (see
    app/game_engine/night_messages.py for the night-resolution half of this
    and app/game_engine/managers.py / engine.py for the day-phase half).

    Called after every state-changing WebSocket message and every ticker
    tick (like notify_group_if_phase_changed above), so it must be — and
    is — safe to call repeatedly without re-sending anything: it only ever
    sends the delta past what it already sent this process. Bot players are
    skipped; they have no real Telegram chat."""
    state = engine.state
    sent = state.outcome_sent_counts
    _sent_message_counts[state.game_id] = sent
    for player_id, lines in state.outcome_messages.items():
        already_sent = sent.get(player_id, 0)
        new_lines = lines[already_sent:]
        if not new_lines:
            continue
        player = state.players.get(player_id)
        if not player or player.is_bot:
            sent[player_id] = len(lines)
            continue
        if monotonic() < _dm_retry_after.get(player.telegram_user_id, 0):
            continue
        line = new_lines[0]
        if await send_telegram_message(player.telegram_user_id, escape(line)):
            sent[player_id] = already_sent + 1
            _dm_retry_after[player.telegram_user_id] = monotonic() + 1.2
            from app.services.checkpoint_service import save_checkpoint
            await save_checkpoint(engine)
        else:
            _dm_retry_after[player.telegram_user_id] = monotonic() + 60


async def notify_group_on_restart(engine) -> None:
    """Called once per engine recovered from a checkpoint at startup (see
    app/main.py's lifespan): seeds _state_phase so the ticker keeps the game
    moving without suddenly announcing "game started" for a match that began
    before the restart."""
    state = engine.state
    if state.phase != Phase.GAME_OVER:
        remember_phase(state.game_id, state.phase)
