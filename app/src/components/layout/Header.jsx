import { Logo } from '../ui/Logo.jsx';
import { Icon } from '../ui/Icon.jsx';
import './Header.css';

export function Header({ links, iconLinks = [] }) {
  return (
    <header>
      <div className="container nav">
        <Logo />
        <nav className="nav-links">
          {links.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
        </nav>
        <div className="nav-actions">
          {iconLinks.map((link) => (
            <a key={link.label} href={link.href} className="icon-link" aria-label={link.label} title={link.label}><Icon name={link.icon} /></a>
          ))}
          <a href="#" className="btn btn-primary">List your property</a>
          <button className="menu-btn" aria-label="Menu"><Icon name="menu" /></button>
        </div>
      </div>
    </header>
  );
}
