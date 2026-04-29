import Link from "next/link";
import Image from "next/image";

const COL = [
  { title: "Markets", links: [
    { label: "Sri Lanka Classes", href: "/sl" },
    { label: "India · Grades 6–10", href: "/in" },
    { label: "Global · One-to-One", href: "/global" },
  ] },
  { title: "Platform", links: [
    { label: "How it works", href: "/#how" },
    { label: "Subjects", href: "/#subjects" },
    { label: "Success stories", href: "/#stories" },
    { label: "FAQ", href: "/#faq" },
  ] },
  { title: "Company", links: [
    { label: "About EDUS", href: "/about" },
    { label: "Resource Vault", href: "/resources" },
    { label: "AI Study Buddy", href: "/edu-ai" },
    { label: "Contact", href: "/contact" },
  ] },
  { title: "Trust", links: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Safeguarding", href: "/safeguarding" },
    { label: "Status", href: "/status" },
  ] },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* atmospheric blur for footer */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="blob" style={{ top: "-20%", left: "-10%", width: 480, height: 480, background: "#2563EB", opacity: 0.18 }} />
        <div className="blob" style={{ bottom: "-30%", right: "-10%", width: 480, height: 480, background: "#8B5CF6", opacity: 0.18 }} />
      </div>

      <div className="container-edge pt-16 pb-10">
        <div className="glass-strong rounded-[32px] p-8 md:p-12">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <Image
                src="/edus_logo_blue.webp"
                alt="EDUS"
                width={220}
                height={68}
                className="h-12 w-auto"
              />

              <h3 className="heading mt-7" style={{ fontSize: "26px" }}>
                Learn the right syllabus, in the <em>right format</em>.
              </h3>
              <p className="text-[#2B3950] text-[14.5px] mt-3 leading-[1.7] max-w-md">
                Premium online tuition for students under 18 — taught live, in English, by qualified
                tutors across Sri Lanka, India, and globally.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/enrol" className="btn btn-primary">Start Enrolment</Link>
                <Link href="/contact" className="btn btn-ghost">Talk to EDUS Team</Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8">
              {COL.map((c) => (
                <div key={c.title}>
                  <p className="font-[family-name:var(--font-display)] font-600 text-[12px] tracking-[0.14em] uppercase text-[#102033] mb-4">
                    {c.title}
                  </p>
                  <ul className="space-y-2.5 text-[14px]">
                    {c.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="text-[#2B3950] hover:text-[#2563EB] transition">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-[rgba(16,32,51,0.08)] flex flex-wrap items-center justify-between gap-3 text-[12px] text-[#5A6A82]">
            <p>© {new Date().getFullYear()} EDUS Tutor (Pvt) Ltd · Colombo · Chennai · London</p>
            <p className="font-medium">
              <span className="text-[#22C55E]">●</span> All systems operational · 24/7 support
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
