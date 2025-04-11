// src/app/page.js
"use client";

import About from "@/components/aboutme/about";
import CustomerReviews from "@/components/aboutme/stat/CustomerReviews";
import TechBanner from "@/components/banners/techbanner1";
import Contact from "@/components/contact/Contact";
import PortoLanding from "@/components/footer/PortoLanding";
import HeroSection from "@/components/herosection/HeroSection";
import TechnicalSkills from "@/components/myskills/TechnicalSkills";
import Navbar from "@/components/navbar/Navbar";
import ProjectShowcase from "@/components/projects/ProjectShowcase";
import ProjectsShow from "@/components/projectuuud/realproject/projectshow";

export default function Page() {
  return (
    <div className="z-1 overflow-y-hidden">
      <Navbar></Navbar>
      <section id="">
        <HeroSection></HeroSection>
      </section>
      <TechBanner
        mt="mt-0"
        text={["TypeScript", "React", "Node.Js"]}
      ></TechBanner>
      <section id="blog">
        <ProjectShowcase></ProjectShowcase>
      </section>
      <TechBanner
        mt="mt-0"
        text={["Next.js", "Tailwind", "Prisma"]}
      ></TechBanner>
      <section id="about-me">
        <About></About>
      </section>
      <section id="">
        <CustomerReviews></CustomerReviews>
      </section>
      <TechBanner
        mt="-0"
        text={["Productive", "Optimistic", "Phsycologist"]}
      ></TechBanner>
      <section id="skills">
        <TechnicalSkills></TechnicalSkills>
      </section>
      <TechBanner mt="0" text={["Figma", "Github", "MongoDB"]}></TechBanner>
      <section id="projects">
        <ProjectsShow></ProjectsShow>
      </section>

      <TechBanner mt="mt-0" text={["Instagram", "X", "Facebook"]}></TechBanner>
      <section id="contact">
        <Contact></Contact>
      </section>
      <PortoLanding></PortoLanding>
    </div>
  );
}
