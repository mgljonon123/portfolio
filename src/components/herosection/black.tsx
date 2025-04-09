"use client";
import * as React from "react";

/**
 * InputDesign Component
 *
 * A component that displays an image with specific aspect ratio and styling
 */
function InputDesign() {
  return (
    <figure className="w-full">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/cc0eb128d2871368318a9fb5d33f1d7a04bf82d8?placeholderIfAbsent=true&apiKey=1350e1d755d5477ab3153e814842d777"
        alt="Input design visualization"
        className="object-contain w-full aspect-[1.65]"
        loading="lazy"
      />
    </figure>
  );
}

export default InputDesign;
