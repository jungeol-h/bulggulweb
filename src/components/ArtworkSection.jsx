import React, { useRef } from "react";
import { artworkContent } from "../data/artworkContent";
import {
  InfoPanel,
  ImagePanel,
  TextPanel,
  lcdStyles,
  GridBackground,
} from "./HudComponents";

const ArtworkSection = () => {
  const sectionRef = useRef(null);

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
      <div className="relative z-10">
        <div className="container mx-auto min-h-screen py-20 px-4">
          {/* Title Header */}
          <div className="mb-10 pb-3 flex items-center">
            <div className="mr-4 text-xs text-gray-400">
              <span>[</span>
              작품명
              <span>]</span>
            </div>
            <h1 className="text-white text-3xl font-bold tracking-wider">
              <span className="lcd-text">나≠나</span>
            </h1>
          </div>

          {/* Unified Grid Layout - All sections in one connected grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0.5 outline outline-2">
            {/* Top row: Specs + Visual */}
            <div className="col-span-1">
              <InfoPanel artworkData={artworkData} />
            </div>

            <div className="col-span-1 lg:col-span-2">
              <ImagePanel
                imageSrc="/images/artwork-main.png"
                imageAlt="나≠나 작품 대표 이미지"
                title="이미지 #1"
                refCode="VIS.REF.01"
              />
            </div>

            {/* Bottom row: Overview + Concept */}
            <div className="col-span-1 lg:col-span-2">
              <TextPanel
                title="프로젝트 요약"
                content={artworkContent.overview}
              />
            </div>

            <div className="col-span-1">
              <TextPanel
                title="문제의식/의도"
                content={artworkContent.intention}
              />
            </div>
          </div>
        </div>
      </div>
      {/* CSS for LCD and pixel effects */}
      <style jsx>{lcdStyles}</style>
    </section>
  );
};

export default ArtworkSection;
