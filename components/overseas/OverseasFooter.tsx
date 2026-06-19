import Link from "next/link";
import { OV, DESTINATIONS, whatsappUrl } from "@/lib/overseas/data";
import { OvIcon } from "@/components/overseas/OvIcon";

/**
 * EDUS Overseas footer - warm, distinct from the tuition site. Links the
 * destinations and services, repeats the contact number (conversion
 * target), and points back to the main EDUS tuition site.
 */
export function OverseasFooter() {
  const year = new Date().getFullYear();
  const waMessage = "Hi EDUS Overseas, I would like a free study abroad consultation.";

  return (
    <footer className="relative mt-20 border-t border-[var(--ov-rule)]">
      <div className="container-edge py-14">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand + contact */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2.5">
              <span
                className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-white font-display font-800 text-[18px]"
                style={{ background: "linear-gradient(135deg, #FF5A5F, #F59E0B)" }}
              >
                E
              </span>
              <span className="font-display font-800 text-[16px] text-[var(--ov-ink)]">
                EDUS Overseas
              </span>
            </div>
            <p className="mt-4 text-[13.5px] text-[var(--ov-ink-soft)] leading-relaxed max-w-xs">
              {OV.brand}. {OV.tagline}. Expert guidance for admissions,
              scholarships, and student visas to the UK, Australia, Canada,
              Dubai, Ireland, and New Zealand.
            </p>
            <div className="mt-5 flex flex-col gap-2 text-[13.5px]">
              <a href={`tel:${OV.phoneTel}`} className="inline-flex items-center gap-2 text-[var(--ov-ink)] font-600">
                <OvIcon name="phone" size={16} tint="var(--ov-coral-deep)" />
                {OV.phoneDisplay}
              </a>
              <a href={`mailto:${OV.email}`} className="inline-flex items-center gap-2 text-[var(--ov-ink-soft)]">
                <OvIcon name="mail" size={16} tint="var(--ov-teal-deep)" />
                {OV.email}
              </a>
              <span className="inline-flex items-start gap-2 text-[var(--ov-ink-soft)]">
                <OvIcon name="pin" size={16} tint="var(--ov-violet)" style={{ marginTop: 2 }} />
                {OV.addressLine}
              </span>
            </div>
          </div>

          {/* Destinations */}
          <div className="md:col-span-3">
            <p className="font-display font-700 text-[13px] text-[var(--ov-ink)] uppercase tracking-wide">
              Destinations
            </p>
            <ul className="mt-4 space-y-2.5">
              {DESTINATIONS.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/overseas/${d.slug}`}
                    className="text-[13.5px] text-[var(--ov-ink-soft)] hover:text-[var(--ov-coral-deep)] transition-colors"
                  >
                    Study in {d.short}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div className="md:col-span-2">
            <p className="font-display font-700 text-[13px] text-[var(--ov-ink)] uppercase tracking-wide">
              Company
            </p>
            <ul className="mt-4 space-y-2.5">
              <li><Link href="/overseas" className="text-[13.5px] text-[var(--ov-ink-soft)] hover:text-[var(--ov-coral-deep)]">Home</Link></li>
              <li><Link href="/overseas#services" className="text-[13.5px] text-[var(--ov-ink-soft)] hover:text-[var(--ov-coral-deep)]">Services</Link></li>
              <li><Link href="/overseas/about" className="text-[13.5px] text-[var(--ov-ink-soft)] hover:text-[var(--ov-coral-deep)]">About Us</Link></li>
              <li><Link href="/overseas/contact" className="text-[13.5px] text-[var(--ov-ink-soft)] hover:text-[var(--ov-coral-deep)]">Contact</Link></li>
              <li><a href="https://edus.lk" className="text-[13.5px] text-[var(--ov-ink-soft)] hover:text-[var(--ov-coral-deep)]">EDUS Tuition</a></li>
            </ul>
          </div>

          {/* CTA */}
          <div className="md:col-span-3">
            <p className="font-display font-700 text-[13px] text-[var(--ov-ink)] uppercase tracking-wide">
              Start your journey
            </p>
            <p className="mt-4 text-[13.5px] text-[var(--ov-ink-soft)] leading-relaxed">
              Free consultation. No obligation. Talk to a counsellor today.
            </p>
            <div className="mt-4 flex flex-col gap-2.5">
              <a
                href={whatsappUrl(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="ov-btn ov-btn-teal !py-2.5 text-[14px]"
              >
                <OvIcon name="whatsapp" size={18} tint="#fff" />
                Chat on WhatsApp
              </a>
              <a href={`tel:${OV.phoneTel}`} className="ov-btn ov-btn-primary !py-2.5 text-[14px]">
                <OvIcon name="phone" size={16} tint="#fff" />
                Call {OV.phoneDisplay}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--ov-rule)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12.5px] text-[var(--ov-ink-mute)]">
            © {year} {OV.brand}. All rights reserved.
          </p>
          <p className="text-[12.5px] text-[var(--ov-ink-mute)]">
            A part of EDUS. Powered by EDUS Lanka (Pvt) Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
}
