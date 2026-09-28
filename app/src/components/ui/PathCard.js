import { html } from '../../lib/html.js';
import { Icon } from './Icon.js';
import './PathCard.css';

export function PathCard({ icon, title, body, link }) {
  return html`
    <div class="path-card">
      <div class="icon-wrap">${Icon({ name: icon })}</div>
      <h3>${title}</h3>
      <p>${body}</p>
      <a href="${link.href}" class="link-arrow">${link.label} →</a>
    </div>`;
}
