/**
 * Google Consent Mode v2 default state. Tells GA4, Microsoft Clarity,
 * and any other Google-aware tag in the GTM container how to behave
 * BEFORE the user makes a consent choice.
 *
 * Rendered as a plain inline <script> via the dangerouslySetInnerHTML
 * pattern Next.js documents for tracking scripts that MUST run before
 * everything else. Inline (not external) so there is zero render-blocking
 * network cost. The script body is ~600 bytes, gzipped to ~250.
 *
 * Granted defaults:
 *   - functionality_storage: granted (language preference, etc.)
 *   - security_storage:      granted (anti-fraud, auth)
 *
 * Denied defaults (until consent banner ships):
 *   - ad_storage, ad_user_data, ad_personalization
 *   - analytics_storage (forces GA4 into cookieless-ping mode)
 *   - personalization_storage
 *
 * Once the GTM container has each tag configured to honour Consent Mode
 * v2, this default state alone is enough to stop Microsoft Clarity +
 * any other 3rd-party tag from dropping cookies. The Clarity tag inside
 * GTM still needs to be flagged "Wait for consent" in the GTM UI.
 */
export function ConsentDefaults() {
  return (
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html:
          "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',personalization_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});gtag('set','ads_data_redaction',true);gtag('set','url_passthrough',true);",
      }}
    />
  );
}
