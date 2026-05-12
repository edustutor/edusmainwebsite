import Link from "next/link";
import Image from "next/image";

const QUICK = [
  { label: "Home", href: "/" },
  { label: "Choose Region", href: "/#regions" },
  { label: "How It Works", href: "/#how" },
  { label: "Success Stories", href: "/#stories" },
  { label: "Teach with EDUS", href: "/teach" },
  { label: "FAQ", href: "/#faq" },
];

const PATHS = [
  { label: "Sri Lanka", href: "/sl" },
  { label: "India", href: "/in" },
  { label: "Maldives", href: "/mv" },
  { label: "Global", href: "/global" },
  { label: "Resource Vault", href: "https://wiki.edustutor.com/", external: true },
  { label: "Enrol", href: "https://signup.edustutor.com/", external: true },
  { label: "Contact", href: "/contact" },
];

const LEGAL = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Refund Policy", href: "/refunds" },
  { label: "Safeguarding", href: "/safeguarding" },
  { label: "Acceptable Use", href: "/acceptable-use" },
];

export function SiteFooter() {
  return (
    <footer className="relative mt-12">
      <div className="container-edge pb-10">
        <div className="glass rounded-[24px] px-6 md:px-10 py-8 md:py-10">
          {/* Top row - logo + summary + columns */}
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Brand block */}
            <div className="lg:col-span-4">
              <Image
                src="/edus_logo_blue.webp"
                alt="EDUS"
                width={180}
                height={56}
                className="h-10 w-auto"
              />
              <p className="mt-3 text-[11px] font-[family-name:var(--font-display)] font-600 tracking-[0.18em] uppercase text-[#2563EB]">
                Quality-Assured Online Live Learning Platform
              </p>
              <p className="text-[#2B3950] text-[13.5px] mt-4 leading-[1.65] max-w-sm">
                EDUS is an online learning platform offering live classes, structured tuition, one to
                one support, parent updates, and learning resources for school students.
              </p>
              <p className="mt-4 text-[12px] text-[#5A6A82]">
                <span className="text-[#22C55E]">●</span>&nbsp; Live online tuition · Parent monitored · 24/7 support
              </p>
            </div>

            {/* Columns */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-6">
              <FooterCol title="Quick Links" items={QUICK} />
              <FooterCol title="Learning Paths" items={PATHS} />
              <FooterCol title="Legal" items={LEGAL} />
            </div>
          </div>

          {/* Bottom strip */}
          <div className="mt-8 pt-5 border-t border-[rgba(16,32,51,0.08)] flex flex-wrap items-center justify-between gap-3 text-[11.5px] text-[#5A6A82]">
            <p>© {new Date().getFullYear()} EDUS · All rights reserved.</p>
            <p>Online learning for Sri Lanka, India, Maldives, and global students.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string; external?: boolean }[];
}) {
  return (
    <div>
      <p className="font-[family-name:var(--font-display)] font-600 text-[11.5px] tracking-[0.14em] uppercase text-[#102033] mb-3">
        {title}
      </p>
      <ul className="space-y-1.5 text-[13.5px]">
        {items.map((l) => (
          <li key={l.href}>
            {l.external ? (
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-[#2B3950] hover:text-[#2563EB] transition"
              >
                <FooterArrow />
                {l.label}
              </a>
            ) : (
              <Link
                href={l.href}
                className="group inline-flex items-center gap-1.5 text-[#2B3950] hover:text-[#2563EB] transition"
              >
                <FooterArrow />
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterArrow() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      aria-hidden
      className="shrink-0 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition"
    >
      <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
