"use client";
import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

interface TechBannerProps {
  mt?: string;
  text?: string[];
}

function TechBanner({ mt = "mt-0", text = [] }: TechBannerProps) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<HTMLSpanElement[]>([]);

  // Clear refs before mapping
  textRefs.current = [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (bannerRef.current && textRefs.current.length > 0) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: bannerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
            markers: false,
          },
        });

        textRefs.current.forEach((el, i) => {
          tl.fromTo(
            el,
            {
              x: "100%",
              opacity: 0,
            },
            {
              x: "0%",
              opacity: 1,
              duration: 1,
              ease: "power2.out",
            },
            i === 0 ? 0 : "-=0.8"
          );
        });
      }
    }, bannerRef);

    return () => ctx.revert(); // Clean up GSAP context
  }, [text]);

  return (
    <section
      ref={bannerRef}
      className={`relative z-10 flex justify-center items-center w-full bg-white h-[148px] ${mt}`}
      aria-label="Technology stack"
    >
      <div className="flex gap-6 items-center justify-center text-6xl font-bold text-black max-md:text-5xl max-sm:text-3xl overflow-hidden w-full max-w-7xl mx-auto ">
        {text.map((item, index) => (
          <React.Fragment key={`${item}-${index}`}>
            <span
              ref={(el) => el && textRefs.current.push(el)}
              className="inline-block whitespace-nowrap"
            >
              {item}
            </span>
            {index < text.length - 1 && (
              <span
                ref={(el) => el && textRefs.current.push(el)}
                aria-hidden="true"
                className="inline-block"
              >
                •
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

export default TechBanner;
