import { html, cx } from '../../lib/html.js';
import { createSlideshow } from '../../lib/slideshow.js';
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
function HeroCopy({ headlines }) {
  return html`
    <div class="hero-copy">
      ${headlines.map(({ title, sub }, i) => html`
        <div class="${cx('hero-copy-item', i === 0 && 'is-active')}" data-hero-copy>
          <h1>${title.map((line, j) => html`${j > 0 && html`<br/>`}${line}`)}</h1>
          <p>${sub}</p>
        </div>`)}
    </div>`;
}

export function Hero({ activeTab = 'Buy', popularSearches, slides, headlines, interval }) {
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
            <input type="text" name="q" aria-label="Search location" placeholder="Enter a locality, project, or PIN code" />
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

/** Wire up behaviour after the markup is in the DOM. Returns a cleanup function. */
export function initHero(root) {
  const form = root.querySelector('[data-search-form]');
  const onSubmit = (event) => event.preventDefault(); // mockup: no search yet
  form?.addEventListener('submit', onSubmit);

  const hero = root.querySelector('[data-hero]');
  const destroySlideshow = hero ? initHeroSlideshow(hero) : () => {};

  return () => {
    form?.removeEventListener('submit', onSubmit);
    destroySlideshow();
  };
}
