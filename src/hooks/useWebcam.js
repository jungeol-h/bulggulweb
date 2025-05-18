import { useState, useRef, useEffect } from "react";

/**
 * 웹캠 초기화와 관리를 위한 커스텀 훅
 */
const useWebcam = (isActive = false) => {
  const webcamRef = useRef(null);
  const [webcamActive, setWebcamActive] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // isActive가 true일 때만 웹캠 초기화
    if (isActive) {
      let currentWebcamRef = webcamRef.current;

      const initializeWebcam = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 1280, height: 720 },
          });

          if (webcamRef.current) {
            webcamRef.current.srcObject = stream;
            setWebcamActive(true);
          }
        } catch (err) {
          console.error("웹캠 액세스에 실패했습니다:", err);
          setError("웹캠 액세스에 실패했습니다. 카메라 권한을 확인해주세요.");
        }
      };

      initializeWebcam();

      // 컴포넌트 언마운트 또는 isActive가 false로 바뀔 때 웹캠 정리
      return () => {
        if (currentWebcamRef && currentWebcamRef.srcObject) {
          const tracks = currentWebcamRef.srcObject.getTracks();
          tracks.forEach((track) => track.stop());
        }
        setWebcamActive(false);
      };
    }
  }, [isActive]);

  return { webcamRef, webcamActive, error };
};

export default useWebcam;
