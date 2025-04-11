import React from "react";

interface IconButtonProps {
  svgContent: string;
  ariaLabel: string;
  onClick?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  svgContent,
  ariaLabel,
  onClick,
}) => {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className="focus:outline-none focus:ring-2 focus:ring-violet-500 rounded-full transition-transform hover:scale-110"
      onClick={onClick}
    >
      <div dangerouslySetInnerHTML={{ __html: svgContent }} />
    </button>
  );
};

export default IconButton;
