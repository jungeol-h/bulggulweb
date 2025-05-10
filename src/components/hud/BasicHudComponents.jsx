import React from "react";
import { TypewriterText } from "./TextEffectComponents";

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
    <span className={`text-s ${valueColor} font-mono lcd-text`}>
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
 * 이미지 프레임 컴포넌트
 */
export const HudImageFrame = ({ src, alt, className = "" }) => (
  <div
    className={` relative w-full h-full overflow-hidden lcd-frame ${className}`}
  >
    <div className="absolute inset-0 z-1 pointer-events-none"></div>
    <img src={src} alt={alt} className="w-full h-full object-cover " />
  </div>
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
