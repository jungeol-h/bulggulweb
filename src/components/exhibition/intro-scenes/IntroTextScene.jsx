import React from "react";
import { TypewriterText } from "../../ui/text";
import { CenteredContainer } from "../../ui/container";
import { Panel } from "../../ui/panel";

/**
 * 장면 1: 첫 번째 타이핑 텍스트
 */
const IntroTextScene = ({ text }) => {
  return (
    <CenteredContainer>
      <Panel className="max-w-4xl w-full p-8 bg-opacity-50">
        <div className="text-green-400 text-3xl font-mono text-center">
          <TypewriterText text={text} delay={70} />
        </div>
      </Panel>
    </CenteredContainer>
  );
};

export default IntroTextScene;
