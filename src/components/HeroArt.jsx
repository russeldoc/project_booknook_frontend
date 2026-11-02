const INK = "#101a2e";

// Slide 1: a shelf of book spines (colours match the category colours)
export function ShelfArt() {
  const spines = [
    { x: 30, y: 90, w: 34, h: 140, c: "#ffcf33" },
    { x: 68, y: 60, w: 40, h: 170, c: "#ffffff" },
    { x: 112, y: 100, w: 30, h: 130, c: "#7b2d8e" },
    { x: 146, y: 70, w: 44, h: 160, c: "#2744d6" },
    { x: 194, y: 110, w: 32, h: 120, c: "#0f766e" },
  ];
  return (
    <svg viewBox="0 0 360 270" className="w-full max-w-sm" role="img" aria-label="A shelf of books">
      {spines.map((s) => (
        <g key={s.x}>
          <rect x={s.x} y={s.y} width={s.w} height={s.h} rx="3" fill={s.c} stroke={INK} strokeWidth="3" />
          <path d={`M${s.x + 6} ${s.y + 22}h${s.w - 12}M${s.x + 6} ${s.y + 32}h${s.w - 12}`} stroke={INK} strokeWidth="2.5" />
        </g>
      ))}
      <g transform="rotate(14 262 230)">
        <rect x="236" y="92" width="38" height="138" rx="3" fill="#c81e3a" stroke={INK} strokeWidth="3" />
        <path d="M242 114h26M242 124h26" stroke={INK} strokeWidth="2.5" />
      </g>
      <path d="M14 232h332" stroke={INK} strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

// Slide 2: a library checkout card
export function CardArt() {
  return (
    <svg viewBox="0 0 360 270" className="w-full max-w-sm" role="img" aria-label="A library checkout card">
      <rect x="40" y="50" width="280" height="170" rx="10" fill="#ffffff" stroke={INK} strokeWidth="3" />
      <path d="M40 90h280" stroke="#c81e3a" strokeWidth="3" />
      <path d="M62 120h236M62 146h236M62 172h236M62 198h236" stroke="#9fb0cc" strokeWidth="2" />
      <path d="M60 70h90" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      <path d="M92 90v130" stroke="#c81e3a" strokeWidth="2" />
      <g transform="rotate(-12 250 150)">
        <circle cx="250" cy="150" r="38" fill="none" stroke="#2744d6" strokeWidth="4" />
        <circle cx="250" cy="150" r="30" fill="none" stroke="#2744d6" strokeWidth="1.5" />
        <text x="250" y="146" textAnchor="middle" fontSize="20" fontWeight="800" fill="#2744d6" fontFamily="sans-serif">7</text>
        <text x="250" y="166" textAnchor="middle" fontSize="13" fontWeight="700" fill="#2744d6" fontFamily="sans-serif">days</text>
      </g>
    </svg>
  );
}

// Slide 3: a stack of books and a return arrow
export function StackArt() {
  return (
    <svg viewBox="0 0 360 270" className="w-full max-w-sm" role="img" aria-label="A stack of books with a return arrow">
      <rect x="70" y="176" width="190" height="42" rx="4" fill="#ffcf33" stroke={INK} strokeWidth="3" />
      <rect x="86" y="132" width="160" height="44" rx="4" fill="#ffffff" stroke={INK} strokeWidth="3" />
      <rect x="62" y="92" width="176" height="40" rx="4" fill="#c81e3a" stroke={INK} strokeWidth="3" />
      <path d="M80 112h70M100 154h60M90 197h80" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <path d="M286 190a58 58 0 1 0-8-86" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
      <path d="M262 98l20 4 4-20" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
