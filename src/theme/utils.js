/**
 * 색상 변수를 CSS 변수로 변환하는 유틸리티 함수
 * @param {string} varName - CSS 변수 이름
 * @returns {string} CSS 변수 참조 문자열
 */
export const cssVar = (varName) => `var(--${varName})`;

/**
 * Tailwind 색상 클래스를 생성하는 유틸리티 함수
 * @param {string} colorPath - 색상 경로 (예: 'btn.primary.base')
 * @returns {string} Tailwind 클래스 이름
 */
export const tw = (colorPath) => {
  // 점 표기법을 대시로 변환 (btn.primary.base -> btn-primary-base)
  return colorPath.replace(/\./g, "-");
};
