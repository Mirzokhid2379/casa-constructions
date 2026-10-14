// Tildan mustaqil ma’lumotlar. Matnlar src/i18n/{uz,ru,en}.js da.
// Rasm kaliti -> /images/<kalit>.webp

export const CONTACTS = {
  phone: "+998 33 002 22 24",
  email: "info@casaconstruction.uz", // vaqtincha: domen olingach almashtiring
};

// Havolalar hali yo‘q: url bo‘sh qolsa, ikonka turadi, lekin hech qayerga olib bormaydi
export const SOCIALS = [
  { id: "telegram", name: "Telegram", url: "" },
  { id: "instagram", name: "Instagram", url: "" },
  { id: "facebook", name: "Facebook", url: "" },
  { id: "youtube", name: "YouTube", url: "" },
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
export const GALLERY = ["p412", "p415", "p418", "p501", "p408", "p420", "p416", "p411", "p504", "p413", "p507", "p401", "p419", "p503", "p502", "p407", "p417", "p505", "p414", "p506"];

// Bosh sahifa mozaikasi
export const MOSAIC = ["p418", "p408", "p420", "p501", "p411", "p504"];

export const PARTNER_IDS = ["uet", "energychina", "lt", "acwa", "calik", "mitsubishi", "viva", "omega"];
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
export const NAVOIY_GALLERY = Array.from({ length: 24 }, (_, i) => `v${String(i + 1).padStart(2, "0")}`);
export const PROJECTS = [
  { id: "navoiy", key: "navoiy", status: "active", cover: "v01", to: "/loyiha/navoiy" },
  { id: "talimarjon", key: "project", status: "done", cover: "p412", to: "/loyiha/talimarjon" },
];
