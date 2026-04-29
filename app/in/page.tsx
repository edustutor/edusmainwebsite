import Link from "next/link";
import { CTA } from "@/components/CTA";
import { Ticker } from "@/components/Ticker";

export const metadata = {
  title: "India · Chennai — Premium Online Tuition for Grades 6–10 · EDUS",
  description:
    "Premium structured online tuition with disciplined academic monitoring. CBSE & matriculation aligned, Grades 6–10, English medium. Weekly reports, exam analytics, monthly progress to parents.",
};

const SUBJECTS = ["Tamil", "Hindi", "English", "Mathematics", "Science", "Social Science"];
const GRADES = [
  { g: "6", tier: "Junior" }, { g: "7", tier: "Junior" }, { g: "8", tier: "Junior" },
  { g: "9", tier: "Senior" }, { g: "10", tier: "Senior" },
];
const SCHEDULE = [
  { slot: "Slot 1", time: "6:30 PM – 7:30 PM" },
  { slot: "Slot 2", time: "7:45 PM – 8:45 PM" },
  { slot: "Optional", time: "9:00 PM – 10:00 PM" },
];
const PRICING = [
  { tag: "Admission Fee", price: "₹2,000", unit: "one-time", bullets: ["Onboarding & assessment", "Account setup", "Welcome pack"] },
  { tag: "Per Subject", price: "₹1,000", unit: "/ month", bullets: ["2 hours / week per subject", "Live + recorded", "Weekly reporting"] },
  { tag: "All-Subject Package", price: "₹5,000", unit: "/ month", bullets: ["All 6 subjects covered", "Save vs. per-subject", "Priority parent support"], featured: true },
];
const PILLARS = [
  { tag: "MONITORING", title: "Structured monitoring", body: "Class observation, tutor feedback, and academic SOPs run every month — not as marketing, as process." },
  { tag: "REPORTING", title: "Weekly reporting", body: "Attendance, homework, and topic-by-topic progress shared with parents every week. No black box." },
  { tag: "ANALYTICS", title: "Exam analytics", body: "Term and unit exams modelled on board paper structure, scored against subject benchmarks each month." },
  { tag: "DISCIPLINE", title: "Disciplined tutor system", body: "Vetted, demo-tested, interviewed, trained. Always on time. Always on syllabus. Always accountable." },
];
const TIMELINE = [
  { phase: "I", title: "Infrastructure", body: "Phone, banking, payment gateway, CRM, website, Google Classroom — all live and stress-tested.", date: "Mar 1 – Mar 31" },
  { phase: "II", title: "Tutor recruitment", body: "12 vetted tutors hired through application, demo class, interview, and onboarding training.", date: "Mar 15 – Apr 5" },
  { phase: "III", title: "Senior cohort", body: "Marketing for Grades 9–10. First batch of 20 students. Classes begin.", date: "May 1" },
  { phase: "IV", title: "Full launch", body: "Grades 6, 7, 8 marketing pushed. Classes begin June 1.", date: "Jun 1" },
];

