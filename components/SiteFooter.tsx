import Link from "next/link";

const COL = [
  {
    title: "Markets",
    links: [
      { label: "Sri Lanka", href: "/sl" },
      { label: "India · Grades 6–10", href: "/in" },
      { label: "Global · One-to-one", href: "/global" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "How it works", href: "/how-it-works" },
      { label: "Success stories", href: "/success-stories" },
      { label: "Resource vault", href: "/resources" },
      { label: "AI Study Buddy", href: "/edu-ai" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About EDUS", href: "/about" },
      { label: "Future Skills Academy", href: "/skills" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Trust",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Safeguarding", href: "/safeguarding" },
      { label: "Status", href: "/status" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-24 border-t border-[rgba(10,18,48,0.06)]">
      <div className="container-edge pt-20 pb-10">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <p className="eyebrow"><span className="dot" />Edustutor.com</p>
            <h3 className="display mt-4" style={{ fontSize: "var(--fs-display)" }}>
              The right syllabus, <em>in the right format</em>, with the right support.
            </h3>
            <p className="text-[#5C6485] max-w-md mt-5">
              EDUS is one platform with three tailored doors — Sri Lanka, India, and global one-to-one tuition. Built for clarity, performance, and parent-grade trust.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/signup" className="btn btn-primary">Sign Up</Link>
              <Link href="/enrol" className="btn btn-ghost">Talk to advisor</Link>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {COL.map((c) => (
              <div key={c.title}>
                <p className="eyebrow mb-4">{c.title}</p>
                <ul className="space-y-2.5 text-sm">
                  {c.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-[#2B3458] hover:text-[#0A1230]">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-[rgba(10,18,48,0.06)]">
          <p className="text-xs font-mono text-[#5C6485]">
            © {new Date().getFullYear()} EDUS Tutor · Colombo · Bengaluru · London
          </p>
          <p className="text-xs font-mono text-[#5C6485]">
            Single source of truth · 7,000+ learners · 30+ countries · 98.4% pass rate
          </p>
        </div>
      </div>
    </footer>
  );
}
