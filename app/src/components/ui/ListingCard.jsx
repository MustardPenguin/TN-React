import { cx } from '../../lib/cx.js';
import { formatPrice, formatNumber, backgroundImage } from '../../lib/format.js';
import { Icon } from './Icon.jsx';
import './ListingCard.css';

export function ListingCard({ listing, href = '#' }) {
  const {
    image, fallback, badge, price, listingType, propertyType,
    beds, baths, sqft, address, saved,
  } = listing;
  const isRental = listingType === 'rent';

  return (
    <a href={href} className="card">
      <div className="card-img" style={backgroundImage(image, fallback)}>
        {badge && <span className={cx('badge', badge.tone)}>{badge.label}</span>}
        <span className="fav"><Icon name={saved ? 'heartFilled' : 'heart'} /></span>
      </div>
      <div className="card-body">
        <div className="price">{formatPrice(price)}{isRental && <small>/mo</small>}</div>
        <div className="facts"><span><b>{beds}</b> BHK</span><span><b>{baths}</b> ba</span><span><b>{formatNumber(sqft)}</b> sq ft</span></div>
        <div className="addr">{address}</div>
        <div className="listed-by">{propertyType} for {isRental ? 'rent' : 'sale'} · Listed by owner</div>
      </div>
    </a>
  );
}
