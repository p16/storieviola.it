# Story 7.2: License page and "© Diritti" nav link

Status: done

## Story

As a **visitor**,
I want **to know what I can and cannot do with the stories on this site**,
so that **I understand that the content is protected and I need the author's permission to reuse it**.

## Acceptance Criteria

1. **Given** the site header, **when** I view any page, **then** nav shows "© Diritti" linking to `/licenza`.
2. **Given** `/licenza`, **when** I open it, **then** page shows clear "All Rights Reserved" notice in Italian with ownership (Filippo De Santis), reuse restrictions, and contact method for licensing requests.
3. `/licenza` uses existing `BaseLayout` + `Header` and has title/description metadata.
4. **Given** any episode detail page, **when** I reach page bottom, **then** compact reusable notice appears:
   `© [year] Filippo De Santis — Tutti i diritti riservati.` with link `Dettagli sulla licenza` to `/licenza`.
5. Footer notice is implemented as reusable component/include to keep consistency.

## Tasks / Subtasks

- [x] Add global nav link (AC: 1)
  - [x] Update shared header component to include `/licenza` entry labelled "© Diritti"
  - [x] Ensure focus/keyboard states remain compliant
- [x] Create license page (AC: 2, 3)
  - [x] Add `src/pages/licenza.astro`
  - [x] Write Italian copyright content with ownership, restrictions, and contact channel
  - [x] Add SEO metadata (`title`, `description`)
- [x] Create reusable license notice block (AC: 4, 5)
  - [x] Add shared component/include (e.g. `src/components/LicenseNotice.astro`)
  - [x] Include current year and required copy/link
- [x] Integrate notice on episode detail page (AC: 4)
  - [x] Add component at bottom of `/episodes/[slug]` page from Story 7.1
- [x] Add tests/regression checks (AC: 1-5)
  - [x] E2E check for nav link visibility + `/licenza` route
  - [x] E2E check license notice appears on detail page

## Dev Notes

### Developer Context

- This story depends on Story 7.1 detail page availability for footer placement.
- Header is shared across pages; change once and verify impact on homepage/about/detail.
- Italian copy is mandatory for legal notice text; keep wording explicit and unambiguous.

### Architecture Compliance Requirements

- Reuse current layout and component architecture (`BaseLayout`, shared header).
- Keep static-only implementation (no backend/legal API).
- Preserve accessibility baselines: semantic structure, clear labels, visible focus.

### File Structure Requirements

- Expected touched files:
  - `storieviola-it/src/components/Header.astro` (or equivalent header component)
  - `storieviola-it/src/pages/licenza.astro` (new)
  - `storieviola-it/src/components/LicenseNotice.astro` (new reusable component)
  - `storieviola-it/src/pages/episodes/[slug].astro` (integration from 7.1)
  - `storieviola-it/tests/e2e/*.spec.ts`

### Library / Framework Requirements

- Stay with Astro pages/components and existing styling approach.
- Do not add legal/cookie libraries for this story; this is static content and links.
- Keep test tooling unchanged (Playwright for page-level checks).

### Testing Requirements

- Verify header shows "© Diritti" on homepage, about, and episode detail.
- Verify `/licenza` route returns 200 and renders required legal copy.
- Verify episode page footer contains year + owner text + "Dettagli sulla licenza" link.
- Verify link targets `/licenza` and is keyboard reachable.

### Dependencies and Sequencing

- Implement Story 7.1 first (or in same branch before validation) so footer component can be mounted on detail pages.
- If implementing in parallel, create component now and wire once detail route exists.

### References

- Epic definition and ACs: `_bmad-output/planning-artifacts/epics.md` (Epic 7, Story 7.2)
- Product baseline and scope: `_bmad-output/planning-artifacts/prd.md`
- Architecture and shared layout constraints: `_bmad-output/planning-artifacts/architecture.md`
- UX navigation/accessibility consistency: `_bmad-output/planning-artifacts/ux-design-specification.md`

## Dev Agent Record

### Agent Model Used

gpt-5.3-codex-low (story prep); housekeeping sync 2026-03-28 (Cursor agent)

### Debug Log References

- N/A

### Completion Notes List

- Implementation present in repo: `Header.astro` nav link, `licenza.astro`, `LicenseNotice.astro`, compact notice on episode detail page, Playwright smoke tests for nav, `/licenza`, and footer notice.
- Story status set to `review` pending optional `bmad-bmm-code-review` pass.

### File List

- `storieviola-it/src/components/Header.astro`
- `storieviola-it/src/pages/licenza.astro`
- `storieviola-it/src/components/LicenseNotice.astro`
- `storieviola-it/src/pages/episodes/[slug].astro`
- `storieviola-it/tests/e2e/smoke.spec.ts`
- `_bmad-output/implementation-artifacts/7-2-license-page-and-diritti-nav-link.md`
