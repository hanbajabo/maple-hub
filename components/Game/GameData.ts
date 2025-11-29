import { JobType } from './Unit';

export interface UnitData {
    id: string;
    name: string;
    tier: number;
    job: JobType;
    attack: number;
    def: number;
    hp: number;
    speed: number;
    range: number;
    attackSpeed: number;
    critRate: number;
    critDamage: number;
    cost: number;
    color: string | number;
    skillName?: string;
    skillDesc?: string;
}

export interface UpgradeData {
    id: string;
    name: string;
    description: string;
    type: 'STAT' | 'SKILL';
    statType?: 'attack' | 'def' | 'hp' | 'speed' | 'attackSpeed' | 'critRate' | 'critDamage';
    value: number;
    cost: number;
    tier: number;
    color: string;
}

export const UPGRADE_DATABASE: Record<string, UpgradeData> = {
    'atk_1': { id: 'atk_1', name: '공격력 강화 I', description: '공격력 +10%', type: 'STAT', statType: 'attack', value: 0.1, cost: 2, tier: 1, color: '⚔️' },
    'aspd_1': { id: 'aspd_1', name: '공격속도 강화 I', description: '공격속도 +10%', type: 'STAT', statType: 'attackSpeed', value: 0.1, cost: 2, tier: 1, color: '⚡' },
    'hp_1': { id: 'hp_1', name: '체력 강화 I', description: '최대 체력 +15%', type: 'STAT', statType: 'hp', value: 0.15, cost: 2, tier: 1, color: '❤️' },
    'crit_1': { id: 'crit_1', name: '치명타 강화 I', description: '치명타 확률 +5%', type: 'STAT', statType: 'critRate', value: 5, cost: 3, tier: 1, color: '🎯' },
    'atk_2': { id: 'atk_2', name: '공격력 강화 II', description: '공격력 +25%', type: 'STAT', statType: 'attack', value: 0.25, cost: 4, tier: 2, color: '⚔️' },
    'def_2': { id: 'def_2', name: '방어력 강화 II', description: '방어력 +10', type: 'STAT', statType: 'def', value: 10, cost: 4, tier: 2, color: '🛡️' },
    'atk_3': { id: 'atk_3', name: '공격력 강화 III', description: '공격력 +50%', type: 'STAT', statType: 'attack', value: 0.5, cost: 8, tier: 3, color: '⚔️' },
};

