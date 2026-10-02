import { useEffect, useId, useRef, useState } from 'react';
import { cx } from '../../lib/cx.js';
import { Icon } from './Icon.jsx';
import { MiniRing } from './MiniRing.jsx';
import './VerifiedBadge.css';

/**
 * Verification badge for a listing card: a round white button (matching the
 * save/share buttons) holding the mini ring. No visible text, so the label is
 * in aria-label. Hover, keyboard focus or a tap opens a checklist of the
 * steps, which carries the wording. Steps are done in order, so `passed` means steps
 * 1..passed are done. `steps` are the verification steps
 * (data/verification.js).
 */
export function VerifiedBadge({ passed, steps }) {
  const id = useId();
  const root = useRef(null);
  const [open, setOpen] = useState(false);
  const lastPointer = useRef(null);
  const total = steps.length;
  const complete = passed >= total;

  // A tap toggles it; close on a tap/click elsewhere.
  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event) => {
      if (!root.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  return (
    <div
      className={cx('vb', complete ? 'is-verified' : 'is-partial', open && 'is-open')}
      ref={root}
      onPointerEnter={(event) => event.pointerType === 'mouse' && setOpen(true)}
      onPointerLeave={(event) => event.pointerType === 'mouse' && setOpen(false)}
      onKeyDown={(event) => event.key === 'Escape' && setOpen(false)}
    >
      <button
        type="button"
        className="vb-button"
        aria-label={complete ? 'TrueNest Verified: see checks' : `${passed} of ${total} checks passed: see checks`}
        aria-expanded={open}
        aria-controls={`${id}-checks`}
        // With a mouse, hover already opened it, so a click keeps it open;
        // taps and Enter/Space toggle it.
        onPointerDown={(event) => { lastPointer.current = event.pointerType; }}
        onClick={() => {
          if (lastPointer.current === 'mouse') setOpen(true);
          else setOpen((value) => !value);
          lastPointer.current = null;
        }}
        onFocus={(event) => event.currentTarget.matches(':focus-visible') && setOpen(true)}
        onBlur={(event) => !root.current.contains(event.relatedTarget) && setOpen(false)}
      >
        <MiniRing passed={passed} total={total} />
      </button>

      <div className="vb-card" id={`${id}-checks`} hidden={!open}>
        <div className="vb-card-title">{complete ? 'All checks passed' : `${passed} of ${total} checks passed`}</div>
        <ul className="vb-list">
          {steps.map((step, i) => (
            <li key={step.title} className={i < passed ? 'is-passed' : 'is-pending'}>
              <span className="vb-mark" aria-hidden="true">{i < passed && <Icon name="check" />}</span>
              {step.title}
              {i >= passed && <span className="vb-pending">Pending</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
