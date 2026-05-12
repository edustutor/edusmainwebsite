"use client";
import { m } from "@/components/Motion";
import { fadeUp, staggerContainer, sectionRevealStrong, inView } from "@/lib/motion";
import { SectionHead, PlainCard } from "./TeachShared";

const CATEGORIES = [
  { icon: "🏫", title: "School Teachers",      body: "Experienced teachers from public, private, or international schools.", tint: "#2563EB" },
  { icon: "🎓", title: "University Graduates", body: "Graduates with strong subject knowledge and a teaching interest.",    tint: "#8B5CF6" },
  { icon: "📘", title: "Undergraduate Tutors", body: "High-performing university students with proven subject expertise.",  tint: "#06B6D4" },
  { icon: "🧑‍🏫", title: "Professional Tutors", body: "Tutors already conducting physical or online classes.",                tint: "#FACC15" },
  { icon: "🌍", title: "International Tutors", body: "Capable of teaching global syllabuses and international students.",   tint: "#22C55E" },
  { icon: "🧪", title: "Subject Specialists",  body: "Maths, Science, English, ICT, Languages, Commerce and more.",         tint: "#2563EB" },
];

export function TeachCategories() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden scroll-mt-24">
      <div className="container-edge">
        <m.div variants={sectionRevealStrong} initial="hidden" whileInView="show" viewport={inView}>
          <SectionHead
            eyebrow="Tutor Categories"
            title="Who can"
            emphasis="apply?"
            body="EDUS welcomes qualified and committed tutors from a range of academic and professional backgrounds."
          />
        </m.div>
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {CATEGORIES.map((c) => (
            <m.div key={c.title} variants={fadeUp}>
              <PlainCard icon={c.icon} title={c.title} body={c.body} tint={c.tint} />
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  );
}
