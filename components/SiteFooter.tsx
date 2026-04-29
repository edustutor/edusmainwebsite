import Link from "next/link";

const COL = [
  { title: "Markets", links: [
    { label: "Sri Lanka", href: "/sl" },
    { label: "India · Grades 6–10", href: "/in" },
    { label: "Global · One-to-one", href: "/global" },
  ] },
  { title: "Platform", links: [
    { label: "How it works", href: "/how-it-works" },
    { label: "Success stories", href: "/success-stories" },
    { label: "Resource vault", href: "/resources" },
    { label: "AI Study Buddy", href: "/edu-ai" },
  ] },
  { title: "Company", links: [
    { label: "About EDUS", href: "/about" },
    { label: "Future Skills Academy", href: "/skills" },
    { label: "Blog", href: "/blog" },
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
    <footer className="relative bg-[#0E1421] text-[#F4F2ED]">
      <div className="container-wide pt-24 pb-10">
        {/* Wordmark */}
        <div className="grid grid-cols-12 gap-10 pb-16 border-b border-white/15">
          <div className="col-span-12 lg:col-span-7">
            <p className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-[#D9A441]">
              EDUS Tutor · Established 2020
            </p>
            <h3 className="masthead mt-6" style={{ fontSize: "clamp(48px,7vw,108px)", lineHeight: 0.92 }}>
              The right syllabus.<br />
              <em className="text-[#D9A441]">In every format.</em>
            </h3>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/signup" className="btn btn-gold">Sign Up</Link>
              <Link href="/enrol" className="btn btn-ghost border-white/20 text-[#F4F2ED] hover:border-[#D9A441]">
                Talk to advisor
              </Link>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-x-6 gap-y-10">
            {COL.map((c) => (
              <div key={c.title}>
                <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/45 mb-5 pb-3 border-b border-white/15">
                  {c.title}
                </p>
                <ul className="space-y-2.5 text-[13.5px]">
                  {c.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-white/80 hover:text-[#D9A441] transition">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Colophon */}
        <div className="mt-10 grid grid-cols-12 gap-6 text-[10.5px] font-mono uppercase tracking-[0.18em] text-white/45">
          <div className="col-span-12 md:col-span-4">
            © {new Date().getFullYear()} EDUS Tutor (Pvt) Ltd
          </div>
          <div className="col-span-12 md:col-span-4">
            Colombo · Chennai · London
          </div>
          <div className="col-span-12 md:col-span-4 md:text-right">
            Single source of truth · 530+ live classes
          </div>
        </div>
      </div>
    </footer>
  );
}
