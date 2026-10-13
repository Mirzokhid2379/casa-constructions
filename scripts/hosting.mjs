// sayt.uz kabi PHP hosting uchun paket: dist + api/ (PHP, Telegram)
// Natija: hosting-dist/ papkasi — ichidagi hamma narsani public_html ga yuklang.
import fs from "node:fs";
fs.rmSync("hosting-dist", { recursive: true, force: true });
fs.cpSync("dist", "hosting-dist", { recursive: true });
fs.cpSync("server-php/api", "hosting-dist/api", { recursive: true });
if (!fs.existsSync("server-php/api/config.php")) console.log("Diqqat: server-php/api/config.php yo‘q — config.example.php dan nusxa oling");
console.log("Tayyor: hosting-dist/ (public_html ga yuklang)");
