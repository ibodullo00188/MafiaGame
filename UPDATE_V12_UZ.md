# V12 — matnlar va ko‘rinish

Bot va Mini App uchun uslub: qisqa sarlavha, holatga mos izoh, aniq keyingi harakat.

- Botning /start, guruhga qo‘shilish va kutish xonasi xabarlari qayta yozildi. Takliflarda haqiqiy 4–20 o‘yinchi chegarasi ko‘rsatiladi.
- Eski standart bot matnlari ishga tushishda yangilanadi. Administrator o‘zgartirgan matnlar har bir til bo‘yicha saqlanadi; bu holat test bilan tekshirildi.
- Qoidalar, o‘yin haqida, profilga kirish, guruh tanlash va bo‘sh holat matnlari qisqartirildi. Yangi asosiy matnlar o‘zbek, rus va ingliz tillarida.
- Guruh bosqichlari va shaxsiy natijalar xabarlari yagona sarlavha va bo‘shliqlar bilan formatlandi. Rol nomlari moslashtirildi.
- Bosh sahifa, kutish xonasi, ovoz va hukm ekranlaridagi yozuvlar aniqroq bo‘ldi. Oddiy xatolar uchun tushunarli izohlar qo‘shildi.
- Tungi ko‘rsatma o‘yinchi holatiga mos: nishon tanlash, qabul qilingan harakatni kutish, qaydlarni ochish yoki tomoshabin bo‘lish.
- Kartalarda ism uchun ikki qator joy; to‘liq ismni ochish saqlangan. Voqealar lentasi bir xil belgilar bilan, eng yangi voqea tepada ko‘rsatiladi.
- Tugma, shrift, matn oralig‘i va xabarlar ko‘rinishi yagona sokin uslubga keltirildi. Kam harakatni afzal ko‘ruvchi qurilma sozlamasi hisobga olinadi.
- Komissarning tekshirish/otish tugmalarida faol tanlov to‘g‘ri ajratiladi. Hukm ovozi yuborilayotganda server qabul qilgan degan xabar oldindan ko‘rsatilmaydi.

## Tekshiruv

389 ta Python testi o‘tdi. JavaScript sintaksisi, navigatsiya va aloqa tekshiruvlari o‘tdi. Chromium’da 320, 390, 430 px o‘lchamlarda UZ/RU/EN hamda yorug‘/qorong‘i mavzular tekshirildi. Kartalar ustma-ust tushishi, JavaScript xatosi va sahifadan gorizontal chiqish aniqlanmadi. Tungi ko‘rsatmaning faol, yuborilgan, passiv va tomoshabin holatlari tekshirildi.

Testlarda avvalgi aiosqlite test yopilishiga oid ikki ogohlantirish saqlanmoqda. Haqiqiy Telegram guruhiga joylashtirish va jonli server sinovi bu yangilanish doirasida bajarilmadi. Guruh xabarlari umumiy o‘zbekcha; ayrim tarixiy hodisa va administrator yozuvlari ham o‘zbekcha qoladi.
