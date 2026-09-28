import { html } from '../../lib/html.js';
import { SectionHead } from '../ui/SectionHead.js';
import { CityCard } from '../ui/CityCard.js';
import './Cities.css';

export function Cities({ cities }) {
  return html`
    <section>
      <div class="container">
        ${SectionHead({ eyebrow: 'Explore', title: 'Browse homes by area', link: { label: 'All areas', href: '#' } })}
        <div class="city-grid">
          ${cities.map((city) => CityCard({ city }))}
        </div>
      </div>
    </section>`;
}
