import { formatNumber, formatPrice } from '../../lib/format.js';
import { jumpTo } from '../../lib/scroll.js';
import { Icon } from '../ui/Icon.jsx';
import { MiniRing } from '../ui/MiniRing.jsx';
import './PricePanel.css';

const initials = (name) => name.split(/[\s&]+/).filter(Boolean).map((w) => w[0]).slice(0, 2).join('');

// Price block differs by listing type. Sale: total price + price per sq ft
// (an EMI estimate can join here later). Rent: monthly rent + maintenance
// (deposit and lease terms can join here later).
function SalePrice({ listing }) {
  return (
    <div className="pp-price">
      <span className="pp-amount">{formatPrice(listing.price)}</span>
      <span className="pp-sub">₹{formatNumber(Math.round(listing.price / listing.sqft))} per sq ft</span>
    </div>
  );
}

function RentPrice({ listing, details }) {
  return (
    <div className="pp-price">
      <span className="pp-amount">{formatPrice(listing.price)}<small>/month</small></span>
      {details.details.Maintenance && <span className="pp-sub">Maintenance: {details.details.Maintenance}</span>}
    </div>
  );
}

// Sticky side panel: price, verification status, who's listing it and the
// two actions. Actions aren't wired up yet (mockup).
export function PricePanel({ listing, details, checkTotal }) {
  const { lister } = details;
  const passed = listing.checksPassed;
  const complete = passed >= checkTotal;
  return (
    <div className="price-panel">
      {listing.listingType === 'rent' ? <RentPrice listing={listing} details={details} /> : <SalePrice listing={listing} />}

      {/* A button, not an #anchor: with hash routing "#verification" would
          be treated as a page. Scrolls to the report and moves focus there. */}
      <button type="button" className={`pp-verify ${complete ? 'is-complete' : 'is-partial'}`} onClick={() => jumpTo('verification')}>
        <MiniRing passed={passed} total={checkTotal} />
        <span>
          <b>{complete ? 'TrueNest Verified' : 'Verification in progress'}</b>
          <span>{passed} of {checkTotal} checks passed · see report</span>
        </span>
      </button>

      <div className="pp-actions">
        <button type="button" className="pp-btn pp-btn-primary"><Icon name="calendar" /> Schedule a visit</button>
        <button type="button" className="pp-btn pp-btn-soft"><Icon name="phone" /> Contact {lister.kind === 'builder' ? 'builder' : 'owner'}</button>
      </div>

      <div className="pp-lister">
        <span className="pp-avatar" aria-hidden="true">{initials(lister.name)}</span>
        <span>
          <b>{lister.name}</b>
          <span>{lister.kind === 'builder' ? 'Builder' : 'Owner'} · on TrueNest since {lister.since}</span>
          <span>{lister.responds}</span>
        </span>
      </div>
    </div>
  );
}
