import React from "react";

/**
 * 장면 0: 정면 응시 메시지
 */
const WelcomeScene = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-white text-3xl font-bold mb-8">
        정면을 응시해주세요.
      </div>
    </div>
  );
};

export default WelcomeScene;
