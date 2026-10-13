import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { PageTitle } from "../seo/Head.jsx";
import { useI18n } from "../i18n/index.jsx";
import { img } from "../components/Img.js";
import { useLightbox } from "../components/Lightbox.jsx";
import { Arrow, Closing, PageBand, useReveal } from "../components/Blocks.jsx";
import { STAGES } from "../data/site.js";

const pad = (n) => String(n).padStart(2, "0");

export default function Process() {
  const { t } = useI18n();
  const pr = t.process;
  const [openPhotos, lightbox] = useLightbox();
  const refs = useRef([]);
  const chips = useRef(null);
  const [active, setActive] = useState(0);
  const { hash } = useLocation();
  useReveal(t);

  useEffect(() => {
    const f = () => {
      const mid = innerHeight * 0.45;
      let a = 0;
      refs.current.forEach((el, i) => { if (el && el.getBoundingClientRect().top < mid) a = i; });
      setActive(a);
    };
    f();
    addEventListener("scroll", f, { passive: true });
    return () => removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    const box = chips.current, el = box?.children[active];
    if (box && el) box.scrollTo({ left: el.offsetLeft - (box.clientWidth - el.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);
  const go = (i) => (e) => {
    e && e.preventDefault();
    const el = refs.current[i];
    if (el) scrollTo({ top: el.getBoundingClientRect().top + scrollY - 150, behavior: "smooth" });
  };
  useEffect(() => {
    const m = hash.match(/bosqich-(\d+)/);
    if (m) setTimeout(() => go(+m[1] - 1)(), 250);
  }, [hash]);

  return (
    <>
      <PageTitle title={t.nav.process} />
      <PageBand crumb={t.nav.process} title={pr.title} img={img("p411")}>{pr.lead}</PageBand>

      <nav className="rail">
        <div className="wrap">
          <div className="chips" ref={chips}>
            {STAGES.map((_, i) => (
              <a key={i} href={`#bosqich-${i + 1}`} onClick={go(i)} className={i === active ? "on" : i < active ? "past" : ""}>
                <span>{pad(i + 1)}</span>{t.stages[i].t}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section className="stages">
        <div className="wrap">
          {STAGES.map((s, i) => {
            const x = t.stages[i];
            const photos = s.photos.map((k) => [k, x.t]);
            const [main, ...rest] = s.photos;
            const th = rest.slice(0, 3);
            return (
              <article key={i} id={`bosqich-${i + 1}`} className={`stage rv${i % 2 ? " flip" : ""}`} ref={(el) => (refs.current[i] = el)}>
                <div className="st-txt">
                  <div className="st-no">{pad(i + 1)}</div>
                  <div className="eyebrow">{pr.stage} {i + 1} / {STAGES.length}</div>
                  <h2>{x.t}</h2>
                  <p>{x.d}</p>
                  <ul>{x.pts.map((p) => <li key={p}>{p}</li>)}</ul>
                </div>
                <div className="st-media">
                  <button type="button" className="st-main" onClick={() => openPhotos(photos, 0)} aria-label={x.t}>
                    <img src={img(main)} alt={x.t} loading={i ? "lazy" : "eager"} decoding="async" />
                    <span className="cnt">{pr.photos(photos.length)}</span>
                  </button>
                  <div className="st-th">
                    {th.map((k, j) => (
                      <button type="button" key={k} onClick={() => openPhotos(photos, j + 1)} aria-label={`${x.t} ${j + 2}`}>
                        <img src={img(k)} alt="" loading="lazy" decoding="async" />
                        {j === th.length - 1 && rest.length > th.length && <span className="more">+{rest.length - th.length}</span>}
                      </button>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <Closing />
      {lightbox}
    </>
  );
}
