document.addEventListener('DOMContentLoaded', () => {
  const cameraElement = document.getElementById('camera');
  const matrixBackground = document.getElementById('matrix-background');
  const statusMessage = document.getElementById('status-message');
  const guideCircle = document.getElementById('guide-circle');
  const guideText = document.getElementById('guide-text');

  // 카메라 설정
  async function setupCamera() {
    try {
      const constraints = {
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      cameraElement.srcObject = stream;

      return new Promise((resolve) => {
        cameraElement.onloadedmetadata = () => {
          cameraElement.play();
          // 카메라 즉시 표시하고 활성화 상태 유지
          setTimeout(() => {
            cameraElement.classList.add('active');
            console.log('Camera activated');
          }, 500);
          resolve(cameraElement);
        };
      });
    } catch (error) {
      console.error('카메라 접근 오류:', error);
      statusMessage.textContent = '카메라를 사용할 수 없습니다.';
      statusMessage.classList.add('active');
    }
  }

  // 얼굴 인식 감지 함수 - 키보드 'F' 키로 트리거
  function detectFace() {
    statusMessage.textContent = '얼굴 인식 중...';
    statusMessage.classList.add('active');

    // 실제 얼굴 인식 대신 잠시 타이머 후 완료로 처리
    setTimeout(() => {
      completeDetection();
    }, 1500);
  }

  // 개체 인식 완료 처리 함수
  window.completeDetection = function () {
    statusMessage.textContent = '개체 인식 완료';

    // 가이드 원 애니메이션: 크기 증가 및 투명도 감소
    // 원의 중심으로부터 확대되도록 명확하게 설정
    guideCircle.style.position = 'absolute'; // 절대 위치 지정
    guideCircle.style.left = '50%'; // 좌우 중앙
    guideCircle.style.top = '50%'; // 상하 중앙
    guideCircle.style.transform = 'translate(-50%, -50%)'; // 원 자체를 중앙에 위치시킴

    // 애니메이션 시작 전에 초기 위치 설정을 적용하기 위한 짧은 지연
    setTimeout(() => {
      guideCircle.style.transformOrigin = '50% 50%'; // 정확한 중심점 설정
      guideCircle.style.transition =
        'transform 1s ease-out, opacity 1s ease-out'; // Match other transitions
      guideCircle.style.transform = 'translate(-50%, -50%) scale(1.09)'; // 스케일링 시 중앙 위치 유지
      guideCircle.style.opacity = '0';
    }, 10);

    // 애니메이션 완료 후 display none 처리
    setTimeout(() => {
      guideCircle.style.display = 'none';
    }, 1010); // Match the transition duration (1s)

    // 가이드 텍스트 숨기기 - add proper transition
    guideText.style.transition = 'opacity 1s ease-out';
    guideText.style.opacity = '0';
    setTimeout(() => {
      guideText.style.display = 'none';
    }, 1000);

    // Dim matrix but keep it running - use the new public method
    if (window.dimMatrix) {
      window.dimMatrix(0.2); // Pass opacity level (0.2 = 20% visible)
    } else {
      // Fallback if function not available
      matrixBackground.classList.add('fade-out');
    }

    // Trigger explosive connection effect in particle animation
    if (window.appController && window.appController.notifyFaceDetected) {
      window.appController.notifyFaceDetected();
    }

    // Call the face recognition complete function
    onFaceRecognitionComplete();
  };

  // 키보드 이벤트 리스너
  document.addEventListener('keydown', (event) => {
    // 'F' 키를 누르면 얼굴 인식 시작
    if (event.code === 'KeyF') {
      detectFace();
    }
    // 'Space' 키를 누르면 즉시 인식 완료
    else if (event.code === 'Space') {
      completeDetection();
    }
    // 'R' 키를 누르면 카메라 다시 활성화 (문제 해결용)
    else if (event.code === 'KeyR') {
      cameraElement.classList.add('active');
      console.log('Camera reactivated');
    }
  });

  // 카메라 초기화 및 시작
  setupCamera().then(() => {
    console.log('카메라 초기화 완료');
    // 카메라 요소가 활성화되었는지 확인
    setTimeout(() => {
      if (!cameraElement.classList.contains('active')) {
        console.log('Camera not active, activating now');
        cameraElement.classList.add('active');
      }
    }, 1000);
  });

  // This function should be called when face recognition is successful
  function onFaceRecognitionComplete() {
    // Update status message
    const statusMessage = document.getElementById('status-message');
    statusMessage.textContent = '인식 완료! 잠시만 기다려주세요...';

    // Wait a moment for the user to see the completion message
    setTimeout(() => {
      // Call the main flow function from script.js
      if (typeof window.startFlowAfterRecognition === 'function') {
        // Make sure other containers are visible
        const container = document.querySelector('.container');
        if (container) {
          container.style.visibility = 'visible';
          container.style.display = 'flex';
          container.style.zIndex = '5';
          console.log('Container visibility enforced');
        }

        window.startFlowAfterRecognition();
      } else {
        console.error('startFlowAfterRecognition function not found');
      }
    }, 1500);
  }

  // Let app controller know camera is ready
  if (window.appController) {
    window.appController.debug('Camera module initialized');
  }
});

// Camera Module - Responsible for face detection

// Modify the face detection callback to use our new event system
function onFaceDetected() {
  // Instead of directly manipulating the UI, dispatch an event
  if (window.dispatchFaceDetected) {
    window.dispatchFaceDetected();
  } else {
    console.error('Face detection event dispatcher not found');
    // Fallback to direct DOM manipulation if needed
    const cameraContainer = document.getElementById('camera-container');
    if (cameraContainer) {
      cameraContainer.style.display = 'none';
    }
  }

  // Trigger explosive connection effect in particle animation
  if (window.appController && window.appController.notifyFaceDetected) {
    window.appController.notifyFaceDetected();
  }

  // Log face detection
  console.log('Face detected by camera module');
}
