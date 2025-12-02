# 🎯 통합 평가 기준 (Unified Criteria) 사용 가이드

## 📌 개요

`unified_criteria.ts`는 메이플 AI의 모든 평가 기준을 **한 곳에서 중앙 관리**하는 파일입니다.

### ✅ 중앙화의 장점

1. **일관성** - 모든 로직에서 동일한 기준 사용
2. **유지보수성** - 기준 변경 시 한 파일만 수정
3. **가독성** - 기준값의 의미를 명확하게 문서화
4. **확장성** - 새로운 기준 추가가 용이

---

## 📚 주요 기준 카테고리

### 1. 스타포스 기준

```typescript
import { STARFORCE_TIERS, SUPERIOR_STARFORCE } from '@/lib/config/unified_criteria';

// ❌ 기존 방식 (하드코딩)
if (starforce >= 22) {
    comment = "졸업";
} else if (starforce >= 17) {
    comment = "국민 세팅";
}

// ✅ 새로운 방식 (중앙화된 기준 사용)
if (starforce >= STARFORCE_TIERS.ENDGAME) {
    comment = "졸업";
} else if (starforce >= STARFORCE_TIERS.STANDARD) {
    comment = "국민 세팅";
}

// 슈페리얼 아이템 (타일런트 등)
if (starforce >= SUPERIOR_STARFORCE.EXCELLENT) {
    comment = "12성 타일런트는 22성 일반템과 맞먹습니다";
}
```

### 2. 잠재능력 기준

```typescript
import { 
    MAIN_POTENTIAL_STAT, 
    ADDITIONAL_POTENTIAL_STAT,
    getMainPotentialGrade 
} from '@/lib/config/unified_criteria';

// ❌ 기존 방식
if (grade === '레전드리') {
    if (statPercent >= 33) return '종결';
    if (statPercent >= 21) return '좋음';
    if (statPercent >= 15) return '통과';
}

// ✅ 새로운 방식
if (grade === '레전드리') {
    const criteria = MAIN_POTENTIAL_STAT.LEGENDARY;
    if (statPercent >= criteria.ENDGAME) return '종결';
    if (statPercent >= criteria.GOOD) return '좋음';
    if (statPercent >= criteria.DECENT) return '통과';
}

// 또는 헬퍼 함수 사용
const gradeLabel = getMainPotentialGrade(statPercent, '레전드리', itemLevel);
```

### 3. 추가옵션 (Flame) 기준

```typescript
import { WEAPON_FLAME_TIERS, ARMOR_FLAME_SCORE } from '@/lib/config/unified_criteria';

// 무기 추가옵션 (1티어/2티어 판별)
const level = item.level;
let tier1Min, tier2Min;

if (level >= 200) {
    tier1Min = WEAPON_FLAME_TIERS.ARCANE.TIER1_MIN; // 125
    tier2Min = WEAPON_FLAME_TIERS.ARCANE.TIER2_MIN; // 98
} else if (level >= 160) {
    tier1Min = WEAPON_FLAME_TIERS.ABSOLAB.TIER1_MIN; // 95
    tier2Min = WEAPON_FLAME_TIERS.ABSOLAB.TIER2_MIN; // 74
}

if (addAtt >= tier1Min) {
    return "1티어 추옵!";
} else if (addAtt >= tier2Min) {
    return "2티어 추옵";
}

// 방어구 추가옵션 (점수 평가)
const criteria = ARMOR_FLAME_SCORE.LEVEL_200;
if (score >= criteria.EXCELLENT) return "종결";
if (score >= criteria.GREAT) return "훌륭";
if (score >= criteria.DECENT) return "준수";
```

### 4. 쿨타임 감소 & 크뎀 기준

```typescript
import { COOLDOWN_REDUCTION, CRIT_DAMAGE_LINES } from '@/lib/config/unified_criteria';

// 쿨타임 감소 평가
if (cooldownSeconds >= COOLDOWN_REDUCTION.MYTHIC) {
    return "초월급! 쿨감 6초 이상";
} else if (cooldownSeconds >= COOLDOWN_REDUCTION.ENDGAME) {
    return "엔드급! 쿨감 5초 이상";
} else if (cooldownSeconds >= COOLDOWN_REDUCTION.EXCELLENT) {
    return "최상급! 쿨감 4초 이상";
}

// 크리티컬 데미지 줄 수 평가
if (critLines >= CRIT_DAMAGE_LINES.MYTHIC) {
    return "초월급! 크뎀 3줄";
} else if (critLines >= CRIT_DAMAGE_LINES.ENDGAME) {
    return "엔드급! 크뎀 2줄";
}
```

### 5. 헬퍼 함수 활용

