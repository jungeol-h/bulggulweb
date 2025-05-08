import React, { useState, useEffect, useMemo } from "react";
import ArtworkSection from "./components/ArtworkSection";
import TeamSection from "./components/TeamSection";
import CuratorSection from "./components/CuratorSection";
import "./App.css";

// 픽셀화된 전환 컴포넌트 - 퍼즐 조각처럼 분해되는 효과
const PixelTransition = () => {
  // 화면 크기에 따라 픽셀 수 계산
  const [dimensions, setDimensions] = useState({
    pixelSize: 12,
    rows: 30,
    cols: 60,
  });

  // 화면 크기 변경 감지 및 픽셀 크기/개수 계산
  useEffect(() => {
    const calculateDimensions = () => {
      const pixelSize = window.innerWidth > 768 ? 10 : 8; // 모바일은 더 작은 픽셀
      const cols = Math.ceil(window.innerWidth / pixelSize);
      const rows = Math.ceil(400 / pixelSize); // 섹션 높이 400px 기준

      setDimensions({ pixelSize, rows, cols });
    };

    // 초기 계산
    calculateDimensions();

    // 화면 크기 변경 시 재계산
    window.addEventListener("resize", calculateDimensions);

    return () => {
      window.removeEventListener("resize", calculateDimensions);
    };
  }, []);

  // 픽셀 도트 배열 생성 - dimensions가 변경될 때만 재생성
  const pixels = useMemo(() => {
    const result = [];
    const { rows, cols } = dimensions;

    // 노이즈 시드 (픽셀에 약간의 랜덤성 추가)
    const noiseSeed = [];
    for (let i = 0; i < rows; i++) {
      noiseSeed[i] = [];
      for (let j = 0; j < cols; j++) {
        noiseSeed[i][j] = Math.random() * 0.3; // 0~0.3 사이의 랜덤 노이즈
      }
    }

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        // 더 자연스러운 페이드아웃을 위한 계산 개선
        // 1. 기본 높이 기반 확률 (S자 커브 적용)
        const normalizedHeight = i / rows;
        const sigmoid = 1 / (1 + Math.exp(-10 * (normalizedHeight - 0.5))); // S자 커브

        // 2. 노이즈 추가 (약간의 랜덤성)
        const noiseValue = noiseSeed[i][j];

        // 3. 픽셀 가장자리로 갈수록 먼저 사라지는 효과 (중앙은 더 오래 유지)
        const centerX = cols / 2;
        const distFromCenterX = Math.abs(j - centerX) / centerX;
        const edgeFactor = 0.2 * Math.pow(distFromCenterX, 2);

        // 최종 사라짐 확률 계산
        const disappearProb = sigmoid + noiseValue + edgeFactor - 0.2; // 0.2 오프셋으로 초기 밀도 증가

        const shouldShow = Math.random() > disappearProb;

        if (shouldShow) {
          result.push({
            id: `pixel-${i}-${j}`,
            row: i,
            col: j,
          });
        }
      }
    }

    return result;
  }, [dimensions]);

  return (
    <div className="pixel-transition-container">
      <div
        className="pixel-grid"
        style={{
          gridTemplateColumns: `repeat(${dimensions.cols}, 1fr)`,
          gridTemplateRows: `repeat(${dimensions.rows}, 1fr)`,
        }}
      >
        {pixels.map((pixel) => (
          <div
            key={pixel.id}
            className="pixel-block"
            style={{
              gridRow: pixel.row + 1,
              gridColumn: pixel.col + 1,
              width: `${dimensions.pixelSize}px`,
              height: `${dimensions.pixelSize}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

function App() {
  return (
    <main className="flex flex-col">
      {/* Artwork Section - Dark theme */}
      <div className="relative">
        <ArtworkSection />
      </div>

      {/* 픽셀 도트 전환 요소 */}
      <div className="pixel-transition-section">
        <PixelTransition />
      </div>

      {/* Team Section - Light theme */}
      <div className="bg-white relative">
        <TeamSection />
      </div>

      <style jsx>{`
        .pixel-transition-section {
          position: relative;
          height: 400px;
          width: 100%;
          background: white;
          overflow: hidden;
          margin-top: -40px;
        }

        .pixel-transition-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
        }

        .pixel-grid {
          display: grid;
          width: 100%;
          height: 100%;
        }

        .pixel-block {
          background-color: black;
          width: 100%;
          height: 100%;
        }

        @media (max-width: 768px) {
          .pixel-transition-section {
            height: 300px;
          }
        }
      `}</style>
    </main>
  );
}

export default App;
