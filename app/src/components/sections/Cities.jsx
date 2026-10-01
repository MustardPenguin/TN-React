import { SectionHead } from '../ui/SectionHead.jsx';
import { CityCard } from '../ui/CityCard.jsx';
import './Cities.css';

export function Cities({ cities }) {
  return (
    <section>
      <div className="container">
        <SectionHead eyebrow="Explore" title="Browse homes by area" link={{ label: 'All areas', href: '#' }} />
        <div className="city-grid">
          {cities.map((city) => <CityCard key={city.name} city={city} />)}
        </div>
      </div>
    </section>
  );
}
