// Botni tekshirish: .env.local dagi token va chat ID bilan sinov xabari yuboradi
// va Telegram javobini to‘liq ko‘rsatadi.  Ishlatish: npm run test-bot
import fs from "node:fs";
import { telegram } from "../server/telegram.mjs";

const env = Object.fromEntries(
  (fs.existsSync(".env.local") ? fs.readFileSync(".env.local", "utf8") : "")
    .split(/\r?\n/).filter((l) => l.includes("=") && !l.trim().startsWith("#"))
    .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()])
);
const token = env.TELEGRAM_BOT_TOKEN, chat = env.TELEGRAM_CHAT_ID;
console.log("Token:", token ? token.slice(0, 10) + "…" : "YO‘Q");
console.log("Chat ID:", chat || "YO‘Q");
if (!token || !chat) process.exit(1);
const r = await telegram(token, chat, "✅ CASA Constructions: sinov xabari. Bot ishlayapti!");
console.log(r.ok ? "\n✅ Yuborildi! Telegramni tekshiring." : "\n❌ Xato:", r.ok ? "" : (r.description || r.error));
if (!r.ok && /chat not found/i.test(r.description || "")) console.log("→ Chat ID noto‘g‘ri yoki botga /start yozilmagan.");
if (!r.ok && /blocked|initiate/i.test(r.description || "")) console.log("→ Telegramda botni oching va /start bosing.");
if (!r.ok && /Unauthorized/i.test(r.description || "")) console.log("→ Token noto‘g‘ri (BotFather'dan yangisini oling).");
