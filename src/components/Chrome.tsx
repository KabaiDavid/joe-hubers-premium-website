import { useEffect, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router';
import { TLink } from './TLink';
import { Arrow, ArrowUpRight, MenuIcon, Phone, Pin } from './Icons';
import { FOOTER_NAV, HOURS, NAV, SITE, openStatus } from '../data/site';

/* ---------- Open/closed status (client only, so SSR never guesses) ---------- */
export function OpenStatus({ fallback = 'Thursday – Sunday · 11 AM – 7 PM' }: { fallback?: string }) {
  const [s, setS] = useState<ReturnType<typeof openStatus> | undefined>(undefined);
  useEffect(() => {
    setS(openStatus());
    const id = window.setInterval(() => setS(openStatus()), 60_000);
    return () => window.clearInterval(id);
  }, []);
  const label = s?.label ?? (s === null ? 'Seasonal hours — call (812) 923-5255' : fallback);
  return (
    <span className={`status${s?.open ? ' is-open' : ''}`}>
      <span className="status__dot" aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}

/* ---------- Header ---------- */
export function Header({ lightPage }: { lightPage: boolean }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setSolid(y > 40);
        setHidden(y > 400 && y > last + 4);
        if (y < last - 4) setHidden(false);
        last = y;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const cls = [
    'header',
    solid && !open ? 'is-solid' : '',
    hidden && !open ? 'is-hidden' : '',
    lightPage && !open ? 'is-light-page' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <header className={cls}>
        <div className="wrap header__inner">
          <TLink to="/" className="wordmark" aria-label="Joe Huber's Family Farm & Restaurant — home">
            <span className="wordmark__name">Joe Huber’s</span>
            <span className="wordmark__sub">Family Farm &amp; Restaurant</span>
          </TLink>

          <nav className="nav" aria-label="Main">
            <ul>
              {NAV.map((n) => (
                <li key={n.to}>
                  <TLink to={n.to} aria-current={pathname === n.to || (n.to === '/weddings' && pathname === '/events') ? 'page' : undefined}>
                    {n.label}
                  </TLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__actions">
            <a className="header__phone" href={SITE.phoneHref}>
              {SITE.phone}
            </a>
            <TLink to="/menu" className="btn btn--sm btn--menu">
              View Menu
            </TLink>
            <button
              className="burger"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span>{open ? 'Close' : 'Menu'}</span>
              <span className="burger__lines" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <div id="site-menu" className={`menu-overlay${open ? ' is-open' : ''}`} aria-hidden={!open} inert={!open}>
        <nav aria-label="Mobile">
          <ul className="menu-overlay__list">
            {[{ to: '/menu', label: 'The Menu' }, ...NAV, { to: '/contact', label: 'Visit' }].map((n, i) => (
              <li key={n.to}>
                <TLink to={n.to}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {n.label}
                </TLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="menu-overlay__meta">
          <OpenStatus />
          <div>
            <strong>Reservations</strong>
            <a href={SITE.phoneHref}>{SITE.phone}</a>
          </div>
          <div>
            <strong>Find us</strong>
            {SITE.address.street}, {SITE.address.city}, {SITE.address.region} {SITE.address.postal}
          </div>
          <div className="btn-row">
            <a className="btn btn--brass" href={SITE.orderOnline} target="_blank" rel="noopener">
              Order online <ArrowUpRight />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- Mobile action bar ---------- */
export function ActionBar() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`action-bar${visible ? ' is-visible' : ''}`} aria-label="Quick actions">
      <a href={SITE.phoneHref}>
        <Phone />
        Call
      </a>
      <TLink to="/menu">
        <MenuIcon />
        Menu
      </TLink>
      <a href={SITE.mapsUrl} target="_blank" rel="noopener">
        <Pin />
        Directions
      </a>
    </nav>
  );
}

/* ---------- Footer ---------- */
export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__cta">
            <p className="kicker">Come hungry</p>
            <h2 className="h2">
              Supper’s on, <em>Thursday through Sunday.</em>
            </h2>
            <p className="muted" style={{ maxWidth: '40ch' }}>
              {HOURS.regular[0].days}, {HOURS.regular[0].time}. Reservations by phone at{' '}
              <a className="text-link" href={SITE.phoneHref}>
                {SITE.phone}
              </a>
              .
            </p>
            <div className="btn-row" style={{ marginTop: '1.8rem' }}>
              <TLink to="/menu" className="btn btn--brass">
                View the menu <Arrow />
              </TLink>
              <a href={SITE.mapsUrl} className="btn btn--ghost" target="_blank" rel="noopener">
                Directions <ArrowUpRight />
              </a>
            </div>
          </div>
          <div className="footer__cols">
            {FOOTER_NAV.map((col) => (
              <div key={col.title}>
                <h3 className="label">{col.title}</h3>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {'to' in l ? (
                        <TLink to={l.to}>{l.label}</TLink>
                      ) : (
                        <a href={l.href} target="_blank" rel="noopener">
                          {l.label} ↗
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h3 className="label">Visit</h3>
              <address className="muted" style={{ lineHeight: 1.7 }}>
                {SITE.address.street}
                <br />
                {SITE.address.city}, {SITE.address.region} {SITE.address.postal}
              </address>
              <ul style={{ marginTop: '0.8rem' }}>
                <li>
                  <a href={SITE.phoneHref}>{SITE.phone}</a>
                </li>
                <li>
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer__word" aria-hidden="true">
          Joe Huber’s
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Joe Huber’s Family Farm &amp; Restaurant · On the farm since 1926 · Restaurant since 1983</span>
          <span>
            <TLink to="/privacy">Privacy</TLink>
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Headline that reveals word by word ---------- */
export function Words({ children, as: Tag = 'h2', className = '', delay = 0 }: { children: ReactNode; as?: 'h1' | 'h2' | 'h3' | 'p'; className?: string; delay?: number }) {
  let i = 0;
  const split = (node: ReactNode): ReactNode => {
    if (typeof node === 'string') {
      return node.split(/(\s+)/).map((part, k) =>
        /^\s+$/.test(part) ? (
          part
        ) : part ? (
          <span className="w" key={`${i}-${k}`}>
            <span style={{ ['--i' as string]: i++ }}>{part}</span>
          </span>
        ) : null,
      );
    }
    if (Array.isArray(node)) return node.map((n, k) => <span key={k}>{split(n)}</span>);
    if (node && typeof node === 'object' && 'props' in node) {
      const el = node as React.ReactElement<{ children?: ReactNode }>;
      const Comp = el.type as React.ElementType;
      return <Comp {...el.props}>{split(el.props.children)}</Comp>;
    }
    return node;
  };
  return (
    <Tag className={`words ${className}`} data-reveal="" style={{ ['--d' as string]: delay }}>
      {split(children)}
    </Tag>
  );
}
