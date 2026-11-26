import { TLink } from '../components/TLink';
import { Arrow } from '../components/Icons';

export default function NotFound() {
  return (
    <section className="wrap notfound tone-ivory">
      <p className="kicker">Error 404</p>
      <h1 className="display" style={{ maxWidth: '14ch', marginBottom: '1.5rem' }}>
        This row’s <em>been picked clean.</em>
      </h1>
      <p className="lead muted" style={{ maxWidth: '36rem', marginBottom: '2rem' }}>
        We couldn’t find that page. It may have moved when we rebuilt the website.
      </p>
      <div className="btn-row">
        <TLink to="/" className="btn">
          Back to the farm <Arrow />
        </TLink>
        <TLink to="/menu" className="link">
          View the menu <Arrow />
        </TLink>
      </div>
    </section>
  );
}
