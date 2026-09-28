import { html } from '../../lib/html.js';
import { Logo } from '../ui/Logo.js';
import { Icon } from '../ui/Icon.js';
import './Footer.css';

export function Footer({ columns, legalLinks, socialLinks, year = new Date().getFullYear() }) {
  return html`
    <footer>
      <div class="container">
        <div class="f-grid">
          <div>
            ${Logo({ variant: 'dark' })}
            <p class="f-tagline">Homes for sale and rent, listed directly by the people who own them.</p>
          </div>
          ${columns.map((col) => html`
            <div><h5>${col.title}</h5><ul>${col.links.map((link) => html`<li><a href="${link.href}">${link.label}</a></li>`)}</ul></div>`)}
        </div>
        <div class="f-bottom">
          <span>© ${year} TrueNest. All rights reserved.${legalLinks.map((link) => html` · <a href="${link.href}">${link.label}</a>`)}</span>
          <div class="socials">
            ${socialLinks.map((s) => html`<a href="${s.href}" aria-label="${s.label}">${Icon({ name: s.icon })}</a>`)}
          </div>
        </div>
      </div>
    </footer>`;
}
