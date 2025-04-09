// src/app/page.js
"use client";

import About from "@/components/aboutme/about";
import CustomerReviews from "@/components/aboutme/stat/CustomerReviews";
import TechBanner from "@/components/banners/techbanner1";
import HeroSection from "@/components/herosection/HeroSection";
import TechnicalSkills from "@/components/myskills/TechnicalSkills";
import ProjectShowcase from "@/components/projects/ProjectShowcase";
import ImageSlider from "@/components/projectuuud/imgslider/ImageSlider";

export default function Page() {
  return (
    <div className="z-1">
      <HeroSection></HeroSection>
      <TechBanner
        mt="mt-35"
        text={["TypeScript", "React", "Node.Js"]}
      ></TechBanner>
      <ProjectShowcase></ProjectShowcase>
      <TechBanner
        mt="mt-0"
        text={["Next.js", "Tailwind", "Prisma"]}
      ></TechBanner>
      <About></About>
      <CustomerReviews></CustomerReviews>
      <TechBanner
        mt="-0"
        text={["Productive", "Optimistic", "Phsycologist"]}
      ></TechBanner>
      <TechnicalSkills></TechnicalSkills>
    </div>
  );
}
