import React from "react";

/**
 * 전시 정보에 관련된 상수들을 정의한 파일
 */

// 인트로 시퀀스에 표시될 텍스트 목록
export const introTexts = [
  "당신이 올 것을 알고 있었습니다.",
  "개체 번호: EFD3WR",
  "생성 중...",
  "신원 확인 중...",
  "복제 프로세스 시작",
  "스캔 완료",
];

// 전시 단계 상수 (보다 명확한 코드를 위한 상수)
export const PHASES = {
  INTRO: 0,
  MAIN: 1,
  OUTRO: 2,
};
