/**
 * Shared focus-visible rings for CTAs and text links (UX-DR10 / UX-DR11, WCAG focus).
 * Import in Astro frontmatter or TS — Tailwind classes only.
 */

/** Spotify / solid CTA on dark green (hero, episode cards, mobile detail). */
export const focusCta =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-cta';

/** Text links on light background (nav, back link, desktop Spotify text, episode title). */
export const focusTextLink =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

/** Primary bordered button on surface (e.g. “Leggi la storia”). */
export const focusPrimaryCta =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-accent focus-visible:ring-offset-2';
