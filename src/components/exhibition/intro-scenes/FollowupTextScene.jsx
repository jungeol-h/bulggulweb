import React, { useState, useEffect } from "react";
import { TypewriterText, BlinkingText } from "../../ui/text";
import { CenteredContainer } from "../../ui/container";
import { Panel } from "../../ui/panel";

/**
 * 장면 4+: 후속 텍스트 메시지들
 */
const FollowupTextScene = ({ text, isLastScene }) => {
  const [showSpacebarHint, setShowSpacebarHint] = useState(false);

  // 마지막 장면에서는 텍스트 타이핑이 완료된 후 스페이스바 안내 메시지 표시
  useEffect(() => {
    if (isLastScene) {
      // 타이핑 시간 (글자수 × 타이핑 속도) + 충분한 읽기 시간
      const typingDelay = text.length * 70 + 4000;
      console.log(`마지막 장면: ${typingDelay}ms 후 스페이스바 안내 표시`);

      const timer = setTimeout(() => {
        setShowSpacebarHint(true);
      }, typingDelay);

      return () => clearTimeout(timer);
    }
  }, [isLastScene, text]);

  return (
    <CenteredContainer>
      <Panel className="max-w-4xl w-full p-8">
        <div className="text-green-400 text-2xl font-mono text-center">
          <TypewriterText text={text} delay={70} />
        </div>

        {showSpacebarHint && isLastScene && (
          <div className="mt-16 text-center">
            <BlinkingText className="text-white text-xl font-mono border border-green-500 py-3 px-6 bg-black bg-opacity-50 inline-block">
              [ 스페이스바를 눌러 계속하세요 ]
            </BlinkingText>
          </div>
        )}
      </Panel>
    </CenteredContainer>
  );
};

export default FollowupTextScene;
