import React, { useRef, useEffect, useState } from "react";
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

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <section
      className="min-h-screen py-12 w-full text-white"
      style={{ fontFamily: "RixXladywatermelonR" }}
    >
      <div className="container mx-auto min-h-screen pb-52 px-4 max-w-6xl">
        <div>
          <div
            ref={containerRef}
            className={`flex flex-col gap-4 ${
              isVisible ? "animate-container" : "opacity-0"
            }`}
          >
            {/* Title row */}
            <div className="w-full py-3 flex items-center">
              <h1 className="text-3xl font-bold tracking-wider text-left text-white">
                TEAM 벌꿀오소리
              </h1>
            </div>

            {/* Team Image */}
            <div className="w-full">
              <div className="h-full flex items-center justify-center">
                <img
                  src="/images/team photo.webp"
                  alt="벌꿀오소리 팀 단체 사진"
                  className="w-full max-h-[500px] object-cover border border-gray-700"
                />
              </div>
            </div>

            {/* Team Description */}
            <div className="w-full p-4 border border-gray-700 bg-black">
              <div className="flex flex-row items-center gap-4">
                <img
                  src="/images/honeybadger.png"
                  alt="벌꿀오소리 마스코트"
                  className="w-16 h-auto"
                />
                <p className="text-lg text-gray-300">
                  왜 벌꿀오소리냐구요? <br />
                  벌꿀오소리는 강하니까.
                </p>
              </div>
              <div className="mt-4">
                <a
                  href="https://notion.so/team-bulggul"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-400 transition"
                >
                  팀 노션 페이지 방문하기
                </a>
              </div>
            </div>

            {/* Member Profiles Section */}
            <div className="w-full">
              <h2 className="text-2xl font-bold mb-4 text-white">팀 멤버</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {members.map((member, index) => (
                  <div
                    key={index}
                    className="border border-gray-700 p-4 bg-black"
                  >
                    <div className="flex flex-col items-center">
                      <img
                        src={member.image}
                        alt={`${member.name} 프로필`}
                        className="w-40 h-40 object-cover mb-3 border border-gray-600"
                      />
                      <h3 className="text-xl font-bold text-white">
                        {member.name}
                      </h3>
                      <p className="text-gray-400 mb-3">{member.comment}</p>
                      <a
                        href={member.notionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700 transition text-sm"
                      >
                        포트폴리오 보기
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 애니메이션을 위한 스타일 추가 */}
      <style jsx global>{`
        .animate-container {
          animation: fadeIn 0.8s ease-out forwards;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default TeamSection;
