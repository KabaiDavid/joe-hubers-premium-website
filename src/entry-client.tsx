import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App';
import { findRoute } from './routes';
import './styles/fonts';
import './styles/global.css';
import './styles/sections.css';

const container = document.getElementById('root')!;
const tree = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

(window as Window & { __booted?: boolean }).__booted = true;
document.documentElement.classList.add('js');

if (container.hasChildNodes()) {
  // Load the current page's chunk first so the prerendered HTML is reused as-is.
  findRoute(window.location.pathname)
    .load()
    .finally(() => hydrateRoot(container, tree));
} else {
  createRoot(container).render(tree);
}
