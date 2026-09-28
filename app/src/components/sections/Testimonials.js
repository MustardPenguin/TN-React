import { html } from '../../lib/html.js';
import { SectionHead } from '../ui/SectionHead.js';
import { TestimonialCard } from '../ui/TestimonialCard.js';
import './Testimonials.css';

export function Testimonials({ items }) {
  return html`
    <section class="testimonials">
      <div class="container">
        ${SectionHead({ eyebrow: 'Testimonials', title: 'What people are saying' })}
        <div class="t-grid">
          ${items.map(TestimonialCard)}
        </div>
      </div>
    </section>`;
}
