import React from "react";
import StyledHeading from "./StyledHeading";

const MemberProfile = ({ member }) => {
  const { name, image, comment, notionUrl } = member;

  return (
    <section className="bg-team-bg font-noto py-10 px-4">
      <div className="max-w-4xl mx-auto fade-in">
        <StyledHeading
          text={name}
          color="#4f46e5"
          className="text-gray-800 mb-8"
        />

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-1/3">
              <div className="bg-white p-3 rounded-lg shadow-md transform -rotate-2">
                <img
                  src={image}
                  alt={`${name} 프로필 사진`}
                  className="w-full h-auto rounded"
                />
              </div>
            </div>

            <div className="w-full md:w-2/3">
              <p className="text-lg italic text-gray-600 mb-6">{comment}</p>

              <div>
                <h4 className="text-xl font-medium mb-3 text-gray-800">
                  개인 블로그
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
    </section>
  );
};

export default MemberProfile;
