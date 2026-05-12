/**
 * Shared data for the /contact page.
 * Country offices - one place to update.
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
  tint: string;
  tintSoft: string;
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
    hours: "Mon - Sat - 08:00 - 22:00 - Sun - 09:00 - 18:00",
    tint: "#2563EB",
    tintSoft: "#EEF6FF",
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
    hours: "Mon - Sat - 09:00 - 21:00 IST",
    tint: "#8B5CF6",
    tintSoft: "#F4EEFF",
  },
  {
    code: "mv",
    flag: "🇲🇻",
    name: "Maldives Support",
    region:
      "Maldivian students and parents looking for EDUS online learning support, one-to-one tutoring, and international syllabus guidance.",
    email: PRIMARY_EMAIL,
    hours: "Mon - Sat - 08:00 - 22:00 (Maldives time)",
    tint: "#22C55E",
    tintSoft: "#E8FAEC",
  },
  {
    code: "gl",
    flag: "🌐",
    name: "EDUS Global Support",
    region:
      "Students from any country outside Sri Lanka, India, and Maldives who want to join EDUS for one-to-one online tutoring.",
    email: PRIMARY_EMAIL,
    hours: "Email support - Replies within one business day",
    tint: "#06B6D4",
    tintSoft: "#E6FAFD",
  },
];

