import { createContext, useContext, useEffect, useMemo, useState } from "react";
import uz from "./uz.js";
import ru from "./ru.js";
import en from "./en.js";

export const LANGS = { en, uz, ru };
// Asosiy til — ingliz tili. Tartib: EN · UZ · RU
export const LANG_CODES = ["en", "uz", "ru"];
const KEY = "casa-lang-v2";

function initialLang() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved && LANGS[saved]) return saved;
  } catch { /* localStorage yopiq bo‘lishi mumkin */ }
  return "en";
}

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(initialLang);
  const t = LANGS[lang];
  useEffect(() => {
    try { localStorage.setItem(KEY, lang); } catch { /* e’tiborsiz */ }
  }, [lang]);
  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);

export function LangSwitch({ className = "" }) {
  const { lang, setLang, t } = useI18n();
  return (
    <div className={`langs ${className}`} role="group" aria-label={t.nav.lang}>
      {LANG_CODES.map((c) => (
        <button key={c} type="button" lang={c} aria-pressed={lang === c} onClick={() => setLang(c)}>{c.toUpperCase()}</button>
      ))}
    </div>
  );
}
