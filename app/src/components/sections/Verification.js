import { html } from '../../lib/html.js';
import { Icon } from '../ui/Icon.js';
import { SectionHead } from '../ui/SectionHead.js';
import './Verification.css';

// TrueNest's main selling point: the five verification steps.
// Left: ordered, expandable steps joined by a timeline.
// Right: a progress ring. It shows "n/5" for the step being hovered (or
// keyboard-focused) and "5/5 · Fully verified" otherwise.

function Step({ step, index, total }) {
  const id = `verify-step-${index + 1}`;
  return html`
    <li class="verify-step is-done" data-verify-step>
      <h3 class="verify-step-head">
        <button type="button" class="verify-toggle" id="${id}-label" aria-expanded="false" aria-controls="${id}" data-verify-toggle>
          <span class="verify-marker" aria-hidden="true"><b>${index + 1}</b>${Icon({ name: 'check' })}</span>
          <span class="verify-icon" aria-hidden="true">${Icon({ name: step.icon })}</span>
          <span class="verify-text">
            <span class="sr-only">Step ${index + 1} of ${total}: </span>
            <span class="verify-title" data-verify-title>${step.title}</span>
            <span class="verify-summary" data-verify-summary>${step.summary}</span>
          </span>
          <span class="verify-chevron" aria-hidden="true">${Icon({ name: 'chevronDown' })}</span>
        </button>
      </h3>
      <div class="verify-details" id="${id}" role="region" aria-labelledby="${id}-label">
        <div class="verify-details-inner"><p>${step.details}</p></div>
      </div>
    </li>`;
}

// Visual only (aria-hidden): the section heading already states that every
// property passes all five checks, and hover changes shouldn't be announced.
function ProgressPanel({ total, complete }) {
  return html`
    <div class="verify-progress" aria-hidden="true" data-verify-progress
      data-complete-kicker="${complete.kicker}" data-complete-title="${complete.title}" data-complete-text="${complete.text}">
      <div class="verify-ring">
        <svg viewBox="0 0 120 120">
          <circle class="verify-ring-track" cx="60" cy="60" r="52"/>
          <circle class="verify-ring-fill" cx="60" cy="60" r="52" pathLength="100" stroke-dashoffset="0" data-verify-fill/>
        </svg>
        <div class="verify-ring-label">
          <span class="verify-ring-check">${Icon({ name: 'check' })}</span>
          <b data-verify-count>${total}/${total}</b>
        </div>
      </div>
      <div class="verify-progress-text">
        <span class="verify-kicker" data-verify-kicker>${complete.kicker}</span>
        <strong data-verify-heading>${complete.title}</strong>
        <p data-verify-text>${complete.text}</p>
      </div>
    </div>`;
}

export function Verification({ intro, steps, complete }) {
  return html`
    <section class="verify is-complete" data-verify>
      <div class="container">
        ${SectionHead(intro)}
        <div class="verify-grid">
          <ol class="verify-steps">
            ${steps.map((step, index) => Step({ step, index, total: steps.length }))}
          </ol>
          ${ProgressPanel({ total: steps.length, complete })}
        </div>
      </div>
    </section>`;
}

/**
 * Wire up expand/collapse and the progress indicator. Returns a cleanup function.
 * Active step (drives the ring): hovered > keyboard-focused > (touch only) open.
 * No active step means the complete 5/5 state.
 */
export function initVerification(root) {
  const section = root.querySelector('[data-verify]');
  if (!section) return () => {};

  const steps = [...section.querySelectorAll('[data-verify-step]')];
  const toggles = steps.map((step) => step.querySelector('[data-verify-toggle]'));
  const panel = section.querySelector('[data-verify-progress]');
  const fill = panel.querySelector('[data-verify-fill]');
  const count = panel.querySelector('[data-verify-count]');
  const kicker = panel.querySelector('[data-verify-kicker]');
  const heading = panel.querySelector('[data-verify-heading]');
  const text = panel.querySelector('[data-verify-text]');
  const total = steps.length;
  // Without hover (phones/tablets), the open step drives the ring instead.
  const noHover = window.matchMedia('(hover: none)').matches;

  let hovered = null;
  let focused = null;
  let open = null;

  function render() {
    const active = hovered ?? focused ?? (noHover ? open : null);
    const complete = active === null;
    const reached = complete ? total : active + 1;

    steps.forEach((step, i) => {
      step.classList.toggle('is-done', complete || i < active);
      step.classList.toggle('is-current', i === active);
      step.classList.toggle('is-pending', !complete && i > active);
    });
    section.classList.toggle('is-complete', complete);

    fill.setAttribute('stroke-dashoffset', String(100 - (100 * reached) / total));
    count.textContent = `${reached}/${total}`;
    if (complete) {
      kicker.textContent = panel.dataset.completeKicker;
      heading.textContent = panel.dataset.completeTitle;
      text.textContent = panel.dataset.completeText;
    } else {
      kicker.textContent = `Step ${reached} of ${total}`;
      heading.textContent = steps[active].querySelector('[data-verify-title]').textContent;
      text.textContent = steps[active].querySelector('[data-verify-summary]').textContent;
    }
  }

  // One step open at a time; clicking the open step closes it.
  function toggle(index) {
    open = open === index ? null : index;
    steps.forEach((step, i) => {
      step.classList.toggle('is-open', i === open);
      toggles[i].setAttribute('aria-expanded', String(i === open));
    });
    render();
  }

  const listeners = new AbortController();
  const { signal } = listeners;
  steps.forEach((step, i) => {
    step.addEventListener('pointerenter', (event) => {
      if (event.pointerType === 'touch') return;
      hovered = i;
      render();
    }, { signal });
    step.addEventListener('pointerleave', (event) => {
      if (event.pointerType === 'touch') return;
      hovered = null;
      render();
    }, { signal });

    const button = toggles[i];
    button.addEventListener('click', () => toggle(i), { signal });
    // Only keyboard focus counts; a mouse click shouldn't pin the ring after
    // the pointer moves away.
    button.addEventListener('focus', () => {
      if (!button.matches(':focus-visible')) return;
      focused = i;
      render();
    }, { signal });
    button.addEventListener('blur', () => {
      if (focused !== i) return;
      focused = null;
      render();
    }, { signal });
  });

  render();
  return () => listeners.abort();
}
