import React, { useEffect, useRef } from "react";
import { artworkContent } from "../data/artworkContent";

const ArtworkSection = () => {
  const sectionRef = useRef(null);

  // Animation effect on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0d0d0d] w-full text-[#f4f4f4] font-['IBM_Plex_Sans']"
      id="artwork"
    >
      <div className="min-h-screen py-20 px-6 md:px-12 max-w-5xl mx-auto">
        {/* Title and tagline with animation */}
        <div className="animate-on-scroll opacity-0 transition-all duration-1000 transform translate-y-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#c084fc]">
            「나≠나」
          </h1>
        </div>

        {/* Main artwork image */}
        <div className="mb-20 animate-on-scroll opacity-0 transition-all duration-1000 delay-300 transform translate-y-10">
          <div className="relative aspect-video max-h-[80vh] overflow-hidden rounded-lg">
            <img
              src="/images/artwork-main.jpg"
              alt="나≠나 작품 대표 이미지"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="text-lg md:text-xl">
                {artworkContent.shortDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Content sections with animations */}
        <div className="space-y-16">
          {/* 작품 개요 */}
          <div className="animate-on-scroll opacity-0 transition-all duration-1000 transform translate-y-10">
            <h2 className="text-3xl font-semibold mb-6 text-[#c084fc] flex items-center">
              <span className="w-8 h-8 inline-flex items-center justify-center rounded-full bg-[#c084fc] text-[#0d0d0d] mr-3">
                1
              </span>
              작품 개요
            </h2>
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="leading-relaxed">{artworkContent.overview}</p>
            </div>
          </div>

          {/* 문제의식 및 의도 */}
          <div className="animate-on-scroll opacity-0 transition-all duration-1000 transform translate-y-10">
            <h2 className="text-3xl font-semibold mb-6 text-[#c084fc] flex items-center">
              <span className="w-8 h-8 inline-flex items-center justify-center rounded-full bg-[#c084fc] text-[#0d0d0d] mr-3">
                2
              </span>
              문제의식 및 의도
            </h2>
            <div className="prose prose-invert prose-lg max-w-none">
              <p>{artworkContent.intention.part1}</p>
              <blockquote className="border-l-4 border-[#c084fc] pl-4 my-6 italic">
                "{artworkContent.intention.quote}"
              </blockquote>
              <p>{artworkContent.intention.part2}</p>
            </div>
          </div>

          {/* 작품 설명 */}
          <div className="animate-on-scroll opacity-0 transition-all duration-1000 transform translate-y-10">
            <h2 className="text-3xl font-semibold mb-6 text-[#c084fc] flex items-center">
              <span className="w-8 h-8 inline-flex items-center justify-center rounded-full bg-[#c084fc] text-[#0d0d0d] mr-3">
                3
              </span>
              작품 설명
            </h2>
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="leading-relaxed">
                {artworkContent.description.part1}
              </p>
              <p className="leading-relaxed mt-4">
                {artworkContent.description.part2}
              </p>
            </div>
          </div>

          {/* 작업 배경 */}
          <div className="animate-on-scroll opacity-0 transition-all duration-1000 transform translate-y-10">
            <h2 className="text-3xl font-semibold mb-6 text-[#c084fc] flex items-center">
              <span className="w-8 h-8 inline-flex items-center justify-center rounded-full bg-[#c084fc] text-[#0d0d0d] mr-3">
                4
              </span>
              작업 배경
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="leading-relaxed">
                  {artworkContent.background.part1}
                </p>
                <p className="leading-relaxed mt-4">
                  {artworkContent.background.part2}
                </p>
              </div>
              <div className="bg-[#191919] p-6 rounded-lg">
                <h3 className="text-xl font-medium mb-3 text-[#c084fc]">
                  영감의 원천
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  {artworkContent.background.inspirations.map(
                    (inspiration, idx) => (
                      <li key={idx}>{inspiration}</li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* 작업 구성 */}
          <div className="animate-on-scroll opacity-0 transition-all duration-1000 transform translate-y-10">
            <h2 className="text-3xl font-semibold mb-6 text-[#c084fc] flex items-center">
              <span className="w-8 h-8 inline-flex items-center justify-center rounded-full bg-[#c084fc] text-[#0d0d0d] mr-3">
                5
              </span>
              작업 구성
            </h2>
            <div className="space-y-6">
              <p className="leading-relaxed">{artworkContent.structure}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {artworkContent.components.map((component, idx) => (
                  <div key={idx} className="bg-[#191919] p-5 rounded-lg">
                    <h3 className="text-xl font-medium mb-3 text-[#c084fc]">
                      {component.title}
                    </h3>
                    <p>{component.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 기타 시각자료 */}
          <div className="animate-on-scroll opacity-0 transition-all duration-1000 transform translate-y-10">
            <h2 className="text-3xl font-semibold mb-6 text-[#c084fc] flex items-center">
              <span className="w-8 h-8 inline-flex items-center justify-center rounded-full bg-[#c084fc] text-[#0d0d0d] mr-3">
                6
              </span>
              작업 과정 및 시각자료
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {artworkContent.processImages.map((image, idx) => (
                <div
                  key={idx}
                  className="overflow-hidden rounded-lg aspect-square"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>

            <p className="text-sm italic mt-4 text-gray-400">
              * 위 이미지들은 작품 제작 과정에서의 스케치, 도식, 설치 계획 등을
              보여줍니다.
            </p>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        .animated {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  );
};

export default ArtworkSection;
