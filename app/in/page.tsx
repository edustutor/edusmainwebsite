import Link from "next/link";
import { CTA } from "@/components/CTA";

export const metadata = {
  title: "India · Chennai - Premium Online Tuition for Grades 6–10 · EDUS",
  description:
    "Premium structured online tuition with disciplined academic monitoring. CBSE & matriculation aligned, Grades 6–10, English medium. Weekly reports, exam analytics, monthly progress to parents.",
};

const SUBJECTS = ["Tamil", "Hindi", "English", "Mathematics", "Science", "Social Science"];
const GRADES = [
  { g: "6", tier: "Junior", tint: "#2563EB" },
  { g: "7", tier: "Junior", tint: "#2563EB" },
  { g: "8", tier: "Junior", tint: "#2563EB" },
  { g: "9", tier: "Senior", tint: "#8B5CF6" },
  { g: "10", tier: "Senior", tint: "#8B5CF6" },
];
const SCHEDULE = [
  { slot: "Slot 1", time: "6:30 PM – 7:30 PM", tint: "#2563EB" },
  { slot: "Slot 2", time: "7:45 PM – 8:45 PM", tint: "#8B5CF6" },
  { slot: "Optional", time: "9:00 PM – 10:00 PM", tint: "#06B6D4" },
];
const PRICING = [
  { tag: "Admission Fee", price: "₹2,000", unit: "one-time", bullets: ["Onboarding & assessment", "Account setup", "Welcome pack"], tint: "#2563EB" },
  { tag: "Per Subject", price: "₹1,000", unit: "/ month", bullets: ["2 hours / week per subject", "Live + recorded", "Weekly reporting"], tint: "#06B6D4" },
  { tag: "All-Subject Package", price: "₹5,000", unit: "/ month", bullets: ["All 6 subjects covered", "Save vs. per-subject", "Priority parent support"], tint: "#8B5CF6", featured: true },
];
const PILLARS = [
  { icon: "📈", title: "Structured monitoring", body: "Class observation, tutor feedback, and academic SOPs run every month - not as marketing, as process.", tint: "#2563EB" },
  { icon: "📋", title: "Weekly reporting", body: "Attendance, homework, and topic-by-topic progress shared with parents every week. No black box.", tint: "#8B5CF6" },
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
              <span className="text-[#8B5CF6]">🇮🇳 India · Chennai</span>
            </Link>
          </div>

          <div className="mt-8 text-center max-w-4xl mx-auto" data-anim="2">
            <p className="eyebrow">🇮🇳 Premium Online Tuition · Grades 6–10</p>
            <h1 className="heading mt-5" style={{ fontSize: "var(--fs-hero)" }}>
              Structured tuition. <em>Disciplined monitoring. Real progress.</em>
            </h1>
            <p className="text-[#2B3950] text-[17px] mt-6 leading-[1.65] max-w-2xl mx-auto">
              EDUS is not mass coaching. It's premium online tuition with weekly parent reporting,
              exam analytics, and a disciplined tutor system - built for Chennai families who want
              measurable progress between Grade 6 and Grade 10.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3" data-anim="3">
              <a href="https://signup.edustutor.com/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Reserve a Seat</a>
              <Link href="/contact" className="btn btn-yellow">Talk to US</Link>
            </div>
          </div>

          {/* Trust strip */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto" data-anim="4">
            {[
              { k: "6 – 10", v: "Grades covered" },
              { k: "6", v: "Subjects per grade" },
              { k: "12", v: "Vetted tutors" },
              { k: "Weekly", v: "Parent reports" },
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
              Rare in Chennai. <em>Standard at EDUS.</em>
            </h2>
            <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
              Most Chennai tuition is unstructured. EDUS runs with academic SOPs, monitored tutors,
              and weekly parent visibility.
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
              Six subjects. <em>Every grade.</em>
            </h2>
            <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
              English medium tuition for Grades 6–10. Same six subjects across every grade, taught
              by tutors segmented into Junior (6–8) and Senior (9–10) tiers.
            </p>
          </div>

          <div className="mt-12 space-y-5">
            {/* Subjects */}
            <div className="glass-strong rounded-[24px] p-7">
              <p className="font-[family-name:var(--font-display)] font-600 text-[12px] tracking-[0.12em] uppercase text-[#2563EB]">
                All 6 subjects · per grade
              </p>
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
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
                Grade tiers · Junior 6–8 · Senior 9–10
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
            <p className="eyebrow"><span className="dot" />Fees</p>
            <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
              Transparent. <em>Affordable.</em>
            </h2>
            <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
              Pay per subject or save with the all-subject package. UPI, Google Pay, PhonePe, and
              Razorpay accepted.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-4">
            {PRICING.map((p) => (
              <article
                key={p.tag}
                className={`relative rounded-[28px] p-7 lift overflow-hidden ${p.featured ? "glass-strong" : "glass"}`}
              >
                <span aria-hidden className="blob" style={{ top: -50, right: -50, width: 220, height: 220, background: p.tint, opacity: 0.22 }} />
                <div className="relative">
                  <p className="font-[family-name:var(--font-display)] font-600 text-[12px] tracking-[0.12em] uppercase" style={{ color: p.tint }}>
                    {p.tag}
                  </p>
                  <div className="mt-6 flex items-baseline gap-1.5">
                    <p className="font-[family-name:var(--font-display)] font-700 text-[42px] leading-none text-[#102033]">{p.price}</p>
                    <span className="text-[12px] text-[#5A6A82]">{p.unit}</span>
                  </div>

                  <ul className="mt-6 space-y-2 text-[13.5px]">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-[#2B3950]">
                        <span className="inline-flex w-4 h-4 mt-0.5 rounded-full items-center justify-center" style={{ background: `${p.tint}1A` }}>
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={p.tint} strokeWidth="3.5" aria-hidden>
                            <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  <a href="https://signup.edustutor.com/" target="_blank" rel="noopener noreferrer" className={`mt-7 w-full justify-center btn ${p.featured ? "btn-primary" : "btn-outline"}`}>
                    Enrol
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-8 text-center text-[13px] text-[#5A6A82]">
            Referral discount · ₹500 off when an existing student refers a new family.
          </p>
        </div>
      </section>

      <CTA />
    </>
  );
}
