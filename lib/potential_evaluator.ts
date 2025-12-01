import {
    getPotentialUpgradeRate,
    getPotentialGuaranteeCount,
    getPotentialResetCost,
    POTENTIAL_CEILING_COSTS,
    getAdditionalPotentialUpgradeRate,
    getAdditionalPotentialResetCost,
    ADDITIONAL_POTENTIAL_CEILING_COSTS
} from './cube_db';
import { isPensalirItem } from './utils/item_classifier';

export interface PotentialEvaluation {
    current_grade: '레어' | '에픽' | '유니크' | '레전드리';
    target_grade: '레어' | '에픽' | '유니크' | '레전드리';
    upgrade_rate: number;
    ceiling_count: number;
    ceiling_cost: number;
    avg_cost: number;
    options_score: number;
    good_options: string[];
    recommendation: string;
    evaluation: string;
}

function getCeilingCost(
    type: 'main' | 'additional',
    from: '레어' | '에픽' | '유니크',
    to: '에픽' | '유니크' | '레전드리',
    level: number
): number {
    const costsData = type === 'main' ? POTENTIAL_CEILING_COSTS : ADDITIONAL_POTENTIAL_CEILING_COSTS;
    const data = costsData.find(d => d.from_grade === from && d.to_grade === to);
    if (!data) return 0;

    if (level >= 250) return data.costs['250~300'];
    if (level >= 200) return data.costs['200~249'];
    if (level >= 160) return data.costs['160~199'];
    return data.costs['1~159'];
}

export function evaluatePotential(
    type: 'main' | 'additional',
    currentGrade: '레어' | '에픽' | '유니크' | '레전드리',
    options: string[],
    itemLevel: number,
    equipmentType: '무기' | '방어구' | '장신구' | '보조무기' | '엠블렘',
    itemSlot?: string,
    itemName?: string
): PotentialEvaluation {
    // 펜살리르/우트가르드 장비 특별 처리 (잠재능력 투자 비추천)
    if (itemName && isPensalirItem(itemName)) {
        const isWeapon = equipmentType === '무기' || itemName.includes('우트가르드');
        const isHatOverall = itemName.includes('모자') || itemName.includes('한벌옷');

        let recommendation = '';
        if (isWeapon) {
            recommendation = '[교체 권장] 우트가르드(펜살리르) 무기에 잠재능력 투자는 비효율적입니다. 아케인셰이드 무기로 교체하세요.';
        } else if (isHatOverall) {
            recommendation = '[교체 권장] 펜살리르 방어구에 잠재능력 투자는 비효율적입니다. 루타비스(카루타) 세트로 교체하세요.';
        } else {
            recommendation = '[교체 권장] 펜살리르 방어구에 잠재능력 투자는 비효율적입니다. 앱솔랩스/아케인셰이드로 교체하세요.';
        }

        return {
            current_grade: currentGrade,
            target_grade: '레전드리',
            upgrade_rate: 0,
            ceiling_count: 0,
            ceiling_cost: 0,
            avg_cost: 0,
            options_score: 0,
            good_options: [],
            recommendation,
            evaluation: '투자 비추천'
        };
    }

    // 🎁 이벤트링 특별 처리 (이벤트링 전용 레전드리 주문서 사용)
    const EVENT_RING_KEYWORDS = ["테네브리스", "SS급", "어웨이크", "글로리온", "카오스", "벤젼스", "결속의", "이터널 플레임", "어드벤처 딥다크", "쥬얼"];
    const isEventRing = itemName && EVENT_RING_KEYWORDS.some(k => itemName.includes(k));

    if (isEventRing && currentGrade !== '레전드리') {
        const { goodOptions, optionsScore } = evaluateOptions(type, currentGrade, options, equipmentType, itemSlot);

        let recommendation = '';
        if (currentGrade === '레어' || currentGrade === '에픽') {
            recommendation = '[이벤트링 업그레이드] 이벤트링 전용 레전드리 잠재능력 주문서를 사용하여 레전드리로 만드세요. (큐브 천장 비용 불필요!)';
        } else if (currentGrade === '유니크') {
            recommendation = '[이벤트링 업그레이드] 이벤트링 전용 레전드리 주문서로 레전드리를 만들면 더 강력해집니다.';
        }

        return {
            current_grade: currentGrade,
            target_grade: '레전드리',
            upgrade_rate: 0,
            ceiling_count: 0,
            ceiling_cost: 0,  // 천장 비용 0 (전용 주문서 사용)
            avg_cost: 0,
            options_score: optionsScore,
            good_options: goodOptions,
            recommendation,
            evaluation: currentGrade === '레어' || currentGrade === '에픽' ? '부족' : '준수'
        };
    }

    const targetGrade = '레전드리';
    const isMain = type === 'main';

    let upgradeRate = 0, ceilingCount = 0, ceilingCost = 0, avgCost = 0;

    if (currentGrade !== '레전드리') {
        const nextGrade = currentGrade === '레어' ? '에픽' : (currentGrade === '에픽' ? '유니크' : '레전드리');
        upgradeRate = isMain ? getPotentialUpgradeRate(currentGrade, nextGrade) : getAdditionalPotentialUpgradeRate(currentGrade, nextGrade);

        const ceilingData = (isMain ? POTENTIAL_CEILING_COSTS : ADDITIONAL_POTENTIAL_CEILING_COSTS)
            .find(d => d.from_grade === currentGrade && d.to_grade === nextGrade);

        ceilingCount = ceilingData?.count ?? 0;
        ceilingCost = getCeilingCost(type, currentGrade, nextGrade, itemLevel);

        const oneTimeCost = isMain ? getPotentialResetCost(itemLevel, currentGrade) : getAdditionalPotentialResetCost(itemLevel, currentGrade);
        avgCost = (oneTimeCost * 100 / upgradeRate) / 100000000;
    }

    const { goodOptions, optionsScore } = evaluateOptions(type, currentGrade, options, equipmentType, itemSlot);
    const recommendation = generateRecommendation(type, currentGrade, equipmentType, optionsScore, goodOptions, ceilingCost, itemSlot);
    const evaluation = generateEvaluation(type, currentGrade, equipmentType, optionsScore, goodOptions);

    return {
        current_grade: currentGrade,
        target_grade: targetGrade,
        upgrade_rate: upgradeRate,
        ceiling_count: ceilingCount,
        ceiling_cost: ceilingCost,
        avg_cost: avgCost,
        options_score: Math.max(0, optionsScore),
        good_options: goodOptions,
        recommendation,
        evaluation
    };
}

