import { OverseasHeader } from "@/components/overseas/OverseasHeader";
import { OverseasFooter } from "@/components/overseas/OverseasFooter";
import { OverseasWhatsApp } from "@/components/overseas/OverseasWhatsApp";

/**
 * EDUS Overseas Consultancy route-group layout.
 *
 * This sits UNDER the mandatory root layout (app/layout.tsx) but supplies
 * a completely separate visual shell: the `.overseas` theme wrapper (warm
 * sunset palette defined in globals.css), its own header + footer, its own
 * warm background atmosphere, and a floating WhatsApp button. The root
 * layout's tuition chrome (blue header, footer, atmosphere, chatbot, 9A
 * promo) is suppressed on /overseas by MainSiteChrome.
 *
 * The route group folder name "(overseas)" is not part of the URL - all
 * pages live under app/(overseas)/overseas/... so the public path is
 * edus.lk/overseas, edus.lk/overseas/about, edus.lk/overseas/uk, etc.
 */
export default function OverseasLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="overseas relative min-h-screen">
      {/* Warm background atmosphere (CSS-only, scoped to .overseas) */}
      <div aria-hidden className="ov-atmosphere" />
      <OverseasHeader />
      {/* pt offsets the fixed header */}
      <main className="relative z-10 pt-16 sm:pt-[72px]">{children}</main>
      <OverseasFooter />
      <OverseasWhatsApp />
    </div>
  );
}
