import { ContactForm } from "@/components/shared/ContactForm";
import { JsonLdScript, breadcrumbList, contactPage } from "@/components/layout/StructuredData";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactCountries } from "@/components/contact/ContactCountries";
import { ContactMap } from "@/components/contact/ContactMap";
import { ContactCTA } from "@/components/contact/ContactCTA";

export const metadata = {
  title: "Contact EDUS | Online Classes, Admissions & Global Student Support",
  description:
    "Contact EDUS for online classes, admissions, one-to-one tutoring, group classes, student support, and global learning inquiries. Reach EDUS Sri Lanka, India, Maldives, or Global Support.",
  alternates: { canonical: "/contact" },
  keywords: [
    "contact EDUS",
    "EDUS contact",
    "EDUS phone number",
    "EDUS email",
    "EDUS Sri Lanka contact",
    "EDUS India contact",
    "EDUS Maldives contact",
    "EDUS global support",
    "online tuition contact",
    "online classes admissions",
    "EDUS student admissions",
    "EDUS parent inquiry",
    "EDUS tutor inquiry",
    "EDUS partnership inquiry",
    "Jaffna online tuition office",
    "Kokkuvil Junction EDUS",
    "EDUS office address",
    "talk to EDUS team",
    "EDUS academic team contact",
    "EDUS support hotline",
  ],
};

export default function ContactPage() {
  return (
    <>
      <JsonLdScript
        data={breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <JsonLdScript data={contactPage()} />

      <ContactHero />
      <ContactCountries />
      <ContactMap />
      <ContactForm />
      <ContactCTA />
    </>
  );
}
