import { useI18n } from "../i18n/index.jsx";
import { useLightbox } from "./Lightbox.jsx";
import { SectionHead } from "./Blocks.jsx";
import Icon from "./Icons.jsx";
import { REQUISITES } from "../data/site.js";

export default function Documents() {
  const { t } = useI18n();
  const d = t.docs;
  const [openPhotos, lightbox] = useLightbox();
  const doc = [["guvohnoma-2", d.caption]];
  const rows = [
    [d.rows.name, d.nameVal],
    [d.rows.stir, REQUISITES.stir],
    [d.rows.reg, REQUISITES.reg],
    [d.rows.date, REQUISITES.date],
    [d.rows.capital, `${REQUISITES.capital} ${d.capitalUnit}`],
    [d.rows.form, d.formVal],
    [d.rows.address, d.addressVal],
  ];
  return (
    <section className="docs">
      <div className="wrap">
        <SectionHead eyebrow={d.eyebrow} title={d.title}>{d.text}</SectionHead>
        <div className="docs-g">
          <button type="button" className="doc-paper rv" onClick={() => openPhotos(doc, 0)} aria-label={d.open}>
            <img src="/images/guvohnoma-2.webp" alt={d.caption} loading="lazy" />
            <span className="doc-open"><Icon name="doc" size={18} /> {d.open}</span>
          </button>
          <dl className="req rv">
            {rows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
          </dl>
        </div>
      </div>
      {lightbox}
    </section>
  );
}
