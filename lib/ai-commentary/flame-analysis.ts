import { pick } from './helpers';
import { getWeaponTier } from '../item_utils';

/**
 * 추가옵션(Flame) 분석 및 코멘트 생성
 */
export function analyzeFlameOptions(item: any, isMagic: boolean, isEndGameItem: boolean): string[] {
    const comments: string[] = [];
    const slot = item.item_equipment_slot || '';

    // 추가옵션이 붙지 않는 부위
    const noFlameSlots = ['반지', '엠블렘', '보조무기', '뱃지', '훈장', '기계 심장', '기계심장', '어깨장식'];
    const isNoFlameSlot = noFlameSlots.some(s => slot.includes(s) || slot === s);

    if (isNoFlameSlot) return comments;

    const addOpts = item.item_add_option || {};
    const addAtt = parseInt(addOpts.attack_power || "0");
    const addMagic = parseInt(addOpts.magic_power || "0");
    const addAllStat = parseInt(addOpts.all_stat || "0");
    const level = item.item_base_option?.base_equipment_level || 0;

    // 무기 추옵 분석
    if (slot === '무기') {
        const baseAtt = parseInt(item.item_base_option?.attack_power || "0");
        const baseMagic = parseInt(item.item_base_option?.magic_power || "0");
        const mainAddAtt = Math.max(addAtt, addMagic);

        // getWeaponTier 유틸리티 사용 (1=1추, 2=2추)
        const tier = getWeaponTier(level, isMagic ? baseMagic : baseAtt, mainAddAtt);

        if (tier === 1) {
            comments.push(pick([
                `<b>추가옵션 공/마 +${mainAddAtt}</b>는 1티어 극추옵입니다. 환생의 불꽃 대성공이네요!`,
                `와... <b>1티어 추옵</b>이 떴군요! 무기가 춤을 추고 있습니다.`,
                `<b>공/마 +${mainAddAtt}</b>... 영롱합니다. 더 이상 바랄 게 없는 종결 추옵입니다.`
            ]));
        } else if (tier === 2) {
            comments.push(pick([
                `<b>추가옵션 공/마 +${mainAddAtt}</b>는 2티어 강추옵입니다. 가성비 좋게 사용하기 충분합니다.`,
                `<b>2티어 추옵</b>, 아주 준수합니다. 실전에서 차고 넘치는 성능이죠.`,
                `나쁘지 않은 추옵입니다. <b>2티어</b> 정도면 충분히 현역이죠.`
            ]));
        } else if (mainAddAtt > 0) {
            comments.push(`추가옵션이 조금 아쉽습니다. <b>1티어</b>나 <b>2티어</b> 추옵을 노려보세요. 공격력 차이가 큽니다.`);
        } else {
            comments.push(`이 좋은 무기에 추가옵션이 없습니다. <b>환생의 불꽃</b> 작업이 필수입니다.`);
        }
    }
    // 방어구/장신구 추옵 분석
    else {
        const str = parseInt(addOpts.str || "0");
        const dex = parseInt(addOpts.dex || "0");
        const int = parseInt(addOpts.int || "0");
        const luk = parseInt(addOpts.luk || "0");
        const att = parseInt(addOpts.attack_power || "0");
        const magic = parseInt(addOpts.magic_power || "0");
        const allStat = parseInt(addOpts.all_stat || "0");

        // 점수 계산: 깡추옵 + 공마*4 + 올스탯*10
        const scoreSTR = str + (att * 4) + (allStat * 10);
        const scoreDEX = dex + (att * 4) + (allStat * 10);
        const scoreINT = int + (magic * 4) + (allStat * 10);
        const scoreLUK = luk + (att * 4) + (allStat * 10);

        const maxScore = Math.max(scoreSTR, scoreDEX, scoreINT, scoreLUK);

        // 레벨별 추옵 기준
        if (level >= 250) {
            if (maxScore >= 200) comments.push(`추가옵션은 <b>${maxScore}급</b>...?! 이건 운영자가 실수로 만든 게 분명합니다. 전 서버급 1티어 신화급 추옵입니다.`);
            else if (maxScore >= 190) comments.push(`추가옵션은 <b>${maxScore}급</b>으로, 더 이상 바랄 게 없는 완벽한 종결 추옵입니다.`);
            else if (maxScore >= 180) comments.push(`추가옵션은 <b>${maxScore}급</b>으로, 에테르넬의 품격에 걸맞은 압도적인 종결급 추옵입니다.`);
            else if (maxScore >= 170) comments.push(`추가옵션은 <b>${maxScore}급</b>으로, 아주 훌륭한 최상급 추옵입니다. 든든하네요.`);
            else if (maxScore >= 160) comments.push(`추가옵션은 <b>${maxScore}급</b>으로, 상위권 유저들도 부러워할 많이 좋은 옵션입니다.`);
            else if (maxScore >= 150) comments.push(`추가옵션은 <b>${maxScore}급</b>으로, 실전에서 차고 넘치는 꽤 좋은 성능입니다.`);
            else if (maxScore >= 140) comments.push(`추가옵션은 <b>${maxScore}급</b>으로, 에테르넬 입문용으로 아주 좋습니다.`);
            else if (maxScore >= 130) comments.push(`추가옵션은 <b>${maxScore}급</b>으로, 준수하지만 욕심을 조금 더 내보셔도 좋습니다.`);
            else if (maxScore >= 120) comments.push(`추가옵션은 <b>${maxScore}급</b>으로, 임시로 쓰기엔 괜찮은 보통 수준입니다.`);
            else if (maxScore >= 110) comments.push(`추가옵션은 <b>${maxScore}급</b>으로, 에테르넬치고는 많이 아쉽습니다. 환불을 추천합니다.`);
            else if (maxScore >= 100) comments.push(`추가옵션은 <b>${maxScore}급</b>으로, 본캐라면 재설정이 시급한 부캐용 수준입니다.`);
        }
        else if (level >= 200) {
            if (maxScore >= 170) comments.push(`추가옵션은 <b>${maxScore}급</b>으로, 아케인셰이드의 한계를 뛰어넘은 종결급입니다.`);
            else if (maxScore >= 160) comments.push(`추가옵션은 <b>${maxScore}급</b>으로, 전 서버급 매물인 최상급 옵션입니다.`);
            else if (maxScore >= 150) comments.push(`추가옵션은 <b>${maxScore}급</b>으로, 아주 훌륭합니다. 평생 쓰셔도 될 정도로 많이 좋습니다.`);
            else if (maxScore >= 140) comments.push(`추가옵션은 <b>${maxScore}급</b>으로, 든든한 국밥 같은 꽤 좋은 추옵입니다.`);
            else if (maxScore >= 130) comments.push(`추가옵션은 <b>${maxScore}급</b>으로, 실전용으로 손색이 없는 좋은 옵션입니다.`);
            else if (maxScore >= 120) comments.push(`추가옵션은 <b>${maxScore}급</b>으로, 가성비 좋게 쓰기 딱 좋은 준수한 수준입니다.`);
            else if (maxScore >= 110) comments.push(`추가옵션은 <b>${maxScore}급</b>으로, 나쁘지 않지만 조금 아쉬운 보통 수준입니다.`);
            else if (maxScore >= 100) comments.push(`추가옵션은 <b>${maxScore}급</b>으로, 임시로 거쳐가는 부캐용 용도입니다.`);
        }
        else {
            if (maxScore >= 150) comments.push(`추가옵션은 <b>${maxScore}급</b>으로, 이 레벨대 장비에서 볼 수 있는 끝판왕 종결급 추옵입니다.`);
            else if (maxScore >= 140) comments.push(`추가옵션은 <b>${maxScore}급</b>으로, 아주 귀한 최상급 옵션입니다. 축하드립니다.`);
            else if (maxScore >= 130) comments.push(`추가옵션은 <b>${maxScore}급</b>으로, 훌륭합니다. 든든하게 쓰실 수 있는 많이 좋은 옵션입니다.`);
            else if (maxScore >= 120) comments.push(`추가옵션은 <b>${maxScore}급</b>으로, 가성비와 성능을 모두 잡은 좋은 옵션입니다.`);
            else if (maxScore >= 110) comments.push(`추가옵션은 <b>${maxScore}급</b>으로, 실전에서 충분히 통하는 준수한 옵션입니다.`);
            else if (maxScore >= 100) comments.push(`추가옵션은 <b>${maxScore}급</b>으로, 무난하게 쓰기 좋은 보통 수준입니다.`);
        }

        if (maxScore === 0 && isEndGameItem) {
            comments.push(`이 좋은 장비에 추가옵션이 거의 없습니다. <b>환생의 불꽃</b> 작업이 필수입니다.`);
        }
    }

    return comments;
}
