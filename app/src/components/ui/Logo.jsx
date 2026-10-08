import { cx } from '../../lib/cx.js';
import './Logo.css';

// House mark with a check inside (verification-first). The house uses
// currentColor and the check uses --logo-cut, so the header can recolour both
// (e.g. white house + green check over the hero photo).
// `variant="dark"` is the footer version: brand-coloured house with the check
// cut out in the footer background colour.
const HOUSE = 'M16 3 3 14h4v14h18V14h4L16 3Z';
const CHECK = 'm11.4 20.4 3.4 3.4 6-6.4';

export function Logo({ variant = 'light', href = '#' }) {
  const dark = variant === 'dark';
  return (
    <a href={href} className={cx('logo', dark && 'logo--dark')}>
      <svg viewBox="0 0 32 32" fill="none" width="30" height="30" aria-hidden="true">
        <path d={HOUSE} fill={dark ? '#0e7c7b' : 'currentColor'} />
        <path d={CHECK} className="logo-check" stroke={dark ? '#0f1520' : undefined} />
      </svg>
      <span className="logo-text">TrueNest</span>
    </a>
  );
}
