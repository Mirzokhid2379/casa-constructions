import { SOCIALS } from "../data/site.js";

const P = {
  telegram: "M9.8 15.4 9.6 19c.4 0 .6-.2.8-.4l1.9-1.8 3.9 2.9c.7.4 1.2.2 1.4-.7l2.6-12.1c.2-1-.4-1.5-1.1-1.2L3.9 11.4c-1 .4-1 1-.2 1.2l3.9 1.2 9.1-5.7c.4-.3.8-.1.5.2z",
  instagram: "M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zM17.3 5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zM12 2.2c2.7 0 3 0 4 .1 2.7.1 4 1.4 4.1 4.1.1 1 .1 1.4.1 4s0 3-.1 4c-.1 2.7-1.4 4-4.1 4.1-1 .1-1.4.1-4 .1s-3 0-4-.1c-2.7-.1-4-1.4-4.1-4.1-.1-1-.1-1.4-.1-4s0-3 .1-4C4 3.7 5.3 2.4 8 2.3c1-.1 1.3-.1 4-.1z",
  facebook: "M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.9.3-1.4 1.5-1.4h1.5V4.5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.3H8v3h2.6V21z",
  youtube: "M21.6 7.2c-.2-.9-.9-1.6-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4c-.9.2-1.6.9-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8c.2.9.9 1.6 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3z",
};

export function SocialIcon({ id, size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={P[id]} /></svg>;
}

// Havola bo‘lmasa href="" turadi va sahifa qayta yuklanmaydi
const linkProps = (s) => (s.url ? { href: s.url, target: "_blank", rel: "noopener noreferrer" } : { href: "", onClick: (e) => e.preventDefault() });

export default function Socials({ className = "" }) {
  return (
    <div className={`socials ${className}`}>
      {SOCIALS.filter((s) => s.url).map((s) => (
        <a key={s.id} className="soc" aria-label={s.name} title={s.name} {...linkProps(s)}><SocialIcon id={s.id} /></a>
      ))}
    </div>
  );
}
