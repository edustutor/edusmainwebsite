"use client";

import { whatsappUrl } from "@/lib/overseas/data";
import { OvIcon } from "@/components/overseas/OvIcon";

/**
 * Floating WhatsApp button for EDUS Overseas. The contact number is the
 * conversion target for this section, so a persistent one-tap WhatsApp
 * action sits bottom-right on every overseas page.
 */
export function OverseasWhatsApp() {
  const message = "Hi EDUS Overseas, I would like a free study abroad consultation.";
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with EDUS Overseas on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center justify-center w-14 h-14 rounded-full shadow-lg ov-pulse"
      style={{
        background: "linear-gradient(135deg, #25D366, #128C7E)",
        boxShadow: "0 12px 30px -8px rgba(18,140,126,0.6)",
      }}
    >
      <OvIcon name="whatsapp" size={28} tint="#fff" />
    </a>
  );
}
