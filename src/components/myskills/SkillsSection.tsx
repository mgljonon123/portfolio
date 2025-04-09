"use client";

import React from "react";
import SkillBar from "./SkillBar";

interface Skill {
  name: string;
  percentage: number;
}

const SkillsSection: React.FC = () => {
  const skills: Skill[] = [
    { name: "React", percentage: 90 },
    { name: "TypeScript", percentage: 87 },
    { name: "JavaScript", percentage: 95 },
    { name: "HTML/CSS", percentage: 92 },
    { name: "Node.js", percentage: 85 },
  ];

  return (
    <section className=" px-36 py-9 mx-auto max-w-none min-h-screen bg-zinc-800 max-md:p-5 max-md:max-w-[991px] max-sm:p-4 max-sm:max-w-screen-sm">
      <div className="relative mx-auto my-0 max-w-[1208px] max-sm:w-full">
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

        <div className="flex gap-36 justify-between mt-24 max-md:flex-col max-md:gap-10 max-md:items-center">
          <div className="flex flex-col gap-7 w-[494px] max-sm:w-full">
            {skills.map((skill, index) => (
              <SkillBar
                key={index}
                name={skill.name}
                percentage={skill.percentage}
              />
            ))}
          </div>
          <div className="bg-zinc-300 h-[303px] w-[564px] max-md:w-full max-md:max-w-[564px]" />
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
