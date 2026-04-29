const SEQUENCE = [
  { tag: "Live", title: "Live lesson", body: "Interactive online classroom with discussion, polls, and real-time Q&A.", time: "Weekly" },
  { tag: "Practice", title: "Assignments", body: "Tutor-set exercises that reinforce the lesson, returned with feedback.", time: "After class" },
  { tag: "Watch", title: "Revision recordings", body: "Every lesson archived so students can rewatch any topic anytime.", time: "On demand" },
  { tag: "Test", title: "Periodic exams", body: "Term and unit exams modelled on real exam structure to test progress.", time: "Each term" },
  { tag: "Update", title: "Parent updates", body: "Attendance, performance, and tutor notes pushed to the parent app.", time: "Continuous" },
  { tag: "Support", title: "Resource library", body: "Past papers, study notes, and AI Study Buddy for self-paced practice.", time: "Always-on" },
];

const TINTS = ["#2563EB", "#8B5CF6", "#06B6D4", "#22C55E", "#FACC15", "#2563EB"];

export function LearningExperience() {
  return (
    <section id="how" className="relative py-20 md:py-28 scroll-mt-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="blob" style={{ top: "20%", right: "-8%", width: 420, height: 420, background: "#8B5CF6", opacity: 0.18 }} />
      </div>

      <div className="container-edge">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow"><span className="dot" />How Learning Works</p>
          <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
            Live, recorded, <em>tracked.</em>
          </h2>
          <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
            Six steps from live delivery to long-term progress — designed so families always know
            where their student stands.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SEQUENCE.map((s, i) => (
            <article key={s.tag} className="glass rounded-[24px] p-6 lift relative overflow-hidden">
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
                    {s.time}
                  </span>
                </div>
                <h3 className="heading mt-5" style={{ fontSize: "19px" }}>{s.title}</h3>
                <p className="text-[#2B3950] text-[14px] mt-2.5 leading-[1.65]">{s.body}</p>
                <div className="mt-5 flex gap-1">
                  {Array.from({ length: 6 }).map((_, j) => (
                    <span
                      key={j}
                      className="h-1 flex-1 rounded-full transition-colors"
                      style={{ background: j <= i ? TINTS[i] : "rgba(16,32,51,0.08)" }}
                    />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
