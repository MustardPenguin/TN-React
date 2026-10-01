import { useEffect, useMemo, useRef, useState } from 'react';
import { createSlideshow } from '../lib/slideshow.js';

/**
 * React wrapper around lib/slideshow.js (which holds the timer logic).
 * Returns { index, count, playing, restartKey, go, next, prev, toggle }.
 * - `restartKey` changes on every update, including play/resume on the same
 *   slide, so progress indicators can restart their countdown.
 * - `onChange(from, to)` is called whenever the slide changes, in the same
 *   update, for state that depends on the direction of travel.
 * - Pauses in a background tab and picks up again on return.
 */
export function useSlideshow({ count, interval, autoplay = true, onChange }) {
  const [state, setState] = useState({ index: 0, count, playing: autoplay && count > 1, restartKey: 0 });
  const controller = useRef(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    let current = 0;
    const slideshow = createSlideshow({
      count,
      interval,
      onChange(next) {
        if (next.index !== current) onChangeRef.current?.(current, next.index);
        current = next.index;
        setState((prev) => ({ ...next, restartKey: prev.restartKey + 1 }));
      },
    });
    controller.current = slideshow;
    if (autoplay) slideshow.play();
    else slideshow.pause();

    const onVisibility = () => (document.hidden ? slideshow.suspend() : slideshow.resume());
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      slideshow.destroy();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [count, interval, autoplay]);

  const actions = useMemo(() => ({
    go: (i) => controller.current?.go(i),
    next: () => controller.current?.next(),
    prev: () => controller.current?.prev(),
    toggle: () => controller.current?.toggle(),
  }), []);

  return { ...state, ...actions };
}
