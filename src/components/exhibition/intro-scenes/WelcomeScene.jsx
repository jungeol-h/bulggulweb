import React from "react";

/**
 * 장면 0: 정면 응시 메시지 및 성별 선택 안내
 * Iriun Webcam으로 연결된 스마트폰 카메라 피드 표시
 */
const WelcomeScene = ({ webcamRef, webcamActive, webcamError }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* 카메라 관련 오류 메시지 표시 */}
      {webcamError && (
        <div className="text-red-500 text-xl bg-black bg-opacity-50 p-4 rounded-lg mb-6">
          <div className="font-bold mb-2">카메라 연결 오류:</div>
          <div>{webcamError}</div>
          <div className="mt-3 text-yellow-300 text-base">
            스마트폰에서 Iriun Webcam 앱이 실행 중인지 확인해주세요.
            <br />
            컴퓨터와 같은 네트워크에 연결되어 있어야 합니다.
          </div>
        </div>
      )}

      {/* 웹캠 미리보기 (숨겨져 있지만 캡처를 위해 렌더링됨) */}
      <div
        className={
          webcamError ? "hidden" : "relative mb-8 overflow-hidden rounded-lg"
        }
      >
        {webcamActive ? (
          <video
            ref={webcamRef}
            autoPlay
            playsInline
            muted
            className="w-64 h-48 border-2 border-white object-cover"
          />
        ) : (
          <div className="w-64 h-48 border-2 border-white flex items-center justify-center">
            <div className="text-sm text-gray-200">카메라 연결 중...</div>
          </div>
        )}
      </div>

      <div className="text-white text-3xl font-bold mb-8">
        정면을 응시해주세요.
      </div>
      <div className="text-white text-xl mb-4">
        키보드로 성별을 선택해주세요:
      </div>
      <div className="flex space-x-8 mt-4">
        <div className="text-white text-xl border border-white px-6 py-2 rounded-lg">
          <span className="font-bold mr-2">M</span> 남성
        </div>
        <div className="text-white text-xl border border-white px-6 py-2 rounded-lg">
          <span className="font-bold mr-2">F</span> 여성
        </div>
      </div>
    </div>
  );
};

export default WelcomeScene;
