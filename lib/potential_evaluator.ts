/**
 * ============================================================================
 * 잠재능력 평가 시스템 (Potential Evaluator)
 * ============================================================================
 * 
 * 잠재능력 평가 로직을 카테고리별로 분리하여 관리합니다.
 * 기존 API 호환성을 위해 모든 항목을 re-export합니다.
 * 
 * 모듈화 완료: 2025-12-04
 * - types.ts: 타입 정의
 * - weapon.ts: 무기 잠재 평가
 * - emblem.ts: 엠블렘 잠재 평가
 * - armor.ts: 방어구/장신구 잠재 평가
 * - evaluation.ts: 평가 및 추천 생성
 * - index.ts: 메인 평가 로직
 */

export type { PotentialEvaluation, EquipmentType, PotentialGrade, PotentialType } from './potential-evaluator/types';
export { evaluatePotential } from './potential-evaluator/index';

// 개별 평가 함수들도 export (필요한 경우)
export { evaluateWeaponMain, evaluateWeaponAdditional } from './potential-evaluator/weapon';
export { evaluateEmblem } from './potential-evaluator/emblem';
export { evaluateArmorAccessory } from './potential-evaluator/armor';
export {
    getCeilingCost,
    generateEvaluation,
    generateWeaponAdditionalRecommendation,
    generateEmblemRecommendation,
    generateGeneralRecommendation,
} from './potential-evaluator/evaluation';
