// Builder showcase (below Recently viewed). Placeholder data until it comes
// from an API: builder names, logos, figures and RERA numbers are made up.
// Every builder on TrueNest is invited and reviewed, so there's no
// "verified" flag. `logo` is an optional image URL; without one, the card
// shows the builder's initials on `color`.
// Key facts are optional: leave out any the builder hasn't provided.
//   yearsActive, projectsDelivered, ongoing, cities: []
// `projects[0]` is the one featured on the card; `images` are its photos
// (the first loads up front). Prices are in rupees.

const unsplash = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&h=506&q=70`;

export const buildersIntro = {
  eyebrow: 'Selected builders',
  title: 'Projects from builders we work with',
  sub: 'Every builder on TrueNest is invited and reviewed before joining.',
  link: { label: 'All builders', href: '#' },
};

export const builders = [
  {
    id: 'aranya',
    name: 'Aranya Developers',
    tagline: 'Gated villa communities since 1998',
    color: '#2F7D5A',
    yearsActive: 28, projectsDelivered: 34, ongoing: 4, cities: ['Hyderabad'],
    link: { href: '#' },
    contact: { href: '#' },
    projects: [{
      name: 'Green Meadows', locality: 'Kokapet, Hyderabad',
      priceMin: 32000000, priceMax: 65000000, unitTypes: '4 & 5 BHK villas', possession: 'Dec 2027', rera: 'P02400008811',
      images: [unsplash('photo-1580892138193-0781eef7caf2'), unsplash('photo-1582610191340-fa501e6e5040'), unsplash('photo-1723110994499-df46435aa4b3')],
    }],
  },
  {
    id: 'meridian',
    name: 'Meridian Homes',
    tagline: 'High-rise living near the IT corridor',
    color: '#1d3b53',
    yearsActive: 15, projectsDelivered: 12, ongoing: 3, cities: ['Hyderabad', 'Bengaluru'],
    link: { href: '#' },
    contact: { href: '#' },
    projects: [{
      name: 'Skyline Heights', locality: 'Madhapur, Hyderabad',
      priceMin: 9500000, priceMax: 21000000, unitTypes: '2, 3 & 4 BHK', possession: 'Ready to move', rera: 'P02400004567',
      images: [unsplash('photo-1663985139222-6af2f8646104'), unsplash('photo-1549499090-c9203d2b20ad')],
    }],
  },
  {
    // Newer builder: only some key facts provided.
    id: 'greenline',
    name: 'Greenline Builders',
    tagline: 'Thoughtful independent homes',
    color: '#b45309',
    ongoing: 2,
    link: { href: '#' },
    contact: { href: '#' },
    projects: [{
      name: 'Orchid Enclave', locality: 'Gachibowli, Hyderabad',
      priceMin: 14500000, priceMax: 24000000, unitTypes: '3 & 4 BHK houses', possession: 'Jun 2027', rera: 'P02400009102',
      images: [unsplash('photo-1626249893889-c044fd88e9f7'), unsplash('photo-1570129477492-45c003edd2be')],
    }],
  },
  {
    id: 'northstar',
    name: 'Northstar Habitats',
    tagline: 'Lakeside apartments, built to last',
    color: '#6b21a8',
    yearsActive: 9, projectsDelivered: 6, cities: ['Hyderabad'],
    link: { href: '#' },
    contact: { href: '#' },
    projects: [{
      name: 'Lake View Residences', locality: 'Kondapur, Hyderabad',
      priceMin: 8200000, priceMax: 15500000, unitTypes: '2 & 3 BHK', possession: 'Mar 2028', rera: 'P02400010455',
      images: [unsplash('photo-1549499090-c9203d2b20ad'), unsplash('photo-1663985139222-6af2f8646104'), unsplash('photo-1580892138193-0781eef7caf2')],
    }],
  },
];
