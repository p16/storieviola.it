# Story 1.3: Configure GitHub Actions and GitHub Pages deployment

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **creator**,
I want **the site to deploy to GitHub Pages on push**,
so that **content changes go live without manual deploy steps**.

## Acceptance Criteria

1. **Given** the Astro project and content schema from 1.1–1.2, with all implementation code under `storieviola-it/`, **when** I add a GitHub Actions workflow (e.g. `.github/workflows/deploy.yml`) using `withastro/action` configured with `path: ./storieviola-it`, **and** set `site` and `base` in `storieviola-it/astro.config.mjs` for the target URL (e.g. storieviola.it or github.io), **then** pushing to the configured branch triggers build and publish to GitHub Pages.
2. **And** the live site is reachable at the configured URL (NFR-R1).

## Tasks / Subtasks

- [ ] Add GitHub Actions workflow (AC: #1)
  - [ ] Create `.github/workflows/deploy.yml` at repository root (not under `storieviola-it/`)
  - [ ] Use `withastro/action` (e.g. v5 or latest stable) with `path: ./storieviola-it` so the action runs build from the app subfolder
  - [ ] Configure trigger (e.g. push to `main` or chosen branch) per project needs
  - [ ] Ensure workflow has permission to push to GitHub Pages (e.g. `contents: read`, `pages: write`)
- [ ] Configure Astro for GitHub Pages (AC: #1, #2)
  - [ ] Set `site` in `storieviola-it/astro.config.mjs` to the full production URL (e.g. `https://storieviola.it` or `https://<user>.github.io/<repo>`)
  - [ ] Set `base` in `storieviola-it/astro.config.mjs`: use `'/'` for custom domain (storieviola.it) or `'/repo-name/'` for github.io project pages
  - [ ] Verify local `npm run build` and `npm run preview` still work with the chosen `site`/`base`
- [ ] Verify deploy and reachability (AC: #2)
  - [ ] Push to the configured branch and confirm workflow runs and deploys to GitHub Pages
  - [ ] Confirm the live site is reachable at the configured URL (NFR-R1)

## Dev Notes

- **Epic context:** Epic 1 is Project foundation and deploy (FR8, FR9, FR17). This story completes the push → build → deploy pipeline so content changes go live automatically.
- **Scope:** Workflow file and Astro `site`/`base` only. Do **not** add layout, Header, Hero, episode list UI, SEO meta, or analytics (later epics). Do **not** add Vitest/Playwright in this story (Epic 5).
- **App root:** All Astro app code lives under `storieviola-it/`; the workflow runs the action with `path: ./storieviola-it` (see Previous Story Intelligence).

### Technical Requirements

- **Workflow location:** `.github/workflows/deploy.yml` at the **repository root** (parent of `storieviola-it/`). The action’s `path` input points to the Astro app: `path: ./storieviola-it`.
- **withastro/action:** Use a stable version (e.g. `withastro/action@v5` or current recommended in [Astro deploy guide](https://docs.astro.build/en/guides/deploy/github)). The action checks out the repo, runs build in the given `path`, and deploys to GitHub Pages.
- **Astro config:** In `storieviola-it/astro.config.mjs` add `site` (full origin URL) and `base` (path prefix). For custom domain (storieviola.it): `site: 'https://storieviola.it'`, `base: '/'`. For GitHub Pages project site: `site: 'https://<owner>.github.io'`, `base: '/<repo>/'`.
- **Permissions:** Workflow needs `contents: read` and `pages: write` (and `id-token: write` if the action uses OIDC). Follow Astro docs or action README for exact `permissions` block.

### Architecture Compliance

- [Source: architecture.md] **Infrastructure & Deployment:** Hosting on GitHub Pages; CI/CD via GitHub Actions using `withastro/action`; build on push (e.g. main); deploy to GitHub Pages.
- [Source: architecture.md] **Environment:** `site` and `base` in `astro.config.mjs` for correct asset and canonical URLs (e.g. `https://storieviola.it` or `https://<user>.github.io/<repo>`).
- [Source: architecture.md] **Project structure:** `.github/workflows/deploy.yml` — Astro GitHub Pages action with `path: ./storieviola-it`. Config at app root: `storieviola-it/astro.config.mjs`.

### Library / Framework Requirements

- **withastro/action:** Use the version recommended in [Deploy your Astro Site to GitHub Pages](https://docs.astro.build/en/guides/deploy/github). The action handles checkout, build, and deploy; `path` must be `./storieviola-it` so it builds the app in the subfolder.
- **Astro:** Add `site` and `base` to the existing `defineConfig({ ... })` in `astro.config.mjs`; do not remove existing `vite`/Tailwind config.

### File Structure Requirements

- **Must create:** `.github/workflows/deploy.yml` (at repo root). **Must modify:** `storieviola-it/astro.config.mjs` (add `site` and `base`).
- **Do not create:** Workflow under `storieviola-it/`; the workflow lives at repo root so GitHub Actions can find it. Do not add layout, components, or test frameworks in this story.

### Testing Requirements

- No test framework or test files in this story. Validation is manual: push to the configured branch, confirm workflow runs, and confirm the site is reachable at the configured URL (NFR-R1). Epic 5 adds Vitest/Playwright.

### Previous Story Intelligence

- **Story 1.1** established the Astro app under **`storieviola-it/`** at repo root; **Story 1.2** added content collections and schema there. All app code and config are under `storieviola-it/`; Story 1.3 uses **`path: ./storieviola-it`** in the GitHub Action so the action builds that folder.
- **Files/structure:** `storieviola-it/astro.config.mjs` exists and currently has Vite/Tailwind config only — no `site` or `base` yet. No `.github/workflows/` exists yet; this story creates it.
- **Convention:** Repo root contains `_bmad-output/`, `storieviola-it/`, and (after this story) `.github/workflows/deploy.yml`. Do not put the workflow inside `storieviola-it/`.

### Latest Tech Information

- **withastro/action:** Accepts `path` to specify the Astro project root in the repo (defaults to repo root). Use `path: ./storieviola-it` for a subfolder app. Use a pinned version (e.g. `@v5`) for reproducible deploys. See [withastro/action](https://github.com/withastro/action) and [Astro GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github).
- **site and base:** `site` = full origin (e.g. `https://storieviola.it` or `https://user.github.io`). `base` = path prefix: `'/'` for custom domain, `'/repo-name/'` for github.io project pages. Both are required for correct asset URLs and canonical links on GitHub Pages.

### Project Context Reference

- No `project-context.md` in repo. Follow architecture.md and epics.md.
- **Project:** storieviola.it — static site for Storie Viola podcast. Content as files under `storieviola-it/`; this story adds push → GitHub Pages deploy so the live site is reachable (FR8, NFR-R1).

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List
