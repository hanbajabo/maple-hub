import { isPensalirItem } from './utils/item_classifier';

export interface FlameEvaluation {
    tier: number;
    is_weapon: boolean;
    score: number;
    evaluation: '종결' | '준수' | '보통' | '부족' | '재설정 필요';
    recommendation: string;
}

export function evaluateWeaponFlame(
    tier: number,
    additionalOptions: string[],
    itemName: string = '',
    isMagic: boolean = false
): FlameEvaluation {
    if (itemName.includes('데스티니')) {
        return {
            tier: 0,
            is_weapon: true,
            score: 9999,
            evaluation: '종결',
            recommendation: '평가 불가의 초월적 아이템입니다.'
        };
    }

    // 펜살리르/우트가르드 무기 특별 처리
    if (isPensalirItem(itemName)) {
        return {
            tier: 0,
            is_weapon: true,
            score: 0,
            evaluation: '재설정 필요',
            recommendation: '[교체 권장] 우트가르드(펜살리르) 무기에 환생의 불꽃 투자는 비효율적입니다. 아케인셰이드 무기로 교체하세요.'
        };
    }

    if (itemName.includes('라즐리') || itemName.includes('라피스')) {
        const attOption = additionalOptions.find(opt => opt.includes('공격력') && !opt.includes('%'));
        let addAtt = 0;
        if (attOption) {
            const match = attOption.match(/\+(\d+)/);
            if (match) addAtt = parseInt(match[1]);
        }
        if (tier === 0 && addAtt > 0) {
            const { getZeroWeaponTier } = require('./zero_weapon_db');
            tier = getZeroWeaponTier(itemName, addAtt);
        }
    }

    let evaluation: '종결' | '준수' | '보통' | '부족' | '재설정 필요' = '재설정 필요';
    let recommendation = '';
    const statName = isMagic ? '마력' : '공격력';

    if (tier === 1) {
        evaluation = '종결';
        recommendation = `1티어 ${statName} 추가옵션입니다! (Pass)`;

        const hasBossDmg = additionalOptions.some(o => o.includes('보스 몬스터'));
        const hasDmg = additionalOptions.some(o => o.includes('데미지'));
        const hasAllStat = additionalOptions.some(o => o.includes('올스탯'));

        if (hasBossDmg || hasDmg || hasAllStat) {
            recommendation += ' 보공/데미지/올스탯까지 붙어 완벽합니다.';
        }
    } else if (tier === 2) {
        const hasBossDmg = additionalOptions.some(o => o.includes('보스 몬스터'));
        const hasDmg = additionalOptions.some(o => o.includes('데미지'));
        const hasAllStat = additionalOptions.some(o => o.includes('올스탯'));

        if (hasBossDmg || hasDmg || hasAllStat) {
            evaluation = '준수';
            recommendation = `2추 + 유효옵션(보공/뎀/올%)이 있어 충분히 사용 가능합니다.`;
        } else {
            evaluation = '부족';
            recommendation = `2추 단독으로는 아쉽습니다. 보공/데미지/올스탯%가 함께 붙은 2추를 노리거나, 1추를 도전하세요.`;
        }
    } else {
        evaluation = '재설정 필요';
        recommendation = `3추 이하입니다. 최소 2추 이상, 권장 1추를 목표로 환생의 불꽃을 사용하세요.`;
    }

    return { tier, is_weapon: true, score: 0, evaluation, recommendation };
}

export function evaluateArmorFlame(
    itemLevel: number,
    score: number,
    itemName: string = ''
): FlameEvaluation {
    let evaluation: '종결' | '준수' | '보통' | '부족' | '재설정 필요' = '부족';
    let recommendation = '';

    // 펜살리르 방어구 특별 처리
    if (itemName.includes('펜살리르')) {
        const isHatOverall = itemName.includes('모자') || itemName.includes('한벌옷');

        if (isHatOverall) {
            recommendation = '[교체 권장] 펜살리르 방어구에 환생의 불꽃 투자는 비효율적입니다. 루타비스(카루타) 세트로 교체하세요.';
        } else {
            recommendation = '[교체 권장] 펜살리르 방어구에 환생의 불꽃 투자는 비효율적입니다. 앱솔랩스/아케인셰이드로 교체하세요.';
        }

        return {
            tier: 0,
            is_weapon: false,
            score: score,
            evaluation: '재설정 필요',
            recommendation
        };
    }

    if (itemLevel >= 140 && itemLevel <= 159) {
        if (score >= 140) {
            evaluation = '종결';
            recommendation = '140급 이상! 최상급 추가옵션입니다. 완벽합니다.';
        } else if (score >= 120) {
            evaluation = '준수';
            recommendation = '120~130급으로 꽤 좋은 추가옵션입니다.';
        } else if (score >= 100) {
            evaluation = '준수';
            recommendation = '100~120급으로 준수한 추가옵션입니다.';
        } else {
            evaluation = '부족';
            recommendation = '100급 미만입니다. 최소 100급 이상을 목표로 하세요.';
        }
    }
    else if (itemLevel >= 160 && itemLevel <= 199) {
        if (score >= 140) {
            evaluation = '종결';
            recommendation = '140급 이상! 최상급 추가옵션입니다.';
        } else if (score >= 125) {
            evaluation = '준수';
            recommendation = '125~135급으로 훌륭한 추가옵션입니다.';
        } else if (score >= 120) {
            evaluation = '준수';
            recommendation = '120급 정도로 준수한 수준입니다.';
        } else {
            evaluation = '부족';
            recommendation = '160제 장비는 최소 120급 이상을 권장합니다.';
        }
    }
    else if (itemLevel >= 200 && itemLevel <= 249) {
        if (score >= 170) {
            evaluation = '종결';
            recommendation = '170급 이상! 매우 훌륭한 최상급 옵션입니다.';
        } else if (score >= 150) {
            evaluation = '준수';
            recommendation = '150~155급으로 아주 좋은 추가옵션입니다.';
        } else if (score >= 140) {
            evaluation = '준수';
            recommendation = '140급 정도로 꽤 좋은 수준입니다.';
        } else if (score >= 120) {
            evaluation = '보통';
            recommendation = '120급은 부캐릭터용으로 적합합니다.';
        } else {
            evaluation = '부족';
            recommendation = '200제 장비는 최소 120급(부캐) 또는 140급(본캐) 이상을 권장합니다.';
        }
    }
    else if (itemLevel >= 250) {
        if (score >= 185) {
            evaluation = '종결';
            recommendation = '185급 이상! 완벽에 가까운 최상급 옵션입니다.';
        } else if (score >= 170) {
            evaluation = '준수';
            recommendation = '170급 이상으로 매우 훌륭한 추가옵션입니다.';
        } else {
            evaluation = '부족';
            recommendation = '250제 에테르넬 장비는 최소 170급 이상을 목표로 하시는 것이 좋습니다.';
        }
    }
    else {
        if (score >= 100) {
            evaluation = '준수';
            recommendation = '100급 이상으로 준수한 추가옵션입니다.';
        } else {
            evaluation = '부족';
            recommendation = '100급 미만입니다. 더 높은 추가옵션을 노려보세요.';
        }
    }

    return { tier: 0, is_weapon: false, score, evaluation, recommendation };
}
