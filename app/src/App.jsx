import { lazy, Suspense, useLayoutEffect } from 'react';
import { HashRouter, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { Header } from './components/layout/Header.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { HomePage } from './pages/HomePage.jsx';
// The listing page (and the map library it uses) loads only when needed.
const ListingPage = lazy(() => import('./pages/ListingPage.jsx').then((m) => ({ default: m.ListingPage })));
import { NotFoundPage } from './pages/NotFoundPage.jsx';
import { headerCities, mainNav, headerIconLinks, footerColumns, legalLinks, socialLinks } from './data/navigation.js';
import { featuredListings, listingFilters, recentlyViewed } from './data/listings.js';
import { listingDetails } from './data/listingDetails.js';
import { cities, popularSearches } from './data/cities.js';
import { heroSlides, heroHeadlines, heroSlideInterval, heroSearchSuggestions } from './data/hero.js';
import { paths, listingSteps, stats, testimonials, toolsTitle, tools } from './data/marketing.js';
import { verificationIntro, verificationSteps, verificationComplete } from './data/verification.js';
import { buildersIntro, builders, builderSlideInterval } from './data/builders.js';
import { listingHref } from './lib/routes.js';

// Routing + data. This is the only place data comes in: pages and components
// receive everything as props, so swapping src/data/ for API calls later only
// changes this file.
// Hash URLs (#/listing/<id>, see lib/routes.js) because GitHub Pages can't
// serve other paths.

// Resolve the viewing history's listing ids to listings (skipping any that
// no longer exist).
const recentItems = recentlyViewed
  .map(({ id, viewed }) => ({ listing: featuredListings.find((l) => l.id === id), viewed }))
  .filter((item) => item.listing);

const homeProps = {
  hero: { popularSearches, searchSuggestions: heroSearchSuggestions, slides: heroSlides, headlines: heroHeadlines, interval: heroSlideInterval },
  paths,
  listings: { listings: featuredListings, filters: listingFilters, location: 'Hyderabad', checkSteps: verificationSteps, hrefFor: listingHref },
  recent: { items: recentItems, checkSteps: verificationSteps, hrefFor: listingHref },
  builders: { intro: buildersIntro, builders, interval: builderSlideInterval },
  verification: { intro: verificationIntro, steps: verificationSteps, complete: verificationComplete },
  listYourProperty: listingSteps,
  stats,
  tools: { title: toolsTitle, items: tools },
  cities,
  testimonials,
};

function ListingRoute() {
  const { id } = useParams();
  const listing = featuredListings.find((l) => l.id === id);
  const details = listingDetails[id];
  if (!listing || !details) return <NotFoundPage />;
  // Similar homes: same listing type first, then the rest.
  const similar = featuredListings
    .filter((l) => l.id !== id)
    .sort((a, b) => Number(b.listingType === listing.listingType) - Number(a.listingType === listing.listingType))
    .slice(0, 3);
  return (
    <Suspense fallback={<main className="page-loading" aria-busy="true" />}>
      <ListingPage key={id} listing={listing} details={details} checkSteps={verificationSteps} similar={similar} hrefFor={listingHref} />
    </Suspense>
  );
}

// New page -> start at the top (hash routes keep the old scroll otherwise).
function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Shell() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  return (
    <>
      <ScrollToTop />
      {/* Home: solid over the hero, frosted once the page sheet reaches it. */}
      <Header links={mainNav} iconLinks={headerIconLinks} cities={headerCities} transparentUntil={isHome ? '.page-sheet' : undefined} />
      <Routes>
        <Route path="/" element={<HomePage {...homeProps} />} />
        <Route path="/listing/:id" element={<ListingRoute />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer columns={footerColumns} legalLinks={legalLinks} socialLinks={socialLinks} />
    </>
  );
}

export function App() {
  return (
    <HashRouter>
      <Shell />
    </HashRouter>
  );
}
