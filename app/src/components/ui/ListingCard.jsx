import { cx } from '../../lib/cx.js';
import { formatPrice, formatNumber, formatCount, backgroundImage } from '../../lib/format.js';
import { Icon } from './Icon.jsx';
import './ListingCard.css';

// Verification progress over the photo: "✓ 5/5 checks" plus one segment per
// check. Amber if any check is still outstanding.
function VerifiedPill({ passed, total }) {
  return (
    <span className={cx('card-verified', passed < total && 'is-partial')}>
      <Icon name="check" />
      {passed}/{total} checks<span className="sr-only"> passed</span>
      <span className="card-checks" aria-hidden="true">
        {Array.from({ length: total }, (_, i) => <i key={i} className={i < passed ? 'is-passed' : undefined} />)}
      </span>
    </span>
  );
}

// `checksTotal` is the number of verification steps (passed in, so it always
// matches the verification section). `saved` is whether the current visitor
// saved it; `saves` is how many people have.
export function ListingCard({ listing, checksTotal, href = '#' }) {
  const {
    image, fallback, badge, price, listingType, propertyType,
    beds, baths, sqft, address, saved, listedBy = 'owner',
    views, saves, checksPassed,
  } = listing;
  const isRental = listingType === 'rent';

  return (
    <a href={href} className="card">
      <div className="card-img" style={backgroundImage(image, fallback)}>
        {badge && <span className={cx('badge', badge.tone)}>{badge.label}</span>}
        <span className="fav"><Icon name={saved ? 'heartFilled' : 'heart'} /></span>
        {checksPassed != null && checksTotal && <VerifiedPill passed={checksPassed} total={checksTotal} />}
      </div>
      <div className="card-body">
        <div className="price">{formatPrice(price)}{isRental && <small>/mo</small>}</div>
        <div className="facts"><span><b>{beds}</b> BHK</span><span><b>{baths}</b> ba</span><span><b>{formatNumber(sqft)}</b> sq ft</span></div>
        <div className="addr">{address}</div>
        <div className="listed-by">{propertyType} for {isRental ? 'rent' : 'sale'} · Listed by {listedBy}</div>
        {(views != null || saves != null) && (
          <div className="card-stats">
            {views != null && <span><Icon name="eye" />{formatCount(views)} views</span>}
            {saves != null && <span><Icon name="saved" />{formatCount(saves)} saves</span>}
          </div>
        )}
      </div>
    </a>
  );
}
