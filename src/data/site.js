// Tildan mustaqil ma’lumotlar. Matnlar src/i18n/{uz,ru,en}.js da.
// Rasm kaliti -> /images/<kalit>.webp

export const CONTACTS = {
  phone: "+998 33 002 22 24",
  email: "info@casaconstruction.uz", // vaqtincha: domen olingach almashtiring
};

// Havolalar hali yo‘q: url bo‘sh qolsa, ikonka turadi, lekin hech qayerga olib bormaydi
export const SOCIALS = [
  { id: "telegram", name: "Telegram", url: "" },
  { id: "instagram", name: "Instagram", url: "https://instagram.com/casa_uz" },
  { id: "facebook", name: "Facebook", url: "" },
  { id: "youtube", name: "YouTube", url: "https://youtube.com/@casaconstruction_uz" },
];

// Bosh sahifa: raqamlar (matnlari i18n -> figs)
export const FIGS = ["6 523", "2 307,84", "101", "200"];

// Qurilish bosqichlari va rasmlari (matnlari i18n -> stages, shu tartibda)
export const STAGES = [
  { photos: ["e05", "e01", "e02", "e03", "e04", "e06", "e07", "e08", "p417", "p505"] },
  { photos: ["p501", "p415", "p416", "p418", "p419", "p504"] },
  { photos: ["p420", "p507", "p503"] },
  { photos: ["p408", "p401", "p407"] },
  { photos: ["p412", "p413", "p502", "p411"] },
];

// Loyiha sahifasi galereyasi
// Talimarjon: boshidan oxirigacha tartib bilan. [rasm, bosqich] — bosqich nomlari i18n -> galStages
export const GALLERY = [
  ["p417", 1], ["p505", 1], ["p506", 1],
  ["p418", 2], ["p419", 2], ["p501", 2], ["p503", 2], ["p504", 2],
  ["p414", 3], ["p415", 3], ["p416", 3], ["p420", 3], ["p507", 3],
  ["p401", 4], ["p407", 4], ["p408", 4],
  ["p411", 7], ["p413", 7], ["p502", 7], ["p412", 7],
];

// Bosh sahifa mozaikasi
export const MOSAIC = ["n14", "n11", "n18", "n10", "n05", "p412"];

// "lt" (Larsen & Toubro) vaqtincha yashirilgan. Qaytarish uchun ro‘yxatga "lt" ni qo‘shing (matnlari i18n da turibdi).
export const PARTNER_IDS = ["uet", "energychina", "acwa", "calik", "mitsubishi", "viva", "omega"];
// Hamkorlar saytlari (bo‘sh bo‘lsa — havola yo‘q)
export const PARTNER_LINKS = { viva: "https://vivaconstructions.uz" };

export const REQUISITES = {
  stir: "311 436 724",
  reg: "2505734",
  date: "01.07.2024",
  capital: "184 000 000",
};

// Loyihalar: "navoiy" — hozir qurilmoqda, "talimarjon" — bajarilgan.
// i18n kaliti: navoiy -> t.navoiy, talimarjon -> t.project
// Navoiy: qurilish jarayoni tartib bilan (umumiy ko‘rinish -> yer ishlari -> ... -> tayyor inshootlar)
const NS = [0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 6];
export const NAVOIY_GALLERY = NS.map((st, i) => [`n${String(i + 1).padStart(2, "0")}`, st]);
export const PROJECTS = [
  { id: "navoiy", key: "navoiy", status: "active", cover: "n14", to: "/loyiha/navoiy" },
  { id: "talimarjon", key: "project", status: "done", cover: "p412", to: "/loyiha/talimarjon" },
];
