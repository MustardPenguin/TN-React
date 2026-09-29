// Local images in src/assets/images, looked up by filename.
// Vite gives each file a hashed URL with the site's base path (/TN-React/)
// applied, so references work on GitHub Pages and replaced files are never
// served stale. To add an image: drop it in the folder and use its filename.
const files = import.meta.glob('../assets/images/*', { eager: true, query: '?url', import: 'default' });

const urlsByName = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.split('/').pop(), url]),
);

/** URL for a file in src/assets/images, e.g. localImage('heroCity1.png'). */
export function localImage(name) {
  const url = urlsByName[name];
  if (!url) {
    throw new Error(`Unknown local image "${name}". Available: ${Object.keys(urlsByName).join(', ')}`);
  }
  return url;
}
