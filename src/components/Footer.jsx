import { Link } from "react-router-dom";
import { Brand } from "./Logo.jsx";
import Socials from "./Socials.jsx";
import { useI18n } from "../i18n/index.jsx";
import { CONTACTS, PROJECTS, PARTNER_IDS, PARTNER_LINKS } from "../data/site.js";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="foot silk">
      <div className="wrap">
        <div className="fg">
          <div>
            <Link className="brand" to="/"><Brand size={52} /></Link>
            <p className="fabout">{t.footer.about}</p>
            <Socials />
          </div>
          <div>
            <h4>{t.footer.site}</h4>
            <Link to="/loyiha">{t.nav.project}</Link>
            <Link to="/jarayon">{t.nav.process}</Link>
            <Link to="/kompaniya">{t.nav.company}</Link>
            <Link to="/aloqa">{t.nav.contact}</Link>
          </div>
          <div>
            <h4>{t.nav.project}</h4>
            {PROJECTS.map((p) => (
              <Link key={p.id} to={p.to} className="fproj">
                {t[p.key].title}
                <small>{p.status === "active" ? t.projects.active : t.projects.done}</small>
              </Link>
            ))}
            <h4 className="fh-gap">{t.footer.partners}</h4>
            {PARTNER_IDS.map((id) => {
              const name = t.partners.items[id][0];
              return PARTNER_LINKS[id]
                ? <a key={id} href={PARTNER_LINKS[id]} target="_blank" rel="noopener">{name}</a>
                : <span key={id} className="fpt">{name}</span>;
            })}
          </div>
          <div>
            <h4>{t.nav.contact}</h4>
            <a className="ftel" href={`tel:${CONTACTS.phone.replace(/\s/g, "")}`}>{CONTACTS.phone}</a>
            <a href={`mailto:${CONTACTS.email}`}>{CONTACTS.email}</a>
            <span className="faddr"><em>{t.contact.address}:</em> {t.contact.officeVal}</span>
            <span className="faddr"><em>{t.contact.legal}:</em> {t.docs.addressVal}</span>
          </div>
        </div>
        <div className="fb"><span>© 2026 “CASA” MChJ · {t.footer.rights}</span><span>STIR 311 436 724</span></div>
      </div>
    </footer>
  );
}
