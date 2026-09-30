// Framework-agnostic typewriter: types a phrase out, holds it, deletes it,
// then moves to the next, looping. It never touches the DOM — the caller
// renders the current text via `onUpdate`. (In React this becomes a
// `useTypewriter` hook.)

export function createTypewriter({
  phrases,
  onUpdate,
  typeDelay = 70,      // ms per character typed
  deleteDelay = 35,    // ms per character deleted
  holdDelay = 1800,    // ms a finished phrase stays on screen
  nextDelay = 400,     // ms of empty text before the next phrase
}) {
  let phraseIndex = 0;
  let length = 0;
  let deleting = false;
  let timer = null;

  const current = () => phrases[phraseIndex];

  function tick() {
    if (!deleting) {
      length += 1;
      onUpdate(current().slice(0, length));
      if (length === current().length) {
        deleting = true;
        timer = setTimeout(tick, holdDelay);
      } else {
        timer = setTimeout(tick, typeDelay);
      }
      return;
    }

    length -= 1;
    onUpdate(current().slice(0, length));
    if (length === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      timer = setTimeout(tick, nextDelay);
    } else {
      timer = setTimeout(tick, deleteDelay);
    }
  }

  return {
    start() {
      if (timer || phrases.length === 0) return;
      timer = setTimeout(tick, nextDelay);
    },
    /** Stop and reset, so the next start() types the following phrase from scratch. */
    stop() {
      clearTimeout(timer);
      timer = null;
      if (length > 0) phraseIndex = (phraseIndex + 1) % phrases.length;
      length = 0;
      deleting = false;
    },
    get running() { return timer !== null; },
  };
}
