"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
  { label: "Why EDUS", href: "/#why" },
  { label: "How It Works", href: "/#how" },
  { label: "Subjects", href: "/#subjects" },
  { label: "Stories", href: "/#stories" },
  { label: "FAQ", href: "/#faq" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className={`container-edge transition-all duration-300 ${scrolled ? "pt-3" : "pt-5"}`}>
        <div className={`relative flex items-center justify-between rounded-full px-3 sm:px-4 py-2 ${scrolled ? "glass-strong" : "glass"}`}>
          {/* Wordmark */}
          <Link href="/" className="flex items-center gap-2.5 pl-2">
            <Logo />
            <span className="font-[family-name:var(--font-display)] text-[19px] font-700 tracking-[-0.02em] text-[#102033]">EDUS</span>
            <span className="hidden sm:inline-block text-[10.5px] font-medium uppercase tracking-[0.16em] text-[#5A6A82]">
              Tutor
            </span>
          </Link>

          {/* Nav */}
          <nav className="hidden lg:flex items-center gap-1 text-[14px]">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="px-3.5 py-1.5 rounded-full text-[#2B3950] hover:text-[#102033] hover:bg-white/70 transition"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-2">
            <Link href="/enrol" className="hidden sm:inline-flex btn btn-ghost text-[13px] py-2 px-4">
              Enrol
            </Link>
            <Link href="/signup" className="btn btn-primary text-[13px] py-2 px-4">
              Sign Up
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <button
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden ml-1 inline-flex items-center justify-center w-9 h-9 rounded-full border border-[rgba(16,32,51,0.10)] bg-white/70 backdrop-blur text-[#102033]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile sheet */}
        {open && (
          <div className="lg:hidden mt-2 glass-strong rounded-3xl p-3 grid gap-1">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-2xl text-[#2B3950] hover:bg-white/70 text-[15px]"
              >
                {n.label}
              </Link>
            ))}
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Link href="/enrol" className="btn btn-ghost justify-center" onClick={() => setOpen(false)}>Enrol</Link>
              <Link href="/signup" className="btn btn-primary justify-center" onClick={() => setOpen(false)}>Sign Up</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function Logo() {
  return (
    <span className="relative inline-flex items-center justify-center w-9 h-9 rounded-2xl overflow-hidden">
      <span className="absolute inset-0 bg-gradient-to-br from-[#2563EB] via-[#8B5CF6] to-[#06B6D4]" />
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.55),transparent_55%)]" />
      <span className="relative font-[family-name:var(--font-display)] text-white text-[16px] font-700 leading-none">e</span>
      <span className="absolute -right-0.5 -bottom-0.5 w-3 h-3 rounded-full bg-[#FACC15] border border-white shadow-[0_0_10px_#FACC15]" />
    </span>
  );
}
