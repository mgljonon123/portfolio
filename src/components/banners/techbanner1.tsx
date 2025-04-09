"use client";
import * as React from "react";

interface TechBannerProps {
  mt?: string;
  text?: string[];
}

function TechBanner({ mt = "mt-0", text = [] }: TechBannerProps) {
  return (
    <section
      className={`relative z-10 flex justify-center items-center w-full bg-white h-[148px] ${mt}`}
      aria-label="Technology stack"
    >
      <div className="flex gap-6 items-center text-6xl font-bold text-black max-md:text-5xl max-sm:text-3xl">
        {text.map((item, index) => (
          <React.Fragment key={item}>
            <span>{item}</span>
            {index < text.length - 1 && <span aria-hidden="true">•</span>}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

export default TechBanner;
