import { initializeNavigation } from './components/nav.js';
import { initializeHero } from './components/hero.js';
import { initializeFeatures } from './components/features.js';
import { initializeFooter } from './components/footer.js';
import { initializeUrlParams } from './utils/urlHandler.js';

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
  initializeNavigation();
  initializeHero();
  initializeFeatures();
  initializeFooter();
  initializeUrlParams();
});