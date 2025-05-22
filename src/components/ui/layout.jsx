import React from "react";

/**
 * GridLayout - 그리드 레이아웃 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {ReactNode} props.children - 자식 노드
 * @param {number} props.cols - 열 개수
 * @param {number} props.rows - 행 개수
 * @param {string} props.gap - 그리드 간격
 * @param {string} props.className - 추가 CSS 클래스
 */
export const GridLayout = ({
  children,
  cols = 4,
  rows = 2,
  gap = "4",
  className = "",
}) => (
  <div
    className={`grid grid-cols-${cols} grid-rows-${rows} gap-${gap} ${className}`}
  >
    {children}
  </div>
);

/**
 * FlexRow - 플렉스 행 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {ReactNode} props.children - 자식 노드
 * @param {string} props.justify - 수평 정렬 방식
 * @param {string} props.align - 수직 정렬 방식
 * @param {string} props.gap - 간격
 * @param {string} props.className - 추가 CSS 클래스
 */
export const FlexRow = ({
  children,
  justify = "center",
  align = "center",
  gap = "4",
  className = "",
}) => (
  <div
    className={`flex flex-row items-${align} justify-${justify} space-x-${gap} ${className}`}
  >
    {children}
  </div>
);

/**
 * FlexCol - 플렉스 열 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {ReactNode} props.children - 자식 노드
 * @param {string} props.justify - 수직 정렬 방식
 * @param {string} props.align - 수평 정렬 방식
 * @param {string} props.gap - 간격
 * @param {string} props.className - 추가 CSS 클래스
 */
export const FlexCol = ({
  children,
  justify = "center",
  align = "center",
  gap = "4",
  className = "",
}) => (
  <div
    className={`flex flex-col items-${align} justify-${justify} space-y-${gap} ${className}`}
  >
    {children}
  </div>
);

/**
 * Section - 섹션 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {ReactNode} props.children - 자식 노드
 * @param {string} props.id - 섹션 ID
 * @param {string} props.className - 추가 CSS 클래스
 */
export const Section = ({ children, id, className = "" }) => (
  <section id={id} className={`py-12 ${className}`}>
    <div className="container mx-auto px-4">{children}</div>
  </section>
);

/**
 * FullScreenSection - 전체 화면 섹션 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {ReactNode} props.children - 자식 노드
 * @param {string} props.id - 섹션 ID
 * @param {string} props.className - 추가 CSS 클래스
 */
export const FullScreenSection = ({ children, id, className = "" }) => (
  <section
    id={id}
    className={`min-h-screen flex items-center justify-center ${className}`}
  >
    {children}
  </section>
);
