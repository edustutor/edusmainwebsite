export const metadata = {
  title: "Safeguarding Policy · EDUS Lanka (PVT) Ltd.",
  description:
    "EDUS Online Tuition is committed to safeguarding the welfare of every child and young person using our online learning services across Sri Lanka, India, Maldives, and globally.",
  alternates: { canonical: "/safeguarding" },
};

const LAST_UPDATED = "March 11, 2025";

export default function SafeguardingPage() {
  const year = new Date().getFullYear();

  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 sm:pt-36 pb-12 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="blob" style={{ top: "-8%", left: "-8%", width: 420, height: 420, background: "#2563EB", opacity: 0.22 }} />
          <div className="blob" style={{ top: "20%", right: "-10%", width: 380, height: 380, background: "#8B5CF6", opacity: 0.20 }} />
        </div>
        <div className="container-edge text-center max-w-4xl mx-auto">
          <p className="eyebrow"><span className="dot" />Legal</p>
          <h1 className="heading mt-5" style={{ fontSize: "var(--fs-hero)" }}>
            Safeguarding <em>Policy.</em>
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
            EDUS Lanka (Pvt) Ltd (&ldquo;EDUS,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
            &ldquo;our&rdquo;) is fully committed to safeguarding the welfare of every child,
            young person, parent, and tutor who interacts with our online learning services. As
            a provider of online tuition for school students across Sri Lanka, India, the
            Maldives, and globally, we take our responsibility to protect students seriously and
            apply consistent safeguarding standards across all of our platforms and classes.
          </p>
          <p>
            This Policy explains the principles that guide our approach to safeguarding,
            outlines how we manage risk in an online learning environment, and sets out how
            students, parents, and tutors can raise concerns.
          </p>

          <H2>1. Our Commitment</H2>
          <p>EDUS is committed to:</p>
          <UL>
            <li>Providing a safe, respectful, and supportive online learning environment.</li>
            <li>Treating every student with dignity, regardless of background, ability, or location.</li>
            <li>Recognising that the welfare of the student is paramount in every decision we make.</li>
            <li>Working in partnership with parents, guardians, and tutors to promote student wellbeing.</li>
            <li>Continuously improving our policies, procedures, and tutor onboarding to reflect best practice.</li>
          </UL>

          <H2>2. Scope of This Policy</H2>
          <p>This Policy applies to:</p>
          <UL>
            <li>All EDUS students, including minors and young people under parental supervision.</li>
            <li>All EDUS tutors, employees, contractors, and academic support staff.</li>
            <li>All EDUS services delivered through our website, mobile applications, Google Meet, Google Classroom, and any other approved platforms.</li>
          </UL>

          <H2>3. Tutor Onboarding &amp; Standards</H2>
          <p>
            Tutors join the EDUS network through a structured selection and onboarding process
            that includes:
          </p>
          <UL>
            <li>Review of academic qualifications, teaching experience, and references where applicable.</li>
            <li>Assessment of subject knowledge, communication, and classroom conduct.</li>
            <li>Acceptance of EDUS academic standards, tutor policies, and child-safety expectations.</li>
            <li>Ongoing quality assurance through monthly reviews, student feedback, and academic monitoring.</li>
          </UL>
          <p>
            All tutors are expected to maintain professional, respectful, and age-appropriate
            communication with students at all times.
          </p>

          <H2>4. Online Class Safety</H2>
          <p>To maintain a safe environment in every live class, EDUS follows these standards:</p>
          <UL>
            <li>Classes are conducted on approved platforms such as Google Meet and Google Classroom.</li>
            <li>Students join through their EDUS account or an approved invitation.</li>
            <li>Tutors are expected to begin and end classes on time and to keep classes focused on the agreed academic content.</li>
            <li>Sessions may be recorded for quality assurance, student review, and safeguarding purposes, subject to applicable privacy notices.</li>
            <li>Tutors must not request personal contact details from students for purposes outside of EDUS-approved communication.</li>
          </UL>

          <H2>5. Acceptable Behaviour</H2>
          <p>EDUS does not tolerate:</p>
          <UL>
            <li>Bullying, harassment, intimidation, or discrimination of any kind.</li>
            <li>Inappropriate, abusive, or sexualised language or content.</li>
            <li>Sharing personal information, contact details, or media outside of approved channels.</li>
            <li>Any attempt to move EDUS students into private tuition arrangements without authorisation.</li>
            <li>Behaviour that places a student, tutor, or member of EDUS staff at risk of harm.</li>
          </UL>
          <p>
            Breach of these standards may result in immediate removal from the EDUS platform and,
            where appropriate, referral to relevant authorities.
          </p>

          <H2>6. Parental Involvement</H2>
          <p>
            We encourage active parental involvement in a child&rsquo;s online learning. Parents
            and guardians are welcome to:
          </p>
          <UL>
            <li>Supervise classes where appropriate, particularly for younger students.</li>
            <li>Request academic updates, attendance reports, and progress reviews.</li>
            <li>Raise any concern relating to a tutor, class, or interaction directly with the EDUS team.</li>
          </UL>

          <H2>7. Reporting a Concern</H2>
          <p>
            If you have a concern about the safety or welfare of a student, or about the conduct
            of a tutor, please contact us as soon as possible. Concerns are treated seriously,
            confidentially, and without prejudice to the person raising them.
          </p>
          <p>You can report a concern through:</p>
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
          <p>
            In the case of an immediate risk of harm, please also contact your local emergency
            services or appropriate national child protection authority.
          </p>

          <H2>8. Confidentiality &amp; Data Protection</H2>
          <p>
            All information shared as part of a safeguarding concern is handled in line with our{" "}
            <a href="/privacy" className="text-[#2563EB] hover:underline">Privacy Policy</a>.
            Personal data is shared only with those who need it in order to respond appropriately,
            or as required by law.
          </p>

          <H2>9. Review of This Policy</H2>
          <p>
            This Safeguarding Policy is reviewed regularly to reflect updates in legislation,
            best practice, and the operation of our services. Any changes will be published on
            this page with an updated &ldquo;Last Updated&rdquo; date.
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