export const UNIT_DATABASE: Record<string, UnitData> = {
    // Player Hero Classes (MapleStory Jobs)
    'hero': {
        id: 'hero', name: '초보자', tier: 1, job: 'WARRIOR',
        attack: 50, def: 10, hp: 1000, speed: 100, range: 150, attackSpeed: 1000,
        critRate: 5, critDamage: 150, cost: 0, color: '🤴',
        skillName: '기본 공격', skillDesc: '평범한 공격'
    },
    'hero_warrior': {
        id: 'hero_warrior', name: '히어로', tier: 3, job: 'WARRIOR',
        attack: 120, def: 30, hp: 2000, speed: 95, range: 150, attackSpeed: 800,
        critRate: 15, critDamage: 200, cost: 0, color: '⚔️',
        skillName: '레이징 블로우', skillDesc: '강력한 연속 베기'
    },
    'paladin': {
        id: 'paladin', name: '팔라딘', tier: 3, job: 'WARRIOR',
        attack: 100, def: 50, hp: 2500, speed: 85, range: 150, attackSpeed: 900,
        critRate: 10, critDamage: 180, cost: 0, color: '🛡️',
        skillName: '블래스트', skillDesc: '신성한 망치 공격'
    },
    'dark_knight': {
        id: 'dark_knight', name: '다크나이트', tier: 3, job: 'WARRIOR',
        attack: 110, def: 35, hp: 2200, speed: 90, range: 200, attackSpeed: 850,
        critRate: 12, critDamage: 190, cost: 0, color: '🗡️',
        skillName: '건틀릿 디몰리션', skillDesc: '창 휘두르기'
    },
    'bowmaster': {
        id: 'bowmaster', name: '보우마스터', tier: 3, job: 'ARCHER',
        attack: 90, def: 15, hp: 1400, speed: 120, range: 500, attackSpeed: 650,
        critRate: 25, critDamage: 220, cost: 0, color: '🏹',
        skillName: '애로우 플래터', skillDesc: '화살 폭격'
    },
    'marksman': {
        id: 'marksman', name: '신궁', tier: 3, job: 'ARCHER',
        attack: 95, def: 12, hp: 1300, speed: 115, range: 600, attackSpeed: 700,
        critRate: 30, critDamage: 230, cost: 0, color: '🎯',
        skillName: '피어싱 애로우', skillDesc: '관통 화살'
    },
    'night_lord': {
        id: 'night_lord', name: '나이트로드', tier: 3, job: 'THIEF',
        attack: 85, def: 10, hp: 1200, speed: 150, range: 300, attackSpeed: 550,
        critRate: 40, critDamage: 250, cost: 0, color: '🌙',
        skillName: '쿼드러플 스로우', skillDesc: '표창 4연타'
    },
    'shadower': {
        id: 'shadower', name: '섀도어', tier: 3, job: 'THIEF',
        attack: 80, def: 12, hp: 1250, speed: 145, range: 150, attackSpeed: 600,
        critRate: 35, critDamage: 240, cost: 0, color: '🥷',
        skillName: '암살', skillDesc: '은신 후 기습'
    },
    'arch_mage_fp': {
        id: 'arch_mage_fp', name: '아크메이지(불,독)', tier: 3, job: 'MAGICIAN',
        attack: 130, def: 8, hp: 1100, speed: 90, range: 450, attackSpeed: 1100,
        critRate: 18, critDamage: 270, cost: 0, color: '🔥',
        skillName: '메테오', skillDesc: '메테오 낙하'
    },
    'bishop': {
        id: 'bishop', name: '비숍', tier: 3, job: 'MAGICIAN',
        attack: 110, def: 10, hp: 1150, speed: 88, range: 400, attackSpeed: 1050,
        critRate: 15, critDamage: 250, cost: 0, color: '✨',
        skillName: '엔젤레이', skillDesc: '신성한 빛'
    },
    'buccaneer': {
        id: 'buccaneer', name: '바이퍼', tier: 3, job: 'PIRATE',
        attack: 105, def: 25, hp: 1800, speed: 110, range: 150, attackSpeed: 750,
        critRate: 20, critDamage: 210, cost: 0, color: '🥊',
        skillName: '더블 어퍼', skillDesc: '연속 어퍼컷'
    },

    // Enemies
    'snail': {
        id: 'snail', name: '달팽이', tier: 1, job: 'WARRIOR',
        attack: 10, def: 0, hp: 100, speed: 30, range: 50, attackSpeed: 2000,
        critRate: 0, critDamage: 100, cost: 1, color: '🐌'
    },
    'slime': {
        id: 'slime', name: '슬라임', tier: 1, job: 'THIEF',
        attack: 20, def: 0, hp: 200, speed: 50, range: 50, attackSpeed: 1500,
        critRate: 0, critDamage: 100, cost: 1, color: '🟢'
    },
    'stump': {
        id: 'stump', name: '뿔버섯', tier: 1, job: 'WARRIOR',
        attack: 25, def: 3, hp: 300, speed: 35, range: 50, attackSpeed: 1800,
        critRate: 0, critDamage: 100, cost: 1, color: '🍄'
    },
    'mushroom': {
        id: 'mushroom', name: '주황버섯', tier: 1, job: 'WARRIOR',
        attack: 30, def: 5, hp: 400, speed: 40, range: 50, attackSpeed: 1200,
        critRate: 0, critDamage: 100, cost: 1, color: '🍄'
    }
};

export const LEVEL_XP_TABLE = {
    1: 2,
    2: 2,
    3: 6,
    4: 10,
    5: 20,
    6: 32,
    7: 50,
    8: 80,
    9: 120
};

export const SHOP_PROBABILITIES = {
    1: [100, 0, 0],
    2: [80, 20, 0],
    3: [60, 35, 5],
    4: [40, 50, 10],
    5: [20, 60, 20]
};
