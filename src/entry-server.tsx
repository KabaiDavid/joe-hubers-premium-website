import { StrictMode } from 'react';
import { prerender } from 'react-dom/static';
import { StaticRouter } from 'react-router';
import App from './App';
import { ROUTES, NOT_FOUND, findRoute } from './routes';

export { ROUTES, NOT_FOUND, findRoute };

/** Render a route to HTML, waiting for lazy page chunks to resolve. */
export async function render(url: string): Promise<string> {
  // Warm-up pass: resolves the page's React.lazy component so the real pass
  // renders it inline. Otherwise React streams it as a hidden segment swapped
  // in by script, which crawlers without JS (and no-JS visitors) never see.
  await findRoute(url).load();
  await (await prerender(<StaticRouter location={url}><App /></StaticRouter>)).prelude.cancel();
  const { prelude } = await prerender(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
    // Never outline large boundaries into script-swapped segments: static HTML
    // must be complete and in document order.
    { progressiveChunkSize: Number.POSITIVE_INFINITY },
  );
  const reader = prelude.getReader();
  const decoder = new TextDecoder();
  let html = '';
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    html += decoder.decode(value, { stream: true });
  }
  return html + decoder.decode();
}
