import { useState, useRef, useEffect } from "react";

/**
 * OBS Virtual Camera를 사용하는 웹캠 초기화와 관리를 위한 커스텀 훅
 */
const useWebcam = (isActive = false) => {
  const webcamRef = useRef(null);
  const [webcamActive, setWebcamActive] = useState(false);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [capturedImageUrl, setCapturedImageUrl] = useState(null);

  // mediaStream 참조를 보관하기 위한 ref
  const mediaStreamRef = useRef(null);

  // 웹캠 초기화
  useEffect(() => {
    // isActive가 true일 때만 웹캠 초기화
    if (isActive) {
      let currentWebcamRef = webcamRef.current;
      let mediaStream = null;
      let initialized = false; // 초기화 상태 추적 변수 추가

      const initializeWebcam = async () => {
        if (initialized) return; // 이미 초기화된 경우 중복 실행 방지

        try {
          // 디버깅 로그 제거 (무한 로그 방지)
          // console.log("OBS Virtual Camera 연결 중...");
          initialized = true; // 초기화 상태 설정

          // 사용 가능한 모든 비디오 장치 가져오기
          const devices = await navigator.mediaDevices.enumerateDevices();
          const videoDevices = devices.filter(
            (device) => device.kind === "videoinput"
          );

          // 디버깅 로그 제거 (무한 로그 방지)
          /*
          console.log(
            "사용 가능한 비디오 장치:",
            videoDevices.map((d) => d.label)
          );
          */

          // OBS Virtual Camera 찾기 (이름에 'OBS', 'Virtual' 또는 'Camera'가 포함된 장치)
          const obsDevice = videoDevices.find(
            (device) =>
              device.label.toLowerCase().includes("obs") ||
              device.label.toLowerCase().includes("virtual")
          );

          // 스트림 설정
          const constraints = {
            video: {
              width: { ideal: 1280 },
              height: { ideal: 720 },
              frameRate: { ideal: 30 },
            },
          };

          // OBS Virtual Camera가 있으면 해당 장치 ID 사용
          if (obsDevice) {
            // 디버깅 로그 제거 (무한 로그 방지)
            // console.log("OBS Virtual Camera를 찾았습니다:", obsDevice.label);
            constraints.video.deviceId = { exact: obsDevice.deviceId };
          } else {
            // 디버깅 로그 제거 (무한 로그 방지)
            // console.log(
            //   "OBS Virtual Camera를 찾지 못했습니다. 기본 카메라를 사용합니다."
            // );
          }

          // 미디어 스트림 가져오기
          mediaStream = await navigator.mediaDevices.getUserMedia(constraints);

          // 웹캠에 스트림 연결
          if (webcamRef.current) {
            webcamRef.current.srcObject = mediaStream;

            // 비디오가 로드되면 활성화 상태로 변경
            webcamRef.current.onloadedmetadata = () => {
              // 디버깅 로그 제거 (무한 로그 방지)
              // console.log("OBS Virtual Camera 스트림이 로드되었습니다.");
              setWebcamActive(true);

              // 미리보기 이미지 생성을 위한 1회 캡처
              setTimeout(() => {
                updatePreviewImage();
              }, 1000);
            };

            // 비디오 자동 재생
            webcamRef.current.play().catch((err) => {
              console.error("비디오 자동 재생에 실패했습니다:", err);
            });
          }
        } catch (err) {
          console.error("웹캠 액세스에 실패했습니다:", err);
          setError(
            "웹캠 액세스에 실패했습니다: " +
              err.message +
              ". OBS Virtual Camera가 활성화되어 있는지 확인하세요."
          );
          setWebcamActive(false);
        }
      };

      // 프리뷰 이미지 업데이트
      const updatePreviewImage = () => {
        if (webcamRef.current && webcamRef.current.videoWidth > 0) {
          try {
            const canvas = document.createElement("canvas");
            canvas.width = webcamRef.current.videoWidth;
            canvas.height = webcamRef.current.videoHeight;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(webcamRef.current, 0, 0);

            // 기존 URL 해제
            if (previewUrl) {
              URL.revokeObjectURL(previewUrl);
            }

            // 새 프리뷰 이미지 URL 생성
            canvas.toBlob(
              (blob) => {
                const newPreviewUrl = URL.createObjectURL(blob);
                setPreviewUrl(newPreviewUrl);
              },
              "image/jpeg",
              0.9
            );
          } catch (err) {
            console.error("프리뷰 이미지 생성 오류:", err);
          }
        }
      };

      // 초기화 실행
      initializeWebcam();

      // 주기적으로 이미지 업데이트 (5초마다)
      const interval = setInterval(updatePreviewImage, 5000);

      // 컴포넌트 언마운트 또는 isActive가 false로 바뀔 때 정리
      return () => {
        clearInterval(interval);

        // 스트림 정리
        if (mediaStream) {
          mediaStream.getTracks().forEach((track) => track.stop());
        }

        // 미리보기 정리
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
        }

        if (capturedImageUrl) {
          URL.revokeObjectURL(capturedImageUrl);
        }

        setWebcamActive(false);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]); // previewUrl과 capturedImageUrl 의존성 제거

  // 웹캠에서 이미지 캡처하는 함수
  const captureImage = async () => {
    if (webcamRef.current && webcamRef.current.videoWidth > 0) {
      try {
        // 로그 제거
        // console.log("OBS Virtual Camera에서 이미지 캡처 중...");

        const canvas = document.createElement("canvas");
        canvas.width = webcamRef.current.videoWidth;
        canvas.height = webcamRef.current.videoHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(webcamRef.current, 0, 0);

        // 이미지를 Blob으로 변환
        return new Promise((resolve) => {
          canvas.toBlob(
            (blob) => {
              // 캡처된 이미지 URL도 저장 (디버깅용)
              if (capturedImageUrl) {
                URL.revokeObjectURL(capturedImageUrl);
              }
              setCapturedImageUrl(URL.createObjectURL(blob));

              // 로그 제거
              // console.log("이미지 캡처 성공");
              resolve(blob);
            },
            "image/jpeg",
            0.9
          );
        });
      } catch (err) {
        console.error("이미지 캡처 실패:", err.message);
        setError("이미지 캡처 실패: " + err.message);
        return null;
      }
    } else {
      console.error("웹캠이 준비되지 않음");
      setError("웹캠이 준비되지 않아 이미지를 캡처할 수 없습니다.");
      return null;
    }
  };

  return {
    webcamRef,
    webcamActive,
    error,
    previewUrl,
    captureImage,
  };
};

export default useWebcam;
