"""User rules: independent Dons, public immutable ballots, durable public feed."""
import asyncio
from time import time
from unittest.mock import AsyncMock
import pytest
from app.game_engine.engine import GameEngine, EngineError
from app.game_engine.roles import RoleName as R, Faction
from app.game_engine.state import Phase, GameSettings
from app.game_engine.managers import PhaseManager, WinConditionManager, DeathManager
from app.game_engine.persistence import state_to_dict, state_from_dict
from tests.conftest import make_engine_with_roles


def test_humans_cannot_pick_roles_and_legacy_pick_is_ignored():
    e = GameEngine('picks', 1, 'Host')
    for i in range(2, 5): e.add_player(i, str(i))
    with pytest.raises(EngineError): e.set_bot_role(e.state.host_id, e.state.host_id, 'Don')
    # Also rejects privileged/admin caller choosing a human's role.
    with pytest.raises(EngineError): e.set_bot_role(None, e.state.host_id, 'Don')
    e.state.players[e.state.host_id].bot_role_pick = 'Don'
    e.start_game(e.state.host_id)
    assert e.state.players[e.state.host_id].bot_role_pick is None


def test_each_don_can_attack_separate_target_and_earns_own_kill():
    e, ids = make_engine_with_roles([R.DON,R.DON,R.MAFIA,R.CITIZEN,R.CITIZEN,R.CITIZEN,R.CITIZEN,R.CITIZEN])
    assert e._eligible_night_actions() == 2
    for actor,target in [('P0','P3'),('P1','P4')]:
        assert e.get_player_view(ids[actor])['me']['is_mafia_killer']
        e.submit_night_action(ids[actor],ids[target])
    e.resolve_night_if_ready()
    assert {d['player_id'] for d in e.state.last_night_deaths} == {ids['P3'],ids['P4']}
    assert e.state.players[ids['P0']].kills == e.state.players[ids['P1']].kills == 1
    assert not e.get_player_view(ids['P2'])['me']['is_mafia_killer']


def test_dons_same_target_single_death_and_block_is_individual():
    e,ids=make_engine_with_roles([R.DON,R.DON,R.MISTRESS,R.CITIZEN,R.CITIZEN,R.CITIZEN,R.CITIZEN])
    e.submit_night_action(ids['P0'],ids['P3']);e.submit_night_action(ids['P1'],ids['P4'])
    e.submit_night_action(ids['P2'],ids['P0']);e.resolve_night_if_ready(force=True)
    assert e.state.players[ids['P3']].alive and not e.state.players[ids['P4']].alive
    e,ids=make_engine_with_roles([R.DON,R.DON,R.CITIZEN,R.CITIZEN,R.CITIZEN,R.CITIZEN])
    e.submit_night_action(ids['P0'],ids['P3']);e.submit_night_action(ids['P1'],ids['P3']);e.resolve_night_if_ready(force=True)
    assert len(e.state.last_night_deaths)==1


def test_no_extra_don_promotion_while_another_don_lives():
    e,ids=make_engine_with_roles([R.DON,R.DON,R.MAFIA,R.CITIZEN,R.CITIZEN,R.CITIZEN])
    DeathManager.eliminate(e.state,ids['P0'],'day_vote')
    assert e.state.players[ids['P2']].role==R.MAFIA
    DeathManager.eliminate(e.state,ids['P1'],'day_vote')
    assert e.state.players[ids['P2']].role==R.DON


@pytest.mark.parametrize('skip',[False,True])
def test_ballot_immutable_public_and_one_stat(skip):
    e,ids=make_engine_with_roles([R.DON,R.CITIZEN,R.CITIZEN,R.CITIZEN])
    PhaseManager.to_voting(e.state)
    target=None if skip else ids['P0']
    e.submit_vote(ids['P1'],target)
    with pytest.raises(EngineError):e.submit_vote(ids['P1'],ids['P2'])
    votes=[m for m in e.get_player_view(ids['P2'])['chat'] if m['kind']=='vote']
    assert len(votes)==1 and votes[0]['payload']['target_id']==target
    assert e.state.players[ids['P1']].votes_cast==(0 if skip else 1)
    assert not hasattr(GameSettings(),'anonymous_voting')
    assert 'anonymous_voting' not in e.get_player_view(e.state.host_id)['admin']['settings']


def test_dead_town_still_loses_and_surviving_lawyer_wins_with_mafia():
    e,ids=make_engine_with_roles([R.DON,R.CITIZEN,R.CITIZEN,R.DOCTOR])
    e.state.players[ids['P0']].alive=False;e.state.players[ids['P1']].alive=False
    assert ids['P1'] not in WinConditionManager.check(e.state).winners
    e,ids=make_engine_with_roles([R.DON,R.LAWYER,R.CITIZEN,R.CITIZEN])
    for key in ['P2','P3']:e.state.players[ids[key]].alive=False
    assert ids['P1'] in WinConditionManager.check(e.state).individual_winners
    e.state.players[ids['P1']].alive=False
    assert ids['P1'] not in WinConditionManager.check(e.state).individual_winners


def test_kamikaze_round_trip_and_immediate_game_over():
    e,ids=make_engine_with_roles([R.DON,R.KAMIKAZE,R.KAMIKAZE,R.CITIZEN,R.CITIZEN])
    e._lynch_target=ids['P1'];e.state.last_vote_result={'eliminated':ids['P1']}
    e.state.revote_candidates=[ids['P1']];e.state.players[ids['P1']].alive=False
    PhaseManager.to_kamikaze_strike(e.state)
    e=GameEngine.from_state(state_from_dict(state_to_dict(e.state)))
    assert e.get_player_view(ids['P1'])['me']['kamikaze_striker']
    with pytest.raises(EngineError):e.submit_kamikaze_target(ids['P2'],ids['P0'])
    e.submit_kamikaze_target(ids['P1'],ids['P0'])
    assert e.resolve_kamikaze_strike_if_ready()
    assert e.state.phase==Phase.GAME_OVER and e.state.winner.faction==Faction.TOWN


