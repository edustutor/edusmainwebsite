import { JsonLdScript, breadcrumbList, speakableWebPage } from "@/components/layout/StructuredData";

export const metadata = {
  title: "Privacy Policy · EDUS Lanka (PVT) Ltd.",
  description:
    "How EDUS Online Tuition collects, uses, retains, and protects information from students, parents, teachers, and administrators across our website, mobile apps, and online learning services.",
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "March 11, 2025";

export default function PrivacyPolicyPage() {
  const year = new Date().getFullYear();

  return (
    <>
      <JsonLdScript
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ])}
      />
      <JsonLdScript
        data={speakableWebPage({
          name: "Privacy Policy · EDUS Lanka (PVT) Ltd.",
          description:
            "How EDUS Online Tuition collects, uses, retains, and protects information from students, parents, teachers, and administrators.",
          path: "/privacy",
        })}
      />
      {/* HERO - same pattern as other sub-pages */}
      <section className="relative pt-32 sm:pt-36 pb-12 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="blob" style={{ top: "-8%", left: "-8%", width: 420, height: 420, background: "#2563EB", opacity: 0.22 }} />
          <div className="blob" style={{ top: "20%", right: "-10%", width: 380, height: 380, background: "#8B5CF6", opacity: 0.20 }} />
        </div>
        <div className="container-edge text-center max-w-4xl mx-auto">
          <p className="eyebrow"><span className="dot" />Legal</p>
          <h1 className="heading mt-5" style={{ fontSize: "var(--fs-hero)" }}>
            Privacy <em>Policy.</em>
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
            Welcome to EDUS Online Tuition. This Privacy Policy explains how we collect, use,
            maintain, and disclose information gathered from students, parents, teachers, and
            administrators (collectively referred to as &ldquo;Users&rdquo;) when they interact
            with our website (
            <a href="https://edustutor.com" className="text-[#2563EB] hover:underline">
              https://edustutor.com
            </a>
            ), mobile applications for iOS and Android (&ldquo;App&rdquo;), and online learning
            services conducted via Google Meet and Google Classroom (&ldquo;Services&rdquo;).
          </p>
          <p>
            By using our Site, App, or Services, you consent to the data practices described in
            this policy.
          </p>

          <H2>1. Contact Information</H2>
          <UL>
            <li><strong>Organization:</strong> EDUS Lanka (PVT) Ltd.</li>
            <li><strong>Registration Number:</strong> PV 00232840</li>
            <li><strong>Registered Address:</strong> No. 95, K.K.S Road, Jaffna, Sri Lanka.</li>
            <li>
              <strong>Contact Number:</strong>{" "}
              <a href="tel:+94707072072" className="text-[#2563EB] hover:underline">
                +94 70 707 2072
              </a>
            </li>
            <li>
              <strong>Data Protection Officer Email:</strong>{" "}
              <a href="mailto:hello@edustutor.com" className="text-[#2563EB] hover:underline">
                hello@edustutor.com
              </a>
            </li>
          </UL>
          <p>For any privacy-related inquiries, contact our Data Protection Officer (DPO).</p>

          <H2>2. Data We Collect</H2>
          <p>
            We collect and process data necessary for enrollment, participation, and management
            of our online tuition services. This includes:
          </p>

          <H3>a) Contact Information</H3>
          <UL>
            <li>Name (required for enrollment and account creation)</li>
            <li>Email Address (used for login, authentication, and communication)</li>
            <li>Phone Number (used for login, security, and communication)</li>
            <li>Physical Address (optional, used for personalised services)</li>
            <li>Other Contact Information (for verification between students, parents, and teachers)</li>
          </UL>

          <H3>b) User Content</H3>
          <UL>
            <li>Photos &amp; Videos (used for submitting assignments, homework, and projects)</li>
          </UL>

          <H3>c) Technical Data</H3>
          <UL>
            <li>IP Address (for security, fraud detection, and analytics)</li>
            <li>Device Information (for performance optimisation)</li>
            <li>Cookies &amp; Tracking Technologies (for improving user experience and analytics)</li>
          </UL>

          <H3>d) Educational Data</H3>
          <UL>
            <li>Course enrolments, assignments, and assessments (to track student progress)</li>
          </UL>

          <H2>3. How We Use Your Data</H2>
          <p>We process data strictly for educational and operational purposes, including:</p>
          <UL>
            <li>Account Management &amp; Authentication (login, security, and support)</li>
            <li>Educational Services (managing student progress, submissions, and communication)</li>
            <li>Service Optimisation (enhancing app functionality and security)</li>
            <li>Legal Compliance (meeting regulatory requirements and fraud prevention)</li>
          </UL>
          <p>We do not sell or use personal data for advertising purposes.</p>

          <H2>4. Data Sharing &amp; Third Parties</H2>
          <p>We share data only with trusted third-party service providers, including:</p>
          <UL>
            <li>Educational Platforms (Google Classroom, Google Meet, etc.)</li>
            <li>Cloud Hosting &amp; Security Services (to optimise performance and protect user data)</li>
            <li>Legal Compliance (when required by law enforcement or government authorities)</li>
          </UL>
          <p>All third parties comply with strict data protection measures.</p>

          <H2>5. Data Security &amp; Retention</H2>
          <p>
            We use industry-standard security measures to protect user data from unauthorised
            access, theft, or misuse.
          </p>

          <H3>Security Measures</H3>
          <UL>
            <li>Encrypted storage of sensitive data</li>
            <li>Secure authentication protocols</li>
            <li>Regular security audits</li>
          </UL>

          <H3>Data Retention</H3>
          <UL>
            <li>We retain personal data only as long as necessary for educational purposes.</li>
            <li>
              Users can request account deletion by contacting{" "}
              <a href="mailto:hello@edustutor.com" className="text-[#2563EB] hover:underline">
                hello@edustutor.com
              </a>.
            </li>
          </UL>

          <H2>6. User Rights (GDPR &amp; Privacy Compliance)</H2>
          <p>
            Users have the following rights under GDPR and applicable App Store Privacy Guidelines:
          </p>
          <UL>
            <li><strong>Right to Access:</strong> request a copy of your personal data.</li>
            <li><strong>Right to Rectification:</strong> correct inaccurate or outdated data.</li>
            <li><strong>Right to Deletion:</strong> request data or account removal.</li>
            <li><strong>Right to Restrict Processing:</strong> limit how we use your data.</li>
            <li><strong>Right to Data Portability:</strong> transfer your data to another service.</li>
          </UL>
          <p>To exercise any of these rights, contact our Data Protection Officer.</p>

          <H2>7. Cookies &amp; Tracking Technologies</H2>
          <p>We use cookies and similar technologies to:</p>
          <UL>
            <li>Enhance user experience</li>
            <li>Improve app performance</li>
            <li>Analyse service usage</li>
          </UL>
          <p>Users can control cookies through their browser settings.</p>

          <H2>8. Children&rsquo;s Privacy &amp; Parental Controls</H2>
          <p>
            Our platform is designed for educational purposes and is accessible to students under
            parental or educator supervision.
          </p>
          <UL>
            <li>We do not collect unnecessary data from minors.</li>
            <li>Parents and guardians can request data deletion.</li>
          </UL>

          <H2>9. App Store &amp; Play Store Privacy Compliance</H2>
          <p>
            Per Apple&rsquo;s App Store Connect and Google&rsquo;s Play Store Data Safety
            requirements, we collect and use the following data:
          </p>

          <H3>Data Linked to You</H3>
          <UL>
            <li>Contact Info (name, email, phone, address): used for app functionality and account management.</li>
            <li>User Content (photos, videos): used for submitting assignments and homework.</li>
          </UL>

          <H3>Data Not Linked to You</H3>
          <UL>
            <li>Certain anonymous analytics data may be collected, but is not personally identifiable.</li>
          </UL>

          <H2>10. Updates to This Policy</H2>
          <p>
            We may update this Privacy Policy to reflect changes in data practices, legal
            requirements, or app functionality.
          </p>
          <UL>
            <li>Updates will be announced on our website and app.</li>
            <li>Continued use of our services after updates implies acceptance.</li>
          </UL>

          <H2>11. Contact Us</H2>
          <p>For any privacy-related questions or concerns, contact us:</p>
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

          <hr className="border-[rgba(16,32,51,0.08)] my-8" />
          <p className="text-[13px] text-[#5A6A82]">
            &copy; {year} EDUS Lanka (PVT) Ltd. All Rights Reserved.
          </p>
        </div>
      </section>
    </>
  );
}

/* --------------------------------------------------------------- */
/* Inline typography helpers                                        */
/* --------------------------------------------------------------- */
function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-[family-name:var(--font-display)] font-700 text-[#102033] text-[22px] leading-[1.3] tracking-[-0.01em] mt-8 mb-2">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-[family-name:var(--font-display)] font-700 text-[#102033] text-[16px] leading-[1.4] mt-5 mb-1">
      {children}
    </h3>
  );
}

function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="list-disc pl-5 space-y-1.5 text-[#2B3950]">
      {children}
    </ul>
  );
}
