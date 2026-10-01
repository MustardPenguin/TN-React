import { Fragment } from 'react';
import { Logo } from '../ui/Logo.jsx';
import { Icon } from '../ui/Icon.jsx';
import './Footer.css';

export function Footer({ columns, legalLinks, socialLinks, year = new Date().getFullYear() }) {
  return (
    <footer>
      <div className="container">
        <div className="f-grid">
          <div>
            <Logo variant="dark" />
            <p className="f-tagline">Homes for sale and rent, listed directly by the people who own them.</p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h5>{col.title}</h5>
              <ul>{col.links.map((link) => <li key={link.label}><a href={link.href}>{link.label}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="f-bottom">
          <span>
            © {year} TrueNest. All rights reserved.
            {legalLinks.map((link) => <Fragment key={link.label}>{' · '}<a href={link.href}>{link.label}</a></Fragment>)}
          </span>
          <div className="socials">
            {socialLinks.map((s) => <a key={s.label} href={s.href} aria-label={s.label}><Icon name={s.icon} /></a>)}
          </div>
        </div>
      </div>
    </footer>
  );
}
