"use client";
import { useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import { m, AnimatePresence } from "@/components/effects/Motion";
import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { useIsMobile } from "@/lib/useIsMobile";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { STORIES } from "./SuccessData";


const FILTERS = [
  { code: "ALL", label: "All", flag: null },
  { code: "SL", label: "Sri Lanka", flag: "🇱🇰" },
  { code: "IN", label: "India", flag: "🇮🇳" },
  { code: "MV", label: "Maldives", flag: "🇲🇻" },
  { code: "GL", label: "Global", flag: "🌐" },
] as const;

export function Success() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["code"]>("ALL");
  const visible = filter === "ALL" ? STORIES : STORIES.filter((s) => s.market === filter);

  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const blobAY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [-50, 60]);
  const blobBY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [50, -60]);

  return (
    <section
      ref={ref}
      id="stories"
      className="relative py-12 md:py-16 scroll-mt-24 overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <m.div className="absolute inset-0" style={{ y: blobAY }}>
          <AmbientGlow top="18%" left="-4%" size={240} color="#FACC15" opacity={[0.06, 0.14]} duration={22} blur={80} />
        </m.div>
        <m.div className="absolute inset-0" style={{ y: blobBY }}>
          <AmbientGlow bottom="10%" right="-4%" size={240} color="#06B6D4" opacity={[0.08, 0.14]} duration={26} delay={3} blur={80} />
        </m.div>
      </div>

      <div className="container-edge">
        <m.div
          className="text-center max-w-2xl mx-auto"
          variants={sectionRevealStrong}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <p className="eyebrow"><span className="dot" />Success Stories</p>
          <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
            Student progress starts with the <em>right support.</em>
          </h2>
          <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
            Filter by country to see stories from Sri Lanka, India, and global learners.
          </p>
        </m.div>

        {/* Country filter - always one row, sized down on mobile to fit */}
        <m.div
          className="mt-8 flex justify-center px-3"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <div className="inline-flex glass rounded-full p-0.5 sm:p-1.5 gap-0 sm:gap-1 max-w-full">
            {FILTERS.map((f) => (
              <button
                key={f.code}
                onClick={() => setFilter(f.code)}
                className={`relative px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10.5px] sm:text-[13px] font-medium font-display transition-colors whitespace-nowrap shrink-0 ${
                  filter === f.code ? "text-white" : "text-[#2B3950] hover:text-[#102033]"
                }`}
              >
                {filter === f.code && (
                  <m.span
                    layoutId="story-filter-pill"
                    className="absolute inset-0 rounded-full bg-[#102033]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10 inline-flex items-center gap-1 sm:gap-1">
                  {f.flag && <span aria-hidden className="text-[11px] sm:text-base">{f.flag}</span>}
                  {f.label}
                </span>
              </button>
            ))}
          </div>
        </m.div>

        {/* Stories grid */}
        <m.div
          className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <AnimatePresence mode="popLayout">
            {visible.map((s, i) => (
              <m.article
                key={`${s.label}-${i}`}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="glass rounded-[24px] p-7 relative overflow-hidden"
              >
                <span aria-hidden className="blob" style={{ top: -50, right: -50, width: 200, height: 200, background: s.tint, opacity: 0.18 }} />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11.5px] font-medium font-display"
                      style={{ background: `${s.tint}15`, color: s.tint }}
                    >
                      <span>{s.flag}</span>
                      {s.country}
                    </span>
                    <span className="text-[#FACC15] text-lg leading-none">★★★★★</span>
                  </div>

                  <p className="text-[#102033] text-[15.5px] mt-5 leading-[1.65]">
                    "{s.quote}"
                  </p>

                  <div className="mt-6 pt-5 border-t border-[rgba(16,32,51,0.08)] flex items-center gap-3">
                    <span
                      className="inline-flex w-10 h-10 rounded-full items-center justify-center text-white font-display font-600 text-[12px] shrink-0"
                      style={{ background: s.tint }}
                    >
                      {s.initials}
                    </span>
                    <p className="text-[12.5px] text-[#5A6A82] font-display font-500">
                      {s.label}
                    </p>
                  </div>
                </div>
              </m.article>
            ))}
          </AnimatePresence>
        </m.div>
      </div>
    </section>
  );
}
