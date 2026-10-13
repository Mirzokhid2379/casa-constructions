// Netlify Function: POST /api/lead -> Telegram
// Netlify sozlamalarida: TELEGRAM_BOT_TOKEN va TELEGRAM_CHAT_ID (Environment variables)
import { sendLead } from "../../server/telegram.mjs";

export default async (req) => {
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });
  let body = {};
  try { body = await req.json(); } catch { /* bo‘sh */ }
  const r = await sendLead(body, { token: process.env.TELEGRAM_BOT_TOKEN, chatId: process.env.TELEGRAM_CHAT_ID });
  return Response.json(r, { status: r.status });
};
