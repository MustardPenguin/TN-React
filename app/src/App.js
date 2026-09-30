import { html } from './lib/html.js';
import { Header } from './components/layout/Header.js';
import { Footer } from './components/layout/Footer.js';
import { Hero } from './components/sections/Hero.js';
import { Verification } from './components/sections/Verification.js';
import { Paths } from './components/sections/Paths.js';
import { FeaturedListings } from './components/sections/FeaturedListings.js';
import { ListYourProperty } from './components/sections/ListYourProperty.js';
import { Stats } from './components/sections/Stats.js';
import { Cities } from './components/sections/Cities.js';
import { Testimonials } from './components/sections/Testimonials.js';
import { CtaBanner } from './components/sections/CtaBanner.js';
import { mainNav, headerIconLinks, footerColumns, legalLinks, socialLinks } from './data/navigation.js';
import { featuredListings, listingFilters } from './data/listings.js';
import { cities, popularSearches } from './data/cities.js';
import { heroSlides, heroHeadlines, heroSlideInterval, heroSearchSuggestions } from './data/hero.js';
import { paths, listingSteps, stats, testimonials } from './data/marketing.js';
import { verificationIntro, verificationSteps, verificationComplete } from './data/verification.js';

export function App() {
  return html`
    ${Header({ links: mainNav, iconLinks: headerIconLinks })}
    <main>
      ${Hero({ popularSearches, searchSuggestions: heroSearchSuggestions, slides: heroSlides, headlines: heroHeadlines, interval: heroSlideInterval })}
      ${Paths({ items: paths })}
      ${FeaturedListings({ listings: featuredListings, filters: listingFilters, location: 'Hyderabad' })}
      ${Verification({ intro: verificationIntro, steps: verificationSteps, complete: verificationComplete })}
      ${ListYourProperty({ steps: listingSteps })}
      ${Stats({ items: stats })}
      ${Cities({ cities })}
      ${Testimonials({ items: testimonials })}
      ${CtaBanner({
        title: 'Have a property to sell or rent?',
        body: 'Create a verified listing and connect with buyers and renters today.',
        action: { label: 'Get started', href: '#' },
      })}
    </main>
    ${Footer({ columns: footerColumns, legalLinks, socialLinks })}`;
}
