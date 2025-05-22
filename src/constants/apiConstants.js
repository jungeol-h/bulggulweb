/**
 * 전시회 API 및 WebSocket 관련 상수
 */

// ESP32 WebSocket URL - ESP32 직접 연결 또는 Vite 서버 프록시 경로
export const WS_URL = import.meta.env.PROD
  ? "ws://192.168.0.10:5173/keyboard" // 프로덕션: ESP32 직접 연결 (ESP32의 IP와 포트 사용)
  : "ws://192.168.0.10:5173/keyboard"; // 개발: Vite 서버를 통한 프록시 (현재 Vite 서버 포트 사용)

// API 서버 URL 설정
export const API_SERVER_URL =
  import.meta.env.VITE_API_SERVER_URL || "http://192.168.0.10:8000";

// 폴링 간격 (밀리초)
export const POLLING_INTERVAL = 5000; // 5초마다 서버에 비디오 확인
