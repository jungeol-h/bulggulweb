import React, { useRef, useEffect, useState } from "react";
import StyledHeading from "./StyledHeading";
import BlogList from "./BlogList";
import MemberProfile from "./MemberProfile";
import { members } from "../data/members";

const TeamSection = () => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // 10% 이상 보이면 활성화
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.disconnect();
      }
    };
  }, []);

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
    <section className="min-h-screen font-noto py-12 w-full">
      <div className="container mx-auto min-h-screen pb-52 px-4 max-w-6xl">
        <div>
          <div
            ref={containerRef}
            className={`flex flex-col gap-0.5 outline outline-2 ${
              isVisible ? "animate-container" : "opacity-0"
            }`}
          >
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
              <div className="w-full lg:w-1/2 outline outline-1 h-full">
                <div className="h-full flex items-center justify-center">
                  <img
                    src="/images/team photo.webp"
                    alt="벌꿀오소리 팀 단체 사진"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Team Description Column - Added for PC display */}
              <div className="w-full lg:w-1/2 outline outline-1 p-4">
                <div className="h-full flex flex-col justify-center">
                  <p className="leading-relaxed text-gray-700 mb-4 text-left text-lg">
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

      {/* 애니메이션을 위한 스타일 추가 */}
      <style jsx global>{`
        .animate-container {
          animation: slideInFromTop 0.8s ease-out forwards;
        }

        @keyframes slideInFromTop {
          0% {
            transform: translateY(-50px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default TeamSection;
