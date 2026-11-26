import { Words } from '../components/Chrome';
import { Hours, InquiryForm, Kicker, MapEmbed, Mileage } from '../components/Blocks';
import { ArrowUpRight } from '../components/Icons';
import { CONTACTS, SITE } from '../data/site';

const ROUTES = [
  ['From the north', 'I-65 South to the New Albany Exit 6B, onto I-265 West.'],
  ['From the south', 'I-65 North to the New Albany Exit 6B, onto I-265 West.'],
  ['From the east', 'I-64 West over the Sherman Minton Bridge, then exit onto I-265 East.'],
  ['From the west', 'I-64 East, then exit onto I-265 East.'],
  ['From southwest Louisville / Dixie Highway', 'I-264 West to I-64 West, then exit onto I-265 East.'],
];

export default function Contact() {
  return (
    <div className="tone-ivory">
      <header className="wrap page-head">
        <Kicker>Visit &amp; contact</Kicker>
        <Words as="h1" className="display">
          Getting here is <em>part of the fun.</em>
        </Words>
        <p className="lead" data-reveal="">
          Serving you is our pleasure. We’re in Starlight, Indiana, just 22 miles north of downtown Louisville, Kentucky.
        </p>
      </header>

      <section className="wrap" style={{ paddingBottom: 'var(--section)' }}>
        <div className="grid location__grid">
          <div className="location__copy">
            <address className="location__addr">
              {SITE.address.street}
              <br />
              {SITE.address.city}, Indiana {SITE.address.postal}
            </address>
            <ul className="contact__lines" style={{ marginBottom: '2.5rem' }}>
              <li>
                <span className="label">Restaurant reservations</span>
                <a href={SITE.phoneHref}>{SITE.phone}</a>
              </li>
              <li>
                <span className="label">Email</span>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>
                <span className="label">Weddings &amp; events · {CONTACTS.events.name}</span>
                <a href={`mailto:${CONTACTS.events.email}`}>{CONTACTS.events.email}</a>
              </li>
              <li>
                <span className="label">Catering &amp; sales · {CONTACTS.sales.name}</span>
                <a href={`mailto:${CONTACTS.sales.email}`}>{CONTACTS.sales.email}</a>
              </li>
            </ul>
            <Hours />
          </div>
          <div className="location__side">
            <MapEmbed />
            <Mileage />
          </div>
        </div>
      </section>

      <section id="directions" className="section tone-dark">
        <div className="wrap">
          <div className="chapter__head">
            <Kicker>Best routes</Kicker>
            <Words className="h1">
              Up and over <em>the Knobs.</em>
            </Words>
            <p className="muted" data-reveal="">
              Every route ends the same way: take I-265 to Exit 1 (State Street), turn right at the bottom of the ramp and climb
              the Knobs. Turn right at the first traffic light onto Scottsville Road, which becomes Engle Road about a mile from
              Joe Huber’s. Follow the signs for 7.5 miles.
            </p>
          </div>
          <ol className="index">
            {ROUTES.map(([from, how], k) => (
              <li key={from} data-reveal="" style={{ ['--d' as string]: k * 70 }}>
                <div className="index__row" style={{ cursor: 'default' }}>
                  <span className="index__n">{String(k + 1).padStart(2, '0')}</span>
                  <span className="index__title" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)' }}>
                    {from}
                  </span>
                  <span className="index__text muted">{how}</span>
                </div>
              </li>
            ))}
          </ol>
          <div className="btn-row" style={{ marginTop: '2.5rem' }}>
            <a href={SITE.mapsUrl} className="btn btn--brass" target="_blank" rel="noopener">
              Open in Google Maps <ArrowUpRight />
            </a>
          </div>
        </div>
      </section>

      <section id="inquiry" className="section tone-paper">
        <div className="wrap grid contact__grid">
          <div className="contact__copy">
            <Kicker>Send us a note</Kicker>
            <Words className="h1">
              Questions &amp; <em>event inquiries.</em>
            </Words>
            <p className="muted" data-reveal="">
              For weddings, catering and other events, let us know the event type, your preferred date and an estimated guest
              count. General questions are welcome too.
            </p>
          </div>
          <div className="contact__form">
            <InquiryForm id="contact-form" />
          </div>
        </div>
      </section>
    </div>
  );
}
