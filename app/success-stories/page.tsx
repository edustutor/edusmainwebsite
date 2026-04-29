import { Success } from "@/components/Success";
import { CTA } from "@/components/CTA";

export default function Page() {
  return (
    <>
      <section className="relative pt-36 pb-12 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-grid" />
          <div className="glow" style={{ top: 0, left: "-10%", width: 480, height: 480, background: "#FFE08A", opacity: 0.5 }} />
        </div>
        <div className="container-edge">
          <p className="eyebrow"><span className="dot" />Success stories</p>
          <h1 className="display text-[clamp(48px,8vw,120px)] mt-3 max-w-4xl">
            Stories filtered <em>by market.</em>
          </h1>
          <p className="text-[#2B3458] max-w-xl mt-5 text-[17px]">
            A parent from India should see Indian outcomes; a global student should see global one-to-one
            stories; a Sri Lankan visitor should see results from local group classes. So that's exactly
            how this page works.
          </p>
        </div>
      </section>
      <Success />
      <CTA />
    </>
  );
}
