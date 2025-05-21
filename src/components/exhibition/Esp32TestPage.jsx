import React, { useState, useEffect } from "react";
import MainPhase from "./MainPhase";
import Esp32DebugPanel from "./Esp32DebugPanel";

/**
 * ESP32 테스트 전용 페이지 컴포넌트
 * ESP32 연결 및 기능 테스트를 위한 페이지
 */
const Esp32TestPage = () => {
  const [showInfo, setShowInfo] = useState(true);

  // 5초 후 안내 메시지 자동 숨김
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInfo(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-green-400 relative">
      {/* 안내 메시지 오버레이 */}
      {showInfo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="max-w-2xl bg-gray-900 border border-green-500 rounded-lg p-6 shadow-xl">
            <h2 className="text-2xl font-mono text-green-400 mb-4">
              ESP32 아케이드 키보드 테스트 페이지
            </h2>
            <div className="space-y-4 text-green-300">
              <p>
                이 페이지는 ESP32 아케이드 키보드와의 연결 및 동작을 테스트하기
                위한 전용 페이지입니다.
              </p>
              <div className="bg-black/30 p-3 rounded">
                <h3 className="font-semibold mb-2">테스트 방법:</h3>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>
                    <strong>WiFi 연결:</strong> ESP32가 네트워크에 연결되어
                    있는지 확인
                  </li>
                  <li>
                    <strong>WebSocket:</strong> 브라우저와 ESP32 간 WebSocket 연결
                    확인 (ws://10.21.37.97:5173/keyboard)
                  </li>
                  <li>
                    <strong>버튼 테스트:</strong> 숫자키 1-8 또는 아케이드 버튼
                    클릭 시 영상 전체화면 전환
                  </li>
                  <li>
                    <strong>LED 테스트:</strong> 영상 로드 완료 시 ESP32의 해당 LED
                    점등 확인
                  </li>
                </ul>
              </div>
              <p className="text-sm">
                <strong>사용법:</strong> D 키를 눌러 디버그 패널을 토글할 수
                있습니다. ESC 키는 전체화면 종료, 숫자키 1-8은 해당 영상 재생.
              </p>
              <div className="flex justify-center pt-2">
                <button
                  onClick={() => setShowInfo(false)}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-mono transition-colors"
                >
                  시작하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 메인 전시회 구성 요소 */}
      <MainPhase />
    </div>
  );
};

export default Esp32TestPage;
