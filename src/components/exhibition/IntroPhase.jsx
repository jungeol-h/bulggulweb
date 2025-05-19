import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  SceneManager,
  generateRandomEntityId,
  simulateDnaSequence,
} from "./intro-scenes";

/**
 * 전시회의 인트로 단계를 렌더링하는 컴포넌트
 * 관리자가 최초에 스페이스바를 누르면 자동으로 플로우가 진행됩니다.
 * 각 장면(씬)은 독립적으로 표시되고 자동으로 전환됩니다.
 */
const IntroPhase = ({ introSequence, introTexts }) => {
  // 상태 정의
  const [entityTarget, setEntityTarget] = useState(null);
  const [entityScanning, setEntityScanning] = useState(false);
  const [entityHighlighted, setEntityHighlighted] = useState(false);
  const [dnaSequenceVisible, setDnaSequenceVisible] = useState(false);
  const [dnaSequence, setDnaSequence] = useState("");
  const [survivalTime, setSurvivalTime] = useState({
    hours: 13241,
    minutes: 2134,
  });

  // refs - window 객체에 할당하여 다른 컴포넌트에서 접근 가능하게 함
  const gridScrollRef = useRef(null);
  const targetEntityRef = useRef(null);

  // 전역에서 refs에 접근할 수 있게 window 객체에 할당
  React.useEffect(() => {
    window.gridScrollRef = gridScrollRef;
    window.targetEntityRef = targetEntityRef;

    return () => {
      delete window.gridScrollRef;
      delete window.targetEntityRef;
    };
  }, []);

  // 타겟 엔티티 ID
  const targetId = "F123-232";

  // 100개의 랜덤 엔티티 ID 생성 (메모이제이션으로 성능 최적화)
  const entityIds = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => {
      // 70번째 항목은 타겟으로 설정
      if (i === 70) return targetId;
      return generateRandomEntityId();
    });
  }, [targetId]);

  // 생존 시간 타이머 효과
  useEffect(() => {
    if (introSequence > 3) {
      const timer = setInterval(() => {
        setSurvivalTime((prev) => {
          const newMinutes = prev.minutes + 1;
          if (newMinutes >= 60) {
            return { hours: prev.hours + 1, minutes: 0 };
          }
          return { ...prev, minutes: newMinutes };
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [introSequence]);

  // 자동으로 플로우 진행
  useEffect(() => {
    if (introSequence === 1) {
      // 첫 번째 메시지 타이핑 효과 후, 자동으로 다음 단계로 진행
      const typingDelay = introTexts[0].length * 50 + 1500; // 타이핑 시간 + 추가 지연시간
      const timer = setTimeout(() => {
        // 다음 단계로 자동 진행
        if (window.advanceIntroSequence) {
          window.advanceIntroSequence();
        }
      }, typingDelay);

      return () => clearTimeout(timer);
    }
  }, [introSequence, introTexts]);

  // 엔티티 그리드 생성 효과
  useEffect(() => {
    if (introSequence === 2) {
      // 엔티티 스크롤링 시작
      setTimeout(() => {
        setEntityScanning(true);
      }, 1000);
    }
  }, [introSequence]);

  // 엔티티 스캐닝 시뮬레이션
  useEffect(() => {
    if (introSequence === 2 && entityScanning && gridScrollRef.current) {
      const scrollAnimation = () => {
        const gridScroll = gridScrollRef.current;

        // 스크롤 애니메이션
        gridScroll.style.transform = `translateX(0)`;
        gridScroll.style.transition =
          "transform 5s cubic-bezier(0.2, 0.8, 0.8, 1)";

        // 스캔 완료 후 타겟 하이라이트
        setTimeout(() => {
          setEntityTarget(targetId);
          setEntityHighlighted(true);
          setEntityScanning(false);

          // 약간의 대기 시간 후 다음 단계로 진행
          setTimeout(() => {
            if (window.advanceIntroSequence) {
              window.advanceIntroSequence();
            }
          }, 3000);
        }, 5000);
      };

      scrollAnimation();
    }
  }, [entityScanning, introSequence, targetId]);

  // DNA 시퀀스 시뮬레이션 및 표시
  useEffect(() => {
    if (introSequence === 3) {
      // 약간의 지연 후에 DNA 시퀀스 표시 시작
      const timer = setTimeout(() => {
        setDnaSequenceVisible(true);
        simulateDnaSequence(setDnaSequence);

        // DNA 시퀀스가 적절히 표시된 후 다음 단계로 진행
        const nextSceneTimer = setTimeout(() => {
          if (window.advanceIntroSequence) {
            window.advanceIntroSequence();
          }
        }, 5000);

        return () => clearTimeout(nextSceneTimer);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [introSequence]);

  // 추가 시퀀스 진행을 위한 효과
  useEffect(() => {
    // 마지막 시퀀스(introTexts.length)만 자동으로 진행하지 않음 (스페이스바 입력 대기)
    if (introSequence >= 4 && introSequence < introTexts.length) {
      // 각 텍스트마다 적절한 지연 시간 후 다음 시퀀스로 진행
      const currentText = introTexts[introSequence - 1] || "";
      const typingDelay = currentText.length * 50 + 2000; // 타이핑 시간 + 추가 지연시간

      const timer = setTimeout(() => {
        if (window.advanceIntroSequence) {
          window.advanceIntroSequence();
        }
      }, typingDelay);

      return () => clearTimeout(timer);
    }
  }, [introSequence, introTexts]);

  // SceneManager를 통해 현재 씬을 렌더링
  return (
    <div className="relative">
      <SceneManager
        introSequence={introSequence}
        introTexts={introTexts}
        entityIds={entityIds}
        entityHighlighted={entityHighlighted}
        entityTarget={entityTarget}
        targetId={targetId}
        dnaSequenceVisible={dnaSequenceVisible}
        dnaSequence={dnaSequence}
        survivalTime={survivalTime}
      />
    </div>
  );
};

export default IntroPhase;
