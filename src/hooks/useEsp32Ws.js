import { useCallback, useRef } from "react";

/**
 * ESP32와의 WebSocket 통신을 관리하는 커스텀 훅
 * @returns {Object} WebSocket 제어 함수들
 */
const useEsp32Ws = () => {
  // WebSocket 인스턴스 참조
  const wsRef = useRef(null);
  const reconnectAttemptRef = useRef(0);
  const reconnectTimeoutRef = useRef(null);
  const buttonCallbackRef = useRef(null);

  /**
   * WebSocket 연결 종료 함수
   */
  const close = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    reconnectAttemptRef.current = 0;
  }, []);

  /**
   * ESP32로 LED 상태 전송
   * @param {Array<number>} indices - 켜진 LED의 인덱스 배열
   */
  const sendLed = useCallback((indices) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.warn("WebSocket is not connected. Cannot send LED data.");
      return;
    }

    try {
      const message = JSON.stringify({ led: indices });
      wsRef.current.send(message);
    } catch (error) {
      console.error("Failed to send LED data:", error);
    }
  }, []);

  /**
   * ESP32로부터 버튼 이벤트 수신 콜백 설정
   * @param {Function} callback - 버튼 인덱스를 받는 콜백 함수
   */
  const onButton = useCallback((callback) => {
    buttonCallbackRef.current = callback;
  }, []);

  /**
   * WebSocket 연결 시도
   * @param {string} url - WebSocket 서버 URL
   */
  const connect = useCallback(
    (url) => {
      // 기존 연결 정리
      close();

      try {
        wsRef.current = new WebSocket(url);

        // 연결 성공 이벤트
        wsRef.current.onopen = () => {
          console.log("WebSocket connected to ESP32");
          reconnectAttemptRef.current = 0; // 재연결 시도 카운트 초기화
        };

        // 메시지 수신 이벤트
        wsRef.current.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);

            // 버튼 데이터 수신 처리
            if (data.btn !== undefined && buttonCallbackRef.current) {
              buttonCallbackRef.current(data.btn);
            }
          } catch (error) {
            console.error("Failed to parse WebSocket message:", error);
          }
        };

        // 연결 종료 이벤트
        wsRef.current.onclose = () => {
          console.warn(
            "WebSocket connection closed. Attempting to reconnect..."
          );

          // LED 초기화 (여기서는 빈 배열을 보내 모든 LED를 끔)
          if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            sendLed([]);
          }

          // 재연결 시도
          if (reconnectAttemptRef.current < 10) {
            reconnectTimeoutRef.current = setTimeout(() => {
              reconnectAttemptRef.current += 1;
              connect(url);
            }, 2000);
          } else {
            console.error("Failed to reconnect to WebSocket after 10 attempts");
          }
        };

        // 오류 처리
        wsRef.current.onerror = (error) => {
          console.error("WebSocket error:", error);
        };
      } catch (error) {
        console.error("Failed to create WebSocket connection:", error);
      }
    },
    [close, sendLed]
  );

  return { connect, sendLed, onButton, close };
};

export default useEsp32Ws;
