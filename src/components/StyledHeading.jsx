import React from "react";

/**
 * StyledHeading - A grotesque heading component with repetition effects
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

  // Generate 6 copies with decreasing opacity for the repetition effect
  const repetitions = [
    // { transform: "translateX(420px)", opacity: 0.4 },
    // { transform: "translateX(30px)", opacity: 0.3 },
    // { transform: "translateX(40px)", opacity: 0.2 },
    // { transform: "translateX(50px)", opacity: 0.1 },
  ];

  return (
    <h2
      className={`
        text-5xl md:text-7xl lg:text-7xl
        font-bold mb-12
        inline-block
        transform -rotate-2
        relative
        ${className}
      `}
      style={{ color: textColor }}
    >
      {/* Main text */}
      <span className="relative z-10">{text}</span>

      {/* Repeated text with decreasing opacity - creating afterimage effect */}
      {repetitions.map((style, index) => (
        <span
          key={index}
          className="absolute top-0 left-0 z-0"
          style={{
            color: textColor,
            opacity: style.opacity,
            transform: style.transform,
          }}
        >
          {text}
        </span>
      ))}

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
