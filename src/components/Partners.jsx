import { useI18n } from "../i18n/index.jsx";
import { Arrow, SectionHead } from "./Blocks.jsx";
import { PARTNER_IDS, PARTNER_LINKS } from "../data/site.js";

// VIVA logotipi (VIVA saytidagi bilan bir xil): nuqtali X, vektor — har o‘lchamda tiniq
const VIVA_DOTS = (() => {
  const dots = [], step = 7.2;
  for (let i = -6; i <= 6; i++) for (let j = -6; j <= 6; j++) {
    if ((i + j) % 2) continue;
    if (Math.min(Math.abs(i - j), Math.abs(i + j)) > 2) continue;
    const r = step * (0.86 - 0.105 * Math.hypot(i, j));
    if (r >= step * 0.2) dots.push([50 + i * step, 50 + j * step, r]);
  }
  return dots;
})();

function PartnerLogo({ id }) {
  if (id === "omega") return <span className="pt-logo pt-omega"><img src="/images/omega-logo.webp" alt="OMEGA Energy Group" width="520" height="437" loading="lazy" /></span>;
  if (id === "viva")
    return (
      <span className="pt-logo pt-viva">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <rect width="100" height="100" rx="16" fill="#132E49" />
          <g fill="#DDE4EC">{VIVA_DOTS.map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} />)}</g>
        </svg>
        <b>VIVA<small>Constructions</small></b>
      </span>
    );
  return <span className="pt-logo pt-mono">UET</span>;
}

export default function Partners() {
  const { t } = useI18n();
  return (
    <section className="partners">
      <div className="wrap">
        <SectionHead eyebrow={t.partners.eyebrow} title={t.partners.title} />
        <div className="pt-g">
          {PARTNER_IDS.map((id) => {
            const [n, r] = t.partners.items[id];
            const url = PARTNER_LINKS[id];
            const inner = (
              <>
                <PartnerLogo id={id} />
                <div className="pt-tx">
                  <b>{n}</b><span>{r}</span>
                  {url && <em className="pt-link">{url.replace(/^https?:\/\//, "")} <Arrow /></em>}
                </div>
              </>
            );
            return url
              ? <a className="pt rv" key={id} href={url} target="_blank" rel="noopener">{inner}</a>
              : <div className="pt rv" key={id}>{inner}</div>;
          })}
        </div>
      </div>
    </section>
  );
}