function generateEvaluation(
    type: 'main' | 'additional',
    grade: string,
    equipmentType: string,
    score: number,
    goodOptions: string[]
): string {
    // 1. 무기/보조무기/엠블렘 평가
    if (equipmentType === '무기' || equipmentType === '보조무기' || equipmentType === '엠블렘') {
        if (grade === '레전드리') {
            if (score >= 88) return '종결';
            if (score >= 66) return '훌륭';
            if (score >= 33) return '준수';
            return '아쉬움';
        }
        if (grade === '유니크') {
            if (score >= 90) return '종결급';
            if (score >= 70) return '준수';
            return '아쉬움';
        }
        return score >= 60 ? '준수' : '부족';
    }

    // 2. 방어구/장신구 평가
    if (type === 'main') {
        // 메인 잠재
        if (grade === '레전드리') {
            // 쿨감/크뎀 특수 평가
            const hasCoolReduce = goodOptions.some(opt => opt.includes('재사용 대기시간'));
            const hasCritDmg = goodOptions.some(opt => opt.includes('크리티컬 데미지'));

            if (hasCoolReduce) {
                let cd = 0;
                goodOptions.forEach(opt => {
                    const m = opt.match(/(\d+)초/);
                    if (m) cd += parseInt(m[1]);
                });
                if (cd >= 5) return '종결'; // 5초 이상
                if (cd >= 4) return '최상급'; // 4초
                if (cd >= 2) return '훌륭'; // 2초 이상
            }

            if (hasCritDmg) {
                let lines = goodOptions.filter(opt => opt.includes('크리티컬 데미지')).length;
                if (lines >= 3) return '신화';
                if (lines >= 2) return '종결';
                if (lines >= 1) return '훌륭';
            }

            if (score >= 90) return '종결'; // 33% 이상
            if (score >= 70) return '훌륭'; // 21% 이상
            if (score >= 50) return '준수'; // 15% 이상 (레전드리치곤 낮음)
            return '아쉬움';
        }
        if (grade === '유니크') {
            if (score >= 75) return '종결급'; // 21%
            if (score >= 50) return '준수'; // 15%
            return '아쉬움';
        }
        if (grade === '에픽') {
            if (score >= 50) return '종결급';
            return '준수';
        }
    } else {
        // 에디셔널
        if (grade === '레전드리') {
            const hasCoolReduce = goodOptions.some(opt => opt.includes('재사용 대기시간'));
            if (hasCoolReduce) {
                const cdLines = goodOptions.filter(opt => opt.includes('재사용 대기시간')).length;
                if (cdLines >= 3) return '신화';
                if (cdLines >= 2) return '종결';
                if (goodOptions.length >= 3) return '종결';
                if (goodOptions.length >= 2) return '최상급';
                return '훌륭';
            }

            if (score >= 21) return '종결';
            if (goodOptions.length >= 3 && score >= 17) return '종결';
            if (score >= 14) return '최상급';
            if (score >= 10) return '준수';
            return '아쉬움';
        }
        if (grade === '유니크') {
            if (score >= 15) return '종결급';
            if (score >= 10) return '준수';
            return '아쉬움';
        }
        if (grade === '에픽') {
            if (score >= 10) return '종결급';
            if (score >= 4) return '준수';
            return '아쉬움';
        }
        if (grade === '레어') {
            if (score >= 10) return '통과'; // 공 10
            if (score >= 3) return '통과';
            return '부족';
        }
    }

    return '미진단';
}

