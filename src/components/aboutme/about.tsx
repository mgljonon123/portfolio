// src/app/about/page.js
"use client";

import React from "react";
import Navbar from "../navbar/Navbar";
import CustomerReviews from "./stat/CustomerReviews";

export default function About() {
  return (
    <div className="relative w-[2067.63px] h-[1033.68px] left-[00px] ">
      {/* Background Rectangle */}
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
      <div className="relative left-[-250px]">
        <div className="absolute w-[300px] h-[378px] left-[494px] top-[290px] bg-[#C4C4C4] rounded-[10px]" />
        <div className="absolute w-[300px] h-[378px] left-[824px] top-[407px] bg-[#C4C4C4] rounded-[10px]" />
        {/* Description Text */}
        <div className="absolute w-[484px] left-[1234px] top-[392px] text-white text-lg font-['Roboto'] font-normal leading-[29px] break-words">
          From they fine john he give of rich he. They age and draw mrs like.
          Improving end distrusts may instantly was household applauded
          incommode. Why kept very ever home mrs. Considered sympathize ten
          uncommonly occasional assistance sufficient not.
        </div>
        {/* "A BIT" Text */}
        <div className="absolute left-[1234px] top-[265px] text-[#EC651B] text-lg font-['Roboto_Mono'] font-normal uppercase leading-[22px] tracking-[6px] break-words">
          A BIT
        </div>
        {/* Orange Button */}
        <div className="absolute w-[223px] h-[65px] left-[1457px] top-[672px] origin-top-left rotate-180 bg-[#EC651B] rounded-[10px] shadow-[0px_1.85px_3.15px_rgba(68,68,68,0.02)]" />
        {/* "About" Text */}
        <div className="absolute left-[1234px] top-[312px] text-white text-[52px] font-['Roboto_Mono'] italic font-light leading-[65px] tracking-[5px] break-words">
          About
        </div>
        {/* Bullet and "Me" Text */}
        <div className="absolute left-[1406px] top-[312px]">
          <span className="text-white text-[52px] font-['Roboto_Mono'] font-extralight leading-[65px] tracking-[5px] break-words">
            •
          </span>
          <span className="text-white text-[52px] font-['Roboto_Mono'] font-light leading-[65px] tracking-[5px] break-words">
            Me
          </span>
        </div>
        {/* White Rectangle with Reviews */}
        {/* Orange Line */}
        <div className="absolute w-[66px] h-[6px] left-[1233px] top-[371px] bg-[#D75E1B]" />
        {/* "Contact me" Text */}
        <div className="absolute left-[1267px] top-[626px] text-white text-lg font-['Roboto_Mono'] font-bold uppercase leading-7 tracking-[1.8px] break-words">
          Contact me
        </div>
      </div>
    </div>
  );
}
