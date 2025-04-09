"use client";

import React from "react";

const NavigationMenu: React.FC = () => {
  return (
    <nav className="flex flex-wrap gap-10 items-center self-end mr-8 text-lg font-bold text-center text-black max-md:mr-2.5">
      <a
        href="#blog"
        className="self-stretch my-auto hover:text-orange-600 transition-colors"
      >
        Blog
      </a>
      <a
        href="#about"
        className="self-stretch my-auto hover:text-orange-600 transition-colors"
      >
        About me
      </a>
      <a
        href="#skills"
        className="self-stretch my-auto hover:text-orange-600 transition-colors"
      >
        Skills
      </a>
      <a
        href="#projects"
        className="self-stretch my-auto hover:text-orange-600 transition-colors"
      >
        Projects
      </a>
      <a
        href="#portfolio"
        className="self-stretch my-auto hover:text-orange-600 transition-colors"
      >
        Portfolio
      </a>
      <div className="self-stretch my-auto text-base rounded-[30px] w-[147px]">
        <a
          href="#contact"
          className="block px-4 py-3.5 bg-orange-600 border-4 border-orange-600 border-solid rounded-[30px] max-md:px-5 text-white hover:bg-orange-700 hover:border-orange-700 transition-colors"
          aria-label="Contact Me"
        >
          CONTACT ME
        </a>
      </div>
    </nav>
  );
};

export default NavigationMenu;
