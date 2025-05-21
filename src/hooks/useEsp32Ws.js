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
  const maxReconnectAttempts = 10;
  const reconnectDelay = 2000; // 2초

  /**
   * WebSocket 연결 종료 함수
   */
  const close = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (wsRef.current) {
      console.log("ESP32 WebSocket 연결 종료");
      wsRef.current.close();
      wsRef.current = null;
    }

    reconnectAttemptRef.current = 0;
  }, []);

  /**
   * ESP32로 LED 상태 전송
   * @param {Array<number>} indices - 켜진 LED의 인덱스 배열 (1-based)
   */
  const sendLed = useCallback((indices) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.warn("WebSocket이 연결되지 않음. LED 데이터를 보낼 수 없습니다.");
      return;
    }

    try {
      const message = JSON.stringify({ led: indices });
      wsRef.current.send(message);
      console.log(`ESP32로 LED 상태 전송: ${message}`);
    } catch (error) {
      console.error("LED 데이터 전송 실패:", error);
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
   * @param {string} url - WebSocket 서버 URL (예: ws://192.168.0.1000:8080/keyboard)
   */
  const connect = useCallback(
    (url) => {
      // 기존 연결 정리
      close();

      console.log(`ESP32 WebSocket에 연결 시도: ${url}`);

      try {
        wsRef.current = new WebSocket(url);

        // 연결 성공 이벤트
        wsRef.current.onopen = () => {
          console.log("✅ ESP32 WebSocket 연결 성공");
          reconnectAttemptRef.current = 0; // 재연결 시도 카운트 초기화
        };

        // 메시지 수신 이벤트
        wsRef.current.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            console.log("ESP32로부터 메시지 수신:", data);

            // 버튼 데이터 수신 처리 {"btn": 2}
            if (data.btn !== undefined && buttonCallbackRef.current) {
              console.log(`버튼 ${data.btn} 눌림`);
              buttonCallbackRef.current(data.btn);
            }
          } catch (error) {
            console.error("WebSocket 메시지 파싱 실패:", error);
          }
        };

        // 연결 종료 이벤트
        wsRef.current.onclose = () => {
          console.warn("WebSocket 연결 종료. 재연결 시도 중...");

          // 재연결 시도
          if (reconnectAttemptRef.current < maxReconnectAttempts) {
            reconnectTimeoutRef.current = setTimeout(() => {
              reconnectAttemptRef.current += 1;
              console.log(
                `재연결 시도 ${reconnectAttemptRef.current}/${maxReconnectAttempts}`
              );
              connect(url);
            }, reconnectDelay);
          } else {
            console.error(`${maxReconnectAttempts}회 재연결 시도 후 실패`);
          }
        };

        // 오류 처리
        wsRef.current.onerror = (error) => {
          console.error("WebSocket 오류:", error);
        };
      } catch (error) {
        console.error("WebSocket 연결 생성 실패:", error);
      }
    },
    [close]
  );

  return { connect, sendLed, onButton, close };
};

export default useEsp32Ws;
