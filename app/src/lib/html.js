// Minimal tagged-template renderer. Interpolated values are HTML-escaped
// unless they are themselves `html` results (or wrapped with `raw`), so
// components compose like JSX without injection risk.

const SAFE = Symbol('safe-html');

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const escape = (str) => str.replace(/[&<>"']/g, (ch) => ESCAPES[ch]);

/** Mark a trusted string (e.g. a static SVG) as safe markup. */
export const raw = (markup) => ({ [SAFE]: true, markup: String(markup) });

function toMarkup(value) {
  if (value == null || value === false || value === true) return '';
  if (Array.isArray(value)) return value.map(toMarkup).join('');
  if (value[SAFE]) return value.markup;
  return escape(String(value));
}

export function html(strings, ...values) {
  let out = strings[0];
  values.forEach((value, i) => {
    out += toMarkup(value) + strings[i + 1];
  });
  return raw(out);
}

/** Join class names, skipping falsy entries: cx('badge', isNew && 'new'). */
export const cx = (...names) => names.filter(Boolean).join(' ');

/** Render a component tree into a DOM element. */
export function mount(target, tree) {
  target.innerHTML = toMarkup(tree);
}
