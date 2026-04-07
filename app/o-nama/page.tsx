import type { Metadata } from "next";
import { AboutBusinessModel } from "@/components/about/AboutBusinessModel";
import { AboutCompanyDetails } from "@/components/about/AboutCompanyDetails";
import { AboutDigitalSolutions } from "@/components/about/AboutDigitalSolutions";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutOffer } from "@/components/about/AboutOffer";
import { AboutStory } from "@/components/about/AboutStory";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "O nama",
  description:
    "Informacije o tvrtki Živić-elektro, dugogodišnjem iskustvu, ponudi, poslovnim pravcima i digitalnim rješenjima.",
  path: "/o-nama",
});

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
