import { Svg } from './Svg.jsx';

// Static, trusted SVG markup, rendered by <Svg>. Sizing comes from the parent's CSS
// (e.g. `.icon-wrap svg`), so most icons carry no width/height.
const ICONS = {
  menu: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  arrowRight: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  chevronLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m15 6-6 6 6 6"/></svg>',
  chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>',
  pause: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg>',
  building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1"/></svg>',
  plusSquare: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/><rect x="3" y="3" width="18" height="18" rx="4"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="#1a1f2b" stroke-width="2"><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9Z"/></svg>',
  heartFilled: '<svg viewBox="0 0 24 24" fill="#e11d48" stroke="#e11d48" stroke-width="2"><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9Z"/></svg>',
  // Header icons use currentColor so they follow the link's hover colour.
  saved: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9Z"/></svg>',
  help: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.6 9.3a2.5 2.5 0 0 1 4.8.9c0 1.7-2.4 2.2-2.4 3.8"/><path d="M12 17.2h.01"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4.5 20.5c1.2-3.6 4.2-5.5 7.5-5.5s6.3 1.9 7.5 5.5"/></svg>',
  share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="19" r="2.6"/><path d="m8.4 13.4 7.2 4.2M15.6 6.4l-7.2 4.2"/></svg>',
  eye:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
  chevronDown:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
  // Verification steps. Two-tone: a tinted fill of one shape (22% of the
  // icon's colour) under the outline, for depth without extra lines.
  deed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h8l5 5v13H6z" fill="currentColor" fill-opacity=".22" stroke="none"/><path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5"/><path d="M9 12h7M9 16h4"/></svg>',
  scales: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 13a2.5 2.5 0 0 0 5 0zM16.5 13a2.5 2.5 0 0 0 5 0z" fill="currentColor" fill-opacity=".22" stroke="none"/><path d="M12 4v16M8 20h8M5 7h14"/><path d="M5 7 2.5 13a2.5 2.5 0 0 0 5 0z"/><path d="m19 7-2.5 6a2.5 2.5 0 0 0 5 0z"/></svg>',
  shieldCheck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 20 6v6c0 4.6-3.4 7.9-8 9-4.6-1.1-8-4.4-8-9V6z" fill="currentColor" fill-opacity=".22" stroke="none"/><path d="M12 3 20 6v6c0 4.6-3.4 7.9-8 9-4.6-1.1-8-4.4-8-9V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg>',
  bank: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10 12 4l9 6z" fill="currentColor" fill-opacity=".22" stroke="none"/><path d="M3 10 12 4l9 6z"/><path d="M5.5 10v8M10 10v8M14 10v8M18.5 10v8"/><path d="M3 20h18"/></svg>',
  mapPin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" fill="currentColor" fill-opacity=".22" stroke="none"/><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  // Detailed versions for the large icon in the centre of the progress ring
  // (Verification.js uses `<name>Detailed` when one exists). Thinner strokes
  // leave room for the extra detail.
  deedDetailed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 2.5h8.5l5 5v14H5z" fill="currentColor" fill-opacity=".22" stroke="none"/><path d="M5 2.5h8.5l5 5v14H5z"/><path d="M13.5 2.5v5h5"/><path d="M8 10h7M8 13h7M8 16h3"/><circle cx="16" cy="17.5" r="2.6" fill="currentColor" stroke="none"/><path d="m14.8 19.8-.8 2.7 2-1 2 1-.8-2.7"/></svg>',
  scalesDetailed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M1.5 13.5h5a2.5 2.5 0 0 1-5 0zM17.5 13.5h5a2.5 2.5 0 0 1-5 0zM8.5 21.5h7l-1.5-2.5h-4z" fill="currentColor" fill-opacity=".22" stroke="none"/><circle cx="12" cy="4.5" r="1.3"/><path d="M12 5.8V19M4 7.5h16"/><path d="M4 7.5 1.8 13.5M4 7.5l2.2 6M20 7.5l-2.2 6M20 7.5l2.2 6"/><path d="M1.5 13.5h5a2.5 2.5 0 0 1-5 0zM17.5 13.5h5a2.5 2.5 0 0 1-5 0z"/><path d="M8.5 21.5h7l-1.5-2.5h-4z"/></svg>',
  shieldCheckDetailed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.5 20 5.5V12c0 4.8-3.4 8.3-8 9.5-4.6-1.2-8-4.7-8-9.5V5.5z" fill="currentColor" fill-opacity=".22" stroke="none"/><path d="M12 2.5 20 5.5V12c0 4.8-3.4 8.3-8 9.5-4.6-1.2-8-4.7-8-9.5V5.5z"/><path d="M12 5 17.6 7.1V12c0 3.4-2.4 6-5.6 7-3.2-1-5.6-3.6-5.6-7V7.1z" stroke-opacity=".5"/><path d="m9 12 2.2 2.2 4-4.2"/></svg>',
  bankDetailed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 9 12 3.5 21.5 9z" fill="currentColor" fill-opacity=".22" stroke="none"/><path d="M2.5 9 12 3.5 21.5 9z"/><circle cx="12" cy="6.9" r=".9" fill="currentColor" stroke="none"/><path d="M3.5 10.8h17"/><path d="M6 12.8v5M10 12.8v5M14 12.8v5M18 12.8v5"/><path d="M3.5 19.5h17M2.5 21.5h19"/></svg>',
  mapPinDetailed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s-7.5-6.4-7.5-11.5a7.5 7.5 0 0 1 15 0C19.5 15.6 12 22 12 22z" fill="currentColor" fill-opacity=".22" stroke="none"/><path d="M12 22s-7.5-6.4-7.5-11.5a7.5 7.5 0 0 1 15 0C19.5 15.6 12 22 12 22z"/><path d="M8.8 11.2 12 8.5l3.2 2.7"/><path d="M9.8 10.5v3.8h4.4v-3.8"/></svg>',
  facebook: '<svg viewBox="0 0 24 24"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8Z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24"><path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm5-9.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4ZM7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24"><path d="M4 9h4v12H4V9Zm2-6a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm4 6h4v2c.6-1.1 2-2.2 4-2.2 4 0 4 2.6 4 6V21h-4v-5.4c0-1.6 0-3.4-2.2-3.4S14 14 14 15.5V21h-4V9Z"/></svg>',
};

export const hasIcon = (name) => name in ICONS;

export function Icon({ name }) {
  const svg = ICONS[name];
  if (!svg) throw new Error(`Unknown icon: ${name}`);
  return <Svg markup={svg} />;
}
