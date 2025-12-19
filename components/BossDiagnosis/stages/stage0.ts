import { EquipmentItem, Issue, GRADE_SCORE } from '../types';
import { getJobInfo } from '../constants';
import { getStarforce } from '../../../lib/diagnosis/utils';
import { isAmazingEnhancementItem } from '@/lib/amazing_enhancement_table';

export const evaluateStage0 = (equipment: EquipmentItem[], jobName: string, attTypeKor: string) => {
    const { mainStat } = getJobInfo(jobName);
    const isDA = jobName === "데몬어벤져";
    const isXenon = jobName === "제논";

    let targetKeywords = [mainStat, "올스탯"];
    if (isDA) targetKeywords = ["HP", "최대 HP", "올스탯"];
    if (isXenon) targetKeywords = ["STR", "DEX", "LUK", "올스탯"];

    let totalItems = 0;
    let passedItems = 0;
    const issues: Issue[] = [];

    // 사냥용 장비 감지 (정령의 펜던트, 하프 이어링)
    const huntingEquipmentKeywords = ["정령의 펜던트", "하프 이어링"];
    const hasHuntingEquipment = equipment.some(item =>
        huntingEquipmentKeywords.some(keyword => item.item_name?.includes(keyword))
    );

    if (hasHuntingEquipment) {
        issues.push({
            type: 'wrong_preset',
            message: "⚠️ 현재 보스용 템셋팅이 아닌 것으로 추정됩니다. 인게임에서 보스용 템셋팅으로 변경 후 다시 보스용 진단을 눌러주세요."
        });
    }

    equipment.forEach(item => {
        const slot = item.item_equipment_slot;
        const name = item.item_name;
        if (!slot) return;
        // 캐시 장비 등 제외
        if (slot.includes("캐시") || slot.includes("치장")) return;

        // 어비스 헌터스 링 등 사냥용 반지 체크
        if (name.includes("어비스 헌터스 링")) {
            totalItems++;
            issues.push({
                type: 'boss_setting',
                message: `[보스 세팅 확인] ${name}: 사냥용 반지입니다. 보스용 반지로 교체 권장`
            });
            return; // 다른 검사 스킵하고 실패 처리 (totalItems는 증가했으므로 passedItems는 안 올라감 -> 실패)
        }

        totalItems++;
        let isPassed = true;

        // 진단 제외 슬롯 정의
        const isBadge = slot === "뱃지";
        const isPocket = slot === "포켓 아이템";
        const isMedal = slot === "훈장";
        const isEmblem = slot === "엠블렘";
        const isSubWeapon = slot === "보조무기" || slot === "방패" || slot.includes("블레이드");

        // 특수 반지 정의
        const specialRingKeywords = ["리스트레인트", "웨폰퍼프", "리스크테이커", "컨티뉴어스", "딥다크"];
        const isSpecialRing = slot.includes("반지") && specialRingKeywords.some(k => name.includes(k));

        // 1. 스타포스 (반지 제외 12성, 눈/얼굴 8성)
        // 제외: 뱃지, 포켓, 훈장, 엠블렘, 보조무기, 특수 반지
        const skipStarforce = isBadge || isPocket || isMedal || isEmblem || isSubWeapon || isSpecialRing;

        const star = getStarforce(item);

        // 놀라운 장비 강화 주문서(놀장강) 적용 여부 확인
        const isAmazingEnhancement = isAmazingEnhancementItem(item);
        const hasAmazingScroll = (item.starforce_scroll_flag !== "0" && star > 0) || isAmazingEnhancement;

        if (!slot.includes("반지") && !skipStarforce) {
            const isEyeFace = slot === "눈장식" || slot === "얼굴장식";
            const isFairyHeart = name.includes("페어리 하트");
            const isTyrant = name.includes("타일런트");

            let targetStar = 12;
            if (isEyeFace || isFairyHeart) targetStar = 8;

            // 놀장강/슈페리얼 아이템은 3성 이상이면 통과 (12성 기준)
            if (isAmazingEnhancement || isTyrant) {
                targetStar = 3;
            }

            // 놀장강 적용 아이템은 예외 처리 (통과) -> 이제 기준 적용
            if (star < targetStar) {
                isPassed = false;
                issues.push({ type: 'starforce', message: `[스타포스] ${item.item_name}: ${targetStar}성 미만 (${star}성)` });
            }
        }

        // 2. 잠재능력 (에픽 이상, 주스탯% or 공/마%)
        // 제외: 뱃지, 포켓, 훈장, 특수 반지
        // * 보조무기: 유니크 이상이면 무조건 통과
        const skipPotential = isBadge || isPocket || isMedal || isSpecialRing;

        if (!skipPotential) {
            const potGrade = item.potential_option_grade;
            const potScore = GRADE_SCORE[potGrade] || 0;

            // 보조무기 유니크 이상 통과
            const isSubWeaponUnique = isSubWeapon && potScore >= 3;

            if (isSubWeaponUnique) {
                // Pass
            } else if (potScore < 2) { // 에픽 미만
                isPassed = false;
                issues.push({ type: 'potential', message: `[잠재능력] ${item.item_name}: 에픽 등급 미만` });
            } else {
                const potLines = [item.potential_option_1, item.potential_option_2, item.potential_option_3].filter((s): s is string => !!s);

                // 모자: 쿨감 있으면 통과 (스킬 재사용 대기시간 -X초)
                const hasCooldown = slot === "모자" && potLines.some(l => l.includes("재사용 대기시간"));
                // 장갑: 크뎀 있으면 통과
                const hasCritDmg = slot === "장갑" && potLines.some(l => l.includes("크리티컬 데미지"));

                if (hasCooldown || hasCritDmg) {
                    // Pass
                } else {
                    const isWSE = slot === "무기" || slot === "보조무기" || slot === "엠블렘";
                    const isUniqueOrAbove = potScore >= 3;

                    const hasValidPot = potLines.some(l => {
                        const basicValid = (targetKeywords.some(k => l.includes(k)) || l.includes(attTypeKor)) && l.includes("%");
                        if (isWSE && isUniqueOrAbove) {
                            return basicValid || l.includes("보스 몬스터") || l.includes("방어율 무시");
                        }
                        return basicValid;
                    });

                    if (!hasValidPot) {
                        isPassed = false;
                        const extraMsg = isWSE && isUniqueOrAbove ? " or 보공% or 방무%" : "";
                        issues.push({ type: 'potential', message: `[잠재능력] ${item.item_name}: 유효 옵션(주스탯% or 공/마%${extraMsg}) 없음` });
                    }
                }
            }
        }

        // 3. 에디셔널 (레어 이상, 공/마+10)
        // 제외: 뱃지, 포켓, 훈장, 특수 반지
        const skipAdditional = isBadge || isPocket || isMedal || isSpecialRing;

        if (!skipAdditional) {
            const adiGrade = item.additional_potential_option_grade;
            const adiScore = GRADE_SCORE[adiGrade] || 0;
            if (adiScore < 1) { // 레어 미만
                isPassed = false;
                issues.push({ type: 'additional', message: `[에디셔널] ${item.item_name}: 레어 등급 미만` });
            } else {
                const adiLines = [item.additional_potential_option_1, item.additional_potential_option_2, item.additional_potential_option_3].filter((s): s is string => !!s);

                // 공/마 +10 확인
                const hasAtt10 = adiLines.some(l => {
                    if (l.includes(attTypeKor) || l.includes("공격력") || l.includes("마력")) {
                        const match = l.match(/\+(\d+)/);
                        return match && parseInt(match[1]) >= 10;
                    }
                    return false;
                });

                // 주스탯 % 확인
                const hasStatPct = adiLines.some(l => targetKeywords.some(k => l.includes(k)) && l.includes("%"));

                // 크리티컬 데미지, 렙당 주스탯 확인 (모든 슬롯에 적용)
                const isGlove = slot === "장갑";
                const hasCritDmg = adiLines.some(l => l.includes("크리티컬 데미지"));
                const hasLevelStat = adiLines.some(l => l.includes("캐릭터 기준 9레벨 당"));

                if (isGlove && (hasCritDmg || hasLevelStat)) {
                    // Pass: 장갑이고 크뎀이나 렙당 스탯이 있으면 통과
                } else if (hasCritDmg) {
                    // Pass: 크리티컬 데미지가 있으면 통과 (모든 슬롯)
                } else {
                    // WSE (무기, 보조, 엠블렘) 에디셔널 공/마 % 확인 (에픽 이상, 3% 이상)
                    const isWSE = slot === "무기" || isSubWeapon || slot === "엠블렘";
                    const hasAttPct3 = adiLines.some(l => {
                        if ((l.includes("공격력") || l.includes("마력")) && l.includes("%")) {
                            const match = l.match(/(\d+)%/);
                            return match && parseInt(match[1]) >= 3;
                        }
                        return false;
                    });

                    if (isWSE) {
                        // WSE: 레어 이상이면 공/마 +10 OR 공/마 +3% 통과
                        if (!hasAtt10 && !hasAttPct3) {
                            isPassed = false;
                            issues.push({ type: 'additional', message: `[에디셔널] ${item.item_name}: 공/마 +10 또는 공/마 +3% 옵션 없음` });
                        }
                    } else if (adiScore >= 2) { // 에픽 이상 (일반 방어구/장신구)
                        // 공/마+10 OR 주스탯%
                        if (!hasAtt10 && !hasStatPct) {
                            isPassed = false;
                            issues.push({ type: 'additional', message: `[에디셔널] ${item.item_name}: 공/마 +10 또는 주스탯% 옵션 없음` });
                        }
                    } else { // 레어 (일반 방어구/장신구)
                        // 공/마+10
                        if (!hasAtt10) {
                            isPassed = false;
                            issues.push({ type: 'additional', message: `[에디셔널] ${item.item_name}: 공/마 +10 옵션 없음` });
                        }
                    }
                }
            }
        }

        if (isPassed) passedItems++;
    });

    return { totalItems, passedItems, issues };
};
