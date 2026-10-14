// Scroll to a section and focus it (give the target tabIndex={-1}), for
// keyboard and screen-reader users. Used instead of #anchor links, which hash
// routing would treat as page URLs.
export function jumpTo(id) {
  const target = document.getElementById(id);
  if (!target) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  target.focus({ preventScroll: true });
}
