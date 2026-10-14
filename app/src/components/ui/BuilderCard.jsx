import { useRef, useState } from 'react';
import { cx } from '../../lib/cx.js';
import { formatPrice } from '../../lib/format.js';
import { useSlideshow } from '../../hooks/useSlideshow.js';
import { useMediaQuery } from '../../hooks/useMediaQuery.js';
import { Icon } from './Icon.jsx';
import './BuilderCard.css';

const initials = (name) => name.split(' ').map((word) => word[0]).slice(0, 2).join('');

// One project's details. All projects are stacked in one grid cell (only the
// current one visible), so the card keeps the height of the longest and
// doesn't jump as slides change.
function ProjectDetails({ project, current }) {
  const price = project.soldOut
    ? 'Sold out'
    : project.priceMin != null && `${formatPrice(project.priceMin)} – ${formatPrice(project.priceMax)}`;
  return (
    <div className={cx('bc-project-item', current && 'is-current')} aria-hidden={current ? undefined : true}>
      <h4 className="bc-project">{project.name}</h4>
      {project.locality && <p className="bc-loc">{project.locality}</p>}
      <dl className="bc-meta">
        {price && <div className="bc-price"><dt>Price</dt><dd>{price}</dd></div>}
        {project.unitTypes && <div><dt>Homes</dt><dd>{project.unitTypes}</dd></div>}
        {project.possession && <div><dt>Possession</dt><dd>{project.possession}</dd></div>}
      </dl>
      {project.rera && <p className="bc-rera">RERA {project.rera}</p>}
    </div>
  );
}

// One builder as a portfolio: each slide is one of their projects (photo +
// details). Slides change automatically every `interval` ms, but only while
// `active` (the card in focus in the carousel), with a pause button and
// manual controls. Reduced-motion visitors start paused.
// Key facts are optional and only shown when provided.
export function BuilderCard({ builder, active = false, interval = 15000 }) {
  const { name, tagline, logo, color, yearsActive, projectsDelivered, ongoing, cities, link, contact, projects } = builder;
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const count = projects.length;
  const slideshow = useSlideshow({ count, interval, autoplay: !reduceMotion, enabled: active });
  const index = slideshow.index;
  const [loaded, setLoaded] = useState(() => new Set([0]));
  const swipeX = useRef(null);
  const titleId = `builder-${builder.id}`;

  // Restart the progress fill only when the timer restarts: a new slide, or
  // the countdown resuming (play pressed, or this card coming into focus).
  // Pausing or leaving focus just freezes the fill where it is.
  const fillKey = useRef(0);
  const last = useRef({ index, running: false });
  const running = slideshow.playing && active;
  if (last.current.index !== index || (running && !last.current.running)) fillKey.current += 1;
  last.current = { index, running };

  // Load the current photo and the next one, so changes cross-fade.
  const upcoming = (index + 1) % count;
  if (!loaded.has(index) || !loaded.has(upcoming)) setLoaded(new Set([...loaded, index, upcoming]));

  const facts = [
    yearsActive != null && <span key="y"><b>{yearsActive}</b> years</span>,
    projectsDelivered != null && <span key="d"><b>{projectsDelivered}</b> projects delivered</span>,
    ongoing != null && <span key="o"><b>{ongoing}</b> ongoing</span>,
    cities?.length > 0 && <span key="c">{cities.join(' · ')}</span>,
  ].filter(Boolean);

  return (
    <article className={cx('builder-card', active && 'is-active', !slideshow.playing && 'is-paused')} aria-labelledby={titleId} style={{ '--slide-interval': `${interval}ms` }}>
      <div
        className="bc-media"
        onPointerDown={(e) => { if (e.pointerType === 'touch') swipeX.current = e.clientX; }}
        onPointerUp={(e) => {
          if (swipeX.current == null) return;
          const dx = e.clientX - swipeX.current;
          swipeX.current = null;
          if (Math.abs(dx) > 40) (dx < 0 ? slideshow.next : slideshow.prev)();
        }}
      >
        <div className="bc-photo">
          {projects.map((project, i) => loaded.has(i) && (
            <img
              key={project.name}
              src={project.image}
              alt={i === index ? `${project.name}, ${project.locality ?? ''}` : ''}
              aria-hidden={i === index ? undefined : true}
              className={cx(i === index && 'is-active')}
            />
          ))}
        </div>
        {count > 1 && (
          <div className="bc-controls" role="group" aria-label={`Projects by ${name}`}>
            {/* Progress: one segment per project. Done = solid, current fills
                over the interval (remounted via fillKey to restart), upcoming
                = faint. Each is a button (24px tap area). */}
            <div className="bc-progress">
              {projects.map((project, i) => (
                <button
                  key={project.name}
                  type="button"
                  className={cx('bc-seg', i < index && 'is-done', i === index && 'is-current')}
                  aria-label={`Show project ${i + 1} of ${count}: ${project.name}`}
                  aria-current={i === index ? 'true' : undefined}
                  onClick={() => slideshow.go(i)}
                >
                  {i === index && <span key={fillKey.current} className="bc-seg-fill" />}
                </button>
              ))}
            </div>
            <button type="button" className="bc-pause" aria-label={`${slideshow.playing ? 'Pause' : 'Play'} slideshow`} onClick={slideshow.toggle}>
              <Icon name={slideshow.playing ? 'pause' : 'play'} />
            </button>
            {/* Desktop: arrows appear while hovering the photo (or on focus). */}
            <button type="button" className="bc-arrow prev" aria-label="Previous project" onClick={slideshow.prev}><Icon name="chevronLeft" /></button>
            <button type="button" className="bc-arrow next" aria-label="Next project" onClick={slideshow.next}><Icon name="chevronRight" /></button>
            {/* Announced only while paused, so autoplay doesn't talk over the page. */}
            <span className="sr-only" aria-live={slideshow.playing ? 'off' : 'polite'} aria-atomic="true">
              {`Showing project ${index + 1} of ${count}: ${projects[index].name}`}
            </span>
          </div>
        )}
      </div>

      <div className="bc-body">
        <div className="bc-builder">
          {logo
            ? <img className="bc-avatar" src={logo} alt="" />
            : <span className="bc-avatar" style={{ background: color }} aria-hidden="true">{initials(name)}</span>}
          <span className="bc-builder-text">
            <h3 className="bc-name" id={titleId}>{name}</h3>
            <span className="bc-tagline" title={tagline}>{tagline}</span>
          </span>
        </div>

        <div className="bc-projects">
          {projects.map((project, i) => <ProjectDetails key={project.name} project={project} current={i === index} />)}
        </div>

        {facts.length > 0 && <p className="bc-facts">{facts}</p>}
        <div className="bc-actions">
          <a className="bc-btn bc-btn-primary" href={link.href}>
            View projects<span className="sr-only"> by {name}</span>
            <Icon name="arrowRight" />
          </a>
          <a className="bc-btn bc-btn-soft" href={contact.href}>
            <Icon name="phone" />
            Contact<span className="sr-only"> {name}</span>
          </a>
        </div>
      </div>
    </article>
  );
}
