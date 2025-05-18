import React from "react";

/**
 * 전시회의 메인 단계를 렌더링하는 컴포넌트
 */
const MainPhase = () => {
  return (
    <div className="min-h-screen p-8">
      <div className="grid grid-cols-4 grid-rows-2 gap-4 h-full">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-900 border border-green-800 aspect-video flex items-center justify-center"
          >
            <p className="text-green-500 font-mono">영상 {i + 1}</p>
            {/* 실제 구현 시 여기에 영상 삽입 */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPhase;
