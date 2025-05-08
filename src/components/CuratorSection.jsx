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
      <div className="relative z-20 max-w-6xl mx-auto">
        {/* <StyledHeading text="큐레이터" className="mb-12 text-center" /> */}

        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xl mb-8">
            본 작품은 숭실대학교 글로벌미디어학부 2024년 졸업전시에
            출품되었습니다.
          </p>

          <div className="mt-10">
            <a
              href="https://example.com/exhibition"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-black/40 hover:bg-black/60 rounded-full text-white transition-colors text-lg border border-white/50 hover:border-white shadow-lg backdrop-blur-sm"
            >
              전시 페이지 방문하기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CuratorSection;
