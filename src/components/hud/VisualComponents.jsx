import React, { useState, useEffect } from "react";

/**
 * 그리드 배경 컴포넌트
 */
export const GridBackground = ({ className = "" }) => (
  <div className={`absolute inset-0 grid-background ${className}`}></div>
);

/**
 * 별이 반짝이는 배경 컴포넌트
 */
export const StarryBackground = ({ className = "", count = 100 }) => {
  const stars = Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    duration: 3 + Math.random() * 7,
    delay: Math.random() * 5,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
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

// Floating Heads Animation Component
export const FloatingHeads = ({ count = 8 }) => {
  const [heads, setHeads] = useState([]);
  const [windowWidth, setWindowWidth] = useState(0);

  // 화면 너비 감지하여 상태 업데이트
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // 초기값 설정
    setWindowWidth(window.innerWidth);

    // 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // 화면 너비에 따라 애니메이션 속도와 크기 조정
    // 작은 화면에서는 더 작게, 천천히, 큰 화면에서는 더 크고 빠르게
    const sizeFactor = windowWidth < 768 ? 0.7 : 1; // 모바일에서는 70% 크기
    const speedFactor = windowWidth < 768 ? 0.6 : 0.5; // 전체적으로 속도 빠르게 (값이 작을수록 빠름)

    // Create array of head elements with randomized properties
    const newHeads = Array.from({ length: count }).map((_, i) => ({
      id: i,
      // 화면 크기에 비례하는 동적 크기 설정
      size: (Math.random() * 40 + 40) * sizeFactor,
      top: Math.random() * 80 + 10, // Position from 10% to 90% of the container height
      // 화면 크기에 반비례하는 속도 조정 (작은 화면은 더 빨리 지나가도록)
      duration: (Math.random() * 10 + 15) * speedFactor, // 속도 빠르게 조정 (15-25초)
      delay: Math.random() * 12, // Random delay for staggered start
      rotate: Math.random() * 360, // Random initial rotation
      rotateSpeed: Math.random() > 0.5 ? 1 : -1, // Rotation direction
    }));

    setHeads(newHeads);
  }, [count, windowWidth]); // windowWidth가 변경될 때마다 재계산

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-30">
      {heads.map((head) => (
        <div
          key={head.id}
          className="absolute"
          style={{
            top: `${head.top}%`,
            left: "-10%", // Start position off-screen to the left
            width: `${head.size}px`,
            height: `${head.size}px`,
            animation: `floatHeadLeftToRight ${head.duration}s linear ${head.delay}s infinite`,
            transform: `rotate(${head.rotate}deg)`,
          }}
        >
          <img
            src="/images/head.webp"
            alt="Floating head"
            className="w-full h-full object-contain"
            style={{
              animation: `rotateHead ${head.duration / 4}s linear infinite ${
                head.rotateSpeed === 1 ? "normal" : "reverse"
              }`,
              filter: "brightness(1.2) contrast(1.1)",
            }}
          />
        </div>
      ))}
      <style jsx>{`
        @keyframes floatHeadLeftToRight {
          0% {
            transform: translateX(0%);
            opacity: 0;
          }
          5% {
            opacity: 0.9;
          }
          95% {
            opacity: 0.9;
          }
          100% {
            transform: translateX(
              ${windowWidth ? `${windowWidth + 100}px` : "110vw"}
            ); /* 화면 너비에 맞게 동적 계산 */
            opacity: 0;
          }
        }
        @keyframes rotateHead {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

/**
 * 레트로 스타일 이미지 패널 - 이미지가 라인별로 로딩되는 효과를 제공
 */
export const RetroImagePanel = ({ imageSrc, imageAlt, refCode }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [linesLoaded, setLinesLoaded] = useState(0);
  const totalLines = 30; // 총 라인 수

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);

      let currentLine = 0;
      const loadInterval = setInterval(() => {
        if (currentLine < totalLines) {
          setLinesLoaded((prev) => prev + 1);
          currentLine++;
        } else {
          clearInterval(loadInterval);
        }
      }, 80);

      return () => clearInterval(loadInterval);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative overflow-hidden h-full">
      {/* 실제 이미지 */}
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-full h-full object-cover"
      />

      {/* 로딩되지 않은 부분을 가리는 검은색 마스크 */}
      <div
        className="absolute inset-0 bg-black z-10 pointer-events-none"
        style={{
          height: `${100 - (linesLoaded / totalLines) * 100}%`,
          top: `${(linesLoaded / totalLines) * 100}%`,
          transition: "top 0.1s linear, height 0.1s linear",
        }}
      ></div>

      {/* 현재 로딩 중인 라인 표시 */}
      {isLoaded && linesLoaded < totalLines && (
        <div
          className="absolute w-full h-1 bg-white/10 z-20"
          style={{ top: `${(linesLoaded / totalLines) * 100}%` }}
        ></div>
      )}

      {/* 레퍼런스 코드 */}
      {refCode && (
        <div className="absolute bottom-2 right-2 text-xs text-white/60 bg-black/30 px-1 z-30">
          {refCode}
        </div>
      )}
    </div>
  );
};
