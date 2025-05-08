import React, { useRef } from "react";
import { artworkContent } from "../data/artworkContent";
import {
  InfoPanel,
  ImagePanel,
  TextPanel,
  lcdStyles,
  GridBackground,
  StarryBackground,
  TypewriterText,
} from "./HudComponents";
import StyledHeading from "./StyledHeading";

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
      className="bg-black w-full text-white relative"
      id="artwork"
      style={{ fontFamily: "NeoDunggeunmoPro" }}
    >
      {/* 흰색 글리터 배경 추가 */}
      <StarryBackground count={150} className="z-0" />

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

      <div className="relative z-10 pt-12">
        <div className="container mx-auto min-h-screen pb-20 px-4">
          <div className="flex flex-col gap-0.5 outline outline-2">
            {/* Title row */}
            <div className="w-full py-3 flex items-center">
              <div className="mr-4 text-xs text-gray-400"></div>
              <h1 className="text-white text-3xl font-bold tracking-wider text-left">
                <span className="lcd-text">
                  <TypewriterText text="나≠나" delay={150} />
                </span>
              </h1>
            </div>

            {/* Second row: Specs + Visual */}
            <div className="flex flex-col lg:flex-row gap-0.5">
              <div className="w-full lg:w-1/3">
                <InfoPanel artworkData={artworkData} />
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
              <div className="w-full lg:w-2/3">
                <TextPanel
                  title="프로젝트 요약"
                  content={artworkContent.overview}
                />
              </div>

              <div className="w-full lg:w-1/3">
                <TextPanel
                  title="문제의식/의도"
                  content={artworkContent.intention}
                />
              </div>
            </div>

            {/* Fourth row: Image */}
            <div className="w-full p-4 outline outline-1">
              <ImagePanel
                imageSrc="/images/artwork-main.webp"
                imageAlt="나≠나 작품 대표 이미지"
                refCode="VIS.REF.01"
              />
            </div>

            <div className="w-full lg:w-1/2">
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

      {/* 컴포넌트 내 스타일 적용 */}
      <style jsx global>{`
        #artwork,
        #artwork * {
          font-family: "NeoDunggeunmoPro", monospace !important;
        }
      `}</style>
    </section>
  );
};

export default ArtworkSection;
