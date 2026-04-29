import { LearningExperience } from "@/components/LearningExperience";
import { JoinFlow } from "@/components/JoinFlow";
import { CTA } from "@/components/CTA";

export default function Page() {
  return (
    <>
      <section className="relative pt-32 sm:pt-36 pb-12 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="blob" style={{ top: "-8%", right: "-8%", width: 460, height: 460, background: "#2563EB", opacity: 0.30 }} />
          <div className="blob" style={{ top: "20%", left: "-10%", width: 420, height: 420, background: "#FACC15", opacity: 0.25 }} />
        </div>
        <div className="container-edge text-center max-w-4xl mx-auto">
          <p className="eyebrow"><span className="dot" />The EDUS Method</p>
          <h1 className="heading mt-5" style={{ fontSize: "var(--fs-hero)" }}>
            From sign-up to <em>steady progress.</em>
          </h1>
          <p className="text-[#2B3950] text-[17px] mt-6 leading-[1.65] max-w-2xl mx-auto">
            EDUS unifies a fragmented journey into one process. Choose your market, get matched,
            and start learning live online — with parents and tutors aligned every step.
          </p>
        </div>
      </section>
      <LearningExperience />
      <JoinFlow />
      <CTA />
    </>
  );
}
