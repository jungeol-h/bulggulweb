import React, { useEffect, useRef, useState } from "react";
import useEsp32Ws from "../../hooks/useEsp32Ws";
import "./FullscreenVideo.css"; // 전체화면 비디오 스타일을 위한 CSS 가져오기

// ESP32 WebSocket URL
const WS_URL = "ws://192.168.0.100:8080/keyboard";

/**
 * 전시회의 메인 단계를 렌더링하는 컴포넌트
 */
const MainPhase = () => {
  // ESP32 WebSocket 연결 훅
  const { connect, sendLed, onButton, close } = useEsp32Ws();

  // 비디오 참조 및 로딩된 비디오 인덱스 추적
  const videoRefs = useRef([]);
  const loadedIndices = useRef(new Set());

  // LED 상태 시각화를 위한 상태
  const [activeLeds, setActiveLeds] = useState([]);

  // 가상 전체화면 상태 관리
  const [fullscreenState, setFullscreenState] = useState({
    isActive: false,
    videoIndex: -1,
  });

  useEffect(() => {
    // WebSocket 연결 초기화
    connect(WS_URL);

    // ESP32로부터 버튼 이벤트 구독
    onButton((btnIdx) => {
      // 현재 전체화면에 표시된 영상과 동일한 버튼을 누르면 전체화면 종료
      if (
        fullscreenState.isActive &&
        fullscreenState.videoIndex === btnIdx - 1
      ) {
        setFullscreenState({
          isActive: false,
          videoIndex: -1,
        });
        console.log(`영상 ${btnIdx} 전체화면 종료`);
        return;
      }

      playFullscreen(btnIdx - 1);
    });

    // 키보드 이벤트 핸들러 (숫자키 1-8 입력 시 해당 영상 전체화면 토글)
    const handleKeyPress = (event) => {
      // ESC 키를 누르면 전체화면 종료
      if (event.key === "Escape") {
        setFullscreenState({
          isActive: false,
          videoIndex: -1,
        });
        return;
      }

      // 숫자키 1-8 (키코드 49-56 또는 키 값 '1'-'8')
      const keyNumber = parseInt(event.key);
      if (keyNumber >= 1 && keyNumber <= 8) {
        console.log(`숫자키 ${keyNumber} 입력됨`);

        // 현재 전체화면에 표시된 영상과 동일한 번호를 누르면 전체화면 종료
        if (
          fullscreenState.isActive &&
          fullscreenState.videoIndex === keyNumber - 1
        ) {
          setFullscreenState({
            isActive: false,
            videoIndex: -1,
          });
          console.log(`영상 ${keyNumber} 전체화면 종료`);
          return;
        }

        // 키보드 입력으로 전체화면 전환
        playFullscreen(keyNumber - 1);
      }
    };

    // 키보드 이벤트 리스너 등록
    window.addEventListener("keydown", handleKeyPress);

    // 컴포넌트 언마운트 시 정리
    return () => {
      close();
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [connect, onButton, close, fullscreenState]);

  // 가상 전체화면 전환 함수
  const playFullscreen = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      // 먼저 비디오 재생 시도
      video.play().catch((err) => {
        console.warn(`비디오 재생 실패: ${err.message}`);
      });

      // 가상 전체화면 상태 설정
      setFullscreenState({
        isActive: true,
        videoIndex: index,
      });

      console.log(`영상 ${index + 1} 가상 전체화면 전환 성공`);

      // 모바일에서 가로 방향 권장 (API 사용은 선택적)
      if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock("landscape").catch((err) => {
          console.warn(`화면 방향 설정 실패: ${err.message}`);
        });
      }
    }
  };

  // 비디오 로딩 완료 처리
  const handleVideoLoaded = (index) => {
    loadedIndices.current.add(index);
    const ledIndices = [...loadedIndices.current];

    // ESP32에 현재 로딩된 모든 영상 인덱스 전송
    sendLed(ledIndices);

    // LED 상태 시각화를 위해 상태 업데이트
    setActiveLeds(ledIndices);
  };

  return (
    <div className="min-h-screen p-8">
      {/* 가상 전체화면 오버레이 */}
      {fullscreenState.isActive && (
        <div className="overlay-container">
          <div className="pseudo-fullscreen-video-container">
            <video
              className="pseudo-fullscreen-video"
              src={`/videos/video-${fullscreenState.videoIndex + 1}.mp4`}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-4 grid-rows-2 gap-4">
        {[...Array(8)].map((_, i) => {
          const isActive = activeLeds.includes(i + 1);
          return (
            <div
              key={i}
              className={`bg-gray-900 border ${
                isActive
                  ? "border-green-400 ring-2 ring-green-400"
                  : "border-green-800"
              } aspect-video flex items-center justify-center relative overflow-hidden`}
            >
              <video
                ref={(el) => {
                  videoRefs.current[i] = el;
                  if (el) {
                    // 영상이 로드되면 자동 재생 시도
                    el.addEventListener("canplaythrough", function playVideo() {
                      el.play().catch((err) =>
                        console.warn(`자동 재생 실패: ${err.message}`)
                      );
                      el.removeEventListener("canplaythrough", playVideo);
                    });
                  }
                }}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ display: "block" }} // 전체화면에서 인라인 요소 깨지지 않도록
                src={`/videos/video-${i + 1}.mp4`}
                poster={`https://picsum.photos/800/450?random=${i}`}
                preload="auto"
                muted
                loop
                onCanPlayThrough={() => handleVideoLoaded(i + 1)}
                playsInline
              />
              {/* LED 상태 표시기 */}
              {isActive && (
                <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50 animate-pulse"></div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2">
                <p className="text-green-500 font-mono text-center">
                  영상 {i + 1}
                  <span className="ml-2 text-xs">
                    {isActive ? "(로드됨)" : ""}
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainPhase;
