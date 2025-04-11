"use client";
import * as React from "react";

interface InputDesignProps {
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
}

function SubmitBtn({
  onClick,
  disabled = false,
  type = "button",
  ariaLabel = "Submit",
}: InputDesignProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className="flex mb-[200px] ml-[220px] gap-10 text-base font-bold tracking-widest text-center text-black whitespace-nowrap rounded-none max-w-[197px] border-none bg-transparent p-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
    >
      <div className="shrink-0 border-black border-solid border-[3px] h-[45px] w-[3px]" />
      <div className="my-auto">SUBMIT</div>
      <div className="shrink-0 self-start w-0 border-black border-solid border-[3px] h-[45px]" />
    </button>
  );
}

export default SubmitBtn;
