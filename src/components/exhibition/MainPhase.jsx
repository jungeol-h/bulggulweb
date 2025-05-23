import React, { useEffect, useRef, useState, useCallback } from "react";
import useEsp32Ws from "../../hooks/useEsp32Ws";
import "./FullscreenVideo.css"; // 전체화면 비디오 스타일을 위한 CSS 가져오기
// import Esp32DebugPanel from "./Esp32DebugPanel"; // ESP32 디버그 패널 컴포넌트 제거
import VideoService from "../../services/VideoService"; // 비디오 서비스 가져오기
import { WS_URL, POLLING_INTERVAL } from "../../constants/apiConstants"; // API 상수 가져오기
import QRCode from "react-qr-code"; // QR 코드 생성 라이브러리 추가

// 영상 다운로드 베이스 URL 설정
const DOWNLOAD_BASE_URL = "https://bulggul.com/download";

/**
 * 전시회의 메인 단계를 렌더링하는 컴포넌트
 */
const MainPhase = ({
  sessionId,
  initialVideoUrls = null,
  initialLoadedIndices = [],
}) => {
  // ESP32 WebSocket 연결 훅
  const { connect, sendLedStatus, onButton, close } = useEsp32Ws();

  // 비디오 참조 및 로딩된 비디오 인덱스 추적
  const videoRefs = useRef([]);
  const loadedIndices = useRef(new Set());

  // 이미 재생된 비디오 추적 (한 번 본 영상은 LED 꺼짐 유지)
  const [playedVideos, setPlayedVideos] = useState(new Set());

  // 반복 재생 가능한 비디오 (깜빡이는 LED)
  const [availableVideos, setAvailableVideos] = useState([]);

  // 가상 전체화면 상태 관리
  const [fullscreenState, setFullscreenState] = useState({
    isActive: false,
    videoIndex: -1,
  });

  // 디버그 모드 상태 제거

  // 서버에서 가져온 비디오 URL 상태
  const [videoUrls, setVideoUrls] = useState(
    initialVideoUrls || Array(8).fill(null)
  );
  const [fetchingStatus, setFetchingStatus] = useState({
    isFetching: false,
    lastFetched: null,
    error: null,
  });

  // 초기 로드된 인덱스 설정
  useEffect(() => {
    if (initialLoadedIndices && initialLoadedIndices.length > 0) {
      initialLoadedIndices.forEach((idx) => {
        loadedIndices.current.add(idx);
      });

      // 초기 로드된 비디오는 재생 가능한 비디오로 설정
      setAvailableVideos(initialLoadedIndices);

      console.log(
        `초기 로드된 비디오 인덱스: ${initialLoadedIndices.join(", ")}`
      );
    }
  }, [initialLoadedIndices]);

  // LED 상태가 변경될 때마다 업데이트
  useEffect(() => {
    // 첫 렌더링 시에는 실행하지 않음
    if (availableVideos.length > 0) {
      updateLedState();
    }
  }, [fullscreenState, availableVideos, playedVideos, updateLedState]);

  useEffect(() => {
    // WebSocket 연결 초기화
    connect(WS_URL);
    console.log(`ESP32 WebSocket ${WS_URL}에 연결 시도`);

    // ESP32로부터 버튼 이벤트 구독
    onButton((btnIdx) => {
      console.log(`ESP32 버튼 ${btnIdx} 눌림`);

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

        // 전체화면 종료 시 LED 상태 업데이트
        setTimeout(() => updateLedState(), 100);
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

        // 전체화면 종료 시 LED 상태 업데이트
        setTimeout(() => updateLedState(), 100);
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

          // 전체화면 종료 시 LED 상태 업데이트
          setTimeout(() => updateLedState(), 100);
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
  }, [
    connect,
    onButton,
    close,
    fullscreenState,
    playFullscreen,
    updateLedState,
  ]);

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

      // 이 비디오를 본 비디오로 표시
      setPlayedVideos((prev) => {
        const newSet = new Set(prev);
        newSet.add(index + 1); // 1-based index로 저장
        return newSet;
      });

      // LED 상태 업데이트
      setTimeout(() => updateLedState(), 100);

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
    // 이미 로드된 경우 중복 처리 방지
    if (loadedIndices.current.has(index)) {
      return;
    }

    loadedIndices.current.add(index);

    // 새로 로드된 비디오는 재생 가능한 비디오 목록에 추가
    setAvailableVideos((prev) => {
      if (!prev.includes(index)) {
        return [...prev, index];
      }
      return prev;
    });

    // LED 상태 업데이트
    updateLedState();

    console.log(`비디오 ${index} 로드 완료`);
  };

  // LED 상태 업데이트 (전체화면, 가능한 비디오, 재생된 비디오)
  const updateLedState = useCallback(() => {
    // 전체화면 비디오의 LED는 항상 켜짐
    const currentPlaying = fullscreenState.isActive
      ? [fullscreenState.videoIndex + 1]
      : [];

    // 반복 재생 가능한 비디오의 LED는 깜빡임 (이미 재생한 비디오 제외)
    const blinkingVideos = availableVideos.filter(
      (idx) => !playedVideos.has(idx)
    );

    // 통합 API로 LED 상태 전송
    sendLedStatus({
      on: currentPlaying,
      blink: blinkingVideos,
    });

    console.log(
      `LED 상태 업데이트: 켜짐=${currentPlaying.join(
        ","
      )}, 깜빡임=${blinkingVideos.join(",")}`
    );
  }, [fullscreenState, availableVideos, playedVideos, sendLedStatus]);

  // ESP32 디버그 패널 버튼 클릭 핸들러 제거

  // 서버에서 비디오 URL 가져오기
  const fetchVideoUrls = useCallback(async () => {
    setFetchingStatus({ isFetching: true, lastFetched: null, error: null });

    try {
      const { urls, loadedIndices } = await VideoService.fetchInitialVideoUrls(
        sessionId
      );

      setVideoUrls(urls);

      // 로드된 비디오 인덱스를 재생 가능한 비디오로 설정
      setAvailableVideos(loadedIndices);

      setFetchingStatus({
        isFetching: false,
        lastFetched: new Date().toISOString(),
        error: null,
      });
    } catch (error) {
      console.error("비디오 URL 목록 가져오기 실패:", error);
      setFetchingStatus({
        isFetching: false,
        lastFetched: null,
        error: error.message,
      });
    }
  }, [sessionId]);

  // 비디오를 서버에서 가져오는 함수
  const fetchVideosFromServer = useCallback(async () => {
    try {
      setFetchingStatus((prev) => ({ ...prev, isFetching: true, error: null }));

      const { urls, loadedVideos } = await VideoService.fetchMissingVideos(
        sessionId,
        videoUrls
      );

      if (loadedVideos.length > 0) {
        setVideoUrls(urls);
        console.log(`${loadedVideos.length}개의 새 비디오 발견됨`);
      } else {
        console.log("새로 추가된 비디오 없음");
      }

      setFetchingStatus({
        isFetching: false,
        lastFetched: new Date().toISOString(),
        error: null,
      });
    } catch (error) {
      console.error("비디오 가져오기 오류:", error);
      setFetchingStatus({
        isFetching: false,
        lastFetched: new Date().toISOString(),
        error: error.message,
      });
    }
  }, [videoUrls, sessionId]);

  // 컴포넌트 마운트 시 비디오 URL 가져오기
  useEffect(() => {
    fetchVideoUrls();
    console.log(`세션 ID ${sessionId}로 비디오 로드 시작`);
  }, [fetchVideoUrls, sessionId]);

  // 비디오 폴링 효과 설정
  useEffect(() => {
    // 초기 로드
    fetchVideosFromServer();

    // 주기적인 폴링 설정
    const pollingInterval = setInterval(() => {
      // 아직 모든 비디오가 로드되지 않았다면 계속 폴링
      const allVideosLoaded = videoUrls.every((url) => url !== null);
      if (!allVideosLoaded) {
        fetchVideosFromServer();
      } else {
        // 모든 비디오가 로드되면 폴링 중지
        console.log("모든 비디오 로드 완료, 폴링 중지");
        clearInterval(pollingInterval);
      }
    }, POLLING_INTERVAL);

    // 컴포넌트 언마운트 시 인터벌 정리
    return () => {
      clearInterval(pollingInterval);
    };
  }, [fetchVideosFromServer, videoUrls]);

  // 비디오 클릭 시 새로고침 처리
  const handleVideoClick = (index) => {
    if (!videoUrls[index]) {
      console.log(`비디오 ${index + 1} 수동 새로고침 시도`);
      fetchVideosFromServer();
    }
  };

  return (
    <div className="min-h-screen p-8 flex flex-col justify-center gap-8">
      {/* 비디오 로딩 상태 표시 */}
      <div className="absolute top-2 left-2 z-50 flex items-center space-x-2">
        <div
          className={`px-3 py-1 rounded-full text-xs ${
            fetchingStatus.isFetching
              ? "bg-yellow-800 text-yellow-200"
              : fetchingStatus.error
              ? "bg-red-800 text-red-200"
              : videoUrls.every((url) => url !== null)
              ? "bg-green-800 text-green-200"
              : "bg-blue-800 text-blue-200"
          }`}
        >
          {fetchingStatus.isFetching
            ? "비디오 로딩 중..."
            : fetchingStatus.error
            ? `오류: ${fetchingStatus.error}`
            : videoUrls.every((url) => url !== null)
            ? "모든 비디오 로드 완료"
            : `${
                videoUrls.filter((url) => url !== null).length
              }/8 비디오 로드됨`}
        </div>

        {/* 세션 ID 표시 */}
        <div className="bg-gray-800 text-gray-300 px-2 py-1 rounded-full text-xs">
          세션 ID: {sessionId}
        </div>
      </div>

      {/* 가상 전체화면 오버레이 */}
      {fullscreenState.isActive && (
        <div className="overlay-container">
          <div className="pseudo-fullscreen-video-container">
            <video
              className="pseudo-fullscreen-video"
              src={videoUrls[fullscreenState.videoIndex] || ""}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-4 grid-rows-2 gap-6 w-full max-w-6xl mx-auto my-auto">
        {[...Array(8)].map((_, i) => {
          const isFullscreen =
            fullscreenState.isActive && fullscreenState.videoIndex === i;
          const isAvailable =
            availableVideos.includes(i + 1) && !playedVideos.has(i + 1);
          const wasPlayed = playedVideos.has(i + 1);

          return (
            <div
              key={i}
              className={`bg-gray-900 border ${
                isFullscreen
                  ? "border-green-500 ring-4 ring-green-500"
                  : isAvailable
                  ? "border-green-400 ring-2 ring-green-400"
                  : wasPlayed
                  ? "border-gray-600"
                  : "border-green-800"
              } aspect-video flex items-center justify-center relative overflow-hidden ${
                !videoUrls[i] ? "cursor-pointer" : ""
              }`}
              onClick={() => !videoUrls[i] && handleVideoClick(i)}
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
                src={videoUrls[i] || ""}
                // poster={`https://picsum.photos/800/450?random=${i}`}
                preload="auto"
                muted
                loop
                onCanPlayThrough={() => handleVideoLoaded(i + 1)}
                playsInline
                onClick={() => handleVideoClick(i)} // 비디오 클릭 시 새로고침 핸들러 추가
              />
              {/* LED 상태 표시기 */}
              {isFullscreen && (
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
              )}
              {isAvailable && (
                <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-green-400 shadow-lg shadow-green-400/50 animate-pulse"></div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2">
                <p className="text-green-500 font-mono text-center">
                  영상 {i + 1}
                  <span className="ml-2 text-xs">
                    {isFullscreen
                      ? "(전체화면)"
                      : isAvailable
                      ? "(재생 가능)"
                      : wasPlayed
                      ? "(재생 완료)"
                      : videoUrls[i]
                      ? "(준비 중)"
                      : "(로딩 중...)"}
                  </span>
                </p>
              </div>
              {!videoUrls[i] && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 사용자 안내 메시지 */}
      <div className="text-center mt-6 text-green-400 text-lg font-medium">
        버튼을 누르면 영상이 확대됩니다.
      </div>

      {/* QR 코드 및 영상 다운로드 섹션 - 모든 영상이 로드된 경우에만 표시 */}
      {videoUrls.every((url) => url !== null) && (
        <div className="mt-8 flex flex-col items-center justify-center p-6 bg-gray-900 border border-green-800 rounded-lg shadow-lg shadow-green-900/30 animate-fadeIn max-w-md mx-auto w-full">
          <h2 className="text-green-400 text-xl mb-4 font-mono font-bold flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            내 영상 다운로드 받기
          </h2>

          <div className="p-4 bg-white rounded-lg mb-4 hover:shadow-xl hover:shadow-green-600/20 transition-all duration-300 hover:scale-105">
            <QRCode
              value={`${DOWNLOAD_BASE_URL}?session=${sessionId}`}
              size={180}
              level="H"
              style={{ maxWidth: "100%" }}
            />
          </div>

          <p className="text-green-300 text-center max-w-md mb-2">
            QR 코드를 스캔하여 이 전시에서 생성된 당신의 영상을 다운로드하세요.
          </p>
          <p className="text-green-500 mt-2 font-bold bg-gray-800 px-3 py-1 rounded-full">
            세션 ID: {sessionId}
          </p>
        </div>
      )}
    </div>
  );
};

export default MainPhase;
