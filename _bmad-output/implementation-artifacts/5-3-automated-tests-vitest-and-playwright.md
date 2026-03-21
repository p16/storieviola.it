# Story 5.3: Automated tests (Vitest and Playwright)

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **developer/maintainer**,
I want **unit and E2E tests that guard schema, key flows and basic a11y**,
so that **changes don't break the episode list, filter, about page or Listen on Spotify flow**.

## Acceptance Criteria

1. **Given** the codebase after Epics 1–4 (and 5.1–5.2 as applicable), **when** the test suite runs, **then** **Vitest** runs unit/component tests for content schema and helpers (and optional component tests) in `tests/unit/` or `src/**/*.test.ts`.
2. **And** **Playwright** runs E2E tests in `tests/e2e/` covering: **homepage loads**, **tag filter behaviour**, **about page**, **“Listen on Spotify” flow**, and **basic accessibility checks**.
3. **And** tests are **mandatory** per Architecture; **CI** can run both suites (extend `.github/workflows/deploy.yml` or add a dedicated workflow). NFR-P1, NFR-P2, NFR-S1 supported by tests and implementation.

## Tasks / Subtasks

- [ ] Add **Vitest** + Astro/Vite integration (`vitest`, `@vitest/coverage-v8` optional); script `npm test` or `npm run test:unit` (AC: #1)
- [ ] Write unit tests for `src/content/config.ts` schema assumptions and **helpers** under `src/lib/` (e.g. `getUniqueTags`, `sortEpisodes`, `site`) — at least one test file that fails if schema export breaks (AC: #1)
- [ ] Add **Playwright** (`@playwright/test`); script `npm run test:e2e`; `playwright.config` with `baseURL` for local `astro preview` or `dev` (AC: #2)
- [ ] E2E: visit `/` — title/heading present; tag filter changes visible episode count or visibility; visit `/about` — main content; click through to a Spotify URL pattern (`open.spotify.com` or configured show URL) in new tab or href check (AC: #2)
- [ ] E2E: run **axe-core** or Playwright accessibility assertions on home + about (basic a11y) (AC: #2)
- [ ] Wire **GitHub Actions**: install deps in `storieviola-it`, run `npm run build`, `npm run test` (unit), `npx playwright install --with-deps` + `npm run test:e2e` on PR/push (AC: #3)
- [ ] Document commands in `storieviola-it/README.md` (AC: #3)

## Dev Notes

### Epic context

Architecture explicitly mandates **Vitest + Playwright** [Source: `architecture.md` — Starter Template Evaluation, Enforcement Guidelines]. This story **introduces** the harness; there is **no** `tests/` folder yet in the app.

### Architecture compliance

- Paths: `storieviola-it/tests/unit/`, `storieviola-it/tests/e2e/` per architecture tree [Source: `architecture.md` — Project Structure]
- Cover: content schema, helpers, homepage, tag filter, about, Listen on Spotify, **basic a11y**
- Node: `engines.node >=22.12.0` in `package.json` — align CI `node-version` with that

### Technical requirements

- **Vitest** uses Vite config from Astro — use `vitest.config` or merge in `astro.config` / dedicated `vitest.config.ts` referencing `storieviola-it` as root
- **Playwright:** Prefer `webServer` in config to run `npm run preview` after build, or `astro dev` for faster iteration — CI should `build` then `preview` for stable E2E
- **Spotify:** Tests should not require network if possible — assert `href` matches expected pattern; optional `request` stub
- Keep tests **fast** — smoke-level E2E, not full visual regression

### File structure (new / touched)

| Area | Path |
|------|------|
| Unit tests | `storieviola-it/tests/unit/*.test.ts` or `storieviola-it/src/lib/*.test.ts` |
| E2E | `storieviola-it/tests/e2e/*.spec.ts` |
| Config | `storieviola-it/vitest.config.ts`, `storieviola-it/playwright.config.ts` |
| Package | `storieviola-it/package.json` scripts + devDependencies |
| CI | `.github/workflows/deploy.yml` (add test job) or `.github/workflows/test.yml` |

### Testing requirements

- This story **is** the testing story — completion = green unit + e2e locally and in CI.

### Previous story intelligence

- **5.1–5.2** stabilize UI/a11y — E2E selectors should use **roles**, **labels**, stable `data-*` only if necessary (prefer accessible queries).

### Git intelligence summary

- Deploy workflow uses `withastro/action` with `path: ./storieviola-it` — test steps should `working-directory: storieviola-it` or `cd storieviola-it`

### Latest technical notes

- Astro 6 + current Vitest / Playwright (pin compatible versions for Node ≥22.12); run `npm install` in app root

### Project context reference

- None; use `architecture.md` test section as source of truth.

## Dev Agent Record

### Agent Model Used

_(filled by dev agent)_

### Debug Log References

### Completion Notes List

### File List
