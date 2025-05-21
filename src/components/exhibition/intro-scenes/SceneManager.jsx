import React, { useState, useEffect, useCallback } from "react";
import WelcomeScene from "./WelcomeScene";
import IntroTextScene from "./IntroTextScene";
import EntityScanScene from "./EntityScanScene";
import InfoDisplayScene from "./InfoDisplayScene";
import FollowupTextScene from "./FollowupTextScene";
// import { generateRandomEntityId } from "./utils";

// 시퀀스별 씬을 매핑
const SceneManager = ({
  introSequence,
  introTexts,
  entityIds,
  entityHighlighted,
  entityTarget,
  targetId,
  dnaSequenceVisible,
  dnaSequence,
  survivalTime,
  webcamRef,
  webcamActive,
  webcamError,
}) => {
  const [prevSequence, setPrevSequence] = useState(introSequence);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentScene, setCurrentScene] = useState(null);

  // 시퀀스 번호에 따라 현재 씬 컴포넌트 업데이트 (useCallback으로 메모이제이션)
  const updateCurrentScene = useCallback(
    (sequence) => {
      if (sequence === 0) {
        setCurrentScene(
          <WelcomeScene
            webcamRef={webcamRef}
            webcamActive={webcamActive}
            webcamError={webcamError}
          />
        );
      } else if (sequence === 1) {
        setCurrentScene(<IntroTextScene text={introTexts[0]} />);
      } else if (sequence === 2) {
        setCurrentScene(
          <EntityScanScene
            entityIds={entityIds}
            entityHighlighted={entityHighlighted}
            entityTarget={entityTarget}
            targetId={targetId}
            gridScrollRef={window.gridScrollRef}
            targetEntityRef={window.targetEntityRef}
          />
        );
      } else if (sequence === 3) {
        setCurrentScene(
          <InfoDisplayScene
            survivalTime={survivalTime}
            dnaSequenceVisible={dnaSequenceVisible}
            dnaSequence={dnaSequence}
            targetId={targetId}
          />
        );
      } else if (sequence <= introTexts.length) {
        setCurrentScene(
          <FollowupTextScene
            text={introTexts[sequence - 1]}
            isLastScene={sequence === introTexts.length}
          />
        );
      } else {
        setCurrentScene(<div className="min-h-screen"></div>);
      }
    },
    [
      introTexts,
      entityIds,
      entityHighlighted,
      entityTarget,
      targetId,
      dnaSequenceVisible,
      dnaSequence,
      survivalTime,
      webcamRef,
      webcamActive,
      webcamError,
    ]
  );

  // 씬 전환 효과를 위한 useEffect
  useEffect(() => {
    // 시퀀스가 변경됐을 때만 전환 애니메이션 적용
    if (prevSequence !== introSequence) {
      // 페이드아웃 시작
      setIsTransitioning(true);

      // 페이드아웃 후 컴포넌트 변경 (페이드아웃에 1000ms 소요)
      const timer = setTimeout(() => {
        setPrevSequence(introSequence);
        updateCurrentScene(introSequence);

        // 페이드인 시작 (짧은 지연 후 시작)
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 1000); // 페이드아웃 완료 시간

      return () => clearTimeout(timer);
    } else if (currentScene === null) {
      // 최초 마운트 시에는 즉시 현재 씬 설정
      updateCurrentScene(introSequence);
    }
  }, [introSequence, prevSequence, currentScene, updateCurrentScene]);

  // 페이드 효과가 적용된 컨테이너로 씬 렌더링
  return (
    <div
      className={`transition-opacity duration-1000 ease-in-out ${
        isTransitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      {currentScene}
    </div>
  );
};

export default SceneManager;
