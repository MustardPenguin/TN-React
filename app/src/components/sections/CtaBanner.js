import { html } from '../../lib/html.js';
import './CtaBanner.css';

export function CtaBanner({ title, body, action }) {
  return html`
    <section class="cta">
      <div class="container">
        <div class="cta-box">
          <div>
            <h2>${title}</h2>
            <p>${body}</p>
          </div>
          <a href="${action.href}" class="btn">${action.label}</a>
        </div>
      </div>
    </section>`;
}
