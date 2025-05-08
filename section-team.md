# SECTION 2: 팀 섹션 가이드

## 컴포넌트 이름

`<TeamSection />`

## 디자인 톤 & 무드

- **밝고 긍정적인 분위기**, 팀 에너지 반영
- **배경색**: `#fef6f0` 또는 유사한 파스텔톤 계열
- **폰트**: `Noto Sans`, 부드러운 인상 강조
- **디자인 요소**: 폴라로이드 느낌의 이미지 배치, 손글씨 스타일 코멘트 가능

## 포함 요소

1. **팀 단체 사진**

   - 크고 명확한 시각 중심 요소
   - 원형 마스크 처리 or 폴라로이드 스타일 가능

2. **팀 코멘트**

   - 자유로운 형식의 짧은 소개글 (예: "우리는 서로의 다름에서 배우는 팀입니다.")

3. **팀 블로그 리스트**

   - 외부 노션 링크로 연결되는 리스트
   - 버튼 또는 카드 형식으로 처리

## Tailwind 예시 스타일

```jsx
<section className="bg-[#fef6f0] py-16 px-6">
  <h2 className="text-3xl font-bold mb-6">우리 팀을 소개합니다</h2>
  <img src="/images/team.jpg" alt="team" className="rounded-xl shadow-md" />
  <p className="mt-4 text-lg italic">우리는 서로의 다름에서 배우는 팀입니다.</p>
</section>
```

## 주의사항

- 다음의 개인 섹션들과 톤의 연속성을 가져야 함
- 이미지 로딩에 대비하여 `loading="lazy"` 속성 고려
