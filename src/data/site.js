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
  { photos: ["p408", "p401", "p407", "p411", "p413", "p502", "p412"] },
  { photos: ["t01", "t03", "t02", "t04", "t05", "t06", "t07", "t08"] },
];

// Loyiha sahifasi galereyasi
// Talimarjon: boshidan oxirigacha tartib bilan. [rasm, bosqich] — bosqich: "S0".."S4" -> Jarayon sahifasidagi 5 bosqich nomi (i18n -> stages)
export const GALLERY = [
  ["p417", "S0"], ["p505", "S0"],
  ["p418", "S1"], ["p501", "S1"], ["p504", "S1"],
  ["p415", "S2"], ["p420", "S2"], ["p507", "S2"],
  ["p401", "S3"], ["p408", "S3"],
  ["p411", "S3"], ["p502", "S3"], ["p412", "S3"],
  ["t04", "S4"], ["t05", "S4"], ["t06", "S4"], ["t07", "S4"], ["t03", "S4"], ["t02", "S4"], ["t01", "S4"],
];

// Bosh sahifa mozaikasi
export const MOSAIC = ["n14", "n11", "n18", "n10", "n05", "t03"];

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
  { id: "talimarjon", key: "project", status: "done", cover: "t01", to: "/loyiha/talimarjon" },
];
