"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import { m, AnimatePresence } from "@/components/Motion";

const NAV = [
  { label: "Why EDUS", href: "/#why" },
  { label: "How It Works", href: "/#how" },
  { label: "Subjects", href: "/#subjects" },
  { label: "Stories", href: "/#stories" },
  { label: "FAQ", href: "/#faq" },
];

export const SIGN_UP_URL = "https://signup.edustutor.com/";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  const paddingTop = useTransform(scrollY, [0, 80], [20, 12]);
  const blurPx = useTransform(scrollY, [0, 80], [12, 24]);
  const bgAlpha = useTransform(scrollY, [0, 80], [0.55, 0.85]);
  const shadowOpacity = useTransform(scrollY, [0, 80], [0.04, 0.16]);

  return (
    <m.header className="fixed top-0 inset-x-0 z-50">
      <m.div className="container-edge" style={{ paddingTop }}>
        <m.div
          className="relative flex items-center justify-between rounded-full px-3 sm:px-4 py-2"
          style={{
            backdropFilter: useTransform(blurPx, (v) => `blur(${v}px) saturate(170%)`),
            WebkitBackdropFilter: useTransform(blurPx, (v) => `blur(${v}px) saturate(170%)`),
            backgroundColor: useTransform(bgAlpha, (v) => `rgba(255,255,255,${v})`),
            boxShadow: useTransform(
              shadowOpacity,
              (v) => `inset 0 1px 0 rgba(255,255,255,0.95), 0 12px 36px -16px rgba(16,32,51,${v})`,
            ),
            border: "1px solid rgba(255,255,255,0.7)",
          }}
        >
          <Link href="/" aria-label="EDUS" className="flex items-center pl-1.5">
            <Image
              src="/edus_logo_blue.webp"
              alt="EDUS"
              width={180}
              height={56}
              priority
              className="h-10 sm:h-11 w-auto"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1 text-[14px]">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="px-3.5 py-1.5 rounded-full text-[#2B3950] hover:text-[#102033] hover:bg-white/70 transition-colors"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={SIGN_UP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary text-[13px] py-2 px-4"
            >
              Sign Up
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <button
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden ml-1 inline-flex items-center justify-center w-9 h-9 rounded-full border border-[rgba(16,32,51,0.10)] bg-white/70 backdrop-blur text-[#102033]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </m.div>

        {/* Mobile sheet — pure white solid (no glass) so background text never bleeds through */}
        <AnimatePresence>
          {open && (
            <m.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.25, 0.8, 0.3, 1] }}
              className="lg:hidden mt-2 rounded-3xl p-4 grid gap-1 bg-white border border-[rgba(16,32,51,0.10)] shadow-[0_18px_40px_-16px_rgba(16,32,51,0.18)]"
            >
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-2xl text-[#2B3950] hover:bg-[#F4F8FF] text-[15px] font-medium"
                >
                  {n.label}
                </Link>
              ))}
              <a
                href={SIGN_UP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary justify-center mt-2"
                onClick={() => setOpen(false)}
              >
                Sign Up
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </m.div>
          )}
        </AnimatePresence>
      </m.div>
    </m.header>
  );
}
