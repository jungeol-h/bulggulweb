import React from "react";
import StyledHeading from "./StyledHeading";

const TeamSection = () => {
  return (
    <section className="min-h-screen bg-team-bg font-noto py-16">
      <div className="section-container">
        <div className="section-content fade-in">
          <div className="text-left">
            <StyledHeading
              text="TEAM 벌꿀오소리"
              color="#123"
              className="text-gray-800"
              fontSize="text-3xl"
            />
          </div>

          {/* 2-column layout for desktop, 1-column for mobile */}
          <div className="flex flex-col md:flex-row gap-6 mb-12">
            {/* Team Image Column */}
            <div className="w-full md:w-1/2">
              <img
                src="/images/team photo.png"
                alt="벌꿀오소리 팀 단체 사진"
                className="w-full h-auto rounded"
              />
            </div>

            {/* Team Introduction Column */}
            <div className="w-full md:w-1/2 ">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 text-left">
                팀 소개
              </h3>
              <p className="leading-relaxed text-gray-700 mb-6 text-left">
                왜 벌꿀오소리냐구요? <br></br>벌꿀오소리는 강하니까.
              </p>
            </div>
          </div>

          {/* Blog Section (Single Column) */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-medium mb-3 text-gray-800 text-left">
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
    </section>
  );
};

export default TeamSection;
