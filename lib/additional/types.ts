// ================================================================
// 에디셔널 잠재능력 옵션 타입 정의
// ================================================================

export interface AdditionalPotentialOption {
    option_name: string;
    probability: number;  // 확률 (%)
}

export interface AdditionalPotentialOptionPool {
    potential_grade: '레어' | '에픽' | '유니크' | '레전드리';
    equipment_type: '무기' | '방어구' | '장신구';
    level_range: string;  // 예: "120~200"
    line_position: 1 | 2 | 3;
    options: AdditionalPotentialOption[];
}

export type AdditionalPotentialGrade = '레어' | '에픽' | '유니크' | '레전드리';
export type AdditionalEquipmentType = '무기' | '방어구' | '장신구';
export type AdditionalLinePosition = 1 | 2 | 3;
