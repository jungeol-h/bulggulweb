import React from "react";

/**
 * ESP32 디버깅 및 시뮬레이션을 위한 제어 패널 컴포넌트
 */
const Esp32DebugPanel = ({ activeLeds, onButtonPress }) => {
  const handleButtonClick = (index) => {
    if (onButtonPress) {
      onButtonPress(index);
    }
  };

  return (
    <div className="bg-gray-900 border border-green-700 p-4 rounded-lg mb-4">
      <h2 className="text-green-400 font-mono text-lg mb-3">
        ESP32 디버그 패널
      </h2>

      {/* LED 상태 표시 */}
      <div className="mb-4">
        <p className="text-green-300 font-mono text-sm mb-2">LED 상태:</p>
        <div className="flex space-x-2">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activeLeds.includes(i + 1)
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
      <div>
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

      {/* 사용 방법 */}
      <div className="mt-4 pt-3 border-t border-green-900">
        <p className="text-green-300 font-mono text-xs">
          키보드 숫자키 1-8을 눌러 버튼 입력을 시뮬레이션할 수 있습니다.
        </p>
      </div>
    </div>
  );
};

export default Esp32DebugPanel;
