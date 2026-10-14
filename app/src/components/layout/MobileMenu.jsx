import { useEffect, useRef, useState } from 'react';
import { cx } from '../../lib/cx.js';
import { Logo } from '../ui/Logo.jsx';
import { Icon } from '../ui/Icon.jsx';
import './MobileMenu.css';

// One main-nav item as an expandable section, using the same menu data as
// the desktop dropdowns (data/navigation.js).
function Section({ item, index, open, onToggle }) {
  const { menu } = item;
  const panelId = `mm-section-${index}`;
  return (
    <li className={cx('mm-section', open && 'is-open')}>
      <h2 className="mm-section-head">
        <button type="button" aria-expanded={open} aria-controls={panelId} onClick={onToggle}>
          {item.label}
          <Icon name="chevronDown" />
        </button>
      </h2>
      <div className="mm-section-body" id={panelId} hidden={!open}>
        {menu.cards && (
          <ul className="mm-cards">
            {menu.cards.map((card) => (
              <li key={card.title}>
                <a className="mm-card" href={card.href}>
                  <span className="mm-icon" aria-hidden="true"><Icon name={card.icon} /></span>
                  <span className="mm-card-text"><b>{card.title}</b><span>{card.text}</span></span>
                </a>
              </li>
            ))}
          </ul>
        )}
        {menu.columns?.map((col) => (
          <div key={col.title} className="mm-group">
            <p className="mm-group-title">{col.title}</p>
            <ul className={cx('mm-links', !col.links.some((l) => l.icon) && 'is-chips')}>
              {col.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="mm-link">
                    {link.icon && <span className="mm-icon is-small" aria-hidden="true"><Icon name={link.icon} /></span>}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {menu.footer?.length > 0 && (
          <div className="mm-footer-links">
            {menu.footer.map((link) => <a key={link.label} href={link.href}>{link.label} <span aria-hidden="true">→</span></a>)}
          </div>
        )}
      </div>
    </li>
  );
}

// Phone/tablet menu (header hamburger, ≤1024px): a panel sliding in from the
// right, built on a native modal <dialog> (focus stays inside, Escape closes,
// the page behind is inert). Clicking the dimmed backdrop or any link closes
// it. Closes itself if the window grows past the desktop breakpoint.
export function MobileMenu({ open, onClose, links, iconLinks }) {
  const dialog = useRef(null);
  const [expanded, setExpanded] = useState(0);

  useEffect(() => {
    const el = dialog.current;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const wide = window.matchMedia('(min-width: 1025px)');
    const onChange = () => wide.matches && onClose();
    wide.addEventListener('change', onChange);
    return () => wide.removeEventListener('change', onChange);
  }, [open, onClose]);

  return (
    <dialog
      ref={dialog}
      className="mobile-menu"
      aria-label="Menu"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialog.current) onClose(); // backdrop
        else if (e.target.closest('a')) onClose(); // followed a link
      }}
    >
      <div className="mm-top">
        <Logo />
        <button type="button" className="mm-close" aria-label="Close menu" onClick={onClose}><Icon name="close" /></button>
      </div>

      <nav aria-label="Main" className="mm-nav">
        <ul>
          {links.map((item, i) => (
            <Section key={item.label} item={item} index={i} open={expanded === i} onToggle={() => setExpanded(expanded === i ? null : i)} />
          ))}
        </ul>
      </nav>

      <ul className="mm-account">
        {iconLinks.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="mm-account-link">
              <span className="mm-icon" aria-hidden="true"><Icon name={link.icon} /></span>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </dialog>
  );
}
