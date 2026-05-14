/**
 * EDUS consent state - the source of truth for what trackers are
 * allowed to fire. Stored in localStorage so it survives navigations
 * + closes. Reread on every page load and pushed into Google Consent
 * Mode v2 via gtag('consent', 'update', ...).
 *
 * Three categories aligned to Google Consent Mode v2 fields:
 *   - necessary  -> always granted (functionality_storage, security_storage)
 *   - analytics  -> grants analytics_storage (GA4, Microsoft Clarity)
 *   - advertising -> grants ad_storage, ad_user_data, ad_personalization
 *
 * Browser-only (uses localStorage + window). Guard with typeof checks
 * when imported from server components / build-time code paths.
 */

const STORAGE_KEY = "edus_consent_v1";
/** GDPR-recommended re-prompt cadence (UK ICO + EU EDPB align around 13 months). */
const MAX_AGE_DAYS = 13 * 30;

export type ConsentCategories = {
  /** Always true. Listed for symmetry; never editable. */
  necessary: true;
  /** GA4, Microsoft Clarity, Vercel Analytics. */
  analytics: boolean;
  /** Future ad/remarketing pixels. False by default. */
  advertising: boolean;
};

export type StoredConsent = {
  categories: ConsentCategories;
  /** ISO timestamp when the user picked. Used for the 13-month expiry. */
  decidedAt: string;
  /** Schema version - bump when the category shape changes. */
  v: 1;
};

/** Default state when no decision has been made yet - locked-down conservative. */
export const DEFAULT_CONSENT: ConsentCategories = {
  necessary: true,
  analytics: false,
  advertising: false,
};

/** Maximum allowed acceptance - what "Accept all" stores. */
export const FULL_CONSENT: ConsentCategories = {
  necessary: true,
  analytics: true,
  advertising: true,
};

/**
 * Read the stored consent decision. Returns `null` when:
 *   - The user has never decided
 *   - The decision is older than MAX_AGE_DAYS (banner re-shows)
 *   - localStorage is unavailable (SSR, private browsing in some browsers)
 *   - Stored JSON is malformed
 */
export function readConsent(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (!parsed?.decidedAt || parsed.v !== 1) return null;
    const ageDays =
      (Date.now() - new Date(parsed.decidedAt).getTime()) / (1000 * 60 * 60 * 24);
    if (ageDays > MAX_AGE_DAYS) return null;
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Persist the consent choice + push the matching Consent Mode v2 update
 * into gtag so any already-loaded GTM / GA4 / Clarity tags switch state
 * in real time without a page reload.
 */
export function writeConsent(categories: ConsentCategories): StoredConsent {
  const stored: StoredConsent = {
    categories,
    decidedAt: new Date().toISOString(),
    v: 1,
  };
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch {
      // Private browsing or storage full - we still push to gtag below.
    }
    pushConsentToGtag(categories);
    // Fire a window-level event so other components (e.g. a "preferences"
    // link in the footer) can refresh their UI without reload.
    window.dispatchEvent(new CustomEvent("edus:consent-update", { detail: stored }));
  }
  return stored;
}

/**
 * Clear the stored decision. Used by the "reset" action in the
 * preferences modal so the banner reappears on next load.
 */
export function clearConsent(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  pushConsentToGtag(DEFAULT_CONSENT);
  window.dispatchEvent(new CustomEvent("edus:consent-update", { detail: null }));
}

/**
 * Translate our 3-category model into Google's 7-field Consent Mode v2
 * vocabulary, then push it into gtag(). Trackers that respect Consent
 * Mode (GA4, Microsoft Clarity, future Google Ads) immediately react.
 */
function pushConsentToGtag(c: ConsentCategories): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };
  // gtag() may not exist yet if GTM hasn't loaded. Fall back to pushing
  // directly into dataLayer - GTM picks it up when it boots.
  const payload = {
    analytics_storage: c.analytics ? "granted" : "denied",
    ad_storage: c.advertising ? "granted" : "denied",
    ad_user_data: c.advertising ? "granted" : "denied",
    ad_personalization: c.advertising ? "granted" : "denied",
    personalization_storage: c.analytics ? "granted" : "denied",
    functionality_storage: "granted",
    security_storage: "granted",
  } as const;
  if (typeof w.gtag === "function") {
    w.gtag("consent", "update", payload);
  } else {
    w.dataLayer = w.dataLayer ?? [];
    // Replicate gtag's positional-arg style: ['consent','update', {...}]
    w.dataLayer.push(["consent", "update", payload]);
  }
}

/**
 * Apply a stored consent decision on page load. Call once from a
 * top-level Client Component effect so existing visitors who already
 * decided keep their choice without seeing the banner again.
 */
export function applyStoredConsent(): void {
  const stored = readConsent();
  if (stored) pushConsentToGtag(stored.categories);
}
