import React from "react";

/**
 * 전시회의 아웃트로 단계를 렌더링하는 컴포넌트
 */
const OutroPhase = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-4xl text-green-400 mb-6">세션 종료</h2>
        <p className="text-gray-300">전시를 체험해주셔서 감사합니다.</p>
      </div>
    </div>
  );
};

export default OutroPhase;
