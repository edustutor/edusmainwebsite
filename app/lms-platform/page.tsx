import Link from "next/link";
import type { Metadata } from "next";
import { FeatureIcon } from "@/components/effects/Icons";
import {
  JsonLdScript,
  breadcrumbList,
  faqPage,
  signupWebApplication,
  edusAndroidApp,
  edusIosApp,
  SITE_URL,
} from "@/components/layout/StructuredData";
import { hreflangAlternates } from "@/lib/siteUrl";
import { PlatformStat } from "@/components/platform/PlatformStat";

/**
 * EDUS LMS Platform showcase - the full, audited feature list for the
 * learning management system, presented as a marketing page.
 *
 * Every feature shown here is sourced from the production feature audit
 * (web app, mobile app, backend). Nothing is aspirational.
 *
 * SEO: slug /lms-platform is an exact match for "LMS platform" queries.
 * Targets "learning management system Sri Lanka", "online tuition app",
 * "LMS for students and tutors", plus the feature long-tails.
 *
 * Theme: the main EDUS site theme (blue/violet glass), NOT the overseas
 * warm theme. Reuses FeatureIcon, .glass, .heading, .btn-* primitives.
 */

const SIGNUP_URL = "https://signup.edustutor.com/";
const PLAY_URL = "https://play.google.com/store/apps/details?id=com.edus.edustutor";
const APP_STORE_URL = "https://apps.apple.com/lk/app/edus-tutor/id6742735384";

/* --------------------------------------------------------------- */
/* At a glance                                                       */
/* --------------------------------------------------------------- */

const GLANCE: Array<{ icon: string; tint: string; label: string; value: string }> = [
  { icon: "platform", tint: "#2563EB", label: "Platforms", value: "Web + native Android & iOS apps" },
  { icon: "global", tint: "#8B5CF6", label: "Languages", value: "English, Tamil, Sinhala - full interface" },
  { icon: "students", tint: "#06B6D4", label: "Roles", value: "Student, Tutor, Staff, Super Admin" },
  { icon: "notification", tint: "#F59E0B", label: "Notifications", value: "In-app, push, email, SMS" },
  { icon: "card", tint: "#22C55E", label: "Payments", value: "Card, bank, cash, cheque, wallet" },
  { icon: "money", tint: "#EF4444", label: "Currencies", value: "LKR, USD, INR" },
];

const STATS: Array<{ value: number; suffix: string; label: string }> = [
  { value: 4, suffix: "", label: "User roles" },
  { value: 3, suffix: "", label: "Languages" },
  { value: 4, suffix: "", label: "Notification channels" },
  { value: 10, suffix: "+", label: "Notification categories" },
];

/* --------------------------------------------------------------- */
/* Student features                                                  */
/* --------------------------------------------------------------- */

type Feature = { icon: string; tint: string; title: string; points: string[] };

