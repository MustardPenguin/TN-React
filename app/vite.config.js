import { defineConfig } from 'vite';

// GitHub Pages serves this repo at https://mustardpenguin.github.io/TN-React/,
// so production asset URLs need that prefix (`build`, and `preview` so it
// mirrors production). Dev keeps serving from `/`.
// If the repo is renamed or a custom domain is added, update (or reset to '/').
export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? '/TN-React/' : '/',
}));
