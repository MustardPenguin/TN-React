export function SectionHead({ eyebrow, title, sub, link }) {
  return (
    <div className="section-head">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h2>{title}</h2>
        {sub && <p className="sub">{sub}</p>}
      </div>
      {link && <a href={link.href} className="link-arrow">{link.label} →</a>}
    </div>
  );
}
