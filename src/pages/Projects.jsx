import { Link } from "react-router-dom";
import { PageTitle } from "../seo/Head.jsx";
import { useI18n } from "../i18n/index.jsx";
import { img } from "../components/Img.js";
import Icon from "../components/Icons.jsx";
import { Arrow, Closing, PageBand, useReveal } from "../components/Blocks.jsx";
import { PROJECTS } from "../data/site.js";

const TAGS = { navoiy: null, talimarjon: "TPC2 · 900 MW" };

// Loyiha kartasi: katta rasm, holati, nomi, asosiy raqamlar
export function ProjectCard({ pr, big = false }) {
  const { t } = useI18n();
  const p = t[pr.key];
  const live = pr.status === "active";
  return (
    <Link className={`pc rv${big ? " big" : ""}`} to={pr.to}>
      <div className="pc-im" style={{ backgroundImage: `url(${img(pr.cover)})` }}>
        {live ? <span className="live"><i />{t.projects.active}</span> : <span className="tag done">{t.projects.done}</span>}
      </div>
      <div className="pc-tx">
        <span className="pc-tag">{TAGS[pr.id] || p.tag}</span>
        <h3>{p.title}</h3>
        <p>{p.sub}</p>
        <div className="pc-kv">
          {p.stats.slice(0, 3).map(([a, b]) => <div key={b}><b>{a}</b><span>{b}</span></div>)}
        </div>
        <div className="pc-ft">
          <span className="pc-place"><Icon name="pin" size={16} /> {p.place}</span>
          <span className="pc-more">{t.projects.more} <Arrow /></span>
        </div>
      </div>
    </Link>
  );
}

export default function Projects() {
  const { t } = useI18n();
  useReveal(t);
  return (
    <>
      <PageTitle title={t.nav.project} />
      <PageBand crumb={t.nav.project} title={t.projects.title} img={img("n02")}>{t.projects.lead}</PageBand>
      <section>
        <div className="wrap pc-list">
          {PROJECTS.map((pr) => <ProjectCard key={pr.id} pr={pr} big />)}
        </div>
      </section>
      <Closing />
    </>
  );
}
