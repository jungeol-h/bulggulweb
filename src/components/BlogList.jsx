import React from "react";

const BlogList = ({ posts }) => {
  return (
    <div className="blog-list">
      <h4 className="text-xl font-medium mb-6 text-gray-800 text-left">
        이야기들
      </h4>
      <div className="space-y-4">
        {posts.map((post, index) => (
          <div
            key={index}
            className="blog-item hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-200"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* 썸네일 이미지 */}
              <div className="md:w-1/5 w-full">
                <img
                  src={post.thumbnail || "/images/default-blog-thumbnail.png"}
                  alt={post.title}
                  className="w-full h-48 md:h-40 object-cover rounded-md"
                />
              </div>

              {/* 콘텐츠 섹션 */}
              <div className="md:w-4/5 w-full text-left">
                <div className="flex justify-between items-start mb-2 border-b border-gray-200 pb-2">
                  <h5 className="text-lg font-medium text-gray-800">
                    {post.title}
                  </h5>
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>
                <p className="text-gray-600 text-sm mb-3 text-left">
                  {post.excerpt}
                </p>
                <div className="text-left">
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-black text-sm font-medium transition-colors inline-flex items-center border-b border-gray-400 hover:border-black pb-1"
                  >
                    더 읽기
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
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
