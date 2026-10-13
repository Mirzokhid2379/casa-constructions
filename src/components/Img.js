// Rasm kaliti -> fayl manzili. Har bir rasm 3 o‘lchamda: 640, 1024 va 1600 px.
//   img("p412")        -> /images/p412.webp       (1600 px, katta ekran / lightbox)
//   img("p412", 1024)  -> /images/p412-1024.webp
//   img("p412", 640)   -> /images/p412-640.webp
export const img = (key, w) => `/images/${key.replace(/_/g, "-")}${w ? `-${w}` : ""}.webp`;

// <img srcSet> uchun: brauzer ekran o‘lchamiga mosini o‘zi tanlaydi
export const srcSet = (key) => `${img(key, 640)} 640w, ${img(key, 1024)} 1024w, ${img(key)} 1600w`;

const small = () => typeof window !== "undefined" && window.innerWidth <= 760;
// Katta fon rasmlari (hero, sahifa sarlavhasi): telefonda 1024, kompyuterda 1600
export const bgBig = (key) => `url(${img(key, small() ? 1024 : undefined)})`;
// Kartochka va ramkalardagi fon rasmlari: telefonda 640, kompyuterda 1024
export const bgCard = (key) => `url(${img(key, small() ? 640 : 1024)})`;
