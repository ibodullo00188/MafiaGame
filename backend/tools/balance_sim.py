"""Offline smoke/balance simulation using the current 13-role engine.
Random bots are NOT a model of human skill. Results diagnose termination and
large composition differences, not a certified competitive balance.
Usage: PYTHONPATH=. python tools/balance_sim.py --games 10 --players 4 7 10 20
"""
import argparse
import random
from collections import Counter
from time import time
from app.game_engine.engine import GameEngine
from app.game_engine.compositions import COMPOSITIONS
from app.game_engine.managers import PhaseManager
from app.game_engine.state import Phase
from app.game_engine import bot_players


def simulate(count, variant, seed):
    rng = random.Random(seed)
    bot_players._rng = rng
    e = GameEngine(f'sim-{seed}', 1, 'Bot 0', rng=rng)
    for i in range(1, count):
        e.add_bot_player(f'Bot {i}')
    roles = list(COMPOSITIONS[count][variant])
    rng.shuffle(roles)
    for p, role in zip(e.state.players.values(), roles):
        p.is_bot, p.role = True, role
    PhaseManager.to_night(e.state)
    for step in range(400):
        if e.state.phase == Phase.GAME_OVER:
            result = e.state.winner.faction
            bot_players.forget_game(e.state.game_id)
            return result.value if result else 'draw'
        e.state.phase_start = time() - 30
        bot_players.drive(e)
        e.force_advance_phase(None)
    bot_players.forget_game(e.state.game_id)
    return 'limit'


if __name__ == '__main__':
    p = argparse.ArgumentParser()
    p.add_argument('--games', type=int, default=25)
    p.add_argument('--players', type=int, nargs='+', default=[4, 7, 10, 13, 20])
    args = p.parse_args()
    print('Random-bot diagnostic; not human win-rate prediction.')
    for n in args.players:
        for v in COMPOSITIONS[n]:
            results = Counter(simulate(n, v, n*100000 + ord(v)*1000 + i) for i in range(args.games))
            print(n, v, dict(results))
