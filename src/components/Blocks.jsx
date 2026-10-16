import { useEffect, useId, useState } from "react";
import { img } from "./Img.js";
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

// Uy shaklidagi rasm (CASA logosidagi uy: shamol turbinasi, mo‘ri, quyosh paneli).
// Fon shaffof — sahifa fonida "suzib" turadi. Rasmlar o‘zi almashib turadi.
const BLADE = "M0 -7 C40 -9 120 -14 178 -22 C214 -27 236 -20 236 0 C236 20 214 27 178 22 C120 14 40 9 0 7 Z";
export function HouseShow({ keys, to, alt = "", className = "", delay = 0 }) {
  const [i, setI] = useState(0);
  const [pause, setPause] = useState(false);
  const id = useId().replace(/:/g, "");
  useEffect(() => {
    if (pause || keys.length < 2 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t;
    const t0 = setTimeout(() => { t = setInterval(() => setI((x) => (x + 1) % keys.length), 4500); }, delay);
    return () => { clearTimeout(t0); clearInterval(t); };
  }, [pause, keys.length, delay]);
  const art = (
    <svg className="hs-svg" viewBox="40 40 1250 1070" role="img" aria-label={alt}>
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F7E2AE" /><stop offset=".45" stopColor="#D8A95E" /><stop offset="1" stopColor="#B9853D" />
        </linearGradient>
        <linearGradient id={`e${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#15985F" /><stop offset="1" stopColor="#0B6B44" />
        </linearGradient>
        <clipPath id={`c${id}`}><path d="M186 568 L663 262 L1146 562 V1084 H186 Z" /></clipPath>
      </defs>
      <g clipPath={`url(#c${id})`}>
        <rect x="150" y="240" width="1030" height="880" fill="#0E3B2E" />
        {keys.map((k, n) => (
          <image key={k} className={n === i ? "on" : ""} href={img(k, 1024)} x="160" y="250" width="1010" height="850" preserveAspectRatio="xMidYMid slice" />
        ))}
      </g>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M242 655 V1050 H1086 V655" stroke={`url(#e${id})`} strokeWidth="22" />
        <path d="M200 598 L663 300 L1128 598" stroke={`url(#e${id})`} strokeWidth="22" />
        <path d="M186 606 V1084 H1146 V606" stroke={`url(#g${id})`} strokeWidth="13" />
        <path d="M828 362 V206 H938 V433" stroke={`url(#g${id})`} strokeWidth="11" fill={`url(#e${id})`} />
        <path d="M66 645 L663 256 L1264 645" stroke={`url(#g${id})`} strokeWidth="15" />
        <g stroke={`url(#g${id})`} strokeWidth="11">
          <path d="M978 434 V282 L1245 454 V606" />
          <path d="M978 358 L1245 530 M1067 339 V490 M1156 397 V548" />
        </g>
        <circle cx="297" cy="308" r="143" stroke={`url(#e${id})`} strokeWidth="36" />
      </g>
      <g fill={`url(#g${id})`} transform="translate(297 306)">
        <path d={BLADE} transform="rotate(-90)" />
        <path d={BLADE} transform="rotate(148)" />
        <path d={BLADE} transform="rotate(41)" />
        <circle r="27" fill="#F8EBCD" />
      </g>
    </svg>
  );
  return (
    <div className={`hshow rv ${className}`} onMouseEnter={() => setPause(true)} onMouseLeave={() => setPause(false)}>
      {to ? <Link to={to} className="hs-pics" aria-label={alt}>{art}</Link> : <div className="hs-pics">{art}</div>}
      {keys.length > 1 && (
        <div className="hs-dots">
          {keys.map((k, n) => <button key={k} type="button" className={n === i ? "on" : ""} onClick={() => setI(n)} aria-label={`${n + 1}`} />)}
        </div>
      )}
    </div>
  );
}
