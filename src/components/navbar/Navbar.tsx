"use client";
import * as React from "react";
import { useState } from "react";
import ContactButton from "./contactmebutton";

interface NavLinkProps {
  text: string;
}

const NavLink: React.FC<NavLinkProps> = ({ text }) => {
  return (
    <button className="text-lg font-bold text-black hover:text-orange-600 transition-colors cursor-pointer">
      {text}
    </button>
  );
};

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-50% absolute z-[98] left-[600px]">
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap"
        rel="stylesheet"
      />

      <div className="flex justify-end items-center px-6 py-4">
        <div className="flex gap-11 items-center max-sm:hidden">
          <NavLink text="Blog" />
          <NavLink text="About me" />
          <NavLink text="Skills" />
          <NavLink text="Projects" />
          <NavLink text="Portfolio" />
          <ContactButton></ContactButton>
        </div>

        <button
          className="hidden max-sm:block text-2xl cursor-pointer"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <i className="ti ti-menu-2" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
