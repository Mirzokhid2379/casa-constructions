import { useEffect, useState } from "react";
import { img, srcSet } from "./Img.js";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n/index.jsx";

export const Arrow = () => (
  <svg className="ar" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export function SectionHead({ eyebrow, title, children, light = false }) {
  return (
    <div className={`shead${light ? " light" : ""}`}>
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h2>{title}</h2>
        <i className="rule" />
      </div>
      {children && <p>{children}</p>}
    </div>
  );
}

// Sahifa sarlavhasi (to‘q yashil, ipak naqshli)
export function PageBand({ crumb, title, children, img }) {
  const { t } = useI18n();
  return (
    <section className="band silk">
      {img && <div className="band-ph" style={{ backgroundImage: img }} />}
      <div className="wrap">
        <div className="crumbs"><Link to="/">{t.nav.home}</Link><span>/</span><span>{crumb}</span></div>
        <h1>{title}</h1>
        {children && <p className="band-lead">{children}</p>}
      </div>
    </section>
  );
}

export function Closing() {
  const { t } = useI18n();
  return (
    <section className="closing silk">
      <div className="wrap">
        <h2>{t.closing.title}</h2>
        <div>
          <p>{t.closing.text}</p>
          <Link className="btn gold" to="/aloqa">{t.closing.btn} <Arrow /></Link>
        </div>
      </div>
    </section>
  );
}

// Ekranga kirgan elementlarni ohista paydo qiladi: class="rv"
export function useReveal(dep) {
  useEffect(() => {
    const els = document.querySelectorAll(".rv:not(.in)");
    // Zaxira: nima bo‘lishidan qat’i nazar 1,2 soniyadan keyin hammasi ko‘rinadi
    const safety = setTimeout(() => document.querySelectorAll(".rv:not(.in)").forEach((e) => e.classList.add("in")), 1200);
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { rootMargin: "0px 0px -10% 0px" }
    );
    els.forEach((e) => io.observe(e));
    return () => { io.disconnect(); clearTimeout(safety); };
  }, [dep]);
}

// Rasm ramkasi — CASA logosidagi uy shaklida (tom, mo‘ri, oltin chiziq)
export function HouseFrame({ bg, className = "" }) {
  return (
    <div className={`house-frame rv ${className}`}>
      <div className="hf-img" style={{ backgroundImage: bg }} />
      <svg className="hf-line" viewBox="0 0 100 125" preserveAspectRatio="none" aria-hidden="true">
        <path d="M1.5 34.5 L50 2 L71 16 V6.5 H80 V22 L98.5 34.5 V123.5 H1.5 Z" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}

// Uy ichidagi rasmlar (yashil fon, turbina va quyosh paneli bilan) — o‘zi almashib turadi
export function HouseShow({ keys, to, alt = "", className = "", delay = 0 }) {
  const [i, setI] = useState(0);
  const [pause, setPause] = useState(false);
  useEffect(() => {
    if (pause || keys.length < 2 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let id;
    const t0 = setTimeout(() => { id = setInterval(() => setI((x) => (x + 1) % keys.length), 4200); }, delay);
    return () => { clearTimeout(t0); clearInterval(id); };
  }, [pause, keys.length, delay]);
  const pics = keys.map((k, n) => (
    <img key={k} className={n === i ? "on" : ""} src={img(k, 1024)} srcSet={srcSet(k).replace(/, [^,]+1600w$/, ", " + img(k) + " 1377w")}
      sizes="(max-width: 860px) 92vw, 560px" alt={alt} loading={n ? "lazy" : undefined} decoding="async" />
  ));
  return (
    <div className={`hshow rv ${className}`} onMouseEnter={() => setPause(true)} onMouseLeave={() => setPause(false)}>
      {to ? <Link to={to} className="hs-pics" aria-label={alt}>{pics}</Link> : <div className="hs-pics">{pics}</div>}
      {keys.length > 1 && (
        <div className="hs-dots">
          {keys.map((k, n) => <button key={k} type="button" className={n === i ? "on" : ""} onClick={() => setI(n)} aria-label={`${n + 1}`} />)}
        </div>
      )}
    </div>
  );
}
