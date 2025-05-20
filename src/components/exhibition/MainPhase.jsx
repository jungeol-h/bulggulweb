import React, { useEffect, useRef, useState } from "react";
import useEsp32Ws from "../../hooks/useEsp32Ws";
import Esp32DebugPanel from "./Esp32DebugPanel";
import "./FullscreenVideo.css"; // 전체화면 비디오 스타일을 위한 CSS 가져오기

// ESP32 WebSocket URL
const WS_URL = "ws://192.168.0.100:8080/keyboard";

// 개발 환경에서 사용할 시뮬레이션 모드 활성화
const SIMULATION_MODE = true;

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

  useEffect(() => {
    // 시뮬레이션 모드가 아닐 때만 실제 WebSocket 연결 초기화
    if (!SIMULATION_MODE) {
      connect(WS_URL);
    } else {
      console.info(
        "ESP32 시뮬레이션 모드 활성화: WebSocket 연결 없이 테스트합니다."
      );
    }

    // ESP32로부터 버튼 이벤트 구독
    onButton((btnIdx) => {
      playFullscreen(btnIdx - 1);
    });

    // 전체화면 종료 이벤트 감지
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        // 전체화면 종료 시 모든 비디오에서 추가된 CSS 클래스 제거
        videoRefs.current.forEach((video) => {
          if (video) {
            video.classList.remove("video-fullscreen");
          }
        });
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    // 키보드 이벤트 핸들러 (숫자키 1-8 입력 시 해당 영상 전체화면)
    const handleKeyPress = (event) => {
      // 숫자키 1-8 (키코드 49-56 또는 키 값 '1'-'8')
      const keyNumber = parseInt(event.key);
      if (keyNumber >= 1 && keyNumber <= 8) {
        console.log(`숫자키 ${keyNumber} 입력됨`);

        if (SIMULATION_MODE) {
          // 시뮬레이션 모드에서는 ESP32로부터 버튼 이벤트가 오는 것처럼 시뮬레이션
          console.log(`ESP32 버튼 ${keyNumber} 입력 시뮬레이션`);
          // onButton에 등록된 콜백이 이 이벤트를 처리함
          playFullscreen(keyNumber - 1);
        } else {
          // 비시뮬레이션 모드에서도 동일하게 처리
          playFullscreen(keyNumber - 1);
        }
      }
    };

    // 시뮬레이션 모드에서 사용할 버튼 콜백 함수
    if (SIMULATION_MODE) {
      const simulationButtonCallback = (btnIdx) => {
        playFullscreen(btnIdx - 1);
      };
      // onButton 훅 함수로 콜백 등록 (실제 ESP32 연결 시와 동일하게)
      onButton(simulationButtonCallback);
    }

    // 키보드 이벤트 리스너 등록
    window.addEventListener("keydown", handleKeyPress);

    // 컴포넌트 언마운트 시 정리
    return () => {
      if (!SIMULATION_MODE) {
        close();
      }
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [connect, onButton, close]);

  // 영상 전체화면 전환 함수
  const playFullscreen = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      // 전체화면용 CSS 클래스 추가
      video.classList.add("video-fullscreen");

      // 먼저 비디오 재생 시도
      video.play().catch((err) => {
        console.warn(`비디오 재생 실패: ${err.message}`);
      });

      // 전체화면 API - 브라우저 호환성을 위해 여러 접두사 시도
      const requestFullscreen =
        video.requestFullscreen ||
        video.webkitRequestFullscreen ||
        video.mozRequestFullScreen ||
        video.msRequestFullscreen;

      if (requestFullscreen) {
        requestFullscreen
          .call(video)
          .then(() => {
            console.log(`영상 ${index + 1} 전체화면 전환 성공`);
            // 화면 방향 설정 (모바일에서 유용)
            if (screen.orientation && screen.orientation.lock) {
              screen.orientation.lock("landscape").catch((err) => {
                console.warn(`화면 방향 설정 실패: ${err.message}`);
              });
            }
          })
          .catch((err) => {
            console.error(`전체화면 전환 실패: ${err.message}`);
          });
      } else {
        console.error("이 브라우저는 전체화면 API를 지원하지 않습니다.");
      }
    }
  };

  // 비디오 로딩 완료 처리
  const handleVideoLoaded = (index) => {
    loadedIndices.current.add(index);
    const ledIndices = [...loadedIndices.current];

    // ESP32에 현재 로딩된 모든 영상 인덱스 전송 (시뮬레이션 모드가 아닐 때만)
    if (!SIMULATION_MODE) {
      sendLed(ledIndices);
    } else {
      console.log(`시뮬레이션: LED 상태 전송 - ${ledIndices.join(", ")}`);
    }

    // LED 상태 시각화를 위해 상태 업데이트
    setActiveLeds(ledIndices);
  };

  // ESP32 버튼 시뮬레이션 핸들러
  const handleButtonPress = (buttonIndex) => {
    console.log(`시뮬레이션: ESP32 버튼 ${buttonIndex} 입력`);
    playFullscreen(buttonIndex - 1);
  };

  // 테스트 영상 자동 로드 시뮬레이션
  useEffect(() => {
    if (SIMULATION_MODE) {
      // 테스트를 위해 3초 후 첫 번째와 세 번째 영상이 로드된 것으로 시뮬레이션
      const timer1 = setTimeout(() => {
        handleVideoLoaded(1);
        console.log("시뮬레이션: 영상 1 로드 완료");
      }, 2000);

      const timer2 = setTimeout(() => {
        handleVideoLoaded(3);
        console.log("시뮬레이션: 영상 3 로드 완료");
      }, 3500);

      const timer3 = setTimeout(() => {
        handleVideoLoaded(5);
        console.log("시뮬레이션: 영상 5 로드 완료");
      }, 5000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [handleVideoLoaded]);

  return (
    <div className="min-h-screen p-8">
      {SIMULATION_MODE && (
        <Esp32DebugPanel
          activeLeds={activeLeds}
          onButtonPress={handleButtonPress}
        />
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
              } aspect-video flex items-center justify-center relative overflow-hidden cursor-pointer`}
              onClick={() => handleButtonPress(i + 1)}
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
                src={
                  SIMULATION_MODE
                    ? `https://picsum.photos/800/450?random=${i}`
                    : `/videos/video-${i + 1}.mp4`
                }
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

      {SIMULATION_MODE && (
        <div className="mt-6 p-4 bg-gray-800/50 rounded border border-green-900">
          <h3 className="text-green-400 font-mono mb-2">
            시뮬레이션 모드 안내
          </h3>
          <ul className="text-green-400 font-mono text-sm list-disc pl-5 space-y-1">
            <li>
              키보드 숫자키(1-8)를 누르면 해당 영상이 전체화면으로 재생됩니다.
            </li>
            <li>영상 썸네일을 클릭해도 해당 영상이 전체화면으로 재생됩니다.</li>
            <li>
              위 디버그 패널에서 버튼을 클릭하여 ESP32 버튼 입력을 시뮬레이션할
              수 있습니다.
            </li>
            <li>ESC 키를 눌러 전체화면을 종료할 수 있습니다.</li>
            <li>
              녹색 표시등은 해당 비디오가 로드되어 LED가 켜진 상태를 나타냅니다.
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MainPhase;
