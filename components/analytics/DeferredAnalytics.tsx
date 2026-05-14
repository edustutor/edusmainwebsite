import Script from "next/script";

/**
 * Deferred Google Tag Manager + Google Analytics 4 loader.
 *
 * Why a custom component instead of @next/third-parties' built-ins:
 *   @next/third-parties uses `afterInteractive` which still loads GTM
 *   eagerly enough to compete with LCP for resource priority. On mobile
 *   3G/4G this drops Lighthouse Performance below 50.
 *
 *   `lazyOnload` waits until the browser is fully idle (post-load event)
 *   before fetching GTM. The trade-off is GA misses the very first
 *   pageview by a few hundred ms - but Vercel Analytics already covers
 *   the page-view metric, so this is net-zero data loss.
 *
 * Consent Mode v2 defaults are still set inline in <head> via
 * <ConsentDefaults>, so when GTM does load it already sees the denied
 * defaults and doesn't drop cookies until the user opts in.
 *
 * The <noscript> iframe is preserved (mirrors what @next/third-parties
 * renders) so visitors with JS disabled still get GTM page-view pings.
 */
export function DeferredAnalytics({ gtmId, ga4Id }: { gtmId: string; ga4Id: string }) {
  return (
    <>
      {/* GTM main script - lazyOnload defers loading until idle */}
      <Script
        id="gtm-script"
        strategy="lazyOnload"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`,
        }}
      />
      {/* GA4 - same lazyOnload strategy, fires alongside GTM */}
      <Script
        id="ga4-loader"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
      />
      <Script
        id="ga4-config"
        strategy="lazyOnload"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4Id}',{send_page_view:true});`,
        }}
      />
      {/* GTM noscript fallback - shown only when JS is disabled.
          Lives inside <body> via the layout's structure. */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager noscript fallback"
        />
      </noscript>
    </>
  );
}
