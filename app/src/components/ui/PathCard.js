import { html } from '../../lib/html.js';
import { Illustration } from './Illustration.js';
import './PathCard.css';

export function PathCard({ illustration, title, body, link }) {
  return html`
    <div class="path-card">
      <div class="path-art">${Illustration({ name: illustration })}</div>
      <h3>${title}</h3>
      <p>${body}</p>
      <a href="${link.href}" class="link-arrow">${link.label} →</a>
    </div>`;
}
