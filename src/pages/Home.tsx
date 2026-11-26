import { useEffect, useRef, useState } from 'react';
import { Img } from '../components/Img';
import { TLink } from '../components/TLink';
import { Arrow, ArrowUpRight } from '../components/Icons';
import { OpenStatus, Words } from '../components/Chrome';
import { GalleryStrip, Hours, InquiryForm, Kicker, MapEmbed, MenuPreview, Mileage, type Shot } from '../components/Blocks';
import { CONTACTS, SITE } from '../data/site';
import { COUNTRY_PLATTER, SIGNATURE_DISHES } from '../data/menu';
import { prefersReducedMotion } from '../lib/motion';

/* ======================================================================
   01 · Hero
   ====================================================================== */
const SLIDES = [
  { name: 'tractor-golden-hour', alt: 'A red Farmall tractor in golden evening light on the Huber farm', caption: 'Golden hour, Starlight, Indiana', pos: '50% 40%' },
  { name: 'red-barn-silo', alt: 'The red Barnyard barn and white silo behind a white rail fence', caption: 'The Barnyard', pos: '50% 55%' },
  { name: 'ceremony-autumn', alt: 'An outdoor wedding ceremony framed by autumn trees', caption: 'An autumn ceremony on the farm', pos: '50% 60%' },
  { name: 'kids-hay-bales', alt: 'Two children eating on hay bales among pumpkins', caption: 'Fall on the farm', pos: '50% 35%' },
];
const SLIDE_MS = 7000;

function Hero() {
  const [i, setI] = useState(0);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);

  // Load the other slides only after the first one has had the stage.
  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 2200);
    if (prefersReducedMotion()) setPaused(true);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!ready || paused) return;
    const t = window.setInterval(() => {
      if (!document.hidden) setI((n) => (n + 1) % SLIDES.length);
    }, SLIDE_MS);
    return () => window.clearInterval(t);
  }, [ready, paused]);

  return (
    <section className="hero on-image" aria-label="Welcome">
      <div className="hero__media">
        {SLIDES.map((s, n) =>
          n === 0 || ready ? (
            <div key={s.name} className={`hero__slide${n === i ? ' is-active' : ''}`} aria-hidden={n !== i}>
              <Img name={s.name} alt={s.alt} priority={n === 0} sizes="100vw" position={s.pos} />
            </div>
          ) : null,
        )}
      </div>

      <div className="wrap hero__inner">
        <div className="hero__copy">
          <p className="kicker hero-in" style={{ ['--h' as string]: 0 }}>
            Starlight, Indiana · On the farm since 1926
          </p>
          <h1 className="mega hero-title">
            <span className="line"><span>Pull up a chair</span></span>
            <span className="line"><span><em>at the Huber table.</em></span></span>
          </h1>
          <p className="lead hero__statement hero-in" style={{ ['--h' as string]: 3 }}>
            Country fried chicken, Huber honey ham and our famous fried biscuits with apple butter, passed around the table on a
            family farm just over the Knobs, 22 miles from Louisville.
          </p>
          <div className="btn-row hero-in" style={{ ['--h' as string]: 4 }}>
            <TLink to="/menu" className="btn btn--brass">
              View the menu <Arrow />
            </TLink>
            <TLink to="/contact" className="btn btn--ghost">
              Plan your visit
            </TLink>
          </div>
        </div>

        <div className="hero__meta hero-in" style={{ ['--h' as string]: 5 }}>
          <OpenStatus />
          <a href={SITE.phoneHref} className="hero__phone">
            <span className="label">Reservations</span>
            {SITE.phone}
          </a>
          <div className="hero__slides">
            <div className="hero__count">
              <span>{String(i + 1).padStart(2, '0')}</span>
              <span className="hero__bar" aria-hidden="true">
                <span key={`${i}-${paused}`} className={paused || !ready ? '' : 'is-running'} style={{ animationDuration: `${SLIDE_MS}ms` }} />
              </span>
              <span>{String(SLIDES.length).padStart(2, '0')}</span>
              <button className="hero__pause" onClick={() => setPaused((p) => !p)} aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}>
                {paused ? (
                  <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true"><path d="M0 0l10 6-10 6z" fill="currentColor" /></svg>
                ) : (
                  <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true"><path d="M0 0h3v12H0zM7 0h3v12H7z" fill="currentColor" /></svg>
                )}
              </button>
            </div>
            <p className="caption hero__caption" aria-live="polite">
              <b>Fig. {i + 1}</b>
              {SLIDES[i].caption}
            </p>
          </div>
        </div>
      </div>
      <a href="#story" className="hero__scroll" aria-label="Scroll to our story">
        <span />
      </a>
    </section>
  );
}

