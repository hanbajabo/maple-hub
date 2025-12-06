import { EquipmentItem, Issue, GRADE_SCORE } from '../types';
import { getJobInfo } from '../constants';
import { calcStatScore, getScrollStat } from '../utils';
import { getStarforce } from '@/lib/diagnosis/utils';
import { isAmazingEnhancementItem } from '@/lib/amazing_enhancement_table';

// UI Stage 5: 17-star Growth Diagnosis
export const evaluateStage4 = (equipment: EquipmentItem[], jobName: string, attTypeKor: string) => {
    const { mainStat } = getJobInfo(jobName);
    let targetKeywords = [mainStat, "올스탯"];
    const isDA = jobName === "데몬어벤져";
    const isXenon = jobName === "제논";
    if (isDA) targetKeywords = ["HP", "최대 HP", "올스탯"];
    if (isXenon) targetKeywords = ["STR", "DEX", "LUK", "올스탯"];

    let stage4Issues = 0;
    const issues: Issue[] = [];
    const stage4Stats = {
        armor: {
            starforce: { current: 0, total: 0, failedItems: [] as string[] },
            scroll: { current: 0, total: 0, failedItems: [] as string[] },
            flame: { current: 0, total: 0, failedItems: [] as string[] },
            potential: { current: 0, total: 0, failedItems: [] as string[] },
            additional: { current: 0, total: 0, failedItems: [] as string[] }
        },
        accessory: {
            starforce: { current: 0, total: 0, failedItems: [] as string[] },
            scroll: { current: 0, total: 0, failedItems: [] as string[] },
            flame: { current: 0, total: 0, failedItems: [] as string[] },
            potential: { current: 0, total: 0, failedItems: [] as string[] },
            additional: { current: 0, total: 0, failedItems: [] as string[] }
        }
    };

    const armorSlots = ["모자", "상의", "하의", "상의(한벌옷)", "신발", "장갑", "망토"];
    const accessorySlots = ["반지1", "반지2", "반지3", "반지4", "펜던트", "펜던트2", "얼굴장식", "눈장식", "귀고리", "벨트", "어깨장식"];

    equipment.forEach(item => {
        const slot = item.item_equipment_slot;
        const name = item.item_name;

        // 대상 아이템 선별
        let isArmor = armorSlots.includes(slot);
        let isAccessory = accessorySlots.includes(slot) || (slot === "반지" && item.item_equipment_slot.includes("반지")); // 슬롯명 보정

        // 숄더는 장신구로 분류
        if (name.includes("숄더") || name.includes("견장")) {
            isArmor = false;
            isAccessory = true;
        }

        if (!isArmor && !isAccessory) return;
        if (name.includes("실버블라썸") || name.includes("이피아")) return; // 저레벨 장신구 제외 가능성

        const targetStats = isArmor ? stage4Stats.armor : stage4Stats.accessory;

        // 도전자 아이템은 5단계 모든 체크 스킵 (올패스)
        if (name.includes("도전자")) {
            // 모든 스탯 카운트만 증가시키고 통과 처리
            const isNoFlame = slot.includes("반지") || name.includes("숄더") || name.includes("견장");
            const eventRingKeywords = ["테네브리스", "어웨이크", "글로리온", "카오스", "벤젼스", "쥬얼링", "주얼링", "플레임"];
            const isEventRing = slot.includes("반지") && eventRingKeywords.some(k => name.includes(k));
            const isNoStarforce = item.starforce_scroll_flag === "0" && getStarforce(item) === 0;

            if (!isNoStarforce && !isEventRing) {
                targetStats.starforce.total++;
                targetStats.starforce.current++;
            }
            targetStats.scroll.total++;
            targetStats.scroll.current++;
            if (!isNoFlame) {
                targetStats.flame.total++;
                targetStats.flame.current++;
            }
            targetStats.potential.total++;
            targetStats.potential.current++;
            targetStats.additional.total++;
            targetStats.additional.current++;
            return; // 도전자 아이템은 여기서 종료
        }

        const star = getStarforce(item);
        const potGrade = item.potential_option_grade;
        const adiGrade = item.additional_potential_option_grade;
        const potScore = GRADE_SCORE[potGrade] || 0;
        const adiScore = GRADE_SCORE[adiGrade] || 0;

        const specialRingKeywords = ["리스트레인트", "웨폰퍼프", "리스크테이커", "컨티뉴어스", "어드벤처 딥다크 크리티컬 링"];
        const isSpecialRing = slot.includes("반지") && specialRingKeywords.some(k => name.includes(k));

        // 이벤트 링 (스타포스 불가)
        const eventRingKeywords = ["테네브리스", "어웨이크", "글로리온", "카오스", "벤젼스", "쥬얼링", "주얼링", "플레임"];
        const isEventRing = slot.includes("반지") && eventRingKeywords.some(k => name.includes(k));

        // 1. 스타포스 (17성 이상, 타일런트 10성 이상 -> 5성 이상)
        // * 특수 반지는 무조건 통과
        // * 놀라운 장비 강화 주문서 적용 아이템은 5성 이상 통과
        // * 에테르넬 장비는 12성만 되어도 통과 (12성 에테르넬 ≈ 18성 카루타)
        // * 이벤트 링은 스타포스 불가하므로 체크 제외
        const isTyrant = name.includes("타일런트");
        const isEternal = name.includes("에테르넬");

        // 놀라운 장비 강화 주문서(놀장강) 적용 여부 확인
        const isAmazingEnhancement = isAmazingEnhancementItem(item);
        const hasAmazingScroll = (item.starforce_scroll_flag !== "0" && star > 0) || isAmazingEnhancement;

        let starforceThreshold = 17;
        if (isTyrant || isAmazingEnhancement) starforceThreshold = 5;
        if (isEternal) starforceThreshold = 12;

        const isNoStarforce = item.starforce_scroll_flag === "0" && getStarforce(item) === 0;
        if (!isNoStarforce && !isEventRing) {
            targetStats.starforce.total++;
            if (isSpecialRing) {
                targetStats.starforce.current++;
            } else if (star < starforceThreshold) {
                stage4Issues++;
                targetStats.starforce.failedItems.push(`${name} (${star}성)`);
                issues.push({ type: 'growth_starforce', message: `[성장/스타포스] ${name}: ${starforceThreshold}성 미만 (${star}성)` });
            } else {
                targetStats.starforce.current++;
            }
        }

        // 2. 주문서 작 (방어구 56+ or 50급, 장신구 30급)
        // * 특수 반지 및 이벤트링은 무조건 통과 (전용 주문서/큐브 사용)
        targetStats.scroll.total++;
        const statKey = getJobInfo(jobName).mainStat.toLowerCase();
        const scrollMainStat = getScrollStat(item, statKey, jobName);
        const scrollScore = calcStatScore(item.item_etc_option, jobName);
        let scrollPass = false;

        // 이벤트링 키워드 (전용 주문서/큐브 사용으로 일반 주문서 작 평가 제외)
        const scrollEventRingKeywords = ["테네브리스", "어웨이크", "글로리온", "카오스", "벤젼스", "쥬얼링", "주얼링", "이터널 플레임", "결속의", "어비스"];
        const isScrollEventRing = slot.includes("반지") && scrollEventRingKeywords.some(k => name.includes(k));

        if (isSpecialRing || isScrollEventRing || hasAmazingScroll) {
            scrollPass = true;
        } else if (isArmor) {
            const isHat = slot === "모자";
            const threshold = isHat ? 84 : 56;
            if (scrollMainStat >= threshold || scrollScore >= 50) scrollPass = true;
            else {
                stage4Issues++;
                targetStats.scroll.failedItems.push(`${name} (+${scrollMainStat}/${scrollScore}급)`);
                issues.push({ type: 'growth_scroll', message: `[성장/주문서] ${name}: 작 상태 미달 (주스탯 +${threshold} 또는 50급 미만)` });
            }
        } else if (isAccessory) {
            if (scrollScore >= 30) scrollPass = true;
            else {
                stage4Issues++;
                targetStats.scroll.failedItems.push(`${name} (${scrollScore}급)`);
                issues.push({ type: 'growth_scroll', message: `[성장/주문서] ${name}: 작 상태 미달 (30급 미만) - 프악공/놀긍혼 추천` });
            }
        }
        if (scrollPass) targetStats.scroll.current++;

        // 3. 추가 옵션 (100급 이상) - 반지, 숄더 제외
        const isNoFlame = slot.includes("반지") || name.includes("숄더") || name.includes("견장");
        if (!isNoFlame) {
            targetStats.flame.total++;
            const flameScore = calcStatScore(item.item_add_option, jobName);
            if (flameScore < 100) {
                stage4Issues++;
                targetStats.flame.failedItems.push(`${name} (${flameScore}급)`);
                issues.push({ type: 'growth_flame', message: `[성장/추옵] ${name}: 100급 미만 (현재 ${flameScore}급)` });
            } else {
                targetStats.flame.current++;
            }
        }

        // 4. 잠재능력 (유니크 이상, 주스탯 15% 이상)
        // * 장갑: 크리티컬 데미지 있으면 무조건 통과
        // * 반지: 모든 링 15% 이상 통일
        targetStats.potential.total++;
        let potPass = false;

        const potLines = [item.potential_option_1, item.potential_option_2, item.potential_option_3].filter((s): s is string => !!s);
        const hasCritDmg = potLines.some(l => l.includes("크리티컬 데미지"));
        const hasCooldown = potLines.some(l => l.includes("재사용 대기시간"));

        const totalStatPct = potLines.reduce((sum: number, l: string) => {
            if (targetKeywords.some(k => l.includes(k)) && l.includes("%")) {
                const match = l.match(/(\d+)%/);
                return sum + (match ? parseInt(match[1]) : 0);
            }
            return sum;
        }, 0);

        if (slot === "장갑" && hasCritDmg) {
            potPass = true;
        } else if (slot === "모자" && hasCooldown) {
            potPass = true;
        } else if (slot.includes("반지")) {
            const eventRingKeywords = ["테네브리스", "어웨이크", "글로리온", "카오스", "벤젼스", "쥬얼링", "주얼링", "이터널 플레임", "결속의", "어비스", "플레임"];
            // specialRingKeywords는 위에서 정의됨
            const isEventRing = eventRingKeywords.some(k => name.includes(k));
            // isSpecialRing은 위에서 정의됨

            if (isSpecialRing) {
                potPass = true;
            } else {
                // 등급이 유니크 이상이거나, 주스탯 합이 15% 이상이면 통과
                if (potScore >= 3 || totalStatPct >= 15) {
                    // 유니크 이상인데 15% 미만이면 실패 (등급은 좋은데 옵션 미달)
                    if (potScore >= 3 && totalStatPct < 15) {
                        stage4Issues++;
                        targetStats.potential.failedItems.push(`${name} (${totalStatPct}%)`);
                        issues.push({ type: 'growth_potential', message: `[성장/잠재] ${name}: 주스탯 15% 미만 (현재 ${totalStatPct}%)` });
                    } else {
                        // 에픽 이하인데 15% 이상이면 통과 (고스펙 에픽)
                        // 유니크 이상이면서 15% 이상이면 통과
                        potPass = true;
                    }
                } else {
                    // 유니크 미만이면서 15% 미만 -> 실패
                    stage4Issues++;
                    targetStats.potential.failedItems.push(`${name} (${potGrade})`);
                    issues.push({ type: 'growth_potential', message: `[성장/잠재] ${name}: 유니크 등급 미만 & 15% 미만` });
                }
            }
        } else {
            // 일반 방어구/장신구
            // 등급이 유니크 이상이거나, 주스탯 합이 15% 이상이면 통과
            if (potScore >= 3 || totalStatPct >= 15) {
                // 유니크 이상인데 15% 미만이면 실패 (등급은 좋은데 옵션 미달)
                if (potScore >= 3 && totalStatPct < 15) {
                    stage4Issues++;
                    targetStats.potential.failedItems.push(`${name} (${totalStatPct}%)`);
                    issues.push({ type: 'growth_potential', message: `[성장/잠재] ${name}: 주스탯 15% 미만 (현재 ${totalStatPct}%)` });
                } else {
                    // 에픽 이하인데 15% 이상이면 통과 (고스펙 에픽)
                    // 유니크 이상이면서 15% 이상이면 통과
                    potPass = true;
                }
            } else {
                // 유니크 미만이면서 15% 미만 -> 실패
                stage4Issues++;
                targetStats.potential.failedItems.push(`${name} (${potGrade})`);
                issues.push({ type: 'growth_potential', message: `[성장/잠재] ${name}: 유니크 등급 미만 & 15% 미만` });
            }
        }
        if (potPass) targetStats.potential.current++;

        // 5. 에디셔널
        // * 반지: 이벤트링(레어+공10/탯4%), 일반링(에픽+공10/탯4%)
        targetStats.additional.total++;
        const adiLines = [item.additional_potential_option_1, item.additional_potential_option_2, item.additional_potential_option_3].filter((s): s is string => !!s);
        const hasAtt10 = adiLines.some((l: string) => {
            if (!l.includes(attTypeKor) && !l.includes("공격력") && !l.includes("마력")) return false;
            const clean = l.replace(/\s+/g, "");
            const match = clean.match(/\+(\d+)/);
            return match && parseInt(match[1]) >= 10;
        });
        const hasStatPct = adiLines.some((l: string) => targetKeywords.some(k => l.includes(k)) && l.includes("%"));
        const hasStat4 = adiLines.some((l: string) => targetKeywords.some(k => l.includes(k)) && l.includes("%") && (parseInt(l.match(/(\d+)%/)?.[1] || "0") >= 4));
        const hasLevelStat = adiLines.some((l: string) => l.includes("캐릭터 기준 9레벨 당")); // 렙당 주스탯 옵션

        let adiPass = false;

        if (slot.includes("반지")) {
            const eventRingKeywords = ["테네브리스", "어웨이크", "글로리온", "카오스", "벤젼스", "쥬얼링", "주얼링", "이터널 플레임", "결속의", "어비스", "플레임"];
            // specialRingKeywords는 위에서 정의됨
            const isEventRing = eventRingKeywords.some(k => name.includes(k));
            // isSpecialRing은 위에서 정의됨

            if (isSpecialRing) {
                adiPass = true;
            } else if (isEventRing) {
                // 이벤트링: 레어 이상 & (공10 or 탯4% or 렙당 주스탯)
                if (adiScore >= 1) {
                    if (hasAtt10 || hasStat4 || hasLevelStat) adiPass = true;
                    else {
                        stage4Issues++;
                        targetStats.additional.failedItems.push(name);
                        issues.push({ type: 'growth_additional', message: `[성장/에디] ${name}: 공/마+10 또는 주스탯 4% 또는 렙당 주스탯 미만` });
                    }
                } else {
                    stage4Issues++;
                    targetStats.additional.failedItems.push(name);
                    issues.push({ type: 'growth_additional', message: `[성장/에디] ${name}: 레어 등급 미만` });
                }
            } else {
                // 일반링: 레어 이상 & (공10 or 탯% or 렙당 주스탯)
                if (adiScore >= 2) { // 에픽 이상
                    if (hasAtt10 || hasStatPct || hasLevelStat) adiPass = true;
                    else {
                        stage4Issues++;
                        targetStats.additional.failedItems.push(name);
                        issues.push({ type: 'growth_additional', message: `[성장/에디] ${name}: 공/마+10 또는 주스탯% 또는 렙당 주스탯 미만` });
                    }
                } else if (adiScore >= 1) { // 레어
                    if (hasAtt10) adiPass = true;
                    else {
                        stage4Issues++;
                        targetStats.additional.failedItems.push(name);
                        issues.push({ type: 'growth_additional', message: `[성장/에디] ${name}: 공/마+10 옵션 없음` });
                    }
                } else {
                    stage4Issues++;
                    targetStats.additional.failedItems.push(name);
                    issues.push({ type: 'growth_additional', message: `[성장/에디] ${name}: 레어 등급 미만` });
                }
            }
        } else {
            // 일반 방어구/장신구: 레어 이상 & (공10 or 탯% or 렙당 주스탯)
            // * 에픽 이상이면 탯% or 공10 or 렙당 주스탯
            if (adiScore >= 2) { // 에픽 이상
                if (hasAtt10 || hasStatPct || hasLevelStat) adiPass = true;
                else {
                    stage4Issues++;
                    targetStats.additional.failedItems.push(name);
                    issues.push({ type: 'growth_additional', message: `[성장/에디] ${name}: 공/마+10 또는 주스탯% 또는 렙당 주스탯 미만` });
                }
            } else if (adiScore >= 1) { // 레어
                if (hasAtt10) adiPass = true;
                else {
                    stage4Issues++;
                    targetStats.additional.failedItems.push(name);
                    issues.push({ type: 'growth_additional', message: `[성장/에디] ${name}: 공/마+10 옵션 없음` });
                }
            } else {
                stage4Issues++;
                targetStats.additional.failedItems.push(name);
                issues.push({ type: 'growth_additional', message: `[성장/에디] ${name}: 레어 등급 미만` });
            }
        }
        if (adiPass) targetStats.additional.current++;
    });

    return { issues, issueCount: stage4Issues, stats: stage4Stats };
};
