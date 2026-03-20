# Sprint Change Proposal - GA4 Analytics + Consent
## Date
2026-03-20

## Section 1: Issue Summary
We are revising the sprint scope inside **Epic 4 (Discoverability and analytics)** because the current planning for **Story 4.2 (“Lightweight analytics (optional)”)** is too generic.

The triggering change is that your **GA4 property/Measurement ID is ready** (`G-3D7DV5DLT1`) and you want to use it **instead of building a custom analytics system**.

Additionally, you require a **consent/cookie banner**: **GA4 analytics must be enabled only after the user clicks “Accept analytics”**, with **Accept/Reject only** controls and **Italian** banner language.

## Section 2: Impact Analysis
### Epic Impact
- **Epic 4 remains the same** (“Discoverability and analytics”), but **Story 4.2 is replaced** with GA4 + consent-based tracking requirements.

### Story Impact
- **Story 4.2 (replaced)**:
  - Old intent: privacy-aware “lightweight analytics” (optional; minimal/script/server logs).
  - New intent: **GA4 tracking** (page views + outbound Spotify clicks + tag filter interactions), **loaded only after explicit consent**.

### Artifact Conflicts (PRD / Architecture / UX / Epics)
#### PRD
- `FR13` currently references “lightweight analytics or equivalent” (too general).
- `NFR-SEC1` currently mentions privacy-aware minimal analytics, but does **not** explicitly require consent gating.

#### Architecture
- Current architecture references **“optional analytics integration”** and **“optional analytics”** in the implementation sequence.
- We need to update this to reflect **GA4 integration with cookie-consent gating** (default disabled; enable after “Accept analytics”).

#### UX / UI Specs
- UX spec currently covers SEO and components for hero/list/filter/about but has **no cookie/consent banner component**.
- We must add a cookie banner requirement with accessibility expectations (keyboard focusable, clear labels, no blocking of primary flows).

### Technical Impact
- No backend required (static site). GA4 must be integrated in a way compatible with a static Astro build.
- GA4 script initialization must be conditional:
  - **Default**: do not load GA4 / do not send events.
  - **On accept**: load GA4 (or initialize GA4) and then track:
    - `page_view` for the current page
    - outbound clicks on “Listen on Spotify”
    - tag filter selection interactions
- Consent choice must persist (cookie/localStorage) so subsequent visits respect the user’s choice.
- Automated tests should be extended so we can verify:
  - no analytics calls before consent
  - correct event dispatch after accept

## Section 3: Recommended Approach
### Selected Path Forward
**Option 1: Direct Adjustment**

Replace **Story 4.2** with an implementation-ready GA4 story that includes:
- explicit consent/cookie banner requirement (Accept/Reject only)
- GA4 enabled **only after “Accept analytics”**
- event tracking scope for MVP (page views, Spotify outbound clicks, tag filter interactions)

### Rationale
- This is a **targeted change** within Epic 4 and does not require replanning other epics.
- It leverages your ready GA4 asset (Measurement ID) and avoids inventing a new analytics system.
- The consent requirement is straightforward to scope and can be added cleanly to BaseLayout + supporting component logic.

### Effort / Risk / Timeline Impact
- Effort estimate: **Medium**
- Risk level: **Medium**
  - Main risk is ensuring analytics never fires before consent (and that GA4 initialization works reliably after consent).

## Section 4: Detailed Change Proposals

### 4.1 Stories
#### Story: `4.2` (replace)
**Old (current in `epics.md`):**
```md
### Story 4.2: Lightweight analytics (optional)

As a **product owner**,
I want **minimal, privacy-aware analytics**,
So that **I can see evidence that the site is reachable and discoverable**.

**Acceptance Criteria:**

Given** the product owner wants reach/discoverability evidence,
When** analytics is configured (e.g. minimal script or server-side logs),
Then** the integration is privacy-aware and minimal; no sensitive or personal data is collected beyond what is required (NFR-SEC1). FR13.
And** configuration is optional so the site works without it.
```

