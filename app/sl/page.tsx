import Link from "next/link";
import { CTA } from "@/components/CTA";

export const metadata = {
  title: "Sri Lanka - National Syllabus, Cambridge & Edexcel · Online Tuition",
  description:
    "Live online classes for Grade 1 to A/L, Cambridge & Edexcel, in Sinhala, Tamil, and English medium. Group and individual tuition with expert tutors and parent updates.",
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
  {
    tag: "Group · Primary",
    price: "From LKR 1,000",
    unit: "/ subject / month",
    grades: "Primary Classes",
    bullets: [
      "Core subjects from LKR 1,000",
      "English & IQ classes available",
      "Spoken English option available",
    ],
    tint: "#2563EB",
  },
  {
    tag: "Group · Secondary",
    price: "From LKR 1,000",
    unit: "/ subject / month",
    grades: "Grade 6 – 11 · O/L",
    bullets: [
      "Grades 6 – 9 from LKR 1,000",
      "Grades 10 – 11 from LKR 1,200",
      "Tamil & English medium classes",
    ],
    tint: "#8B5CF6",
    featured: true,
  },
  {
    tag: "Group · Advanced Level",
    price: "LKR 2,500",
    unit: "/ subject / month",
    grades: "G.C.E. A/L",
    bullets: [
      "Combined Maths, Physics & ICT",
      "Chemistry and Biology classes",
      "2026, 2027 & 2028 batches",
    ],
    tint: "#06B6D4",
  },
];

