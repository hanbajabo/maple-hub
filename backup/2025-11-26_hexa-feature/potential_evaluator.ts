import {
    getPotentialUpgradeRate,
    getPotentialGuaranteeCount,
    getPotentialResetCost,
    POTENTIAL_CEILING_COSTS,
    getAdditionalPotentialUpgradeRate,
    getAdditionalPotentialResetCost,
    ADDITIONAL_POTENTIAL_CEILING_COSTS
} from './cube_db';

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
    itemSlot?: string
): PotentialEvaluation {
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

    return {
        current_grade: currentGrade,
        target_grade: targetGrade,
        upgrade_rate: upgradeRate,
        ceiling_count: ceilingCount,
        ceiling_cost: ceilingCost,
        avg_cost: avgCost,
        options_score: Math.max(0, optionsScore),
        good_options: goodOptions,
        recommendation
    };
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

        options.forEach(opt => {
            // 주스탯 %
            if ((opt.includes('STR') || opt.includes('DEX') || opt.includes('INT') || opt.includes('LUK')) && opt.includes('%')) {
                const match = opt.match(/(\d+)%/);
                if (match) {
                    totalStatPercent += parseInt(match[1]);
                    goodOptions.push(opt);
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
            // 올스탯 %
            else if (opt.includes('올스탯') && opt.includes('%') && !opt.includes('크리티컬')) {
                const match = opt.match(/(\d+)%/);
                if (match) {
                    totalStatPercent += (parseInt(match[1]) * 0.5);
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
        let attackLines = 0; // 공/마 +10 이상 줄 개수
        let statPercentLines = 0; // 주스탯 % 줄 개수

        options.forEach(opt => {
            // 공/마 상수 체크
            if ((opt.includes('공격력 +') || opt.includes('마력 +')) && !opt.includes('%')) {
                const match = opt.match(/\+(\d+)/);
                if (match && parseInt(match[1]) >= 10) {
                    attackLines++;
                    goodOptions.push(opt);
                }
            }
            // 주스탯 % 체크 (에픽 이상)
            else if (currentGrade !== '레어' && (opt.includes('STR') || opt.includes('DEX') || opt.includes('INT') || opt.includes('LUK')) && opt.includes('%')) {
                statPercentLines++;
                goodOptions.push(opt);
            }
        });

        let optionsScore = 0;

        if (currentGrade === '레어') {
            // 레어: 공/마 +10 이상 1줄이라도 있으면 통과
            if (attackLines >= 1) optionsScore = 70;
            else optionsScore = 30;
        } else {
            // 에픽/유니크/레전드리: 2줄 이상이면 아주 좋음, 1줄이면 좋음
            if (statPercentLines >= 2 || attackLines >= 2) {
                optionsScore = 85; // 아주 좋음
            } else if (statPercentLines >= 1 || attackLines >= 1) {
                optionsScore = 70; // 좋음 (통과)
            } else {
                optionsScore = 30; // 부족
            }
        }

        return { goodOptions, optionsScore };
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
        return generateEmblemRecommendation(type, score);
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

function generateEmblemRecommendation(type: string, score: number): string {
    if (type === 'additional') {
        if (score >= 66) return '공격력/마력 % 위주의 훌륭한 옵션입니다.';
        if (score >= 33) return '공/마% 한 줄은 아쉽습니다. 2줄 이상을 목표로 하세요.';
        return '공격력/마력 % 옵션이 필수입니다.';
    }
    if (score >= 66) return '공/마%와 방무가 적절히 섞인 훌륭한 옵션입니다.';
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

            if (grade === '레어') {
                if (score >= 70) return '레어 통과! 공/마 +10 이상 기준을 만족합니다.';
                return '공/마 +10 이상을 목표로 재설정이 필요합니다.';
            }

            if (score >= 85) return '아주 좋음! 주스탯 % 또는 공/마 +10 이상이 2줄 이상입니다.';
            if (score >= 70) return '좋음! 주스탯 % 또는 공/마 +10 이상이 있습니다.';
            return '재설정 필요. 주스탯 % 또는 공/마 +10 이상을 목표로 하세요.';
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
