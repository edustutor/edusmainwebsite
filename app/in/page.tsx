import Link from "next/link";
import { CTA } from "@/components/CTA";

export const metadata = {
  title: "India Online Tuition · CBSE Classes 6–10 · Tamil Nadu",
  description:
    "Premium structured online CBSE tuition for Classes 6–10 in English medium. Mathematics, Science, and English with monthly parent reports and exam analytics.",
  alternates: { canonical: "/in" },
};

const SUBJECTS = ["Mathematics", "Science", "English"];
const GRADES = [
  { g: "6", tier: "Middle Stage", tint: "#2563EB" },
  { g: "7", tier: "Middle Stage", tint: "#2563EB" },
  { g: "8", tier: "Middle Stage", tint: "#2563EB" },
  { g: "9", tier: "Secondary Stage", tint: "#8B5CF6" },
  { g: "10", tier: "Secondary Stage", tint: "#8B5CF6" },
];
const SCHEDULE = [
  { slot: "Slot 1", time: "6:30 PM – 7:30 PM", tint: "#2563EB" },
  { slot: "Slot 2", time: "7:45 PM – 8:45 PM", tint: "#8B5CF6" },
  { slot: "Optional", time: "9:00 PM – 10:00 PM", tint: "#06B6D4" },
];
const PRICING = [
  {
    tag: "Admission Fee",
    price: "₹2,000",
    unit: "one-time",
    note: "One-time fee for every student who joins EDUS - paid only once at the start.",
    tint: "#2563EB",
  },
  {
    tag: "Per Subject",
    price: "₹1,000",
    unit: "/ subject / month",
    note: "Standard monthly fee per individual subject. Pick the subjects your child needs.",
    tint: "#06B6D4",
  },
  {
    tag: "All 3 Subjects",
    price: "₹2,500",
    unit: "/ month",
    note: "Take all three core subjects together and save ₹500 - only ₹2,500 instead of ₹3,000.",
    tint: "#8B5CF6",
    featured: true,
  },
];

const PRICING_INCLUDES = [
  "Onboarding & assessment",
  "Account setup & welcome pack",
  "2 hours / week per subject",
  "Live online + recorded sessions",
  "Individual attention in every class",
  "Performance monitoring",
  "Monthly parent reporting & progress reviews",
  "Anytime parent support",
];
const PILLARS = [
  { icon: "📈", title: "Structured monitoring", body: "Class observation, tutor feedback, and academic SOPs run every month - not as marketing, as process.", tint: "#2563EB" },
  { icon: "📋", title: "Monthly reporting", body: "Attendance, homework, and topic-by-topic progress shared with parents every week. No black box.", tint: "#8B5CF6" },
  { icon: "📊", title: "Exam analytics", body: "Term and unit exams modelled on board paper structure, scored against subject benchmarks each month.", tint: "#06B6D4" },
  { icon: "🛡️", title: "Disciplined tutor system", body: "Vetted, demo-tested, interviewed, trained. Always on time. Always on syllabus. Always accountable.", tint: "#22C55E" },
];

