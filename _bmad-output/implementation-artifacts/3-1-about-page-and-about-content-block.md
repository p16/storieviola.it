# Story 3.1: About page and About content block

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want to read the project's origin and how the stories are made,
so that I can trust who is behind the podcast and for whom it's made.

## Acceptance Criteria

1. **Given** about content exists in the content collection (e.g. `src/content/about.md`),
   **When** I navigate to the about page (e.g. `/about`),
   **Then** the page displays the origin and "how it's made" content in a single column with max-width for readability (UX-DR6).
2. **And** the page uses the same Header as the rest of the site; structure is semantic (headings, paragraphs). (FR6, FR7)

## Tasks / Subtasks

- [x] Task 1: Ensure About content source exists and follows collection structure (AC: #1)
  - [x] Create about content entry under `storieviola-it/src/content/about/` (for current loader config) using a single canonical file (for MVP).
  - [x] Include heading and paragraph structure that covers "origin" and "how it's made".
  - [x] Keep frontmatter optional/empty per collection schema; keep body Markdown-first.
- [x] Task 2: Align About page rendering to resilient content loading (AC: #1, #2)
  - [x] Update `storieviola-it/src/pages/about.astro` to safely handle missing content and render the primary about entry.
  - [x] Render in a readable single-column container with max width (existing `max-w-3xl` pattern is valid).
  - [x] Keep semantic output (`h1`/`h2`/`p` from markdown content; no div-only content blocks).
- [x] Task 3: Preserve layout/navigation consistency (AC: #2)
  - [x] Keep `BaseLayout` usage so the page automatically reuses `Header.astro`.
  - [x] Keep route stable at `/about` via `src/pages/about.astro` (do not rename page file).
- [x] Task 4: Validate behavior and regressions
  - [x] Run `npm run build` from `storieviola-it/`.
  - [x] Verify `/about` shows content, and fallback appears only when content is truly missing.
  - [x] Verify header links and keyboard focus behavior still match existing site behavior.
- [x] Task 5: Optional test hardening (recommended, not required in this story)
  - [x] If lightweight and fast, add one unit/integration check for about-content presence/render path.
  - [x] Defer broader automated coverage to Epic 5 test stories if scope pressure exists.

## Dev Notes

- **Epic context:** Epic 3 ("About and trust") focuses on trust-building content. Story 3.1 should deliver a clean, readable `/about` page backed by repository-managed content.
- **Current implementation intelligence:**
  - `storieviola-it/src/pages/about.astro` already fetches `getCollection('about')`, renders first entry, and wraps in `BaseLayout`.
  - Current fallback text appears because about content is missing in repo. Story 3.1 should close this gap by adding content and keeping render path robust.
  - `storieviola-it/src/content.config.ts` currently loads about content from `./src/content/about` with `**/*.{md,mdx}`; implementation must respect this current source of truth unless explicitly refactoring both loader and docs together.

### Technical Requirements

- Keep all app changes under `storieviola-it/`.
- Respect current Content Collections schema and loader definitions in `storieviola-it/src/content.config.ts`.
- Use markdown content for about copy; avoid introducing runtime CMS or new API calls.
- Keep route and layout conventions unchanged (`src/pages/about.astro`, `src/layouts/BaseLayout.astro`).

### Architecture Compliance

- **Static architecture only:** no backend, no runtime API, no auth.
- **Content as files:** about content must be repo-managed and validated by build.
- **Component/page conventions:** pages lowercase routes, components/layouts PascalCase.
- **A11y/UX baseline:** semantic headings and paragraphs, readable line length and spacing, visible focus preserved via existing header/layout styling.

### Library / Framework Requirements

- Astro app currently targets `astro@^6.0.5`, Node `>=22.12.0`.
- Tailwind stack currently uses `tailwindcss@^4.2.1` and `@tailwindcss/vite@^4.2.1`.
- No additional dependencies are needed for this story.

### File Structure Requirements

- **Modify:** `storieviola-it/src/pages/about.astro` (only if resilience/semantics need improvement).
- **Add:** one about content markdown file under `storieviola-it/src/content/about/` (for current loader path).
- **Do not create:** alternate about content sources or duplicate about pages/routes.

### Testing Requirements

- Minimum mandatory for this story:
  - Build passes (`npm run build`).
  - Manual verification of `/about` content render and header consistency.
- Keep automated test expansion aligned with Epic 5 scope unless there is a quick, low-risk check to add.

### Reinvention / Regression Guardrails

- Do not introduce a second about-content pipeline (e.g. separate JSON + markdown).
- Do not bypass `render()` with raw HTML injection.
- Do not change global layout semantics or header behavior while implementing about content.
- Do not alter episode-related components for this story.

### Latest Tech Information

- Astro 6 is the active major line and matches the repo's pinned dependency; keep content-collection usage aligned with Astro 6 docs and avoid legacy collection APIs.
- Tailwind 4 is already in use; this story does not require new Tailwind features or config changes.

### Project Context Reference

- No `project-context.md` file is present; use these planning artifacts as source of truth:
  - `/_bmad-output/planning-artifacts/epics.md`
  - `/_bmad-output/planning-artifacts/architecture.md`
  - `/_bmad-output/planning-artifacts/ux-design-specification.md`
  - `/_bmad-output/planning-artifacts/prd.md`

### References

- Story definition and ACs: `/_bmad-output/planning-artifacts/epics.md` (Epic 3, Story 3.1).
- Architecture rules and structure: `/_bmad-output/planning-artifacts/architecture.md`.
- UX readability and semantics: `/_bmad-output/planning-artifacts/ux-design-specification.md` (About content block, responsive/accessibility sections).
- Existing implementation patterns: 
  - `/_bmad-output/implementation-artifacts/2-2-compact-hero-component.md`
  - `/_bmad-output/implementation-artifacts/2-4-tag-filter-component-and-client-side-filtering.md`
- Current code context:
  - `storieviola-it/src/pages/about.astro`
  - `storieviola-it/src/layouts/BaseLayout.astro`
  - `storieviola-it/src/content.config.ts`
  - `storieviola-it/package.json`

## Dev Agent Record

### Agent Model Used

Composer (Cursor coding agent)

### Debug Log References

- Story context creation only (no app code execution in this step).

### Completion Notes List

- Created comprehensive developer story context for Epic 3 Story 1 with architecture/UX guardrails.
- Captured current codebase realities (existing about route, missing about content file, current collection loader path).
- Added anti-regression and anti-reinvention constraints to prevent incorrect implementation approaches.
- Included current framework version guidance for Astro 6 / Tailwind 4 compatibility.
- Implemented the `/about` content by updating `storieviola-it/src/content/about/index.md` with semantic “Origin” (`h1`) and “How it's made” (`h2`) headings plus readable paragraphs.
- Ran `npm run build` and inspected generated `dist/about/index.html` to confirm the headings render inside the `max-w-3xl` container and the fallback text is not present.
- Added a lightweight regression guard (`storieviola-it/src/lib/validate-about-content.mjs`) and verified it passes.

### File List

- Added:
  - `_bmad-output/implementation-artifacts/3-1-about-page-and-about-content-block.md`
  - `storieviola-it/src/lib/validate-about-content.mjs`
- Modified:
  - `_bmad-output/implementation-artifacts/sprint-status.yaml`
  - `storieviola-it/src/content/about/index.md`

## Change Log

- 2026-03-19: Story 3.1 created and marked `ready-for-dev` with full implementation context and developer guardrails.
- 2026-03-20: Added Origin + How it's made about content (semantic `h1`/`h2` + paragraphs), confirmed `/about` render via Astro build + lightweight HTML validation, and moved story execution forward to completion readiness.
