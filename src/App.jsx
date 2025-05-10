import React from "react";
import ArtworkSection from "./components/ArtworkSection";
import TeamSection from "./components/TeamSection";
import "./App.css";

function App() {
  return (
    <main className="flex flex-col bg-black">
      {/* 배경 효과 요소 - 모든 섹션에 공통으로 적용 */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="starry-background"></div>
        <div
          className="scanline-effect"
          style={{
            backgroundImage: "url('/images/scanline.png')",
            backgroundRepeat: "repeat",
            mixBlendMode: "soft-light",
            opacity: 0.1,
            filter: "blur(0.4px) contrast(110%) saturate(70%) brightness(1.1)",
          }}
        ></div>
      </div>

      {/* Artwork Section */}
      <div className="relative z-10">
        <ArtworkSection />
      </div>

      {/* Team Section */}
      <div className="relative z-10">
        <TeamSection />
      </div>
    </main>
  );
}

export default App;
