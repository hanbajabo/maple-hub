import { JobType } from './Unit';

export interface SynergyBonus {
    job: JobType;
    count: number;
    description: string;
    apply: (stats: any) => void;
}

export const SYNERGIES: SynergyBonus[] = [
    // ⚔️ 전사 (Warrior): 방어력 증가
    {
        job: 'WARRIOR',
        count: 2,
        description: '전사 (2): 방어력 +20',
        apply: (stats) => { stats.def += 20; }
    },
    {
        job: 'WARRIOR',
        count: 4,
        description: '전사 (4): 방어력 +50',
        apply: (stats) => { stats.def += 50; }
    },
    {
        job: 'WARRIOR',
        count: 6,
        description: '전사 (6): 방어력 +100',
        apply: (stats) => { stats.def += 100; }
    },

    // 🏹 궁수 (Archer): 공격 속도 증가
    // Note: User said "Bowman", mapping to "ARCHER"
    {
        job: 'ARCHER',
        count: 2,
        description: '궁수 (2): 공격 속도 +15%',
        apply: (stats) => { stats.attackSpeed = Math.max(100, stats.attackSpeed * 0.85); }
    },
    {
        job: 'ARCHER',
        count: 4,
        description: '궁수 (4): 공격 속도 +35%',
        apply: (stats) => { stats.attackSpeed = Math.max(100, stats.attackSpeed * 0.65); }
    },

    // 🔮 마법사 (Magician): 스킬 데미지 증가 (Implemented as MP Recovery/Skill Power for now)
    // User asked for "Skill Dmg Increase". 
    // Currently Unit.ts doesn't have a "Skill Damage Multiplier" stat explicitly, 
    // but we can add one or simulate it. 
    // Let's add `skillDamageMultiplier` to UnitStats in Unit.ts later.
    // For now, I'll use a placeholder or add the property to the apply function assuming it exists.
    {
        job: 'MAGICIAN',
        count: 2,
        description: '마법사 (2): 스킬 데미지 +20%',
        apply: (stats) => { stats.skillDamageMultiplier = (stats.skillDamageMultiplier || 1) + 0.2; }
    },
    {
        job: 'MAGICIAN',
        count: 4,
        description: '마법사 (4): 스킬 데미지 +50%',
        apply: (stats) => { stats.skillDamageMultiplier = (stats.skillDamageMultiplier || 1) + 0.5; }
    },

    // 🗡️ 도적 (Thief): 치명타 확률 증가
    {
        job: 'THIEF',
        count: 2,
        description: '도적 (2): 치명타 확률 +10%',
        apply: (stats) => { stats.critRate += 10; }
    },
    {
        job: 'THIEF',
        count: 4,
        description: '도적 (4): 치명타 확률 +25%',
        apply: (stats) => { stats.critRate += 25; }
    }
];
