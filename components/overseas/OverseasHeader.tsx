"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { OV, whatsappUrl } from "@/lib/overseas/data";
import { OvIcon } from "@/components/overseas/OvIcon";

/**
 * EDUS Overseas header - deliberately distinct from the tuition site.
 * Warm wordmark, compact nav, and a coral "Book Free Consultation" CTA
 * that drives to the consultation form. A WhatsApp quick-action sits
 * beside it because the contact number is the conversion target.
 */

const NAV = [
  { label: "Home", href: "/overseas" },
  { label: "Destinations", href: "/overseas#destinations" },
  { label: "Services", href: "/overseas#services" },
  { label: "About", href: "/overseas/about" },
  { label: "Contact", href: "/overseas/contact" },
];

export function OverseasHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change.
  useEffect(() => setOpen(false), [pathname]);

  const waMessage = `Hi EDUS Overseas, I would like a free study abroad consultation.`;

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div
        className={`transition-all duration-300 ${
          scrolled ? "ov-glass-strong" : "bg-transparent"
        }`}
        style={scrolled ? { borderRadius: 0 } : undefined}
      >
        <div className="container-edge flex items-center justify-between h-16 sm:h-[72px]">
          {/* Wordmark */}
          <Link href="/overseas" className="flex items-center gap-2.5 shrink-0">
            <span
              className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-white font-display font-800 text-[18px]"
              style={{ background: "linear-gradient(135deg, #FF5A5F, #F59E0B)" }}
            >
              E
            </span>
            <span className="leading-none">
              <span className="block font-display font-800 text-[16px] text-[var(--ov-ink)] tracking-tight">
                EDUS <span className="ov-shimmer">Overseas</span>
              </span>
              <span className="block text-[10.5px] font-600 text-[var(--ov-ink-mute)] tracking-wide">
                {OV.tagline}
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-display font-600 text-[14px] text-[var(--ov-ink-soft)] hover:text-[var(--ov-coral-deep)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href={whatsappUrl(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white"
              style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
            >
              <OvIcon name="whatsapp" size={20} tint="#fff" />
            </a>
            <Link href="/overseas#consultation" className="ov-btn ov-btn-primary !py-2.5 !px-4 text-[13.5px]">
              Book Free Consultation
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
            aria-expanded={open}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl ov-glass"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ov-ink)" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="lg:hidden ov-glass-strong border-t border-[var(--ov-rule)]">
            <nav className="container-edge py-4 flex flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-display font-600 text-[15px] text-[var(--ov-ink)] py-2.5 border-b border-[var(--ov-rule)] last:border-0"
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex gap-2.5 mt-3">
                <a
                  href={whatsappUrl(waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ov-btn ov-btn-teal flex-1 !py-2.5 text-[14px]"
                >
                  <OvIcon name="whatsapp" size={18} tint="#fff" />
                  WhatsApp
                </a>
                <Link href="/overseas#consultation" className="ov-btn ov-btn-primary flex-1 !py-2.5 text-[14px]">
                  Free Consultation
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
