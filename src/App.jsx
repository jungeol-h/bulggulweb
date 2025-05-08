import React from "react";
import ArtworkSection from "./components/ArtworkSection";
import TeamSection from "./components/TeamSection";
import CuratorSection from "./components/CuratorSection";
import "./App.css";

function App() {
  return (
    <main className="flex flex-col">
      {/* Artwork Section - Dark theme */}
      <div className="relative">
        <ArtworkSection />
      </div>

      {/* Team Section - Light theme */}
      <div className="bg-white relative">
        <TeamSection />
      </div>
    </main>
  );
}

export default App;
