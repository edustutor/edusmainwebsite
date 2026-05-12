import { JsonLdScript, breadcrumbList, speakableWebPage } from "@/components/layout/StructuredData";

export const metadata = {
  title: "Acceptable Use Policy · EDUS Lanka (PVT) Ltd.",
  description:
    "The Acceptable Use Policy that governs how students, parents, tutors, and visitors may use the EDUS website, mobile applications, and online learning services.",
  alternates: { canonical: "/acceptable-use" },
};

const LAST_UPDATED = "March 11, 2025";

export default function AcceptableUsePage() {
  const year = new Date().getFullYear();

  return (
    <>
      <JsonLdScript
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Acceptable Use", path: "/acceptable-use" },
        ])}
      />
      <JsonLdScript
        data={speakableWebPage({
          name: "Acceptable Use Policy · EDUS Lanka (PVT) Ltd.",
          description:
            "Acceptable Use Policy governing how students, parents, tutors, and visitors may use the EDUS website, mobile applications, and online learning services.",
          path: "/acceptable-use",
        })}
      />
      {/* HERO */}
      <section className="relative pt-32 sm:pt-36 pb-12 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="blob" style={{ top: "-8%", left: "-8%", width: 420, height: 420, background: "#2563EB", opacity: 0.22 }} />
          <div className="blob" style={{ top: "20%", right: "-10%", width: 380, height: 380, background: "#8B5CF6", opacity: 0.20 }} />
        </div>
        <div className="container-edge text-center max-w-4xl mx-auto">
          <p className="eyebrow"><span className="dot" />Legal</p>
          <h1 className="heading mt-5" style={{ fontSize: "var(--fs-hero)" }}>
            Acceptable Use <em>Policy.</em>
          </h1>
          <p className="text-[#2B3950] text-[15px] mt-6">
            Last Updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      {/* BODY */}
      <section className="relative pb-16 md:pb-20 overflow-hidden">
        <div className="container-edge max-w-3xl mx-auto text-[#2B3950] text-[15px] leading-[1.75] space-y-5">
          <p>
            This Acceptable Use Policy (&ldquo;Policy&rdquo;) governs how students, parents,
            tutors, and visitors (&ldquo;Users&rdquo;) may access and use the website, mobile
            applications, online classes, and supporting services (collectively, the
            &ldquo;Services&rdquo;) provided by EDUS Lanka (Pvt) Ltd (&ldquo;EDUS,&rdquo;
            &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). This Policy should be read
            alongside our{" "}
            <a href="/terms" className="text-[#2563EB] hover:underline">Terms &amp; Conditions</a>
            ,{" "}
            <a href="/privacy" className="text-[#2563EB] hover:underline">Privacy Policy</a>, and{" "}
            <a href="/safeguarding" className="text-[#2563EB] hover:underline">Safeguarding Policy</a>.
          </p>
          <p>
            By accessing or using our Services, you agree to comply with this Policy. EDUS may
            take action, including suspension or termination of access, where this Policy is
            breached.
          </p>

          <H2>1. General Principles</H2>
          <p>All Users are expected to:</p>
          <UL>
            <li>Use the Services for legitimate educational and learning purposes only.</li>
            <li>Treat other Users with respect, courtesy, and professionalism at all times.</li>
            <li>Comply with the laws and regulations of their country of residence.</li>
            <li>Follow the instructions of tutors, EDUS staff, and academic coordinators during classes and communications.</li>
          </UL>

          <H2>2. Prohibited Conduct</H2>
          <p>You must not, and must not allow others to:</p>
          <UL>
            <li>Use the Services in any way that is unlawful, fraudulent, or harmful.</li>
            <li>Harass, intimidate, threaten, or discriminate against any other User, tutor, or member of EDUS staff.</li>
            <li>Post, share, or transmit content that is abusive, hateful, sexually explicit, defamatory, or otherwise inappropriate.</li>
            <li>Impersonate any person or misrepresent your identity, age, or relationship with a student.</li>
            <li>Disrupt, interfere with, or attempt to gain unauthorised access to any part of the Services or its infrastructure.</li>
            <li>Upload or transmit any virus, malware, or harmful code.</li>
            <li>Use automated tools, bots, scrapers, or similar technology to access or extract data from the Services.</li>
            <li>Reverse engineer, decompile, or attempt to derive the source code of the Services.</li>
          </UL>

          <H2>3. Conduct in Live Classes</H2>
          <p>During live online classes and tutoring sessions, Users must:</p>
          <UL>
            <li>Join classes on time and remain focused on the academic content.</li>
            <li>Keep audio, video, and shared screens appropriate for an educational setting.</li>
            <li>Avoid sharing class links, invitations, or recordings outside of the approved group.</li>
            <li>Refrain from recording, screenshotting, or distributing class content without prior authorisation.</li>
            <li>Communicate respectfully with tutors and fellow students.</li>
          </UL>

          <H2>4. Account &amp; Security</H2>
          <p>You are responsible for:</p>
          <UL>
            <li>Maintaining the confidentiality of your account credentials.</li>
            <li>All activity that occurs under your account.</li>
            <li>Notifying us promptly of any unauthorised use or suspected compromise of your account.</li>
          </UL>
          <p>You must not share your account with others or allow another person to use it.</p>

          <H2>5. Use of Content</H2>
          <p>
            All course materials, recordings, presentations, study notes, and learning resources
            provided through the Services are protected by intellectual property rights and are
            licensed solely for personal, non-commercial use by the enrolled student. You may
            not:
          </p>
          <UL>
            <li>Reproduce, redistribute, sell, or publish EDUS content without written permission.</li>
            <li>Modify or create derivative works from EDUS content.</li>
            <li>Use EDUS content to provide competing or unauthorised tuition services.</li>
          </UL>

          <H2>6. Tutor Conduct</H2>
          <p>Tutors using the Services must additionally:</p>
          <UL>
            <li>Conduct classes only through EDUS-approved platforms and schedules.</li>
            <li>Maintain professional communication and child-safe conduct at all times.</li>
            <li>Not collect payments directly from EDUS students or move students into private tuition outside of EDUS.</li>
            <li>Comply with the EDUS Safeguarding Policy and academic standards.</li>
          </UL>

          <H2>7. Reporting Misuse</H2>
          <p>
            If you become aware of any breach of this Policy, or of behaviour that is harmful,
            unsafe, or inappropriate, please report it to our team:
          </p>
          <UL>
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:hello@edustutor.com" className="text-[#2563EB] hover:underline">
                hello@edustutor.com
              </a>
            </li>
            <li>
              <strong>Phone:</strong>{" "}
              <a href="tel:+94707072072" className="text-[#2563EB] hover:underline">
                +94 70 707 2072
              </a>
            </li>
          </UL>

          <H2>8. Enforcement</H2>
          <p>
            Where we believe this Policy has been breached, EDUS may, at its sole discretion:
          </p>
          <UL>
            <li>Issue a warning to the User.</li>
            <li>Suspend access to specific features, classes, or services.</li>
            <li>Terminate the User&rsquo;s account and revoke access to the Services.</li>
            <li>Remove or restrict content that breaches this Policy.</li>
            <li>Report the matter to relevant authorities where required by law.</li>
          </UL>

          <H2>9. Changes to This Policy</H2>
          <p>
            We may update this Policy from time to time to reflect changes in our Services, user
            behaviour, or applicable law. Any updates will be published on this page with a
            revised &ldquo;Last Updated&rdquo; date. Continued use of the Services after such
            changes constitutes acceptance of the revised Policy.
          </p>

          <H2>10. Contact Us</H2>
          <p>
            For any questions or concerns regarding this Acceptable Use Policy, please contact
            us at{" "}
            <a href="mailto:hello@edustutor.com" className="text-[#2563EB] hover:underline">
              hello@edustutor.com
            </a>{" "}
            or on{" "}
            <a href="tel:+94707072072" className="text-[#2563EB] hover:underline">
              +94 70 707 2072
            </a>
            .
          </p>

          <hr className="border-[rgba(16,32,51,0.08)] my-8" />
          <p className="text-[13px] text-[#5A6A82]">
            &copy; {year} EDUS Lanka (PVT) Ltd. All Rights Reserved.
          </p>
        </div>
      </section>
    </>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-[family-name:var(--font-display)] font-700 text-[#102033] text-[22px] leading-[1.3] tracking-[-0.01em] mt-8 mb-2">
      {children}
    </h2>
  );
}

function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="list-disc pl-5 space-y-1.5 text-[#2B3950]">{children}</ul>
  );
}
