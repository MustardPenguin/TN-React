import { html, cx } from '../../lib/html.js';
import { createSlideshow } from '../../lib/slideshow.js';
import { createTypewriter } from '../../lib/typewriter.js';
import { Icon } from '../ui/Icon.js';
import { SlideControls, bindSlideControls } from '../ui/SlideControls.js';
import './Hero.css';

const TABS = ['Buy', 'Rent'];

// Only the first image is set up front; the rest load just before they're
// shown (see `loadSlide`) so they don't compete with the first paint.
function HeroSlides({ slides }) {
  return html`
    <div class="hero-slides" aria-hidden="true">
      ${slides.map((slide, i) => i === 0
        ? html`<div class="hero-slide is-active" data-slide style="background-image:url('${slide.image}')"></div>`
        : html`<div class="hero-slide" data-slide data-src="${slide.image}"></div>`)}
    </div>`;
}

// All headlines share one grid cell, so the block is always as tall as the
// longest one and the search bar doesn't move when the copy changes.
// Inactive ones are visibility:hidden, so only one <h1> is exposed at a time.
// Long headlines get a smaller size so one of them doesn't make the hero tall
// for every quote. Based on the longest line, since that's what wraps.
function headlineSize(title) {
  const longest = Math.max(...title.map((line) => line.length));
  if (longest > 70) return 'headline-small';
  if (longest > 40) return 'headline-medium';
  return null;
}

function HeroCopy({ headlines }) {
  return html`
    <div class="hero-copy">
      ${headlines.map(({ title, sub }, i) => html`
        <div class="${cx('hero-copy-item', headlineSize(title), i === 0 && 'is-active')}" data-hero-copy>
          <h1>${title.map((line, j) => html`${j > 0 && html`<br/>`}${line}`)}</h1>
          <p>${sub}</p>
        </div>`)}
    </div>`;
}

export function Hero({ activeTab = 'Buy', popularSearches, searchSuggestions = [], slides, headlines, interval }) {
  const hasSlideshow = slides.length > 1;
  return html`
    <section class="hero" data-hero data-interval="${interval}" style="--slide-interval:${interval}ms">
      ${HeroSlides({ slides })}
      <div class="container hero-inner">
        ${HeroCopy({ headlines })}
        <div class="search-card">
          <div class="tabs">
            ${TABS.map((tab) => html`<a href="#" class="${cx('tab', tab === activeTab && 'active')}">${tab}</a>`)}
          </div>
          <form class="search" data-search-form>
            ${Icon({ name: 'search' })}
            <input type="text" name="q" aria-label="Search location" placeholder="Enter a locality, project, or PIN code"
              data-search-input data-suggestions="${JSON.stringify(searchSuggestions)}" />
            <button class="btn btn-primary"><span>Search</span>
              ${Icon({ name: 'arrowRight' })}
            </button>
          </form>
          <div class="hero-tags">
            ${popularSearches.map((term) => html`<span>${term}</span>`)}
          </div>
        </div>
      </div>
      ${hasSlideshow && html`
        <div class="hero-controls">
          <div class="container">${SlideControls({ count: slides.length, label: 'Background images' })}</div>
        </div>`}
    </section>`;
}

function loadSlide(slide) {
  if (!slide?.dataset.src) return;
  slide.style.backgroundImage = `url('${slide.dataset.src}')`;
  delete slide.dataset.src;
}

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

