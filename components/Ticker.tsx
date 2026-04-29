const ITEMS = [
  { label: "ENROLMENTS", value: "Term 2 · 2026 Open" },
  { label: "MARKETS", value: "🇱🇰 SL · 🇮🇳 IN · 🌐 GLOBAL" },
  { label: "LIVE CLASSES", value: "530+" },
  { label: "EXPERIENCE", value: "5+ YRS" },
  { label: "SUPPORT", value: "24 / 7" },
  { label: "MEDIUM", value: "EN · TA · SI" },
  { label: "BOARDS", value: "NATIONAL · CAMBRIDGE · EDEXCEL · CBSE" },
  { label: "COVERAGE", value: "GRADE 1 — A/L" },
];

export function Ticker({ tone = "ink" }: { tone?: "ink" | "paper" }) {
  const isInk = tone === "ink";
  return (
    <div className={`relative overflow-hidden border-y ${isInk ? "bg-[#0E1421] border-white/10 text-[#F4F2ED]" : "bg-[#F4F2ED] border-[rgba(14,20,33,0.10)] text-[#0E1421]"}`}>
      <div className="ticker">
        {[...ITEMS, ...ITEMS].map((it, i) => (
          <div key={i} className="flex items-center gap-3 px-7 py-3 whitespace-nowrap">
            <span className={`font-mono text-[10px] tracking-[0.22em] ${isInk ? "text-[#D9A441]" : "text-[#1640D8]"}`}>
              {it.label}
            </span>
            <span className="font-mono text-[12px] tracking-[0.06em]">
              {it.value}
            </span>
            <span className={`inline-block w-1 h-1 rounded-full ${isInk ? "bg-[#F4F2ED]/40" : "bg-[#0E1421]/40"}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
