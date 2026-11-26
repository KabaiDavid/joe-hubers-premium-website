// Single source of truth for business facts. Every value here comes from
// joehubers.com or the PDFs it publishes (see docs/RESEARCH.md).

export const SITE = {
  name: "Joe Huber's Family Farm & Restaurant",
  short: "Joe Huber's",
  url: 'https://joehubers.com',
  phone: '(812) 923-5255',
  phoneHref: 'tel:+18129235255',
  email: 'info@joehubers.com',
  address: {
    street: '2421 Engle Rd.',
    city: 'Starlight',
    region: 'IN',
    postal: '47106',
    country: 'US',
  },
  mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Joe+Huber%27s+Family+Farm+%26+Restaurant%2C+2421+Engle+Rd%2C+Starlight%2C+IN+47106',
  orderOnline: 'https://www.clover.com/online-ordering/joe-hubers-family-farm--restaurant-starlight',
  shop: 'https://shop.joehubers.com/',
  founded: 1926,
  restaurantOpened: 1983,
} as const;

export const CONTACTS = {
  events: { name: 'Amy Huber Peters', role: 'Event Coordinator', email: 'amy@joehubers.com' },
  sales: { name: 'L.J. Huber', role: 'Director of Sales', email: 'LJ@joehubers.com' },
} as const;

/** Published hours, through December 2026. */
export const HOURS = {
  headline: 'Restaurant hours through December 2026',
  regular: [
    { days: 'Thursday – Sunday', time: '11 AM – 7 PM' },
    { days: 'Monday – Wednesday', time: 'Closed' },
  ],
  notes: [
    { title: 'Thanksgiving week', text: 'Wednesday, November 25 & Thanksgiving Day, November 26 — 11 AM to 7 PM.' },
    { title: 'Winter', text: 'We close for the winter and reopen in March. Please call for the reopening date and holiday hours.' },
  ],
  barnyard: 'The Barnyard keeps the same hours as the restaurant.',
} as const;

/**
 * Open/closed status for the published 2026 schedule only.
 * Returns null outside the window we have data for, so the UI never guesses.
 */
export function openStatus(now: Date = new Date()): { open: boolean; label: string } | null {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Kentucky/Louisville',
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', weekday: 'short', hour12: false,
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const y = Number(get('year'));
  const m = Number(get('month'));
  const d = Number(get('day'));
  const h = Number(get('hour')) % 24;
  const min = Number(get('minute'));
  const wd = get('weekday');

  if (y !== 2026 || m < 3) return null; // outside the published schedule
  const iso = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  const openDay = ['Thu', 'Fri', 'Sat', 'Sun'].includes(wd) || iso === '2026-11-25';
  const mins = h * 60 + min;
  if (openDay && mins >= 11 * 60 && mins < 19 * 60) return { open: true, label: 'Open today until 7 PM' };
  if (openDay && mins < 11 * 60) return { open: false, label: 'Opens today at 11 AM' };
  return { open: false, label: 'Open Thursday – Sunday, 11 AM – 7 PM' };
}

export const NAV = [
  { to: '/restaurant', label: 'Restaurant' },
  { to: '/our-story', label: 'Our Story' },
  { to: '/farm', label: 'Farm' },
  { to: '/weddings', label: 'Weddings & Events' },
  { to: '/market', label: 'Market' },
] as const;

export const FOOTER_NAV = [
  {
    title: 'Restaurant',
    links: [
      { to: '/menu', label: 'Menu' },
      { to: '/restaurant', label: 'Dining room' },
      { to: '/menu#carryout', label: "Joe's To Go" },
      { href: SITE.orderOnline, label: 'Order online' },
      { to: '/catering', label: 'Catering & delivery' },
    ],
  },
  {
    title: 'Celebrate',
    links: [
      { to: '/weddings', label: 'Weddings' },
      { to: '/events#picnics', label: 'Company picnics' },
      { to: '/events#birthdays', label: 'Birthdays' },
      { to: '/events#field-trips', label: 'Field trips' },
      { to: '/events#power-lunch', label: 'Power Lunch' },
    ],
  },
  {
    title: 'The Farm',
    links: [
      { to: '/our-story', label: 'Our story' },
      { to: '/farm', label: 'Farm & Barnyard' },
      { to: '/market', label: 'Farm Market' },
      { href: SITE.shop, label: 'Shop online' },
      { to: '/contact', label: 'Hours & directions' },
    ],
  },
] as const;
