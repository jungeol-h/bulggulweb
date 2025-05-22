# 색상 시스템 사용 가이드

## 개요

이 문서는 Bulggul Web 프로젝트의 색상 시스템을 사용하는 방법을 설명합니다. 이 시스템은 프로젝트 전체에서 일관된 색상을 사용하기 위해 설계되었습니다.

## 색상 시스템 구조

색상 시스템은 다음과 같은 카테고리로 구성되어 있습니다:

1. **브랜드 색상 (brand)**

   - primary, secondary, tertiary, accent 등

2. **인터페이스 색상 (ui)**

   - background: 배경 색상 (primary, secondary, tertiary)
   - text: 텍스트 색상 (primary, secondary, muted)
   - border: 테두리 색상 (light, dark)

3. **상태 색상 (state)**

   - success, warning, danger, info

4. **버튼 색상 (btn)**

   - primary, secondary, danger (각각 base, hover, active 상태)

5. **특수 효과 색상 (effect)**
   - glow, highlight

## 색상 사용 방법

### 1. Tailwind 클래스 사용하기

색상 시스템은 Tailwind CSS 클래스를 통해 사용할 수 있습니다:

```jsx
// 브랜드 색상 사용 예시
<div className="bg-brand-primary text-ui-text-primary">
  브랜드 색상 배경과 기본 텍스트 색상
</div>

// 버튼 색상 사용 예시
<button className="bg-btn-primary-base hover:bg-btn-primary-hover">
  기본 버튼
</button>

// 상태 색상 사용 예시
<div className="text-state-success">
  성공 메시지
</div>
```

### 2. JavaScript에서 색상 가져오기

컴포넌트에서 직접 색상 값을 사용해야 하는 경우:

```jsx
import { colors } from "../theme";

// 색상 값 직접 사용
const primaryColor = colors.brand.primary; // '#22c55e'
```

## 새로운 컴포넌트 개발 시 적용 방법

새로운 UI 컴포넌트를 개발할 때는 다음과 같이 테마 색상을 적용하세요:

1. 테마 색상 가져오기:

```jsx
import { colors } from "../../theme/theme";
```

2. 하드코딩된 색상 대신 테마 색상 사용하기:

```jsx
// 이렇게 하지 마세요:
<div className="bg-green-700">...</div>

// 이렇게 하세요:
<div className="bg-brand-primary">...</div>
```

## 색상 시스템 확장하기

새로운 색상을 추가하려면:

1. `src/theme/theme.js` 파일에 새 색상 추가
2. `tailwind.config.js` 파일에 새 색상 매핑 추가

## 예시

### 버튼 컴포넌트 예시

```jsx
export const Button = ({ variant = "primary", children }) => {
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

  return (
    <button className={`px-4 py-2 rounded ${getVariantClasses()}`}>
      {children}
    </button>
  );
};
```

이 가이드를 따라 모든 UI 컴포넌트에 테마 색상을 적용하면, 나중에 색상 변경이 필요할 때 `theme.js` 파일만 수정하면 됩니다.
