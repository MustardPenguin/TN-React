import { html } from '../../lib/html.js';
import { PathCard } from '../ui/PathCard.js';
import './Paths.css';

export function Paths({ items }) {
  return html`
    <section class="paths">
      <div class="container">
        <div class="path-grid">
          ${items.map(PathCard)}
        </div>
      </div>
    </section>`;
}
