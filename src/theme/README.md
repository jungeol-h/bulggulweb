# Bulggul Web 테마 시스템

## 개요

이 테마 시스템은 Bulggul Web 프로젝트의 색상과 스타일을 중앙 집중식으로 관리하기 위해 설계되었습니다. 이 시스템을 사용하면 디자인 시스템의 일관성을 유지하고 전체 애플리케이션의 스타일 변경을 쉽게 할 수 있습니다.

## 파일 구조

```
src/theme/
├── index.js      - 모든 테마 관련 모듈을 내보내는 진입점
├── theme.js      - 색상 및 기타 테마 변수 정의
└── utils.js      - 테마 관련 유틸리티 함수
```

## 사용 방법

### 테마 가져오기

```jsx
// 테마 전체 가져오기
import theme from "../theme";

// 특정 부분만 가져오기
import { colors } from "../theme";
```

### 컴포넌트에서 Tailwind 클래스 사용하기

모든 테마 색상은 Tailwind 클래스로 사용할 수 있습니다:

```jsx
// 예: 버튼 컴포넌트
<button className="bg-btn-primary-base hover:bg-btn-primary-hover text-ui-text-primary">
  버튼 텍스트
</button>
```

### 색상 네이밍 컨벤션

색상은 다음과 같은 계층 구조로 조직되어 있습니다:

- `brand` - 브랜드 정체성 색상
- `ui` - 인터페이스 요소 색상 (배경, 텍스트, 테두리 등)
- `state` - 상태 표시 색상 (성공, 오류, 경고 등)
- `btn` - 버튼 관련 색상
- `effect` - 특수 효과 색상

## 테마 확장하기

새로운 색상이나 변수를 추가하려면 `theme.js` 파일을 수정한 다음, Tailwind 설정 파일(`tailwind.config.js`)의 테마 확장 부분도 업데이트해야 합니다.
