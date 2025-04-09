import React from "react";

interface RatingBarProps {
  stars: number;
  percentage: number;
  width: string; // This will need to be adjusted externally
}

const RatingBar: React.FC<RatingBarProps> = ({ stars, percentage, width }) => {
  const isOneStar = stars === 1;

  return (
    <div className="flex items-center">
      {/* Reduced font size and width */}
      <div
        className={`text-[10px] font-semibold text-black  text-opacity-50 ${
          stars === 1 ? "w-[30px]" : "w-[32px]"
        }`}
      >
        {stars} star
      </div>
      {/* Reduced progress bar size */}
      <div
        className="relative mx-2 h-3 w-[90px]" // Adjusted height and width
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${stars} star rating: ${percentage}%`}
      >
        <div className="absolute rounded-3xl bg-zinc-200 size-full" />
        {isOneStar ? (
          <div
            className="absolute top-px left-px h-2.5 bg-orange-600 rounded-[40px]" // Adjusted height
            style={{ width }} // Width needs to be scaled externally
          />
        ) : (
          <div
            className="absolute h-full bg-orange-600 rounded-3xl"
            style={{ width }} // Width needs to be scaled externally
          />
        )}
      </div>
      {/* Reduced font size */}
      <div className="text-[10px] font-semibold text-black text-opacity-50">
        {percentage}%
      </div>
    </div>
  );
};

export default RatingBar;