function evaluateOptions(
    type: 'main' | 'additional',
    currentGrade: string,
    options: string[],
    equipmentType: string,
    itemSlot?: string
): { goodOptions: string[], optionsScore: number } {

    if ((equipmentType === '무기' || equipmentType === '보조무기') && type === 'additional') {
        return evaluateWeaponAdditional(currentGrade, options);
    }

    if (equipmentType === '엠블렘') {
        return evaluateEmblem(type, options);
    }

    if (equipmentType !== '무기' && equipmentType !== '보조무기') {
        return evaluateArmorAccessory(options, type, currentGrade, itemSlot);
    }

    return evaluateWeaponMain(currentGrade, options);
}

function evaluateWeaponAdditional(grade: string, options: string[]) {
    let goodOptions: string[] = [];
    let optionsScore = 0;

    if (grade === '레전드리') {
        let totalPoints = 0;
        goodOptions = options.filter(opt => {
            let points = 0;
            if ((opt.includes('공격력 +') || opt.includes('마력 +')) && opt.includes('%')) points = 3;
            else if (opt.includes('보스 몬스터')) points = 1.5;
            else if (opt.includes('데미지')) points = 1;
            if (points > 0) { totalPoints += points; return true; }
            return false;
        });
        optionsScore = (totalPoints / 9) * 100;
    }
    else if (grade === '유니크') {
        let totalPoints = 0, attPercentCount = 0;
        goodOptions = options.filter(opt => {
            let points = 0;
            if ((opt.includes('공격력 +') || opt.includes('마력 +')) && opt.includes('%')) { points = 3; attPercentCount++; }
            else if (opt.includes('보스 몬스터')) points = 1;
            else if (opt.includes('데미지')) points = 0.5;
            if (points > 0) { totalPoints += points; return true; }
            return false;
        });
        if (attPercentCount >= 3) optionsScore = 90;
        else if (attPercentCount >= 2) optionsScore = 70;
        else optionsScore = (totalPoints / 9) * 100;
    }
    else if (grade === '에픽') {
        const hasAttPercent = options.some(opt => (opt.includes('공격력 +') || opt.includes('마력 +')) && opt.includes('%'));
        if (hasAttPercent) {
            optionsScore = 60;
            goodOptions = options.filter(opt => (opt.includes('공격력 +') || opt.includes('마력 +')) && opt.includes('%'));
        }
    }
    else {
        const hasAtt = options.some(opt => opt.includes('공격력 +') || opt.includes('마력 +'));
        if (hasAtt) {
            goodOptions = options.filter(opt => opt.includes('공격력 +') || opt.includes('마력 +'));
            optionsScore = 20;
        }
    }

    return { goodOptions, optionsScore };
}

