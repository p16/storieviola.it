# Story 5.1: Design tokens and responsive behaviour

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **visitor**,
I want **consistent typography, color and spacing and a layout that works on my device**,
so that **the site feels clear and works on mobile and desktop**.

## Acceptance Criteria

1. **Given** the UX design foundation (color, typography, spacing), **when** the site is implemented, **then** design tokens are defined (e.g. via Tailwind config or CSS variables) for background, text, primary CTA accent, type scale, and spacing scale (UX-DR1).
2. **And** the layout is responsive: breakpoint at **768px** (`md:` in Tailwind); mobile-first; hero and at least **1–2 episodes** visible on first load on typical mobile and desktop viewports (FR14, UX-DR7, UX-DR8).

## Tasks / Subtasks

- [x] Introduce named tokens for core surfaces and brand (background, text, primary/accent, type steps, spacing) using Tailwind v4 `@theme` in `src/styles/global.css` or equivalent single source of truth (AC: #1)
- [x] Map existing gray/violet/green usage in components to tokens where practical without large visual drift; document token names in README or `CONTENT.md` (AC: #1)
- [x] Verify `md:` breakpoint remains 768px (Tailwind default); adjust Hero + episode section so first paint shows hero + ≥1–2 episode rows/cards on common mobile (375px) and desktop (1280px) — tune padding/typography if needed (AC: #2)
- [x] Run `npm run build` after changes (AC: #1–#2)

## Dev Notes

### Epic context

Epic 5 — Quality, accessibility and performance. This story establishes **visual consistency** and **responsive baseline** before deeper a11y polish (5.2) and automated tests (5.3). **FRs:** FR14 (responsive), UX-DR1/7/8.

### Architecture compliance

- App root: `storieviola-it/` [Source: `_bmad-output/planning-artifacts/architecture.md` — Project Structure]
- Styling: Tailwind via `@tailwindcss/vite` + `src/styles/global.css` with `@import "tailwindcss"`; **Tailwind v4** — prefer **`@theme { ... }`** in `global.css` for design tokens rather than scattering magic hex values [Source: `storieviola-it/astro.config.mjs`, `storieviola-it/src/styles/global.css`]
- Breakpoint: **~768px** single breakpoint; mobile-first; `md:` for grid/card layout [Source: architecture.md — Frontend Architecture]
- Components: `Header.astro`, `Hero.astro`, `EpisodeCard.astro`, `EpisodeRow.astro`, `TagFilter.astro`, pages — use token-based utilities (e.g. `bg-background`, `text-foreground`) once defined

### Technical requirements

- **Do not** add a second CSS framework or duplicate theme in multiple files; one theme block + documented extension path.
- Preserve **Italian** UI copy and semantic structure (`lang="it"` on `<html>` in `BaseLayout.astro`).
- Hero + episodes: `index.astro` composes `Hero` then episode section; shrinking vertical rhythm on small screens may require adjusting `Hero` / section `pt`/`pb` / `min-h` only as needed to meet “1–2 episodes visible” without hiding content behind opaque overlays.

### File structure (expected touches)

| Area | Path |
|------|------|
| Theme / tokens | `storieviola-it/src/styles/global.css` |
| Layout shell | `storieviola-it/src/layouts/BaseLayout.astro` (body background/text classes → tokens) |
| Home | `storieviola-it/src/pages/index.astro`, `Hero.astro`, `EpisodeCard.astro` / `EpisodeRow.astro` as needed |

### Testing requirements

- No Vitest/Playwright required for **this** story alone (5.3 adds the suite). **Manual:** resize devtools 375×667 and ~1280×800; confirm hero + ≥2 episode items visible without excessive scroll on mobile where content exists.

### Previous story intelligence

- Epics 1–4 delivered layout, filter, SEO, consent/GA4. **No** prior story file in `_bmad-output/implementation-artifacts/` for 5.x — this is the first Epic 5 implementation story.

### Git intelligence summary

Recent work: Stories 3.1, 4.1, 4.2 (SEO, about, analytics). Patterns: Tailwind utilities inline in components; focus rings on interactive elements.

### Latest technical notes

- **Astro 6** + **Tailwind 4.2** with Vite plugin `@tailwindcss/vite` — token extension via `@theme` is the idiomatic v4 approach [Source: `storieviola-it/package.json`]

### Project context reference

- No `project-context.md` in repo; rely on this story + `architecture.md` + `CONTENT.md`.

## Dev Agent Record

### Agent Model Used

Cursor (implementation + doc sync)

### Debug Log References

- `npm run build` (pass)
- Token names documented in `storieviola-it/CONTENT.md` (Design tokens section).

### Completion Notes List

- `@theme` block in `global.css` defines surfaces, text, brand, CTA, focus rings, and display/lead type steps; components use semantic utilities (`bg-background`, `text-foreground`, `bg-cta`, etc.).
- Responsive checks: `md:` at 768px; homepage grid `md:` / `xl:` covered by Playwright smoke tests; hero + episode list layout tuned for mobile-first.
- `CONTENT.md` includes a design-token reference table (Story 5.1 AC).

### File List

- `storieviola-it/src/styles/global.css`
- `storieviola-it/src/layouts/BaseLayout.astro`
- `storieviola-it/src/pages/index.astro`
- `storieviola-it/src/components/Hero.astro`
- `storieviola-it/src/components/EpisodeCard.astro`
- `storieviola-it/src/components/TagFilter.astro`
- `storieviola-it/src/components/Header.astro`
- `storieviola-it/CONTENT.md`

### Change Log

- 2026-03-28: Story file synced to implemented state; `CONTENT.md` documents design tokens per review.
