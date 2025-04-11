"use client";
import * as React from "react";
import RatingBar from "./RatingBar";

const CustomerReviews: React.FC = () => {
  const ratings = [
    { stars: 5, percentage: 95, width: "75px" }, // Scaled from 101px
    { stars: 4, percentage: 30, width: "53px" }, // Scaled from 71px
    { stars: 3, percentage: 25, width: "33px" }, // Scaled from 45px
    { stars: 2, percentage: 5, width: "13px" }, // Scaled from 17px
    { stars: 1, percentage: 0, width: "4px" }, // Scaled from 5px
  ];

  return (
    <section className="flex flex-col p-1 bg-white rounded-xl h-[203px] w-[198px] relative z-10 absolute top-[-850px] left-[575px]">
      <header className="px-9 py-1 mb-4 text-sm font-semibold text-black text-opacity-80 font-['Roboto']">
        Customer reviews
      </header>
      <div className="flex flex-col gap-2 px-2">
        {ratings.map((rating) => (
          <RatingBar
            key={rating.stars}
            stars={rating.stars}
            percentage={rating.percentage}
            width={rating.width}
          />
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;
