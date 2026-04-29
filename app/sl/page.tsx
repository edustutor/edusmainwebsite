import Link from "next/link";
import { CTA } from "@/components/CTA";
import { Ticker } from "@/components/Ticker";

export const metadata = {
  title: "Sri Lanka — National Syllabus, Cambridge & Edexcel · Online Tuition",
  description:
    "Live online classes for Grade 1 to A/L, Cambridge & Edexcel, in Sinhala, Tamil, and English medium. Group and individual tuition with AI Study Buddy and Resource Vault.",
};

const SUBJECTS_NATIONAL = [
  "Mathematics", "Science", "English", "Tamil", "Sinhala",
  "Environmental Studies", "History", "ICT", "Spoken English",
  "Elocution", "IQ", "Physics", "Chemistry", "Biology", "Combined Mathematics",
];
const SUBJECTS_INTL = [
  "Mathematics", "Further Mathematics", "Physics", "Chemistry", "Biology",
  "Economics", "Business Studies", "Accounting", "ICT", "English Language", "English Literature",
];
const PRICING = [
  { tag: "Group · Primary", price: "LKR 1,000", unit: "/ month", grades: "Grade 1 – 5", bullets: ["Weekly live class", "Recordings included", "Term assessments"] },
  { tag: "Group · Secondary", price: "LKR 2,000", unit: "/ month", grades: "Grade 6 – 11 · O/L", bullets: ["Subject-wise classes", "Recordings · revision", "Parent updates"], featured: true },
  { tag: "Group · Advanced", price: "LKR 2,500", unit: "/ month", grades: "Grade 12 – 13 · A/L", bullets: ["A/L specialised tutors", "Past paper drills", "Mock exam cycles"] },
  { tag: "Individual · 1:1", price: "LKR 2,500", unit: "/ hour", grades: "All grades · all subjects", bullets: ["No fixed timetable", "Tutor matched to student", "Pay-as-you-go"] },
];
const TESTIMONIALS = [
  { name: "K. Ellakiya", loc: "Kandy", role: "Student", quote: "EDUS's platform is incredibly user-friendly. I can access my courses and materials anytime." },
  { name: "P. Vijithan", loc: "Colombo", role: "Student", quote: "Their Cambridge courses are great, but the best part is the online forums and the community." },
  { name: "T. Kalaivani", loc: "Kalmunai", role: "Parent", quote: "EDUS is perfect for working moms. Their online platform lets my daughter learn anytime." },
  { name: "A. Chellakumar, LLB", loc: "Galle", role: "Parent", quote: "EDUS provides affordable and high-quality online courses that cater to diverse needs." },
  { name: "C. Kajansika", loc: "Batticaloa", role: "Student", quote: "What I love about EDUS is the community. Even online, I feel connected to my peers." },
];

