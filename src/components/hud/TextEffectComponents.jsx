import React, { useState, useEffect, useRef } from "react";

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
    <span className={`${className} pixel-text text-white/80`}>
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
