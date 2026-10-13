import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { sendLead } from "./server/telegram.mjs";

// npm run dev paytida /api/lead ishlashi uchun (token .env.local faylidan olinadi)
function devLeadApi(env) {
  return {
    name: "dev-lead-api",
    configureServer(server) {
      server.middlewares.use("/api/lead", (req, res) => {
        let raw = "";
        req.on("data", (c) => (raw += c));
        req.on("end", async () => {
          let body = {};
          try { body = JSON.parse(raw || "{}"); } catch { /* bo‘sh */ }
          const r = await sendLead(body, { token: env.TELEGRAM_BOT_TOKEN, chatId: env.TELEGRAM_CHAT_ID });
          console.log(r.ok ? "✅ Telegram: xabar yuborildi" : `❌ Telegram: ${r.error} ${JSON.stringify(r.details || "")}`);
          res.statusCode = r.status;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(r));
        });
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "TELEGRAM_");
  console.log(`Telegram: token ${env.TELEGRAM_BOT_TOKEN ? "bor" : "YO‘Q"}, chat ID ${env.TELEGRAM_CHAT_ID || "YO‘Q"}`);
  return { plugins: [react(), devLeadApi(env)] };
});
