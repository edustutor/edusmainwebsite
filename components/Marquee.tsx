const ITEMS = [
  "G.C.E. O/L · A/L",
  "CBSE · NCERT",
  "Cambridge IGCSE",
  "Edexcel",
  "IB Diploma",
  "ICSE / ISC",
  "Sinhala medium",
  "Tamil medium",
  "English medium",
  "30+ countries",
  "Live · Online",
  "Parent monitoring",
];

export function Marquee() {
  return (
    <section className="relative py-12 border-y border-[rgba(10,18,48,0.06)] overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#FAFBFF] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#FAFBFF] to-transparent z-10 pointer-events-none" />
      <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 max-w-6xl mx-auto px-6">
        {ITEMS.map((it, i) => (
          <span key={i} className="inline-flex items-center gap-3 font-display text-2xl text-[#2B3458] whitespace-nowrap">
            {it}
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC21A]" />
          </span>
        ))}
      </div>
    </section>
  );
}
