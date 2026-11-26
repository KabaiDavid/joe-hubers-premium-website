import { Kicker } from '../components/Blocks';
import { SITE } from '../data/site';

export default function Privacy() {
  return (
    <div className="tone-ivory">
      <header className="wrap wrap--narrow page-head">
        <Kicker>Privacy</Kicker>
        <h1 className="h1">How this website handles your information</h1>
      </header>
      <section className="wrap wrap--narrow prose" style={{ paddingBottom: 'var(--section)' }}>
        <p className="lead">
          This website does not use advertising or tracking cookies, and it does not sell or share your information.
        </p>
        <h2 className="h3" style={{ margin: '2.5rem 0 1rem' }}>Inquiry forms</h2>
        <p>
          When you send an inquiry, the details you enter (your name, email, optional phone number, event type, preferred date,
          guest count and message) are sent to Joe Huber’s so we can reply to you. We use them only to respond to your inquiry
          and plan your event.
        </p>
        <h2 className="h3" style={{ margin: '2.5rem 0 1rem' }}>Maps and online ordering</h2>
        <p>
          The map loads from Google Maps only when you choose to show it. Online ordering and the online shop are run by third-party
          services (Clover and shop.joehubers.com), which have their own privacy policies.
        </p>
        <h2 className="h3" style={{ margin: '2.5rem 0 1rem' }}>Questions</h2>
        <p>
          Email <a className="text-link" href={`mailto:${SITE.email}`}>{SITE.email}</a> or call{' '}
          <a className="text-link" href={SITE.phoneHref}>{SITE.phone}</a>.
        </p>
      </section>
    </div>
  );
}
