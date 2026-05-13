import Link from "next/link";
import Image from "next/image";

const QUICK = [
  { label: "Home", href: "/" },
  { label: "Choose Region", href: "/#regions" },
  { label: "How It Works", href: "/#how" },
  { label: "Success Stories", href: "/#stories" },
  { label: "Teach with EDUS", href: "/teach" },
  { label: "About EDUS", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Press", href: "/press" },
  { label: "FAQ", href: "/#faq" },
];

const PATHS = [
  { label: "Sri Lanka", href: "/sl" },
  { label: "SL Timetable 2026", href: "/sl/timetable" },
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

const SOCIALS = [
  { label: "Facebook",  href: "https://www.facebook.com/edusonline" },
  { label: "Instagram", href: "https://www.instagram.com/edus_online/" },
  { label: "TikTok",    href: "https://www.tiktok.com/@edusonline" },
  { label: "YouTube",   href: "https://www.youtube.com/@edusonline/" },
  { label: "LinkedIn",  href: "https://lk.linkedin.com/company/edusonline" },
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
                src="/edus-logo-blue.webp"
                alt="EDUS"
                width={180}
                height={56}
                className="h-10 w-auto"
              />
              <p className="mt-3 text-[11px] font-display font-600 tracking-[0.18em] uppercase text-[#2563EB]">
                Quality-Assured Online Live Learning Platform
              </p>
              <p className="text-[#2B3950] text-[13.5px] mt-4 leading-[1.65] max-w-sm">
                EDUS is an online learning platform offering live classes, structured tuition, one to
                one support, parent updates, and learning resources for school students.
              </p>
              <p className="mt-4 text-[12px] text-[#5A6A82]">
                <span className="text-[#22C55E]">●</span>&nbsp; Live online tuition - Parent monitored - 24/7 support
              </p>

              {/* Social icons */}
              <ul className="mt-5 flex items-center gap-2">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`EDUS on ${s.label}`}
                      title={`EDUS on ${s.label}`}
                      className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white border border-[rgba(16,32,51,0.08)] text-[#5A6A82] hover:text-[#2563EB] hover:border-[#2563EB]/40 hover:-translate-y-0.5 transition shadow-[0_4px_12px_-8px_rgba(16,32,51,0.18)]"
                    >
                      <SocialIcon name={s.label} />
                    </a>
                  </li>
                ))}
              </ul>

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
            <p>© {new Date().getFullYear()} EDUS - All rights reserved.</p>
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
      <p className="font-display font-600 text-[11.5px] tracking-[0.14em] uppercase text-[#102033] mb-3">
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

function SocialIcon({ name }: { name: string }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true,
  };
  switch (name) {
    case "Facebook":
      return (
        <svg {...common}>
          <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.5 1.5-1.5h1.7V3.7c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2v2.1H7.5V13h2.8v8h3.2z" />
        </svg>
      );
    case "Instagram":
      return (
        <svg {...common}>
          <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 2C8.9 4.2 8.5 4.2 7.3 4.3c-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.3.8-.4.4-.6.8-.8 1.3-.2.4-.3 1-.4 2.1C2.6 9.5 2.6 9.9 2.6 12s0 2.5.1 3.1c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.3.4.4.8.6 1.3.8.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.3-.8.4-.4.6-.8.8-1.3.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2.1-.2-.5-.4-.9-.8-1.3-.4-.4-.8-.6-1.3-.8-.4-.2-1-.3-2.1-.4-1.2-.1-1.6-.1-4.7-.1zm0 3.4a4.4 4.4 0 1 1 0 8.8 4.4 4.4 0 0 1 0-8.8zm0 7.2a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6zm5.6-7.4a1 1 0 1 1-2.1 0 1 1 0 0 1 2.1 0z" />
        </svg>
      );
    case "TikTok":
      return (
        <svg {...common}>
          <path d="M20 8.6c-1.7 0-3.3-.6-4.5-1.7v7.6c0 3.2-2.6 5.8-5.8 5.8-3.2 0-5.8-2.6-5.8-5.8 0-3.2 2.6-5.8 5.8-5.8.3 0 .6 0 .9.1v3.1c-.3-.1-.6-.1-.9-.1-1.5 0-2.7 1.2-2.7 2.7s1.2 2.7 2.7 2.7 2.7-1.2 2.7-2.7V2.2h3c.1 1 .4 1.9.9 2.7.5.7 1.2 1.3 2 1.7.8.4 1.6.6 2.5.6v3.4z" />
        </svg>
      );
    case "YouTube":
      return (
        <svg {...common}>
          <path d="M23 7.2s-.2-1.5-.9-2.2c-.9-.9-1.9-.9-2.4-1C16.4 3.8 12 3.8 12 3.8s-4.4 0-7.7.2c-.5.1-1.5.1-2.4 1C1.2 5.7 1 7.2 1 7.2S.8 9 .8 10.8v1.6C.8 14.2 1 16 1 16s.2 1.5.9 2.2c.9.9 2.1.9 2.6 1 1.9.2 7.5.2 7.5.2s4.4 0 7.7-.3c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.2.9-2.2s.2-1.8.2-3.6v-1.6c0-1.8-.2-3.6-.2-3.6zM9.7 14.5V8l5.7 3.3-5.7 3.2z" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg {...common}>
          <path d="M20.5 2h-17C2.7 2 2 2.7 2 3.5v17c0 .8.7 1.5 1.5 1.5h17c.8 0 1.5-.7 1.5-1.5v-17c0-.8-.7-1.5-1.5-1.5zM8 19H5V9h3v10zM6.5 7.7C5.6 7.7 4.9 7 4.9 6.1S5.6 4.5 6.5 4.5s1.6.7 1.6 1.6S7.4 7.7 6.5 7.7zM19 19h-3v-5.3c0-1.3-.5-2.2-1.6-2.2-.9 0-1.4.6-1.6 1.2-.1.2-.1.5-.1.8V19h-3V9h3v1.4c.4-.6 1.1-1.5 2.7-1.5 2 0 3.6 1.3 3.6 4.1V19z" />
        </svg>
      );
    default:
      return null;
  }
}
