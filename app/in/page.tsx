import Link from "next/link";
import { CTA } from "@/components/CTA";

export const metadata = {
  title:
    "India · Chennai — Premium Online Tuition for Grades 6–10 · EDUS",
  description:
    "Premium structured online tuition with disciplined academic monitoring. CBSE & matriculation aligned, Grades 6–10, English medium. Weekly reports, exam analytics, monthly progress to parents.",
};

const SUBJECTS = ["Tamil", "Hindi", "English", "Mathematics", "Science", "Social Science"];

const GRADES = [
  { g: "Grade 6", tier: "Junior" },
  { g: "Grade 7", tier: "Junior" },
  { g: "Grade 8", tier: "Junior" },
  { g: "Grade 9", tier: "Senior" },
  { g: "Grade 10", tier: "Senior" },
];

const SCHEDULE = [
  { slot: "Slot 1", time: "6:30 PM – 7:30 PM" },
  { slot: "Slot 2", time: "7:45 PM – 8:45 PM" },
  { slot: "Optional", time: "9:00 PM – 10:00 PM" },
];

const PRICING = [
  {
    tag: "Admission Fee",
    price: "₹2,000",
    unit: "one-time",
    bullets: ["Onboarding & assessment", "Account setup", "Welcome pack"],
    accent: "#9CC0FF",
  },
  {
    tag: "Per Subject",
    price: "₹1,000",
    unit: "/ month",
    bullets: ["2 hours / week per subject", "Live + recorded", "Weekly reporting"],
    accent: "#FFE08A",
  },
  {
    tag: "All-Subject Package",
    price: "₹5,000",
    unit: "/ month",
    bullets: ["All 6 subjects covered", "Save vs. per-subject", "Priority parent support"],
    accent: "#D9C8FF",
    featured: true,
  },
];

const PILLARS = [
  {
    tag: "MONITORING",
    title: "Structured monitoring",
    body: "Class observation, tutor feedback, and academic SOPs run every month — not as a marketing line, as a process.",
  },
  {
    tag: "REPORTING",
    title: "Weekly reporting",
    body: "Attendance, homework, and topic-by-topic progress shared with parents every week. No black box.",
  },
  {
    tag: "ANALYTICS",
    title: "Exam analytics",
    body: "Term and unit exams modelled on board paper structure, scored against subject benchmarks each month.",
  },
  {
    tag: "DISCIPLINE",
    title: "Disciplined tutor system",
    body: "Vetted, demo-tested, interviewed, trained. Always on time. Always on syllabus. Always accountable.",
  },
];

const TIMELINE = [
  { phase: "Phase 1", title: "Infrastructure", body: "Phone, banking, payment gateway, CRM, website, Google Classroom — all live and stress-tested.", date: "Mar 1 – Mar 31" },
  { phase: "Phase 2", title: "Tutor recruitment", body: "12 vetted tutors hired through application, demo class, interview, and onboarding training.", date: "Mar 15 – Apr 5" },
  { phase: "Phase 3", title: "Senior cohort", body: "Marketing for Grades 9–10. First batch of 20 students. Classes begin.", date: "May 1" },
  { phase: "Phase 4", title: "Full launch", body: "Grades 6, 7, 8 marketing pushed. Classes begin June 1.", date: "Jun 1" },
];

