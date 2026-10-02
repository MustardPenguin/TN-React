import { cx } from '../../lib/cx.js';
import './MiniRing.css';

// Mini version of the verification ring: one arc per step, passed arcs lit
// (teal when complete, amber in progress). The centre shows a check when
// complete, otherwise the number of checks passed. Decorative: callers give
// the meaning in text or an aria-label. Size it from CSS (width/height).
const ARC_GAP = 7; // in pathLength units (out of 100)

export function MiniRing({ passed, total, className }) {
  const complete = passed >= total;
  const span = 100 / total;
  return (
    <svg className={cx('mini-ring', complete ? 'is-complete' : 'is-partial', className)} viewBox="0 0 20 20" aria-hidden="true">
      {Array.from({ length: total }, (_, i) => (
        <circle
          key={i}
          className={i < passed ? 'is-passed' : undefined}
          cx="10" cy="10" r="8" pathLength="100"
          strokeDasharray={`${span - ARC_GAP} ${100 - span + ARC_GAP}`}
          strokeDashoffset={-(i * span + ARC_GAP / 2)}
          transform="rotate(-90 10 10)"
        />
      ))}
      {complete
        ? <path className="mini-ring-check" d="m6.6 10.3 2.3 2.3 4.6-4.9" />
        : <text className="mini-ring-count" x="10" y="10.4" textAnchor="middle" dominantBaseline="central">{passed}</text>}
    </svg>
  );
}