export default function IndiaPage() {
  return (
    <>
      {/* HERO — India edition. Front page newspaper feature with sidebar table. */}
      <section className="relative pt-20">
        <div className="border-b border-[rgba(14,20,33,0.10)] bg-[#F4F2ED]/40">
          <div className="container-wide flex items-center justify-between py-2.5 text-[10.5px] font-mono tracking-[0.2em] uppercase text-[#6B7390]">
            <div className="flex items-center gap-4">
              <Link href="/#choose-region" className="hover:text-[#0E1421]">← All markets</Link>
              <span className="hidden sm:inline w-px h-3 bg-[rgba(14,20,33,0.20)]" />
              <span className="hidden sm:inline">edustutor.com / in</span>
            </div>
            <span className="text-[#1640D8]">🇮🇳 India · Chennai · Launch 2026</span>
          </div>
        </div>

        <div className="container-wide pt-12 md:pt-20">
          {/* Top-line classification */}
          <div className="grid grid-cols-12 gap-6 mb-8" data-anim>
            <div className="col-span-12 lg:col-span-7">
              <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[#1640D8]">
                <span className="font-display italic text-[#0E1421] mr-2">N° II</span>
                India · Chennai · Grades 6 – 10
              </p>
            </div>
            <div className="col-span-12 lg:col-span-5">
              <p className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-[#6B7390]">
                Premium structured online tuition
              </p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 items-start">
            {/* Left — masthead */}
            <div className="col-span-12 lg:col-span-8" data-anim="2">
              <h1 className="masthead" style={{ fontSize: "var(--fs-mast)" }}>
                Structured.<br />
                <em className="text-[#1640D8]">Disciplined.</em><br />
                Real progress.
              </h1>
            </div>

            {/* Right — fact panel */}
            <aside className="col-span-12 lg:col-span-4" data-anim="3">
              <div className="border border-[#0E1421] divide-y divide-[#0E1421]">
                <div className="px-5 py-4 bg-[#0E1421] text-[#F4F2ED]">
                  <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#D9A441]">
                    The EDUS Brief
                  </p>
                  <p className="font-display italic text-[18px] mt-1.5 leading-tight">
                    Premium structured tuition with disciplined academic monitoring.
                  </p>
                </div>
                {[
                  { l: "Grades", v: "6 – 10" },
                  { l: "Medium", v: "English" },
                  { l: "Subjects", v: "6 per grade" },
                  { l: "Tutors", v: "12 specialists" },
                  { l: "Per subject", v: "₹1,000 / month" },
                  { l: "All subjects", v: "₹5,000 / month" },
                ].map((row) => (
                  <div key={row.l} className="flex items-baseline justify-between px-5 py-3">
                    <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-[#6B7390]">
                      {row.l}
                    </span>
                    <span className="font-display text-[16px] tnum">{row.v}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          {/* Lower band */}
          <div className="rule-strong mt-12" />
          <div className="grid grid-cols-12 gap-6 py-8" data-anim="4">
            <div className="col-span-12 lg:col-span-7">
              <p className="font-display text-[20px] leading-[1.45] text-[#0E1421] max-w-3xl">
                Not mass coaching. EDUS is premium online tuition with weekly parent reporting,
                exam analytics, and a disciplined tutor system — built for Chennai families who
                want measurable progress between Grade 6 and Grade 10.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-5 flex flex-wrap gap-3 lg:justify-end items-end">
              <Link href="/enrol" className="btn btn-primary">Reserve a seat</Link>
              <Link href="#pricing" className="btn btn-ghost">View fees</Link>
            </div>
          </div>
          <div className="rule-strong" />
        </div>

        <Ticker tone="paper" />
      </section>

      {/* PILLARS */}
      <section className="relative py-24 md:py-32 border-t border-[rgba(14,20,33,0.10)]">
        <div className="container-wide">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-7">
              <p className="kicker"><span className="kicker-num">§ II.01</span> The EDUS difference</p>
              <h2 className="display mt-5" style={{ fontSize: "var(--fs-hero)", lineHeight: 1.0 }}>
                Rare in Chennai. <em className="accent">Standard at EDUS.</em>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5 md:pb-3">
              <p className="text-[#2C334A] text-[14.5px] leading-relaxed">
                Most Chennai tuition is unstructured. EDUS runs with academic SOPs, monitored
                tutors, and weekly parent visibility — the things successful tuition brands take
                years to add.
              </p>
            </div>
          </div>

          <div className="rule-strong mt-10" />

          <div className="grid md:grid-cols-2">
            {PILLARS.map((p, i) => (
              <article
                key={p.tag}
                className={`p-7 lg:p-10 border-b border-[rgba(14,20,33,0.10)] ${i % 2 === 0 ? "md:border-r border-[rgba(14,20,33,0.10)]" : ""}`}
              >
                <p className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-[#1640D8]">
                  {String(i + 1).padStart(2, "0")} · {p.tag}
                </p>
                <h3 className="display mt-7" style={{ fontSize: "var(--fs-h2)" }}>{p.title}</h3>
                <p className="text-[#2C334A] text-[14.5px] mt-3 leading-[1.65]">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ACADEMIC STRUCTURE */}
      <section className="relative py-24 md:py-32 border-t border-[rgba(14,20,33,0.10)]">
        <div className="container-wide">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-7">
              <p className="kicker"><span className="kicker-num">§ II.02</span> Academic structure</p>
              <h2 className="display mt-5" style={{ fontSize: "var(--fs-hero)", lineHeight: 1.0 }}>
                Six subjects. <em className="accent">Every grade.</em>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5 md:pb-3">
              <p className="text-[#2C334A] text-[14.5px] leading-relaxed">
                English medium tuition for Grades 6–10. Same six subjects across every grade,
                taught by tutors segmented into Junior (6–8) and Senior (9–10) tiers.
              </p>
            </div>
          </div>

          <div className="rule-strong mt-10" />

          <div className="grid grid-cols-12 gap-6 py-10 border-b border-[rgba(14,20,33,0.10)]">
            <div className="col-span-12 lg:col-span-3">
              <p className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-[#1640D8]">
                Subjects · per grade
              </p>
              <p className="font-display italic text-[22px] mt-2">All 6 subjects</p>
            </div>
            <div className="col-span-12 lg:col-span-9 grid grid-cols-2 sm:grid-cols-3 gap-px bg-[rgba(14,20,33,0.10)]">
              {SUBJECTS.map((s, i) => (
                <div key={s} className="bg-[#F4F2ED] px-5 py-5">
                  <p className="font-mono text-[10px] text-[#6B7390]">{String(i + 1).padStart(2, "0")}</p>
                  <p className="font-display text-[20px] mt-1">{s}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 py-10 border-b border-[rgba(14,20,33,0.10)]">
            <div className="col-span-12 lg:col-span-3">
              <p className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-[#1640D8]">
                Grade tiers
              </p>
              <p className="font-display italic text-[22px] mt-2">Two tiers</p>
            </div>
            <div className="col-span-12 lg:col-span-9 grid grid-cols-5 gap-px bg-[rgba(14,20,33,0.10)]">
              {GRADES.map((g) => (
                <div key={g.g} className={`bg-[#F4F2ED] py-7 text-center ${g.tier === "Senior" ? "bg-[#0E1421] text-[#F4F2ED]" : ""}`}>
                  <p className={`font-display text-[44px] leading-none ${g.tier === "Senior" ? "text-[#D9A441]" : ""}`}>{g.g}</p>
                  <p className={`font-mono text-[10px] uppercase tracking-wider mt-3 ${g.tier === "Senior" ? "text-[#F4F2ED]/60" : "text-[#6B7390]"}`}>
                    {g.tier}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 py-10">
            <div className="col-span-12 lg:col-span-3">
              <p className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-[#1640D8]">
                Class schedule
              </p>
              <p className="font-display italic text-[22px] mt-2">Mon – Sat</p>
              <p className="text-[12.5px] font-mono text-[#6B7390] mt-1">2 hrs / week / subject</p>
            </div>
            <div className="col-span-12 lg:col-span-9 grid grid-cols-3 gap-px bg-[rgba(14,20,33,0.10)]">
              {SCHEDULE.map((s) => (
                <div key={s.slot} className="bg-[#F4F2ED] px-5 py-6">
                  <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#6B7390]">{s.slot}</p>
                  <p className="font-display text-[22px] tnum mt-2">{s.time}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rule-strong" />
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="relative py-24 md:py-32 border-t border-[rgba(14,20,33,0.10)]">
        <div className="container-wide">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-7">
              <p className="kicker"><span className="kicker-num">§ II.03</span> Fees</p>
              <h2 className="display mt-5" style={{ fontSize: "var(--fs-hero)", lineHeight: 1.0 }}>
                Transparent. <em className="accent">Affordable.</em>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5 md:pb-3">
              <p className="text-[#2C334A] text-[14.5px] leading-relaxed">
                Pay per subject or save with the all-subject package. UPI, Google Pay, PhonePe,
                and Razorpay accepted.
              </p>
            </div>
          </div>

          <div className="rule-strong mt-10" />

          <div className="grid md:grid-cols-3">
            {PRICING.map((p, i) => (
              <article
                key={p.tag}
                className={`p-7 lg:p-10 border-b border-[rgba(14,20,33,0.10)] ${i !== 0 ? "md:border-l border-[rgba(14,20,33,0.10)]" : ""} ${p.featured ? "bg-[#0E1421] text-[#F4F2ED]" : ""}`}
              >
                <p className={`font-mono text-[10px] tracking-[0.22em] uppercase ${p.featured ? "text-[#D9A441]" : "text-[#6B7390]"}`}>
                  {p.tag}
                </p>
                <p className={`font-display mt-7 leading-none flex items-baseline gap-1.5 ${p.featured ? "text-[#F4F2ED]" : ""}`} style={{ fontSize: "52px" }}>
                  {p.price}
                  <span className={`text-[12px] font-mono tracking-tight ${p.featured ? "text-[#F4F2ED]/70" : "text-[#6B7390]"}`}>
                    {p.unit}
                  </span>
                </p>

                <ul className="mt-7 space-y-2.5 text-[13.5px]">
                  {p.bullets.map((b, j) => (
                    <li key={b} className="flex items-baseline gap-2.5">
                      <span className={`font-mono text-[10px] tnum ${p.featured ? "text-[#D9A441]" : "text-[#6B7390]"}`}>
                        {String(j + 1).padStart(2, "0")}
                      </span>
                      <span className={p.featured ? "text-[#F4F2ED]/90" : "text-[#0E1421]"}>{b}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/enrol" className={`mt-9 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase ${p.featured ? "text-[#D9A441]" : "text-[#0E1421]"}`}>
                  Enrol <span className="font-display italic text-lg leading-none">→</span>
                </Link>
              </article>
            ))}
          </div>
          <div className="rule-strong" />
          <p className="mt-6 font-mono text-[10.5px] tracking-[0.18em] uppercase text-[#6B7390]">
            Referral discount · ₹500 off when an existing student refers a new family.
          </p>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="relative py-24 md:py-32 border-t border-[rgba(14,20,33,0.10)]">
        <div className="container-wide">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-7">
              <p className="kicker"><span className="kicker-num">§ II.04</span> Launch plan · 2026</p>
              <h2 className="display mt-5" style={{ fontSize: "var(--fs-hero)", lineHeight: 1.0 }}>
                Small. Disciplined. <em className="accent">Word-of-mouth.</em>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5 md:pb-3">
              <p className="text-[#2C334A] text-[14.5px] leading-relaxed">
                Growing the way successful tuition brands grow — slowly, deliberately, on the
                back of parent trust.
              </p>
            </div>
          </div>

          <div className="rule-strong mt-10" />

          <ol>
            {TIMELINE.map((t) => (
              <li key={t.phase} className="grid grid-cols-12 gap-6 py-9 border-b border-[rgba(14,20,33,0.10)]">
                <div className="col-span-2 md:col-span-1">
                  <p className="font-display italic text-[36px] leading-none text-[#1640D8]">{t.phase}.</p>
                </div>
                <div className="col-span-10 md:col-span-7">
                  <h3 className="display leading-tight" style={{ fontSize: "var(--fs-h2)" }}>{t.title}</h3>
                  <p className="text-[#2C334A] mt-3 text-[14.5px] leading-[1.65] max-w-xl">{t.body}</p>
                </div>
                <div className="col-span-12 md:col-span-4 md:text-right font-mono text-[11px] tracking-[0.18em] uppercase text-[#6B7390]">
                  {t.date}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* GROWTH TARGETS */}
      <section className="relative py-24 md:py-32 border-t border-[rgba(14,20,33,0.10)]">
        <div className="container-wide grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-5">
            <p className="kicker"><span className="kicker-num">§ II.05</span> First year</p>
            <h2 className="display mt-5" style={{ fontSize: "var(--fs-hero)", lineHeight: 1.0 }}>
              Built to last, <em className="accent">not to rush.</em>
            </h2>
            <p className="text-[#2C334A] mt-5 text-[14.5px] leading-relaxed max-w-md">
              Three rules we never break: never compromise tutor quality, always start classes
              on time, always respond to parents quickly.
            </p>
          </div>

          <div className="col-span-12 md:col-span-7 grid grid-cols-3 divide-x divide-[rgba(14,20,33,0.10)] border-y border-[rgba(14,20,33,0.10)]">
            {[
              { k: "20", v: "Month 1" },
              { k: "50", v: "Month 3" },
              { k: "120", v: "Month 6" },
            ].map((s) => (
              <div key={s.v} className="px-5 py-9 text-center">
                <p className="font-display text-[64px] leading-none tnum text-[#0E1421]">{s.k}</p>
                <p className="text-[10.5px] font-mono uppercase tracking-[0.16em] text-[#6B7390] mt-3">
                  Students · {s.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="relative py-20 md:py-24 border-t border-[rgba(14,20,33,0.10)]">
        <div className="container-wide">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-8">
              <p className="kicker"><span className="kicker-num">§ II.06</span> Chennai operations</p>
              <h2 className="display mt-5" style={{ fontSize: "var(--fs-hero)", lineHeight: 1.0 }}>
                Talk to <em className="accent">Ms. Preethi.</em>
              </h2>
              <p className="text-[#2C334A] mt-5 text-[14.5px] leading-relaxed max-w-xl">
                Our Chennai operations lead handles admissions, parent communication, and the
                consultation that fits your child's grade and subjects.
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 md:pb-3 flex flex-wrap gap-3 md:justify-end">
              <Link href="/enrol" className="btn btn-primary">Reserve seat</Link>
              <Link href="https://wa.me/" className="btn btn-ghost">WhatsApp</Link>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
