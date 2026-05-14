"use client";
import { m } from "@/components/effects/Motion";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { SectionHead } from "./TeachShared";
import { FeatureIcon } from "@/components/effects/Icons";

type Group = { level: string; subjects: string };

const SL: Group[] = [
  { level: "Primary",     subjects: "Mathematics, English, Environmental Studies, Tamil, Sinhala" },
  { level: "Grade 6-11",  subjects: "Mathematics, Science, English, History, ICT, Tamil, Sinhala, Commerce" },
  { level: "G.C.E O/L",   subjects: "Maths, Science, English, History, ICT, Commerce, Business Studies, Accounting" },
  { level: "G.C.E A/L",   subjects: "Combined Maths, Biology, Chemistry, Physics, ICT, Accounting, Economics, Business Studies" },
];

const IN: Group[] = [
  { level: "Grade 6-10",       subjects: "Mathematics, Science, English, Tamil, Hindi, Social Science" },
  { level: "Future Expansion", subjects: "CBSE, ICSE, State Board, and individual classes" },
];

const INTL: Group[] = [
  { level: "Cambridge", subjects: "Mathematics, Science, English and other subjects" },
  { level: "Edexcel",   subjects: "Mathematics, Science, English and other subjects" },
  { level: "Other",     subjects: "Based on student requirement and tutor availability" },
];

export function TeachSubjects() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div className="container-edge">
        <m.div variants={sectionRevealStrong} initial="hidden" whileInView="show" viewport={inView}>
          <SectionHead
            eyebrow="Subjects & Syllabuses"
            title="Tutor opportunities across"
            emphasis="markets."
            body="EDUS is expanding across multiple grades, subjects, and countries. Apply for one or more depending on your qualifications."
          />
        </m.div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid lg:grid-cols-3 gap-5"
        >
          <SyllabusBlock flag="🇱🇰" name="Sri Lanka" tint="#2563EB" groups={SL} />
          <SyllabusBlock flag="🇮🇳" name="India"     tint="#8B5CF6" groups={IN} />
          <SyllabusBlock icon="global" name="International / Individual" tint="#06B6D4" groups={INTL} />
        </m.div>
      </div>
    </section>
  );
}

function SyllabusBlock({
  flag, icon, name, tint, groups,
}: { flag?: string; icon?: string; name: string; tint: string; groups: Group[] }) {
  return (
    <m.article
      variants={fadeUp}
      className="relative bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-5 shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)]"
    >
      <span
        aria-hidden
        className="absolute top-0 left-0 h-1 w-full rounded-t-2xl"
        style={{ background: tint }}
      />
      <div className="flex items-center gap-2">
        {flag ? (
          <span className="text-2xl leading-none" aria-hidden>{flag}</span>
        ) : icon ? (
          <span
            className="inline-flex w-9 h-9 rounded-lg items-center justify-center"
            style={{ background: `${tint}15`, border: `1px solid ${tint}25` }}
          >
            <FeatureIcon name={icon} tint={tint} size={18} />
          </span>
        ) : null}
        <h3 className="font-display font-700 text-[16px] text-[#102033]">
          {name}
        </h3>
      </div>
      <ul className="mt-4 space-y-3">
        {groups.map((g) => (
          <li key={g.level} className="border-t border-[rgba(16,32,51,0.06)] pt-3 first:border-t-0 first:pt-0">
            <p
              className="font-display font-700 text-[12px] uppercase tracking-[0.08em]"
              style={{ color: tint }}
            >
              {g.level}
            </p>
            <p className="text-[13px] text-[#2B3950] mt-1 leading-[1.6]">{g.subjects}</p>
          </li>
        ))}
      </ul>
    </m.article>
  );
}
