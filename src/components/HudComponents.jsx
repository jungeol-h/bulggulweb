import React, { useState, useEffect, useRef } from "react";

/**
 * 기본 HUD 패널 컴포넌트
 */
export const HudPanel = ({
  children,
  className = "",
  title = "",
  titleColor = "text-white",
}) => (
  <section
    className={` bg-black relative lcd-screen h-full flex flex-col ${className} outline outline-1`}
  >
    {title && (
      <div
        className={`py-3 text-ldg uppercase tracking-widest ${titleColor} font-mono text-left w-full`}
      >
        {title}
      </div>
    )}
    <div className="pixel-text flex-grow text-left ">{children}</div>
  </section>
);

/**
 * 타이핑 애니메이션 텍스트 컴포넌트
 */
export const TypewriterText = ({ text, delay = 30, className = "" }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const textRef = useRef(text);

  useEffect(() => {
    textRef.current = text;
    setDisplayText("");
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex < textRef.current.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + textRef.current[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, delay]);

  return (
    <span className={className}>
      {displayText}
      {currentIndex < textRef.current.length && (
        <span className="blink">_</span>
      )}
    </span>
  );
};

/**
 * 타이핑 애니메이션이 적용된 텍스트 블록 컴포넌트
 */
export const TypewriterBlock = ({ content, delay = 1, className = "" }) => {
  if (typeof content === "string") {
    return (
      <TypewriterText text={content} delay={delay} className={className} />
    );
  }

  // 객체 형태의 콘텐츠 처리
  return (
    <div className={`prose text-white max-w-none ${className}`}>
      {content.part1 && (
        <p>
          <TypewriterText text={content.part1} delay={delay} />
        </p>
      )}
      {content.quote && (
        <blockquote>
          <TypewriterText text={content.quote} delay={delay} />
        </blockquote>
      )}
      {content.part2 && (
        <p>
          <TypewriterText text={content.part2} delay={delay} />
        </p>
      )}
      {content.inspirations && (
        <ul>
          {content.inspirations.map((item, idx) => (
            <li key={idx}>
              <TypewriterText text={item} delay={delay} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

/**
 * 레이블-값 쌍 컴포넌트
 */
export const HudLabelValue = ({
  label,
  value,
  className = "",
  labelColor = "text-gray-400",
  valueColor = "text-white",
  useTypewriter = false,
}) => (
  <div className={`mb-2 ${className}`}>
    <span
      className={`text-xs uppercase tracking-widest ${labelColor} font-mono block`}
    >
      <TypewriterText text={label} delay={30} />
    </span>
    <span className={`text-lg ${valueColor} font-mono lcd-text`}>
      {useTypewriter ? <TypewriterText text={value} delay={40} /> : value}
    </span>
  </div>
);

/**
 * 구분선 컴포넌트
 */
export const HudDivider = ({ className = "" }) => (
  <div className={`border-t border-gray-100 my-3 ${className}`}></div>
);

/**
 * 프로그레스 바 컴포넌트
 */
export const HudProgressBar = ({
  value = 0,
  className = "",
  showLabel = true,
  barColor = "bg-white",
}) => (
  <div className={`flex items-center ${className}`}>
    <div className="w-full bg-gray-900 h-1 relative">
      <div
        className={`absolute top-0 left-0 h-full ${barColor}`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
    {showLabel && <span className="ml-2 text-xs text-white">{value}%</span>}
  </div>
);

/**
 * 이미지 프레임 컴포넌트
 */
export const HudImageFrame = ({ src, alt, className = "" }) => (
  <div
    className={` relative w-full h-full overflow-hidden lcd-frame ${className}`}
  >
    <div className="absolute inset-0 z-10 pointer-events-none"></div>
    <img src={src} alt={alt} className="w-full h-full object-cover " />
  </div>
);

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

/**
 * 개요 패널 - 작품 기본 정보를 포함하는 패널
 */
export const InfoPanel = ({ artworkData, className = "" }) => (
  <HudPanel title=" " className={`h-full space-y-2 ${className}`}>
    <div>
      <p className="text-white font-mono text-sm">
        <TypewriterText text={artworkData.shortDescription} />
      </p>
    </div>
    <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-4 mt-8">
      {/* <HudLabelValue label="UNIT ID" value="VX-NANANA-25" /> */}
      <HudLabelValue
        label="CLASSIFICATION"
        value={artworkData.category || "미디어아트"}
        useTypewriter={true}
      />
      <HudLabelValue
        label="MANUFACTURE DATE"
        value={artworkData.year || "2025"}
        useTypewriter={true}
      />
      <HudLabelValue
        label="OPERATOR"
        value={artworkData.creator || "팀 '벌꿀오소리'"}
        useTypewriter={true}
      />

      <HudLabelValue
        label="COMPONENTS"
        value={artworkData.materials || "AI, 카메라, 디스플레이"}
        className="col-span-2"
        useTypewriter={true}
      />
      <HudLabelValue
        label="SPATIAL PARAMETERS"
        value={artworkData.dimensions || "가변적"}
        className="col-span-2"
        useTypewriter={true}
      />
    </div>
  </HudPanel>
);

/**
 * 이미지 패널 - 사진만 표시하는 패널
 */
export const ImagePanel = ({ imageSrc, imageAlt }) => (
  <HudPanel className="h-full flex flex-col">
    <div></div>
    <div className="flex-grow">
      <HudImageFrame src={imageSrc} alt={imageAlt} className="h-full " />
    </div>
  </HudPanel>
);

/**
 * 텍스트 패널 - 텍스트 콘텐츠를 표시하는 패널
 */
export const TextPanel = ({ title, content, className }) => (
  <HudPanel title={title} className={`h-full ${className}`}>
    <div className="text-white font-mono text-sm h-full">
      <TypewriterBlock content={content} />
    </div>
  </HudPanel>
);

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
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
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
 * LCD 효과 스타일 (CSS-in-JS)
 */
export const lcdStyles = `
/* LCD Screen Effect */
.lcd-screen {
  position: relative;
  box-shadow: 0 0 0 1px rgba(255,255,255,0.05);
}

.lcd-screen::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px),
                    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 2px 2px;
  pointer-events: none;
  z-index: 1;
}

/* LCD Text */
.lcd-text {
  font-family: monospace;
  letter-spacing: 0.05em;
  text-shadow: 0 0 2px rgba(255,255,255,0.5);
}

/* Pixel Text Effect */
.pixel-text {
  position: relative;
  z-index: 2;
}

/* LCD Frame */
.lcd-frame {
  position: relative;
}

/* Monochrome Filter */
.monochrome-filter {
  filter: grayscale(1) contrast(1.1) brightness(0.9);
}

/* Grid Background */
.grid-background {
  background-image: 
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 20px 20px;
  z-index: -1;
}

/* Blink Animation */
.blink {
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

/* Old LCD Pixel Effect */
.pixel-border {
  position: relative;
}

.pixel-border::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(90deg, transparent 50%, rgba(0,0,0,0.5) 50%),
    linear-gradient(transparent 50%, rgba(0,0,0,0.5) 50%);
  background-size: 2px 2px;
  pointer-events: none;
  opacity: 0.1;
  z-index: 2;
}

.animated {
  opacity: 1 !important;
  transform: translateY(0) !important;
}
`;
