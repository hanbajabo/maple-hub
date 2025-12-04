/**
 * ============================================================================
 * 🔍 헬퍼 함수 (Helper Functions)
 * ============================================================================
 */

import { STARFORCE_TIERS, SUPERIOR_STARFORCE } from './starforce';
import { MAIN_POTENTIAL_STAT, ADDITIONAL_POTENTIAL_STAT } from './potential';
import {
    GRADE_LABELS,
    SUPERIOR_ITEM_KEYWORDS,
    EVENT_RING_KEYWORDS,
    NO_STARFORCE_SLOTS,
    NO_SCROLL_SLOTS,
    NO_FLAME_SLOTS,
} from './common';

/**
 * 아이템 이름으로 슈페리얼 여부 판별
 */
export function isSuperiorItem(itemName: string): boolean {
    return SUPERIOR_ITEM_KEYWORDS.some(keyword => itemName.includes(keyword));
}

/**
 * 아이템 이름으로 이벤트 링 여부 판별
 */
export function isEventRing(itemName: string): boolean {
    return EVENT_RING_KEYWORDS.some(keyword => itemName.includes(keyword));
}

/**
 * 슬롯으로 스타포스 가능 여부 판별
 */
export function canStarforce(slot: string, itemName: string): boolean {
    if (NO_STARFORCE_SLOTS.some(noSfSlot => slot.includes(noSfSlot))) {
        return false;
    }

    if (slot.includes("보조무기") && !slot.includes("방패")) {
        return false;
    }

    return true;
}

/**
 * 슬롯으로 주문서 작업 가능 여부 판별
 */
export function canScroll(slot: string): boolean {
    return !NO_SCROLL_SLOTS.some(noScrollSlot => slot.includes(noScrollSlot));
}

/**
 * 슬롯으로 환생의 불꽃 사용 가능 여부 판별
 */
export function canFlame(slot: string): boolean {
    return !NO_FLAME_SLOTS.some(noFlameSlot => slot.includes(noFlameSlot));
}

/**
 * 스타포스 수치에 따른 평가 등급 반환
 */
export function getStarforceGrade(starforce: number, isSuperior: boolean = false): string {
    if (isSuperior) {
        if (starforce >= SUPERIOR_STARFORCE.EXCELLENT) return GRADE_LABELS.EXCELLENT;
        if (starforce >= SUPERIOR_STARFORCE.MINIMUM) return GRADE_LABELS.NORMAL;
        return GRADE_LABELS.POOR;
    }

    if (starforce >= STARFORCE_TIERS.ENDGAME) return GRADE_LABELS.ENDGAME;
    if (starforce >= STARFORCE_TIERS.NEAR_ENDGAME) return GRADE_LABELS.SUPERIOR;
    if (starforce >= STARFORCE_TIERS.HIGH_SPEC) return GRADE_LABELS.GREAT;
    if (starforce >= STARFORCE_TIERS.CROSSOVER) return GRADE_LABELS.GOOD;
    if (starforce >= STARFORCE_TIERS.STANDARD) return GRADE_LABELS.DECENT;
    if (starforce >= STARFORCE_TIERS.COST_EFFECTIVE) return GRADE_LABELS.PASS;
    if (starforce >= STARFORCE_TIERS.ENTRY) return GRADE_LABELS.NORMAL;
    return GRADE_LABELS.POOR;
}

/**
 * 직업별 잠재능력 스탯 %에 따른 평가 등급 반환 (메인 잠재)
 */
