import React from "react";
import StyledHeading from "./StyledHeading";

const MemberProfile = ({ member }) => {
  const { name, image, comment, notionUrl } = member;

  // Full page version (used when displayed individually)
  if (!member.isCompact) {
    return (
      <section className="min-h-screen font-noto py-16 w-full">
        <div className="container mx-auto min-h-screen pb-52 px-4">
          <div className="fade-in">
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
  }

  // Compact version (used when displayed in TeamSection)
  return (
    <div className="member-profile w-full">
      <div className="flex flex-col items-center">
        <div className="w-full h-auto overflow-hidden mb-4">
          <img
            src={image}
            alt={`${name} 프로필 사진`}
            className="w-full h-auto object-contain"
          />
        </div>
        <h3 className="text-xl font-medium mb-2 text-gray-800">{name}</h3>
        <p className="text-sm italic text-gray-600 mb-4 text-center">
          {comment}
        </p>

        {/* <a
          href={notionUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:text-indigo-800 transition-colors text-sm inline-flex items-center"
        >
          <span>개인 블로그</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a> */}
      </div>
    </div>
  );
};

export default MemberProfile;
