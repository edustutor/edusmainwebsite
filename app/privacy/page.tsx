import { JsonLdScript, breadcrumbList, speakableWebPage } from "@/components/layout/StructuredData";
import { hreflangAlternates } from "@/lib/siteUrl";

export const metadata = {
  title: "Privacy Policy - EDUS Lanka (PVT) Ltd.",
  description:
    "How EDUS Online Tuition collects, uses, retains, and protects information from students, parents, teachers, and administrators across our website, mobile apps, and online learning services.",
  alternates: {
    canonical: "/privacy",
    languages: hreflangAlternates("/privacy"),
  },
};

const LAST_UPDATED = "July 26, 2026";

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
          name: "Privacy Policy - EDUS Lanka (PVT) Ltd.",
          headline: "EDUS Privacy Policy - Student & Parent Data Protection",
          description:
            "How EDUS Online Tuition collects, uses, retains, and protects information from students, parents, teachers, and administrators.",
          path: "/privacy",
          lastUpdated: "2026-07-26",
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

          <H3>a) Contact &amp; Identity Information</H3>
          <UL>
            <li>Name (required for enrollment and account creation)</li>
            <li>Email Address (used for login, authentication, and communication)</li>
            <li>Phone Number (used for login, security, and communication)</li>
            <li>Date of Birth (used to confirm the student&rsquo;s grade level and age-appropriate access)</li>
            <li>Physical Address (optional, used for personalised services)</li>
            <li>Other Contact Information (for verification between students, parents, and teachers)</li>
          </UL>

          <H3>b) User Content</H3>
          <UL>
            <li>Photos &amp; Videos (used for submitting assignments, homework, and projects)</li>
            <li>Files &amp; Documents (assignments, homework, and study materials you upload)</li>
            <li>Chat Messages (messages sent within class groups and to tutors or coordinators for academic support)</li>
            <li>Voice Recordings (audio you submit for spoken assignments, or captured within a recorded live class)</li>
          </UL>

          <H3>c) Payment Information</H3>
          <UL>
            <li>Payment &amp; Transaction Records (invoices, amounts, dates, and payment status). Card details are entered directly with our payment provider PayHere and are never stored by EDUS.</li>
          </UL>

          <H3>d) Technical Data</H3>
          <UL>
            <li>IP Address (for security, fraud detection, and analytics)</li>
            <li>Device Information (for performance optimisation)</li>
            <li>Crash &amp; Diagnostic Data (to detect and fix app errors)</li>
            <li>Cookies &amp; Tracking Technologies (for improving user experience and analytics)</li>
          </UL>

          <H3>e) Educational Data</H3>
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
          <p>
            We do not sell your personal data. We share data only with the service
            providers we need to run the platform:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-[14px] border-collapse my-2">
              <thead>
                <tr className="border-b border-[rgba(16,32,51,0.14)] text-left">
                  <th className="py-2 pr-4 font-display font-700 text-[#102033]">Provider</th>
                  <th className="py-2 pr-4 font-display font-700 text-[#102033]">Purpose</th>
                  <th className="py-2 font-display font-700 text-[#102033]">Data shared</th>
                </tr>
              </thead>
              <tbody className="align-top">
                <tr className="border-b border-[rgba(16,32,51,0.07)]">
                  <td className="py-3 pr-4">Google (Classroom, Meet)</td>
                  <td className="py-3 pr-4">Delivering live classes</td>
                  <td className="py-3">Name, email, class participation</td>
                </tr>
                <tr className="border-b border-[rgba(16,32,51,0.07)]">
                  <td className="py-3 pr-4">PayHere (Sri Lanka)</td>
                  <td className="py-3 pr-4">Processing tuition payments</td>
                  <td className="py-3">Payment and transaction details. Card details are entered directly with PayHere and are never stored by EDUS.</td>
                </tr>
                <tr className="border-b border-[rgba(16,32,51,0.07)]">
                  <td className="py-3 pr-4">Amazon Web Services</td>
                  <td className="py-3 pr-4">Cloud hosting and file storage</td>
                  <td className="py-3">All service data, stored in the United States</td>
                </tr>
                <tr className="border-b border-[rgba(16,32,51,0.07)]">
                  <td className="py-3 pr-4">Firebase Cloud Messaging (Google)</td>
                  <td className="py-3 pr-4">Push notifications</td>
                  <td className="py-3">Device notification token</td>
                </tr>
                <tr className="border-b border-[rgba(16,32,51,0.07)]">
                  <td className="py-3 pr-4">Amazon SES</td>
                  <td className="py-3 pr-4">Sending service emails</td>
                  <td className="py-3">Email address and delivery status</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            These providers act as our processors. They may only use the data to
            provide their service to us, and are bound by contract to protect it to
            the same standard we do. We also disclose data where required by law.
          </p>
          <p>
            <strong>International transfer.</strong> Our cloud infrastructure is
            located in the United States. Using the service involves transferring your
            data outside Sri Lanka.
          </p>

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

          <H3>Data Retention and Deletion</H3>
          <p>
            When an account is deleted, access ends immediately and personal profile
            data is removed from view within the platform. You can request account
            deletion at any time by submitting our online form at{" "}
            <a
              href="https://lms.edustutor.com/delete-request"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2563EB] hover:underline"
            >
              lms.edustutor.com/delete-request
            </a>
            , by emailing{" "}
            <a href="mailto:hello@edustutor.com" className="text-[#2563EB] hover:underline">
              hello@edustutor.com
            </a>
            , or, in the app, through your account settings.
          </p>
          <p>
            Some records are retained after deletion where the law requires it. In
            particular, financial records such as invoices, payments, and receipts are
            kept for the period required by Sri Lankan tax and accounting law, and a
            minimal record of academic history may be retained to meet our record
            keeping obligations. These records are held securely, are no longer shown
            in your active account, and are used only for legal, tax, and audit
            purposes.
          </p>
          <p>
            You can ask us at any time what data we still hold about you, and we will
            delete anything we are not legally required to keep.
          </p>

          <H2>6. User Rights (GDPR &amp; Privacy Compliance)</H2>
          <p>
            Users have the following rights under GDPR and applicable App Store Privacy Guidelines:
          </p>
          <UL>
            <li><strong>Right to Access:</strong> request a copy of your personal data.</li>
            <li><strong>Right to Rectification:</strong> correct inaccurate or outdated data.</li>
            <li>
              <strong>Right to Deletion:</strong> request data or account removal,
              including through our deletion form at{" "}
              <a
                href="https://lms.edustutor.com/delete-request"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2563EB] hover:underline"
              >
                lms.edustutor.com/delete-request
              </a>.
            </li>
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
            EDUS is an education service used by school students, including children under the
            age of 13. Protecting them is a core responsibility, and we design the platform to be
            safe for young learners.
          </p>

          <H3>Parental consent and supervision</H3>
          <UL>
            <li>Accounts for students under 18 are created and managed under the consent and supervision of a parent or guardian.</li>
            <li>Parents and guardians can review their child&rsquo;s information, request corrections, and request deletion of the account at any time.</li>
            <li>We collect only the information needed to deliver classes and track academic progress. We do not ask children for information we do not need.</li>
          </UL>

          <H3>How we keep the experience safe for children</H3>
          <UL>
            <li>
              <strong>No open messaging between students.</strong> Students cannot send private,
              one-to-one messages to other students. Communication happens within supervised class
              groups and with tutors and coordinators for academic support only. Because there is
              no private student-to-student messaging, there is no unmoderated channel a child
              could be contacted through.
            </li>
            <li>Live classes are conducted on approved platforms (Google Meet, Google Classroom) and may be recorded for quality assurance and safeguarding.</li>
            <li>All tutors accept EDUS child-safety standards and are expected to keep communication professional and age-appropriate at all times.</li>
            <li>
              Anyone can report a concern about a child&rsquo;s safety or about inappropriate
              behaviour or content through our{" "}
              <a href="/safeguarding" className="text-[#2563EB] hover:underline">Safeguarding Policy</a>,
              and we act on reports promptly.
            </li>
          </UL>

          <H3>No advertising or profiling of children</H3>
          <UL>
            <li>We do not show third-party advertising to children.</li>
            <li>We do not use children&rsquo;s data to build advertising or marketing profiles, and we do not sell it.</li>
          </UL>
          <p>
            If you believe a child has provided us information without the appropriate parental
            consent, contact us at{" "}
            <a href="mailto:hello@edustutor.com" className="text-[#2563EB] hover:underline">
              hello@edustutor.com
            </a>{" "}
            and we will remove it.
          </p>

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
            <li>Diagnostics: crash and error reports are collected to keep the app stable. This data is used only to detect and fix technical problems and is not used to track you.</li>
          </UL>
          <p>
            The EDUS mobile app does not include a third-party advertising or
            behavioural-analytics SDK. We do not use your data to build advertising
            profiles or to track you across other apps or websites.
          </p>

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
    <h2 className="font-display font-700 text-[#102033] text-[22px] leading-[1.3] tracking-[-0.01em] mt-8 mb-2">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-display font-700 text-[#102033] text-[16px] leading-[1.4] mt-5 mb-1">
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
