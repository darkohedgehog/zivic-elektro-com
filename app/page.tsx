import type { Metadata } from "next";
import { BusinessOverviewSection } from "@/components/mainpage/BusinessOverviewSection";
import { FeaturedCategoriesSection } from "@/components/mainpage/FeaturedCategoriesSection";
import { HeroSection } from "@/components/mainpage/HeroSection";
import { ServicesSection } from "@/components/mainpage/ServicesSection";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Elektromaterijal, poslovne usluge i internetska trgovina",
  description:
    "Živić-elektro predstavlja elektromaterijal, kategorije proizvoda, poslovne usluge i pristup internetskoj trgovini za privatne i poslovne kupce.",
  path: "/",
});

export default function Home() {
  return (
    <>
     <HeroSection />
     <BusinessOverviewSection />
     <ServicesSection />
     <FeaturedCategoriesSection />
    </>
  );
}
