"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * Global error boundary. Triggered by Next.js when an unhandled error
 * surfaces during render. Must be a Client Component (Next.js requirement).
 *
 * Stays on-brand and gives the visitor a path forward. Logs the error
 * to the console so dev can see it; in production this can hook into
 * a proper monitoring service later (Sentry, Rollbar, etc.).
 */

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Production-time: surface in Vercel logs.
    console.error("[edus] runtime error:", error);
  }, [error]);

  return (
    <section className="relative pt-32 sm:pt-36 pb-16 md:pb-24 overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="blob" style={{ top: "-8%", left: "-8%", width: 420, height: 420, background: "#DC2626", opacity: 0.18 }} />
        <div className="blob" style={{ top: "20%", right: "-10%", width: 380, height: 380, background: "#8B5CF6", opacity: 0.18 }} />
      </div>

      <div className="container-edge max-w-3xl mx-auto text-center">
        <p className="eyebrow" style={{ color: "#DC2626" }}>
          <span className="dot" style={{ background: "#DC2626" }} />Something went wrong
        </p>
        <h1 className="heading mt-5" style={{ fontSize: "var(--fs-hero)" }}>
          We hit a snag <em>loading this page.</em>
        </h1>
        <p className="text-[#2B3950] text-[17px] mt-6 leading-[1.65] max-w-2xl mx-auto">
          Our team has been notified. Try reloading the page, or pick a different EDUS
          destination below. If this keeps happening, please contact us so we can help directly.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={reset} className="btn btn-primary">
            Try again
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
              <path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <Link href="/" className="btn btn-yellow">
            Back to Home
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            Contact Support
          </Link>
        </div>

        {error.digest && (
          <p className="mt-8 text-[11px] text-[#5A6A82] font-mono">
            Reference: {error.digest}
          </p>
        )}
      </div>
    </section>
  );
}
