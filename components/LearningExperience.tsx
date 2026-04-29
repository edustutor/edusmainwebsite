"use client";
import { m } from "@/components/Motion";
import { sectionReveal, stepReveal, inView } from "@/lib/motion";

const STEPS = [
  { tag: "Region", title: "Choose Your Region", body: "Select Sri Lanka, India, or Global learning support based on your child's location and academic need." },
  { tag: "Grade", title: "Select Grade and Subject", body: "Choose the right grade, subject, syllabus, and class type." },
  { tag: "Live", title: "Join Live Classes", body: "Attend scheduled online classes with trained tutors through a structured learning plan." },
  { tag: "Practice", title: "Practice and Revise", body: "Use assignments, recordings, resources, and revision support to strengthen understanding." },
  { tag: "Track", title: "Track Progress", body: "Monitor attendance, exams, learning improvement, and tutor feedback." },
  { tag: "Updates", title: "Get Parent Updates", body: "Parents receive clear updates so they know how their child is performing." },
];

const TINTS = ["#2563EB", "#8B5CF6", "#06B6D4", "#22C55E", "#FACC15", "#2563EB"];

export function LearningExperience() {
  return (
    <section id="how" className="relative py-20 md:py-28 scroll-mt-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="blob" style={{ top: "20%", right: "-8%", width: 420, height: 420, background: "#8B5CF6", opacity: 0.18 }} />
      </div>

      <div className="container-edge">
        <m.div
          className="text-center max-w-2xl mx-auto"
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <p className="eyebrow"><span className="dot" />How Learning Works</p>
          <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
            A simple online learning process for <em>every student.</em>
          </h2>
          <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
            EDUS keeps the learning journey clear. Students join the right class, attend live lessons,
            complete practice work, review recordings, and receive regular academic support.
          </p>
        </m.div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {STEPS.map((s, i) => (
            <m.article
              key={s.tag}
              custom={i}
              variants={stepReveal}
              initial="hidden"
              whileInView="show"
              viewport={inView}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="glass rounded-[24px] p-6 relative overflow-hidden"
            >
              <span aria-hidden className="blob" style={{ top: -50, right: -50, width: 160, height: 160, background: TINTS[i], opacity: 0.18 }} />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full font-[family-name:var(--font-display)] font-700 text-[13px] text-white"
                    style={{ background: TINTS[i] }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[11px] font-medium uppercase tracking-wider text-[#5A6A82]">
                    {s.tag}
                  </span>
                </div>
                <h3 className="heading mt-5" style={{ fontSize: "19px" }}>{s.title}</h3>
                <p className="text-[#2B3950] text-[14px] mt-2.5 leading-[1.65]">{s.body}</p>
                <div className="mt-5 flex gap-1">
                  {Array.from({ length: 6 }).map((_, j) => (
                    <m.span
                      key={j}
                      className="h-1 flex-1 rounded-full"
                      initial={{ background: "rgba(16,32,51,0.08)" }}
                      whileInView={{
                        background: j <= i ? TINTS[i] : "rgba(16,32,51,0.08)",
                      }}
                      transition={{ duration: 0.4, delay: 0.05 * j + 0.2 }}
                      viewport={inView}
                    />
                  ))}
                </div>
              </div>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  );
}
