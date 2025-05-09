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
  RetroImagePanel,
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
      className="bg-black w-full text-white/70 relative"
      id="artwork"
      style={{ fontFamily: "NeoDunggeunmoPro" }}
    >
      {/* 흰색 글리터 배경 추가 */}
      <StarryBackground count={150} className="z-0" />

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
                {/* <div className="w-3 h-3 bg-green-400/80 rounded-full mr-1 border border-white/30"></div> */}
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
                  className="px-4"
                />
              </div>

              <div className="w-full lg:w-2/4">
                <TextPanel
                  title="문제의식/의도"
                  content={artworkContent.intention}
                  className="px-4"
                />
              </div>
            </div>

            <div className="w-full p-4 outline outline-1 outline-white/70">
              <RetroImagePanel
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
                  className="px-4"
                />
              </div>

              <div className="w-full p-4 outline outline-1 outline-white/70 lg:w-1/3">
                <RetroImagePanel
                  imageSrc="/images/artwork-2.webp"
                  imageAlt="나≠나 작품 대표 이미지"
                  refCode="VIS.REF.01"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-white/70 text-l mb-4">
            본 작품은 숭실대학교 글로벌미디어학부<br></br> 2025년 졸업전시에
            출품되었습니다.
          </p>

          <div className="mt-10">
            <a
              href="https://afterglow2025.github.io/afterglow2025/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-black/70 hover:bg-black/60 rounded-full text-white/70 transition-colors text-lg border border-white/50 hover:border-white/70 shadow-lg backdrop-blur-sm mb-16"
            >
              전시 페이지 방문하기
            </a>
          </div>
        </div>
      </div>

      {/* Scanline overlay - ArtworkSection에만 적용되도록 수정 */}
      <div
        className="absolute inset-0 z-50 pointer-events-none"
        style={{
          backgroundImage: "url('/images/scanline.png')",
          backgroundRepeat: "repeat",
          mixBlendMode: "soft-light",
          opacity: 0.1,
          filter: "blur(0.4px) contrast(110%) saturate(70%) brightness(1.1)",
        }}
      ></div>

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

        @keyframes scanline-shift {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(100px);
          }
        }
      `}</style>
    </section>
  );
};

export default ArtworkSection;
