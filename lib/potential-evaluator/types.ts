// @ts-nocheck
/**
 * 잠재능력 평가 타입 정의
 */

export interface PotentialEvaluation {
    current_grade: '레어' | '에픽' | '유니크' | '레전드리' | '특수';
    target_grade: '레어' | '에픽' | '유니크' | '레전드리' | '특수';
    upgrade_rate: number;
    ceiling_count: number;
    ceiling_cost: number;
    avg_cost: number;
    options_score: number;
    good_options: string[];
    recommendation: string;
    evaluation: string;
}

export type EquipmentType = '무기' | '방어구' | '장신구' | '보조무기' | '엠블렘';
export type PotentialGrade = '레어' | '에픽' | '유니크' | '레전드리';
export type PotentialType = 'main' | 'additional';
