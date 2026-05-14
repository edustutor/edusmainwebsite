"use client";
import Image from "next/image";
import { m } from "@/components/effects/Motion";
import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { sectionRevealStrong, inView } from "@/lib/motion";
import { FeatureIcon } from "@/components/effects/Icons";

/**
 * "How Learning Works"
 *
 * A circular orbital diagram on desktop:
 *
 *                  ┌─ feature 02 ─┐
 *      ┌─ feature ─┘              └─ feature 03 ─┐
 *      │ 01                                       │
 *      │                ╭──────╮                  │
 *      │               ( PHOTO  )                 │
 *      │                ╰──────╯                  │
 *      │ 06                                       │
 *      └─ feature ─┐              ┌─ feature 04 ─┘
 *                  └─ feature 05 ─┘
 *
 * - Photo is rendered as a perfect circle at the centre.
 * - A faint dashed ring traces the orbit.
 * - Six numbered pills sit on the ring at 60° intervals.
 *
 * Stacks to a clean grid on tablet/mobile.
 */

const FEATURES = [
  { n: "01", icon: "choose",        title: "Choose Region",         body: "Sri Lanka, India, Maldives, or Global support.",        tint: "#2563EB" },
  { n: "02", icon: "graduation",    title: "Pick Grade & Subject",  body: "Right grade, syllabus, subject, and class type.",       tint: "#8B5CF6" },
  { n: "03", icon: "live-class",    title: "Live Classes",          body: "Interactive lessons with trained online tutors.",       tint: "#06B6D4" },
  { n: "04", icon: "assignment",    title: "Practice & Revise",     body: "Assignments, recordings, and revision support.",        tint: "#22C55E" },
  { n: "05", icon: "progress",      title: "Track Progress",        body: "Attendance, exams, improvement, tutor feedback.",       tint: "#FACC15" },
  { n: "06", icon: "message",       title: "Parent Updates",        body: "Clear monthly updates so parents stay aligned.",        tint: "#2563EB" },
];

/**
 * The numbered badge circles overlay each feature card. Lighthouse
 * flagged the original `white text on tint` combination as failing
 * WCAG AA (4.5:1) for the lighter tints (yellow, green, cyan, mid-
 * purple). This helper returns a darkened variant + text colour pair
 * that lifts the contrast ratio above 4.5:1 for every tint we use.
 *
 * Yellow keeps its bright background paired with dark navy text so the
 * brand "warm pop" stays. The rest get a darker shade of their
 * brand colour with white text - the visual difference is minimal.
 */
function badgeColors(tint: string): { background: string; color: string } {
  switch (tint) {
    case "#FACC15": // brand yellow - dark text wins
      return { background: "#FACC15", color: "#102033" };
    case "#22C55E": // brand green - darken to green-700
      return { background: "#15803D", color: "#FFFFFF" };
    case "#06B6D4": // brand cyan - darken to cyan-700
      return { background: "#0E7490", color: "#FFFFFF" };
    case "#8B5CF6": // brand purple - darken to violet-600
      return { background: "#7C3AED", color: "#FFFFFF" };
    case "#2563EB": // brand blue - already AA-compliant with white
    default:
      return { background: tint, color: "#FFFFFF" };
  }
}

/**
 * Six positions around a 720px-diameter ring, starting at top (-90°)
 * and stepping 60° clockwise. Coordinates are percentages of the
 * outer wrapper, with the centre at (50%, 50%) and radius 50% in x,
 * 38% in y (slight vertical compression to match section's 16:10 ratio).
 *
 *   angle (deg) → position
 *     -90  → top
 *     -30  → upper-right
 *      30  → lower-right
 *      90  → bottom
 *     150  → lower-left
 *     210  → upper-left
 */
function polar(angleDeg: number, rx: number, ry: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    left: `${50 + Math.cos(rad) * rx}%`,
    top: `${50 + Math.sin(rad) * ry}%`,
  };
}

const ORBIT_RX = 38; // horizontal radius (% of wrapper width)
const ORBIT_RY = 42; // vertical radius (% of wrapper height)

const ORBIT_POSITIONS = [
  polar(-105, ORBIT_RX, ORBIT_RY), // 01 - top-left
  polar(-45,  ORBIT_RX, ORBIT_RY), // 02 - top-right
  polar(  0,  ORBIT_RX, ORBIT_RY), // 03 - right
  polar( 60,  ORBIT_RX, ORBIT_RY), // 04 - bottom-right
  polar(120,  ORBIT_RX, ORBIT_RY), // 05 - bottom-left
  polar(180,  ORBIT_RX, ORBIT_RY), // 06 - left
];

