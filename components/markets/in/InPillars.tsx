import { PILLARS } from "./InShared";
import { FeatureIcon } from "@/components/effects/Icons";

export function InPillars() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      <div className="container-edge">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow"><span className="dot" />The EDUS Difference</p>
          <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>
            Rare in Tamil Nadu. <em>Standard at EDUS.</em>
          </h2>
          <p className="text-[#2B3950] text-[16px] mt-4 leading-relaxed">
            Most CBSE tuition across Tamil Nadu is unstructured; EDUS runs with academic SOPs,
            monitored tutors, focused individual attention for every student, and
            <br />
            monthly parent updates.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-4">
          {PILLARS.map((p) => (
            <article key={p.title} className="glass rounded-[24px] p-7 lift relative overflow-hidden">
              <span aria-hidden className="blob" style={{ top: -50, right: -50, width: 200, height: 200, background: p.tint, opacity: 0.18 }} />
              <div className="relative">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: `${p.tint}15`, border: `1px solid ${p.tint}25` }}
                >
                  <FeatureIcon name={p.icon} tint={p.tint} size={24} />
                </div>
                <h3 className="heading mt-6" style={{ fontSize: "20px" }}>{p.title}</h3>
                <p className="text-[#2B3950] text-[14.5px] mt-3 leading-[1.65]">{p.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
