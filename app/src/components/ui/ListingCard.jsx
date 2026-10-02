import { cx } from '../../lib/cx.js';
import { formatPrice, formatNumber, formatCount, backgroundImage } from '../../lib/format.js';
import { Icon } from './Icon.jsx';
import { VerifiedBadge } from './VerifiedBadge.jsx';
import './ListingCard.css';

// The card is an <article> rather than one big link, so the save/share
// buttons can be real buttons. `.card-link` (the address) stretches over the
// whole card, so it's still clickable anywhere outside the buttons.
// `checkSteps` are the verification steps (data/verification.js), so the
// seal always matches the verification section. `saved` is whether the
// current visitor saved it; `saves` is how many people have.
export function ListingCard({ listing, checkSteps = [], href = '#' }) {
  const {
    image, fallback, badge, price, listingType, propertyType,
    beds, baths, sqft, address, saved, listedBy = 'owner',
    views, saves, checksPassed,
  } = listing;
  const isRental = listingType === 'rent';

  return (
    <article className="card">
      <div className="card-img" style={backgroundImage(image, fallback)}>
        <div className="card-actions">
          {/* Mockup: not wired up yet. */}
          <button type="button" className="card-action" aria-label={saved ? 'Saved' : 'Save listing'} aria-pressed={saved}>
            <Icon name={saved ? 'heartFilled' : 'heart'} />
          </button>
          <button type="button" className="card-action" aria-label="Share listing"><Icon name="share" /></button>
        </div>
        {badge && <span className={cx('badge', badge.tone)}>{badge.label}</span>}
      </div>
      {/* Outside .card-img so its checklist can extend below the photo. */}
      {checksPassed != null && checkSteps.length > 0 && <VerifiedBadge passed={checksPassed} steps={checkSteps} />}
      <div className="card-body">
        <div className="price">{formatPrice(price)}{isRental && <small>/mo</small>}</div>
        <div className="facts"><span><b>{beds}</b> BHK</span><span><b>{baths}</b> ba</span><span><b>{formatNumber(sqft)}</b> sq ft</span></div>
        <a href={href} className="addr card-link">{address}</a>
        <div className="listed-by">{propertyType} for {isRental ? 'rent' : 'sale'} · Listed by {listedBy}</div>
        {(views != null || saves != null) && (
          <div className="card-stats">
            {views != null && <span><Icon name="eye" />{formatCount(views)} views</span>}
            {saves != null && <span><Icon name="saved" />{formatCount(saves)} saves</span>}
          </div>
        )}
      </div>
    </article>
  );
}
