import axios from "axios";

// API 서버 URL 설정
const API_SERVER_URL =
  import.meta.env.VITE_API_SERVER_URL || "http://192.168.0.10:8000";

/**
 * 비디오 서비스 - 서버와의 비디오 관련 통신을 담당
 */
export const VideoService = {
  /**
   * 초기 비디오 URL 목록을 가져옵니다.
   * @param {string} sessionId - 세션 ID
   * @returns {Promise<{urls: Array<string|null>, loadedIndices: Array<number>}>} - 비디오 URL 목록과 로드된 인덱스
   */
  fetchInitialVi deoUrls: async (sessionId) => {
    try {
      console.log(`세션 ID ${sessionId}의 비디오 URL 확인 중...`);

      // 모든 비디오 URL 확인 (8개 인덱스)
      const newUrls = Array(8).fill(null);
      const checkPromises = [];

      for (let i = 0; i < 8; i++) {
        const videoUrl = `${API_SERVER_URL}/uploads/${sessionId}/result_output_${i}.mp4`;

        // HEAD 요청으로 파일 존재 여부 확인
        checkPromises.push(
          axios
            .head(videoUrl)
            .then(() => {
              // 파일이 존재하면 URL 배열에 추가
              newUrls[i] = videoUrl;
              return { index: i, url: videoUrl };
            })
            .catch(() => null) // 파일이 없으면 null 반환
        );
      }

      // 모든 요청 결과 처리
      await Promise.allSettled(checkPromises);

      // 로드된 비디오 확인
      const loadedCount = newUrls.filter((url) => url !== null).length;
      console.log(`초기 로드 완료: ${loadedCount}개의 비디오 발견됨`);

      // 로드된 비디오 인덱스 계산
      const loadedIndices = [];
      newUrls.forEach((url, index) => {
        if (url) loadedIndices.push(index + 1);
      });

      return { urls: newUrls, loadedIndices };
    } catch (error) {
      console.error("비디오 URL 목록 가져오기 실패:", error);
      throw error;
    }
  },

  /**
   * 누락된 비디오를 서버에서 확인하고 업데이트합니다.
   * @param {string} sessionId - 세션 ID
   * @param {Array<string|null>} currentUrls - 현재 비디오 URL 배열
   * @returns {Promise<{urls: Array<string|null>, loadedVideos: Array<Object>}>} - 업데이트된 URL 배열과 새로 로드된 비디오 정보
   */
  fetchMissingVideos: async (sessionId, currentUrls) => {
    try {
      // 현재 로드되지 않은 비디오만 요청
      const missingIndices = [];
      for (let i = 0; i < 8; i++) {
        if (!currentUrls[i]) {
          missingIndices.push(i + 1); // 1-based 인덱스로 변환
        }
      }

      if (missingIndices.length === 0) {
        console.log("모든 비디오가 이미 로드되었습니다.");
        return { urls: currentUrls, loadedVideos: [] };
      }

      console.log(`서버에서 다음 비디오 확인 중: ${missingIndices.join(", ")}`);

      // 새 비디오 URL 업데이트 배열 준비
      const newVideoUrls = [...currentUrls];
      const checkPromises = [];

      // 각 인덱스별로 비디오가 존재하는지 확인
      for (const idx of missingIndices) {
        const videoUrl = `${API_SERVER_URL}/uploads/${sessionId}/result_output_${
          idx - 1
        }.mp4`;

        // HEAD 요청으로 파일 존재 여부 확인
        checkPromises.push(
          axios
            .head(videoUrl)
            .then(() => {
              // 파일이 존재하면 URL 배열에 추가
              const index = idx - 1; // 0-based 인덱스로 변환
              newVideoUrls[index] = videoUrl;
              console.log(`비디오 ${idx} 로드됨: ${videoUrl}`);
              return { index, url: videoUrl };
            })
            .catch((err) => {
              console.log(`비디오 ${idx}는 아직 없음:`, err.message);
              return null;
            })
        );
      }

      // 모든 요청 결과 처리
      const results = await Promise.allSettled(checkPromises);
      const loadedVideos = results
        .filter((result) => result.status === "fulfilled" && result.value)
        .map((result) => result.value);

      if (loadedVideos.length > 0) {
        console.log(`${loadedVideos.length}개의 새 비디오 발견됨`);
      } else {
        console.log("새로 추가된 비디오 없음");
      }

      return { urls: newVideoUrls, loadedVideos };
    } catch (error) {
      console.error("비디오 가져오기 오류:", error);
      throw error;
    }
  },
};

export default VideoService;
