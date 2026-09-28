import { html } from '../../lib/html.js';
import './TestimonialCard.css';

const MAX_RATING = 5;
const stars = (rating) => '★'.repeat(rating) + '☆'.repeat(MAX_RATING - rating);

export function TestimonialCard({ rating, quote, name, initials, role, color }) {
  return html`
    <div class="t-card">
      <div class="stars" role="img" aria-label="${rating} out of ${MAX_RATING} stars">${stars(rating)}</div>
      <p>"${quote}"</p>
      <div class="person"><div class="avatar" style="background:${color}">${initials}</div><div><b>${name}</b><span>${role}</span></div></div>
    </div>`;
}
