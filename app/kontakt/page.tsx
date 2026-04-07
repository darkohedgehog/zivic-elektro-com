import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactLocations } from "@/components/contact/ContactLocations";
import { ContactMap } from "@/components/contact/ContactMap";
import { ContactShopCTA } from "@/components/contact/ContactShopCTA";
import { ContactSupport } from "@/components/contact/ContactSupport";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Kontakt i poslovne informacije",
  description:
    "Kontakt stranica tvrtke Živić-elektro j.d.o.o. sa veleprodajnim i maloprodajnim informacijama, mapom lokacije i pristupom online shopu.",
  path: "/kontakt",
});

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactLocations />
      <ContactSupport />
      <ContactMap />
      <ContactShopCTA />
    </>
  );
}
