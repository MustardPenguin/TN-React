import { useEffect, useRef, useState } from 'react';
import { Icon } from '../ui/Icon.jsx';
import './Gallery.css';

// Listing photos: one large photo with up to four beside it (desktop), or a
// swipeable strip with a counter (phones). Any photo or "Show all photos"
// opens a full-screen viewer. The viewer is a native <dialog>, so focus is
// trapped inside it and Escape closes it. Arrow keys move between photos.
export function Gallery({ images, title }) {
  const dialog = useRef(null);
  const strip = useRef(null);
  const [current, setCurrent] = useState(0);
  const [stripIndex, setStripIndex] = useState(0);
  const count = images.length;
  const alt = (i) => `${title}, photo ${i + 1} of ${count}`;

  const open = (i) => {
    setCurrent(i);
    dialog.current.showModal();
  };
  const step = (delta) => setCurrent((i) => (i + delta + count) % count);

  // Phone strip: keep the "2 / 5" counter in sync with the swipe position.
  useEffect(() => {
    const el = strip.current;
    const onScroll = () => setStripIndex(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="gallery">
      {/* Desktop/tablet grid. */}
      <div className={`gallery-grid shows-${Math.min(count, 5)}`}>
        {images.slice(0, 5).map((src, i) => (
          <button key={src} type="button" className="gallery-cell" onClick={() => open(i)} aria-label={`Open ${alt(i)}`}>
            <img src={src} alt="" loading={i === 0 ? undefined : 'lazy'} />
          </button>
        ))}
        <button type="button" className="gallery-all" onClick={() => open(0)}>
          <Icon name="expand" /> Show all {count} photos
        </button>
      </div>

      {/* Phones: swipe strip. */}
      <div className="gallery-strip-wrap">
        <ul className="gallery-strip" ref={strip} aria-label={`${title} photos`}>
          {images.map((src, i) => (
            <li key={src}>
              <button type="button" className="gallery-strip-item" onClick={() => open(i)} aria-label={`Open ${alt(i)}`}>
                <img src={src} alt="" loading={i === 0 ? undefined : 'lazy'} />
              </button>
            </li>
          ))}
        </ul>
        <span className="gallery-count" aria-hidden="true">{stripIndex + 1} / {count}</span>
      </div>

      {/* Full-screen viewer. */}
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={`${title} photos`}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1);
          else if (e.key === 'ArrowLeft') step(-1);
        }}
        onClick={(e) => { if (e.target === dialog.current) dialog.current.close(); }}
      >
        <div className="lightbox-bar">
          <span className="lightbox-count" aria-live="polite">{current + 1} / {count}</span>
          <button type="button" className="lightbox-btn" onClick={() => dialog.current.close()} aria-label="Close photos"><Icon name="close" /></button>
        </div>
        <figure className="lightbox-figure">
          <img src={images[current]} alt={alt(current)} />
        </figure>
        {count > 1 && (
          <>
            <button type="button" className="lightbox-btn lightbox-nav prev" onClick={() => step(-1)} aria-label="Previous photo"><Icon name="chevronLeft" /></button>
            <button type="button" className="lightbox-btn lightbox-nav next" onClick={() => step(1)} aria-label="Next photo"><Icon name="chevronRight" /></button>
          </>
        )}
        <ol className="lightbox-thumbs">
          {images.map((src, i) => (
            <li key={src}>
              <button type="button" className="lightbox-thumb" aria-label={`Show photo ${i + 1}`} aria-current={i === current ? 'true' : undefined} onClick={() => setCurrent(i)}>
                <img src={src} alt="" />
              </button>
            </li>
          ))}
        </ol>
      </dialog>
    </div>
  );
}
