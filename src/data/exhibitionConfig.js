/**
 * 전시 환경 설정 파일
 * 로컬 전시 환경에서 사용되는 설정들을 관리합니다.
 */

export const exhibitionConfig = {
  // 로컬 네트워크 설정
  network: {
    // 로컬 서버 API 엔드포인트 (실제 서버 주소로 변경 필요)
    apiUrl: "http://localhost:3000/api",

    // 웹소켓 연결 주소 (실제 서버 주소로 변경 필요)
    websocketUrl: "ws://localhost:3000/ws",

    // 요청 타임아웃 (밀리초)
    timeout: 5000,
  },

  // 전시 설정
  exhibition: {
    // 전시명
    name: "나≠나",

    // 작가명
    artists: ["황준걸", "이혜연", "임나영"],

    // 전시 ID
    id: "BULGGUL2025",

    // 전시 모드 ("live" | "demo" | "test")
    mode: "demo",
  },

  // 카메라 및 센서 설정
  camera: {
    // 카메라 ID (실제 환경에서 변경 필요)
    deviceId: "default",

    // 카메라 해상도
    resolution: {
      width: 1280,
      height: 720,
    },

    // 프레임 레이트
    frameRate: 30,
  },

  // 디스플레이 설정
  display: {
    // 키오스크 모드 활성화
    kioskMode: true,

    // 화면 새로고침 간격 (밀리초, 0은 비활성화)
    autoRefreshInterval: 0,

    // 스크린세이버 활성화 시간 (밀리초, 0은 비활성화)
    screenSaverTimeout: 300000, // 5분
  },

  // 디버그 설정
  debug: {
    // 디버그 모드 활성화
    enabled: false,

    // 로그 레벨 ("error" | "warn" | "info" | "debug" | "trace")
    logLevel: "error",

    // 성능 모니터링 활성화
    performanceMonitoring: false,
  },
};

/**
 * 현재 전시 환경 판별 함수
 * @returns {boolean} 현재 로컬 전시 환경인지 여부
 */
export const isExhibitionEnvironment = () => {
  // 1. 로컬 네트워크 환경 확인 (localhost 또는 사설 IP 대역)
  const isLocalNetwork =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    /^192\.168\./.test(window.location.hostname) ||
    /^10\./.test(window.location.hostname);

  // 2. URL 파라미터 확인 (예: ?mode=exhibition)
  const urlParams = new URLSearchParams(window.location.search);
  const hasExhibitionParam = urlParams.get("mode") === "exhibition";

  // 3. 저장된 설정 확인
  const savedSetting = localStorage.getItem("exhibitionMode") === "true";

  return isLocalNetwork || hasExhibitionParam || savedSetting;
};

/**
 * 전시 모드 설정 함수
 * @param {boolean} isExhibitionMode 전시 모드 활성화 여부
 */
export const setExhibitionMode = (isExhibitionMode) => {
  localStorage.setItem("exhibitionMode", isExhibitionMode ? "true" : "false");
};
