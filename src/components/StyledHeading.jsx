import React from "react";

/**
 * StyledHeading - A large, stylized heading component for use across all sections
 *
 * @param {Object} props
 * @param {string} props.text - The heading text
 * @param {string} [props.number] - Optional number badge to display
 * @param {string} [props.color] - Optional color override for the heading text
 * @param {string} [props.className] - Optional additional classes
 */
const StyledHeading = ({ text, number, color, className = "" }) => {
  // Determine text color based on context or use provided color
  const textColor = color || "currentColor";

  return (
    <h2
      className={`
        text-6xl md:text-7xl lg:text-8xl
        font-bold mb-12
        inline-block
        transform -rotate-2
        relative
        ${className}
      `}
      style={{ color: textColor }}
    >
      <span className="relative z-10">{text}</span>

      {/* Decorative underline */}
      <span
        className="absolute bottom-2 left-0 h-3 w-full transform rotate-1 -z-10 opacity-20"
        style={{ backgroundColor: textColor }}
      ></span>

      {/* Optional number badge */}
      {number && (
        <span
          className="
            absolute -top-3 -left-5 md:-left-8
            w-10 h-10 md:w-12 md:h-12
            rounded-full 
            flex items-center justify-center
            transform rotate-12
            text-xl md:text-2xl
          "
          style={{
            backgroundColor: textColor,
            color: color === "white" ? "black" : "white",
          }}
        >
          {number}
        </span>
      )}
    </h2>
  );
};

export default StyledHeading;
