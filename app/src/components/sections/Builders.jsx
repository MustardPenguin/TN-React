import { useEffect, useRef, useState } from 'react';
import { cx } from '../../lib/cx.js';
import { Icon } from '../ui/Icon.jsx';
import { BuilderCard } from '../ui/BuilderCard.jsx';
import './Builders.css';

// Builder showcase: one carousel of builder cards. Swipe/scroll on any
// device; arrow buttons (desktop) move one card and disable at the ends.
export function Builders({ intro, builders }) {
  const rail = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = rail.current;
    const update = () => {
      setAtStart(el.scrollLeft < 4);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const scrollByCard = (direction) => {
    const card = rail.current.querySelector('.builder-card');
    const gap = parseFloat(getComputedStyle(rail.current).columnGap) || 0;
    rail.current.scrollBy({ left: direction * (card.offsetWidth + gap) });
  };

  if (builders.length === 0) return null;
  return (
    <section className="builders" aria-labelledby="builders-title">
      <div className="container">
        <div className="section-head">
          <div>
            {intro.eyebrow && <div className="eyebrow">{intro.eyebrow}</div>}
            <h2 id="builders-title">{intro.title}</h2>
            {intro.sub && <p className="sub">{intro.sub}</p>}
          </div>
          <div className="builders-nav">
            {intro.link && <a href={intro.link.href} className="link-arrow">{intro.link.label} →</a>}
            <button type="button" className="builders-arrow" aria-label="Previous builders" aria-controls="builders-rail" disabled={atStart} onClick={() => scrollByCard(-1)}><Icon name="chevronLeft" /></button>
            <button type="button" className="builders-arrow" aria-label="Next builders" aria-controls="builders-rail" disabled={atEnd} onClick={() => scrollByCard(1)}><Icon name="chevronRight" /></button>
          </div>
        </div>
        {/* Edge fades: overlays on this wrapper, shown only on sides with more to scroll. */}
        <div className={cx('builders-fade', !atStart && 'fade-start', !atEnd && 'fade-end')}>
          <ul className="builders-rail" id="builders-rail" ref={rail} aria-label="Builders">
            {builders.map((builder) => <li key={builder.id}><BuilderCard builder={builder} /></li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
