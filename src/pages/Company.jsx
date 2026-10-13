import { PageTitle } from "../seo/Head.jsx";
import { useI18n } from "../i18n/index.jsx";
import { img } from "../components/Img.js";
import Icon from "../components/Icons.jsx";
import { Closing, PageBand, SectionHead, useReveal } from "../components/Blocks.jsx";
import Documents from "../components/Documents.jsx";
import Partners from "../components/Partners.jsx";

export default function Company() {
  const { t } = useI18n();
  const c = t.company;
  useReveal(t);
  const icons = ["column", "rebar", "form", "scaff"];
  return (
    <>
      <PageTitle title={t.nav.company} />
      <PageBand crumb={t.nav.company} title={c.title} img={img("p418")}>{c.lead}</PageBand>
      <section>
        <div className="wrap about-g">
          <div className="rv">
            <SectionHead eyebrow={t.about.eyebrow} title={c.aboutTitle} />
            {c.about.map((p) => <p className="about-tx" key={p}>{p}</p>)}
            <div className="leader">
              <span className="ic"><Icon name="user" /></span>
              <div><span>{c.leaderTitle}</span><b>{c.leader[0]}</b><small>{c.leader[1]}</small></div>
            </div>
          </div>
          <div className="frame tall rv" style={{ backgroundImage: `url(${img("p413")})` }} />
        </div>
      </section>
      <section className="adv silk">
        <div className="wrap">
          <SectionHead light eyebrow={t.adv.eyebrow} title={c.servicesTitle} />
          <div className="svc-g">
            {c.services.map(([a, b], i) => (
              <div className="adv-card rv" key={a}>
                <span className="ic"><Icon name={icons[i]} size={34} /></span>
                <b>{a}</b><p>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Documents />
      <Partners />
      <Closing />
    </>
  );
}
