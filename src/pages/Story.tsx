import { Img } from '../components/Img';
import { Words } from '../components/Chrome';
import { CtaBand, Kicker, PageHero } from '../components/Blocks';
import { TLink } from '../components/TLink';
import { Arrow } from '../components/Icons';
import { TIMELINE } from '../data/story';

const ALTS: Record<string, string> = {
  'archive-1': 'Archival black-and-white photograph of a Huber farmer in a field with a tractor behind him',
  'archive-2': 'Archival newspaper photograph of men planting in a field',
  'archive-3': 'Archival newspaper clipping of a Huber woman preparing food',
  'archive-4': 'Newspaper clipping: “Midwest Living highlights Huber’s”',
  'archive-5-1': 'Newspaper clipping: “Hubers’ success due to good records, willingness to change”',
  'archive-6': 'Newspaper clipping about the Huber restaurant as the crowning touch to a family business',
  'archive-7': 'Portrait of Joe Huber III',
  'archive-8': 'The stone Joe Huber’s Family Farm & Restaurant entrance sign',
};

export default function Story() {
  return (
    <>
      <PageHero
        kicker="Our story · Starlight, Indiana"
        title={
          <>
            Eight generations, <em>one table.</em>
          </>
        }
        intro="A stroll down memory lane: how a family from Baden-Baden became Joe Huber’s Family Farm & Restaurant."
        image="barn-tractor-lane"
        alt="A vintage red tractor on the lane in front of the red barn and silo"
        caption="The lane by the barn"
      />

      <section className="section tone-ivory">
        <div className="wrap">
          <Kicker num="01">A family history</Kicker>
          <p className="statement" data-reveal="">
            Simon Huber arrived with apple trees ready to plant. <em>The eighth generation of Hubers</em> now lives in Starlight.
          </p>
        </div>
      </section>

      <section className="tone-cream">
        <div className="wrap timeline">
          {TIMELINE.map((t) => (
            <article className="era" key={t.year}>
              <p className="era__year" aria-hidden="true" data-reveal="">
                {t.year}
              </p>
              <div className="era__copy">
                <p className="label accent" data-reveal="">
                  {t.year}
                </p>
                <h2 className="h2" data-reveal="">
                  {t.title}
                </h2>
                <p className="lead" data-reveal="">
                  {t.text}
                </p>
              </div>
              <figure className={`era__img ${t.year === 'Today' ? '' : 'archival'}`} style={{ margin: 0 }} data-reveal="">
                <div className="frame">
                  <Img name={t.image} alt={ALTS[t.image]} sizes="(min-width: 900px) 25vw, 90vw" />
                </div>
              </figure>
            </article>
          ))}
        </div>
      </section>

      <section className="section tone-dark">
        <div className="wrap split">
          <div className="split__media">
            <div className="frame graded" data-reveal="clip">
              <Img name="family-berries" alt="Three generations of a family with boxes of freshly picked berries" sizes="(min-width: 900px) 50vw, 100vw" />
            </div>
          </div>
          <div className="split__copy">
            <Kicker num="02">Dream big. Work hard.</Kicker>
            <Words className="h2">
              Still going strong, <em>thanks to you.</em>
            </Words>
            <p className="lead muted" data-reveal="">
              The Huber family still grows a wide variety of fruits and vegetables, with modern technology and plenty of help from our
              customers. Thank you for being part of it.
            </p>
            <div className="btn-row" data-reveal="">
              <TLink to="/farm" className="btn btn--light">
                Visit the farm <Arrow />
              </TLink>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        kicker="Come see for yourself"
        title={
          <>
            Chicken & dumplings, <em>still on the table.</em>
          </>
        }
      >
        <TLink to="/menu" className="btn btn--brass">
          View the menu <Arrow />
        </TLink>
        <TLink to="/contact" className="btn btn--ghost">
          Plan your visit
        </TLink>
      </CtaBand>
    </>
  );
}
