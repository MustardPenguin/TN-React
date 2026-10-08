import { useLayoutEffect, useRef, useState } from 'react';
import { cx } from '../../lib/cx.js';
import { Logo } from '../ui/Logo.jsx';
import { Icon } from '../ui/Icon.jsx';
import { CityPicker } from '../ui/CityPicker.jsx';
import './Header.css';

// True while the element matching `selector` (e.g. the page sheet below the
// hero) hasn't reached the header yet, i.e. the header is still over the hero
// photo. No selector -> always false (frosted header).
function useOverHero(headerRef, selector) {
  const [over, setOver] = useState(Boolean(selector));
  useLayoutEffect(() => {
    if (!selector) {
      setOver(false);
      return undefined;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const below = document.querySelector(selector);
      const header = headerRef.current;
      if (!below || !header) return;
      setOver(below.getBoundingClientRect().top > header.offsetHeight);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [headerRef, selector]);
  return over;
}

// `cities` feeds the city filter (ui/CityPicker.jsx). `onCityChange` is
// optional; nothing uses it yet (mockup).
// `transparentUntil`: CSS selector of the element that ends the transparent
// state. Until its top reaches the header, the header is transparent over the
// hero with white content; after that it's frosted glass with dark content.
export function Header({ links, iconLinks = [], cities = [], onCityChange, transparentUntil }) {
  const ref = useRef(null);
  const overHero = useOverHero(ref, transparentUntil);
  return (
    <header ref={ref} className={cx('site-header', overHero && 'is-over-hero')}>
      <div className="container nav">
        <Logo />
        {cities.length > 0 && <CityPicker cities={cities} onChange={onCityChange} />}
        <nav className="nav-links">
          {links.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
        </nav>
        <div className="nav-actions">
          {iconLinks.map((link) => (
            <a key={link.label} href={link.href} className="icon-link" aria-label={link.label} title={link.label}><Icon name={link.icon} /></a>
          ))}
          <button className="menu-btn" aria-label="Menu"><Icon name="menu" /></button>
        </div>
      </div>
    </header>
  );
}
