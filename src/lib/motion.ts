// A deliberately small motion layer: one IntersectionObserver for reveals,
// one rAF loop for parallax. No animation library needed.

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let revealObserver: IntersectionObserver | null = null;

/** Observe every not-yet-revealed [data-reveal] element in the document. */
export function scanReveals(root: ParentNode = document) {
  const els = root.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)');
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  revealObserver ??= new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          revealObserver?.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  els.forEach((el) => {
    // Elements already above the fold on load reveal immediately (with their delay).
    revealObserver!.observe(el);
  });
}

// ---------- Parallax ----------
type P = { el: HTMLElement; speed: number };
let items: P[] = [];
let ticking = false;
let running = false;

function update() {
  ticking = false;
  const vh = window.innerHeight;
  for (const { el, speed } of items) {
    const r = (el.parentElement ?? el).getBoundingClientRect();
    if (r.bottom < -100 || r.top > vh + 100) continue;
    const center = r.top + r.height / 2 - vh / 2;
    el.style.transform = `translate3d(0, ${(-center * speed).toFixed(1)}px, 0)`;
  }
}
const onScroll = () => {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(update);
  }
};

export function scanParallax() {
  if (prefersReducedMotion()) return;
  items = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]')).map((el) => ({
    el,
    speed: Number(el.dataset.parallax) || 0.08,
  }));
  if (!running) {
    running = true;
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
  }
  update();
}

/** Run a DOM update inside a View Transition where supported. */
export function withViewTransition(update: () => void) {
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
  if (!doc.startViewTransition || prefersReducedMotion()) {
    update();
    return;
  }
  doc.startViewTransition(update);
}
