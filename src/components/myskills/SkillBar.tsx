"use client";

import React from "react";

interface SkillBarProps {
  name: string;
  percentage: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, percentage }) => {
  return (
    <div className="relative h-[35px] max-sm:mb-5">
      <div className="mb-1 text-lg font-bold text-white">{name}</div>
      <div className="relative mt-6 h-2.5">
        <div className="absolute w-full h-2.5 bg-white rounded-2xl" />
        <div
          className="absolute h-2.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="absolute top-0 right-0 text-lg font-bold text-white">
        {percentage}%
      </div>
    </div>
  );
};

export default SkillBar;
