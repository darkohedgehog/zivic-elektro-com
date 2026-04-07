import type { Metadata } from "next";
import { ServicesBI } from "@/components/services/ServicesBI";
import { ServicesElectrical } from "@/components/services/ServicesElectrical";
import { ServicesFinalCTA } from "@/components/services/ServicesFinalCTA";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesMaintenance } from "@/components/services/ServicesMaintenance";
import { ServicesOverview } from "@/components/services/ServicesOverview";
import { ServicesWebDevelopment } from "@/components/services/ServicesWebDevelopment";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Usluge",
  description:
    "Pregled digitalnih usluga, BI rješenja i distribucije elektro materijala tvrtke Živić-elektro.",
  path: "/usluge",
});

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesOverview />
      <ServicesWebDevelopment />
      <ServicesMaintenance />
      <ServicesBI />
      <ServicesElectrical />
      <ServicesFinalCTA />
    </>
  );
}
