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
}
