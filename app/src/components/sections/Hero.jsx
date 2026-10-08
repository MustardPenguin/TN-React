import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { cx } from '../../lib/cx.js';
import { useSlideshow } from '../../hooks/useSlideshow.js';
import { useTypewriter } from '../../hooks/useTypewriter.js';
import { useDocumentVisible, useMediaQuery } from '../../hooks/useMediaQuery.js';
import { Icon } from '../ui/Icon.jsx';
import { SlideControls } from '../ui/SlideControls.jsx';
import './Hero.css';

const SEARCH_PLACEHOLDER = 'Enter a locality, project, or PIN code';
const CURSOR = '|';
const CURSOR_BLINK_MS = 530;

/**
 * Which headline to show after moving from slide `from` to slide `to`.
 * Same count as slides: headline i belongs to slide i.
 * Otherwise: step through the headlines one per change (back one when going
 * to the previous slide), so none repeats back-to-back and all get shown.
 */
function nextCopyIndex({ from, to, slideCount, copyIndex, copyCount }) {
  if (copyCount < 2) return 0;
  if (copyCount === slideCount) return to;
  const wentBack = to === (from - 1 + slideCount) % slideCount && slideCount > 2;
  return (copyIndex + (wentBack ? -1 : 1) + copyCount) % copyCount;
}

// Long headlines get a smaller size so one of them doesn't make the hero tall
// for every quote. Based on the longest line, since that's what wraps.
function headlineSize(title) {
  const longest = Math.max(...title.map((line) => line.length));
  if (longest > 70) return 'headline-small';
  if (longest > 40) return 'headline-medium';
  return null;
}

// Background layers. An image is only set once its slide is current or next
// (`loaded`), so later images don't compete with the first paint. The
// outgoing image stays fully visible underneath (is-leaving) while the new one
// fades in on top, so there's no dip through the fallback colour.
function HeroSlides({ slides, index, leaving, loaded }) {
  return (
    <div className="hero-slides" aria-hidden="true">
      {slides.map((slide, i) => (
        <div
          key={slide.image}
          className={cx('hero-slide', i === index && 'is-active', i === leaving && 'is-leaving')}
          style={loaded.has(i) ? { backgroundImage: `url('${slide.image}')` } : undefined}
        />
      ))}
    </div>
  );
}

// All headlines share one grid cell, so the block is always as tall as the
// longest one and the search bar doesn't move when the copy changes.
// Inactive ones are visibility:hidden, so only one <h1> is exposed at a time.
function HeroCopy({ headlines, active }) {
  return (
    <div className="hero-copy">
      {headlines.map(({ title, sub }, i) => (
        <div key={title.join(' ')} className={cx('hero-copy-item', headlineSize(title), i === active && 'is-active')}>
          <h1>{title.map((line, j) => <Fragment key={j}>{j > 0 && <br />}{line}</Fragment>)}</h1>
          <p>{sub}</p>
        </div>
      ))}
    </div>
  );
}

// While the search box is idle (not focused, empty, tab visible), recommended
// searches are typed into its placeholder, followed by a blinking cursor.
// Placeholder text can't be styled per character, so the cursor is a
// character: solid while characters change, blinking once the text holds.
function HeroSearch({ suggestions }) {
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const visible = useDocumentVisible();
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const typing = suggestions.length > 0 && !reduceMotion && visible && !focused && !hasValue;
  const text = useTypewriter({ phrases: suggestions, enabled: typing });
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    if (!typing) return undefined;
    setCursorOn(true);
    const blink = setInterval(() => setCursorOn((on) => !on), CURSOR_BLINK_MS);
    return () => clearInterval(blink);
  }, [text, typing]);

  return (
    <form className="search" onSubmit={(event) => event.preventDefault() /* mockup: no search yet */}>
      <Icon name="search" />
      <input
        type="text"
        name="q"
        aria-label="Search location"
        placeholder={typing ? text + (cursorOn ? CURSOR : '') : SEARCH_PLACEHOLDER}
        onFocus={() => setFocused(true)}
        onBlur={(event) => {
          setFocused(false);
          setHasValue(event.target.value !== '');
        }}
      />
      <button className="btn btn-primary"><span>Search</span>
        <Icon name="arrowRight" />
      </button>
    </form>
  );
}

// The hero is sticky (Hero.css) so the page sheet slides over it. Pin it just
// below the header, unless header + hero is taller than the window: then use a
// negative offset so it scrolls until its content's bottom is in view first.
// The bottom --sheet-overlap of the hero is always under the sheet, so it
// doesn't count. The header is a sibling component, so it's looked up in the
// document.
function useStickyTop(ref) {
  const [top, setTop] = useState(null);
  useLayoutEffect(() => {
    const hero = ref.current;
    const header = document.querySelector('header');
    const update = () => {
      const overlap = parseFloat(getComputedStyle(hero).getPropertyValue('--sheet-overlap')) || 0;
      setTop(Math.min(header?.offsetHeight ?? 0, window.innerHeight - (hero.offsetHeight - overlap)));
    };
    const observer = new ResizeObserver(update); // hero height changes with copy/width
    observer.observe(hero);
    if (header) observer.observe(header);
    window.addEventListener('resize', update);
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [ref]);
  return top;
}

export function Hero({ activeTab = 'Buy', popularSearches, searchSuggestions = [], slides, headlines, interval }) {
  const heroRef = useRef(null);
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [copyIndex, setCopyIndex] = useState(0);
  const [leaving, setLeaving] = useState(null);
  const [loaded, setLoaded] = useState(() => new Set([0]));

  // Reduced-motion visitors aren't auto-advanced; they can press play.
  const slideshow = useSlideshow({
    count: slides.length,
    interval,
    autoplay: !reduceMotion,
    onChange(from, to) {
      setLeaving(from);
      setCopyIndex((current) => nextCopyIndex({ from, to, slideCount: slides.length, copyIndex: current, copyCount: headlines.length }));
    },
  });

  // Load the current image and preload the next one.
  useEffect(() => {
    const upcoming = (slideshow.index + 1) % slides.length;
    setLoaded((prev) => (prev.has(slideshow.index) && prev.has(upcoming) ? prev : new Set([...prev, slideshow.index, upcoming])));
  }, [slideshow.index, slides.length]);

  const heroTop = useStickyTop(heroRef);
  const style = { '--slide-interval': `${interval}ms` };
  if (heroTop !== null) style['--hero-top'] = `${heroTop}px`;

  return (
    <section className="hero" ref={heroRef} style={style}>
      <HeroSlides slides={slides} index={slideshow.index} leaving={leaving} loaded={loaded} />
      <div className="container hero-inner">
        <HeroCopy headlines={headlines} active={copyIndex} />
        <div className="search-card">
          <HeroSearch suggestions={searchSuggestions} />
          <div className="hero-tags">
            {popularSearches.map((term) => <span key={term}>{term}</span>)}
          </div>
        </div>
      </div>
      {slides.length > 1 && (
        <div className="hero-controls">
          <div className="container">
            <SlideControls
              count={slides.length}
              index={slideshow.index}
              playing={slideshow.playing}
              restartKey={slideshow.restartKey}
              label="Background images"
              onPrev={slideshow.prev}
              onNext={slideshow.next}
              onGo={slideshow.go}
              onToggle={slideshow.toggle}
            />
          </div>
        </div>
      )}
    </section>
  );
}
