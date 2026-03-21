# Story 5.4: Favicon and browser icons

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **visitor**,
I want **the site to show the correct icon in the browser tab, bookmarks, and when the page is saved to the home screen (where applicable)**,
so that **I can recognise Storie Viola at a glance and trust the site**.

## Acceptance Criteria

1. **Given** the Astro app under `storieviola-it/` with favicon links in BaseLayout (e.g. `favicon.svg`, `favicon.ico`), **when** I open the site in desktop and mobile browsers, **then** the tab shows the **Storie Viola** favicon (not generic Astro or placeholder art).
2. **`public/`** contains the **authoritative** icon assets referenced from `<head>` (SVG and/or ICO for broad support).
3. **Optional:** `apple-touch-icon` (or equivalent) for a polished “add to home screen” on iOS; if omitted, **document the decision** in `CONTENT.md` or `README.md`.

## Tasks / Subtasks

- [x] Replace or add `storieviola-it/public/favicon.svg` and `storieviola-it/public/favicon.ico` with final Storie Viola artwork (export from brand/podcast assets as needed) (AC: #1–#2)
- [x] Confirm `BaseLayout.astro` `<link rel="icon" ...>` entries match filenames, order (SVG preferred first), and MIME types (AC: #2)
- [x] Add `<link rel="apple-touch-icon" href="...">` **or** document why skipped in `CONTENT.md` / README (AC: #3)
- [x] Smoke-test in Chrome + Safari (iOS if available); run `npm run build` (AC: #1)

## Dev Notes

### Epic context

Brand recognition and trust; aligns with **5.5** (header logo) — favicon should be **visually consistent** with logo artwork where possible.

### Architecture compliance

- Static assets in `storieviola-it/public/` [Source: `architecture.md` — Structure Patterns]
- Base layout owns `<head>` links [Source: `storieviola-it/src/layouts/BaseLayout.astro`]

### Technical requirements

- **ICO:** Many browsers still request `/favicon.ico` — keep a real multi-size ICO or documented fallback.
- **SVG:** Modern browsers use `favicon.svg`; ensure single-color or simple paths work at 16×16.
- **Cache:** Filenames may be cached aggressively — if replacing mid-flight, consider versioned filename + doc update (optional MVP: replace in place).

### File structure (expected touches)

| Area | Path |
|------|------|
| Icons | `storieviola-it/public/favicon.svg`, `storieviola-it/public/favicon.ico` |
| Head | `storieviola-it/src/layouts/BaseLayout.astro` |
| Docs | `storieviola-it/CONTENT.md` or `storieviola-it/README.md` |

### Testing requirements

- Manual visual check; optional Playwright assertion `link[rel="icon"]` `href` 200 — can follow in 5.3 if already merged.

### Previous story intelligence

- **5.3** may add Playwright — add a small E2E check for favicon response if suite exists.

### Project context reference

- None.

## Dev Agent Record

### Agent Model Used

_(filled by dev agent)_

### Debug Log References

### Completion Notes List

- Source PNG copied to `public/brand-logo.png`. `favicon.svg` embeds a 128×128 raster for reliable full-colour SVG favicon support. `favicon.ico` includes 16/32/48 via ImageMagick. Added `favicon-16.png`, `favicon-32.png`, `apple-touch-icon.png` (180×180). Documented in `CONTENT.md`.

### File List

- `storieviola-it/public/brand-logo.png`, `favicon.svg`, `favicon.ico`, `favicon-16.png`, `favicon-32.png`, `apple-touch-icon.png`
- `storieviola-it/src/layouts/BaseLayout.astro`
- `storieviola-it/CONTENT.md`
