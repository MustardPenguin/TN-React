// City filter in the header (components/ui/CityPicker.jsx). The first city is
// the default. Mockup: picking a city doesn't filter the page yet, and the
// `homes` counts are placeholders. `image` is a small square thumbnail.
const cityThumb = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=96&h=96&q=70`;

export const headerCities = [
  { name: 'Hyderabad', state: 'Telangana', homes: 6120, image: cityThumb('photo-1696941515998-d83f24967aca') }, // Charminar
  { name: 'Bengaluru', state: 'Karnataka', homes: 2960, image: cityThumb('photo-1565018054866-968e244671af') }, // Vidhana Soudha
];

export const mainNav = [
  { label: 'Buy', href: '#' },
  { label: 'Rent', href: '#' },
  { label: 'List', href: '#' }
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
