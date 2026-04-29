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
  { market: "SL", flag: "🇱🇰", syllabus: "Cambridge", grade: "Year 11", subject: "Platform", before: "Hesitant", after: "Confident", quote: "EDUS's platform is incredibly user-friendly. I can access my courses and materials anytime.", name: "K. Ellakiya", role: "Student", location: "Kandy, Sri Lanka" },
  { market: "SL", flag: "🇱🇰", syllabus: "Cambridge", grade: "O/L", subject: "Cambridge Courses", before: "Isolated", after: "Connected", quote: "Their Cambridge courses are great, but the best part is the online forums and the community.", name: "P. Vijithan", role: "Student", location: "Colombo, Sri Lanka" },
  { market: "SL", flag: "🇱🇰", syllabus: "National", grade: "Grade 8", subject: "Flexibility", before: "Schedule clash", after: "On-track", quote: "EDUS is perfect for working moms. Their online platform lets my daughter learn anytime.", name: "T. Kalaivani", role: "Parent", location: "Kalmunai, Sri Lanka" },
  { market: "SL", flag: "🇱🇰", syllabus: "National", grade: "A/L", subject: "Affordability", before: "Costly options", after: "Value-rich", quote: "EDUS provides affordable and high-quality online courses that cater to diverse needs.", name: "A. Chellakumar, LLB", role: "Parent", location: "Galle, Sri Lanka" },
  { market: "SL", flag: "🇱🇰", syllabus: "National", grade: "Grade 11", subject: "Community", before: "Online = lonely", after: "Online = together", quote: "What I love about EDUS is the community. Even online, I feel connected to my peers.", name: "C. Kajansika", role: "Student", location: "Batticaloa, Sri Lanka" },
  { market: "GL", flag: "🌐", syllabus: "Cambridge IGCSE", grade: "Year 10", subject: "Physics", before: "Predicted 5", after: "Achieved 8", quote: "I had a tutor matched to my time zone in 48 hours. The flexibility was the whole reason it worked.", name: "Adaeze N.", role: "Student", location: "Lagos, Nigeria" },
  { market: "IN", flag: "🇮🇳", syllabus: "CBSE", grade: "Grade 10", subject: "Science", before: "76%", after: "94%", quote: "Weekly parent updates kept us aligned. The tutor knew exactly where my son needed support.", name: "Rakesh M.", role: "Parent", location: "Bengaluru, India" },
  { market: "GL", flag: "🌐", syllabus: "IB Diploma", grade: "Year 12", subject: "Economics", before: "5", after: "7", quote: "One-to-one means the tutor adapts to me. Not a class of 30 working at someone else's pace.", name: "Sofia R.", role: "Student", location: "Madrid, Spain" },
];

const FILTERS = [
  { code: "ALL", label: "All" },
  { code: "SL", label: "Sri Lanka" },
  { code: "IN", label: "India" },
  { code: "GL", label: "Global" },
] as const;

export function Success() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["code"]>("ALL");
  const visible = filter === "ALL" ? STORIES : STORIES.filter((s) => s.market === filter);

  return (
    <section className="relative py-24 md:py-32 border-t border-[rgba(14,20,33,0.10)]">
      <div className="container-wide">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-7">
            <p className="kicker">
              <span className="kicker-num">§ 05</span>
              Outcomes / What success looks like
            </p>
            <h2 className="display mt-5" style={{ fontSize: "var(--fs-hero)", lineHeight: 1.0 }}>
              Real outcomes, <em className="accent">filterable by market.</em>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:pb-3 flex md:justify-end">
            <div className="border border-[rgba(14,20,33,0.20)] flex">
              {FILTERS.map((f) => (
                <button
                  key={f.code}
                  onClick={() => setFilter(f.code)}
                  className={`px-4 py-2 font-mono text-[11px] tracking-[0.16em] uppercase border-l first:border-l-0 border-[rgba(14,20,33,0.20)] transition ${
                    filter === f.code
                      ? "bg-[#0E1421] text-[#F4F2ED]"
                      : "text-[#2C334A] hover:bg-[rgba(14,20,33,0.04)]"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rule-strong mt-10" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          {visible.map((s, i) => (
            <article
              key={i}
              className={`p-7 lg:p-9 border-b border-[rgba(14,20,33,0.10)] ${(i + 1) % 3 !== 0 ? "lg:border-r border-[rgba(14,20,33,0.10)]" : ""} ${i % 2 !== 0 ? "md:border-l border-[rgba(14,20,33,0.10)]" : ""}`}
            >
              <div className="flex items-center justify-between mb-7">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#1640D8]">
                  {s.flag} {s.syllabus} · {s.grade}
                </span>
                <span className="font-mono text-[10px] text-[#6B7390]">No. {String(i + 1).padStart(2, "0")}</span>
              </div>

              <p className="font-display text-[20px] leading-[1.4] text-[#0E1421]">
                "{s.quote}"
              </p>

              <div className="mt-7 pt-5 border-t border-[rgba(14,20,33,0.10)] flex items-end justify-between gap-4">
                <div>
                  <p className="text-[14px] font-medium text-[#0E1421]">{s.name}</p>
                  <p className="text-[11px] text-[#6B7390] font-mono mt-0.5">{s.role} · {s.location}</p>
                </div>
                <div className="flex items-center gap-2 text-[10.5px] font-mono">
                  <span className="px-2 py-0.5 border border-[rgba(14,20,33,0.20)] text-[#6B7390]">
                    {s.before}
                  </span>
                  <span className="text-[#0E1421]">→</span>
                  <span className="px-2 py-0.5 bg-[#0E1421] text-[#D9A441]">
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
