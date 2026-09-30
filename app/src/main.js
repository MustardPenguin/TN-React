// Global styles first so component styles (imported by each component)
// cascade after them.
import './styles/tokens.css';
import './styles/base.css';

import { mount } from './lib/html.js';
import { App } from './App.js';
import { initHero } from './components/sections/Hero.js';
import { initVerification } from './components/sections/Verification.js';

const root = document.getElementById('root');
mount(root, App());
initHero(root);
initVerification(root);
