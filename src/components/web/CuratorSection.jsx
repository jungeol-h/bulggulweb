import React from "react";
import StyledHeading from "./StyledHeading";

const CuratorSection = () => {
  return (
    <section className="relative py-20 px-6 md:px-12 lg:px-24 text-white overflow-hidden">
      {/* Background Image with Blur Effect */}
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: "url('/images/ticketfront.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(20px) brightness(1)",
          transform: "scale(1.4)", // Increased from 1.05 to 1.1 to fill any side margins
        }}
      ></div>

      {/* Dark Overlay for additional darkness */}
      <div className="absolute inset-0 bg-black/40 z-5"></div>

      {/* Gradient Overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-indigo-800/60 to-blue-800/60 z-10"></div> */}

      {/* Content */}
    </section>
  );
};

export default CuratorSection;
