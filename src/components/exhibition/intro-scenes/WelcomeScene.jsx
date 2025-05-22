import React from "react";
import { CenteredContainer } from "../../ui/container";
import { Panel } from "../../ui/panel";
import { GlitchText } from "../../ui/text";

/**
 * 장면 0: 정면 응시 메시지 및 성별 선택 안내
 * OBS Virtual Camera로 연결된 카메라 피드 표시
 * (UI 요소는 제거됨)
 */
const WelcomeScene = ({ webcamRef, webcamActive, webcamError, previewUrl }) => {
  return (
    <CenteredContainer>
      {/* 숨겨진 비디오 요소 - 로직은 유지 */}
      <div className="hidden">
        <video ref={webcamRef} autoPlay playsInline muted />
      </div>

      <GlitchText
        text="정면을 응시해주세요"
        className="text-white text-3xl font-bold"
      />
    </CenteredContainer>
  );
};

export default WelcomeScene;