```typescript
import { 
    getMaxStarforce,
    isSuperiorItem,
    isEventRing,
    canStarforce,
    canScroll,
    canFlame,
    getStarforceGrade 
} from '@/lib/config/unified_criteria';

// 최대 스타포스 계산
const maxSf = getMaxStarforce(itemLevel); // 160제 → 25성

// 슈페리얼 아이템 판별
if (isSuperiorItem(itemName)) {
    // 타일런트, 노바, 헬리시움 처리
}

// 이벤트 반지 판별
if (isEventRing(itemName)) {
    // 테네브리스, SS급 등 처리
}

// 스타포스/주문서/불꽃 가능 여부
if (canStarforce(slot, itemName)) {
    // 스타포스 진단
}

if (canScroll(slot)) {
    // 주문서 진단
}

if (canFlame(slot)) {
    // 추가옵션 진단
}

// 스타포스 등급 자동 판별
const grade = getStarforceGrade(starforce, isSuperior);
```

---

## 🔧 마이그레이션 가이드

### Before (기존 코드)

```typescript
// lib/diagnosis/parts/weapon.ts
export function diagnoseWeapon(item: any): string[] {
    const comments: string[] = [];
    const starforce = parseInt(item.starforce || "0");
    
    // ❌ 하드코딩된 값
    if (starforce >= 22) {
        comments.push(`[졸업] 22성 무기... 공격력이 폭발합니다.`);
    } else if (starforce >= 17) {
        comments.push(`[국민 세팅] 17성 무기는 가성비가 좋습니다.`);
    } else if (starforce >= 10) {
        comments.push(`[입문] 임시로 사용하는 단계입니다.`);
    }
    
    return comments;
}
```

### After (개선된 코드)

```typescript
// lib/diagnosis/parts/weapon.ts
import { STARFORCE_TIERS } from '@/lib/config/unified_criteria';

export function diagnoseWeapon(item: any): string[] {
    const comments: string[] = [];
    const starforce = parseInt(item.starforce || "0");
    
    // ✅ 중앙화된 기준 사용
    if (starforce >= STARFORCE_TIERS.ENDGAME) {
        comments.push(`[졸업] ${STARFORCE_TIERS.ENDGAME}성 무기... 공격력이 폭발합니다.`);
    } else if (starforce >= STARFORCE_TIERS.STANDARD) {
        comments.push(`[국민 세팅] ${STARFORCE_TIERS.STANDARD}성 무기는 가성비가 좋습니다.`);
    } else if (starforce >= STARFORCE_TIERS.ENTRY) {
        comments.push(`[입문] 임시로 사용하는 단계입니다.`);
    }
    
    return comments;
}
```

---

## 📋 체크리스트: 기준 변경이 필요할 때

예: "스타포스 국민 세팅을 17성에서 18성으로 변경"

### ❌ 기존 방식 (여러 파일 수정 필요)
1. `lib/diagnosis/parts/weapon.ts` 수정
2. `lib/diagnosis/parts/armor.ts` 수정
3. `lib/diagnosis/parts/glove.ts` 수정
4. `lib/diagnosis/parts/accessory.ts` 수정
5. `lib/diagnosis/parts/hat.ts` 수정
6. ... (20개 이상의 파일)

### ✅ 새로운 방식 (한 파일만 수정)
1. `lib/config/unified_criteria.ts`만 수정
   ```typescript
   export const STARFORCE_TIERS = {
       // ...
       STANDARD: 18, // 17 → 18로 변경
       // ...
   }
   ```
2. 끝! 전체 시스템에 자동 반영

---

## 🎓 베스트 프랙티스

### 1. 항상 상수 사용하기

```typescript
// ❌ 나쁜 예
if (starforce >= 22) { ... }

// ✅ 좋은 예
if (starforce >= STARFORCE_TIERS.ENDGAME) { ... }
```

### 2. 헬퍼 함수 적극 활용

```typescript
// ❌ 나쁜 예
const isSuperior = itemName.includes("타일런트") || 
                   itemName.includes("노바") || 
                   itemName.includes("헬리시움");

// ✅ 좋은 예
const isSuperior = isSuperiorItem(itemName);
```

### 3. 의미 있는 변수명 사용

```typescript
// ❌ 나쁜 예
const criteria = MAIN_POTENTIAL_STAT.LEGENDARY;
if (stat >= 33) { ... }

// ✅ 좋은 예
const legendaryCriteria = MAIN_POTENTIAL_STAT.LEGENDARY;
if (stat >= legendaryCriteria.ENDGAME) { ... }
```

---

## 🚀 다음 단계

1. **기존 코드 마이그레이션**
   - `lib/diagnosis/parts/` 내 모든 파일을 새로운 기준으로 전환
   - `lib/potential_evaluator.ts` 리팩토링
   - `lib/flame_evaluator.ts` 리팩토링

2. **테스트**
   - 각 진단 로직이 정상 작동하는지 확인
   - 기준 변경 시 전체 시스템에 반영되는지 검증

3. **문서화**
   - 새로운 기준 추가 시 이 파일에 예시 코드 추가
   - 주석으로 기준의 의미 명확히 설명

---

## 📞 문의

기준 관련 질문이나 개선 제안이 있다면 이슈를 생성해주세요!
