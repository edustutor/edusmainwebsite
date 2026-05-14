"use client";
import { m } from "@/components/effects/Motion";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { SectionHead } from "./MvShared";
import { FeatureIcon } from "@/components/effects/Icons";

const PARENT = [
  "Individual attention for your child",
  "Flexible class scheduling",
  "Regular learning updates",
  "Clear subject-wise progress",
  "Safe online learning from home",
  "No travel difficulty between islands",
  "Better exam preparation and confidence",
];

const STUDENT = [
  "Learn at your own pace",
  "Ask doubts without hesitation",
  "Understand difficult topics clearly",
  "Practice exam-style questions",
  "Improve weak areas",
  "Build confidence before exams",
  "Prepare for Cambridge IGCSE / O-Level success",
];

export function MvAudience() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div className="container-edge">
        <m.div variants={sectionRevealStrong} initial="hidden" whileInView="show" viewport={inView}>
          <SectionHead
            eyebrow="For Parents & Students"
            title="Built for both sides of the"
            emphasis="learning journey."
            body="Parents stay informed and involved. Students learn without hesitation. Both sides see the same clear progress."
          />
        </m.div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid lg:grid-cols-2 gap-5"
        >
          <AudienceCard
            icon="parent-updates"
            title="Peace of Mind for Parents"
            body="You want to know whether your child is learning properly and preparing for exams. EDUS keeps you informed every step of the way."
            tint="#2563EB"
            items={PARENT}
          />
          <AudienceCard
            icon="graduation"
            title="Learn Better. Ask Freely. Improve Faster."
            body="In a 1-to-1 EDUS class you can ask questions freely, learn at your own speed, and focus on the exact topics you find difficult."
            tint="#06B6D4"
            items={STUDENT}
          />
        </m.div>
      </div>
    </section>
  );
}

function AudienceCard({
  icon, title, body, tint, items,
}: {
  icon: string;
  title: string;
  body: string;
  tint: string;
  items: string[];
}) {
  return (
    <m.article
      variants={fadeUp}
      className="relative bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-6 md:p-7 shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)]"
    >
      <span
        aria-hidden
        className="absolute top-0 left-0 h-1 w-full rounded-t-2xl"
        style={{ background: tint }}
      />
      <div className="flex items-center gap-3">
        <span
          className="inline-flex w-12 h-12 rounded-xl items-center justify-center"
          style={{ background: `${tint}15`, border: `1px solid ${tint}25` }}
        >
          <FeatureIcon name={icon} tint={tint} size={22} />
        </span>
        <h3 className="font-display font-700 text-[18px] text-[#102033] leading-tight">
          {title}
        </h3>
      </div>
      <p className="text-[13.5px] text-[#5A6A82] mt-4 leading-[1.65]">{body}</p>
      <ul className="mt-5 space-y-2">
        {items.map((i) => (
          <li key={i} className="flex items-start gap-3 text-[13px] text-[#102033]">
            <span
              className="inline-flex w-5 h-5 rounded-full items-center justify-center shrink-0 mt-0.5"
              style={{ background: `${tint}18` }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={tint} strokeWidth="3" aria-hidden>
                <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {i}
          </li>
        ))}
      </ul>
    </m.article>
  );
}
