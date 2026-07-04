import type { Metadata } from "next";
import { CallNow } from "@/components/call/CallNow";

/**
 * /call - one-tap hotline shortcut.
 *
 * Visiting edustutor.com/call auto-opens the phone dialer with the EDUS
 * hotline pre-filled (via a client-side redirect to tel:), and shows a
 * large "Call now" button + the number as the reliable fallback. Handy
 * for print / QR codes / social bios where a short, memorable link that
 * "just calls us" is more useful than a full contact page.
 *
 * The EDUS common hotline number lives here as the single source of
 * truth for this page.
 */

const HOTLINE_DISPLAY = "+94 70 707 2072";
const HOTLINE_TEL = "tel:+94707072072";

export const metadata: Metadata = {
  title: { absolute: "Call EDUS Hotline" },
  description: "Call the EDUS hotline. Tap to dial +94 70 707 2072 and speak to our team about online classes, admissions, and support.",
  // Utility redirect page - keep it OUT of the index so it never shows in
  // search results or trips Google's thin-content / soft-404 checks.
  robots: { index: false, follow: true },
  alternates: { canonical: "/call" },
};

export default function CallPage() {
  return (
    <>
      {/* Fire the dialer the INSTANT the HTML parses - before React even
          hydrates - so the call starts as fast as physically possible.
          The <CallNow> component below is the visible UI + a redundant
          post-hydration trigger + the tap-to-call fallback. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `try{window.location.href=${JSON.stringify(HOTLINE_TEL)}}catch(e){}`,
        }}
      />
      <CallNow telHref={HOTLINE_TEL} display={HOTLINE_DISPLAY} />
    </>
  );
}
