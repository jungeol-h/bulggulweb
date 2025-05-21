import React, { useState, useCallback, useEffect } from "react";
import { StarryBackground } from "../web/HudComponents";
import { IntroPhase, MainPhase, OutroPhase, DebugPanel } from ".";
import useWebcam from "../../hooks/useWebcam";
import useVisitorData from "../../hooks/useVisitorData";
import { introTexts, PHASES } from "../../constants/exhibitionConstants";

// 메인 서버 URL 및 API Key 상수
const MAIN_SERVER_URL = "http://192.168.0.10:8000/upload_image/";
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

  // 웹캠 관리 (인트로 단계에서만 활성화)
  const {
    webcamRef,
    webcamActive,
    error: webcamError,
  } = useWebcam(exhibitionPhase === PHASES.INTRO);

  // 방문자 SID 관리
  const [visitorSid, setVisitorSid] = useState(null);

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

  // 웹캠 이미지 캡처 함수
  const captureImage = useCallback(() => {
    if (webcamRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = webcamRef.current.video.videoWidth;
      canvas.height = webcamRef.current.video.videoHeight;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(webcamRef.current.video, 0, 0);

      // 이미지를 Blob으로 변환
      return new Promise((resolve) => {
        canvas.toBlob(
          (blob) => {
            resolve(blob);
          },
          "image/jpeg",
          0.9
        );
      });
    }
    return Promise.resolve(null);
  }, [webcamRef]);

  // 방문자 데이터 서버 전송 함수
  const sendVisitorData = useCallback(
    async (gender) => {
      try {
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

        // FormData 객체 생성
        const formData = new FormData();
        formData.append("file", imageBlob, "visitor_image.jpg");
        formData.append("gender", gender === "m" ? "1" : "2"); // 남자(m):1, 여자(f):2
        formData.append("sid", sid.toString());

        // 서버로 데이터 전송
        const response = await fetch(MAIN_SERVER_URL, {
          method: "POST",
          headers: {
            "X-API-KEY": API_KEY,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`서버 응답 오류: ${response.status}`);
        }

        const result = await response.json();
        console.log("방문자 데이터 전송 성공:", result);

        // 성공적으로 전송 후 페이드 효과와 함께 메인 단계로 진행
        setIsTransitioning(true);
        setTimeout(() => {
          setExhibitionPhase(PHASES.MAIN);
          setTimeout(() => {
            setIsTransitioning(false);
          }, 500);
        }, 1000);
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
      // 인트로 페이즈 처리
      if (exhibitionPhase === PHASES.INTRO) {
        if (introSequence === 0) {
          // 초기 인트로 단계(정면 응시 메시지)에서 m 또는 f 키로 성별 선택하고 진행
          if (event.key === "m" || event.key === "M") {
            event.preventDefault();
            console.log("성별 선택: 남성");
            sendVisitorData("m");
          } else if (event.key === "f" || event.key === "F") {
            event.preventDefault();
            console.log("성별 선택: 여성");
            sendVisitorData("f");
          }
        }
        // 마지막 시퀀스에서는 더 이상 키보드 입력 필요 없음
        else if (introSequence === introTexts.length) {
          // 이전 코드에서 성별 선택 기능을 초기 단계로 이동했으므로 이 부분은 비워둠
        }
      }
      // 메인 페이즈에서 스페이스바를 누르면 아웃트로로 진행
      else if (exhibitionPhase === PHASES.MAIN && event.code === "Space") {
        event.preventDefault();
        setIsTransitioning(true);
        setTimeout(() => {
          setExhibitionPhase(PHASES.OUTRO);
          setTimeout(() => {
            setIsTransitioning(false);
          }, 500);
        }, 1000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [exhibitionPhase, introSequence, advanceIntroSequence, sendVisitorData]);

  // 웹캠 에러가 있으면 전체 에러 상태에 반영
  const combinedError = error || webcamError;

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
            webcamRef={webcamRef}
            webcamActive={webcamActive}
            visitorSid={visitorSid}
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