**New (proposed replacement text in `epics.md`):**
```md
### Story 4.2: GA4 analytics with consent (required)

As a **product owner**,
I want **GA4 tracking enabled with explicit user consent**,
So that **I can see evidence that the site is reachable and discoverable**, without enabling analytics before consent.

**Acceptance Criteria:**

Given** the site has GA4 configured with Measurement ID `G-3D7DV5DLT1`,
And** cookie consent UI is shown with **Accept/Reject only**,
And** banner language is **Italian**,
When** a visitor first loads the site,
Then** a cookie/consent banner is displayed with an **“Accetta analytics”** (Accept analytics) action and a **“Rifiuta”** (Reject) action.
And** by default analytics is disabled:
- GA4 script is not loaded/initialized for analytics
- no GA4 analytics events are sent

When** the visitor clicks **“Accetta analytics”**,
Then** GA4 is initialized using Measurement ID `G-3D7DV5DLT1` (after consent),
And** GA Consent Mode (or equivalent consent gating) ensures analytics storage is granted,
And** the current page records a `page_view` (or equivalent GA4 page view event).
And** the site tracks these MVP events:
- `listen_on_spotify_click` (outbound click): send event when the user clicks the **“Listen on Spotify”** link
- `tag_filter_select` (interaction): send event when the user selects a tag in the tag filter

When** the visitor clicks **“Rifiuta”**,
Then** analytics remains disabled:
- GA4 is not loaded/initialized for analytics
- no GA4 analytics events are sent

And** the visitor’s consent choice persists across page loads (e.g. via cookie/localStorage).

And** the cookie banner is accessible:
- actions are keyboard focusable and activatable
- labels are clear
- focus handling does not break the primary flows (homepage, tag filter, outbound “Listen on Spotify”).
```

**Rationale for the change**
- Story 4.2 becomes implementation-ready for your ready GA4 asset.
- Consent gating addresses the new requirement: analytics is enabled only after explicit acceptance.
- Tracking scope is aligned to the site’s highest-value interactions for discoverability:
  page views, Spotify outbound clicks, and tag filter selection.

### 4.2 PRD modifications
#### PRD: `FR13` and `NFR-SEC1`
**Old (in `prd.md`):**
```md
- **FR13:** Product owner can see evidence that the site is reachable and that visitors can discover it (e.g. lightweight analytics or equivalent).
...
- **NFR-SEC1:** No sensitive or personal data is collected or processed by the site beyond what is required for lightweight analytics (if any); any such analytics must be privacy-aware and minimal.
```

**New (proposed updates):**
```md
- **FR13:** Product owner can see evidence that the site is reachable and that visitors can discover it (e.g. GA4 tracking with user consent; page views and key outbound interactions).
...
- **NFR-SEC1:** No sensitive or personal data is collected or processed by the site. GA4 (or any analytics) must be enabled only after explicit user consent via a cookie/consent banner (Accept analytics). When consent is not granted, analytics must remain disabled. Any analytics must be privacy-aware and minimal.
```

### 4.3 Architecture modifications
#### Architecture: update “optional analytics” language
**Old (in `architecture.md`):**
```md
- **Architectural components:** Content source (data/files), build pipeline, static output, hosting, optional analytics integration.
...
**Implementation sequence:** ... (7) SEO (meta, canonical) and optional analytics.
```

**New (proposed updates):**
```md
- **Architectural components:** Content source (data/files), build pipeline, static output, hosting, GA4 analytics integration (consent-gated).
...
**Implementation sequence:** ... (7) SEO (meta, canonical) and GA4 analytics with consent gating.
```

#### Add explicit consent-gated analytics decision
Add to the architecture/security decisions:
- Consent default = analytics disabled
- Load/initialize GA4 only after “Accept analytics”
- Track MVP events only after consent
- Persist consent state and ensure the current page records a `page_view` after acceptance

### 4.4 UI/UX specification modifications
Add a new UI requirement/spec entry for a **Cookie Consent Banner**:
- Italian text
- Accept/Reject only
- keyboard accessible actions
- persistent choice

This can be added as a new component spec section under the existing “Component Strategy” area, and referenced by Story 4.2 acceptance criteria.

## Section 5: Implementation Handoff
### Change scope classification
**Minor scope**

### Handoff responsibilities
- Development team:
  - implement cookie/consent banner (Accept/Reject only, Italian)
  - implement consent-gated GA4 initialization (Measurement ID `G-3D7DV5DLT1`)
  - wire MVP event tracking:
    - `listen_on_spotify_click`
    - `tag_filter_select`
  - update automated tests to verify:
    - no analytics before consent
    - correct analytics after consent
- Product Owner / Scrum Master:
  - approve this proposal and ensure story 4.2 replacement is reflected in sprint artifacts

### Success criteria
- With default/no consent: no GA4 analytics calls/events are observed.
- After “Accetta analytics”: GA4 initializes and records `page_view` + specified interaction events.
- Cookie banner is accessible and does not interfere with selecting tags or clicking “Listen on Spotify”.

---
## Review Request
Review the proposal and tell me:
- Continue (`c`) to implement the planning artifact changes, or
- Edit (`e`) if you want adjustments.

