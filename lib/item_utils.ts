import { getZeroWeaponTier } from './zero_weapon_db';

// ============================================================================
// Item UI Helper Functions
// ============================================================================

export const getGradeColor = (grade: string) => {
    switch (grade) {
        case "레전드리": return "text-green-400";
        case "유니크": return "text-yellow-400";
        case "에픽": return "text-purple-400";
        case "레어": return "text-blue-400";
        default: return "text-gray-400";
    }
};

export const getGradeBorderColor = (grade: string) => {
    switch (grade) {
        case "레전드리": return "border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.1)]";
        case "유니크": return "border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.1)]";
        case "에픽": return "border-purple-500/50";
        case "레어": return "border-blue-500/50";
        default: return "border-slate-800";
    }
};

export const getGradeBgColor = (grade: string) => {
    switch (grade) {
        case "레전드리": return "bg-green-500/5";
        case "유니크": return "bg-yellow-500/5";
        case "에픽": return "bg-purple-500/5";
        case "레어": return "bg-blue-500/5";
        default: return "bg-transparent";
    }
};

export const getAddOptions = (item: any) => {
    const opts = [];
    const add = item.item_add_option;
    if (!add) return [];

    if (add.str !== "0") opts.push(`STR +${add.str}`);
    if (add.dex !== "0") opts.push(`DEX +${add.dex}`);
    if (add.int !== "0") opts.push(`INT +${add.int}`);
    if (add.luk !== "0") opts.push(`LUK +${add.luk}`);
    if (add.max_hp !== "0") opts.push(`HP +${add.max_hp}`);
    if (add.attack_power !== "0") opts.push(`공격력 +${add.attack_power}`);
    if (add.magic_power !== "0") opts.push(`마력 +${add.magic_power}`);
    if (add.boss_damage !== "0") opts.push(`보공 +${add.boss_damage}%`);
    if (add.damage !== "0") opts.push(`데미지 +${add.damage}%`);
    if (add.all_stat !== "0") opts.push(`올스탯 +${add.all_stat}%`);

    return opts;
};

export const getEtcOptions = (item: any) => {
    const opts = [];
    const etc = item.item_etc_option;
    if (!etc) return [];

    if (etc.str !== "0") opts.push(`STR +${etc.str}`);
    if (etc.dex !== "0") opts.push(`DEX +${etc.dex}`);
    if (etc.int !== "0") opts.push(`INT +${etc.int}`);
    if (etc.luk !== "0") opts.push(`LUK +${etc.luk}`);
    if (etc.max_hp !== "0") opts.push(`HP +${etc.max_hp}`);
    if (etc.attack_power !== "0") opts.push(`공격력 +${etc.attack_power}`);
    if (etc.magic_power !== "0") opts.push(`마력 +${etc.magic_power}`);
    if (etc.armor !== "0") opts.push(`방어력 +${etc.armor}`);
    if (etc.speed !== "0") opts.push(`이동속도 +${etc.speed}`);
    if (etc.jump !== "0") opts.push(`점프력 +${etc.jump}`);

    return opts;
};

// Helper to calculate Weapon Tier (추옵 등급)
export const getWeaponTier = (level: number, base: number, add: number) => {
    if (base <= 0 || add <= 0) return null;
    const k = Math.floor(level / 40) + 1;
    for (let step = 7; step >= 3; step--) {
        const multiplier = Math.pow(1.1, step - 3);
        const percentage = k * step * multiplier;
        const calculated = Math.ceil((base * percentage) / 100);
        if (Math.abs(calculated - add) <= 1) {
            return 8 - step;
        }
    }
    return null;
};

export const getWeaponTierLabel = (item: any) => {
    if (!item.item_base_option || !item.item_add_option) return null;

    // Zero Weapon Logic
    if (item.item_name && (item.item_name.includes('라즐리') || item.item_name.includes('라피스'))) {
        const addAtt = Number(item.item_add_option.attack_power);
        const tier = getZeroWeaponTier(item.item_name, addAtt);

        if (tier >= 1 && tier <= 5) {
            let suffix = "";
            if (item.item_add_option.boss_damage !== "0") suffix += "보";
            if (item.item_add_option.damage !== "0") suffix += "뎀";
            if (item.item_add_option.all_stat !== "0") suffix += "올";
            if (suffix) suffix = " " + suffix;
            return `${tier}추${suffix}`;
        }
        return null;
    }

    if (item.item_equipment_slot !== "무기") return null;

    const level = item.item_base_option.base_equipment_level;
    const baseAtt = Number(item.item_base_option.attack_power);
    const baseMagic = Number(item.item_base_option.magic_power);
    const addAtt = Number(item.item_add_option.attack_power);
    const addMagic = Number(item.item_add_option.magic_power);

    const attTier = getWeaponTier(level, baseAtt, addAtt);
    const magicTier = getWeaponTier(level, baseMagic, addMagic);

    let suffix = "";
    if (item.item_add_option.boss_damage !== "0") suffix += "보";
    if (item.item_add_option.damage !== "0") suffix += "뎀";
    if (item.item_add_option.all_stat !== "0") suffix += "올";

    if (suffix) suffix = " " + suffix;

    if (attTier) return `${attTier}추${suffix}`;
    if (magicTier) return `${magicTier}추${suffix}`;
    return null;
};

export const getArmorScoreLabel = (item: any) => {
    if (item.item_equipment_slot === '무기') return null;
    const add = item.item_add_option;
    if (!add) return null;
    if (Object.values(add).every(val => val === "0")) return null;

    const str = Number(add.str) || 0;
    const dex = Number(add.dex) || 0;
    const int = Number(add.int) || 0;
    const luk = Number(add.luk) || 0;
    const hp = Number(add.max_hp) || 0;
    const att = Number(add.attack_power) || 0;
    const magic = Number(add.magic_power) || 0;
    const allStat = Number(add.all_stat) || 0;

    const scoreSTR = str + (att * 4) + (allStat * 10);
    const scoreDEX = dex + (att * 4) + (allStat * 10);
    const scoreINT = int + (magic * 4) + (allStat * 10);
    const scoreLUK = luk + (att * 4) + (allStat * 10);
    const scoreHP = (hp / 21) + (att * 4) + (allStat * 10);

    const maxScore = Math.max(scoreSTR, scoreDEX, scoreINT, scoreLUK, scoreHP);
    if (maxScore <= 0) return null;
    return `${Math.floor(maxScore)}급`;
};
