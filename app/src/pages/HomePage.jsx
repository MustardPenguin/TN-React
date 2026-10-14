import { Hero } from '../components/sections/Hero.jsx';
import { Verification } from '../components/sections/Verification.jsx';
import { Paths } from '../components/sections/Paths.jsx';
import { FeaturedListings } from '../components/sections/FeaturedListings.jsx';
import { RecentlyViewed } from '../components/sections/RecentlyViewed.jsx';
import { Builders } from '../components/sections/Builders.jsx';
import { ListYourProperty } from '../components/sections/ListYourProperty.jsx';
import { Stats } from '../components/sections/Stats.jsx';
import { Tools } from '../components/sections/Tools.jsx';
import { Cities } from '../components/sections/Cities.jsx';
import { Testimonials } from '../components/sections/Testimonials.jsx';
import { CtaBanner } from '../components/sections/CtaBanner.jsx';

// The landing page. All content comes in as props from App.jsx.
export function HomePage({ hero, paths, listings, recent, builders, verification, listYourProperty, stats, tools, cities, testimonials }) {
  return (
    <main>
      <Hero {...hero} />
      {/* The hero stays pinned while this sheet slides up over it. */}
      <div className="page-sheet">
        <Paths items={paths} />
        <FeaturedListings {...listings} />
        <RecentlyViewed {...recent} />
        <Builders {...builders} />
        <Verification {...verification} />
        <ListYourProperty steps={listYourProperty} />
        <Stats items={stats} />
        <Tools {...tools} />
        <Cities cities={cities} />
        <Testimonials items={testimonials} />
        <CtaBanner
          title="Have a property to sell or rent?"
          body="Create a verified listing and connect with buyers and renters today."
          action={{ label: 'Get started', href: '#' }}
        />
      </div>
    </main>
  );
}
