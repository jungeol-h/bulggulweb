import React from "react";
import { CenteredContainer } from "../../ui/container";
import { InfoPanel, WindowPanel } from "../../ui/panel";
import { LabelValue } from "../../ui/text";

/**
 * 장면 3: 기본 정보 및 DNA 시퀀스
 */
const InfoDisplayScene = ({
  survivalTime,
  dnaSequenceVisible,
  dnaSequence,
  targetId,
}) => {
  // InfoPanel에 표시할 데이터 정의
  const infoData = {
    id: targetId,
    type: "유기체",
    survivalTime: `${survivalTime.hours}h ${survivalTime.minutes}min`,
    dna: dnaSequence
  };

  // 필드 정의
  const fields = {
    id: "고유 식별코드",
    type: "물체 정보",
    survivalTime: "생존 기간",
    ...(dnaSequenceVisible && { dna: "DNA 염기 서열" })
  };

  return (
    <CenteredContainer>
      <WindowPanel title="객체 분석 결과" className="max-w-4xl w-full">
        <InfoPanel 
          data={infoData} 
          fields={fields} 
          useTypewriter={true}
          className="p-8"
        />
      </WindowPanel>
    </CenteredContainer>
  );
};

export default InfoDisplayScene;
