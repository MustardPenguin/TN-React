import './Stats.css';

export function Stats({ items }) {
  return (
    <section className="stats">
      <div className="container stats-grid">
        {items.map((s) => <div key={s.label} className="stat"><b>{s.value}</b><span>{s.label}</span></div>)}
      </div>
    </section>
  );
}
