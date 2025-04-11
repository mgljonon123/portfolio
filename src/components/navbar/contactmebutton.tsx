"use client";
import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ContactButton: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      // Initial animation
      gsap.from(buttonRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.out",
      });

      // Hover animation
      const hoverAnimation = gsap.to(buttonRef.current, {
        scale: 1.05,
        backgroundColor: "#f97316", // orange-600
        duration: 0.3,
        paused: true,
      });

      buttonRef.current.addEventListener("mouseenter", () =>
        hoverAnimation.play()
      );
      buttonRef.current.addEventListener("mouseleave", () =>
        hoverAnimation.reverse()
      );

      // Cleanup
      return () => {
        buttonRef.current?.removeEventListener("mouseenter", () =>
          hoverAnimation.play()
        );
        buttonRef.current?.removeEventListener("mouseleave", () =>
          hoverAnimation.reverse()
        );
      };
    }
  }, []);

  const handleClick = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className="px-6 py-2 bg-black text-white font-bold rounded-full transition-colors cursor-pointer"
    >
      Contact Me
    </button>
  );
};

export default ContactButton;
