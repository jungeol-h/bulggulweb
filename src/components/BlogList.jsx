import React from "react";

const BlogList = ({ posts }) => {
  return (
    <div className="blog-list">
      <h4 className="text-xl font-medium mb-4 text-gray-800 text-left">
        팀의 이야기들
      </h4>
      <div className="space-y-2">
        {posts.map((post, index) => (
          <div
            key={index}
            className="blog-item border border-gray-300 p-4 hover:border-gray-500 transition-colors"
          >
            <div className="flex justify-between items-start mb-2 border-b border-gray-200 pb-2">
              <h5 className="text-lg font-medium text-gray-800">
                {post.title}
              </h5>
              <span className="text-sm text-gray-500">{post.date}</span>
            </div>
            <p className="text-gray-600 text-sm mb-3">{post.excerpt}</p>
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
        ))}
      </div>
    </div>
  );
};

export default BlogList;
