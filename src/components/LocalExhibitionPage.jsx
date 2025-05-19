import React, { useState, useCallback, useEffect } from "react";
import { StarryBackground } from "./HudComponents";
import { IntroPhase, MainPhase, OutroPhase, DebugPanel } from "./exhibition";
// import useWebcam from "../hooks/useWebcam";
import useVisitorData from "../hooks/useVisitorData";
import { introTexts, PHASES } from "../constants/exhibitionConstants";

/**
 * LocalExhibitionPage - 전시 현장에서 로컬 네트워크로 실행되는 전용 페이지
 * 관객에게 보여지는 인터페이스로, 인트로, 메인, 아웃트로 3단계로 구성됨
 */
const LocalExhibitionPage = () => {
  // 전시 단계 관리
  const [exhibitionPhase, setExhibitionPhase] = useState(PHASES.INTRO);

  // 페이즈 전환 애니메이션 상태
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 인트로 시퀀스 관리
  const [introSequence, setIntroSequence] = useState(0);

  // 방문자 데이터 관리
  const { visitorData, isLoading, error } = useVisitorData();

  // 웹캠 관리 (인트로 단계에서만 활성화) - 일시적으로 비활성화
  /* const {
    webcamRef,
    webcamActive,
    error: webcamError,
  } = useWebcam(exhibitionPhase === PHASES.INTRO); */
  // 웹캠 관련 코드 일시적으로 제거

  // 인트로 시퀀스 진행 함수
  const advanceIntroSequence = useCallback(() => {
    // 항상 다음 시퀀스로만 진행하고 메인 단계로는 자동 진행 안함
    // (메인 단계로 진행은 마지막 시퀀스에서 스페이스바를 눌러야 함)
    setIntroSequence((prev) => prev + 1);
  }, []);

  // 전역 advanceIntroSequence 함수 설정 (IntroPhase 컴포넌트에서 접근할 수 있도록)
  useEffect(() => {
    window.advanceIntroSequence = advanceIntroSequence;

    // 언마운트시 정리
    return () => {
      window.advanceIntroSequence = undefined;
    };
  }, [advanceIntroSequence]);

  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        event.preventDefault();

        if (exhibitionPhase === PHASES.INTRO) {
          if (introSequence === 0) {
            // 초기 인트로 단계(정면 응시 메시지)에서 스페이스바가 작동하게 함
            advanceIntroSequence();
          } else if (introSequence === introTexts.length) {
            // 인트로 마지막 시퀀스에서 스페이스바를 누르면 페이드 효과 후 메인 단계로 진행
            setIsTransitioning(true);
            setTimeout(() => {
              setExhibitionPhase(PHASES.MAIN);
              setTimeout(() => {
                setIsTransitioning(false);
              }, 500);
            }, 1000);
          }
        } else if (exhibitionPhase === PHASES.MAIN) {
          // 메인 페이즈에서 스페이스바를 누르면 페이드 효과 후 아웃트로 단계로 진행
          setIsTransitioning(true);
          setTimeout(() => {
            setExhibitionPhase(PHASES.OUTRO);
            setTimeout(() => {
              setIsTransitioning(false);
            }, 500);
          }, 1000);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [exhibitionPhase, introSequence, advanceIntroSequence]);

  // 웹캠 에러가 있으면 전체 에러 상태에 반영
  const combinedError = error; // webcamError 일시적으로 제외

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* 배경 효과 */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <StarryBackground count={150} />
        <div
          className="scanline-effect"
          style={{
            backgroundImage: "url('/images/scanline.png')",
            backgroundRepeat: "repeat",
            mixBlendMode: "soft-light",
            opacity: 0.15,
            filter: "blur(0.4px) contrast(110%) saturate(70%) brightness(1.1)",
          }}
        ></div>
      </div>

      {/* 전시 단계에 따른 내용 렌더링 */}
      <div
        className={`relative z-10 container mx-auto transition-opacity duration-1000 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {exhibitionPhase === PHASES.INTRO && (
          <IntroPhase
            introSequence={introSequence}
            introTexts={introTexts}
            // 웹캠 관련 props 임시 제거
            // webcamRef={webcamRef}
            // webcamActive={webcamActive}
          />
        )}
        {exhibitionPhase === PHASES.MAIN && <MainPhase />}
        {exhibitionPhase === PHASES.OUTRO && <OutroPhase />}
      </div>

      {/* 디버그 정보 표시 (개발 중에만 활성화) */}
      <DebugPanel
        visitorData={visitorData}
        exhibitionPhase={exhibitionPhase}
        introSequence={introSequence}
        introTexts={introTexts}
        isLoading={isLoading}
        error={combinedError}
      />
    </div>
  );
};

export default LocalExhibitionPage;
