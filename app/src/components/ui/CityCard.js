import { html, cx } from '../../lib/html.js';
import { formatNumber, backgroundImage } from '../../lib/format.js';
import './CityCard.css';

export function CityCard({ city, href = '#' }) {
  return html`
    <a href="${href}" class="${cx('city', city.featured && 'big')}" style="${backgroundImage(city.image, city.fallback)}"><div><h3>${city.name}</h3><span>${formatNumber(city.homes)} homes</span></div></a>`;
}
