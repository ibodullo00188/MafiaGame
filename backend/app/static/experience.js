/* V12 product copy: short heading, clear state, one next action. */
const EXPERIENCE_TEXT = {
  events:['Shu bosqichdagi voqealar','События этого этапа','This phase’s events'],
  emptyEvents:['Yangi voqealar shu yerda ko‘rinadi.','Новые события появятся здесь.','New events will appear here.'],
  nightIntro:['Shahar uyquda. Maxfiy harakatingizni «Rolim» bo‘limida bajaring.','Город спит. Выполните тайное действие в разделе «Моя роль».','The town is asleep. Make your secret move in My role.'],
  dayIntro:['Kimga shubha qilyapsiz? Fikringizni dalil bilan tushuntiring.','Кого вы подозреваете? Объясните, какие у вас улики.','Who do you suspect? Explain the evidence behind your choice.'],
  morningIntro:['Tun yakunlandi. Natijalarni ko‘rib, keyingi qaroringizni o‘ylang.','Ночь закончилась. Изучите итоги перед следующим решением.','Night is over. Review the results before your next decision.'],
  openRole:['Harakatni tanlash','Выбрать действие','Choose an action'],
  openChat:['Muhokamaga o‘tish','Открыть обсуждение','Join the discussion'],
  actionSaved:['Tanlov saqlandi','Выбор сохранён','Choice saved'],
  actionWait:['Qolgan o‘yinchilarni kutamiz. Bu paytda shaxsiy qaydlaringizni ko‘rib chiqing.','Ждём остальных. Пока можно просмотреть личные заметки.','Waiting for the others. You can review your private notes meanwhile.'],
  noNight:['Bu tunda harakatingiz yo‘q. Ertangi muhokama uchun kuzatganlaringizni qayd eting.','Этой ночью действий нет. Запишите наблюдения для обсуждения.','No action tonight. Note your observations for the next discussion.'],
  mafiaWait:['Donlar hujumni bajaradi. Mafiya chatida rejangizni muhokama qiling.','Доны совершают атаку. Обсудите план в чате мафии.','The Dons handle the attack. Discuss your plan in Mafia chat.'],
  readyVote:['Ovoz berishga tayyorman','Готов к голосованию','Ready to vote'],
  undoReady:['Tayyorman · Bekor qilish','Готов · Отменить','Ready · Undo'],
  readyCount:['tayyor','готовы','ready'],
  verdictHint:['Nomzodni o‘yindan chiqarishni tasdiqlaysizmi?','Подтверждаете исключение кандидата?','Do you confirm this player’s elimination?'],
  verdictYes:['Chiqarishni tasdiqlash','Подтвердить исключение','Confirm elimination'],
  verdictNo:['O‘yinda qoldirish','Оставить в игре','Keep in the game'],
  noCandidate:['Nomzod tanlanmagan. Natijani kuting.','Кандидат не выбран. Ожидайте итогов.','No candidate selected. Wait for the result.'],
  sending:['Yuborilmoqda…','Отправка…','Sending…'],
  peaceful:['Tun osoyishta o‘tdi','Спокойная ночь','A quiet night'],
  noDeaths:['Bu tunda hech kim o‘yindan chiqmadi.','Этой ночью никто не выбыл.','Nobody was eliminated tonight.'],
  kamikazeWait:['Kamikaze so‘nggi nishonni tanlamoqda. Natija shu yerda ko‘rinadi.','Камикадзе выбирает последнюю цель. Итог появится здесь.','Kamikaze is choosing a final target. The result will appear here.'],
  chatEmpty:['Birinchi fikr sizdan. Kimga va nima uchun shubha qilyapsiz?','Начните обсуждение. Кого вы подозреваете и почему?','Start the discussion. Who do you suspect, and why?'],
  mafiaEmpty:['Rejangizni shu yerda muhokama qiling. Chat faqat mafiyaga ko‘rinadi.','Обсудите план здесь. Чат виден только мафии.','Discuss your plan here. Only Mafia can see this chat.'],
  teammates:['Jamoangiz','Ваша команда','Your team'],
  noTeammates:['Jamoada boshqa o‘yinchi yo‘q.','Других участников команды нет.','No other teammates.'],
  lastWords:['So‘nggi so‘z','Последнее слово','Last words'],
  lastWordsHint:['Shaharga so‘nggi fikringizni ayting…','Оставьте городу последнюю мысль…','Leave the town your final thought…'],
  eliminated:['O‘yindan chiqdi','Выбыл из игры','Eliminated'],
  voted:['ovoz berdi','проголосовал','voted'],
  teamChat:['Mafiya chati','Чат мафии','Mafia chat'],
  teamPlaceholder:['Jamoangizga yozing…','Напишите команде…','Write to your team…'],
  connectionHint:['Ilovani Telegram guruhidagi o‘yin tugmasi orqali oching.','Откройте приложение кнопкой игры в группе Telegram.','Open the app using the game button in your Telegram group.'],
  friendsTitle:['Do‘stlar bilan bir davra','Раунд с друзьями','A round with friends'],
  friendsBody:['Botni guruhingizga qo‘shing va u yerda /start yuboring. Kamida 4 kishi yig‘ilgach, xona egasi o‘yinni boshlaydi.','Добавьте бота в группу и отправьте /start. Ведущий может начать, когда соберутся 4 игрока.','Add the bot to a group and send /start. The host can begin when 4 players have joined.'],
};
function uxText(key) { const v=EXPERIENCE_TEXT[key];return v?v[{uz:0,ru:1,en:2}[currentLang]??0]:key; }
function installExperienceCopy() {
 const copy={
  home_headline:['Bir rol. Bir sir. Sizning qaroringiz.','Одна роль. Один секрет. Ваше решение.','One role. One secret. Your decision.'],
  home_intro_kicker:['MAFIA · DO‘STLAR DAVRASI','MAFIA · КРУГ ДРУЗЕЙ','MAFIA · YOUR FRIENDS'],
  home_intro_text:['Tunda sir saqlang. Kunduzi dalil izlang. Do‘stlaringizga qo‘shiling yoki avval botlar bilan mashq qiling.','Ночью храните секрет. Днём ищите улики. Играйте с друзьями или сначала потренируйтесь с ботами.','Keep your secret at night. Find the evidence by day. Join friends or warm up with bots.'],
  home_menu_label:['Sizning maydoningiz','Ваше пространство','Your space'],
  home_btn_leaderboard:['O‘yinchilar reytingi','Рейтинг игроков','Player rankings'],
  home_btn_about:['O‘yin haqida','Об игре','About the game'],
  home_btn_admin:['Boshqaruv','Управление','Manage'],
  lobby_title:['Do‘stlar yig‘ilmoqda','Собираем друзей','Gathering friends'],
  lobby_host_badge:['Xona egasi','Ведущий','Host'],
  lobby_start_btn:['O‘yinni boshlash','Начать игру','Start the game'],
  lobby_start_hint:['Boshlash uchun kamida 4 kishi kerak','Для старта нужно 4 игрока','At least 4 players to start'],
  lobby_ready_hint:['Rollar tasodifiy taqsimlanadi','Роли выдаются случайно','Roles will be assigned randomly'],
  lobby_wait_host:['Xona egasi o‘yinni boshlashini kutamiz','Ждём начала от ведущего','Waiting for the host to start'],
  lobby_empty_slot:['Do‘stingiz uchun','Место для друга','Room for a friend'],
  ballot_hint:['Kimga shubha qilyapsiz? Nomzodni tanlang. Tasdiqlangan ovoz o‘zgarmaydi.','Кого вы подозреваете? Выберите кандидата. Подтверждённый голос не изменить.','Who do you suspect? Choose a player. Your confirmed vote is final.'],
  ballot_received:['Ovoz saqlandi. Qolgan o‘yinchilarni kutamiz.','Голос сохранён. Ждём остальных.','Vote saved. Waiting for the other players.'],
  role_title:['Sizning rolingiz','Ваша роль','Your role'],
  role_tapsub:['Kartani faqat o‘zingiz ko‘ring.','Покажите карту только себе.','Keep this card to yourself.'],
  role_secret:['Maqsad va harakatingizni «Rolim» bo‘limida qayta ko‘rishingiz mumkin.','Цель и действие всегда доступны в разделе «Моя роль».','Your goal and action are always available in My role.'],
  profile_title:['Profilingiz','Ваш профиль','Your profile'],
  profile_factions_label:['Jamoalar bo‘yicha g‘alabalar','Победы по командам','Wins by faction'],
  profile_stats_label:['O‘yin statistikasi','Статистика игры','Game statistics'],
  profile_none:['Birinchi davrangiz hali oldinda.','Ваш первый раунд ещё впереди.','Your first round is still ahead.'],
  profile_noactive:['Hozir faol o‘yiningiz yo‘q.','Сейчас нет активной игры.','You have no active game.'],
  leaderboard_empty:['Reyting birinchi yakunlangan o‘yindan keyin paydo bo‘ladi.','Рейтинг появится после первой завершённой игры.','Rankings appear after the first completed game.'],
  language_note:['Tanlovingiz bot va o‘yin menyulariga qo‘llanadi.','Выбор применяется к меню бота и игры.','Your choice applies to the bot and game menus.'],
  pro_messages:['Xabarlar','Сообщения','Messages'],pro_winners:['G‘oliblar','Победители','Winners'],pro_others:['Qolgan o‘yinchilar','Остальные игроки','Other players'],
 };
 for(const [key,values] of Object.entries(copy))['uz','ru','en'].forEach((lang,i)=>I18N[lang][key]=values[i]);
}
function applyExperienceLanguage() {
 document.querySelectorAll('[data-ux]').forEach(el=>el.textContent=uxText(el.dataset.ux));
 document.querySelectorAll('[data-ux-placeholder]').forEach(el=>el.placeholder=uxText(el.dataset.uxPlaceholder));
}
function activityIcon(key) {
 const icon=key.startsWith('night.')?'i-moon':key.startsWith('morning.')||key.startsWith('day.')?'i-sun':'i-shield';
 return `<svg class="icon" aria-hidden="true"><use href="#${icon}"/></svg>`;
}
Object.assign(EXPERIENCE_TEXT, {
 nightIntro:['Shahar uyquda. Tungi tanlovlar sir saqlanadi.','Город спит. Ночные действия остаются тайной.','The town is asleep. Night choices stay private.'],
 openNotes:['Qaydlarimni ochish','Открыть заметки','Open my notes'],
 observeTitle:['Siz kuzatuvchisiz','Вы наблюдатель','You are spectating'],
});
function renderNightGuidance(s) {
 const el=document.getElementById('nightGuidance');if(!el)return;
 const me=s.me||{};
 const canAct=me.alive && me.night_action_type && !me.has_submitted_night_action;
 const title=!me.alive?uxText('observeTitle'):me.has_submitted_night_action?uxText('actionSaved'):proText('nightAction');
 const body=!me.alive?proText('observe'):canAct?nightPrompt(me.night_action_type):me.has_submitted_night_action?uxText('actionWait'):me.faction==='mafia'?uxText('mafiaWait'):uxText('noNight');
 const click=!me.alive?"scrollToPane('chat')":canAct?"scrollToPane('cabinet')":"openPrivateNotes()";
 const button=!me.alive?t('pro_messages'):canAct?uxText('openRole'):uxText('openNotes');
 el.innerHTML=`<div class="smallcap">${escapeHtml(title)}</div><p>${escapeHtml(body)}</p><button class="btn dark context-action" onclick="${click}">${escapeHtml(button)}</button>`;
}
function openPrivateNotes() { scrollToPane('cabinet');const el=document.getElementById('personalNotes');if(el){el.open=true;el.scrollIntoView({block:'center',behavior:'auto'});} }
const EXPERIENCE_ABOUT = {
 uz:`<h3>Kimga ishonasiz?</h3><p>Mafia — 4–20 kishi bilan ishonch, kuzatuv va mantiqni sinaydigan o‘yin. Har kim tasodifiy rol oladi. Kimdir shaharni himoya qiladi, kimdir yashirincha unga qarshi o‘ynaydi.</p><h3>Bir davra qanday o‘tadi?</h3><p>Tunda maxfiy harakat qiling. Kunduzi kuzatganlaringizni muhokama qiling. Ovoz ochiq va tasdiqlangach o‘zgarmaydi.</p><h3>Birinchi qadam</h3><p>Botni guruhga qo‘shing va <b>/start</b> yuboring. Yoki bosh sahifada botlar bilan mashq qiling — mashq reytingga ta’sir qilmaydi.</p>`,
 ru:`<h3>Кому вы доверяете?</h3><p>Мафия — игра на доверие, наблюдательность и логику для 4–20 игроков. Роли случайны: одни защищают город, другие тайно играют против него.</p><h3>Как проходит раунд?</h3><p>Ночью действуйте скрытно. Днём обсуждайте наблюдения. Голоса открыты и не меняются после подтверждения.</p><h3>Первый шаг</h3><p>Добавьте бота в группу и отправьте <b>/start</b>. Или начните с тренировки на главной странице — она не влияет на рейтинг.</p>`,
 en:`<h3>Who do you trust?</h3><p>Mafia tests trust, observation and logic with 4–20 players. Everyone gets a random role. Some protect the town; others secretly work against it.</p><h3>How does a round work?</h3><p>Act privately at night. Discuss observations by day. Votes are public and final once confirmed.</p><h3>Your first step</h3><p>Add the bot to a group and send <b>/start</b>. Or practice with bots from the home screen — practice does not affect rankings.</p>`,
};
const EXPERIENCE_ERRORS = {
 'Dead players cannot vote':['O‘yindan chiqqansiz. Davrani tomoshabin sifatida kuzatishingiz mumkin.','Вы выбыли. Можно продолжить наблюдение.','You are eliminated. You can keep watching the round.'],
 'Voting is not open':['Hozir ovoz berish vaqti emas. Joriy bosqich tugashini kuting.','Сейчас голосование закрыто. Дождитесь нужного этапа.','Voting is closed. Wait for the voting phase.'],
 'Action already submitted':['Tanlovingiz saqlangan. Bu tunda uni o‘zgartirib bo‘lmaydi.','Выбор сохранён. Этой ночью его нельзя изменить.','Your choice is saved and cannot be changed tonight.'],
 'It is not night':['Bu harakat tun bosqichida ochiladi.','Это действие доступно ночью.','This action is available at night.'],
 'Invalid target':['Bu nishonni tanlab bo‘lmaydi. Ro‘yxatdan boshqa o‘yinchini tanlang.','Эта цель недоступна. Выберите другого игрока.','That target is unavailable. Choose another player.'],
 'Target is not alive':['Bu o‘yinchi o‘yindan chiqqan. Tirik o‘yinchini tanlang.','Этот игрок выбыл. Выберите живого игрока.','That player is eliminated. Choose a living player.'],
 'This role cannot target itself':['Bu rol o‘zini tanlay olmaydi. Boshqa o‘yinchini tanlang.','Эта роль не может выбрать себя. Выберите другого игрока.','This role cannot target itself. Choose another player.'],
 'Self-voting is disabled':['O‘zingizga ovoz bera olmaysiz. Boshqa nomzodni tanlang.','Нельзя голосовать за себя. Выберите другого кандидата.','You cannot vote for yourself. Choose another candidate.'],
 'This action requires a target':['Avval nishonni tanlang, keyin tasdiqlang.','Сначала выберите цель, затем подтвердите.','Choose a target first, then confirm.'],
 'Your role has no night action':['Bu rolda tungi harakat yo‘q. Shaxsiy qaydlaringizni ko‘rib chiqing.','У этой роли нет ночного действия. Просмотрите заметки.','This role has no night action. Review your notes.'],
 'Commissioner kill already used':['Bir martalik o‘qingiz ishlatilgan. Endi tekshiruvni tanlang.','Разовый выстрел использован. Выберите проверку.','Your one-time shot is used. Choose an investigation.'],
 'Game already started':['O‘yin boshlangan. Joriy holat yangilanishini kuting.','Игра уже началась. Дождитесь обновления состояния.','The game has started. Wait for the updated state.'],
 'You already joined this game':['Siz bu o‘yinga qo‘shilgansiz.','Вы уже присоединились к этой игре.','You have already joined this game.'],
 'You already voted in this confirmation':['Hukm bo‘yicha ovozingiz saqlangan. Natijani kuting.','Ваш голос по приговору сохранён. Дождитесь результата.','Your verdict vote is saved. Wait for the result.'],
 'Ovozingiz qabul qilingan. Uni o‘zgartirib bo‘lmaydi':['Ovozingiz saqlangan. Uni shu bosqichda o‘zgartirib bo‘lmaydi.','Ваш голос сохранён. В этом раунде его не изменить.','Your vote is saved and is final for this round.'],
 'Failed to fetch':['Server bilan aloqa bo‘lmadi. Internetni tekshirib, qayta urinib ko‘ring.','Нет связи с сервером. Проверьте интернет и повторите.','Could not reach the server. Check your connection and try again.'],
};
function uxError(message) { const row=EXPERIENCE_ERRORS[String(message)];return row?row[{uz:0,ru:1,en:2}[currentLang]??0]:String(message||''); }
