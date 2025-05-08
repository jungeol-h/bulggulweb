import React from "react";
import ArtworkSection from "./components/ArtworkSection";
import TeamSection from "./components/TeamSection";
import CuratorSection from "./components/CuratorSection";
import "./App.css";

function App() {
  return (
    <main className="flex flex-col">
      {/* Artwork Section - Dark theme */}
      <ArtworkSection />

      {/* Curator Section - Gradient theme */}
      {/* <CuratorSection /> */}

      {/* Team Section - Light theme */}
      <TeamSection />
    </main>
  );
}

export default App;
