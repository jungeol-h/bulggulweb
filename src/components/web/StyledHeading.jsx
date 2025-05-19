import React from "react";

/**
 * StyledHeading - A heading component with customizable styling
 *
 * @param {Object} props
 * @param {string} props.text - The heading text
 * @param {string} [props.number] - Optional number badge to display
 * @param {string} [props.color] - Color for the heading text (default: currentColor)
 * @param {string} [props.fontSize] - Custom font size (default: text-5xl md:text-7xl lg:text-7xl)
 * @param {string} [props.className] - Optional additional classes
 */
const StyledHeading = ({
  text,
  number,
  color = "currentColor",
  fontSize,
  className = "",
}) => {
  // Generate 6 copies with decreasing opacity for the repetition effect
  const repetitions = [
    // { transform: "translateX(420px)", opacity: 0.4 },
    // { transform: "translateX(30px)", opacity: 0.3 },
    // { transform: "translateX(40px)", opacity: 0.2 },
    // { transform: "translateX(50px)", opacity: 0.1 },
  ];

  // Default fontSize if not provided
  const fontSizeClasses = fontSize || "text-5xl md:text-7xl lg:text-7xl";

  return (
    <h2
      className={`
        ${fontSizeClasses}
        font-bold mb-6
        inline-block
        relative
        ${className}
      `}
      style={{ color }}
    >
      {/* Small square at the top-left */}
      {/* <span
        className="absolute -top-4 -left-4 w-3 h-3"
        style={{ backgroundColor: color }}
      /> */}

      {/* Main text */}
      <span className="relative z-10">{text}</span>

      {/* Repeated text with decreasing opacity - creating afterimage effect */}
      {repetitions.map((style, index) => (
        <span
          key={index}
          className="absolute top-0 left-0 z-0"
          style={{
            color,
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
            text-xl md:text-2xl
          "
          style={{
            backgroundColor: color,
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
