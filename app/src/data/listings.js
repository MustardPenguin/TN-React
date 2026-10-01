// Placeholder data until listings come from an API.
// Prices are in rupees; `listingType` is 'sale' | 'rent'; rent prices are per month.
// `beds` is the BHK count. Society/street names are made up.
// `listedBy` is 'owner' | 'builder' (TrueNest lists for both).
// `views` / `saves`: how many people viewed / saved it (`saved` is whether the
// current visitor did). `checksPassed`: verification checks passed, out of the
// steps in data/verification.js; live listings have passed them all.
// `badge.tone` maps to a .badge modifier: 'new' | 'rent' | 'cut' | undefined.

const unsplash = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;

export const listingFilters = ['All', 'For sale', 'For rent', 'Apartments', 'Independent houses', 'Villas'];

export const featuredListings = [
  {
    id: 'manikonda-plot-42',
    listedBy: 'owner',
    views: 1284, saves: 86, checksPassed: 5,
    image: unsplash('photo-1723110994499-df46435aa4b3'),
    fallback: 'linear-gradient(135deg,#8ec5c4,#3d6f8a)',
    badge: { label: 'New', tone: 'new' },
    price: 18500000,
    listingType: 'sale',
    propertyType: 'Independent house',
    beds: 4, baths: 4, sqft: 2400,
    address: 'Plot 42, Road No. 5, Manikonda, Hyderabad 500089',
    saved: false,
  },
  {
    id: 'madhapur-skyline-b1204',
    listedBy: 'builder',
    views: 2310, saves: 142, checksPassed: 3,
    image: unsplash('photo-1663985139222-6af2f8646104'),
    fallback: 'linear-gradient(135deg,#c7d2fe,#475569)',
    badge: { label: 'For rent', tone: 'rent' },
    price: 38000,
    listingType: 'rent',
    propertyType: 'Apartment',
    beds: 2, baths: 2, sqft: 1250,
    address: 'Flat 1204, Tower B, Skyline Heights, Madhapur, Hyderabad 500081',
    saved: false,
  },
  {
    id: 'sainikpuri-plot-57',
    listedBy: 'owner',
    views: 956, saves: 61, checksPassed: 4,
    image: unsplash('photo-1626249893889-c044fd88e9f7'),
    fallback: 'linear-gradient(135deg,#fde68a,#b45309)',
    badge: { label: 'Price cut', tone: 'cut' },
    price: 14500000,
    listingType: 'sale',
    propertyType: 'Independent house',
    beds: 3, baths: 3, sqft: 1800,
    address: 'Plot 57, Sainikpuri, Secunderabad, Hyderabad 500094',
    saved: true,
  },
  {
    id: 'kondapur-lakeview-3b',
    listedBy: 'owner',
    views: 642, saves: 38, checksPassed: 2,
    image: unsplash('photo-1549499090-c9203d2b20ad'),
    fallback: 'linear-gradient(135deg,#fbcfe8,#6b21a8)',
    badge: { label: 'For rent', tone: 'rent' },
    price: 22000,
    listingType: 'rent',
    propertyType: 'Apartment',
    beds: 1, baths: 1, sqft: 650,
    address: 'Flat 3B, Lake View Apartments, Kondapur, Hyderabad 500084',
    saved: false,
  },
  {
    id: 'kokapet-greenmeadows-8',
    listedBy: 'builder',
    views: 12480, saves: 312, checksPassed: 5,
    image: unsplash('photo-1580892138193-0781eef7caf2'),
    fallback: 'linear-gradient(135deg,#a7f3d0,#065f46)',
    badge: { label: 'Ready to move' },
    price: 65000000,
    listingType: 'sale',
    propertyType: 'Villa',
    beds: 5, baths: 5, sqft: 4200,
    address: 'Villa 8, Green Meadows, Kokapet, Hyderabad 500075',
    saved: false,
  },
  {
    id: 'gachibowli-orchid-15',
    listedBy: 'owner',
    views: 1530, saves: 97, checksPassed: 5,
    image: unsplash('photo-1582610191340-fa501e6e5040'),
    fallback: 'linear-gradient(135deg,#bae6fd,#1e3a8a)',
    badge: { label: 'New', tone: 'new' },
    price: 125000,
    listingType: 'rent',
    propertyType: 'Villa',
    beds: 4, baths: 4, sqft: 3100,
    address: 'Villa 15, Orchid Enclave, Gachibowli, Hyderabad 500032',
    saved: false,
  },
];
