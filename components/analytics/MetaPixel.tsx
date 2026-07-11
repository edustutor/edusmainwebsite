"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { readConsent } from "@/lib/consent";

/**
 * Meta (Facebook) Pixel loader - consent-gated + lazy.
 *
 * Meta Pixel is an ADVERTISING tracker, so it loads ONLY when the visitor
 * grants the "advertising" consent category (Consent Mode v2). This is the
 * PDPA / GDPR-correct behaviour: no ad pixel fires until opt-in. It mirrors
 * TikTokPixel exactly.
 *
 * Loading strategy:
 *   - strategy="lazyOnload" so the ~70 KB fbevents.js waits until the
 *     browser is idle (post-load), protecting LCP on mobile.
 *   - We only RENDER the <Script> once advertising consent is present, so a
 *     visitor who never opts in never downloads the script at all - which is
 *     also why the Lighthouse audit (no consent cookie) stays clean.
 *
 * Consent reactivity:
 *   - On mount we read the stored consent.
 *   - We also listen for the `edus:consent-update` window event the
 *     ConsentBanner dispatches, so granting consent mid-session loads the
 *     pixel immediately without a page reload.
 *
 * The pixel ID is passed in from the server (app/layout.tsx) via the
 * NEXT_PUBLIC_META_PIXEL_ID env var so it's configurable per environment and
 * never hardcoded in two places.
 *
 * NOTE on the <noscript> fallback: the standard Meta snippet ships a
 * <noscript><img .../></noscript> beacon. We intentionally do NOT render it,
 * because (a) it would fire for consent-less no-JS visitors, defeating the
 * consent gate, and (b) React 19 rejects a bare <noscript> in some mount
 * positions. The JS pixel already covers the ~99% of visitors with JS.
 */
export function MetaPixel({ pixelId }: { pixelId: string }) {
  const [adsConsented, setAdsConsented] = useState(false);

  useEffect(() => {
    // Initial read - did the visitor already grant advertising consent in a
    // previous session (within the 13-month window)?
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
        // Consent revoked - we can't un-inject the script, but we stop it
        // from RE-loading on the next render.
        setAdsConsented(false);
      }
    };
    window.addEventListener("edus:consent-update", onConsentUpdate);
    return () =>
      window.removeEventListener("edus:consent-update", onConsentUpdate);
  }, []);

  // No pixel ID configured OR advertising consent not granted -> render
  // nothing. The visitor never downloads the Meta Pixel script.
  if (!pixelId || !adsConsented) return null;

  return (
    <Script id="meta-pixel" strategy="lazyOnload">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${pixelId}');
        fbq('track', 'PageView');
      `}
    </Script>
  );
}
