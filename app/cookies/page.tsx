import { JsonLdScript, breadcrumbList } from "@/components/layout/StructuredData";

export const metadata = {
  title: "Cookie Policy · EDUS Lanka (PVT) Ltd.",
  description:
    "How EDUS Online Tuition uses cookies and similar tracking technologies across our website and applications, including the categories of cookies we use and how to manage them.",
  alternates: { canonical: "/cookies" },
};

const LAST_UPDATED = "March 11, 2025";

export default function CookiePolicyPage() {
  const year = new Date().getFullYear();

  return (
    <>
      <JsonLdScript
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Cookie Policy", path: "/cookies" },
        ])}
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
            Cookie <em>Policy.</em>
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
            This Cookie Policy explains how EDUS Lanka (Pvt) Ltd (&ldquo;EDUS,&rdquo;
            &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) uses cookies and similar
            tracking technologies when you visit our website (
            <a href="https://edustutor.com" className="text-[#2563EB] hover:underline">
              https://edustutor.com
            </a>
            ), use our mobile applications, or access our online learning services. This Cookie
            Policy should be read alongside our{" "}
            <a href="/privacy" className="text-[#2563EB] hover:underline">Privacy Policy</a>.
          </p>

          <H2>1. What Are Cookies</H2>
          <p>
            Cookies are small text files placed on your device when you visit a website. They
            are widely used to make websites work, improve performance, and provide information
            to the site owners. Similar technologies include local storage, pixels, tags, and
            software development kits used in our mobile applications.
          </p>

          <H2>2. How We Use Cookies</H2>
          <p>EDUS uses cookies and similar technologies to:</p>
          <UL>
            <li>Enable core functionality such as account login and session management.</li>
            <li>Remember preferences, such as language and region selection.</li>
            <li>Measure how our website and services are used to improve them.</li>
            <li>Maintain platform security and detect unusual activity.</li>
            <li>Support effective communication between students, parents, and tutors.</li>
          </UL>
          <p>
            We do not use cookies to build advertising profiles or to sell personal information
            to third parties.
          </p>

          <H2>3. Categories of Cookies We Use</H2>

          <H3>a) Strictly Necessary Cookies</H3>
          <p>
            Required for the operation of the platform. They enable features such as logging in
            to your account, accessing live classes, and maintaining a secure session. These
            cookies cannot be disabled without affecting how the service functions.
          </p>

          <H3>b) Functional Cookies</H3>
          <p>
            Used to remember your choices and provide a personalised experience, including
            language, region (Sri Lanka, India, Maldives, Global), and saved preferences.
          </p>

          <H3>c) Performance &amp; Analytics Cookies</H3>
          <p>
            Used to understand how visitors interact with our website and applications. The
            information collected is aggregated and helps us improve content, navigation, and
            features. We may use providers such as Google Analytics for this purpose.
          </p>

          <H3>d) Security Cookies</H3>
          <p>
            Help us detect fraudulent activity, protect user accounts, and maintain the
            integrity of our learning platform.
          </p>

          <H2>4. Third-Party Cookies</H2>
          <p>
            Some features of our service rely on trusted third-party providers, which may set
            their own cookies. These include:
          </p>
          <UL>
            <li>Google services used for analytics, authentication, and online classrooms (such as Google Meet and Google Classroom).</li>
            <li>Cloud hosting and security providers used to deliver and protect our services.</li>
            <li>Embedded content providers, where applicable.</li>
          </UL>
          <p>
            Third parties operate under their own privacy and cookie policies. We recommend
            reviewing their documentation for further details.
          </p>

          <H2>5. Managing Your Cookie Preferences</H2>
          <p>You can control cookies in the following ways:</p>
          <UL>
            <li>Adjust your browser settings to block or delete cookies.</li>
            <li>Use private or incognito browsing modes.</li>
            <li>Configure cookie preferences on your device or in your operating system.</li>
          </UL>
          <p>
            Please note that disabling strictly necessary cookies may affect core functionality,
            including the ability to log in or attend live classes.
          </p>

          <H2>6. Updates to This Policy</H2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in technology,
            our services, or applicable law. Any updates will be published on this page with a
            revised &ldquo;Last Updated&rdquo; date.
          </p>

          <H2>7. Contact Us</H2>
          <p>
            For any questions about this Cookie Policy or how we use cookies, please contact us:
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

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-[family-name:var(--font-display)] font-700 text-[#102033] text-[16px] leading-[1.4] mt-5 mb-1">
      {children}
    </h3>
  );
}

function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="list-disc pl-5 space-y-1.5 text-[#2B3950]">{children}</ul>
  );
}
