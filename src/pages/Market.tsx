import { Img } from '../components/Img';
import { Words } from '../components/Chrome';
import { CtaBand, Kicker, PageHero } from '../components/Blocks';
import { TLink } from '../components/TLink';
import { Arrow, ArrowUpRight } from '../components/Icons';
import { SITE } from '../data/site';

const SHELF = [
  {
    t: 'Jarred goods',
    d: 'Homemade jams, jellies, pickles, relishes, sauces and more, prepared in small batches with the same care as our home kitchen.',
  },
  { t: 'Homemade fudge', d: 'Handcrafted fudge in classic flavors and seasonal specialties, made with premium ingredients.' },
  { t: 'Baked goods', d: 'Fresh-baked cookies, breads, pies and pastries, sweet and savory, the way they’re meant to be.' },
  { t: 'Seasonal produce', d: 'Garden-fresh vegetables and handpicked fruit, harvested at peak ripeness. Selections change through the year.' },
];

export default function Market() {
  return (
    <>
      <PageHero
        kicker="Joe Huber’s Farm Market"
        title={
          <>
            Made and grown <em>right here.</em>
          </>
        }
        intro="A family-run market of products made and grown on our farm, crafted with care, quality and a whole lot of heart."
        image="family-berries"
        alt="A family sitting with boxes of freshly picked berries"
        caption="Fresh-picked berries"
      >
        <div className="btn-row">
          <a href={SITE.shop} className="btn btn--brass" target="_blank" rel="noopener">
            Shop online <ArrowUpRight />
          </a>
        </div>
      </PageHero>

      <section className="section tone-ivory">
        <div className="wrap">
          <Kicker num="01">From the garage to the market</Kicker>
          <p className="statement" data-reveal="">
            In the 1970s the garage beside the farmhouse became a market. <em>The Farm Market was built soon after.</em>
          </p>
        </div>
      </section>

      <section className="section tone-cream">
        <div className="wrap">
          <div className="chapter__head">
            <Kicker num="02">On the shelves</Kicker>
            <Words className="h1">
              Take a little <em>of the farm home.</em>
            </Words>
          </div>
          <ol className="shelf">
            {SHELF.map(({ t, d }, k) => (
              <li key={t} data-reveal="" style={{ ['--d' as string]: k * 90 }}>
                <span className="shelf__n">{String(k + 1).padStart(2, '0')}</span>
                <h3 className="h3">{t}</h3>
                <p className="muted small">{d}</p>
              </li>
            ))}
          </ol>
          <div className="mosaic" style={{ marginTop: '3rem' }}>
            <div className="frame wide graded zoom" data-reveal="clip">
              <Img name="kids-hay-bales" alt="Children on hay bales among pumpkins and gourds" sizes="(min-width: 900px) 50vw, 100vw" />
            </div>
            <div className="frame tall graded zoom" data-reveal="clip" style={{ ['--d' as string]: 120 }}>
              <Img name="pumpkin-crate" alt="A crate of pumpkins" sizes="(min-width: 900px) 25vw, 50vw" />
            </div>
            <div className="frame graded zoom" data-reveal="clip" style={{ ['--d' as string]: 240 }}>
              <Img name="girl-candy-apple" alt="A girl with a caramel apple" sizes="(min-width: 900px) 25vw, 50vw" />
            </div>
            <div className="frame wide graded zoom" data-reveal="clip" style={{ ['--d' as string]: 360 }}>
              <Img name="fall-in-love-apples" alt="Caramel apples beneath a “Fall in Love” sign" sizes="(min-width: 900px) 50vw, 100vw" position="50% 70%" />
            </div>
          </div>
        </div>
      </section>

      <section className="section tone-dark">
        <div className="wrap split">
          <div className="split__copy">
            <Kicker num="03">Can’t make the drive?</Kicker>
            <Words className="h2">
              Shop the market <em>online.</em>
            </Words>
            <p className="lead muted" data-reveal="">
              Browse the Joe Huber’s online shop and have a little of the farm sent your way.
            </p>
            <div className="btn-row" data-reveal="">
              <a href={SITE.shop} className="btn btn--brass" target="_blank" rel="noopener">
                shop.joehubers.com <ArrowUpRight />
              </a>
            </div>
          </div>
          <div className="split__media panel">
            <span className="label">Visit the market</span>
            <address className="h3" style={{ marginBottom: '1rem' }}>
              {SITE.address.street}
              <br />
              {SITE.address.city}, Indiana {SITE.address.postal}
            </address>
            <p className="muted">
              Market hours follow the season. Please call{' '}
              <a className="text-link" href={SITE.phoneHref}>
                {SITE.phone}
              </a>{' '}
              before you make the trip.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        kicker="While you’re here"
        title={
          <>
            Then stay <em>for supper.</em>
          </>
        }
      >
        <TLink to="/menu" className="btn btn--brass">
          View the menu <Arrow />
        </TLink>
        <TLink to="/farm" className="btn btn--ghost">
          The farm &amp; barnyard
        </TLink>
      </CtaBand>
    </>
  );
}
