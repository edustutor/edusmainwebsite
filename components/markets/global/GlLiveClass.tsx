"use client";
import { m } from "@/components/effects/Motion";
import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { SectionHead } from "./GlobalShared";
import { FeatureIcon } from "@/components/effects/Icons";

type Feature = {
  icon: string;
  title: string;
  body: string;
  tint: string;
};

const FEATURES: Feature[] = [
  { icon: "live-class",   title: "Real-Time Teaching",      body: "Live two-way classes, never a recorded playback.",                tint: "#2563EB" },
  { icon: "doubt",        title: "Doubt Clearing in Class", body: "Ask questions any moment and get them answered the same session.", tint: "#06B6D4" },
  { icon: "book",         title: "Topic-Wise Revision",     body: "Structured topic explanation followed by focused revision.",       tint: "#8B5CF6" },
  { icon: "screen-share", title: "Screen Share & Tools",    body: "Whiteboards, PDFs, presentations, and digital teaching aids.",     tint: "#22C55E" },
  { icon: "schedule",     title: "Planned Around Student",  body: "Class plans built on the student's pace, goal, and schedule.",     tint: "#FACC15" },
  { icon: "writing",      title: "Correction & Feedback",   body: "Individual correction, written feedback, and follow-up tasks.",    tint: "#2563EB" },
  { icon: "global",       title: "Access From Anywhere",    body: "Join from any country, any device, on a Maldives or Europe clock.", tint: "#06B6D4" },
];

const STUDENT_GAINS = [
  { icon: "idea",          title: "Clearer Understanding",       body: "Ask questions freely and receive explanations until the concept lands.", tint: "#2563EB" },
  { icon: "confidence",    title: "More Confidence",             body: "One-to-one attention helps students feel comfortable and motivated.",     tint: "#8B5CF6" },
  { icon: "growth",        title: "Better Academic Performance", body: "Structured tutoring and focused guidance improve results over time.",    tint: "#06B6D4" },
  { icon: "exam",          title: "Exam Readiness",              body: "Support for school, term, board, IGCSE, GCSE, O & A-Level prep.",        tint: "#22C55E" },
  { icon: "home",          title: "Flexible Learning from Home", body: "No travel, no traffic, no location barriers.",                           tint: "#FACC15" },
  { icon: "partnership",   title: "Supportive Experience",       body: "Patient, caring, and academically responsible guidance.",                tint: "#2563EB" },
];

