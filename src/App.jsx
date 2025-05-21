import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ArtworkSection from "./components/web/ArtworkSection";
import TeamSection from "./components/web/TeamSection";
import LocalExhibitionPage from "./components/exhibition/LocalExhibitionPage";
import { Esp32TestPage } from "./components/exhibition";
import "./App.css";

function App() {
  return (
    <Routes>
      {/* 웹사이트 메인 페이지 라우트 */}
      <Route
        path="/"
        element={
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
                  filter:
                    "blur(0.4px) contrast(110%) saturate(70%) brightness(1.1)",
                }}
              ></div>
            </div>

            {/* 페이지 전환을 위한 내비게이션 링크 */}
            <nav className="relative z-20 py-4 px-6 flex justify-end gap-3">
              <Link
                to="/exhibition"
                className="bg-purple-900 hover:bg-purple-800 text-white py-2 px-4 rounded-md text-sm transition-all duration-300"
              >
                전시장 모드
              </Link>
              <Link
                to="/esp32-test"
                className="bg-green-700 hover:bg-green-600 text-white py-2 px-4 rounded-md text-sm transition-all duration-300"
              >
                ESP32 테스트
              </Link>
            </nav>

            {/* Artwork Section */}
            <div className="relative z-10">
              <ArtworkSection />
            </div>

            {/* Team Section */}
            <div className="relative z-10">
              <TeamSection />
            </div>
          </main>
        }
      />

      {/* 로컬 전시용 페이지 라우트 */}
      <Route
        path="/exhibition"
        element={
          <div>
            <LocalExhibitionPage />
          </div>
        }
      />

      {/* ESP32 테스트 페이지 라우트 */}
      <Route
        path="/esp32-test"
        element={
          <div>
            <Esp32TestPage />
          </div>
        }
      />
    </Routes>
  );
}

export default App;
