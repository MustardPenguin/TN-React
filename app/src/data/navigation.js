// City filter in the header (components/ui/CityPicker.jsx). The first city is
// the default. Mockup: picking a city doesn't filter the page yet, and the
// `homes` counts are placeholders. `image` is a small square thumbnail.
const cityThumb = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=96&h=96&q=70`;

export const headerCities = [
  { name: 'Hyderabad', state: 'Telangana', homes: 6120, image: cityThumb('photo-1696941515998-d83f24967aca') }, // Charminar
  { name: 'Bengaluru', state: 'Karnataka', homes: 2960, image: cityThumb('photo-1565018054866-968e244671af') }, // Vidhana Soudha
];

// Main navigation. Each item opens a dropdown panel (components/layout/
// NavMenu.jsx) with one of two layouts:
//   menu.columns: titled link lists; links may have an `icon` (Icon.jsx)
//   menu.cards:   larger choices with an icon, title and one-line `text`
// plus optional `promo` (highlighted card) and `footer` (links along the
// bottom). All hrefs are placeholders. Localities are Hyderabad's for now;
// they'll follow the city picker once it filters.
export const mainNav = [
  {
    label: 'Buy',
    menu: {
      columns: [
        { title: 'Property type', links: [
          { label: 'Flats & apartments', icon: 'building', href: '#' },
          { label: 'Independent houses', icon: 'home', href: '#' },
          { label: 'Villas', icon: 'pool', href: '#' },
          { label: 'Builder floors', icon: 'layers', href: '#' },
          { label: 'Plots', icon: 'area', href: '#' },
          { label: 'New projects', icon: 'calendar', href: '#' },
        ] },
        { title: 'Budget', links: [
          { label: 'Under ₹50 L', href: '#' },
          { label: '₹50 L – ₹1 Cr', href: '#' },
          { label: '₹1 – 2 Cr', href: '#' },
          { label: '₹2 – 5 Cr', href: '#' },
          { label: 'Above ₹5 Cr', href: '#' },
        ] },
        { title: 'Popular areas', links: [
          { label: 'Gachibowli', href: '#' },
          { label: 'Kokapet', href: '#' },
          { label: 'Kondapur', href: '#' },
          { label: 'HITEC City', href: '#' },
          { label: 'Manikonda', href: '#' },
        ] },
      ],
      promo: { icon: 'shieldCheck', title: '5 checks on every listing', text: 'Title, court history, RERA, loans and a site visit, done before you decide.', link: { label: 'How verification works', href: '#' } },
      footer: [{ label: 'Browse all homes for sale', href: '#' }, { label: 'Buying from abroad? NRI guide', href: '#' }],
    },
  },
  {
    label: 'Rent',
    menu: {
      columns: [
        { title: 'Property type', links: [
          { label: 'Flats & apartments', icon: 'building', href: '#' },
          { label: 'Independent houses', icon: 'home', href: '#' },
          { label: 'Villas', icon: 'pool', href: '#' },
          { label: 'Builder floors', icon: 'layers', href: '#' },
        ] },
        { title: 'Monthly budget', links: [
          { label: 'Under ₹20,000', href: '#' },
          { label: '₹20,000 – ₹40,000', href: '#' },
          { label: '₹40,000 – ₹1 L', href: '#' },
          { label: 'Above ₹1 L', href: '#' },
        ] },
        { title: 'Furnishing', links: [
          { label: 'Fully furnished', href: '#' },
          { label: 'Semi-furnished', href: '#' },
          { label: 'Unfurnished', href: '#' },
        ] },
      ],
      promo: { icon: 'shieldCheck', title: 'Rent from verified owners', text: 'Every home is checked before it goes live, so the owner and the address are real.', link: { label: 'How verification works', href: '#' } },
      footer: [{ label: 'Browse all homes for rent', href: '#' }],
    },
  },
  {
    label: 'List',
    menu: {
      intro: 'List with TrueNest',
      cards: [
        { icon: 'home', title: 'Owners', text: 'Sell or rent out your home', href: '#' },
        { icon: 'building', title: 'Developers', text: 'List and sell your projects', href: '#' },
        { icon: 'people', title: 'Brokers & agents', text: 'Manage listings for your clients', href: '#' },
      ],
      promo: { icon: 'shieldCheck', title: 'Verified listings sell with confidence', text: 'We run the five checks, so buyers can trust what they see.', link: { label: 'See pricing', href: '#' } },
      footer: [{ label: 'How listing works', href: '#' }, { label: 'Help for sellers', href: '#' }],
    },
  },
];

// Icon-only links at the top right of the header. `label` is the accessible
// name and hover tooltip; `icon` is a name from components/ui/Icon.js.
export const headerIconLinks = [
  { label: 'Help', icon: 'help', href: '#' },
  { label: 'Saved homes', icon: 'saved', href: '#' },
  { label: 'Sign in', icon: 'user', href: '#' },
];

export const footerColumns = [
  {
    title: 'Explore',
    links: [
      { label: 'Buy', href: '#' },
      { label: 'Rent', href: '#' },
      { label: 'Saved homes', href: '#' },
      { label: 'Areas', href: '#' },
    ],
  },
  {
    title: 'Sellers',
    links: [
      { label: 'List a property', href: '#' },
      { label: 'Manage listings', href: '#' },
      { label: 'Pricing', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help center', href: '#' },
      { label: 'Safety tips', href: '#' },
      { label: 'RERA info', href: '#' },
    ],
  },
];

export const legalLinks = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
];

export const socialLinks = [
  { label: 'Facebook', icon: 'facebook', href: '#' },
  { label: 'Instagram', icon: 'instagram', href: '#' },
  { label: 'LinkedIn', icon: 'linkedin', href: '#' },
];
