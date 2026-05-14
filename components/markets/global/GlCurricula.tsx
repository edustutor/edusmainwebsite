"use client";
import { m } from "@/components/effects/Motion";
import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { SectionHead } from "./GlobalShared";
import { FeatureIcon } from "@/components/effects/Icons";

const CURRICULA = [
  {
    icon: "book",
    name: "Cambridge",
    body: "Cambridge Primary, Lower Secondary, IGCSE, O-Level, AS Level, and A-Level.",
    levels: ["Primary", "Lower Sec", "IGCSE", "O-Level", "AS / A-Level"],
    tint: "#2563EB",
  },
  {
    icon: "book-marked",
    name: "Edexcel / Pearson",
    body: "Edexcel IGCSE, International GCSE, GCSE, AS Level, and A-Level.",
    levels: ["IGCSE", "Intl GCSE", "GCSE", "AS / A-Level"],
    tint: "#8B5CF6",
  },
  {
    icon: "global",
    name: "International Syllabuses",
    body: "Support arranged for international school syllabuses based on subject, grade, and requirement.",
    levels: ["IB", "AP", "School-based", "Topic-wise"],
    tint: "#06B6D4",
  },
  {
    icon: "school",
    name: "National Syllabuses",
    body: "Any country's national curriculum, depending on tutor availability and subject match.",
    levels: ["School", "Grade-wise", "Board exams"],
    tint: "#22C55E",
  },
  {
    icon: "target",
    name: "Customized Support",
    body: "Topic-focused help, exam preparation, revision, homework, or concept strengthening.",
    levels: ["Revision", "Past papers", "Topic-fix", "Booster"],
    tint: "#FACC15",
  },
];

export function GlCurricula() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <AmbientGlow top="14%" left="-4%" size={240} color="#2563EB" opacity={[0.08, 0.16]} duration={22} blur={80} />
      </div>
      <div className="container-edge">
        <m.div variants={sectionRevealStrong} initial="hidden" whileInView="show" viewport={inView}>
          <SectionHead
            eyebrow="Curriculum & Syllabus"
            title="Learn any syllabus with the right"
            emphasis="tutor."
            body="EDUS Global supports students following different curricula and academic systems across the world."
          />
        </m.div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {CURRICULA.map((c) => (
            <m.article
              key={c.name}
              variants={fadeUp}
              className="relative bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-5 shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)] h-full flex flex-col"
            >
              <span
                aria-hidden
                className="absolute top-0 left-0 h-1 w-full rounded-t-2xl"
                style={{ background: c.tint }}
              />
              <span
                className="inline-flex w-11 h-11 rounded-xl items-center justify-center"
                style={{ background: `${c.tint}15`, border: `1px solid ${c.tint}25` }}
              >
                <FeatureIcon name={c.icon} tint={c.tint} size={20} />
              </span>
              <h3 className="mt-3 font-display font-700 text-[15px] text-[#102033] leading-tight">
                {c.name}
              </h3>
              <p className="text-[12.5px] text-[#5A6A82] mt-1.5 leading-[1.6] flex-1">{c.body}</p>
              <div className="mt-4 pt-3 border-t border-[rgba(16,32,51,0.06)] flex flex-wrap gap-1.5">
                {c.levels.map((lv) => (
                  <span
                    key={lv}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-display font-700"
                    style={{ background: `${c.tint}10`, color: c.tint }}
                  >
                    {lv}
                  </span>
                ))}
              </div>
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}
