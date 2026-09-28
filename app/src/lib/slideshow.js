// Framework-agnostic slideshow state: current index, autoplay timer, and
// play/pause. It never touches the DOM — the caller renders via `onChange`.
// (In React this becomes a `useSlideshow` hook with the same API.)

export function createSlideshow({ count, interval = 6000, onChange }) {
  let index = 0;
  let playing = false;
  let timer = null;

  const emit = () => onChange?.({ index, count, playing });
  const clear = () => {
    clearTimeout(timer);
    timer = null;
  };
  // Every navigation restarts the countdown, so a manual change always gets
  // a full interval on screen before autoplay moves on.
  const schedule = () => {
    clear();
    if (playing && count > 1) timer = setTimeout(() => go(index + 1), interval);
  };

  function go(i) {
    index = (i + count) % count;
    schedule();
    emit();
  }

  function setPlaying(value) {
    playing = value && count > 1;
    schedule();
    emit();
  }

  return {
    go,
    next: () => go(index + 1),
    prev: () => go(index - 1),
    play: () => setPlaying(true),
    pause: () => setPlaying(false),
    toggle: () => setPlaying(!playing),
    /** Stop the timer without changing `playing` (e.g. hidden tab). */
    suspend: clear,
    /** Restart the timer after `suspend`. */
    resume: () => { schedule(); emit(); },
    destroy: clear,
    get state() { return { index, count, playing }; },
  };
}
