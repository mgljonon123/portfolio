"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const CopyrightSection: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (footerRef.current && textRef.current) {
      // Create GSAP animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
          onLeaveBack: () => {
            gsap.set(textRef.current, { opacity: 1, y: 0, scale: 1 });
          },
          onEnter: () => {
            gsap.fromTo(
              textRef.current,
              { opacity: 0, y: 100, scale: 0.8 },
              { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power3.out" }
            );
          },
        },
      });

      // Initial state
      gsap.set(textRef.current, { opacity: 0, y: 100, scale: 0.8 });

      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, []);

  return (
    <footer
      ref={footerRef}
      className="pl-8 mt-20 text-black max-md:mt-52 max-sm:pl-5 max-sm:mt-24 flex items-center justify-center"
    >
      <p
        ref={textRef}
        className="text-[550px] leading-none max-md:text-[200px] max-sm:text-8xl"
      >
        ©2025
      </p>
    </footer>
  );
};

export default CopyrightSection;
