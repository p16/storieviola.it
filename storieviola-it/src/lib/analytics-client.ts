/**
 * Consent-gated GA4: no gtag script or events until the user accepts analytics.
 * Measurement ID from Epic 4 / Story 4.2.
 */
export const GA_MEASUREMENT_ID = 'G-3D7DV5DLT1';

export const STORAGE_KEY = 'storieviola_analytics_consent';

export type ConsentValue = 'accepted' | 'rejected';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function getGtag(): ((...args: unknown[]) => void) | undefined {
  return typeof window.gtag === 'function' ? window.gtag : undefined;
}

function readStoredConsent(): ConsentValue | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === 'accepted' || raw === 'rejected') return raw;
    return null;
  } catch {
    return null;
  }
}

function persistConsent(value: ConsentValue): void {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* private mode / blocked storage — consent won’t persist */
  }
}

/**
 * Loads gtag.js and configures GA4 with a page view for the current page.
 */
export function injectGtag(): void {
  if (typeof window.gtag === 'function') return; // already injected
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);
}

let outboundTrackingRegistered = false;

function setupOutboundTracking(): void {
  if (outboundTrackingRegistered) return;
  outboundTrackingRegistered = true;
  document.addEventListener('click', (e) => {
    const gtagFn = getGtag();
    if (!gtagFn) return;

    const target = e.target as Element | null;
    if (!target) return;

    const filterBtn = target.closest('[data-filter-button]');
    if (filterBtn) {
      const tag = filterBtn.getAttribute('data-filter-tag') ?? 'unknown';
      gtagFn('event', 'tag_filter', { tag_filter: tag });
      return;
    }

    const link = target.closest('a[href*="spotify.com"]');
    if (link) {
      const href = (link as HTMLAnchorElement).href;
      const label =
        link.getAttribute('aria-label') ??
        link.textContent?.trim() ??
        'spotify';
      gtagFn('event', 'spotify_click', {
        link_url: href,
        link_text: label,
      });
    }
  });
}

function activateAnalytics(): void {
  injectGtag();
  setupOutboundTracking();
}

/**
 * Initializes consent banner behaviour and optional GA4 after persisted or new consent.
 */
export function initAnalyticsConsent(): void {
  const stored = readStoredConsent();

  const banner = document.getElementById('consent-banner');
  const acceptBtn = document.getElementById('consent-accept');
  const rejectBtn = document.getElementById('consent-reject');

  if (stored === 'accepted') {
    if (banner) banner.hidden = true;
    activateAnalytics();
    return;
  }

  if (stored === 'rejected') {
    if (banner) banner.hidden = true;
    return;
  }

  if (banner) {
    banner.hidden = false;
    requestAnimationFrame(() => {
      acceptBtn?.focus();
    });
  }

  acceptBtn?.addEventListener('click', () => {
    persistConsent('accepted');
    if (banner) banner.hidden = true;
    activateAnalytics();
  });

  rejectBtn?.addEventListener('click', () => {
    persistConsent('rejected');
    if (banner) banner.hidden = true;
  });
}
