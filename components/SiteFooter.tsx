import Link from "next/link";
import Image from "next/image";

const QUICK = [
  { label: "Home", href: "/" },
  { label: "Choose Region", href: "/#regions" },
  { label: "Sri Lanka Classes", href: "/sl" },
  { label: "India Classes", href: "/in" },
  { label: "Global One to One", href: "/global" },
  { label: "How It Works", href: "/#how" },
  { label: "Resources", href: "/#resources" },
  { label: "Success Stories", href: "/#stories" },
  { label: "Contact", href: "/contact" },
  { label: "Enrol", href: "/enrol" },
];

const PATHS = [
  { label: "Sri Lanka Online Tuition", href: "/sl" },
  { label: "India Grades 6 to 10", href: "/in" },
  { label: "Global One to One Tuition", href: "/global" },
  { label: "Group Classes", href: "/#regions" },
  { label: "Individual Classes", href: "/global" },
  { label: "Resource Vault", href: "/#resources" },
  { label: "AI Study Support", href: "/#resources" },
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
          {/* Footer CTA banner */}
          <div className="rounded-[24px] bg-white/80 border border-white/80 p-6 md:p-8 grid md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <p className="eyebrow"><span className="dot" />Need Help</p>
              <h3 className="heading mt-3" style={{ fontSize: "clamp(22px, 2.4vw, 28px)" }}>
                Need help choosing the <em>right class?</em>
              </h3>
              <p className="text-[#2B3950] text-[14.5px] mt-2 max-w-xl">
                Our team is happy to walk you through Sri Lanka classes, India tuition, and global one
                to one options — with no pressure.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link href="/enrol" className="btn btn-primary">Start Enrolment</Link>
              <Link href="/contact" className="btn btn-ghost">Talk to EDUS Team</Link>
            </div>
          </div>

          <div className="mt-12 grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <Image
                src="/edus_logo_blue.webp"
                alt="EDUS"
                width={220}
                height={68}
                className="h-12 w-auto"
              />
              <p className="text-[#2B3950] text-[14.5px] mt-5 leading-[1.7] max-w-md">
                EDUS is an online learning platform offering live classes, structured tuition, one to
                one support, parent updates, learning resources, and academic monitoring for school students.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-8">
              <div>
                <p className="font-[family-name:var(--font-display)] font-600 text-[12px] tracking-[0.14em] uppercase text-[#102033] mb-4">
                  Quick Links
                </p>
                <ul className="space-y-2.5 text-[14px]">
                  {QUICK.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-[#2B3950] hover:text-[#2563EB] transition">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-[family-name:var(--font-display)] font-600 text-[12px] tracking-[0.14em] uppercase text-[#102033] mb-4">
                  Learning Paths
                </p>
                <ul className="space-y-2.5 text-[14px]">
                  {PATHS.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-[#2B3950] hover:text-[#2563EB] transition">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-[rgba(16,32,51,0.08)] flex flex-wrap items-center justify-between gap-3 text-[12px] text-[#5A6A82]">
            <p>© {new Date().getFullYear()} EDUS · Online learning for Sri Lanka, India, and global students.</p>
            <p className="font-medium">
              <span className="text-[#22C55E]">●</span> Live online tuition · Parent monitored · 24/7 support
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
