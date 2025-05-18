import React from "react";
import { TypewriterText } from "../HudComponents";

/**
 * 전시회의 인트로 단계를 렌더링하는 컴포넌트
 */
const IntroPhase = ({ introSequence, introTexts }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      {/* 정면 응시 메시지 */}
      <div className="text-white text-3xl font-bold mb-8">
        정면을 응시해주세요.
      </div>

      {/* 시퀀스 텍스트 */}
      {introSequence > 0 && introSequence <= introTexts.length && (
        <div className="max-w-4xl w-full p-8">
          <div className="text-green-400 text-3xl font-mono">
            <TypewriterText text={introTexts[introSequence - 1]} delay={50} />
          </div>
        </div>
      )}
    </div>
  );
};

export default IntroPhase;
