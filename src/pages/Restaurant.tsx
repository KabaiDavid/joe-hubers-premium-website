import { Img } from '../components/Img';
import { Words } from '../components/Chrome';
import { CtaBand, Hours, Kicker, PageHero } from '../components/Blocks';
import { TLink } from '../components/TLink';
import { Arrow, ArrowUpRight } from '../components/Icons';
import { COUNTRY_PLATTER, SIGNATURE_DISHES } from '../data/menu';
import { SITE } from '../data/site';

export default function Restaurant() {
  return (
    <>
      <PageHero
        kicker="The Restaurant · Since July 1983"
        title={
          <>
            Supper the way <em>Mary made it.</em>
          </>
        }
        intro="Country fried chicken, Huber honey ham, our famous fried biscuits with apple butter and chicken & dumplings, served family style."
        image="country-platter"
        alt="Fried chicken, honey ham, corn, green beans and slaw on a table at Joe Huber's"
        caption="The Country Platter"
      >
        <div className="btn-row">
          <TLink to="/menu" className="btn btn--brass">
            View the menu <Arrow />
          </TLink>
          <a href={SITE.phoneHref} className="btn btn--ghost">
            Reserve: {SITE.phone}
          </a>
        </div>
      </PageHero>

      <section className="section tone-ivory">
        <div className="wrap">
          <Kicker num="01">How it began</Kicker>
          <p className="statement" data-reveal="">
            In the 1920s Mary Huber cooked three meals a day for the farm hands. <em>In 1983 the restaurant opened</em> to serve
            the same kind of food, and it still does.
          </p>
        </div>
      </section>

      <section className="section tone-dark">
        <div className="wrap split">
          <div className="split__media">
            <div className="frame graded" data-reveal="clip">
              <Img name="entrance-sign" alt="The stone Joe Huber's Family Farm & Restaurant sign at the entrance" sizes="(min-width: 900px) 50vw, 100vw" />
            </div>
          </div>
          <div className="split__copy">
            <Kicker num="02">Family style</Kicker>
            <Words className="h2">
              All you can eat, <em>passed around the table.</em>
            </Words>
            <p className="lead muted" data-reveal="">
              {COUNTRY_PLATTER.name}: {COUNTRY_PLATTER.includes.join(', ').toLowerCase()}.
            </p>
            <div className="price-note" data-reveal="">
              <div>
                <span className="label">Adults</span>
                <strong>{COUNTRY_PLATTER.adult}</strong>
              </div>
              <div>
                <span className="label">{COUNTRY_PLATTER.childAges}</span>
                <strong>{COUNTRY_PLATTER.child}</strong>
              </div>
            </div>
            <p className="small muted" data-reveal="">
              Prefer to order your own plate? Country-style suppers come with all-you-can-eat family-style sides. 18% gratuity is
              added for parties of 8 or more.
            </p>
          </div>
        </div>
      </section>

      <section className="section tone-ivory">
        <div className="wrap">
          <div className="chapter__head">
            <Kicker num="03">Signature dishes</Kicker>
            <Words className="h1">
              What people <em>drive out for.</em>
            </Words>
          </div>
          <ol className="dishes" style={{ maxWidth: 900 }}>
            {SIGNATURE_DISHES.map((d, k) => (
              <li key={d.name} className="dish" data-reveal="" style={{ ['--d' as string]: k * 70 }}>
                <span className="dish__n">{String(k + 1).padStart(2, '0')}</span>
                <h3 className="dish__name">{d.name}</h3>
                <p className="dish__line muted">{d.line}</p>
              </li>
            ))}
          </ol>
          <div className="mosaic mosaic--3" style={{ marginTop: '4rem' }}>
            <div className="frame graded zoom" data-reveal="clip">
              <Img name="cobbler-ice-cream" alt="Homemade cobbler with vanilla ice cream" sizes="(min-width: 900px) 33vw, 50vw" />
            </div>
            <div className="frame graded zoom" data-reveal="clip" style={{ ['--d' as string]: 120 }}>
              <Img name="chicken-salad" alt="Country fried chicken salad" sizes="(min-width: 900px) 33vw, 50vw" />
            </div>
            <div className="frame graded zoom" data-reveal="clip" style={{ ['--d' as string]: 240 }}>
              <Img name="lakeside-cocktail" alt="A cocktail on a table overlooking the lake" sizes="(min-width: 900px) 33vw, 100vw" position="50% 60%" />
            </div>
          </div>
        </div>
      </section>

      <section className="section tone-paper">
        <div className="wrap split split--rev">
          <div className="split__media">
            <div className="frame graded" data-reveal="clip">
              <Img name="barnyard-wagon" alt="Children on a wagon in front of the red Barnyard barn" sizes="(min-width: 900px) 50vw, 100vw" />
            </div>
          </div>
          <div className="split__copy">
            <Kicker num="04">Joe’s To Go &amp; the kids</Kicker>
            <Words className="h2">
              Take it home, <em>or out to the lake.</em>
            </Words>
            <p className="lead" data-reveal="">
              Order online and pick up, or call ahead and we’ll have it ready. Family chicken dinners run from 8 to 32 pieces.
              Kids meals are $7.99 for ages 4–11, and the Barnyard next door is free.
            </p>
            <div className="btn-row" data-reveal="">
              <a href={SITE.orderOnline} className="btn" target="_blank" rel="noopener">
                Order online <ArrowUpRight />
              </a>
              <TLink to="/menu#carryout" className="link">
                To Go menu <Arrow />
              </TLink>
              <TLink to="/menu#kids" className="link">
                Kids menu <Arrow />
              </TLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section tone-ivory">
        <div className="wrap cols cols--2">
          <div>
            <Kicker num="05">Hours</Kicker>
            <Hours />
          </div>
          <div className="panel">
            <span className="label">Reservations</span>
            <p className="h2" style={{ marginBottom: '1rem' }}>
              <a href={SITE.phoneHref}>{SITE.phone}</a>
            </p>
            <p className="muted">We take dining reservations by phone.</p>
          </div>
        </div>
      </section>

      <CtaBand
        kicker="Something to celebrate?"
        title={
          <>
            Private rooms, <em>big tables.</em>
          </>
        }
      >
        <TLink to="/events" className="btn btn--brass">
          Events &amp; parties <Arrow />
        </TLink>
        <TLink to="/weddings" className="btn btn--ghost">
          Weddings
        </TLink>
      </CtaBand>
    </>
  );
}
