export interface BossDiagnosisProps {
    equipment: any[];
    stat: any;
    basic: any;
}

export interface CharacterInfo {
    character_class: string;
    character_level: number;
}

export interface EquipmentItem {
    item_equipment_slot: string;
    item_name: string;
    starforce: string;
    starforce_scroll_flag: string;
    scroll_upgrade: string;
    item_add_option: any;
    item_etc_option: any;
    potential_option_grade: string;
    additional_potential_option_grade: string;
    potential_option_1: string;
    potential_option_2: string;
    potential_option_3: string;
    additional_potential_option_1: string;
    additional_potential_option_2: string;
    additional_potential_option_3: string;
    item_icon: string;
}

export type IssueType =
    | 'starforce'
    | 'potential'
    | 'additional'
    | 'set_effect'
    | 'wse_emblem'
    | 'wse_weapon'
    | 'wse_sub'
    | 'wse_secondary'
    | 'wse_ring'
    | 'armor_direction'
    | 'growth_starforce'
    | 'growth_scroll'
    | 'growth_flame'
    | 'growth_potential'
    | 'growth_additional'
    | 'wrong_preset'
    | 'optimization';

export interface Issue {
    type: IssueType;
    message: string;
    detail?: string;
}

export const GRADE_SCORE: { [key: string]: number } = {
    "노멀": 0, "레어": 1, "에픽": 2, "유니크": 3, "레전드리": 4
};

export interface BossDiagnosisResult {
    stage: number;
    issues: Issue[];
    attTypeKor: string;
    setCounts: {
        bossSetCount: number;
        dawnSetCount: number;
        pitchedSetCount: number;
        meisterSetCount: number;
        brilliantSetCount: number;
    };
    passedArmorOption: string | null;
    isGenesisWeapon: boolean;
    stage4Stats: any;
    stage5Stats?: {
        hat: string;
        ring: string;
        cooldownSeconds: number;
        hasRestraint: boolean;
        hasContinuous: boolean;
        hatNote?: string;
        ringNote?: string;
    };
    stage6Stats?: {
        armor: {
            starforce: { current: number; total: number; failedItems: string[] };
            scroll: { current: number; total: number; failedItems: string[] };
            flame: { current: number; total: number; failedItems: string[] };
            potential: { current: number; total: number; failedItems: string[] };
            additional: { current: number; total: number; failedItems: string[] };
        };
        accessory: {
            starforce: { current: number; total: number; failedItems: string[] };
            scroll: { current: number; total: number; failedItems: string[] };
            flame: { current: number; total: number; failedItems: string[] };
            potential: { current: number; total: number; failedItems: string[] };
            additional: { current: number; total: number; failedItems: string[] };
        };
    };
    stage7Info?: {
        currentCombination: string;
        isCompleted: boolean;
        counts: {
            cra: number;
            absol: number;
            arcane: number;
            eternal: number;
        };
    };
    stage8Stats?: {
        cra22Count: number;
        absol22Count: number;
        arcane22Count: number;
        eternal17Count: number;
        satisfiedSetCount: number;
        isEternal4SetSatisfied: boolean;
    };
}
