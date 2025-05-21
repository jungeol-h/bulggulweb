import { useState, useRef, useEffect } from "react";

/**
 * 웹캠 초기화와 관리를 위한 커스텀 훅
 * Iriun Webcam for Mac을 통해 연결된 스마트폰 카메라 지원
 */
const useWebcam = (isActive = false) => {
  const webcamRef = useRef(null);
  const [webcamActive, setWebcamActive] = useState(false);
  const [error, setError] = useState(null);
  const [availableDevices, setAvailableDevices] = useState([]);

  // 사용 가능한 비디오 장치 목록 가져오기
  const getVideoDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setAvailableDevices(videoDevices);
      return videoDevices;
    } catch (err) {
      console.error("비디오 장치 목록을 가져오는데 실패했습니다:", err);
      setError("카메라 장치 목록을 가져오는데 실패했습니다.");
      return [];
    }
  };

  useEffect(() => {
    // isActive가 true일 때만 웹캠 초기화
    if (isActive) {
      let currentWebcamRef = webcamRef.current;

      const initializeWebcam = async () => {
        try {
          // 사용 가능한 비디오 장치 목록 가져오기
          const videoDevices = await getVideoDevices();
          console.log("사용 가능한 비디오 장치:", videoDevices);

          // Iriun 웹캠 찾기 (이름에 'Iriun'이 포함된 장치)
          const iriunDevice = videoDevices.find(device => 
            device.label.toLowerCase().includes('iriun')
          );

          // 스트림 설정
          const constraints = {
            video: {
              width: { ideal: 1280 },
              height: { ideal: 720 },
              frameRate: { ideal: 30 }
            }
          };

          // Iriun 장치가 있으면 해당 장치 ID 사용
          if (iriunDevice) {
            console.log("Iriun 웹캠 장치를 찾았습니다:", iriunDevice.label);
            constraints.video.deviceId = { exact: iriunDevice.deviceId };
          } else {
            console.log("Iriun 웹캠을 찾지 못했습니다. 기본 카메라를 사용합니다.");
          }

          // 미디어 스트림 가져오기
          const stream = await navigator.mediaDevices.getUserMedia(constraints);

          // 웹캠에 스트림 연결
          if (webcamRef.current) {
            webcamRef.current.srcObject = stream;
            
            // 비디오가 로드되면 활성화 상태로 변경
            webcamRef.current.onloadedmetadata = () => {
              console.log("웹캠 스트림이 로드되었습니다.");
              setWebcamActive(true);
            };
            
            // 비디오 자동 재생
            webcamRef.current.play().catch(err => {
              console.error("비디오 자동 재생에 실패했습니다:", err);
            });
          }
        } catch (err) {
          console.error("웹캠 액세스에 실패했습니다:", err);
          setError(`웹캠 액세스에 실패했습니다. 카메라 권한을 확인해주세요. (${err.message})`);
          
          // Iriun 앱이 실행 중인지 확인하라는 메시지 추가
          if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
            setError("Iriun Webcam 앱이 실행 중인지 확인해주세요. 스마트폰과 컴퓨터가 같은 네트워크에 연결되어 있어야 합니다.");
          }
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

  // 장치 변경 감지 (새로운 장치가 연결되거나 분리될 때)
  useEffect(() => {
    const handleDeviceChange = () => {
      console.log("미디어 장치 변경이 감지되었습니다.");
      if (isActive) {
        getVideoDevices();
      }
    };

    navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange);
    
    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', handleDeviceChange);
    };
  }, [isActive]);

  return { webcamRef, webcamActive, error, availableDevices };
};

export default useWebcam;

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
