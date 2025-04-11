"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const abitRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const bulletMeRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const [bio, setBio] = useState<string>("Loading bio...");

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token);

        const response = await fetch("/api/about", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        console.log("Response status:", response.status);
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched data:", data);
          setBio(data.bio || "Your bio will appear here.");
        } else {
          console.error("Failed to fetch bio data, status:", response.status);
          setBio("Failed to load bio data.");
        }
      } catch (error) {
        console.error("Error fetching bio data:", error);
        setBio("Failed to load bio data.");
      }
    };

    fetchBio();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left",
          duration: 1,
          scrollTrigger: {
            trigger: bgRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        card1Ref.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: card1Ref.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        card2Ref.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: card2Ref.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        abitRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: abitRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        aboutRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        bulletMeRef.current,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: bulletMeRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: descRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        lineRef.current,
        { width: 0 },
        {
          width: "66px",
          duration: 0.8,
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        contactRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-[2067.63px] h-[1033.68px] left-[00px]"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{
          width: "2633.59px",
          height: "700px",
          transform: "rotate(11deg)",
          transformOrigin: "top left",
          background: "black",
          left: "-90px",
        }}
      />
      <div className="relative left-[-250px]">
        <div
          ref={card1Ref}
          className="absolute w-[300px] h-[378px] left-[494px] top-[290px] bg-[#C4C4C4] rounded-[10px]"
        />
        <div
          ref={card2Ref}
          className="absolute w-[300px] h-[378px] left-[824px] top-[407px] bg-[#C4C4C4] rounded-[10px]"
        />
        <div
          ref={descRef}
          className="absolute w-[484px] left-[1234px] top-[392px] text-white text-lg font-['Roboto'] font-normal leading-[29px] break-words z-10"
        >
          {bio}
        </div>
        <div
          ref={abitRef}
          className="absolute left-[1234px] top-[265px] text-[#EC651B] text-lg font-['Roboto_Mono'] font-normal uppercase leading-[22px] tracking-[6px] break-words"
        >
          A BIT
        </div>
        <div
          ref={buttonRef}
          className="absolute w-[223px] h-[65px] left-[1235px] top-[608px] origin-top-left bg-[#EC651B] rounded-[10px] shadow-[0px_1.85px_3.15px_rgba(68,68,68,0.02)]"
        />
        <div
          ref={aboutRef}
          className="absolute left-[1234px] top-[312px] text-white text-[52px] font-['Roboto_Mono'] italic font-light leading-[65px] tracking-[5px] break-words"
        >
          About
        </div>
        <div ref={bulletMeRef} className="absolute left-[1406px] top-[312px]">
          <span className="text-white text-[52px] font-['Roboto_Mono'] font-extralight leading-[65px] tracking-[5px] break-words">
            •
          </span>
          <span className="text-white text-[52px] font-['Roboto_Mono'] font-light leading-[65px] tracking-[5px] break-words">
            Me
          </span>
        </div>
        <div
          ref={lineRef}
          className="absolute w-[66px] h-[6px] left-[1233px] top-[371px] bg-[#D75E1B]"
        />
        <div
          ref={contactRef}
          className="absolute left-[1267px] top-[626px] text-white text-lg font-['Roboto_Mono'] font-bold uppercase leading-7 tracking-[1.8px] break-words"
        >
          Contact me
        </div>
      </div>
    </div>
  );
}
