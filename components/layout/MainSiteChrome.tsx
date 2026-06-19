"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Atmosphere } from "@/components/effects/Atmosphere";
import { ChatBotMount } from "@/components/chatbot/ChatBotMount";
import { ProjectPromoPopup } from "@/components/promo/ProjectPromoPopup";

/**
 * Gate for the MAIN EDUS tuition site chrome.
 *
 * The EDUS Overseas Consultancy section (/overseas) is a separately
 * branded experience with its own header, footer, atmosphere, and (later)
 * its own chatbot. It must NOT show the tuition site's blue/violet header,
 * footer, background atmosphere, 9A promo popup, or admissions chatbot.
 *
 * Next.js forces a single mandatory root layout (it owns <html>/<body>),
 * so a nested route-group layout cannot REMOVE parent chrome. Instead we
 * gate the tuition chrome here on the pathname: on /overseas the tuition
 * shell renders nothing and the overseas layout supplies its own.
 *
 * `position`:
 *   - "frame"   -> header + atmosphere wrap (rendered around <main>)
 *   - "footer"  -> footer + global popups + chatbot (rendered after <main>)
 * Split into two slots so the root layout keeps <main> in the middle.
 */
export function MainSiteChrome({
  position,
  children,
}: {
  position: "frame" | "footer";
  children?: React.ReactNode;
}) {
  const pathname = usePathname();
  const isOverseas = pathname === "/overseas" || pathname.startsWith("/overseas/");

  if (position === "frame") {
    // On the overseas section, render only <main> with no tuition chrome.
    if (isOverseas) return <>{children}</>;
    return (
      <>
        <Atmosphere />
        <SiteHeader />
        {children}
      </>
    );
  }

  // position === "footer"
  if (isOverseas) return null;
  return (
    <>
      <SiteFooter />
      <ChatBotMount />
      <ProjectPromoPopup />
    </>
  );
}
