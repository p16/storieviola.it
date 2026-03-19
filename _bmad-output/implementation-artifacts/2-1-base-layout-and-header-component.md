# Story 2.1: Base layout and Header component

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **visitor**,
I want **a consistent layout and header on every page**,
so that **I can recognise the site and reach the homepage or About**.

## Acceptance Criteria

1. **Given** the Astro project and content from Epic 1, **when** I open any page, **then** a BaseLayout wraps content and includes a Header with site identity (link to home) and a link to About.
2. **And** the header uses semantic `<header>` and `<nav>`; links have visible focus styles (UX-DR2).

## Tasks / Subtasks

- [x] Create BaseLayout component (AC: #1)
  - [x] Add `storieviola-it/src/layouts/BaseLayout.astro` that wraps page content in a shell (e.g. `<html>`, `<head>`, `<body>`), includes the Header, and provides a `<main>` slot for page content
  - [x] Ensure BaseLayout includes global CSS import and viewport/meta; accept optional `title` prop for `<title>` so pages can override
  - [x] Do not add Hero, episode list, or tag filter in this story
- [x] Create Header component (AC: #1, #2)
  - [x] Add `storieviola-it/src/components/Header.astro` with site identity (e.g. site name or logo) as a link to home (`/`), and a link to About (`/about`)
  - [x] Use semantic `<header>` and `<nav>`; no dropdown or mega-menu (UX-DR2)
  - [x] Apply visible focus styles to all links (e.g. Tailwind `focus:ring` / `focus-visible:ring` or equivalent so keyboard focus is clearly visible)
- [x] Use BaseLayout on all pages (AC: #1)
  - [x] Update `storieviola-it/src/pages/index.astro` to use BaseLayout and pass page content into the layout slot
  - [x] Add `storieviola-it/src/pages/about.astro` that uses BaseLayout and renders the about content from the about collection (so the Header “About” link has a valid destination)
- [x] Verify semantics and focus (AC: #2)
  - [x] Confirm `<header>`, `<nav>`, and `<main>` are used correctly; confirm focus ring is visible when tabbing to Home and About links

## Dev Notes

- **Epic context:** Epic 2 is Homepage and episode experience (FR1–FR5, FR18). This story establishes the shared layout and header so every page has consistent navigation; Story 2.2 adds the Hero, 2.3 the episode list, 2.4 the tag filter.
- **Scope:** BaseLayout and Header only. Do **not** add Hero, EpisodeCard, TagFilter, or design tokens (later stories). Do **not** add Vitest/Playwright in this story (Epic 5).
- **App root:** All Astro app code lives under `storieviola-it/` (see Previous Story Intelligence).

### Technical Requirements

- **BaseLayout:** Single layout component in `storieviola-it/src/layouts/BaseLayout.astro`. Must render full document shell (`<html>`, `<head>`, `<body>`), include `<Header />`, and a `<main>` wrapping the default slot. Accept optional props (e.g. `title`) for per-page title; default title acceptable for MVP.
- **Header:** Single component in `storieviola-it/src/components/Header.astro`. Two links: one to `/` (site identity), one to `/about` (About). Markup: `<header>` wrapping `<nav>` with links inside. No dropdowns (UX-DR2).
- **Focus styles:** Use Tailwind utilities such as `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2` (or equivalent) on links so keyboard users see a clear focus indicator. Prefer `focus-visible` so mouse users do not get a persistent ring on click (UX-DR2, UX-DR10).

### Architecture Compliance

- [Source: architecture.md] **Frontend:** Component architecture — Astro components in `src/components/` (Header) and `src/layouts/` (BaseLayout); Tailwind for layout and styling.
- [Source: architecture.md] **Routing:** Astro file-based — `src/pages/index.astro`, `src/pages/about.astro`; stable URLs for home and about.
- [Source: architecture.md] **Structure:** Layouts: `storieviola-it/src/layouts/BaseLayout.astro`. Components: `storieviola-it/src/components/Header.astro` (flat, one per file, PascalCase).
- [Source: architecture.md] **About:** Content in `src/content/about/index.md`; about page at `src/pages/about.astro` displays that content; same Header as rest of site.

### Library / Framework Requirements

- **Astro:** Use standard Astro layout pattern: layout receives `<slot />`; pages import layout and wrap content. No client-side JS required for Header links (plain `<a href>`).
- **Tailwind:** Use Tailwind for focus styles; ensure global CSS is imported in BaseLayout (e.g. `import '../styles/global.css'` or equivalent per project).

### File Structure Requirements

- **Must create:** `storieviola-it/src/layouts/BaseLayout.astro`, `storieviola-it/src/components/Header.astro`, `storieviola-it/src/pages/about.astro`.
- **Must modify:** `storieviola-it/src/pages/index.astro` (replace inline HTML with BaseLayout + slot content).
- **Do not create:** Hero, EpisodeCard, TagFilter, or test files in this story.

### Testing Requirements

- No automated tests in this story. Manual check: open index and about in browser; confirm Header appears on both, Home and About links work, and focus ring is visible when tabbing. Epic 5 adds Vitest/Playwright.

### Previous Story Intelligence

- **Story 1.1–1.3:** Astro app lives under **`storieviola-it/`** at repo root. Content collections and schema in place (`src/content/config.ts` or `src/content.config.ts`, `src/content/episodes/`, `src/content/about/index.md`). No layout or components yet; `index.astro` is a single full HTML document.
- **Files/structure:** `storieviola-it/src/pages/index.astro` exists (no layout); `storieviola-it/src/styles/global.css` exists; `storieviola-it/src/layouts/` and `storieviola-it/src/components/` may exist but are empty — this story adds BaseLayout and Header. About content exists at `src/content/about/index.md`; about page does not exist yet.
- **Convention:** One component per file, PascalCase; layouts in `src/layouts/`, components in `src/components/` flat. Do not put layout or Header at repo root.

### Latest Tech Information

- **Astro layouts:** [Astro Layouts](https://docs.astro.build/en/basics/layouts/) — create a layout component that wraps `<slot />`; pages import the layout and pass content. Use `Astro.props` for optional title.
- **Focus visible:** Tailwind `focus-visible:` applies only for keyboard focus; use with `ring-2 ring-offset-2` (and a visible ring color) for WCAG 2.1 AA visible focus (UX-DR10).

### Project Context Reference

- No `project-context.md` in repo. Follow architecture.md and epics.md.
- **Project:** storieviola.it — static site for Storie Viola podcast. This story adds the shared base layout and header so every page has consistent navigation (home, about) and meets UX-DR2 (semantic header/nav, visible focus).

## Dev Agent Record

### Agent Model Used

(To be filled by dev agent)

### Debug Log References

- Build: `npm run build` from `storieviola-it/` completed successfully; 2 pages built (/index.html, /about/index.html).

### Completion Notes List

- BaseLayout.astro: full document shell, Header, `<main>` slot, optional `title` prop, global CSS import.
- Header.astro: site identity "Storie Viola" link to `/`, About link to `/about`; semantic `<header>` and `<nav>`; Tailwind `focus-visible:ring-2 focus-visible:ring-offset-2` on both links (UX-DR2).
- index.astro: uses BaseLayout with placeholder content; about.astro: uses BaseLayout, loads about collection via getCollection + render(), renders first entry body.
- Manual verification: open / and /about in browser; Header appears on both; Home/About links work; focus ring visible when tabbing (AC #1, #2).

### File List

- storieviola-it/src/layouts/BaseLayout.astro (new)
- storieviola-it/src/components/Header.astro (new)
- storieviola-it/src/pages/index.astro (modified)
- storieviola-it/src/pages/about.astro (new)

### Change Log

- 2026-03-18: Implemented Base layout and Header component; all pages use BaseLayout; about page renders about collection content.