const HOLISTIC_FEATURES = [
  {
    icon: "🏅",
    title: "Quality Course Content",
    body: "Access to quality contents developed in house for students to understand easily and effectively.",
  },
  {
    icon: "🗓️",
    title: "Flexible Timings",
    body: "The 1-1 interaction with our tutors makes it easy and you can schedule your lessons at a frequency and time that suits you.",
  },
  {
    icon: "🎯",
    title: "Individual Attention",
    body: "Every student is given individual attention to learn at their own pace.",
  },
  {
    icon: "👩‍🏫",
    title: "Qualified Tutors",
    body: "Learn from the Qualified Professionals to unlock the true potential of every individual.",
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
      <section className="relative pt-32 sm:pt-36 pb-12 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="blob" style={{ top: "-8%", left: "-8%", width: 460, height: 460, background: "#2563EB", opacity: 0.30 }} />
          <div className="blob" style={{ top: "20%", right: "-10%", width: 480, height: 480, background: "#FACC15", opacity: 0.30 }} />
          <div className="blob" style={{ bottom: "0%", left: "30%", width: 380, height: 380, background: "#06B6D4", opacity: 0.22 }} />
        </div>

        <div className="container-edge">
          <div className="flex justify-center" data-anim>
            <Link href="/#regions" className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-[12.5px] font-medium text-[#2B3950]">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              All markets
              <span className="text-[#5A6A82]">·</span>
              <span className="text-[#2563EB]">🇱🇰 Sri Lanka</span>
            </Link>
          </div>

          <div className="mt-8 text-center max-w-4xl mx-auto" data-anim="2">
            <p className="eyebrow">🇱🇰 Sri Lanka · Flagship Market</p>
            <h1 className="heading mt-5" style={{ fontSize: "var(--fs-hero)" }}>
              Quality online learning, <em>built for Sri Lankan Students.</em>
            </h1>
            <p className="text-[#2B3950] text-[17px] mt-6 leading-[1.65] max-w-2xl mx-auto">
              Top-notch online tutoring from qualified tutors at the comfort of your home. 
              Grade 1 to A/L, in Sinhala, Tamil & English medium.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3" data-anim="3">
              <a href="https://signup.edustutor.com/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Start Enrolment</a>
              <Link href="/contact" className="btn btn-yellow">Talk to US</Link>
             
            </div>
          </div>

          {/* Three pillar cards */}
          <div className="mt-14 grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto" data-anim="4">
            {[
              { icon: "👥", title: "Group Classes", body: "Structured weekly classes by grade and subject - recordings, exams, and parent updates included.", tint: "#2563EB" },
              { icon: "👤", title: "Individual Classes", body: "One-to-one tutor matching with no fixed timetable. Pay per hour. Flexible across mediums and subjects.", tint: "#8B5CF6" },
            ].map((p) => (
              <div key={p.title} className="glass rounded-[24px] p-7 lift relative overflow-hidden">
                <span aria-hidden className="blob" style={{ top: -50, right: -50, width: 180, height: 180, background: p.tint, opacity: 0.22 }} />
                <div className="relative">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                    style={{ background: `${p.tint}15`, border: `1px solid ${p.tint}25` }}
                  >
                    {p.icon}
                  </div>
                  <h3 className="heading mt-6" style={{ fontSize: "20px" }}>{p.title}</h3>
                  <p className="text-[#2B3950] text-[14px] mt-2.5 leading-[1.65]">{p.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust strip */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {[
              { k: "7000+", v: "Happy Students" },
              { k: "530+", v: "Live classes" },
              { k: "Grade 1 – A/L", v: "Coverage" },
              { k: "3 mediums", v: "Sinhala · Tamil · English" },
            ].map((s, i) => (
              <div key={i} className="glass rounded-2xl px-5 py-4 text-center">
                <p className="font-[family-name:var(--font-display)] font-700 text-[22px] tnum text-[#102033]">{s.k}</p>
                <p className="text-[11.5px] text-[#5A6A82] mt-1">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CURRICULA */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="blob" style={{ top: "10%", right: "-8%", width: 420, height: 420, background: "#8B5CF6", opacity: 0.16 }} />
        </div>

        <div className="container-edge">
          <div className="text-center max-w-2xl mx-auto">
            <p className="eyebrow"><span className="dot" />Classes</p>
            <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
              World - Class Learning with <em>Exceptional Tutors!</em>
            </h2>
            <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
              Personalized live online learning with expert tutors, proven methods, progress tracking,
              and caring academic support - built to help students learn confidently and succeed.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-5">
            <div className="glass rounded-[24px] p-7">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#EEF6FF] text-[#2563EB]">📘</span>
                  <div>
                    <p className="font-[family-name:var(--font-display)] font-600 text-[15px] text-[#2563EB]">National Syllabus · Grade 1 – A/L</p>
                    <p className="text-[12px] text-[#5A6A82] mt-0.5">Sinhala · Tamil · English medium</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-5">
                {SUBJECTS_NATIONAL.map((s) => (
                  <span key={s} className="px-3 py-1.5 rounded-full bg-white border border-[rgba(16,32,51,0.08)] text-[13px] text-[#102033]">{s}</span>
                ))}
              </div>
            </div>

            <div className="glass rounded-[24px] p-7">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#F4EEFF] text-[#8B5CF6]">📗</span>
                  <div>
                    <p className="font-[family-name:var(--font-display)] font-600 text-[15px] text-[#8B5CF6]">Cambridge & Edexcel · IGCSE / A-Level</p>
                    <p className="text-[12px] text-[#5A6A82] mt-0.5">English medium</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-5">
                {SUBJECTS_INTL.map((s) => (
                  <span key={s} className="px-3 py-1.5 rounded-full bg-white border border-[rgba(16,32,51,0.08)] text-[13px] text-[#102033]">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="blob" style={{ bottom: "5%", left: "-10%", width: 460, height: 460, background: "#22C55E", opacity: 0.16 }} />
        </div>

        <div className="container-edge">
          <div className="text-center max-w-2xl mx-auto">
            <p className="eyebrow"><span className="dot" />Group Classes</p>
            <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
              Affordable group classes. <em>By design.</em>
            </h2>
            <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
              Class fees in Sri Lankan rupees. Pay monthly per subject. Looking for one-to-one
              tuition? See our individual classes section below.
            </p>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {PRICING.map((p) => (
              <article
                key={p.tag}
                className={`relative rounded-[24px] p-6 lift overflow-hidden ${p.featured ? "glass-strong" : "glass"}`}
              >
                <span aria-hidden className="blob" style={{ top: -40, right: -40, width: 160, height: 160, background: p.tint, opacity: 0.22 }} />
                <div className="relative">
                  <p className="font-[family-name:var(--font-display)] font-600 text-[12px] tracking-[0.12em] uppercase" style={{ color: p.tint }}>
                    {p.tag}
                  </p>
                  <div className="mt-5">
                    <p className="font-[family-name:var(--font-display)] font-700 text-[26px] leading-tight text-[#102033]">{p.price}</p>
                    <span className="text-[12px] text-[#5A6A82]">{p.unit}</span>
                  </div>
                  <p className="text-[13px] font-[family-name:var(--font-display)] font-600 text-[#102033] mt-3">{p.grades}</p>

                  <ul className="mt-5 space-y-2 text-[13.5px]">
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

                  <a
                    href="https://signup.edustutor.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-7 w-full justify-center btn ${p.featured ? "btn-primary" : "btn-outline"}`}
                  >
                    Enrol
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* INDIVIDUAL CLASSES */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="blob" style={{ top: "10%", right: "-8%", width: 420, height: 420, background: "#8B5CF6", opacity: 0.18 }} />
          <div className="blob" style={{ bottom: "0%", left: "-6%", width: 360, height: 360, background: "#2563EB", opacity: 0.18 }} />
        </div>

        <div className="container-edge">
          {/* Section heading */}
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="heading" style={{ fontSize: "var(--fs-display)" }}>
              One-to-one tuition, <em>at your own pace.</em>
            </h2>
          </div>

          {/* Individual class card with holistic features inside */}
          <div className="relative glass-strong rounded-[28px] p-8 md:p-12 overflow-hidden mt-10">
            <span aria-hidden className="blob" style={{ top: -80, right: -60, width: 320, height: 320, background: "#2563EB", opacity: 0.20 }} />
            <span aria-hidden className="blob" style={{ bottom: -80, left: -60, width: 320, height: 320, background: "#8B5CF6", opacity: 0.20 }} />

            <div className="relative grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6">
                <span
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-white font-[family-name:var(--font-display)] font-700 text-[11px] tracking-[0.16em] uppercase shadow-[0_6px_14px_-6px_rgba(37,99,235,0.45)]"
                  style={{ background: "linear-gradient(90deg, #2563EB 0%, #4F6DDB 60%, #6E5BC8 100%)" }}
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/80" />
                  Individual · 1:1
                </span>
                <h3 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
                  &ldquo;Providing a <em>Holistic</em> Education&rdquo;
                </h3>
                <p className="text-[#2B3950] text-[16px] mt-4 leading-[1.65] max-w-xl">
                  Personal tutor matching with no fixed timetable. Pay per hour. Flexible across
                  every grade, syllabus, medium, and subject - built around your child&apos;s
                  schedule and learning pace.
                </p>

                <ul className="mt-6 space-y-2.5 text-[14px]">
                  {[
                    "No fixed timetable - schedule that suits you",
                    "Tutor matched to student",
                    "Pay-as-you-go · Starting from LKR 2,500 / hour",
                    "All grades · all subjects · all mediums",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-[#2B3950]">
                      <span className="inline-flex w-5 h-5 mt-0.5 rounded-full bg-[#2563EB]/15 items-center justify-center shrink-0">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="3.5" aria-hidden>
                          <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href="https://signup.edustutor.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Book One-to-One Tuition
                  </a>
                  <Link href="/contact" className="btn btn-yellow">Talk to US</Link>
                </div>
              </div>

              {/* Holistic features — 2×2 grid inside card */}
              <div className="lg:col-span-6 grid sm:grid-cols-2 gap-4">
                {HOLISTIC_FEATURES.map((f) => (
                  <div
                    key={f.title}
                    className="rounded-2xl bg-white/85 border border-[rgba(16,32,51,0.08)] p-5 shadow-[0_8px_24px_-12px_rgba(16,32,51,0.12)]"
                  >
                    <div className="inline-flex w-11 h-11 rounded-2xl items-center justify-center text-2xl bg-[#EEF6FF] border border-[#2563EB]/20">
                      {f.icon}
                    </div>
                    <h4 className="heading mt-4" style={{ fontSize: "15px" }}>{f.title}</h4>
                    <p className="text-[#2B3950] text-[12.5px] mt-2 leading-[1.55]">
                      {f.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="blob" style={{ top: "10%", right: "-6%", width: 380, height: 380, background: "#FACC15", opacity: 0.18 }} />
        </div>
        <div className="container-edge">
          <div className="text-center max-w-2xl mx-auto">
            <p className="eyebrow"><span className="dot" />Sri Lankan Families</p>
            <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
              From Kandy to Kalmunai. <em>Real stories.</em>
            </h2>
          </div>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t, i) => (
              <article key={t.name} className="glass rounded-[24px] p-6 lift">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🇱🇰</span>
                  <span className="text-[#FACC15] text-lg leading-none">★★★★★</span>
                </div>
                <p className="text-[#102033] text-[15px] mt-5 leading-[1.65]">"{t.quote}"</p>
                <div className="mt-6 pt-5 border-t border-[rgba(16,32,51,0.08)] flex items-center gap-3">
                  <span
                    className="inline-flex w-10 h-10 rounded-full items-center justify-center text-white font-[family-name:var(--font-display)] font-600 text-[13px]"
                    style={{ background: i % 3 === 0 ? "#2563EB" : i % 3 === 1 ? "#8B5CF6" : "#06B6D4" }}
                  >
                    {t.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </span>
                  <div>
                    <p className="text-[14px] font-[family-name:var(--font-display)] font-600 text-[#102033]">{t.name}</p>
                    <p className="text-[12px] text-[#5A6A82]">{t.role} · {t.loc}</p>
                  </div>
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
