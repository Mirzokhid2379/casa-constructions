import { useId } from "react";

// CASA belgisi: shamol tegirmoni, quyosh paneli va mo‘rili uy, ichida "CASA".
// Vektor (SVG) — har qanday o‘lchamda tiniq. Oltin + yashil ranglarda.
export function LogoMark({ size = 46 }) {
  const id = useId().replace(/:/g, "");
  const gd = `gd${id}`, gr = `gr${id}`;
  return (
    <svg className="logo-mark" width={Math.round(size * 1.2)} height={size} viewBox="0 0 120 100" aria-hidden="true">
      <defs>
        <linearGradient id={gd} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F4E6C4" /><stop offset=".45" stopColor="#D9BC86" /><stop offset="1" stopColor="#A9844F" />
        </linearGradient>
        <linearGradient id={gr} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2F8A63" /><stop offset="1" stopColor="#14533C" />
        </linearGradient>
      </defs>
      <circle cx="27" cy="25" r="13" fill="none" stroke={`url(#${gr})`} strokeWidth="3.2" />
      <path d="M27 25 L27 56" stroke={`url(#${gd})`} strokeWidth="2.6" strokeLinecap="round" />
      <g fill={`url(#${gd})`}>
        <path d="M27 25 L24.6 4 Q27 1.5 29.4 4 Z" />
        <path d="M27 25 L9.6 37.4 Q7.6 34.8 9.4 32.6 Z" />
        <path d="M27 25 L44.6 36.6 Q43.4 39.6 40.6 39.4 Z" />
      </g>
      <circle cx="27" cy="25" r="2.6" fill="#F4E6C4" />
      <path d="M6 55 L60 20 L114 55" fill="none" stroke={`url(#${gd})`} strokeWidth="5.2" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M15 53 L60 24.5 L105 53" fill="none" stroke={`url(#${gr})`} strokeWidth="2" strokeLinejoin="round" />
      <path d="M75 30.5 V16 H84 V36.4" fill={`url(#${gr})`} stroke={`url(#${gd})`} strokeWidth="2.4" strokeLinejoin="round" />
      <g transform="translate(88 22) skewY(33)">
        <rect width="24" height="15" rx="1" fill="#0F2A22" stroke={`url(#${gd})`} strokeWidth="1.6" />
        <path d="M8 0 V15 M16 0 V15 M0 7.5 H24" stroke={`url(#${gd})`} strokeWidth="1" />
      </g>
      <path d="M17 51 V94 H103 V51" fill="none" stroke={`url(#${gd})`} strokeWidth="4.4" strokeLinejoin="round" />
      <path d="M23 56 V89 H97 V56" fill="none" stroke={`url(#${gr})`} strokeWidth="1.6" />
      <text x="60" y="83" textAnchor="middle" fontFamily="Montserrat, Arial, sans-serif" fontWeight="800" fontSize="25" letterSpacing="1" fill={`url(#${gd})`} stroke="#0F3A2B" strokeWidth=".8" paintOrder="stroke">CASA</text>
    </svg>
  );
}

export function Brand({ size = 46 }) {
  return (
    <>
      <LogoMark size={size} />
      <span className="brand-sep" aria-hidden="true" />
      <span className="brand-tx">
        <b>CASA</b>
        <small>Construction</small>
      </span>
    </>
  );
}
