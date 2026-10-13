<?php
// sayt.uz (Apache + PHP) hosting uchun: POST /api/lead -> Telegram
// Token va chat ID: shu papkadagi config.php faylida.
header('Content-Type: application/json; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo '{"error":"method"}'; exit; }

$cfg = require __DIR__ . '/config.php';
$token = $cfg['token'] ?? '';
$chatIds = array_filter(array_map('trim', explode(',', $cfg['chat_id'] ?? '')));
if (!$token || !$chatIds) { http_response_code(500); echo '{"error":"not-configured"}'; exit; }

$b = json_decode(file_get_contents('php://input'), true) ?: [];
$clip = function ($v, $n) { return mb_substr(trim((string)($v ?? '')), 0, $n); };
$esc = function ($s) { return htmlspecialchars($s, ENT_NOQUOTES, 'UTF-8'); };
$name = $clip($b['name'] ?? '', 120);
$contact = $clip($b['contact'] ?? '', 120);
$msg = $clip($b['msg'] ?? '', 2000);
$lang = strtoupper($clip($b['lang'] ?? '', 5));
if ($clip($b['_gotcha'] ?? '', 200) !== '') { echo '{"ok":true}'; exit; } // spam
if (mb_strlen($name) < 2 || mb_strlen($contact) < 5) { http_response_code(400); echo '{"error":"invalid"}'; exit; }

$dt = new DateTime('now', new DateTimeZone('Asia/Tashkent'));
$text = "🏗 <b>Yangi so‘rov — CASA Construction</b>\n\n"
  . "👤 <b>Ism / kompaniya:</b> " . $esc($name) . "\n"
  . "📞 <b>Aloqa:</b> " . $esc($contact) . "\n"
  . ($msg !== '' ? "📝 <b>Loyiha haqida:</b>\n" . $esc($msg) : "📝 <i>Loyiha haqida yozilmagan</i>") . "\n\n"
  . "🌐 Til: " . $esc($lang ?: '—') . " · 🕒 " . $dt->format('d.m.Y, H:i:s');

$okAny = false;
foreach ($chatIds as $id) {
  $ch = curl_init("https://api.telegram.org/bot{$token}/sendMessage");
  curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 15,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_POSTFIELDS => json_encode(['chat_id' => $id, 'text' => $text, 'parse_mode' => 'HTML', 'disable_web_page_preview' => true]),
  ]);
  curl_exec($ch);
  if (curl_getinfo($ch, CURLINFO_HTTP_CODE) === 200) $okAny = true;
  curl_close($ch);
}
if ($okAny) { echo '{"ok":true}'; } else { http_response_code(502); echo '{"error":"telegram"}'; }