function evaluateEmblem(type: string, options: string[]) {
    let goodOptions: string[] = [];
    let optionsScore = 0;

    if (type === 'additional') {
        goodOptions = options.filter(opt => (opt.includes('공격력 +') || opt.includes('마력 +')) && opt.includes('%'));
        optionsScore = (goodOptions.length / 3) * 100;
    } else {
        let iedCount = 0;
        goodOptions = options.filter(opt => {
            if ((opt.includes('공격력 +') || opt.includes('마력 +')) && opt.includes('%')) return true;
            if (opt.includes('몬스터 방어율')) { iedCount++; return iedCount <= 1; }
            return false;
        });
        optionsScore = (goodOptions.length / 3) * 100;
    }

    return { goodOptions, optionsScore };
}

function evaluateArmorAccessory(options: string[], type: 'main' | 'additional' = 'main', currentGrade: string = '레전드리', itemSlot?: string) {
    const goodOptions: string[] = [];

    // 메인 잠재능력 평가
    if (type === 'main') {
        let totalStatPercent = 0;
        let hasCritDamage = false;
        let maxCritDamageValue = 0;
        let cooldownReduction = 0;

        // 🔍 주스탯 추론: 가장 많이 나온 스탯을 주스탯으로 간주
        const statCounts = { STR: 0, DEX: 0, INT: 0, LUK: 0 };
        options.forEach(opt => {
            if (opt.includes('STR') && opt.includes('%') && !opt.includes('크리티컬')) statCounts.STR++;
            if (opt.includes('DEX') && opt.includes('%') && !opt.includes('크리티컬')) statCounts.DEX++;
            if (opt.includes('INT') && opt.includes('%') && !opt.includes('크리티컬')) statCounts.INT++;
            if (opt.includes('LUK') && opt.includes('%') && !opt.includes('크리티컬')) statCounts.LUK++;
        });
        const mainStat = (Object.keys(statCounts) as Array<'STR' | 'DEX' | 'INT' | 'LUK'>).reduce((a, b) => (statCounts[a] > statCounts[b] ? a : b));
        const hasAnyStatPercent = Object.values(statCounts).some(count => count > 0);

        options.forEach(opt => {
            // 주스탯 % (주스탯만 유효)
            if (opt.includes('%') && !opt.includes('크리티컬') && !opt.includes('재사용')) {
                const match = opt.match(/(\d+)%/);
                if (match) {
                    const val = parseInt(match[1]);
                    // 올스탯은 항상 유효 (0.5 가중치)
                    if (opt.includes('올스탯')) {
                        totalStatPercent += (val * 0.5);
                        goodOptions.push(opt);
                    }
                    // 개별 스탯은 주스탯만 유효
                    else if (hasAnyStatPercent && opt.includes(mainStat)) {
                        totalStatPercent += val;
                        goodOptions.push(opt);
                    }
                }
            }
            // 크뎀 %
            else if (opt.includes('크리티컬 데미지') && opt.includes('%')) {
                const match = opt.match(/(\d+)%/);
                if (match) {
                    maxCritDamageValue = Math.max(maxCritDamageValue, parseInt(match[1]));
                    hasCritDamage = true;
                    goodOptions.push(opt);
                }
            }
            // 쿨타임 감소 (모자 등)
            else if (opt.includes('재사용 대기시간')) {
                const match = opt.match(/(\d+)초/);
                if (match) {
                    cooldownReduction += parseInt(match[1]);
                    goodOptions.push(opt);
                }
            }
        });

        // 주스탯 % 합산 점수
        let totalPoints = 0;

        if (currentGrade === '유니크') {
            // 유니크: 2줄(15%) 통과, 3줄(21%) 좋음
            if (totalStatPercent >= 21) totalPoints = 75; // 3줄 좋음
            else if (totalStatPercent >= 15) totalPoints = 50; // 2줄 통과
            else totalPoints = 30;
        } else {
            // 레전드리
            if (totalStatPercent >= 36) totalPoints = 100; // 3줄 초월급 (12%×3)
            else if (totalStatPercent >= 34) totalPoints = 95; // 3줄 엔드급 (11%×3 이상)
            else if (totalStatPercent >= 33) totalPoints = 90; // 3줄 최상급 (11%×3)
            else if (totalStatPercent >= 21) totalPoints = 70; // 2줄 좋음 (7%×3 or 10%+11%)
            else if (totalStatPercent >= 18) totalPoints = 60; // 주스탯+올스탯 조금 좋음
            else if (totalStatPercent >= 15) totalPoints = 50; // 통과
            else totalPoints = 30;
        }

        // 크뎀이 있으면 대체 점수
        if (hasCritDamage) {
            let critPoints = 0;
            if (maxCritDamageValue >= 8) critPoints = 100;
            else if (maxCritDamageValue >= 7) critPoints = 90;
            else if (maxCritDamageValue >= 6) critPoints = 80;
            else if (maxCritDamageValue >= 5) critPoints = 70;
            else if (maxCritDamageValue >= 4) critPoints = 60;
            else critPoints = 50;

            totalPoints = Math.max(totalPoints, critPoints);
        }

        // 쿨감 평가 (itemSlot 체크 제거, 쿨감 옵션이 있으면 모자로 간주)
        if (cooldownReduction > 0) {
            let cooldownPoints = 0;
            if (cooldownReduction >= 6) cooldownPoints = 100; // 초월급
            else if (cooldownReduction >= 5) cooldownPoints = 95; // 엔드급
            else if (cooldownReduction >= 4) cooldownPoints = 90; // 최상급
            else if (cooldownReduction >= 3) cooldownPoints = 80; // 진짜 좋음
            else if (cooldownReduction >= 2) cooldownPoints = 70; // 좋음
            else cooldownPoints = 50;

            totalPoints = Math.max(totalPoints, cooldownPoints);
        }

        return { goodOptions, optionsScore: totalPoints };
    }
    // 에디셔널 잠재능력 평가
    else {
        let totalStatEquivalent = 0;
        let validLines = 0;

        // 🔍 주스탯 추론: 가장 많이 나온 스탯을 주스탯으로 간주
        const statCounts = { STR: 0, DEX: 0, INT: 0, LUK: 0 };
        options.forEach(opt => {
            if (opt.includes('STR') && opt.includes('%')) statCounts.STR++;
            if (opt.includes('DEX') && opt.includes('%')) statCounts.DEX++;
            if (opt.includes('INT') && opt.includes('%')) statCounts.INT++;
            if (opt.includes('LUK') && opt.includes('%')) statCounts.LUK++;
        });
        const mainStat = (Object.keys(statCounts) as Array<'STR' | 'DEX' | 'INT' | 'LUK'>).reduce((a, b) => (statCounts[a] > statCounts[b] ? a : b));
        const hasAnyStatPercent = Object.values(statCounts).some(count => count > 0);

        options.forEach(opt => {
            let isGoodOption = false;

            // 1. 주스탯 % 체크 (주스탯 또는 올스탯만 유효)
            if (opt.includes('%') && !opt.includes('크리티컬')) {
                const match = opt.match(/(\d+)%/);
                if (match) {
                    const val = parseInt(match[1]);
                    // 올스탯은 항상 유효
                    if (opt.includes('올스탯')) {
                        totalStatEquivalent += val;
                        isGoodOption = true;
                    }
                    // 개별 스탯은 주스탯만 유효 (주스탯이 명확한 경우에만)
                    else if (hasAnyStatPercent && opt.includes(mainStat)) {
                        totalStatEquivalent += val;
                        isGoodOption = true;
                    }
                }
            }
            // 2. 렙당 스탯 (캐릭터 기준 9레벨 당) - 주스탯만 유효
            else if (opt.includes('레벨 당') || opt.includes('9레벨 당')) {
                const match = opt.match(/\+(\d+)/);
                if (match) {
                    const val = parseInt(match[1]);
                    // 올스탯 또는 주스탯인 경우에만 유효
                    if (opt.includes('올스탯') || (hasAnyStatPercent && opt.includes(mainStat))) {
                        // 렙당 2 = 약 6% (레전드리 유효), 렙당 1 = 약 3% (유니크/레전드리 유효)
                        if (val >= 2) totalStatEquivalent += 6;
                        else if (val >= 1) totalStatEquivalent += 3;
                        isGoodOption = true;
                    }
                }
            }
            // 3. 공/마 상수 (10 이상)
            else if ((opt.includes('공격력 +') || opt.includes('마력 +')) && !opt.includes('%')) {
                const match = opt.match(/\+(\d+)/);
                if (match) {
                    const val = parseInt(match[1]);
                    if (val >= 10) {
                        // 공/마 +10은 주스탯 약 3~4% 효율로 환산
                        totalStatEquivalent += 3;
                        isGoodOption = true;
                    }
                }
            }

            // 4. 쿨타임 감소 (모자 에디셔널 등)
            else if (opt.includes('재사용 대기시간')) {
                const match = opt.match(/(\d+)초/);
                if (match) {
                    // 쿨감은 점수(score)로 환산하기 어려우므로 별도 플래그 처리하거나 점수에 반영하지 않음
                    // 하지만 goodOptions에는 포함되어야 함
                    isGoodOption = true;
                }
            }

            if (isGoodOption) {
                validLines++;
                goodOptions.push(opt);
            }
        });

        // 점수 산정 (주스탯 % 환산치 그대로 사용)
        return { goodOptions, optionsScore: totalStatEquivalent };
    }
}

