const SEQUENCE = [
  { tag: "Live", title: "Live lesson", body: "Interactive online classroom with real-time discussion, polls, and Q&A.", time: "Weekly" },
  { tag: "Practice", title: "Assignments", body: "Tutor-set exercises that reinforce the lesson, returned with feedback.", time: "After class" },
  { tag: "Recordings", title: "Revision recordings", body: "Every lesson archived so students can rewatch any topic.", time: "On demand" },
  { tag: "Assessments", title: "Periodic exams", body: "Term and unit exams modelled on real exam structure to test progress.", time: "Each term" },
  { tag: "Parents", title: "Parent updates", body: "Attendance, performance, and tutor notes pushed to the parent app.", time: "Continuous" },
  { tag: "Support", title: "Resource library", body: "Past papers, study notes, and AI Study Buddy for self-paced practice.", time: "Always-on" },
];

export function LearningExperience() {
  return (
    <section className="relative py-24 md:py-32 border-t border-[rgba(14,20,33,0.10)]">
      <div className="container-wide">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-8">
            <p className="kicker">
              <span className="kicker-num">§ 06</span>
              Method / How learning works
            </p>
            <h2 className="display mt-5" style={{ fontSize: "var(--fs-hero)", lineHeight: 1.0 }}>
              Live, recorded, <em className="accent">tracked.</em>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:pb-3">
            <p className="text-[#2C334A] text-[14.5px] leading-relaxed">
              Families buy the learning process before they buy the brand story. Here's exactly how a class
              goes from live delivery to long-term progress.
            </p>
          </div>
        </div>

        <div className="rule-strong mt-10" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          {SEQUENCE.map((s, i) => (
            <div
              key={s.tag}
              className={`p-7 lg:p-9 border-b border-[rgba(14,20,33,0.10)] ${(i + 1) % 3 !== 0 ? "lg:border-r border-[rgba(14,20,33,0.10)]" : ""} ${i % 2 !== 0 ? "md:border-l border-[rgba(14,20,33,0.10)]" : ""}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-[#1640D8]">
                  {String(i + 1).padStart(2, "0")} · {s.tag}
                </span>
                <span className="font-mono text-[10px] text-[#6B7390]">{s.time}</span>
              </div>
              <h3 className="display mt-7" style={{ fontSize: "var(--fs-h3)" }}>{s.title}</h3>
              <p className="text-[#2C334A] text-[14px] mt-3 leading-[1.65]">{s.body}</p>
              <div className="mt-7 flex gap-1">
                {Array.from({ length: 6 }).map((_, j) => (
                  <span key={j} className={`h-px flex-1 ${j <= i ? "bg-[#0E1421]" : "bg-[rgba(14,20,33,0.15)]"}`} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
