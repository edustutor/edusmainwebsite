import { SUBJECTS, GRADES, SCHEDULE } from "./InShared";

export function InAcademicStructure() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      <div className="container-edge">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow"><span className="dot" />Academic Structure</p>
          <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
            Three core subjects. <em>Every CBSE class.</em>
          </h2>
          <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
            English-medium CBSE tuition for Classes 6–10. Mathematics, Science, and English -
            taught by tutors segmented into Middle Stage (Classes 6–8) and Secondary Stage
            (Classes 9–10).
          </p>
        </div>

        <div className="mt-12 space-y-5">
          {/* Subjects */}
          <div className="glass-strong rounded-[24px] p-7">
            <h3 className="font-[family-name:var(--font-display)] font-700 text-[14px] text-[#2563EB]">
              CBSE Online Tuition by Subject
            </h3>
            <p className="text-[12px] text-[#5A6A82] mt-1">
              Three core CBSE subjects taught online for every class from 6 to 10.
            </p>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SUBJECTS.map((s, i) => (
                <div key={s} className="rounded-2xl bg-white border border-[rgba(16,32,51,0.06)] p-4 text-center">
                  <p className="text-[10.5px] font-mono text-[#5A6A82]">{String(i + 1).padStart(2, "0")}</p>
                  <h4 className="font-[family-name:var(--font-display)] font-700 text-[15px] mt-1.5 text-[#102033]">
                    CBSE {s}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* Grade tiers */}
          <div className="glass rounded-[24px] p-7">
            <h3 className="font-[family-name:var(--font-display)] font-700 text-[14px] text-[#8B5CF6]">
              CBSE Online Tuition by Class
            </h3>
            <p className="text-[12px] text-[#5A6A82] mt-1">
              CBSE Class 6, 7, 8 (Middle Stage) and CBSE Class 9, 10 (Secondary Stage) online tuition.
            </p>
            <div className="mt-5 grid grid-cols-5 gap-3">
              {GRADES.map((g) => (
                <div
                  key={g.g}
                  className="rounded-2xl py-6 text-center text-white"
                  style={{ background: `linear-gradient(180deg, ${g.tint}EE, ${g.tint})` }}
                >
                  <h4
                    className="font-[family-name:var(--font-display)] font-700 text-[36px] leading-none"
                    aria-label={`CBSE Class ${g.g} online tuition`}
                  >
                    {g.g}
                  </h4>
                  <p className="text-[11px] uppercase tracking-wider mt-2 opacity-80">CBSE Class · {g.tier}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div className="glass rounded-[24px] p-7">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <p className="font-[family-name:var(--font-display)] font-600 text-[12px] tracking-[0.12em] uppercase text-[#06B6D4]">
                Class Schedule · Mon – Sat
              </p>
              <p className="text-[12.5px] text-[#5A6A82]">2 hours / week / subject</p>
            </div>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
              {SCHEDULE.map((s) => (
                <div
                  key={s.slot}
                  className="rounded-2xl bg-white border border-[rgba(16,32,51,0.06)] p-4 flex items-center justify-between"
                >
                  <span
                    className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-white font-[family-name:var(--font-display)] font-600 text-[12px]"
                    style={{ background: s.tint }}
                  >
                    🕐
                  </span>
                  <div className="text-right">
                    <p className="text-[11px] uppercase tracking-wider text-[#5A6A82]">{s.slot}</p>
                    <p className="font-[family-name:var(--font-display)] font-600 text-[15px] tnum text-[#102033]">{s.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
