import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { approximateCentre } from '../../lib/geo.js';
import './LocationMap.css';

// OpenStreetMap tiles: free, no key, attribution required. Fine for a mockup;
// for production traffic switch to a tile provider (e.g. MapTiler, Stadia).
const TILES = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const AREA_RADIUS_M = 400;
const PLACE_RADIUS_KM = 8; // nearby pins further than this would zoom the map out too far

const pinIcon = L.divIcon({ className: 'map-pin', html: '<span></span>', iconSize: [34, 42], iconAnchor: [17, 40] });
const placeIcon = (label) => L.divIcon({ className: 'map-place', html: `<span title="${label.replace(/"/g, '&quot;')}"></span>`, iconSize: [14, 14], iconAnchor: [7, 7] });

// Leaflet map of the listing: an exact pin, or a shaded area for
// `precision: 'approximate'` (offset so the exact spot isn't revealed), plus
// small markers for nearby places. `activePlace` (a place name) is highlighted.
// The map is visual; the nearby list beside it carries the same information
// as text.
export function LocationMap({ id, location, places, activePlace, label }) {
  const container = useRef(null);
  const placeMarkers = useRef({});

  useEffect(() => {
    const point = [location.lat, location.lng];
    const map = L.map(container.current, { scrollWheelZoom: false, attributionControl: true });
    L.tileLayer(TILES, { maxZoom: 19, attribution: ATTRIBUTION }).addTo(map);

    if (location.precision === 'approximate') {
      const centre = approximateCentre(location, id);
      L.circle([centre.lat, centre.lng], { radius: AREA_RADIUS_M, color: '#2F7D5A', weight: 2, fillColor: '#2F7D5A', fillOpacity: 0.16 }).addTo(map);
    } else {
      L.marker(point, { icon: pinIcon, keyboard: false, alt: label }).addTo(map);
    }

    const shown = places.filter((p) => p.km <= PLACE_RADIUS_KM);
    placeMarkers.current = {};
    shown.forEach((p) => {
      placeMarkers.current[p.name] = L.marker([p.lat, p.lng], { icon: placeIcon(p.name), keyboard: false }).addTo(map);
    });

    const bounds = L.latLngBounds([point, ...shown.map((p) => [p.lat, p.lng])]);
    map.fitBounds(bounds.pad(0.15), { maxZoom: 15 });
    return () => map.remove();
  }, [id, location, places, label]);

  useEffect(() => {
    Object.entries(placeMarkers.current).forEach(([name, marker]) => {
      marker.getElement()?.classList.toggle('is-active', name === activePlace);
      if (name === activePlace) marker.setZIndexOffset(1000); else marker.setZIndexOffset(0);
    });
  }, [activePlace]);

  return <div className="location-map" ref={container} role="region" aria-label={`Map: ${label}`} />;
}
