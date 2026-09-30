# TrueNest app

Landing page refactored from `../truenest-landing.html` (kept as the design reference).

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
```

## Structure

```
src/
  main.js              entry: global styles, mount, behaviour init
  App.js               page composition (data -> sections)
  lib/html.js          `html` tagged template (auto-escapes), `cx`, `mount`
  lib/format.js        price / number / background helpers
  lib/slideshow.js     DOM-free slideshow state + autoplay timer (-> `useSlideshow` hook in React)
  lib/typewriter.js    DOM-free type/hold/delete loop (-> `useTypewriter` hook in React)
  lib/images.js        `localImage('name.png')` -> URL for a file in assets/images
  assets/images/       local images (hashed + base-path aware via Vite; prefer over public/)
  data/                content as plain data (swap for API calls later)
  styles/              tokens.css (CSS variables), base.css (reset + shared .btn, .container, …)
  components/
    ui/                reusable pieces: Icon, Logo, SectionHead, ListingCard, PathCard, CityCard, TestimonialCard, SlideControls
    layout/            Header, Footer
    sections/          Hero, Paths, FeaturedListings, ListYourProperty, Stats, Cities, Testimonials, CtaBanner
```

## Conventions

- A component is a pure function `props -> html` in `Name.js`, with its styles in `Name.css`
  next to it, imported by the component. Responsive rules live in that same CSS file.
- Content never lives in components; it's passed in as props from `data/`.
- This is a mockup: UI is static unless a feature has been explicitly asked for.
  Current behaviour: the hero background slideshow + rotating headlines, and search
  suggestions typed into the search placeholder (`initHero`).
- Behaviour is kept out of markup: a section that needs JS exports an `initX(root)`
  function (see `initHero`), which `main.js` calls after mounting. It returns a
  cleanup function (-> a `useEffect` cleanup in React).
- State logic that isn't tied to the DOM lives in `lib/` (e.g. `createSlideshow`), so it
  can be reused and later wrapped as a hook.
- Class names match the original HTML, so the CSS carried over unchanged.

## Moving to React

Each component maps 1:1 to a React component: rename to `.jsx`, turn the `html` template
into JSX (`class` -> `className`, `style` strings -> objects), and replace `initX` with
event handlers/state. Data, CSS, and tokens carry over as-is. Vite supports this directly
via `@vitejs/plugin-react`.

## Deploying

Deployed to GitHub Pages at https://mustardpenguin.github.io/TN-React/ by
`.github/workflows/deploy.yml` (repo root): every push to `main` runs `npm ci` + `npm run build`
in `app/` and publishes `app/dist`. It can also be run manually from the Actions tab.

- `vite.config.js` sets `base: '/TN-React/'` for build/preview, because Pages serves the site
  under the repo name. Update it if the repo is renamed; reset to `'/'` for a custom domain or
  another host.
- `npm run build && npm run preview` serves the production build locally at
  http://localhost:4173/TN-React/.
- One-time setup: repo **Settings → Pages → Source: GitHub Actions**.

Node 20 is pinned via `.nvmrc` / `engines`. The site is a private mockup shared by link, so
`index.html` sets `noindex, nofollow` to keep it out of search engines. That hides it from
search engines but isn't access control: anyone with the URL can open it.