export function GlLiveClass() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <AmbientGlow top="14%" right="-4%" size={240} color="#2563EB" opacity={[0.08, 0.16]} duration={22} blur={80} />
        <AmbientGlow bottom="10%" left="-4%" size={220} color="#06B6D4" opacity={[0.08, 0.16]} duration={26} delay={3} blur={80} />
      </div>

      <div className="container-edge">
        <m.div variants={sectionRevealStrong} initial="hidden" whileInView="show" viewport={inView}>
          <SectionHead
            eyebrow="Live Online Experience"
            title="Live online learning that feels"
            emphasis="personal."
            body="EDUS Global is not a recorded course. It is a live, interactive, one-to-one learning experience built around the student."
          />
        </m.div>

        {/* Split layout: classroom mock + feature list */}
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-12 grid lg:grid-cols-12 gap-8 items-start"
        >
          {/* Left: live classroom mock */}
          <m.div variants={fadeUp} className="lg:col-span-5">
            <LiveClassroomMock />
          </m.div>

          {/* Right: feature list with icons + tints */}
          <m.ul variants={staggerContainer} className="lg:col-span-7 grid sm:grid-cols-2 gap-3">
            {FEATURES.map((f, i) => (
              <m.li
                key={f.title}
                variants={fadeUp}
                className="relative bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-4 shadow-[0_10px_28px_-20px_rgba(16,32,51,0.18)]"
              >
                <div className="flex items-start gap-3">
                  <span
                    className="inline-flex w-10 h-10 rounded-xl items-center justify-center shrink-0"
                    style={{ background: `${f.tint}15`, border: `1px solid ${f.tint}25` }}
                  >
                    <FeatureIcon name={f.icon} tint={f.tint} size={18} />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display font-700 text-[13.5px] text-[#102033] leading-tight">
                      {f.title}
                    </p>
                    <p className="text-[12px] text-[#5A6A82] mt-1 leading-[1.55]">{f.body}</p>
                  </div>
                </div>
                <span
                  aria-hidden
                  className="absolute top-3 right-3 font-display font-800 text-[10.5px] tracking-widest"
                  style={{ color: `${f.tint}80` }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </m.li>
            ))}
          </m.ul>
        </m.div>

        {/* Student gains - redesigned with accent strip + tinted icon */}
        <m.div
          variants={sectionRevealStrong}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-16"
        >
          <div className="max-w-3xl mx-auto text-center">
            <p className="eyebrow"><span className="dot" />What Students Gain</p>
            <h3 className="heading mt-3" style={{ fontSize: "clamp(22px, 2.4vw, 30px)" }}>
              Real outcomes, not just <em>completed sessions.</em>
            </h3>
          </div>
          <m.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {STUDENT_GAINS.map((g) => (
              <m.article
                key={g.title}
                variants={fadeUp}
                className="relative bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-5 shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)] overflow-hidden"
              >
                <span
                  aria-hidden
                  className="absolute top-0 left-0 h-1 w-full"
                  style={{ background: g.tint }}
                />
                <span
                  className="inline-flex w-11 h-11 rounded-xl items-center justify-center"
                  style={{ background: `${g.tint}15`, border: `1px solid ${g.tint}25` }}
                >
                  <FeatureIcon name={g.icon} tint={g.tint} size={20} />
                </span>
                <h4 className="mt-3 font-display font-700 text-[14.5px] text-[#102033] leading-tight">
                  {g.title}
                </h4>
                <p className="text-[12.5px] text-[#5A6A82] mt-1.5 leading-[1.6]">{g.body}</p>
              </m.article>
            ))}
          </m.div>
        </m.div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/* Live classroom mock - illustrative live class visual            */
/* --------------------------------------------------------------- */
function LiveClassroomMock() {
  return (
    <div className="relative mx-auto max-w-md lg:max-w-none">
      <div
        aria-hidden
        className="absolute inset-[-6%]"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(37,99,235,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative rounded-[24px] bg-white border border-[rgba(16,32,51,0.08)] shadow-[0_30px_70px_-30px_rgba(16,32,51,0.25)] overflow-hidden">
        {/* Header bar */}
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{
            background:
              "linear-gradient(90deg, rgba(37,99,235,0.06) 0%, rgba(6,182,212,0.06) 100%)",
            borderBottom: "1px solid rgba(16,32,51,0.06)",
          }}
        >
          <div className="flex items-center gap-2">
            <span className="inline-flex w-2 h-2 rounded-full bg-[#FF5F57]" />
            <span className="inline-flex w-2 h-2 rounded-full bg-[#FFBD2E]" />
            <span className="inline-flex w-2 h-2 rounded-full bg-[#28C840]" />
            <p className="ml-2 text-[11px] uppercase tracking-widest font-display font-700 text-[#102033]">
              EDUS Live Class
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-display font-700 bg-[#DC2626]/10 text-[#DC2626]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse" />
            LIVE
          </span>
        </div>

        {/* Video tiles */}
        <div className="p-4 grid grid-cols-2 gap-3">
          {/* Tutor tile */}
          <div className="relative aspect-4/3 rounded-xl overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg,#2563EB 0%,#6E5BC8 100%)",
              }}
            />
            <div className="absolute inset-0 grid place-items-center">
              <span className="font-display font-800 text-[28px] text-white/95">
                T
              </span>
            </div>
            <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded-sm text-[9.5px] font-display font-700 bg-black/40 text-white">
              Tutor
            </span>
            <span className="absolute top-1.5 right-1.5 inline-flex w-2 h-2 rounded-full bg-[#22C55E]" />
          </div>

          {/* Student tile */}
          <div className="relative aspect-4/3 rounded-xl overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg,#06B6D4 0%,#22C55E 100%)",
              }}
            />
            <div className="absolute inset-0 grid place-items-center">
              <span className="font-display font-800 text-[28px] text-white/95">
                S
              </span>
            </div>
            <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded-sm text-[9.5px] font-display font-700 bg-black/40 text-white">
              Student
            </span>
            <span className="absolute top-1.5 right-1.5 inline-flex w-2 h-2 rounded-full bg-[#22C55E]" />
          </div>
        </div>

        {/* Whiteboard panel */}
        <div className="px-4 pb-4">
          <div className="rounded-xl bg-[#F6F8FB] border border-[rgba(16,32,51,0.08)] p-3.5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-widest text-[#5A6A82] font-display font-700">
                Whiteboard - Quadratic Equations
              </p>
              <span className="text-[10px] font-display font-700 text-[#2563EB]">
                Topic 03 / 05
              </span>
            </div>
            <div className="mt-3 space-y-2 font-display font-700 text-[13px] text-[#102033]">
              <div className="flex items-center gap-2">
                <span className="text-[#2563EB]">x =</span>
                <span>
                  (-b ± √(b² - 4ac)) / 2a
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-white overflow-hidden">
                <span
                  className="block h-full rounded-full"
                  style={{
                    width: "62%",
                    background: "linear-gradient(90deg,#2563EB 0%,#06B6D4 100%)",
                  }}
                />
              </div>
              <p className="text-[10px] text-[#5A6A82] font-600">
                Lesson progress - Topic-wise pace
              </p>
            </div>
          </div>
        </div>

        {/* Footer toolbar */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{
            background:
              "linear-gradient(90deg, rgba(37,99,235,0.04) 0%, rgba(6,182,212,0.04) 100%)",
            borderTop: "1px solid rgba(16,32,51,0.06)",
          }}
        >
          <div className="flex items-center gap-2">
            <ToolPill label="Mic" tint="#2563EB" />
            <ToolPill label="Cam" tint="#06B6D4" />
            <ToolPill label="Share" tint="#8B5CF6" />
          </div>
          <p className="text-[10.5px] text-[#5A6A82] font-display font-600">
            Session - 47 min
          </p>
        </div>
      </div>
    </div>
  );
}

function ToolPill({ label, tint }: { label: string; tint: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-display font-700"
      style={{ background: `${tint}14`, color: tint }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: tint }} />
      {label}
    </span>
  );
}
