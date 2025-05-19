import React, { useState, useEffect } from "react";
import { TypewriterText } from "../../HudComponents";

/**
 * 장면 4+: 후속 텍스트 메시지들
 */
const FollowupTextScene = ({ text, isLastScene }) => {
  const [showSpacebarHint, setShowSpacebarHint] = useState(false);

  // 마지막 장면에서는 텍스트 타이핑이 완료된 후 스페이스바 안내 메시지 표시
  useEffect(() => {
    if (isLastScene) {
      const typingDelay = text.length * 50 + 500; // 타이핑 시간 + 추가 지연시간
      const timer = setTimeout(() => {
        setShowSpacebarHint(true);
      }, typingDelay);

      return () => clearTimeout(timer);
    }
  }, [isLastScene, text]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-4xl w-full p-8">
        <div className="text-green-400 text-2xl font-mono text-center">
          <TypewriterText text={text} delay={50} />
        </div>

        {/* {showSpacebarHint && (
          <div className="mt-16 text-white text-xl font-mono text-center animate-pulse border border-green-500 py-3 px-6 bg-black bg-opacity-50 inline-block mx-auto">
            [ 스페이스바를 눌러 계속하세요 ]
          </div>
        )} */}
      </div>
    </div>
  );
};

export default FollowupTextScene;
