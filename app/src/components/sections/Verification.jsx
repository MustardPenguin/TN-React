import { useState } from 'react';
import { cx } from '../../lib/cx.js';
import { useMediaQuery } from '../../hooks/useMediaQuery.js';
import { Icon, hasIcon } from '../ui/Icon.jsx';
import { SectionHead } from '../ui/SectionHead.jsx';
import './Verification.css';

// TrueNest's main selling point: the five verification steps.
// Left: ordered, expandable steps joined by a timeline.
// Right: a ring of five arcs (one per step, each with its icon beside it).
// Hovering (or keyboard-focusing) a step lights arcs 1..n and shows "n/5"
// with that step's icon; otherwise it's "5/5 · Fully verified".

// Step status for the timeline, given the active step (null = complete).
function stepStatus(index, active) {
  if (active === null || index < active) return 'is-done';
  return index === active ? 'is-current' : 'is-pending';
}

function Step({ step, index, total, status, open, onToggle, onHover, onFocusChange }) {
  const id = `verify-step-${index + 1}`;
  return (
    <li
      className={cx('verify-step', status, open && 'is-open')}
      onPointerEnter={(event) => event.pointerType !== 'touch' && onHover(index)}
      onPointerLeave={(event) => event.pointerType !== 'touch' && onHover(null)}
    >
      <h3 className="verify-step-head">
        <button
          type="button"
          className="verify-toggle"
          id={`${id}-label`}
          aria-expanded={open}
          aria-controls={id}
          onClick={() => onToggle(index)}
          // Only keyboard focus counts; a mouse click shouldn't pin the ring
          // after the pointer moves away.
          onFocus={(event) => event.currentTarget.matches(':focus-visible') && onFocusChange(index)}
          onBlur={() => onFocusChange(null, index)}
        >
          <span className="verify-marker" aria-hidden="true"><b>{index + 1}</b><Icon name="check" /></span>
          <span className="verify-icon" aria-hidden="true"><Icon name={step.icon} /></span>
          <span className="verify-text">
            <span className="sr-only">Step {index + 1} of {total}: </span>
            <span className="verify-title">{step.title}</span>
            <span className="verify-summary">{step.summary}</span>
          </span>
          <span className="verify-chevron" aria-hidden="true"><Icon name="chevronDown" /></span>
        </button>
      </h3>
      <div className="verify-details" id={id} role="region" aria-labelledby={`${id}-label`}>
        <div className="verify-details-inner"><p>{step.details}</p></div>
      </div>
    </li>
  );
}

// Ring geometry. Arcs use pathLength=100: each step gets 100/total, minus a
// small gap. Chips (step icons) sit outside the ring at each arc's midpoint,
// placed in % of the ring box so it can be resized from CSS.
const ARC_GAP = 3;
const CHIP_RADIUS = 42.6; // % of the ring box, from its centre

function arcDash(index, total) {
  const span = 100 / total;
  return { array: `${span - ARC_GAP} ${100 - span + ARC_GAP}`, offset: -(index * span + ARC_GAP / 2) };
}

function chipPosition(index, total) {
  const angle = ((index + 0.5) * 2 * Math.PI) / total; // clockwise from 12 o'clock
  return {
    left: `${(50 + CHIP_RADIUS * Math.sin(angle)).toFixed(2)}%`,
    top: `${(50 - CHIP_RADIUS * Math.cos(angle)).toFixed(2)}%`,
  };
}

// The centre of the ring is big enough for more detail, so it uses the
// `<name>Detailed` icon when Icon.jsx has one.
const centerIconName = (name) => (hasIcon(`${name}Detailed`) ? `${name}Detailed` : name);

// Visual only (aria-hidden): the section heading already states that every
// property passes all five checks, and hover changes shouldn't be announced.
function ProgressPanel({ steps, complete, active }) {
  const total = steps.length;
  const reached = active === null ? total : active + 1;
  const lit = (i) => i < reached && 'is-lit';
  return (
    <div className="verify-progress" aria-hidden="true">
      <div className="verify-ring">
        <svg viewBox="0 0 120 120">
          {steps.map((step, i) => {
            const dash = arcDash(i, total);
            return <circle key={step.title} className={cx('verify-arc', lit(i))} cx="60" cy="60" r="52" pathLength="100" strokeDasharray={dash.array} strokeDashoffset={dash.offset} />;
          })}
        </svg>
        {steps.map((step, i) => (
          <span key={step.title} className={cx('verify-chip', lit(i), i === active && 'is-current')} style={chipPosition(i, total)}><Icon name={step.icon} /></span>
        ))}
        <div className="verify-ring-label">
          <span className="verify-center">
            {active === null
              ? <span className="verify-center-icon verify-ring-check is-shown"><Icon name="check" /></span>
              : <span className="verify-center-icon is-shown"><Icon name={centerIconName(steps[active].icon)} /></span>}
          </span>
          <b>{reached}/{total}</b>
        </div>
      </div>
      <div className="verify-progress-text">
        <span className="verify-kicker">{active === null ? complete.kicker : `Step ${reached} of ${total}`}</span>
        <strong>{active === null ? complete.title : steps[active].title}</strong>
        <p>{active === null ? complete.text : steps[active].summary}</p>
      </div>
      <ul className="verify-pills">
        {steps.map((step, i) => <li key={step.title} className={cx('verify-pill', lit(i))}><Icon name="check" />{step.title}</li>)}
      </ul>
    </div>
  );
}

export function Verification({ intro, steps, complete }) {
  // Without hover (phones/tablets), the open step drives the ring instead.
  const noHover = useMediaQuery('(hover: none)');
  const [hovered, setHovered] = useState(null);
  const [focused, setFocused] = useState(null);
  const [open, setOpen] = useState(null);

  // Active step (drives the ring): hovered > keyboard-focused > (touch) open.
  // null means the complete 5/5 state.
  const active = hovered ?? focused ?? (noHover ? open : null);

  // One step open at a time; clicking the open step closes it.
  const toggle = (index) => setOpen((current) => (current === index ? null : index));
  // On blur, only clear focus if it still belongs to the step being left.
  const onFocusChange = (index, leaving) => setFocused((current) => (index === null && current !== leaving ? current : index));

  return (
    <section className={cx('verify', active === null && 'is-complete')}>
      <div className="container">
        <SectionHead {...intro} />
        <div className="verify-grid">
          <ol className="verify-steps">
            {steps.map((step, index) => (
              <Step
                key={step.title}
                step={step}
                index={index}
                total={steps.length}
                status={stepStatus(index, active)}
                open={open === index}
                onToggle={toggle}
                onHover={setHovered}
                onFocusChange={onFocusChange}
              />
            ))}
          </ol>
          <ProgressPanel steps={steps} complete={complete} active={active} />
        </div>
      </div>
    </section>
  );
}
