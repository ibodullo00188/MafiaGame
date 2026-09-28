/* Presentation only. Authoritative role, vote and result rules stay on the server. */
const PRO_TEXT = {
 winners:['G‘oliblar','Победители','Winners'], individual:['Shaxsiy maqsad g‘oliblari','Победители личной цели','Individual goal winners'], yourRole:['Rolingiz','Ваша роль','Your role'], finished:['O‘yin yakunlandi','Игра завершена','Game finished'],
 notes:['Shaxsiy qaydlar · faqat sizga','Личные заметки · только вам','Private notes · only you'], notesHint:['Kim shubhali? Qanday dalil bor?','Кто подозрителен? Какие улики?','Who is suspicious? What is the evidence?'], spectators:['Tomoshabinlar · tiriklar ko‘rmaydi','Зрители · живые не видят','Spectators · hidden from living players'], send:['Yuborish','Отправить','Send'], guess:['Taxminingizni yozing','Напишите предположение','Share your theory'],
 confirmAction:['Tasdiqlash','Подтвердить','Confirm'], investigate:['Tekshirish','Проверить','Investigate'], shoot:['O‘q otish','Выстрелить','Shoot'], skipAttack:['Bu kecha hujum qilmaslik','Не атаковать этой ночью','Skip attack tonight'], noTarget:['Nishon yo‘q','Нет цели','No target'], shotUsed:['O‘q ishlatildi — faqat tekshiruv mumkin.','Выстрел использован — доступна проверка.','Shot used — investigation only.'], nightAction:['Tungi harakat','Ночное действие','Night action'],
 killPrompt:['Kimni yo‘q qilasiz?','Кого устранить?','Who will you eliminate?'], protectPrompt:['Kimni himoya qilasiz?','Кого защитить?','Who will you protect?'], investigatePrompt:['Kimni tekshirasiz?','Кого проверить?','Who will you investigate?'], shootPrompt:['Kimni otasiz?','В кого стрелять?','Who will you shoot?'], blockPrompt:['Kimning harakatini bloklaysiz?','Чьё действие заблокировать?','Whose action will you block?'], watchPrompt:['Kimni kuzatasiz?','За кем наблюдать?','Who will you watch?'], shieldPrompt:['Kimni mijoz qilib tanlaysiz?','Кого выбрать клиентом?','Who will be your client?'],
 goal:['Maqsad','Цель','Goal'], action:['Harakat','Действие','Action'], limit:['Cheklov','Ограничение','Limit'],
 alive:['tirik','в игре','alive'], dead:['O‘yindan chiqqan','Выбыл','Eliminated'], online:['Ulangan','В сети','Connected'], offline:['Aloqasiz','Не в сети','Offline'],
 host:['Xona egasi','Ведущий','Host'], lobby:['Kutish xonasi','Комната ожидания','Waiting room'],
 retry:['Qayta urinish','Повторить','Try again'], close:['Yopish','Закрыть','Close'],
 connecting:['Ulanmoqda…','Подключение…','Connecting…'], reconnecting:['Aloqa uzildi. Qayta ulanmoqda…','Связь прервана. Подключаемся…','Connection lost. Reconnecting…'],
 reopen:['Sessiyani yangilang yoki ilovani qayta oching.','Обновите сессию или откройте приложение заново.','Refresh the session or reopen the app.'],
 otherWindow:['O‘yin boshqa oynada ochilgan.','Игра открыта в другом окне.','The game is open in another window.'],
 accepted:['Qabul qilindi ✓','Принято ✓','Accepted ✓'], voteAccepted:['Ovozingiz qabul qilindi ✓','Ваш голос принят ✓','Your vote is accepted ✓'],
 pick:['Nishon tanlang','Выберите цель','Choose a target'], discuss:['Dalillarni muhokama qiling','Обсудите улики','Discuss the evidence'],
 wait:['Boshqa o‘yinchilarning harakatini kutamiz','Ждём действий других игроков','Waiting for the other players'],
 noAction:['Bu tunda harakatingiz yo‘q. Shaxsiy qaydlaringizni ko‘rib chiqing.','Этой ночью действий нет. Просмотрите личные заметки.','No action this night. Review your private notes.'],
 observe:['O‘yinni kuzating. Tomoshabinlar chati alohida.','Наблюдайте за игрой. Чат зрителей отдельный.','Watch the game. Spectator chat is separate.'],
 confirm:['Hukmni tasdiqlang yoki rad eting','Подтвердите или отклоните приговор','Approve or reject the verdict'],
 report:['Natijalar bilan tanishing','Посмотрите результаты','Review the results'],
 night:['Tun','Ночь','Night'], morning:['Tong','Утро','Morning'], day_discussion:['Muhokama','Обсуждение','Discussion'], voting:['Ovoz berish','Голосование','Voting'], lynch_confirmation:['Hukm','Приговор','Verdict'], kamikaze_strike:['So‘nggi zarba','Последний удар','Last strike'], vote_results:['Natija','Итоги','Results'],
 goalTown:['Shahar yutsin va siz tirik qoling.','Победа города; останьтесь в живых.','Win with Town and survive.'], goalMafia:['Mafiya yutsin va siz tirik qoling.','Победа мафии; останьтесь в живых.','Win with Mafia and survive.'], goalSurvive:['O‘yin oxirigacha tirik qoling.','Доживите до конца игры.','Survive until the game ends.'],
 goalManiac:['Mafiyani yo‘q qiling va qolganlarga son jihatdan tenglashing.','Устраните мафию и сравняйтесь числом с остальными.','Eliminate Mafia and reach parity with the remaining players.'],
 goalSuicide:['Kunduzgi hukm bilan chiqarilsangiz, shaxsiy maqsad bajariladi.','Добейтесь устранения дневным голосованием.','Be eliminated by a daytime verdict to achieve your individual goal.'],
 noNight:['Tungi harakat yo‘q. Muhokama va ovozda qatnashing.','Ночного действия нет. Обсуждайте и голосуйте.','No night action. Discuss and vote.'],
 oneTarget:['Har kecha bitta nishon.','Одна цель за ночь.','One target per night.'], doctorLimit:['O‘zingizni bir o‘yinda faqat bir marta davolaysiz.','Самолечение только один раз за игру.','Self-heal only once per game.'],
 commissionerLimit:['Otish bir o‘yinda bir marta; tekshiruv o‘rniga.','Выстрел один раз за игру вместо проверки.','Shoot once per game, instead of investigating.'],
 mafiaLimit:['Donlar tirikligida mustaqil hujum yo‘q.','Пока жив Дон, самостоятельной атаки нет.','No independent attack while any Don is alive.'],
 kamikazeLimit:['Faqat kunduz osilganda; bitta yakuniy nishon.','Только после дневной казни; одна цель.','Only after a daytime execution; one final target.'],
 luckyLimit:['Hujumda omon qolish ehtimoli 50%.','Вероятность выжить при атаке — 50%.','50% survival chance when attacked.'],
 sergeantLimit:['Komissar halok bo‘lganda lavozimga ko‘tarilasiz.','Повышение после гибели Комиссара.','Promoted when a Commissioner dies.'],
 lawyerLimit:['O‘zingizni tanlay olmaysiz; mafiyani tanimaysiz.','Нельзя выбрать себя; вы не знаете мафию.','Cannot choose yourself; Mafia identities are unknown.'],
 suicideLimit:['Tungi o‘lim bu maqsadni bajarmaydi.','Ночная смерть не выполняет цель.','A night death does not achieve this goal.'],
 citizensLimit:['Bir ovoz bosqichida bitta yakuniy ovoz.','Один окончательный голос за раунд.','One final vote per voting round.'],
 personal:['Shaxsiy natijangiz','Ваш результат','Your result'], won:['G‘alaba','Победа','Victory'], lost:['Mag‘lubiyat','Поражение','Defeat'],
 teamTown:['Shahar g‘alaba qozondi','Победил город','Town wins'], teamMafia:['Mafiya g‘alaba qozondi','Победила мафия','Mafia wins'], teamNeutral:['Mustaqil g‘olib','Независимый победитель','Independent winner'],
 highlights:['Sizning hissangiz','Ваш вклад','Your contribution'], kills:['Muvaffaqiyatli hujum','Успешные атаки','Successful attacks'], investigations:['Tekshiruv','Проверки','Investigations'], protections:['Himoya harakati','Защитные действия','Protection actions'], votes:['Berilgan ovoz','Поданные голоса','Votes cast'],
 noStats:['Bu o‘yinda maxsus harakat qayd etilmadi.','Особых действий в этой игре не было.','No special actions recorded this game.'],
 replay:['Yana o‘ynash','Сыграть ещё','Play again'], home:['Bosh sahifa','Главная','Home'], practice:['Botlar bilan mashq','Тренировка с ботами','Practice with bots'], guide:['1 daqiqada o‘rganish','Обучение за минуту','Learn in a minute'],
 play:['O‘yinga kirish','Войти в игру','Join a game'], ready:['Boshlash mumkin','Можно начинать','Ready to start'], minPlayers:['Kamida 4 kishi','Минимум 4 игрока','At least 4 players'],
 phaseRole:['Rol taqsimoti','Раздача ролей','Role assignment'], saved:['Faqat shu qurilmada saqlanadi','Хранится только на этом устройстве','Saved only on this device'],
 nameHint:['To‘liq ismni ko‘rish','Полное имя','View full name'], selected:['Tanlandi','Выбрано','Selected']
};
function proText(key) { const row=PRO_TEXT[key]; return row ? row[{uz:0,ru:1,en:2}[currentLang]||0] : key; }
function proRoleName(role) {
 const names={Citizen:['Tinch aholi','Мирный житель','Citizen'],Commissioner:['Komissar','Комиссар','Commissioner'],Sergeant:['Serjant','Сержант','Sergeant'],Doctor:['Doktor','Доктор','Doctor'],Lucky:['Omadli','Счастливчик','Lucky'],Kamikaze:['Kamikaze','Камикадзе','Kamikaze'],Don:['Don','Дон','Don'],Mafia:['Mafiya','Мафия','Mafia'],Maniac:['Yakka qotil','Маньяк','Maniac'],Mistress:['Xonim','Любовница','Mistress'],Lawyer:['Advokat','Адвокат','Lawyer'],Suicide:['Ayyor','Шут','Jester'],Vagabond:['Sayyoh','Бродяга','Vagabond']};
 return names[role]?.[{uz:0,ru:1,en:2}[currentLang]||0]||role||'—';
}
function proRoleFacts(role) {
 const r=roleByApiName[role]; if(!r)return '';
 const goal=role==='Suicide'?'goalSuicide':role==='Maniac'?'goalManiac':role==='Lawyer'||r.fac==='mafia'?'goalMafia':r.fac==='town'?'goalTown':'goalSurvive';
 const limits={Doctor:'doctorLimit',Commissioner:'commissionerLimit',Mafia:'mafiaLimit',Kamikaze:'kamikazeLimit',Lucky:'luckyLimit',Sergeant:'sergeantLimit',Lawyer:'lawyerLimit',Suicide:'suicideLimit',Citizen:'citizensLimit'};
 const ability=roleText(r).ability;
 return `<dl class="role-facts"><div><dt>${proText('goal')}</dt><dd>${escapeHtml(proText(goal))}</dd></div><div><dt>${proText('action')}</dt><dd>${escapeHtml(ability)}</dd></div><div><dt>${proText('limit')}</dt><dd>${escapeHtml(proText(limits[role]||'oneTarget'))}</dd></div></dl>`;
}
function proGameStatus(s) {
 const el=document.getElementById('gameStatus');if(!el)return;
 const phase=s.phase,me=s.me||{};
 const number=phase==='night'||phase==='morning'?s.night_number:s.day_number;
 const task=!me.alive? 'observe':phase==='night'?(me.has_submitted_night_action?'wait':me.night_action_type?'pick':'noAction'):phase==='day_discussion'?'discuss':phase==='voting'?(me.has_voted?'voteAccepted':'pick'):phase==='lynch_confirmation'?(me.has_lynch_confirmed?'accepted':'confirm'):phase==='kamikaze_strike'?(me.kamikaze_striker?'pick':'wait'):'report';
 el.innerHTML=`<div class="game-status-line"><span>${escapeHtml(proText(phase))}${number?' '+number:''}</span><span>${s.players.filter(p=>p.alive).length} ${proText('alive')}</span><time id="unifiedTimer">—</time></div><div class="game-task">${escapeHtml(proText(task))}</div>`;
}
function proPlayerDetails(id) {
 const p=currentState?.players?.find(p=>p.player_id===id); if(!p)return;
 showHelpPanel(p.display_name,`${p.alive?proText('alive'):proText('dead')} · ${p.connected?proText('online'):proText('offline')}${p.is_host?' · '+proText('host'):''}`);
}
function proCardClick(el,action) {
 if(action) { window[action](el); document.querySelectorAll('.pcard.selectable').forEach(p=>p.setAttribute('aria-pressed',p.classList.contains('selected')?'true':'false')); }
 else proPlayerDetails(el.dataset.pid);
}
function proConnection(mode) {
 const el=document.getElementById('connBanner');if(!el)return;
 el.dataset.mode=mode;el.classList.toggle('show',mode!=='online');
 if(mode==='online')return;
 const key=mode==='offline'?'reconnecting':mode==='other'?'otherWindow':mode==='session'?'reopen':'connecting';
 el.innerHTML=`<span class="connection-dot"></span><span>${escapeHtml(proText(key))}</span><button type="button" onclick="${mode==='session'?'location.reload()':'connectWS()'}">${proText('retry')}</button>`;
}
function proFinish(s,screen) {
 const root=document.getElementById(screen);if(!root)return;
 const title=screen==='town_win'?'winTitle':'winTitleM';
 document.getElementById(title).textContent=proText(s.winner?.faction==='town'?'teamTown':s.winner?.faction==='mafia'?'teamMafia':'teamNeutral');
 let box=root.querySelector('.personal-result');if(!box){box=document.createElement('section');box.className='card personal-result';root.querySelector('.winbanner').after(box);}
 const st=s.me?.stats||{},entries=[['kills',st.kills],['investigations',st.investigations],['protections',st.protections],['votes',st.votes_cast]].filter(x=>x[1]>0).sort((a,b)=>b[1]-a[1]).slice(0,3);
 box.innerHTML=`<div class="result-eyebrow">${proText('personal')}</div><h2>${proText(st.won?'won':'lost')}</h2><p>${escapeHtml(proRoleName(st.role))} · ${proText(st.survived?'alive':'dead')}</p><h3>${proText('highlights')}</h3>${entries.length?'<div class="highlight-grid">'+entries.map(([k,v])=>`<div><strong>${v}</strong><span>${proText(k)}</span></div>`).join('')+'</div>':`<p>${proText('noStats')}</p>`}`;
 const names=(s.winner?.winners||[]).map(id=>nameFor(s,id));
 document.getElementById(screen==='town_win'?'winNotice':'winNoticeM').textContent=names.length?proText('winners')+': '+names.join(', '):proText('finished');
 const individual=root.querySelector(screen==='town_win'?'#winIndividual':'#winIndividualM');
 if(individual && s.winner?.individual_winners?.length)individual.textContent=proText('individual')+': '+s.winner.individual_winners.map(id=>nameFor(s,id)).join(', ');
 const actions=root.querySelector('.bottomactions .stack');actions.innerHTML=`<button class="btn gold" onclick="replayGame()">${proText('replay')}</button><button class="btn dark" onclick="go('home')">${proText('home')}</button>`;
 root.querySelector('.replay-actions')?.remove();
}
function applyProLanguage() {
 document.querySelectorAll('[data-pro]').forEach(el=>el.textContent=proText(el.dataset.pro));
 document.querySelectorAll('.quick-help>.card>button').forEach(el=>el.textContent=proText('close'));
}
