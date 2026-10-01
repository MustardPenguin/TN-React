import { useLayoutEffect, useRef } from 'react';
import { cx } from '../../lib/cx.js';
import { Icon } from './Icon.jsx';
import './SlideControls.css';

/**
 * Prev / dots / counter / next / play-pause bar for any slideshow
 * (see hooks/useSlideshow.js). Stateless: everything comes in as props.
 * The active dot fills over `--slide-interval` (inherited CSS variable)
 * while playing.
 */
export function SlideControls({
  count, index, playing, restartKey, label, noun = 'image',
  onPrev, onNext, onGo, onToggle,
}) {
  const activeDot = useRef(null);

  // Restart the active dot's countdown on every change, including resuming on
  // the same slide, by re-applying its class after a reflow.
  useLayoutEffect(() => {
    const dot = activeDot.current;
    if (!dot) return;
    dot.classList.remove('is-active');
    void dot.offsetWidth;
    dot.classList.add('is-active');
  }, [restartKey]);

  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft') onPrev();
    else if (event.key === 'ArrowRight') onNext();
    else return;
    event.preventDefault();
  };

  return (
    <div className={cx('slide-controls', playing && 'is-playing')} role="group" aria-label={label} onKeyDown={onKeyDown}>
      <button type="button" className="slide-btn" aria-label={`Previous ${noun}`} onClick={onPrev}><Icon name="chevronLeft" /></button>
      <div className="slide-dots">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            ref={i === index ? activeDot : undefined}
            type="button"
            className={cx('slide-dot', i === index && 'is-active')}
            aria-label={`Show ${noun} ${i + 1} of ${count}`}
            aria-current={i === index ? 'true' : undefined}
            onClick={() => onGo(i)}
          />
        ))}
      </div>
      <span className="slide-count" aria-hidden="true"><b>{index + 1}</b> / {count}</span>
      <button type="button" className="slide-btn" aria-label={`Next ${noun}`} onClick={onNext}><Icon name="chevronRight" /></button>
      <button type="button" className="slide-btn slide-toggle" aria-label={`${playing ? 'Pause' : 'Play'} slideshow`} onClick={onToggle}>
        <span className="when-playing"><Icon name="pause" /></span>
        <span className="when-paused"><Icon name="play" /></span>
      </button>
      {/* Announce changes only while paused, so autoplay doesn't talk over
          the page (WAI-ARIA carousel pattern). */}
      <span className="sr-only" aria-live={playing ? 'off' : 'polite'} aria-atomic="true">
        {`Showing ${noun} ${index + 1} of ${count}`}
      </span>
    </div>
  );
}
