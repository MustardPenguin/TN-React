// Local images in src/assets/images (including subfolders), looked up by their
// path inside that folder: 'heroCity1.png', 'pathCard/buy.png'.
// Vite gives each file a hashed URL with the site's base path (/TN-React/)
// applied, so references work on GitHub Pages and replaced files are never
// served stale. To add an image: drop it in the folder and use its path.
const ROOT = '../assets/images/';
const files = import.meta.glob('../assets/images/**/*', { eager: true, query: '?url', import: 'default' });

const urlsByName = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.slice(ROOT.length), url]),
);

/** URL for a file in src/assets/images, e.g. localImage('heroCity1.png') or localImage('pathCard/buy.png'). */
export function localImage(name) {
  const url = urlsByName[name];
  if (!url) {
    throw new Error(`Unknown local image "${name}". Available: ${Object.keys(urlsByName).join(', ')}`);
  }
  return url;
}
