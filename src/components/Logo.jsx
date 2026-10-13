import { useId } from "react";

// CASA belgisi: oltin kvadrat ichida uycha va "CASA" yozuvi (vektor, har qanday o‘lchamda tiniq)
export function LogoMark({ size = 46 }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg className="logo-mark" width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E3C99B" />
          <stop offset=".55" stopColor="#C6A372" />
          <stop offset="1" stopColor="#A9875A" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="62" height="62" rx="13" fill={`url(#g${id})`} />
      <rect x="1.5" y="1.5" width="61" height="61" rx="12.5" fill="none" stroke="#fff" strokeOpacity=".25" />
      <g fill="none" stroke="#163A31" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 30 L32 12 L55 30" />
        <path d="M14 26 V51 H50 V26" />
        <path d="M42 18.5 V13 H47 V22.5" />
      </g>
      <text x="32" y="45.5" textAnchor="middle" fontFamily="Montserrat, Arial, sans-serif" fontWeight="800" fontSize="12.5" letterSpacing=".6" fill="#163A31" fontStyle="italic">CASA</text>
    </svg>
  );
}

export function Brand({ size = 46 }) {
  return (
    <>
      <LogoMark size={size} />
      <span className="brand-tx">
        <b>CASA</b>
        <small>Constructions</small>
      </span>
    </>
  );
}
