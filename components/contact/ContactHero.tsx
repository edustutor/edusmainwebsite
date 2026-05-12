import { SIGNUP_URL } from "./ContactShared";
import { APPLY_URL } from "@/components/teach/TeachShared";

export function ContactHero() {
  return (
    <section className="relative pt-32 sm:pt-36 pb-12 overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="blob" style={{ top: "-8%", left: "-8%", width: 420, height: 420, background: "#2563EB", opacity: 0.22 }} />
        <div className="blob" style={{ top: "20%", right: "-10%", width: 380, height: 380, background: "#8B5CF6", opacity: 0.20 }} />
        <div className="blob" style={{ bottom: "-10%", left: "30%", width: 360, height: 360, background: "#06B6D4", opacity: 0.18 }} />
      </div>
      <div className="container-edge text-center max-w-4xl mx-auto">
        <p className="eyebrow"><span className="dot" />Contact</p>
        <h1 className="heading mt-5" style={{ fontSize: "var(--fs-hero)" }}>
          Contact EDUS. Start the right{" "}
          <em>learning journey.</em>
        </h1>
        <p className="text-[#2B3950] text-[17px] mt-6 leading-[1.65] max-w-2xl mx-auto">
          Whether you are a parent, student, tutor, or partner, our team is ready to guide you
          with the right class, the right tutor, and the right support for your learning needs.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Register as a Student
          </a>
          <a href={APPLY_URL} target="_blank" rel="noopener noreferrer" className="btn btn-yellow">
            Register as a Tutor
          </a>
        </div>

        <p className="mt-6 text-[12px] uppercase tracking-[0.12em] text-[#5A6A82] font-display font-600">
          Online Learning Support
        </p>
      </div>
    </section>
  );
}
