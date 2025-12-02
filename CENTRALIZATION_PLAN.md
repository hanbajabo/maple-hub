# 🎯 메이플 AI 중앙화 개선 프로젝트

## 📊 현재 상황

### 문제점
- 평가 기준이 **30개 이상의 파일**에 산재
- 동일한 기준값(예: 22성, 17성)이 수십 곳에 중복
- 기준 변경 시 여러 파일 수정 필요 → **유지보수 비용 증가**
- 코드 가독성 저하

### 기존 아키텍처
```
lib/
├── config/
│   └── evaluation_criteria.ts       (일부 기준만 중앙화, 불완전)
├── diagnosis/
│   ├── parts/
│   │   ├── weapon.ts                (하드코딩: 22성, 17성, 10성, 9, 7, 5, 3...)
│   │   ├── armor.ts                 (하드코딩: 22성, 17성, 140, 120...)
│   │   ├── glove.ts                 (하드코딩: 22성, 17성...)
│   │   ├── hat.ts                   (하드코딩: 22성, 21성...)
│   │   ├── accessory.ts             (하드코딩: 22성, 18성, 12성...)
│   │   └── ...
├── potential_evaluator.ts           (하드코딩: 33, 21, 15, 88, 66...)
└── flame_evaluator.ts               (하드코딩: 125, 98, 95, 140, 120...)
```

---

## ✅ 해결 방안: 통합 기준 파일

### 1단계: 통합 기준 파일 생성 ✓ (완료)

**파일**: `lib/config/unified_criteria.ts`

**포함 내용**:
- ✅ 스타포스 기준 (STARFORCE_TIERS, SUPERIOR_STARFORCE)
- ✅ 잠재능력 기준 (MAIN_POTENTIAL_STAT, ADDITIONAL_POTENTIAL_STAT)
- ✅ 추가옵션 기준 (WEAPON_FLAME_TIERS, ARMOR_FLAME_SCORE)
- ✅ 주문서 작 기준 (SCROLL_QUALITY, PET_SCROLL_QUALITY)
- ✅ 변환 공식 (STAT_CONVERSION, WEAPON_ADDITIONAL_WEIGHTS)
- ✅ 특수 아이템 키워드 (EVENT_RING_KEYWORDS, SUPERIOR_ITEM_KEYWORDS)
- ✅ 헬퍼 함수 (getMaxStarforce, isSuperiorItem, getStarforceGrade 등)

### 2단계: 사용 가이드 생성 ✓ (완료)

**파일**: `lib/config/UNIFIED_CRITERIA_GUIDE.md`

**포함 내용**:
- ✅ 사용 예시 (Before/After 비교)
- ✅ 마이그레이션 가이드
- ✅ 베스트 프랙티스

### 3단계: 기존 코드 마이그레이션 (진행 중)

#### 3-1. weapon.ts 리팩토링 ✓ (완료)

**변경 내역**:
- ✅ `WEAPON_STARFORCE` → `STARFORCE_TIERS`
- ✅ `WEAPON_FLAME` → `WEAPON_FLAME_TIERS`
- ✅ 하드코딩된 주문서 작 기준 (9, 7, 5, 3) → `SCROLL_QUALITY`

**효과**:
- 14개의 lint 에러 해결
- 코드 가독성 향상
- 유지보수성 크게 개선

#### 3-2. armor.ts 리팩토링 ✓ (완료)

**변경 내역**:
- ✅ 스타포스 기준 (25, 24, 23, 22, 21, 18, 17) → `STARFORCE_TIERS`
- ✅ 잠재능력 스탯 % 기준 → `MAIN_POTENTIAL_STAT`
- ✅ 에디셔널 기준 → `ADDITIONAL_POTENTIAL_STAT`
- ✅ 특수 장비 (로얄 블랙메탈 12성) → `SPECIAL_STARFORCE_GOALS`

**효과**:
- 하드코딩된 값 70개 이상 제거
- 일관된 기준 적용
- 코드 가독성 대폭 향상

#### 3-3. 나머지 파일 리팩토링 (TODO)

**우선순위 1 (필수)**:
- [x] `lib/diagnosis/parts/weapon.ts` - 스타포스, 플레임 기준 ✓
- [x] `lib/diagnosis/parts/armor.ts` - 스타포스, 플레임 기준 ✓
- [x] `lib/diagnosis/parts/glove.ts` - 스타포스, 크뎀 기준 ✓
- [x] `lib/diagnosis/parts/hat.ts` - 스타포스, 쿨감 기준 ✓
- [x] `lib/diagnosis/parts/accessory.ts` - 스타포스, 슈페리얼 기준 ✓
- [x] `lib/potential_evaluator.ts` - 잠재 스탯 % 기준 ✓
- [x] `lib/flame_evaluator.ts` - 추가옵션 점수 기준 ✓

**우선순위 2 (선택)**:
- [x] `lib/diagnosis/equipment.ts` - 공통 로직 ✓
- [x] `lib/diagnosis/parts/common.ts` - 에픽 잠재 기준 ✓
- [x] `lib/diagnosis/parts/scroll.ts` - 주문서 작 기준 ✓

