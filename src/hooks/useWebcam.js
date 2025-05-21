import { useState, useRef, useEffect } from "react";

// IP 카메라 설정
const CAMERA_IP = "192.168.0.76";
const CAMERA_PORT = "8080";
const CAMERA_URL = `http://${CAMERA_IP}:${CAMERA_PORT}/shot.jpg`;

/**
 * IP 카메라 이미지 캡처 및 관리를 위한 커스텀 훅
 */
const useWebcam = (isActive = false) => {
  const webcamRef = useRef(null);
  const [webcamActive, setWebcamActive] = useState(false);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // 카메라 연결 테스트 및 프리뷰 이미지 로드
  useEffect(() => {
    if (isActive) {
      const testConnection = async () => {
        try {
          console.log("IP 카메라 연결 테스트 중...");
          // 카메라 연결 테스트
          const response = await fetch(CAMERA_URL, {
            method: "GET",
            cache: "no-cache",
            headers: {
              "Cache-Control": "no-cache",
            },
          });

          if (!response.ok) {
            throw new Error(
              `카메라 연결 실패: ${response.status} ${response.statusText}`
            );
          }

          // 응답을 Blob으로 변환
          const blob = await response.blob();

          // 기존 URL 해제
          if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
          }

          // Blob URL 생성
          const imageUrl = URL.createObjectURL(blob);
          setPreviewUrl(imageUrl);

          console.log("IP 카메라 연결 성공");
          setWebcamActive(true);
          setError(null);
        } catch (err) {
          console.error("IP 카메라 연결 실패:", err);
          setError(
            `IP 카메라 연결 실패: ${err.message}. 카메라가 ${CAMERA_IP}:${CAMERA_PORT}에서 실행 중인지 확인하세요.`
          );
          setWebcamActive(false);
        }
      };

      // 초기 테스트 실행
      testConnection();

      // 주기적으로 이미지 업데이트 (5초마다)
      const interval = setInterval(testConnection, 5000);

      return () => {
        clearInterval(interval);
        // Blob URL 정리
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
        }
        setWebcamActive(false);
      };
    }
  }, [isActive, previewUrl]);

  // 카메라에서 이미지 캡처하는 함수
  const captureImage = async () => {
    try {
      console.log("IP 카메라에서 이미지 캡처 중...");
      const response = await fetch(CAMERA_URL, {
        cache: "no-cache",
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      if (!response.ok) {
        throw new Error(
          `이미지 캡처 실패: ${response.status} ${response.statusText}`
        );
      }

      // 응답을 Blob으로 변환
      const blob = await response.blob();
      console.log("이미지 캡처 성공");
      return blob;
    } catch (err) {
      console.error("이미지 캡처 실패:", err);
      setError(`이미지 캡처 실패: ${err.message}`);
      return null;
    }
  };

  return {
    webcamRef,
    webcamActive,
    error,
    previewUrl,
    captureImage, // 캡처 함수 추가
  };
};

export default useWebcam;
