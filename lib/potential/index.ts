// ================================================================
// 잠재능력 옵션 - 통합 Export & 유틸리티 함수
// ================================================================

export * from './types';
export { RARE_WEAPON_120_200 } from './rare';
export { EPIC_WEAPON_120_200 } from './epic';
export { UNIQUE_WEAPON_120_200 } from './unique';
export { LEGENDARY_WEAPON_120_200 } from './legendary';

import { PotentialOption, PotentialGrade, EquipmentType, LinePosition } from './types';
import { RARE_WEAPON_120_200 } from './rare';
import { EPIC_WEAPON_120_200 } from './epic';
import { UNIQUE_WEAPON_120_200 } from './unique';
import { LEGENDARY_WEAPON_120_200 } from './legendary';

/**
 * 특정 조건의 잠재능력 옵션 풀 조회
 */
export function getPotentialOptionPool(
    grade: PotentialGrade,
    equipmentType: EquipmentType,
    levelRange: string,
    linePosition: LinePosition
): PotentialOption[] {
    // 무기 120~200 레벨
    if (equipmentType === '무기' && levelRange === '120~200') {
        let dataSource;

        if (grade === '레어') dataSource = RARE_WEAPON_120_200;
        else if (grade === '에픽') dataSource = EPIC_WEAPON_120_200;
        else if (grade === '유니크') dataSource = UNIQUE_WEAPON_120_200;
        else if (grade === '레전드리') dataSource = LEGENDARY_WEAPON_120_200;
        else return [];

        const pool = dataSource.find(p => p.line_position === linePosition);
        return pool?.options ?? [];
    }

    return [];
}

/**
 * 특정 옵션의 확률 조회
 */
export function getPotentialOptionProbability(
    grade: PotentialGrade,
    equipmentType: EquipmentType,
    levelRange: string,
    linePosition: LinePosition,
    optionName: string
): number {
    const pool = getPotentialOptionPool(grade, equipmentType, levelRange, linePosition);
    const option = pool.find(opt => opt.option_name === optionName);
    return option?.probability ?? 0;
}
