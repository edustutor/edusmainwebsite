import { Success } from "@/components/Success";
import { CTA } from "@/components/CTA";

export default function Page() {
  return (
    <>
      <section className="relative pt-32 sm:pt-36 pb-12 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="blob" style={{ top: "-8%", left: "-8%", width: 460, height: 460, background: "#FACC15", opacity: 0.30 }} />
          <div className="blob" style={{ top: "20%", right: "-10%", width: 420, height: 420, background: "#06B6D4", opacity: 0.25 }} />
        </div>
        <div className="container-edge text-center max-w-4xl mx-auto">
          <p className="eyebrow"><span className="dot" />Success Stories</p>
          <h1 className="heading mt-5" style={{ fontSize: "var(--fs-hero)" }}>
            Real outcomes. <em>Real families.</em>
          </h1>
          <p className="text-[#2B3950] text-[17px] mt-6 leading-[1.65] max-w-2xl mx-auto">
            Filter by market to see the stories that matter for you - Sri Lanka, India, or global
            one-to-one.
          </p>
        </div>
      </section>
      <Success />
      <CTA />
    </>
  );
}
