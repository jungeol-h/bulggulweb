import React, { useEffect, useRef } from "react";
import { artworkContent } from "../data/artworkContent";
import {
  ArtworkSpecsPanel,
  ArtworkVisualPanel,
  ProjectOverviewPanel,
  ConceptFrameworkPanel,
  TechnicalDescriptionPanel,
  BackgroundAnalysisPanel,
  InspirationSourcesPanel,
  SystemComponentsPanel,
  VisualArchivePanel,
} from "./hud/ArtworkHudPanels";
import { lcdStyles, GridBackground } from "./hud/HudComponents";

// 시스템 상태 모의 데이터
const SYSTEM_STATUSES = [
  { label: "신경망 버전", value: "v3.2.1", active: true },
  { label: "운영 시간", value: "768시간", active: true },
  { label: "CPU 사용률", value: "42%", active: true },
  { label: "메모리 상태", value: "안정적", active: true },
  { label: "연결 상태", value: "온라인", active: true },
  { label: "보안 레벨", value: "GAMMA", active: true },
];

const ArtworkSection = () => {
  const sectionRef = useRef(null);

  // Animation effect on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
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
      className="bg-black w-full text-white font-mono relative"
      id="artwork"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-background opacity-30"></div>

      <div className="relative z-10">
        <div className="container mx-auto min-h-screen py-20 px-4">
          {/* Title Header */}
          <div className="border-b border-gray-800 mb-10 pb-3 flex items-center">
            <div className="mr-4 text-xs text-gray-400">
              <span>[</span>
              작품명
              <span>]</span>
            </div>
            <h1 className="text-white text-3xl font-bold tracking-wider">
              <span className="lcd-text">나≠나</span>
            </h1>
          </div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {/* Left Column: Data Readout */}
            <div className="animate-on-scroll opacity-0 transition-all duration-700 transform translate-y-10">
              <ArtworkSpecsPanel artworkData={artworkData} />
            </div>

            {/* Right Column: Visual Data */}
            <div className="animate-on-scroll opacity-0 transition-all duration-700 delay-150 transform translate-y-10">
              <ArtworkVisualPanel
                imageSrc="/images/artwork-main.png"
                imageAlt="나≠나 작품 대표 이미지"
              />
            </div>
          </div>

          {/* Content sections with HUD-style panels */}
          <div className="space-y-16">
            {/* 작품 개요 */}
            <div className="animate-on-scroll opacity-0 transition-all duration-700 transform translate-y-10">
              <ProjectOverviewPanel overview={artworkContent.overview} />
            </div>

            {/* 문제의식 및 의도 */}
            <div className="animate-on-scroll opacity-0 transition-all duration-700 transform translate-y-10">
              <ConceptFrameworkPanel data={artworkContent.intention} />
            </div>

            {/* 작품 설명 */}
            <div className="animate-on-scroll opacity-0 transition-all duration-700 transform translate-y-10">
              <TechnicalDescriptionPanel data={artworkContent.description} />
            </div>

            {/* 작업 배경 */}
            <div className="animate-on-scroll opacity-0 transition-all duration-700 transform translate-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <BackgroundAnalysisPanel data={artworkContent.background} />
                <InspirationSourcesPanel
                  inspirations={artworkContent.background.inspirations}
                />
              </div>
            </div>

            {/* 작업 구성 */}
            <div className="animate-on-scroll opacity-0 transition-all duration-700 transform translate-y-10">
              <SystemComponentsPanel
                structure={artworkContent.structure}
                components={artworkContent.components}
              />
            </div>

            {/* 기타 시각자료 */}
            <div className="animate-on-scroll opacity-0 transition-all duration-700 transform translate-y-10">
              <VisualArchivePanel images={artworkContent.processImages} />
            </div>
          </div>

          {/* Footer status bar */}
          <div className="border-t border-gray-800 mt-16 pt-4 flex justify-between text-xs text-gray-400">
            <div>SYSTEM VERSION: 2.5.1</div>
            <div className="flex items-center">
              <span className="h-2 w-2 bg-white rounded-full blink mr-2"></span>
              CONNECTION ACTIVE
            </div>
            <div>©2025 BULGGUL-OSORI COLLECTIVE</div>
          </div>
        </div>
      </div>

      {/* CSS for LCD and pixel effects */}
      <style jsx>{lcdStyles}</style>
    </section>
  );
};

export default ArtworkSection;