/* ======================================================================
   02 · Brand story
   ====================================================================== */
function Pill({ name, alt }: { name: string; alt: string }) {
  return (
    <span className="pill" data-reveal="clip">
      <Img name={name} alt={alt} sizes="160px" />
    </span>
  );
}

function Story() {
  return (
    <section id="story" className="section tone-ivory story">
      <div className="wrap grid">
        <aside className="story__aside">
          <Kicker num="01">Our story</Kicker>
          <dl className="stats">
            {[
              ['1843', 'Hubers in Starlight'],
              ['8', 'Generations'],
              ['200', 'Acres, bought in 1967'],
              ['1983', 'The restaurant opens'],
            ].map(([n, l], k) => (
              <div key={l} data-reveal="" style={{ ['--d' as string]: k * 90 }}>
                <dt>{n}</dt>
                <dd className="label">{l}</dd>
              </div>
            ))}
          </dl>
        </aside>
        <div className="story__body">
          <p className="story__text" data-reveal="">
            In 1843 Simon Huber <Pill name="archive-1" alt="Archival photograph of a Huber farmer in the field" /> came to Starlight
            from Baden-Baden, Germany, with apple trees ready to plant. In 1926 Joseph and Mary bought this land, and Mary cooked
            three full meals a day for the farm hands <Pill name="red-barn-silo" alt="The red barn and silo on the Huber farm" />. In
            1967 a field of green beans and an ad in the paper brought people out to pick their own{' '}
            <Pill name="family-berries" alt="Three generations of a family with boxes of freshly picked berries" />, and in 1983 the
            restaurant opened to serve the food Mary made. <span className="accent italic">It still does.</span>
          </p>
          <TLink to="/our-story" className="link" data-reveal="">
            Read the family story <Arrow />
          </TLink>
        </div>
      </div>
    </section>
  );
}

/* ======================================================================
   03 · Restaurant experience
   ====================================================================== */
