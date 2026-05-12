import { SUBJECTS_NATIONAL, SUBJECTS_INTL } from "./SlShared";

export function SlCurricula() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="blob" style={{ top: "10%", right: "-8%", width: 420, height: 420, background: "#8B5CF6", opacity: 0.16 }} />
      </div>

      <div className="container-edge">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow"><span className="dot" />Classes</p>
          <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
            World - Class Learning with <em>Exceptional Tutors!</em>
          </h2>
          <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
            Personalized live online learning with expert tutors, proven methods, progress tracking,
            and caring academic support - built to help students learn confidently and succeed.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {/* National */}
          <div className="glass rounded-[24px] p-7">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#EEF6FF] text-[#2563EB]">📘</span>
                <div>
                  <p className="font-[family-name:var(--font-display)] font-600 text-[15px] text-[#2563EB]">National Syllabus · Grade 1 – A/L</p>
                  <p className="text-[12px] text-[#5A6A82] mt-0.5">Sinhala · Tamil · English medium</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-5">
              {SUBJECTS_NATIONAL.map((s) => (
                <span key={s} className="px-3 py-1.5 rounded-full bg-white border border-[rgba(16,32,51,0.08)] text-[13px] text-[#102033]">{s}</span>
              ))}
            </div>
          </div>

          {/* Cambridge & Edexcel */}
          <div className="glass rounded-[24px] p-7">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#F4EEFF] text-[#8B5CF6]">📗</span>
                <div>
                  <p className="font-[family-name:var(--font-display)] font-600 text-[15px] text-[#8B5CF6]">Cambridge & Edexcel · IGCSE / A-Level</p>
                  <p className="text-[12px] text-[#5A6A82] mt-0.5">English medium</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-5">
              {SUBJECTS_INTL.map((s) => (
                <span key={s} className="px-3 py-1.5 rounded-full bg-white border border-[rgba(16,32,51,0.08)] text-[13px] text-[#102033]">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
