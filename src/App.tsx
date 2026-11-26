import { Suspense, useEffect, useLayoutEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { ActionBar, Footer, Header } from './components/Chrome';
import { NOT_FOUND, ROUTES, findRoute } from './routes';
import { scanParallax, scanReveals } from './lib/motion';
import { SITE } from './data/site';

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

function setMeta(selector: string, attr: string, value: string) {
  const el = document.head.querySelector<HTMLElement>(selector);
  if (el) el.setAttribute(attr, value);
}

function RouteEffects() {
  const { pathname, hash } = useLocation();
  const route = findRoute(pathname);

  // Head tags on client-side navigation (prerendered HTML already has them).
  useEffect(() => {
    document.title = route.title;
    const url = SITE.url + (route.path === '*' ? pathname : route.path === '/' ? '/' : route.path);
    setMeta('meta[name="description"]', 'content', route.description);
    setMeta('meta[property="og:title"]', 'content', route.title);
    setMeta('meta[property="og:description"]', 'content', route.description);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('link[rel="canonical"]', 'href', url);
  }, [route, pathname]);

  // Scroll: top on page change, or to the hash target.
  useIsoLayoutEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView({ block: 'start' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  // Motion: pick up new elements after each render of a page.
  useEffect(() => {
    let raf = requestAnimationFrame(() => {
      scanReveals();
      scanParallax();
    });
    // Lazy route chunks can mount a little later; observe the DOM briefly.
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        scanReveals();
        scanParallax();
      });
    });
    const main = document.getElementById('main');
    if (main) mo.observe(main, { childList: true, subtree: true });
    return () => {
      mo.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const route = findRoute(pathname);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header lightPage={!!route.lightHeader} />
      <RouteEffects />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
          <Routes>
            {ROUTES.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
            <Route path="*" element={<NOT_FOUND.Component />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ActionBar />
    </>
  );
}
