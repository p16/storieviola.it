# Story 6.1: Enable Dependabot for automated dependency updates

## Status: ready-for-dev

## Story

As a **developer/maintainer**,
I want **Dependabot to automatically open PRs when npm dependencies have updates or security fixes**,
So that **the project stays secure and up to date without manual dependency audits**.

## Acceptance Criteria

**Given** the repository on GitHub,
**When** `.github/dependabot.yml` is committed to the repository root,
**Then** Dependabot opens PRs automatically on a weekly schedule for npm packages in `storieviola-it/` and for GitHub Actions in `.github/workflows/`.
**And** PRs target the `main` branch with no cap on open PRs (`open-pull-requests-limit: 0`).
**And** Dependabot is confirmed active in GitHub → Insights → Dependency graph → Dependabot tab.

## Implementation

### File to create

**One file only:** `.github/dependabot.yml` at the **repository root** (alongside `.github/workflows/`).

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/storieviola-it"
    schedule:
      interval: "weekly"
    target-branch: "main"
    open-pull-requests-limit: 0

  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
    target-branch: "main"
    open-pull-requests-limit: 0
```

**No other files to create or modify.** This story requires only this one YAML file.

### Critical file location details

| Key | Value |
|-----|-------|
| File path | `.github/dependabot.yml` (repo root, NOT inside `storieviola-it/`) |
| npm `directory` | `/storieviola-it` — where `package.json` and `package-lock.json` live |
| actions `directory` | `/` — where `.github/workflows/deploy.yml` lives |
| `open-pull-requests-limit: 0` | Removes the default cap of 5; required by the story |

### GitHub prerequisite (manual step)

Dependabot must be enabled in the repository settings before it will activate:

> GitHub repo → **Settings** → **Security** → **Code security and analysis** → Enable **Dependabot alerts** and **Dependabot security updates**

Without this, the `dependabot.yml` file will be parsed but Dependabot will not open PRs.

## Dev Notes

### What Dependabot will update

- **npm ecosystem**: All packages in `storieviola-it/package.json`:
  - `astro` ^6.0.5
  - `tailwindcss` ^4.2.1
  - `@tailwindcss/vite` ^4.2.1
  - `vitest` ^4.1.0
  - `@vitest/coverage-v8` ^4.1.0
  - `@playwright/test` ^1.58.2
  - `@axe-core/playwright` ^4.11.1

- **github-actions ecosystem**: SHA-pinned actions in `.github/workflows/deploy.yml`:
  - `actions/checkout@<SHA>`
  - `actions/setup-node@<SHA>`
  - `withastro/action@<SHA>`
  - `actions/deploy-pages@<SHA>`

  > Note: The existing workflow intentionally pins actions by full SHA (security best practice). Dependabot will open PRs to update those SHAs to the latest releases — this is expected and correct behaviour.

### No code changes required

- No Astro components, pages, layouts, or content files are touched.
- No test changes needed (there is nothing to test for a config file).
- No `astro.config.mjs`, `tailwind.config.mjs`, or `package.json` changes.

### Verification after merge

1. Go to GitHub repo → **Insights** → **Dependency graph** → **Dependabot** tab.
2. Confirm two entries: one for npm (`/storieviola-it`) and one for github-actions (`/`).
3. Within the next weekly cycle, Dependabot PRs will appear if updates are available.
4. To trigger immediately: GitHub repo → **Security** → **Dependabot** → "Check for updates".
