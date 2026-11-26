import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { useLocation } from 'react-router';
import { Img } from './Img';
import { TLink } from './TLink';
import { Arrow, ArrowUpRight } from './Icons';
import { Words } from './Chrome';
import { HOURS, SITE } from '../data/site';
import { COUNTRY_PLATTER, MENU } from '../data/menu';

/* ---------- Section kicker ---------- */
export function Kicker({ num, children }: { num?: string; children: ReactNode }) {
  return (
    <p className="kicker" data-reveal="fade">
      {num && <span className="num">No. {num}</span>}
      <span>{children}</span>
    </p>
  );
}

/* ---------- Page hero for inner pages ---------- */
export function PageHero({
  kicker,
  title,
  intro,
  image,
  alt,
  position,
  caption,
  children,
}: {
  kicker: string;
  title: ReactNode;
  intro?: ReactNode;
  image: string;
  alt: string;
  position?: string;
  caption?: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero on-image">
      <div className="page-hero__media" aria-hidden={false}>
        <div className="page-hero__parallax" data-parallax="0.12">
          <Img name={image} alt={alt} priority sizes="100vw" position={position} />
        </div>
      </div>
      <div className="wrap page-hero__inner">
        <p className="kicker hero-in" style={{ ['--h' as string]: 0 }}>
          {kicker}
        </p>
        <h1 className="display hero-title">{title}</h1>
        {intro && (
          <div className="lead page-hero__intro hero-in" style={{ ['--h' as string]: 2 }}>
            {intro}
          </div>
        )}
        {children && (
          <div className="hero-in" style={{ ['--h' as string]: 3 }}>
            {children}
          </div>
        )}
      </div>
      {caption && (
        <p className="page-hero__caption caption hero-in" style={{ ['--h' as string]: 4 }}>
          <b>Fig.</b>
          {caption}
        </p>
      )}
    </section>
  );
}

/* ---------- Hours ---------- */
export function Hours({ compact = false }: { compact?: boolean }) {
  return (
    <div className="hours">
      <p className="label hours__title">{HOURS.headline}</p>
      <dl className="hours__table">
        {HOURS.regular.map((r) => (
          <div key={r.days}>
            <dt>{r.days}</dt>
            <dd>{r.time}</dd>
          </div>
        ))}
      </dl>
      {!compact &&
        HOURS.notes.map((n) => (
          <p key={n.title} className="hours__note small">
            <strong>{n.title}.</strong> {n.text}
          </p>
        ))}
      <p className="hours__note small muted">
        Dining reservations by phone: <a className="text-link" href={SITE.phoneHref}>{SITE.phone}</a>
      </p>
    </div>
  );
}

/* ---------- Distances ---------- */
export const DISTANCES = [
  ['Louisville, KY', 22],
  ['Lexington, KY', 101],
  ['Indianapolis, IN', 105],
  ['Cincinnati, OH', 127],
  ['Evansville, IN', 127],
  ['Nashville, TN', 197],
  ['Columbus, OH', 228],
  ['St. Louis, MO', 277],
  ['Chicago, IL', 291],
] as const;

export function Mileage() {
  return (
    <ol className="mileage" aria-label="Driving distance to Joe Huber's">
      {DISTANCES.map(([city, mi], i) => (
        <li key={city} data-reveal="" style={{ ['--d' as string]: i * 60 }}>
          <span>{city}</span>
          <span className="mileage__dots" aria-hidden="true" />
          <span className="mileage__mi">
            {mi} <small>mi</small>
          </span>
        </li>
      ))}
    </ol>
  );
}

