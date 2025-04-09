"use client";

import React from "react";
import NavigationMenu from "./NavigationMenu";
import HeroSection from "./HeroSection";

const ProfileHeader: React.FC = () => {
  return (
    <header className="flex overflow-hidden flex-col pt-16 w-full bg-zinc-100 max-md:max-w-full">
      <NavigationMenu />
      <HeroSection />
    </header>
  );
};

export default ProfileHeader;
