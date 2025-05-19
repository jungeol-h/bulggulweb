/**
 * 인트로 씬에서 사용되는 유틸리티 함수들
 */

// 랜덤 엔티티 ID 생성 함수
export const generateRandomEntityId = () => {
  const prefix = "F";
  const mid = Math.floor(Math.random() * 999)
    .toString()
    .padStart(3, "0");
  const suffix = Math.floor(Math.random() * 999)
    .toString()
    .padStart(3, "0");
  return `${prefix}${mid}-${suffix}`;
};

// DNA 시퀀스 시뮬레이션
export const simulateDnaSequence = (setDnaSequence) => {
  const bases = ["A", "T", "G", "C"];
  let sequence = "";
  const maxLength = 300;

  const generateSequence = (index = 0) => {
    if (index >= maxLength) {
      // DNA 시퀀스 생성 완료
      return;
    }

    sequence += bases[Math.floor(Math.random() * bases.length)];
    setDnaSequence(sequence);

    setTimeout(() => generateSequence(index + 1), 10);
  };

  generateSequence();
};
