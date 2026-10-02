import { formatPrice, backgroundImage } from '../../lib/format.js';
import { MiniRing } from './MiniRing.jsx';
import './RecentListingCard.css';

// Compact, horizontal listing card for "Recently viewed": photo on the left;
// price, BHK + locality, verification and when it was viewed on the right.
// Takes the same `listing` shape as ListingCard. Like ListingCard, the link
// (the BHK/locality line) stretches over the whole card.
export function RecentListingCard({ listing, viewed, checkTotal, href = '#' }) {
  const { image, fallback, price, listingType, beds, locality, checksPassed } = listing;
  const isRental = listingType === 'rent';
  const hasChecks = checksPassed != null && checkTotal > 0;
  const complete = hasChecks && checksPassed >= checkTotal;

  return (
    <article className="recent-card">
      <div className="recent-thumb" style={backgroundImage(image, fallback)} />
      <div className="recent-body">
        <div className="recent-price">{formatPrice(price)}{isRental && <small>/mo</small>}</div>
        <a href={href} className="recent-link">{beds} BHK · {locality}</a>
        <div className="recent-meta">
          {hasChecks && (
            <span className={complete ? 'recent-verified' : 'recent-partial'}>
              <MiniRing passed={checksPassed} total={checkTotal} />
              {complete ? 'Verified' : `${checksPassed}/${checkTotal}`}
              <span className="sr-only"> verification checks passed</span>
            </span>
          )}
          {viewed && <span className="recent-viewed">{viewed}</span>}
        </div>
      </div>
    </article>
  );
}