function evaluateWeaponMain(grade: string, options: string[]) {
    let totalPoints = 0;
    const goodOptions = options.filter(opt => {
        let points = 0;
        if ((opt.includes('공격력 +') || opt.includes('마력 +')) && opt.includes('%')) points = 3;
        else if (opt.includes('보스 몬스터')) points = 3;
        else if (opt.includes('몬스터 방어율')) points = 2;
        else if (opt.includes('데미지') && !opt.includes('보스') && !opt.includes('크리티컬')) points = 1.5;
        else if (opt.includes('STR') || opt.includes('DEX') || opt.includes('INT') || opt.includes('LUK')) points = 1;
        if (points > 0) { totalPoints += points; return true; }
        return false;
    });

    let optionsScore = (totalPoints / 9) * 100;

    if (grade === '레전드리') {
        const iedCount = goodOptions.filter(opt => opt.includes('몬스터 방어율')).length;
        if (iedCount >= 2) optionsScore -= 20;
    }

    return { goodOptions, optionsScore };
}

function generateRecommendation(
    type: string,
    grade: string,
    equipmentType: string,
    score: number,
    goodOptions: string[],
    ceilingCost: number,
    itemSlot?: string
): string {
    if ((equipmentType === '무기' || equipmentType === '보조무기') && type === 'additional') {
        return generateWeaponAdditionalRecommendation(grade, score, goodOptions);
    }

    if (equipmentType === '엠블렘') {
        return generateEmblemRecommendation(type, score, goodOptions);
    }

    return generateGeneralRecommendation(grade, score, equipmentType, type, goodOptions, ceilingCost, itemSlot);
}

