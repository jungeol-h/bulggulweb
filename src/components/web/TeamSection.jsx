import React, { useRef, useEffect, useState } from "react";
import { members } from "../../data/members";

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
      className="min-h-screen py-12 w-full text-white relative"
      style={{ fontFamily: "NeoDunggeunmoPro" }}
    >
      <div className="container mx-auto min-h-screen pb-52 px-4 max-w-6xl">
        <div>
          <div
            ref={containerRef}
            className={`flex flex-col gap-12 ${
              isVisible ? "animate-container" : "opacity-0"
            }`}
          >
            {/* Title row */}
            <div className="w-full py-3 flex items-center justify-center">
              <h1 className="text-3xl font-bold tracking-wider text-center text-white/90">
                TEAM 벌꿀오소리
              </h1>
            </div>

            {/* Team Image */}
            <div className="w-full">
              <div className="h-full flex items-center justify-center">
                <img
                  src="/images/team photo.webp"
                  alt="벌꿀오소리 팀 단체 사진"
                  className="w-full object-contain max-h-[500px]"
                />
              </div>
            </div>

            {/* Team Description */}
            <div className="w-full p-6 bg-black/20 backdrop-blur-sm rounded">
              <p className="text-lg text-white/80 mb-6">우리는 벌꿀오소리다.</p>
              <a
                href="https://honeyosori.notion.site/?pvs=4"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded transition-all duration-300"
              >
                팀의 이야기 보러가기
              </a>
            </div>

            {/* Member Profiles Section */}
            <div className="w-full">
              <h2 className="text-2xl font-bold mb-8 text-white/90">팀 멤버</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {members.map((member, index) => (
                  <div key={index} className="p-4 bg-black/30 backdrop-blur-sm">
                    <div className="flex flex-col items-center">
                      <img
                        src={member.image}
                        alt={`${member.name} 프로필`}
                        className="w-40 h-40 object-cover mb-5"
                      />
                      <h3 className="text-xl font-bold text-white/90">
                        {member.name}
                      </h3>
                      <p className="text-white/70 mb-5">{member.comment}</p>
                      <a
                        href={member.notionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded transition-all duration-300"
                      >
                        개인 링크
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
