import React from "react";
import { colors } from "../../theme/theme";

/**
 * Button - 기본 버튼 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {ReactNode} props.children - 버튼 내용
 * @param {function} props.onClick - 클릭 핸들러
 * @param {string} props.variant - 버튼 변형 ('primary', 'secondary', 'danger')
 * @param {string} props.size - 버튼 크기 ('sm', 'md', 'lg')
 * @param {boolean} props.disabled - 비활성화 여부
 * @param {string} props.className - 추가 CSS 클래스
 */
export const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  ...props
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return `bg-btn-primary-base hover:bg-btn-primary-hover text-ui-text-primary`;
      case "secondary":
        return `bg-btn-secondary-base hover:bg-btn-secondary-hover text-ui-text-primary`;
      case "danger":
        return `bg-btn-danger-base hover:bg-btn-danger-hover text-ui-text-primary`;
      default:
        return `bg-btn-primary-base hover:bg-btn-primary-hover text-ui-text-primary`;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-3 py-1 text-xs";
      case "md":
        return "px-4 py-2 text-sm";
      case "lg":
        return "px-6 py-3 text-base";
      default:
        return "px-4 py-2 text-sm";
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${getVariantClasses()} 
        ${getSizeClasses()} 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        transition-colors duration-200 
        rounded font-mono focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

/**
 * IconButton - 아이콘만 있는 버튼 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {ReactNode} props.icon - 아이콘 요소
 * @param {function} props.onClick - 클릭 핸들러
 * @param {string} props.variant - 버튼 변형 ('primary', 'secondary', 'danger')
 * @param {string} props.size - 버튼 크기 ('sm', 'md', 'lg')
 * @param {boolean} props.disabled - 비활성화 여부
 * @param {string} props.title - 툴팁 텍스트
 * @param {string} props.className - 추가 CSS 클래스
 */
export const IconButton = ({
  icon,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  title = "",
  className = "",
  ...props
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return `bg-btn-primary-base hover:bg-btn-primary-hover text-ui-text-primary`;
      case "secondary":
        return `bg-ui-background-tertiary text-ui-text-muted hover:text-brand-primary`;
      case "danger":
        return `bg-btn-danger-base hover:bg-btn-danger-hover text-ui-text-primary`;
      default:
        return `bg-btn-primary-base hover:bg-btn-primary-hover text-ui-text-primary`;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "w-6 h-6 text-xs";
      case "md":
        return "w-8 h-8 text-sm";
      case "lg":
        return "w-10 h-10 text-base";
      default:
        return "w-8 h-8 text-sm";
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`
        ${getVariantClasses()} 
        ${getSizeClasses()} 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        transition-colors duration-200 
        rounded-full flex items-center justify-center
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary
        ${className}
      `}
      {...props}
    >
      {icon}
    </button>
  );
};

/**
 * SelectionButton - 선택 옵션 버튼 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {ReactNode} props.children - 버튼 내용
 * @param {string} props.hotkey - 단축키 텍스트
 * @param {function} props.onClick - 클릭 핸들러
 * @param {boolean} props.selected - 선택 여부
 * @param {boolean} props.disabled - 비활성화 여부
 * @param {string} props.className - 추가 CSS 클래스
 */
export const SelectionButton = ({
  children,
  hotkey,
  onClick,
  selected = false,
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`
        text-ui-text-primary text-xl border 
        ${
          selected
            ? "border-brand-primary bg-brand-accent/30"
            : "border-ui-text-primary"
        } 
        px-6 py-2 rounded-lg
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        transition-colors duration-200
        ${className}
      `}
      onClick={disabled ? undefined : onClick}
      {...props}
    >
      {hotkey && <span className="font-bold mr-2">{hotkey}</span>}
      {children}
    </div>
  );
};
