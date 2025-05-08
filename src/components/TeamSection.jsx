import React from "react";
import StyledHeading from "./StyledHeading";
import BlogList from "./BlogList";
import MemberProfile from "./MemberProfile";
import { members } from "../data/members";

const TeamSection = () => {
  // Sample blog posts data
  const blogPosts = [
    {
      title: "첫번째 글",
      date: "2024.03.15",
      excerpt: "곧 글이 올라올 예정입니다.",
      url: "https://example.com/blog1",
    },
    {
      title: "두번째 글",
      date: "2024.02.28",
      excerpt: "곧 글이 올라올 예정입니다.",
      url: "https://example.com/blog2",
    },
    {
      title: "세번째 글",
      date: "2024.01.20",
      excerpt: "곧 글이 올라올 예정입니다.",
      url: "https://example.com/blog3",
    },
  ];

  return (
    <section className="min-h-screen font-noto py-12 border-t border-gray-300 w-full">
      <div className="container mx-auto min-h-screen pb-52 px-4">
        <div className="fade-in">
          <div className="flex flex-col gap-0.5 outline outline-2">
            {/* Title row */}
            <div className="w-full py-3 flex items-center">
              <div className="mr-4 text-xs text-gray-400"></div>
              <h1 className="text-3xl font-bold tracking-wider text-left">
                TEAM 벌꿀오소리
              </h1>
            </div>

            {/* Team Image + Description row */}
            <div className="flex flex-col lg:flex-row gap-0.5">
              {/* Team Image Column */}
              <div className="w-full lg:w-1/2 outline outline-1">
                <div className="flex items-center justify-center h-full mb-4">
                  <img
                    src="/images/team photo.webp"
                    alt="벌꿀오소리 팀 단체 사진"
                    className="w-full h-auto"
                  />
                </div>
                <div className="p-2">
                  <p className="leading-relaxed text-gray-700 mb-4 text-left">
                    왜 벌꿀오소리냐구요? <br></br>벌꿀오소리는 강하니까.
                  </p>
                  <div className="mb-4 text-left">
                    <img
                      src="/images/honeybadger.png"
                      alt="벌꿀오소리 마스코트"
                      className="w-24 h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Member Profiles Section */}
            <div className="w-full outline outline-1 ">
              <div className="grid grid-cols-3 gap-0.5">
                {members.map((member, index) => (
                  <div key={index} className="outline outline-1">
                    <MemberProfile member={{ ...member, isCompact: true }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Blog Section */}
            <div className="w-full p-4 outline outline-1">
              <BlogList posts={blogPosts} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
