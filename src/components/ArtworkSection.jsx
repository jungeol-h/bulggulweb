import React, { useRef, useEffect, useState } from "react";
import { artworkContent } from "../data/artworkContent";
import {
  InfoPanel,
  ImagePanel,
  TextPanel,
  lcdStyles,
  GridBackground,
  StarryBackground,
  TypewriterText,
  FloatingHeads,
} from "./HudComponents";
import StyledHeading from "./StyledHeading";

const ArtworkSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // 10% 이상 보이면 활성화
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  // 작품 데이터 준비
  const artworkData = {
    shortDescription: artworkContent.shortDescription,
    year: "2025",
    creator: "팀 '벌꿀오소리'",
    category: "미디어아트",
    materials: "AI 모델, 카메라, 디스플레이, 나무판",
    dimensions: "가변적 (설치 공간에 따라 조정)",
  };

  return (
    <section
      ref={sectionRef}
      className="bg-black w-full text-white relative"
      id="artwork"
      style={{ fontFamily: "NeoDunggeunmoPro" }}
    >
      {/* 흰색 글리터 배경 추가 */}
      <StarryBackground count={150} className="z-0" />

      {/* Floating heads animation */}
      {/* <FloatingHeads count={5} /> */}

      {/* <div className="relative z-10 pt-12 px-8">
        <div className="container mx-auto text-left">
          <StyledHeading
            text="작품 정보"
            className="text-left text-gray-200 "
            color="#fff"
            fontSize="text-xl"
          />
        </div>
      </div> */}

      <div className="relative z-1 pt-12">
        <div className="container mx-auto min-h-screen pb-20 px-4 max-w-6xl">
          <div
            ref={containerRef}
            className={`flex flex-col gap-0.5 outline outline-2 ${
              isVisible ? "animate-container" : "opacity-0"
            }`}
          >
            {/* Title row */}
            <div className="w-full py-3 flex items-center">
              <div className="mr-4 text-xs text-gray-400"></div>
              <h1 className="text-white text-3xl font-bold tracking-wider text-left">
                <span className="lcd-text">
                  <TypewriterText text="나≠나" delay={30} />
                </span>
              </h1>
            </div>

            {/* Second row: Specs + Visual */}
            <div className="flex flex-col lg:flex-row gap-0.5">
              <div className="w-full lg:w-1/3">
                <InfoPanel artworkData={artworkData} className="px-2" />
              </div>

              <div className="w-full lg:w-2/3 p-4 outline outline-1">
                <ImagePanel
                  imageSrc="/images/artwork-main.webp"
                  imageAlt="나≠나 작품 대표 이미지"
                  refCode="VIS.REF.01"
                />
              </div>
            </div>

            {/* Third row: Overview + Concept */}
            <div className="flex flex-col lg:flex-row gap-0.5">
              <div className="w-full lg:w-2/4">
                <TextPanel
                  title="프로젝트 요약"
                  content={artworkContent.overview}
                  className="px-2"
                />
              </div>

              <div className="w-full lg:w-2/4">
                <TextPanel
                  title="문제의식/의도"
                  content={artworkContent.intention}
                  className="px-2"
                />
              </div>
            </div>

            <div className="w-full p-4 outline outline-1">
              <ImagePanel
                imageSrc="/images/artwork-1.webp"
                imageAlt="나≠나 작품 대표 이미지"
                refCode="VIS.REF.01"
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-0.5">
              <div className="w-full lg:w-2/3">
                <TextPanel
                  title="작품설명"
                  content={artworkContent.description}
                  className="px-2"
                />
              </div>

              <div className="w-full p-4 outline outline-1 lg:w-1/3">
                <ImagePanel
                  imageSrc="/images/artwork-2.webp"
                  imageAlt="나≠나 작품 대표 이미지"
                  refCode="VIS.REF.01"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-20 max-w-6xl mx-auto">
        {/* <StyledHeading text="큐레이터" className="mb-12 text-center" /> */}

        <div className="text-center max-w-3xl mx-auto">
          <p className="text-l mb-4">
            본 작품은 숭실대학교 글로벌미디어학부<br></br> 2024년 졸업전시에
            출품되었습니다.
          </p>

          <div className="mt-10">
            <a
              href="https://afterglow2025.github.io/afterglow2025/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-black/40 hover:bg-black/60 rounded-full text-white transition-colors text-lg border border-white/50 hover:border-white shadow-lg backdrop-blur-sm mb-16"
            >
              전시 페이지 방문하기
            </a>
          </div>
        </div>
      </div>
      {/* CSS for LCD and pixel effects */}
      <style jsx>{lcdStyles}</style>

      {/* 컴포넌트 내 스타일 적용 */}
      <style jsx global>{`
        #artwork,
        #artwork * {
          font-family: "NeoDunggeunmoPro", monospace !important;
        }

        .animate-container {
          animation: slideInFromTop 0.8s ease-out forwards;
        }

        @keyframes slideInFromTop {
          0% {
            transform: translateY(-50px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default ArtworkSection;
