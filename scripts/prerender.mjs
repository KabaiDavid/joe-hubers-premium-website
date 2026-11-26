// Renders every route to static HTML with per-page meta tags, JSON-LD,
// a sitemap and a 404 page. Output layout matches Cloudflare Pages'
// clean URLs: /menu → dist/menu.html, / → dist/index.html.
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const DIST = path.resolve('dist');
const SITE_URL = 'https://joehubers.com';
const ssr = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href);
let template = await fs.readFile(path.join(DIST, 'index.html'), 'utf8');

// Inline the stylesheet (~11 KB gzipped) so first paint needs no extra request.
template = await (async () => {
  const m = template.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/);
  if (!m) return template;
  const css = await fs.readFile(path.join(DIST, m[1]), 'utf8');
  return template.replace(m[0], () => `<style>${css}</style>`);
})();

// Preload the two faces every page paints above the fold.
const assets = await fs.readdir(path.join(DIST, 'assets'));
const fontPreloads = [
  /^libre-caslon-display-latin-400-normal-.*\.woff2$/,
  /^libre-caslon-text-latin-400-normal-.*\.woff2$/,
  /^libre-caslon-text-latin-400-italic-.*\.woff2$/,
  /^hanken-grotesk-latin-wght-normal-.*\.woff2$/,
]
  .map((re) => assets.find((f) => re.test(f)))
  .filter(Boolean)
  .map((f) => `<link rel="preload" as="font" type="font/woff2" href="/assets/${f}" crossorigin />`)
  .join('\n    ');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const business = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  '@id': `${SITE_URL}/#restaurant`,
  name: "Joe Huber's Family Farm & Restaurant",
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpg`,
  telephone: '+1-812-923-5255',
  email: 'info@joehubers.com',
  servesCuisine: ['American', 'Southern', 'Country cooking'],
  priceRange: '$$',
  acceptsReservations: 'Yes',
  hasMenu: `${SITE_URL}/menu`,
  foundingDate: '1983',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '2421 Engle Rd.',
    addressLocality: 'Starlight',
    addressRegion: 'IN',
    postalCode: '47106',
    addressCountry: 'US',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '11:00',
      closes: '19:00',
      validThrough: '2026-12-31',
    },
  ],
  potentialAction: {
    '@type': 'OrderAction',
    target: 'https://www.clover.com/online-ordering/joe-hubers-family-farm--restaurant-starlight',
  },
  sameAs: ['https://shop.joehubers.com/'],
};

const crumbs = (route) =>
  route.path === '/'
    ? null
    : {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: route.title.split(/[:|]/)[0].trim(), item: `${SITE_URL}${route.path}` },
        ],
      };

const preloadFor = (html) => {
  // Preload the first priority image (the LCP candidate) on each page.
  const m = html.match(/<source type="image\/avif" srcSet="([^"]+)" sizes="([^"]+)"\/><source type="image\/webp"[^>]*><img[^>]*fetchPriority="high"/);
  if (!m) return '';
  return `<link rel="preload" as="image" type="image/avif" imagesrcset="${m[1]}" imagesizes="${m[2]}" fetchpriority="high" />`;
};

async function page(route, url, outFile) {
  const appHtml = await ssr.render(url);
  const canonical = `${SITE_URL}${route.path === '/' ? '/' : route.path === '*' ? '/404' : route.path}`;
  const ld = [route.path === '/' || route.path === '/restaurant' || route.path === '/contact' ? business : null, crumbs(route)]
    .filter(Boolean)
    .map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`)
    .join('\n    ');

  let html = template
    .replace(/<title>.*?<\/title>/, `<title>${esc(route.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*"/, `$1${esc(route.description)}"`)
    .replace(/(<link rel="canonical" href=")[^"]*"/, `$1${canonical}"`)
    .replace(/(<meta property="og:title" content=")[^"]*"/, `$1${esc(route.title)}"`)
    .replace(/(<meta property="og:description" content=")[^"]*"/, `$1${esc(route.description)}"`)
    .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${canonical}"`)
    .replace('<!--preload-->', [fontPreloads, preloadFor(appHtml)].join('\n    '))
    .replace('<!--jsonld-->', ld)
    .replace('<!--app-->', appHtml);
  if (route.path === '*') html = html.replace('<meta name="viewport"', '<meta name="robots" content="noindex" />\n    <meta name="viewport"');

  await fs.mkdir(path.dirname(outFile), { recursive: true });
  await fs.writeFile(outFile, html);
  console.log(`  ✓ ${url} → ${path.relative(DIST, outFile)}`);
}

console.log('Prerendering…');
for (const route of ssr.ROUTES) {
  const file = route.path === '/' ? 'index.html' : `${route.path.slice(1)}.html`;
  await page(route, route.path, path.join(DIST, file));
}
await page(ssr.NOT_FOUND, '/404', path.join(DIST, '404.html'));

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ssr.ROUTES.filter((r) => r.path !== '/privacy')
  .map((r) => `  <url><loc>${SITE_URL}${r.path === '/' ? '/' : r.path}</loc><lastmod>${today}</lastmod><priority>${r.path === '/' ? '1.0' : '0.8'}</priority></url>`)
  .join('\n')}
</urlset>
`;
await fs.writeFile(path.join(DIST, 'sitemap.xml'), sitemap);
await fs.rm(path.resolve('dist-ssr'), { recursive: true, force: true });
console.log('  ✓ sitemap.xml');
