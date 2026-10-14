import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { cx } from '../../lib/cx.js';
import { Icon } from '../ui/Icon.jsx';
import './NavMenu.css';

const OPEN_DELAY = 120;  // ms of hover before opening (passing over doesn't open it)
const CLOSE_DELAY = 220; // ms after leaving before closing (crossing a gap doesn't close it)
const EDGE = 16;         // keep panels this far inside the header container

function MenuLinks({ column }) {
  return (
    <div className="nm-col">
      <p className="nm-col-title">{column.title}</p>
      <ul>
        {column.links.map((link) => (
          <li key={link.label}>
            <a className={cx('nm-link', link.icon && 'has-icon')} href={link.href}>
              {link.icon && <span className="nm-link-icon" aria-hidden="true"><Icon name={link.icon} /></span>}
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MenuCards({ menu }) {
  return (
    <div className="nm-cards-wrap">
      {menu.intro && <p className="nm-col-title">{menu.intro}</p>}
      <ul className="nm-cards">
        {menu.cards.map((card) => (
          <li key={card.title}>
            <a className="nm-card" href={card.href}>
              <span className="nm-card-icon" aria-hidden="true"><Icon name={card.icon} /></span>
              <span className="nm-card-text">
                <b>{card.title}</b>
                <span>{card.text}</span>
              </span>
              <span className="nm-card-arrow" aria-hidden="true"><Icon name="arrowRight" /></span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Promo({ promo }) {
  return (
    <div className="nm-promo">
      <span className="nm-promo-icon" aria-hidden="true"><Icon name={promo.icon} /></span>
      <b>{promo.title}</b>
      <p>{promo.text}</p>
      <a href={promo.link.href}>{promo.link.label} <span aria-hidden="true">→</span></a>
    </div>
  );
}

// The panel for one nav item, positioned under its trigger but kept inside
// the header container (`bounds`).
function Panel({ id, item, open, trigger, bounds, onPointerEnter, onPointerLeave }) {
  const panel = useRef(null);
  const [left, setLeft] = useState(0);

  useLayoutEffect(() => {
    if (!open) return;
    const box = bounds.current.getBoundingClientRect();
    const t = trigger.current.getBoundingClientRect();
    const width = panel.current.offsetWidth;
    const ideal = t.left - box.left - 24;
    setLeft(Math.max(EDGE, Math.min(ideal, box.width - width - EDGE)));
  }, [open, bounds, trigger]);

  const { menu } = item;
  return (
    <div
      ref={panel}
      id={id}
      className={cx('nm-panel', open && 'is-open', menu.cards ? 'is-cards' : 'is-columns')}
      style={{ left }}
      hidden={!open}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <div className="nm-body">
        {menu.cards
          ? <MenuCards menu={menu} />
          : <div className="nm-cols">{menu.columns.map((col) => <MenuLinks key={col.title} column={col} />)}</div>}
        {menu.promo && <Promo promo={menu.promo} />}
      </div>
      {menu.footer?.length > 0 && (
        <div className="nm-footer">
          {menu.footer.map((link) => <a key={link.label} href={link.href}>{link.label} <span aria-hidden="true">→</span></a>)}
        </div>
      )}
    </div>
  );
}

function NavItem({ item, index, open, setOpen, bounds }) {
  const trigger = useRef(null);
  const timer = useRef(0);
  const panelId = `nav-menu-${index}`;
  const isOpen = open === index;

  const later = (fn, ms) => { clearTimeout(timer.current); timer.current = setTimeout(fn, ms); };
  useEffect(() => () => clearTimeout(timer.current), []);

  // Hover (mouse only): open after a short delay; close shortly after leaving
  // both the trigger and the panel.
  const hoverIn = (e) => { if (e.pointerType === 'mouse') later(() => setOpen(index), open === null ? OPEN_DELAY : 0); };
  const hoverOut = (e) => { if (e.pointerType === 'mouse') later(() => setOpen((cur) => (cur === index ? null : cur)), CLOSE_DELAY); };

  return (
    <li
      className={cx('nm-item', isOpen && 'is-open')}
      onKeyDown={(e) => {
        if (e.key === 'Escape' && isOpen) { setOpen(null); trigger.current.focus(); }
      }}
      onBlur={(e) => {
        // Keyboard: close when focus leaves both the trigger and its panel.
        if (isOpen && !e.currentTarget.contains(e.relatedTarget)) setOpen(null);
      }}
    >
      <button
        ref={trigger}
        type="button"
        className="nm-trigger"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => { clearTimeout(timer.current); setOpen(isOpen ? null : index); }}
        onPointerEnter={hoverIn}
        onPointerLeave={hoverOut}
      >
        {item.label}
        <Icon name="chevronDown" />
      </button>
      <Panel
        id={panelId}
        item={item}
        open={isOpen}
        trigger={trigger}
        bounds={bounds}
        onPointerEnter={(e) => { if (e.pointerType === 'mouse') clearTimeout(timer.current); }}
        onPointerLeave={hoverOut}
      />
    </li>
  );
}

// Main navigation with dropdown panels (disclosure pattern: each trigger is a
// button with aria-expanded; the panel follows it in the DOM, so Tab moves
// into it). One panel open at a time. Opens on hover, click/tap, Enter or
// Space; closes on Escape, on clicking elsewhere, or when focus leaves.
// `bounds` is the element panels are positioned within (the header container).
export function NavMenus({ items, bounds }) {
  const [open, setOpen] = useState(null);
  const root = useRef(null);

  useEffect(() => {
    if (open === null) return undefined;
    const onPointerDown = (e) => { if (!root.current.contains(e.target)) setOpen(null); };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  return (
    <nav className="nav-links" aria-label="Main">
      <ul className="nm-list" ref={root}>
        {items.map((item, index) => (
          <NavItem key={item.label} item={item} index={index} open={open} setOpen={setOpen} bounds={bounds} />
        ))}
      </ul>
    </nav>
  );
}
