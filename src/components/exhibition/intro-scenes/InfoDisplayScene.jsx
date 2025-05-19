import React from "react";

/**
 * 장면 3: 기본 정보 및 DNA 시퀀스
 */
const InfoDisplayScene = ({
  survivalTime,
  dnaSequenceVisible,
  dnaSequence,
  targetId,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-4xl w-full p-8 text-left font-mono">
        <p className="text-green-400 text-xl mb-4">고유 식별코드: {targetId}</p>
        <p className="text-green-400 text-xl mb-4">물체 정보: 유기체.</p>
        <p className="text-green-400 text-xl mb-4">
          생존 기간:{" "}
          <span>
            {survivalTime.hours}h {survivalTime.minutes}min
          </span>
        </p>

        {dnaSequenceVisible && (
          <>
            <p className="text-green-400 text-xl mb-2">DNA 염기 서열:</p>
            <div className="bg-black bg-opacity-70 p-4 font-mono text-green-500 text-sm overflow-hidden overflow-ellipsis break-all max-h-40">
              {dnaSequence}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InfoDisplayScene;
