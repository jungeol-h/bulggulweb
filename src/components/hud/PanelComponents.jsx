import React from "react";
import { HudPanel, HudImageFrame, HudLabelValue } from "./BasicHudComponents";
import { TypewriterText, TypewriterBlock } from "./TextEffectComponents";

/**
 * 개요 패널 - 작품 기본 정보를 포함하는 패널
 */
export const InfoPanel = ({ artworkData, className = "" }) => (
  <HudPanel title=" " className={`h-full space-y-2 ${className}`}>
    <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-4">
      <HudLabelValue
        label="CLASSIFICATION"
        value={artworkData.category || "미디어아트"}
        useTypewriter={true}
      />
      <HudLabelValue
        label="MANUFACTURE DATE"
        value={artworkData.year || "2025"}
        useTypewriter={true}
      />
      {/* <HudLabelValue
        label="OPERATOR"
        value={artworkData.creator || "팀 '벌꿀오소리'"}
        useTypewriter={true}
      /> */}

      <HudLabelValue
        label="COMPONENTS"
        value={artworkData.materials || "AI, 카메라, 디스플레이"}
        className="col-span-2"
        useTypewriter={true}
      />
      <HudLabelValue
        label="SPATIAL PARAMETERS"
        value={artworkData.dimensions || "가변적"}
        className="col-span-2"
        useTypewriter={true}
      />
      {artworkData.venue && (
        <HudLabelValue
          label="EXHIBITION VENUE"
          value={artworkData.venue}
          className="col-span-2"
          useTypewriter={true}
        />
      )}
      {artworkData.exhibitionLink && (
        <div className="col-span-2 mt-2">
          <a
            href={artworkData.exhibitionLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:text-blue-200 underline text-sm font-mono"
          >
            전시정보 바로가기
          </a>
        </div>
      )}
    </div>
  </HudPanel>
);

/**
 * 이미지 패널 - 사진만 표시하는 패널
 */
export const ImagePanel = ({ imageSrc, imageAlt }) => (
  <HudPanel className="h-full flex flex-col">
    <div></div>
    <div className="flex-grow">
      <HudImageFrame src={imageSrc} alt={imageAlt} className="h-full " />
    </div>
  </HudPanel>
);

/**
 * 텍스트 패널 - 텍스트 콘텐츠를 표시하는 패널
 */
export const TextPanel = ({ title, content, className }) => (
  <HudPanel title={title} className={`h-full ${className}`}>
    <div className="text-white font-mono text-sm h-full pb-4">
      <TypewriterBlock content={content} />
    </div>
  </HudPanel>
);
