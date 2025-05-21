import React from "react";

/**
 * 장면 0: 정면 응시 메시지 및 성별 선택 안내
 */
const WelcomeScene = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-white text-3xl font-bold mb-8">
        정면을 응시해주세요.
      </div>
      <div className="text-white text-xl mb-4">
        키보드로 성별을 선택해주세요:
      </div>
      <div className="flex space-x-8 mt-4">
        <div className="text-white text-xl border border-white px-6 py-2 rounded-lg">
          <span className="font-bold mr-2">M</span> 남성
        </div>
        <div className="text-white text-xl border border-white px-6 py-2 rounded-lg">
          <span className="font-bold mr-2">F</span> 여성
        </div>
      </div>
    </div>
  );
};

export default WelcomeScene;
