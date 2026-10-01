import { cx } from '../../lib/cx.js';
import { formatNumber, backgroundImage } from '../../lib/format.js';
import './CityCard.css';

export function CityCard({ city, href = '#' }) {
  return (
    <a href={href} className={cx('city', city.featured && 'big')} style={backgroundImage(city.image, city.fallback)}>
      <div><h3>{city.name}</h3><span>{formatNumber(city.homes)} homes</span></div>
    </a>
  );
}
