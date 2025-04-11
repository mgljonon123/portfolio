"use client";

import React, { useEffect, useRef, useState } from "react";

const HeroSection: React.FC = () => {
  // Create a ref to target the section element.
  const sectionRef = useRef<HTMLElement>(null);
  // A state variable to keep track whether the section is visible.
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When the section is in view, update the state.
            setIsVisible(true);
            // Optionally unobserve once the animation has triggered.
            observer.unobserve(section);
          }
        });
      },
      { threshold: 0.2 } // Change the threshold based on when you want the animation to trigger.
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`flex justify-between items-start p-8 max-sm:flex-col max-sm:p-5 transition-all duration-1000 ease-in-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="flex flex-col">
        <h1 className="text-9xl leading-tight text-black max-md:text-8xl max-sm:text-6xl">
          Porto
        </h1>
        <p className="mt-5 text-2xl text-black max-md:text-xl max-sm:mt-4 max-sm:text-lg">
          Creating exceptional digital experiences through and technology
        </p>
      </div>
      <address className="flex flex-col gap-5 mt-16 max-md:mt-10 max-sm:mt-8 max-sm:w-full not-italic">
        <div className="flex items-center text-2xl text-black max-md:text-xl max-sm:text-base">
          <span className="mr-1.5 w-6">E:</span>
          <button className="hover:underline">b.tuguldur2015@gmail.com</button>
        </div>
        <div className="flex items-center text-2xl text-black max-md:text-xl max-sm:text-base">
          <span className="mr-1.5 w-6">P:</span>
          <button className="hover:underline">+976 99999918</button>
          <span className="mx-1.5 my-0">,</span>
          <button className="hover:underline">99991385</button>
        </div>
      </address>
    </section>
  );
};

export default HeroSection;
