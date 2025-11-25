import { EquipmentItem } from './types';
import { getJobInfo } from './constants';

export const checkSetItems = (equipment: EquipmentItem[], keywords: string[], excludeKeywords: string[] = []) => {
    const cleanKeywords = keywords.map(k => k.replace(/\s+/g, ""));
    const cleanExcludes = excludeKeywords.map(k => k.replace(/\s+/g, ""));

    return equipment.filter(item => {
        const name = item.item_name;
        if (!name) return false;
        const cleanName = name.replace(/\s+/g, "");

        if (cleanExcludes.some(k => cleanName.includes(k))) return false;

        return cleanKeywords.some(k => cleanName.includes(k));
    }).length;
};

export const calcStatScore = (option: any, jobName: string) => {
    if (!option) return 0;
    const isDA = jobName === "데몬어벤져";
    const isXenon = jobName === "제논";

    const attVal = parseInt(option.attack_power || "0") + parseInt(option.magic_power || "0");
    const allStatVal = parseInt(option.all_stat || "0");

    if (isDA) {
        const hp = parseInt(option.max_hp || "0");
        return Math.floor(hp / 17.5) + (attVal * 4);
    } else if (isXenon) {
        const str = parseInt(option.str || "0");
        const dex = parseInt(option.dex || "0");
        const luk = parseInt(option.luk || "0");
        return (str + dex + luk) + (attVal * 4) + (allStatVal * 20);
    } else {
        const mainStatVal = parseInt(option[getJobInfo(jobName).mainStat.toLowerCase()] || "0");
        return mainStatVal + (attVal * 4) + (allStatVal * 10);
    }
};

export const getScrollStat = (item: any, statKey: string, jobName: string) => {
    const opt = item.item_etc_option;
    if (!opt) return 0;

    const isDA = jobName === "데몬어벤져";
    const isXenon = jobName === "제논";

    if (isDA) {
        const hp = parseInt(opt.max_hp || "0");
        return Math.floor(hp / 50);
    } else if (isXenon) {
        const s = parseInt(opt.str || "0");
        const d = parseInt(opt.dex || "0");
        const l = parseInt(opt.luk || "0");
        return Math.floor((s + d + l) / 3);
    } else {
        return parseInt(opt[statKey] || "0");
    }
};
