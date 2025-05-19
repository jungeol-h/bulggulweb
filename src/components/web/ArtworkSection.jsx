import React, { useRef, useEffect, useState } from "react";
import { artworkContent } from "../../data/artworkContent";
import {
  InfoPanel,
  ImagePanel,
  TextPanel,
  lcdStyles,
  GridBackground,
  TypewriterText,
  FloatingHeads,
  RetroImagePanel,
} from "../web/HudComponents";
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

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.disconnect();
      }
    };
  }, []);

  // 작품 데이터 준비
  const artworkData = {
    shortDescription: artworkContent.shortDescription,
    year: "2025",
    // creator: "팀 '벌꿀오소리'",
    category: "미디어아트",
    materials: "AI 모델, 카메라, 디스플레이, 나무판",
    dimensions: "가변적 (설치 공간에 따라 조정)",
    venue: "마루아트센터",
    exhibitionLink: "https://afterglow2025.github.io/newafterglow/",
  };

  return (
    <section
      ref={sectionRef}
      className="w-full text-white/70 relative"
      id="artwork"
      style={{ fontFamily: "NeoDunggeunmoPro" }}
    >
      <div className="relative z-10 pt-12">
        <div className="container mx-auto min-h-screen pb-20 px-4 max-w-6xl">
          <div
            ref={containerRef}
            className={`flex flex-col gap-0.5 outline outline-2 outline-white/70 ${
              isVisible ? "animate-container" : "opacity-0"
            }`}
          >
            {/* Title row - 레트로 창 UI 스타일 */}
            <div className="w-full py-2 flex items-center justify-between bg-gray-500/80  ">
              <div className="flex items-center ml-2">
                <h1 className="text-white/90 text-2xl font-bold tracking-wider text-left pl-2">
                  <span className="lcd-text">
                    <TypewriterText text="나≠나" delay={30} />
                  </span>
                </h1>
              </div>
              <div className="flex items-center mr-2">
                <div className="w-6 h-5 border border-white/50 mx-1 flex items-center justify-center text-xs text-white/80">
                  _
                </div>
                <div className="w-6 h-5 border border-white/50 mx-1 flex items-center justify-center text-xs text-white/80">
                  □
                </div>
                <div className="w-6 h-5 border border-white/50 mx-1 flex items-center justify-center text-xs text-white/80">
                  ×
                </div>
              </div>
            </div>

            {/* Second row: Specs + Visual */}
            <div className="flex flex-col lg:flex-row gap-0.5">
              <div className="w-full lg:w-1/3">
                <InfoPanel artworkData={artworkData} className="px-4" />
              </div>

              <div className="w-full lg:w-2/3 p-4 outline outline-1 outline-white/70">
                <RetroImagePanel
                  imageSrc="/images/artwork-main.webp"
                  imageAlt="나≠나 작품 대표 이미지"
                  refCode="VIS.01"
                />
              </div>
            </div>

            {/* Third row: Overview + Concept */}
            <div className="flex flex-col lg:flex-row gap-0.5">
              <div className="w-full lg:w-2/4">
                <TextPanel
                  title="프로젝트 요약"
                  content={artworkContent.overview}
                  className="px-4"
                />
              </div>

              {/* <div className="w-full lg:w-2/4">
                <TextPanel
                  title="문제의식/의도"
                  content={artworkContent.intention}
                  className="px-4"
                />
              </div> */}
              <div className="w-full p-4 outline outline-1 outline-white/70">
                <RetroImagePanel
                  imageSrc="/images/artwork-3.webp"
                  imageAlt="나≠나 작품 이미지"
                  refCode="VIS.02"
                />
              </div>
            </div>

            <div className="w-full p-4 outline outline-1 outline-white/70">
              <RetroImagePanel
                imageSrc="/images/artwork-1.webp"
                imageAlt="나≠나 작품 대표 이미지"
                refCode="VIS.03"
              />
            </div>

            {/* <div className="flex flex-col lg:flex-row gap-0.5"> */}
            {/* <div className="w-full">
                <TextPanel
                  title="작품설명"
                  content={artworkContent.description}
                  className="px-4"
                />
              </div> */}

            {/* <div className="w-full p-4 outline outline-1 outline-white/70 lg:w-1/3">
                <RetroImagePanel
                  imageSrc="/images/artwork-2.webp"
                  imageAlt="나≠나 작품 대표 이미지"
                  refCode="VIS.REF.01"
                />
              </div> */}
            {/* </div> */}
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
