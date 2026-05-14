"use client";
import { useEffect } from "react";
import {
  trackSignupClick,
  trackRegionSelect,
  trackBlogClick,
  trackGalleryClick,
  trackTeachApplyClick,
  trackSocialClick,
  type Market,
  type Surface,
} from "@/lib/analytics";

/**
 * Global delegated click tracker. Mounts once in the root layout and
 * fires the right GA4 event for every CTA across the site based on the
 * anchor's href + a `data-track-surface` attribute on the nearest
 * ancestor.
 *
 * Why delegated, not per-component:
 *   - Signup links live in 30+ places (Hero, CTA blocks, mobile drawer,
 *     market pages, blog footers...). Wiring each one to trackSignupClick
 *     would create 30 client components.
 *   - One mount point => one source of truth. Adding a new signup CTA
 *     anywhere on the site automatically gets tracked.
 *
 * Surface inference:
 *   - We walk up the DOM looking for a `[data-track-surface]` attribute.
 *     Components that want a specific surface label set it on a wrapping
 *     div. Otherwise we default to "inline".
 *
 * Market inference:
 *   - Reads the pathname: /sl* => "sl", /in* => "in", /mv* => "mv",
 *     /global* => "global", / => "homepage", everything else => "unknown".
 *   - Lets reports segment "signup clicks from /sl" without per-link wiring.
 */
export function AnalyticsClickTracker() {
  useEffect(() => {
    const inferMarket = (): Market => {
      const p = window.location.pathname;
      if (p === "/") return "homepage";
      if (p.startsWith("/sl")) return "sl";
      if (p.startsWith("/in")) return "in";
      if (p.startsWith("/mv")) return "mv";
      if (p.startsWith("/global")) return "global";
      return "unknown";
    };

    const inferSurface = (el: HTMLElement): Surface => {
      const surfaceEl = el.closest<HTMLElement>("[data-track-surface]");
      const raw = surfaceEl?.dataset.trackSurface;
      // Whitelist - drop any value not in our Surface union
      const allowed: Surface[] = [
        "hero",
        "pricing",
        "footer",
        "header",
        "cta_section",
        "region_selector",
        "other_markets",
        "card",
        "faq",
        "inline",
      ];
      if (raw && (allowed as readonly string[]).includes(raw)) {
        return raw as Surface;
      }
      return "inline";
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const href = anchor.href;
      if (!href) return;

      const market = inferMarket();
      const surface = inferSurface(anchor);

      // Signup portal - primary lead conversion event
      if (href.includes("signup.edustutor.com")) {
        trackSignupClick({ market, surface });
        return;
      }

      // Teach apply form (Fillout)
      if (href.includes("forms.fillout.com")) {
        trackTeachApplyClick({ surface });
        return;
      }

      // Footer social network links
      const socialMatch = href.match(
        /^https:\/\/(?:www\.)?(facebook|instagram|tiktok|youtube|linkedin)\.com/i,
      );
      if (socialMatch) {
        trackSocialClick({ network: socialMatch[1].toLowerCase() });
        return;
      }

      // Region selection - any internal link to a market page
      // Distinguish "destination" from current "market" so we capture
      // navigations between markets distinctly from clicks on the same-
      // market in-page anchors.
      const internalMarketHrefs: Array<[RegExp, Market]> = [
        [/\/sl(?:\/|\?|$)/, "sl"],
        [/\/in(?:\/|\?|$)/, "in"],
        [/\/mv(?:\/|\?|$)/, "mv"],
        [/\/global(?:\/|\?|$)/, "global"],
      ];
      // Only count as region_select when surface is region_selector or other_markets
      if (surface === "region_selector" || surface === "other_markets") {
        for (const [pattern, dest] of internalMarketHrefs) {
          if (pattern.test(anchor.pathname)) {
            trackRegionSelect({
              destination: dest,
              surface: surface as "region_selector" | "other_markets",
            });
            return;
          }
        }
      }

      // Blog post detail clicks
      const blogMatch = anchor.pathname.match(/^\/blog\/([^/]+)$/);
      if (blogMatch) {
        trackBlogClick({ slug: blogMatch[1], surface });
        return;
      }

      // Gallery album detail clicks
      const galleryMatch = anchor.pathname.match(/^\/gallery\/([^/]+)$/);
      if (galleryMatch) {
        trackGalleryClick({ slug: galleryMatch[1], surface });
        return;
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
