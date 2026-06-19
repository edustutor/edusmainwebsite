import type { Metadata } from "next";
import { JsonLdScript } from "@/components/layout/StructuredData";
import { OvIcon } from "@/components/overseas/OvIcon";
import { ConsultationForm } from "@/components/overseas/ConsultationForm";
import { OV, whatsappUrl } from "@/lib/overseas/data";
import {
  overseasOrganization,
  overseasWebPage,
  overseasBreadcrumb,
} from "@/lib/overseas/schema";

/**
 * EDUS Overseas Consultancy - Contact page. Address, phone, email, Google
 * Map, WhatsApp button, and the consultation form (the requirements doc's
 * contact-form requirement is fulfilled by the same WhatsApp/email form).
 */

export const metadata: Metadata = {
  metadataBase: new URL(OV.siteBase),
  title: { absolute: "Contact EDUS Overseas Consultancy | Sri Lanka" },
  description:
    "Contact EDUS Overseas Consultancy for free study abroad guidance. Call or WhatsApp +94 70 701 2333, email us, or visit our office in Jaffna. We reply within one working day.",
  alternates: { canonical: "/overseas/contact" },
  keywords: [
    "contact EDUS Overseas",
    "study abroad consultants contact Sri Lanka",
    "EDUS Overseas phone number",
    "EDUS Overseas Jaffna",
    "overseas education consultant near me",
  ],
  openGraph: {
    title: "Contact EDUS Overseas Consultancy",
    description:
      "Call or WhatsApp +94 70 701 2333 for free study abroad guidance. From Dreams to Destinations.",
    type: "website",
    url: `${OV.siteBase}/overseas/contact`,
    siteName: OV.brand,
    images: [{ url: "/edus-og.jpg", width: 1200, height: 630, alt: "Contact EDUS Overseas Consultancy" }],
  },
};

const CONTACT_CARDS = [
  { icon: "phone", label: "Call us", value: OV.phoneDisplay, href: `tel:${OV.phoneTel}`, tint: "#FF5A5F" },
  { icon: "whatsapp", label: "WhatsApp", value: OV.phoneDisplay, href: whatsappUrl("Hi EDUS Overseas, I would like a free study abroad consultation."), tint: "#128C7E" },
  { icon: "mail", label: "Email us", value: OV.email, href: `mailto:${OV.email}`, tint: "#7C3AED" },
];

export default function OverseasContact() {
  const mapsEmbed = `https://www.google.com/maps?q=${OV.geo.lat},${OV.geo.lng}&z=15&output=embed`;

  return (
    <>
      <JsonLdScript data={overseasOrganization()} />
      <JsonLdScript data={overseasWebPage({
        name: "Contact EDUS Overseas Consultancy",
        description:
          "Contact EDUS Overseas Consultancy for free study abroad guidance. Call or WhatsApp, email, or visit our Jaffna office.",
        path: "/overseas/contact",
      })} />
      <JsonLdScript data={overseasBreadcrumb([
        { name: "Home", path: "/overseas" },
        { name: "Contact", path: "/overseas/contact" },
      ])} />

      {/* Hero */}
      <section className="relative overflow-hidden pt-10 sm:pt-14 pb-2">
        <div aria-hidden className="absolute inset-0 -z-10">
          <span className="ov-blob" style={{ top: "-8%", right: "-6%", width: 340, height: 340, background: "#FF5A5F", opacity: 0.2 }} />
          <span className="ov-blob" style={{ top: "12%", left: "-8%", width: 320, height: 320, background: "#FFB23E", opacity: 0.18 }} />
        </div>
        <div className="container-edge max-w-3xl mx-auto text-center">
          <p className="ov-eyebrow justify-center"><span className="ov-dot" />Contact Us</p>
          <h1 className="ov-heading mt-5" style={{ fontSize: "var(--fs-display)", lineHeight: 1.1 }}>
            Let's plan your <em>journey abroad.</em>
          </h1>
          <p className="mt-5 text-[16px] text-[var(--ov-ink-soft)] leading-relaxed">
            Have a question or ready to start? Call, WhatsApp, or email us, or
            send the form below. A counsellor replies within one working day.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="container-edge ov-section">
        <div className="grid gap-4 sm:grid-cols-3">
          {CONTACT_CARDS.map((c) => (
            <a key={c.label} href={c.href} target={c.icon === "phone" ? undefined : "_blank"} rel="noopener noreferrer" className="ov-glass ov-lift rounded-2xl p-6 text-center">
              <span className="mx-auto inline-flex w-12 h-12 rounded-2xl items-center justify-center" style={{ background: c.tint }}>
                <OvIcon name={c.icon} size={24} tint="#fff" />
              </span>
              <p className="mt-4 text-[12px] text-[var(--ov-ink-mute)] uppercase tracking-wide font-700">{c.label}</p>
              <p className="mt-1 font-display font-800 text-[16px] text-[var(--ov-ink)] break-words">{c.value}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Map + address + form */}
      <section className="container-edge ov-section">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: address + map */}
          <div>
            <div className="ov-glass rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <span className="inline-flex w-11 h-11 rounded-xl items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg,#7C3AED,#FF5A5F)" }}>
                  <OvIcon name="pin" size={22} tint="#fff" />
                </span>
                <div>
                  <p className="font-display font-700 text-[15px] text-[var(--ov-ink)]">Our Office</p>
                  <p className="mt-1 text-[13.5px] text-[var(--ov-ink-soft)] leading-[1.7]">{OV.addressLine}</p>
                  <a href={OV.mapsShare} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-700 text-[var(--ov-coral-deep)]">
                    Open in Google Maps <OvIcon name="arrow" size={14} tint="var(--ov-coral-deep)" />
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-5 ov-glass rounded-2xl overflow-hidden">
              <iframe
                title="EDUS Overseas Consultancy office location map"
                src={mapsEmbed}
                width="100%"
                height="320"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          {/* Right: form */}
          <div id="consultation" className="scroll-mt-24">
            <p className="ov-eyebrow"><span className="ov-dot" />Send a Message</p>
            <h2 className="ov-heading mt-4 mb-6" style={{ fontSize: "var(--fs-h2)" }}>
              Request your <em>free consultation</em>
            </h2>
            <ConsultationForm />
          </div>
        </div>
      </section>
    </>
  );
}
