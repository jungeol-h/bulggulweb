import React from "react";

/**
 * Spinner - 스피너 로딩 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.size - 크기 ('sm', 'md', 'lg')
 * @param {string} props.color - 색상 클래스
 * @param {string} props.className - 추가 CSS 클래스
 */
export const Spinner = ({
  size = "md",
  color = "border-green-500",
  className = "",
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "h-6 w-6 border-2";
      case "md":
        return "h-10 w-10 border-3";
      case "lg":
        return "h-12 w-12 border-4";
      default:
        return "h-10 w-10 border-3";
    }
  };

  return (
    <div
      className={`animate-spin rounded-full ${getSizeClasses()} border-t-2 border-b-2 ${color} ${className}`}
    ></div>
  );
};

/**
 * LoadingIndicator - 로딩 인디케이터 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.text - 로딩 텍스트
 * @param {string} props.size - 스피너 크기 ('sm', 'md', 'lg')
 * @param {string} props.className - 추가 CSS 클래스
 */
export const LoadingIndicator = ({
  text = "로딩 중...",
  size = "md",
  className = "",
}) => (
  <div className={`flex flex-col items-center justify-center ${className}`}>
    <Spinner size={size} />
    {text && <p className="mt-4 text-green-400 font-mono">{text}</p>}
  </div>
);

/**
 * StatusBadge - 상태 뱃지 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.status - 상태 ('loading', 'success', 'error', 'idle')
 * @param {string} props.text - 상태 텍스트
 * @param {boolean} props.animate - 애니메이션 적용 여부
 * @param {string} props.className - 추가 CSS 클래스
 */
export const StatusBadge = ({
  status = "idle",
  text,
  animate = true,
  className = "",
}) => {
  const getStatusClasses = () => {
    switch (status) {
      case "loading":
        return "bg-yellow-800 text-yellow-200";
      case "success":
        return "bg-green-800 text-green-200";
      case "error":
        return "bg-red-800 text-red-200";
      case "idle":
        return "bg-blue-800 text-blue-200";
      default:
        return "bg-gray-800 text-gray-200";
    }
  };

  const getStatusText = () => {
    if (text) return text;

    switch (status) {
      case "loading":
        return "로딩 중...";
      case "success":
        return "완료";
      case "error":
        return "오류";
      case "idle":
        return "대기 중";
      default:
        return "상태 없음";
    }
  };

  return (
    <div
      className={`
        px-3 py-1 rounded-full text-xs 
        ${getStatusClasses()} 
        ${animate && status === "loading" ? "animate-pulse" : ""}
        ${className}
      `}
    >
      {getStatusText()}
    </div>
  );
};

/**
 * ProgressIndicator - 진행 상태 인디케이터 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {number} props.value - 현재 값
 * @param {number} props.max - 최대 값
 * @param {string} props.label - 라벨 텍스트
 * @param {string} props.className - 추가 CSS 클래스
 */
export const ProgressIndicator = ({
  value = 0,
  max = 100,
  label = "",
  className = "",
}) => {
  const percentage = Math.min(
    Math.max(Math.round((value / max) * 100), 0),
    100
  );

  return (
    <div className={`${className}`}>
      <div className="flex justify-between items-center mb-1">
        <div className="text-xs text-green-400 font-mono">{label}</div>
        <div className="text-xs text-green-400 font-mono">{percentage}%</div>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2.5">
        <div
          className="bg-green-600 h-2.5 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};
