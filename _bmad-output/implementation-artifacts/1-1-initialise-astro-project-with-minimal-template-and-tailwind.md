# Story 1.1: Initialise Astro project with minimal template and Tailwind

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **creator/developer**,
I want **a runnable Astro project with Tailwind**,
so that **I can build the site locally and add content and components**.

## Acceptance Criteria

1. **Given** a new or existing repo at project root, **when** I run `npm create astro@latest . -- --template minimal --install --no-git` and then `npx astro add tailwind`, **then** the project builds with `npm run build`, runs with `npm run dev`, and Tailwind is configured (e.g. `tailwind.config.mjs` or `tailwind.config.cjs`). **And** the project structure includes `src/pages/`, `src/layouts/`, `src/components/`, `public/` and no unnecessary blog/theme assumptions.

## Tasks / Subtasks

- [x] Run Astro create in current directory (AC: #1)
  - [x] Use `npm create astro@latest . -- --template minimal --install --no-git` (use `.` for existing repo at project root)
  - [x] If creating in a new folder instead, use folder name: `npm create astro@latest storieviola-it -- --template minimal --install --no-git`
- [x] Add Tailwind integration (AC: #1)
  - [x] Run `npx astro add tailwind` and accept defaults
  - [x] If peer dependency errors occur (e.g. Astro 5.2+ vs Tailwind 4), try `npm install --legacy-peer-deps` or follow current Astro docs for Tailwind
- [x] Verify build and dev (AC: #1)
  - [x] `npm run build` succeeds
  - [x] `npm run dev` starts dev server (e.g. localhost:4321)
- [x] Confirm project structure (AC: #1)
  - [x] Ensure `src/pages/`, `src/layouts/`, `src/components/`, `public/` exist
  - [x] Remove or avoid any blog/theme boilerplate if the minimal template adds any; minimal should be clean

## Dev Notes

- This is the **first implementation story** (greenfield). No prior code in repo; only BMAD planning artifacts and config exist.
- **Scope:** Initialise project only. Do **not** add Content Collections, episode schema, layouts, or deploy yet (Stories 1.2 and 1.3).
- **Testing:** Vitest and Playwright are mandatory per architecture but are added in a later story (Epic 5, Story 5.3). This story does not require adding test frameworks.

### Technical Requirements

- **Stack:** Astro (latest stable) + Tailwind. Use official Astro Tailwind integration (`npx astro add tailwind`).
- **Template:** `minimal` only. Do not use blog, docs, or other templates.
- **Package manager:** npm (per architecture; `--install` in create command).
- **Git:** Use `--no-git` when running create in an existing repo so Astro does not re-init or overwrite `.gitignore`; preserve existing repo and `.gitignore`.

### Architecture Compliance

- [Source: architecture.md] **Starter:** Astro minimal template + Tailwind. Initialization commands as above.
- [Source: architecture.md] **Structure:** `src/pages/`, `src/layouts/`, `src/components/`, `public/`. Config at repo root: `astro.config.mjs`, `tailwind.config.mjs` (or `.cjs` per Astro add tailwind output).
- [Source: architecture.md] **Code organization:** One component per file later; this story only ensures directories exist. No content collections or schema in this story.

### Library / Framework Requirements

- **Astro:** Use `create astro@latest` for current stable. Minimal template gives a single `src/pages/index.astro` and minimal deps.
- **Tailwind:** Added via `npx astro add tailwind`. Config file may be `tailwind.config.mjs` or `tailwind.config.cjs` depending on Astro version; both are valid. Do not add a second CSS framework.

### File Structure Requirements

- **Must exist after this story:** `src/pages/` (with at least `index.astro`), `src/layouts/`, `src/components/`, `public/`. `src/content/` is created in Story 1.2.
- **Root:** `package.json`, `astro.config.mjs`, `tailwind.config.*`, `tsconfig.json`, `.gitignore` (keep existing if present). Do not remove `_bmad-output/` or BMAD config.

### Testing Requirements

- No test framework setup in this story. E2E and unit tests are added in Epic 5 (Story 5.3). This story is complete when `npm run build` and `npm run dev` succeed and structure matches architecture.

### Latest Tech Information

- **Astro create:** `npm create astro@latest . -- --template minimal --install --no-git` (existing repo) or with a project name for new folder. Double dash `--` is required before template flags. If the tool creates in a generated subfolder (e.g. because `.` is not empty), moving the project to repo root is acceptable; end result is the same. **Subfolder option:** If you prefer to keep the site source in a subfolder (e.g. `storieviola-it/`), GitHub Pages still works: use `withastro/action` with `path: ./storieviola-it` in the workflow (Story 1.3) and set `base` in `astro.config.mjs` if the site is not at repo root.
- **Tailwind add:** `npx astro add tailwind` installs `@astrojs/tailwind` and Tailwind config. If you see peer dependency conflicts (e.g. Astro 5.2+ and Tailwind 4), use `npm install --legacy-peer-deps` or check [Astro integration guide](https://docs.astro.build/en/guides/integrations-guide/tailwind) for current approach.
- **Commands:** `npm run dev` (dev server), `npm run build` (production build to `dist/`), `npm run preview` (preview build locally).

### Project Context Reference

- No `project-context.md` found. Follow architecture.md and this story only.
- **Project:** storieviola.it — static site for Storie Viola podcast (episode list, about, Spotify links). GitHub Pages deploy later; this story is project bootstrap only.

## Dev Agent Record

### Agent Model Used

(Set by dev agent)

### Debug Log References

### Completion Notes List

- Astro 6.0.5 minimal template created; project moved to repo root from create-astro subfolder (tool created `red-resonance` because `.` was not empty). npm install run at root; `npx astro add tailwind --yes` added Tailwind (Tailwind v4 via @tailwindcss/vite; no separate tailwind.config file—config in astro.config.mjs and src/styles/global.css). Import of `../styles/global.css` added in src/pages/index.astro so Tailwind is active. `npm run build` and `npm run dev` (localhost:4321) verified. Structure: src/pages/, src/layouts/, src/components/, public/, src/styles/; package name set to storieviola-it. No tests added (per story scope; Epic 5 adds test frameworks).

### File List

- package.json (added/updated at root; name storieviola-it)
- package-lock.json (added at root)
- astro.config.mjs (added at root; Tailwind Vite plugin)
- tsconfig.json (added at root)
- src/pages/index.astro (added; global.css import)
- src/styles/global.css (added by astro add tailwind)
- src/layouts/ (directory created, empty)
- src/components/ (directory created, empty)
- public/favicon.svg (added by minimal template; no favicon.ico specified)
- src/layouts/.gitkeep, src/components/.gitkeep (added to track empty dirs in git)
- README.md (added at root by template)
