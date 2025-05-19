// filepath: /Users/jungeol/Projects/🎭 Media Art/bulggulweb/src/components/exhibition/IntroPhase.jsx
import React, { useState, useEffect, useRef, useMemo } from "react";
import { TypewriterText } from "../HudComponents";

/**
 * 전시회의 인트로 단계를 렌더링하는 컴포넌트
 * 원래 migleTest 구현을 바탕으로 했습니다.
 * 관리자가 최초에 스페이스바를 누르면 자동으로 플로우가 진행됩니다.
 * 각 장면(씬)은 독립적으로 표시되고 자동으로 전환됩니다.
 */
const IntroPhase = ({ introSequence, introTexts }) => {
  const [entityTarget, setEntityTarget] = useState(null);
  const [entityScanning, setEntityScanning] = useState(false);
  const [entityHighlighted, setEntityHighlighted] = useState(false);
  const [dnaSequenceVisible, setDnaSequenceVisible] = useState(false);
  const [dnaSequence, setDnaSequence] = useState("");
  const [survivalTime, setSurvivalTime] = useState({
    hours: 13241,
    minutes: 2134,
  });

  const gridScrollRef = useRef(null);
  const targetEntityRef = useRef(null);

  // 타겟 엔티티 ID
  const targetId = "F123-232";

  // 랜덤 엔티티 ID 생성 함수
  const generateRandomEntityId = () => {
    const prefix = "F";
    const mid = Math.floor(Math.random() * 999)
      .toString()
      .padStart(3, "0");
    const suffix = Math.floor(Math.random() * 999)
      .toString()
      .padStart(3, "0");
    return `${prefix}${mid}-${suffix}`;
  };

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
        simulateDnaSequence();

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

  // DNA 시퀀스 시뮬레이션
  const simulateDnaSequence = () => {
    const bases = ["A", "T", "G", "C"];
    let sequence = "";
    const maxLength = 300;

    const generateSequence = (index = 0) => {
      if (index >= maxLength) {
        // DNA 시퀀스 생성 완료
        return;
      }

      sequence += bases[Math.floor(Math.random() * bases.length)];
      setDnaSequence(sequence);

      setTimeout(() => generateSequence(index + 1), 10);
    };

    generateSequence();
  };

  // 추가 시퀀스 진행을 위한 효과
  useEffect(() => {
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

  // 현재 인트로 시퀀스에 따라 적절한 컷(장면)을 렌더링
  const renderCurrentScene = () => {
    // 장면 0: 정면 응시 메시지
    if (introSequence === 0) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="text-white text-3xl font-bold mb-8">
            정면을 응시해주세요.
          </div>
        </div>
      );
    }

    // 장면 1: 첫 번째 타이핑 텍스트
    else if (introSequence === 1) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="max-w-4xl w-full p-8">
            <div className="text-green-400 text-3xl font-mono text-center">
              <TypewriterText text={introTexts[0]} delay={50} />
            </div>
          </div>
        </div>
      );
    }

    // 장면 2: 엔티티 그리드 스캐닝 (고정 위치에 표시)
    else if (introSequence === 2) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="w-full h-48 overflow-hidden relative">
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              <div className="h-full w-0.5 bg-green-500 opacity-80"></div>
            </div>
            <div
              ref={gridScrollRef}
              className="flex items-center transition-transform"
              style={{
                transform: "translateX(100vw)",
              }}
            >
              {entityIds.map((id, index) => (
                <div
                  key={index}
                  ref={id === targetId ? targetEntityRef : null}
                  className={`px-8 py-4 font-mono text-2xl mx-2 transition-all duration-300 ${
                    entityHighlighted && id === entityTarget
                      ? "text-green-500 border border-green-500 bg-black bg-opacity-80"
                      : entityHighlighted
                      ? "opacity-30"
                      : "text-green-300"
                  }`}
                >
                  {id}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // 장면 3: 기본 정보 및 DNA 시퀀스
    else if (introSequence === 3) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="max-w-4xl w-full p-8 text-left font-mono">
            <p className="text-green-400 text-xl mb-4">
              고유 식별코드: F123-232
            </p>
            <p className="text-green-400 text-xl mb-4">물체 정보: 유기체.</p>
            <p className="text-green-400 text-xl mb-4">
              생존 기간:{" "}
              <span>
                {survivalTime.hours}h {survivalTime.minutes}min
              </span>
            </p>

            {dnaSequenceVisible && (
              <>
                <p className="text-green-400 text-xl mb-2">DNA 염기 서열:</p>
                <div className="bg-black bg-opacity-70 p-4 font-mono text-green-500 text-sm overflow-hidden overflow-ellipsis break-all max-h-40">
                  {dnaSequence}
                </div>
              </>
            )}
          </div>
        </div>
      );
    }

    // 장면 4+: 후속 메시지들
    else if (introSequence <= introTexts.length) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="max-w-4xl w-full p-8">
            <div className="text-green-400 text-2xl font-mono text-center">
              <TypewriterText text={introTexts[introSequence - 1]} delay={50} />
            </div>
          </div>
        </div>
      );
    }

    // 기본: 빈 화면
    return <div className="min-h-screen"></div>;
  };

  // 각 씬은 하나씩만 보이도록 구성
  return <div className="relative">{renderCurrentScene()}</div>;
};

export default IntroPhase;
