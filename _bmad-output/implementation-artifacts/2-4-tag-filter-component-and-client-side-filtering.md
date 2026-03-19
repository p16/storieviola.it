# Story 2.4: Tag filter component and client-side filtering

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a visitor,
I want to filter the episode list by tag (e.g. All, Featured, or topic tags),
so that I can quickly find episodes that match what I want.

## Acceptance Criteria

1. **Given** episodes have a `tags` array and the homepage shows the episode list,
   **When** I am on the homepage,
   **Then** a tag filter shows **"All"** (or **"Featured"**) and **one option per unique tag**; one selection is active at a time (UX-DR5).
2. **And** selecting a tag filters the list to episodes that have that tag; selecting **"All"** shows all episodes (FR18).
3. **And** the filter uses **buttons or links with selection state exposed to assistive tech** (e.g. `aria-pressed`); it is **keyboard navigable** with **visible focus** (UX-DR10, UX-DR14).
4. **And** when the selected tag has no matching episodes, an **empty state** shows a short message (e.g. "No episodes with this tag") and a way to clear the filter (e.g. "All") (UX-DR12).

## Tasks / Subtasks

- [x] Task 1: Add `TagFilter.astro` component
  - [x] Render tag filter UI with:
    - [x] A persistent **"All"** button (default selected).
    - [x] A **"Featured"** button *if* at least one episode has tag `featured` (optional but allowed by acceptance criteria).
    - [x] One button per unique tag found in episode data (excluding `featured` if you use the special "Featured" button).
  - [x] Ensure every filter control is a real `<button>` with:
    - [x] `aria-pressed` reflecting selection state.
    - [x] Visible focus styling on keyboard navigation (Tailwind `focus-visible:ring-*`).
    - [x] Touch-friendly size (min ~44px height/padding).
- [x] Task 2: Update `src/pages/index.astro` to include the tag filter
  - [x] Compute unique tags from `getCollection('episodes')` (server-side at build time).
  - [x] Render `TagFilter` above the episode list (only when episodes exist; keep current empty state when `sortedEpisodes.length === 0`).
  - [x] Add a stable selector for filtering logic (e.g. `data-episodes-list`) on the `<ul>` that contains episode items.
- [x] Task 3: Implement client-side filtering behavior (vanilla JS; no new runtime deps)
  - [x] Use the existing `data-tags` convention already present on episode `<li>` from Story 2.3:
    - [x] `EpisodeCard.astro` root `<li>` exposes `data-tags` as comma-separated tag names.
    - [x] Filtering must match tags using the same comma-splitting + trimming approach.
  - [x] On button click:
    - [x] Update `aria-pressed` and selected styling for all filter buttons.
    - [x] Show/hide episode items by toggling `hidden` on non-matching `<li data-tags>`.
    - [x] Update the empty-state message visibility:
      - [x] Show when no episodes match the selected tag.
      - [x] Hide when matches exist.
  - [x] Ensure the filter remains accessible:
    - [x] Use buttons (Enter/Space already works).
    - [x] Keep a logical tab order (no focus trap).
    - [x] Use `aria-live="polite"` for the empty-state message if possible.
- [x] Task 4: Update documentation in `CONTENT.md`
  - [x] Document the tag filter behavior on the homepage (All/Featured + topic tags).
  - [x] Keep/clarify the `data-tags` convention: comma-separated tag names; no commas inside tag strings (MVP rule).
- [x] Task 5: Manual verification checklist (minimum)
  - [x] Run `npm run build` from `storieviola-it/` (Astro build succeeds).
  - [x] Keyboard:
    - [x] Tab to filter buttons, confirm visible focus.
    - [x] Activate buttons with Enter/Space; `aria-pressed` changes.
  - [x] Filtering:
    - [x] Select a tag with results -> list updates.
    - [x] Select a tag with zero results -> message appears and filter can be cleared via "All".
  - [x] Regression:
    - [x] Each episode still has exactly one "Ascolta su Spotify" link with correct URL.

## Dev Notes

- **Architecture intelligence (must follow):**
  - **Client-side filtering only** for the homepage; no server calls, no routing changes, no SPA history manipulation (architecture: local state only).
  - Use the existing `data-tags` attribute added in **Story 2.3**; do not refactor `EpisodeCard` unless you find a schema mismatch.
