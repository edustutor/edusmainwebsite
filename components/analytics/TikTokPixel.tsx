"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { readConsent } from "@/lib/consent";

/**
 * TikTok Pixel loader - consent-gated + lazy.
 *
 * TikTok is an ADVERTISING tracker, so it loads ONLY when the visitor
 * grants the "advertising" consent category (Consent Mode v2). This is
 * the PDPA / GDPR-correct behaviour: no ad pixel fires until opt-in.
 *
 * Loading strategy mirrors DeferredAnalytics (GA4 / GTM):
 *   - strategy="lazyOnload" so the ~30 KB pixel script waits until the
 *     browser is idle (post-load), protecting LCP on mobile.
 *   - We only RENDER the <Script> once advertising consent is present,
 *     so a visitor who never opts in never downloads the script at all.
 *
 * Consent reactivity:
 *   - On mount we read the stored consent.
 *   - We also listen for the `edus:consent-update` window event the
 *     ConsentBanner dispatches, so granting consent mid-session loads
 *     the pixel immediately without a page reload.
 *
 * The pixel ID is passed in from the server (app/layout.tsx) via the
 * NEXT_PUBLIC_TIKTOK_PIXEL_ID env var so it's configurable per
 * environment and never hardcoded in two places.
 */
export function TikTokPixel({ pixelId }: { pixelId: string }) {
  const [adsConsented, setAdsConsented] = useState(false);

  useEffect(() => {
    // Initial read - did the visitor already grant advertising consent
    // in a previous session (within the 13-month window)?
    const initial = readConsent();
    if (initial?.categories.advertising) {
      setAdsConsented(true);
    }

    // React to live consent changes from the banner.
    const onConsentUpdate = (e: Event) => {
      const detail = (e as CustomEvent).detail as
        | { categories?: { advertising?: boolean } }
        | null;
      if (detail?.categories?.advertising) {
        setAdsConsented(true);
      } else {
        // Consent revoked - we can't un-inject the script, but we stop
        // it from RE-loading on the next render. The TikTok SDK itself
        // respects the revokeConsent call if you wire one; for now we
        // simply don't render the loader.
        setAdsConsented(false);
      }
    };
    window.addEventListener("edus:consent-update", onConsentUpdate);
    return () =>
      window.removeEventListener("edus:consent-update", onConsentUpdate);
  }, []);

  // No pixel ID configured OR advertising consent not granted -> render
  // nothing. The visitor never downloads the TikTok script.
  if (!pixelId || !adsConsented) return null;

  return (
    <Script id="tiktok-pixel" strategy="lazyOnload">
      {`
        !function (w, d, t) {
          w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
          ttq.load('${pixelId}');
          ttq.page();
        }(window, document, 'ttq');
      `}
    </Script>
  );
}
