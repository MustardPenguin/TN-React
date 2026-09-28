import { html, cx } from '../../lib/html.js';
import { SectionHead } from '../ui/SectionHead.js';
import { ListingCard } from '../ui/ListingCard.js';
import './FeaturedListings.css';

export function FeaturedListings({ listings, filters, activeFilter = filters[0], location }) {
  return html`
    <section class="listings">
      <div class="container">
        ${SectionHead({
          eyebrow: 'Featured',
          title: 'Homes you might like',
          sub: `Fresh listings near ${location}`,
          link: { label: 'View all listings', href: '#' },
        })}
        <div class="filters">
          ${filters.map((f) => html`<span class="${cx('chip', f === activeFilter && 'active')}">${f}</span>`)}
        </div>
        <div class="carousel">
          ${listings.map((listing) => ListingCard({ listing }))}
        </div>
      </div>
    </section>`;
}
