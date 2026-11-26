type P = { className?: string };
const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };

export const Arrow = ({ className = 'arrow' }: P) => (
  <svg className={className} width="16" height="10" viewBox="0 0 16 10" {...base}>
    <path d="M1 5h14M11 1l4 4-4 4" />
  </svg>
);
export const ArrowUpRight = ({ className = 'arrow' }: P) => (
  <svg className={className} width="11" height="11" viewBox="0 0 11 11" {...base}>
    <path d="M1.5 9.5l8-8M3 1.5h6.5V8" />
  </svg>
);
export const Phone = ({ className }: P) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" {...base}>
    <path d="M5 3h3.5l1.8 4.6-2.3 1.5a11 11 0 005.9 5.9l1.5-2.3L20 14.5V18a2 2 0 01-2 2A16 16 0 013 5a2 2 0 012-2z" />
  </svg>
);
export const MenuIcon = ({ className }: P) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" {...base}>
    <path d="M6 3h12v18H6zM9 8h6M9 12h6M9 16h4" />
  </svg>
);
export const Pin = ({ className }: P) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" {...base}>
    <path d="M12 21s-7-6.2-7-12a7 7 0 0114 0c0 5.8-7 12-7 12z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);
export const Mail = ({ className }: P) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" {...base}>
    <path d="M3 6h18v12H3z" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);
export const Sprig = ({ className }: P) => (
  <svg className={className} width="40" height="40" viewBox="0 0 40 40" {...base} strokeWidth={1.1}>
    <path d="M20 36V8" />
    <path d="M20 14c-5-1-8-5-8-9 5 0 8 4 8 9zM20 14c5-1 8-5 8-9-5 0-8 4-8 9zM20 23c-6-1-9-5-9-10 6 0 9 5 9 10zM20 23c6-1 9-5 9-10-6 0-9 5-9 10z" />
  </svg>
);
