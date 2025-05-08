import React from "react";
import ArtworkSection from "./components/ArtworkSection";
import TeamSection from "./components/TeamSection";
import CuratorSection from "./components/CuratorSection";
import MemberProfile from "./components/MemberProfile";
import { members } from "./data/members";
import "./App.css";

function App() {
  return (
    <main className="flex flex-col">
      {/* Artwork Section - Dark theme */}
      <ArtworkSection />

      {/* Curator Section - Gradient theme */}
      <CuratorSection />

      {/* Team Section - Light theme */}
      <TeamSection />

      {/* Individual Member Profiles - Reusing the same component */}
      {members.map((member, index) => (
        <MemberProfile key={index} member={member} />
      ))}
    </main>
  );
}

export default App;
