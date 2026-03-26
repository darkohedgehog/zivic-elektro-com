import { BusinessOverviewSection } from "@/components/mainpage/BusinessOverviewSection";
import { HeroSection } from "@/components/mainpage/HeroSection";
import { ServicesSection } from "@/components/mainpage/ServicesSection";


export default function Home() {
  return (
    <>
     <HeroSection />
     <BusinessOverviewSection />
     <ServicesSection />
    </>
  );
}
