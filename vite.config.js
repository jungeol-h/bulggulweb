import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { WebSocketServer } from "ws";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true, // 모든 네트워크 인터페이스에서 접근 가능하도록 설정
  },
  plugins: [
    react(),
    {
      name: "esp32-websocket-server",
      configureServer(server) {
        // ESP32 WebSocket Server 설정
        const wss = new WebSocketServer({ noServer: true });

        // WebSocket 연결 핸들링
        wss.on("connection", (ws) => {
          console.log("ESP32 디바이스 연결됨");

          // ESP32로부터 메시지 수신
          ws.on("message", (data) => {
            try {
              const message = JSON.parse(data.toString());
              console.log("ESP32로부터 메시지 수신:", message);

              // 모든 클라이언트에 메시지 브로드캐스트
              wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === 1) {
                  client.send(data.toString());
                }
              });
            } catch (error) {
              console.error("메시지 파싱 오류:", error);
            }
          });

          ws.on("close", () => {
            console.log("ESP32 디바이스 연결 종료");
          });
        });

        // HTTP 서버에 WebSocket 서버 연결
        server.httpServer.on("upgrade", (request, socket, head) => {
          if (request.url.endsWith("/keyboard")) {
            wss.handleUpgrade(request, socket, head, (ws) => {
              wss.emit("connection", ws, request);
            });
          }
        });
      },
    },
  ],
});
