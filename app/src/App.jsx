import { Header } from './components/layout/Header.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { Hero } from './components/sections/Hero.jsx';
import { Verification } from './components/sections/Verification.jsx';
import { Paths } from './components/sections/Paths.jsx';
import { FeaturedListings } from './components/sections/FeaturedListings.jsx';
import { RecentlyViewed } from './components/sections/RecentlyViewed.jsx';
import { ListYourProperty } from './components/sections/ListYourProperty.jsx';
import { Stats } from './components/sections/Stats.jsx';
import { Tools } from './components/sections/Tools.jsx';
import { Cities } from './components/sections/Cities.jsx';
import { Testimonials } from './components/sections/Testimonials.jsx';
import { CtaBanner } from './components/sections/CtaBanner.jsx';
import { headerCities, mainNav, headerIconLinks, footerColumns, legalLinks, socialLinks } from './data/navigation.js';
import { featuredListings, listingFilters, recentlyViewed } from './data/listings.js';
import { cities, popularSearches } from './data/cities.js';
import { heroSlides, heroHeadlines, heroSlideInterval, heroSearchSuggestions } from './data/hero.js';
import { paths, listingSteps, stats, testimonials, toolsTitle, tools } from './data/marketing.js';
import { verificationIntro, verificationSteps, verificationComplete } from './data/verification.js';

// Page composition. This is the only place data comes in: components below
// receive everything as props, so swapping src/data/ for API calls later only
// changes this level.

// Resolve the viewing history's listing ids to listings (skipping any that
// no longer exist).
const recentItems = recentlyViewed
  .map(({ id, viewed }) => ({ listing: featuredListings.find((l) => l.id === id), viewed }))
  .filter((item) => item.listing);

export function App() {
  return (
    <>
      <Header links={mainNav} iconLinks={headerIconLinks} cities={headerCities} />
      <main>
        <Hero
          popularSearches={popularSearches}
          searchSuggestions={heroSearchSuggestions}
          slides={heroSlides}
          headlines={heroHeadlines}
          interval={heroSlideInterval}
        />
        {/* The hero stays pinned while this sheet slides up over it. */}
        <div className="page-sheet">
          <Paths items={paths} />
          <FeaturedListings listings={featuredListings} filters={listingFilters} location="Hyderabad" checkSteps={verificationSteps} />
          <RecentlyViewed items={recentItems} checkSteps={verificationSteps} />
          <Verification intro={verificationIntro} steps={verificationSteps} complete={verificationComplete} />
          <ListYourProperty steps={listingSteps} />
          <Stats items={stats} />
          <Tools title={toolsTitle} items={tools} />
          <Cities cities={cities} />
          <Testimonials items={testimonials} />
          <CtaBanner
            title="Have a property to sell or rent?"
            body="Create a verified listing and connect with buyers and renters today."
            action={{ label: 'Get started', href: '#' }}
          />
        </div>
      </main>
      <Footer columns={footerColumns} legalLinks={legalLinks} socialLinks={socialLinks} />
    </>
  );
}
