import { raw } from '../../lib/html.js';

// Small spot illustrations (a person with an expressive face plus a prop),
// drawn as static, trusted SVG. Colours match the design tokens:
// brand #0e7c7b, navy #1d3b53, accent #f59e0b, brand-light #e6f4f3.
// Decorative: the card heading carries the meaning, so they're aria-hidden.

const svg = (body) =>
  `<svg viewBox="0 0 160 140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">${body}</svg>`;

// Shared face parts: blush cheeks either side of a head centred at (cx, cy).
const cheeks = (cx, cy) =>
  `<circle cx="${cx - 11}" cy="${cy + 7}" r="3.2" fill="#e98b6d" opacity=".55"/><circle cx="${cx + 11}" cy="${cy + 7}" r="3.2" fill="#e98b6d" opacity=".55"/>`;

const ILLUSTRATIONS = {
  // Buy a home: excited woman holding up new house keys, house behind her.
  buyer: svg(`
    <circle cx="82" cy="78" r="58" fill="#e6f4f3"/>
    <rect x="26" y="94" width="40" height="40" fill="#fff" stroke="#1d3b53" stroke-width="3"/>
    <path d="M20 98 L46 74 L72 98" fill="none" stroke="#1d3b53" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="40" y="112" width="12" height="22" rx="1.5" fill="#0e7c7b"/>
    <rect x="30" y="100" width="8" height="8" fill="#e6f4f3" stroke="#1d3b53" stroke-width="2"/>
    <rect x="87" y="62" width="10" height="10" fill="#c68a5e"/>
    <path d="M62 140 V104 q0-32 30-32 q30 0 30 32 V140 Z" fill="#0e7c7b"/>
    <path d="M85 72 L92 82 L99 72 Z" fill="#c68a5e"/>
    <path d="M113 90 Q127 80 130 62" fill="none" stroke="#0e7c7b" stroke-width="11" stroke-linecap="round"/>
    <circle cx="130" cy="57" r="6.5" fill="#c68a5e"/>
    <circle cx="130" cy="44" r="5" fill="none" stroke="#f59e0b" stroke-width="3"/>
    <path d="M130 39 V22 M130 26 h5 M130 31 h4" fill="none" stroke="#f59e0b" stroke-width="3.2" stroke-linecap="round"/>
    <path d="M146 28 l1.8 4.2 4.2 1.8 -4.2 1.8 -1.8 4.2 -1.8-4.2 -4.2-1.8 4.2-1.8z" fill="#f59e0b"/>
    <path d="M114 18 l1.2 2.8 2.8 1.2 -2.8 1.2 -1.2 2.8 -1.2-2.8 -2.8-1.2 2.8-1.2z" fill="#f59e0b"/>
    <circle cx="92" cy="27" r="8" fill="#2d1e1a"/>
    <circle cx="92" cy="50" r="17" fill="#c68a5e"/>
    <path d="M75 50 q0-19 17-19 q17 0 17 19 q-4-10 -17-10 q-13 0 -17 10z" fill="#2d1e1a"/>
    <path d="M81 44 q4-3.5 8 0 M95 44 q4-3.5 8 0" fill="none" stroke="#2d1e1a" stroke-width="1.8" stroke-linecap="round"/>
    <circle cx="86" cy="50.5" r="2.3" fill="#1a1f2b"/><circle cx="98" cy="50.5" r="2.3" fill="#1a1f2b"/>
    <path d="M86 57 q6 8 12 0 z" fill="#7a2e2a"/>
    ${cheeks(92, 50)}
  `),

  // Rent a home: cheerful man carrying a moving box, apartment block behind.
  renter: svg(`
    <circle cx="80" cy="78" r="58" fill="#e6f4f3"/>
    <rect x="104" y="40" width="40" height="94" rx="3" fill="#1d3b53"/>
    ${[48, 60, 72, 84].map((y) => [110, 121, 132].map((x) => `<rect x="${x}" y="${y}" width="6" height="7" rx="1" fill="#e6f4f3"/>`).join('')).join('')}
    <rect x="67" y="62" width="10" height="10" fill="#a86b45"/>
    <path d="M42 140 V102 q0-32 30-32 q30 0 30 32 V140 Z" fill="#f59e0b"/>
    <path d="M63 71 q9 7 18 0" fill="none" stroke="#d98706" stroke-width="3" stroke-linecap="round"/>
    <path d="M50 88 Q40 97 45 106 M94 88 Q104 97 99 106" fill="none" stroke="#f59e0b" stroke-width="11" stroke-linecap="round"/>
    <rect x="46" y="94" width="52" height="40" rx="3" fill="#d49a5c" stroke="#a8703a" stroke-width="2"/>
    <rect x="66" y="94" width="12" height="40" fill="#e8c08c"/>
    <rect x="52" y="112" width="11" height="8" rx="1" fill="#fff" opacity=".85"/>
    <circle cx="46" cy="106" r="6.5" fill="#a86b45"/><circle cx="98" cy="106" r="6.5" fill="#a86b45"/>
    <circle cx="72" cy="48" r="17" fill="#a86b45"/>
    <path d="M55 47 q0-20 17-20 q17 0 17 20 q-2-7 -7-9 q-8 4 -20 2 q-5 2 -7 7z" fill="#1f1714"/>
    <path d="M63 50 q3.5-3.5 7 0 M74 50 q3.5-3.5 7 0" fill="none" stroke="#1a1f2b" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M65 56 q7 7 14 0" fill="none" stroke="#1a1f2b" stroke-width="2.2" stroke-linecap="round"/>
    ${cheeks(72, 48)}
  `),

  // List your property: confident woman holding checked documents, winking.
  owner: svg(`
    <circle cx="80" cy="78" r="58" fill="#e6f4f3"/>
    <path d="M61 52 q0-26 19-26 q19 0 19 26 v20 q-5 4 -9 0 v-14 h-20 v14 q-4 4 -9 0z" fill="#3a2622"/>
    <rect x="75" y="62" width="10" height="10" fill="#b97a50"/>
    <path d="M50 140 V102 q0-32 30-32 q30 0 30 32 V140 Z" fill="#1d3b53"/>
    <path d="M73 71 L80 81 L87 71 Z" fill="#b97a50"/>
    <g transform="rotate(-6 80 110)">
      <rect x="63" y="80" width="44" height="54" rx="4" fill="#e4e7ec"/>
      <rect x="58" y="84" width="44" height="54" rx="4" fill="#fff" stroke="#1d3b53" stroke-width="2"/>
      <rect x="65" y="94" width="22" height="4" rx="2" fill="#0e7c7b"/>
      <rect x="65" y="104" width="30" height="3" rx="1.5" fill="#cfd6de"/>
      <rect x="65" y="111" width="26" height="3" rx="1.5" fill="#cfd6de"/>
      <rect x="65" y="118" width="30" height="3" rx="1.5" fill="#cfd6de"/>
    </g>
    <path d="M55 90 Q47 110 60 125 M105 90 Q113 110 100 125" fill="none" stroke="#1d3b53" stroke-width="11" stroke-linecap="round"/>
    <circle cx="60" cy="125" r="6.5" fill="#b97a50"/><circle cx="100" cy="125" r="6.5" fill="#b97a50"/>
    <circle cx="104" cy="84" r="11" fill="#0e7c7b" stroke="#fff" stroke-width="2.5"/>
    <path d="M99 84 l3.5 3.8 l7-7.8" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="80" cy="48" r="17" fill="#b97a50"/>
    <path d="M63 47 q2-17 17-17 q15 0 17 17 q-8-8 -17-8 q-9 0 -17 8z" fill="#3a2622"/>
    <path d="M71 50 q3.5 2.5 7 0" fill="none" stroke="#1a1f2b" stroke-width="2.2" stroke-linecap="round"/>
    <circle cx="86" cy="49.5" r="2.3" fill="#1a1f2b"/>
    <path d="M83 43.5 q3.5-2.5 7 0" fill="none" stroke="#3a2622" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M73 56 q7 6.5 14 0" fill="none" stroke="#1a1f2b" stroke-width="2.2" stroke-linecap="round"/>
    ${cheeks(80, 48)}
  `),
};

export function Illustration({ name }) {
  const markup = ILLUSTRATIONS[name];
  if (!markup) throw new Error(`Unknown illustration: ${name}`);
  return raw(markup);
}
