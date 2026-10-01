import { html } from '../../lib/html.js';
import { Icon, hasIcon } from '../ui/Icon.js';
import { SectionHead } from '../ui/SectionHead.js';
import './Verification.css';

// TrueNest's main selling point: the five verification steps.
// Left: ordered, expandable steps joined by a timeline.
// Right: a ring of five arcs (one per step, each with its icon beside it).
// Hovering (or keyboard-focusing) a step lights arcs 1..n and shows "n/5"
// with that step's icon; otherwise it's "5/5 · Fully verified".

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

// Ring geometry. Arcs use pathLength=100: each step gets 100/total, minus a
// small gap. Chips (step icons) sit outside the ring at each arc's midpoint,
// placed in % of the ring box so it can be resized from CSS.
const ARC_GAP = 3;
const CHIP_RADIUS = 42.6; // % of the ring box, from its centre

function arcDash(index, total) {
  const span = 100 / total;
  return { array: `${span - ARC_GAP} ${100 - span + ARC_GAP}`, offset: -(index * span + ARC_GAP / 2) };
}

// The centre of the ring is big enough for more detail, so it uses the
// `<name>Detailed` icon when Icon.js has one.
const centerIconName = (name) => (hasIcon(`${name}Detailed`) ? `${name}Detailed` : name);

function chipPosition(index, total) {
  const angle = ((index + 0.5) * 2 * Math.PI) / total; // clockwise from 12 o'clock
  const left = 50 + CHIP_RADIUS * Math.sin(angle);
  const top = 50 - CHIP_RADIUS * Math.cos(angle);
  return `left:${left.toFixed(2)}%;top:${top.toFixed(2)}%`;
}

// Visual only (aria-hidden): the section heading already states that every
// property passes all five checks, and hover changes shouldn't be announced.
function ProgressPanel({ steps, complete }) {
  const total = steps.length;
  return html`
    <div class="verify-progress" aria-hidden="true" data-verify-progress
      data-complete-kicker="${complete.kicker}" data-complete-title="${complete.title}" data-complete-text="${complete.text}">
      <div class="verify-ring">
        <svg viewBox="0 0 120 120">
          ${steps.map((_, i) => {
            const dash = arcDash(i, total);
            return html`<circle class="verify-arc is-lit" cx="60" cy="60" r="52" pathLength="100" stroke-dasharray="${dash.array}" stroke-dashoffset="${dash.offset}" data-verify-arc/>`;
          })}
        </svg>
        ${steps.map((step, i) => html`
          <span class="verify-chip is-lit" style="${chipPosition(i, total)}" data-verify-chip>${Icon({ name: step.icon })}</span>`)}
        <div class="verify-ring-label">
          <span class="verify-center">
            <span class="verify-center-icon verify-ring-check is-shown" data-verify-center="complete">${Icon({ name: 'check' })}</span>
            ${steps.map((step, i) => html`<span class="verify-center-icon" data-verify-center="${i}">${Icon({ name: centerIconName(step.icon) })}</span>`)}
          </span>
          <b data-verify-count>${total}/${total}</b>
        </div>
      </div>
      <div class="verify-progress-text">
        <span class="verify-kicker" data-verify-kicker>${complete.kicker}</span>
        <strong data-verify-heading>${complete.title}</strong>
        <p data-verify-text>${complete.text}</p>
      </div>
      <ul class="verify-pills">
        ${steps.map((step) => html`<li class="verify-pill is-lit" data-verify-pill>${Icon({ name: 'check' })}${step.title}</li>`)}
      </ul>
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
          ${ProgressPanel({ steps, complete })}
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
  const arcs = [...panel.querySelectorAll('[data-verify-arc]')];
  const chips = [...panel.querySelectorAll('[data-verify-chip]')];
  const pills = [...panel.querySelectorAll('[data-verify-pill]')];
  const centerIcons = [...panel.querySelectorAll('[data-verify-center]')];
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

    // Steps 1..reached are lit on the ring, its chips, and the pills.
    [arcs, chips, pills].forEach((group) => group.forEach((el, i) => el.classList.toggle('is-lit', i < reached)));
    chips.forEach((chip, i) => chip.classList.toggle('is-current', i === active));
    const centerKey = complete ? 'complete' : String(active);
    centerIcons.forEach((icon) => icon.classList.toggle('is-shown', icon.dataset.verifyCenter === centerKey));
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
