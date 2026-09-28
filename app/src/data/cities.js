const unsplash = (id, w) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

// Hyderabad areas for the "Browse homes by area" grid. Photos are from
// Unsplash Hyderabad searches and are representative, not necessarily of
// that exact locality. Home counts are placeholders.
// The first area with `featured: true` gets the large 2x2 tile.
export const cities = [
  { name: 'HITEC City', homes: 1240, featured: true, image: unsplash('photo-1730315661998-dadff57d7f8c', 1200), fallback: 'linear-gradient(135deg,#0e7c7b,#1d3b53)' },
  { name: 'Gachibowli', homes: 980, image: unsplash('photo-1601619933635-023753974a65', 800), fallback: 'linear-gradient(135deg,#f59e0b,#7c2d12)' },
  { name: 'Kokapet', homes: 610, image: unsplash('photo-1689574120966-c7b1e57a8cfe', 800), fallback: 'linear-gradient(135deg,#60a5fa,#1e3a8a)' },
  { name: 'Jubilee Hills', homes: 450, image: unsplash('photo-1707500923104-4548b53b4688', 800), fallback: 'linear-gradient(135deg,#f472b6,#831843)' },
  { name: 'Kondapur', homes: 870, image: unsplash('photo-1601915310204-67e97c4a16b7', 800), fallback: 'linear-gradient(135deg,#34d399,#064e3b)' },
];

export const popularSearches = ['Gachibowli', 'HITEC City', 'Kokapet', 'Jubilee Hills'];
