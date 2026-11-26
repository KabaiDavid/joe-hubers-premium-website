import { Img } from '../components/Img';
import { Words } from '../components/Chrome';
import { CtaBand, GalleryStrip, Hours, Kicker, PageHero } from '../components/Blocks';
import { TLink } from '../components/TLink';
import { Arrow, ArrowUpRight } from '../components/Icons';
import { HOURS, SITE } from '../data/site';

export default function Farm() {
  return (
    <>
      <PageHero
        kicker="The Farm & Barnyard"
        title={
          <>
            Come early. <em>Stay for supper.</em>
          </>
        }
        intro="A red barn, a lake, open fields and a barnyard where admission is always free."
        image="red-barn-silo"
        alt="The red Barnyard barn and white silo behind a rail fence"
        caption="The Barnyard, Starlight"
      >
        <div className="btn-row">
          <a href="#barnyard" className="btn btn--brass">
            The Barnyard <Arrow />
          </a>
          <a href={SITE.mapsUrl} className="btn btn--ghost" target="_blank" rel="noopener">
            Directions <ArrowUpRight />
          </a>
        </div>
      </PageHero>

      <section className="section tone-ivory">
        <div className="wrap">
          <Kicker num="01">A working family farm</Kicker>
          <p className="statement" data-reveal="">
            It began with a field of green beans in 1967. <em>People came by the carload</em> to pick their own, and they’ve been
            coming ever since.
          </p>
        </div>
      </section>

      <section id="barnyard" className="section tone-cream">
        <div className="wrap split">
          <div className="split__media">
            <div className="mosaic">
              <div className="frame tall graded" data-reveal="clip">
                <Img name="tunnel-slide" alt="A child coming out of the tunnel slide next to the red barn" sizes="(min-width: 900px) 25vw, 50vw" />
              </div>
              <div className="frame graded" data-reveal="clip" style={{ ['--d' as string]: 120 }}>
                <Img name="kids-farm-dog" alt="Children petting a farm dog" sizes="(min-width: 900px) 25vw, 50vw" />
              </div>
              <div className="frame graded" data-reveal="clip" style={{ ['--d' as string]: 240 }}>
                <Img name="ice-cream" alt="Children eating ice cream cones" sizes="(min-width: 900px) 25vw, 50vw" />
              </div>
            </div>
          </div>
          <div className="split__copy">
            <Kicker num="02">The Barnyard</Kicker>
            <Words className="h1">
              Free to play <em>in the barnyard.</em>
            </Words>
            <ul className="attractions" style={{ marginTop: '2rem' }}>
              {[
                ['40-foot barnyard tunnel slide', 'Down from the big red barn.'],
                ['The Treetop Bus Stop', 'Slides and a treehouse.'],
                ['Mini farm animals', 'Small friends to meet and greet.'],
                ['Fish & turtle feeding', 'By the lake. Fish and turtle food is $1 a bag.'],
              ].map(([t, d], k) => (
                <li key={t} data-reveal="" style={{ ['--d' as string]: k * 80 }}>
                  <span className="attractions__n">{String(k + 1).padStart(2, '0')}</span>
                  <span>
                    <strong>{t}</strong>
                    <span className="muted">{d}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="price-note" data-reveal="">
              <div>
                <span className="label">Admission</span>
                <strong>Free</strong>
              </div>
              <div>
                <span className="label">Hours</span>
                <strong style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)' }}>Same as the restaurant</strong>
              </div>
            </div>
            <p className="small muted" data-reveal="">
              Kids must be with an adult. {HOURS.barnyard}
            </p>
          </div>
        </div>
      </section>

      <section className="section tone-dark">
        <div className="wrap split split--rev">
          <div className="split__media">
            <div className="frame graded" data-reveal="clip" style={{ aspectRatio: '3 / 2' }}>
              <Img name="barrel-train" alt="Children riding the barrel train" sizes="(min-width: 900px) 50vw, 100vw" />
            </div>
          </div>
          <div className="split__copy">
            <Kicker num="03">A picnic by the lake</Kicker>
            <Words className="h2">
              Grab Joe’s To Go <em>and find a table by the water.</em>
            </Words>
            <p className="lead muted" data-reveal="">
              Order online and pick up a chicken dinner, then picnic at the covered lakeside pavilion while the kids play.
            </p>
            <div className="btn-row" data-reveal="">
              <a href={SITE.orderOnline} className="btn btn--brass" target="_blank" rel="noopener">
                Order Joe’s To Go online <ArrowUpRight />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section tone-ivory">
        <div className="wrap">
          <div className="chapter__head">
            <Kicker num="04">Seasons on the farm</Kicker>
            <Words className="h1">
              Fall is <em>pumpkin season.</em>
            </Words>
            <p className="muted" data-reveal="">
              In September and October, school field trips ride a wagon out to the pumpkin patch, pick a pumpkin each and find
              their way through the corn maze. Through the year the Farm Market fills with whatever is ready in the fields.
            </p>
          </div>
        </div>
        <GalleryStrip
          shots={[
            { name: 'kids-hay-bales', alt: 'Two children on hay bales among pumpkins', caption: 'Hay bales and pumpkins', shape: 'wide' },
            { name: 'pumpkin-crate', alt: 'A child reaching into a crate of pumpkins', caption: 'Picking a pumpkin', shape: 'tall' },
            { name: 'girl-candy-apple', alt: 'A girl biting into a caramel apple', caption: 'Caramel apples', shape: 'wide' },
            { name: 'lawn-egg-hunt', alt: 'Children with Easter baskets on the lawn', caption: 'Egg hunt on the lawn', shape: 'square' },
            { name: 'antique-tractors', alt: 'Antique tractors on display', caption: 'Old iron', shape: 'wide' },
            { name: 'barn-tractor-lane', alt: 'A red tractor on the lane by the barn', caption: 'The lane by the barn', shape: 'wide' },
          ]}
        />
      </section>

      <section className="section tone-paper">
        <div className="wrap cols cols--2">
          <div>
            <Kicker num="05">Plan your visit</Kicker>
            <Hours />
          </div>
          <div className="panel">
            <span className="label">Birthday parties</span>
            <p className="h3" style={{ marginBottom: '1rem' }}>
              Book the outdoor pavilion and let the Barnyard do the entertaining.
            </p>
            <TLink to="/events#birthdays" className="link">
              Birthday packages <Arrow />
            </TLink>
          </div>
        </div>
      </section>

      <CtaBand
        kicker="Hungry yet?"
        title={
          <>
            Supper is <em>right next door.</em>
          </>
        }
      >
        <TLink to="/menu" className="btn btn--brass">
          View the menu <Arrow />
        </TLink>
        <TLink to="/market" className="btn btn--ghost">
          The Farm Market
        </TLink>
      </CtaBand>
    </>
  );
}
