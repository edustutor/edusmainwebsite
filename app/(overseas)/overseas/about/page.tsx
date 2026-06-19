import Link from "next/link";
import type { Metadata } from "next";
import { JsonLdScript } from "@/components/layout/StructuredData";
import { OvIcon } from "@/components/overseas/OvIcon";
import { OV, whatsappUrl } from "@/lib/overseas/data";
import {
  overseasOrganization,
  overseasWebPage,
  overseasBreadcrumb,
} from "@/lib/overseas/schema";

/**
 * EDUS Overseas Consultancy - About Us page. Copy sourced verbatim (with
 * light formatting) from the requirements doc: overview, mission, vision,
 * core values, why choose, and team.
 */

const CORE_VALUES = [
  { title: "Student First Approach", body: "We prioritize students' goals, dreams, and future success in every decision we make.", icon: "heart" },
  { title: "Integrity & Transparency", body: "We provide honest guidance with no hidden agendas or false promises.", icon: "shield" },
  { title: "Excellence", body: "We aim for the highest standards in service quality and student outcomes.", icon: "trophy" },
  { title: "Commitment", body: "We stay with students throughout their entire study abroad journey.", icon: "check" },
  { title: "Global Mindset", body: "We promote international opportunities that shape global citizens.", icon: "globe" },
];

const WHY = [
  "Personalized counselling based on your academic background and goals",
  "Strong knowledge of global universities and admission processes",
  "High visa success support system",
  "Scholarship and financial guidance",
  "End-to-end assistance from application to arrival",
  "Fast and responsive student support",
  "Ethical and professional guidance at every step",
];

export const metadata: Metadata = {
  metadataBase: new URL(OV.siteBase),
  title: { absolute: "About EDUS Overseas Consultancy | Study Abroad" },
  description:
    "EDUS Overseas Consultancy is a trusted Sri Lankan overseas education provider offering end-to-end support: university selection, applications, visas, scholarships, and pre-departure guidance. Learn our mission, vision, and values.",
  alternates: { canonical: "/overseas/about" },
  keywords: [
    "about EDUS Overseas",
    "EDUS Overseas Consultancy",
    "trusted study abroad consultants Sri Lanka",
    "overseas education provider Sri Lanka",
    "study abroad mission vision",
  ],
  openGraph: {
    title: "About EDUS Overseas Consultancy",
    description:
      "A trusted Sri Lankan overseas education consultancy. End-to-end support for studying abroad. From Dreams to Destinations.",
    type: "website",
    url: `${OV.siteBase}/overseas/about`,
    siteName: OV.brand,
    images: [{ url: "/edus-og.jpg", width: 1200, height: 630, alt: "About EDUS Overseas Consultancy" }],
  },
};