export default function IndiaPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-28 sm:pt-32 pb-20 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid" />
          <div className="glow" style={{ top: "-6%", left: "-10%", width: 480, height: 480, background: "#FFE08A", opacity: 0.6 }} />
          <div className="glow" style={{ top: "20%", right: "-8%", width: 520, height: 520, background: "#9CC0FF" }} />
          <div className="glow" style={{ top: "60%", left: "30%", width: 420, height: 420, background: "#D9C8FF", opacity: 0.5 }} />
        </div>

        <div className="container-edge">
          <div className="flex items-center justify-between flex-wrap gap-3" data-anim>
            <Link href="/#choose-region" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-mono text-[#2B3458]">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Looking for another country or syllabus? Switch here.
            </Link>
            <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#5C6485]">
              edustutor.com/in · 🇮🇳 Chennai
            </p>
          </div>

          <div className="mt-10 grid lg:grid-cols-12 gap-x-10 gap-y-8 items-end">
            <div className="lg:col-span-7">
              <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[#0A55F5]" data-anim="2">
                Premium online tuition · Chennai · Grades 6–10
              </p>
              <h1
                data-anim="3"
                className="display mt-4"
                style={{ fontSize: "var(--fs-hero)", lineHeight: 1.02 }}
              >
                Structured tuition.<br />
                <em>Disciplined monitoring.</em><br />
                Real progress.
              </h1>
            </div>

            <div data-anim="4" className="lg:col-span-5 lg:pb-2">
              <p className="text-[#2B3458] text-[16px] leading-[1.6] max-w-md">
                EDUS is not mass coaching. It's premium online tuition with weekly parent reporting,
                exam analytics, and a disciplined tutor system — built for Chennai families who
                want measurable progress between Grade 6 and Grade 10.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/enrol" className="btn btn-sun">Reserve a seat</Link>
                <Link href="#pricing" className="btn btn-ghost">View fees</Link>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {["English medium", "CBSE / Matriculation", "₹1,000 / subject", "Weekly reports"].map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-full glass text-[11px] font-mono text-[#2B3458]">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Trust strip */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 rounded-3xl overflow-hidden border border-soft bg-white/65 backdrop-blur-sm">
            {[
              { k: "6 – 10", v: "Grades covered" },
              { k: "6", v: "Subjects per grade" },
              { k: "12", v: "Vetted tutors" },
              { k: "Weekly", v: "Parent reports" },
            ].map((s, i) => (
              <div
                key={i}
                className={`px-5 py-6 ${i % 2 !== 0 ? "border-l border-[rgba(10,18,48,0.06)]" : ""} ${i >= 2 ? "border-t md:border-t-0 border-[rgba(10,18,48,0.06)]" : ""} ${i === 2 ? "md:border-l border-[rgba(10,18,48,0.06)]" : ""}`}
              >
                <p className="font-display text-[28px] sm:text-[32px] leading-none tnum text-[#0A1230]">{s.k}</p>
                <p className="text-[10.5px] font-mono uppercase tracking-[0.16em] text-[#5C6485] mt-2">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POSITIONING / 4 PILLARS */}
      <section className="relative py-20 md:py-24 border-t border-[rgba(10,18,48,0.06)]">
        <div className="container-edge">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <p className="eyebrow"><span className="dot" />The EDUS difference</p>
              <h2 className="display mt-3" style={{ fontSize: "var(--fs-display)" }}>
                Rare in Chennai. <em>Standard at EDUS.</em>
              </h2>
              <p className="text-[#5C6485] mt-4 text-[14.5px] leading-relaxed">
                Most Chennai tuition is unstructured. EDUS runs with academic SOPs, monitored tutors,
                and weekly parent visibility — the things successful tuition brands take years to add.
              </p>
            </div>
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
              {PILLARS.map((p, i) => (
                <article key={p.tag} className="glass rounded-3xl p-7 lift">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.18em] text-[#0A55F5] uppercase">
                      0{i + 1} · {p.tag}
                    </span>
                  </div>
                  <h3 className="display mt-5 leading-tight" style={{ fontSize: "var(--fs-h3)" }}>{p.title}</h3>
                  <p className="text-[#2B3458] text-[14.5px] mt-3 leading-relaxed">{p.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ACADEMIC STRUCTURE */}
      <section className="relative py-20 md:py-24 border-t border-[rgba(10,18,48,0.06)] overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="glow" style={{ top: "10%", right: "-8%", width: 460, height: 460, background: "#FFE08A", opacity: 0.45 }} />
        </div>
        <div className="container-edge">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <p className="eyebrow"><span className="dot" />Academic structure</p>
              <h2 className="display mt-3" style={{ fontSize: "var(--fs-display)" }}>
                Six subjects. <em>Every grade.</em>
              </h2>
            </div>
            <p className="text-[#5C6485] max-w-md text-[14.5px]">
              English medium tuition for Grades 6–10. The same six subjects across every grade,
              taught by tutors segmented into Junior (6–8) and Senior (9–10) tiers.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-5">
            {/* Subjects */}
            <div className="lg:col-span-7 glass rounded-3xl p-7">
              <p className="font-mono text-[11px] tracking-[0.18em] text-[#0A55F5] uppercase">Subjects · per grade</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-5">
                {SUBJECTS.map((s) => (
                  <span key={s} className="px-3.5 py-2.5 rounded-2xl bg-white border border-[rgba(10,18,48,0.10)] text-[13.5px] text-[#0A1230] font-medium text-center">
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-5 gap-2.5">
                {GRADES.map((g) => (
                  <div key={g.g} className="rounded-2xl bg-white border border-[rgba(10,18,48,0.06)] p-3 text-center">
                    <p className="font-display text-[20px] text-[#0A1230]">{g.g.replace("Grade ", "")}</p>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-[#5C6485] mt-1">{g.tier}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Class model */}
            <div className="lg:col-span-5 glass-tint rounded-3xl p-7">
              <p className="font-mono text-[11px] tracking-[0.18em] text-[#0A55F5] uppercase">Class model</p>
              <p className="display mt-3" style={{ fontSize: "var(--fs-h3)" }}>
                2 hours / week / subject
              </p>
              <p className="text-[#2B3458] text-[14px] mt-2">
                Either 1 hour × 2 sessions, or 2 hours single session. Monday – Saturday.
              </p>
              <div className="mt-5 space-y-2.5">
                {SCHEDULE.map((s) => (
                  <div key={s.slot} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 border border-[rgba(10,18,48,0.06)]">
                    <span className="text-[13px] font-medium text-[#0A1230]">{s.slot}</span>
                    <span className="text-[12px] font-mono text-[#2B3458] tnum">{s.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="relative py-20 md:py-24 border-t border-[rgba(10,18,48,0.06)] overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="glow" style={{ bottom: "5%", left: "-10%", width: 460, height: 460, background: "#9CC0FF", opacity: 0.5 }} />
        </div>
        <div className="container-edge">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <p className="eyebrow"><span className="dot" />Fees</p>
              <h2 className="display mt-3" style={{ fontSize: "var(--fs-display)" }}>
                Transparent. <em>Affordable.</em>
              </h2>
            </div>
            <p className="text-[#5C6485] max-w-sm text-[14.5px]">
              Pay per subject or save with the all-subject package. UPI, Google Pay, PhonePe, and Razorpay accepted.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {PRICING.map((p) => (
              <article
                key={p.tag}
                className={`relative rounded-3xl p-7 lift overflow-hidden ${p.featured ? "glass-strong" : "glass"}`}
              >
                <span aria-hidden className="glow" style={{ top: -60, right: -60, width: 220, height: 220, background: p.accent, opacity: 0.6 }} />
                <div className="relative">
                  <p className="font-mono text-[10px] tracking-[0.18em] text-[#5C6485] uppercase">{p.tag}</p>
                  <p className="display mt-4 leading-none flex items-baseline gap-1.5" style={{ fontSize: "44px" }}>
                    {p.price}
                    <span className="text-[12px] font-mono text-[#5C6485] tracking-tight">{p.unit}</span>
                  </p>

                  <ul className="mt-6 space-y-2 text-[13.5px] text-[#2B3458]">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <span className="inline-flex w-4 h-4 mt-0.5 rounded-full bg-[#0A55F5]/10 items-center justify-center shrink-0">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0A55F5" strokeWidth="3" aria-hidden>
                            <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  <Link href="/enrol" className={`mt-7 w-full justify-center btn ${p.featured ? "btn-sun" : "btn-ghost"}`}>
                    Enrol
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-6 text-xs font-mono text-[#5C6485]">
            Referral discount: ₹500 off when an existing student refers a new family.
          </p>
        </div>
      </section>

      {/* PARENT TRUST SYSTEM */}
      <section className="relative py-20 md:py-24 border-t border-[rgba(10,18,48,0.06)]">
        <div className="container-edge grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <p className="eyebrow"><span className="dot" />Parent trust system</p>
            <h2 className="display mt-3" style={{ fontSize: "var(--fs-display)" }}>
              A monthly report parents <em>actually want.</em>
            </h2>
            <p className="text-[#2B3458] text-[16.5px] mt-5 leading-relaxed max-w-lg">
              Every student and parent receives a monthly progress report covering attendance,
              homework completion, and exam marks. Class observation, tutor feedback, and parent
              communication run on a fixed monthly cycle — not on demand, not when requested.
            </p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-2.5 text-[14px]">
              {[
                "Attendance log",
                "Homework completion",
                "Term & unit exam marks",
                "Tutor observations",
                "Parent-teacher Q&A",
                "Topic-level mastery",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-[#2B3458]">
                  <span className="inline-flex w-4 h-4 rounded-full bg-[#0A55F5]/10 items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0A55F5" strokeWidth="3" aria-hidden>
                      <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="glass-strong rounded-[28px] p-7 relative overflow-hidden">
              <span aria-hidden className="glow" style={{ top: -80, right: -80, width: 320, height: 320, background: "#FFE08A", opacity: 0.55 }} />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-white/80 text-[10px] font-mono tracking-wider text-[#0A1230] uppercase">
                    Progress · Oct 2026
                  </span>
                  <span className="text-[10px] font-mono text-[#5C6485]">Grade 9 · CBSE</span>
                </div>
                <p className="display mt-5" style={{ fontSize: "26px" }}>Monthly progress report</p>
                <p className="text-[12.5px] text-[#2B3458] mt-1">Aishwarya M. · Velachery, Chennai</p>

                <div className="mt-5 grid grid-cols-3 gap-2.5">
                  {[
                    { l: "Attendance", v: "96%" },
                    { l: "Homework", v: "12 / 12" },
                    { l: "Unit exam", v: "82%" },
                  ].map((m) => (
                    <div key={m.l} className="rounded-2xl bg-white px-3 py-3 border border-[rgba(10,18,48,0.06)]">
                      <p className="font-display text-[22px] tnum text-[#0A1230]">{m.v}</p>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-[#5C6485] mt-1">{m.l}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 space-y-2">
                  {[
                    { s: "Mathematics", t: "On-track · Trigonometry chapter complete" },
                    { s: "Science", t: "Strong · Physics > Chemistry > Biology" },
                    { s: "English", t: "Improving · grammar consistency up" },
                  ].map((row) => (
                    <div key={row.s} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 border border-[rgba(10,18,48,0.06)]">
                      <span className="text-[13px] font-medium text-[#0A1230]">{row.s}</span>
                      <span className="text-[11px] font-mono text-[#2B3458]">{row.t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TUTOR SYSTEM */}
      <section className="relative py-20 md:py-24 border-t border-[rgba(10,18,48,0.06)]">
        <div className="container-edge">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <p className="eyebrow"><span className="dot" />Tutor system</p>
              <h2 className="display mt-3" style={{ fontSize: "var(--fs-display)" }}>
                Two tiers. <em>Twelve tutors.</em>
              </h2>
              <p className="text-[#5C6485] mt-4 text-[14.5px] leading-relaxed">
                Junior and Senior tiers, one specialist tutor per subject per tier. Recruited via
                application, demo class, interview, and onboarding training.
              </p>
            </div>

            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
              <div className="glass rounded-3xl p-7">
                <p className="font-mono text-[11px] tracking-[0.18em] text-[#0A55F5] uppercase">Tier 1 · Junior</p>
                <p className="display mt-3" style={{ fontSize: "var(--fs-h3)" }}>Grades 6 – 8</p>
                <p className="text-[#2B3458] text-[14px] mt-2">6 subject specialists building foundations.</p>
                <div className="mt-5 pt-4 border-t border-[rgba(10,18,48,0.06)] flex items-center justify-between">
                  <span className="text-[12px] font-mono text-[#5C6485]">6 tutors · 1 per subject</span>
                  <span className="text-[12px] font-mono text-[#0A1230]">Foundation tier</span>
                </div>
              </div>
              <div className="glass-tint rounded-3xl p-7">
                <p className="font-mono text-[11px] tracking-[0.18em] text-[#0A55F5] uppercase">Tier 2 · Senior</p>
                <p className="display mt-3" style={{ fontSize: "var(--fs-h3)" }}>Grades 9 – 10</p>
                <p className="text-[#2B3458] text-[14px] mt-2">6 senior subject specialists for board-level rigor.</p>
                <div className="mt-5 pt-4 border-t border-[rgba(10,18,48,0.06)] flex items-center justify-between">
                  <span className="text-[12px] font-mono text-[#5C6485]">6 tutors · 1 per subject</span>
                  <span className="text-[12px] font-mono text-[#0A1230]">Board tier</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE / LAUNCH PLAN */}
      <section className="relative py-20 md:py-24 border-t border-[rgba(10,18,48,0.06)] overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="glow" style={{ top: "20%", left: "-10%", width: 480, height: 480, background: "#D9C8FF", opacity: 0.5 }} />
        </div>
        <div className="container-edge">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <p className="eyebrow"><span className="dot" />Launch plan · 2026</p>
              <h2 className="display mt-3" style={{ fontSize: "var(--fs-display)" }}>
                Small. Disciplined. <em>Word-of-mouth.</em>
              </h2>
            </div>
            <p className="text-[#5C6485] max-w-md text-[14.5px]">
              We're growing the way successful tuition brands grow — slowly, deliberately, and on
              the back of parent trust.
            </p>
          </div>

          <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TIMELINE.map((t, i) => (
              <li key={t.phase} className="glass rounded-3xl p-6 lift">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-[#0A55F5] uppercase">{t.phase}</span>
                  <span className="font-display text-[18px] text-[#0A1230]">0{i + 1}</span>
                </div>
                <h3 className="display mt-5 leading-tight" style={{ fontSize: "var(--fs-h3)" }}>{t.title}</h3>
                <p className="text-[#2B3458] text-[13.5px] mt-2 leading-relaxed">{t.body}</p>
                <div className="mt-5 pt-4 border-t border-[rgba(10,18,48,0.06)] text-[11px] font-mono text-[#5C6485]">
                  {t.date}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* GROWTH TARGETS */}
      <section className="relative py-20 md:py-24 border-t border-[rgba(10,18,48,0.06)]">
        <div className="container-edge">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-5">
              <p className="eyebrow"><span className="dot" />First year goals</p>
              <h2 className="display mt-3" style={{ fontSize: "var(--fs-display)" }}>
                Built to last, <em>not to rush.</em>
              </h2>
              <p className="text-[#5C6485] mt-4 text-[14.5px] leading-relaxed max-w-md">
                Three rules we don't break: never compromise tutor quality, always start classes
                on time, always respond to parents quickly.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-3 rounded-3xl overflow-hidden border border-soft bg-white/65 backdrop-blur-sm">
              {[
                { k: "20", v: "Month 1" },
                { k: "50", v: "Month 3" },
                { k: "120", v: "Month 6" },
              ].map((s, i) => (
                <div key={i} className={`px-5 py-7 text-center ${i !== 0 ? "border-l border-[rgba(10,18,48,0.06)]" : ""}`}>
                  <p className="font-display text-[40px] sm:text-[52px] leading-none tnum text-[#0A1230]">{s.k}</p>
                  <p className="text-[10.5px] font-mono uppercase tracking-[0.16em] text-[#5C6485] mt-3">Students · {s.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT BANNER */}
      <section className="relative py-20 border-t border-[rgba(10,18,48,0.06)]">
        <div className="container-edge">
          <div className="rounded-[32px] glass-strong p-8 md:p-12 grid md:grid-cols-3 gap-6 items-center relative overflow-hidden">
            <span aria-hidden className="glow" style={{ top: -100, right: -50, width: 320, height: 320, background: "#FFE08A", opacity: 0.5 }} />
            <div className="md:col-span-2 relative">
              <p className="eyebrow"><span className="dot" />EDUS Chennai</p>
              <h2 className="display mt-3" style={{ fontSize: "var(--fs-display)" }}>
                Talk to <em>Ms. Preethi.</em>
              </h2>
              <p className="text-[#2B3458] mt-4 max-w-xl text-[15px]">
                Our Chennai operations lead handles admissions, parent communication, and the
                consultation that fits your child's grade and subjects.
              </p>
            </div>
            <div className="space-y-3 relative">
              <Link href="/enrol" className="btn btn-primary w-full justify-center">
                Reserve a seat
              </Link>
              <Link href="https://wa.me/" className="btn btn-ghost w-full justify-center">
                WhatsApp Business
              </Link>
              <p className="text-center text-xs font-mono text-[#5C6485]">
                Chennai regional office · CBSE / Matriculation
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
