import { cx } from '../../lib/cx.js';
import './Logo.css';

// `variant="dark"` is the footer version: brand-coloured mark with the
// door cut out in the footer background colour.
export function Logo({ variant = 'light', href = '#' }) {
  const dark = variant === 'dark';
  return (
    <a href={href} className={cx('logo', dark && 'logo--dark')}>
      {dark ? (
        <svg viewBox="0 0 32 32" fill="none" width="30" height="30"><path d="M16 3 3 14h4v14h18V14h4L16 3Z" fill="#0e7c7b" /><path d="M12 28v-8h8v8" fill="#0f1520" /></svg>
      ) : (
        <svg viewBox="0 0 32 32" fill="none"><path d="M16 3 3 14h4v14h18V14h4L16 3Z" fill="currentColor" /><path d="M12 28v-8h8v8" fill="#fff" /></svg>
      )}
      TrueNest
    </a>
  );
}
