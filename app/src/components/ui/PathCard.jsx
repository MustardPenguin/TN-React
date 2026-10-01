import { Illustration } from './Illustration.jsx';
import './PathCard.css';

export function PathCard({ illustration, title, body, link }) {
  return (
    <div className="path-card">
      <div className="path-art"><Illustration name={illustration} /></div>
      <h3>{title}</h3>
      <p>{body}</p>
      <a href={link.href} className="link-arrow">{link.label} →</a>
    </div>
  );
}