function generateWeaponAdditionalRecommendation(grade: string, score: number, goodOptions: string[]): string {
    if (grade === '레전드리') {
        const hasBoss = goodOptions.some(opt => opt.includes('보스 몬스터'));
        if (score >= 88) return '공격력/마력 % 위주의 최상급 옵션입니다. 종결하셔도 좋습니다.';
        if (score >= 66) return hasBoss ? '공/마%와 보공%가 섞인 준수한 옵션입니다.' : '공격력/마력 % 2줄 이상으로 준수한 옵션입니다.';
        if (score >= 33) return '유효 옵션이 있지만, 공/마% 비중이 낮거나 줄 수가 부족합니다.';
        return '공격력/마력 % 옵션을 목표로 재설정이 필요합니다.';
    }
    if (grade === '유니크') {
        if (score >= 90) return '공/마% 3줄로 꽤 준수합니다. (레전드리 2줄급 효율) 종결하셔도 무방합니다.';
        if (score >= 70) return '공/마% 2줄로 통과 기준을 만족합니다. 사용하셔도 좋습니다.';
        return '공/마% 2줄 이상을 목표로 재설정하거나 레전드리 등급업을 권장합니다.';
    }
    if (grade === '에픽') {
        return score >= 60 ? '공/마% 옵션이 있어 임시로 사용하기 좋습니다. 추후 유니크 이상 도전을 권장합니다.' : '공격력/마력 % 옵션이 없습니다. 재설정이 필요합니다.';
    }
    return '공/마 상수 옵션이 좋지만, 에픽 이상으로 등급업하는 것이 최우선입니다.';
}

function generateEmblemRecommendation(type: string, score: number, goodOptions?: string[]): string {
    if (type === 'additional') {
        if (score >= 66) return '공격력/마력 % 위주의 훌륭한 옵션입니다.';
        if (score >= 33) return '공/마% 한 줄은 아쉽습니다. 2줄 이상을 목표로 하세요.';
        return '공격력/마력 % 옵션이 필수입니다.';
    }

    // 메인 잠재능력 평가
    const hasIED = goodOptions?.some(opt => opt.includes('몬스터 방어율'));

    if (score >= 88) return '공격력/마력 % 3줄! 엠블렘 종결 옵션입니다. 축하드립니다!';
    if (score >= 66) {
        if (hasIED) return '공/마%와 방무가 적절히 섞인 훌륭한 옵션입니다.';
        return '공격력/마력 % 2줄 이상으로 아주 훌륭한 옵션입니다.';
    }
    if (score >= 33) return '쓸만한 옵션이지만, 공/마% 비중을 높이는 것이 좋습니다.';
    return '재설정이 필요합니다. 엠블렘은 공/마%가 핵심입니다.';
}

