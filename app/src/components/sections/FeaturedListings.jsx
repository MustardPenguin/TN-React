import { cx } from '../../lib/cx.js';
import { SectionHead } from '../ui/SectionHead.jsx';
import { ListingCard } from '../ui/ListingCard.jsx';
import './FeaturedListings.css';

export function FeaturedListings({ listings, filters, activeFilter = filters[0], location }) {
  return (
    <section className="listings">
      <div className="container">
        <SectionHead
          eyebrow="Featured"
          title="Homes you might like"
          sub={`Fresh listings near ${location}`}
          link={{ label: 'View all listings', href: '#' }}
        />
        <div className="filters">
          {filters.map((f) => <span key={f} className={cx('chip', f === activeFilter && 'active')}>{f}</span>)}
        </div>
        <div className="carousel">
          {listings.map((listing) => <ListingCard key={listing.id} listing={listing} />)}
        </div>
      </div>
    </section>
  );
}
