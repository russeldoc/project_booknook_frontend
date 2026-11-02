export default function Logo() {
  return (
    <span className="inline-flex items-center gap-2">
      <svg width="34" height="34" viewBox="0 0 32 32" aria-hidden="true">
        <rect x="2" y="2" width="28" height="28" rx="7" fill="var(--color-primary)" stroke="var(--edge)" strokeWidth="2.5" />
        <path d="M9 9h10a4 4 0 0 1 4 4v10H13a4 4 0 0 1-4-4z" fill="var(--paper)" stroke="var(--edge)" strokeWidth="2" />
        <path d="M20 3v9l2.5-2 2.5 2V3z" fill="#ffcf33" stroke="var(--edge)" strokeWidth="1.5" />
      </svg>
      <span className="font-display text-2xl font-extrabold tracking-tight">BookNook</span>
    </span>
  );
}
