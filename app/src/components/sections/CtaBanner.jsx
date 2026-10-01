import './CtaBanner.css';

export function CtaBanner({ title, body, action }) {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta-box">
          <div>
            <h2>{title}</h2>
            <p>{body}</p>
          </div>
          <a href={action.href} className="btn">{action.label}</a>
        </div>
      </div>
    </section>
  );
}