const STUDENT_FEATURES: Feature[] = [
  {
    icon: "screen-share", tint: "#2563EB",
    title: "One-screen dashboard",
    points: [
      "Next class card with a Join button that activates at the right moment",
      "Today's classes, attendance rate, homework due, amount due, wallet balance",
      "Reminders, to-dos and pinned notes - every card taps straight to its list",
    ],
  },
  {
    icon: "calendar", tint: "#8B5CF6",
    title: "Timetable",
    points: [
      "Full schedule grouped by day, scrolling back and forward",
      "Join Meeting opens 5 minutes before class and closes at the end",
      "Filter by class, subject, grade, medium, syllabus, status or date",
      "Clear flags for rescheduled, cancelled or currently-live classes",
    ],
  },
  {
    icon: "live-classes", tint: "#06B6D4",
    title: "Classes",
    points: [
      "Every enrolled class with subject, grade, medium and syllabus",
      "Personal enrolment history - joins, breaks and returns",
      "Browse available classes with tutor demo videos and request to join",
    ],
  },
  {
    icon: "assignment", tint: "#F59E0B",
    title: "Homework",
    points: [
      "Submit text, files, or both - multiple images auto-stitch into one PDF",
      "See grades, written feedback and annotations drawn on your work",
      "Resubmit when a revision is requested; reminders at 24h, 8h and 1h",
    ],
  },
  {
    icon: "class-recordings", tint: "#EF4444",
    title: "Recordings library",
    points: [
      "Every class recorded and synced automatically - a clean video player",
      "Favourite lessons, and add timestamped notes that jump into the video",
      "Your tutor's session notes attach to the matching recording",
    ],
  },
  {
    icon: "resources", tint: "#22C55E",
    title: "Resources",
    points: [
      "Documents, PDFs, videos, images and links from your tutors",
      "Everything opens inside the app - no bouncing to a browser",
      "Download to keep; filter by class, subject, grade, medium or date",
    ],
  },
  {
    icon: "monitoring", tint: "#2563EB",
    title: "Attendance",
    points: [
      "Your complete record: present, late, absent and excused per session",
      "Late-by minutes shown, so the record is honest",
      "Marked automatically the moment you join a class",
    ],
  },
  {
    icon: "message", tint: "#8B5CF6",
    title: "EDUS Connect chat",
    points: [
      "Class group chats plus a direct line to support",
      "Text, photos, files, voice messages, polls with live results",
      "@mentions, reactions, replies, read receipts and typing indicators",
      "Mute a chat without losing the unread count",
    ],
  },
  {
    icon: "notes", tint: "#06B6D4",
    title: "Personal productivity",
    points: [
      "My Tasks - a Kanban board with priorities and deadlines",
      "My Notes with trash and restore; My Reminders with alerts",
      "A private resource library with a voice-note recorder",
    ],
  },
];

/* Payments deserve their own richer block. */
const PAYMENT_POINTS: Array<{ title: string; body: string; icon: string; tint: string }> = [
  { icon: "card", tint: "#2563EB", title: "Every way to pay", body: "Card and online, bank transfer with account details shown in-app, wallet auto-draw-down, plus cash and cheque recorded by staff." },
  { icon: "billing", tint: "#8B5CF6", title: "Clear invoices", body: "Full line-item breakdowns, downloadable branded PDF invoices and receipts, discounts shown as a clear saving, one click for everything outstanding." },
  { icon: "money", tint: "#22C55E", title: "Wallet", body: "Top up by card or bank transfer, full transaction history, and any overpayment surplus lands in your wallet automatically." },
  { icon: "fee", tint: "#F59E0B", title: "Fair, transparent billing", body: "Pro-rata charging when you join mid-month, a coverage countdown showing how long a payment lasts, and payment-extension requests when you need time." },
];

/* --------------------------------------------------------------- */
/* Tutor features                                                    */
/* --------------------------------------------------------------- */

const TUTOR_FEATURES: Feature[] = [
  {
    icon: "screen-share", tint: "#2563EB",
    title: "Teaching dashboard",
    points: [
      "Today's classes with live status, next class Join button, next 7 days",
      "Grading queue and revisions awaiting resubmit",
      "At-risk students flagged before it becomes a problem",
      "Your own reschedule, cancellation and attendance records at a glance",
    ],
  },
  {
    icon: "schedule", tint: "#8B5CF6",
    title: "Session management",
    points: [
      "Your full schedule with every student filter, scoped to your classes",
      "Request a reschedule or cancellation with a reason; admin approves",
      "Session notes students see against the matching recording",
      "Substitute assignments shown clearly when someone covers for you",
    ],
  },
  {
    icon: "students", tint: "#06B6D4",
    title: "Classes and students",
    points: [
      "Every class you teach with a full student roster",
      "Individual attendance history and enrolment timelines",
      "Contact details for students and their parents",
    ],
  },
  {
    icon: "feedback", tint: "#F59E0B",
    title: "Homework grading",
    points: [
      "Create homework with attachments, due dates and instructions",
      "Assign to one class or several; annotate submissions directly",
      "Grade with feedback, request revisions, see who has not submitted",
      "Reminders to students at 24h/8h/1h and to you when marking is due",
    ],
  },
  {
    icon: "monitoring", tint: "#EF4444",
    title: "Attendance control",
    points: [
      "Auto-marked when a student joins; full click timeline per student",
      "Override any status with a required reason",
      "Chronic-absentee report with parent contact details inline",
    ],
  },
  {
    icon: "book-marked", tint: "#22C55E",
    title: "Question Bank",
    points: [
      "Build multiple-choice questions with images on questions and options",
      "Single or multiple answer, tagged by class, subject, grade and syllabus",
      "Organise by lesson and sub-lesson; search, filter and bulk manage",
    ],
  },
  {
    icon: "rate", tint: "#2563EB",
    title: "Commission",
    points: [
      "Per-session commission snapshot recorded automatically at creation",
      "Fixed or percentage, per session, hour, student or month",
      "Substitute-tutor payments tracked separately with a full audit trail",
    ],
  },
  {
    icon: "class-recordings", tint: "#8B5CF6",
    title: "Resources and recordings",
    points: [
      "Upload material targeted by class, subject, grade, medium or syllabus",
      "Recordings synced automatically and linked to their exact session",
    ],
  },
];

