# Story 7.2: License page and "© Diritti" nav link

Status: ready-for-dev

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

- [ ] Add global nav link (AC: 1)
  - [ ] Update shared header component to include `/licenza` entry labelled "© Diritti"
  - [ ] Ensure focus/keyboard states remain compliant
- [ ] Create license page (AC: 2, 3)
  - [ ] Add `src/pages/licenza.astro`
  - [ ] Write Italian copyright content with ownership, restrictions, and contact channel
  - [ ] Add SEO metadata (`title`, `description`)
- [ ] Create reusable license notice block (AC: 4, 5)
  - [ ] Add shared component/include (e.g. `src/components/LicenseNotice.astro`)
  - [ ] Include current year and required copy/link
- [ ] Integrate notice on episode detail page (AC: 4)
  - [ ] Add component at bottom of `/episodes/[slug]` page from Story 7.1
- [ ] Add tests/regression checks (AC: 1-5)
  - [ ] E2E check for nav link visibility + `/licenza` route
  - [ ] E2E check license notice appears on detail page

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

gpt-5.3-codex-low

### Debug Log References

- N/A (story preparation stage)

### Completion Notes List

- Story context generated to support direct implementation with minimal ambiguity.
- Dependencies with Story 7.1 and reusable component strategy are explicit.
- Story set to `ready-for-dev`.

### File List

- `_bmad-output/implementation-artifacts/7-2-license-page-and-diritti-nav-link.md`
