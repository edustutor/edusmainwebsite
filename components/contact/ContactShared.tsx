/**
 * Shared data for the /contact page.
 * Country offices, support routes, FAQs - one place to update.
 */

export const PRIMARY_EMAIL = "hello@edustutor.com";
export const SIGNUP_URL = "https://signup.edustutor.com/";

export type Country = {
  code: "sl" | "in" | "mv" | "gl";
  flag: string;
  name: string;
  region: string;
  phone?: string;
  phoneHref?: string;
  whatsapp?: string;
  whatsappHref?: string;
  email: string;
  address?: string;
  mapUrl?: string;
  hours?: string;
  supportAreas: string[];
  tint: string;
  tintSoft: string;
  buttonLabel: string;
  buttonHref: string;
};

export const COUNTRIES: Country[] = [
  {
    code: "sl",
    flag: "🇱🇰",
    name: "Sri Lanka Office",
    region: "Sri Lankan students, parents, group classes, individual classes, payments, and academic support.",
    phone: "+94 70 707 2072",
    phoneHref: "tel:+94707072072",
    email: PRIMARY_EMAIL,
    address: "No. 95, K.K.S Road, Kokkuvil Junction, Jaffna 40000, Sri Lanka",
    mapUrl:
      "https://www.google.com/maps/place/EDUS+Online+Tuition/@9.6945511,80.0139866,1102m/data=!3m1!1e3!4m6!3m5!1s0x3afe5583ee8b8b25:0xa0dd266c1a635c2!8m2!3d9.6945511!4d80.0139866!16s%2Fg%2F11rxydcz_s",
    hours: "Mon – Sat · 08:00 – 22:00 · Sun · 09:00 – 18:00",
    supportAreas: [
      "Sri Lankan National Syllabus group classes",
      "Individual online classes",
      "Grade 1 to A/L student admissions",
      "Payments and class fee support",
      "Parent updates and student coordination",
      "Tutor and academic inquiries",
    ],
    tint: "#2563EB",
    tintSoft: "#EEF6FF",
    buttonLabel: "Contact Sri Lanka Team",
    buttonHref: "/sl",
  },
  {
    code: "in",
    flag: "🇮🇳",
    name: "India Office",
    region:
      "Students and parents in India looking for EDUS online classes, English-medium learning support, and academic guidance.",
    phone: "+91 95000 10260",
    phoneHref: "tel:+919500010260",
    email: PRIMARY_EMAIL,
    hours: "Mon – Sat · 09:00 – 21:00 IST",
    supportAreas: [
      "India online class admissions",
      "Grade 6 to 10 learning inquiries",
      "Subject-wise class information",
      "English-medium online learning support",
      "Parent consultation and student guidance",
    ],
    tint: "#8B5CF6",
    tintSoft: "#F4EEFF",
    buttonLabel: "Contact India Team",
    buttonHref: "/in",
  },
  {
    code: "mv",
    flag: "🇲🇻",
    name: "Maldives Support",
    region:
      "Maldivian students and parents looking for EDUS online learning support, one-to-one tutoring, and international syllabus guidance.",
    email: PRIMARY_EMAIL,
    hours: "Mon – Sat · 08:00 – 22:00 (Maldives time)",
    supportAreas: [
      "One-to-one online tutoring",
      "Cambridge and Edexcel support",
      "International syllabus classes",
      "Flexible online learning guidance",
      "Parent and student inquiries",
    ],
    tint: "#22C55E",
    tintSoft: "#E8FAEC",
    buttonLabel: "Contact Maldives Support",
    buttonHref: "/mv",
  },
  {
    code: "gl",
    flag: "🌐",
    name: "EDUS Global Support",
    region:
      "Students from any country outside Sri Lanka, India, and Maldives who want to join EDUS for one-to-one online tutoring.",
    email: PRIMARY_EMAIL,
    hours: "Email support · Replies within one business day",
    supportAreas: [
      "Cambridge online tutoring",
      "Edexcel online tutoring",
      "IGCSE, GCSE, O-Level, AS Level, and A-Level support",
      "One-to-one tutoring for any syllabus",
      "Tutor matching based on student requirements",
      "Flexible class scheduling based on time zone",
    ],
    tint: "#06B6D4",
    tintSoft: "#E6FAFD",
    buttonLabel: "Apply for Global Classes",
    buttonHref: "/global",
  },
];

export type WhyContact = {
  icon: string;
  title: string;
  body: string;
  tint: string;
};

export const WHY_CONTACT: WhyContact[] = [
  {
    icon: "🎯",
    title: "To Find the Right Class",
    body: "We help students choose the correct class based on grade, syllabus, subject, medium, and learning requirement.",
    tint: "#2563EB",
  },
  {
    icon: "🧑‍🏫",
    title: "To Find the Right Tutor",
    body: "For individual and global students, EDUS helps match the student with a suitable tutor based on the subject and academic need.",
    tint: "#8B5CF6",
  },
  {
    icon: "💳",
    title: "To Understand Fees Clearly",
    body: "Our team explains class fees, payment cycles, and available learning options before enrollment.",
    tint: "#06B6D4",
  },
  {
    icon: "📞",
    title: "To Receive Continuous Support",
    body: "Parents and students can contact EDUS for class support, attendance, recordings, exams, app access, and academic guidance.",
    tint: "#22C55E",
  },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "How can I contact EDUS?",
    a: "You can contact EDUS through the country contact numbers, common email, online inquiry form, or student registration form.",
  },
  {
    q: "Does EDUS have separate contact details for each country?",
    a: "Yes. EDUS provides separate contact sections for Sri Lanka, India, and Maldives. Global students can contact EDUS through email and the online inquiry form.",
  },
  {
    q: "Can students from any country contact EDUS?",
    a: "Yes. Students from any country can contact EDUS for global one-to-one online tutoring, Cambridge, Edexcel, or any syllabus-based learning support.",
  },
  {
    q: "What details should I submit when asking about classes?",
    a: "Please share the student's country, grade, syllabus, subject, preferred medium, class type, and contact number with country code.",
  },
  {
    q: "Can parents contact EDUS before registering?",
    a: "Yes. Parents can contact EDUS first to understand class options, tutors, fees, timetables, and the best learning path for their child.",
  },
  {
    q: "How can I register as a student?",
    a: "Click the Register as a Student button and complete the student sign-up form. Our team will contact you after reviewing the details.",
  },
  {
    q: "Can I contact EDUS for one-to-one classes?",
    a: "Yes. EDUS offers one-to-one online tutoring for students from different countries, depending on subject, syllabus, tutor availability, and schedule.",
  },
  {
    q: "Can I contact EDUS for group classes?",
    a: "Yes. Students and parents can contact EDUS for group class details, availability, timetables, fees, and enrollment guidance.",
  },
];
