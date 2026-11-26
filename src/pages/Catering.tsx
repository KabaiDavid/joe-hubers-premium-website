import { Img } from '../components/Img';
import { Words } from '../components/Chrome';
import { InquiryForm, Kicker, PageHero } from '../components/Blocks';
import { TLink } from '../components/TLink';
import { Arrow } from '../components/Icons';
import { CONTACTS, SITE } from '../data/site';

const OPTIONS = [
  {
    name: 'Traditional Country Platter Dinner',
    style: 'Set buffet style',
    items: 'Country fried chicken, Huber honey ham, fried biscuits with apple butter, German country slaw or seasonal salad, real mashed potatoes with gravy, green beans and homemade chicken & dumplings.',
  },
  {
    name: 'Chicken Dinner',
    style: 'Set buffet style',
    items: 'Country fried chicken, fried biscuits with apple butter, real mashed potatoes with gravy or chicken & dumplings, and green beans.',
  },
  {
    name: 'Box Lunches',
    style: 'Individually boxed',
    items: 'Two pieces of chicken, a fried biscuit with apple butter and one side: slaw, seasonal salad, mashed potatoes, green beans, corn or chicken & dumplings.',
  },
  {
    name: 'Thanksgiving Dinner',
    style: 'November only',
    items: 'Oven-roasted turkey, homemade dressing, fried biscuits with apple butter, slaw or seasonal salad, real mashed potatoes with gravy and green beans.',
  },
];

export default function Catering() {
  return (
    <>
      <PageHero
        kicker="Catering & delivery"
        title={
          <>
            A taste of the country, <em>delivered.</em>
          </>
        }
        intro="Our fried chicken, honey ham, biscuits with apple butter and homemade pies, for wedding receptions, office gatherings, family events and holiday parties."
        image="reception-buffet"
        alt="A buffet line of chafing dishes decorated with flowers and greenery"
        caption="Buffet service"
      >
        <div className="btn-row">
          <a href="#catering-inquiry" className="btn btn--brass">
            Plan your catering <Arrow />
          </a>
          <a href={SITE.phoneHref} className="btn btn--ghost">
            Order by phone
          </a>
        </div>
      </PageHero>

      <section className="section tone-ivory">
        <div className="wrap">
          <Kicker num="01">Everything from scratch</Kicker>
          <p className="statement" data-reveal="">
            Remember home-cooked meals with your family? <em>We certainly do.</em> Generations of Hubers still stand behind the food
            and the service.
          </p>
        </div>
      </section>

      <section className="section tone-cream">
        <div className="wrap">
          <div className="chapter__head">
            <Kicker num="02">Menus</Kicker>
            <Words className="h1">
              Choose <em>your spread.</em>
            </Words>
            <p className="muted" data-reveal="">
              Delivery minimum is 50 people. For smaller groups, ask us for a proposal. Plastic ware, utensils, napkins and
              condiments are included.
            </p>
          </div>
          <ol className="index">
            {OPTIONS.map((o, k) => (
              <li key={o.name} data-reveal="" style={{ ['--d' as string]: k * 80 }}>
                <div className="index__row" style={{ cursor: 'default' }}>
                  <span className="index__n">{String(k + 1).padStart(2, '0')}</span>
                  <span className="index__title" style={{ fontSize: 'clamp(1.7rem, 3.2vw, 3rem)' }}>
                    {o.name}
                  </span>
                  <span className="index__text muted">{o.items}</span>
                  <span className="index__meta label">{o.style}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section tone-dark">
        <div className="wrap split">
          <div className="split__media">
            <div className="frame graded" data-reveal="clip">
              <Img name="cobbler-ice-cream" alt="Homemade cobbler with ice cream" sizes="(min-width: 900px) 50vw, 100vw" />
            </div>
          </div>
          <div className="split__copy">
            <Kicker num="03">Add-ons</Kicker>
            <Words className="h2">
              Save room <em>for cobbler.</em>
            </Words>
            <ul className="ticks" data-reveal="">
              <li>Homemade fruit cobbler, full (20–25 servings) or half</li>
              <li>From-scratch 9-inch pies: chocolate peanut butter, peanut butter or coconut cream (pumpkin in November)</li>
              <li>Gallons of tea or lemonade</li>
              <li>Extra sides: sweet potatoes, chicken &amp; dumplings, corn</li>
              <li>Table linens, classic ware and silverware, racks and sternos</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section tone-ivory">
        <div className="wrap cols cols--3">
          <div className="panel" data-reveal="">
            <span className="label">Drop-off or full service</span>
            <p>
              Drop-off deliveries carry no service charge. For full-service events our staff stay to keep the buffet replenished,
              clean and hot, and clear tables; an 18% service charge applies and goes to the serving staff.
            </p>
          </div>
          <div className="panel" data-reveal="" style={{ ['--d' as string]: 100 }}>
            <span className="label">Booking</span>
            <p>A deposit secures your date. Sales tax applies. If your venue charges a caterer’s fee, that is the host’s responsibility.</p>
          </div>
          <div className="panel" data-reveal="" style={{ ['--d' as string]: 200 }}>
            <span className="label">Smaller order?</span>
            <p>
              Joe’s To Go group dinners feed 50 or 100 people, and family dinners run from 8 to 32 pieces.{' '}
              <TLink to="/menu#carryout" className="text-link">
                See the To Go menu
              </TLink>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="section tone-paper" id="catering-inquiry">
        <div className="wrap grid contact__grid">
          <div className="contact__copy">
            <Kicker num="04">Request catering</Kicker>
            <Words className="h1">
              Tell us <em>about your event.</em>
            </Words>
            <p className="muted" data-reveal="">
              Include the date, location and number of guests. To order by phone, call {SITE.phone}.
            </p>
            <ul className="contact__lines">
              <li>
                <span className="label">{CONTACTS.sales.role}</span>
                <span className="h4">{CONTACTS.sales.name}</span>
                <a href={`mailto:${CONTACTS.sales.email}`} style={{ fontSize: '1rem', fontFamily: 'var(--font-sans)' }}>
                  {CONTACTS.sales.email}
                </a>
              </li>
            </ul>
          </div>
          <div className="contact__form">
            <InquiryForm defaultType="catering" id="catering-form" />
          </div>
        </div>
      </section>
    </>
  );
}
