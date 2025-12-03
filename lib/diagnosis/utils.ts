import { EquipmentItem } from './types';

// 시드링 레벨 추출 헬퍼
export function getSeedRingLevel(item: EquipmentItem): number {
    const name = item.item_name || "";
    // 1. 이름에서 추출
    const m1 = name.match(/(\d+)레벨/);
    if (m1) return parseInt(m1[1]);

    // 2. special_ring_level 필드 확인 (API 원본 데이터)
    if (item.special_ring_level) return item.special_ring_level;

    // 3. 잠재능력/에디셔널/설명에서 추출 (스킬 정보가 여기에 있을 수 있음)
    const texts = [
        item.potential_option_1,
        item.potential_option_2,
        item.potential_option_3,
        item.additional_potential_option_1,
        item.additional_potential_option_2,
        item.additional_potential_option_3,
        item.item_description
    ];

    for (const t of texts) {
        if (!t) continue;
        // "Lv.4" 또는 "4레벨" 패턴 찾기
        const m2 = t.match(/Lv\.(\d+)/i) || t.match(/(\d+)레벨/);
        if (m2) return parseInt(m2[1]);
    }
    return 0;
}

// 스타포스 수치 안전하게 가져오기
export function getStarforce(item: EquipmentItem): number {
    return parseInt(item.starforce || "0");
}

// 잠재능력 등급 점수 변환
export function getPotentialGradeScore(grade?: string): number {
    if (!grade) return 0;
    if (grade === "레전드리" || grade === "Legendary") return 4;
    if (grade === "유니크" || grade === "Unique") return 3;
    if (grade === "에픽" || grade === "Epic") return 2;
    if (grade === "레어" || grade === "Rare") return 1;
    return 0;
}

// 잠재능력 라인에서 스탯 % 추출
export function parseStatPercent(line?: string): number {
    if (!line) return 0;
    const m = line.match(/(\d+)%/);
    // 데몬어벤져: "최대 HP +12%", 일반 직업: "STR +12%", 제논: "올스탯 +12%"
    if (m && (
        line.includes('STR') ||
        line.includes('DEX') ||
        line.includes('INT') ||
        line.includes('LUK') ||
        line.includes('올스탯') ||
        line.includes('모든 스탯') ||
        line.includes('최대 HP') ||
        line.includes('HP')
    )) {
        return parseInt(m[1]);
    }
    // 레벨당 스탯 처리
    if (line.includes('레벨') && line.includes('당')) {
        if (line.includes('+2')) return 6; // 대략적인 % 환산
        if (line.includes('+1')) return 3;
    }
    return 0;
}

// 추가옵션 점수 계산 (직업별 주스탯 자동 판별)
export function calculateFlameScore(item: EquipmentItem, job?: string): number {
    if (!item.item_add_option) return 0;
    const addOpts = item.item_add_option;

    const str = parseInt(addOpts.str || "0");
    const dex = parseInt(addOpts.dex || "0");
    const int_val = parseInt(addOpts.int || "0");
    const luk = parseInt(addOpts.luk || "0");
    const hp = parseInt(addOpts.max_hp || "0");
    const att = parseInt(addOpts.attack_power || "0");
    const mag = parseInt(addOpts.magic_power || "0");
    const allStat = parseInt(addOpts.all_stat || "0");

    // 직업별 주스탯을 모를 경우, 가장 높은 점수를 반환 (자동 판별)
    // 깡추옵 + 공마*4 + 올스탯*10
    const scoreSTR = str + (att * 4) + (allStat * 10);
    const scoreDEX = dex + (att * 4) + (allStat * 10);
    const scoreINT = int_val + (mag * 4) + (allStat * 10);
    const scoreLUK = luk + (att * 4) + (allStat * 10);
    // HP는 21당 주스탯 1 효율 (데몬어벤져 등)
    const scoreHP = Math.floor(hp / 21) + (att * 4) + (allStat * 10);

    // 제논 (STR+DEX+LUK) - 제논은 추옵 계산이 복잡하므로 일단 단순 합산이나 별도 로직 필요
    // 여기서는 일반적인 단일 스탯 직업 기준으로 최대값 반환
    return Math.floor(Math.max(scoreSTR, scoreDEX, scoreINT, scoreLUK, scoreHP));
}

// 잠재능력 총합 계산
export function getPotentialTotal(item: EquipmentItem, targetKeywords: string[]): number {
    const lines = [
        item.potential_option_1,
        item.potential_option_2,
        item.potential_option_3
    ].filter((s): s is string => !!s);

    let total = 0;
    lines.forEach(line => {
        if (targetKeywords.some(k => line.includes(k))) {
            total += parseStatPercent(line);
        }
    });
    return total;
}
