"use client";
import { m } from "@/components/Motion";
import { fadeUp, staggerContainer, sectionReveal, inView } from "@/lib/motion";

type Story = {
  label: string;
  quote: string;
  initials: string;
  tint: string;
};

const STORIES: Story[] = [
  {
    label: "Grade 8 Student",
    quote:
      "Maths became easier when I started learning with clear explanations and regular practice. I now feel more confident in class.",
    initials: "S8",
    tint: "#2563EB",
  },
  {
    label: "Parent of Grade 10 Student",
    quote:
      "The class structure, reminders, and progress updates helped us understand how our child was improving.",
    initials: "P10",
    tint: "#8B5CF6",
  },
  {
    label: "One to One Student",
    quote:
      "My tutor explained difficult lessons step by step. The personal attention helped me ask questions freely.",
    initials: "1:1",
    tint: "#06B6D4",
  },
  {
    label: "Parent Feedback",
    quote:
      "EDUS gave us a better way to manage online learning with proper class timing, support, and updates.",
    initials: "PF",
    tint: "#22C55E",
  },
];

export function Success() {
  return (
    <section id="stories" className="relative py-20 md:py-28 scroll-mt-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="blob" style={{ top: "20%", left: "-8%", width: 420, height: 420, background: "#FACC15", opacity: 0.16 }} />
        <div className="blob" style={{ bottom: "10%", right: "-8%", width: 420, height: 420, background: "#06B6D4", opacity: 0.16 }} />
      </div>

      <div className="container-edge">
        <m.div
          className="text-center max-w-2xl mx-auto"
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <p className="eyebrow"><span className="dot" />Success Stories</p>
          <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
            Student progress starts with the <em>right support.</em>
          </h2>
          <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
            Every student learns differently. EDUS helps students build confidence through clear teaching,
            regular practice, revision support, and parent monitored progress.
          </p>
        </m.div>

        <m.div
          className="mt-12 grid md:grid-cols-2 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          {STORIES.map((s) => (
            <m.article
              key={s.label}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="glass rounded-[24px] p-7 relative overflow-hidden"
            >
              <span aria-hidden className="blob" style={{ top: -50, right: -50, width: 200, height: 200, background: s.tint, opacity: 0.18 }} />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11.5px] font-medium font-[family-name:var(--font-display)]"
                    style={{ background: `${s.tint}15`, color: s.tint }}
                  >
                    {s.label}
                  </span>
                  <span className="text-[#FACC15] text-lg leading-none">★★★★★</span>
                </div>

                <p className="text-[#102033] text-[16px] mt-5 leading-[1.65]">
                  "{s.quote}"
                </p>

                <div className="mt-6 pt-5 border-t border-[rgba(16,32,51,0.08)] flex items-center gap-3">
                  <span
                    className="inline-flex w-10 h-10 rounded-full items-center justify-center text-white font-[family-name:var(--font-display)] font-600 text-[12px]"
                    style={{ background: s.tint }}
                  >
                    {s.initials}
                  </span>
                  <p className="text-[12.5px] text-[#5A6A82] font-[family-name:var(--font-display)] font-500">
                    Verified EDUS feedback
                  </p>
                </div>
              </div>
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}
