import { JsonLdScript, breadcrumbList, speakableWebPage } from "@/components/layout/StructuredData";

export const metadata = {
  title: "Terms & Conditions · EDUS Lanka (PVT) Ltd.",
  description:
    "The terms and conditions that govern your use of EDUS Online services, including registration, fees, refunds, intellectual property, liability, and governing law.",
  alternates: { canonical: "/terms" },
};

const LAST_UPDATED = "March 11, 2025";

export default function TermsPage() {
  const year = new Date().getFullYear();

  return (
    <>
      <JsonLdScript
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Terms & Conditions", path: "/terms" },
        ])}
      />
      <JsonLdScript
        data={speakableWebPage({
          name: "Terms & Conditions · EDUS Lanka (PVT) Ltd.",
          description:
            "Terms and conditions governing the use of EDUS Online services, including registration, fees, refunds, intellectual property, liability, and governing law.",
          path: "/terms",
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
            Terms &amp; <em>Conditions.</em>
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
            These EDUS Online Terms and Conditions form a legally binding agreement between you
            and EDUS Lanka (Pvt) Ltd, a company registered in Sri Lanka under company number
            PV 00232840, with our registered office at No. 95, K.K.S Road, Jaffna, Sri Lanka
            (&ldquo;us,&rdquo; &ldquo;we,&rdquo; or &ldquo;our&rdquo;). These Terms apply to all
            visitors, users, and others who wish to access or use our service.
          </p>
          <p>
            By accessing or using the Service, you agree to be bound by these Terms. If you
            disagree with any part of the Terms, then you do not have permission to access the
            Service.
          </p>

          <H2>1. Services</H2>
          <p>
            We offer various online and taught classes and courses (&ldquo;Services&rdquo;) as
            described on our website{" "}
            <a href="https://edustutor.com" className="text-[#2563EB] hover:underline">
              https://edustutor.com
            </a>
            . These Services are subject to the terms and conditions contained herein, as well
            as any other course-specific terms and conditions that may apply.
          </p>

          <H2>2. Account Registration</H2>
          <p>
            To access certain features of our Service, you must register for an account. You
            agree to provide accurate, current, and complete information during the registration
            process and to update such information to keep it accurate, current, and complete.
          </p>

          <H2>3. Fees and Payment</H2>
          <p>
            Fees for our Services are as described on our website or as informed over the phone.
            Fees must be paid in full prior to accessing the Services. All fees are exclusive of
            taxes, unless otherwise stated.
          </p>

          <H2>4. Cancellations and Refunds</H2>
          <p>
            You may cancel your purchase of the Services within 14 working days from the day
            after the date we concluded our agreement, subject to certain conditions. If you
            access, download, or start to use an online course within this period, you will not
            be entitled to cancel your order.
          </p>

          <H2>5. Intellectual Property Rights</H2>
          <p>
            All intellectual property rights in the course materials, online courses, and taught
            courses are owned by or licensed to EDUS Lanka (Pvt) Ltd. You are granted a limited,
            non-transferable, non-exclusive licence to use the course materials for personal use
            related to completing the course.
          </p>

          <H2>6. Confidentiality</H2>
          <p>
            Both parties agree to keep confidential information in strict confidence and to use
            it only for the purposes of these terms and conditions.
          </p>

          <H2>7. Liability</H2>
          <p>
            We do not accept any liability for any indirect, special, or consequential loss
            arising from any breach of these terms and conditions. Our total liability in
            connection with these terms shall be limited to the fees you have paid us.
          </p>

          <H2>8. Termination</H2>
          <p>
            We may terminate these terms and conditions and cease to provide you with any
            Services with immediate effect in certain circumstances, including if you fail to
            comply with these terms.
          </p>

          <H2>9. Data Protection</H2>
          <p>
            We will use your personal data in accordance with our{" "}
            <a href="/privacy" className="text-[#2563EB] hover:underline">Privacy Policy</a>,
            which forms part of these terms. We take reasonable steps to protect your personal
            data but cannot guarantee the security of any data you disclose online.
          </p>

          <H2>10. Governing Law</H2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws
            of England and Wales. The courts of England and Wales shall have exclusive
            jurisdiction to settle any dispute or claim that arises out of or in connection with
            these terms.
          </p>

          <H2>11. Contact Us</H2>
          <p>
            For any questions or concerns about these terms, please contact us through the
            channels below.
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

function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="list-disc pl-5 space-y-1.5 text-[#2B3950]">
      {children}
    </ul>
  );
}