function Restaurant() {
  return (
    <section className="section tone-dark restaurant" id="restaurant">
      <div className="wrap grid restaurant__grid">
        <div className="restaurant__media">
          <div className="frame ratio-land graded restaurant__main" data-reveal="clip">
            <Img name="country-platter" alt="The Country Platter: fried chicken, honey ham, corn, green beans, slaw and mashed potatoes on the table" sizes="(min-width: 900px) 55vw, 100vw" />
          </div>
          <div className="frame ratio-tall graded restaurant__inset" data-reveal="clip" style={{ ['--d' as string]: 250 }} data-parallax="0.06">
            <Img name="lakeside-cocktail" alt="A Farmhouse lemonade cocktail on a table overlooking the lake" sizes="(min-width: 900px) 20vw, 40vw" />
          </div>
          <p className="caption restaurant__cap" data-reveal="fade">
            <b>Fig.</b>The Country Platter, served family style
          </p>
        </div>
        <div className="restaurant__copy">
          <Kicker num="02">The Restaurant</Kicker>
          <Words className="h2">
            Platters passed hand to hand, <em>until everyone’s full.</em>
          </Words>
          <p className="lead" data-reveal="">
            Everything is made from scratch. The Country Platter is all you can eat and served family style, so the whole table
            shares, just as the Huber family has for generations.
          </p>
          <ul className="platter-list" data-reveal="">
            {COUNTRY_PLATTER.includes.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <div className="price-tag" data-reveal="">
            <div>
              <span className="label">Adults</span>
              <span className="price-tag__n">{COUNTRY_PLATTER.adult}</span>
            </div>
            <div>
              <span className="label">Ages 4–11</span>
              <span className="price-tag__n">{COUNTRY_PLATTER.child}</span>
            </div>
          </div>
          <div className="btn-row" data-reveal="">
            <TLink to="/restaurant" className="btn btn--light">
              The dining room <Arrow />
            </TLink>
            <a href={SITE.phoneHref} className="btn btn--ghost">
              Call to reserve
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ======================================================================
   04 · Signature food
   ====================================================================== */
function Signature() {
  return (
    <section className="section tone-ivory signature">
      <div className="wrap grid">
        <div className="signature__head">
          <Kicker num="03">From Mary’s kitchen</Kicker>
          <Words className="display">
            The dishes <em>we’re known for.</em>
          </Words>
          <div className="frame signature__img graded" data-reveal="clip">
            <Img name="cobbler-ice-cream" alt="A bowl of homemade peach cobbler with two scoops of vanilla ice cream" sizes="(min-width: 900px) 40vw, 100vw" />
          </div>
          <p className="caption" data-reveal="fade">
            <b>Fig.</b>Homemade cobbler, with ice cream
          </p>
        </div>
        <ol className="dishes">
          {SIGNATURE_DISHES.map((d, k) => (
            <li key={d.name} className="dish" data-reveal="" style={{ ['--d' as string]: k * 70 }}>
              <span className="dish__n">{String(k + 1).padStart(2, '0')}</span>
              <h3 className="dish__name">{d.name}</h3>
              <p className="dish__line muted">{d.line}</p>
            </li>
          ))}
          <li className="dish dish--photo" data-reveal="">
            <div className="frame ratio-land graded">
              <Img name="chicken-salad" alt="Country fried chicken salad with cheddar, tomato, cucumber and croutons" sizes="(min-width: 900px) 40vw, 100vw" />
            </div>
            <p className="caption">
              <b>Fig.</b>Country fried chicken salad
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
}

/* ======================================================================
   05 · Menu
   ====================================================================== */
const MARQUEE = ['Country Fried Chicken', 'Huber Honey Ham', 'Fried Biscuits & Apple Butter', 'Chicken & Dumplings', 'Real Mashed Potatoes', 'Homemade Cobbler', 'Green Beans'];

function MenuSection() {
  return (
    <section className="section tone-paper menu-sec" id="menu">
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[0, 1].map((k) => (
            <span key={k}>
              {MARQUEE.map((m) => (
                <span key={m}>
                  {m} <i>✦</i>{' '}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
      <div className="wrap grid menu-sec__grid">
        <div className="menu-sec__copy">
          <Kicker num="04">Bill of fare</Kicker>
          <Words className="h2">
            Dine in, carry out, <em>or take a pie home.</em>
          </Words>
          <p className="muted" data-reveal="">
            Country-style suppers, sandwiches and Joe’s To Go family dinners, plus Huber Orchard wines and Farmhouse cocktails. Kids
            meals are $7.99 for ages 4–11.
          </p>
          <div className="btn-row" data-reveal="">
            <TLink to="/menu" className="btn">
              See the full menu <Arrow />
            </TLink>
            <a href={SITE.orderOnline} className="btn btn--ghost" target="_blank" rel="noopener">
              Order online <ArrowUpRight />
            </a>
          </div>
        </div>
        <MenuPreview />
      </div>
    </section>
  );
}

/* ======================================================================
   06 · Farm experience — scroll-driven story
   ====================================================================== */
const FARM_STEPS = [
  {
    image: 'red-barn-silo',
    alt: 'Red barn, white silo and rail fence under a blue sky',
    year: 'Since 1926',
    title: 'A working family farm',
    text: 'Joseph and Mary Huber bought this land in 1926. Their family still farms it today, growing a wide variety of fruits and vegetables alongside the restaurant.',
  },
  {
    image: 'family-berries',
    alt: 'A grandmother, mother and children sitting with boxes of berries',
    year: '1967',
    title: 'It started with green beans',
    text: 'A field too big to pick, an ad in the paper, and carloads of families who came to pick their own. The garage beside the farmhouse became the first market.',
  },
  {
    image: 'pumpkin-crate',
    alt: 'A child reaching into a wooden crate of pumpkins',
    year: 'September & October',
    title: 'Fall in the fields',
    text: 'School groups take a wagon ride out to the pumpkin patch, pick a pumpkin each and find their way through the corn maze.',
  },
  {
    image: 'barn-tractor-lane',
    alt: 'A vintage red tractor parked on the lane in front of the barn and silo',
    year: 'Every visit',
    title: 'Room to wander',
    text: 'A lake with a covered pavilion, a big red barn and open sky. Pick up Joe’s To Go and make an afternoon of it.',
  },
];

function Farm() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  // Active step = the last one whose top has passed the middle of the viewport.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const mid = window.innerHeight * 0.55;
      let idx = 0;
      refs.current.forEach((el, k) => {
        if (el && el.getBoundingClientRect().top < mid) idx = k;
      });
      setActive(idx);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section className="section tone-ink farm" id="farm">
      <div className="wrap">
        <div className="farm__head">
          <Kicker num="05">The Farm</Kicker>
          <Words className="display">
            More than a restaurant. <em>A family farm.</em>
          </Words>
        </div>
        <div className="farm__grid">
          <div className="farm__stage" aria-hidden="true">
            <div className="farm__sticky">
              {FARM_STEPS.map((s, k) => (
                <div key={s.image} className={`farm__frame${k === active ? ' is-active' : ''}`}>
                  <Img name={s.image} alt="" sizes="(min-width: 900px) 55vw, 1px" />
                </div>
              ))}
              <div className="farm__progress">
                {FARM_STEPS.map((s, k) => (
                  <span key={s.image} className={k === active ? 'is-active' : ''} />
                ))}
              </div>
            </div>
          </div>
          <div className="farm__steps">
            {FARM_STEPS.map((s, k) => (
              <article
                key={s.title}
                className={`farm__step${k === active ? ' is-active' : ''}`}
                data-step={k}
                ref={(el) => {
                  refs.current[k] = el;
                }}
              >
                <div className="frame ratio-land farm__mobile-img graded">
                  <Img name={s.image} alt={s.alt} sizes="(min-width: 900px) 1px, 100vw" />
                </div>
                <p className="label accent">{s.year}</p>
                <h3 className="h2">{s.title}</h3>
                <p className="lead muted">{s.text}</p>
              </article>
            ))}
            <TLink to="/farm" className="btn btn--light farm__cta">
              Explore the farm <Arrow />
            </TLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ======================================================================
   07 · Barnyard
   ====================================================================== */
const BARNYARD = [
  ['40-foot tunnel slide', 'Straight out of the big red barn.'],
  ['The Treetop Bus Stop', 'Slides and a treehouse.'],
  ['Mini farm animals', 'Small friends to meet and greet.'],
  ['Fish & turtle feeding', 'Down by the lake.'],
];

function Barnyard() {
  return (
    <section className="section tone-cream barnyard" id="barnyard">
      <div className="wrap grid barnyard__grid">
        <div className="barnyard__collage">
          <div className="snap snap--a" data-reveal="" data-parallax="0.05">
            <Img name="barrel-train" alt="Children riding the barrel train across the grass" sizes="(min-width: 900px) 34vw, 70vw" />
          </div>
          <div className="snap snap--b" data-reveal="" style={{ ['--d' as string]: 150 }} data-parallax="-0.04">
            <Img name="tunnel-slide" alt="A child coming out of the tunnel slide beside the red barn" sizes="(min-width: 900px) 16vw, 40vw" />
          </div>
          <div className="snap snap--c" data-reveal="" style={{ ['--d' as string]: 300 }} data-parallax="0.09">
            <Img name="kids-farm-dog" alt="Two children petting a friendly farm dog" sizes="(min-width: 900px) 24vw, 55vw" />
          </div>
          <div className="snap snap--d" data-reveal="" style={{ ['--d' as string]: 450 }}>
            <Img name="ice-cream" alt="Kids enjoying ice cream cones" sizes="(min-width: 900px) 18vw, 45vw" />
          </div>
        </div>
        <div className="barnyard__copy">
          <Kicker num="06">The Barnyard</Kicker>
          <Words className="display">
            Admission? <em>Free.</em>
          </Words>
          <p className="lead" data-reveal="">
            Let the kids run before or after supper, or make a whole afternoon of it. The Barnyard keeps the same hours as the
            restaurant.
          </p>
          <ul className="attractions">
            {BARNYARD.map(([t, d], k) => (
              <li key={t} data-reveal="" style={{ ['--d' as string]: k * 80 }}>
                <span className="attractions__n">{String(k + 1).padStart(2, '0')}</span>
                <span>
                  <strong>{t}</strong>
                  <span className="muted">{d}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="small muted" data-reveal="">
            Kids must be with an adult. Grab Joe’s To Go and picnic at the covered lakeside pavilion.
          </p>
          <div className="btn-row" data-reveal="">
            <TLink to="/farm#barnyard" className="btn">
              Plan a farm day <Arrow />
            </TLink>
            <TLink to="/events#birthdays" className="link">
              Birthday parties <Arrow />
            </TLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ======================================================================
   08 · Weddings
   ====================================================================== */
function Weddings() {
  return (
    <section className="weddings tone-dark" id="weddings">
      <div className="weddings__band on-image">
        <div className="weddings__bg" data-parallax="0.14">
          <Img name="ceremony-autumn" alt="Guests seated for an outdoor ceremony beneath autumn trees" sizes="100vw" position="50% 65%" />
        </div>
        <div className="wrap weddings__title">
          <Kicker num="07">Weddings</Kicker>
          <Words className="display">
            Say “I do” <em>by the lake and the orchards.</em>
          </Words>
        </div>
      </div>
      <div className="section wrap grid weddings__grid">
        <div className="weddings__copy">
          <p className="lead" data-reveal="">
            A private gazebo surrounded by the lake and orchards sets the scene for your ceremony. Or we can transform one of our
            banquet halls for an indoor wedding, then serve your guests a country buffet.
          </p>
          <div className="package" data-reveal="">
            <p className="label accent">The Perfect Match package · ceremony &amp; reception</p>
            <ul>
              <li>Up to 100 guests</li>
              <li>Five hours of guest time on the grounds</li>
              <li>Country Platter buffet dinner</li>
              <li>Day-of coordinator &amp; wedding arch</li>
              <li>Bartender for five hours</li>
              <li>Changing room for the bridal party</li>
              <li>Linens, centerpieces &amp; classic ware</li>
              <li>A bottle of Huber wine for the couple</li>
            </ul>
          </div>
          <div className="btn-row" data-reveal="">
            <TLink to="/contact?type=wedding#inquiry" className="btn btn--brass">
              Request pricing <Arrow />
            </TLink>
            <TLink to="/weddings" className="btn btn--ghost">
              Explore weddings
            </TLink>
          </div>
          <p className="small muted" data-reveal="">
            Tours with {CONTACTS.events.name}, {CONTACTS.events.role.toLowerCase()}:{' '}
            <a className="text-link" href={`mailto:${CONTACTS.events.email}`}>{CONTACTS.events.email}</a>
          </p>
        </div>
        <div className="weddings__mosaic">
          <div className="frame m1 zoom graded" data-reveal="clip">
            <Img name="gazebo-lake-chairs" alt="White ceremony chairs set before the lakeside gazebo" sizes="(min-width: 900px) 30vw, 100vw" />
          </div>
          <div className="frame m2 zoom graded" data-reveal="clip" style={{ ['--d' as string]: 150 }}>
            <Img name="hall-reception" alt="A banquet hall set for a reception under chandeliers and wooden beams" sizes="(min-width: 900px) 26vw, 50vw" />
          </div>
          <div className="frame m3 zoom graded" data-reveal="clip" style={{ ['--d' as string]: 300 }}>
            <Img name="cake-cutting" alt="A bride and groom cutting their wedding cake" sizes="(min-width: 900px) 26vw, 50vw" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ======================================================================
   09 · Events — index with hover image
   ====================================================================== */
const EVENTS = [
  { id: 'picnics', title: 'Company picnics', meta: 'Private facility · 4 hours', text: 'Buffet, volleyball, basketball, corn hole and fishing in the stocked pond.', image: 'barn-one' },
  { id: 'birthdays', title: 'Birthday parties', meta: 'Outdoor pavilion · $150', text: 'Barnyard play, the turtle pond, the Soda Pop Shoppe and Joe’s To Go.', image: 'ice-cream' },
  { id: 'field-trips', title: 'School field trips', meta: 'Sept & Oct · Mon–Fri', text: 'Wagon ride to the pumpkin patch, the corn maze, an educational talk and lunch.', image: 'pumpkin-crate' },
  { id: 'power-lunch', title: 'Power Lunch', meta: '50+ guests · Mon–Thu', text: 'A business lunch in the fresh air, with a private meeting space.', image: 'hall-banquet' },
];

function Events() {
  const [hover, setHover] = useState<number | null>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  return (
    <section className="section tone-ivory events" id="events">
      <div className="wrap">
        <div className="events__head">
          <Kicker num="08">Gatherings</Kicker>
          <Words className="h1">
            Bring <em>everyone.</em>
          </Words>
          <p className="muted" data-reveal="">
            Groups of any size are welcome. Every event can include the all-you-can-eat country buffet: fried chicken, honey ham,
            biscuits with apple butter and homemade cobbler with ice cream.
          </p>
        </div>
        <ul
          className="index"
          onMouseMove={(e) => {
            const el = floatRef.current;
            if (el) el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
          }}
          onMouseLeave={() => setHover(null)}
        >
          {EVENTS.map((ev, k) => (
            <li key={ev.id} data-reveal="" style={{ ['--d' as string]: k * 80 }} onMouseEnter={() => setHover(k)}>
              <TLink to={`/events#${ev.id}`} className="index__row">
                <span className="index__n">{String(k + 1).padStart(2, '0')}</span>
                <span className="index__title">{ev.title}</span>
                <span className="index__text muted">{ev.text}</span>
                <span className="index__meta label">{ev.meta}</span>
                <Arrow className="arrow index__arrow" />
              </TLink>
            </li>
          ))}
        </ul>
        <div className="index__float" ref={floatRef} aria-hidden="true">
          {EVENTS.map((ev, k) => (
            <div key={ev.id} className={`index__img${hover === k ? ' is-on' : ''}`}>
              <Img name={ev.image} alt="" sizes="320px" />
            </div>
          ))}
        </div>
        <div className="btn-row events__cta" data-reveal="">
          <TLink to="/events" className="btn">
            All events &amp; packages <Arrow />
          </TLink>
          <TLink to="/contact?type=private-event#inquiry" className="link">
            Start an inquiry <Arrow />
          </TLink>
        </div>
      </div>
    </section>
  );
}

/* ======================================================================
   10 · Catering
   ====================================================================== */
function Catering() {
  return (
    <section className="section tone-paper catering" id="catering">
      <div className="wrap grid catering__grid">
        <div className="catering__media">
          <div className="frame ratio-portrait graded" data-reveal="clip">
            <Img name="reception-buffet" alt="A catered buffet line of chafing dishes with flowers in a barn hall" sizes="(min-width: 900px) 38vw, 100vw" />
          </div>
          <div className="catering__stamp" data-reveal="" style={{ ['--d' as string]: 300 }}>
            <span className="label">Delivery minimum</span>
            <span className="catering__stamp-n">50</span>
            <span className="label">guests</span>
          </div>
        </div>
        <div className="catering__copy">
          <Kicker num="09">Catering &amp; delivery</Kicker>
          <Words className="h1">
            Delivering a taste <em>of the country.</em>
          </Words>
          <p className="lead" data-reveal="">
            Fried chicken, honey ham, biscuits and apple butter and homemade pies, delivered or catered for wedding receptions,
            office gatherings, family events and holiday parties.
          </p>
          <dl className="facts" data-reveal="">
            <div>
              <dt className="label">On the buffet</dt>
              <dd>The Country Platter dinner with tea, lemonade, bottled water or soft drinks, and cobbler or pie for dessert.</dd>
            </div>
            <div>
              <dt className="label">In November</dt>
              <dd>A Thanksgiving turkey dinner: fresh-baked turkey, homemade dressing, real mashed potatoes and gravy.</dd>
            </div>
            <div>
              <dt className="label">Included</dt>
              <dd>Plastic ware, utensils, napkins and condiments. An 18% service charge applies if our staff stay to serve.</dd>
            </div>
          </dl>
          <div className="btn-row" data-reveal="">
            <TLink to="/contact?type=catering#inquiry" className="btn">
              Plan catering <Arrow />
            </TLink>
            <TLink to="/catering" className="link">
              Catering menu <Arrow />
            </TLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ======================================================================
   11 · Farm Market
   ====================================================================== */
const MARKET = [
  ['Jarred goods', 'Homemade jams, jellies, pickles, relishes and sauces, made in small batches.'],
  ['Homemade fudge', 'Classic flavors and seasonal specialties, handcrafted with premium ingredients.'],
  ['Baked goods', 'Fresh-baked cookies, breads, pies and pastries, sweet and savory.'],
  ['Seasonal produce', 'Garden vegetables and handpicked fruit, picked at peak ripeness.'],
];

function Market() {
  return (
    <section className="section tone-cream market" id="market">
      <div className="wrap">
        <div className="market__head grid">
          <div className="market__title">
            <Kicker num="10">The Farm Market</Kicker>
            <Words className="display">
              Take a little <em>of the farm home.</em>
            </Words>
          </div>
          <div className="market__img frame graded" data-reveal="clip">
            <Img name="pumpkin-crate" alt="A child reaching into a crate of pumpkins at the market" sizes="(min-width: 900px) 28vw, 60vw" position="50% 40%" />
          </div>
        </div>
        <ol className="shelf">
          {MARKET.map(([t, d], k) => (
            <li key={t} data-reveal="" style={{ ['--d' as string]: k * 90 }}>
              <span className="shelf__n">{String(k + 1).padStart(2, '0')}</span>
              <h3 className="h3">{t}</h3>
              <p className="muted small">{d}</p>
            </li>
          ))}
        </ol>
        <div className="btn-row" data-reveal="">
          <a href={SITE.shop} className="btn" target="_blank" rel="noopener">
            Shop online <ArrowUpRight />
          </a>
          <TLink to="/market" className="link">
            Visit the market <Arrow />
          </TLink>
        </div>
      </div>
    </section>
  );
}

/* ======================================================================
   12 · Gallery
   ====================================================================== */
const SHOTS: Shot[] = [
  { name: 'girl-candy-apple', alt: 'A little girl biting into a caramel apple among pumpkins', caption: 'Caramel apple season', shape: 'wide' },
  { name: 'gazebo-ceremony', alt: 'Ceremony chairs facing the white gazebo by the lake', caption: 'The lakeside gazebo', shape: 'tall' },
  { name: 'hall-chandeliers', alt: 'A banquet hall dressed in white with chandeliers', caption: 'The banquet hall', shape: 'wide' },
  { name: 'antique-tractors', alt: 'Antique tractors lined up on the grass', caption: 'Old iron on the lawn', shape: 'square' },
  { name: 'lawn-egg-hunt', alt: 'Children with Easter baskets on the lawn', caption: 'Egg hunt on the lawn', shape: 'wide' },
  { name: 'pumpkin-field-proposal', alt: 'A couple kissing in a pumpkin patch holding a “Will you marry me?” pumpkin', caption: 'She said yes, in the pumpkin patch', shape: 'wide' },
  { name: 'dessert-table', alt: 'A rustic dessert and candy table at a wedding', caption: 'Sweet details', shape: 'tall' },
  { name: 'couple-field', alt: 'A newly married couple kissing in an open field', caption: 'Open sky, Starlight', shape: 'wide' },
  { name: 'barnyard-wagon', alt: 'A wagon of children in front of the red Barnyard barn', caption: 'Wagon rides by the barn', shape: 'wide' },
];

function Gallery() {
  return (
    <section className="section tone-ink gallery" aria-labelledby="gallery-title">
      <div className="wrap gallery__head">
        <Kicker num="11">Atmosphere</Kicker>
        <Words className="h1">
          <span id="gallery-title">Days on the farm</span>
        </Words>
      </div>
      <GalleryStrip shots={SHOTS} />
    </section>
  );
}

/* ======================================================================
   13 · Location
   ====================================================================== */
function Location() {
  return (
    <section className="section tone-ivory location" id="visit">
      <div className="wrap grid location__grid">
        <div className="location__copy">
          <Kicker num="12">Find us</Kicker>
          <Words className="h1">
            Over the Knobs, <em>22 miles from Louisville.</em>
          </Words>
          <address className="location__addr" data-reveal="">
            {SITE.address.street}
            <br />
            {SITE.address.city}, Indiana {SITE.address.postal}
          </address>
          <div data-reveal="">
            <Hours compact />
          </div>
          <div className="btn-row" data-reveal="">
            <a href={SITE.mapsUrl} className="btn" target="_blank" rel="noopener">
              Get directions <ArrowUpRight />
            </a>
            <TLink to="/contact#directions" className="link">
              Best routes <Arrow />
            </TLink>
          </div>
        </div>
        <div className="location__side">
          <MapEmbed />
          <Mileage />
        </div>
      </div>
    </section>
  );
}

/* ======================================================================
   14 · Contact
   ====================================================================== */
function Contact() {
  return (
    <section className="section tone-paper contact" id="contact">
      <div className="wrap grid contact__grid">
        <div className="contact__copy">
          <Kicker num="13">Get in touch</Kicker>
          <Words className="h1">
            Planning <em>something?</em>
          </Words>
          <p className="muted" data-reveal="">
            For weddings, catering and events, tell us the date and roughly how many guests, and we’ll be in touch. For dining
            reservations or anything time-sensitive, please call.
          </p>
          <ul className="contact__lines" data-reveal="">
            <li>
              <span className="label">Restaurant</span>
              <a href={SITE.phoneHref}>{SITE.phone}</a>
            </li>
            <li>
              <span className="label">Email</span>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li>
              <span className="label">Weddings &amp; events</span>
              <a href={`mailto:${CONTACTS.events.email}`}>{CONTACTS.events.name}</a>
            </li>
          </ul>
        </div>
        <div className="contact__form" data-reveal="">
          <InquiryForm id="home-inquiry" />
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Story />
      <Restaurant />
      <Signature />
      <MenuSection />
      <Farm />
      <Barnyard />
      <Weddings />
      <Events />
      <Catering />
      <Market />
      <Gallery />
      <Location />
      <Contact />
    </>
  );
}
