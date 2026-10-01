// Renders a trusted, static SVG string (from Icon.jsx / Illustration.jsx) as a
// real <svg> element, with no wrapper, so CSS like `.fav svg` still matches.
// Only ever pass markup written in this codebase, never user content.

const cache = new Map();
const ATTRIBUTE = /([^\s=]+)="([^"]*)"/g;

// SVG attribute name -> React prop: stroke-width -> strokeWidth, class ->
// className. aria-*/data-* and namespaced (xmlns:x) names stay as written.
function toProp(name) {
  if (name === 'class') return 'className';
  if (name.startsWith('aria-') || name.startsWith('data-') || name.includes(':')) return name;
  return name.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

function parse(markup) {
  let parsed = cache.get(markup);
  if (!parsed) {
    const match = markup.trim().match(/^<svg\b([^>]*)>([\s\S]*)<\/svg>$/);
    if (!match) throw new Error('Svg: expected markup with a single <svg> root');
    const props = {};
    for (const [, name, value] of match[1].matchAll(ATTRIBUTE)) props[toProp(name)] = value;
    parsed = { props, inner: match[2] };
    cache.set(markup, parsed);
  }
  return parsed;
}

export function Svg({ markup, ...rest }) {
  const { props, inner } = parse(markup);
  return <svg {...props} {...rest} dangerouslySetInnerHTML={{ __html: inner }} />;
}
