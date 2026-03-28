import { BusinessOverviewSection } from "@/components/mainpage/BusinessOverviewSection";
import { FeaturedCategoriesSection } from "@/components/mainpage/FeaturedCategoriesSection";
import { HeroSection } from "@/components/mainpage/HeroSection";
import { ServicesSection } from "@/components/mainpage/ServicesSection";


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
