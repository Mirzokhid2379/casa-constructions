// Oltin chiziqli ikonkalar (buklet uslubida)
const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
const paths = {
  factory: <><path d="M3 21h18M5 21V10l5 3V10l5 3V5h4v16" /><path d="M8 17h2M13 17h2M17 9h0" /></>,
  column: <><path d="M6 21h12M8 21V8M16 21V8M5 8h14L12 3z" /><path d="M11 12h2M11 16h2" /></>,
  shield: <><path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" /><path d="M9 12l2 2 4-4" /></>,
  helmet: <><path d="M4 16a8 8 0 0 1 16 0" /><path d="M3 16h18v2H3zM10 8V5h4v3" /></>,
  hand: <><path d="M2 12l4-4 4 2 3-2 3 2 6 4" /><path d="M6 8l-4 4 6 6 2-2M22 12l-6 6-2-2M10 14l2 2M12 12l2 2" /></>,
  rebar: <><path d="M4 20L20 4M8 20L20 8M4 16L16 4" /></>,
  form: <><rect x="4" y="4" width="16" height="16" rx="1" /><path d="M4 10h16M10 4v16" /></>,
  scaff: <><path d="M5 21V3M19 21V3M5 8h14M5 14h14M5 8l14 6" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  pin: <><path d="M12 21s-7-6-7-12a7 7 0 0 1 14 0c0 6-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  doc: <><path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5M9 12h7M9 16h7" /></>,
};
export default function Icon({ name, size = 28 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...S}>{paths[name]}</svg>;
}
