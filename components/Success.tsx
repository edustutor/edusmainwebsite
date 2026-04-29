"use client";
import { useState } from "react";

type Story = {
  market: "SL" | "IN" | "GL";
  flag: string;
  syllabus: string;
  grade: string;
  quote: string;
  name: string;
  role: "Student" | "Parent";
  location: string;
};

const STORIES: Story[] = [
  { market: "SL", flag: "🇱🇰", syllabus: "Cambridge", grade: "Year 11", quote: "EDUS's platform is incredibly user-friendly. I can access my courses and materials anytime.", name: "K. Ellakiya", role: "Student", location: "Kandy, Sri Lanka" },
  { market: "SL", flag: "🇱🇰", syllabus: "Cambridge", grade: "O/L", quote: "Their Cambridge courses are great, but the best part is the online forums and the community.", name: "P. Vijithan", role: "Student", location: "Colombo, Sri Lanka" },
  { market: "SL", flag: "🇱🇰", syllabus: "National", grade: "Grade 8", quote: "EDUS is perfect for working moms. Their online platform lets my daughter learn anytime.", name: "T. Kalaivani", role: "Parent", location: "Kalmunai, Sri Lanka" },
  { market: "SL", flag: "🇱🇰", syllabus: "National", grade: "A/L", quote: "EDUS provides affordable and high-quality online courses that cater to diverse needs.", name: "A. Chellakumar, LLB", role: "Parent", location: "Galle, Sri Lanka" },
  { market: "SL", flag: "🇱🇰", syllabus: "National", grade: "Grade 11", quote: "What I love about EDUS is the community. Even online, I feel connected to my peers.", name: "C. Kajansika", role: "Student", location: "Batticaloa, Sri Lanka" },
  { market: "GL", flag: "🌐", syllabus: "Cambridge IGCSE", grade: "Year 10", quote: "I had a tutor matched to my time zone in 48 hours. The flexibility was the whole reason it worked.", name: "Adaeze N.", role: "Student", location: "Lagos, Nigeria" },
  { market: "IN", flag: "🇮🇳", syllabus: "CBSE", grade: "Grade 10", quote: "Weekly parent updates kept us aligned. The tutor knew exactly where my son needed support.", name: "Rakesh M.", role: "Parent", location: "Bengaluru, India" },
  { market: "GL", flag: "🌐", syllabus: "IB Diploma", grade: "Year 12", quote: "One-to-one means the tutor adapts to me, not a class of 30 working at someone else's pace.", name: "Sofia R.", role: "Student", location: "Madrid, Spain" },
];

const FILTERS = [
  { code: "ALL", label: "All Stories" },
  { code: "SL", label: "Sri Lanka" },
  { code: "IN", label: "India" },
  { code: "GL", label: "Global" },
] as const;

export function Success() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["code"]>("ALL");
  const visible = filter === "ALL" ? STORIES : STORIES.filter((s) => s.market === filter);

  return (
    <section id="stories" className="relative py-20 md:py-28 scroll-mt-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="blob" style={{ top: "20%", left: "-8%", width: 420, height: 420, background: "#FACC15", opacity: 0.16 }} />
        <div className="blob" style={{ bottom: "10%", right: "-8%", width: 420, height: 420, background: "#06B6D4", opacity: 0.16 }} />
      </div>

      <div className="container-edge">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow"><span className="dot" />Success Stories</p>
          <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
            Real outcomes. <em>Real families.</em>
          </h2>
          <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
            Filter by market to see the stories that matter for you.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex glass rounded-full p-1.5 gap-1">
            {FILTERS.map((f) => (
              <button
                key={f.code}
                onClick={() => setFilter(f.code)}
                className={`px-4 py-2 rounded-full text-[13px] font-medium font-[family-name:var(--font-display)] transition ${
                  filter === f.code
                    ? "bg-[#102033] text-white"
                    : "text-[#2B3950] hover:bg-white/70"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((s, i) => (
            <article key={i} className="glass rounded-[24px] p-7 lift relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF6FF] text-[#2563EB] text-[11.5px] font-medium font-[family-name:var(--font-display)]">
                  <span>{s.flag}</span>
                  {s.syllabus} · {s.grade}
                </span>
                <span className="text-[#FACC15] text-lg leading-none">★★★★★</span>
              </div>

              <p className="text-[#102033] text-[15.5px] mt-5 leading-[1.65]">
                "{s.quote}"
              </p>

              <div className="mt-6 pt-5 border-t border-[rgba(16,32,51,0.08)] flex items-center gap-3">
                <span
                  className="inline-flex w-10 h-10 rounded-full items-center justify-center text-white font-[family-name:var(--font-display)] font-600 text-[14px]"
                  style={{
                    background: i % 3 === 0 ? "#2563EB" : i % 3 === 1 ? "#8B5CF6" : "#06B6D4",
                  }}
                >
                  {s.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </span>
                <div>
                  <p className="text-[14px] font-[family-name:var(--font-display)] font-600 text-[#102033]">{s.name}</p>
                  <p className="text-[12px] text-[#5A6A82]">{s.role} · {s.location}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
