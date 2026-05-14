"use client";
import { m } from "@/components/effects/Motion";
import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { SectionHead, ApplyCtaRow } from "./TeachShared";
import { FeatureIcon } from "@/components/effects/Icons";

type Req = { title: string; body: string };

const ACADEMIC: Req[] = [
  { title: "Subject Knowledge",         body: "Strong command over the subject applied for." },
  { title: "Educational Qualification", body: "Degree, diploma, professional qualification, teaching experience, or proven expertise." },
  { title: "Teaching Ability",          body: "Ability to explain concepts clearly and guide students effectively." },
  { title: "Language Proficiency",      body: "Comfortable teaching in Tamil, English, Sinhala, Hindi, or another approved medium." },
  { title: "Syllabus Familiarity",      body: "Understand syllabus, exam structure, marking pattern, and student expectations." },
];

const TECHNICAL: Req[] = [
  { title: "Device",         body: "Laptop or desktop preferred. Mobile-only teaching is not recommended." },
  { title: "Internet",       body: "Stable connection suitable for live online classes." },
  { title: "Camera",         body: "Clear video quality where required." },
  { title: "Microphone",     body: "Clear audio without disturbance." },
  { title: "Teaching Setup", body: "Proper lighting, quiet environment, professional background." },
  { title: "Digital Tools",  body: "Google Meet, online whiteboard, presentations, PDFs, learning materials." },
  { title: "Backup Plan",    body: "Backup internet or device arrangement strongly preferred." },
];

const PROFESSIONAL: Req[] = [
  { title: "Punctuality",     body: "Tutor must join classes on time." },
  { title: "Regularity",      body: "Classes conducted according to the approved schedule." },
  { title: "Communication",   body: "Professional communication with EDUS staff, students, and parents." },
  { title: "Responsibility",  body: "Complete planned lessons and support student progress." },
  { title: "Ethics",          body: "No misuse of student contacts or unauthorized private classes." },
  { title: "Confidentiality", body: "Student data, EDUS systems, and internal information protected." },
  { title: "Commitment",      body: "Willingness to follow EDUS academic and operational systems." },
];

export function TeachRequirements() {
  return (
    <section id="requirements" className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <AmbientGlow bottom="10%" right="-4%" size={240} color="#8B5CF6" opacity={[0.08, 0.16]} duration={26} delay={3} blur={80} />
      </div>
      <div className="container-edge">
        <m.div variants={sectionRevealStrong} initial="hidden" whileInView="show" viewport={inView}>
          <SectionHead
            eyebrow="Mandatory Requirements"
            title="Minimum eligibility to teach with"
            emphasis="EDUS."
            body="Every tutor must meet these academic, technical, and professional standards before being onboarded."
          />
        </m.div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid lg:grid-cols-3 gap-5"
        >
          <RequirementCol icon="graduation"  name="Academic"      tint="#2563EB" items={ACADEMIC} />
          <RequirementCol icon="platform"    name="Technical"     tint="#06B6D4" items={TECHNICAL} />
          <RequirementCol icon="partnership" name="Professional"  tint="#8B5CF6" items={PROFESSIONAL} />
        </m.div>

        <ApplyCtaRow />
      </div>
    </section>
  );
}

function RequirementCol({
  icon, name, tint, items,
}: { icon: string; name: string; tint: string; items: Req[] }) {
  return (
    <m.article
      variants={fadeUp}
      className="relative bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-5 shadow-[0_18px_40px_-24px_rgba(16,32,51,0.18)]"
    >
      <div className="flex items-center gap-3">
        <span
          className="inline-flex w-10 h-10 rounded-xl items-center justify-center"
          style={{ background: `${tint}15`, border: `1px solid ${tint}25` }}
        >
          <FeatureIcon name={icon} tint={tint} size={18} />
        </span>
        <h3 className="font-display font-700 text-[16px] text-[#102033]">
          {name} Requirements
        </h3>
      </div>
      <ul className="mt-4 space-y-3">
        {items.map((r) => (
          <li key={r.title} className="flex gap-3">
            <span className="inline-flex w-5 h-5 rounded-full bg-[#2563EB]/12 items-center justify-center shrink-0 mt-0.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={tint} strokeWidth="3" aria-hidden>
                <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="min-w-0">
              <p className="font-display font-700 text-[13.5px] text-[#102033] leading-tight">
                {r.title}
              </p>
              <p className="text-[12.5px] text-[#5A6A82] mt-0.5 leading-[1.55]">{r.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </m.article>
  );
}
