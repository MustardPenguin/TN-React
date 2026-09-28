import { html } from '../../lib/html.js';

export function SectionHead({ eyebrow, title, sub, link }) {
  return html`
    <div class="section-head">
      <div>
        ${eyebrow && html`<div class="eyebrow">${eyebrow}</div>`}
        <h2>${title}</h2>
        ${sub && html`<p class="sub">${sub}</p>`}
      </div>
      ${link && html`<a href="${link.href}" class="link-arrow">${link.label} →</a>`}
    </div>`;
}
