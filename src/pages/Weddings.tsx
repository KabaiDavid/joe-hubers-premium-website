import { Img } from '../components/Img';
import { Words } from '../components/Chrome';
import { CtaBand, GalleryStrip, InquiryForm, Kicker, PageHero } from '../components/Blocks';
import { TLink } from '../components/TLink';
import { Arrow } from '../components/Icons';
import { CONTACTS } from '../data/site';

const INCLUDED_CEREMONY = [
  'Outdoor and indoor ceremony options',
  'Groomed site selection',
  'Wedding arch',
  'Up to 100 white ceremony chairs',
  'Changing room for the bridal party',
  'Day-of coordinator',
  'Rehearsal, 45 minutes (Monday–Thursday, if needed)',
];
const INCLUDED_RECEPTION = [
  'Country Platter buffet dinner',
  'Unlimited soft drinks, tea & coffee',
  'Round tables & banquet chairs, classic ware & silverware',
  'Linen table coverings (black included)',
  'Table centerpieces',
  'Use of house decor, greenery, vases & candles',
  'Bartender for 5 hours',
  'Our staff cut & serve your wedding cake',
  'Use of the stage, microphone & a large TV for a slide show',
  'One bottle of Huber wine for the couple',
  'Set-up, table clean-up & clean-up',
  'Leftovers packed in foil pans to take home',
];
const EXTRAS = ['DJ', 'Bar service: cash, partially open or open bar', 'Fresh floral centerpieces', 'Table overlays', 'Chair covers with sash', 'White or ivory tablecloths', 'Gold chargers', 'Ice sculptures', 'Additional ceremony chairs and hours'];

const BUFFET = ['Country fried chicken', 'Huber’s honey ham', 'Homemade chicken & dumplings', 'Country style slaw', 'Seasonal salad', 'Green beans', 'Corn', 'Real mashed potatoes with gravy', 'Fried biscuits with apple butter', 'Soft drinks, tea & coffee'];
const APPETIZERS = ['Vegetable tray with dip', 'Fruit tray with dip', 'Assorted cheese & crackers', 'Homemade spinach queso & chips'];

const TIMELINE = [
  ['5:00 PM', 'Ceremony'],
  ['5:15 – 5:45 PM', 'Dinner & photos', 'Guests dine while the couple has photos taken'],
  ['6:45 – 7:15 PM', 'Cake cutting'],
  ['7:15 – 7:30 PM', 'Special dances'],
  ['8:00 – 8:15 PM', 'Bouquet & garter toss'],
];

const VENDORS = [
  ['Photographer', 'Abbys Eye Photography — Daniel Puzon', '931-572-8367'],
  ['DJ', 'Class Act DJ — John Dohoney', ''],
  ['Florist', 'The Flower Shoppe of New Albany', '812-945-2399'],
  ['Wedding cakes', 'Sandy’s Custom Cakes', '812-967-3909'],
];

