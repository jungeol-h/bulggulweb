import React from "react";
import StyledHeading from "./StyledHeading";

const MemberProfile = ({ member }) => {
  const { name, image, comment, notionUrl } = member;

  return (
    <section className="bg-team-bg font-noto py-10">
      <div className="section-container">
        <div className="section-content fade-in">
          <div className="text-left">
            <StyledHeading
              text={name}
              color="#123"
              className="text-gray-800 mb-8"
              fontSize="text-2xl"
            />
          </div>

          <div className="bg-white">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/3">
                <div className="bg-white">
                  <img
                    src={image}
                    alt={`${name} 프로필 사진`}
                    className="w-full h-auto"
                  />
                </div>
              </div>

              <div className="w-full md:w-2/3">
                <p className="text-lg italic text-gray-600 mb-6">{comment}</p>

                <div>
                  <h4 className="text-xl font-medium mb-3 text-gray-800 text-left">
                    개인적인 이야기들
                  </h4>
                  <a
                    href={notionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 transition-colors inline-block"
                  >
                    Notion 페이지 방문하기 →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemberProfile;
