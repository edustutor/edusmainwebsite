"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
  { label: "Markets", href: "/#choose-region" },
  { label: "Method", href: "/how-it-works" },
  { label: "Outcomes", href: "/success-stories" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const [open, setOpen] = useState(false);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-colors duration-200 ${scrolled ? "bg-[#F4F2ED]/85 backdrop-blur-md border-b border-[rgba(14,20,33,0.08)]" : ""}`}>
      <div className="container-wide">
        <div className="flex items-center justify-between h-16">
          {/* Wordmark */}
          <Link href="/" className="flex items-center gap-3">
            <span className="font-display text-[26px] tracking-[-0.04em] leading-none text-[#0E1421]">
              EDUS
            </span>
            <span className="hidden sm:inline-block w-px h-4 bg-[rgba(14,20,33,0.20)]" />
            <span className="hidden sm:inline-block font-mono text-[10px] tracking-[0.22em] uppercase text-[#6B7390]">
              Tutor / Est. 2020
            </span>
          </Link>

          {/* Nav — slim, all-uppercase, monospaced */}
          <nav className="hidden lg:flex items-center gap-7 text-[12px] font-mono tracking-[0.16em] uppercase">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-[#2C334A] hover:text-[#0E1421] transition"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <Link
              href="/enrol"
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-[12px] font-mono tracking-[0.12em] uppercase border border-[rgba(14,20,33,0.20)] text-[#0E1421] hover:bg-[#0E1421] hover:text-[#F4F2ED] transition"
            >
              Enrol
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-[12px] font-mono tracking-[0.12em] uppercase bg-[#0E1421] text-[#F4F2ED] hover:bg-[#1640D8] transition"
            >
              Sign Up
              <span className="font-display italic">→</span>
            </Link>
            <button
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden ml-1 inline-flex items-center justify-center w-9 h-9 border border-[rgba(14,20,33,0.20)] text-[#0E1421]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[rgba(14,20,33,0.08)] bg-[#F4F2ED]/95 backdrop-blur-md">
          <div className="container-edge py-4 grid gap-1">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="px-1 py-3 font-mono text-[12px] tracking-[0.16em] uppercase text-[#2C334A] hover:text-[#0E1421] border-b border-[rgba(14,20,33,0.06)]"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
