
import { EquipmentReport } from './types';
import { diagnoseHat } from './parts/hat';
import { diagnoseGlove } from './parts/glove';
import { diagnoseWeapon } from './parts/weapon';
import { diagnoseArmor } from './parts/armor';
import { diagnoseAccessory } from './parts/accessory';

// === 🚀 진화형 AI: 정밀 진단 로직 (Deep Diagnosis) ===
// 기준표 Section 11. 진단 파이프라인 설계 적용
// === 🚀 진화형 AI: 정밀 진단 로직 (Deep Diagnosis) ===
// 기준표 Section 11. 진단 파이프라인 설계 적용
export function diagnoseItemDeeply(item: any, job?: string): string[] {
    const slot = item.item_equipment_slot || "";

    // 1. 모자 (Hat)
    if (slot.includes("모자")) {
        return diagnoseHat(item, job);
    }

    // 2. 장갑 (Glove)
    if (slot.includes("장갑")) {
        return diagnoseGlove(item, job);
    }

    // 3. 무기 / 보조무기 / 엠블렘 (WSE)
    // 방패는 보조무기 취급이지만 스타포스가 가능함. diagnoseWeapon에서 처리 (스타포스 체크는 제외됨)
    if (slot.includes("무기") || slot.includes("블레이드") || slot.includes("엠블렘")) {
        return diagnoseWeapon(item, job);
    }

    // 4. 방어구 (Armor) - 상의, 하의, 한벌옷, 신발, 망토, 어깨장식
    if (["상의", "하의", "한벌옷", "신발", "망토", "어깨장식"].some(s => slot.includes(s))) {
        return diagnoseArmor(item, job);
    }

    // 5. 장신구 (Accessory) - 반지, 펜던트, 얼장, 눈장, 귀고리, 벨트, 하트, 뱃지, 훈장, 포켓
    if (["반지", "펜던트", "얼굴장식", "눈장식", "귀고리", "벨트", "기계 심장", "뱃지", "훈장", "포켓"].some(s => slot.includes(s))) {
        return diagnoseAccessory(item, job);
    }

    // 6. 펫 장비 (Pet Equipment)
    if (slot.includes("펫장비")) {
        const comments: string[] = [];
        const scrollCount = parseInt(item.scroll_upgrade || "0");
        const etcOpts = item.item_etc_option || {};
        const etcAtt = parseInt(etcOpts.attack_power || "0");
        const etcMagic = parseInt(etcOpts.magic_power || "0");
        const gain = Math.max(etcAtt, etcMagic);

        if (gain >= scrollCount * 4) {
            comments.push(`[펫장비 종결] 프펫공/프펫마 작입니다. 숨겨진 스펙을 완벽하게 챙기셨습니다.`);
        } else if (gain >= scrollCount * 2) {
            comments.push(`[펫장비 현역] 일반 펫공 스크롤 작입니다. 가성비 좋습니다.`);
        } else if (scrollCount === 0) {
            comments.push(`[펫장비 미작] 펫 장비 업그레이드가 안 되어 있습니다. 공격력을 챙겨주세요.`);
        }
        return comments;
    }

    return [];
}

// === 🚀 통합 진단 함수 (UI 연동용) ===
export function diagnoseEquipment(items: any[], mainStat: string, attType: string, targetMode: 'HUNTING' | 'BOSS', currentDropRate: number, job?: string): EquipmentReport {
    const result: EquipmentReport = {
        starforce: [],
        potential: [],
        additional: [],
        general: [],
        good: [],
        scoreDeduction: 0
    };

    if (!items || items.length === 0) {
        result.general.push("장착 중인 장비 정보를 불러올 수 없습니다.");
        return result;
    }

    items.forEach((item: any) => {
        const comments = diagnoseItemDeeply(item, job);
        const itemName = item.item_name || "";
        const slot = item.item_equipment_slot || "";

        comments.forEach(comment => {
            const displayComment = `[${slot}] ${itemName}: ${comment}`;

            // 부정적 피드백 분류
            if (comment.includes("[미달]") || comment.includes("[경고]") || comment.includes("[치명적]") || comment.includes("[망작]") || comment.includes("[강화 필요]") || comment.includes("[환불 필요]") || comment.includes("[비추천]")) {
                if (comment.includes("스타포스")) result.starforce.push(displayComment);
                else if (comment.includes("잠재")) result.potential.push(displayComment);
                else if (comment.includes("에디")) result.additional.push(displayComment);
                else result.general.push(displayComment);
                result.scoreDeduction += 5;
            }
            // 경고성 피드백 분류
            else if (comment.includes("[주의]") || comment.includes("[옵션 아쉬움]") || comment.includes("[등급업 시급]") || comment.includes("[속 빈 강정]") || comment.includes("[강화 권장]") || comment.includes("[소울 업글 권장]")) {
                if (comment.includes("스타포스")) result.starforce.push(displayComment);
                else if (comment.includes("잠재")) result.potential.push(displayComment);
                else if (comment.includes("에디")) result.additional.push(displayComment);
                else result.general.push(displayComment);
                result.scoreDeduction += 2;
            }
            // 약한 경고/정보성 피드백
            else if (comment.includes("[아쉬움]") || comment.includes("[애매함]") || comment.includes("[체험판]") || comment.includes("[입문]") || comment.includes("[성장 교차점]") || comment.includes("[미래 지향적]")) {
                result.general.push(displayComment);
                result.scoreDeduction += 1;
            }
            // 긍정적 피드백
            else {
                result.good.push(displayComment);
            }
        });

        // 12성 미만 장비에 대한 공통 조언 추가 (진화형 AI)
        const starforce = parseInt(item.starforce || "0");
        const isSuperior = itemName.includes("타일런트") || itemName.includes("노바") || itemName.includes("헬리시움"); // 슈페리얼 아이템
        const isEventRing = ["테네브리스", "SS급", "어웨이크", "글로리온", "카오스", "벤젼스", "결속의", "이터널 플레임", "어드벤처 딥다크", "오닉스", "코스모스", "이벤트 링", "어드벤처", "시너지", "쥬얼", "다크 크리티컬"].some(k => itemName.includes(k));
        const isCantStarforce = ["훈장", "뱃지", "포켓 아이템", "엠블렘", "보조무기", "기계 심장"].some(s => slot.includes(s));

        if (starforce < 12 && !isSuperior && !isEventRing && !isCantStarforce) {
            const advice = `[${slot}] ${itemName}: [성장 조언] 스타포스 12성은 가성비가 매우 좋습니다. 우선 12성까지 강화를 추천합니다.`;
            // 중복 방지: 이미 비슷한 멘트가 있는지 확인
            if (!result.starforce.some(c => c.includes(itemName) && (c.includes("12성") || c.includes("강화 필요")))) {
                result.starforce.push(advice);
                result.scoreDeduction += 2;
            }
        }
    });

    // 드롭률 체크 (사냥 모드)
    if (targetMode === 'HUNTING') {
        if (currentDropRate < 67) {
            result.general.push(`현재 아이템 드롭률이 ${currentDropRate}%입니다. (메소 확정 드롭을 위해 67% 이상 권장)`);
            result.scoreDeduction += 5;
        } else {
            result.good.push(`아이템 드롭률 ${currentDropRate}% (메소 확정 드롭 충족)`);
        }
    }

    return result;
}
