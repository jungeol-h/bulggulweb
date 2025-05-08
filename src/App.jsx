import React from "react";
import ArtworkSection from "./components/ArtworkSection";
import TeamSection from "./components/TeamSection";
import MemberProfile from "./components/MemberProfile";
import { members } from "./data/members";
import "./App.css";

function App() {
  return (
    <main className="flex flex-col">
      {/* Artwork Section - Dark theme */}
      <ArtworkSection />

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
