import React, { useState, useCallback, useEffect } from "react";
import { IntroPhase, MainPhase, OutroPhase, DebugPanel } from ".";
import useWebcam from "../../hooks/useWebcam";
import useVisitorData from "../../hooks/useVisitorData";
import useVideoPreload from "../../hooks/useVideoPreload";
import { introTexts, PHASES } from "../../constants/exhibitionConstants";
import {
  BackgroundContainer,
  ContentContainer,
  ScanlineEffect,
  StarryBackground,
} from "../ui";

// 메인 서버 URL 및 API Key 상수
const API_ENDPOINT = "http://192.168.0.10:8000/upload_image/";
const API_KEY = "bFd5omw*vR*>-o7M@^21g0FD-";

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

  // 웹캠 관리 (필요할 때만 사용)
  const {
    webcamRef,
    webcamActive,
    error: webcamError,
    previewUrl,
    captureImage,
  } = useWebcam(exhibitionPhase === PHASES.INTRO);

  // 방문자 SID 관리
  const [visitorSid, setVisitorSid] = useState(null);

  // 비디오 사전 로드 훅 사용 (introSequence가 1 이상일 때만 활성화)
  const {
    atLeastOneLoaded,
    videoUrls,
    loadedIndices,
    loading: videoLoading,
  } = useVideoPreload(visitorSid, introSequence >= 1);

  // 인트로 시퀀스 진행 함수
  const advanceIntroSequence = useCallback(() => {
    // 항상 다음 시퀀스로만 진행하고 메인 단계로는 자동 진행 안함
    // (메인 단계로 진행은 마지막 시퀀스에서 스페이스바를 눌러야 함)
    setIntroSequence((prev) => prev + 1);
  }, []);

  // SID 생성 함수 (100000~999999 범위의 랜덤 정수)
  const generateSid = useCallback(() => {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }, []);

  // 방문자 데이터 서버 전송 함수
  const sendVisitorData = useCallback(
    async (gender) => {
      try {
        // 로딩 상태 표시
        console.log("이미지 캡처 중...");

        // 이미지 캡처
        const imageBlob = await captureImage();
        if (!imageBlob) {
          console.error("이미지 캡처에 실패했습니다.");
          return;
        }

        // SID가 없으면 생성
        if (!visitorSid) {
          setVisitorSid(generateSid());
        }

        const sid = visitorSid || generateSid();
        console.log("방문자 데이터 전송 중...", { sid, gender });

        // FormData 객체 생성
        const formData = new FormData();
        formData.append("file", imageBlob, "visitor_image.jpg");
        formData.append("gender", gender === "m" ? "1" : "2"); // 남자(m):1, 여자(f):2
        formData.append("sid", sid.toString());

        // 성공적으로 이미지 캡처 후 인트로 시퀀스를 시작합니다
        // 전시 통로를 걸어 입장하는 시간을 고려해 5초 딜레이 후 시작
        console.log("이미지 캡처 완료: 5초 후 인트로 시퀀스 시작");

        // 페이드 효과와 함께 인트로 시퀀스 시작
        setIsTransitioning(true);
        setTimeout(() => {
          // 초기 시퀀스로 넘어가 IntroTextScene으로 시작
          setIntroSequence(1);
          setTimeout(() => {
            setIsTransitioning(false);
          }, 800); // 페이드인 시간 증가
        }, 5000); // 입장 시간을 고려한 더 긴 딜레이

        // 백그라운드에서 API 요청 처리 (응답 기다리지 않음)
        console.log("API 요청 URL:", API_ENDPOINT);
        fetch(API_ENDPOINT, {
          method: "POST",
          headers: {
            "X-API-KEY": API_KEY,
          },
          body: formData,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`서버 응답 오류: ${response.status}`);
            }
            return response.json();
          })
          .then(() => {
            console.log("방문자 데이터 전송 성공 (백그라운드)");
          })
          .catch((err) => {
            console.error("방문자 데이터 전송 실패 (백그라운드):", err);
          });
      } catch (err) {
        console.error("방문자 데이터 전송 실패:", err);
      }
    },
    [captureImage, generateSid, visitorSid]
  );

  // 전역 advanceIntroSequence 함수 설정 (IntroPhase 컴포넌트에서 접근할 수 있도록)
  useEffect(() => {
    window.advanceIntroSequence = advanceIntroSequence;

    // 언마운트시 정리
    return () => {
      window.advanceIntroSequence = undefined;
    };
  }, [advanceIntroSequence]);

  // 컴포넌트 마운트 시 SID 생성
  useEffect(() => {
    setVisitorSid(generateSid());
  }, [generateSid]);

  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (event) => {
      // 키 입력 디버깅 간소화
      console.log("키 입력:", event.key, event.code);

      // 인트로 페이즈 처리
      if (exhibitionPhase === PHASES.INTRO) {
        if (introSequence === 0) {
          // 초기 인트로 단계에서 성별 선택 (영문 m/f, 한글 ㅡ/ㄹ 또는 1/2 번호키 지원)
          if (
            event.key === "m" ||
            event.key === "M" ||
            event.code === "KeyM" ||
            event.key === "ㅡ" ||
            event.key === "1"
          ) {
            event.preventDefault();
            console.log("성별 선택: 남성");
            sendVisitorData("m");
          } else if (
            event.key === "f" ||
            event.key === "F" ||
            event.code === "KeyF" ||
            event.key === "ㄹ" ||
            event.key === "2"
          ) {
            event.preventDefault();
            console.log("성별 선택: 여성");
            sendVisitorData("f");
          }
        }
        // 마지막 시퀀스에서 스페이스바를 누르면 메인 단계로 진행
        else if (
          introSequence === introTexts.length &&
          event.code === "Space"
        ) {
          event.preventDefault();
          console.log("마지막 인트로 씬에서 메인 단계로 진행");
          setIsTransitioning(true);
          setTimeout(() => {
            setExhibitionPhase(PHASES.MAIN);
            setTimeout(() => {
              setIsTransitioning(false);
            }, 800); // 페이드인 시간 증가
          }, 1500); // 페이드아웃 시간 증가
        }
      }
      // 메인 페이즈에서 스페이스바를 누르면 아웃트로로 진행
      else if (exhibitionPhase === PHASES.MAIN && event.code === "Space") {
        event.preventDefault();
        console.log("메인 단계에서 아웃트로 단계로 진행");
        setIsTransitioning(true);
        setTimeout(() => {
          setExhibitionPhase(PHASES.OUTRO);
          setTimeout(() => {
            setIsTransitioning(false);
          }, 800); // 페이드인 시간 증가
        }, 1500); // 페이드아웃 시간 증가
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [exhibitionPhase, introSequence, advanceIntroSequence, sendVisitorData]);

  // 웹캠 에러가 있으면 전체 에러 상태에 반영
  const combinedError = error || webcamError;

  // 비디오가 로드되면 메인 단계로 자동 전환
  useEffect(() => {
    if (
      atLeastOneLoaded &&
      exhibitionPhase === PHASES.INTRO &&
      introSequence >= 1
    ) {
      console.log("비디오 로드 감지: 자동으로 메인 단계로 전환합니다.");

      setIsTransitioning(true);
      setTimeout(() => {
        setExhibitionPhase(PHASES.MAIN);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 800); // 페이드인 시간 증가
      }, 1500); // 페이드아웃 시간 증가
    }
  }, [atLeastOneLoaded, exhibitionPhase, introSequence]);

  return (
    <BackgroundContainer stars={true} scanline={true}>
      {/* 전시 단계에 따른 내용 렌더링 */}
      <ContentContainer isTransitioning={isTransitioning}>
        {exhibitionPhase === PHASES.INTRO && (
          <IntroPhase
            introSequence={introSequence}
            introTexts={introTexts}
            webcamRef={webcamRef}
            webcamActive={webcamActive}
            visitorSid={visitorSid}
            webcamError={webcamError}
            previewUrl={previewUrl}
          />
        )}
        {exhibitionPhase === PHASES.MAIN && (
          <MainPhase
            sessionId={visitorSid}
            initialVideoUrls={videoUrls}
            initialLoadedIndices={loadedIndices}
          />
        )}
        {exhibitionPhase === PHASES.OUTRO && <OutroPhase />}
      </ContentContainer>

      {/* 디버그 정보 표시 (개발 중에만 활성화) */}
      {/* <DebugPanel
        visitorData={visitorData}
        exhibitionPhase={exhibitionPhase}
        introSequence={introSequence}
        introTexts={introTexts}
        isLoading={isLoading}
        error={combinedError}
      /> */}
    </BackgroundContainer>
  );
};

export default LocalExhibitionPage;
