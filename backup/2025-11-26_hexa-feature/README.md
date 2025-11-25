# 백업 날짜: 2025-11-26 01:57

## 수정된 파일 목록

### 1. lib/hexa_skill_data.ts
- **변경 내용**: 48개 직업의 6차 스킬 우선순위 데이터 추가
- **주요 기능**: HEXA_SKILL_PRIORITIES 객체에 모든 직업별 추천 강화 순서 저장
- **제외 항목**: "솔 야누스", "솔 야누스: 새벽", "HEXA 스탯"

### 2. components/HexaWidget.tsx
- **변경 내용**: 추천 우선순위 정렬 기능 추가
- **주요 기능**:
  - "추천 우선강화 순서" 토글 버튼 추가
  - 버튼 클릭 시 hexa_skill_data.ts의 우선순위에 따라 스킬 정렬
  - 우선순위별 색상 구분:
    - 1~3순위: 골드/주황색
    - 4~7순위: 장미/핑크색
    - 8순위 이상: 시안/파란색
    - 목록에 없는 스킬: 회색
  - 우선순위 데이터가 있는 직업에만 버튼 표시

### 3. lib/potential_evaluator.ts
- **변경 내용**: 잠재능력 평가 로직 개선 (크리티컬 데미지 평가)
- **주요 수정**:
  - 크리티컬 데미지와 올스탯 옵션 구분 로직 추가
  - 크뎀 줄 수 기반 평가 시스템 구현:
    - 크뎀 1줄: "좋음"
    - 크뎀 1줄 + 스탯%: "진짜 좋음"
    - 크뎀 2줄: "최고 좋음"
    - 크뎀 2줄 + 스탯%: "엔드급"
    - 크뎀 3줄: "초월급"
  - 크뎀 옵션이 올스탯으로 잘못 인식되던 버그 수정

## 복구 방법

만약 파일이 손상되면 다음 파일들을 원래 위치로 복사하세요:

```powershell
Copy-Item "backup\2025-11-26_hexa-feature\hexa_skill_data.ts" "lib\hexa_skill_data.ts" -Force
Copy-Item "backup\2025-11-26_hexa-feature\HexaWidget.tsx" "components\HexaWidget.tsx" -Force
Copy-Item "backup\2025-11-26_hexa-feature\potential_evaluator.ts" "lib\potential_evaluator.ts" -Force
```

## 주요 기능 요약

1. **헥사 스킬 추천 정렬**: 직업별 최적 스킬 강화 순서 제공
2. **시각적 우선순위 표시**: 색상으로 한눈에 파악 가능
3. **정확한 잠재능력 평가**: 크뎀 옵션 제대로 인식 및 평가

---
생성일: 2025-11-26 01:58
