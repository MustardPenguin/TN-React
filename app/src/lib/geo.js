// Location helpers for the listing page. No API keys involved.

const EARTH_KM = 6371;
const rad = (deg) => (deg * Math.PI) / 180;

/** Straight-line distance in km between two { lat, lng } points. */
export function distanceKm(a, b) {
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_KM * Math.asin(Math.sqrt(h));
}

/**
 * Rough city drive time in minutes for a straight-line distance: road
 * distance ≈ 1.35× straight line, at ~24 km/h average in Hyderabad traffic.
 * Placeholder until real travel times come from a routing service.
 */
export const estimateDriveMinutes = (km) => Math.max(2, Math.round(((km * 1.35) / 24) * 60));

/** "850 m" or "4.2 km". */
export const formatDistance = (km) => (km < 1 ? `${Math.round(km * 100) * 10} m` : `${km.toFixed(km < 10 ? 1 : 0)} km`);

/**
 * Centre for an "approximate area" circle: the real point nudged by a fixed,
 * per-listing offset (from `seed`), so the exact spot can't be read off the
 * map but the circle is stable between visits. ~150 m at most.
 */
export function approximateCentre({ lat, lng }, seed = '') {
  let hash = 0;
  for (const ch of seed) hash = (hash * 31 + ch.charCodeAt(0)) | 0;
  const angle = (Math.abs(hash) % 360) * (Math.PI / 180);
  const offset = 0.0013; // degrees, ~145 m
  return { lat: lat + offset * Math.sin(angle), lng: lng + offset * Math.cos(angle) };
}

// Free Google Maps links (no key, no billing): open a place or directions in
// Google Maps, or the Google Maps app on phones.
export const googleMapsUrl = ({ lat, lng }) => `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
export const googleDirectionsUrl = ({ lat, lng }) => `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
