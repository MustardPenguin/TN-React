import { html } from '../../lib/html.js';
import './Stats.css';

export function Stats({ items }) {
  return html`
    <section class="stats">
      <div class="container stats-grid">
        ${items.map((s) => html`<div class="stat"><b>${s.value}</b><span>${s.label}</span></div>`)}
      </div>
    </section>`;
}
