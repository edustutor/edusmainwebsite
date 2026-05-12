import { JsonLdScript, breadcrumbList, speakableWebPage } from "@/components/layout/StructuredData";

export const metadata = {
  title: "Refund Policy · EDUS Lanka (PVT) Ltd.",
  description:
    "EDUS Online Tuition refund policy: eligibility, request process, non-refundable services, EDUS-initiated cancellations, and technical issue handling.",
  alternates: { canonical: "/refunds" },
};

const LAST_UPDATED = "April 3, 2024";

export default function RefundPolicyPage() {
  const year = new Date().getFullYear();

  return (
    <>
      <JsonLdScript
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Refund Policy", path: "/refunds" },
        ])}
      />
      <JsonLdScript
        data={speakableWebPage({
          name: "Refund Policy · EDUS Lanka (PVT) Ltd.",
          description:
            "EDUS Online Tuition refund policy: eligibility, request process, non-refundable services, EDUS-initiated cancellations, and technical issue handling.",
          path: "/refunds",
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
            Refund <em>Policy.</em>
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
            Thank you for choosing EDUS Online Tuition. We are committed to providing
            high-quality educational services. If you are not completely satisfied with our
            services, we are here to assist you. Refund eligibility is governed by our{" "}
            <a href="/terms" className="text-[#2563EB] hover:underline">Terms of Service</a>{" "}
            and the conditions below.
          </p>

          <H2>1. Refund Eligibility</H2>
          <p>We offer refunds under the following conditions:</p>
          <UL>
            <li>Requests for refunds must be made within 14 days from the date of enrolment.</li>
            <li>
              If you have not accessed, downloaded, or started using any course materials or
              online classes, you may be eligible for a full refund.
            </li>
            <li>Refunds are not applicable for partially or fully completed courses.</li>
          </UL>

          <H2>2. Refund Process</H2>
          <UL>
            <li>
              To request a refund, please contact our support team at{" "}
              <a href="mailto:hello@edustutor.com" className="text-[#2563EB] hover:underline">
                hello@edustutor.com
              </a>{" "}
              with your enrolment details.
            </li>
            <li>
              Upon receiving your request, we will review it and notify you of the approval or
              rejection of your refund.
            </li>
            <li>
              Approved refunds will be processed within 7 business days and credited to your
              original payment method.
            </li>
          </UL>

          <H2>3. Non-Refundable Services</H2>
          <p>The following are non-refundable:</p>
          <UL>
            <li>One-time registration fees</li>
            <li>Completed or partially attended courses</li>
            <li>Digital downloads and study materials</li>
            <li>Personalised or customised tutoring sessions</li>
          </UL>

          <H2>4. Cancellations by EDUS</H2>
          <p>
            If a course or session is cancelled by EDUS Online Tuition, students will be
            entitled to a full refund or the option to enrol in an alternative course.
          </p>

          <H2>5. Technical Issues &amp; Complaints</H2>
          <UL>
            <li>
              If you experience technical difficulties preventing you from accessing a course,
              contact our support team immediately for assistance.
            </li>
            <li>Refunds for technical issues will be reviewed on a case-by-case basis.</li>
          </UL>

          <H2>6. Contact Us</H2>
          <p>For any questions regarding our refund policy, please reach out through the channels below.</p>
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

function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="list-disc pl-5 space-y-1.5 text-[#2B3950]">
      {children}
    </ul>
  );
}
