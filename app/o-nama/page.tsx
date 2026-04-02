import type { Metadata } from "next";
import { AboutBusinessModel } from "@/components/about/AboutBusinessModel";
import { AboutCompanyDetails } from "@/components/about/AboutCompanyDetails";
import { AboutDigitalSolutions } from "@/components/about/AboutDigitalSolutions";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutOffer } from "@/components/about/AboutOffer";
import { AboutStory } from "@/components/about/AboutStory";

export const metadata: Metadata = {
  title: "O nama",
  description:
    "Informacije o tvrtki Živić-elektro, dugogodišnjem iskustvu, ponudi, poslovnim pravcima i digitalnim rješenjima.",
};

export default function AboutUsPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutOffer />
      <AboutBusinessModel />
      <AboutDigitalSolutions />
      <AboutCompanyDetails />
    </>
  );
}
