import React, { useState, useEffect } from "react";

/**
 * FadeTransition - 페이드 효과 전환 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {ReactNode} props.children - 자식 노드
 * @param {boolean} props.show - 표시 여부
 * @param {number} props.duration - 전환 지속 시간(ms)
 * @param {string} props.className - 추가 CSS 클래스
 */
export const FadeTransition = ({
  children,
  show = true,
  duration = 1000,
  className = "",
}) => (
  <div
    className={`transition-opacity ease-in-out ${className}`}
    style={{
      opacity: show ? 1 : 0,
      transitionDuration: `${duration}ms`,
    }}
  >
    {children}
  </div>
);

/**
 * SlideTransition - 슬라이드 효과 전환 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {ReactNode} props.children - 자식 노드
 * @param {boolean} props.show - 표시 여부
 * @param {string} props.direction - 슬라이드 방향 ('left', 'right', 'up', 'down')
 * @param {number} props.duration - 전환 지속 시간(ms)
 * @param {string} props.className - 추가 CSS 클래스
 */
export const SlideTransition = ({
  children,
  show = true,
  direction = "left",
  duration = 500,
  className = "",
}) => {
  const getTransform = () => {
    if (!show) {
      switch (direction) {
        case "left":
          return "translateX(-100%)";
        case "right":
          return "translateX(100%)";
        case "up":
          return "translateY(-100%)";
        case "down":
          return "translateY(100%)";
        default:
          return "translateX(-100%)";
      }
    }
    return "translate(0, 0)";
  };

  return (
    <div
      className={`transition-all ease-in-out overflow-hidden ${className}`}
      style={{
        transform: getTransform(),
        opacity: show ? 1 : 0,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
};

/**
 * PhaseTransition - 페이즈 전환 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {ReactNode} props.children - 자식 노드
 * @param {number} props.phase - 현재 페이즈
 * @param {boolean} props.isTransitioning - 전환 중 여부
 * @param {function} props.onTransitionEnd - 전환 완료 핸들러
 * @param {string} props.className - 추가 CSS 클래스
 */
export const PhaseTransition = ({
  children,
  phase,
  isTransitioning,
  onTransitionEnd,
  className = "",
}) => {
  const [content, setContent] = useState(children);

  useEffect(() => {
    if (!isTransitioning) {
      setContent(children);
    }
  }, [isTransitioning, children]);

  return (
    <div
      className={`relative transition-opacity duration-1000 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      } ${className}`}
      onTransitionEnd={onTransitionEnd}
    >
      {content}
    </div>
  );
};

/**
 * BlinkingElement - 깜빡이는 효과가 있는 요소 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {ReactNode} props.children - 자식 노드
 * @param {string} props.className - 추가 CSS 클래스
 */
export const BlinkingElement = ({ children, className = "" }) => (
  <div className={`animate-pulse ${className}`}>{children}</div>
);

/**
 * TypingIndicator - 타이핑 인디케이터 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.className - 추가 CSS 클래스
 */
export const TypingIndicator = ({ className = "" }) => (
  <div className={`inline-flex gap-1 ${className}`}>
    <span
      className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
      style={{ animationDelay: "0ms" }}
    ></span>
    <span
      className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
      style={{ animationDelay: "150ms" }}
    ></span>
    <span
      className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
      style={{ animationDelay: "300ms" }}
    ></span>
  </div>
);
