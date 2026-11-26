# Joe Huber's Family Farm & Restaurant: website

A redesign of [joehubers.com](https://joehubers.com) for Joe Huber's Family Farm & Restaurant in Starlight, Indiana.

- **Stack**: React 19, TypeScript and Vite, with React Router. Every route is prerendered to static HTML and then hydrated.
- **Hosting**: Cloudflare Pages, with one Pages Function for the inquiry form.
- **No UI or animation libraries**: the motion layer is about 120 lines in `src/lib/motion.ts`, built on IntersectionObserver, one rAF loop and the View Transitions API.

Business facts, the content sources and the creative strategy are in [`docs/RESEARCH.md`](docs/RESEARCH.md).

## Commands

```bash
npm install
npm run dev        # local dev server (client-rendered)
npm run build      # typecheck, client and SSR builds, then prerender to dist/
npx wrangler pages dev dist   # serve dist/ exactly as Cloudflare Pages would (redirects + /api)
npm run images     # regenerate public/img from assets/photos (only after adding photos)
```

## Project layout

```
assets/photos/        original photography from joehubers.com (source for npm run images)
public/img/           generated AVIF + WebP renditions (committed, so builds don't need sharp)
public/_redirects     301s from the old WordPress URLs (/about-us/ → /our-story, …)
public/_headers       security + cache headers
functions/api/        Cloudflare Pages Function: POST /api/inquiry
scripts/prerender.mjs renders each route to dist/<route>.html with meta, JSON-LD and the sitemap
src/data/             site facts, hours, menu, timeline (edit these to change content)
src/pages/            one file per page
src/components/       header/footer/nav, image component, shared blocks, inquiry form
src/styles/           global.css (design tokens, type, buttons, motion), sections.css (layouts)
```

## Editing content

- **Hours**: `src/data/site.ts` → `HOURS`. The "open now" badge (`openStatus`) only reports for the published 2026 season, and outside it shows "call for hours". When the 2027 hours are announced, update `HOURS`, `openStatus` and `openingHoursSpecification` in `scripts/prerender.mjs`.
- **Menu & prices**: `src/data/menu.ts`.
- **Photos**: add to `assets/photos/`, run `npm run images`, then reference the file name (without its extension) in `<Img name="…" />`.

## Deploying to Cloudflare Pages

1. In Cloudflare: **Workers & Pages → Create → Pages → Connect to Git**, then choose this repository.
2. Build settings:
   - Framework preset: *None*
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variable: `NODE_VERSION = 22`
3. Add the custom domain `joehubers.com` under the project's **Custom domains** tab.

To deploy from a terminal instead, run `npx wrangler pages deploy dist --project-name joe-hubers`. It needs a token with *Cloudflare Pages: Edit* and the account ID in `CLOUDFLARE_ACCOUNT_ID`.

### Inquiry form delivery

`functions/api/inquiry.ts` validates submissions, uses a honeypot field against bots and forwards each inquiry. In the Pages project, set **one** of the following under *Settings → Variables and Secrets*:

| Variable | Purpose |
| --- | --- |
| `INQUIRY_WEBHOOK_URL` | A JSON webhook (Zapier, Make, n8n, Slack…). It receives every field plus a plain-text summary. |
| `RESEND_API_KEY` + `INQUIRY_TO` | Sends email through [Resend](https://resend.com). `INQUIRY_TO` takes a comma-separated list, e.g. `info@joehubers.com,amy@joehubers.com`. `INQUIRY_FROM` is optional. |

Until one of these is set, the endpoint returns 503. The form then offers a pre-filled email to info@joehubers.com plus the phone number, so no inquiry is silently lost.

## Quality checks performed

- Every route returns 200 (and unknown routes return 404). Each page has a single `<h1>`, a unique title and description, a canonical URL and alt text on every image.
- Viewports checked: 360, 390, 820, 1440 and 2560px. No horizontal overflow on any page.
- Prerendered HTML is complete and readable with JavaScript disabled.
- `prefers-reduced-motion`: reveals are shown immediately and the hero slideshow starts paused (it also has a pause button).
- Lighthouse (local server, simulated mobile on slow 4G): Performance 92–97, Accessibility 100, Best Practices 100, SEO 100, CLS 0. Desktop Performance 100.
