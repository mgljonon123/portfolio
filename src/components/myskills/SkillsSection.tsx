"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SkillBar from "./SkillBar";
import CubeAnimation from "./CubeAnimation";

interface Skill {
  name: string;
  percentage: number; // Maps to "proficiency" from the API
}

const SkillsSection: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]); // State to hold fetched skills
  const [isLoading, setIsLoading] = useState(true); // Optional: Loading state
  const [error, setError] = useState<string | null>(null); // Optional: Error state

  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const token = localStorage.getItem("token"); // Get auth token if required
        const response = await fetch("/api/skills", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (!response.ok) {
          throw new Error("Failed to fetch skills");
        }

        const data = await response.json();
        // Map API data to Skill interface (proficiency -> percentage)
        const fetchedSkills: Skill[] = data.map((skill: any) => ({
          name: skill.name,
          percentage: skill.proficiency,
        }));
        setSkills(fetchedSkills);
        setError(null);
      } catch (err) {
        console.error("Error fetching skills:", err);
        setError("Failed to load skills. Please try again later.");
        // Optional: Fallback to hardcoded skills on error
        setSkills([
          { name: "React", percentage: 90 },
          { name: "TypeScript", percentage: 87 },
          { name: "JavaScript", percentage: 95 },
          { name: "HTML/CSS", percentage: 92 },
          { name: "Node.js", percentage: 85 },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, []); // Empty dependency array to fetch once on mount

  useEffect(() => {
    if (skillsRef.current && skills.length > 0) {
      gsap.fromTo(
        skillsRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: "power4.out",
        }
      );
    }
  }, [skills]); // Run animation when skills are updated

  return (
    <section className="px-36 py-9 mx-auto max-w-none min-h-screen bg-black max-md:p-5 max-md:max-w-[991px] max-sm:p-4 max-sm:max-w-screen-sm">
      <div className="relative mx-auto my-0 max-w-[1208px] max-sm:w-full mt-20">
        <header>
          <div className="px-4 py-2.5 mx-auto my-0 text-lg font-bold rounded-xl border-solid bg-zinc-800 border-[0.5px] border-pink-50 border-opacity-20 text-stone-300 w-fit">
            My skills
          </div>
          <h2 className="mt-3.5 text-2xl font-bold text-center text-white max-sm:text-xl">
            Technical Expertise
          </h2>
          <p className="mt-3 text-lg font-thin text-center text-white max-sm:text-base">
            I showcase technical skills here
          </p>
        </header>

        {isLoading ? (
          <div className="flex justify-center items-center mt-24">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center mt-24">{error}</div>
        ) : (
          <div
            className="flex gap-36 justify-between mt-24 max-md:flex-col max-md:gap-10 max-md:items-center"
            ref={skillsRef}
          >
            <div className="flex flex-col gap-7 w-[494px] max-sm:w-full">
              {skills.map((skill, index) => (
                <SkillBar
                  key={index}
                  name={skill.name}
                  percentage={skill.percentage}
                />
              ))}
            </div>
            <div className="relative top-[120px] left-[-300px]">
              <CubeAnimation />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
