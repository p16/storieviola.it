# storieviola.it - Web App

This folder contains the Astro application for `storieviola.it`.

For BMAD planning and implementation artifacts, see the repository root `README.md` and the `_bmad-output/` folder.

## Tech stack

- Astro 6
- Tailwind CSS 4
- Vitest (unit tests)
- Playwright + axe-core (E2E and accessibility checks)

## Requirements

- Node.js `>= 24.0.0`
- npm

## Local development

Run commands from this folder (`storieviola-it/`):

```bash
npm install
npm run dev
```

Astro starts a local server, usually at `http://localhost:4321`.

## Scripts

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Start local development server |
| `npm run build` | Build production output |
| `npm run preview` | Preview production build locally |
| `npm run astro -- --help` | Show Astro CLI help |
| `npm run validate:about` | Build and validate about content |
| `npm run test:unit` | Run Vitest unit tests |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run test` | Run full test suite (`unit + e2e`) |

## Application structure

```text
storieviola-it/
├── public/                # Static assets
├── src/
│   ├── components/        # UI components
│   ├── content/           # Content collections (episodes/about)
│   ├── layouts/           # Page layouts
│   ├── lib/               # Utilities and helpers
│   └── pages/             # Routes (home, about, etc.)
├── tests/
│   ├── unit/              # Unit tests
│   └── e2e/               # End-to-end tests
└── package.json
```
