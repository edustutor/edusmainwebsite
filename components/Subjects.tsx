"use client";
import Link from "next/link";
import { m } from "@/components/Motion";
import { fadeUp, staggerContainer, sectionReveal, inView } from "@/lib/motion";

const SUBJECTS = [
  {
    icon: "🧮",
    title: "Mathematics",
    body: "Build strong problem solving, calculation, and exam confidence with guided Maths classes.",
    cta: "Explore Maths Classes",
    href: "/subjects/mathematics",
    tint: "#2563EB",
  },
  {
    icon: "🔬",
    title: "Science",
    body: "Learn key science concepts with clear explanations, practical examples, and revision support.",
    cta: "Explore Science Classes",
    href: "/subjects/science",
    tint: "#8B5CF6",
  },
  {
    icon: "📖",
    title: "English",
    body: "Improve reading, writing, grammar, comprehension, and communication skills.",
    cta: "Explore English Classes",
    href: "/subjects/english",
    tint: "#06B6D4",
  },
  {
    icon: "💻",
    title: "ICT",
    body: "Learn technology concepts, digital skills, and syllabus based ICT topics with expert support.",
    cta: "Explore ICT Classes",
    href: "/subjects/ict",
    tint: "#22C55E",
  },
  {
    icon: "📜",
    title: "Tamil",
    body: "Strengthen language skills, school syllabus understanding, reading, and writing.",
    cta: "Explore Tamil Classes",
    href: "/subjects/tamil",
    tint: "#FACC15",
  },
  {
    icon: "🪔",
    title: "Hindi",
    body: "Improve Hindi language knowledge with structured online lessons for India focused learners.",
    cta: "Explore Hindi Classes",
    href: "/subjects/hindi",
    tint: "#8B5CF6",
  },
  {
    icon: "🌏",
    title: "Social Science",
    body: "Understand history, geography, civics, and social studies through simple guided learning.",
    cta: "Explore Social Science Classes",
    href: "/subjects/social-science",
    tint: "#06B6D4",
  },
];

export function Subjects() {
  return (
    <section id="subjects" className="relative py-20 md:py-28 scroll-mt-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="blob" style={{ top: "10%", left: "-8%", width: 420, height: 420, background: "#2563EB", opacity: 0.18 }} />
        <div className="blob" style={{ bottom: "0%", right: "-6%", width: 380, height: 380, background: "#22C55E", opacity: 0.14 }} />
      </div>

      <div className="container-edge">
        <m.div
          className="text-center max-w-2xl mx-auto"
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <p className="eyebrow"><span className="dot" />Subjects</p>
          <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
            Subjects designed for <em>school success.</em>
          </h2>
          <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
            EDUS supports core school subjects with a structured online learning model. Students can
            choose individual subjects or join complete learning packages based on their grade and market.
          </p>
        </m.div>

        <m.div
          className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          {SUBJECTS.map((s) => (
            <m.article
              key={s.title}
              variants={fadeUp}
              whileHover={{
                y: -4,
                boxShadow: `0 22px 44px -16px ${s.tint}55`,
                transition: { duration: 0.25 },
              }}
              className="glass rounded-[24px] p-7 relative overflow-hidden"
            >
              <span
                aria-hidden
                className="blob"
                style={{ top: -50, right: -50, width: 200, height: 200, background: s.tint, opacity: 0.20 }}
              />
              <div className="relative">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: `${s.tint}15`, border: `1px solid ${s.tint}25` }}
                >
                  {s.icon}
                </div>
                <h3 className="heading mt-6" style={{ fontSize: "20px" }}>{s.title}</h3>
                <p className="text-[#2B3950] text-[14px] mt-2.5 leading-[1.65]">{s.body}</p>
                <Link
                  href={s.href}
                  className="mt-5 inline-flex items-center gap-2 text-[14px] font-[family-name:var(--font-display)] font-600"
                  style={{ color: s.tint }}
                >
                  {s.cta}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}
