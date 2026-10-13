// Saytdagi "So‘rov yuborish" formasidan kelgan xabarni Telegram botga yuboradi.
// Token va chat ID faqat serverda turadi — brauzerga hech qachon chiqmaydi.

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const clip = (s, n) => String(s ?? "").trim().slice(0, n);

export async function sendLead(body, { token, chatId }) {
  if (!token || !chatId) return { status: 500, error: "not-configured" };
  const name = clip(body?.name, 120);
  const contact = clip(body?.contact, 120);
  const msg = clip(body?.msg, 2000);
  const lang = clip(body?.lang, 5).toUpperCase();
  // Spam-botlar uchun yashirin maydon: to‘ldirilgan bo‘lsa, jim qabul qilamiz
  if (clip(body?._gotcha, 200)) return { status: 200, ok: true, spam: true };
  if (name.length < 2 || contact.length < 5) return { status: 400, error: "invalid" };

  const time = new Date().toLocaleString("ru-RU", { timeZone: "Asia/Tashkent" });
  const text = [
    "🏗 <b>Yangi so‘rov — CASA Constructions</b>",
    "",
    `👤 <b>Ism / kompaniya:</b> ${esc(name)}`,
    `📞 <b>Aloqa:</b> ${esc(contact)}`,
    msg ? `📝 <b>Loyiha haqida:</b>\n${esc(msg)}` : "📝 <i>Loyiha haqida yozilmagan</i>",
    "",
    `🌐 Til: ${esc(lang || "—")} · 🕒 ${esc(time)}`,
  ].join("\n");

  const ids = String(chatId).split(",").map((x) => x.trim()).filter(Boolean);
  const results = await Promise.all(ids.map((id) => telegram(token, id, text)));
  const okAny = results.some((r) => r.ok);
  return okAny ? { status: 200, ok: true } : { status: 502, error: "telegram", details: results.map((r) => r.description || r.error) };
}

// Telegram javobini to‘liq qaytaradi (xato bo‘lsa sababi bilan)
export async function telegram(token, chatId, text) {
  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
    });
    return await r.json();
  } catch (e) {
    return { ok: false, error: `Telegram'ga ulanib bo‘lmadi: ${e.message}` };
  }
}
