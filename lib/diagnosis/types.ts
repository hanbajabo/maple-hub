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

export interface EquipmentItem {
    item_name: string;
    item_equipment_slot: string;
    item_icon: string;
    starforce: string;
    starforce_scroll_flag: string;
    potential_option_grade: string;
    additional_potential_option_grade: string;
    potential_option_1?: string;
    potential_option_2?: string;
    potential_option_3?: string;
    additional_potential_option_1?: string;
    additional_potential_option_2?: string;
    additional_potential_option_3?: string;
    item_etc_option?: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        armor: string;
        speed: string;
        jump: string;
    };
    item_add_option?: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        armor: string;
        speed: string;
        jump: string;
        boss_damage: string;
        damage: string;
        all_stat: string;
    };
    item_base_option?: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        armor: string;
        speed: string;
        jump: string;
        boss_damage: string;
        ignore_monster_armor: string;
        all_stat: string;
        max_hp_rate: string;
        max_mp_rate: string;
        base_equipment_level: number;
    };
    item_starforce_option?: {
        str: string;
        dex: string;
        int: string;
        luk: string;
        max_hp: string;
        max_mp: string;
        attack_power: string;
        magic_power: string;
        armor: string;
        speed: string;
        jump: string;
    };
    scroll_upgrade?: string;
    item_description?: string;
    special_ring_level?: number;
}
