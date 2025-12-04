import React from 'react';
import { Stage0Content } from './stage_contents/Stage0Content';
import { Stage1Content } from './stage_contents/Stage1Content';
import { Stage2Content } from './stage_contents/Stage2Content';
import { Stage3Content } from './stage_contents/Stage3Content';
import { Stage4Content } from './stage_contents/Stage4Content';
import { Stage5Content } from './stage_contents/Stage5Content';
import { Stage6Content } from './stage_contents/Stage6Content';
import { Stage7Content } from './stage_contents/Stage7Content';
import { Stage8Content } from './stage_contents/Stage8Content';
import { EquipmentItem } from '../../lib/diagnosis/types';
import { getStarforce, parseStatPercent, getPotentialGradeScore, calculateFlameScore } from '../../lib/diagnosis/utils';
import { isAmazingEnhancementItem } from '@/lib/amazing_enhancement_table';

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
    equipment?: EquipmentItem[];
}

export const StageCard: React.FC<StageCardProps> = ({
    stageInfo, isCurrent, isPassed, isExpanded, onToggle, attTypeKor, setCounts, passedArmorOption, isGenesisWeapon, stage4Stats, stage5Stats, stage6Stats, stage7Info, stage8Stats, onPass, equipment
}) => {
    const [expandedPassedItem, setExpandedPassedItem] = React.useState<EquipmentItem | null>(null);
    const [expandedFailedItem, setExpandedFailedItem] = React.useState<EquipmentItem | null>(null);

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
            const adiGrade = getPotentialGradeScore(ring.additional_potential_option_grade);
            const potLines = [ring.potential_option_1, ring.potential_option_2, ring.potential_option_3].filter((l): l is string => !!l);
            const adiLines = [ring.additional_potential_option_1, ring.additional_potential_option_2, ring.additional_potential_option_3].filter((l): l is string => !!l);

            // 1. Special Ring
            if (["리스트레인트", "웨폰퍼프", "리스크테이커", "컨티뉴어스"].some(k => name.includes(k))) return true;

            // 2. Event Ring
            if (["테네브리스", "어웨이크", "글로리온", "카오스", "벤젼스", "쥬얼링", "주얼링", "플레임"].some(k => name.includes(k))) {
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
                // 뱃지, 포켓, 훈장은 여전히 제외 (엠블렘, 보조무기는 이제 체크함!)
                if (["뱃지", "포켓 아이템", "훈장"].includes(slot)) return false;
                if (slot.includes("반지")) return false;

                const isEyeFace = slot === "눈장식" || slot === "얼굴장식";
                const isFairyHeart = name.includes("페어리 하트");
                const isWSE = slot === "무기" || slot === "보조무기" || slot === "엠블렘";

                // 스타포스 체크 (WSE는 스타포스 조건 없음)
                if (!isWSE) {
                    const targetStar = (isEyeFace || isFairyHeart) ? 8 : 12;
                    if (star < targetStar) return false;
                }

                // 잠재능력 체크
                if (potScore(potGrade) < 2) return false;

                // 에디셔널 체크
                if (potScore(adiGrade) < 1) return false;

                // WSE는 에디셔널 옵션도 체크 (공/마 +10 이상 OR 공/마 %)
                if (isWSE) {
                    const adiLines = [item.additional_potential_option_1, item.additional_potential_option_2, item.additional_potential_option_3];
                    // 공/마 상수 +10 이상
                    const hasAtt10 = adiLines.some(l => l && (l.includes("공격력") || l.includes("마력")) && !l.includes("%") && l.match(/\+(\d+)/) && parseInt(l.match(/\+(\d+)/)?.[1] || "0") >= 10);
                    // 공/마 % (예: 마력 +3%)
                    const hasAttPct = adiLines.some(l => l && (l.includes("공격력") || l.includes("마력")) && l.includes("%"));

                    if (!hasAtt10 && !hasAttPct) return false;
                }

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
                const eventRingKeywords = ["테네브리스", "어웨이크", "글로리온", "카오스", "벤젼스", "쥬얼링", "주얼링", "플레임"];
                const isEventRing = slot.includes("반지") && eventRingKeywords.some(k => name.includes(k));
                const isTyrant = name.includes("타일런트");
                const isEternal = name.includes("에테르넬");
                // 놀라운 장비 강화 주문서(놀장강) 적용 여부 확인
                const isAmazingEnhancement = isAmazingEnhancementItem(item);
                const hasAmazingScroll = (item.starforce_scroll_flag !== "0" && star > 0) || isAmazingEnhancement;

                let starforceThreshold = isTyrant ? 10 : 17;
                if (isEternal) starforceThreshold = 12;

                const isNoStarforce = item.starforce_scroll_flag === "0" && parseInt(item.starforce || "0") === 0;
                if (!isNoStarforce && !isEventRing) {
                    if (!isSpecialRing && !hasAmazingScroll && star < starforceThreshold) return false;
                }

                // 2. 주문서 작 체크 (글로리온 링 예외)
                if (!isSpecialRing && !name.includes("글로리온") && !hasAmazingScroll) {
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
                        const eventRingKeywords = ["테네브리스", "어웨이크", "글로리온", "카오스", "벤젼스", "쥬얼링", "주얼링", "플레임"];
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
                        // 일반 방어구/장신구: 에픽+ & (공/마+10 or 공/마% or 주스탯%)
                        if (adiGradeScore < 2) return false;
                        // 공/마 상수 +10 이상
                        const hasAtt10 = adiLines.some(l => l && (l.includes("공격력") || l.includes("마력")) && !l.includes("%") && l.match(/\+(\d+)/) && parseInt(l.match(/\+(\d+)/)?.[1] || "0") >= 10);
                        // 공/마 % (예: 마력 +3%)
                        const hasAttPct = adiLines.some(l => l && (l.includes("공격력") || l.includes("마력")) && l.includes("%"));
                        // 주스탯 %
                        const hasStatPct = adiLines.some(l => l && l.includes("%") && (l.includes("STR") || l.includes("DEX") || l.includes("INT") || l.includes("LUK") || l.includes("HP") || l.includes("올스탯")));
                        if (!hasAtt10 && !hasAttPct && !hasStatPct) return false;
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
                const eventRingKeywords = ["테네브리스", "어웨이크", "글로리온", "카오스", "벤젼스", "쥬얼링", "주얼링", "플레임"];
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

                // 놀장강 처리: 10성 이상이면 20성급이므로 18성 통과
                const isAmazingEnhancement = isAmazingEnhancementItem(item);
                if (isAmazingEnhancement) return star >= 10;

                return star >= threshold;
            }

            // Stage 8: 22-star Combination (방어구만, 도전자 제외)
            if (stageId === 7) {
                if (name.includes("도전자")) return false;

                const armorSlots = ["모자", "상의", "하의", "상의(한벌옷)", "신발", "장갑", "망토", "어깨장식"];
                const isArmor = armorSlots.includes(slot);
                if (!isArmor) return false;

                const isEternal = name.includes("에테르넬");

                // 놀장강 처리: 12성 이상이면 22성급이므로 통과
                const isAmazingEnhancement = isAmazingEnhancementItem(item);
                if (isAmazingEnhancement) return star >= 12;

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

                // 놀장강 처리: 12성 이상이면 22성급이므로 통과
                const isAmazingEnhancement = isAmazingEnhancementItem(item);
                if (isAmazingEnhancement) return star >= 12;

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
                // 뱃지, 포켓, 훈장은 여전히 제외 (엠블렘, 보조무기는 이제 체크함!)
                if (["뱃지", "포켓 아이템", "훈장"].includes(slot)) return false;
                if (slot.includes("반지")) return false;

                const isEyeFace = slot === "눈장식" || slot === "얼굴장식";
                const isFairyHeart = name.includes("페어리 하트");
                const isWSE = slot === "무기" || slot === "보조무기" || slot === "엠블렘";

                // 스타포스 체크 (WSE는 스타포스 조건 없음)
                if (!isWSE) {
                    const targetStar = (isEyeFace || isFairyHeart) ? 8 : 12;
                    if (star < targetStar) return true;
                }

                // 잠재능력 체크
                if (potScore(potGrade) < 2) return true;

                // 에디셔널 체크
                if (potScore(adiGrade) < 1) return true;

                // WSE는 에디셔널 옵션도 체크 (공/마 +10 이상 OR 공/마 %)
                if (isWSE) {
                    const adiLines = [item.additional_potential_option_1, item.additional_potential_option_2, item.additional_potential_option_3];
                    // 공/마 상수 +10 이상
                    const hasAtt10 = adiLines.some(l => l && (l.includes("공격력") || l.includes("마력")) && !l.includes("%") && l.match(/\+(\d+)/) && parseInt(l.match(/\+(\d+)/)?.[1] || "0") >= 10);
                    // 공/마 % (예: 마력 +3%)
                    const hasAttPct = adiLines.some(l => l && (l.includes("공격력") || l.includes("마력")) && l.includes("%"));

                    if (!hasAtt10 && !hasAttPct) return true;
                }

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
                const eventRingKeywords = ["테네브리스", "어웨이크", "글로리온", "카오스", "벤젼스", "쥬얼링", "주얼링", "플레임"];
                const isEventRing = slot.includes("반지") && eventRingKeywords.some(k => name.includes(k));
                const isTyrant = name.includes("타일런트");
                const isEternal = name.includes("에테르넬");
                // 놀라운 장비 강화 주문서(놀장강) 적용 여부 확인
                const isAmazingEnhancement = isAmazingEnhancementItem(item);
                const hasAmazingScroll = (item.starforce_scroll_flag !== "0" && star > 0) || isAmazingEnhancement;

                let starforceThreshold = isTyrant ? 10 : 17;
                if (isEternal) starforceThreshold = 12;

                const isNoStarforce = item.starforce_scroll_flag === "0" && parseInt(item.starforce || "0") === 0;
                if (!isNoStarforce && !isEventRing) {
                    if (!isSpecialRing && !hasAmazingScroll && star < starforceThreshold) return true;
                }

                // 2. 주문서 작 체크
                if (!isSpecialRing && !name.includes("글로리온") && !hasAmazingScroll) {
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
                        const eventRingKeywords = ["테네브리스", "어웨이크", "글로리온", "카오스", "벤젼스", "쥬얼링", "주얼링", "플레임"];
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
                        // 공/마 상수 +10 이상
                        const hasAtt10 = adiLines.some(l => l && (l.includes("공격력") || l.includes("마력")) && !l.includes("%") && l.match(/\+(\d+)/) && parseInt(l.match(/\+(\d+)/)?.[1] || "0") >= 10);
                        // 공/마 % (예: 마력 +3%)
                        const hasAttPct = adiLines.some(l => l && (l.includes("공격력") || l.includes("마력")) && l.includes("%"));
                        // 주스탯 %
                        const hasStatPct = adiLines.some(l => l && l.includes("%") && (l.includes("STR") || l.includes("DEX") || l.includes("INT") || l.includes("LUK") || l.includes("HP") || l.includes("올스탯")));
                        if (!hasAtt10 && !hasAttPct && !hasStatPct) return true;
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

                const eventRingKeywords = ["테네브리스", "어웨이크", "글로리온", "카오스", "벤젼스", "쥬얼링", "주얼링", "플레임"];
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

                // 놀장강 처리: 10성 이상이면 20성급이므로 18성 통과
                const isAmazingEnhancement = isAmazingEnhancementItem(item);
                if (isAmazingEnhancement) {
                    if (star < 10) return true;
                    return false;
                }

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

                // 놀장강 처리: 12성 이상이면 22성급이므로 통과
                const isAmazingEnhancement = isAmazingEnhancementItem(item);
                if (isAmazingEnhancement) {
                    if (star < 12) return true;
                    return false;
                }

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
                            {getStarforce(item) > 0 && (
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
                                {getStarforce(expandedPassedItem) > 0 && (
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
                                    if (val === "0") return null;
                                    if (key === "equipment_level_decrease") return null;
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
                            {getStarforce(item) > 0 && (
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
                                {getStarforce(expandedFailedItem) > 0 && (
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
                                    if (val === "0") return null;
                                    if (key === "equipment_level_decrease") return null;
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
                        <Stage0Content
                            renderPassedItemsSection={renderPassedItemsSection}
                            renderFailedItemsSection={renderFailedItemsSection}
                            attTypeKor={attTypeKor}
                        />
                    )}

                    {stageInfo.id === 1 && (
                        <Stage1Content
                            setCounts={setCounts}
                            isGenesisWeapon={isGenesisWeapon}
                        />
                    )}

                    {stageInfo.id === 2 && (
                        <Stage2Content
                            equipment={equipment}
                            attTypeKor={attTypeKor}
                            passedRings={passedRings}
                        />
                    )}

                    {stageInfo.id === 3 && (
                        <Stage3Content
                            passedArmorOption={passedArmorOption}
                            isPassed={isPassed}
                            onPass={onPass}
                        />
                    )}

                    {stageInfo.id === 4 && stage4Stats && (
                        <Stage4Content
                            stage4Stats={stage4Stats}
                            renderPassedItemsSection={renderPassedItemsSection}
                            renderFailedItemsSection={renderFailedItemsSection}
                        />
                    )}

                    {stageInfo.id === 5 && stage5Stats && (
                        <Stage5Content
                            stage5Stats={stage5Stats}
                            isPassed={isPassed}
                            onPass={onPass}
                        />
                    )}

                    {stageInfo.id === 6 && stage6Stats && (
                        <Stage6Content
                            stage6Stats={stage6Stats}
                            renderPassedItemsSection={renderPassedItemsSection}
                            renderFailedItemsSection={renderFailedItemsSection}
                        />
                    )}

                    {stageInfo.id === 7 && stage7Info && (
                        <Stage7Content
                            stage7Info={stage7Info}
                            renderPassedItemsSection={renderPassedItemsSection}
                            renderFailedItemsSection={renderFailedItemsSection}
                        />
                    )}

                    {stageInfo.id === 8 && stage8Stats && (
                        <Stage8Content
                            stage8Stats={stage8Stats}
                            renderPassedItemsSection={renderPassedItemsSection}
                            renderFailedItemsSection={renderFailedItemsSection}
                        />
                    )}
                </div>
            )}
        </div>
    );
};
