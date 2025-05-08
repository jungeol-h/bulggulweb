import React from "react";
import StyledHeading from "./StyledHeading";
import BlogList from "./BlogList";

const TeamSection = () => {
  // Sample blog posts data
  const blogPosts = [
    {
      title: "작품 개발 과정",
      date: "2024.03.15",
      excerpt:
        "우리 팀이 작품을 개발하는 과정에서 겪은 창의적인 고민과 해결 방법들을 공유합니다.",
      url: "https://example.com/blog1",
    },
    {
      title: "팀 워크숍 후기",
      date: "2024.02.28",
      excerpt:
        "팀원들과 함께한 워크숍에서 배운 것들과 앞으로의 방향성에 대한 이야기입니다.",
      url: "https://example.com/blog2",
    },
    {
      title: "작품 컨셉 발전 과정",
      date: "2024.01.20",
      excerpt:
        "초기 아이디어에서 최종 컨셉까지, 우리 작품의 컨셉이 발전해 온 과정을 소개합니다.",
      url: "https://example.com/blog3",
    },
  ];

  return (
    <section className="min-h-screen font-noto py-16 border-t border-gray-300">
      <div className="section-container">
        <div className="section-content fade-in">
          <div className="text-left mb-4">
            <StyledHeading
              text="TEAM 벌꿀오소리"
              color="#000"
              className="text-gray-900"
              fontSize="text-3xl"
            />
          </div>

          {/* 2-column layout for desktop, 1-column for mobile */}
          <div className="flex flex-col md:flex-row gap-6  pb-8">
            {/* Team Image Column */}
            <div className="w-full md:w-1/2 ">
              <img
                src="/images/team photo.png"
                alt="벌꿀오소리 팀 단체 사진"
                className="w-full h-auto"
              />
            </div>
            <div className="w-full md:w-1/2  md:pl-6">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 text-left  pb-2">
                팀 소개
              </h3>
              <p className="leading-relaxed text-gray-700 mb-6 text-left">
                왜 벌꿀오소리냐구요? <br></br>벌꿀오소리는 강하니까.
              </p>
              <div className="mb-4 inline-block p-2">
                <img
                  src="/images/honeybadger.png"
                  alt="벌꿀오소리 마스코트"
                  className="w-48 h-auto"
                />
              </div>
            </div>
          </div>

          {/* Blog Section (Using BlogList Component) */}

          <BlogList posts={blogPosts} />
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
