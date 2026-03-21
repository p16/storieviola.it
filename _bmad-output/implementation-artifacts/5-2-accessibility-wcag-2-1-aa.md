# Story 5.2: Accessibility (WCAG 2.1 AA)

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **visitor using keyboard or assistive tech**,
I want **all interactive elements to be focusable, visible and correctly announced**,
so that **I can navigate and open episodes without mouse-only interaction**.

## Acceptance Criteria

1. **Given** any page with links and the tag filter, **when** keyboard only (Tab, Enter, Space) or a screen reader is used, **then** all interactive elements (header links, “Listen on Spotify” / episode Spotify CTAs, tag filter) are focusable and activatable; focus is visible (e.g. focus ring); tab order is logical and there is **no focus trap** (UX-DR10, UX-DR14).
2. **And** text and UI meet **WCAG 2.1 AA contrast**: **4.5:1** normal text, **3:1** large text/UI components (NFR-A1).
3. **And** primary CTA and tag filter controls have at least **~44px** touch target and adequate spacing (UX-DR11, NFR-A2). **FR15, FR16.**

## Tasks / Subtasks

- [ ] Audit `Header.astro`, `Hero.astro`, `EpisodeCard.astro` / `EpisodeRow.astro`, `TagFilter.astro`, `ConsentBanner.astro`, `about.astro` — keyboard path, focus visibility, `aria-*` where needed (AC: #1)
- [ ] Fix any contrast failures vs tokens/backgrounds from 5.1; use WebAIM contrast checker or devtools for spot checks on body text, nav, filter buttons, Spotify CTAs (AC: #2)
- [ ] Ensure tag buttons and primary Spotify buttons meet **min-height ~44px** (already partially via `min-h-11` on filter — verify hero CTA and episode links) (AC: #3)
- [ ] Verify filter script (if any) does not steal focus indefinitely; `aria-pressed` stays in sync for active filter (AC: #1)
- [ ] Run `npm run build` (AC: #1–#3)

## Dev Notes

### Epic context

Epic 5 — FR15 (clear hierarchy), FR16 (links operable). Builds on **5.1 tokens** — use semantic HTML and consistent focus styles aligned with design tokens.

### Architecture compliance

- WCAG 2.1 AA: contrast, focus, keyboard, semantics, **~44px touch targets** [Source: `architecture.md` — Frontend Architecture, NFR-A1/A2]
- Tag filter: client-side; buttons use `aria-pressed`; maintain one pattern project-wide [Source: `architecture.md` — Communication Patterns]
- Italian locale: keep `lang="it"`; screen reader labels in Italian where visible strings are Italian (`aria-label` on filter region already present)

### Technical requirements

- **Spotify links:** External `rel="noopener noreferrer"` if not already; ensure each episode’s primary action is a real `<a>` with descriptive text (not “click here”).
- **Images:** Decorative vs informative `alt` — episode covers use title; hero/og assets already have alt in layout/props.
- **Consent banner:** Must remain keyboard-dismissible and not trap focus (check tab cycle when open).

### File structure (expected touches)

| Area | Path |
|------|------|
| Nav / header | `storieviola-it/src/components/Header.astro` |
| Hero CTA | `storieviola-it/src/components/Hero.astro` |
| Episodes | `storieviola-it/src/components/EpisodeCard.astro`, `EpisodeRow.astro` |
| Filter | `storieviola-it/src/components/TagFilter.astro` + any client script in `index.astro` |
| Consent | `storieviola-it/src/components/ConsentBanner.astro` |
| Layout | `storieviola-it/src/layouts/BaseLayout.astro` |

### Testing requirements

- Manual: keyboard-only pass on `/` and `/about`; VoiceOver (macOS) or NVDA quick smoke optional.
- Automated a11y comes in **5.3** (Playwright + axe or similar) — do not block 5.2 on full suite if 5.3 follows immediately after.

### Previous story intelligence

- **5.1** may introduce CSS variables / `@theme` tokens — **reuse those colors** for contrast verification so fixes stay centralized.

### Git intelligence summary

- TagFilter uses `min-h-11`, `focus-visible:ring-*`, `aria-pressed` — extend same patterns to any weaker controls.

### Project context reference

- UX spec: `_bmad-output/planning-artifacts/ux-design-specification.md` (if present) for DR references; epics list UX-DR10/11/14.

## Dev Agent Record

### Agent Model Used

_(filled by dev agent)_

### Debug Log References

### Completion Notes List

### File List
