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
 * - `enabled: false` holds the timer without changing play/pause or the
 *   current slide (e.g. a carousel card that isn't the one in focus); it
 *   picks up again when enabled. Changing `autoplay` instead restarts.
 */
export function useSlideshow({ count, interval, autoplay = true, enabled = true, onChange }) {
  const [state, setState] = useState({ index: 0, count, playing: autoplay && count > 1, restartKey: 0 });
  const controller = useRef(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

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
    if (!enabledRef.current) slideshow.suspend();

    const onVisibility = () => {
      if (document.hidden) slideshow.suspend();
      else if (enabledRef.current) slideshow.resume();
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      slideshow.destroy();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [count, interval, autoplay]);

  // Hold or release the timer as `enabled` changes.
  useEffect(() => {
    const slideshow = controller.current;
    if (!slideshow) return;
    if (enabled && !document.hidden) slideshow.resume();
    else slideshow.suspend();
  }, [enabled]);

  // Manual navigation restarts the countdown; keep it held while disabled.
  const actions = useMemo(() => {
    const run = (fn) => {
      fn(controller.current);
      if (!enabledRef.current) controller.current?.suspend();
    };
    return {
      go: (i) => run((c) => c?.go(i)),
      next: () => run((c) => c?.next()),
      prev: () => run((c) => c?.prev()),
      toggle: () => run((c) => c?.toggle()),
    };
  }, []);

  return { ...state, ...actions };
}
