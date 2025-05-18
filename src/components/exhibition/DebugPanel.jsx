import React from "react";

/**
 * 디버그 정보를 표시하는 패널 컴포넌트
 */
const DebugPanel = ({
  visitorData,
  exhibitionPhase,
  introSequence,
  introTexts,
  isLoading,
  error,
}) => {
  return (
    <div className="absolute bottom-4 right-4 z-50 bg-black/80 p-3 border border-green-800 text-xs text-green-400 font-mono">
      <div>방문자 ID: {visitorData?.visitorId || "로딩 중"}</div>
      <div>단계: {["인트로", "메인", "아웃트로"][exhibitionPhase]}</div>
      <div>
        시퀀스: {introSequence}/{introTexts.length}
      </div>
      <div>상태: {isLoading ? "로딩 중" : error ? "에러" : "정상"}</div>
    </div>
  );
};

export default DebugPanel;
