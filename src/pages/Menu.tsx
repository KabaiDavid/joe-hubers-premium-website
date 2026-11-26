import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { MENU } from '../data/menu';
import { SITE } from '../data/site';
import { Img } from '../components/Img';
import { Words } from '../components/Chrome';
import { Hours, Kicker } from '../components/Blocks';
import { TLink } from '../components/TLink';
import { Arrow, ArrowUpRight } from '../components/Icons';

const FEATURE: Record<string, { image: string; alt: string; caption: string }> = {
  restaurant: { image: 'country-platter', alt: 'The Country Platter: fried chicken, honey ham and sides served family style', caption: 'The Country Platter' },
  carryout: { image: 'catering-buffet', alt: 'Serving dishes lined up on a buffet table', caption: 'Call ahead, and it’s ready when you are' },
  kids: { image: 'girl-candy-apple', alt: 'A little girl biting into a caramel apple', caption: 'Ages 4 to 11' },
  drinks: { image: 'lakeside-cocktail', alt: 'A Farmhouse lemonade cocktail by the lake', caption: 'Something to sip, by the lake' },
};

export default function Menu() {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState(MENU[0].id);

  useEffect(() => {
    const id = hash.slice(1);
    if (MENU.some((m) => m.id === id)) setTab(id);
  }, [hash]);

  const current = MENU.find((m) => m.id === tab)!;
  const feature = FEATURE[current.id];

  const select = (id: string) => {
    setTab(id);
    navigate(`/menu#${id}`, { replace: true, preventScrollReset: true });
  };

  return (
    <div className="menu-page tone-ivory">
      <header className="wrap page-head">
        <Kicker>The menu</Kicker>
        <Words as="h1" className="display">
          Home cooking, <em>made from scratch.</em>
        </Words>
        <p className="lead" data-reveal="">
          Dine in Thursday through Sunday, carry out with Joe’s To Go, or order online and pick up.
        </p>
        <div className="btn-row" data-reveal="" style={{ marginTop: '2rem' }}>
          <a href={SITE.orderOnline} className="btn btn--brass" target="_blank" rel="noopener">
            Order online <ArrowUpRight />
          </a>
          <a href={SITE.phoneHref} className="btn btn--ghost">
            Call {SITE.phone}
          </a>
        </div>
      </header>

      <div className="menu-tabs">
        <div className="wrap">
          <div className="menu-tabs__list" role="tablist" aria-label="Menus">
            {MENU.map((m) => (
              <button
                key={m.id}
                role="tab"
                id={`tab-${m.id}`}
                aria-selected={tab === m.id}
                aria-controls={`panel-${m.id}`}
                onClick={() => select(m.id)}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Anchor targets so old links like /menu#kids land here */}
      {MENU.map((m) => (
        <span key={m.id} id={m.id} aria-hidden="true" style={{ position: 'relative', top: '-140px', display: 'block' }} />
      ))}

      <section className="wrap menu-panel" role="tabpanel" id={`panel-${current.id}`} aria-labelledby={`tab-${current.id}`} key={current.id}>
        <div className="menu-feature">
          <figure style={{ margin: 0 }}>
            <div className="frame graded">
              <Img name={feature.image} alt={feature.alt} sizes="(min-width: 900px) 50vw, 100vw" />
            </div>
            <figcaption className="caption" style={{ marginTop: '0.8rem' }}>
              <b>Fig.</b>
              {feature.caption}
            </figcaption>
          </figure>
          <div>
            <p className="label accent">{current.kicker}</p>
            <h2 className="h1" style={{ margin: '0.8rem 0 1.2rem' }}>
              {current.label}
            </h2>
            <p className="lead">{current.intro}</p>
            {current.id === 'carryout' && (
              <div className="btn-row" style={{ marginTop: '1.6rem' }}>
                <a href={SITE.orderOnline} className="btn" target="_blank" rel="noopener">
                  Order Joe’s To Go <ArrowUpRight />
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="menu-groups">
          {current.groups.map((g) => (
            <div className="menu-group" key={g.title}>
              <h3>{g.title}</h3>
              {g.intro && <p>{g.intro}</p>}
              <ul className="fare">
                {g.items.map((it) => (
                  <li className="fare__row" key={it.name}>
                    <span className="fare__name">{it.name}</span>
                    {it.price && (
                      <>
                        <span className="fare__dots" aria-hidden="true" />
                        <span className="fare__price">{it.price}</span>
                      </>
                    )}
                    {it.note && <span className="fare__note">{it.note}</span>}
                  </li>
                ))}
              </ul>
              {g.footnote && <p className="menu-group__foot">{g.footnote}</p>}
            </div>
          ))}
        </div>
        <div className="menu-notes">
          {current.notes?.map((n) => <p key={n}>{n}</p>)}
          <p>Prices and selections can change with the season. For today’s menu, call {SITE.phone}.</p>
        </div>
      </section>

      <section className="wrap" style={{ marginTop: 'var(--section)' }}>
        <div className="cols cols--2">
          <div>
            <Kicker>When we’re open</Kicker>
            <Hours />
          </div>
          <div className="panel">
            <span className="label">Feeding a crowd?</span>
            <p className="h3" style={{ marginBottom: '1rem' }}>
              Group dinners for 50 or 100, catering and delivery.
            </p>
            <div className="btn-row">
              <TLink to="/catering" className="btn">
                Catering &amp; delivery <Arrow />
              </TLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
