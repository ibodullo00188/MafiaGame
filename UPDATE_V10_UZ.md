# V10 — o‘yin qoidalari, guruh xabarlari va qulayliklar

## Siz belgilagan qoidalar

- Inson o‘yinchi, jumladan xona egasi va bot admini, o‘ziga rol belgilay olmaydi. Rollar tasodifiy tarqatiladi. Eski saqlangan inson rol tanlovlari ham bekor qilinadi. Botlar uchun mashqdagi rol tanlovi qoladi.
- O‘lgan jamoa a’zosiga jamoaviy g‘alaba yozilmaydi. Oldingi maxsus Ayyor/Suicide shaxsiy maqsad qoidasi saqlangan.
- Anonim ovoz sozlamasi olib tashlandi. Ovoz va betaraf tanlov ochiq. Har bir ovoz bosqichida bitta yakuniy tanlov; tenglikdan keyingi qayta ovoz yangi bosqich hisoblanadi.
- Har bir Don bir kechada alohida nishonga hujum qiladi. Bir nishonga bir nechta Don hujum qilsa, o‘lim bir marta qayd etiladi. Doktor himoyasi va Xonim bloklashi ishlaydi. Oddiy Mafia Donlar borida hujum qilmaydi; barcha Donlar halok bo‘lgach, bittasi yangi Don bo‘ladi.
- Advokat tirik qolib, mafiya yutganida shaxsiy g‘alaba oladi.

## Tuzatishlar

Kamikaze faqat hozir osilgan o‘yinchi sifatida zarba bera oladi. Zarbadan so‘ng g‘alaba tekshiriladi. Server qayta ishga tushganda uning tanlash huquqi, maxfiy tungi natijalar va faoliyat tarixi tiklanadi.

Doktorning takroriy o‘zini davolash urinishiga aniq xato qaytadi. Botlar qayta ovoz bosqichini taniydi; inson o‘rniga bot harakat qilmaydi. Botlar bilan mashq reytingga yozilmaydi va begona odam bu xonaga qo‘shila olmaydi.

O‘yinchi chat matni server tasdiqlaganidan keyin tozalanadi. Aloqa bo‘lmasa matn saqlanadi. Checkpoint va yakuniy statistika yozish bir o‘yin ichida ketma-ket bajariladi.

Webhook handler xatosi muvaffaqiyat deb yashirilmaydi: qayta urinish uchun 503 qaytadi. Muvaffaqiyatli update IDlari jarayon ichida vaqtincha takroran bajarilmaydi. Bu barcha tashqi amallar uchun mutlaq exactly-once kafolati emas.

## Guruhdagi alohida xabarlar

Bot o‘yin bog‘langan Telegram guruhiga quyidagilarni yuboradi:

- rollar soni (kimga tushgani ochilmaydi);
- tun, tong, kun/muhokama va ovoz bosqichlari;
- kim kimga ovoz bergani yoki betaraf qolgani;
- qayta ovoz, hukm tasdig‘i va hukm bekor qilinishi;
- o‘limlar, Kamikaze bosqichi va yakuniy natija;
- xona egasi almashishi.

Tungi nishonlar, Komissarning maxfiy natijasi, shaxsiy qaydlar va tomoshabinlar chati guruhga chiqmaydi. O‘limda rolni ochish sozlamasi hurmat qilinadi.

Xabarlar bitta guruhga navbat bilan, kamida 3.2 soniya oralatib yuboriladi. Ko‘p ovozda xabarlar biroz kechikishi mumkin. Navbat bazada checkpoint bilan saqlanadi; yuborish xatosida qayta uriniladi. Telegram xabarni qabul qilib, server tasdiqni saqlashdan oldin to‘xtab qolsa, ayrim xabar qayta chiqishi mumkin. Telegramga yuborish o‘yin taymerini kutib turmaydi.

## O‘yin qulayligi va dizayn

- Bosh sahifada O‘yinga kirish, Botlar bilan mashq, 1 daqiqada o‘rganish.
- Qisqa 4 bosqichli qo‘llanma va 5 bot bilan shaxsiy mashq.
- Lobbida 4 kishi yetganda “Boshlash mumkin” va to‘lgan progress.
- Qorong‘i mavzuda avatar, ism va kartalarning kontrasti yaxshilandi.
- Natijada Yana o‘ynash va Bosh sahifa tugmalari.
- ROLIM oynasida qurilmada saqlanadigan shaxsiy qaydlar.
- O‘lganlar uchun tiriklardan yashirilgan alohida tomoshabinlar chati.
- Hech kim osilmasa natija 8 soniya. Oxirgi so‘z yuborilsa qolgan kutish ko‘pi bilan 8 soniya. Yangi standart oxirgi so‘z oynasi 30 soniya; oldin saqlangan admin sozlamasi hurmat qilinadi.
- Lobbi egasi 60 soniyadan ortiq aloqasiz qolsa, boshqa ulangan inson o‘yinchi mezbon bo‘ladi.

## Ishga tushirish

1. Yangilangan loyiha fayllarini repozitoriyga joylang va qayta deploy qiling.
2. Mavjud TELEGRAM_BOT_TOKEN, SESSION_SECRET, ADMIN_TELEGRAM_IDS va DATABASE_URL qiymatlarini saqlang.
3. Render/webhook usulida TELEGRAM_WEBHOOK_ENABLED=true bo‘lsin. Bot o‘yin guruhida xabar yuborish huquqiga ega bo‘lsin.
4. Bitta worker bilan ishlating (render.yaml allaqachon --workers 1).
5. DATABASE_URL bo‘sh bo‘lsa SQLite ishlatiladi. Sozlangan PostgreSQL ulanishi ishlamasa, bot yashirincha boshqa bazaga o‘tmaydi; ulanishni to‘g‘rilash kerak.
6. Yangilashni faol o‘yin tugagach bajarish ma’qul: bir nechta Don haqidagi yangi qoida tiklangan o‘yinlarga ham ta’sir qiladi.

Eski checkpointlardagi olib tashlangan sozlamalar o‘qishda e’tiborsiz qoldiriladi. Mavjud SQL ustunlari o‘chirilmadi; yangi holatlar checkpoint JSONida saqlanadi.

## Tekshirish

Backend: `cd backend && python -m pytest -q`
Frontend: `node tools/test_navigation.cjs` va `node tools/test_client_connection.cjs`
Balans diagnostikasi: `PYTHONPATH=. python tools/balance_sim.py --games 25 --players 4 7 10 13 20`

Simulyator hozirgi 13 rol bilan ishlaydi. Tasodifiy bot natijalari inson o‘yinchilar balansining kafolati emas. Ko‘p Donning mustaqil hujumi mafiyani kuchaytiradi; tarkiblar o‘zboshimchalik bilan o‘zgartirilmadi.

Mobil HTML/CSS 390×844 o‘lchamda ochib tekshirildi. Telegram jo‘natishlari avtomatik testlarda taqlid qilindi; haqiqiy bot tokeni bilan jonli guruh sinovi bajarilmadi.
