import React from "react";

/**
 * ContentContainer - 기본 컨텐츠 컨테이너 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {ReactNode} props.children - 자식 노드
 * @param {boolean} props.isTransitioning - 전환 중 여부
 * @param {string} props.className - 추가 CSS 클래스
 */
export const ContentContainer = ({
  children,
  isTransitioning = false,
  className = "",
}) => (
  <div
    className={`relative z-10 container mx-auto transition-opacity duration-1000 ${
      isTransitioning ? "opacity-0" : "opacity-100"
    } ${className}`}
  >
    {children}
  </div>
);

/**
 * CenteredContainer - 중앙 정렬된 컨텐츠 컨테이너 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {ReactNode} props.children - 자식 노드
 * @param {string} props.className - 추가 CSS 클래스
 */
export const CenteredContainer = ({ children, className = "" }) => (
  <div className={`flex items-center justify-center min-h-screen ${className}`}>
    <div className="text-center">{children}</div>
  </div>
);

/**
 * OverlayContainer - 전체 화면 오버레이 컨테이너 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {ReactNode} props.children - 자식 노드
 * @param {boolean} props.show - 표시 여부
 * @param {function} props.onClose - 닫기 핸들러
 * @param {string} props.className - 추가 CSS 클래스
 */
export const OverlayContainer = ({
  children,
  show = false,
  onClose,
  className = "",
}) => {
  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/95 z-50 flex justify-center items-center ${className}`}
      style={{
        opacity: 0,
        animation: "fade-in 0.3s ease-in-out forwards",
      }}
    >
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white z-10"
          aria-label="닫기"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
      <div className="relative">{children}</div>
    </div>
  );
};

/**
 * VideoContainer - 비디오 컨테이너 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.src - 비디오 소스 URL
 * @param {boolean} props.isActive - 활성화 여부
 * @param {boolean} props.isLoading - 로딩 중 여부
 * @param {string} props.label - 비디오 레이블
 * @param {string} props.className - 추가 CSS 클래스
 */
export const VideoContainer = ({
  src,
  isActive = false,
  isLoading = false,
  label = "",
  className = "",
  ...props
}) => (
  <div
    className={`
      bg-gray-900 border 
      ${
        isActive ? "border-green-400 ring-2 ring-green-400" : "border-green-800"
      } 
      aspect-video flex items-center justify-center relative overflow-hidden 
      ${!src ? "cursor-pointer" : ""}
      ${className}
    `}
    {...props}
  >
    {src && (
      <video
        className="absolute inset-0 w-full h-full object-cover"
        style={{ display: "block" }}
        src={src}
        poster={props.poster || undefined}
        preload="auto"
        muted
        loop
        playsInline
      />
    )}

    {isActive && (
      <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50 animate-pulse"></div>
    )}

    <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2">
      <p className="text-green-500 font-mono text-center">
        {label}
        {src && (
          <span className="ml-2 text-xs">
            {isActive ? "(로드됨)" : "(재생 준비 중)"}
          </span>
        )}
        {!src && <span className="ml-2 text-xs">(로딩 중...)</span>}
      </p>
    </div>

    {isLoading && (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )}
  </div>
);
