import { cx } from '../../lib/cx.js';
import { formatPrice, formatNumber, formatCount, backgroundImage } from '../../lib/format.js';
import { Icon } from './Icon.jsx';
import './ListingCard.css';

// Compact verification status, top-left of the photo: "✓ Verified" when all
// checks have passed, otherwise "3/5" plus one dot per check. Steps are done
// in order, so `passed` means steps 1..passed are done.
function VerificationSeal({ passed, steps }) {
  const total = steps.length;
  const complete = passed >= total;
  return (
    <div className={cx('card-seal', complete ? 'is-verified' : 'is-partial')}>
      <Icon name={complete ? 'check' : 'shieldCheck'} />
      <span aria-hidden="true">{complete ? 'Verified' : `${passed}/${total}`}</span>
      {!complete && (
        <span className="card-seal-dots" aria-hidden="true">
          {steps.map((step, i) => <i key={step.title} className={i < passed ? 'is-passed' : undefined} />)}
        </span>
      )}
      <span className="sr-only">{complete ? 'Verified' : 'Verification in progress'}: {passed} of {total} checks passed</span>
    </div>
  );
}

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
        {checksPassed != null && checkSteps.length > 0 && <VerificationSeal passed={checksPassed} steps={checkSteps} />}
        <div className="card-actions">
          {/* Mockup: not wired up yet. */}
          <button type="button" className="card-action" aria-label={saved ? 'Saved' : 'Save listing'} aria-pressed={saved}>
            <Icon name={saved ? 'heartFilled' : 'heart'} />
          </button>
          <button type="button" className="card-action" aria-label="Share listing"><Icon name="share" /></button>
        </div>
        {badge && <span className={cx('badge', badge.tone)}>{badge.label}</span>}
      </div>
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
