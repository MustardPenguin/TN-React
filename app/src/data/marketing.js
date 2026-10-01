// Static landing-page copy.

// `illustration` names an entry in components/ui/Illustration.js.
export const paths = [
  { illustration: 'buyer', title: 'Buy a home', body: 'Explore homes for sale with detailed photos, pricing history, and locality info.', link: { label: 'Browse homes', href: '#' } },
  { illustration: 'renter', title: 'Rent a home', body: 'Find apartments, villas, and independent houses for rent that fit your budget and lifestyle.', link: { label: 'Find rentals', href: '#' } },
  { illustration: 'owner', title: 'List your property', body: 'Selling a home or a project? Get it verified and reach serious buyers, here and abroad.', link: { label: 'Start a listing', href: '#' } },
];

// "List your property" section. Verification is a step of its own: nothing
// goes live until all five checks pass.
export const listingSteps = [
  { title: 'Submit your property', body: 'Share the details, photos, and title documents.' },
  { title: 'We verify it', body: 'Our team completes all five checks, from title to site visit.' },
  { title: 'Go live, verified', body: 'Buyers here and abroad see it with its verified status.' },
];

export const stats = [
  { value: '25k+', label: 'Active listings' },
  { value: '50+', label: 'Localities covered' },
  { value: '1M+', label: 'Monthly visitors' },
  { value: '4.9★', label: 'Average user rating' },
];

// Placeholder testimonials — replace with real, consented quotes before launch.
export const testimonials = [
  { rating: 5, quote: 'Found our first flat in two days. The filters made it easy to stick to our budget.', name: 'Priya Sharma', initials: 'PS', role: 'Renter · Placeholder', color: '#0e7c7b' },
  { rating: 5, quote: 'I listed my flat on a Monday and had three site visits booked by Friday.', name: 'Rahul Reddy', initials: 'RR', role: 'Property owner · Placeholder', color: '#1d3b53' },
  { rating: 4, quote: 'The listing photos and details were accurate, which saved us a lot of wasted visits.', name: 'Ananya Rao', initials: 'AR', role: 'Home buyer · Placeholder', color: '#b45309' },
];
