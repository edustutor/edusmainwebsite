"use client";
import Link from "next/link";
import { m } from "@/components/Motion";
import {
  fadeUp,
  staggerContainer,
  buttonGlow,
  floatingBlob,
} from "@/lib/motion";

const HERO_BLOBS = [
  { top: "-8%", left: "-8%", w: 460, h: 460, color: "#2563EB", opacity: 0.35, delay: 0 },
  { top: "10%", right: "-10%", w: 480, h: 480, color: "#8B5CF6", opacity: 0.30, delay: 2 },
  { top: "55%", left: "30%", w: 420, h: 420, color: "#06B6D4", opacity: 0.25, delay: 4 },
  { top: "20%", right: "30%", w: 280, h: 280, color: "#FACC15", opacity: 0.30, delay: 1 },
  { bottom: "-10%", left: "20%", w: 380, h: 380, color: "#22C55E", opacity: 0.20, delay: 3 },
];

const SUPPORTING = [
  "Live online classes for school students",
  "Group and one to one learning options",
  "Structured academic monitoring",
  "Class recordings and learning resources",
  "Parent updates and progress tracking",
  "Easy enrolment and online support",
];

export function Hero() {
  return (
    <section className="relative pt-32 sm:pt-36 pb-20 overflow-hidden">
      {/* Floating blurred blobs */}
      <div aria-hidden className="absolute inset-0 -z-10">
        {HERO_BLOBS.map((b, i) => (
          <m.div
            key={i}
            className="blob"
            style={{
              ...b,
              width: b.w,
              height: b.h,
              background: b.color,
              opacity: b.opacity,
              left: b.left as string | undefined,
              right: b.right as string | undefined,
              top: b.top as string | undefined,
              bottom: b.bottom as string | undefined,
            }}
            variants={floatingBlob(b.delay)}
            initial="initial"
            animate="animate"
          />
        ))}
      </div>

      <m.div
        className="container-edge"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {/* Status badge */}
        <m.div className="flex justify-center" variants={fadeUp}>
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass text-[12.5px] font-medium text-[#2B3950]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#22C55E]/60 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
            </span>
            Live online tuition · Sri Lanka, India & Global
          </div>
        </m.div>

        {/* H1 */}
        <m.div className="mt-8 text-center max-w-5xl mx-auto" variants={fadeUp}>
          <h1 className="heading" style={{ fontSize: "var(--fs-hero)" }}>
            Learn the <em>right syllabus</em>,<br />
            in the <em>right format</em>,<br />
            with the <em>right support</em>.
          </h1>
        </m.div>

        {/* Subheading */}
        <m.div className="mt-7 max-w-2xl mx-auto text-center" variants={fadeUp}>
          <p className="text-[#2B3950] text-[17px] leading-[1.65]">
            EDUS helps students learn online through live classes, expert tutors, structured lessons,
            progress tracking, recordings, exams, and parent updates.
          </p>
        </m.div>

        {/* CTAs */}
        <m.div
          className="mt-9 flex flex-wrap justify-center gap-3"
          variants={buttonGlow}
          initial="hidden"
          animate="show"
        >
          <Link href="#regions" className="btn btn-primary">
            Explore Classes
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link href="/contact" className="btn btn-yellow">Book a Free Consultation</Link>
        </m.div>

        {/* Supporting points list */}
        <m.ul
          className="mt-10 max-w-3xl mx-auto grid sm:grid-cols-2 gap-x-6 gap-y-2.5"
          variants={staggerContainer}
        >
          {SUPPORTING.map((s) => (
            <m.li
              key={s}
              variants={fadeUp}
              className="flex items-center gap-2.5 text-[#2B3950] text-[14px]"
            >
              <span className="inline-flex w-5 h-5 rounded-full bg-[#22C55E]/15 items-center justify-center">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3.5" aria-hidden>
                  <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {s}
            </m.li>
          ))}
        </m.ul>

        {/* Trust line */}
        <m.p
          variants={fadeUp}
          className="mt-10 text-center text-[13px] text-[#5A6A82] max-w-2xl mx-auto"
        >
          Trusted online learning support for students, parents, and tutors across Sri Lanka, India,
          and global learning pathways.
        </m.p>

        {/* Dashboard preview */}
        <m.div
          className="mt-14 max-w-5xl mx-auto"
          variants={fadeUp}
          animate={{
            y: [0, -8, 0],
            transition: {
              duration: 6,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
              delay: 0.6,
            },
          }}
        >
          <div className="relative glass-strong rounded-[28px] p-6 md:p-8">
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon: "🎓", k: "Live Online Classes", v: "Interactive lessons led by qualified tutors. Recordings included.", tint: "#2563EB" },
                { icon: "📊", k: "Parent Updates", v: "Attendance, exam reviews, and progress tracking shared with parents.", tint: "#8B5CF6" },
                { icon: "📚", k: "Resource Vault", v: "Past papers, study materials, and AI study support for revision.", tint: "#06B6D4" },
              ].map((c, i) => (
                <m.div
                  key={i}
                  className="rounded-2xl bg-white/80 border border-white/80 p-5"
                  whileHover={{ y: -3, transition: { duration: 0.25 } }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: `${c.tint}1A`, color: c.tint }}
                  >
                    {c.icon}
                  </div>
                  <p className="mt-4 font-[family-name:var(--font-display)] font-600 text-[17px] text-[#102033]">{c.k}</p>
                  <p className="text-[13.5px] text-[#5A6A82] mt-1.5 leading-relaxed">{c.v}</p>
                </m.div>
              ))}
            </div>
          </div>
        </m.div>
      </m.div>
    </section>
  );
}
