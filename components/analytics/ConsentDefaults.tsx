import Script from "next/script";

/**
 * Google Consent Mode v2 default state. Tells GA4, Microsoft Clarity,
 * and any other Google-aware tag in the GTM container how to behave
 * BEFORE the user makes a consent choice (or, in EDUS's current setup,
 * for visitors who never see a consent UI at all).
 *
 * The result: GA4 + Clarity run in "cookieless ping" mode by default.
 * No 3rd-party cookies are dropped until the visitor explicitly opts in
 * via a banner, which means Lighthouse stops penalising the page for
 * the cookie warning, and we stay compliant with Chrome's 3rd-party
 * cookie deprecation (live 2026).
 *
 * Granted defaults:
 *   - functionality_storage: granted (essential, e.g. language preference)
 *   - security_storage:      granted (auth, anti-fraud)
 *
 * Denied defaults (until consent banner is built):
 *   - ad_storage:            denied (no advertising cookies)
 *   - ad_user_data:          denied (no user-level ad data)
 *   - ad_personalization:    denied (no personalised ad targeting)
 *   - analytics_storage:     denied (cookieless GA4 pings only)
 *   - personalization_storage: denied
 *
 * Region overrides could be added later (e.g. `region: ['IN']` to relax
 * defaults for non-EU regions), but for now the conservative blanket
 * default is correct.
 *
 * Loaded with strategy="beforeInteractive" so the consent state is set
 * BEFORE GTM / GA4 scripts evaluate.
 */
export function ConsentDefaults() {
  return (
    <Script
      id="google-consent-defaults"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  personalization_storage: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
  wait_for_update: 500
});
gtag('set', 'ads_data_redaction', true);
gtag('set', 'url_passthrough', true);
        `.trim(),
      }}
    />
  );
}
