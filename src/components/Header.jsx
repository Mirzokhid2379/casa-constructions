import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Brand } from "./Logo.jsx";
import { LangSwitch, useI18n } from "../i18n/index.jsx";
import Socials from "./Socials.jsx";
import { CONTACTS } from "../data/site.js";

export default function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const links = [["/loyiha", t.nav.project], ["/jarayon", t.nav.process], ["/kompaniya", t.nav.company], ["/aloqa", t.nav.contact]];
  return (
    <>
      <header className={`top${solid ? " solid" : ""}`}>
        <div className="wrap">
          <Link className="brand" to="/" aria-label={`CASA Constructions — ${t.nav.home}`}><Brand /></Link>
          <nav className="nav" aria-label="Main">
            {links.map(([to, l]) => <NavLink key={to} to={to}>{l}</NavLink>)}
          </nav>
          <LangSwitch className="top-langs" />
          <a className="top-tel" href={`tel:${CONTACTS.phone.replace(/\s/g, "")}`}>{CONTACTS.phone}</a>
          <button className="burger" type="button" aria-label={t.nav.open} onClick={() => setOpen(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 8h16M4 16h16" /></svg>
          </button>
        </div>
      </header>
      {open && (
        <div className="drawer silk">
          <div className="drawer-top">
            <LangSwitch />
            <button className="burger x" type="button" aria-label={t.nav.close} onClick={() => setOpen(false)}>×</button>
          </div>
          <Link to="/">{t.nav.home}</Link>
          {links.map(([to, l]) => <Link key={to} to={to}>{l}</Link>)}
          <a className="drawer-tel" href={`tel:${CONTACTS.phone.replace(/\s/g, "")}`}>{CONTACTS.phone}</a>
          <Socials />
        </div>
      )}
    </>
  );
}
