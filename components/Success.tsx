"use client";
import { useState } from "react";

type Story = {
  market: "SL" | "IN" | "GL";
  flag: string;
  syllabus: string;
  grade: string;
  subject: string;
  before: string;
  after: string;
  quote: string;
  name: string;
  role: "Student" | "Parent";
  location: string;
};

const STORIES: Story[] = [
  { market: "SL", flag: "🇱🇰", syllabus: "National", grade: "Cambridge", subject: "Platform", before: "Hesitant", after: "Confident", quote: "EDUS's platform is incredibly user-friendly. I can access my courses and materials anytime.", name: "K. Ellakiya", role: "Student", location: "Kandy, Sri Lanka" },
  { market: "SL", flag: "🇱🇰", syllabus: "Cambridge", grade: "O/L", subject: "Cambridge courses", before: "Isolated", after: "Connected", quote: "Their Cambridge courses are great, but the best part is the online forums and the community.", name: "P. Vijithan", role: "Student", location: "Colombo, Sri Lanka" },
  { market: "SL", flag: "🇱🇰", syllabus: "National", grade: "Grade 8", subject: "Flexibility", before: "Schedule clash", after: "On-track", quote: "EDUS is perfect for working moms! Their online platform lets my daughter learn anytime.", name: "T. Kalaivani", role: "Parent", location: "Kalmunai, Sri Lanka" },
  { market: "SL", flag: "🇱🇰", syllabus: "National", grade: "A/L", subject: "Affordability", before: "Costly options", after: "Value-rich", quote: "EDUS provides affordable and high-quality online courses that cater to diverse needs.", name: "A. Chellakumar, LLB", role: "Parent", location: "Galle, Sri Lanka" },
  { market: "SL", flag: "🇱🇰", syllabus: "National", grade: "Grade 11", subject: "Community", before: "Online = lonely", after: "Online = together", quote: "What I love about EDUS is the community. Even online, I feel connected to my peers.", name: "C. Kajansika", role: "Student", location: "Batticaloa, Sri Lanka" },
  { market: "GL", flag: "🌐", syllabus: "Cambridge IGCSE", grade: "Year 10", subject: "Physics", before: "Predicted 5", after: "Achieved 8", quote: "I had a tutor matched to my time zone in 48 hours. The flexibility was the whole reason it worked.", name: "Adaeze N.", role: "Student", location: "Lagos, Nigeria" },
  { market: "IN", flag: "🇮🇳", syllabus: "CBSE", grade: "Grade 10", subject: "Science", before: "76%", after: "94%", quote: "Weekly parent updates kept us aligned. The tutor knew exactly where my son needed support.", name: "Rakesh M.", role: "Parent", location: "Bengaluru, India" },
  { market: "GL", flag: "🌐", syllabus: "IB Diploma", grade: "Year 12", subject: "Economics", before: "5", after: "7", quote: "One-to-one means the tutor adapts to me. Not a class of 30 working at someone else's pace.", name: "Sofia R.", role: "Student", location: "Madrid, Spain" },
];

const FILTERS = [
  { code: "ALL", label: "All markets" },
  { code: "SL", label: "Sri Lanka" },
  { code: "IN", label: "India" },
  { code: "GL", label: "Global" },
] as const;

export function Success() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["code"]>("ALL");
  const visible = filter === "ALL" ? STORIES : STORIES.filter((s) => s.market === filter);

  return (
    <section className="relative py-20 md:py-24 border-t border-[rgba(10,18,48,0.06)]">
      <div className="container-edge">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
          <div>
            <p className="eyebrow"><span className="dot" />04 · What success looks like</p>
            <h2 className="display mt-4" style={{ fontSize: "var(--fs-display)" }}>
              Real outcomes, <em>filterable by market.</em>
            </h2>
          </div>
          <div className="glass rounded-full p-1 flex flex-wrap gap-1">
            {FILTERS.map((f) => (
              <button
                key={f.code}
                onClick={() => setFilter(f.code)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  filter === f.code
                    ? "bg-[#0A1230] text-white"
                    : "text-[#2B3458] hover:text-[#0A1230]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((s, i) => (
            <article key={i} className="glass rounded-3xl p-7 lift relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-[#5C6485]">
                  <span>{s.flag}</span>{s.syllabus} · {s.grade}
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#5C6485]">{s.subject}</span>
              </div>

              <p className="display text-xl leading-snug mt-6 text-[#0A1230]">"{s.quote}"</p>

              <div className="mt-6 pt-5 border-t border-[rgba(10,18,48,0.06)] flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-[#0A1230]">{s.name}</p>
                  <p className="text-xs text-[#5C6485] font-mono">{s.role} · {s.location}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-white border border-[rgba(10,18,48,0.10)] text-[11px] font-mono text-[#5C6485]">
                    {s.before}
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#0A55F5]">
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="px-2.5 py-1 rounded-full bg-[#FFC21A]/20 border border-[#FFC21A]/50 text-[11px] font-mono text-[#7A5500]">
                    {s.after}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
