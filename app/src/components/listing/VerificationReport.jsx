import { useState } from 'react';
import { cx } from '../../lib/cx.js';
import { Icon } from '../ui/Icon.jsx';
import { MiniRing } from '../ui/MiniRing.jsx';
import './VerificationReport.css';

// This listing's verification report: one row per check, in order, with the
// result and date (or when it's expected). Each row expands for details.
// `steps` are the verification steps (data/verification.js); `checks` are
// this listing's results, same order. Steps are done in order, so the first
// `passed` checks are complete.
export function VerificationReport({ steps, checks, passed }) {
  const [open, setOpen] = useState(null);
  const total = steps.length;
  const complete = passed >= total;
  const lastDate = [...checks].reverse().find((c) => c.date)?.date;

  return (
    <section className="lp-section vr" aria-labelledby="verification">
      <div className={cx('vr-head', complete ? 'is-complete' : 'is-partial')}>
        <MiniRing passed={passed} total={total} />
        <div>
          <h2 id="verification" tabIndex={-1}>{complete ? 'Fully verified by TrueNest' : 'Verification in progress'}</h2>
          <p>{passed} of {total} checks passed{lastDate && ` · last updated ${lastDate}`}</p>
        </div>
      </div>

      <ol className="vr-list">
        {steps.map((step, i) => {
          const check = checks[i] ?? {};
          const done = i < passed;
          const isOpen = open === i;
          const panelId = `vr-detail-${i}`;
          // Passed rows expand (button); pending rows have nothing to expand
          // (plain row, so screen readers still read the status).
          const Row = done ? 'button' : 'div';
          const rowProps = done
            ? { type: 'button', 'aria-expanded': isOpen, 'aria-controls': panelId, onClick: () => setOpen(isOpen ? null : i) }
            : {};
          return (
            <li key={step.title} className={cx('vr-row', done ? 'is-passed' : 'is-pending', isOpen && 'is-open')}>
              <Row className="vr-toggle" {...rowProps}>
                <span className="vr-icon" aria-hidden="true"><Icon name={step.icon} /></span>
                <span className="vr-text">
                  <span className="vr-title">{step.title}</span>
                  <span className="vr-finding">{done ? check.finding : step.summary}</span>
                </span>
                <span className="vr-status">
                  {done
                    ? <><span className="vr-chip"><Icon name="check" />Passed</span><span className="vr-date">{check.date}</span></>
                    : <><span className="vr-chip">In progress</span><span className="vr-date">{check.eta}</span></>}
                </span>
                {done && <span className="vr-chevron" aria-hidden="true"><Icon name="chevronDown" /></span>}
              </Row>
              {done && (
                <div className="vr-detail" id={panelId} role="region" aria-label={`${step.title} details`} hidden={!isOpen}>
                  <p>{check.detail}</p>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
