"use client";
/**
 * EDUS analytics event catalog - one place for every Google Analytics
 * event name + the params it ships with. Use these helpers from any
 * Client Component to fire a conversion / engagement event into GA4
 * (via @next/third-parties' dataLayer bridge).
 *
 * Why a catalog and not raw sendGAEvent everywhere:
 *   - Stops typos ("singup_click" vs "signup_click") fragmenting reports
 *   - Documents the contract for each event in one file
 *   - Lets future-me grep for every place a single event fires from
 *
 * Server Components cannot import this file - sendGAEvent is browser-only.
 * Wrap any event-firing element in a small Client Component if needed.
 */
import { sendGAEvent } from "@next/third-parties/google";

/** Markets the visitor can be browsing. Used as event param `market`. */
export type Market = "sl" | "in" | "mv" | "global" | "homepage" | "unknown";

/** Where on the page the CTA lived (for funnel analysis). */
export type Surface =
  | "hero"
  | "pricing"
  | "footer"
  | "header"
  | "cta_section"
  | "region_selector"
  | "other_markets"
  | "card"
  | "faq"
  | "inline";

/* --------------------------------------------------------------- */
/* Public event helpers - one per business-meaningful action.       */
/* Each one is intentionally typed so GA4 reports have consistent   */
/* params across every fire site.                                   */
/* --------------------------------------------------------------- */

/**
 * Fired when the user clicks ANY signup.edustutor.com link. This is
 * the primary lead conversion event for EDUS - mark it as a Conversion
 * in GA4 Admin -> Events after the first 24 hours of data.
 */
export function trackSignupClick(opts: { market: Market; surface: Surface }) {
  sendGAEvent("event", "signup_click", {
    market: opts.market,
    surface: opts.surface,
    destination: "signup.edustutor.com",
  });
}

/**
 * Fired AFTER /api/contact returns 2xx and the success state renders.
 * The submit-failure case fires `contact_form_error` instead so we can
 * tell completed vs broken conversions apart.
 */
export function trackContactSubmit(opts: { market: Market }) {
  sendGAEvent("event", "contact_form_submit", {
    market: opts.market,
    surface: "inline" as Surface,
  });
}

export function trackContactError(opts: { market: Market; reason: string }) {
  sendGAEvent("event", "contact_form_error", {
    market: opts.market,
    reason: opts.reason,
  });
}

/**
 * Fired when the visitor picks a market from RegionSelector / OtherMarkets.
 * Tells you which "Choose Your Path" tile gets the most attention.
 */
export function trackRegionSelect(opts: {
  destination: Market;
  surface: "region_selector" | "other_markets" | "footer";
}) {
  sendGAEvent("event", "region_select", {
    destination: opts.destination,
    surface: opts.surface,
  });
}

/**
 * Outbound clicks to the public Google Maps listing. Both per-review
 * "View on Google" links AND the bottom-of-section "View all reviews"
 * button fire this so the totals in GA4 = (per-review clicks + CTA).
 */
export function trackGoogleReviewClick(opts: {
  market: Market;
  kind: "single_review" | "view_all";
}) {
  sendGAEvent("event", "google_review_click", {
    market: opts.market,
    kind: opts.kind,
  });
}

/**
 * "View more reviews" inline-expand button fires this. Lets you measure
 * how many visitors are interested enough to read past the 5-star
 * default tier.
 */
export function trackViewMoreReviews(opts: { market: Market; hidden_count: number }) {
  sendGAEvent("event", "view_more_reviews", {
    market: opts.market,
    hidden_count: opts.hidden_count,
  });
}

/**
 * Fired on click of any blog post card on the index or related-post block.
 */
export function trackBlogClick(opts: { slug: string; surface: Surface }) {
  sendGAEvent("event", "blog_post_click", {
    post_slug: opts.slug,
    surface: opts.surface,
  });
}

/**
 * Fired on click of any gallery album card on the /gallery index or
 * "more albums" rail.
 */
export function trackGalleryClick(opts: { slug: string; surface: Surface }) {
  sendGAEvent("event", "gallery_album_click", {
    album_slug: opts.slug,
    surface: opts.surface,
  });
}

/**
 * Click on the "Apply to Teach" button on /teach. Distinct from
 * signup_click because the destination form is different.
 */
export function trackTeachApplyClick(opts: { surface: Surface }) {
  sendGAEvent("event", "teach_apply_click", {
    surface: opts.surface,
    destination: "fillout.com",
  });
}

/**
 * Footer social-icon clicks. Useful for measuring brand affinity.
 */
export function trackSocialClick(opts: { network: string }) {
  sendGAEvent("event", "social_click", {
    network: opts.network,
    surface: "footer" as Surface,
  });
}

/**
 * Contact channel (phone / email / WhatsApp) click on /contact.
 */
export function trackContactChannelClick(opts: {
  channel: "phone" | "email" | "whatsapp" | "address";
}) {
  sendGAEvent("event", "contact_channel_click", {
    channel: opts.channel,
    surface: "inline" as Surface,
  });
}
