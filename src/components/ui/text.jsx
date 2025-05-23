import React, { useState, useEffect } from "react";
import { colors } from "../../theme/theme";

/**
 * TypewriterText - 타이핑 효과가 있는 텍스트 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.text - 표시할 텍스트
 * @param {number} props.delay - 타이핑 속도 딜레이 (ms)
 * @param {boolean} props.loop - 반복 여부
 * @param {string} props.className - 추가 CSS 클래스
 */
export const TypewriterText = ({
  text = "",
  delay = 70,  // 기본 타이핑 속도를 더 느리게 조정 (50ms → 70ms)
  loop = false,
  className = "",
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let timeout;

    if (currentIndex < text.length) {
      timeout = setTimeout(() => {
        setDisplayText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);
    } else {
      setIsTypingComplete(true);

      if (loop) {
        timeout = setTimeout(() => {
          setDisplayText("");
          setCurrentIndex(0);
          setIsTypingComplete(false);
        }, delay * 10);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, text, delay, loop]);

  return <span className={className}>{displayText}</span>;
};

/**
 * BlinkingText - 깜빡이는 효과가 있는 텍스트 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {ReactNode} props.children - 표시할 내용
 * @param {string} props.className - 추가 CSS 클래스
 */
export const BlinkingText = ({ children, className = "" }) => (
  <span className={`animate-pulse ${className}`}>{children}</span>
);

/**
 * GlitchText - 글리치 효과가 있는 텍스트 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.text - 표시할 텍스트
 * @param {string} props.className - 추가 CSS 클래스
 */
export const GlitchText = ({ text, className = "" }) => (
  <span className={`relative inline-block ${className}`}>
    <span className="relative z-10">{text}</span>
    <span className="absolute top-0 left-0 z-0 text-red-500 transform translate-x-[1px] translate-y-[1px] opacity-70">
      {text}
    </span>
    <span className="absolute top-0 left-0 z-0 text-blue-500 transform translate-x-[-1px] translate-y-[-1px] opacity-70">
      {text}
    </span>
  </span>
);

/**
 * MonoLabel - 고정폭 폰트를 사용하는 레이블 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.text - 표시할 텍스트
 * @param {string} props.color - 텍스트 색상 클래스
 * @param {string} props.className - 추가 CSS 클래스
 */
export const MonoLabel = ({
  text,
  color = "text-green-400",
  className = "",
}) => <p className={`font-mono ${color} ${className}`}>{text}</p>;

/**
 * LabelValue - 레이블-값 쌍을 표시하는 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.label - 레이블 텍스트
 * @param {string|ReactNode} props.value - 값
 * @param {string} props.labelColor - 레이블 색상 클래스
 * @param {string} props.valueColor - 값 색상 클래스
 * @param {boolean} props.useTypewriter - 타이핑 효과 사용 여부
 * @param {string} props.className - 추가 CSS 클래스
 */
export const LabelValue = ({
  label,
  value,
  labelColor = "text-gray-400",
  valueColor = "text-green-400",
  useTypewriter = false,
  className = "",
}) => (
  <div className={`mb-2 ${className}`}>
    <span
      className={`text-xs uppercase tracking-widest ${labelColor} font-mono block`}
    >
      {useTypewriter ? <TypewriterText text={label} delay={30} /> : label}
    </span>
    <span className={`text-s ${valueColor} font-mono`}>
      {useTypewriter ? <TypewriterText text={value} delay={40} /> : value}
    </span>
  </div>
);
