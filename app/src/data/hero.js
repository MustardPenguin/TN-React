import { localImage } from '../lib/images.js';

// Background images for the hero slideshow. `image` is any URL, so slides can
// mix sources:
//   localImage('heroCity1.png')     a file in src/assets/images
//   unsplash('photo-1600596542815-ffad4c1539a9')   an Unsplash photo id
//   'https://…'                     any other full URL
const unsplash = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2000&q=80`;

export const heroSlides = [
  { image: localImage('heroCity1.png') },
  { image: localImage('heroCity2.jpeg') },
  { image: localImage('heroCity3.jpeg') },
  { image: localImage('heroCity4.jpg') },
  { image: localImage('heroHouse1.png') },
];

/** Time each image stays on screen, in ms. */
export const heroSlideInterval = 6000;

// Headline + subheading shown over the slideshow. `title` lines are joined
// with line breaks. If there's one per slide they're paired with the slides
// in order; otherwise they rotate on every image change (see Hero.js).
// Entries after the first are placeholder copy — replace before launch.
export const heroHeadlines = [
  {
    // title: ['Buy your home in Hyderabad.', 'Without the fear.'],
    // sub: "Every home walked, every document checked, before it reaches you. Because buying from abroad shouldn't mean buying blind.",
    title: ['Every home walked,', 'every document checked,', 'before it reaches you.'],
    sub: "The only property platform that checks before it lists."
  },
  // {
  //   title: ['The only property platform that checks before it lists.'],
  //   sub: 'Ownership records, court cases, RERA status, encumbrance - verified and scored before you see a single listing. No surprises. No middlemen. Just truth.',
  // },
  {
    title: ['Your roots are calling.', "We make sure it's safe to answer."],
    sub: "NRI-grade verification on every property. Five pullars of trust, one score, zero guesswork. So when you're ready to come home - everything is ready for you.",
  },
  {
    title: ['Elite, curated platform — we are not a listing aggregator; every builder and every property on TrueNest is selectively onboarded'],
    sub: "The platform is open to individuals, builders, and realtors to list their properties — all under the same verification standard, so every listing on TrueNest is one a buyer can trust.",
  },
  {
    title: ["Real property.", "Real checks.", "Real trust."],
    sub: "Every listing verified. Every document checked. Every boundary walked. TrueNest — because your home deserves certainty."
  },
  {
    title: ['Explore 104 properties,', 'all 100% verified by us.'],
    sub: "We verify titles, check court encumbrances, confirm RERA registration, and physically inspect every property — because this isn't just an investment. It's home."
  },
  // {
  //   title: ['Your dream home in Hyderabad.', 'Verified, shortlisted, yours.'],
  //   sub: "We do the hard part — title checks, court searches, encumbrance records, physical inspection. You do the easy part — choose."
  // },
  // {
  //   title: ["India's first verification-first property platform."],
  //   sub: "Not just listings. Every property on TrueNest is scored across 5 independent pillars — Ownership, Legal, RERA, Encumbrance, and Physical Inspection. Transparency you can read. Trust you can feel."
  // },
  // {
  //   title: ['Built by NRIs.', 'Built for NRIs.'],
  //   sub: 'We know what it feels like to send money home without knowing if the land is real. TrueNest was built so that never happens to anyone again.',
  // },
  // {
  //   title: ['Hyderabad is booming.', "Don't buy in blind."],
  //   sub: 'Property prices in HITEC City and Gachibowli are rising fast. TrueNest makes sure your investment is verified before the opportunity passes — not after.',
  // },
  // {
  //   title: ['Real property.', 'Real checks.', 'Real trust.'],
  //   sub: 'Every listing verified. Every document checked. Every boundary walked. TrueNest — because your home deserves certainty.',
  // },
  // {
  //   title: ["The home you're buying is for your family.", 'We treat it that way.'],
  //   sub: "We verify titles, check court encumbrances, confirm RERA registration, and physically inspect every property — because this isn't just an investment. It's home.",
  // },
  // {
  //   title: ['We check the property.', 'You make the decision.'],
  //   sub: 'Ownership records verified. Legal disputes checked. RERA confirmed. Physical boundaries inspected. Your job is to pick the one you love.',
  // },

];
