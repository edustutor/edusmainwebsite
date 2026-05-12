"use client";
import { m } from "@/components/Motion";
import { AmbientGlow } from "@/components/AmbientGlow";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { SectionHead, PlainCard } from "./TeachShared";

const VISION = [
  { icon: "🌍", title: "Global Teaching", body: "Teach students from Sri Lanka, India, Maldives, diaspora communities, and other countries.", tint: "#2563EB" },
  { icon: "📚", title: "Multi-Syllabus", body: "National, Cambridge, Edexcel, CBSE, ICSE, and other international curricula.",                  tint: "#8B5CF6" },
  { icon: "💻", title: "Smart Systems", body: "Tutor dashboards, progress tracking, class monitoring, and performance reporting.",            tint: "#06B6D4" },
  { icon: "✅", title: "Quality Assured", body: "Every class is supported through academic monitoring, QA reviews, and student feedback.",     tint: "#22C55E" },
  { icon: "📈", title: "Tutor Growth", body: "Tutors are trained, certified, reviewed, and developed continuously.",                          tint: "#FACC15" },
  { icon: "🎯", title: "Student Success", body: "Focused on understanding, confidence, and exam results - not just completing classes.",      tint: "#2563EB" },
];

export function TeachVision() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div aria-hidden className="absolute inset-0 -z-10">
        <AmbientGlow top="20%" right="-4%" size={220} color="#8B5CF6" opacity={[0.08, 0.16]} duration={22} blur={80} />
      </div>
      <div className="container-edge">
        <m.div variants={sectionRevealStrong} initial="hidden" whileInView="show" viewport={inView}>
          <SectionHead
            eyebrow="EDUS Vision"
            title="Building a global online learning institution from"
            emphasis="Sri Lanka."
            body="EDUS is not just an online tuition platform. We are developing a structured, scalable, and technology-driven education ecosystem where students access high-quality learning from anywhere, and tutors teach with confidence, clarity, and professional support."
          />
        </m.div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {VISION.map((v) => (
            <m.div key={v.title} variants={fadeUp}>
              <PlainCard icon={v.icon} title={v.title} body={v.body} tint={v.tint} />
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
