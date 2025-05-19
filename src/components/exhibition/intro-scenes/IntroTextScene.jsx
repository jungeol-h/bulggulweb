import React from "react";
import { TypewriterText } from "../../web/HudComponents";

/**
 * 장면 1: 첫 번째 타이핑 텍스트
 */
const IntroTextScene = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-4xl w-full p-8">
        <div className="text-green-400 text-3xl font-mono text-center">
          <TypewriterText text={text} delay={50} />
        </div>
      </div>
    </div>
  );
};

export default IntroTextScene;
