import Image from "next/image";
import Link from "next/link";
import {
  JsonLdScript,
  breadcrumbList,
  speakableWebPage,
  SITE_URL,
} from "@/components/layout/StructuredData";
import { Breadcrumb } from "@/components/shared/Breadcrumb";

/**
 * About EDUS - built only from verified facts present in llms-full.txt and
 * the homepage JSON-LD. No fabricated content. Real numbers, real awards,
 * real address. E-E-A-T page for Google's Quality Rater Guidelines.
 */

export const metadata = {
  title: "About EDUS - Online Tuition Institute - Sri Lanka - Since 2021",
  description:
    "About EDUS Lanka (Pvt) Ltd - quality-assured online learning platform founded 2021 in Jaffna. 7,000+ students across Sri Lanka, India, Maldives & global.",
  alternates: { canonical: "/about" },
  keywords: [
    "about EDUS",
    "EDUS Lanka",
    "EDUS Lanka Pvt Ltd",
    "EDUS company information",
    "EDUS founded",
    "EDUS Jaffna office",
    "EDUS online institute",
    "EDUS accreditations",
    "EDUS Microsoft for Startups",
    "EDUS ICTA Sri Lanka",
    "EDUS SLASSCOM member",
    "EDUS company registration",
    "EDUS PV 00232840",
    "online tuition company Sri Lanka",
    "trusted online education provider",
  ],
  // Per-route OG card. Falls back to /edus-og.jpg until /public/og/about.jpg exists.
  openGraph: {
    type: "website",
    title: "About EDUS - Online Tuition Institute Since 2021",
    description:
      "EDUS Lanka (Pvt) Ltd. The Jaffna-based online tuition institute serving 7,000+ students across Sri Lanka, India, Maldives, and globally.",
    siteName: "EDUS Online Institute",
    images: [{ url: "/edus-og.jpg", width: 1200, height: 630, alt: "About EDUS Lanka (Pvt) Ltd. - online learning institute" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About EDUS Online Institute",
    description:
      "Founded 2021. Quality-assured online tuition. 7,000+ students across SL, IN, MV & global.",
    images: ["/edus-og.jpg"],
  },
};

const FACTS = [
  { label: "Legal name",        value: "EDUS Lanka (Pvt) Ltd" },
  { label: "Registration",      value: "PV 00232840" },
  { label: "Founded",           value: "2021" },
  { label: "Registered office", value: "No. 95, K.K.S Road, Kokkuvil Junction, Jaffna 40000, Sri Lanka" },
  { label: "Students supported", value: "7,000+" },
  { label: "Markets",           value: "Sri Lanka - India - Maldives - Global" },
  { label: "Class formats",     value: "Group live classes - One-to-one tutoring" },
  { label: "Mediums",           value: "English - Tamil - Sinhala" },
  { label: "Email",             value: "hello@edustutor.com" },
  { label: "Phone",             value: "+94 70 707 2072" },
];

const ACCREDITATIONS = [
  { name: "Microsoft for Startups Founders Hub", tint: "#2563EB" },
  { name: "ICTA Sri Lanka - Recognised Startup", tint: "#8B5CF6" },
  { name: "SLASSCOM Member",                     tint: "#06B6D4" },
  { name: "Spiralation by ICTA",                 tint: "#22C55E" },
  { name: "Hemas Slingshot × Hatch Cohort",      tint: "#FACC15" },
  { name: "Yarl IT Hub Recognised Startup",      tint: "#EC4899" },
  { name: "Innovate Lanka",                      tint: "#2563EB" },
];

const PRINCIPLES = [
  {
    n: "01",
    title: "Quality-assured tutors",
    body: "Every EDUS tutor is vetted, demo-tested, interviewed, and trained before being matched with students. Performance is reviewed monthly against academic standards.",
    tint: "#2563EB",
  },
  {
    n: "02",
    title: "Live and structured",
    body: "All classes are live online with a fixed lesson plan, topic coverage, exam structure, and recorded for revision. No black-box content delivery.",
    tint: "#8B5CF6",
  },
  {
    n: "03",
    title: "Parent monitored",
    body: "Attendance, learning progress, exam scores, and tutor feedback are shared with parents on a weekly and monthly basis. Real visibility, not marketing.",
    tint: "#06B6D4",
  },
  {
    n: "04",
    title: "Affordable at scale",
    body: "Pricing is set so families across Sri Lanka, India, and Maldives can afford structured online learning.",
    tint: "#22C55E",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLdScript
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <JsonLdScript
        data={speakableWebPage({
          name: "About EDUS - Online Tuition Institute - Sri Lanka - Since 2021",
          headline: "About EDUS Online Tuition",
          description:
            "About EDUS Lanka (Pvt) Ltd - quality-assured online learning platform founded 2021, based in Jaffna, Sri Lanka. 7,000+ students supported across four markets.",
          path: "/about",
          // Target the mission statement and operating principles - the
          // most quotable, voice-assistant-friendly sections of the page.
          speakableSelectors: [
            "#mission h2",
            "#mission p",
            "#principles h2",
            "#principles h3",
            "#principles p",
          ],
        })}
      />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "About EDUS" },
        ]}
      />

      {/* HERO */}
      <section className="relative pt-4 pb-12 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="blob" style={{ top: "-8%", left: "-8%", width: 420, height: 420, background: "#2563EB", opacity: 0.22 }} />
          <div className="blob" style={{ top: "20%", right: "-10%", width: 380, height: 380, background: "#8B5CF6", opacity: 0.20 }} />
        </div>
        <div className="container-edge text-center max-w-4xl mx-auto">
          <p className="eyebrow"><span className="dot" />About EDUS</p>
          <h1 className="heading mt-5" style={{ fontSize: "var(--fs-hero)" }}>
            Quality-assured <em>online learning</em><br />for school students.
          </h1>
          <p className="text-[#2B3950] text-[17px] mt-6 leading-[1.65] max-w-2xl mx-auto">
            EDUS Lanka (Pvt) Ltd is an online learning institute founded in 2021. We build a
            structured, scalable, technology-driven education ecosystem connecting qualified
            tutors with students across Sri Lanka, India, Maldives, and global communities.
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section id="mission" className="relative py-12 md:py-16 overflow-hidden">
        <div className="container-edge max-w-4xl mx-auto">
          <div className="glass-strong rounded-[24px] p-8 md:p-10 text-center">
            <p className="eyebrow"><span className="dot" />Our Mission</p>
            <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
              Make structured online learning the <em>default</em> for school students.
            </h2>
            <p className="text-[#2B3950] text-[15.5px] mt-5 leading-[1.7] max-w-2xl mx-auto">
              Offline tuition is unstructured. Most online platforms are unmonitored. EDUS exists
              to deliver live, quality-assured classes with real tutor oversight, real parent
              visibility, and real academic outcomes - at a price families can actually pay.
            </p>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section id="principles" className="relative py-12 md:py-16 overflow-hidden">
        <div className="container-edge">
          <div className="max-w-3xl mx-auto text-center">
            <p className="eyebrow"><span className="dot" />How We Run</p>
            <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
              Four operating principles. <em>Every class. Every student.</em>
            </h2>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {PRINCIPLES.map((p) => (
              <article
                key={p.n}
                className="relative bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-6 md:p-7 shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)] overflow-hidden"
              >
                <span
                  aria-hidden
                  className="absolute top-0 left-0 h-1 w-full rounded-t-2xl"
                  style={{ background: p.tint }}
                />
                <p
                  className="font-display font-800 text-[12px] tracking-[0.16em] uppercase"
                  style={{ color: p.tint }}
                >
                  Principle {p.n}
                </p>
                <h3 className="mt-2 font-display font-700 text-[19px] text-[#102033] leading-tight">
                  {p.title}
                </h3>
                <p className="text-[14px] text-[#5A6A82] mt-2 leading-[1.65]">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FACTS */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="container-edge max-w-4xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <p className="eyebrow"><span className="dot" />Company Facts</p>
            <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
              The facts about <em>EDUS Lanka</em>.
            </h2>
          </div>

          <div className="mt-10 glass-strong rounded-[24px] p-6 md:p-10">
            <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {FACTS.map((f) => (
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

      {/* ACCREDITATIONS */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="container-edge">
          <div className="max-w-3xl mx-auto text-center">
            <p className="eyebrow"><span className="dot" />Recognition</p>
            <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
              Backed and recognised by <em>leading institutions</em>.
            </h2>
            <p className="text-[#2B3950] text-[15.5px] mt-4 leading-[1.7]">
              EDUS is recognised by Sri Lanka&apos;s national tech and education ecosystem, plus
              international programmes that fund and accelerate quality startups.
            </p>
          </div>

          <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto">
            {ACCREDITATIONS.map((a) => (
              <li
                key={a.name}
                className="bg-white border border-[rgba(16,32,51,0.08)] rounded-xl px-4 py-3 flex items-center gap-3 shadow-[0_8px_24px_-18px_rgba(16,32,51,0.18)]"
              >
                <span
                  aria-hidden
                  className="inline-flex w-2 h-2 rounded-full shrink-0"
                  style={{ background: a.tint }}
                />
                <p className="font-display font-700 text-[13px] text-[#102033] leading-tight">
                  {a.name}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SEE THE JOURNEY IN PHOTOS - cross-link to /gallery so the EDUS
          history page passes link equity to the high-content gallery
          albums (and vice versa, since those albums link back here). */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="container-edge max-w-4xl mx-auto">
          <div className="rounded-2xl border border-[rgba(16,32,51,0.10)] bg-white p-6 md:p-10 shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)] text-center">
            <p className="eyebrow"><span className="dot" />EDUS Gallery</p>
            <h2 className="heading mt-3" style={{ fontSize: "26px" }}>
              See the journey in <em>photos</em>.
            </h2>
            <p className="text-[#2B3950] text-[15px] mt-4 leading-[1.7] max-w-2xl mx-auto">
              Every milestone in this story has a photo album. Browse the{" "}
              <Link href="/gallery" className="text-[#2563EB] hover:underline">EDUS Gallery</Link>{" "}
              for the{" "}
              <Link href="/gallery/edus-wins-national-ict-award-education" className="text-[#2563EB] hover:underline">National ICT Award 2024 ceremony</Link>
              , the{" "}
              <Link href="/gallery/edus-yarl-ventures-jaffna-office-opening" className="text-[#2563EB] hover:underline">Jaffna front office opening with Yarl Ventures</Link>
              , our{" "}
              <Link href="/gallery/edus-slingshot-accelerator-demo-day" className="text-[#2563EB] hover:underline">Slingshot Accelerator Demo Day</Link>
              , and the{" "}
              <Link href="/gallery/edus-first-office-opening-jaffna-2021" className="text-[#2563EB] hover:underline">first office opening back in 2021</Link>
              .
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/gallery" className="btn btn-primary">Browse the Gallery</Link>
              <Link href="/press" className="btn btn-ghost">Press &amp; Media</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="container-edge max-w-4xl mx-auto">
          <div className="rounded-[28px] p-8 md:p-12 text-center" style={{ background: "linear-gradient(135deg, #2563EB 0%, #6E5BC8 100%)" }}>
            <h2 className="heading" style={{ fontSize: "var(--fs-display)", color: "#fff" }}>
              Learn more about how EDUS fits your child.
            </h2>
            <p className="mt-4 text-[15.5px] text-white/85 max-w-2xl mx-auto leading-[1.7]">
              Talk to the EDUS team or pick the market that matches your country and syllabus.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn btn-yellow">Contact EDUS</Link>
              <Link href="/sl" className="btn btn-ghost">Sri Lanka Classes</Link>
              <Link href="/in" className="btn btn-ghost">India CBSE</Link>
              <Link href="/mv" className="btn btn-ghost">Maldives Cambridge</Link>
              <Link href="/global" className="btn btn-ghost">Global One-to-One</Link>
            </div>
          </div>
        </div>

        {/* Logo flourish */}
        <div className="container-edge mt-12 flex justify-center">
          <Image
            src="/edus-logo-blue.webp"
            alt="EDUS"
            width={180}
            height={56}
            className="h-10 w-auto opacity-60"
          />
        </div>
      </section>
    </>
  );
}
