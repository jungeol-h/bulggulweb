import React from "react";
import { CenteredContainer } from "../../ui/container";
import { Panel } from "../../ui/panel";
import { GridBackground } from "../../ui/background";

/**
 * 장면 2: 엔티티 그리드 스캐닝
 *
 * 참고: 이 장면은 현재 임시적으로 비활성화되어 있습니다.
 * SceneManager.jsx에서 이 장면을 스킵하도록 설정되어 있습니다.
 * 나중에 다시 활성화하려면 SceneManager.jsx와 IntroPhase.jsx 파일의 관련 코드를 수정해야 합니다.
 */
const EntityScanScene = ({
  entityIds,
  entityHighlighted,
  entityTarget,
  targetId,
  gridScrollRef,
  targetEntityRef,
}) => {
  return (
    <CenteredContainer>
      <Panel className="w-full h-48 overflow-hidden relative">
        <GridBackground className="opacity-20" />
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <div className="h-full w-0.5 bg-green-500 opacity-80"></div>
        </div>
        <div
          ref={gridScrollRef}
          className="flex items-center transition-transform"
          style={{
            transform: "translateX(100vw)",
          }}
        >
          {entityIds.map((id, index) => (
            <div
              key={index}
              ref={id === targetId ? targetEntityRef : null}
              className={`px-8 py-4 font-mono text-2xl mx-2 transition-all duration-300 ${
                entityHighlighted && id === entityTarget
                  ? "text-green-500 border border-green-500 bg-black bg-opacity-80"
                  : entityHighlighted
                  ? "opacity-30"
                  : "text-green-300"
              }`}
            >
              {id}
            </div>
          ))}
        </div>
      </Panel>
    </CenteredContainer>
  );
};

export default EntityScanScene;
