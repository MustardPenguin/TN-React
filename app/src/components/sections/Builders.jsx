import { useEffect, useRef, useState } from 'react';
import { cx } from '../../lib/cx.js';
import { Icon } from '../ui/Icon.jsx';
import { BuilderCard } from '../ui/BuilderCard.jsx';
import './Builders.css';

// The card most fully visible in the rail (first one on a tie).
function mostVisibleIndex(rail) {
  const view = rail.getBoundingClientRect();
  let best = 0;
  let bestShown = -1;
  [...rail.children].forEach((item, i) => {
    const r = item.getBoundingClientRect();
    const shown = (Math.min(r.right, view.right) - Math.max(r.left, view.left)) / r.width;
    if (shown > bestShown + 0.01) { best = i; bestShown = shown; }
  });
  return best;
}

// Builder showcase: one carousel of builder cards. Swipe/scroll on any
// device; arrow buttons (desktop) move one card and disable at the ends.
// Only the card in focus (most visible, while the section is on screen)
// auto-rotates through its projects every `interval` ms.
export function Builders({ intro, builders, interval }) {
  const section = useRef(null);
  const rail = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [focused, setFocused] = useState(0);
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const el = rail.current;
    let frame = 0;
    const update = () => {
      frame = 0;
      setAtStart(el.scrollLeft < 4);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
      setFocused(mostVisibleIndex(el));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    el.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  // Rotate only while at least a third of the section is on screen.
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.33 });
    observer.observe(section.current);
    return () => observer.disconnect();
  }, []);

  const scrollByCard = (direction) => {
    const card = rail.current.querySelector('.builder-card');
    const gap = parseFloat(getComputedStyle(rail.current).columnGap) || 0;
    rail.current.scrollBy({ left: direction * (card.offsetWidth + gap) });
  };

  if (builders.length === 0) return null;
  return (
    <section className="builders" ref={section} aria-labelledby="builders-title">
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
            {builders.map((builder, i) => (
              <li key={builder.id}><BuilderCard builder={builder} active={onScreen && i === focused} interval={interval} /></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
