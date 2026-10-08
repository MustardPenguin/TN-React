import { Logo } from '../ui/Logo.jsx';
import { Icon } from '../ui/Icon.jsx';
import { CityPicker } from '../ui/CityPicker.jsx';
import './Header.css';

// `cities` feeds the city filter (ui/CityPicker.jsx). `onCityChange` is
// optional; nothing uses it yet (mockup).
export function Header({ links, iconLinks = [], cities = [], onCityChange }) {
  return (
    <header>
      <div className="container nav">
        <Logo />
        {cities.length > 0 && <CityPicker cities={cities} onChange={onCityChange} />}
        <nav className="nav-links">
          {links.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
        </nav>
        <div className="nav-actions">
          {iconLinks.map((link) => (
            <a key={link.label} href={link.href} className="icon-link" aria-label={link.label} title={link.label}><Icon name={link.icon} /></a>
          ))}
          <button className="menu-btn" aria-label="Menu"><Icon name="menu" /></button>
        </div>
      </div>
    </header>
  );
}