/* --------------------------------------------------------------- */
/* What makes EDUS different                                         */
/* --------------------------------------------------------------- */

const DIFFERENT: Array<{ icon: string; tint: string; title: string; body: string }> = [
  { icon: "island", tint: "#2563EB", title: "Built for Sri Lanka", body: "Sinhala and Tamil throughout the interface, not an afterthought. PDF invoices render Tamil and Sinhala correctly. Local payment gateway, LKR pricing, local SMS, and Asia/Colombo timezone handled everywhere." },
  { icon: "mobile", tint: "#8B5CF6", title: "Works on a real phone", body: "A native app, not a wrapped website. Screens load quickly and stay responsive, and everything - documents, PDFs, videos and images - opens in-app. Designed for mobile data and low-bandwidth connections." },
  { icon: "verified", tint: "#22C55E", title: "Honest by design", body: "Money is never shown as settled until the server confirms it. Attendance is never shown as marked until it is recorded. Every override, approval and edit is written to an audit trail with a reason." },
  { icon: "notification", tint: "#06B6D4", title: "Real-time", body: "Messages, attendance, notifications and unread counts update live. Dashboard badges reflect the truth without a refresh." },
  { icon: "care", tint: "#F59E0B", title: "Communication that respects people", body: "Every notification category is individually switchable across four channels. Muting a chat silences it without hiding the unread count. Fee reminders are warm early and only firm on the 5th, with one-click unsubscribe on every email." },
  { icon: "shield", tint: "#EF4444", title: "Privacy and safety", body: "Role-based access enforced on the server, not just hidden in the UI. Personal notes and resources are genuinely private. Login lockout after repeated failures, full audit logging, and a public data-deletion route." },
];

/* --------------------------------------------------------------- */
/* FAQ (feeds FAQ rich result + AI engines)                          */
/* --------------------------------------------------------------- */

const FAQ = [
  {
    q: "What is the EDUS Learning Management System?",
    a: "EDUS is a complete learning management system (LMS) for online tuition, built for Sri Lanka. It runs on the web and as native Android and iOS apps, in English, Tamil and Sinhala, and covers everything from live classes, homework and recordings to attendance, payments, a wallet, and built-in chat for students, tutors and staff.",
  },
  {
    q: "Is the EDUS app fast on mobile data?",
    a: "Yes. EDUS is a native Android and iOS app, not a wrapped website, and it is built for mobile data and low-bandwidth connections. Screens load quickly and stay responsive, and documents, PDFs, videos and images all open inside the app.",
  },
  {
    q: "What languages does EDUS support?",
    a: "The entire EDUS interface is available in English, Tamil, and Sinhala - not partial translation. PDF invoices and receipts also render Tamil and Sinhala text correctly.",
  },
  {
    q: "How can students pay on EDUS?",
    a: "Students can pay online by card, by bank transfer (with the institute's account details shown in-app and on every invoice), from an in-app wallet that auto-draws-down against invoices, or by cash and cheque recorded by staff. Currencies supported are LKR, USD and INR.",
  },
  {
    q: "What can tutors do on the EDUS platform?",
    a: "Tutors get a teaching dashboard, session management with reschedule and cancellation requests, full class rosters, homework creation and grading with direct annotation, automatic attendance with override and chronic-absentee reports, a question bank, commission tracking, and everything students get - chat, personal tasks, notifications, and all three languages.",
  },
  {
    q: "Is EDUS available on Android and iOS?",
    a: "Yes. EDUS has native apps on Google Play and the Apple App Store, plus a full web app that works in any browser.",
  },
];

