// Botga yozgan odamlarning chat ID larini ko‘rsatadi.
// 1) Telegramda botingizni oching va /start yozing  2) npm run chat-id
import fs from "node:fs";
const env = Object.fromEntries(
  (fs.existsSync(".env.local") ? fs.readFileSync(".env.local", "utf8") : "")
    .split(/\r?\n/).filter((l) => l.includes("=") && !l.startsWith("#")).map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim()])
);
const token = process.env.TELEGRAM_BOT_TOKEN || env.TELEGRAM_BOT_TOKEN;
if (!token) { console.log(".env.local faylida TELEGRAM_BOT_TOKEN yo‘q"); process.exit(1); }
const r = await fetch(`https://api.telegram.org/bot${token}/getUpdates`).then((x) => x.json());
const seen = new Map();
for (const u of r.result || []) {
  const c = (u.message || u.channel_post || u.my_chat_member || {}).chat;
  if (c) seen.set(c.id, c.title || [c.first_name, c.last_name].filter(Boolean).join(" ") || c.username);
}
if (!seen.size) console.log("Hech kim yozmagan. Telegramda botga /start yozing va qayta ishga tushiring.");
for (const [id, n] of seen) console.log(`${id}  —  ${n}`);