export default function Weddings() {
  return (
    <>
      <PageHero
        kicker="Weddings at Joe Huber’s"
        title={
          <>
            Say “I do” <em>by the lake and orchards.</em>
          </>
        }
        intro="A private gazebo by the water, banquet halls under wooden beams, and a country buffet your guests will talk about."
        image="ceremony-autumn"
        alt="Guests seated for an outdoor wedding ceremony framed by autumn trees"
        position="50% 65%"
        caption="An autumn ceremony"
      >
        <div className="btn-row">
          <a href="#inquiry" className="btn btn--brass">
            Request pricing <Arrow />
          </a>
          <a href="#package" className="btn btn--ghost">
            The package
          </a>
        </div>
      </PageHero>

      <section className="section tone-ivory">
        <div className="wrap split">
          <div className="split__media">
            <div className="frame graded" data-reveal="clip">
              <Img name="gazebo-lake-chairs" alt="White ceremony chairs set out before the gazebo beside the lake" sizes="(min-width: 900px) 50vw, 100vw" />
            </div>
          </div>
          <div className="split__copy">
            <Kicker num="01">The ceremony</Kicker>
            <Words className="h2">
              Outside by the water, <em>or in from the weather.</em>
            </Words>
            <p className="lead" data-reveal="">
              The private gazebo, surrounded by the lake and orchards, is the setting for an outdoor ceremony. Indoor ceremonies are
              just as welcome: we transform the banquet hall for the occasion.
            </p>
          </div>
        </div>
      </section>

      <section className="section tone-dark">
        <div className="wrap split split--rev">
          <div className="split__media">
            <div className="frame graded" data-reveal="clip">
              <Img name="hall-reception" alt="A banquet hall set for a reception beneath chandeliers and wooden beams" sizes="(min-width: 900px) 50vw, 100vw" />
            </div>
          </div>
          <div className="split__copy">
            <Kicker num="02">The reception</Kicker>
            <Words className="h2">
              A country buffet, <em>and a dance floor.</em>
            </Words>
            <p className="lead muted" data-reveal="">
              The banquet halls are temperature controlled, with a stage, microphone and room to dance. Dinner is served buffet
              style from our kitchen.
            </p>
          </div>
        </div>
      </section>

      <section id="package" className="section tone-cream">
        <div className="wrap">
          <div className="chapter__head">
            <Kicker num="03">The Perfect Match package</Kicker>
            <Words className="h1">
              Ceremony &amp; reception, <em>all in one place.</em>
            </Words>
            <p className="muted" data-reveal="">
              For up to 100 guests (a per-person fee applies from guest 101). Includes five hours on the grounds and facility for
              ceremony and reception. Your bridal party is welcome to come early to get ready, at no extra charge.
            </p>
          </div>
          <div className="cols cols--3">
            <div className="panel" data-reveal="">
              <span className="label">Ceremony</span>
              <ul className="ticks">
                {INCLUDED_CEREMONY.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
            <div className="panel" data-reveal="" style={{ ['--d' as string]: 100 }}>
              <span className="label">Reception</span>
              <ul className="ticks">
                {INCLUDED_RECEPTION.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
            <div className="panel" data-reveal="" style={{ ['--d' as string]: 200 }}>
              <span className="label">For an additional fee</span>
              <ul className="ticks">
                {EXTRAS.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="price-note" data-reveal="">
            <div>
              <span className="label">Guests included</span>
              <strong>100</strong>
            </div>
            <div>
              <span className="label">Hours of guest time</span>
              <strong>5</strong>
            </div>
            <div>
              <span className="label">Deposit to hold your date</span>
              <strong>$1,000</strong>
            </div>
          </div>
          <p className="small muted" data-reveal="">
            The deposit is non-refundable. Final guest count and payment are due one week before the wedding. All events end by
            10 PM. Indiana sales tax applies. Confetti is not allowed, artificial petals can’t be used outside, and candles must be
            in a container. For pricing, please ask; we’ll send a proposal for your date.
          </p>
        </div>
      </section>

      <section id="menu" className="section tone-ivory">
        <div className="wrap cols cols--2">
          <div>
            <Kicker num="04">Reception menu</Kicker>
            <Words className="h2">
              Served <em>buffet style.</em>
            </Words>
            <ul className="fare" style={{ marginTop: '2rem' }}>
              {BUFFET.map((b) => (
                <li className="fare__row" key={b}>
                  <span className="fare__name">{b}</span>
                </li>
              ))}
            </ul>
            <div className="panel" style={{ marginTop: '2rem' }}>
              <span className="label">Appetizer selections · additional cost</span>
              <ul className="ticks">
                {APPETIZERS.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <div className="frame graded ratio-portrait" data-reveal="clip">
              <Img name="couple-buffet" alt="A bride and groom serving themselves at the reception buffet" sizes="(min-width: 800px) 45vw, 100vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="section tone-paper">
        <div className="wrap cols cols--2">
          <div>
            <Kicker num="05">A suggested timeline</Kicker>
            <ol className="fare">
              {TIMELINE.map(([time, what, note]) => (
                <li className="fare__row" key={time} data-reveal="">
                  <span className="fare__name">{what}</span>
                  <span className="fare__dots" aria-hidden="true" />
                  <span className="fare__price">{time}</span>
                  {note && <span className="fare__note">{note}</span>}
                </li>
              ))}
            </ol>
          </div>
          <div id="vendors">
            <Kicker num="06">Preferred vendors</Kicker>
            <ul className="contact__lines">
              {VENDORS.map(([role, name, phone]) => (
                <li key={role} data-reveal="">
                  <span className="label">{role}</span>
                  <span className="h4">{name}</span>
                  {phone && (
                    <a className="small" href={`tel:+1${phone.replace(/\D/g, '')}`} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem' }}>
                      {phone}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section tone-ink" aria-labelledby="w-gallery">
        <div className="wrap" style={{ marginBottom: '3rem' }}>
          <Kicker num="07">A glimpse into our celebrations</Kicker>
          <h2 className="h1" id="w-gallery">
            Real weddings, <em>right here.</em>
          </h2>
        </div>
        <GalleryStrip
          shots={[
            { name: 'couple-field', alt: 'A bride and groom kissing in a field', caption: 'Just married', shape: 'wide' },
            { name: 'ceremony-aisle', alt: 'Rows of white chairs on the lawn for an outdoor ceremony', caption: 'The aisle on the lawn', shape: 'tall' },
            { name: 'couple-entrance', alt: 'Bride and groom entering the reception through white drapes', caption: 'The grand entrance', shape: 'wide' },
            { name: 'hall-white', alt: 'Banquet hall with white chair covers and chandeliers', caption: 'Dressed in white', shape: 'wide' },
            { name: 'wedding-cake', alt: 'A three-tier wedding cake on a wood slice', caption: 'The cake', shape: 'square' },
            { name: 'pumpkin-proposal', alt: 'Two pumpkins carved “Will you marry me?” and “She said yes!”', caption: 'Where it started', shape: 'square' },
            { name: 'wedding-hayride', alt: 'A wedding party riding a hay wagon', caption: 'The wedding party hayride', shape: 'wide' },
            { name: 'dessert-table', alt: 'A rustic dessert table', caption: 'Sweet details', shape: 'tall' },
            { name: 'florals', alt: 'Peach and orange floral arrangement', caption: 'Florals', shape: 'tall' },
            { name: 'couple-lane', alt: 'Bride and groom walking down a country lane', caption: 'A walk down the lane', shape: 'wide' },
          ]}
        />
      </section>

      <section className="section tone-paper" id="inquiry">
        <div className="wrap contact__grid grid">
          <div className="contact__copy">
            <Kicker num="08">Let’s talk</Kicker>
            <Words className="h1">
              Tell us <em>your date.</em>
            </Words>
            <p className="muted" data-reveal="">
              Share your preferred date and guest count, and our event coordinator will follow up with pricing and a time to tour.
            </p>
            <ul className="contact__lines">
              <li>
                <span className="label">{CONTACTS.events.role}</span>
                <span className="h4">{CONTACTS.events.name}</span>
                <a href={`mailto:${CONTACTS.events.email}`} style={{ fontSize: '1rem', fontFamily: 'var(--font-sans)' }}>
                  {CONTACTS.events.email}
                </a>
              </li>
            </ul>
          </div>
          <div className="contact__form">
            <InquiryForm defaultType="wedding" id="wedding-form" />
          </div>
        </div>
      </section>

      <CtaBand
        kicker="Not a wedding?"
        title={
          <>
            Birthdays, field trips, <em>company picnics.</em>
          </>
        }
      >
        <TLink to="/events" className="btn btn--brass">
          Special events <Arrow />
        </TLink>
        <TLink to="/catering" className="btn btn--ghost">
          Catering
        </TLink>
      </CtaBand>
    </>
  );
}
