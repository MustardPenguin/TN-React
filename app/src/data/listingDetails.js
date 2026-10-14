// Full details for the listing page, keyed by listing id (the summary each
// card uses lives in listings.js). Placeholder data until it comes from an
// API, typically a "get one listing" call. Descriptions, findings, dates,
// lister names and coordinates are made up; landmark names are real but
// their coordinates are approximate.
//
// Shape:
//   gallery: [image urls]       (the card image is shown first)
//   about: string, details: { label: value } (shown in order)
//   amenities: [keys from AMENITIES below]
//   parking, floor, facing, possession: optional key facts
//   location: { lat, lng, precision: 'exact' | 'approximate' }
//     approximate = shaded area instead of a pin (owner homes, for privacy)
//   checks: one entry per verification step, in order (data/verification.js):
//     { date, finding, detail }   for passed steps
//     { eta }                     for steps still in progress
//   lister: { name, kind: 'owner' | 'builder', since, responds }
//   nearby: computed below from the location (see NEARBY_PLACES)
import { distanceKm, estimateDriveMinutes } from '../lib/geo.js';

const unsplash = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=75`;
const PHOTOS = {
  houseModern: unsplash('photo-1723110994499-df46435aa4b3'),
  tower: unsplash('photo-1663985139222-6af2f8646104'),
  houseRender: unsplash('photo-1626249893889-c044fd88e9f7'),
  apartments: unsplash('photo-1549499090-c9203d2b20ad'),
  villaCommunity: unsplash('photo-1580892138193-0781eef7caf2'),
  villaPool: unsplash('photo-1582610191340-fa501e6e5040'),
  brightApartment: unsplash('photo-1713192704825-74a0017f585d'),
  houseGarden: unsplash('photo-1570129477492-45c003edd2be'),
};

// Amenity keys -> label + icon (components/ui/Icon.jsx).
export const AMENITIES = {
  security: { label: '24×7 security', icon: 'shield' },
  power: { label: 'Power backup', icon: 'bolt' },
  water: { label: '24×7 water', icon: 'droplet' },
  lift: { label: 'Lift', icon: 'lift' },
  parking: { label: 'Covered parking', icon: 'car' },
  gym: { label: 'Gym', icon: 'dumbbell' },
  pool: { label: 'Swimming pool', icon: 'pool' },
  clubhouse: { label: 'Clubhouse', icon: 'people' },
  play: { label: "Children's play area", icon: 'child' },
  garden: { label: 'Landscaped garden', icon: 'tree' },
  internet: { label: 'Fibre internet', icon: 'wifi' },
  gated: { label: 'Gated community', icon: 'home' },
};

// Nearby categories, in display order.
export const NEARBY_CATEGORIES = [
  { key: 'transit', label: 'Transit', icon: 'train' },
  { key: 'health', label: 'Hospitals', icon: 'hospital' },
  { key: 'education', label: 'Education', icon: 'school' },
  { key: 'shopping', label: 'Shopping', icon: 'bag' },
  { key: 'parks', label: 'Parks', icon: 'tree' },
  { key: 'airport', label: 'Airport', icon: 'plane' },
];

// Landmarks a backend would find with a places search. Approximate coordinates.
const NEARBY_PLACES = [
  { category: 'transit', name: 'Raidurg Metro Station', lat: 17.4436, lng: 78.3772 },
  { category: 'transit', name: 'HITEC City Metro Station', lat: 17.4497, lng: 78.3810 },
  { category: 'transit', name: 'Durgam Cheruvu Metro Station', lat: 17.4430, lng: 78.3887 },
  { category: 'transit', name: 'Lingampally Railway Station', lat: 17.4837, lng: 78.3158 },
  { category: 'transit', name: 'Secunderabad Railway Station', lat: 17.4337, lng: 78.5016 },
  { category: 'health', name: 'AIG Hospitals, Gachibowli', lat: 17.4428, lng: 78.3622 },
  { category: 'health', name: 'Continental Hospitals', lat: 17.4194, lng: 78.3405 },
  { category: 'health', name: 'Apollo Hospitals, Jubilee Hills', lat: 17.4153, lng: 78.4125 },
  { category: 'health', name: 'Yashoda Hospitals, Secunderabad', lat: 17.4422, lng: 78.4983 },
  { category: 'education', name: 'University of Hyderabad', lat: 17.4589, lng: 78.3326 },
  { category: 'education', name: 'Indian School of Business', lat: 17.4335, lng: 78.3418 },
  { category: 'education', name: 'Hyderabad Public School, Begumpet', lat: 17.4430, lng: 78.4600 },
  { category: 'shopping', name: 'Inorbit Mall', lat: 17.4337, lng: 78.3866 },
  { category: 'shopping', name: 'IKEA Hyderabad', lat: 17.4440, lng: 78.3757 },
  { category: 'shopping', name: 'Sarath City Capital Mall', lat: 17.4592, lng: 78.3632 },
  { category: 'shopping', name: 'AS Rao Nagar Market', lat: 17.4790, lng: 78.5560 },
  { category: 'parks', name: 'Botanical Garden, Kondapur', lat: 17.4596, lng: 78.3570 },
  { category: 'parks', name: 'Durgam Cheruvu Lake', lat: 17.4320, lng: 78.3880 },
  { category: 'parks', name: 'KBR National Park', lat: 17.4209, lng: 78.4206 },
  { category: 'airport', name: 'Rajiv Gandhi International Airport', lat: 17.2403, lng: 78.4294 },
];

// The two closest places per category (one for the airport), with distance
// and drive time. Stands in for what the backend would store per listing.
function nearbyFor(point) {
  return NEARBY_CATEGORIES.flatMap(({ key }) => NEARBY_PLACES
    .filter((place) => place.category === key)
    .map((place) => {
      const km = distanceKm(point, place);
      return { ...place, km, minutes: estimateDriveMinutes(km) };
    })
    .sort((a, b) => a.km - b.km)
    .slice(0, key === 'airport' ? 1 : 2));
}

const DETAILS = {
  'manikonda-plot-42': {
    gallery: [PHOTOS.houseModern, PHOTOS.brightApartment, PHOTOS.houseGarden, PHOTOS.houseRender, PHOTOS.villaPool],
    about: 'A bright, east-facing independent house on a quiet residential road in Manikonda, a short drive from the Financial District. The ground floor has an open living and dining area that opens onto a small garden, with a modular kitchen and a guest bedroom. Upstairs are three bedrooms with attached bathrooms and a family lounge leading to a covered terrace. The house was built in 2019 by the current owners and has been well maintained, with a 5,000-litre sump, solar water heating and a separate borewell.',
    details: { 'Property type': 'Independent house', 'Plot area': '200 sq yd', 'Built-up area': '2,400 sq ft', 'Floors': 'Ground + 2', 'Age of property': '7 years', 'Furnishing': 'Semi-furnished', 'Ownership': 'Freehold', 'Approvals': 'HMDA approved layout' },
    amenities: ['security', 'power', 'water', 'parking', 'garden', 'internet'],
    parking: 2, floor: 'G + 2', facing: 'East', possession: 'Ready to move',
    location: { lat: 17.4047, lng: 78.3858, precision: 'approximate' },
    checks: [
      { date: '2 Sep 2026', finding: 'Title traced to 2006 through 2 owners · matches seller', detail: 'Sale deeds for 2006 and 2015 checked against the Sub-Registrar records at Gandipet. The current owners are the registered title holders.' },
      { date: '4 Sep 2026', finding: 'No disputes, liens or pending cases', detail: 'Searched civil and revenue court records for the property and both owners. No matters found.' },
      { date: '4 Sep 2026', finding: 'Not a RERA project · approved layout confirmed', detail: 'Independent houses on individual plots are outside RERA. The layout approval and building permission were checked instead.' },
      { date: '6 Sep 2026', finding: 'No loans or charges, 2006–2026', detail: 'Encumbrance certificate for 20 years shows no mortgage or charge. The home loan taken in 2015 was closed in 2022.' },
      { date: '10 Sep 2026', finding: 'Inspected · matches the listing', detail: 'Our inspector walked the plot boundary and every room. Measurements and photos match the listing.' },
    ],
    lister: { name: 'Ravi & Lakshmi Varma', kind: 'owner', since: '2025', responds: 'Usually replies within a day' },
  },
  'madhapur-skyline-b1204': {
    gallery: [PHOTOS.tower, PHOTOS.brightApartment, PHOTOS.apartments, PHOTOS.villaCommunity],
    about: 'A two-bedroom apartment on the 12th floor of Skyline Heights, a gated high-rise a few minutes from HITEC City. Both bedrooms have attached bathrooms and the living room opens onto a west-facing balcony with views over Durgam Cheruvu. The society has a gym, pool and clubhouse, with 24×7 security and power backup.',
    details: { 'Property type': 'Apartment', 'Carpet area': '1,250 sq ft', 'Floor': '12 of 20', 'Age of property': '3 years', 'Furnishing': 'Fully furnished', 'Maintenance': '₹4,500 / month', 'Tower': 'Tower B' },
    amenities: ['security', 'power', 'water', 'lift', 'parking', 'gym', 'pool', 'clubhouse', 'play', 'gated'],
    parking: 1, floor: '12 of 20', facing: 'West', possession: 'Available now',
    location: { lat: 17.4486, lng: 78.3908, precision: 'exact' },
    checks: [
      { date: '28 Aug 2026', finding: 'Title held by Meridian Homes · clear', detail: 'Developer title and the flat allotment were checked against registration records.' },
      { date: '30 Aug 2026', finding: 'No disputes, liens or pending cases', detail: 'Court records for the project and developer showed no matters affecting this flat.' },
      { date: '1 Sep 2026', finding: 'P02400004567 · registered, valid to 2029', detail: 'Registration confirmed on the Telangana RERA portal; the occupancy certificate is on file.' },
      { eta: 'Expected by 18 Sep 2026' },
      { eta: 'Scheduled for 20 Sep 2026' },
    ],
    lister: { name: 'Meridian Homes', kind: 'builder', since: '2024', responds: 'Usually replies within 2 hours' },
  },
  'sainikpuri-plot-57': {
    gallery: [PHOTOS.houseRender, PHOTOS.houseGarden, PHOTOS.brightApartment, PHOTOS.houseModern],
    about: 'A three-bedroom independent house in a leafy, established part of Sainikpuri, close to schools and the AS Rao Nagar market. The house sits on a corner plot with a front garden and a covered car porch, and has a separate staircase to the terrace. Recently repainted, with new plumbing in 2024.',
    details: { 'Property type': 'Independent house', 'Plot area': '167 sq yd', 'Built-up area': '1,800 sq ft', 'Floors': 'Ground + 1', 'Age of property': '12 years', 'Furnishing': 'Unfurnished', 'Ownership': 'Freehold' },
    amenities: ['power', 'water', 'parking', 'garden'],
    parking: 1, floor: 'G + 1', facing: 'North', possession: 'Ready to move',
    location: { lat: 17.4882, lng: 78.5520, precision: 'approximate' },
    checks: [
      { date: '20 Aug 2026', finding: 'Title traced to 1998 through 3 owners · matches seller', detail: 'Chain of sale deeds verified at the Malkajgiri Sub-Registrar office.' },
      { date: '22 Aug 2026', finding: 'No disputes, liens or pending cases', detail: 'No matters found in civil or revenue court records.' },
      { date: '22 Aug 2026', finding: 'Not a RERA project · building permission confirmed', detail: 'Individual house, outside RERA. GHMC building permission checked.' },
      { date: '25 Aug 2026', finding: 'No loans or charges, 2006–2026', detail: 'Encumbrance certificate for 20 years is clear.' },
      { eta: 'Scheduled for 16 Sep 2026' },
    ],
    lister: { name: 'Suresh Kumar', kind: 'owner', since: '2026', responds: 'Usually replies within a day' },
  },
  'kondapur-lakeview-3b': {
    gallery: [PHOTOS.apartments, PHOTOS.brightApartment, PHOTOS.tower],
    about: 'A compact one-bedroom apartment in Lake View Apartments, walking distance from the Botanical Garden and a short drive to the IT corridor. Freshly painted, with a modular kitchen and covered parking.',
    details: { 'Property type': 'Apartment', 'Carpet area': '650 sq ft', 'Floor': '3 of 6', 'Age of property': '9 years', 'Furnishing': 'Semi-furnished', 'Maintenance': '₹2,000 / month' },
    amenities: ['security', 'power', 'water', 'lift', 'parking'],
    parking: 1, floor: '3 of 6', facing: 'East', possession: 'Available now',
    location: { lat: 17.4630, lng: 78.3640, precision: 'approximate' },
    checks: [
      { date: '15 Aug 2026', finding: 'Title verified · matches owner', detail: 'Sale deed checked against registration records.' },
      { date: '16 Aug 2026', finding: 'No disputes, liens or pending cases', detail: 'No matters found.' },
      { date: '16 Aug 2026', finding: 'Society registration confirmed', detail: 'Built before RERA; society and occupancy documents checked.' },
      { date: '19 Aug 2026', finding: 'No loans or charges, 2006–2026', detail: 'Encumbrance certificate is clear.' },
      { date: '21 Aug 2026', finding: 'Inspected · matches the listing', detail: 'Flat and common areas inspected.' },
    ],
    lister: { name: 'Anjali Desai', kind: 'owner', since: '2025', responds: 'Usually replies within a few hours' },
  },
  'kokapet-greenmeadows-8': {
    gallery: [PHOTOS.villaCommunity, PHOTOS.villaPool, PHOTOS.houseModern, PHOTOS.brightApartment, PHOTOS.houseGarden],
    about: 'Villa 8 is a five-bedroom, ready-to-move villa in Green Meadows, a gated community of 64 villas in Kokapet by Aranya Developers. Each villa has a private garden, a home theatre room and a double-height living area. The community has a clubhouse with a pool, gym and indoor games, landscaped walking trails and a children\'s play area, with the Financial District and the Outer Ring Road a few minutes away.',
    details: { 'Property type': 'Villa', 'Plot area': '400 sq yd', 'Built-up area': '4,200 sq ft', 'Floors': 'Ground + 2', 'Project': 'Green Meadows (64 villas)', 'Furnishing': 'Unfurnished', 'Maintenance': '₹12,000 / month', 'RERA': 'P02400008811' },
    amenities: ['security', 'power', 'water', 'parking', 'gym', 'pool', 'clubhouse', 'play', 'garden', 'internet', 'gated'],
    parking: 3, floor: 'G + 2', facing: 'East', possession: 'Ready to move',
    location: { lat: 17.3986, lng: 78.3341, precision: 'exact' },
    checks: [
      { date: '1 Sep 2026', finding: 'Project land title traced to 1972 · clear', detail: 'The developer\'s title to the project land and this villa\'s allotment were checked against revenue and registration records.' },
      { date: '3 Sep 2026', finding: 'No disputes, liens or pending cases', detail: 'Court records for the project, the land and the developer showed no matters.' },
      { date: '3 Sep 2026', finding: 'P02400008811 · registered, valid to 2028', detail: 'Registration confirmed on the Telangana RERA portal. Quarterly progress updates are up to date.' },
      { date: '5 Sep 2026', finding: 'No loans or charges on this villa', detail: 'The project loan does not cover this villa; a no-objection letter from the lender is on file.' },
      { date: '8 Sep 2026', finding: 'Inspected · matches the listing', detail: 'The villa and community facilities were inspected and match the listing and brochure.' },
    ],
    lister: { name: 'Aranya Developers', kind: 'builder', since: '2024', responds: 'Usually replies within 2 hours' },
  },
  'gachibowli-orchid-15': {
    gallery: [PHOTOS.villaPool, PHOTOS.villaCommunity, PHOTOS.brightApartment, PHOTOS.houseGarden],
    about: 'A four-bedroom villa with a private pool in Orchid Enclave, Gachibowli, close to the Financial District and leading schools. Fully furnished, with a study, a servant\'s room and a landscaped garden.',
    details: { 'Property type': 'Villa', 'Built-up area': '3,100 sq ft', 'Floors': 'Ground + 1', 'Age of property': '5 years', 'Furnishing': 'Fully furnished', 'Maintenance': 'Included in rent' },
    amenities: ['security', 'power', 'water', 'parking', 'pool', 'garden', 'internet', 'gated'],
    parking: 2, floor: 'G + 1', facing: 'North', possession: 'Available from 1 Nov 2026',
    location: { lat: 17.4373, lng: 78.3534, precision: 'approximate' },
    checks: [
      { date: '10 Sep 2026', finding: 'Title verified · matches owner', detail: 'Sale deed checked against registration records.' },
      { date: '11 Sep 2026', finding: 'No disputes, liens or pending cases', detail: 'No matters found.' },
      { date: '11 Sep 2026', finding: 'Layout approval confirmed', detail: 'Orchid Enclave layout approval checked.' },
      { date: '13 Sep 2026', finding: 'No loans or charges, 2006–2026', detail: 'Encumbrance certificate is clear.' },
      { date: '15 Sep 2026', finding: 'Inspected · matches the listing', detail: 'Villa inspected, including the pool and garden.' },
    ],
    lister: { name: 'Vikram Rao', kind: 'owner', since: '2023', responds: 'Usually replies within a day' },
  },
};

// Final shape: each listing's details plus its computed nearby places.
export const listingDetails = Object.fromEntries(
  Object.entries(DETAILS).map(([id, detail]) => [id, { ...detail, nearby: nearbyFor(detail.location) }]),
);
