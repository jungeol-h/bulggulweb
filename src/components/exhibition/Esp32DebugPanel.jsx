import React, { useState, useEffect } from "react";
import useEsp32Ws from "../../hooks/useEsp32Ws";

/**
 * ESP32 디버깅 및 시뮬레이션을 위한 제어 패널 컴포넌트
 */
const Esp32DebugPanel = ({ activeLeds: propActiveLeds, onButtonPress }) => {
  const [wsUrl, setWsUrl] = useState(
    import.meta.env.PROD
      ? "ws://192.168.0.10:5173/keyboard" // 프로덕션: ESP32 IP 사용
      : "ws://192.168.0.10:5173/keyboard" // 개발: 로컬호스트
  );
  const [isConnected, setIsConnected] = useState(false);
  const [buttonEvents, setButtonEvents] = useState([]);
  const [selectedLeds, setSelectedLeds] = useState([]);
  const { connect, sendLed, onButton, close } = useEsp32Ws();

  // 버튼 이벤트 핸들러
  const handleButtonClick = (index) => {
    if (onButtonPress) {
      onButtonPress(index);
    }

    // 이벤트 기록
    const timestamp = new Date().toLocaleTimeString();
    setButtonEvents((prev) => [
      { timestamp, button: index },
      ...prev.slice(0, 9), // 최근 10개 이벤트만 유지
    ]);
  };

  // 외부 버튼 이벤트 수신
  useEffect(() => {
    onButton((btnIndex) => {
      handleButtonClick(btnIndex);
    });
  }, [onButton]);

  // 연결 상태 확인 함수
  const handleConnect = () => {
    if (isConnected) {
      close();
      setIsConnected(false);
    } else {
      connect(wsUrl);
      setIsConnected(true);
    }
  };

  // LED 선택 함수 (개발 모드에서만 작동)
  const toggleLed = (ledIndex) => {
    const newLeds = [...selectedLeds];
    const idx = newLeds.indexOf(ledIndex);

    if (idx !== -1) {
      newLeds.splice(idx, 1); // 이미 선택된 LED라면 제거
    } else {
      newLeds.push(ledIndex); // 선택되지 않은 LED라면 추가
    }

    setSelectedLeds(newLeds);
    sendLed(newLeds);
  };

  // 부모 컴포넌트에서 전달된 LED 상태 표시
  const displayLeds = propActiveLeds || selectedLeds;

  return (
    <div className="bg-gray-900 border border-green-700 p-4 rounded-lg mb-4">
      <h2 className="text-green-400 font-mono text-lg mb-3">
        ESP32 디버그 패널
      </h2>

      {/* WebSocket 연결 컨트롤 */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <input
            type="text"
            value={wsUrl}
            onChange={(e) => setWsUrl(e.target.value)}
            className="bg-gray-800 text-green-400 border border-green-700 rounded px-2 py-1 flex-grow text-sm"
            placeholder="WebSocket URL"
          />
          <button
            onClick={handleConnect}
            className={`px-3 py-1 rounded font-mono text-sm ${
              isConnected
                ? "bg-red-700 hover:bg-red-800"
                : "bg-green-700 hover:bg-green-800"
            }`}
          >
            {isConnected ? "연결 해제" : "연결"}
          </button>
        </div>
        <div className="text-sm">
          상태:{" "}
          <span
            className={`font-bold ${
              isConnected ? "text-green-500" : "text-red-500"
            }`}
          >
            {isConnected ? "연결됨" : "연결 안됨"}
          </span>
        </div>
      </div>

      {/* LED 상태 표시 */}
      <div className="mb-4">
        <p className="text-green-300 font-mono text-sm mb-2">LED 상태:</p>
        <div className="flex space-x-2">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              onClick={() => toggleLed(i + 1)}
              className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${
                displayLeds.includes(i + 1)
                  ? "bg-green-500 shadow-md shadow-green-500/50"
                  : "bg-gray-800 border border-green-900"
              }`}
            >
              <span className="text-xs font-mono text-white">{i + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 버튼 제어 */}
      <div className="mb-4">
        <p className="text-green-300 font-mono text-sm mb-2">
          버튼 시뮬레이션:
        </p>
        <div className="flex flex-wrap gap-2">
          {[...Array(8)].map((_, i) => (
            <button
              key={i}
              onClick={() => handleButtonClick(i + 1)}
              className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-green-400 
                        border border-green-800 rounded font-mono text-sm 
                        transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-green-500"
            >
              버튼 {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* 버튼 이벤트 기록 */}
      <div className="mb-3">
        <p className="text-green-300 font-mono text-sm mb-2">버튼 이벤트:</p>
        <div className="bg-black/50 rounded border border-green-800 p-2 max-h-32 overflow-y-auto">
          {buttonEvents.length > 0 ? (
            <ul className="text-sm font-mono">
              {buttonEvents.map((event, i) => (
                <li key={i} className="mb-1">
                  <span className="text-gray-500">{event.timestamp}</span> 버튼{" "}
                  <span className="text-yellow-400">{event.button}</span> 눌림
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm italic">이벤트 없음</p>
          )}
        </div>
      </div>

      {/* 사용 방법 */}
      <div className="mt-4 pt-3 border-t border-green-900">
        <p className="text-green-300 font-mono text-xs">
          키보드 숫자키 1-8을 눌러 버튼 입력을 시뮬레이션할 수 있습니다.
          <br />
          ESP32 연결시: {wsUrl}
        </p>
      </div>
    </div>
  );
};

export default Esp32DebugPanel;
