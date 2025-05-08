# SECTION 3\~5: 개인 섹션 가이드 (공통 컴포넌트 기반)

## 컴포넌트 이름

`<MemberProfile />`

## 디자인 톤 & 무드

- 팀 섹션과 동일한 톤 유지: 밝고 긍정적인 느낌
- 연속적 스크롤 구조에서 팀 섹션과 **디자인 흐름을 공유**해야 함
- 각 인물의 개성을 드러내되 전체 레이아웃은 통일

## 포함 요소 (props 기반)

1. **인물 사진**

   - 원형 or 사각형 라운드 이미지, 자연스러운 얼굴 표현
   - 이미지 파일 경로는 하드코딩

2. **한줄 코멘트**

   - 팀원 개개인의 슬로건 혹은 캐치프레이즈
   - 예: "사유하는 예술가"

3. **개인 블로그 링크 (외부 링크)**

   - Notion 또는 외부 블로그 URL 연결
   - 버튼 또는 텍스트 링크 형태

## Tailwind 예시 스타일

```jsx
const MemberProfile = ({ name, image, comment, notionUrl }) => (
  <section className="bg-[#fef6f0] py-10 px-6">
    <img
      src={image}
      alt={name}
      className="w-32 h-32 rounded-full mx-auto mb-4"
    />
    <h3 className="text-xl font-semibold text-center">{name}</h3>
    <p className="text-center italic">"{comment}"</p>
    <div className="text-center mt-2">
      <a href={notionUrl} target="_blank" className="text-indigo-500 underline">
        개인 글 보러가기
      </a>
    </div>
  </section>
);
```

## 사용 예시 데이터

```js
const members = [
  {
    name: "황준걸",
    image: "/images/jungeol.jpg",
    comment: "사유하는 예술가",
    notionUrl: "https://..."
  },
  ...
];
```

## 주의사항

- 세 명 모두 동일한 구조를 유지해야 함
- 반응형 레이아웃 고려 (이미지 크기, 텍스트 배치)
