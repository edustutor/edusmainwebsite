import { LearningExperience } from "@/components/LearningExperience";
import { JoinFlow } from "@/components/JoinFlow";
import { CTA } from "@/components/CTA";
import { Ticker } from "@/components/Ticker";

export default function Page() {
  return (
    <>
      <section className="relative pt-20">
        <div className="border-b border-[rgba(14,20,33,0.10)] bg-[#F4F2ED]/40">
          <div className="container-wide flex items-center justify-between py-2.5 text-[10.5px] font-mono tracking-[0.2em] uppercase text-[#6B7390]">
            <span>edustutor.com / how-it-works</span>
            <span className="text-[#1640D8]">The Method</span>
          </div>
        </div>

        <div className="container-wide pt-12 md:pt-20 pb-12">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-2" data-anim>
              <p className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-[#6B7390]">
                <span className="font-display italic text-[#0E1421] mr-2">§</span>
                Method
              </p>
              <div className="rule-strong mt-5" />
              <p className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-[#6B7390] mt-5">
                Six steps · One process
              </p>
            </div>

            <div className="col-span-12 lg:col-span-10" data-anim="2">
              <h1 className="masthead" style={{ fontSize: "var(--fs-mast)" }}>
                From sign-up<br />
                to <em className="text-[#1640D8]">steady progress.</em>
              </h1>
              <p className="mt-10 text-[#2C334A] text-[17px] leading-[1.65] max-w-2xl">
                EDUS unifies a fragmented journey into one process. Choose your market, get matched,
                and start learning live online — with parents and tutors aligned every step.
              </p>
            </div>
          </div>

          <div className="rule-strong mt-16" />
        </div>

        <Ticker tone="paper" />
      </section>
      <LearningExperience />
      <JoinFlow />
      <CTA />
    </>
  );
}
