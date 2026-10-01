# TrueNest app

React 19 + Vite landing page, originally refactored from `../truenest-landing.html` (kept as
the design reference).

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
```

## Structure

```
src/
  main.jsx             entry: global styles, createRoot
  App.jsx              page composition: the only place data comes in (src/data -> props)
  data/                content as plain data; its shapes are the contract for future APIs
  hooks/               useSlideshow, useTypewriter, useMediaQuery / useDocumentVisible
  lib/slideshow.js     framework-free slideshow timer (wrapped by useSlideshow)
  lib/typewriter.js    framework-free type/hold/delete loop (wrapped by useTypewriter)
  lib/format.js        price / number / background-style helpers
  lib/images.js        `localImage('name.png')` -> URL for a file in assets/images
  lib/cx.js            `cx('a', cond && 'b')` class-name joiner
  assets/images/       local images (hashed + base-path aware via Vite; prefer over public/)
  styles/              tokens.css (CSS variables), base.css (reset + shared .btn, .container, …)
  components/
    ui/                reusable pieces: Icon, Illustration, Svg, Logo, SectionHead, ListingCard,
                       PathCard, CityCard, TestimonialCard, SlideControls
    layout/            Header, Footer
    sections/          Hero, Verification, Paths, FeaturedListings, ListYourProperty, Stats,
                       Cities, Testimonials, CtaBanner
```

## Conventions

- Components are stateless where possible: data in via props, markup out, no fetching inside.
  `App.jsx` passes everything down, so replacing `src/data/` with API calls only changes that
  level, as long as the API returns the same shapes (e.g. a listing in `data/listings.js`).
- Each component lives in `Name.jsx` with its styles in `Name.css` next to it, imported by the
  component. Responsive rules live in that same CSS file. Plain CSS with global class names.
- Local UI state (hover, open step, slideshow position) lives in the section that owns it
  (Hero, Verification); timing logic lives in `lib/` and is used through hooks.
- Icons and illustrations are static SVG strings rendered by `<Svg>`; never pass user content
  to it.
- This is a mockup: UI is static unless a feature has been explicitly asked for.
  Current behaviour: hero slideshow + rotating headlines, typed search suggestions, the
  sliding page sheet over the pinned hero, and the expandable verification steps.

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

Node 24 is pinned via `.nvmrc` (used locally by nvm and by the deploy workflow); `engines`
requires at least 22.12, Vite 8's minimum. The site is a private mockup shared by link, so
`index.html` sets `noindex, nofollow` to keep it out of search engines. That hides it from
search engines but isn't access control: anyone with the URL can open it.
