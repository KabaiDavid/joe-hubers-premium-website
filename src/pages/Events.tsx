import { Img } from '../components/Img';
import { Words } from '../components/Chrome';
import { InquiryForm, Kicker, PageHero } from '../components/Blocks';
import { Arrow } from '../components/Icons';
import { CONTACTS, SITE } from '../data/site';

const BUFFET =
  'Country fried chicken and Huber honey ham, country-style slaw, fresh vegetables, potatoes, fried biscuits with apple butter and honey, and homemade chicken & dumplings, with fresh fruit cobblers and ice cream for dessert.';

export default function Events() {
  return (
    <>
      <PageHero
        kicker="Special events"
        title={
          <>
            Room for the <em>whole crowd.</em>
          </>
        }
        intro="Company picnics, birthday parties, school field trips and business lunches on the farm. Groups of any size are welcome."
        image="barn-one"
        alt="The white doors of Joe Huber's Barn 1 event building"
        position="50% 35%"
        caption="Barn 1"
      >
        <div className="btn-row">
          <a href="#event-inquiry" className="btn btn--brass">
            Start an inquiry <Arrow />
          </a>
        </div>
      </PageHero>

      <nav className="tone-paper" aria-label="Event types">
        <div className="wrap">
          <ul className="menu-tabs__list" style={{ justifyContent: 'flex-start' }}>
            {[
              ['picnics', 'Company picnics'],
              ['birthdays', 'Birthday parties'],
              ['field-trips', 'Field trips'],
              ['power-lunch', 'Power Lunch'],
            ].map(([id, l]) => (
              <li key={id}>
                <a href={`#${id}`} className="label" style={{ display: 'block', padding: '1.2rem 0' }}>
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <section className="section tone-ivory">
        <div className="wrap">
          <Kicker num="01">The buffet</Kicker>
          <p className="statement" data-reveal="">
            Every gathering starts with <em>the all-you-can-eat country buffet.</em>
          </p>
          <p className="lead muted" data-reveal="" style={{ maxWidth: '52ch', marginTop: '1.6rem' }}>
            {BUFFET}
          </p>
        </div>
      </section>

      <div className="tone-cream">
        <div className="wrap">
          {/* Company picnics */}
          <section id="picnics" className="chapter">
            <div className="split">
              <div className="split__media">
                <div className="frame graded" data-reveal="clip">
                  <Img name="hall-banquet" alt="A large banquet hall set with long tables" sizes="(min-width: 900px) 50vw, 100vw" />
                </div>
              </div>
              <div className="split__copy">
                <Kicker num="02">Company picnics &amp; private events</Kicker>
                <Words className="h2">
                  Four hours, <em>all to yourselves.</em>
                </Words>
                <p className="lead" data-reveal="">
                  Volleyball on the sand courts, basketball, corn hole and fishing in the stocked pond, with the country buffet
                  served buffet style.
                </p>
                <div className="panel" data-reveal="">
                  <span className="label">Included</span>
                  <ul className="ticks ticks--2">
                    <li>Country Platter dinner, buffet style</li>
                    <li>Unlimited soft drinks, tea &amp; coffee</li>
                    <li>Private facility for 4 hours</li>
                    <li>Basketball, volleyball &amp; corn hole</li>
                    <li>Fishing (bring your own bait and pole)</li>
                    <li>Table decor</li>
                    <li>Set-up &amp; clean-up</li>
                    <li>Large indoor stage, microphone, podium &amp; TV</li>
                  </ul>
                </div>
                <div className="panel" data-reveal="" style={{ marginTop: '1.6rem' }}>
                  <span className="label">Add on</span>
                  <p className="muted small" style={{ margin: 0 }}>
                    Barnyard activities, inflatables, pony rides, wagon rides, bonfire &amp; s’mores, an ice cream social, a DJ, a cash
                    or host bar, gift cards, Joe Huber “Bucks”, gift baskets, and pumpkin and corn maze passes in season.
                  </p>
                </div>
                <p className="small muted" data-reveal="" style={{ marginTop: '1.4rem' }}>
                  Choose 11 AM–3 PM or 5–9 PM; extra time can be added. A $1,000 non-refundable deposit secures your date.
                </p>
              </div>
            </div>
          </section>

          {/* Birthdays */}
          <section id="birthdays" className="chapter">
            <div className="split split--rev">
              <div className="split__media">
                <div className="frame graded" data-reveal="clip">
                  <Img name="ice-cream" alt="Kids eating ice cream cones at a party" sizes="(min-width: 900px) 50vw, 100vw" />
                </div>
              </div>
              <div className="split__copy">
                <Kicker num="03">Birthday parties</Kicker>
                <Words className="h2">
                  Cake, a pavilion <em>and a 40-foot slide.</em>
                </Words>
                <div className="price-note" data-reveal="">
                  <div>
                    <span className="label">Private outdoor pavilion</span>
                    <strong>$150</strong>
                  </div>
                  <div>
                    <span className="label">Barnyard activities</span>
                    <strong>Free</strong>
                  </div>
                </div>
                <ul className="ticks" data-reveal="">
                  <li>40-foot tunnel slide, play set, basketball, sand volleyball and swings</li>
                  <li>Meals from the Joe’s To Go menu</li>
                  <li>The Soda Pop Shoppe for a sweet treat, and the Candy Store &amp; Gift Shop</li>
                  <li>Feed the fish and turtles at the Turtle Pond ($1 a bag)</li>
                  <li>Bring your own balloons, decorations and birthday cake</li>
                </ul>
                <p className="small muted" data-reveal="" style={{ marginTop: '1.4rem' }}>
                  No outside food or drinks, please; everything is ordered from Joe’s Carry-Out. Reservations required: call{' '}
                  <a className="text-link" href={SITE.phoneHref}>
                    {SITE.phone}
                  </a>
                  .
                </p>
              </div>
            </div>
          </section>

          {/* Field trips */}
          <section id="field-trips" className="chapter">
            <div className="split">
              <div className="split__media">
                <div className="frame graded" data-reveal="clip">
                  <Img name="pumpkin-crate" alt="A child choosing a pumpkin from a wooden crate" sizes="(min-width: 900px) 50vw, 100vw" />
                </div>
              </div>
              <div className="split__copy">
                <Kicker num="04">School field trips</Kicker>
                <Words className="h2">
                  A hands-on lesson <em>in farming &amp; nutrition.</em>
                </Words>
                <p className="lead" data-reveal="">
                  The Fall Field Trip &amp; Lunch runs Monday to Friday in September and October, and meets several Kentucky and
                  Indiana core standards.
                </p>
                <ul className="ticks" data-reveal="">
                  <li>Wagon ride to the pumpkin patch, with a U-pick pumpkin for every child</li>
                  <li>An educational talk, a teacher itinerary and a Q&amp;A sheet for students</li>
                  <li>Barnyard admission: tunnel slide, tetherball, basketball, volleyball, play set and swings</li>
                  <li>Admission to the corn maze</li>
                  <li>Lunch buffet: fried chicken, chicken &amp; dumplings, green beans, fried biscuits with apple butter, Waldorf salad and a drink</li>
                </ul>
                <div className="price-note" data-reveal="">
                  <div>
                    <span className="label">Per child (20+)</span>
                    <strong>$15</strong>
                  </div>
                  <div>
                    <span className="label">Per adult</span>
                    <strong>$20</strong>
                  </div>
                  <div>
                    <span className="label">Without lunch</span>
                    <strong>$10</strong>
                  </div>
                </div>
                <p className="small muted" data-reveal="">
                  One teacher free per 20 students (20-student minimum). Add vanilla ice cream for $3 per person, or fish &amp; turtle
                  food for $1 a bag, when you book. Groups without lunch may bring sack lunches to eat at a pavilion or the barnyard.
                </p>
              </div>
            </div>
          </section>

          {/* Power lunch */}
          <section id="power-lunch" className="chapter">
            <div className="split split--rev">
              <div className="split__media">
                <div className="frame graded" data-reveal="clip">
                  <Img name="hall-chandeliers" alt="A banquet hall with chandeliers set with round tables" sizes="(min-width: 900px) 50vw, 100vw" />
                </div>
              </div>
              <div className="split__copy">
                <Kicker num="05">Power Lunch meetings</Kicker>
                <Words className="h2">
                  Strategy, <em>with a side of dumplings.</em>
                </Words>
                <p className="lead" data-reveal="">
                  Take the team out of the office for fresh air and new ideas: the Country Platter served buffet style, with a
                  private meeting facility.
                </p>
                <ul className="ticks" data-reveal="">
                  <li>Minimum 50 guests, Monday to Thursday</li>
                  <li>Smaller groups are seated in the main dining room; call for pricing</li>
                  <li>For a fee: continental breakfast, afternoon snack break, and an audio package with microphone, screen, projector and podium</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>

      <section className="section tone-paper" id="event-inquiry">
        <div className="wrap grid contact__grid">
          <div className="contact__copy">
            <Kicker num="06">Inquire</Kicker>
            <Words className="h1">
              Let’s plan <em>your day.</em>
            </Words>
            <p className="muted" data-reveal="">
              Tell us the type of event, your preferred date and an estimated guest count.
            </p>
            <ul className="contact__lines">
              <li>
                <span className="label">{CONTACTS.sales.role}</span>
                <span className="h4">{CONTACTS.sales.name}</span>
                <a href={`mailto:${CONTACTS.sales.email}`} style={{ fontSize: '1rem', fontFamily: 'var(--font-sans)' }}>
                  {CONTACTS.sales.email}
                </a>
              </li>
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
            <InquiryForm defaultType="private-event" id="events-form" />
          </div>
        </div>
      </section>
    </>
  );
}
