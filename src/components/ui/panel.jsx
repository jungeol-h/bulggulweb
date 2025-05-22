import React from "react";
import { TypewriterText } from "./text";
import { colors } from "../../theme/theme";

/**
 * Panel - 기본 패널 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {ReactNode} props.children - 자식 노드
 * @param {string} props.title - 패널 제목
 * @param {string} props.titleColor - 제목 색상 클래스
 * @param {string} props.className - 추가 CSS 클래스
 */
export const Panel = ({
  children,
  title = "",
  titleColor = "text-ui-text-primary",
  className = "",
}) => (
  <section
    className={`bg-ui-background-primary relative h-full flex flex-col outline outline-1 outline-ui-text-primary/70 ${className}`}
  >
    {title && (
      <div
        className={`py-3 text-ldg uppercase tracking-widest ${titleColor} font-mono text-left w-full`}
      >
        {title}
      </div>
    )}
    <div className="pixel-text flex-grow text-left">{children}</div>
  </section>
);

/**
 * WindowPanel - 창 스타일의 패널 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {ReactNode} props.children - 자식 노드
 * @param {string} props.title - 창 제목
 * @param {boolean} props.showControls - 창 컨트롤 표시 여부
 * @param {string} props.className - 추가 CSS 클래스
 */
export const WindowPanel = ({
  children,
  title = "",
  showControls = true,
  className = "",
}) => (
  <div
    className={`flex flex-col outline outline-2 outline-ui-text-primary/70 ${className}`}
  >
    {/* 타이틀 바 */}
    <div className="w-full py-2 flex items-center justify-between bg-ui-background-tertiary/80">
      <div className="flex items-center ml-2">
        <h1 className="text-ui-text-primary/90 text-2xl font-bold tracking-wider text-left pl-2">
          <span className="lcd-text">{title}</span>
        </h1>
      </div>
      {showControls && (
        <div className="flex items-center mr-2">
          <div className="w-6 h-5 border border-ui-text-primary/50 mx-1 flex items-center justify-center text-xs text-ui-text-primary/80">
            _
          </div>
          <div className="w-6 h-5 border border-ui-text-primary/50 mx-1 flex items-center justify-center text-xs text-ui-text-primary/80">
            □
          </div>
          <div className="w-6 h-5 border border-white/50 mx-1 flex items-center justify-center text-xs text-white/80">
            ×
          </div>
        </div>
      )}
    </div>

    {/* 컨텐츠 영역 */}
    <div className="flex-grow bg-black/80">{children}</div>
  </div>
);

/**
 * InfoPanel - 정보 패널 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {Object} props.data - 표시할 데이터 객체
 * @param {Object} props.fields - 필드 정의 객체 (키: 레이블)
 * @param {boolean} props.useTypewriter - 타이핑 효과 사용 여부
 * @param {string} props.className - 추가 CSS 클래스
 */
export const InfoPanel = ({
  data = {},
  fields = {},
  useTypewriter = false,
  className = "",
}) => (
  <Panel className={`h-full space-y-2 ${className}`}>
    <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-4">
      {Object.entries(fields).map(([key, label]) => (
        <div key={key} className={key === "all" ? "col-span-2" : ""}>
          <div className="mb-2">
            <span className="text-xs uppercase tracking-widest text-gray-400 font-mono block">
              {useTypewriter ? (
                <TypewriterText text={label} delay={30} />
              ) : (
                label
              )}
            </span>
            <span className="text-s text-green-400 font-mono">
              {useTypewriter ? (
                <TypewriterText text={data[key] || "-"} delay={40} />
              ) : (
                data[key] || "-"
              )}
            </span>
          </div>
        </div>
      ))}
    </div>
  </Panel>
);

/**
 * DebugPanel - 디버그 정보 패널 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {Object} props.data - 디버그 데이터 객체
 * @param {string} props.className - 추가 CSS 클래스
 */
export const DebugPanel = ({ data = {}, className = "" }) => (
  <div
    className={`absolute bottom-4 right-4 z-50 bg-black/80 p-3 border border-green-800 text-xs text-green-400 font-mono ${className}`}
  >
    {Object.entries(data).map(([key, value]) => (
      <div key={key}>
        {key}: {value?.toString() || "-"}
      </div>
    ))}
  </div>
);
