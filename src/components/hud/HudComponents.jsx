import React from "react";

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
    className={`border border-gray-800 bg-black relative lcd-screen ${className}`}
  >
    {title && (
      <div
        className={`border-b border-gray-800 px-4 py-2 text-sm uppercase tracking-widest ${titleColor} font-mono text-left w-full`}
      >
        {title}
      </div>
    )}
    <div className="p-4 pixel-text">{children}</div>
  </section>
);

/**
 * 레이블-값 쌍 컴포넌트
 */
export const HudLabelValue = ({
  label,
  value,
  className = "",
  labelColor = "text-gray-400",
  valueColor = "text-white",
}) => (
  <div className={`mb-2 ${className}`}>
    <span
      className={`text-xs uppercase tracking-widest ${labelColor} font-mono block`}
    >
      {label}
    </span>
    <span className={`text-lg ${valueColor} font-mono lcd-text`}>{value}</span>
  </div>
);

/**
 * 데이터 상태 표시 인디케이터
 */
export const HudStatusIndicator = ({
  text,
  dotColor = "bg-white",
  pulse = true,
  className = "",
}) => (
  <div className={`text-xs text-gray-400 flex items-center ${className}`}>
    <span
      className={`inline-block w-2 h-2 ${dotColor} mr-2 ${
        pulse ? "blink" : ""
      }`}
    ></span>
    {text}
  </div>
);

/**
 * 구분선 컴포넌트
 */
export const HudDivider = ({ className = "" }) => (
  <div className={`border-t border-gray-800 my-3 ${className}`}></div>
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
export const HudImageFrame = ({ src, alt, className = "", refCode }) => (
  <div className={`relative overflow-hidden lcd-frame ${className}`}>
    <div className="absolute inset-0 border border-gray-800 z-10 pointer-events-none"></div>
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover monochrome-filter"
    />
    {refCode && (
      <div className="absolute top-2 right-2 text-xs text-white bg-black/80 px-2 py-1 font-mono">
        {refCode}
      </div>
    )}
  </div>
);

/**
 * 그리드 배경 컴포넌트
 */
export const GridBackground = ({ className = "" }) => (
  <div className={`absolute inset-0 grid-background ${className}`}></div>
);

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
  border: 1px solid rgba(255,255,255,0.1);
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
