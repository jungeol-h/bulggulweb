import React from "react";
import StyledHeading from "./StyledHeading";

const TeamSection = () => {
  return (
    <section className="min-h-screen bg-team-bg font-noto py-16 px-4">
      <div className="max-w-4xl mx-auto fade-in">
        <StyledHeading
          text="벌꿀오소리"
          color="#4f46e5"
          className="text-gray-800"
        />

        <div className="mb-12">
          <div className="bg-white p-4 rounded-lg shadow-lg mb-6 transform rotate-1 max-w-lg mx-auto">
            <img
              src="/placeholder-team.jpg"
              alt="벌꿀오소리 팀 단체 사진"
              className="w-full h-auto rounded mb-3"
            />
            <p className="text-center italic text-gray-600">
              우리는 벌꿀처럼 달콤하고 오소리처럼 강인한 팀입니다
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              팀 소개
            </h3>
            <p className="leading-relaxed text-gray-700 mb-6">
              '벌꿀오소리'는 숭실대학교 글로벌미디어학부 소속 팀으로, 디지털
              미디어와 예술의 경계를 탐색하는 작업을 지향합니다. 우리 팀은
              기술적 전문성과 예술적 감성의 균형을 추구하며, 각자의 개성을
              살리면서도 하나의 통일된 작품을 만들어내는 과정을 중요시합니다.
            </p>

            <div>
              <h4 className="text-xl font-medium mb-3 text-gray-800">
                팀 블로그
              </h4>
              <ul className="space-y-2 ml-4">
                <li>
                  <a
                    href="https://example.com/blog1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    작품 개발 과정 - 2024.03.15
                  </a>
                </li>
                <li>
                  <a
                    href="https://example.com/blog2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    팀 워크숍 후기 - 2024.02.28
                  </a>
                </li>
                <li>
                  <a
                    href="https://example.com/blog3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    작품 컨셉 발전 과정 - 2024.01.20
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
