# CASA Constructions — sayt (React + Vite)

- `npm install` — bir marta
- `npm run dev` — kompyuterda ko‘rish
- `npm run build` — tayyor sayt `dist/` papkasida (sitemap, robots va har sahifa uchun SEO fayli bilan)

Asosiy joylar:
- Matnlar (3 tilda): `src/i18n/uz.js`, `ru.js`, `en.js`
- Telefon, email, ijtimoiy tarmoq havolalari, rasmlar ro‘yxati: `src/data/site.js`
- Domen: `site.config.js`
- Rasmlar: `public/images/`

Hosting (cPanel / ISPmanager): `dist/` ichidagi hamma narsani (yashirin `.htaccess` bilan) sayt papkasiga yuklang.

## Aloqa formasi → Telegram bot

Forma `POST /api/lead` ga yuboradi. Token brauzerga chiqmaydi — faqat serverda turadi.

1. Telegramda botni oching va **/start** yozing.
2. `npm run chat-id` — chat ID ni ko‘rsatadi.
3. Chat ID ni yozing:
   - kompyuterda (`npm run dev`): `.env.local` → `TELEGRAM_CHAT_ID=...`
   - Netlify: Site configuration → Environment variables → `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`
     (funksiya faqat GitHub orqali deploy qilinganda ishlaydi, Netlify Drop'da emas)
   - sayt.uz hosting (PHP): `server-php/api/config.php` → `'chat_id' => '...'`, keyin `npm run hosting`
     va `hosting-dist/` ichidagi hamma narsani `public_html` ga yuklang.
