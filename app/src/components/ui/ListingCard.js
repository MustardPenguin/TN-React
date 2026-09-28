import { html, cx } from '../../lib/html.js';
import { formatPrice, formatNumber, backgroundImage } from '../../lib/format.js';
import { Icon } from './Icon.js';
import './ListingCard.css';

export function ListingCard({ listing, href = '#' }) {
  const {
    image, fallback, badge, price, listingType, propertyType,
    beds, baths, sqft, address, saved,
  } = listing;
  const isRental = listingType === 'rent';

  return html`
    <a href="${href}" class="card">
      <div class="card-img" style="${backgroundImage(image, fallback)}">
        ${badge && html`<span class="${cx('badge', badge.tone)}">${badge.label}</span>`}
        <span class="fav">${Icon({ name: saved ? 'heartFilled' : 'heart' })}</span>
      </div>
      <div class="card-body">
        <div class="price">${formatPrice(price)}${isRental && html`<small>/mo</small>`}</div>
        <div class="facts"><span><b>${beds}</b> BHK</span><span><b>${baths}</b> ba</span><span><b>${formatNumber(sqft)}</b> sq ft</span></div>
        <div class="addr">${address}</div>
        <div class="listed-by">${propertyType} for ${isRental ? 'rent' : 'sale'} · Listed by owner</div>
      </div>
    </a>`;
}
