# storieviola.it

This repository contains the BMAD planning/implementation artifacts and the Astro website application for `storieviola.it`.

## What has been done with BMAD

BMAD has already been used to drive the project from discovery to implementation planning and story execution:

- Product planning artifacts created in `_bmad-output/planning-artifacts/`:
  - `product-brief-storieviola.it-2026-03-14.md`
  - `prd.md`
  - `architecture.md`
  - `ux-design-specification.md`
  - `epics.md`
  - implementation readiness and sprint change reports
- Implementation stories tracked in `_bmad-output/implementation-artifacts/` (for example:
  - project bootstrap (Astro + Tailwind)
  - content collections and site pages/components
  - SEO and analytics
  - accessibility/testing/performance stories
  - follow-up adjustments in sprint stories `6.1`, `6.2`, `6.3`)
- BMAD framework and workflows live in `_bmad/`.

## Project setup

This is a mono-repo style structure where the actual website code is in the `storieviola-it/` subfolder.

### Repository structure

- `_bmad/`: BMAD module, workflows, and agent definitions
- `_bmad-output/`: generated planning and implementation artifacts
- `docs/`: additional project documentation
- `design-artifacts/`: design files and supporting assets
- `storieviola-it/`: Astro application source code

### Run the website locally

Requirements:

- Node.js `>= 22.12.0`
- npm

Commands:

```bash
cd storieviola-it
npm install
npm run dev
```

The dev server runs on Astro's default local port (usually `http://localhost:4321`).

### Build and test

From `storieviola-it/`:

```bash
npm run build
npm run test:unit
npm run test:e2e
```

Or run the full test suite:

```bash
npm run test
```