/* ---------- Map: loads Google Maps only when asked ---------- */
export function MapEmbed() {
  const [on, setOn] = useState(false);
  const q = encodeURIComponent(`${SITE.name}, ${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postal}`);
  return (
    <div className="map">
      {on ? (
        <iframe
          title="Map to Joe Huber's Family Farm & Restaurant"
          src={`https://www.google.com/maps?q=${q}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <>
          <Img name="entrance-sign" alt="The stone Joe Huber's Family Farm & Restaurant sign at the entrance on Engle Road" sizes="(min-width: 900px) 50vw, 100vw" />
          <div className="map__overlay">
            <p className="label">2421 Engle Rd. · Starlight, Indiana</p>
            <div className="btn-row">
              <button className="btn btn--light" onClick={() => setOn(true)}>
                Show the map
              </button>
              <a className="btn btn--ghost" href={SITE.mapsUrl} target="_blank" rel="noopener">
                Get directions <ArrowUpRight />
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ---------- Horizontal gallery strip ---------- */
export type Shot = { name: string; alt: string; caption: string; shape?: 'tall' | 'wide' | 'square' };

export function GalleryStrip({ shots }: { shots: Shot[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: 'smooth' });
  };

  return (
    <div className="strip">
      <div
        className="strip__track"
        ref={ref}
        tabIndex={0}
        role="region"
        aria-label="Photo gallery — scroll sideways"
        onPointerDown={(e) => {
          if (e.pointerType !== 'mouse' || !ref.current) return;
          drag.current = { x: e.clientX, left: ref.current.scrollLeft, moved: false };
          ref.current.classList.add('is-dragging');
        }}
        onPointerMove={(e) => {
          if (!drag.current || !ref.current) return;
          const dx = e.clientX - drag.current.x;
          if (Math.abs(dx) > 4) drag.current.moved = true;
          ref.current.scrollLeft = drag.current.left - dx;
        }}
        onPointerUp={() => {
          drag.current = null;
          ref.current?.classList.remove('is-dragging');
        }}
        onPointerLeave={() => {
          drag.current = null;
          ref.current?.classList.remove('is-dragging');
        }}
      >
        {shots.map((s, i) => (
          <figure key={s.name} className={`strip__item strip__item--${s.shape ?? 'wide'}`}>
            <div className="frame zoom graded">
              <Img name={s.name} alt={s.alt} sizes="(min-width: 900px) 40vw, 80vw" />
            </div>
            <figcaption className="caption">
              <b>{String(i + 1).padStart(2, '0')}</b>
              {s.caption}
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="strip__controls">
        <button className="strip__btn" onClick={() => scrollBy(-1)} aria-label="Previous photos">
          <Arrow className="arrow flip" />
        </button>
        <button className="strip__btn" onClick={() => scrollBy(1)} aria-label="Next photos">
          <Arrow />
        </button>
      </div>
    </div>
  );
}

/* ---------- Menu preview (homepage bill of fare) ---------- */
const PREVIEW = [
  {
    id: 'platter',
    label: 'Country Platter',
    items: COUNTRY_PLATTER.includes.map((name) => ({ name })),
    price: [
      ['Adults', COUNTRY_PLATTER.adult],
      [COUNTRY_PLATTER.childAges, COUNTRY_PLATTER.child],
    ],
  },
  { id: 'suppers', label: 'Suppers', items: MENU[0].groups[1].items.slice(0, 7) },
  { id: 'togo', label: "Joe's To Go", items: MENU[1].groups[2].items.slice(0, 4).concat(MENU[1].groups[3].items) },
  { id: 'desserts', label: 'Pies & Cobblers', items: MENU[0].groups[7].items },
];

export function MenuPreview() {
  const [tab, setTab] = useState(PREVIEW[0].id);
  const uid = useId();
  const current = PREVIEW.find((p) => p.id === tab)!;
  return (
    <div className="bill" data-reveal="">
      <div className="bill__tabs" role="tablist" aria-label="Menu sections">
        {PREVIEW.map((p) => (
          <button
            key={p.id}
            role="tab"
            id={`${uid}-${p.id}`}
            aria-selected={tab === p.id}
            aria-controls={`${uid}-panel`}
            className="bill__tab"
            onClick={() => setTab(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>
      <div className="bill__panel" role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-${tab}`} key={tab}>
        {current.id === 'platter' && (
          <p className="bill__intro italic">All you can eat · served family style</p>
        )}
        <ul className="fare">
          {current.items.map((it) => (
            <li key={it.name} className="fare__row">
              <span className="fare__name">{it.name}</span>
              {'price' in it && it.price && (
                <>
                  <span className="fare__dots" aria-hidden="true" />
                  <span className="fare__price">{it.price}</span>
                </>
              )}
              {'note' in it && it.note && <span className="fare__note">{it.note}</span>}
            </li>
          ))}
        </ul>
        {current.price && (
          <div className="bill__prices">
            {current.price.map(([k, v]) => (
              <div key={k}>
                <span className="label">{k}</span>
                <span className="bill__price">{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Inquiry form ---------- */
export const INQUIRY_TYPES = [
  { value: 'wedding', label: 'Wedding' },
  { value: 'catering', label: 'Catering & delivery' },
  { value: 'private-event', label: 'Company picnic or private event' },
  { value: 'birthday', label: 'Birthday party' },
  { value: 'field-trip', label: 'School field trip' },
  { value: 'power-lunch', label: 'Power Lunch meeting' },
  { value: 'general', label: 'General question' },
] as const;

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function InquiryForm({ defaultType = 'general', id = 'inquiry' }: { defaultType?: string; id?: string }) {
  const { search } = useLocation();
  const [type, setType] = useState(defaultType);
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mailto, setMailto] = useState('');
  const uid = useId();

  useEffect(() => {
    const t = new URLSearchParams(search).get('type');
    if (t && INQUIRY_TYPES.some((x) => x.value === t)) setType(t);
  }, [search]);

  const needsEventDetails = type !== 'general';

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const errs: Record<string, string> = {};
    if (!data.firstName?.trim()) errs.firstName = 'Please tell us your first name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? '')) errs.email = 'Please enter a valid email address.';
    if (!data.message?.trim()) errs.message = 'Please add a short message.';
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`);
      first?.focus();
      return;
    }

    const typeLabel = INQUIRY_TYPES.find((t) => t.value === data.type)?.label ?? 'Inquiry';
    const body = [
      `Inquiry: ${typeLabel}`,
      `Name: ${data.firstName} ${data.lastName ?? ''}`.trim(),
      `Email: ${data.email}`,
      data.phone && `Phone: ${data.phone}`,
      data.date && `Preferred date: ${data.date}`,
      data.guests && `Estimated guests: ${data.guests}`,
      '',
      data.message,
    ]
      .filter((l) => l !== undefined && l !== '')
      .join('\n');
    setMailto(`mailto:${SITE.email}?subject=${encodeURIComponent(`${typeLabel} inquiry — ${data.firstName}`)}&body=${encodeURIComponent(body)}`);

    setStatus('sending');
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-done" role="status" id={id}>
        <p className="h3">Thank you. Your note is on its way to the farm.</p>
        <p className="muted">
          We’ll reply by email. Sending an inquiry does not confirm a reservation. For dining reservations, please call{' '}
          <a className="text-link" href={SITE.phoneHref}>{SITE.phone}</a>.
        </p>
        <button className="link" onClick={() => setStatus('idle')}>
          Send another inquiry <Arrow />
        </button>
      </div>
    );
  }

  const field = (name: string) => ({
    id: `${uid}-${name}`,
    name,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${uid}-${name}-err` : undefined,
  });
  const err = (name: string) =>
    errors[name] ? (
      <span className="field__error" id={`${uid}-${name}-err`}>
        {errors[name]}
      </span>
    ) : null;

  return (
    <form className="form" id={id} onSubmit={onSubmit} noValidate>
      <div className="field field--full">
        <label htmlFor={`${uid}-type`}>What are you planning?</label>
        <select {...field('type')} value={type} onChange={(e) => setType(e.target.value)}>
          {INQUIRY_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor={`${uid}-firstName`}>First name *</label>
        <input {...field('firstName')} autoComplete="given-name" required />
        {err('firstName')}
      </div>
      <div className="field">
        <label htmlFor={`${uid}-lastName`}>Last name</label>
        <input {...field('lastName')} autoComplete="family-name" />
      </div>
      <div className="field">
        <label htmlFor={`${uid}-email`}>Email *</label>
        <input {...field('email')} type="email" autoComplete="email" inputMode="email" required />
        {err('email')}
      </div>
      <div className="field">
        <label htmlFor={`${uid}-phone`}>Phone</label>
        <input {...field('phone')} type="tel" autoComplete="tel" inputMode="tel" />
      </div>
      {needsEventDetails && (
        <>
          <div className="field">
            <label htmlFor={`${uid}-date`}>Preferred date</label>
            <input {...field('date')} type="date" />
          </div>
          <div className="field">
            <label htmlFor={`${uid}-guests`}>Estimated guests</label>
            <input {...field('guests')} type="number" min={1} max={2000} inputMode="numeric" />
          </div>
        </>
      )}
      <div className="field field--full">
        <label htmlFor={`${uid}-message`}>Message *</label>
        <textarea {...field('message')} rows={4} required placeholder={needsEventDetails ? 'Tell us a little about your event.' : ''} />
        {err('message')}
      </div>
      <div className="field--hp" aria-hidden="true">
        <label htmlFor={`${uid}-company`}>Company</label>
        <input id={`${uid}-company`} name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="form__foot field--full">
        <p className="small muted">
          Sending an inquiry does not confirm a reservation. For dining reservations or anything time-sensitive, please call{' '}
          <a className="text-link" href={SITE.phoneHref}>{SITE.phone}</a>.
        </p>
        <button className="btn btn--brass" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send inquiry'} <Arrow />
        </button>
      </div>
      {status === 'error' && (
        <div className="form__error field--full" role="alert">
          <p>
            We couldn’t send your message from the website just now. You can{' '}
            <a className="text-link" href={mailto}>email it to us instead</a> (your details are filled in), or call{' '}
            <a className="text-link" href={SITE.phoneHref}>{SITE.phone}</a>.
          </p>
        </div>
      )}
    </form>
  );
}

/* ---------- Closing call-to-action band ---------- */
export function CtaBand({ kicker, title, children }: { kicker: string; title: ReactNode; children: ReactNode }) {
  return (
    <section className="section cta-band tone-dark">
      <div className="wrap wrap--narrow cta-band__inner">
        <Kicker>{kicker}</Kicker>
        <Words className="h1">{title}</Words>
        <div className="btn-row" data-reveal="" style={{ ['--d' as string]: 200, justifyContent: 'center' }}>
          {children}
        </div>
      </div>
    </section>
  );
}

export { TLink, Arrow, ArrowUpRight };
