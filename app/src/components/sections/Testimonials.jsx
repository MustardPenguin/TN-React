import { SectionHead } from '../ui/SectionHead.jsx';
import { TestimonialCard } from '../ui/TestimonialCard.jsx';
import './Testimonials.css';

export function Testimonials({ items }) {
  return (
    <section className="testimonials">
      <div className="container">
        <SectionHead eyebrow="Testimonials" title="What people are saying" />
        <div className="t-grid">
          {items.map((item) => <TestimonialCard key={item.name} {...item} />)}
        </div>
      </div>
    </section>
  );
}
