"use client";

import React from "react";
import HeroSection from "./HeroSection";
import CopyrightSection from "./CopyrightSection";

const PortoLanding: React.FC = () => {
  return (
    <main className="mx-auto my-0 w-full ">
      <HeroSection />
      <CopyrightSection />
    </main>
  );
};

export default PortoLanding;
