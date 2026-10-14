import { useState } from 'react';
import { cx } from '../../lib/cx.js';
import { formatDistance, googleDirectionsUrl, googleMapsUrl } from '../../lib/geo.js';
import { Icon } from '../ui/Icon.jsx';
import { LocationMap } from './LocationMap.jsx';
import './LocationSection.css';

// Location: map + "Nearby" list (filterable by category). Hovering or
// focusing a place highlights it on the map. "Open in Google Maps" and
// "Get directions" are plain links (free, no API key).
// `nearby` comes precomputed with the listing (name, category, km, minutes).
export function LocationSection({ id, address, location, nearby, categories }) {
  const [filter, setFilter] = useState('all');
  const [active, setActive] = useState(null);
  const approximate = location.precision === 'approximate';
  const shown = filter === 'all' ? nearby : nearby.filter((p) => p.category === filter);
  const iconFor = (key) => categories.find((c) => c.key === key)?.icon ?? 'mapPin';
  const present = categories.filter((c) => nearby.some((p) => p.category === c.key));

  return (
    <section className="lp-section location" aria-labelledby="location-title">
      <div className="lp-section-head">
        <h2 id="location-title">Location</h2>
        <div className="location-links">
          <a className="lp-link-btn" href={googleMapsUrl(location)} target="_blank" rel="noopener noreferrer">
            <Icon name="external" /> Open in Google Maps<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a className="lp-link-btn" href={googleDirectionsUrl(location)} target="_blank" rel="noopener noreferrer">
            <Icon name="directions" /> Get directions<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
      <p className="location-address">
        <Icon name="mapPin" />
        {address}
        {approximate && <span className="location-note"> · Approximate area shown; the exact location is shared when you book a visit.</span>}
      </p>

      <div className="location-grid">
        <LocationMap id={id} location={location} places={nearby} activePlace={active} label={`${address}${approximate ? ' (approximate area)' : ''}`} />

        <div className="nearby">
          <h3>Nearby</h3>
          <div className="nearby-filters" role="group" aria-label="Filter nearby places">
            {[{ key: 'all', label: 'All' }, ...present].map((c) => (
              <button key={c.key} type="button" className={cx('nearby-chip', filter === c.key && 'is-active')} aria-pressed={filter === c.key} onClick={() => setFilter(c.key)}>
                {c.label}
              </button>
            ))}
          </div>
          {/* Focusable so keyboard users can scroll it when it overflows. */}
          <ul className="nearby-list" tabIndex={0} aria-label="Nearby places">

            {shown.map((place) => (
              <li
                key={place.name}
                className={cx('nearby-item', active === place.name && 'is-active')}
                onMouseEnter={() => setActive(place.name)}
                onMouseLeave={() => setActive(null)}
              >
                <span className="nearby-icon" aria-hidden="true"><Icon name={iconFor(place.category)} /></span>
                <span className="nearby-name">{place.name}</span>
                <span className="nearby-dist">{formatDistance(place.km)} · {place.minutes} min drive</span>
              </li>
            ))}
          </ul>
          <p className="nearby-note">Distances are straight-line; drive times are estimates.</p>
        </div>
      </div>
    </section>
  );
}
