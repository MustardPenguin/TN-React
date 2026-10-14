import { useState } from 'react';
import { cx } from '../lib/cx.js';
import { formatNumber, formatPrice } from '../lib/format.js';
import { homeHref } from '../lib/routes.js';
import { AMENITIES, NEARBY_CATEGORIES } from '../data/listingDetails.js';
import { Icon } from '../components/ui/Icon.jsx';
import { ListingCard } from '../components/ui/ListingCard.jsx';
import { Gallery } from '../components/listing/Gallery.jsx';
import { PricePanel } from '../components/listing/PricePanel.jsx';
import { VerificationReport } from '../components/listing/VerificationReport.jsx';
import { LocationSection } from '../components/listing/LocationSection.jsx';
import './ListingPage.css';

const AMENITIES_SHOWN = 8;

function KeyFacts({ listing, details }) {
  const facts = [
    { icon: 'bed', value: listing.beds, label: 'Bedrooms' },
    { icon: 'bath', value: listing.baths, label: 'Bathrooms' },
    { icon: 'area', value: formatNumber(listing.sqft), label: 'Sq ft' },
    details.parking != null && { icon: 'car', value: details.parking, label: 'Parking' },
    details.floor && { icon: 'layers', value: details.floor, label: 'Floor' },
    details.facing && { icon: 'compass', value: details.facing, label: 'Facing' },
  ].filter(Boolean);
  return (
    <ul className="facts-strip" aria-label="Key facts">
      {facts.map((f) => (
        <li key={f.label}>
          <span className="fact-icon" aria-hidden="true"><Icon name={f.icon} /></span>
          <span className="fact-value">{f.value}</span>
          <span className="fact-label">{f.label}</span>
        </li>
      ))}
    </ul>
  );
}

// Long text clamped to a few lines, with "Read more".
function About({ text }) {
  const [expanded, setExpanded] = useState(false);
  const long = text.length > 320;
  return (
    <section className="lp-section" aria-labelledby="about-title">
      <h2 id="about-title">About this home</h2>
      <p id="about-text" className={cx('about-text', long && !expanded && 'is-clamped')}>{text}</p>
      {long && (
        <button type="button" className="lp-text-btn" aria-expanded={expanded} aria-controls="about-text" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </section>
  );
}

function Details({ details }) {
  return (
    <section className="lp-section" aria-labelledby="details-title">
      <h2 id="details-title">Property details</h2>
      <dl className="details-grid">
        {Object.entries(details).map(([label, value]) => (
          <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
        ))}
      </dl>
    </section>
  );
}

function Amenities({ keys }) {
  const [all, setAll] = useState(false);
  const items = keys.map((k) => AMENITIES[k]).filter(Boolean);
  const shown = all ? items : items.slice(0, AMENITIES_SHOWN);
  return (
    <section className="lp-section" aria-labelledby="amenities-title">
      <h2 id="amenities-title">Amenities</h2>
      <ul className="amenities-grid">
        {shown.map((a) => (
          <li key={a.label}><span className="amenity-icon" aria-hidden="true"><Icon name={a.icon} /></span>{a.label}</li>
        ))}
      </ul>
      {items.length > AMENITIES_SHOWN && (
        <button type="button" className="lp-text-btn" aria-expanded={all} onClick={() => setAll(!all)}>
          {all ? 'Show fewer' : `Show all ${items.length} amenities`}
        </button>
      )}
    </section>
  );
}

// The listing page. Everything comes in as props (App.jsx resolves the
// listing from the URL), so it can be fed from an API later.
// `listing` is the card summary (data/listings.js); `details` the full page
// data (data/listingDetails.js).
export function ListingPage({ listing, details, checkSteps, similar, hrefFor }) {
  const [saved, setSaved] = useState(listing.saved);
  const isRental = listing.listingType === 'rent';
  const title = `${listing.beds} BHK ${listing.propertyType.toLowerCase()} in ${listing.locality}`;
  const gallery = details.gallery.length ? details.gallery : [listing.image];

  return (
    <main className="listing-page">
      <div className="container">
        <div className="lp-topbar">
          <nav aria-label="Breadcrumb">
            <ol className="lp-crumbs">
              <li><a href={homeHref}>Home</a></li>
              <li><a href={homeHref}>Hyderabad</a></li>
              <li><a href={homeHref}>{listing.locality}</a></li>
              <li aria-current="page">{listing.propertyType}</li>
            </ol>
          </nav>
          <div className="lp-top-actions">
            {/* Mockup: saving and sharing aren't wired up beyond the toggle. */}
            <button type="button" className="lp-icon-btn" aria-pressed={saved} onClick={() => setSaved(!saved)}>
              <Icon name={saved ? 'heartFilled' : 'saved'} /> {saved ? 'Saved' : 'Save'}
            </button>
            <button type="button" className="lp-icon-btn"><Icon name="share" /> Share</button>
          </div>
        </div>

        <Gallery images={gallery} title={title} />

        <div className="lp-grid">
          <div className="lp-main">
            <header className="lp-title">
              <div className="lp-tags">
                <span className={cx('lp-tag', isRental ? 'is-rent' : 'is-sale')}>For {isRental ? 'rent' : 'sale'}</span>
                <span className="lp-tag">Listed by {listing.listedBy}</span>
                {listing.badge && <span className="lp-tag is-promo">{listing.badge.label}</span>}
                {details.possession && details.possession !== listing.badge?.label && <span className="lp-tag">{details.possession}</span>}
              </div>
              <h1>{title}</h1>
              <p className="lp-address">{listing.address}</p>
              {/* Phones: price is in the sticky bottom bar and the panel below. */}
              <p className="lp-mobile-price">{formatPrice(listing.price)}{isRental && <small>/month</small>}</p>
            </header>

            <KeyFacts listing={listing} details={details} />
            <VerificationReport steps={checkSteps} checks={details.checks} passed={listing.checksPassed} />
            <About text={details.about} />
            <Details details={details.details} />
            <Amenities keys={details.amenities} />
          </div>

          <aside className="lp-aside" aria-label="Price and contact">
            <PricePanel listing={listing} details={details} checkTotal={checkSteps.length} />
          </aside>
        </div>

        <LocationSection id={listing.id} address={listing.address} location={details.location} nearby={details.nearby} categories={NEARBY_CATEGORIES} />

        {similar.length > 0 && (
          <section className="lp-section lp-similar" aria-labelledby="similar-title">
            <h2 id="similar-title">Similar homes</h2>
            <div className="similar-grid">
              {similar.map((l) => <ListingCard key={l.id} listing={l} checkSteps={checkSteps} href={hrefFor(l.id)} />)}
            </div>
          </section>
        )}
      </div>

      {/* Phones: price + actions stay in reach at the bottom of the screen. */}
      <div className="lp-mobile-bar">
        <span className="lp-mobile-bar-price">
          <b>{formatPrice(listing.price)}{isRental && <small>/mo</small>}</b>
          <span>{listing.checksPassed} of {checkSteps.length} checks passed</span>
        </span>
        <button type="button" className="lp-bar-btn is-soft" aria-label={`Contact ${listing.listedBy}`}><Icon name="phone" /></button>
        <button type="button" className="lp-bar-btn"><Icon name="calendar" /> Schedule a visit</button>
      </div>
    </main>
  );
}
