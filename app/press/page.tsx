import Image from "next/image";
import Link from "next/link";
import {
  JsonLdScript,
  breadcrumbList,
  speakableWebPage,
} from "@/components/layout/StructuredData";

/**
 * Press kit - gives journalists, partners, and AI engines a clean,
 * downloadable, machine-readable view of the brand. Only real facts.
 */

export const metadata = {
  title: "Press Kit - EDUS Online Tuition - Brand, Logos & Facts",
  description:
    "EDUS press kit - brand logos, colors, fact sheet, and media contact. Quality-assured online tuition platform for Sri Lanka, India, Maldives & global.",
  alternates: { canonical: "/press" },
  keywords: [
    "EDUS press kit",
    "EDUS media kit",
    "EDUS brand assets",
    "EDUS logo download",
    "EDUS fact sheet",
    "EDUS media contact",
    "online tuition Sri Lanka press",
    "EDUS Lanka press release",
    "EDUS for journalists",
    "EDUS partner media",
  ],
};

const BRAND_COLORS = [
  { name: "Primary Blue",  hex: "#2563EB" },
  { name: "Violet Accent", hex: "#8B5CF6" },
  { name: "Cyan",          hex: "#06B6D4" },
  { name: "Sunshine",      hex: "#FACC15" },
  { name: "Success Green", hex: "#22C55E" },
  { name: "Ink",           hex: "#102033" },
];

const FACT_SHEET = [
  { label: "Legal name",          value: "EDUS Lanka (Pvt) Ltd" },
  { label: "Trading as",          value: "EDUS - EDUS Online Tuition" },
  { label: "Company registration", value: "PV 00232840" },
  { label: "Founded",             value: "2021" },
  { label: "Headquarters",        value: "Jaffna, Sri Lanka" },
  { label: "Markets served",      value: "Sri Lanka - India - Maldives - Global" },
  { label: "Students supported",  value: "7,000+" },
  { label: "Class formats",       value: "Live group classes - 1-to-1 tutoring" },
  { label: "Mediums",             value: "English - Tamil - Sinhala" },
  { label: "Syllabuses covered",  value: "National Syllabus (LK) - Cambridge IGCSE - O-Level - A-Level - Edexcel - CBSE Classes 6-10 - IB" },
];

