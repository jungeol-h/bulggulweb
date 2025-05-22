import { useState, useEffect, useCallback, useRef } from "react";
import VideoService from "../services/VideoService";
import { POLLING_INTERVAL } from "../constants/apiConstants";

/**
 * 비디오 사전 로드를 위한 커스텀 훅
 * IntroPhase 단계에서 백그라운드로 비디오를 미리 로드합니다.
 *
 * @param {string} sessionId - 세션 ID
 * @param {boolean} enabled - 활성화 여부
 * @returns {Object} - 비디오 로딩 상태 및 정보
 */
const useVideoPreload = (sessionId, enabled = true) => {
  // 비디오 URL 상태
  const [videoUrls, setVideoUrls] = useState(Array(8).fill(null));
  // 로딩된 비디오 인덱스 추적
  const [loadedIndices, setLoadedIndices] = useState([]);
  // 비디오 로딩 상태
  const [loading, setLoading] = useState(false);
  // 에러 상태
  const [error, setError] = useState(null);
  // 폴링 인터벌 레퍼런스
  const pollingIntervalRef = useRef(null);
  // 최소 하나의 비디오가 로드되었는지 여부
  const [atLeastOneLoaded, setAtLeastOneLoaded] = useState(false);

  // 초기 비디오 URL 가져오기
  const fetchInitialVideos = useCallback(async () => {
    if (!sessionId || !enabled) return;

    try {
      setLoading(true);
      setError(null);

      const { urls, loadedIndices } = await VideoService.fetchInitialVideoUrls(
        sessionId
      );

      setVideoUrls(urls);
      setLoadedIndices(loadedIndices);

      // 적어도 하나의 비디오가 로드되었는지 확인
      if (loadedIndices.length > 0) {
        setAtLeastOneLoaded(true);
      }

      setLoading(false);
    } catch (err) {
      console.error("초기 비디오 로딩 실패:", err);
      setError(err.message);
      setLoading(false);
    }
  }, [sessionId, enabled]);

  // 누락된 비디오 가져오기
  const fetchMissingVideos = useCallback(async () => {
    if (!sessionId || !enabled) return;

    try {
      setLoading(true);

      const { urls, loadedVideos } = await VideoService.fetchMissingVideos(
        sessionId,
        videoUrls
      );

      if (loadedVideos.length > 0) {
        setVideoUrls(urls);

        // 새로 로드된 비디오의 인덱스 업데이트
        const newIndices = loadedVideos.map((video) => video.index + 1);
        setLoadedIndices((prev) => {
          const updated = [...prev];
          newIndices.forEach((index) => {
            if (!updated.includes(index)) {
              updated.push(index);
            }
          });
          return updated;
        });

        // 적어도 하나의 비디오가 로드되었는지 확인
        setAtLeastOneLoaded(true);
      }

      setLoading(false);
    } catch (err) {
      console.error("비디오 업데이트 실패:", err);
      setError(err.message);
      setLoading(false);
    }
  }, [sessionId, videoUrls, enabled]);

  // 활성화될 때 초기 비디오 로드 및 폴링 시작
  useEffect(() => {
    if (enabled && sessionId) {
      console.log(`세션 ID ${sessionId}로 비디오 사전 로드 시작`);

      // 초기 로드
      fetchInitialVideos();

      // 폴링 시작
      pollingIntervalRef.current = setInterval(() => {
        // 모든 비디오가 로드되었으면 폴링 중지
        const allVideosLoaded = videoUrls.every((url) => url !== null);
        if (allVideosLoaded) {
          console.log("모든 비디오 로드 완료, 폴링 중지");
          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
            pollingIntervalRef.current = null;
          }
        } else {
          fetchMissingVideos();
        }
      }, POLLING_INTERVAL);
    }

    // 컴포넌트 언마운트 또는 disabled될 때 폴링 중지
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
    };
  }, [sessionId, enabled, fetchInitialVideos, fetchMissingVideos, videoUrls]);

  return {
    videoUrls,
    loadedIndices,
    loading,
    error,
    atLeastOneLoaded,
    hasAllVideos: videoUrls.every((url) => url !== null),
  };
};

export default useVideoPreload;