export function LearningExperience() {
  return (
    <section
      id="how"
      className="relative py-12 md:py-16 scroll-mt-24 overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <AmbientGlow top="18%" right="-4%" size={240} color="#8B5CF6" opacity={[0.08, 0.16]} duration={22} blur={80} />
        <AmbientGlow bottom="10%" left="-4%" size={220} color="#2563EB" opacity={[0.08, 0.14]} duration={26} delay={4} blur={80} />
      </div>

      <div className="container-edge">
        {/* Heading */}
        <m.div
          className="text-center max-w-2xl mx-auto"
          variants={sectionRevealStrong}
          initial="hidden"
          whileInView="show"
          viewport={inView}
        >
          <p className="eyebrow"><span className="dot" />How Learning Works</p>
          <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
            A simple online learning process for <em>every student.</em>
          </h2>
          <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
            EDUS keeps the learning journey clear. Six steps from choosing the right class to staying
            on track - with parents and tutors aligned every step of the way.
          </p>
        </m.div>

        {/* ---------- Desktop: orbital diagram ---------- */}
        <div className="hidden lg:block mt-10">
          <div className="relative mx-auto w-full max-w-[1100px] aspect-16/11">
            {/* Faint dashed orbit ring */}
            <svg
              aria-hidden
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <ellipse
                cx="50"
                cy="50"
                rx={ORBIT_RX}
                ry={ORBIT_RY}
                fill="none"
                stroke="#2563EB"
                strokeWidth="0.4"
                strokeDasharray="0.8 1.4"
                opacity="0.35"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Centre photo (circular) */}
            <CenterCircle />

            {/* Six orbit pills */}
            {FEATURES.map((f, i) => (
              <OrbitPill key={f.n} feature={f} pos={ORBIT_POSITIONS[i]} />
            ))}
          </div>
        </div>

        {/* ---------- Tablet/mobile: photo + grid ---------- */}
        <div className="lg:hidden mt-8 max-w-3xl mx-auto">
          <div className="max-w-md mx-auto">
            <CenterCircle />
          </div>
          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {FEATURES.map((f) => (
              <FeatureCard key={f.n} feature={f} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/* Centre circle - photo masked into a perfect circle              */
/* --------------------------------------------------------------- */

function CenterCircle() {
  return (
    <div
      className="relative mx-auto lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-[42%] aspect-square"
    >
      {/* Glow halo */}
      <div
        aria-hidden
        className="absolute inset-[-10%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.22) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      {/* Centerpiece - student / parent / tutor photo */}
      <div className="relative w-full h-full rounded-full overflow-hidden border-[6px] border-white shadow-[0_40px_90px_-30px_rgba(16,32,51,0.30)]">
        <Image
          src="/edus-how-learning-works.webp"
          alt="EDUS online learning - student, parent, and tutor connected on a live class"
          fill
          sizes="(min-width: 1024px) 42vw, (min-width: 640px) 60vw, 80vw"
          quality={85}
          priority={false}
          className="object-cover object-center"
        />
        {/* subtle inner highlight to lift edges */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -40px 80px -40px rgba(16,32,51,0.18)",
          }}
        />
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- */
/* Orbit pill - sits on the ring on desktop                         */
/* --------------------------------------------------------------- */

function OrbitPill({
  feature, pos,
}: {
  feature: (typeof FEATURES)[number];
  pos: { left: string; top: string };
}) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 w-[260px]"
      style={{ left: pos.left, top: pos.top }}
    >
      <article className="relative bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl px-4 py-3.5 shadow-[0_18px_40px_-20px_rgba(16,32,51,0.20)] flex items-start gap-3">
        {/* Number badge - WCAG-AA contrast pair (see badgeColors helper) */}
        <span
          className="absolute -top-2.5 -right-2.5 w-8 h-8 rounded-full text-[11.5px] font-display font-700 inline-flex items-center justify-center shadow-[0_6px_14px_rgba(16,32,51,0.22)]"
          style={badgeColors(feature.tint)}
        >
          {feature.n}
        </span>

        <span
          className="inline-flex w-10 h-10 rounded-xl items-center justify-center text-lg shrink-0"
          style={{ background: `${feature.tint}15`, border: `1px solid ${feature.tint}25` }}
        >
          <FeatureIcon name={feature.icon} tint={feature.tint} size={20} />
        </span>
        <div className="min-w-0">
          <p className="font-display font-700 text-[14px] text-[#102033] leading-tight">
            {feature.title}
          </p>
          <p className="text-[12px] text-[#5A6A82] mt-1 leading-normal">{feature.body}</p>
        </div>
      </article>

      {/* Small dot on the ring at the pill's anchor - visual touchpoint */}
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full opacity-0"
        style={{ background: feature.tint }}
      />
    </div>
  );
}

/* --------------------------------------------------------------- */
/* Feature card - used on tablet/mobile                            */
/* --------------------------------------------------------------- */

function FeatureCard({ feature }: { feature: (typeof FEATURES)[number] }) {
  return (
    <article className="relative bg-white border border-[rgba(16,32,51,0.08)] rounded-2xl p-5 shadow-[0_18px_40px_-20px_rgba(16,32,51,0.18)]">
      <span
        className="absolute -top-2.5 -right-2.5 w-8 h-8 rounded-full text-[11.5px] font-display font-700 inline-flex items-center justify-center shadow-[0_6px_14px_rgba(16,32,51,0.22)]"
        style={badgeColors(feature.tint)}
      >
        {feature.n}
      </span>

      <div className="flex items-start gap-3">
        <span
          className="inline-flex w-11 h-11 rounded-2xl items-center justify-center text-xl shrink-0"
          style={{ background: `${feature.tint}15`, border: `1px solid ${feature.tint}25` }}
        >
          <FeatureIcon name={feature.icon} tint={feature.tint} size={20} />
        </span>
        <div className="min-w-0">
          <h3 className="font-display font-700 text-[15px] text-[#102033] leading-tight">
            {feature.title}
          </h3>
          <p className="text-[12.5px] text-[#5A6A82] mt-1.5 leading-[1.55]">{feature.body}</p>
        </div>
      </div>
    </article>
  );
}
