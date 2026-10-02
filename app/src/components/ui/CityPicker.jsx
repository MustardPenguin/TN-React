import { useEffect, useId, useRef, useState } from 'react';
import { cx } from '../../lib/cx.js';
import { formatNumber } from '../../lib/format.js';
import { Icon } from './Icon.jsx';
import './CityPicker.css';

// City filter for the header: a pill ("Exploring / Hyderabad") that opens a
// styled menu of cities with a photo, state and verified-home count.
// Follows the WAI-ARIA "select-only combobox" pattern: focus stays on the pill
// and arrow keys move the highlighted option (aria-activedescendant).
// `cities`: [{ name, state, homes, image }]. Uncontrolled: `defaultCity` sets
// the starting city; `onChange(city)` is optional (mockup: nothing uses it).
export function CityPicker({ cities, defaultCity = cities[0]?.name, onChange }) {
  const id = useId();
  const root = useRef(null);
  const [selected, setSelected] = useState(() => Math.max(0, cities.findIndex((c) => c.name === defaultCity)));
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(selected);

  const openMenu = (index = selected) => {
    setActive(index);
    setOpen(true);
  };
  const choose = (index) => {
    setSelected(index);
    setOpen(false);
    if (index !== selected) onChange?.(cities[index]);
  };

  // Close on a click outside the picker.
  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event) => {
      if (!root.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  // Type a letter to jump to the next city starting with it.
  const matchLetter = (key) => {
    const start = open ? active + 1 : selected + 1;
    for (let i = 0; i < cities.length; i++) {
      const index = (start + i) % cities.length;
      if (cities[index].name.toLowerCase().startsWith(key.toLowerCase())) return index;
    }
    return -1;
  };

  const onKeyDown = (event) => {
    const last = cities.length - 1;
    const { key } = event;
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(key)) openMenu();
      else if (key === 'Home') openMenu(0);
      else if (key === 'End') openMenu(last);
      else if (key.length === 1 && matchLetter(key) >= 0) openMenu(matchLetter(key));
      else return;
      event.preventDefault();
      return;
    }
    if (key === 'ArrowDown') setActive((i) => Math.min(i + 1, last));
    else if (key === 'ArrowUp') setActive((i) => Math.max(i - 1, 0));
    else if (key === 'Home') setActive(0);
    else if (key === 'End') setActive(last);
    else if (key === 'Enter' || key === ' ') choose(active);
    else if (key === 'Escape') setOpen(false);
    else if (key === 'Tab') { choose(active); return; } // let focus move on
    else if (key.length === 1 && matchLetter(key) >= 0) setActive(matchLetter(key));
    else return;
    event.preventDefault();
  };

  const current = cities[selected];
  const optionId = (index) => `${id}-option-${index}`;

  return (
    <div className={cx('city-picker', open && 'is-open')} ref={root}>
      <span className="sr-only" id={`${id}-label`}>City</span>
      <div
        className="city-pill"
        role="combobox"
        tabIndex={0}
        aria-labelledby={`${id}-label ${id}-value`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-listbox`}
        aria-activedescendant={open ? optionId(active) : undefined}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onKeyDown}
      >
        <Icon name="mapPin" />
        <span className="city-pill-text">
          <span className="city-pill-caption" aria-hidden="true">Exploring</span>
          <span className="city-pill-value" id={`${id}-value`}>{current.name}</span>
        </span>
        <Icon name="chevronDown" />
      </div>

      {open && (
        <div className="city-menu">
          <div className="city-menu-title" aria-hidden="true">Explore verified homes in</div>
          <ul className="city-list" role="listbox" id={`${id}-listbox`} aria-labelledby={`${id}-label`}>
            {cities.map((city, index) => (
              <li
                key={city.name}
                id={optionId(index)}
                role="option"
                aria-selected={index === selected}
                className={cx('city-option', index === active && 'is-active', index === selected && 'is-selected')}
                // mousedown would blur the pill; keep focus on it.
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => setActive(index)}
                onClick={() => choose(index)}
              >
                <img className="city-thumb" src={city.image} alt="" width="40" height="40" />
                <span className="city-option-text">
                  <span className="city-option-name">{city.name}</span>
                  <span className="city-option-meta">{city.state} · {formatNumber(city.homes)} verified</span>
                </span>
                {index === selected && <span className="city-option-check"><Icon name="check" /></span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
