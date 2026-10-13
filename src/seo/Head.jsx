import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useI18n } from "../i18n/index.jsx";
import { SITE_URL } from "../../site.config.js";
import { KEYWORDS, PAGES } from "./meta.js";

const LOCALE = { uz: "uz_UZ", ru: "ru_RU", en: "en_US" };
function setTag(sel, create, attrs) {
  let el = document.head.querySelector(sel);
  if (!el) { el = document.createElement(create); document.head.appendChild(el); }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
}
const meta = (name, content) => setTag(`meta[name="${name}"]`, "meta", { name, content });
const prop = (property, content) => setTag(`meta[property="${property}"]`, "meta", { property, content });

export function SiteHead() {
  const { t, lang } = useI18n();
  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
    meta("keywords", KEYWORDS[lang]);
    prop("og:locale", LOCALE[lang]);
  }, [t, lang]);
  return null;
}

export function PageTitle({ title, noindex = false }) {
  const { t, lang } = useI18n();
  const { pathname: raw } = useLocation();
  const pathname = raw.length > 1 ? raw.replace(/\/+$/, "") : raw;
  useEffect(() => {
    const page = PAGES[lang][pathname];
    const full = page ? page[0] : title ? `${title} — CASA Constructions` : t.meta.title;
    const desc = page ? page[1] : t.meta.description;
    const url = SITE_URL + (pathname === "/" ? "/" : pathname);
    document.title = full;
    meta("description", desc);
    meta("robots", noindex ? "noindex, follow" : "index, follow, max-image-preview:large");
    setTag('link[rel="canonical"]', "link", { rel: "canonical", href: url });
    prop("og:title", full); prop("og:description", desc); prop("og:url", url);
    meta("twitter:title", full); meta("twitter:description", desc);
  }, [title, noindex, t, lang, pathname]);
  return null;
}
