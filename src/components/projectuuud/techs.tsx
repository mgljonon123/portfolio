"use client";

import React from "react";
import AnimatedCard from "./AnimatedCard";
import FeaturedProject from "./pro2";

const Techs: React.FC = () => {
  return (
    <section className="flex justify-center align-center px-36 py-9 mx-auto max-w-none min-h-screen  max-md:p-5 max-md:max-w-[991px] max-sm:p-4 max-sm:max-w-screen-sm bg-zinc-500">
      <div className="relative mx-auto my-0 max-w-[1208px] max-sm:w-full">
        <header>
          <div className="px-4 py-2.5 mx-auto my-0 text-lg font-bold rounded-xl border-solid bg-zinc-800 border-[0.5px] border-pink-50 border-opacity-20 text-stone-300 w-fit">
            My skills
          </div>
          <h2 className="mt-3.5 text-2xl font-bold text-center text-black max-sm:text-xl">
            Technical Expertise
          </h2>
          <p className="mt-3 text-lg font-thin text-center text-black max-sm:text-base">
            I showcase technical skills here
          </p>
        </header>{" "}
        <FeaturedProject></FeaturedProject>
      </div>
    </section>
  );
};

export default Techs;
