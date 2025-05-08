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
    <section className="min-h-screen font-noto py-16 border-t border-gray-300 w-full">
      <div className="container mx-auto min-h-screen pb-52 px-4">
        <div className="fade-in">
          <div className="text-left mb-4">
            <StyledHeading
              text="TEAM 벌꿀오소리"
              color="#000"
              className="text-gray-900"
              fontSize="text-3xl"
            />
          </div>

          {/* 2-column layout for desktop, 1-column for mobile */}
          <div className="flex flex-col md:flex-row gap-6 pb-8">
            {/* Team Image Column */}
            <div className="w-full md:w-1/2">
              <img
                src="/images/team photo.png"
                alt="벌꿀오소리 팀 단체 사진"
                className="w-full h-auto"
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-6">
              <p className="leading-relaxed text-gray-700 mb-6 text-left">
                왜 벌꿀오소리냐구요? <br></br>벌꿀오소리는 강하니까.
              </p>
              <div className="mb-4 text-left">
                <img
                  src="/images/honeybadger.png"
                  alt="벌꿀오소리 마스코트"
                  className="w-48 h-auto"
                />
              </div>
            </div>
          </div>

          {/* Member Profiles Section */}
          <div className="mt-12 mb-16">
            <h3 className="text-2xl font-semibold mb-8 text-gray-800 text-left">
              팀 멤버
            </h3>
            <div className="grid grid-cols-3 gap-0">
              {members.map((member, index) => (
                <div key={index} className="bg-white w-full">
                  <MemberProfile member={{ ...member, isCompact: true }} />
                </div>
              ))}
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
