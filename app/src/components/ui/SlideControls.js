import { html, cx } from '../../lib/html.js';
import { Icon } from './Icon.js';
import './SlideControls.css';

/**
 * Prev / dots / counter / next / play-pause bar for any slideshow.
 * Markup only — state is applied by `bindSlideControls`.
 * The active dot fills over `--slide-interval` (inherited CSS variable)
 * while playing.
 */
export function SlideControls({ count, label, noun = 'image', current = 0, playing = true }) {
  return html`
    <div class="${cx('slide-controls', playing && 'is-playing')}" role="group" aria-label="${label}" data-slide-controls>
      <button type="button" class="slide-btn" data-slide-prev aria-label="Previous ${noun}">${Icon({ name: 'chevronLeft' })}</button>
      <div class="slide-dots">
        ${Array.from({ length: count }, (_, i) => html`
          <button type="button" class="${cx('slide-dot', i === current && 'is-active')}" data-slide-to="${i}" aria-label="Show ${noun} ${i + 1} of ${count}"${i === current && html` aria-current="true"`}></button>`)}
      </div>
      <span class="slide-count" aria-hidden="true"><b data-slide-current>${current + 1}</b> / ${count}</span>
      <button type="button" class="slide-btn" data-slide-next aria-label="Next ${noun}">${Icon({ name: 'chevronRight' })}</button>
      <button type="button" class="slide-btn slide-toggle" data-slide-toggle aria-label="${playing ? 'Pause' : 'Play'} slideshow">
        <span class="when-playing">${Icon({ name: 'pause' })}</span>
        <span class="when-paused">${Icon({ name: 'play' })}</span>
      </button>
      <span class="sr-only" data-slide-status aria-live="off" aria-atomic="true"></span>
    </div>`;
}

/**
 * Connect rendered SlideControls to a slideshow controller.
 * Returns `update(state)` to call from the controller's onChange, and
 * `destroy()` to remove listeners.
 */
export function bindSlideControls(el, slideshow, { noun = 'image' } = {}) {
  const dots = [...el.querySelectorAll('[data-slide-to]')];
  const currentEl = el.querySelector('[data-slide-current]');
  const toggleBtn = el.querySelector('[data-slide-toggle]');
  const status = el.querySelector('[data-slide-status]');

  const onClick = (event) => {
    const btn = event.target.closest('button');
    if (!btn) return;
    if (btn.hasAttribute('data-slide-prev')) slideshow.prev();
    else if (btn.hasAttribute('data-slide-next')) slideshow.next();
    else if (btn.hasAttribute('data-slide-toggle')) slideshow.toggle();
    else if (btn.dataset.slideTo) slideshow.go(Number(btn.dataset.slideTo));
  };
  const onKeydown = (event) => {
    if (event.key === 'ArrowLeft') slideshow.prev();
    else if (event.key === 'ArrowRight') slideshow.next();
    else return;
    event.preventDefault();
  };
  el.addEventListener('click', onClick);
  el.addEventListener('keydown', onKeydown);

  function update({ index, count, playing }) {
    el.classList.toggle('is-playing', playing);
    toggleBtn.setAttribute('aria-label', `${playing ? 'Pause' : 'Play'} slideshow`);
    currentEl.textContent = index + 1;

    // Re-adding the class after a reflow restarts the progress animation,
    // including when resuming on the same dot.
    dots.forEach((dot) => {
      dot.classList.remove('is-active');
      dot.removeAttribute('aria-current');
    });
    void el.offsetWidth;
    dots[index].classList.add('is-active');
    dots[index].setAttribute('aria-current', 'true');

    // Announce changes only while paused, so autoplay doesn't talk over
    // the page (WAI-ARIA carousel pattern).
    status.setAttribute('aria-live', playing ? 'off' : 'polite');
    status.textContent = `Showing ${noun} ${index + 1} of ${count}`;
  }

  return {
    update,
    destroy() {
      el.removeEventListener('click', onClick);
      el.removeEventListener('keydown', onKeydown);
    },
  };
}
