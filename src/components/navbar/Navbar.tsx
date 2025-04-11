"use client";
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import ContactButton from "./contactmebutton";

interface NavLinkProps {
  text: string;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ text, onClick }) => {
  const linkRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (linkRef.current) {
      gsap.from(linkRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.out",
      });

      const hoverAnimation = gsap.to(linkRef.current, {
        scale: 1.05,
        color: "#f97316",
        duration: 0.3,
        paused: true,
      });

      linkRef.current.addEventListener("mouseenter", () =>
        hoverAnimation.play()
      );
      linkRef.current.addEventListener("mouseleave", () =>
        hoverAnimation.reverse()
      );

      return () => {
        linkRef.current?.removeEventListener("mouseenter", () =>
          hoverAnimation.play()
        );
        linkRef.current?.removeEventListener("mouseleave", () =>
          hoverAnimation.reverse()
        );
      };
    }
  }, []);

  return (
    <button
      ref={linkRef}
      onClick={onClick}
      className="text-lg font-bold text-black transition-colors cursor-pointer"
    >
      {text}
    </button>
  );
};

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(
      sectionId.toLowerCase().replace(" ", "-")
    );
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (navRef.current) {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }

    if (menuRef.current) {
      gsap.to(menuRef.current, {
        height: isMenuOpen ? "auto" : 0,
        opacity: isMenuOpen ? 1 : 0,
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [isMenuOpen]);

  return (
    <nav className="fixed top-0 w-full z-[98] bg-white">
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap"
        rel="stylesheet"
      />

      <div
        ref={navRef}
        className="flex justify-end items-center px-6 py-4 max-w-7xl mx-auto"
      >
        {/* Hamburger menu button */}
        <button
          className="sm:hidden text-2xl cursor-pointer mr-4"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>

        <div className="hidden sm:flex gap-11 items-center">
          <NavLink text="Blog" onClick={() => scrollToSection("blog")} />
          <NavLink
            text="About me"
            onClick={() => scrollToSection("about-me")}
          />
          <NavLink text="Skills" onClick={() => scrollToSection("skills")} />
          <NavLink
            text="Projects"
            onClick={() => scrollToSection("projects")}
          />
          <ContactButton />
        </div>
      </div>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className="sm:hidden flex flex-col items-center gap-4 pb-4 px-6 bg-white overflow-hidden"
      >
        <NavLink text="Blog" onClick={() => scrollToSection("blog")} />
        <NavLink text="About me" onClick={() => scrollToSection("about-me")} />
        <NavLink text="Skills" onClick={() => scrollToSection("skills")} />
        <NavLink text="Projects" onClick={() => scrollToSection("projects")} />
        <ContactButton />
      </div>
    </nav>
  );
};

export default Navbar;