export default function IndiaPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 sm:pt-36 pb-12 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="blob" style={{ top: "-8%", left: "-8%", width: 460, height: 460, background: "#FACC15", opacity: 0.30 }} />
          <div className="blob" style={{ top: "20%", right: "-10%", width: 480, height: 480, background: "#8B5CF6", opacity: 0.30 }} />
          <div className="blob" style={{ bottom: "0%", left: "30%", width: 380, height: 380, background: "#2563EB", opacity: 0.22 }} />
        </div>

        <div className="container-edge">
          <div className="flex justify-center" data-anim>
            <Link href="/#regions" className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-[12.5px] font-medium text-[#2B3950]">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              All markets
              <span className="text-[#5A6A82]">·</span>
              <span className="text-[#8B5CF6]">🇮🇳 India · Tamil Nadu · CBSE</span>
            </Link>
          </div>

          <div className="mt-8 text-center max-w-4xl mx-auto" data-anim="2">
            <p className="eyebrow">🇮🇳 Premium CBSE Online Tuition · Classes 6–10</p>
            <h1 className="heading mt-5" style={{ fontSize: "var(--fs-hero)" }}>
              Structured tuition. <em>Disciplined monitoring. Real progress.</em>
            </h1>
            <p className="text-[#2B3950] text-[17px] mt-6 leading-[1.65] max-w-2xl mx-auto">
              Premium CBSE-aligned, quality-assured live online classes from expert tutors for Tamil Nadu families, delivering measurable progress in
              <br />
              Classes 6–10 Maths, Science &amp; English.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3" data-anim="3">
              <a href="https://signup.edustutor.com/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Start Learning with EDUS</a>
              <Link href="/contact" className="btn btn-yellow">Talk to US</Link>
            </div>
          </div>

          {/* Trust strip */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto" data-anim="4">
            {[
              { k: "CBSE", v: "Syllabus aligned" },
              { k: "Class 6 – 10", v: "Coverage" },
              { k: "3", v: "Core subjects" },
              { k: "Monthly", v: "Parent updates" },
            ].map((s, i) => (
              <div key={i} className="glass rounded-2xl px-5 py-4 text-center">
                <p className="font-[family-name:var(--font-display)] font-700 text-[22px] tnum text-[#102033]">{s.k}</p>
                <p className="text-[11.5px] text-[#5A6A82] mt-1">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="container-edge">
          <div className="text-center max-w-2xl mx-auto">
            <p className="eyebrow"><span className="dot" />The EDUS Difference</p>
            <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
              Rare in Tamil Nadu. <em>Standard at EDUS.</em>
            </h2>
            <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
              Most CBSE tuition across Tamil Nadu is unstructured; EDUS runs with academic SOPs,
              monitored tutors, focused individual attention for every student, and
              <br />
              monthly parent updates.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-4">
            {PILLARS.map((p) => (
              <article key={p.title} className="glass rounded-[24px] p-7 lift relative overflow-hidden">
                <span aria-hidden className="blob" style={{ top: -50, right: -50, width: 200, height: 200, background: p.tint, opacity: 0.18 }} />
                <div className="relative">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                    style={{ background: `${p.tint}15`, border: `1px solid ${p.tint}25` }}
                  >
                    {p.icon}
                  </div>
                  <h3 className="heading mt-6" style={{ fontSize: "20px" }}>{p.title}</h3>
                  <p className="text-[#2B3950] text-[14.5px] mt-3 leading-[1.65]">{p.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ACADEMIC STRUCTURE */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="container-edge">
          <div className="text-center max-w-2xl mx-auto">
            <p className="eyebrow"><span className="dot" />Academic Structure</p>
            <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
              Three core subjects. <em>Every CBSE class.</em>
            </h2>
            <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
              English-medium CBSE tuition for Classes 6–10. Mathematics, Science, and English -
              taught by tutors segmented into Middle Stage (Classes 6–8) and Secondary Stage
              (Classes 9–10).
            </p>
          </div>

          <div className="mt-12 space-y-5">
            {/* Subjects */}
            <div className="glass-strong rounded-[24px] p-7">
              <p className="font-[family-name:var(--font-display)] font-600 text-[12px] tracking-[0.12em] uppercase text-[#2563EB]">
                CBSE Core Subjects · per class
              </p>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SUBJECTS.map((s, i) => (
                  <div key={s} className="rounded-2xl bg-white border border-[rgba(16,32,51,0.06)] p-4 text-center">
                    <p className="text-[10.5px] font-mono text-[#5A6A82]">{String(i + 1).padStart(2, "0")}</p>
                    <p className="font-[family-name:var(--font-display)] font-600 text-[15px] mt-1.5 text-[#102033]">{s}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Grade tiers */}
            <div className="glass rounded-[24px] p-7">
              <p className="font-[family-name:var(--font-display)] font-600 text-[12px] tracking-[0.12em] uppercase text-[#8B5CF6]">
                CBSE Class Stages · Middle 6–8 · Secondary 9–10
              </p>
              <div className="mt-5 grid grid-cols-5 gap-3">
                {GRADES.map((g) => (
                  <div
                    key={g.g}
                    className="rounded-2xl py-6 text-center text-white"
                    style={{ background: `linear-gradient(180deg, ${g.tint}EE, ${g.tint})` }}
                  >
                    <p className="font-[family-name:var(--font-display)] font-700 text-[36px] leading-none">{g.g}</p>
                    <p className="text-[11px] uppercase tracking-wider mt-2 opacity-80">{g.tier}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div className="glass rounded-[24px] p-7">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <p className="font-[family-name:var(--font-display)] font-600 text-[12px] tracking-[0.12em] uppercase text-[#06B6D4]">
                  Class Schedule · Mon – Sat
                </p>
                <p className="text-[12.5px] text-[#5A6A82]">2 hours / week / subject</p>
              </div>
              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
                {SCHEDULE.map((s) => (
                  <div
                    key={s.slot}
                    className="rounded-2xl bg-white border border-[rgba(16,32,51,0.06)] p-4 flex items-center justify-between"
                  >
                    <span
                      className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-white font-[family-name:var(--font-display)] font-600 text-[12px]"
                      style={{ background: s.tint }}
                    >
                      🕐
                    </span>
                    <div className="text-right">
                      <p className="text-[11px] uppercase tracking-wider text-[#5A6A82]">{s.slot}</p>
                      <p className="font-[family-name:var(--font-display)] font-600 text-[15px] tnum text-[#102033]">{s.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="relative py-12 md:py-16 overflow-hidden">
        <div className="container-edge">
          <div className="text-center max-w-2xl mx-auto">
            <p className="eyebrow"><span className="dot" />Fees & Payment Plan</p>
            <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
              Premium learning. <em>Reasonable fees.</em>
            </h2>
            <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
              Transparent, affordable pricing for every CBSE family - premium-quality education that
              stays accessible.
            </p>
          </div>

          {/* Unified pricing panel */}
          <div className="mt-12 relative glass-strong rounded-[28px] overflow-hidden max-w-6xl mx-auto">
            <span aria-hidden className="blob" style={{ top: -80, right: -60, width: 320, height: 320, background: "#2563EB", opacity: 0.18 }} />
            <span aria-hidden className="blob" style={{ bottom: -80, left: -60, width: 320, height: 320, background: "#8B5CF6", opacity: 0.18 }} />

            <div className="relative p-6 md:p-10">
              {/* 3 pricing tiers */}
              <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[rgba(16,32,51,0.08)]">
                {PRICING.map((p) => (
                  <div
                    key={p.tag}
                    className={`relative p-5 lg:px-7 ${p.featured ? "lg:bg-gradient-to-b lg:from-[#8B5CF6]/8 lg:to-transparent rounded-2xl lg:rounded-none" : ""}`}
                  >
                    {p.featured && (
                      <span
                        className="absolute -top-2 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-white font-[family-name:var(--font-display)] font-700 text-[10px] tracking-[0.12em] uppercase shadow-[0_6px_14px_-6px_rgba(139,92,246,0.5)]"
                        style={{ background: "linear-gradient(90deg, #2563EB 0%, #6E5BC8 100%)" }}
                      >
                        ★ Best Value · Save ₹500
                      </span>
                    )}
                    <p
                      className="font-[family-name:var(--font-display)] font-700 text-[11px] tracking-[0.16em] uppercase"
                      style={{ color: p.tint }}
                    >
                      {p.tag}
                    </p>
                    <div className="mt-3 flex items-baseline gap-1.5">
                      <p className="font-[family-name:var(--font-display)] font-700 text-[34px] leading-none text-[#102033]">
                        {p.price}
                      </p>
                      <span className="text-[12px] text-[#5A6A82]">{p.unit}</span>
                    </div>
                    <p className="text-[12.5px] text-[#2B3950] mt-3 leading-[1.6]">{p.note}</p>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="my-7 border-t border-[rgba(16,32,51,0.10)]" />

              {/* What's included in every plan */}
              <div>
                <p className="font-[family-name:var(--font-display)] font-700 text-[11px] tracking-[0.16em] uppercase text-[#2563EB]">
                  Included in every plan
                </p>
                <p className="heading mt-2" style={{ fontSize: "18px" }}>
                  Every enrolment includes the same premium standards.
                </p>
                <ul className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-2.5 text-[13.5px]">
                  {PRICING_INCLUDES.map((inc) => (
                    <li key={inc} className="flex items-start gap-2.5 text-[#2B3950]">
                      <span className="inline-flex w-5 h-5 mt-0.5 rounded-full bg-[#2563EB]/15 items-center justify-center shrink-0">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="3.5" aria-hidden>
                          <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="leading-[1.55]">{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer CTA */}
              <div className="mt-8 pt-6 border-t border-[rgba(16,32,51,0.10)] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[13.5px] text-[#102033] font-[family-name:var(--font-display)] font-600">
                    Ready to start with a premium CBSE tutor?
                  </p>
                  <p className="text-[12px] text-[#5A6A82] mt-1">
                    Referral discount · ₹500 off when an existing student refers a new family.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://signup.edustutor.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Enrol Now
                  </a>
                  <Link href="/contact" className="btn btn-yellow">Talk to US</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
