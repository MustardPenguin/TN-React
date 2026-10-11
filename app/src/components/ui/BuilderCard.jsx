import { useRef, useState } from 'react';
import { cx } from '../../lib/cx.js';
import { formatPrice } from '../../lib/format.js';
import { Icon } from './Icon.jsx';
import './BuilderCard.css';

const initials = (name) => name.split(' ').map((word) => word[0]).slice(0, 2).join('');

// Photos of the featured project. Manual only (no autoplay): arrows on hover
// or focus, dots, or a swipe on touch screens. Photos load as they're first
// needed (the current one plus the next), then stay so changes cross-fade.
function ProjectPhotos({ project }) {
  const { images, name } = project;
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(() => new Set([0, 1]));
  const swipeX = useRef(null);
  const count = images.length;
  const show = (i) => {
    const next = (i + count) % count;
    setIndex(next);
    setLoaded((prev) => new Set([...prev, next, (next + 1) % count]));
  };

  return (
    <div
      className="bc-photo"
      onPointerDown={(e) => { if (e.pointerType === 'touch') swipeX.current = e.clientX; }}
      onPointerUp={(e) => {
        if (swipeX.current == null) return;
        const dx = e.clientX - swipeX.current;
        swipeX.current = null;
        if (Math.abs(dx) > 40) show(index + (dx < 0 ? 1 : -1));
      }}
    >
      {images.map((src, i) => loaded.has(i) && (
        <img key={src} src={src} alt={i === index ? `${name}, photo ${i + 1} of ${count}` : ''} aria-hidden={i === index ? undefined : true} className={cx(i === index && 'is-active')} />
      ))}
      {count > 1 && (
        <>
          <button type="button" className="bc-photo-btn prev" aria-label={`Previous photo of ${name}`} onClick={() => show(index - 1)}><Icon name="chevronLeft" /></button>
          <button type="button" className="bc-photo-btn next" aria-label={`Next photo of ${name}`} onClick={() => show(index + 1)}><Icon name="chevronRight" /></button>
          <div className="bc-dots">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                className={cx('bc-dot', i === index && 'is-active')}
                aria-label={`Show photo ${i + 1} of ${count}`}
                aria-current={i === index ? 'true' : undefined}
                onClick={() => show(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// One builder: their featured project's photos, details and key facts.
// Key facts are optional and only shown when provided.
export function BuilderCard({ builder }) {
  const { name, tagline, logo, color, yearsActive, projectsDelivered, ongoing, cities, link, contact } = builder;
  const project = builder.projects[0];
  const titleId = `builder-${builder.id}`;
  const facts = [
    yearsActive != null && <span key="y"><b>{yearsActive}</b> years</span>,
    projectsDelivered != null && <span key="d"><b>{projectsDelivered}</b> projects delivered</span>,
    ongoing != null && <span key="o"><b>{ongoing}</b> ongoing</span>,
    cities?.length > 0 && <span key="c">{cities.join(' · ')}</span>,
    project.rera && <span key="r" className="bc-rera">RERA {project.rera}</span>,
  ].filter(Boolean);

  return (
    <article className="builder-card" aria-labelledby={titleId}>
      <div className="bc-media">
        <ProjectPhotos project={project} />
        <span className="bc-logo">
          {logo
            ? <img src={logo} alt="" />
            : <i style={{ background: color }} aria-hidden="true">{initials(name)}</i>}
          {name}
        </span>
      </div>
      <div className="bc-body">
        <p className="bc-builder" title={tagline}><b>{name}</b> · {tagline}</p>
        <h3 className="bc-project" id={titleId}>{project.name}</h3>
        <p className="bc-loc">{project.locality}</p>
        <dl className="bc-meta">
          <div className="bc-price"><dt>Price</dt><dd>{formatPrice(project.priceMin)} – {formatPrice(project.priceMax)}</dd></div>
          <div><dt>Homes</dt><dd>{project.unitTypes}</dd></div>
          <div><dt>Possession</dt><dd>{project.possession}</dd></div>
        </dl>
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
