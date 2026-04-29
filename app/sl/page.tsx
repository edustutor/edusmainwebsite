import Link from "next/link";
import { CTA } from "@/components/CTA";

export const metadata = {
  title: "Sri Lanka — National Syllabus, Cambridge & Edexcel · Online Tuition",
  description:
    "Live online classes for Grade 1 to A/L, Cambridge & Edexcel, in Sinhala, Tamil, and English medium. Group and individual tuition with AI Study Buddy and Resource Vault.",
};

const SUBJECTS_NATIONAL = [
  "Mathematics",
  "Science",
  "English",
  "Tamil",
  "Sinhala",
  "Environmental Studies",
  "History",
  "ICT",
  "Spoken English",
  "Elocution",
  "IQ",
  "Physics",
  "Chemistry",
  "Biology",
  "Combined Mathematics",
];

const SUBJECTS_INTL = [
  "Mathematics",
  "Further Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Economics",
  "Business Studies",
  "Accounting",
  "ICT",
  "English Language",
  "English Literature",
];

const PRICING = [
  {
    tag: "Group · Primary",
    price: "LKR 1,000",
    unit: "/ month",
    grades: "Grade 1 – 5",
    bullets: ["Weekly live class", "Recordings included", "Term assessments"],
    accent: "#9CC0FF",
  },
  {
    tag: "Group · Secondary",
    price: "LKR 2,000",
    unit: "/ month",
    grades: "Grade 6 – 11 · O/L",
    bullets: ["Subject-wise classes", "Recordings · revision", "Parent updates"],
    accent: "#FFE08A",
    featured: true,
  },
  {
    tag: "Group · Advanced",
    price: "LKR 2,500",
    unit: "/ month",
    grades: "Grade 12 – 13 · A/L",
    bullets: ["A/L specialised tutors", "Past paper drills", "Mock exam cycles"],
    accent: "#D9C8FF",
  },
  {
    tag: "Individual · 1:1",
    price: "LKR 2,500",
    unit: "/ hour",
    grades: "All grades · all subjects",
    bullets: ["No fixed timetable", "Tutor matched to student", "Pay-as-you-go"],
    accent: "#CFE0FF",
  },
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
      {/* HERO */}
      <section className="relative pt-32 sm:pt-36 pb-20 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid" />
          <div className="glow" style={{ top: 0, left: "-10%", width: 540, height: 540, background: "#9CC0FF" }} />
          <div className="glow" style={{ top: "30%", right: "-10%", width: 520, height: 520, background: "#FFE08A", opacity: 0.5 }} />
        </div>

        <div className="container-edge">
          <div className="flex items-center justify-between flex-wrap gap-3" data-anim>
            <Link href="/#choose-region" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-mono text-[#2B3458]">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Looking for another country or syllabus? Switch here.
            </Link>
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#5C6485]">
              edustutor.com/sl · 🇱🇰 Sri Lanka
            </p>
          </div>

          <div className="mt-10 grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <p className="font-mono text-[12px] tracking-[0.2em] uppercase text-[#0A55F5]" data-anim="2">
                Sri Lankan Learning · Global Success
              </p>
              <h1 className="display mt-3" style={{ fontSize: "var(--fs-hero)", lineHeight: 1.02 }} data-anim="3">
                🇱🇰 Experience the future of <em>quality online learning.</em>
              </h1>
            </div>
            <div className="lg:col-span-4" data-anim="4">
              <p className="text-[#2B3458] text-[17px] leading-[1.6]">
                Top-notch online tutoring from qualified Sri Lankan tutors — Grade 1 to A/L, plus
                Cambridge and Edexcel. In Sinhala, Tamil, and English medium. Group classes from
                LKR 1,000/month. One-to-one at LKR 2,500/hour.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <Link href="/enrol" className="btn btn-sun">Register now</Link>
                <Link href="tel:+94707072072" className="btn btn-ghost">Call +94 70 707 2072</Link>
              </div>
            </div>
          </div>

          {/* Pillars */}
          <div className="mt-16 grid md:grid-cols-3 gap-5" data-anim="5">
            {[
              { tag: "GROUP", title: "Group Classes", body: "Structured weekly classes by grade and subject — recordings, exams, and parent updates included." },
              { tag: "1:1", title: "Individual Classes", body: "One-to-one tutor matching with no fixed timetable. Pay per hour. Flexible across mediums and subjects." },
              { tag: "VAULT", title: "Resource Vault & AI", body: "Past papers, study notes, and the EDUS AI Study Buddy for self-paced revision between classes." },
            ].map((p, i) => (
              <div key={p.tag} className="glass rounded-3xl p-7 lift relative overflow-hidden">
                <span className="font-mono text-[10px] tracking-[0.18em] text-[#5C6485] uppercase">
                  Pillar 0{i + 1} · {p.tag}
                </span>
                <h3 className="display mt-6 leading-tight" style={{ fontSize: "var(--fs-h3)" }}>{p.title}</h3>
                <p className="text-[#2B3458] text-sm mt-3 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>

          {/* Trust strip */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 rounded-3xl overflow-hidden border border-soft bg-white/60 backdrop-blur-sm">
            {[
              { k: "5+", v: "Years of experience" },
              { k: "530+", v: "Live classes" },
              { k: "Grade 1 – A/L", v: "Coverage" },
              { k: "3 mediums", v: "Sinhala · Tamil · English" },
            ].map((s, i) => (
              <div key={i} className={`px-6 py-7 ${i !== 0 ? "border-l border-[rgba(10,18,48,0.06)]" : ""} ${i >= 2 ? "md:border-l border-[rgba(10,18,48,0.06)]" : ""}`}
                style={{ borderTop: i >= 2 ? "1px solid rgba(10,18,48,0.06)" : undefined }}>
                <p className="font-display text-[36px] leading-none tnum text-[#0A1230]">{s.k}</p>
                <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#5C6485] mt-2">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CURRICULA / SUBJECTS */}
      <section className="relative py-20 md:py-24 border-t border-[rgba(10,18,48,0.06)]">
        <div className="container-edge">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <p className="eyebrow"><span className="dot" />Subjects · all key fields</p>
              <h2 className="display mt-3" style={{ fontSize: "var(--fs-h2)" }}>
                Three curricula. <em>Every key subject.</em>
              </h2>
              <p className="text-[#5C6485] mt-4 text-[14.5px] leading-relaxed">
                Sri Lankan National Syllabus, Cambridge, and Edexcel — taught by qualified tutors
                in Sinhala, Tamil, and English medium. Group filtering by grade, syllabus, medium,
                and class type means you only see valid combinations for Sri Lanka.
              </p>
            </div>

            <div className="lg:col-span-8 space-y-5">
              <div className="glass rounded-3xl p-7">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <p className="font-mono text-[11px] tracking-[0.18em] text-[#0A55F5] uppercase">National Syllabus · Grade 1 – A/L</p>
                  <p className="font-mono text-[11px] text-[#5C6485]">Sinhala · Tamil · English medium</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-5">
                  {SUBJECTS_NATIONAL.map((s) => (
                    <span key={s} className="px-3 py-1.5 rounded-full bg-white border border-[rgba(10,18,48,0.10)] text-[13px] text-[#0A1230]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="glass rounded-3xl p-7">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <p className="font-mono text-[11px] tracking-[0.18em] text-[#0A55F5] uppercase">Cambridge · Edexcel · IGCSE & A-Level</p>
                  <p className="font-mono text-[11px] text-[#5C6485]">English medium</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-5">
                  {SUBJECTS_INTL.map((s) => (
                    <span key={s} className="px-3 py-1.5 rounded-full bg-white border border-[rgba(10,18,48,0.10)] text-[13px] text-[#0A1230]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="glass-tint rounded-3xl p-7">
                <p className="font-mono text-[11px] tracking-[0.18em] text-[#0A55F5] uppercase">
                  Essential Skill Development
                </p>
                <p className="display mt-3" style={{ fontSize: "var(--fs-h3)" }}>
                  Spoken English · Elocution · IQ training
                </p>
                <p className="text-[#2B3458] text-[14.5px] mt-2 leading-relaxed">
                  Beyond the syllabus — confidence, communication, and reasoning skills that prepare
                  Sri Lankan students for global opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="relative py-20 md:py-24 border-t border-[rgba(10,18,48,0.06)] overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="glow" style={{ bottom: "10%", left: "-8%", width: 460, height: 460, background: "#FFE08A", opacity: 0.45 }} />
        </div>
        <div className="container-edge">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <p className="eyebrow"><span className="dot" />Fees · transparent</p>
              <h2 className="display mt-3" style={{ fontSize: "var(--fs-h2)" }}>
                Affordable. <em>By design.</em>
              </h2>
            </div>
            <p className="text-[#5C6485] max-w-sm text-[14.5px]">
              Class fees in Sri Lankan rupees. Pay monthly for group classes; pay-as-you-go for individual.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRICING.map((p) => (
              <article
                key={p.tag}
                className={`relative rounded-3xl p-6 lift overflow-hidden ${p.featured ? "glass-strong" : "glass"}`}
              >
                <span aria-hidden className="glow" style={{ top: -60, right: -60, width: 200, height: 200, background: p.accent, opacity: 0.55 }} />
                <div className="relative">
                  <p className="font-mono text-[10px] tracking-[0.18em] text-[#5C6485] uppercase">{p.tag}</p>
                  <p className="display mt-4 leading-none flex items-baseline gap-1.5" style={{ fontSize: "44px" }}>
                    {p.price}
                    <span className="text-[12px] font-mono text-[#5C6485] tracking-tight">{p.unit}</span>
                  </p>
                  <p className="text-[13px] text-[#2B3458] mt-2">{p.grades}</p>

                  <ul className="mt-5 space-y-2 text-[13.5px] text-[#2B3458]">
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

                  <Link
                    href="/enrol"
                    className={`mt-7 w-full justify-center btn ${p.featured ? "btn-sun" : "btn-ghost"}`}
                  >
                    Enrol
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-8 text-xs font-mono text-[#5C6485]">
            * Indicative fees from edustutor.com/classes. Final pricing confirmed during consultation.
          </p>
        </div>
      </section>

      {/* MOBILE APP */}
      <section className="relative py-20 md:py-24 border-t border-[rgba(10,18,48,0.06)]">
        <div className="container-edge grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <p className="eyebrow"><span className="dot" />EDUS Tutor app · iOS & Android</p>
            <h2 className="display mt-3" style={{ fontSize: "var(--fs-display)" }}>
              Your classroom <em>in your pocket.</em>
            </h2>
            <p className="text-[#2B3458] text-[16.5px] mt-5 leading-relaxed max-w-lg">
              Live attendance, recordings, exams, parent monitoring, resource downloads, and the
              AI Study Buddy — in a single app. Built for Sri Lankan students learning at home,
              on the bus, or at tuition class breaks.
            </p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-2.5 text-[14px]">
              {[
                "Live class attendance",
                "Class recordings",
                "Parent monitoring",
                "Term & unit exams",
                "Resource library access",
                "AI Study Buddy",
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
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="#" className="btn btn-primary">Download for iOS</Link>
              <Link href="#" className="btn btn-ghost">Download for Android</Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] max-w-md mx-auto glass-strong rounded-[36px] overflow-hidden">
              <span aria-hidden className="glow" style={{ top: -80, left: -80, width: 320, height: 320, background: "#9CC0FF" }} />
              <span aria-hidden className="glow" style={{ bottom: -100, right: -80, width: 320, height: 320, background: "#FFE08A", opacity: 0.55 }} />
              <div className="relative h-full p-7 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-white/80 text-[10px] font-mono tracking-wider text-[#0A1230] uppercase">
                    Live · 14:32
                  </span>
                  <span className="text-[10px] font-mono text-[#5C6485]">EDUS Tutor</span>
                </div>
                <div className="mt-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5C6485]">Now playing</p>
                  <p className="display mt-2" style={{ fontSize: "26px" }}>
                    Combined Maths · A/L 2026
                  </p>
                  <p className="text-[13px] text-[#2B3458] mt-1">Differentiation — Class 14 of 36</p>
                </div>
                <div className="mt-auto space-y-2.5">
                  {[
                    { l: "Class recording · 1h 12m", t: "Available" },
                    { l: "Term 2 unit exam", t: "Mon 09:00" },
                    { l: "Parent update sent", t: "Today" },
                  ].map((r) => (
                    <div key={r.l} className="flex items-center justify-between rounded-2xl bg-white/80 px-4 py-3 border border-[rgba(10,18,48,0.06)]">
                      <span className="text-[13px] text-[#0A1230]">{r.l}</span>
                      <span className="text-[10px] font-mono text-[#5C6485] uppercase tracking-wider">{r.t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative py-20 md:py-24 border-t border-[rgba(10,18,48,0.06)] overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="glow" style={{ top: "10%", right: "-10%", width: 500, height: 500, background: "#CFE0FF" }} />
        </div>
        <div className="container-edge">
          <div className="max-w-2xl">
            <p className="eyebrow"><span className="dot" />Words from Sri Lankan families</p>
            <h2 className="display mt-3" style={{ fontSize: "var(--fs-h2)" }}>
              From Kandy to Kalmunai. <em>Real stories.</em>
            </h2>
          </div>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t) => (
              <article key={t.name} className="glass rounded-3xl p-7 lift">
                <p className="display text-[19px] leading-snug text-[#0A1230]">"{t.quote}"</p>
                <div className="mt-6 pt-5 border-t border-[rgba(10,18,48,0.06)] flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#0A1230]">{t.name}</p>
                    <p className="text-xs text-[#5C6485] font-mono">{t.role} · {t.loc}</p>
                  </div>
                  <span className="text-2xl">🇱🇰</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT BANNER */}
      <section className="relative py-20 border-t border-[rgba(10,18,48,0.06)]">
        <div className="container-edge">
          <div className="rounded-[32px] glass-strong p-8 md:p-12 grid md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <p className="eyebrow"><span className="dot" />24/7 student support</p>
              <h2 className="display mt-3" style={{ fontSize: "var(--fs-display)" }}>
                Talk to a real <em>EDUS advisor.</em>
              </h2>
              <p className="text-[#2B3458] mt-4 max-w-xl">
                Our consultants help Sri Lankan students choose the right syllabus, grade-level
                classes, medium, and tutors. Available round-the-clock.
              </p>
            </div>
            <div className="space-y-3">
              <Link href="tel:+94707072072" className="btn btn-primary w-full justify-center">
                +94 70 707 2072
              </Link>
              <Link href="https://wa.me/94707072072" className="btn btn-ghost w-full justify-center">
                WhatsApp us
              </Link>
              <p className="text-center text-xs font-mono text-[#5C6485]">
                hello@edustutor.com · 24/7
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
