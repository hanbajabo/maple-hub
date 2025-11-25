// ================================================================
// 에디셔널 잠재능력 옵션 - 통합 Export & 유틸리티 함수
// ================================================================

export * from './types';
export { ADDITIONAL_RARE_WEAPON_120_200 } from './rare';
export { ADDITIONAL_EPIC_WEAPON_120_200 } from './epic';
export { ADDITIONAL_UNIQUE_WEAPON_120_200 } from './unique';
export { ADDITIONAL_LEGENDARY_WEAPON_120_200 } from './legendary';

import { AdditionalPotentialOption, AdditionalPotentialGrade, AdditionalEquipmentType, AdditionalLinePosition } from './types';
import { ADDITIONAL_RARE_WEAPON_120_200 } from './rare';
import { ADDITIONAL_EPIC_WEAPON_120_200 } from './epic';
import { ADDITIONAL_UNIQUE_WEAPON_120_200 } from './unique';
import { ADDITIONAL_LEGENDARY_WEAPON_120_200 } from './legendary';

/**
 * 특정 조건의 에디셔널 잠재능력 옵션 풀 조회
 */
export function getAdditionalPotentialOptionPool(
    grade: AdditionalPotentialGrade,
    equipmentType: AdditionalEquipmentType,
    levelRange: string,
    linePosition: AdditionalLinePosition
): AdditionalPotentialOption[] {
    // 무기 120~200 레벨
    if (equipmentType === '무기' && levelRange === '120~200') {
        let dataSource;

        if (grade === '레어') dataSource = ADDITIONAL_RARE_WEAPON_120_200;
        else if (grade === '에픽') dataSource = ADDITIONAL_EPIC_WEAPON_120_200;
        else if (grade === '유니크') dataSource = ADDITIONAL_UNIQUE_WEAPON_120_200;
        else if (grade === '레전드리') dataSource = ADDITIONAL_LEGENDARY_WEAPON_120_200;
        else return [];

        const pool = dataSource.find(p => p.line_position === linePosition);
        return pool?.options ?? [];
    }

    return [];
}

/**
 * 특정 에디셔널 옵션의 확률 조회
 */
export function getAdditionalPotentialOptionProbability(
    grade: AdditionalPotentialGrade,
    equipmentType: AdditionalEquipmentType,
    levelRange: string,
    linePosition: AdditionalLinePosition,
    optionName: string
): number {
    const pool = getAdditionalPotentialOptionPool(grade, equipmentType, levelRange, linePosition);
    const option = pool.find(opt => opt.option_name === optionName);
    return option?.probability ?? 0;
}
