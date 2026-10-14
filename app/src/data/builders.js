// Builder showcase (below Recently viewed). Placeholder data until it comes
// from an API: builder names, logos, projects, figures and RERA numbers are
// made up. Every builder on TrueNest is invited and reviewed, so there's no
// "verified" flag. `logo` is an optional image URL; without one, the card
// shows the builder's initials on `color`.
// Key facts are optional: leave out any the builder hasn't provided.
//   yearsActive, projectsDelivered, ongoing, cities: []
// `projects` is the builder's portfolio: each is one slide on the card, in
// order (current projects first). Per project, everything except `name` and
// `image` is optional:
//   name, locality, image, priceMin/priceMax (rupees), soldOut,
//   unitTypes, possession, rera

const unsplash = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&h=640&q=70`;
const PHOTO = {
  villaCommunity: unsplash('photo-1580892138193-0781eef7caf2'),
  villaPool: unsplash('photo-1582610191340-fa501e6e5040'),
  houseModern: unsplash('photo-1723110994499-df46435aa4b3'),
  tower: unsplash('photo-1663985139222-6af2f8646104'),
  apartments: unsplash('photo-1549499090-c9203d2b20ad'),
  houseRender: unsplash('photo-1626249893889-c044fd88e9f7'),
  houseGarden: unsplash('photo-1570129477492-45c003edd2be'),
  indianHouse: unsplash('photo-1688653802629-5360086bf632'),
  brightInterior: unsplash('photo-1713192704825-74a0017f585d'),
};

/** Time each project stays on screen in the focused card, in ms. */
export const builderSlideInterval = 15000;

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
    projects: [
      { name: 'Green Meadows', locality: 'Kokapet, Hyderabad', image: PHOTO.villaCommunity, priceMin: 32000000, priceMax: 65000000, unitTypes: '4 & 5 BHK villas', possession: 'Dec 2027', rera: 'P02400008811' },
      { name: 'Palm Grove Villas', locality: 'Tellapur, Hyderabad', image: PHOTO.villaPool, priceMin: 28000000, priceMax: 41000000, unitTypes: '4 BHK villas', possession: 'Ready to move', rera: 'P02400006120' },
      { name: 'Aranya Woods', locality: 'Shamshabad, Hyderabad', image: PHOTO.houseGarden, soldOut: true, unitTypes: '3 & 4 BHK villas', possession: 'Completed 2021' },
      { name: 'Lakeside Estate', locality: 'Gandipet, Hyderabad', image: PHOTO.indianHouse, soldOut: true, unitTypes: 'Villa plots', possession: 'Completed 2017' },
    ],
  },
  {
    id: 'meridian',
    name: 'Meridian Homes',
    tagline: 'High-rise living near the IT corridor',
    color: '#1d3b53',
    yearsActive: 15, projectsDelivered: 12, ongoing: 3, cities: ['Hyderabad', 'Bengaluru'],
    link: { href: '#' },
    contact: { href: '#' },
    projects: [
      { name: 'Skyline Heights', locality: 'Madhapur, Hyderabad', image: PHOTO.tower, priceMin: 9500000, priceMax: 21000000, unitTypes: '2, 3 & 4 BHK', possession: 'Ready to move', rera: 'P02400004567' },
      { name: 'Meridian One', locality: 'Whitefield, Bengaluru', image: PHOTO.apartments, priceMin: 11000000, priceMax: 24000000, unitTypes: '2 & 3 BHK', possession: 'Mar 2028', rera: 'PRM/KA/RERA/1251/446/PR/240117' },
      { name: 'The Crest', locality: 'Kondapur, Hyderabad', image: PHOTO.brightInterior, soldOut: true, unitTypes: '3 BHK', possession: 'Completed 2022' },
    ],
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
    projects: [
      { name: 'Orchid Enclave', locality: 'Gachibowli, Hyderabad', image: PHOTO.houseRender, priceMin: 14500000, priceMax: 24000000, unitTypes: '3 & 4 BHK houses', possession: 'Jun 2027', rera: 'P02400009102' },
      { name: 'Greenline Courtyard', locality: 'Kollur, Hyderabad', image: PHOTO.houseModern, priceMin: 12000000, priceMax: 16500000, unitTypes: '3 BHK houses', possession: 'Jan 2028', rera: 'P02400010877' },
    ],
  },
  {
    id: 'northstar',
    name: 'Northstar Habitats',
    tagline: 'Lakeside apartments, built to last',
    color: '#6b21a8',
    yearsActive: 9, projectsDelivered: 6, cities: ['Hyderabad'],
    link: { href: '#' },
    contact: { href: '#' },
    projects: [
      { name: 'Lake View Residences', locality: 'Kondapur, Hyderabad', image: PHOTO.apartments, priceMin: 8200000, priceMax: 15500000, unitTypes: '2 & 3 BHK', possession: 'Mar 2028', rera: 'P02400010455' },
      { name: 'Northstar Bay', locality: 'Puppalaguda, Hyderabad', image: PHOTO.tower, priceMin: 7400000, priceMax: 12800000, unitTypes: '2 & 3 BHK', possession: 'Ready to move', rera: 'P02400007731' },
      { name: 'Harbour Point', locality: 'Nanakramguda, Hyderabad', image: PHOTO.brightInterior, soldOut: true, unitTypes: '2 BHK', possession: 'Completed 2020' },
    ],
  },
];
