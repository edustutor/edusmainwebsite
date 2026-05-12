"use client";
import { m } from "@/components/Motion";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { SectionHead } from "./TeachShared";

const QA = [
  { title: "Class Completion",   body: "Planned vs conducted classes.",                              tint: "#2563EB" },
  { title: "Punctuality",        body: "Joining time, duration, schedule discipline.",               tint: "#8B5CF6" },
  { title: "Teaching Quality",   body: "Explanation, clarity, preparation, and delivery.",           tint: "#06B6D4" },
  { title: "Student Engagement", body: "Interaction, questioning, participation, motivation.",       tint: "#FACC15" },
  { title: "Technical Quality",  body: "Audio, video, board visibility, and recordings.",            tint: "#22C55E" },
  { title: "Attendance",         body: "Student attendance and participation trends.",               tint: "#2563EB" },
  { title: "Student Retention",  body: "Growth, dropouts, and continuation patterns.",               tint: "#8B5CF6" },
  { title: "Feedback",           body: "Student, parent, consultant, and QA observations.",          tint: "#06B6D4" },
  { title: "Compliance",         body: "Attendance marking, recordings, communication, system use.", tint: "#FACC15" },
];

const REPORT = [
  { title: "Class-wise Performance", body: "Planned, conducted, missed, and completed." },
  { title: "Session Details",        body: "Date, duration, attendance, recording, QA remarks." },
  { title: "Student Trend",          body: "Growth, dropouts, and attendance patterns." },
  { title: "QA Summary",             body: "Teaching quality, technical quality, improvement areas." },
  { title: "Payment Summary",        body: "Class rate, additions, deductions, final payable." },
  { title: "3-Month Comparison",     body: "Growth or decline in students and performance." },
  { title: "Academic Remarks",       body: "Final review, improvement plan, continuation decision." },
];

export function TeachQA() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div className="container-edge">
        <m.div variants={sectionRevealStrong} initial="hidden" whileInView="show" viewport={inView}>
          <SectionHead
            eyebrow="Quality Assurance"
            title="Every tutor is reviewed fairly and"
            emphasis="professionally."
            body="EDUS runs a monthly tutor review system so students get a consistent, high-quality learning experience - and tutors get clear, fair feedback."
          />
        </m.div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {QA.map((q) => (
            <m.div
              key={q.title}
              variants={fadeUp}
              className="bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-4 shadow-[0_10px_28px_-20px_rgba(16,32,51,0.18)]"
            >
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ background: q.tint }}
                />
                <p className="font-[family-name:var(--font-display)] font-700 text-[13.5px] text-[#102033] leading-tight">
                  {q.title}
                </p>
              </div>
              <p className="text-[12.5px] text-[#5A6A82] mt-1.5 leading-[1.55]">{q.body}</p>
            </m.div>
          ))}
        </m.div>

        {/* Monthly Report block */}
        <m.div
          variants={sectionRevealStrong}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-14 grid lg:grid-cols-12 gap-6 items-start"
        >
          <div className="lg:col-span-5">
            <p className="eyebrow"><span className="dot" />Monthly Tutor Report</p>
            <h3 className="heading mt-3" style={{ fontSize: "clamp(22px, 2.4vw, 30px)" }}>
              Transparent, data-backed <em>performance monitoring.</em>
            </h3>
            <p className="text-[#2B3950] text-[14.5px] mt-4 leading-[1.7]">
              Every tutor receives a structured monthly report combining class data, attendance,
              QA remarks, consultant feedback, and academic approval - so strengths and improvement
              areas are clear.
            </p>
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-3">
            {REPORT.map((r) => (
              <article
                key={r.title}
                className="bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-4 shadow-[0_10px_28px_-20px_rgba(16,32,51,0.18)]"
              >
                <p className="font-[family-name:var(--font-display)] font-700 text-[13.5px] text-[#102033] leading-tight">
                  {r.title}
                </p>
                <p className="text-[12.5px] text-[#5A6A82] mt-1.5 leading-[1.55]">{r.body}</p>
              </article>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}
