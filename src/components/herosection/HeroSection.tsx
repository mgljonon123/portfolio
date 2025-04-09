"use client";
import React from "react";
import profpic from "../../../public/prof.png";
import Image from "next/image";
const HeroSection: React.FC = () => {
  return (
    <section className="relative flex flex-col px-20 pt-10 pb-4 w-full min-h-[872px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <div
        className="absolute inset-0 z-0"
        style={{
          width: "2633.59px",
          height: "700px",
          transform: "rotate(11deg)",
          transformOrigin: "top left",
          background: "black",
        }}
      />

      <div className="relative z-10 w-full max-md:max-w-full mt-10">
        <div className="flex gap-5 max-md:flex-col">
          <div className="w-[43%] max-md:ml-0 max-md:w-full">
            <div className="relative self-stretch my-auto mt-80">
              <div className="flex max-md:flex-col">
                <div className="w-4/5 max-md:w-full">
                  <div className="flex relative flex-col font-bold text-white">
                    <h2 className="self-start text-4xl text-center font-roboto-mono">
                      Hi, I am
                    </h2>
                    <h1 className="text-7xl max-md:text-4xl font-roboto-mono">
                      Tuguldur
                    </h1>
                    <div className="flex shrink-0 bg-zinc-300 h-[5px] w-[95px]" />
                    <p className="text-2xl text-neutral-400 max-md:mr-2.5 tracking-[5px] w-[500px] font-roboto-mono">
                      Full-Stack Developer / UI Designer
                    </p>
                  </div>
                </div>
                <div className="w-1/5 max-md:w-full relative">
                  <div className="mt-14 text-7xl font-thin text-center text-white max-md:mt-10 max-md:text-4xl font-roboto-mono absolute left-[-220px] top-[-15px]">
                    .B
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ml-5 w-[57%] max-md:ml-0 max-md:w-full">
            <Image
              alt="profile picture"
              className="relative z-20 mx-auto max-w-full bg-zinc-300 h-[714px] w-[606px] max-md:mt-10 mt-10 ml-[300px] object-cover"
              aria-label="Profile image placeholder"
              src={profpic}
            ></Image>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
