import { html } from '../../lib/html.js';
import { Logo } from '../ui/Logo.js';
import { Icon } from '../ui/Icon.js';
import './Header.css';

export function Header({ links }) {
  return html`
    <header>
      <div class="container nav">
        ${Logo()}
        <nav class="nav-links">
          ${links.map((link) => html`<a href="${link.href}">${link.label}</a>`)}
        </nav>
        <div class="nav-actions">
          <a href="#" class="signin">Sign in</a>
          <a href="#" class="btn btn-primary">List your property</a>
          <button class="menu-btn" aria-label="Menu">${Icon({ name: 'menu' })}</button>
        </div>
      </div>
    </header>`;
}
