import React from 'react';

interface StageCardProps {
    stageInfo: {
        id: number;
        title: string;
        description: string;
        color: string;
    };
    isCurrent: boolean;
    isPassed: boolean;
    isExpanded: boolean;
    onToggle: (id: number) => void;
    attTypeKor?: string;
    setCounts?: any;
    passedArmorOption?: string;
    isGenesisWeapon?: boolean;
    stage4Stats?: {
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
    stage5Stats?: {
        hat: string;
        ring: string;
        cooldownSeconds: number;
        hasRestraint: boolean;
        hasContinuous: boolean;
        hatNote?: string;
        ringNote?: string;
        recommendedHatType?: string;
        recommendedRingType?: string;
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
    onPass?: () => void;
    equipment?: any[];
}

export const StageCard: React.FC<StageCardProps> = ({
    stageInfo, isCurrent, isPassed, isExpanded, onToggle, attTypeKor, setCounts, passedArmorOption, isGenesisWeapon, stage4Stats, stage5Stats, stage6Stats, stage7Info, stage8Stats, onPass, equipment
}) => {
    const [expandedItemSlot, setExpandedItemSlot] = React.useState<string | null>(null);
    const [expandedPassedItem, setExpandedPassedItem] = React.useState<any | null>(null);
    const [expandedFailedItem, setExpandedFailedItem] = React.useState<any | null>(null);



    // Ring Logic
    const passedRings = React.useMemo(() => {
        if (!equipment) return [];
        const rings = equipment.filter(i => i.item_equipment_slot && i.item_equipment_slot.includes("반지"));

        const getGradeScore = (grade: string) => {
            if (grade === "레전드리") return 4;
            if (grade === "유니크") return 3;
            if (grade === "에픽") return 2;
            if (grade === "레어") return 1;
            return 0;
        };

        const getStatPercent = (lines: string[]) => {
            const stats = { STR: 0, DEX: 0, INT: 0, LUK: 0, HP: 0, ALL: 0 };
            lines.forEach(l => {
                if (!l) return;
                const match = l.match(/(\d+)%/);
                if (!match) return;
                const val = parseInt(match[1]);
                if (l.includes("올스탯")) stats.ALL += val;
                else if (l.includes("STR")) stats.STR += val;
                else if (l.includes("DEX")) stats.DEX += val;
                else if (l.includes("INT")) stats.INT += val;
                else if (l.includes("LUK")) stats.LUK += val;
                else if (l.includes("HP")) stats.HP += val;
            });
            return Math.max(stats.STR, stats.DEX, stats.INT, stats.LUK, stats.HP) + stats.ALL;
        };

        const hasAttOrStatAdd = (lines: string[], minStatPct: number) => {
            return lines.some(l => {
                if (!l) return false;
                if (l.includes("공격력") || l.includes("마력")) {
                    const m = l.match(/\+(\d+)/);
                    if (m && parseInt(m[1]) >= 10) return true;
                }
                if (l.includes("%")) {
                    if (l.includes("STR") || l.includes("DEX") || l.includes("INT") || l.includes("LUK") || l.includes("HP") || l.includes("올스탯")) {
                        const m = l.match(/(\d+)%/);
                        if (m && parseInt(m[1]) >= minStatPct) return true;
                    }
                }
                return false;
            });
        };

        return rings.filter(ring => {
            const name = ring.item_name || "";
            const potGrade = getGradeScore(ring.potential_option_grade);
            const adiGrade = getGradeScore(ring.additional_potential_option_grade);
            const potLines = [ring.potential_option_1, ring.potential_option_2, ring.potential_option_3];
            const adiLines = [ring.additional_potential_option_1, ring.additional_potential_option_2, ring.additional_potential_option_3];

            // 1. Special Ring
            if (["리스트레인트", "웨폰퍼프", "리스크테이커", "컨티뉴어스"].some(k => name.includes(k))) return true;

            // 2. Event Ring
            if (["테네브리스", "어웨이크", "글로리온", "카오스", "벤젼스", "쥬얼링", "플레임"].some(k => name.includes(k))) {
                const potPass = potGrade >= 3 && getStatPercent(potLines) >= 15;
                const adiPass = adiGrade >= 1 && hasAttOrStatAdd(adiLines, 4);
                return potPass && adiPass;
            }

            // 3. High Spec Ring (Others)
            const potPass = potGrade >= 3 && getStatPercent(potLines) >= 21;
            const adiPass = adiGrade >= 2 && hasAttOrStatAdd(adiLines, 4);
            return potPass && adiPass;
        });
    }, [equipment]);

    // State for expanded passed item detail view (Moved to top)

    // Helper to get passed items for each stage
    const getPassedItems = (stageId: number) => {
        if (!equipment) return [];
        return equipment.filter(item => {
            const slot = item.item_equipment_slot || "";
            const name = item.item_name || "";
            const star = parseInt(item.starforce || "0");
            const potGrade = item.potential_option_grade;
            const adiGrade = item.additional_potential_option_grade;
            const potScore = (grade: string) => {
                if (!grade) return 0;
                if (grade === "레전드리" || grade === "Legendary") return 4;
                if (grade === "유니크" || grade === "Unique") return 3;
                if (grade === "에픽" || grade === "Epic") return 2;
                if (grade === "레어" || grade === "Rare") return 1;
                return 0;
            };

            // Stage 1: Basic Setting
            if (stageId === 0) {
                if (["뱃지", "포켓 아이템", "훈장", "엠블렘", "보조무기"].includes(slot)) return false;
                const isEyeFace = slot === "눈장식" || slot === "얼굴장식";
                const isFairyHeart = name.includes("페어리 하트");
                const targetStar = (isEyeFace || isFairyHeart) ? 8 : 12;

                if (slot.includes("반지")) return false;
                if (star < targetStar) return false;
                if (potScore(potGrade) < 2) return false;
                if (potScore(adiGrade) < 1) return false;
                return true;
            }

            // Stage 5: 17-star (모든 기준 통과 필요)
            if (stageId === 4) {
                // 방어구/장신구만 포함
                const armorSlots = ["모자", "상의", "하의", "상의(한벌옷)", "신발", "장갑", "망토"];
                const accessorySlots = ["반지1", "반지2", "반지3", "반지4", "펜던트", "펜던트2", "얼굴장식", "눈장식", "귀고리", "벨트", "어깨장식"];
                let isArmor = armorSlots.includes(slot);
                let isAccessory = accessorySlots.includes(slot) || slot.includes("반지");
                if (name.includes("숄더") || name.includes("견장")) { isArmor = false; isAccessory = true; }

                if (!isArmor && !isAccessory) return false;

                // 도전자 아이템은 무조건 통과
                if (name.includes("도전자")) return true;

                // 1. 스타포스 체크
                const specialRingKeywords = ["리스트레인트", "웨폰퍼프", "리스크테이커", "컨티뉴어스"];
                const isSpecialRing = slot.includes("반지") && specialRingKeywords.some(k => name.includes(k));
                const eventRingKeywords = ["테네브리스", "어웨이크", "글로리온", "카오스", "벤젼스", "쥬얼링", "플레임"];
                const isEventRing = slot.includes("반지") && eventRingKeywords.some(k => name.includes(k));
                const isTyrant = name.includes("타일런트");
                const isEternal = name.includes("에테르넬");
                const hasAmazingScroll = item.starforce_scroll_flag !== "0" && star > 0;

                let starforceThreshold = isTyrant ? 10 : 17;
                if (isEternal) starforceThreshold = 12;

                const isNoStarforce = item.starforce_scroll_flag === "0" && parseInt(item.starforce || "0") === 0;
                if (!isNoStarforce && !isEventRing) {
                    if (!isSpecialRing && !hasAmazingScroll && star < starforceThreshold) return false;
                }

                // 2. 주문서 작 체크 (글로리온 링 예외)
                if (!isSpecialRing && !name.includes("글로리온")) {
                    // 주스탯 계산
                    const str = parseInt(item.item_etc_option?.str || "0");
                    const dex = parseInt(item.item_etc_option?.dex || "0");
                    const int_val = parseInt(item.item_etc_option?.int || "0");
                    const luk = parseInt(item.item_etc_option?.luk || "0");
                    const att = parseInt(item.item_etc_option?.attack_power || "0");
                    const mag = parseInt(item.item_etc_option?.magic_power || "0");
                    const scrollMainStat = Math.max(str, dex, int_val, luk);

                    // 총급수 계산 (공/마 포함)
                    const scrollScore = str + dex + int_val + luk + att * 4 + mag * 4;

                    if (isArmor) {
                        const isHat = slot === "모자";
                        const threshold = isHat ? 84 : 56;
                        if (scrollMainStat < threshold && scrollScore < 50) return false;
                    } else {
                        if (scrollScore < 32) return false;
                    }
                }

                // 3. 추가옵션 체크 (반지, 숄더 제외) - 100급 이상
                const isNoFlame = slot.includes("반지") || name.includes("숄더") || name.includes("견장");
                if (!isNoFlame) {
                    if (!item.item_add_option) return false;
                    // 추옵 점수 계산 (간단 버전)
                    const str = parseInt(item.item_add_option?.str || "0");
                    const dex = parseInt(item.item_add_option?.dex || "0");
                    const int_val = parseInt(item.item_add_option?.int || "0");
                    const luk = parseInt(item.item_add_option?.luk || "0");
                    const att = parseInt(item.item_add_option?.attack_power || "0");
                    const mag = parseInt(item.item_add_option?.magic_power || "0");
                    const allStat = parseInt(item.item_add_option?.all_stat || "0");
                    const hp = parseInt(item.item_add_option?.max_hp || "0");

                    const flameScore = str + dex + int_val + luk + att * 4 + mag * 4 + allStat * 10 + Math.floor(hp / 50);
                    if (flameScore < 100) return false;
                }

                // 4. 잠재능력 체크 (유니크 이상 & 주스탯 15% 이상)
                if (!isSpecialRing) {
                    const potLines = [item.potential_option_1, item.potential_option_2, item.potential_option_3];
                    const hasCritDmg = potLines.some(l => l && l.includes("크리티컬 데미지"));
                    const hasCooldown = potLines.some(l => l && l.includes("재사용 대기시간"));

                    if (slot === "장갑" && hasCritDmg) {
                        // Pass
                    } else if (slot === "모자" && hasCooldown) {
                        // Pass
                    } else {
                        if (potScore(potGrade) < 3) return false; // 유니크 미만

                        // 주스탯% 체크
                        const statKeywords = ["STR", "DEX", "INT", "LUK", "HP", "올스탯"];
                        let totalStatPct = 0;
                        potLines.forEach(line => {
                            if (!line) return;
                            if (statKeywords.some(k => line.includes(k)) && line.includes("%")) {
                                const match = line.match(/(\d+)%/);
                                if (match) totalStatPct += parseInt(match[1]);
                            }
                        });
                        if (totalStatPct < 15) return false; // 주스탯 15% 미만
                    }
                }

                // 5. 에디셔널 체크 (레어+ & 공/마+10 또는 주스탯%)
                if (!isSpecialRing) {
                    const adiLines = [item.additional_potential_option_1, item.additional_potential_option_2, item.additional_potential_option_3];
                    const adiGradeScore = potScore(adiGrade);

                    if (slot.includes("반지")) {
                        const eventRingKeywords = ["테네브리스", "어웨이크", "글로리온", "카오스", "벤젼스", "쥬얼링", "플레임"];
                        const isEventRing = eventRingKeywords.some(k => name.includes(k));

                        if (isEventRing) {
                            // 이벤트링: 레어+ & (공/마+10 or 주스탯4%)
                            if (adiGradeScore < 1) return false;
                            const hasAtt10 = adiLines.some(l => l && (l.includes("공격력") || l.includes("마력")) && l.match(/\+(\d+)/) && parseInt(l.match(/\+(\d+)/)?.[1] || "0") >= 10);
                            const hasStat4 = adiLines.some(l => l && l.includes("%") && l.match(/(\d+)%/) && parseInt(l.match(/(\d+)%/)?.[1] || "0") >= 4);
                            if (!hasAtt10 && !hasStat4) return false;
                        } else {
                            // 일반링: 에픽+ & (공/마+10 or 주스탯%)
                            if (adiGradeScore < 2) return false;
                            const hasAtt10 = adiLines.some(l => l && (l.includes("공격력") || l.includes("마력")) && l.match(/\+(\d+)/) && parseInt(l.match(/\+(\d+)/)?.[1] || "0") >= 10);
                            const hasStatPct = adiLines.some(l => l && l.includes("%") && (l.includes("STR") || l.includes("DEX") || l.includes("INT") || l.includes("LUK") || l.includes("HP") || l.includes("올스탯")));
                            if (!hasAtt10 && !hasStatPct) return false;
                        }
                    } else {
                        // 일반 방어구/장신구: 에픽+ & (공/마+10 or 주스탯%)
                        if (adiGradeScore < 2) return false;
                        const hasAtt10 = adiLines.some(l => l && (l.includes("공격력") || l.includes("마력")) && l.match(/\+(\d+)/) && parseInt(l.match(/\+(\d+)/)?.[1] || "0") >= 10);
                        const hasStatPct = adiLines.some(l => l && l.includes("%") && (l.includes("STR") || l.includes("DEX") || l.includes("INT") || l.includes("LUK") || l.includes("HP") || l.includes("올스탯")));
                        if (!hasAtt10 && !hasStatPct) return false;
                    }
                }


                return true;
            }

            // Stage 7: 18-star (방어구 + 장신구만, 도전자 제외)
            if (stageId === 6) {
                // 방어구/장신구만 포함
                const armorSlots = ["모자", "상의", "하의", "상의(한벌옷)", "신발", "장갑", "망토"];
                const accessorySlots = ["반지1", "반지2", "반지3", "반지4", "펜던트", "펜던트2", "얼굴장식", "눈장식", "귀고리", "벨트", "어깨장식"];
                let isArmor = armorSlots.includes(slot);
                let isAccessory = accessorySlots.includes(slot) || slot.includes("반지");

                // 숄더는 장신구
                if (name.includes("숄더") || name.includes("견장")) {
                    isArmor = false;
                    isAccessory = true;
                }

                if (!isArmor && !isAccessory) return false;



                // 이벤트링 제외
                const eventRingKeywords = ["테네브리스", "어웨이크", "글로리온", "카오스", "벤젼스", "쥬얼링", "플레임"];
                const isEventRing = slot.includes("반지") && eventRingKeywords.some(k => name.includes(k));
                if (isEventRing) return false;

                // 특수반지는 통과
                const specialRingKeywords = ["리스트레인트", "웨폰퍼프", "리스크테이커", "컨티뉴어스"];
                const isSpecialRing = slot.includes("반지") && specialRingKeywords.some(k => name.includes(k));
                if (isSpecialRing) return true;

                // 에테르넬은 12성, 타일런트는 10성, 그 외는 18성
                const isEternal = name.includes("에테르넬");
                const isTyrant = name.includes("타일런트");
                let threshold = 18;
                if (isEternal) threshold = 12;
                if (isTyrant) threshold = 10;

                return star >= threshold;
            }

            // Stage 8: 22-star Combination (방어구만, 도전자 제외)
            if (stageId === 7) {
                if (name.includes("도전자")) return false;

                const armorSlots = ["모자", "상의", "하의", "상의(한벌옷)", "신발", "장갑", "망토", "어깨장식"];
                const isArmor = armorSlots.includes(slot);
                if (!isArmor) return false;

                const isEternal = name.includes("에테르넬");
                if (isEternal) return star >= 17;
                return star >= 22;
            }

            // Stage 9: 22-star Armor Setting (방어구만, 도전자 제외)
            if (stageId === 8) {
                if (name.includes("도전자")) return false;

                const armorSlots = ["모자", "상의", "하의", "상의(한벌옷)", "신발", "장갑", "망토", "어깨장식"];
                const isArmor = armorSlots.includes(slot);
                if (!isArmor) return false;

                const isEternal = name.includes("에테르넬");
                if (isEternal) return star >= 17;
                return star >= 22;
            }

            return false;
        });
    };

    const getFailedItems = (stageId: number) => {
        if (!equipment) return [];
        return equipment.filter(item => {
            const slot = item.item_equipment_slot || "";
            const name = item.item_name || "";
            const star = parseInt(item.starforce || "0");
            const potGrade = item.potential_option_grade;
            const adiGrade = item.additional_potential_option_grade;
            const potScore = (grade: string) => {
                if (!grade) return 0;
                if (grade === "레전드리" || grade === "Legendary") return 4;
                if (grade === "유니크" || grade === "Unique") return 3;
                if (grade === "에픽" || grade === "Epic") return 2;
                if (grade === "레어" || grade === "Rare") return 1;
                return 0;
            };

            // Stage 1: Basic Setting
            if (stageId === 0) {
                if (["뱃지", "포켓 아이템", "훈장", "엠블렘", "보조무기"].includes(slot)) return false;
                if (slot.includes("반지")) return false;

                const isEyeFace = slot === "눈장식" || slot === "얼굴장식";
                const isFairyHeart = name.includes("페어리 하트");
                const targetStar = (isEyeFace || isFairyHeart) ? 8 : 12;

                if (star < targetStar) return true;
                if (potScore(potGrade) < 2) return true;
                if (potScore(adiGrade) < 1) return true;
                return false;
            }

            // Stage 5: 17-star (모든 기준 통과 필요)
            if (stageId === 4) {
                const armorSlots = ["모자", "상의", "하의", "상의(한벌옷)", "신발", "장갑", "망토"];
                const accessorySlots = ["반지1", "반지2", "반지3", "반지4", "펜던트", "펜던트2", "얼굴장식", "눈장식", "귀고리", "벨트", "어깨장식"];
                let isArmor = armorSlots.includes(slot);
                let isAccessory = accessorySlots.includes(slot) || slot.includes("반지");
                if (name.includes("숄더") || name.includes("견장")) { isArmor = false; isAccessory = true; }

                if (!isArmor && !isAccessory) return false;
                if (name.includes("도전자")) return false;

                // 1. 스타포스 체크
                const specialRingKeywords = ["리스트레인트", "웨폰퍼프", "리스크테이커", "컨티뉴어스"];
                const isSpecialRing = slot.includes("반지") && specialRingKeywords.some(k => name.includes(k));
                const eventRingKeywords = ["테네브리스", "어웨이크", "글로리온", "카오스", "벤젼스", "쥬얼링", "플레임"];
                const isEventRing = slot.includes("반지") && eventRingKeywords.some(k => name.includes(k));
                const isTyrant = name.includes("타일런트");
                const isEternal = name.includes("에테르넬");
                const hasAmazingScroll = item.starforce_scroll_flag !== "0" && star > 0;

                let starforceThreshold = isTyrant ? 10 : 17;
                if (isEternal) starforceThreshold = 12;

                const isNoStarforce = item.starforce_scroll_flag === "0" && parseInt(item.starforce || "0") === 0;
                if (!isNoStarforce && !isEventRing) {
                    if (!isSpecialRing && !hasAmazingScroll && star < starforceThreshold) return true;
                }

                // 2. 주문서 작 체크
                if (!isSpecialRing && !name.includes("글로리온")) {
                    const str = parseInt(item.item_etc_option?.str || "0");
                    const dex = parseInt(item.item_etc_option?.dex || "0");
                    const int_val = parseInt(item.item_etc_option?.int || "0");
                    const luk = parseInt(item.item_etc_option?.luk || "0");
                    const att = parseInt(item.item_etc_option?.attack_power || "0");
                    const mag = parseInt(item.item_etc_option?.magic_power || "0");
                    const scrollMainStat = Math.max(str, dex, int_val, luk);
                    const scrollScore = str + dex + int_val + luk + att * 4 + mag * 4;

                    if (isArmor) {
                        const isHat = slot === "모자";
                        const threshold = isHat ? 84 : 56;
                        if (scrollMainStat < threshold && scrollScore < 50) return true;
                    } else {
                        if (scrollScore < 32) return true;
                    }
                }

                // 3. 추가옵션 체크
                const isNoFlame = slot.includes("반지") || name.includes("숄더") || name.includes("견장");
                if (!isNoFlame) {
                    if (!item.item_add_option) return true;
                    const str = parseInt(item.item_add_option?.str || "0");
                    const dex = parseInt(item.item_add_option?.dex || "0");
                    const int_val = parseInt(item.item_add_option?.int || "0");
                    const luk = parseInt(item.item_add_option?.luk || "0");
                    const att = parseInt(item.item_add_option?.attack_power || "0");
                    const mag = parseInt(item.item_add_option?.magic_power || "0");
                    const allStat = parseInt(item.item_add_option?.all_stat || "0");
                    const hp = parseInt(item.item_add_option?.max_hp || "0");
                    const flameScore = str + dex + int_val + luk + att * 4 + mag * 4 + allStat * 10 + Math.floor(hp / 50);
                    if (flameScore < 100) return true;
                }

                // 4. 잠재능력 체크
                if (!isSpecialRing) {
                    const potLines = [item.potential_option_1, item.potential_option_2, item.potential_option_3];
                    const hasCritDmg = potLines.some(l => l && l.includes("크리티컬 데미지"));
                    const hasCooldown = potLines.some(l => l && l.includes("재사용 대기시간"));

                    if (slot === "장갑" && hasCritDmg) {
                        // Pass
                    } else if (slot === "모자" && hasCooldown) {
                        // Pass
                    } else {
                        if (potScore(potGrade) < 3) return true;
                        const statKeywords = ["STR", "DEX", "INT", "LUK", "HP", "올스탯"];
                        let totalStatPct = 0;
                        potLines.forEach(line => {
                            if (!line) return;
                            if (statKeywords.some(k => line.includes(k)) && line.includes("%")) {
                                const match = line.match(/(\d+)%/);
                                if (match) totalStatPct += parseInt(match[1]);
                            }
                        });
                        if (totalStatPct < 15) return true;
                    }
                }

                // 5. 에디셔널 체크
                if (!isSpecialRing) {
                    const adiLines = [item.additional_potential_option_1, item.additional_potential_option_2, item.additional_potential_option_3];
                    const adiGradeScore = potScore(adiGrade);

                    if (slot.includes("반지")) {
                        const eventRingKeywords = ["테네브리스", "어웨이크", "글로리온", "카오스", "벤젼스", "쥬얼링", "플레임"];
                        const isEventRing = eventRingKeywords.some(k => name.includes(k));

                        if (isEventRing) {
                            if (adiGradeScore < 1) return true;
                            const hasAtt10 = adiLines.some(l => l && (l.includes("공격력") || l.includes("마력")) && l.match(/\+(\d+)/) && parseInt(l.match(/\+(\d+)/)?.[1] || "0") >= 10);
                            const hasStat4 = adiLines.some(l => l && l.includes("%") && l.match(/(\d+)%/) && parseInt(l.match(/(\d+)%/)?.[1] || "0") >= 4);
                            if (!hasAtt10 && !hasStat4) return true;
                        } else {
                            if (adiGradeScore < 2) return true;
                            const hasAtt10 = adiLines.some(l => l && (l.includes("공격력") || l.includes("마력")) && l.match(/\+(\d+)/) && parseInt(l.match(/\+(\d+)/)?.[1] || "0") >= 10);
                            const hasStatPct = adiLines.some(l => l && l.includes("%") && (l.includes("STR") || l.includes("DEX") || l.includes("INT") || l.includes("LUK") || l.includes("HP") || l.includes("올스탯")));
                            if (!hasAtt10 && !hasStatPct) return true;
                        }
                    } else {
                        if (adiGradeScore < 2) return true;
                        const hasAtt10 = adiLines.some(l => l && (l.includes("공격력") || l.includes("마력")) && l.match(/\+(\d+)/) && parseInt(l.match(/\+(\d+)/)?.[1] || "0") >= 10);
                        const hasStatPct = adiLines.some(l => l && l.includes("%") && (l.includes("STR") || l.includes("DEX") || l.includes("INT") || l.includes("LUK") || l.includes("HP") || l.includes("올스탯")));
                        if (!hasAtt10 && !hasStatPct) return true;
                    }
                }

                return false;
            }

            // Stage 7: 18-star
            if (stageId === 6) {
                const armorSlots = ["모자", "상의", "하의", "상의(한벌옷)", "신발", "장갑", "망토"];
                const accessorySlots = ["반지1", "반지2", "반지3", "반지4", "펜던트", "펜던트2", "얼굴장식", "눈장식", "귀고리", "벨트", "어깨장식"];
                let isArmor = armorSlots.includes(slot);
                let isAccessory = accessorySlots.includes(slot) || slot.includes("반지");
                if (name.includes("숄더") || name.includes("견장")) { isArmor = false; isAccessory = true; }

                if (!isArmor && !isAccessory) return false;

                const eventRingKeywords = ["테네브리스", "어웨이크", "글로리온", "카오스", "벤젼스", "쥬얼링", "플레임"];
                const isEventRing = slot.includes("반지") && eventRingKeywords.some(k => name.includes(k));
                if (isEventRing) return false;

                const specialRingKeywords = ["리스트레인트", "웨폰퍼프", "리스크테이커", "컨티뉴어스"];
                const isSpecialRing = slot.includes("반지") && specialRingKeywords.some(k => name.includes(k));
                if (isSpecialRing) return false;

                const isEternal = name.includes("에테르넬");
                const isTyrant = name.includes("타일런트");
                let threshold = 18;
                if (isEternal) threshold = 12;
                if (isTyrant) threshold = 10;

                if (star < threshold) return true;
                return false;
            }

            // Stage 8 & 9: 22-star
            if (stageId === 7 || stageId === 8) {
                if (name.includes("도전자")) return false;

                const armorSlots = ["모자", "상의", "하의", "상의(한벌옷)", "신발", "장갑", "망토", "어깨장식"];
                const isArmor = armorSlots.includes(slot);
                if (!isArmor) return false;

                const isEternal = name.includes("에테르넬");
                if (isEternal) {
                    if (star < 17) return true;
                } else {
                    if (star < 22) return true;
                }
                return false;
            }

            return false;
        });
    };

    const renderPassedItemsSection = (stageId: number) => {
        // 3단계(id: 2)는 이미 상단에 상세 정보가 표시되므로 통과 아이템 섹션을 숨김
        if (stageId === 2) return null;

        const items = getPassedItems(stageId);

        // Sort items by slot priority
        const slotPriority: { [key: string]: number } = {
            "무기": 0,
            "모자": 1,
            "상의": 2,
            "하의": 3,
            "상의(한벌옷)": 3,
            "장갑": 4,
            "신발": 5,
            "망토": 6,
            "어깨장식": 7,
            "얼굴장식": 8,
            "눈장식": 9,
            "귀고리": 10,
            "펜던트": 11,
            "펜던트2": 12,
            "벨트": 13,
            "반지1": 14,
            "반지2": 15,
            "반지3": 16,
            "반지4": 17
        };

        items.sort((a, b) => {
            const slotA = a.item_equipment_slot || "";
            const slotB = b.item_equipment_slot || "";

            // 반지는 모두 같은 우선순위로 처리하거나 이름순 정렬
            const pA = slotPriority[slotA] || (slotA.includes("반지") ? 14 : 99);
            const pB = slotPriority[slotB] || (slotB.includes("반지") ? 14 : 99);

            return pA - pB;
        });

        // if (items.length === 0) return null;

        return (
            <div className="mt-4 pt-4 border-t border-slate-800">
                <h4 className="text-green-400 font-bold mb-3 flex items-center gap-2 text-sm">
                    <span>✅</span> {stageId === 0 ? "1단계 통과 아이템" : "통과 아이템"} ({items.length}개)
                </h4>
                {items.length === 0 && (
                    <p className="text-xs text-slate-500">
                        표시할 아이템이 없습니다. (Debug: Stage {stageId})
                    </p>
                )}
                <div className="flex flex-wrap gap-2">
                    {items.map((item, idx) => (
                        <div key={idx} className="relative group">
                            <img
                                src={item.item_icon}
                                alt={item.item_name}
                                className="w-10 h-10 rounded bg-slate-800 border border-slate-700 cursor-pointer hover:border-green-500 transition-colors"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setExpandedPassedItem(expandedPassedItem === item ? null : item);
                                }}
                            />
                            {item.starforce > 0 && (
                                <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-[10px] font-bold px-1 rounded-full">
                                    ★{item.starforce}
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                {expandedPassedItem && items.includes(expandedPassedItem) && (
                    <div className="mt-3 bg-slate-900 border border-slate-700 rounded p-4 text-sm shadow-xl relative z-20">
                        <div className="flex gap-4 mb-4 border-b border-slate-800 pb-4">
                            <div className="relative">
                                <img src={expandedPassedItem.item_icon} className="w-16 h-16 rounded bg-slate-800" />
                                {expandedPassedItem.starforce > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold px-1.5 py-0.5 rounded-full">
                                        ★{expandedPassedItem.starforce}
                                    </span>
                                )}
                            </div>
                            <div>
                                <h4 className="text-green-400 font-bold text-lg">{expandedPassedItem.item_name}</h4>
                                <p className="text-slate-400">{expandedPassedItem.item_equipment_slot}</p>
                                <div className="flex gap-2 mt-1">
                                    {expandedPassedItem.potential_option_grade && (
                                        <span className="text-xs border border-green-500 text-green-500 px-1 rounded">{expandedPassedItem.potential_option_grade}</span>
                                    )}
                                    {expandedPassedItem.additional_potential_option_grade && (
                                        <span className="text-xs border border-blue-500 text-blue-500 px-1 rounded">에디 {expandedPassedItem.additional_potential_option_grade}</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mb-3 bg-slate-950 p-3 rounded border border-slate-800">
                            <p className="text-purple-400 font-bold mb-2 flex items-center gap-1">● 추가옵션</p>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-slate-300 text-xs">
                                {Object.entries(expandedPassedItem.item_add_option || {}).map(([key, val]) => {
                                    if (val === "0" || val === 0) return null;
                                    let label = key;
                                    if (key === "str") label = "STR";
                                    if (key === "dex") label = "DEX";
                                    if (key === "int") label = "INT";
                                    if (key === "luk") label = "LUK";
                                    if (key === "attack_power") label = "공격력";
                                    if (key === "magic_power") label = "마력";
                                    if (key === "boss_damage") label = "보공";
                                    if (key === "damage") label = "데미지";
                                    if (key === "all_stat") label = "올스탯";
                                    if (key === "max_hp") label = "HP";
                                    if (key === "max_mp") label = "MP";
                                    return (
                                        <div key={key} className="flex justify-between">
                                            <span className="text-slate-400">{label}</span>
                                            <span className="text-white">+{String(val)}{key === "all_stat" || key === "boss_damage" || key === "damage" ? "%" : ""}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {expandedPassedItem.potential_option_grade && (
                            <div className="mb-3 bg-slate-950 p-3 rounded border border-slate-800">
                                <p className="text-green-400 font-bold mb-2">● 잠재옵션</p>
                                <div className="space-y-1 text-slate-300 text-xs">
                                    <p>{expandedPassedItem.potential_option_1}</p>
                                    <p>{expandedPassedItem.potential_option_2}</p>
                                    <p>{expandedPassedItem.potential_option_3}</p>
                                </div>
                            </div>
                        )}

                        {expandedPassedItem.additional_potential_option_grade && (
                            <div className="bg-slate-950 p-3 rounded border border-slate-800">
                                <p className="text-blue-400 font-bold mb-2">● 에디셔널</p>
                                <div className="space-y-1 text-slate-300 text-xs">
                                    <p>{expandedPassedItem.additional_potential_option_1}</p>
                                    <p>{expandedPassedItem.additional_potential_option_2}</p>
                                    <p>{expandedPassedItem.additional_potential_option_3}</p>
                                </div>
                            </div>
                        )}
                    </div>
                )
                }
            </div >
        );
    };

    const renderFailedItemsSection = (stageId: number) => {
        const items = getFailedItems(stageId);

        const slotPriority: { [key: string]: number } = {
            "무기": 0, "모자": 1, "상의": 2, "하의": 3, "상의(한벌옷)": 3, "장갑": 4, "신발": 5, "망토": 6, "어깨장식": 7,
            "얼굴장식": 8, "눈장식": 9, "귀고리": 10, "펜던트": 11, "펜던트2": 12, "벨트": 13, "반지1": 14, "반지2": 15, "반지3": 16, "반지4": 17
        };

        items.sort((a, b) => {
            const slotA = a.item_equipment_slot || "";
            const slotB = b.item_equipment_slot || "";
            const pA = slotPriority[slotA] || (slotA.includes("반지") ? 14 : 99);
            const pB = slotPriority[slotB] || (slotB.includes("반지") ? 14 : 99);
            return pA - pB;
        });

        if (items.length === 0) return null;

        return (
            <div className="mt-4 pt-4 border-t border-slate-800">
                <h4 className="text-red-400 font-bold mb-3 flex items-center gap-2 text-sm">
                    <span>❌</span> {stageId === 0 ? "1단계 미달 아이템" : "미달 아이템"} ({items.length}개)
                </h4>
                <div className="flex flex-wrap gap-2">
                    {items.map((item, idx) => (
                        <div key={idx} className="relative group">
                            <img
                                src={item.item_icon}
                                alt={item.item_name}
                                className="w-10 h-10 rounded bg-slate-800 border border-red-900/50 cursor-pointer hover:border-red-500 transition-colors opacity-80 hover:opacity-100"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setExpandedFailedItem(expandedFailedItem === item ? null : item);
                                }}
                            />
                            {item.starforce > 0 && (
                                <span className="absolute -top-1 -right-1 bg-slate-700 text-slate-300 text-[10px] font-bold px-1 rounded-full">
                                    ★{item.starforce}
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                {expandedFailedItem && items.includes(expandedFailedItem) && (
                    <div className="mt-3 bg-slate-900 border border-red-900/50 rounded p-4 text-sm shadow-xl relative z-20">
                        <div className="flex gap-4 mb-4 border-b border-slate-800 pb-4">
                            <div className="relative">
                                <img src={expandedFailedItem.item_icon} className="w-16 h-16 rounded bg-slate-800" />
                                {expandedFailedItem.starforce > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold px-1.5 py-0.5 rounded-full">
                                        ★{expandedFailedItem.starforce}
                                    </span>
                                )}
                            </div>
                            <div>
                                <h4 className="text-red-400 font-bold text-lg">{expandedFailedItem.item_name}</h4>
                                <p className="text-slate-400">{expandedFailedItem.item_equipment_slot}</p>
                                <div className="flex gap-2 mt-1">
                                    {expandedFailedItem.potential_option_grade && (
                                        <span className="text-xs border border-green-500 text-green-500 px-1 rounded">{expandedFailedItem.potential_option_grade}</span>
                                    )}
                                    {expandedFailedItem.additional_potential_option_grade && (
                                        <span className="text-xs border border-blue-500 text-blue-500 px-1 rounded">에디 {expandedFailedItem.additional_potential_option_grade}</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mb-3 bg-slate-950 p-3 rounded border border-slate-800">
                            <p className="text-purple-400 font-bold mb-2 flex items-center gap-1">● 추가옵션</p>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-slate-300 text-xs">
                                {Object.entries(expandedFailedItem.item_add_option || {}).map(([key, val]) => {
                                    if (val === "0" || val === 0) return null;
                                    let label = key;
                                    if (key === "str") label = "STR";
                                    if (key === "dex") label = "DEX";
                                    if (key === "int") label = "INT";
                                    if (key === "luk") label = "LUK";
                                    if (key === "attack_power") label = "공격력";
                                    if (key === "magic_power") label = "마력";
                                    if (key === "boss_damage") label = "보공";
                                    if (key === "damage") label = "데미지";
                                    if (key === "all_stat") label = "올스탯";
                                    if (key === "max_hp") label = "HP";
                                    if (key === "max_mp") label = "MP";
                                    return (
                                        <div key={key} className="flex justify-between">
                                            <span className="text-slate-400">{label}</span>
                                            <span className="text-white">+{String(val)}{key === "all_stat" || key === "boss_damage" || key === "damage" ? "%" : ""}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {expandedFailedItem.potential_option_grade && (
                            <div className="mb-3 bg-slate-950 p-3 rounded border border-slate-800">
                                <p className="text-green-400 font-bold mb-2">● 잠재옵션</p>
                                <div className="space-y-1 text-slate-300 text-xs">
                                    <p>{expandedFailedItem.potential_option_1}</p>
                                    <p>{expandedFailedItem.potential_option_2}</p>
                                    <p>{expandedFailedItem.potential_option_3}</p>
                                </div>
                            </div>
                        )}

                        {expandedFailedItem.additional_potential_option_grade && (
                            <div className="bg-slate-950 p-3 rounded border border-slate-800">
                                <p className="text-blue-400 font-bold mb-2">● 에디셔널</p>
                                <div className="space-y-1 text-slate-300 text-xs">
                                    <p>{expandedFailedItem.additional_potential_option_1}</p>
                                    <p>{expandedFailedItem.additional_potential_option_2}</p>
                                    <p>{expandedFailedItem.additional_potential_option_3}</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    // 세트 효과 만족 여부 헬퍼
    const isSetSatisfied = (count: number, target: number) => count >= target;

    // 5단계 통계 렌더링 헬퍼
    const renderStatItem = (label: string, stat: { current: number; total: number; failedItems: string[] } | undefined, description: React.ReactNode) => {
        if (!stat || stat.total === 0) return null;
        const isAllPassed = stat.current >= stat.total;
        return (
            <li className={`flex flex-col items-start gap-1 ${isAllPassed ? 'text-green-300 font-bold' : ''}`}>
                <div className="flex items-center gap-2">
                    <span>{isAllPassed ? '✅' : '•'}</span>
                    <span>
                        {label}: <strong className="text-white">{description}</strong>
                        <span className={`ml-1 text-xs ${isAllPassed ? 'text-green-400' : 'text-red-400'}`}>
                            ({stat.current}/{stat.total})
                        </span>
                    </span>
                </div>
                {!isAllPassed && stat.failedItems && stat.failedItems.length > 0 && (
                    <div className="pl-6 text-xs text-red-300/80">
                        └ 미달: {stat.failedItems.join(', ')}
                    </div>
                )}
            </li>
        );
    };

    return (
        <div className={`rounded-lg border transition-all ${isCurrent ? 'bg-slate-900/70 border-orange-500/50 shadow-lg' :
            isPassed ? 'bg-slate-900/30 border-slate-700/50' :
                'bg-slate-900/50 border-slate-700'
            }`}>
            <button
                onClick={() => onToggle(stageInfo.id)}
                className="w-full p-3 flex items-center justify-between hover:bg-slate-800/50 transition-colors rounded-lg"
            >
                <div className="flex items-center gap-3">
                    <span className={`text-lg font-bold ${stageInfo.color === 'blue' ? 'text-blue-400' :
                        stageInfo.color === 'green' ? 'text-green-400' :
                            stageInfo.color === 'orange' ? 'text-orange-400' :
                                stageInfo.color === 'purple' ? 'text-purple-400' :
                                    stageInfo.color === 'red' ? 'text-red-400' : 'text-slate-400'
                        }`}>
                        {stageInfo.title}
                    </span>
                    {isCurrent && (
                        <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded-full border border-orange-500/30">
                            현재 단계
                        </span>
                    )}
                    {isPassed && <span className="text-xs text-green-400">✓</span>}
                </div>
                <span className={`text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {isExpanded && (
                <div className="px-3 pb-3">
                    {stageInfo.id === 0 && (
                        <div className="space-y-3 text-sm">
                            <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                                <h4 className="text-yellow-400 font-bold mb-2 flex items-center gap-2 text-lg">
                                    <span>⭐</span> 스타포스 기준
                                </h4>
                                <ul className="space-y-1 text-slate-300">
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-400">✓</span>
                                        <span>모든 장비 (반지 제외): <strong className="text-white">12성 (눈/얼굴 8성) 이상</strong></span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                                <h4 className="text-purple-400 font-bold mb-2 flex items-center gap-2 text-lg">
                                    <span>🔮</span> 잠재능력 기준
                                </h4>
                                <div className="space-y-2">
                                    <div className="bg-slate-900/50 p-2 rounded border border-slate-700/50">
                                        <p className="text-slate-400 mb-1 font-bold">무기/보조/엠블렘</p>
                                        <ul className="space-y-1 text-slate-300 pl-1">
                                            <li className="flex items-start gap-2">
                                                <span className="text-green-400">✓</span>
                                                <span>등급: <strong className="text-white">에픽 이상</strong></span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-green-400">✓</span>
                                                <span>옵션: <strong className="text-white">{attTypeKor}% 1줄 이상 (유니크 이상: 보공/방무% 포함)</strong></span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="bg-slate-900/50 p-2 rounded border border-slate-700/50">
                                        <p className="text-slate-400 mb-1 font-bold">방어구/장신구</p>
                                        <ul className="space-y-1 text-slate-300 pl-1">
                                            <li className="flex items-start gap-2">
                                                <span className="text-green-400">✓</span>
                                                <span>등급: <strong className="text-white">에픽 이상</strong></span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-green-400">✓</span>
                                                <span>옵션: <strong className="text-white">주스탯% 1줄 이상</strong></span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                                <h4 className="text-cyan-400 font-bold mb-2 flex items-center gap-2 text-lg">
                                    <span>💎</span> 에디셔널 기준
                                </h4>
                                <ul className="space-y-1 text-slate-300">
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-400">✓</span>
                                        <span>모든 장비 등급: <strong className="text-white">레어 이상</strong></span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-400">✓</span>
                                        <span>모든 장비 옵션: <strong className="text-white">{attTypeKor} +10 이상</strong></span>
                                    </li>
                                </ul>
                            </div>
                            {renderPassedItemsSection(0)}
                            {renderFailedItemsSection(0)}
                        </div>
                    )}

                    {stageInfo.id === 1 && (
                        <div className="space-y-3 text-sm">
                            <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                                <div className="mb-3">
                                    <h4 className="text-green-400 font-bold mb-2 flex items-center gap-2 text-lg">
                                        <span>🧩</span> 기본 조건 (2개 이상 만족)
                                    </h4>
                                    <ul className="space-y-1 text-slate-300 pl-1">
                                        <li className={`flex items-center gap-2 ${isSetSatisfied(setCounts?.bossSetCount, 5) ? 'text-green-300 font-bold' : ''}`}>
                                            <span>{isSetSatisfied(setCounts?.bossSetCount, 5) ? '✅' : '•'}</span>
                                            <span>보스 장신구 5세트 이상 <span className="text-slate-500">(현재: {setCounts?.bossSetCount || 0}개)</span></span>
                                        </li>
                                        <li className={`flex items-center gap-2 ${isSetSatisfied(setCounts?.dawnSetCount, 2) ? 'text-green-300 font-bold' : ''}`}>
                                            <span>{isSetSatisfied(setCounts?.dawnSetCount, 2) ? '✅' : '•'}</span>
                                            <span>여명의 보스 2세트 이상 <span className="text-slate-500">(현재: {setCounts?.dawnSetCount || 0}개)</span></span>
                                        </li>
                                        <li className={`flex items-center gap-2 ${isSetSatisfied(setCounts?.pitchedSetCount, 2) ? 'text-green-300 font-bold' : ''}`}>
                                            <span>{isSetSatisfied(setCounts?.pitchedSetCount, 2) ? '✅' : '•'}</span>
                                            <span>칠흑의 보스 2세트 이상 <span className="text-slate-500">(현재: {setCounts?.pitchedSetCount || 0}개)</span></span>
                                        </li>
                                        <li className={`flex items-center gap-2 ${isSetSatisfied(setCounts?.meisterSetCount, 3) ? 'text-green-300 font-bold' : ''}`}>
                                            <span>{isSetSatisfied(setCounts?.meisterSetCount, 3) ? '✅' : '•'}</span>
                                            <span>마이스터 3세트 이상 <span className="text-slate-500">(현재: {setCounts?.meisterSetCount || 0}개)</span></span>
                                        </li>
                                        <li className={`flex items-center gap-2 ${isSetSatisfied(setCounts?.brilliantSetCount, 1) ? 'text-green-300 font-bold' : ''}`}>
                                            <span>{isSetSatisfied(setCounts?.brilliantSetCount, 1) ? '✅' : '•'}</span>
                                            <span>광휘의 보스 1세트 이상 <span className="text-slate-500">(현재: {setCounts?.brilliantSetCount || 0}개)</span></span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="pt-2 border-t border-slate-800">
                                    <h4 className="text-green-400 font-bold mb-2 flex items-center gap-2 text-lg">
                                        <span>🔓</span> 또는 예외 조건 (1개 이상 만족)
                                    </h4>
                                    <ul className="space-y-1 text-slate-300 pl-1">
                                        <li className={`flex items-center gap-2 ${isSetSatisfied(setCounts?.bossSetCount, 9) ? 'text-green-300 font-bold' : ''}`}>
                                            <span>{isSetSatisfied(setCounts?.bossSetCount, 9) ? '✅' : '•'}</span>
                                            <span>보스 장신구 9세트 이상 <span className="text-slate-500">(현재: {setCounts?.bossSetCount || 0}개)</span></span>
                                        </li>
                                        <li className={`flex items-center gap-2 ${isSetSatisfied(setCounts?.dawnSetCount, 4) ? 'text-green-300 font-bold' : ''}`}>
                                            <span>{isSetSatisfied(setCounts?.dawnSetCount, 4) ? '✅' : '•'}</span>
                                            <span>여명의 보스 4세트 이상 <span className="text-slate-500">(현재: {setCounts?.dawnSetCount || 0}개)</span></span>
                                        </li>
                                        <li className={`flex items-center gap-2 ${isSetSatisfied(setCounts?.pitchedSetCount, 4) ? 'text-green-300 font-bold' : ''}`}>
                                            <span>{isSetSatisfied(setCounts?.pitchedSetCount, 4) ? '✅' : '•'}</span>
                                            <span>칠흑의 보스 4세트 이상 <span className="text-slate-500">(현재: {setCounts?.pitchedSetCount || 0}개)</span></span>
                                        </li>
                                        <li className={`flex items-center gap-2 ${isGenesisWeapon && isSetSatisfied(setCounts?.meisterSetCount, 3) ? 'text-green-300 font-bold' : ''}`}>
                                            <span>{isGenesisWeapon && isSetSatisfied(setCounts?.meisterSetCount, 3) ? '✅' : '•'}</span>
                                            <span>제네시스 무기 + 마이스터 3세트 이상 <span className="text-slate-500">(무기: {isGenesisWeapon ? '✅' : '❌'}, 마이스터: {setCounts?.meisterSetCount || 0}개)</span></span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {stageInfo.id === 2 && (
                        <div className="space-y-3 text-sm">
                            <div className="bg-gradient-to-br from-pink-950/30 to-purple-950/30 p-3 rounded-lg border border-pink-800/30">
                                <h4 className="text-pink-400 font-bold mb-2 flex items-center gap-2 text-lg">
                                    <span>🎯</span> 1순위: 엠블렘
                                    {equipment?.find(i => i.item_equipment_slot === "엠블렘") && (
                                        <img
                                            src={equipment.find(i => i.item_equipment_slot === "엠블렘").item_icon}
                                            alt="Emblem"
                                            className="w-8 h-8 ml-2 cursor-pointer border border-pink-500/50 rounded bg-slate-900 hover:scale-110 transition-transform"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setExpandedItemSlot(expandedItemSlot === '엠블렘' ? null : '엠블렘');
                                            }}
                                            title="클릭하여 옵션 확인"
                                        />
                                    )}
                                </h4>
                                {expandedItemSlot === '엠블렘' && equipment?.find(i => i.item_equipment_slot === "엠블렘") && (
                                    <div className="bg-slate-900/90 p-3 rounded border border-pink-500/50 mb-3 text-xs shadow-lg relative z-10">
                                        <p className="text-yellow-400 font-bold text-sm mb-2 border-b border-slate-700 pb-1">{equipment.find(i => i.item_equipment_slot === "엠블렘").item_name}</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <p className="text-slate-400 font-bold mb-1">잠재능력 ({equipment.find(i => i.item_equipment_slot === "엠블렘").potential_option_grade})</p>
                                                <p className="text-white pl-1">- {equipment.find(i => i.item_equipment_slot === "엠블렘").potential_option_1}</p>
                                                <p className="text-white pl-1">- {equipment.find(i => i.item_equipment_slot === "엠블렘").potential_option_2}</p>
                                                <p className="text-white pl-1">- {equipment.find(i => i.item_equipment_slot === "엠블렘").potential_option_3}</p>
                                            </div>
                                            <div>
                                                <p className="text-slate-400 font-bold mb-1">에디셔널 ({equipment.find(i => i.item_equipment_slot === "엠블렘").additional_potential_option_grade})</p>
                                                <p className="text-white pl-1">- {equipment.find(i => i.item_equipment_slot === "엠블렘").additional_potential_option_1}</p>
                                                <p className="text-white pl-1">- {equipment.find(i => i.item_equipment_slot === "엠블렘").additional_potential_option_2}</p>
                                                <p className="text-white pl-1">- {equipment.find(i => i.item_equipment_slot === "엠블렘").additional_potential_option_3}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {(() => {
                                    const emblem = equipment?.find(i => i.item_equipment_slot === "엠블렘");
                                    if (!emblem) return null;

                                    const grade = emblem.potential_option_grade;
                                    const isBelowUnique = grade === '레어' || grade === '에픽' || !grade;

                                    // 유니크지만 유효 옵션이 없는 경우 체크
                                    let hasValidOption = false;
                                    if (grade === '유니크') {
                                        const lines = [emblem.potential_option_1, emblem.potential_option_2, emblem.potential_option_3];
                                        hasValidOption = lines.some(l => l && (l.includes('공격력') || l.includes('마력')) && l.includes('%'));
                                    }

                                    if (isBelowUnique || (grade === '유니크' && !hasValidOption)) {
                                        return (
                                            <p className="text-xs text-pink-300 mb-2 bg-pink-950/50 p-1.5 rounded">
                                                💡 <strong>진단:</strong> 유니크 잠재능력 주문서 등을 활용하여 유니크 옵션을 확보 한 후 이벤트 큐브를 활용하여 옵션 뽑기
                                            </p>
                                        );
                                    }
                                    return null;
                                })()}
                                <ul className="space-y-1 text-slate-300">
                                    <li>• 잠재능력 : <strong className="text-white">유니크 이상</strong> / 옵션 : <strong className="text-white">{attTypeKor}% 9% 이상</strong></li>
                                    <li>• 에디셔널 : <strong className="text-white">에픽 이상</strong> / 옵션 : <strong className="text-white">{attTypeKor}% 1줄 이상</strong></li>
                                    <li className="text-xs text-slate-400 mt-1">* 무기/보조/엠블렘 합쳐서 방어율 무시%는 1줄 권장 (2줄 이상 시 변경 권장)</li>
                                </ul>
                            </div>
                            <div className="bg-gradient-to-br from-red-950/30 to-orange-950/30 p-3 rounded-lg border border-red-800/30">
                                <h4 className="text-orange-400 font-bold mb-2 flex items-center gap-2 text-lg">
                                    <span>⚔️</span> 2순위: 무기
                                    {equipment?.find(i => i.item_equipment_slot === "무기") && (
                                        <img
                                            src={equipment.find(i => i.item_equipment_slot === "무기").item_icon}
                                            alt="Weapon"
                                            className="w-8 h-8 ml-2 cursor-pointer border border-orange-500/50 rounded bg-slate-900 hover:scale-110 transition-transform"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setExpandedItemSlot(expandedItemSlot === '무기' ? null : '무기');
                                            }}
                                            title="클릭하여 옵션 확인"
                                        />
                                    )}
                                </h4>
                                {expandedItemSlot === '무기' && equipment?.find(i => i.item_equipment_slot === "무기") && (
                                    <div className="bg-slate-900/90 p-3 rounded border border-orange-500/50 mb-3 text-xs shadow-lg relative z-10">
                                        <p className="text-yellow-400 font-bold text-sm mb-2 border-b border-slate-700 pb-1">{equipment.find(i => i.item_equipment_slot === "무기").item_name}</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <p className="text-slate-400 font-bold mb-1">잠재능력 ({equipment.find(i => i.item_equipment_slot === "무기").potential_option_grade})</p>
                                                <p className="text-white pl-1">- {equipment.find(i => i.item_equipment_slot === "무기").potential_option_1}</p>
                                                <p className="text-white pl-1">- {equipment.find(i => i.item_equipment_slot === "무기").potential_option_2}</p>
                                                <p className="text-white pl-1">- {equipment.find(i => i.item_equipment_slot === "무기").potential_option_3}</p>
                                            </div>
                                            <div>
                                                <p className="text-slate-400 font-bold mb-1">에디셔널 ({equipment.find(i => i.item_equipment_slot === "무기").additional_potential_option_grade})</p>
                                                <p className="text-white pl-1">- {equipment.find(i => i.item_equipment_slot === "무기").additional_potential_option_1}</p>
                                                <p className="text-white pl-1">- {equipment.find(i => i.item_equipment_slot === "무기").additional_potential_option_2}</p>
                                                <p className="text-white pl-1">- {equipment.find(i => i.item_equipment_slot === "무기").additional_potential_option_3}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="text-xs text-orange-300 mb-2 bg-orange-950/50 p-1.5 rounded">
                                    <p className="mb-1">💡 <strong>진단:</strong> 제네시스 무기 완전해방 전까지 사용 할 무기를 확보하기!</p>
                                    <p>아이템버닝 도전자 무기가 없다면 아케인셰이드 17성 무기를 경매장에서 싸게 구매하는 것을 추천</p>
                                </div>
                                <ul className="space-y-1 text-slate-300">
                                    <li>• <strong className="text-white">도전자 무기</strong> OR <strong className="text-white">아케인셰이드 무기 17성 이상</strong></li>
                                    <li>• 잠재능력 : <strong className="text-white">레전드리 이상</strong> / 옵션 : <strong className="text-white">{attTypeKor}%/보공% 유효 2줄 이상</strong></li>
                                    <li className="text-xs text-slate-400 pl-2">- 방어율 무시%는 1줄까지만 유효 옵션으로 인정</li>
                                    <li>• 에디셔널 : <strong className="text-white">에픽 이상</strong> / 옵션 : <strong className="text-white">{attTypeKor}% 1줄 이상</strong></li>
                                </ul>
                            </div>
                            <div className="bg-gradient-to-br from-blue-950/30 to-cyan-950/30 p-3 rounded-lg border border-blue-800/30">
                                <h4 className="text-cyan-400 font-bold mb-2 flex items-center gap-2 text-lg">
                                    <span>🛡️</span> 3순위: 보조무기
                                    {equipment?.find(i => i.item_equipment_slot === "보조무기") && (
                                        <img
                                            src={equipment.find(i => i.item_equipment_slot === "보조무기").item_icon}
                                            alt="Secondary"
                                            className="w-8 h-8 ml-2 cursor-pointer border border-cyan-500/50 rounded bg-slate-900 hover:scale-110 transition-transform"
                                            onClick={(e) => { e.stopPropagation(); setExpandedItemSlot(expandedItemSlot === '보조무기' ? null : '보조무기'); }}
                                            title="클릭하여 옵션 확인"
                                        />
                                    )}
                                </h4>
                                {expandedItemSlot === '보조무기' && equipment?.find(i => i.item_equipment_slot === "보조무기") && (
                                    <div className="bg-slate-900/90 p-3 rounded border border-cyan-500/50 mb-3 text-xs shadow-lg relative z-10">
                                        <p className="text-yellow-400 font-bold text-sm mb-2 border-b border-slate-700 pb-1">{equipment.find(i => i.item_equipment_slot === "보조무기").item_name}</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <p className="text-slate-400 font-bold mb-1">잠재능력 ({equipment.find(i => i.item_equipment_slot === "보조무기").potential_option_grade})</p>
                                                <p className="text-white pl-1">- {equipment.find(i => i.item_equipment_slot === "보조무기").potential_option_1}</p>
                                                <p className="text-white pl-1">- {equipment.find(i => i.item_equipment_slot === "보조무기").potential_option_2}</p>
                                                <p className="text-white pl-1">- {equipment.find(i => i.item_equipment_slot === "보조무기").potential_option_3}</p>
                                            </div>
                                            <div>
                                                <p className="text-slate-400 font-bold mb-1">에디셔널 ({equipment.find(i => i.item_equipment_slot === "보조무기").additional_potential_option_grade})</p>
                                                <p className="text-white pl-1">- {equipment.find(i => i.item_equipment_slot === "보조무기").additional_potential_option_1}</p>
                                                <p className="text-white pl-1">- {equipment.find(i => i.item_equipment_slot === "보조무기").additional_potential_option_2}</p>
                                                <p className="text-white pl-1">- {equipment.find(i => i.item_equipment_slot === "보조무기").additional_potential_option_3}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <ul className="space-y-1 text-slate-300">
                                    <li>• 경매장에서 <strong className="text-white">레전드리/에픽 이상</strong> 구매 권유 (무한교환)</li>
                                    <li className="text-yellow-200">• 교환불가 보조무기에 카르마 유니크 잠재능력 주문서 사용하여 임시로 사용 가능</li>
                                    <li>• 잠재능력 : <strong className="text-white">유니크 이상</strong> / 옵션 : <strong className="text-white">{attTypeKor}%/보공% 유효 2줄 이상</strong></li>
                                    <li className="text-xs text-slate-400 pl-2">- 방어율 무시%는 1줄까지만 유효 옵션으로 인정</li>
                                    <li>• 에디셔널 : <strong className="text-white">레어 이상</strong> / 옵션 : <strong className="text-white">{attTypeKor} +10 1줄 이상</strong></li>
                                </ul>
                            </div>
                            <div className="bg-gradient-to-br from-purple-950/30 to-indigo-950/30 p-3 rounded-lg border border-purple-800/30">
                                <h4 className="text-purple-400 font-bold mb-2 flex items-center gap-2 text-lg">
                                    <span>💍</span> 4순위: 이벤트 링 (3개 이상)
                                    {passedRings.map((ring: any, idx: number) => (
                                        <img
                                            key={idx}
                                            src={ring.item_icon}
                                            alt={ring.item_name}
                                            className="w-8 h-8 ml-2 cursor-pointer border border-purple-500/50 rounded bg-slate-900 hover:scale-110 transition-transform"
                                            onClick={(e) => { e.stopPropagation(); setExpandedItemSlot(expandedItemSlot === ring.item_equipment_slot ? null : ring.item_equipment_slot); }}
                                            title={`${ring.item_name}\n클릭하여 옵션 확인`}
                                        />
                                    ))}
                                </h4>
                                {passedRings.map((ring: any, idx: number) => (
                                    expandedItemSlot === ring.item_equipment_slot && (
                                        <div key={idx} className="bg-slate-900/90 p-3 rounded border border-purple-500/50 mb-3 text-xs shadow-lg relative z-10">
                                            <p className="text-yellow-400 font-bold text-sm mb-2 border-b border-slate-700 pb-1">{ring.item_name}</p>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <p className="text-slate-400 font-bold mb-1">잠재능력 ({ring.potential_option_grade})</p>
                                                    <p className="text-white pl-1">- {ring.potential_option_1}</p>
                                                    <p className="text-white pl-1">- {ring.potential_option_2}</p>
                                                    <p className="text-white pl-1">- {ring.potential_option_3}</p>
                                                </div>
                                                <div>
                                                    <p className="text-slate-400 font-bold mb-1">에디셔널 ({ring.additional_potential_option_grade})</p>
                                                    <p className="text-white pl-1">- {ring.additional_potential_option_1}</p>
                                                    <p className="text-white pl-1">- {ring.additional_potential_option_2}</p>
                                                    <p className="text-white pl-1">- {ring.additional_potential_option_3}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                ))}
                                <p className="text-xs text-purple-300 mb-2 bg-purple-950/50 p-1.5 rounded">
                                    💡 <strong>진단:</strong> 이벤트 링 전용 레전드리 주문서 + 전용 명장의 큐브로 옵션 뽑기
                                </p>
                                <ul className="space-y-1 text-slate-300">
                                    <li>• <strong className="text-white">특수 반지</strong> (리스트레인트/웨폰퍼프/리스크테이커/컨티뉴어스)</li>
                                    <li className="pl-2 text-slate-400">- 조건 없음 (장착 시 인정)</li>
                                    <li className="mt-1">• <strong className="text-white">이벤트 링</strong> (테네브리스/어웨이크/글로리온/카오스/벤젼스/쥬얼링/플레임)</li>
                                    <li className="pl-2 text-slate-400">- 잠재능력: 유니크 이상 (주스탯 15%↑)</li>
                                    <li className="pl-2 text-slate-400">- 에디셔널: 레어 이상 (공/마 +10 or 주스탯 4%↑)</li>
                                    <li className="mt-1">• <strong className="text-white">또는 고스펙 반지</strong> (종류 무관)</li>
                                    <li className="pl-2 text-slate-400">- 잠재능력: 유니크 이상 (주스탯 21%↑)</li>
                                    <li className="pl-2 text-slate-400">- 에디셔널: 에픽 이상 (공/마 +10 or 주스탯 4%↑)</li>
                                </ul>
                            </div>

                        </div>
                    )}

                    {stageInfo.id === 3 && (
                        <div className="space-y-3 text-sm">
                            <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                                <p className="text-slate-400 mb-3">
                                    아이템 버닝 <strong className="text-white">'도전자'</strong> 기간제 방어구가 사라지면 캐릭터가 급격히 약해집니다. 사라질 8부위를 대체할 아이템을 미리 준비해야 합니다.
                                </p>
                                <div className="mb-3 p-2 bg-slate-900/80 rounded border border-slate-700 text-xs text-slate-300">
                                    <p>🛡️ <strong>방어구 방향 결정 하기:</strong></p>
                                    <p className="mt-1 text-slate-400">
                                        앞에 숫자 <strong>3</strong>은 (모자/상의/하의), <strong>4</strong>는 (장갑/신발/망토/어깨장식)을 의미합니다.
                                    </p>
                                </div>

                                {passedArmorOption && (
                                    <div className="mb-3 p-2 bg-green-950/30 border border-green-900/50 rounded text-xs text-green-300">
                                        ✅ 현재 적용: <strong>{passedArmorOption}</strong>
                                    </div>
                                )}

                                <div className="space-y-3">
                                    <div className="bg-slate-900/50 p-2 rounded border border-slate-700/50">
                                        <h5 className="text-yellow-400 font-bold mb-1">1안 (*추천)</h5>
                                        <p className="text-slate-300 mb-1">3루타비스 + 4아케인 + 1무기</p>
                                        <p className="text-slate-500 text-xs">- 현재 아케인 노작 값이 싸고 고점이 높음</p>
                                    </div>
                                    <div className="bg-slate-900/50 p-2 rounded border border-slate-700/50">
                                        <h5 className="text-slate-300 font-bold mb-1">2안 (*대안)</h5>
                                        <p className="text-slate-300 mb-1">3루타비스 + 4앱솔랩스 + 1무기</p>
                                        <p className="text-slate-500 text-xs">- 가성비, 토드하기 쉬움, 17성 강화하기 쉬움</p>
                                    </div>
                                    <div className="bg-slate-900/50 p-2 rounded border border-slate-700/50">
                                        <h5 className="text-slate-300 font-bold mb-1">3안</h5>
                                        <p className="text-slate-300 mb-1">3에테르넬 + 4아케인 + 1무기</p>
                                        <p className="text-slate-500 text-xs">- 3에테르넬 장비가 비싸지만 고점이 높음</p>
                                    </div>
                                    <div className="bg-slate-900/50 p-2 rounded border border-slate-700/50">
                                        <h5 className="text-slate-300 font-bold mb-1">4안</h5>
                                        <p className="text-slate-300 mb-1">3에테르넬 + 4에테르넬 + 1무기</p>
                                        <p className="text-slate-500 text-xs">- 고자본용 최고점 템셋팅</p>
                                    </div>
                                    <div className="bg-green-950/30 p-2 rounded border border-green-900/30">
                                        <h5 className="text-green-400 font-bold mb-1">✅ 예외 조건</h5>
                                        <p className="text-green-200 text-xs">
                                            '도전자'가 들어간 아이템을 4개 이상 착용하고 있다면 통과
                                        </p>
                                    </div>

                                    {!isPassed && (
                                        <div className="mt-4 p-3 bg-slate-900/80 border border-slate-700 rounded text-center">
                                            <p className="text-slate-300 text-sm mb-2">
                                                아직 세트를 맞추는 중이거나, 메소가 부족하여 완성하지 못했다면<br />
                                                일단 <strong>패스</strong>하고 다음 단계 진단을 확인하세요!
                                            </p>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (onPass) onPass();
                                                }}
                                                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded transition-colors text-sm shadow-lg shadow-purple-900/20"
                                            >
                                                지금은 패스하고 다음 단계 보기 👉
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    {stageInfo.id === 4 && stage4Stats && (
                        <div className="space-y-3 text-sm">
                            <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                                <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2 text-lg">
                                    <span>🛡️</span> 방어구 진단 기준 (모자, 상/하의, 장갑, 신발, 망토)
                                </h4>
                                <ul className="space-y-1 text-slate-300 pl-1">
                                    <li className={`flex flex-col items-start gap-1 ${stage4Stats.armor.starforce.current >= stage4Stats.armor.starforce.total ? 'text-green-300 font-bold' : ''}`}>
                                        {renderStatItem("스타포스", stage4Stats.armor.starforce, "17성 이상 (타일런트 5성)")}
                                        <div className="pl-6 text-xs text-slate-400/80 mb-0.5">
                                            * 에테르넬: 12성 ≈ 18성 카루타
                                        </div>
                                        {stage4Stats.armor.starforce.failedItems.length > 0 && (
                                            <div className="pl-6 text-xs text-red-300/80">
                                                └ 미달: {stage4Stats.armor.starforce.failedItems.join(', ')}
                                            </div>
                                        )}
                                    </li>
                                    <li className={`flex flex-col items-start gap-1 ${stage4Stats.armor.scroll.current >= stage4Stats.armor.scroll.total ? 'text-green-300 font-bold' : ''}`}>
                                        <div className="flex items-center gap-2">
                                            <span>{stage4Stats.armor.scroll.current >= stage4Stats.armor.scroll.total ? '✅' : '•'}</span>
                                            <span>
                                                주문서 작: <strong className="text-white">방어구 56급(모자 84급) / 장신구 30급 이상</strong>
                                                <span className={`ml-1 text-xs ${stage4Stats.armor.scroll.current >= stage4Stats.armor.scroll.total ? 'text-green-400' : 'text-red-400'}`}>
                                                    ({stage4Stats.armor.scroll.current}/{stage4Stats.armor.scroll.total})
                                                </span>
                                            </span>
                                        </div>
                                        <div className="pl-6 text-xs text-slate-400/80 mb-0.5">
                                            * 방어구: 30%작 or 놀긍혼 50급↑ / 장신구: 놀긍혼 or 프악공 추천
                                        </div>
                                        {stage4Stats.armor.scroll.failedItems.length > 0 && (
                                            <div className="pl-6 text-xs text-red-300/80">
                                                └ 미달: {stage4Stats.armor.scroll.failedItems.join(', ')}
                                            </div>
                                        )}
                                    </li>
                                    <li className={`flex flex-col items-start gap-1 ${stage4Stats.armor.flame.current >= stage4Stats.armor.flame.total ? 'text-green-300 font-bold' : ''}`}>
                                        <div className="flex items-center gap-2">
                                            <span>{stage4Stats.armor.flame.current >= stage4Stats.armor.flame.total ? '✅' : '•'}</span>
                                            <span>
                                                추가 옵션: <strong className="text-white">100급 이상</strong>
                                                <span className={`ml-1 text-xs ${stage4Stats.armor.flame.current >= stage4Stats.armor.flame.total ? 'text-green-400' : 'text-red-400'}`}>
                                                    ({stage4Stats.armor.flame.current}/{stage4Stats.armor.flame.total})
                                                </span>
                                            </span>
                                        </div >
                                        <div className="pl-6 text-xs text-slate-400/80 mb-0.5">
                                            * 급 계산식: 각 직업에 맞는 주스텟 + (공/마 × 4) + (올스텟% × 10)
                                        </div>
                                        {
                                            stage4Stats.armor.flame.failedItems.length > 0 && (
                                                <div className="pl-6 text-xs text-red-300/80">
                                                    └ 미달: {stage4Stats.armor.flame.failedItems.join(', ')}
                                                </div>
                                            )
                                        }
                                    </li >
                                    <li className={`flex flex-col items-start gap-1 ${stage4Stats.armor.potential.current >= stage4Stats.armor.potential.total ? 'text-green-300 font-bold' : ''}`}>
                                        <div className="flex items-center gap-2">
                                            <span>{stage4Stats.armor.potential.current >= stage4Stats.armor.potential.total ? '✅' : '•'}</span>
                                            <span>
                                                잠재능력: <strong className="text-white">유니크 이상 & 주스탯 15% 이상</strong>
                                                <span className={`ml-1 text-xs ${stage4Stats.armor.potential.current >= stage4Stats.armor.potential.total ? 'text-green-400' : 'text-red-400'} `}>
                                                    ({stage4Stats.armor.potential.current}/{stage4Stats.armor.potential.total})
                                                </span>
                                            </span>
                                        </div>
                                        <div className="pl-6 text-xs text-slate-400/80 mb-0.5">
                                            * 장갑은 크리티컬 데미지 %가 최고의 옵션
                                        </div>
                                        {stage4Stats.armor.potential.failedItems.length > 0 && (
                                            <div className="pl-6 text-xs text-red-300/80">
                                                └ 미달: {stage4Stats.armor.potential.failedItems.join(', ')}
                                            </div>
                                        )}
                                    </li>
                                    {renderStatItem("에디셔널", stage4Stats.armor.additional, "레어 공/마+10 (에픽 이상은 탯% or 공/마+10)")}
                                </ul>
                            </div>

                            <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                                <h4 className="text-pink-400 font-bold mb-2 flex items-center gap-2 text-lg">
                                    <span>💍</span> 장신구 진단 기준 (반지, 펜던트, 얼장, 눈장, 귀고리, 벨트)
                                </h4>
                                <ul className="space-y-1 text-slate-300 pl-1">
                                    {renderStatItem("스타포스", stage4Stats.accessory.starforce, "17성 이상 (타일런트는 10성 이상)")}
                                    <li className={`flex flex-col items-start gap-1 ${stage4Stats.accessory.scroll.current >= stage4Stats.accessory.scroll.total ? 'text-green-300 font-bold' : ''} `}>
                                        <div className="flex items-center gap-2">
                                            <span>{stage4Stats.accessory.scroll.current >= stage4Stats.accessory.scroll.total ? '✅' : '•'}</span>
                                            <span>
                                                주문서 작: <strong className="text-white">놀긍혼(떡작) 주스텟 32급 이상</strong>
                                                <span className={`ml-1 text-xs ${stage4Stats.accessory.scroll.current >= stage4Stats.accessory.scroll.total ? 'text-green-400' : 'text-red-400'} `}>
                                                    ({stage4Stats.accessory.scroll.current}/{stage4Stats.accessory.scroll.total})
                                                </span>
                                            </span>
                                        </div>
                                        <div className="pl-6 text-xs text-slate-400/80 mb-0.5">
                                            * 이벤트 코인샵에 프리미엄 악세서리 주문서(프악공) 있으면 프악공 바르기
                                        </div>
                                        {stage4Stats.accessory.scroll.failedItems.length > 0 && (
                                            <div className="pl-6 text-xs text-red-300/80">
                                                └ 미달: {stage4Stats.accessory.scroll.failedItems.join(', ')}
                                            </div>
                                        )}
                                    </li>
                                    <li className={`flex flex-col items-start gap-1 ${stage4Stats.accessory.flame.current >= stage4Stats.accessory.flame.total ? 'text-green-300 font-bold' : ''} `}>
                                        <div className="flex items-center gap-2">
                                            <span>{stage4Stats.accessory.flame.current >= stage4Stats.accessory.flame.total ? '✅' : '•'}</span>
                                            <span>
                                                추가 옵션: <strong className="text-white">100급 이상 (반지/숄더 제외)</strong>
                                                <span className={`ml-1 text-xs ${stage4Stats.accessory.flame.current >= stage4Stats.accessory.flame.total ? 'text-green-400' : 'text-red-400'} `}>
                                                    ({stage4Stats.accessory.flame.current}/{stage4Stats.accessory.flame.total})
                                                </span>
                                            </span>
                                        </div>
                                        <div className="pl-6 text-xs text-slate-400/80 mb-0.5">
                                            * 급 계산식: 각 직업에 맞는 주스텟 + (공/마 × 4) + (올스텟% × 10)
                                        </div>
                                        {stage4Stats.accessory.flame.failedItems.length > 0 && (
                                            <div className="pl-6 text-xs text-red-300/80">
                                                └ 미달: {stage4Stats.accessory.flame.failedItems.join(', ')}
                                            </div>
                                        )}
                                    </li>
                                    {renderStatItem("잠재능력", stage4Stats.accessory.potential, "유니크 이상 & 주스탯 15%~21% 이상")}
                                    {renderStatItem("에디셔널", stage4Stats.accessory.additional, "레어 공/마+10 (에픽 이상은 탯% or 공/마+10)")}
                                </ul>
                            </div>
                            {renderPassedItemsSection(4)}
                            {renderFailedItemsSection(4)}
                        </div>
                    )}
                    {stageInfo.id === 5 && stage5Stats && (
                        <div className="space-y-4 text-sm">
                            <div className="bg-gradient-to-r from-indigo-950/30 to-blue-950/30 p-4 rounded-lg border border-indigo-900/50">
                                <h4 className="text-indigo-400 font-bold mb-3 flex items-center gap-2 text-lg">
                                    <span>⚡</span> 6단계: 특수 스펙 최적화
                                </h4>
                                <p className="text-slate-300 mb-3 leading-relaxed">
                                    직업별 필수 쿨타임 감소 모자와 시드링을 점검하여 최적의 효율을 달성하세요.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                                        <h5 className="text-indigo-300 font-bold mb-2 flex items-center gap-1">
                                            <span>🎩</span> 쿨타임 감소 모자
                                        </h5>
                                        <p className="text-xs text-slate-400 mb-3 bg-slate-900/50 p-2 rounded leading-relaxed">
                                            💡 <strong>왜 필요한가요?</strong><br />
                                            쿨타임 감소 효율이 좋은 직업은 쿨타임 감소 모자 사용을 권장합니다.
                                        </p>
                                        <div className="mb-3 p-2 bg-slate-900/80 rounded border border-indigo-900/30">
                                            <span className="text-slate-400 text-xs block mb-1">📢 이 직업의 추천 세팅:</span>
                                            <strong className="text-indigo-300 text-sm block">
                                                {stage5Stats.recommendedHatType?.startsWith('cool_')
                                                    ? '🕒 쿨타임 감소 모자 (-2초 이상)'
                                                    : '📊 주스탯 % 모자 (쿨감 불필요)'}
                                            </strong>
                                        </div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={stage5Stats.hat === 'pass' ? 'text-green-400' : stage5Stats.hat === 'fail' ? 'text-red-400' : 'text-slate-400'}>
                                                {stage5Stats.hat === 'pass' ? '✅' : stage5Stats.hat === 'fail' ? '❌' : '•'}
                                            </span>
                                            <span className="text-slate-300">
                                                상태: <strong className="text-white">
                                                    {stage5Stats.hat === 'pass' ? '적합' : stage5Stats.hat === 'fail' ? '부적합' : '해당 없음'}
                                                </strong>
                                            </span>
                                        </div>
                                        {stage5Stats.cooldownSeconds > 0 && (
                                            <p className="text-xs text-slate-400 pl-6 mb-1">
                                                현재 쿨감: -{stage5Stats.cooldownSeconds}초
                                            </p>
                                        )}
                                        {stage5Stats.hatNote && (
                                            <div className="mt-2 pl-2 border-l-2 border-indigo-500/30">
                                                <p className="text-xs text-indigo-200">
                                                    📌 <strong>직업 추천 사유:</strong><br />
                                                    {stage5Stats.hatNote}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                                        <h5 className="text-indigo-300 font-bold mb-2 flex items-center gap-1">
                                            <span>💍</span> 시드링 (특수 반지)
                                        </h5>
                                        <p className="text-xs text-slate-400 mb-3 bg-slate-900/50 p-2 rounded leading-relaxed">
                                            💡 <strong>왜 필요한가요?</strong><br />
                                            시드링은 짧은 시간 동안 강력한 스탯 공격력/보스 공격력 버프를 제공하여, 극딜 타임에 폭발적인 데미지를 넣을 수 있게 해주는 필수 아이템입니다.
                                        </p>
                                        <div className="mb-3 p-2 bg-slate-900/80 rounded border border-indigo-900/30">
                                            <span className="text-slate-400 text-xs block mb-1">📢 이 직업의 추천 세팅:</span>
                                            <strong className="text-indigo-300 text-sm block">
                                                {stage5Stats.recommendedRingType === 'restraint' ? '💥 리스트레인트 링 (극딜형)' :
                                                    stage5Stats.recommendedRingType === 'continuous' ? '🔄 컨티뉴어스 링 (지속딜형)' :
                                                        '🔀 스위칭 (리레 + 컨티) 권장'}
                                            </strong>
                                        </div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={stage5Stats.ring === 'pass' ? 'text-green-400' : stage5Stats.ring === 'fail' ? 'text-red-400' : 'text-slate-400'}>
                                                {stage5Stats.ring === 'pass' ? '✅' : stage5Stats.ring === 'fail' ? '❌' : '•'}
                                            </span>
                                            <span className="text-slate-300">
                                                상태: <strong className="text-white">
                                                    {stage5Stats.ring === 'pass' ? '적합' : stage5Stats.ring === 'fail' ? '부적합' : '해당 없음'}
                                                </strong>
                                            </span>
                                        </div>
                                        <div className="text-xs text-slate-400 pl-6 space-y-0.5 mb-2">
                                            <p>리레링: {stage5Stats.hasRestraint ? '보유 ✅' : '미보유'}</p>
                                            <p>컨티링: {stage5Stats.hasContinuous ? '보유 ✅' : '미보유'}</p>
                                        </div>
                                        <p className="text-xs text-yellow-500/80 pl-6 mb-2">
                                            ⚠️ <strong>최소 3레벨 이상 권장</strong>
                                        </p>
                                        {stage5Stats.ringNote && (
                                            <div className="mt-2 pl-2 border-l-2 border-indigo-500/30">
                                                <p className="text-xs text-indigo-200">
                                                    📌 <strong>직업 추천 사유:</strong><br />
                                                    {stage5Stats.ringNote}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {!isPassed && (
                                <div className="mt-4 p-3 bg-slate-900/80 rounded border border-slate-700 text-center">
                                    <p className="text-slate-300 mb-3 font-bold">
                                        특수 스펙 최적화를 진행하셨다면 다음 단계로 이동하시겠습니까?
                                    </p>
                                    <div className="flex justify-center gap-3">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onPass && onPass();
                                            }}
                                            className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white font-bold rounded transition-colors flex items-center gap-2"
                                        >
                                            <span>⭕</span> YES (다음 단계로)
                                        </button>
                                        <button
                                            type="button"
                                            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold rounded transition-colors flex items-center gap-2"
                                        >
                                            <span>❌</span> NO
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    {stageInfo.id === 6 && stage6Stats && (
                        <div className="space-y-3 text-sm">
                            <div className="bg-gradient-to-r from-yellow-950/30 to-orange-950/30 p-4 rounded-lg border border-yellow-900/50">
                                <h4 className="text-yellow-400 font-bold mb-3 flex items-center gap-2 text-lg">
                                    <span>💎</span> 7단계: 최종 완성 (18성 달성)
                                </h4>
                                <p className="text-slate-300 mb-3 leading-relaxed">
                                    전체적인 방어구+장신구의 스타포스를 모두 18성으로 올려 스펙업을 진행하세요!
                                </p>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                                        <h5 className="text-orange-400 font-bold mb-2 flex items-center gap-1">
                                            <span>🛡️</span> 방어구 스타포스
                                        </h5>
                                        <div className="flex items-center gap-2">
                                            <span className={stage6Stats.armor.starforce.current >= stage6Stats.armor.starforce.total ? 'text-green-400' : 'text-yellow-400'}>
                                                {stage6Stats.armor.starforce.current >= stage6Stats.armor.starforce.total ? '✅' : '⭐'}
                                            </span>
                                            <span className="text-slate-300">
                                                18성 달성: <strong className={stage6Stats.armor.starforce.current >= stage6Stats.armor.starforce.total ? 'text-green-300' : 'text-white'}>
                                                    {stage6Stats.armor.starforce.current}/{stage6Stats.armor.starforce.total}
                                                </strong>
                                            </span>
                                        </div>
                                        {stage6Stats.armor.starforce.failedItems.length > 0 && (
                                            <div className="mt-2 text-xs text-red-300/80">
                                                └ 미달: {stage6Stats.armor.starforce.failedItems.join(', ')}
                                            </div>
                                        )}
                                    </div>

                                    <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                                        <h5 className="text-pink-400 font-bold mb-2 flex items-center gap-1">
                                            <span>💍</span> 장신구 스타포스
                                        </h5>
                                        <div className="flex items-center gap-2">
                                            <span className={stage6Stats.accessory.starforce.current >= stage6Stats.accessory.starforce.total ? 'text-green-400' : 'text-yellow-400'}>
                                                {stage6Stats.accessory.starforce.current >= stage6Stats.accessory.starforce.total ? '✅' : '⭐'}
                                            </span>
                                            <span className="text-slate-300">
                                                18성 달성: <strong className={stage6Stats.accessory.starforce.current >= stage6Stats.accessory.starforce.total ? 'text-green-300' : 'text-white'}>
                                                    {stage6Stats.accessory.starforce.current}/{stage6Stats.accessory.starforce.total}
                                                </strong>
                                            </span>
                                        </div>
                                        {stage6Stats.accessory.starforce.failedItems.length > 0 && (
                                            <div className="mt-2 text-xs text-red-300/80">
                                                └ 미달: {stage6Stats.accessory.starforce.failedItems.join(', ')}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-3 p-2 bg-slate-950/50 rounded border border-slate-800">
                                    <p className="text-xs text-slate-400">
                                        * 에테르넬 12성 / 타일런트 7성 이상은 18성급으로 인정됩니다.
                                    </p>
                                </div>
                            </div>
                            {renderPassedItemsSection(6)}
                            {renderFailedItemsSection(6)}
                        </div>
                    )}
                    {stageInfo.id === 7 && stage7Info && (
                        <div className="space-y-4 text-sm">
                            <div className="bg-gradient-to-r from-cyan-950/30 to-blue-950/30 p-4 rounded-lg border border-cyan-900/50">
                                <h4 className="text-cyan-400 font-bold mb-3 flex items-center gap-2 text-lg">
                                    <span>🌟</span> 8단계: 스타포스 22성 조합 선택하기
                                </h4>
                                <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800 mb-4">
                                    <p className="text-slate-300 leading-relaxed mb-2">
                                        진단 : 22성 방어구 방향을 결정한다.
                                    </p>
                                    <p className="text-slate-400 leading-relaxed">
                                        22성 아이템을 구매해서 사용 할지, 아니면 기존 아이템을 강화해서 사용 할 지를 결정해야 합니다.
                                        그 전에 먼저 어떤 조합으로 22성을 갈지 결정해봅시다!
                                    </p>
                                    <div className="mt-2 pt-2 border-t border-slate-800">
                                        <p className="text-cyan-300 font-bold">
                                            현재 조합 상태: {stage7Info.currentCombination}
                                        </p>
                                        <h5 className="text-white font-bold mb-2 border-b border-slate-800 pb-1">
                                            17~18성 에테르넬을 섞은 조합
                                        </h5>
                                        <p className="text-xs text-slate-500 mb-2">
                                            (모자/상의/하의/장갑/신발/망토/어깨장식에 적절하게 17~18성 에테르넬 혼합)
                                        </p>
                                        <ul className="space-y-1 text-slate-300 pl-1">
                                            <li className="flex items-start gap-2">
                                                <span className="text-purple-400 font-bold">3안</span>
                                                <span>3에테르넬 + 4아케인 + 제네시스 무기</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-purple-400 font-bold">4안</span>
                                                <span>3에테르넬 + 4앱솔랩스 + 제네시스 무기</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-purple-400 font-bold">5안</span>
                                                <span>3루타비스 + 4에테르넬 + 제네시스 무기</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-purple-400 font-bold">6안</span>
                                                <span>3에테르넬 + 4에테르넬 + 제네시스 무기</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {renderPassedItemsSection(7)}
                        </div>
                    )}
                    {stageInfo.id === 8 && stage8Stats && (
                        <div className="space-y-4 text-sm">
                            <div className="bg-gradient-to-r from-purple-950/30 to-pink-950/30 p-4 rounded-lg border border-purple-900/50">
                                <h4 className="text-purple-400 font-bold mb-3 flex items-center gap-2 text-lg">
                                    <span>⚔️</span> 9단계: 22성급 방어구 셋팅
                                </h4>
                                <p className="text-slate-300 mb-3 leading-relaxed">
                                    22성급 방어구 세트 방향을 정했다면 진짜 22성급 템을 맞춰보자!
                                </p>

                                <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                                    <h5 className="text-green-400 font-bold mb-2 flex items-center gap-2">
                                        <span>🧩</span> 세트별 조건 (2개 이상 만족 시 통과)
                                    </h5>
                                    <ul className="space-y-1 text-slate-300 pl-1">
                                        <li className={`flex items-center gap-2 ${stage8Stats.cra22Count >= 3 ? 'text-green-300 font-bold' : ''} `}>
                                            <span>{stage8Stats.cra22Count >= 3 ? '✅' : '•'}</span>
                                            <span>22성上 루타비스 3세트 <span className="text-slate-500">(현재: {stage8Stats.cra22Count}개)</span></span>
                                        </li>
                                        <li className={`flex items-center gap-2 ${stage8Stats.absol22Count >= 4 ? 'text-green-300 font-bold' : ''} `}>
                                            <span>{stage8Stats.absol22Count >= 4 ? '✅' : '•'}</span>
                                            <span>22성上 앱솔랩스 4세트 <span className="text-slate-500">(현재: {stage8Stats.absol22Count}개)</span></span>
                                        </li>
                                        <li className={`flex items-center gap-2 ${stage8Stats.arcane22Count >= 4 ? 'text-green-300 font-bold' : ''} `}>
                                            <span>{stage8Stats.arcane22Count >= 4 ? '✅' : '•'}</span>
                                            <span>22성上 아케인 4세트 <span className="text-slate-500">(현재: {stage8Stats.arcane22Count}개)</span></span>
                                        </li>
                                        <li className={`flex items-center gap-2 ${stage8Stats.eternal17Count >= 3 ? 'text-green-300 font-bold' : ''} `}>
                                            <span>{stage8Stats.eternal17Count >= 3 ? '✅' : '•'}</span>
                                            <span>17성上 에테르넬 3세트 <span className="text-slate-500">(현재: {stage8Stats.eternal17Count}개)</span></span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="mt-3 bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                                    <h5 className="text-green-400 font-bold mb-2 flex items-center gap-2">
                                        <span>🔓</span> 예외 조건
                                    </h5>
                                    <ul className="space-y-1 text-slate-300 pl-1">
                                        <li className={`flex items-center gap-2 ${stage8Stats.isEternal4SetSatisfied ? 'text-green-300 font-bold' : ''} `}>
                                            <span>{stage8Stats.isEternal4SetSatisfied ? '✅' : '•'}</span>
                                            <span>17성上 에테르넬 4세트 이상 <span className="text-slate-500">(현재: {stage8Stats.eternal17Count}개)</span></span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {renderPassedItemsSection(8)}
                            {renderFailedItemsSection(8)}
                        </div>
                    )}
                </div>
            )
            }
        </div >
    );
};
