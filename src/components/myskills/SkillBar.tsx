"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface SkillBarProps {
  name: string;
  percentage: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, percentage }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // Create an IntersectionObserver to trigger animation when in view
    const observer = new IntersectionObserver(
      (entries) => {
        // If the bar is in view, trigger the animation
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is in view
      }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => {
      if (barRef.current) {
        observer.unobserve(barRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (inView && barRef.current) {
      gsap.fromTo(
        barRef.current,
        { width: "0%" },
        {
          width: `${percentage}%`,
          duration: 1.8,
          ease: "power4.out",
        }
      );
    }
  }, [inView, percentage]);

  return (
    <div className="relative h-[35px] max-sm:mb-5">
      <div className="mb-0 text-lg font-regular text-white">{name}</div>
      <div className="relative mt-0 h-2.5">
        <div className="absolute w-full h-2.5 bg-white rounded-2xl" />
        <div
          ref={barRef}
          className="absolute h-2.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl"
        />
      </div>
      <div className="absolute top-0 right-0 text-lg font-bold text-white">
        {percentage}%
      </div>
    </div>
  );
};

export default SkillBar;