export default function PressPage() {
  return (
    <>
      <JsonLdScript
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Press", path: "/press" },
        ])}
      />
      <JsonLdScript
        data={speakableWebPage({
          name: "Press Kit - EDUS Online Tuition",
          headline: "EDUS Press Kit",
          description:
            "EDUS press kit - brand logos, colors, fact sheet, and media contact. Quality-assured online tuition platform for Sri Lanka, India, Maldives & global.",
          path: "/press",
          // Target the brand fact sheet - the canonical, journalist-friendly
          // block voice assistants and AI engines should quote when asked
          // "what is EDUS / who runs EDUS / where is EDUS based".
          speakableSelectors: ["#fact-sheet h2", "#fact-sheet dt", "#fact-sheet dd"],
        })}
      />

      {/* HERO */}
      <section className="relative pt-32 sm:pt-36 pb-12 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="blob" style={{ top: "-8%", left: "-8%", width: 420, height: 420, background: "#2563EB", opacity: 0.22 }} />
          <div className="blob" style={{ top: "20%", right: "-10%", width: 380, height: 380, background: "#8B5CF6", opacity: 0.20 }} />
        </div>
        <div className="container-edge text-center max-w-4xl mx-auto">
          <p className="eyebrow"><span className="dot" />Press</p>
          <h1 className="heading mt-5" style={{ fontSize: "var(--fs-hero)" }}>
            EDUS press kit. <em>Everything you need</em> to write about us.
          </h1>
          <p className="text-[#2B3950] text-[17px] mt-6 leading-[1.65] max-w-2xl mx-auto">
            Brand assets, logos, color palette, fact sheet, and media contact. For journalists,
            partners, conference organisers, and editorial teams. All assets are free to use.
          </p>
        </div>
      </section>

      {/* FACT SHEET */}
      <section id="fact-sheet" className="relative py-12 md:py-16 overflow-hidden">
        <div className="container-edge max-w-4xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <p className="eyebrow"><span className="dot" />Fact Sheet</p>
            <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
              EDUS at a <em>glance</em>.
            </h2>
          </div>

          <div className="mt-10 glass-strong rounded-[24px] p-6 md:p-10">
            <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {FACT_SHEET.map((f) => (
                <div key={f.label} className="flex flex-col">
                  <dt className="text-[10.5px] uppercase tracking-widest text-[#5A6A82] font-display font-700">
                    {f.label}
                  </dt>
                  <dd className="text-[14.5px] text-[#102033] font-display font-600 mt-1 leading-[1.5]">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* LOGOS */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="container-edge max-w-4xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <p className="eyebrow"><span className="dot" />Logos</p>
            <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
              EDUS <em>logo download</em>.
            </h2>
            <p className="text-[#2B3950] text-[15.5px] mt-4 leading-[1.7]">
              Use the EDUS logo at minimum 32px height. Keep clear space around it equal to the
              height of the &ldquo;E&rdquo; mark. Do not stretch, recolor, or place on busy
              backgrounds without sufficient contrast.
            </p>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            <div className="bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-8 text-center shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)]">
              <div className="h-24 flex items-center justify-center">
                <Image src="/edus-logo-blue.webp" alt="EDUS logo on light" width={200} height={64} className="h-12 w-auto" />
              </div>
              <p className="mt-4 text-[12.5px] font-display font-700 uppercase tracking-widest text-[#102033]">
                Primary - Light Background
              </p>
              <a
                href="/edus-logo-blue.webp"
                download
                className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-display font-700 text-[#2563EB] hover:underline"
              >
                Download .webp
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                  <path d="M12 5v14M19 12l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            <div className="rounded-2xl p-8 text-center shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)]" style={{ background: "#102033" }}>
              <div className="h-24 flex items-center justify-center">
                <Image src="/edus-logo-blue.webp" alt="EDUS logo on dark" width={200} height={64} className="h-12 w-auto" style={{ filter: "brightness(0) invert(1)" }} />
              </div>
              <p className="mt-4 text-[12.5px] font-display font-700 uppercase tracking-widest text-white/80">
                Inverted - Dark Background
              </p>
              <a
                href="/edus-logo-blue.webp"
                download
                className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-display font-700 text-[#FACC15] hover:underline"
              >
                Download .webp
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                  <path d="M12 5v14M19 12l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND COLORS */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="container-edge max-w-4xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <p className="eyebrow"><span className="dot" />Brand Colors</p>
            <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
              EDUS <em>color palette</em>.
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {BRAND_COLORS.map((c) => (
              <div
                key={c.hex}
                className="bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl overflow-hidden shadow-[0_8px_24px_-18px_rgba(16,32,51,0.18)]"
              >
                <div className="h-20" style={{ background: c.hex }} />
                <div className="p-3">
                  <p className="font-display font-700 text-[13px] text-[#102033]">{c.name}</p>
                  <p className="text-[12px] text-[#5A6A82] font-mono mt-0.5">{c.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEDIA CONTACT */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="container-edge max-w-3xl mx-auto">
          <div className="rounded-[28px] p-8 md:p-12 text-center" style={{ background: "linear-gradient(135deg, #2563EB 0%, #6E5BC8 100%)" }}>
            <p
              className="font-display font-800 text-[11px] tracking-[0.16em] uppercase text-white/80"
            >
              Media Contact
            </p>
            <h2 className="heading mt-3" style={{ fontSize: "var(--fs-display)", color: "#fff" }}>
              For interviews, partnerships, and press.
            </h2>
            <p className="mt-4 text-[15.5px] text-white/85 leading-[1.65]">
              For media enquiries, interview requests, or partnership opportunities, write to{" "}
              <a href="mailto:hello@edustutor.com" className="underline font-display font-700 text-white">
                hello@edustutor.com
              </a>{" "}
              with subject line &ldquo;Press&rdquo;. Responses within one business day.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a href="mailto:hello@edustutor.com?subject=Press%20enquiry" className="btn btn-yellow">
                Email the team
              </a>
              <Link href="/contact" className="btn btn-ghost">
                Other contact channels
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
