"use client";
import { m } from "@/components/effects/Motion";
import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { SectionHead } from "./GlobalShared";
import { FeatureIcon } from "@/components/effects/Icons";

type Pillar = {
  icon: string;
  title: string;
  body: string;
  tag: string;
  tint: string;
};

const PILLARS: Pillar[] = [
  {
    icon: "expert-tutor",
    title: "Personal Tutoring",
    body: "One to one online tutoring with experienced subject tutors who match your child's level.",
    tag: "1-to-1 - Expert Tutors",
    tint: "#2563EB",
  },
  {
    icon: "book",
    title: "Any Syllabus",
    body: "Cambridge, Edexcel, IGCSE, GCSE, O-Level, A-Level, IB, and national curricula.",
    tag: "Cambridge - Edexcel - National",
    tint: "#8B5CF6",
  },
  {
    icon: "global",
    title: "Time-Zone Flexible",
    body: "Class timings arranged around your country, school, and family routine.",
    tag: "Global - Flexible Hours",
    tint: "#06B6D4",
  },
  {
    icon: "exam",
    title: "Exam-Ready Support",
    body: "Targeted help for school exams, term tests, and board exam preparation.",
    tag: "School - Term - Board",
    tint: "#22C55E",
  },
  {
    icon: "target",
    title: "Individual Attention",
    body: "The focused academic care that crowded online classrooms cannot deliver.",
    tag: "Focused - Patient - Personal",
    tint: "#FACC15",
  },
  {
    icon: "card",
    title: "Trusted & Affordable",
    body: "High-quality online tuition with structured academic guidance, at fair pricing.",
    tag: "Quality - Value - Trust",
    tint: "#2563EB",
  },
];

export function GlIntro() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <AmbientGlow top="14%" right="-4%" size={240} color="#8B5CF6" opacity={[0.08, 0.16]} duration={22} blur={80} />
        <AmbientGlow bottom="10%" left="-4%" size={220} color="#2563EB" opacity={[0.08, 0.16]} duration={26} delay={3} blur={80} />
      </div>

      <div className="container-edge">
        <m.div variants={sectionRevealStrong} initial="hidden" whileInView="show" viewport={inView}>
          <SectionHead
            eyebrow="Who This Is For"
            title="Built for parents and students looking for"
            emphasis="six things."
            body="EDUS Global supports students from any country with personalized one to one live classes. Six clear pillars define what every student gets."
          />
        </m.div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto"
        >
          {PILLARS.map((p, i) => (
            <m.article
              key={p.title}
              variants={fadeUp}
              className="relative bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-6 shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)] h-full overflow-hidden"
            >
              {/* Numbered corner */}
              <span
                aria-hidden
                className="absolute top-4 right-5 font-display font-800 text-[42px] leading-none opacity-[0.10]"
                style={{ color: p.tint }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Left accent bar */}
              <span
                aria-hidden
                className="absolute top-0 left-0 h-full w-1"
                style={{ background: p.tint }}
              />

              <div className="relative">
                <span
                  className="inline-flex w-12 h-12 rounded-xl items-center justify-center"
                  style={{ background: `${p.tint}15`, border: `1px solid ${p.tint}25` }}
                >
                  <FeatureIcon name={p.icon} tint={p.tint} size={22} />
                </span>
                <h3 className="mt-4 font-display font-700 text-[17px] text-[#102033] leading-tight">
                  {p.title}
                </h3>
                <p className="text-[13.5px] text-[#5A6A82] mt-2 leading-[1.6]">{p.body}</p>
                <div className="mt-4 pt-3 border-t border-[rgba(16,32,51,0.06)]">
                  <p
                    className="text-[10.5px] uppercase tracking-[0.08em] font-display font-700"
                    style={{ color: p.tint }}
                  >
                    {p.tag}
                  </p>
                </div>
              </div>
            </m.article>
          ))}
        </m.div>

        {/* Closing reassurance ribbon */}
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 max-w-4xl mx-auto rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          style={{
            background:
              "linear-gradient(90deg, rgba(37,99,235,0.08) 0%, rgba(6,182,212,0.08) 100%)",
            border: "1px solid rgba(37,99,235,0.16)",
          }}
        >
          <span
            className="inline-flex w-11 h-11 rounded-xl items-center justify-center shrink-0"
            style={{ background: "rgba(37,99,235,0.14)" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.4" aria-hidden>
              <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" strokeLinejoin="round" />
            </svg>
          </span>
          <p className="text-[14px] text-[#102033] leading-[1.6] font-display font-600">
            If your child needs the right teacher, the right support, and the right learning
            plan, <span className="text-[#2563EB] font-700">EDUS Global is built for you.</span>
          </p>
        </m.div>
      </div>
    </section>
  );
}
