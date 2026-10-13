import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PageTitle } from "../seo/Head.jsx";
import { useI18n } from "../i18n/index.jsx";
import { img, srcSet, bgBig, bgCard } from "../components/Img.js";
import { LogoMark } from "../components/Logo.jsx";
import Icon from "../components/Icons.jsx";
import { useLightbox } from "../components/Lightbox.jsx";
import { Arrow, Closing, SectionHead, useReveal } from "../components/Blocks.jsx";
import Documents from "../components/Documents.jsx";
import Partners from "../components/Partners.jsx";
import { FIGS, MOSAIC, STAGES } from "../data/site.js";

const pad = (n) => String(n).padStart(2, "0");

function Hero() {
  const { t } = useI18n();
  const h = t.hero;
  return (
    <section className="hero">
      <div className="hero-ph" style={{ backgroundImage: bgBig("p412") }} />
      <div className="hero-mark" aria-hidden="true"><LogoMark size={520} /></div>
      <div className="wrap">
        <div className="eyebrow hero-eb">{h.eyebrow.map((x) => <span key={x}>{x}</span>)}</div>
        <h1>{h.h1[0]}<br /><em>{h.h1[1]}</em></h1>
        <p className="lead">{h.lead}</p>
        <div className="acts">
          <Link className="btn gold" to="/loyiha">{h.btn} <Arrow /></Link>
          <Link className="btn ghost" to="/aloqa">{h.btn2}</Link>
        </div>
        <Link className="hero-cap" to="/loyiha/navoiy"><b>{h.cap[0]}</b><span className="live-tx"><i />{h.cap[1]}</span></Link>
      </div>
    </section>
  );
}

