/**
 * Bulggul Theme Configuration
 *
 * 이 파일은 애플리케이션 전체의 색상 팔레트를 정의합니다.
 * UI 컴포넌트에서 직접 하드코딩된 색상 값 대신 이 변수들을 사용하세요.
 */

// 메인 색상 팔레트
export const colors = {
  // 브랜드 색상
  brand: {
    primary: "#22c55e", // green-500
    secondary: "#4ade80", // green-400
    tertiary: "#16a34a", // green-600
    accent: "#15803d", // green-700
  },

  // 인터페이스 색상
  ui: {
    background: {
      primary: "#0d0d0d", // 주 배경색 (거의 검정)
      secondary: "#1e1e1e", // 보조 배경색 (다크 그레이)
      tertiary: "#2d2d2d", // 요소 배경색 (미디엄 그레이)
    },
    text: {
      primary: "#f9fafb", // 주 텍스트 (거의 흰색)
      secondary: "#d1d5db", // 보조 텍스트 (밝은 회색)
      muted: "#9ca3af", // 흐린 텍스트 (중간 회색)
    },
    border: {
      light: "#374151", // 밝은 테두리
      dark: "#1f2937", // 어두운 테두리
    },
  },

  // 상태 색상
  state: {
    success: "#10b981", // 성공 (에메랄드-500)
    warning: "#f59e0b", // 경고 (앰버-500)
    danger: "#ef4444", // 위험/오류 (빨강-500)
    info: "#3b82f6", // 정보 (블루-500)
  },

  // 버튼 색상
  button: {
    primary: {
      base: "#15803d", // 기본 (green-700)
      hover: "#16a34a", // 호버 (green-600)
      active: "#166534", // 활성화 (green-800)
    },
    secondary: {
      base: "#374151", // 기본 (gray-700)
      hover: "#4b5563", // 호버 (gray-600)
      active: "#1f2937", // 활성화 (gray-800)
    },
    danger: {
      base: "#b91c1c", // 기본 (red-700)
      hover: "#dc2626", // 호버 (red-600)
      active: "#991b1b", // 활성화 (red-800)
    },
  },

  // 특수 효과 색상
  effects: {
    glow: "#22c55e33", // 녹색 글로우 효과 (반투명)
    highlight: "#c084fc", // 하이라이트 색상 (퍼플)
  },
};

// 테마 객체 - 나중에 확장 가능
export const theme = {
  colors,
};

export default theme;
