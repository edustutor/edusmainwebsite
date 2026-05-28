/**
 * TikTok Pixel - thin client-side event helper.
 *
 * The pixel script is injected by components/analytics/TikTokPixel.tsx
 * ONLY after the visitor grants advertising consent (Consent Mode v2,
 * "advertising" category). This helper is the single safe entry point
 * for firing conversion events from anywhere in the app.
 *
 * Why a helper instead of calling window.ttq directly everywhere:
 *   - window.ttq may be undefined (script not loaded, consent denied,
 *     SSR). A bare ttq.track() call would throw. This helper no-ops
 *     silently in those cases.
 *   - Keeps the event-name + property shape in one typed place so we
 *     don't typo "CompleteRegistration" across call sites.
 *
 * Privacy note: we deliberately do NOT pass raw email/phone here. The
 * TikTok spec wants those SHA-256 hashed on the client; we don't have a
 * hashing pass wired up and EDUS leads already flow to the CRM with the
 * real contact details, so for the pixel we send only the non-PII
 * event + value + content metadata. This keeps us clean under PDPA /
 * GDPR without a hashing dependency.
 */

/** TikTok standard event names we actually use on the EDUS site. */
export type TikTokEvent =
  | "ViewContent"
  | "ClickButton"
  | "Contact"
  | "Lead"
  | "CompleteRegistration"
  | "SubmitApplication"
  | "Subscribe";

type TikTokContent = {
  content_id?: string;
  content_type?: "product" | "product_group";
  content_name?: string;
};

type TikTokProps = {
  value?: number;
  currency?: string;
  contents?: TikTokContent[];
  /** Only used on Search events. */
  search_string?: string;
  /**
   * Convenience top-level field. The TikTok spec nests content_name
   * inside contents[], but most of our events only need a single label.
   * trackTikTok() lifts this into a one-item contents[] automatically,
   * so call sites can just pass { content_name: "..." }.
   */
  content_name?: string;
};

// Minimal shape of the global ttq object the pixel script installs.
type Ttq = {
  track: (event: string, props?: TikTokProps) => void;
  page: () => void;
};

declare global {
  interface Window {
    ttq?: Ttq;
  }
}

/**
 * Fire a TikTok pixel event. No-ops safely if:
 *   - running on the server,
 *   - the pixel script hasn't loaded (consent not granted yet), or
 *   - window.ttq is otherwise unavailable.
 *
 * Usage:
 *   trackTikTok("CompleteRegistration", {
 *     content_name: "EDUS intake form",
 *   });
 */
export function trackTikTok(event: TikTokEvent, props: TikTokProps = {}): void {
  if (typeof window === "undefined") return;
  const ttq = window.ttq;
  if (!ttq || typeof ttq.track !== "function") return;

  // Normalise the convenience top-level content_name into the spec's
  // contents[] array, then drop the top-level field so the payload
  // matches TikTok's expected shape exactly.
  const { content_name, ...rest } = props;
  const payload: TikTokProps =
    content_name && !rest.contents
      ? { ...rest, contents: [{ content_name, content_type: "product" }] }
      : rest;

  try {
    ttq.track(event, payload);
  } catch {
    // Pixel errors must never break the user flow. Swallow silently.
  }
}
