import { PathCard } from '../ui/PathCard.jsx';
import './Paths.css';

export function Paths({ items }) {
  return (
    <section className="paths">
      <div className="container">
        <div className="path-grid">
          {items.map((item) => <PathCard key={item.title} {...item} />)}
        </div>
      </div>
    </section>
  );
}
