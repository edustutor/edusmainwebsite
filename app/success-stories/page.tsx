import { Success } from "@/components/Success";
import { CTA } from "@/components/CTA";
import { Ticker } from "@/components/Ticker";

export default function Page() {
  return (
    <>
      <section className="relative pt-20">
        <div className="border-b border-[rgba(14,20,33,0.10)] bg-[#F4F2ED]/40">
          <div className="container-wide flex items-center justify-between py-2.5 text-[10.5px] font-mono tracking-[0.2em] uppercase text-[#6B7390]">
            <span>edustutor.com / success-stories</span>
            <span className="text-[#1640D8]">Outcomes</span>
          </div>
        </div>

        <div className="container-wide pt-12 md:pt-20 pb-12">
          <div className="grid grid-cols-12 gap-6 items-start">
            <div className="col-span-12 lg:col-span-7" data-anim>
              <p className="font-mono text-[11px] tracking-[0.26em] uppercase text-[#1640D8]">
                <span className="font-display italic text-[#0E1421] mr-2">§</span>
                Outcomes Report · 2026
              </p>
              <h1 className="masthead mt-7" style={{ fontSize: "var(--fs-mast)" }}>
                Stories filtered<br />
                <em className="text-[#1640D8]">by market.</em>
              </h1>
            </div>
            <div className="col-span-12 lg:col-span-5 lg:pt-12" data-anim="2">
              <div className="border-l border-[#0E1421] pl-6">
                <p className="font-display italic text-[20px] leading-[1.5] text-[#0E1421]">
                  A parent from India should see Indian outcomes; a global student should see
                  global one-to-one stories; a Sri Lankan visitor should see results from local
                  group classes.
                </p>
                <p className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-[#6B7390] mt-5">
                  — That's exactly how this page works.
                </p>
              </div>
            </div>
          </div>

          <div className="rule-strong mt-16" />
        </div>

        <Ticker tone="paper" />
      </section>
      <Success />
      <CTA />
    </>
  );
}