export default function SriLankaPage() {
  return (
    <>
      {/* HERO — Sri Lanka edition. Asymmetric editorial split. */}
      <section className="relative pt-20">
        <div className="border-b border-[rgba(14,20,33,0.10)] bg-[#F4F2ED]/40">
          <div className="container-wide flex items-center justify-between py-2.5 text-[10.5px] font-mono tracking-[0.2em] uppercase text-[#6B7390]">
            <div className="flex items-center gap-4">
              <Link href="/#choose-region" className="hover:text-[#0E1421]">← All markets</Link>
              <span className="hidden sm:inline w-px h-3 bg-[rgba(14,20,33,0.20)]" />
              <span className="hidden sm:inline">edustutor.com / sl</span>
            </div>
            <span className="text-[#1640D8]">🇱🇰 Sri Lanka · Flagship</span>
          </div>
        </div>

        <div className="container-wide pt-12 md:pt-20">
          <div className="grid grid-cols-12 gap-6">
            {/* Left column — kicker + meta */}
            <div className="col-span-12 lg:col-span-3" data-anim>
              <p className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-[#6B7390]">
                <span className="font-display italic text-[#0E1421] mr-2">N° I</span>
                Sri Lanka Edition
              </p>
              <div className="rule-strong mt-5" />
              <p className="text-[#2C334A] text-[14px] leading-[1.65] mt-5">
                The flagship market. Live online tutoring from qualified tutors at the comfort
                of your home — Grade 1 through A/L, in Sinhala, Tamil, and English medium.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["G1 – A/L", "Sinhala · Tamil · English", "National + Cambridge"].map((t) => (
                  <span key={t} className="px-2 py-0.5 text-[10.5px] font-mono uppercase tracking-wider text-[#6B7390] border border-[rgba(14,20,33,0.14)]">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Center column — masthead */}
            <div className="col-span-12 lg:col-span-9" data-anim="2">
              <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[#1640D8] mb-6">
                Sri Lankan Learning · Global Success
              </p>
              <h1 className="masthead" style={{ fontSize: "var(--fs-mast)" }}>
                Quality<br />
                online<br />
                <em className="text-[#1640D8]">learning.</em>
              </h1>
            </div>
          </div>

          {/* Lower row */}
          <div className="rule-strong mt-12" />
          <div className="grid grid-cols-12 gap-6 py-8" data-anim="3">
            <div className="col-span-12 lg:col-span-3 lg:col-start-4 flex items-center">
              <p className="text-[#2C334A] text-[15px] leading-[1.55]">
                Group classes from <span className="font-display italic text-[#0E1421]">LKR 1,000/month</span>.
                One-to-one at <span className="font-display italic text-[#0E1421]">LKR 2,500/hour</span>.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-3 flex items-center">
              <div className="flex flex-wrap gap-2">
                <Link href="/enrol" className="btn btn-primary">Register</Link>
                <Link href="tel:+94707072072" className="btn btn-ghost">+94 70 707 2072</Link>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-3 flex items-center justify-end">
              <p className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-[#6B7390]">
                Live · 24/7 student support
              </p>
            </div>
          </div>
          <div className="rule-strong" />
        </div>

        <Ticker tone="paper" />

        {/* Pillars — three columns */}
        <div className="container-wide pt-20 md:pt-24">
          <p className="kicker"><span className="kicker-num">§ I.01</span> Three pillars</p>
          <div className="rule-strong mt-6" />
          <div className="grid md:grid-cols-3" data-anim="4">
            {[
              { tag: "GROUP", title: "Group Classes", body: "Structured weekly classes by grade and subject — recordings, exams, and parent updates included." },
              { tag: "1:1", title: "Individual Classes", body: "One-to-one tutor matching with no fixed timetable. Pay per hour. Flexible across mediums and subjects." },
              { tag: "VAULT", title: "Resource Vault & AI", body: "Past papers, study notes, and the EDUS AI Study Buddy for self-paced revision between classes." },
            ].map((p, i) => (
              <div key={p.tag} className={`p-7 lg:p-10 border-b border-[rgba(14,20,33,0.10)] md:border-b-0 ${i !== 0 ? "md:border-l border-[rgba(14,20,33,0.10)]" : ""}`}>
                <p className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-[#1640D8]">
                  Pillar {String(i + 1).padStart(2, "0")} · {p.tag}
                </p>
                <h3 className="display mt-7" style={{ fontSize: "var(--fs-h2)" }}>{p.title}</h3>
                <p className="text-[#2C334A] text-[14.5px] mt-3 leading-[1.65]">{p.body}</p>
              </div>
            ))}
          </div>
          <div className="rule-strong" />
        </div>
      </section>

      {/* CURRICULA & SUBJECTS */}
      <section className="relative py-24 md:py-32 border-t border-[rgba(14,20,33,0.10)]">
        <div className="container-wide">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-7">
              <p className="kicker"><span className="kicker-num">§ I.02</span> Subjects</p>
              <h2 className="display mt-5" style={{ fontSize: "var(--fs-hero)", lineHeight: 1.0 }}>
                Three curricula. <em className="accent">Every key subject.</em>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5 md:pb-3">
              <p className="text-[#2C334A] text-[14.5px] leading-relaxed">
                Sri Lankan National Syllabus, Cambridge, and Edexcel — taught by qualified tutors
                in Sinhala, Tamil, and English medium. Filtering by grade, syllabus, medium, and
                class type means only valid combinations show.
              </p>
            </div>
          </div>

          <div className="rule-strong mt-10" />

          {/* National */}
          <div className="py-10 border-b border-[rgba(14,20,33,0.10)]">
            <div className="grid grid-cols-12 gap-6 items-baseline">
              <div className="col-span-12 lg:col-span-3">
                <p className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-[#1640D8]">
                  N° 01 · National Syllabus
                </p>
                <p className="font-display italic text-[22px] mt-2">Grade 1 – A/L</p>
                <p className="text-[12.5px] font-mono text-[#6B7390] mt-1">Sinhala · Tamil · English</p>
              </div>
              <div className="col-span-12 lg:col-span-9 flex flex-wrap gap-1.5">
                {SUBJECTS_NATIONAL.map((s) => (
                  <span key={s} className="px-3 py-1.5 text-[12.5px] font-medium border border-[rgba(14,20,33,0.18)] bg-white/40">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* International */}
          <div className="py-10 border-b border-[rgba(14,20,33,0.10)]">
            <div className="grid grid-cols-12 gap-6 items-baseline">
              <div className="col-span-12 lg:col-span-3">
                <p className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-[#1640D8]">
                  N° 02 · Cambridge & Edexcel
                </p>
                <p className="font-display italic text-[22px] mt-2">IGCSE · A-Level</p>
                <p className="text-[12.5px] font-mono text-[#6B7390] mt-1">English medium</p>
              </div>
              <div className="col-span-12 lg:col-span-9 flex flex-wrap gap-1.5">
                {SUBJECTS_INTL.map((s) => (
                  <span key={s} className="px-3 py-1.5 text-[12.5px] font-medium border border-[rgba(14,20,33,0.18)] bg-white/40">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="py-10">
            <div className="grid grid-cols-12 gap-6 items-baseline">
              <div className="col-span-12 lg:col-span-3">
                <p className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-[#1640D8]">
                  N° 03 · Essential Skills
                </p>
                <p className="font-display italic text-[22px] mt-2">Beyond syllabus</p>
                <p className="text-[12.5px] font-mono text-[#6B7390] mt-1">Confidence training</p>
              </div>
              <div className="col-span-12 lg:col-span-9">
                <p className="font-display text-[28px] leading-[1.2]">
                  Spoken English · Elocution · IQ training
                </p>
                <p className="text-[#2C334A] text-[14.5px] mt-3 max-w-2xl">
                  Communication, confidence, and reasoning skills that prepare Sri Lankan students
                  for global opportunities — outside the standard curriculum.
                </p>
              </div>
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
              <p className="kicker"><span className="kicker-num">§ I.03</span> Fees · transparent</p>
              <h2 className="display mt-5" style={{ fontSize: "var(--fs-hero)", lineHeight: 1.0 }}>
                Affordable. <em className="accent">By design.</em>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5 md:pb-3">
              <p className="text-[#2C334A] text-[14.5px] leading-relaxed">
                Class fees in Sri Lankan rupees. Pay monthly for group classes; pay-as-you-go
                for individual sessions.
              </p>
            </div>
          </div>

          <div className="rule-strong mt-10" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4">
            {PRICING.map((p, i) => (
              <article
                key={p.tag}
                className={`p-7 lg:p-9 border-b border-[rgba(14,20,33,0.10)] ${i !== 0 ? "lg:border-l border-[rgba(14,20,33,0.10)]" : ""} ${p.featured ? "bg-[#0E1421] text-[#F4F2ED]" : ""}`}
              >
                <p className={`font-mono text-[10px] tracking-[0.22em] uppercase ${p.featured ? "text-[#D9A441]" : "text-[#6B7390]"}`}>
                  {p.tag}
                </p>
                <p className={`font-display mt-7 leading-none flex items-baseline gap-1.5 ${p.featured ? "text-[#F4F2ED]" : ""}`} style={{ fontSize: "44px" }}>
                  {p.price}
                  <span className={`text-[12px] font-mono tracking-tight ${p.featured ? "text-[#F4F2ED]/70" : "text-[#6B7390]"}`}>
                    {p.unit}
                  </span>
                </p>
                <p className={`text-[13px] mt-2 ${p.featured ? "text-[#F4F2ED]/80" : "text-[#2C334A]"}`}>{p.grades}</p>

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
            * Indicative fees from edustutor.com/classes. Confirmed during consultation.
          </p>
        </div>
      </section>

      {/* MOBILE APP */}
      <section className="relative py-24 md:py-32 border-t border-[rgba(14,20,33,0.10)]">
        <div className="container-wide grid grid-cols-12 gap-10 items-center">
          <div className="col-span-12 lg:col-span-7">
            <p className="kicker"><span className="kicker-num">§ I.04</span> EDUS Tutor App · iOS & Android</p>
            <h2 className="display mt-5" style={{ fontSize: "var(--fs-hero)", lineHeight: 1.0 }}>
              Your classroom <em className="accent">in your pocket.</em>
            </h2>
            <p className="text-[#2C334A] text-[16px] mt-6 leading-[1.7] max-w-lg">
              Live attendance, recordings, exams, parent monitoring, resource downloads, and
              the AI Study Buddy — in a single app. Built for Sri Lankan students learning at
              home, on the bus, or at tuition class breaks.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-px bg-[rgba(14,20,33,0.10)]">
              {[
                "Live class attendance", "Class recordings",
                "Parent monitoring", "Term & unit exams",
                "Resource library access", "AI Study Buddy",
              ].map((f) => (
                <div key={f} className="bg-[#F4F2ED] py-4 px-5 flex items-center gap-3 text-[13.5px] text-[#0E1421]">
                  <span className="font-display italic text-[#1640D8]">✓</span>
                  {f}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#" className="btn btn-primary">Download for iOS</Link>
              <Link href="#" className="btn btn-ghost">Download for Android</Link>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <div className="relative aspect-[4/5] max-w-md mx-auto bg-[#0E1421] text-[#F4F2ED] p-7 border border-white/10">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 text-[10px] font-mono tracking-wider uppercase bg-[#D9A441] text-[#0E1421]">
                  Live · 14:32
                </span>
                <span className="text-[10px] font-mono text-white/50">EDUS Tutor</span>
              </div>
              <div className="mt-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#D9A441]">Now playing</p>
                <p className="display mt-3 text-[#F4F2ED]" style={{ fontSize: "26px", lineHeight: 1.05 }}>
                  Combined Maths<br /><em>A/L 2026</em>
                </p>
                <p className="text-[12.5px] text-white/60 mt-2 font-mono">Differentiation · Class 14 of 36</p>
              </div>

              <div className="absolute left-7 right-7 bottom-7 space-y-px bg-white/10">
                {[
                  { l: "Class recording · 1h 12m", t: "Available" },
                  { l: "Term 2 unit exam", t: "Mon 09:00" },
                  { l: "Parent update sent", t: "Today" },
                ].map((r) => (
                  <div key={r.l} className="bg-[#0E1421] flex items-center justify-between px-4 py-3 border-l border-[#D9A441]">
                    <span className="text-[12px] text-[#F4F2ED]">{r.l}</span>
                    <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">{r.t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative py-24 md:py-32 border-t border-[rgba(14,20,33,0.10)]">
        <div className="container-wide">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-8">
              <p className="kicker"><span className="kicker-num">§ I.05</span> Words from Sri Lankan families</p>
              <h2 className="display mt-5" style={{ fontSize: "var(--fs-hero)", lineHeight: 1.0 }}>
                From Kandy to Kalmunai. <em className="accent">Real stories.</em>
              </h2>
            </div>
          </div>

          <div className="rule-strong mt-10" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <article
                key={t.name}
                className={`p-7 lg:p-9 border-b border-[rgba(14,20,33,0.10)] ${(i + 1) % 3 !== 0 ? "lg:border-r border-[rgba(14,20,33,0.10)]" : ""} ${i % 2 !== 0 ? "md:border-l border-[rgba(14,20,33,0.10)]" : ""}`}
              >
                <span className="font-display italic text-[40px] leading-none text-[#1640D8]">"</span>
                <p className="font-display text-[19px] leading-[1.45] text-[#0E1421] mt-2">
                  {t.quote}
                </p>
                <div className="mt-7 pt-5 border-t border-[rgba(14,20,33,0.10)]">
                  <p className="text-[14px] font-medium">{t.name}</p>
                  <p className="text-[11px] text-[#6B7390] font-mono mt-0.5 uppercase tracking-wider">{t.role} · {t.loc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
