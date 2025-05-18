import { useState, useEffect } from "react";
import { exhibitionConfig } from "../data/exhibitionConfig";

/**
 * 방문자 데이터를 불러오는 커스텀 훅
 */
const useVisitorData = () => {
  const [visitorData, setVisitorData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocalData = async () => {
      try {
        if (exhibitionConfig.exhibition.mode !== "demo") {
          // 실제 API 호출 (현재는 데모 모드로 실행되지 않음)
          // const apiUrl = exhibitionConfig.network.apiUrl;
          // const response = await fetch(`${apiUrl}/visitor`);
          // const data = await response.json();
          // setVisitorData(data);
        } else {
          // 데모 모드: 임시 모의 데이터
          const mockData = {
            visitorId: "V" + Math.floor(Math.random() * 10000),
            timestamp: new Date().toISOString(),
            processingStatus: "완료",
            exhibitionId: exhibitionConfig.exhibition.id,
            mode: exhibitionConfig.exhibition.mode,
          };

          // 데이터 로딩 시간 시뮬레이션
          setTimeout(() => {
            setVisitorData(mockData);
            setIsLoading(false);
          }, 2000);
        }
      } catch (err) {
        setError("데이터를 불러오는데 실패했습니다.");
        setIsLoading(false);
        console.error("Error fetching local data:", err);
      }
    };

    fetchLocalData();
  }, []);

  return { visitorData, isLoading, error };
};

export default useVisitorData;
