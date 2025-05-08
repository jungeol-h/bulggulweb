import React, { useState, useEffect, useMemo, useRef } from "react";
import ArtworkSection from "./components/ArtworkSection";
import TeamSection from "./components/TeamSection";
import CuratorSection from "./components/CuratorSection";
import "./App.css";

// 픽셀화된 전환 컴포넌트 - 퍼즐 조각처럼 분해되는 효과 (애니메이션 추가)
const PixelTransition = () => {
  // 화면 크기에 따라 픽셀 수 계산
  const [dimensions, setDimensions] = useState({
    pixelSize: 12,
    rows: 30,
    cols: 60,
  });

  // 애니메이션 프레임 추적
  const [frame, setFrame] = useState(0);
  const animationRef = useRef(null);

  // 화면 크기 변경 감지 및 픽셀 크기/개수 계산
  useEffect(() => {
    const calculateDimensions = () => {
      const pixelSize = window.innerWidth > 768 ? 10 : 8;
      const cols = Math.ceil(window.innerWidth / pixelSize);
      const rows = Math.ceil(300 / pixelSize); // 높이를 400에서 300으로 줄임

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

  // 애니메이션 루프 설정
  useEffect(() => {
    const animate = () => {
      setFrame((prev) => (prev + 0.5) % 1000); // 프레임 증가량 조정 (1에서 0.5로 줄임)
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // 픽셀 도트 배열 생성 - dimensions와 frame이 변경될 때 재생성
  const pixels = useMemo(() => {
    const result = [];
    const { rows, cols } = dimensions;

    // 시간에 따라 변화하는 노이즈 시드
    const time = frame / 200; // 애니메이션 속도 조정 (100에서 200으로 늘림)

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        // 기본 패턴 생성
        const normalizedHeight = i / rows;

        // 시간에 따라 변화하는 웨이브 패턴 (사인파)
        const waveFactor = Math.sin(j / 5 + time) * 0.08; // 웨이브 크기 감소 (0.1에서 0.08로)
        const wave2Factor = Math.cos(i / 5 + time * 0.5) * 0.08; // 웨이브 속도 및 크기 감소

        // 노이즈 생성 (단순한 유사 난수)
        const noise = Math.sin(i * 0.1 + j * 0.1 + time * 0.15) * 0.08; // 노이즈 속도 감소

        // 사라짐 확률 계산 - 시간에 따라 변화하는 패턴
        const sigmoid =
          1 /
          (1 +
            Math.exp(
              -10 * (normalizedHeight - 0.5 + waveFactor + wave2Factor)
            ));

        // 가장자리 효과
        const centerX = cols / 2;
        const distFromCenterX = Math.abs(j - centerX) / centerX;
        const edgeFactor = 0.2 * Math.pow(distFromCenterX, 2);

        // 최종 사라짐 확률
        const disappearProb = sigmoid + noise + edgeFactor - 0.2;

        // 특별한 침범 효과 - 가끔 하단에서 위로 올라오는 픽셀
        const invasionFactor =
          Math.sin(j * 0.3 + time * 1.2) > 0.92
            ? Math.max(0, 0.6 - normalizedHeight) * 0.4
            : 0;

        const shouldShow = Math.random() > disappearProb - invasionFactor;

        if (shouldShow) {
          result.push({
            id: `pixel-${i}-${j}-${frame}`, // 프레임 추가로 키 충돌 방지
            row: i,
            col: j,
          });
        }
      }
    }

    return result;
  }, [dimensions, frame]);

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
          height: 300px; /* 400px에서 300px로 높이 줄임 */
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
            height: 200px; /* 300px에서 200px로 줄임 */
          }
        }
      `}</style>
    </main>
  );
}

export default App;
