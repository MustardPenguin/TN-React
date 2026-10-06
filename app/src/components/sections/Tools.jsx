import { SectionHead } from '../ui/SectionHead.jsx';
import './Tools.css';

// Buyer tools: three cards, each with a link. The link stretches over the
// whole card, so it's clickable anywhere. `image` is optional (artwork to come).
export function Tools({ title, items }) {
  return (
    <section className="tools">
      <div className="container">
        <SectionHead title={title} />
        <div className="tools-grid">
          {items.map((tool) => (
            <article key={tool.title} className="tool-card">
              {tool.image && <img className="tool-art" src={tool.image} alt="" loading="lazy" />}
              <h3>{tool.title}</h3>
              <p>{tool.body}</p>
              <a href={tool.link.href} className="tool-link">{tool.link.label} <span aria-hidden="true">→</span></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