export default function OverseasAbout() {
  return (
    <>
      <JsonLdScript data={overseasOrganization()} />
      <JsonLdScript data={overseasWebPage({
        name: "About EDUS Overseas Consultancy",
        description:
          "A trusted Sri Lankan overseas education consultancy offering end-to-end support for studying abroad.",
        path: "/overseas/about",
      })} />
      <JsonLdScript data={overseasBreadcrumb([
        { name: "Home", path: "/overseas" },
        { name: "About Us", path: "/overseas/about" },
      ])} />

      {/* Hero */}
      <section className="relative overflow-hidden pt-10 sm:pt-14 pb-2">
        <div aria-hidden className="absolute inset-0 -z-10">
          <span className="ov-blob" style={{ top: "-8%", left: "-6%", width: 340, height: 340, background: "#FF5A5F", opacity: 0.2 }} />
          <span className="ov-blob" style={{ top: "10%", right: "-8%", width: 340, height: 340, background: "#14B8A6", opacity: 0.16 }} />
        </div>
        <div className="container-edge max-w-3xl mx-auto text-center">
          <p className="ov-eyebrow justify-center"><span className="ov-dot" />About Us</p>
          <h1 className="ov-heading mt-5" style={{ fontSize: "var(--fs-display)", lineHeight: 1.1 }}>
            We don't just send students abroad, <em>we build futures.</em>
          </h1>
          <p className="mt-5 text-[16px] text-[var(--ov-ink-soft)] leading-relaxed">
            EDUS Overseas Consultancy is a trusted overseas education guidance
            provider dedicated to helping students achieve their dreams of
            studying abroad. We offer complete end-to-end support for
            international education: university selection, application
            processing, visa guidance, scholarship assistance, and
            pre-departure support.
          </p>
          <p className="mt-4 text-[15px] text-[var(--ov-ink-soft)] leading-relaxed">
            With a strong commitment to excellence, EDUS connects students with
            world-class universities across the United Kingdom, Australia,
            Canada, New Zealand, the United States, Ireland, and Europe. Our
            goal is to make global education simple, accessible, and successful
            for every student.
          </p>
        </div>
      </section>

      {/* Mission + Vision */}
      <section className="container-edge ov-section">
        <div className="grid md:grid-cols-2 gap-5">
          <div className="ov-glass-strong rounded-[24px] p-7">
            <span className="inline-flex w-12 h-12 rounded-2xl items-center justify-center" style={{ background: "linear-gradient(135deg,#FF5A5F,#F59E0B)" }}>
              <OvIcon name="compass" size={24} tint="#fff" />
            </span>
            <h2 className="ov-heading text-[20px] mt-4">Our Mission</h2>
            <p className="mt-3 text-[14.5px] text-[var(--ov-ink-soft)] leading-[1.7]">
              To empower students with the right knowledge, guidance, and
              opportunities to pursue high-quality international education and
              build successful global careers.
            </p>
          </div>
          <div className="ov-glass-strong rounded-[24px] p-7">
            <span className="inline-flex w-12 h-12 rounded-2xl items-center justify-center" style={{ background: "linear-gradient(135deg,#14B8A6,#06B6D4)" }}>
              <OvIcon name="globe" size={24} tint="#fff" />
            </span>
            <h2 className="ov-heading text-[20px] mt-4">Our Vision</h2>
            <p className="mt-3 text-[14.5px] text-[var(--ov-ink-soft)] leading-[1.7]">
              To become one of the most trusted and leading overseas education
              consultancies, known for integrity, transparency, and outstanding
              student success rates.
            </p>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="container-edge ov-section">
        <div className="text-center max-w-2xl mx-auto">
          <p className="ov-eyebrow justify-center"><span className="ov-dot" />Core Values</p>
          <h2 className="ov-heading mt-4" style={{ fontSize: "var(--fs-display)" }}>What we <em>stand for.</em></h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CORE_VALUES.map((v, i) => (
            <div key={v.title} className="ov-glass ov-lift rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex w-10 h-10 rounded-xl items-center justify-center font-display font-800 text-white" style={{ background: "linear-gradient(135deg,#7C3AED,#FF5A5F)" }}>
                  {i + 1}
                </span>
                <OvIcon name={v.icon} size={22} tint="var(--ov-coral-deep)" />
              </div>
              <h3 className="ov-heading text-[16px] mt-4">{v.title}</h3>
              <p className="mt-2 text-[13.5px] text-[var(--ov-ink-soft)] leading-[1.7]">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why choose */}
      <section className="container-edge ov-section">
        <div className="ov-glass-strong rounded-[28px] p-8 sm:p-10">
          <h2 className="ov-heading text-center" style={{ fontSize: "var(--fs-display)" }}>
            Why choose <em>EDUS Overseas?</em>
          </h2>
          <p className="mt-3 text-center text-[15px] text-[var(--ov-ink-soft)] max-w-2xl mx-auto">
            Choosing EDUS Overseas Consultancy means choosing a reliable partner for your future.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 max-w-3xl mx-auto">
            {WHY.map((w) => (
              <div key={w} className="flex items-start gap-3">
                <span className="inline-flex w-6 h-6 rounded-full items-center justify-center shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg,#14B8A6,#0E9488)" }}>
                  <OvIcon name="check" size={14} tint="#fff" />
                </span>
                <span className="text-[14px] text-[var(--ov-ink-soft)] leading-[1.6]">{w}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="container-edge ov-section">
        <div className="text-center max-w-2xl mx-auto">
          <p className="ov-eyebrow justify-center"><span className="ov-dot" />Our Team</p>
          <h2 className="ov-heading mt-4" style={{ fontSize: "var(--fs-display)" }}>Experienced people, <em>on your side.</em></h2>
          <p className="mt-4 text-[15px] text-[var(--ov-ink-soft)] leading-relaxed">
            Our team consists of experienced education consultants, visa
            advisors, and student support specialists who are passionate about
            guiding students toward the right academic path. Each counsellor is
            trained to understand individual student needs and provide tailored
            solutions for successful admissions and visa outcomes.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/overseas#consultation" className="ov-btn ov-btn-primary text-[15px]">Book Free Consultation</Link>
            <a href={whatsappUrl("Hi EDUS Overseas, I would like to know more about your services.")} target="_blank" rel="noopener noreferrer" className="ov-btn ov-btn-teal text-[15px]">
              <OvIcon name="whatsapp" size={18} tint="#fff" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
