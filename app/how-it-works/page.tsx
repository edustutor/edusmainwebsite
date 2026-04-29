import { LearningExperience } from "@/components/LearningExperience";
import { JoinFlow } from "@/components/JoinFlow";
import { CTA } from "@/components/CTA";

export default function Page() {
  return (
    <>
      <section className="relative pt-36 pb-12 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid" />
          <div className="glow" style={{ top: 0, right: "-10%", width: 480, height: 480, background: "#9CC0FF" }} />
        </div>
        <div className="container-edge">
          <p className="eyebrow"><span className="dot" />How it works</p>
          <h1 className="display text-[clamp(48px,8vw,120px)] mt-3 max-w-4xl">
            From sign-up to <em>steady progress</em>.
          </h1>
          <p className="text-[#2B3458] max-w-xl mt-5 text-[17px]">
            EDUS unifies a fragmented journey into one process. Choose your market, get matched, and start
            learning live online — with parents and tutors aligned every step.
          </p>
        </div>
      </section>
      <LearningExperience />
      <JoinFlow />
      <CTA />
    </>
  );
}
