import React, { useState, useEffect, useCallback } from "react";
import WelcomeScene from "./WelcomeScene";
import IntroTextScene from "./IntroTextScene";
import EntityScanScene from "./EntityScanScene";
import InfoDisplayScene from "./InfoDisplayScene";
import FollowupTextScene from "./FollowupTextScene";
import { ContentContainer } from "../../ui/container";
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
  previewUrl,
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
            previewUrl={previewUrl}
          />
        );
      } else if (sequence === 1) {
        // IntroTextScene - 첫 번째 텍스트 씬
        setCurrentScene(<IntroTextScene text={introTexts[0]} />);
      } else if (sequence === 2) {
        // Skip EntityScanScene and go directly to InfoDisplayScene
        // This will be reactivated later
        console.log("EntityScanScene 건너뛰기 (임시적으로 비활성화됨)");
        // Auto-advance to next sequence after a longer delay
        setTimeout(() => {
          console.log("장면 2: 6초 후 다음 장면으로 자동 진행");
          if (window.advanceIntroSequence) {
            window.advanceIntroSequence();
          }
        }, 6000); // 장면 2 표시 시간 증가

        // Show a placeholder or loading message
        setCurrentScene(
          <div className="text-green-500 font-mono text-2xl text-center p-8">
            데이터 스캔 중... <br />
            {/* <span className="text-sm opacity-70">
              (EntityScanScene 임시 비활성화됨)
            </span> */}
          </div>
        );
      } else if (sequence === 3) {
        // InfoDisplayScene - 정보 표시 씬
        setCurrentScene(
          <InfoDisplayScene
            survivalTime={survivalTime}
            dnaSequenceVisible={dnaSequenceVisible}
            dnaSequence={dnaSequence}
            targetId={targetId}
          />
        );
      } else if (sequence <= introTexts.length) {
        // FollowupTextScene - 추가 텍스트 씬
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
      previewUrl,
    ]
  );

  // 씬 전환 효과를 위한 useEffect
  useEffect(() => {
    // 시퀀스가 변경됐을 때만 전환 애니메이션 적용
    if (prevSequence !== introSequence) {
      // 페이드아웃 시작
      setIsTransitioning(true);
      console.log(`씬 전환: ${prevSequence} -> ${introSequence} (페이드아웃 시작)`);

      // 페이드아웃 후 컴포넌트 변경 (페이드아웃에 1500ms 소요)
      const timer = setTimeout(() => {
        setPrevSequence(introSequence);
        updateCurrentScene(introSequence);
        console.log(`씬 ${introSequence} 로딩 완료, 페이드인 준비`);

        // 페이드인 시작 (약간의 지연 후 시작)
        setTimeout(() => {
          setIsTransitioning(false);
          console.log(`씬 ${introSequence} 페이드인 시작`);
        }, 200); // 페이드인 시작 전 딜레이 증가
      }, 1500); // 페이드아웃 시간 증가

      return () => clearTimeout(timer);
    } else if (currentScene === null) {
      // 최초 마운트 시에는 즉시 현재 씬 설정
      updateCurrentScene(introSequence);
    }
  }, [introSequence, prevSequence, currentScene, updateCurrentScene]);

  // 페이드 효과가 적용된 컨테이너로 씬 렌더링
  return (
    <ContentContainer isTransitioning={isTransitioning}>
      {currentScene}
    </ContentContainer>
  );
};

export default SceneManager;
