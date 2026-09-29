"""Player-facing Telegram copy. HTML headings, short body, one next step."""
from app.game_engine.compositions import MIN_PLAYERS, MAX_PLAYERS

BOT_TEXTS = {
    "start": {
        "uz": "🎭 <b>MAFIA · Har bir qaror muhim</b>\n\n"
              "Kimga ishonasiz? Do‘stlaringiz bilan sirli rollar, tungi qarorlar va kunduzgi bahslarga qo‘shiling.\n\n"
              "<b>Birinchi o‘yinni boshlash</b>\n"
              "1. Botni guruhingizga qo‘shing.\n2. Guruhda <code>/start</code> yuboring.\n3. O‘yin havolasi orqali birga kiring.\n\n"
              f"<i>{MIN_PLAYERS}–{MAX_PLAYERS} o‘yinchi · Rol tasodifiy beriladi</i>",
        "ru": "🎭 <b>MAFIA · Каждое решение важно</b>\n\n"
              "Кому вы доверяете? Соберите друзей: тайные роли ночью, обсуждения и решения днём.\n\n"
              "<b>Ваша первая игра</b>\n1. Добавьте бота в группу.\n2. Отправьте там <code>/start</code>.\n3. Вместе откройте ссылку на игру.\n\n"
              f"<i>{MIN_PLAYERS}–{MAX_PLAYERS} игроков · Случайные роли</i>",
        "en": "🎭 <b>MAFIA · Every decision matters</b>\n\n"
              "Who do you trust? Gather your friends for secret roles, night actions and daytime debates.\n\n"
              "<b>Your first game</b>\n1. Add the bot to your group.\n2. Send <code>/start</code> there.\n3. Open the game link together.\n\n"
              f"<i>{MIN_PLAYERS}–{MAX_PLAYERS} players · Random roles</i>",
    },
    "group_added": {
        "uz": "🎭 <b>MAFIA guruhingizda</b>\n\nDo‘stlar yig‘ilsin — shahar sizni kutyapti.\n\nO‘yin havolasini ochish uchun shu guruhda <code>/start</code> yuboring.",
        "ru": "🎭 <b>MAFIA в вашей группе</b>\n\nСобирайте друзей — город ждёт вас.\n\nОтправьте <code>/start</code> в этой группе, чтобы открыть вход в игру.",
        "en": "🎭 <b>MAFIA is in your group</b>\n\nGather your friends — the town is waiting.\n\nSend <code>/start</code> here to open the game lobby.",
    },
    "lobby": {
        "uz": "🎭 <b>MAFIA · O‘yinchilar yig‘ilmoqda</b>\n\n"
              "Bir rol. Bir sir. Har bir ovoz muhim.\n\n"
              f"<b>{MIN_PLAYERS}–{MAX_PLAYERS} o‘yinchi</b>\n{MIN_PLAYERS} kishi yig‘ilgach, xona egasi o‘yinni boshlaydi. {MAX_PLAYERS} kishida o‘yin avtomatik boshlanadi.\n\n"
              "<i>Quyidagi tugma orqali kutish xonasiga kiring.</i>",
        "ru": "🎭 <b>MAFIA · Собираем игроков</b>\n\nОдна роль. Один секрет. Каждый голос важен.\n\n"
              f"<b>{MIN_PLAYERS}–{MAX_PLAYERS} игроков</b>\nВедущий может начать при {MIN_PLAYERS} игроках. При {MAX_PLAYERS} игра начнётся автоматически.\n\n"
              "<i>Войдите в комнату ожидания кнопкой ниже.</i>",
        "en": "🎭 <b>MAFIA · Gathering players</b>\n\nOne role. One secret. Every vote matters.\n\n"
              f"<b>{MIN_PLAYERS}–{MAX_PLAYERS} players</b>\nThe host can start with {MIN_PLAYERS} players. At {MAX_PLAYERS}, the game starts automatically.\n\n"
              "<i>Use the button below to enter the waiting room.</i>",
    },
}
