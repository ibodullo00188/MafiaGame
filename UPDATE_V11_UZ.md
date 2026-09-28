# V11 — interfeys va o‘yin tajribasi

V10 tuzatishlari saqlangan. V11 quyidagilarni qo‘shadi:

- Qorong‘i va yorug‘ mavzularda yagona ko‘k aksent, bir xil tugmalar, kartalar, fokus belgisi va shriftlar. Taymerning oxirgi 10 soniyasi qizil.
- O‘yin tepasida bosqich, tiriklar soni, taymer va hozirgi vazifa. Holat server ma’lumotidan olinadi.
- O‘yinchi kartalarida aniq tanlov belgisi, klaviatura boshqaruvi va to‘liq ismni alohida ochish. Bu oyna yashirin rolni oshkor qilmaydi.
- Rol taqdimoti va kabinetda Maqsad / Harakat / Cheklov. Asosiy yangi interfeys matnlari, rollar, qo‘llanma va natija UZ/RU/EN tillarida.
- Ulanish, qayta ulanish va eskirgan sessiya haqida xabar; qayta urinish tugmasi. Server qabul qilgan amal uchun tasdiq xabari.
- Natijada shaxsiy g‘alaba yoki mag‘lubiyat, tirik qolish holati, eng katta uchta qayd etilgan hissa, to‘liq statistika va g‘oliblar. Yana o‘ynash va Bosh sahifa tugmalari pastda doim ko‘rinadi.
- Telegram guruhidagi asosiy bosqich xabarlarida o‘yin identifikatori va O‘yinga qaytish tugmasi. Har bir ovoz va o‘lim xabari alohida navbat orqali yuboriladi. Maxfiy tungi nishonlar guruhga chiqarilmaydi.
- Komissarning otish rejimi boshqa rol yoki o‘qi tugagan holatda harakatga qo‘shilmaydi.

## Saqlangan qoidalar

Xona egasi o‘z rolini tanlamaydi. Oddiy jamoaviy g‘alaba faqat tirik qolganlarga yoziladi; Ayyorning kunduz chiqarilish orqali shaxsiy g‘alabasi alohida. Ovoz ochiq va bir raund ichida o‘zgarmaydi. Har bir Don alohida hujum qiladi. Oddiy Mafiya barcha Donlar o‘lgach voris bo‘lishi mumkin.

## Tekshiruv

- Python: 388 test o‘tdi. Ikki mavjud aiosqlite test yopilish ogohlantirishi bor; testlar muvaffaqiyatli.
- JavaScript navigatsiya va aloqa regressiya tekshiruvlari o‘tdi.
- Chromium: 320, 390 va 430 px; UZ/RU/EN, yorug‘ va qorong‘i mavzular; kutish, rol, tun, muhokama, ovoz va natija ekranlari. JavaScript xatosi va sahifa gorizontal chiqishi aniqlanmadi. Ism oynasi, tungi nishon va ovoz tanlovi tekshirildi.
- preview-v11 papkasida mahalliy namuna holatlarining ko‘rinishlari bor.

## Ishga tushirish chegarasi

Haqiqiy Telegram guruhida va serverda joylashtirish sinovi qilinmagan. Bot tokeni, HTTPS domeni va webhook sozlamalari mavjud ishga tushirish yo‘riqnomasi bo‘yicha kiritiladi. O‘yinga qaytish havolasi webhook yoqilgan va bot foydalanuvchi nomi Telegram orqali topilganida chiqadi. API ishlamasa, matnli xabar yuborish davom etadi.

Guruh xabarlari hamma uchun o‘zbekcha. Eski server hodisalari va ayrim boshqaruv/xato matnlari ham o‘zbekcha qoladi; barcha tarixiy va administrator matnlari to‘liq tarjima qilingan deb hisoblanmasin. Ishonchlilik va yetkazish cheklovlari UPDATE_V10_UZ.md da keltirilgan.