---

## 📋 마이그레이션 체크리스트

### armor.ts 마이그레이션

```typescript
// ❌ 기존
if (starforce >= 22) {
    comments.push(`[졸업] 22성 아케인...`);
} else if (starforce >= 21) {
    comments.push(`[준종결] 21성 아케인...`);
} else if (starforce >= 18) {
    comments.push(`[성장 교차점] 18성...`);
}

// ✅ 개선
if (starforce >= STARFORCE_TIERS.ENDGAME) {
    comments.push(`[졸업] ${STARFORCE_TIERS.ENDGAME}성 아케인...`);
} else if (starforce >= STARFORCE_TIERS.NEAR_ENDGAME) {
    comments.push(`[준종결] ${STARFORCE_TIERS.NEAR_ENDGAME}성 아케인...`);
} else if (starforce >= STARFORCE_TIERS.CROSSOVER) {
    comments.push(`[성장 교차점] ${STARFORCE_TIERS.CROSSOVER}성...`);
}
```

### potential_evaluator.ts 마이그레이션

```typescript
// ❌ 기존
if (grade === '레전드리') {
    if (score >= 36) return '초월급';
    if (score >= 34) return '엔드급';
    if (score >= 30) return '최상급';
    if (score >= 21) return '좋음';
    if (score >= 15) return '통과';
}

// ✅ 개선
if (grade === '레전드리') {
    const criteria = MAIN_POTENTIAL_STAT.LEGENDARY;
    if (score >= criteria.MYTHIC) return GRADE_LABELS.MYTHIC;
    if (score >= criteria.ENDGAME_HIGH) return GRADE_LABELS.ENDGAME;
    if (score >= criteria.ENDGAME) return GRADE_LABELS.SUPERIOR;
    if (score >= criteria.GOOD) return GRADE_LABELS.GOOD;
    if (score >= criteria.DECENT) return GRADE_LABELS.PASS;
}
```

### flame_evaluator.ts 마이그레이션

```typescript
// ❌ 기존
if (itemLevel >= 200 && itemLevel <= 249) {
    if (score >= 170) {
        evaluation = '종결';
        recommendation = '170급 이상! 매우 훌륭한...';
    } else if (score >= 150) {
        evaluation = '준수';
        recommendation = '150~155급으로 아주 좋은...';
    }
}

// ✅ 개선
if (itemLevel >= 200 && itemLevel <= 249) {
    const criteria = ARMOR_FLAME_SCORE.LEVEL_200;
    if (score >= criteria.EXCELLENT) {
        evaluation = GRADE_LABELS.EXCELLENT;
        recommendation = `${criteria.EXCELLENT}급 이상! 매우 훌륭한...`;
    } else if (score >= criteria.GREAT) {
        evaluation = GRADE_LABELS.DECENT;
        recommendation = `${criteria.GREAT}급 이상으로 아주 좋은...`;
    }
}
```

---

## 🎓 기대 효과

### 1. 유지보수성 향상
- **기존**: 기준 변경 시 30개 파일 수정
- **개선**: 1개 파일(`unified_criteria.ts`)만 수정

### 2. 일관성 보장
- **기존**: 같은 기준이 파일마다 다를 수 있음 (예: 어디는 22성, 어디는 23성)
- **개선**: 전체 시스템에서 동일한 기준 사용

### 3. 가독성 향상
```typescript
// ❌ 가독성 낮음
if (starforce >= 22) { ... }

// ✅ 가독성 높음 (의미가 명확함)
if (starforce >= STARFORCE_TIERS.ENDGAME) { ... }
```

### 4. 확장성 증가
- 새로운 기준 추가 시 한 곳에만 추가하면 됨
- 기준값 변경 이력 추적 용이 (Git diff)

---

## 🚀 다음 단계

### 1주차: 핵심 파일 마이그레이션
- [x] `armor.ts` 리팩토링
- [x] `glove.ts` 리팩토링
- [x] `hat.ts` 리팩토링
- [x] `accessory.ts` 리팩토링

### 2주차: 평가 로직 파일 마이그레이션
- [x] `potential_evaluator.ts` 리팩토링
- [x] `flame_evaluator.ts` 리팩토링

### 3주차: 검증 및 테스트
- [x] 코드 검증 (상수 사용 확인)
- [x] Import 검증 (모든 파일에서 올바른 import)
- [x] 상수 적용 검증 (하드코딩 제거 확인)
- [ ] 실제 기능 테스트 (개발 서버 실행 권장)
- [x] 문서 업데이트 (VALIDATION_GUIDE.md 작성)

---

## 📞 참고

- **통합 기준 파일**: `lib/config/unified_criteria.ts`
- **사용 가이드**: `lib/config/UNIFIED_CRITERIA_GUIDE.md`
- **예시 코드**: `lib/diagnosis/parts/weapon.ts` (리팩토링 완료)
