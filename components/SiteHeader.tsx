"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
  { label: "Choose Region", href: "/#choose-region" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 ${scrolled ? "pt-3" : "pt-5"}`}>
        <div
          className={`relative flex items-center justify-between rounded-full px-3 sm:px-4 py-2 ${
            scrolled
              ? "glass"
              : "border border-[rgba(10,18,48,0.06)] bg-white/60 backdrop-blur-md"
          }`}
        >
          <Link href="/" className="flex items-center gap-2.5 pl-2">
            <Logo />
            <span className="font-display text-xl tracking-tight text-[#0A1230]">EDUS</span>
            <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-[0.18em] text-[#5C6485]">/ tutor</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 text-sm">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="px-3 py-1.5 rounded-full text-[#2B3458] hover:text-[#0A1230] hover:bg-[rgba(10,18,48,0.04)]"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/enrol" className="hidden sm:inline-flex btn btn-ghost">Enrol</Link>
            <Link href="/signup" className="btn btn-primary">
              Sign Up
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <button
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden ml-1 inline-flex items-center justify-center w-9 h-9 rounded-full border border-[rgba(10,18,48,0.10)] text-[#2B3458] bg-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden mt-2 glass rounded-3xl p-3 grid gap-1">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-2xl text-[#2B3458] hover:bg-[rgba(10,18,48,0.04)]"
              >
                {n.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

function Logo() {
  return (
    <span className="relative inline-flex items-center justify-center w-8 h-8 rounded-xl overflow-hidden">
      <span className="absolute inset-0 bg-gradient-to-br from-[#3D80FF] to-[#0A55F5]" />
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.55),transparent_55%)]" />
      <span className="relative font-display text-white text-[15px] leading-none">e</span>
      <span className="absolute -right-0.5 -bottom-0.5 w-2.5 h-2.5 rounded-full bg-[#FFC21A]" />
    </span>
  );
}