function initHeroSlideshow(hero) {
  const slides = [...hero.querySelectorAll('[data-slide]')];
  const controlsEl = hero.querySelector('[data-slide-controls]');
  if (slides.length < 2 || !controlsEl) return () => {};

  const copies = [...hero.querySelectorAll('[data-hero-copy]')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let active = slides[0];
  let slideIndex = 0;
  let copyIndex = 0;
  let controls;

  const slideshow = createSlideshow({
    count: slides.length,
    interval: Number(hero.dataset.interval) || undefined,
    onChange(state) {
      const next = slides[state.index];
      loadSlide(next);
      loadSlide(slides[(state.index + 1) % slides.length]); // preload the upcoming one

      if (next !== active) {
        // The outgoing image stays fully visible underneath while the new one
        // fades in on top, so there's no dip through the fallback colour.
        slides.forEach((s) => s.classList.remove('is-leaving'));
        active.classList.replace('is-active', 'is-leaving');
        next.classList.add('is-active');
        active = next;

        copies[copyIndex]?.classList.remove('is-active');
        copyIndex = nextCopyIndex({ from: slideIndex, to: state.index, slideCount: slides.length, copyIndex, copyCount: copies.length });
        copies[copyIndex]?.classList.add('is-active');
        slideIndex = state.index;
      }
      controls.update(state);
    },
  });
  controls = bindSlideControls(controlsEl, slideshow);

  // Don't advance in a background tab; pick up again on return.
  const onVisibility = () => (document.hidden ? slideshow.suspend() : slideshow.resume());
  document.addEventListener('visibilitychange', onVisibility);

  // Respect reduced-motion users by not auto-advancing; they can press play.
  if (reduceMotion) slideshow.pause();
  else slideshow.play();

  return () => {
    slideshow.destroy();
    controls.destroy();
    document.removeEventListener('visibilitychange', onVisibility);
  };
}

const CURSOR = '|';
const CURSOR_BLINK_MS = 530;

// While the search box is idle (not focused, empty), type recommended searches
// into its placeholder, followed by a cursor. Focusing it restores the normal
// placeholder. (Placeholder text can't be styled per character, so the cursor
// is a character that JS blinks.)
function initSearchSuggestions(form) {
  const input = form?.querySelector('[data-search-input]');
  const suggestions = input ? JSON.parse(input.dataset.suggestions || '[]') : [];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!input || suggestions.length === 0 || reduceMotion) return () => {};

  const defaultPlaceholder = input.placeholder;
  let text = '';
  let cursorOn = true;
  let blinkTimer = null;

  const render = () => { input.placeholder = text + (cursorOn ? CURSOR : ''); };
  const stopBlink = () => {
    clearInterval(blinkTimer);
    blinkTimer = null;
  };
  // Solid while characters change; blinks once the text holds still.
  const restartBlink = () => {
    stopBlink();
    cursorOn = true;
    blinkTimer = setInterval(() => {
      cursorOn = !cursorOn;
      render();
    }, CURSOR_BLINK_MS);
  };

  const typewriter = createTypewriter({
    phrases: suggestions,
    onUpdate: (next) => {
      text = next;
      restartBlink();
      render();
    },
  });

  const isIdle = () => document.activeElement !== input && !input.value && !document.hidden;
  const pause = () => {
    typewriter.stop();
    stopBlink();
    input.placeholder = defaultPlaceholder;
  };
  const resume = () => {
    if (!isIdle() || typewriter.running) return;
    text = '';
    restartBlink();
    render();
    typewriter.start();
  };
  const onVisibility = () => (document.hidden ? pause() : resume());

  input.addEventListener('focus', pause);
  input.addEventListener('blur', resume);
  document.addEventListener('visibilitychange', onVisibility);
  resume();

  return () => {
    typewriter.stop();
    stopBlink();
    input.removeEventListener('focus', pause);
    input.removeEventListener('blur', resume);
    document.removeEventListener('visibilitychange', onVisibility);
  };
}

// The hero is sticky (Hero.css). Pin it just below the header, unless header +
// hero is taller than the window: then use a negative offset so it scrolls
// until its bottom edge is in view, and only then stays put.
function initStickyHero(hero, header) {
  const update = () => {
    const headerHeight = header?.offsetHeight ?? 0;
    const top = Math.min(headerHeight, window.innerHeight - hero.offsetHeight);
    hero.style.setProperty('--hero-top', `${top}px`);
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
}

/** Wire up behaviour after the markup is in the DOM. Returns a cleanup function. */
export function initHero(root) {
  const form = root.querySelector('[data-search-form]');
  const onSubmit = (event) => event.preventDefault(); // mockup: no search yet
  form?.addEventListener('submit', onSubmit);
  const destroySuggestions = initSearchSuggestions(form);

  const hero = root.querySelector('[data-hero]');
  const destroySlideshow = hero ? initHeroSlideshow(hero) : () => {};
  const destroySticky = hero ? initStickyHero(hero, root.querySelector('header')) : () => {};

  return () => {
    form?.removeEventListener('submit', onSubmit);
    destroySuggestions();
    destroySlideshow();
    destroySticky();
  };
}