const PAGE_URL = `${SITE_URL}/lms-platform`;

export const metadata: Metadata = {
  title: {
    absolute: "EDUS LMS Platform - Learning Management System for Students & Tutors",
  },
  description:
    "Explore the EDUS Learning Management System: live classes, homework, recordings, attendance, payments, wallet, and built-in chat. Web and native Android & iOS apps in English, Tamil & Sinhala. Built for Sri Lanka.",
  alternates: {
    canonical: "/lms-platform",
    languages: hreflangAlternates("/lms-platform"),
  },
  keywords: [
    "learning management system",
    "learning management system Sri Lanka",
    "LMS platform",
    "LMS for students and tutors",
    "online tuition app",
    "online tuition platform Sri Lanka",
    "online class app Sri Lanka",
    "tuition management system",
    "school management system Sri Lanka",
    "student management system",
    "online learning app Tamil Sinhala",
    "EDUS app",
    "EDUS LMS",
    "live class app Sri Lanka",
    "homework and attendance app",
    "education app with wallet payments",
  ],
  openGraph: {
    title: "EDUS LMS Platform - Learning Management System for Students & Tutors",
    description:
      "Live classes, homework, recordings, attendance, payments, wallet and chat - on web and native Android & iOS apps, in English, Tamil & Sinhala.",
    type: "website",
    url: PAGE_URL,
    siteName: "EDUS Online Institute",
    images: [{ url: "/edus-og.jpg", width: 1200, height: 630, alt: "EDUS LMS Platform - complete learning management system for students and tutors" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EDUS LMS Platform - for Students & Tutors",
    description:
      "Live classes, homework, recordings, attendance, payments, wallet and chat, on web and native apps in English, Tamil & Sinhala.",
    images: ["/edus-og.jpg"],
  },
};

export default function LmsPlatformPage() {
  return (
    <>
      <JsonLdScript data={breadcrumbList([
        { name: "Home", path: "/" },
        { name: "LMS Platform", path: "/lms-platform" },
      ])} />
      <JsonLdScript data={signupWebApplication()} />
      <JsonLdScript data={edusAndroidApp()} />
      <JsonLdScript data={edusIosApp()} />
      <JsonLdScript data={faqPage(FAQ)} />

      <Hero />
      <Glance />
      <FeatureGroup
        eyebrow="For Students"
        title={<>Everything a student needs, <em>in one place.</em></>}
        sub="The student experience answers 'what do I need to do today?' without hunting through menus."
        features={STUDENT_FEATURES}
      />
      <Payments />
      <FeatureGroup
        eyebrow="For Tutors"
        title={<>Teach, track and get paid, <em>without the admin.</em></>}
        sub="Tutors get the full teaching toolkit - and everything students get, too."
        features={TUTOR_FEATURES}
      />
      <Different />
      <Faq />
      <FinalCta />
    </>
  );
}

/* --------------------------------------------------------------- */
/* Hero                                                              */
/* --------------------------------------------------------------- */

function Hero() {
  return (
    <section className="relative pt-32 sm:pt-36 pb-12 overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="blob" style={{ top: "-8%", left: "-8%", width: 460, height: 460, background: "#2563EB", opacity: 0.28 }} />
        <div className="blob" style={{ top: "16%", right: "-10%", width: 460, height: 460, background: "#8B5CF6", opacity: 0.24 }} />
        <div className="blob" style={{ bottom: "-6%", left: "34%", width: 380, height: 380, background: "#06B6D4", opacity: 0.18 }} />
      </div>
      <div className="container-edge text-center max-w-4xl mx-auto">
        <p className="eyebrow justify-center"><span className="dot" />The EDUS Platform</p>
        <h1 className="heading mt-5" style={{ fontSize: "var(--fs-hero-stacked)", lineHeight: 1.08 }}>
          One <em>learning management system</em> for live classes, homework, and everything in between.
        </h1>
        <p className="mt-6 text-[#2B3950] text-[16.5px] leading-relaxed max-w-2xl mx-auto">
          EDUS runs your whole online institute - classes, recordings, attendance,
          payments, and chat - on the web and native Android and iOS apps, in
          English, Tamil and Sinhala. Every feature below is live in production.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary text-[15px]">
            Get Started Free
          </a>
          <Link href="/lms" className="btn btn-ghost text-[15px]">
            Open the App
            <FeatureIcon name="mobile" tint="#102033" size={17} />
          </Link>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-[13.5px] font-600 text-[#2B3950]">
          <span className="inline-flex items-center gap-2"><FeatureIcon name="checkmark" tint="#22C55E" size={17} />Web + Android + iOS</span>
          <span className="inline-flex items-center gap-2"><FeatureIcon name="checkmark" tint="#22C55E" size={17} />English · Tamil · Sinhala</span>
          <span className="inline-flex items-center gap-2"><FeatureIcon name="checkmark" tint="#22C55E" size={17} />Live in production</span>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/* At a glance                                                       */
/* --------------------------------------------------------------- */

function Glance() {
  return (
    <section className="container-edge mt-8 sm:mt-12">
      {/* Stat band */}
      <div className="glass-strong rounded-[32px] p-7 sm:p-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="heading" style={{ fontSize: "clamp(30px,3.6vw,48px)" }}>
                <em><PlatformStat value={s.value} suffix={s.suffix} /></em>
              </p>
              <p className="mt-1.5 text-[13.5px] font-600 text-[#2B3950]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* At-a-glance grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GLANCE.map((g) => (
          <div key={g.label} className="glass rounded-2xl p-5 flex items-start gap-4">
            <span className="inline-flex w-11 h-11 rounded-xl items-center justify-center shrink-0" style={{ background: `${g.tint}1A` }}>
              <FeatureIcon name={g.icon} tint={g.tint} size={22} />
            </span>
            <div>
              <p className="text-[12px] font-700 uppercase tracking-wide text-[#5A6A82]">{g.label}</p>
              <p className="mt-0.5 text-[14px] text-[#102033] font-600 leading-snug">{g.value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/* Feature group (reused for students + tutors)                      */
/* --------------------------------------------------------------- */

function FeatureGroup({
  eyebrow, title, sub, features,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub: string;
  features: Feature[];
}) {
  return (
    <section className="container-edge mt-20 sm:mt-24">
      <div className="text-center max-w-2xl mx-auto">
        <p className="eyebrow justify-center"><span className="dot" />{eyebrow}</p>
        <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>{title}</h2>
        <p className="mt-4 text-[15px] text-[#2B3950] leading-relaxed">{sub}</p>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="glass lift rounded-2xl p-6 h-full">
            <span className="inline-flex w-12 h-12 rounded-2xl items-center justify-center" style={{ background: `${f.tint}1A` }}>
              <FeatureIcon name={f.icon} tint={f.tint} size={24} />
            </span>
            <h3 className="heading mt-4 text-[17px]">{f.title}</h3>
            <ul className="mt-3 space-y-2">
              {f.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[13.5px] text-[#2B3950] leading-[1.6]">
                  <FeatureIcon name="checkmark" tint={f.tint} size={15} className="mt-0.5 shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/* Payments feature block                                            */
/* --------------------------------------------------------------- */

function Payments() {
  return (
    <section className="container-edge mt-16 sm:mt-20">
      <div className="glass-strong rounded-[32px] p-8 sm:p-12">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow justify-center"><span className="dot" />Payments &amp; Wallet</p>
          <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>Billing that is <em>fair and clear.</em></h2>
          <p className="mt-4 text-[15px] text-[#2B3950] leading-relaxed">
            Pay any way you like, see exactly what you owe, and never lose a rupee to a rounding surprise.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {PAYMENT_POINTS.map((p) => (
            <div key={p.title} className="glass rounded-2xl p-6 flex items-start gap-4">
              <span className="inline-flex w-12 h-12 rounded-2xl items-center justify-center shrink-0" style={{ background: `${p.tint}1A` }}>
                <FeatureIcon name={p.icon} tint={p.tint} size={24} />
              </span>
              <div>
                <h3 className="heading text-[16px]">{p.title}</h3>
                <p className="mt-1.5 text-[13.5px] text-[#2B3950] leading-[1.65]">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/* What makes EDUS different                                         */
/* --------------------------------------------------------------- */

function Different() {
  return (
    <section className="container-edge mt-20 sm:mt-24">
      <div className="text-center max-w-2xl mx-auto">
        <p className="eyebrow justify-center"><span className="dot" />Why EDUS</p>
        <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>What makes EDUS <em>different.</em></h2>
        <p className="mt-4 text-[15px] text-[#2B3950] leading-relaxed">
          A working platform, not a roadmap - designed for the way Sri Lankan students and tutors actually learn and teach.
        </p>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {DIFFERENT.map((d) => (
          <div key={d.title} className="glass lift rounded-2xl p-6 h-full">
            <span className="inline-flex w-12 h-12 rounded-2xl items-center justify-center" style={{ background: `${d.tint}1A` }}>
              <FeatureIcon name={d.icon} tint={d.tint} size={24} />
            </span>
            <h3 className="heading mt-4 text-[16.5px]">{d.title}</h3>
            <p className="mt-2 text-[13.5px] text-[#2B3950] leading-[1.7]">{d.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/* FAQ                                                               */
/* --------------------------------------------------------------- */

function Faq() {
  return (
    <section className="container-edge mt-20 sm:mt-24">
      <div className="text-center max-w-2xl mx-auto">
        <p className="eyebrow justify-center"><span className="dot" />FAQ</p>
        <h2 className="heading mt-4" style={{ fontSize: "var(--fs-display)" }}>The platform, <em>answered.</em></h2>
      </div>
      <div className="mt-10 max-w-3xl mx-auto space-y-3">
        {FAQ.map((f) => (
          <details key={f.q} className="glass rounded-2xl p-5 group">
            <summary className="list-none flex items-center justify-between gap-3 cursor-pointer">
              <span className="heading text-[15px] flex-1">{f.q}</span>
              <span aria-hidden className="inline-flex w-7 h-7 rounded-full items-center justify-center bg-white text-[#2563EB] text-[16px] font-700 shrink-0 group-open:rotate-45 transition">+</span>
            </summary>
            <p className="mt-3 text-[13.5px] text-[#2B3950] leading-[1.7]">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- */
/* Final CTA                                                         */
/* --------------------------------------------------------------- */

function FinalCta() {
  return (
    <section className="container-edge mt-20 sm:mt-24 mb-16">
      <div className="relative rounded-[36px] glass-strong p-8 sm:p-14 overflow-hidden text-center">
        <div aria-hidden className="absolute inset-0 -z-10">
          <span className="blob" style={{ top: "-8%", left: "-4%", width: 240, height: 240, background: "#2563EB", opacity: 0.18 }} />
          <span className="blob" style={{ top: "-8%", right: "-4%", width: 240, height: 240, background: "#8B5CF6", opacity: 0.18 }} />
          <span className="blob" style={{ bottom: "-12%", left: "38%", width: 220, height: 220, background: "#06B6D4", opacity: 0.16 }} />
        </div>
        <p className="eyebrow justify-center"><span className="dot" />Start Learning</p>
        <h2 className="heading mt-5" style={{ fontSize: "clamp(28px,3.2vw,42px)", lineHeight: 1.14 }}>
          Bring your classes onto <em>one platform.</em>
        </h2>
        <p className="mt-4 text-[#2B3950] text-[15px] max-w-2xl mx-auto leading-relaxed">
          Download the EDUS app for Android or iOS and start today.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <a href={PLAY_URL} target="_blank" rel="noopener noreferrer" aria-label="Get EDUS on Google Play" className="transition-transform hover:-translate-y-0.5">
            <img src="/badges/google-play.png" alt="Get it on Google Play" width={216} height={64} className="h-[52px] w-auto" />
          </a>
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" aria-label="Download EDUS on the App Store" className="transition-transform hover:-translate-y-0.5">
            <img src="/badges/app-store.png" alt="Download on the App Store" width={216} height={64} className="h-[52px] w-auto" />
          </a>
        </div>
      </div>
    </section>
  );
}
