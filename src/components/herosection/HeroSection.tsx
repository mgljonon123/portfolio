"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const dotBRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const [profpic, setProfpic] = useState("/profile-placeholder.svg"); // Default placeholder

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetch("/api/about");
        const data = await response.json();
        if (data.profileImage) {
          setProfpic(data.profileImage);
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };
    fetchProfileImage();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the inverted triangle background
      gsap.from(bgRef.current, {
        clipPath: "polygon(50% 0%, 50% 0%, 50% 0%)", // Start collapsed
        duration: 1.2,
        ease: "power3.out",
      });
      gsap.to(bgRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)", // Expand to inverted triangle
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(greetingRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
      });
      gsap.from(nameRef.current, {
        opacity: 0,
        x: -100,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      });
      gsap.from(lineRef.current, {
        width: 0,
        duration: 0.8,
        delay: 0.7,
        ease: "power2.out",
      });
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.9,
        ease: "power2.out",
      });
      gsap.from(dotBRef.current, {
        opacity: 0,
        rotation: -180,
        duration: 1,
        delay: 1.1,
        ease: "elastic.out(1, 0.5)",
      });
      gsap.from(imageRef.current, {
        opacity: 0,
        scale: 0.8,
        x: 100,
        duration: 1.2,
        delay: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col px-20 pt-10 pb-4 w-full min-h-[872px] max-md:px-5 max-md:mt-10 max-md:max-w-full bg-gray-900"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{
          background: "black",
          clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)", // Inverted triangle
          height: "700px", // Adjust height as needed
        }}
      />
      <div className="relative z-10 w-full max-md:max-w-full mt-10">
        <div className="flex gap-5 max-md:flex-col">
          <div className="w-[43%] max-md:ml-0 max-md:w-full">
            <div className="relative self-stretch my-auto mt-80">
              <div className="flex max-md:flex-col">
                <div className="w-4/5 max-md:w-full">
                  <div className="flex relative flex-col font-bold text-white">
                    <h2
                      ref={greetingRef}
                      className="self-start text-4xl text-center font-roboto-mono"
                    >
                      Hi, I am
                    </h2>
                    <h1
                      ref={nameRef}
                      className="text-7xl max-md:text-4xl font-roboto-mono"
                    >
                      Tuguldur
                    </h1>
                    <div
                      ref={lineRef}
                      className="flex shrink-0 bg-zinc-300 h-[5px] w-[95px]"
                    />
                    <p
                      ref={titleRef}
                      className="text-2xl text-neutral-400 max-md:mr-2.5 tracking-[5px] w-[500px] font-roboto-mono"
                    >
                      Full-Stack Developer / UI Designer
                    </p>
                  </div>
                </div>
                <div className="w-1/5 max-md:w-full relative">
                  <div
                    ref={dotBRef}
                    className="mt-14 text-7xl font-thin text-center text-white max-md:mt-10 max-md:text-4xl font-roboto-mono absolute left-[-220px] top-[-15px]"
                  >
                    .
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ml-5 w-[57%] max-md:ml-0 max-md:w-full">
            <Image
              ref={imageRef}
              alt="profile picture"
              className="relative z-20 mx-auto max-w-full bg-zinc-300 max-md:mt-10 mt-10 ml-[300px] object-cover"
              aria-label="Profile image placeholder"
              src={profpic}
              width={606}
              height={1014}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
