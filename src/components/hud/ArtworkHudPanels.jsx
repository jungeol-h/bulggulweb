import React from "react";
import {
  HudPanel,
  HudLabelValue,
  HudStatusIndicator,
  HudDivider,
  HudProgressBar,
  HudImageFrame,
  GridBackground,
} from "./HudComponents";

/**
 * 작품 기본 정보 패널
 */
export const ArtworkSpecsPanel = ({ artworkData }) => (
  <HudPanel title="개요" className="space-y-2">
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
      <HudStatusIndicator
        text="DATA STREAM: ACTIVE"
        className="mt-2"
        dotColor="bg-white"
      />
    </div>
  </HudPanel>
);

/**
 * 작품 시각 자료 패널
 */
export const ArtworkVisualPanel = ({ imageSrc, imageAlt }) => (
  <HudPanel title="VISUAL FEED" className="h-full flex flex-col">
    <HudImageFrame src={imageSrc} alt={imageAlt} refCode="VIS.REF.01" />
  </HudPanel>
);

/**
 * 프로젝트 개요 패널
 */
export const ProjectOverviewPanel = ({ overview }) => (
  <HudPanel title="PROJECT SUMMARY">
    <div className="text-white font-mono text-sm">
      <p>{overview}</p>
    </div>
    <div className="flex justify-between mt-4 text-xs text-gray-400 border-t border-gray-800 pt-2 font-mono">
      <span>DOC.ID: SUM-2025</span>
      <span>INTEGRITY: 99.8%</span>
    </div>
  </HudPanel>
);

/**
 * 컨셉 프레임워크(문제의식/의도) 패널
 */
export const ConceptFrameworkPanel = ({ data }) => (
  <HudPanel title="CONCEPTUAL FRAMEWORK">
    <div className="prose text-white max-w-none font-mono text-sm">
      <p>{data.part1}</p>
      <div className="my-6 border border-gray-800 bg-black p-4 text-white relative">
        <div className="absolute -top-3 left-4 bg-black px-2 text-xs tracking-widest font-mono">
          QUOTED TEXT
        </div>
        <p className="italic">"{data.quote}"</p>
      </div>
      <p>{data.part2}</p>
    </div>
  </HudPanel>
);

/**
 * 기술적 설명 패널
 */
export const TechnicalDescriptionPanel = ({ data, progressValue = 76 }) => (
  <HudPanel title="TECHNICAL ANALYSIS">
    <div className="text-white font-mono text-sm">
      <p className="leading-relaxed">{data.part1}</p>
      <p className="leading-relaxed mt-4">{data.part2}</p>
      <HudProgressBar
        value={progressValue}
        className="mt-4"
        barColor="bg-white"
      />
    </div>
  </HudPanel>
);

/**
 * 작업 배경 분석 패널
 */
export const BackgroundAnalysisPanel = ({ data }) => (
  <HudPanel title="BACKGROUND ANALYSIS">
    <div className="text-white font-mono text-sm">
      <p className="leading-relaxed">{data.part1}</p>
      <p className="leading-relaxed mt-4">{data.part2}</p>
    </div>
  </HudPanel>
);

/**
 * 영감의 원천 패널
 */
export const InspirationSourcesPanel = ({ inspirations = [] }) => (
  <HudPanel title="SOURCE REFERENCES">
    <ul className="space-y-2 text-white font-mono text-sm">
      {inspirations.map((inspiration, idx) => (
        <li key={idx} className="flex">
          <span className="text-white mr-2 opacity-70">{">>"}</span>
          {inspiration}
        </li>
      ))}
    </ul>
    <div className="mt-4 grid grid-cols-5 gap-1">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-1 bg-white/30"></div>
      ))}
    </div>
  </HudPanel>
);

/**
 * 시스템 구성요소 패널
 */
export const SystemComponentsPanel = ({ structure, components = [] }) => (
  <HudPanel title="SYSTEM ARCHITECTURE">
    <p className="text-white leading-relaxed mb-6 font-mono text-sm">
      {structure}
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {components.map((component, idx) => (
        <div
          key={idx}
          className="border border-gray-800 bg-black p-4 relative pixel-border"
        >
          <div className="absolute -top-3 left-4 bg-black px-2 text-xs uppercase tracking-widest text-white font-mono">
            MODULE {idx + 1}
          </div>
          <h3 className="text-lg font-medium mb-3 text-white font-mono">
            {component.title}
          </h3>
          <p className="text-white/80 font-mono text-sm">
            {component.description}
          </p>
          <div className="absolute top-2 right-2 w-2 h-2 bg-white blink"></div>
        </div>
      ))}
    </div>
  </HudPanel>
);

/**
 * 시각 자료 아카이브 패널
 */
export const VisualArchivePanel = ({ images = [] }) => (
  <HudPanel title="VISUAL DATA ARCHIVE">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image, idx) => (
        <div
          key={idx}
          className="border border-gray-800 bg-black overflow-hidden relative"
        >
          <div className="absolute inset-0 border border-gray-800 z-10 pointer-events-none"></div>
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover monochrome-filter"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-2">
            <div className="text-xs text-white font-mono">
              FILE:{String(idx + 1).padStart(3, "0")} |{" "}
              {image.alt.substring(0, 20)}...
            </div>
          </div>
        </div>
      ))}
    </div>

    <HudStatusIndicator
      text="이미지는 작품 제작 과정에서의 스케치, 도식, 설치 계획 등을 보여줍니다."
      className="mt-4"
      dotColor="bg-white"
    />
  </HudPanel>
);

/**
 * 데이터 시각화 패널
 */
export const DataVisualizationPanel = ({ title, children }) => (
  <HudPanel title={title || "DATA VISUALIZATION"}>
    <div className="aspect-video p-4 border border-gray-800 relative bg-black">
      <GridBackground />
      <div className="relative z-10">{children}</div>
    </div>
  </HudPanel>
);