export function getMainPotentialGrade(
    statPercent: number,
    grade: '레전드리' | '유니크' | '에픽',
    itemLevel: number = 200,
    job?: string
): string {
    if (grade === '레전드리') {
        const isXenon = job && (job.includes('제논') || job.replace(/\s/g, '').includes('제논'));
        const is201Plus = itemLevel >= 201;

        const criteria = isXenon
            ? (is201Plus ? MAIN_POTENTIAL_STAT.XENON_LEGENDARY_HIGH_LEVEL : MAIN_POTENTIAL_STAT.XENON_LEGENDARY)
            : (is201Plus ? MAIN_POTENTIAL_STAT.LEGENDARY_HIGH_LEVEL : MAIN_POTENTIAL_STAT.LEGENDARY);

        if (statPercent >= criteria.MYTHIC) return GRADE_LABELS.MYTHIC;
        if (statPercent >= criteria.ENDGAME_HIGH) return GRADE_LABELS.ENDGAME;
        if (statPercent >= criteria.ENDGAME) return GRADE_LABELS.EXCELLENT;
        if (statPercent >= criteria.GOOD) return GRADE_LABELS.GOOD;
        if (statPercent >= criteria.DECENT_PLUS) return GRADE_LABELS.DECENT;
        if (statPercent >= criteria.DECENT) return GRADE_LABELS.PASS;
        return GRADE_LABELS.LACKING;
    }

    if (grade === '유니크') {
        if (job && (job.includes('제논') || job.replace(/\s/g, '').includes('제논'))) {
            const criteria = MAIN_POTENTIAL_STAT.XENON_UNIQUE;
            if (statPercent >= criteria.LEGENDARY_TIER) return "탈유니크급";
            if (statPercent >= criteria.TIER1) return "1티어";
            if (statPercent >= criteria.STANDARD) return "정옵";
            if (statPercent >= criteria.MINIMUM) return GRADE_LABELS.PASS;
            return GRADE_LABELS.LACKING;
        }

        const criteria = MAIN_POTENTIAL_STAT.UNIQUE;
        if (statPercent >= criteria.EXCELLENT) return GRADE_LABELS.EXCELLENT;
        if (statPercent >= criteria.DECENT) return GRADE_LABELS.DECENT;
        if (statPercent >= criteria.MINIMUM) return GRADE_LABELS.PASS;
        return GRADE_LABELS.LACKING;
    }

    if (grade === '에픽') {
        if (job && (job.includes('제논') || job.replace(/\s/g, '').includes('제논'))) {
            const criteria = MAIN_POTENTIAL_STAT.XENON_EPIC;
            if (statPercent >= criteria.ENDGAME) return "에픽 종결";
            if (statPercent >= criteria.STANDARD) return "정옵";
            if (statPercent >= criteria.PASS) return GRADE_LABELS.PASS;
            return GRADE_LABELS.POOR;
        }

        const criteria = MAIN_POTENTIAL_STAT.EPIC;
        if (statPercent >= criteria.PERFECT) return GRADE_LABELS.SUPERIOR;
        if (statPercent >= criteria.UNIQUE_LEVEL) return GRADE_LABELS.EXCELLENT;
        if (statPercent >= criteria.DECENT) return GRADE_LABELS.DECENT;
        if (statPercent >= criteria.PASS) return GRADE_LABELS.PASS;
        if (statPercent >= criteria.GROWTH) return GRADE_LABELS.NORMAL;
        return GRADE_LABELS.POOR;
    }

    return GRADE_LABELS.NORMAL;
}

/**
 * 에디셔널 잠재 스탯 %에 따른 평가 등급 반환
 */
export function getAdditionalPotentialGrade(
    statPercent: number,
    grade: '레전드리' | '유니크' | '에픽'
): string {
    if (grade === '레전드리') {
        const criteria = ADDITIONAL_POTENTIAL_STAT.LEGENDARY;
        if (statPercent >= criteria.EXCELLENT) return GRADE_LABELS.EXCELLENT;
        if (statPercent >= criteria.GREAT) return GRADE_LABELS.SUPERIOR;
        if (statPercent >= criteria.DECENT) return GRADE_LABELS.DECENT;
        return GRADE_LABELS.LACKING;
    }

    if (grade === '유니크') {
        const criteria = ADDITIONAL_POTENTIAL_STAT.UNIQUE;
        if (statPercent >= criteria.EXCELLENT) return GRADE_LABELS.EXCELLENT;
        if (statPercent >= criteria.DECENT) return GRADE_LABELS.DECENT;
        return GRADE_LABELS.LACKING;
    }

    if (grade === '에픽') {
        const criteria = ADDITIONAL_POTENTIAL_STAT.EPIC;
        if (statPercent >= criteria.EXCELLENT) return GRADE_LABELS.EXCELLENT;
        if (statPercent >= criteria.DECENT) return GRADE_LABELS.DECENT;
        return GRADE_LABELS.LACKING;
    }

    return GRADE_LABELS.NORMAL;
}
