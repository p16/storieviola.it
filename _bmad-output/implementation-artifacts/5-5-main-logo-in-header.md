# Story 5.5: Main logo in header

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **visitor**,
I want **to see the Storie Viola logo next to (or instead of) the plain text site name in the header**,
so that **the brand is visually consistent with podcast artwork and marketing**.

## Acceptance Criteria

1. **Given** the Header implements site identity as a link to `/`, **when** I view any page with the header, **then** the home link shows the **main logo image** with descriptive **`alt`** text (e.g. site name) and remains **keyboard-focusable** with **visible** focus styles (UX-DR2, UX-DR10).
2. **And** the logo scales on mobile and desktop **without overflow** or bad cropping (max-height or responsive width).
3. **And** logo asset(s) live under **`public/`** or **`src/assets/`** (if using Astro-optimised images) with a **single clear naming convention** documented for future swaps.

## Tasks / Subtasks

- [ ] Add logo asset(s) (SVG preferred for crispness, or PNG @2x) under `public/images/` or `src/assets/` — e.g. `logo.svg` / `logo.png` (AC: #3)
- [ ] Update `storieviola-it/src/components/Header.astro`: home `<a href="/">` wraps `<img>` (and optional visible text — product decision) with correct `alt` and sizing classes (AC: #1–#2)
- [ ] Apply responsive sizing (`h-8 md:h-9`, `max-w-*`, `object-contain`) so nav does not wrap badly on narrow screens (AC: #2)
- [ ] Verify `focus-visible` ring still wraps the **entire** hit area of the home control (AC: #1)
- [ ] Document asset path and replacement steps in `CONTENT.md` or `README.md` (AC: #3)
- [ ] Run `npm run build` (AC: #1–#2)

## Dev Notes

### Epic context

Final Epic 5 polish; pairs with **5.4** favicon — use **same visual system** where possible.

### Architecture compliance

- Components: PascalCase, `Header.astro` [Source: `architecture.md` — Naming Patterns]
- Images: `public/` for static; `src/assets/` + `Image` if optimisation needed [Source: `architecture.md` — Assets]

### Technical requirements

- **Accessibility:** If logo is decorative because visible text “Storie Viola” remains next to it, `alt=""` + `aria-hidden="true"` on img may apply; if logo **replaces** text, `alt="Storie Viola"` (or equivalent) **required**.
- **Performance:** SVG inline in `public/` avoids build pipeline; large PNGs should be reasonable file size.

### File structure (expected touches)

| Area | Path |
|------|------|
| Asset | `storieviola-it/public/images/logo.svg` (example — pick one convention) |
| Header | `storieviola-it/src/components/Header.astro` |
| Docs | `storieviola-it/CONTENT.md` or `README.md` |

### Testing requirements

- Keyboard: Tab to home link, Enter navigates to `/`.
- Optional E2E (post–5.3): assert header home link contains image with alt.

### Previous story intelligence

- **5.1** tokens control nav background/border — logo should sit on `bg-white` / border without contrast failure (**5.2**).

### Project context reference

- None.

## Dev Agent Record

### Agent Model Used

_(filled by dev agent)_

### Debug Log References

### Completion Notes List

### File List
