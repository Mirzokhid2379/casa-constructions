import { useState } from "react";
import { PageTitle } from "../seo/Head.jsx";
import { useI18n } from "../i18n/index.jsx";
import { img, srcSet, bgBig, bgCard } from "../components/Img.js";
import Icon from "../components/Icons.jsx";
import Socials from "../components/Socials.jsx";
import { Arrow, PageBand } from "../components/Blocks.jsx";
import { CONTACTS } from "../data/site.js";

function Copy({ text }) {
  const { t } = useI18n();
  const [ok, setOk] = useState(false);
  const go = () => {
    try { navigator.clipboard.writeText(text).then(() => { setOk(true); setTimeout(() => setOk(false), 1500); }, () => {}); } catch { /* yo‘q */ }
  };
  return <button type="button" className="copy" onClick={go}>{ok ? t.contact.copied : t.contact.copy}</button>;
}

export default function Contact() {
  const { t, lang } = useI18n();
  const c = t.contact;
  const empty = { name: "", contact: "", msg: "" };
  const [form, setForm] = useState(empty);
  const [msg, setMsg] = useState(null);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const [sending, setSending] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    if (sending) return;
    if (form.name.trim().length < 2 || form.contact.trim().length < 5) return setMsg("err");
    setSending(true); setMsg(null);
    try {
      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, _gotcha: e.target._gotcha?.value || "", lang }),
      });
      if (!r.ok) throw new Error(String(r.status));
      setMsg("ok"); setForm(empty);
    } catch {
      setMsg("fail");
    } finally {
      setSending(false);
    }
  };
  const tel = CONTACTS.phone.replace(/\s/g, "");
  return (
    <>
      <PageTitle title={t.nav.contact} />
      <PageBand crumb={t.nav.contact} title={c.title} img={bgBig("p501")}>{c.lead}</PageBand>
      <section>
        <div className="wrap ct-g">
          <div className="ct-card">
            <div className="ct-row"><span className="ic"><Icon name="user" size={22} /></span><div><span>{c.director}</span><b>{t.company.leader[0]}</b></div></div>
            <div className="ct-row"><span className="ic"><Icon name="phone" size={22} /></span><div><span>{c.phone}</span><a href={`tel:${tel}`}><b>{CONTACTS.phone}</b></a></div><Copy text={CONTACTS.phone} /></div>
            <div className="ct-row"><span className="ic"><Icon name="mail" size={22} /></span><div><span>{c.email}</span><a href={`mailto:${CONTACTS.email}`}><b>{CONTACTS.email}</b></a></div><Copy text={CONTACTS.email} /></div>
            <div className="ct-row"><span className="ic"><Icon name="pin" size={22} /></span><div><span>{c.address}</span><b>{t.contact.officeVal}</b></div></div>
            <div className="ct-row"><span className="ic"><Icon name="doc" size={22} /></span><div><span>{c.legal}</span><b>{t.docs.addressVal}</b></div></div>
            <div className="ct-soc"><span>{t.social.title}</span><Socials /></div>
          </div>
          <form className="form" noValidate onSubmit={submit}>
            <h3>{c.formTitle}</h3>
            <label>{c.name}<input autoComplete="organization" value={form.name} onChange={set("name")} /></label>
            <label>{c.contact}<input autoComplete="tel" value={form.contact} onChange={set("contact")} /></label>
            <label>{c.msg}<textarea placeholder={c.msgPh} value={form.msg} onChange={set("msg")} /></label>
            {/* spam-botlar uchun yashirin maydon */}
            <input className="hp" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <button className="btn gold" type="submit" disabled={sending}>{sending ? c.sending : c.send} {!sending && <Arrow />}</button>
            {msg && (
              <div className={`fmsg ${msg === "ok" ? "ok" : "err"}`} role="status">
                {msg === "ok" ? c.ok : msg === "fail" ? <>{c.fail} <a href={`tel:${tel}`}>{CONTACTS.phone}</a></> : c.err}
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