// Raqam ekranga kirganda 0 dan sanab chiqadi
function Count({ value }) {
  const ref = useRef(null);
  const [v, setV] = useState(value);
  useEffect(() => {
    const m = value.match(/[\d\s,]+/);
    if (!m || !("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const raw = m[0].trim();
    const dec = raw.includes(",") ? raw.split(",")[1].length : 0;
    const target = parseFloat(raw.replace(/\s/g, "").replace(",", "."));
    const fmt = (x) => x.toFixed(dec).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    setV(value.replace(raw, fmt(0)));
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (now) => {
        const k = Math.min(1, (now - t0) / 1400);
        const ease = 1 - Math.pow(1 - k, 3);
        setV(value.replace(raw, fmt(target * ease)));
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [value]);
  return <b ref={ref} className="num">{v}</b>;
}

function Figures() {
  const { t } = useI18n();
  return (
    <div className="wrap figs-wrap">
      <Link className="figs-h" to="/loyiha/talimarjon"><Icon name="check" size={16} />{t.figsTitle}</Link>
      <div className="figs">
        {FIGS.map((n, i) => (
          <div className="fig" key={i}>
            <div><Count value={n} />{t.figs[i][0] && <small>{t.figs[i][0]}</small>}</div>
            <span>{t.figs[i][1]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Hozir qurilayotgan loyiha — bosh sahifada ko‘zga tashlanadigan joyda
function NowBuilding() {
  const { t } = useI18n();
  const n = t.navoiy;
  return (
    <section className="now">
      <div className="wrap now-g">
        <div className="now-ph rv">
          <Link to="/loyiha/navoiy" className="now-a" style={{ backgroundImage: bgCard("v03") }} aria-label={n.title} />
          <Link to="/loyiha/navoiy" className="now-b" style={{ backgroundImage: bgCard("v05") }} aria-label={n.title} />
          <Link to="/loyiha/navoiy" className="now-c" style={{ backgroundImage: bgCard("v04") }} aria-label={n.title} />
        </div>
        <div className="now-tx rv">
          <span className="live"><i />{t.projects.active}</span>
          <h2>{n.title}</h2>
          <div className="feat-sub">{n.tag} · 500/220 kV</div>
          <p className="now-sub">{n.sub}</p>
          <div className="now-kv">
            {n.stats.slice(0, 3).map(([a, b]) => <div key={b}><b>{a}</b><span>{b}</span></div>)}
          </div>
          <p>{t.projects.nowText}</p>
          <div className="now-place"><Icon name="pin" size={18} /> {n.place}</div>
          <Link className="btn dark" to="/loyiha/navoiy">{t.projects.nowBtn} <Arrow /></Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { t } = useI18n();
  const [openPhotos, lightbox] = useLightbox();
  useReveal(t);
  const mosaic = MOSAIC.map((k) => [k, t.project.title]);
  const dirIcons = ["factory", "column", "shield"];
  const advIcons = ["shield", "helmet", "hand"];

  return (
    <>
      <PageTitle />
      <Hero />
      <Figures />
      <NowBuilding />

      <section className="about">
        <div className="wrap about-g">
          <div className="rv">
            <SectionHead eyebrow={t.about.eyebrow} title={t.about.title} />
            <p className="about-tx">{t.about.text}</p>
            <div className="dirs">
              {t.about.dirs.map(([a, b], i) => (
                <div className="dir" key={a}>
                  <span className="ic"><Icon name={dirIcons[i]} /></span>
                  <div><b>{a}</b><span>{b}</span></div>
                </div>
              ))}
            </div>
          </div>
          <div className="frame tall rv" style={{ backgroundImage: bgCard("p416") }} />
        </div>
      </section>

      <section className="feat silk">
        <div className="wrap feat-g">
          <div className="frame arch rv" style={{ backgroundImage: bgCard("p415") }} />
          <div className="rv">
            <div className="eyebrow">{t.feat.eyebrow}</div>
            <h2 className="feat-h">{t.feat.title}</h2>
            <div className="feat-sub">{t.feat.sub}</div>
            <div className="feat-kv">
              <div><b>6 523 m³</b><span>{t.figs[0][1]}</span></div>
              <div><b>2 307,84 t</b><span>{t.figs[1][1]}</span></div>
            </div>
            <p>{t.feat.text}</p>
            <Link className="btn gold" to="/loyiha/talimarjon">{t.feat.btn} <Arrow /></Link>
          </div>
        </div>
      </section>

      <section className="steps-sec">
        <div className="wrap">
          <SectionHead eyebrow={t.processSec.eyebrow} title={t.processSec.title}>{t.processSec.text}</SectionHead>
        </div>
        <div className="steps-row">
          {STAGES.map((s, i) => (
            <Link className="step-card" key={i} to={`/jarayon#bosqich-${i + 1}`}>
              <div className="im" style={{ backgroundImage: bgCard(s.photos[0]) }} />
              <span className="no">{pad(i + 1)}</span>
              <b>{t.stages[i].t}</b>
            </Link>
          ))}
        </div>
        <div className="wrap center"><Link className="btn dark" to="/jarayon">{t.processSec.btn} <Arrow /></Link></div>
      </section>

      <section className="adv silk">
        <div className="wrap">
          <SectionHead light eyebrow={t.adv.eyebrow} title={t.adv.title} />
          <div className="adv-g">
            {t.adv.items.map(([a, b], i) => (
              <div className="adv-card rv" key={a}>
                <span className="ic"><Icon name={advIcons[i]} size={34} /></span>
                <b>{a}</b>
                <p>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <SectionHead eyebrow={t.gallery.eyebrow} title={t.gallery.title}>{t.gallery.text}</SectionHead>
          <div className="mosaic">
            {mosaic.map(([k, c], i) => (
              <button type="button" key={k} className={`m${i}`} onClick={() => openPhotos(mosaic, i)} aria-label={c}>
                <img src={img(k, 640)} srcSet={srcSet(k)} sizes="(max-width: 700px) 50vw, 33vw" alt={c} loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
          <div className="center"><Link className="btn dark" to="/loyiha">{t.gallery.all} <Arrow /></Link></div>
        </div>
      </section>

      <Documents />
      <Partners />
      <Closing />
      {lightbox}
    </>
  );
}
