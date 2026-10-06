import { Illustration } from './Illustration.jsx';
import './PathCard.css';

// `image` is a picture URL; `illustration` (a name from Illustration.jsx) is
// used when there's no image. Either way it's decorative: the heading says
// what the card is, so alt is empty.
export function PathCard({ image, illustration, title, body, link }) {
  return (
    <div className="path-card">
      <div className="path-art">
        {image ? <img src={image} alt="" loading="lazy" /> : <Illustration name={illustration} />}
      </div>
      <h3>{title}</h3>
      <p>{body}</p>
      <a href={link.href} className="link-arrow">{link.label} →</a>
    </div>
  );
}
