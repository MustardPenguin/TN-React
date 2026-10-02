import { RecentListingCard } from '../ui/RecentListingCard.jsx';
import './RecentlyViewed.css';

// "Recently viewed": a compact row under Featured listings, on the same grey
// band so the two read as one listings area. `items` is
// [{ listing, viewed }] (`viewed` is display text, e.g. "2 hours ago").
// Renders nothing without history (e.g. first-time visitors).
// `checkSteps` is the verification steps, for the "n of 5" total.
export function RecentlyViewed({ items, checkSteps = [] }) {
  if (!items?.length) return null;
  return (
    <section className="recent" aria-labelledby="recent-title">
      <div className="container">
        <div className="recent-head">
          <h2 className="recent-title" id="recent-title">Recently viewed</h2>
          <a href="#" className="link-arrow">See history →</a>
        </div>
        <div className="recent-row">
          {items.map(({ listing, viewed }) => (
            <RecentListingCard key={listing.id} listing={listing} viewed={viewed} checkTotal={checkSteps.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
