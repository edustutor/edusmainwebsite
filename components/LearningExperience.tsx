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
    <section className="relative py-28 border-t border-[rgba(10,18,48,0.06)] overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="glow" style={{ bottom: -200, left: "30%", width: 600, height: 600, background: "#CFE0FF" }} />
      </div>

      <div className="container-edge">
        <div className="max-w-2xl">
          <p className="eyebrow"><span className="dot" />06 · How learning works</p>
          <h2 className="display text-5xl md:text-6xl mt-4">
            Live, recorded, <em>tracked.</em>
          </h2>
          <p className="text-[#2B3458] mt-5">
            Families buy the learning process before they buy the brand story. Here's exactly how a class
            goes from live delivery to long-term progress.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SEQUENCE.map((s, i) => (
            <div key={s.tag} className="relative glass rounded-3xl p-7 lift overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#0A55F5] uppercase">
                  Step {String(i + 1).padStart(2, "0")} · {s.tag}
                </span>
                <span className="text-[10px] font-mono text-[#5C6485]">{s.time}</span>
              </div>
              <h3 className="display text-2xl mt-6">{s.title}</h3>
              <p className="text-[#2B3458] text-sm mt-2 leading-relaxed">{s.body}</p>

              <div className="mt-6 h-px bg-gradient-to-r from-transparent via-[rgba(10,18,48,0.12)] to-transparent" />
              <div className="mt-4 flex gap-1.5">
                {Array.from({ length: 6 }).map((_, j) => (
                  <span
                    key={j}
                    className={`h-1 flex-1 rounded-full ${j <= i ? "bg-[#FFC21A]" : "bg-[rgba(10,18,48,0.08)]"}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
