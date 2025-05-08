import React from "react";
import {
  HudPanel,
  HudLabelValue,
  HudDivider,
  HudImageFrame,
} from "./HudComponents";

/**
 * 작품 기본 정보 패널
 */
export const ArtworkSpecsPanel = ({ artworkData }) => (
  <HudPanel title="개요" className="h-full space-y-2">
    <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-4">
      <HudLabelValue label="UNIT ID" value="VX-NANANA-25" />
      <HudLabelValue
        label="MANUFACTURE DATE"
        value={artworkData.year || "2025"}
      />
      <HudLabelValue
        label="OPERATOR"
        value={artworkData.creator || "팀 '벌꿀오소리'"}
      />
      <HudLabelValue
        label="CLASSIFICATION"
        value={artworkData.category || "미디어아트"}
      />
      <HudLabelValue
        label="COMPONENTS"
        value={artworkData.materials || "AI, 카메라, 디스플레이"}
        className="col-span-2"
      />
      <HudLabelValue
        label="SPATIAL PARAMETERS"
        value={artworkData.dimensions || "가변적"}
        className="col-span-2"
      />
    </div>

    <HudDivider />

    <div>
      <p className="text-white font-mono text-sm">
        {artworkData.shortDescription}
      </p>
    </div>
  </HudPanel>
);

/**
 * 작품 시각 자료 패널
 */
export const ArtworkVisualPanel = ({ imageSrc, imageAlt }) => (
  <HudPanel title="이미지 #1" className="h-full flex flex-col">
    <div className="flex-grow">
      <HudImageFrame
        src={imageSrc}
        alt={imageAlt}
        refCode="VIS.REF.01"
        className="h-full"
      />
    </div>
  </HudPanel>
);

/**
 * 프로젝트 개요 패널
 */
export const ProjectOverviewPanel = ({ overview }) => (
  <HudPanel title="프로젝트 요약" className="h-full">
    <div className="text-white font-mono text-sm h-full">
      <p>{overview}</p>
    </div>
  </HudPanel>
);

/**
 * 컨셉 프레임워크(문제의식/의도) 패널
 */
export const ConceptFrameworkPanel = ({ data }) => (
  <HudPanel title="문제의식/의도" className="h-full">
    <div className="prose text-white max-w-none font-mono text-sm h-full">
      <p>{data.part1}</p>
      <p>{data.part2}</p>
    </div>
  </HudPanel>
);

/**
 * 작업 배경 분석 패널
 */
export const BackgroundAnalysisPanel = ({ data }) => (
  <HudPanel title="작업 배경" className="h-full">
    <div className="text-white font-mono text-sm h-full">
      <p className="leading-relaxed">{data.part1}</p>
      <p className="leading-relaxed mt-4">{data.part2}</p>
    </div>
  </HudPanel>
);