- **Relevant source tree context (what to touch):**
  - `storieviola-it/src/components/EpisodeCard.astro`: already provides `data-tags` and normalized comma-separated values.
  - `storieviola-it/src/pages/index.astro`: currently renders hero + full episode list; needs to add the tag filter UI and an episodes list hook for JS.
  - `storieviola-it/CONTENT.md`: already documents `data-tags` + no-commas rule; extend for story 2.4 behavior.
- **Client-side implementation details (guardrails):**
  - Parse episode tags with `li.getAttribute('data-tags')?.split(',')` and `trim()`.
  - Store the selected tag in a JS variable; treat "All" as a special case that matches everything.
  - Toggle visibility via `li.hidden = true/false` (simple + robust for SSR/static pages).
  - Empty state:
    - Keep the All button visible at all times.
    - Display a short message when zero episodes match.
    - Optionally use `aria-live="polite"` so screen readers are notified.
- **Accessibility requirements (explicit):**
  - Filter controls must be `<button>` elements.
  - Set `aria-pressed` to reflect which option is selected.
  - Use Tailwind `focus-visible:ring-*` styles on the buttons.
  - No focus trap; rely on native button behavior.
- **Testing requirements:**
  - This story is part of Epic 2 (homepage experience). Current sprint tracking indicates automated tests are introduced in Epic 5, so for this story implementers should:
    - [ ] Add only manual verification steps and `npm run build` checks (no new Vitest/Playwright suites expected here).

### Project Structure Notes

- Follow the established flat structure:
  - Create: `storieviola-it/src/components/TagFilter.astro`
  - Modify: `storieviola-it/src/pages/index.astro`, `storieviola-it/CONTENT.md`
  - Do NOT create: a second episode list component / split card/row unless required; avoid unnecessary new helpers if inline unique-tag computation is sufficient.
- Keep component naming and file naming conventions:
  - PascalCase component names, one file per component.

### References

- `src/pages/index.astro`: existing episode list render + section layout.
- `src/components/EpisodeCard.astro`: `data-tags` comma-separated convention + focus styling for CTA.
- `/_bmad-output/planning-artifacts/epics.md`:
  - Epic 2 -> `Story 2.4: Tag filter component and client-side filtering` (FR18, UX-DR5, UX-DR10, UX-DR12).
- `/_bmad-output/planning-artifacts/architecture.md`: client-side filtering guidance + no-runtime server constraints + component boundaries.
- `/_bmad-output/planning-artifacts/ux-design-specification.md`: tag filter accessibility + empty state.
- `storieviola-it/CONTENT.md`: `data-tags` convention and "no commas inside tags" rule.

## Dev Agent Record

### Agent Model Used
Implemented via `bmad-dev-story` workflow (Cursor coding agent).

### Debug Log References
`npm run build` executed successfully in `storieviola-it/`.

### Completion Notes List
- Added `TagFilter.astro` with accessible filter buttons (`aria-pressed`, `focus-visible` styling, touch-friendly sizing).
- Wired `src/pages/index.astro` to compute unique tags at build time and render the filter above the episode list.
- Implemented vanilla JS client-side filtering by toggling `hidden` on episode `<li>` items using the existing `data-tags` comma-separated convention.
- Added an empty-state message that becomes visible when zero episodes match the selected tag (while keeping “Tutti/All” available to clear the filter).

### File List

- Added:
  - `storieviola-it/src/components/TagFilter.astro`
- Modified:
  - `storieviola-it/src/pages/index.astro`
  - `storieviola-it/CONTENT.md`
  - `_bmad-output/implementation-artifacts/sprint-status.yaml`
- Created (this story file):
  - `_bmad-output/implementation-artifacts/2-4-tag-filter-component-and-client-side-filtering.md`

## Change Log

- 2026-03-19 — Story 2.4: Added homepage tag filter UI + client-side filtering and updated `CONTENT.md` guidance. `npm run build` passes.
- 2026-03-19 — Story 2.4: Added explicit “Tutti” clear control in empty state and made filtering selector less DOM-shape fragile.

