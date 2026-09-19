# Cookie-Docs

Documentation site for Cookie, an AI-assisted mail and productivity suite. It
describes the system as a whole: architecture, the components that make it up,
the data model, AI features, and operations.

Published at <https://allistera.github.io/Cookie-Docs/>.

## What is here

- `docs/` holds the content as MDX, one file per page, with `meta.ts` files
  controlling section order. Numbered filenames set the sidebar order.
- `diagrams/` holds the interactive architecture and workflow diagram sources.
  Their rendered HTML is served from `public/diagrams/`.
- `blume.config.ts` configures the site title and the GitHub Pages base path.

The site documents the system but owns no runtime or user data. Each component
repository carries its own `README.md` with the exact commands and configuration
for that component.

## Working on the site

Requires Node.js 22 or newer.

```sh
npm ci          # install dependencies
npm run dev     # local preview with live reload
npm run build   # production build into dist/
npm run doctor  # check the content and configuration for problems
```

Formatting is enforced with Prettier. `npm run format` fixes files and
`npm run format:check` is what CI runs. MDX pages and diagram sources are
deliberately excluded from Prettier; see `.prettierignore` for why.

## Deployment

Every push to `main` runs the GitHub Actions workflow in
`.github/workflows/deploy.yml`, which checks formatting, builds the site, and
publishes it to GitHub Pages.
