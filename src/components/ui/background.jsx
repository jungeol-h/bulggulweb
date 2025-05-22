import React from "react";
import { colors } from "../../theme/theme";

/**
 * StarryBackground - 별이 빛나는 배경 효과를 제공하는 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {number} props.count - 별의 개수 (기본값: 150)
 * @param {string} props.className - 추가 CSS 클래스
 */
export const StarryBackground = ({ count = 150, className = "" }) => {
  const stars = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1,
      duration: 3 + Math.random() * 7,
      delay: Math.random() * 5,
    }));
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-ui-text-primary animate-twinkle"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: Math.random() * 0.7 + 0.3,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

/**
 * GridBackground - 그리드 라인 배경 효과를 제공하는 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.className - 추가 CSS 클래스
 */
export const GridBackground = ({ className = "" }) => (
  <div className={`absolute inset-0 grid-background ${className}`}></div>
);

/**
 * ScanlineEffect - CRT 스캔라인 효과를 제공하는 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {number} props.opacity - 효과의 투명도 (0-1 사이 값, 기본값: 0.15)
 * @param {string} props.className - 추가 CSS 클래스
 */
export const ScanlineEffect = ({ opacity = 0.15, className = "" }) => (
  <div
    className={`fixed inset-0 scanline-effect pointer-events-none ${className}`}
    style={{
      backgroundImage: "url('/images/scanline.png')",
      backgroundRepeat: "repeat",
      mixBlendMode: "soft-light",
      opacity: opacity,
      filter: "blur(0.4px) contrast(110%) saturate(70%) brightness(1.1)",
    }}
  />
);

/**
 * BackgroundContainer - 다양한 배경 효과를 포함하는 컨테이너 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {boolean} props.stars - 별 배경 활성화 여부
 * @param {boolean} props.grid - 그리드 배경 활성화 여부
 * @param {boolean} props.scanline - 스캔라인 효과 활성화 여부
 * @param {ReactNode} props.children - 자식 노드
 */
export const BackgroundContainer = ({
  stars = true,
  grid = false,
  scanline = true,
  children,
}) => {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* 배경 효과 */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {stars && <StarryBackground count={150} />}
        {grid && <GridBackground />}
        {scanline && <ScanlineEffect />}
      </div>

      {/* 컨텐츠 */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
