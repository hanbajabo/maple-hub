// 장비 진단 등급 (메이플 잠재능력 색상 체계)
export type DiagnosisGrade = 'SS' | 'S' | 'A' | 'B' | 'C' | 'F';

export interface DiagnosisResult {
    bad: string[];
    good: string[];
    scoreDeduction: number;
}

export interface EquipmentReport {
    starforce: string[];
    potential: string[];
    additional: string[];
    general: string[];
    good: string[];
    scoreDeduction: number;
    itemGrades: Record<string, DiagnosisGrade>;
}
