import { EquipmentItem, Issue } from '../types';
import { getStarforce } from '../../../lib/diagnosis/utils';
import { isAmazingEnhancementItem } from '@/lib/amazing_enhancement_table';

export const evaluateStage9 = (equipment: EquipmentItem[]) => {
    const issues: Issue[] = [];
    let stage9Issues = 0;

    // 장신구 슬롯 정의
    const accessorySlots = ['눈장식', '얼굴장식', '귀고리', '펜던트', '펜던트2', '반지1', '반지2', '반지3', '반지4', '벨트', '기계 심장'];

    // 특수 반지
    const specialRingKeywords = ['리스트레인트', '웨폰퍼프', '리스크테이커', '컨티뉴어스'];

    const stats = {
        total: 0,
        passed: 0,
        failedItems: [] as string[]
    };

    equipment.forEach(item => {
        const slot = item.item_equipment_slot;
        const name = item.item_name || '';
        const star = getStarforce(item);

        // 장신구 슬롯만 체크
        if (!accessorySlots.includes(slot) && !slot.includes('반지')) return;

        stats.total++;

        // 특수 반지는 무조건 통과
        const isSpecialRing = specialRingKeywords.some(k => name.includes(k));
        if (isSpecialRing) {
            stats.passed++;
            return;
        }

        // 타일런트 아이템 체크
        const isTyrant = name.includes('타일런트');

        // 놀장강 아이템 체크
        const isAmazingEnhancement = isAmazingEnhancementItem(item);

        // 기계 심장: 20성 이상 (타일런트/놀장강은 12성)
        if (slot === '기계 심장') {
            let threshold = 20;
            if (isTyrant || isAmazingEnhancement) threshold = 12;

            if (star >= threshold) {
                stats.passed++;
            } else {
                stage9Issues++;
                stats.failedItems.push(`${name} (${star}성)`);
                issues.push({
                    type: 'accessory_starforce',
                    message: `[장신구/스타포스] ${name}: ${threshold}성 미만 (현재 ${star}성)`
                });
            }
        } else {
            // 나머지 장신구: 22성 이상 (타일런트/놀장강은 12성)
            let threshold = 22;
            if (isTyrant || isAmazingEnhancement) threshold = 12;

            if (star >= threshold) {
                stats.passed++;
            } else {
                stage9Issues++;
                stats.failedItems.push(`${name} (${star}성)`);
                issues.push({
                    type: 'accessory_starforce',
                    message: `[장신구/스타포스] ${name}: ${threshold}성 미만 (현재 ${star}성)`
                });
            }
        }
    });

    // 세트 효과 체크
    const dawnSetKeywords = ['여명의가디언엔젤링', '데이브레이크', '트와일라이트', '에스텔라'];
    const pitchedSetKeywords = [
        '루즈컨트롤', '마력이깃든안대', '마력이 깃든 안대', '거대한공포', '거대한 공포',
        '저주받은', '마도서', '블랙하트', '블랙 하트', '컴플리트언더컨트롤', '컴플리트 언더컨트롤',
        '몽환의벨트', '몽환의 벨트', '고통의근원', '고통의 근원', '창세의뱃지', '창세의 뱃지',
        '커맨더포스', '미트라'
    ];
    const brilliantSetKeywords = ['근원의속삭임', '근원의 속삭임', '죽음의맹세', '죽음의 맹세', '불멸의유산', '불멸의 유산'];

    let dawnSetCount = 0;
    let pitchedSetCount = 0;
    let brilliantSetCount = 0;

    equipment.forEach(item => {
        const name = item.item_name || '';
        if (dawnSetKeywords.some(k => name.includes(k))) dawnSetCount++;
        if (pitchedSetKeywords.some(k => name.includes(k))) pitchedSetCount++;
        if (brilliantSetKeywords.some(k => name.includes(k))) brilliantSetCount++;
    });

    const hasDawn2 = dawnSetCount >= 2;
    const hasPitched4 = pitchedSetCount >= 4;

    // 추천 조건: 2여명 + 4칠흑 이상
    if (!hasDawn2) {
        issues.push({
            type: 'set_recommendation',
            message: `[세트 추천] 여명 세트 2개 이상 권장 (현재 ${dawnSetCount}개)`
        });
    }
    if (!hasPitched4) {
        issues.push({
            type: 'set_recommendation',
            message: `[세트 추천] 칠흑 세트 4개 이상 권장 (현재 ${pitchedSetCount}개)`
        });
    }

    // 통과 조건: 모든 장신구가 기준을 만족하면 통과
    const isPassed = stage9Issues === 0;

    return {
        isPassed,
        issues,
        stats: {
            ...stats,
            dawnSetCount,
            pitchedSetCount,
            brilliantSetCount,
            hasDawn2,
            hasPitched4
        }
    };
};