function generateGeneralRecommendation(
    grade: string,
    score: number,
    equipmentType: string,
    type: string,
    goodOptions: string[],
    ceilingCost: number,
    itemSlot?: string
): string {
    // 방어구/장신구 평가
    if (equipmentType === '방어구' || equipmentType === '장신구') {
        if (type === 'main') {
            if (grade !== '유니크' && grade !== '레전드리') {
                return `${grade}에서 최소 유니크 이상으로 등급업이 필요합니다.`;
            }

            if (grade === '유니크') {
                if (score >= 75) return '유니크 좋음! 주스탯 3줄(21% 이상)입니다.';
                if (score >= 50) return '유니크 통과. 주스탯 2줄(15% 이상) 기준을 만족합니다.';
                return '주스탯 2줄(15% 이상)을 목표로 재설정이 필요합니다.';
            }

            // 레전드리
            // 쿨감 옵션이 있으면 우선 평가 (itemSlot 체크 제거)
            if (goodOptions.some(opt => opt.includes('재사용 대기시간'))) {
                // 쿨감 수치 계산
                let totalCooldown = 0;
                goodOptions.forEach(opt => {
                    if (opt.includes('재사용 대기시간')) {
                        const match = opt.match(/(\d+)초/);
                        if (match) totalCooldown += parseInt(match[1]);
                    }
                });

                if (totalCooldown >= 6) return '초월급! 쿨감 6초 이상입니다. 전서버급 옵션!';
                if (totalCooldown >= 5) return '엔드급! 쿨감 5초 이상입니다. 졸업하셔도 됩니다.';
                if (totalCooldown >= 4) return '최상급! 쿨감 4초 이상입니다. 매우 훌륭합니다.';
                if (totalCooldown >= 3) return '진짜 좋음! 쿨감 3초 이상입니다.';
                if (totalCooldown >= 2) return '좋음! 쿨감 2초 이상입니다.';
            }

            // 크뎀 옵션이 있으면 우선 평가
            if (goodOptions.some(opt => opt.includes('크리티컬 데미지'))) {
                // 크뎀 줄 수 계산
                let critDamageLines = 0;
                goodOptions.forEach(opt => {
                    if (opt.includes('크리티컬 데미지')) {
                        critDamageLines++;
                    }
                });

                // 주스탯 또는 올스탯이 있는지 확인
                const hasStatPercent = goodOptions.some(opt =>
                    (opt.includes('STR') || opt.includes('DEX') || opt.includes('INT') || opt.includes('LUK') || opt.includes('올스탯'))
                    && opt.includes('%')
                    && !opt.includes('크리티컬')
                );

                // 크뎀 줄 수와 조합에 따라 평가
                if (critDamageLines >= 3) {
                    return '초월급! 크뎀 3줄입니다. 전서버급 장갑 옵션!';
                } else if (critDamageLines >= 2 && hasStatPercent) {
                    return '엔드급! 크뎀 2줄 + 스탯%입니다. 졸업하셔도 됩니다.';
                } else if (critDamageLines >= 2) {
                    return '최고 좋음! 크뎀 2줄입니다. 매우 훌륭합니다.';
                } else if (critDamageLines >= 1 && hasStatPercent) {
                    return '진짜 좋음! 크뎀 + 스탯% 조합입니다.';
                } else if (critDamageLines >= 1) {
                    return '좋음! 크뎀 옵션이 있습니다.';
                }
            }

            if (score >= 100) return '초월급! 주스탯 3줄 완벽(36% 이상)입니다. 최고의 최고!';
            if (score >= 95) return '엔드급! 주스탯 3줄 하이엔드(34% 이상)입니다.';
            if (score >= 90) return '최상급! 주스탯 3줄(33% 이상)입니다. 종결급입니다.';
            if (score >= 70) return '좋음! 주스탯 2줄(21% 이상)입니다.';
            if (score >= 60) return '조금 좋음. 주스탯+올스탯 조합(18% 이상)입니다.';
            if (score >= 50) return '통과. 주스탯 2줄 기본 기준(15% 이상)을 만족합니다.';
            return '재설정 필요. 주스탯 2줄(15% 이상)을 목표로 하세요.';
        } else {
            // 에디셔널 잠재능력
            if (!grade || grade === '') grade = '레어';

            if (grade === '레전드리') {
                // 에디셔널 쿨감 체크
                const hasCoolReduce = goodOptions.some(opt => opt.includes('재사용 대기시간'));
                if (hasCoolReduce) {
                    let cd = 0;
                    let cdLines = 0;
                    goodOptions.forEach(opt => {
                        const m = opt.match(/(\d+)초/);
                        if (m) {
                            cd += parseInt(m[1]);
                            cdLines++;
                        }
                    });

                    if (cdLines >= 3) return `신화급! 에디셔널 쿨감 -${cd}초...?! 전 서버에 몇 없는 기적의 아이템입니다.`;
                    if (cdLines >= 2) return `종결급! 에디셔널 쿨감 -${cd}초! 윗잠에서도 보기 힘든 옵션입니다.`;

                    const lineCount = goodOptions.length;
                    if (lineCount >= 3) return `종결급! 에디셔널 쿨감 -${cd}초에 유효 옵션 2줄까지! 완벽합니다.`;
                    if (lineCount >= 2) return `최상급! 에디셔널 쿨감 -${cd}초와 유효 옵션을 함께 챙기셨네요.`;
                    return `훌륭함! 에디셔널 쿨감 -${cd}초는 직업에 따라 최고의 옵션입니다.`;
                }

                const lineCount = goodOptions.length;
                const linesText = lineCount >= 3 ? '3줄 유효' : (lineCount >= 2 ? '2줄 유효' : '1줄 유효');

                if (score >= 21) return `종결급! 주스탯 ${score}%급 효율입니다. (${linesText})`;
                if (lineCount >= 3 && score >= 17) return `종결급! 주스탯 ${score}%급 효율입니다. (${linesText})`;
                if (score >= 14) return `최상급! 주스탯 ${score}%급 효율입니다. (${linesText})`;
                if (score >= 10) return `준수함! 주스탯 ${score}%급 효율입니다. (${linesText})`;
                return `레전드리 등급이지만 옵션이 아쉽습니다. (${score}%급)`;
            }

            if (grade === '유니크') {
                if (score >= 15) return `유니크 종결! 주스탯 ${score}%급 효율입니다.`;
                if (score >= 10) return `유니크 통과! 주스탯 ${score}%급 효율입니다.`;
                return '재설정 권장. 주스탯 15%급 이상을 목표로 하세요.';
            }

            if (grade === '에픽') {
                if (score >= 10) return `에픽 종결! 주스탯 ${score}%급 효율입니다.`;
                if (score >= 4) return `에픽 통과! 주스탯 ${score}%급 효율입니다.`; // 공/마 10 = 3% + 1%?
                return '재설정 필요. 공/마 10 또는 주스탯 4% 이상을 챙기세요.';
            }

            if (grade === '레어') {
                if (score >= 3) return '레어 통과! 공/마 +10 이상 기준을 만족합니다.';
                return '공/마 +10 이상을 목표로 재설정이 필요합니다.';
            }

            return '잠재능력 등급 확인이 필요합니다.';
        }
    }

    // 무기/보조무기 평가
    if (grade !== '레전드리') {
        return `${grade}에서 레전드리로 등급업이 필요합니다. 천장 비용은 약 ${ceilingCost}억 메소입니다.`;
    }

    let rec = '';
    if (score >= 66) rec = '훌륭한 옵션입니다. 종결하셔도 좋습니다.';
    else if (score >= 33) rec = '쓸만한 옵션이지만, 더 좋은 옵션을 노려볼 수 있습니다.';
    else rec = '옵션 재설정이 필요합니다.';

    if ((equipmentType === '무기' || equipmentType === '보조무기') && type === 'main') {
        const iedCount = goodOptions.filter(opt => opt.includes('몬스터 방어율')).length;
        if (iedCount >= 2) rec += ' 방어율 무시 옵션이 과도합니다(2줄 이상). 방무 1줄을 보공이나 공격력%로 바꾸는 것을 강력 추천합니다.';
    }

    return rec;
}