def test_private_results_and_activity_survive_restart_without_public_leak():
    e,ids=make_engine_with_roles([R.DON,R.COMMISSIONER,R.CITIZEN,R.CITIZEN])
    e.submit_night_action(ids['P1'],ids['P0']);e.resolve_night_if_ready(force=True)
    data=state_to_dict(e.state);data['settings']['anonymous_voting']=True
    r=GameEngine.from_state(state_from_dict(data))
    assert r.get_player_view(ids['P1'])['me']['night_result']['verdict']=='mafia'
    assert r.get_player_view(ids['P2'])['me']['night_result'] is None
    assert r.state.activity_feed==e.state.activity_feed
    assert not any(ev['type']=='night_action_submitted' for ev in r.state.public_events)


def test_spectator_chat_hidden_from_living_and_rejects_living_writer():
    e,ids=make_engine_with_roles([R.DON,R.CITIZEN,R.CITIZEN,R.CITIZEN])
    e.state.players[ids['P1']].alive=False
    e.send_spectator_message(ids['P1'],'Mening taxminim')
    assert e.get_player_view(ids['P1'])['spectator_chat'][0]['text']=='Mening taxminim'
    assert 'spectator_chat' not in e.get_player_view(ids['P2'])
    with pytest.raises(EngineError):e.send_spectator_message(ids['P2'],'hello')


def test_no_elimination_short_results_and_disconnected_host_handoff():
    e,ids=make_engine_with_roles([R.DON,R.CITIZEN,R.CITIZEN,R.CITIZEN])
    PhaseManager.to_voting(e.state);e.resolve_voting_if_ready(force=True)
    assert e.state.phase_end-time()<=8
    e.state.phase=Phase.LOBBY;host=e.state.players[e.state.host_id]
    host.connected=False;host.disconnected_at=time()-61
    assert e.transfer_inactive_host(time())
    assert e.state.host_id != host.player_id and not host.is_host


@pytest.mark.asyncio
async def test_public_delivery_order_escaping_retry_and_restart(monkeypatch):
    from app.services import notifications as n
    n._retry_after.clear();n._locks.clear()
    send=AsyncMock(return_value=True)
    monkeypatch.setattr(n,'send_telegram_message',send)
    monkeypatch.setattr('app.services.checkpoint_service.save_checkpoint',AsyncMock())
    e,ids=make_engine_with_roles([R.DON,R.CITIZEN,R.CITIZEN,R.CITIZEN])
    e.state.chat_id='-987';e.state.group_start_announced=True;e.state.public_events.clear()
    e.state.players[ids['P1']].display_name='<Ali & Vali>'
    PhaseManager.to_voting(e.state);e.submit_vote(ids['P1'],ids['P0'])
    await n.notify_group_if_phase_changed(e)
    assert 'ovoz berish' in send.call_args.args[1]
    n._retry_after.clear();send.return_value=False
    await n.notify_group_if_phase_changed(e)
    assert len(e.state.public_events)==1
    restored=GameEngine.from_state(state_from_dict(state_to_dict(e.state)))
    send.return_value=True;n._retry_after.clear()
    await asyncio.gather(n.notify_group_if_phase_changed(restored),n.notify_group_if_phase_changed(restored))
    assert '&lt;Ali &amp; Vali&gt;' in send.call_args.args[1]
    assert not restored.state.public_events
    assert send.await_count==3


@pytest.mark.asyncio
async def test_practice_is_private_and_does_not_change_rank(monkeypatch):
    from app.api.routes_game import practice_game, join_game, JoinGameRequest
    from app.services.game_service import registry,persist_finished_game
    from fastapi import HTTPException
    monkeypatch.setattr('app.services.access_control.require_subscription',AsyncMock())
    monkeypatch.setattr('app.api.routes_game.save_checkpoint',AsyncMock())
    res=await practice_game(887711)
    e=registry.get(res['game_id'])
    assert e.state.practice and len(e.state.players)==6
    assert (await practice_game(887711))['game_id']==res['game_id']
    with pytest.raises(HTTPException):await join_game(res['game_id'],JoinGameRequest(display_name='intruder'),telegram_user_id=123)
    session=AsyncMock();await persist_finished_game(session,e)
    session.execute.assert_not_awaited()
    registry.remove(e.state.game_id)


@pytest.mark.asyncio
async def test_webhook_failure_retries_and_success_is_not_processed_twice(monkeypatch):
    from app import telegram_bot as tb
    from app.config import settings
    from fastapi import HTTPException
    monkeypatch.setattr(settings,'telegram_webhook_enabled',True)
    monkeypatch.setattr(settings,'telegram_webhook_secret_raw','test-secret')
    monkeypatch.setattr(tb,'get_bot',lambda:object())
    feed=AsyncMock(side_effect=[RuntimeError('temporary'),None])
    monkeypatch.setattr(tb.dp,'feed_update',feed)
    request=AsyncMock();request.json.return_value={'update_id':778899}
    tb._completed_updates.clear();tb._webhook_locks.clear()
    with pytest.raises(HTTPException) as err:
        await tb.telegram_webhook(request,'test-secret')
    assert err.value.status_code==503
    assert await tb.telegram_webhook(request,'test-secret')=={'ok':True}
    assert await tb.telegram_webhook(request,'test-secret')=={'ok':True}
    assert feed.await_count==2
