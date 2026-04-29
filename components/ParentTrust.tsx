"use client";
import Link from "next/link";
import { m } from "@/components/Motion";
import { fadeUp, staggerContainer, sectionReveal, inView } from "@/lib/motion";

const POINTS = [
  { title: "Clear class schedules", body: "Structured timetables and clear learning plans so families always know what's next." },
  { title: "Attendance & progress", body: "Attendance and progress monitoring shared with parents on a regular cycle." },
  { title: "Beyond the live class", body: "Academic support continues after class with recordings, resources, and revision." },
  { title: "Parent friendly updates", body: "Simple, parent friendly communication — no academic jargon, no surprises." },
  { title: "Tutor quality monitored", body: "Structured tutor screening and monitored class quality across every subject." },
  { title: "Simple online process", body: "A simple online enrolment and support process that respects your time." },
];

export function ParentTrust() {
  return (
    <section id="parent-trust" className="relative py-20 md:py-28 scroll-mt-24 overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="blob" style={{ top: "10%", right: "-8%", width: 380, height: 380, background: "#06B6D4", opacity: 0.16 }} />
        <div className="blob" style={{ bottom: "0%", left: "-6%", width: 360, height: 360, background: "#2563EB", opacity: 0.18 }} />
      </div>

      <div className="container-edge">
        <m.div
          className="text-center max-w-2xl mx-auto"
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <p className="eyebrow"><span className="dot" />Parent Trust</p>
          <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
            Built for students. <em>Trusted by parents.</em>
          </h2>
          <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
            Parents need visibility. Students need support. EDUS connects both through structured classes,
            attendance tracking, exam reviews, learning resources, and regular communication.
          </p>
        </m.div>

        <m.div
          className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          {POINTS.map((p, i) => (
            <m.article
              key={p.title}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="glass rounded-[22px] p-6 relative overflow-hidden"
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex w-10 h-10 rounded-2xl items-center justify-center bg-[#EEF6FF] text-[#2563EB] font-[family-name:var(--font-display)] font-700 text-[14px] shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="heading" style={{ fontSize: "16px" }}>{p.title}</h3>
                  <p className="text-[#2B3950] text-[13.5px] mt-1.5 leading-[1.65]">{p.body}</p>
                </div>
              </div>
            </m.article>
          ))}
        </m.div>

        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 flex justify-center"
        >
          <Link href="/contact" className="btn btn-primary">Talk to EDUS Team</Link>
        </m.div>
      </div>
    </section>
  );
}
