import { ContactForm } from "@/components/ContactForm";

export const metadata = {
  title: "Contact EDUS · Talk to Our Team",
  description:
    "Get in touch with EDUS. Tell us what your child needs and our team will guide you to the right class, subject, tutor, or enrolment option.",
};

const QUICK = [
  {
    icon: "💬",
    title: "WhatsApp",
    body: "Fastest way to reach us. Available 24/7.",
    cta: "Chat on WhatsApp",
    href: "https://wa.me/94707072072",
    external: true,
    tint: "#22C55E",
  },
  {
    icon: "📞",
    title: "Phone",
    body: "Talk to a parent advisor.",
    cta: "+94 70 707 2072",
    href: "tel:+94707072072",
    external: false,
    tint: "#2563EB",
  },
  {
    icon: "✉️",
    title: "Email",
    body: "Send us a detailed enquiry.",
    cta: "hello@edustutor.com",
    href: "mailto:hello@edustutor.com",
    external: false,
    tint: "#8B5CF6",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 sm:pt-36 pb-12 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="blob" style={{ top: "-8%", left: "-8%", width: 420, height: 420, background: "#2563EB", opacity: 0.22 }} />
          <div className="blob" style={{ top: "20%", right: "-10%", width: 380, height: 380, background: "#8B5CF6", opacity: 0.20 }} />
          <div className="blob" style={{ bottom: "-10%", left: "30%", width: 360, height: 360, background: "#06B6D4", opacity: 0.18 }} />
        </div>
        <div className="container-edge text-center max-w-4xl mx-auto">
          <p className="eyebrow"><span className="dot" />Contact</p>
          <h1 className="heading mt-5" style={{ fontSize: "var(--fs-hero)" }}>
            Talk to the <em>EDUS team.</em>
          </h1>
          <p className="text-[#2B3950] text-[17px] mt-6 leading-[1.65] max-w-2xl mx-auto">
            Pick a contact channel below or send us an enquiry — we&apos;ll get back to you with the
            right learning option for your child.
          </p>
        </div>
      </section>

      {/* QUICK CONTACT CARDS */}
      <section className="relative py-10 md:py-14 overflow-hidden">
        <div className="container-edge">
          <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {QUICK.map((q) => {
              const inner = (
                <>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                    style={{ background: `${q.tint}15`, border: `1px solid ${q.tint}25` }}
                  >
                    {q.icon}
                  </div>
                  <h3 className="heading mt-5" style={{ fontSize: "18px" }}>{q.title}</h3>
                  <p className="text-[#2B3950] text-[13.5px] mt-1.5 leading-[1.65]">{q.body}</p>
                  <p
                    className="mt-4 text-[14px] font-[family-name:var(--font-display)] font-600 inline-flex items-center gap-1.5"
                    style={{ color: q.tint }}
                  >
                    {q.cta}
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </p>
                </>
              );
              const className = "glass rounded-[24px] p-6 block hover:border-[rgba(37,99,235,0.30)] transition-colors";
              return q.external ? (
                <a
                  key={q.title}
                  href={q.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {inner}
                </a>
              ) : (
                <a key={q.title} href={q.href} className={className}>
                  {inner}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <ContactForm />
    </>
  );
}
