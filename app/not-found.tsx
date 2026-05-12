import Link from "next/link";

/**
 * Custom 404 page. Triggered by Next.js when a route doesn't match
 * (including blog slugs flagged as drafts via notFound()).
 *
 * Stays on-brand and surfaces the four most-likely destinations so
 * the visitor doesn't bounce. Returns HTTP 404 automatically.
 */

export const metadata = {
  title: "Page not found · EDUS",
  description:
    "The page you were looking for doesn't exist or has been moved. Head back to the EDUS homepage or pick your learning region.",
  robots: { index: false, follow: false },
};

const SUGGESTIONS = [
  { name: "Sri Lanka Classes",        path: "/sl",      tint: "#2563EB" },
  { name: "India CBSE Online Tuition", path: "/in",      tint: "#8B5CF6" },
  { name: "Maldives Cambridge IGCSE", path: "/mv",      tint: "#22C55E" },
  { name: "Global One-to-One Tuition", path: "/global",  tint: "#06B6D4" },
  { name: "Teach with EDUS",          path: "/teach",   tint: "#FACC15" },
  { name: "Contact EDUS",             path: "/contact", tint: "#EC4899" },
];

export default function NotFound() {
  return (
    <section className="relative pt-32 sm:pt-36 pb-16 md:pb-24 overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="blob" style={{ top: "-8%", left: "-8%", width: 420, height: 420, background: "#2563EB", opacity: 0.22 }} />
        <div className="blob" style={{ top: "20%", right: "-10%", width: 380, height: 380, background: "#8B5CF6", opacity: 0.20 }} />
      </div>

      <div className="container-edge max-w-3xl mx-auto text-center">
        <p className="eyebrow"><span className="dot" />404 · Page Not Found</p>
        <h1 className="heading mt-5" style={{ fontSize: "var(--fs-hero)" }}>
          This page doesn&apos;t exist. <em>Let&apos;s get you back.</em>
        </h1>
        <p className="text-[#2B3950] text-[17px] mt-6 leading-[1.65] max-w-2xl mx-auto">
          The page you tried to open may have been moved, renamed, or never existed. Pick the EDUS
          path that matches your country and syllabus below — or head straight to the homepage.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            Back to Home
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link href="/contact" className="btn btn-yellow">
            Contact the EDUS Team
          </Link>
        </div>
      </div>

      <div className="container-edge mt-12 max-w-4xl mx-auto">
        <p className="text-center text-[12px] uppercase tracking-[0.16em] text-[#5A6A82] font-display font-700">
          Or pick a destination
        </p>
        <ul className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {SUGGESTIONS.map((s) => (
            <li key={s.path}>
              <Link
                href={s.path}
                className="group block bg-white border border-[rgba(16,32,51,0.08)] rounded-xl px-4 py-3 shadow-[0_8px_24px_-18px_rgba(16,32,51,0.18)] hover:-translate-y-0.5 transition"
              >
                <span
                  aria-hidden
                  className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle"
                  style={{ background: s.tint }}
                />
                <span className="font-display font-700 text-[13.5px] text-[#102033] group-hover:text-[#2563EB] transition-colors">
                  {s.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
