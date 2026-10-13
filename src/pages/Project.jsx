import { Link } from "react-router-dom";
import { PageTitle } from "../seo/Head.jsx";
import { useI18n } from "../i18n/index.jsx";
import { img } from "../components/Img.js";
import { useLightbox } from "../components/Lightbox.jsx";
import { Arrow, Closing, SectionHead, useReveal } from "../components/Blocks.jsx";
import Icon from "../components/Icons.jsx";
import { GALLERY, NAVOIY_GALLERY } from "../data/site.js";

// Bitta loyiha sahifasi. p — i18n dagi loyiha matnlari.
function ProjectView({ p, tag, cover, gallery, live, otherTo, otherLabel }) {
  const { t } = useI18n();
  const [openPhotos, lightbox] = useLightbox();
  useReveal(t);
  const photos = gallery.map((k) => [k, p.title]);
  return (
    <>
      <PageTitle title={p.title} />
      <section className="p-hero">
        <div className="p-hero-ph" style={{ backgroundImage: `url(${img(cover)})` }} />
        <div className="wrap">
          <div className="crumbs">
            <Link to="/">{t.nav.home}</Link><span>/</span>
            <Link to="/loyiha">{t.nav.project}</Link><span>/</span>
            <span>{p.title}</span>
          </div>
          <div className="p-tags">
            <span className="tag">{tag}</span>
            {live ? <span className="live"><i />{t.projects.active}</span> : <span className="tag done">{t.projects.done}</span>}
          </div>
          <h1>{p.title}</h1>
          <p className="p-sub">{p.sub}</p>
          <div className="p-place"><Icon name="pin" size={18} /> {p.place}</div>
        </div>
      </section>

      <div className="facts">
        <div className="wrap">
          {p.facts.map(([a, b]) => <div key={a}><span>{a}</span><b>{b}</b></div>)}
        </div>
      </div>

      <section>
        <div className="wrap p-body">
          <div className="rv">
            <p className="p-lead">{p.lead}</p>
            <h3 className="h3">{p.scopeTitle}</h3>
            <ul className="scope">{p.scope.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
          <div className="p-stats rv">
            {p.stats.map(([a, b]) => <div key={b}><b className="num">{a}</b><span>{b}</span></div>)}
          </div>
        </div>
      </section>

      {p.timeline && (
        <section className="tl-sec silk">
          <div className="wrap">
            <SectionHead light eyebrow={p.title} title={p.timeTitle} />
            <ol className="tl">
              {p.timeline.map(([d, l], i) => (
                <li key={i} className="rv"><span className="tl-dot" /><b>{d}</b><span>{l}</span></li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section className={p.timeline ? "" : "gal-sec"}>
        <div className="wrap">
          <SectionHead eyebrow={p.title} title={p.galTitle}>{p.galText(photos.length)}</SectionHead>
          <div className="gal">
            {photos.map(([k, c], i) => (
              <button type="button" key={k} onClick={() => openPhotos(photos, i)} aria-label={`${c} ${i + 1}`}>
                <img src={img(k)} alt={c} loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
          <div className="center"><Link className="btn dark" to={otherTo}>{otherLabel} <Arrow /></Link></div>
        </div>
      </section>
      <Closing />
      {lightbox}
    </>
  );
}

export function ProjectTalimarjon() {
  const { t } = useI18n();
  return <ProjectView p={t.project} tag="TPC2 · 900 MW" cover="p412" gallery={GALLERY} otherTo="/jarayon" otherLabel={t.processSec.btn} />;
}

export function ProjectNavoiy() {
  const { t } = useI18n();
  return <ProjectView p={t.navoiy} tag={t.navoiy.tag} cover="n01" gallery={NAVOIY_GALLERY} live otherTo="/loyiha" otherLabel={t.nav.project} />;
}

// Eski App.jsx bilan ham ishlashi uchun (import Project from "./pages/Project.jsx")
export default ProjectTalimarjon;
