"use client";
import { useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import { m, AnimatePresence } from "@/components/Motion";
import { AmbientGlow } from "@/components/AmbientGlow";
import { useIsMobile } from "@/lib/useIsMobile";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";

type Story = {
  market: "SL" | "IN" | "MV" | "GL";
  flag: string;
  country: string;
  label: string;
  quote: string;
  initials: string;
  tint: string;
};

const STORIES: Story[] = [
  // Sri Lanka
  {
    market: "SL", flag: "🇱🇰", country: "Sri Lanka",
    label: "Grade 11 Student · Kandy",
    quote: "EDUS's platform is incredibly user-friendly. I can access my courses and materials anytime.",
    initials: "KE", tint: "#2563EB",
  },
  {
    market: "SL", flag: "🇱🇰", country: "Sri Lanka",
    label: "O/L Student · Colombo",
    quote: "The Cambridge classes are great. The best part is the online forums and the community.",
    initials: "PV", tint: "#2563EB",
  },
  {
    market: "SL", flag: "🇱🇰", country: "Sri Lanka",
    label: "Parent of Grade 8 Student · Kalmunai",
    quote: "EDUS is perfect for working parents. The online platform lets my daughter learn anytime.",
    initials: "TK", tint: "#2563EB",
  },
  {
    market: "SL", flag: "🇱🇰", country: "Sri Lanka",
    label: "A/L Student · Galle",
    quote: "EDUS provides affordable and high-quality online courses that cater to diverse needs.",
    initials: "AC", tint: "#2563EB",
  },

  // India
  {
    market: "IN", flag: "🇮🇳", country: "India",
    label: "Parent of CBSE Class 10 Student · Tamil Nadu",
    quote: "Weekly parent updates kept us aligned. The tutor knew exactly where my child needed support.",
    initials: "RM", tint: "#8B5CF6",
  },
  {
    market: "IN", flag: "🇮🇳", country: "India",
    label: "CBSE Class 8 Student · Tamil Nadu",
    quote: "Maths became easier when I started learning with clear explanations and regular practice.",
    initials: "S8", tint: "#8B5CF6",
  },
  {
    market: "IN", flag: "🇮🇳", country: "India",
    label: "Parent Feedback · Tamil Nadu",
    quote: "The class structure, reminders, and progress updates helped us understand how our child was improving.",
    initials: "PB", tint: "#8B5CF6",
  },

  // Maldives
  {
    market: "MV", flag: "🇲🇻", country: "Maldives",
    label: "Year 11 Student · Malé",
    quote: "Live online classes meant I didn't lose study time travelling between islands. The recordings helped a lot too.",
    initials: "AH", tint: "#22C55E",
  },
  {
    market: "MV", flag: "🇲🇻", country: "Maldives",
    label: "Parent Feedback · Addu City",
    quote: "Cambridge tutors who understand the Maldivian school calendar made all the difference for my son.",
    initials: "FN", tint: "#22C55E",
  },

  // Global
  {
    market: "GL", flag: "🌐", country: "Global",
    label: "One-to-One Student · Lagos",
    quote: "I had a tutor matched to my time zone quickly. The flexibility was the whole reason it worked.",
    initials: "AN", tint: "#06B6D4",
  },
  {
    market: "GL", flag: "🌐", country: "Global",
    label: "One-to-One Student · Madrid",
    quote: "One to one means the tutor adapts to me, not a class of 30 working at someone else's pace.",
    initials: "SR", tint: "#06B6D4",
  },
  {
    market: "GL", flag: "🌐", country: "Global",
    label: "Parent Feedback · Dubai",
    quote: "EDUS gave us a better way to manage online learning with proper class timing, support, and updates.",
    initials: "PF", tint: "#06B6D4",
  },
];

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

        {/* Country filter */}
        <m.div
          className="mt-8 flex justify-center px-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <div className="inline-flex glass rounded-full p-1 sm:p-1.5 gap-0.5 sm:gap-1">
            {FILTERS.map((f) => (
              <button
                key={f.code}
                onClick={() => setFilter(f.code)}
                className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[12px] sm:text-[13px] font-medium font-[family-name:var(--font-display)] transition-colors whitespace-nowrap shrink-0 ${
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
                <span className="relative z-10 inline-flex items-center gap-1">
                  {f.flag && <span aria-hidden>{f.flag}</span>}
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
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11.5px] font-medium font-[family-name:var(--font-display)]"
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
                      className="inline-flex w-10 h-10 rounded-full items-center justify-center text-white font-[family-name:var(--font-display)] font-600 text-[12px] shrink-0"
                      style={{ background: s.tint }}
                    >
                      {s.initials}
                    </span>
                    <p className="text-[12.5px] text-[#5A6A82] font-[family-name:var(--font-display)] font-500">
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
