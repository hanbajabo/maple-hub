import { EquipmentReport, DiagnosisGrade } from './types';
import { diagnoseHat } from './parts/hat';
import { diagnoseGlove } from './parts/glove';
import { diagnoseWeapon } from './parts/weapon';
import { diagnoseArmor } from './parts/armor';
import { diagnoseAccessory } from './parts/accessory';
import { getSpecialItemConfig } from '../config/special_items';

// 시드링 레벨 추출 헬퍼
export function getSeedRingLevel(item: any): number {
    const name = item.item_name || "";
    // 1. 이름에서 추출
    const m1 = name.match(/(\d+)레벨/);
    if (m1) return parseInt(m1[1]);

    // 2. special_ring_level 필드 확인 (API 원본 데이터)
    if (item.special_ring_level) return parseInt(item.special_ring_level);

    // 3. 잠재능력/에디셔널/설명에서 추출 (스킬 정보가 여기에 있을 수 있음)
    const texts = [
        item.potential_option_1,
        item.potential_option_2,
        item.potential_option_3,
        item.additional_potential_option_1,
        item.additional_potential_option_2,
        item.additional_potential_option_3,
        item.item_description
    ];

    for (const t of texts) {
        if (!t) continue;
        // "Lv.4" 또는 "4레벨" 패턴 찾기
        const m2 = t.match(/Lv\.(\d+)/i) || t.match(/(\d+)레벨/);
        if (m2) return parseInt(m2[1]);
    }
    return 0;
}

// 객관적 점수 기반 등급 평가
function evaluateGradeByScore(item: any, attType: string = 'attack'): DiagnosisGrade {
    const slot = item.item_equipment_slot || "";
    const name = item.item_name || "";

    // === 1. 특수 아이템 절대 평가 ===
    if (slot.includes("뱃지")) {
        if (name.includes("창세의 뱃지")) return 'SS';
        return 'A';
    }

    if (slot.includes("훈장")) {
        if (name.includes("불멸의 유산")) return 'SS';
        return 'B';
    }

    // 시드링 (Seed Ring)
    if (name.includes("링") && (name.includes("리스트레인트") || name.includes("웨폰퍼프") || name.includes("리스크테이커") || name.includes("크라이시스") || name.includes("링 오브 썸") || name.includes("레벨") || name.includes("컨티뉴어스"))) {
        const level = getSeedRingLevel(item);
        if (level >= 6) return 'SS'; // LV6 극종결
        if (level === 5) return 'S';  // LV5 종결
        if (level === 4) return 'A';  // LV4 준종결
        return 'B'; // 그 외
    }

    // === 2. 구성 요소별 점수 계산 ===
    let scoreSF = 0;
    let scorePot = 0;
    let scoreAddi = 0;
    let scoreFlame = 0;

    // 2-1. 스타포스 (Max 7)
    const sf = parseInt(item.starforce || "0");
    if (sf >= 25) scoreSF = 7;
    else if (sf >= 24) scoreSF = 6;
    else if (sf >= 23) scoreSF = 5;
    else if (sf >= 22) scoreSF = 4;
    else if (sf >= 18) scoreSF = 3; // 18성: 3점
    else if (sf >= 17) scoreSF = 2; // 17성: 2점 (국민셋 인정)

    // 2-2. 잠재능력 (Max 5)
    const potGrade = item.potential_option_grade;
    const pots = [item.potential_option_1, item.potential_option_2, item.potential_option_3];

    const isWSE = slot.includes("보조무기") || slot.includes("엠블렘");
    let validLines = 0;
    let statPct = 0;

    pots.forEach((line: any) => {
        if (!line) return;

        const m = line.match(/(\d+)%/);
        if (m && (line.includes('STR') || line.includes('DEX') || line.includes('INT') || line.includes('LUK') || line.includes('올스탯') || line.includes('HP'))) {
            statPct += parseInt(m[1]);
        }
        if (line.includes('레벨') && line.includes('당')) {
            if (line.includes('+2')) statPct += 6;
            else if (line.includes('+1')) statPct += 3;
        }

        // WSE 유효옵 (공/마/보공)
        if (isWSE && line.includes('%')) {
            if (line.includes('공격력') || line.includes('마력')) {
                validLines++;
            } else if (line.includes('보스') && line.includes('데미지')) {
                validLines++;
            }
        }

        // 모자: 쿨타임 감소 (2초 이상이면 고득점)
        if (slot.includes("모자") && line.includes("재사용 대기시간")) {
            const m = line.match(/-(\d+)초/);
            if (m) {
                const cool = parseInt(m[1]);
                if (cool >= 2) validLines += 2; // 2초는 2줄급 가치
                else validLines += 1;
            }
        }

        // 장갑: 크리티컬 데미지 (8%는 고득점)
        if (slot.includes("장갑") && line.includes("크리티컬 데미지")) {
            validLines++;
        }
    });

    if (potGrade === '레전드리') {
        if (isWSE) {
            if (validLines >= 3) scorePot = 5;
            else if (validLines >= 2) scorePot = 4;
            else scorePot = 2;
        }
        // 모자/장갑 특수 처리
        else if (slot.includes("모자") || slot.includes("장갑")) {
            if (validLines >= 2) scorePot = 5; // 쿨감 4초 or 쌍크뎀 -> 만점
            else if (validLines >= 1) scorePot = 4; // 쿨감 2초 or 크뎀 1줄 -> 4점
            else if (statPct >= 27) scorePot = 4; // 스탯 27% 이상 -> 4점
            else if (statPct >= 21) scorePot = 3;
            else scorePot = 2;
        }
        else {
            if (statPct >= 24) scorePot = 5;
            else if (statPct >= 21) scorePot = 4;
            else if (statPct >= 18) scorePot = 3;
            else if (statPct >= 12) scorePot = 2;
            else scorePot = 1;
        }
    } else if (potGrade === '유니크') {
        if (isWSE) {
            if (validLines >= 2) scorePot = 3;
            else scorePot = 1;
        }
        else if (slot.includes("모자") && validLines >= 1) scorePot = 3; // 유니크 쿨감
        else if (slot.includes("장갑") && validLines >= 1) scorePot = 3; // 유니크 크뎀 (쓸샾 등)
        else {
            if (statPct >= 27) scorePot = 3;
            else if (statPct >= 18) scorePot = 2;
            else scorePot = 1;
        }
    } else if (potGrade === '에픽') {
        scorePot = 0.5;
    }

    // 2-3. 에디셔널 (Max 5)
    const adiGrade = item.additional_potential_option_grade;
    const adiLines = [item.additional_potential_option_1, item.additional_potential_option_2, item.additional_potential_option_3];
    let adiAtt = 0, adiMag = 0, adiStat = 0;
    let adiValidLines = 0;

    adiLines.forEach((line: any) => {
        if (!line) return;
        if (line.includes('공격력')) { const m = line.match(/\+(\d+)/); if (m) adiAtt += parseInt(m[1]); }
        if (line.includes('마력')) { const m = line.match(/\+(\d+)/); if (m) adiMag += parseInt(m[1]); }
        const mp = line.match(/(\d+)%/);
        if (mp && (line.includes('STR') || line.includes('DEX') || line.includes('INT') || line.includes('LUK') || line.includes('올스탯'))) {
            adiStat += parseInt(mp[1]);
        }

        // WSE 에디 유효옵
        if (isWSE && line.includes('%')) {
            if (line.includes('공격력') || line.includes('마력')) {
                adiValidLines++;
            } else if (line.includes('보스') && line.includes('데미지')) {
                adiValidLines++;
            }
        }

        // 장갑 에디셔널 크리티컬 데미지
        if (slot.includes("장갑") && line.includes("크리티컬 데미지")) {
            adiValidLines++; // 에디 크뎀은 매우 귀함
        }
    });

    // 직업에 맞는 공/마만 점수 반영 (공10 = 주스탯 4% 환산)
    const validAtt = attType === 'magic' ? adiMag : adiAtt;
    const adiTotal = adiStat + (validAtt * 4 / 10);

    if (adiGrade === '레전드리') {
        if (isWSE) {
            if (adiValidLines >= 3) scoreAddi = 5;
            else if (adiValidLines >= 2) scoreAddi = 4;
            else scoreAddi = 2;
        }
        // 장갑 에디 크뎀 처리
        else if (slot.includes("장갑") && adiValidLines >= 1) {
            scoreAddi = 5; // 에디 크뎀 있으면 만점
        }
        else {
            if (adiTotal >= 21) scoreAddi = 5;
            else if (adiTotal >= 14) scoreAddi = 4;
            else if (adiTotal >= 10) scoreAddi = 3;
            else scoreAddi = 2;
        }
    } else if (adiGrade === '유니크') {
        if (slot.includes("장갑") && adiValidLines >= 1) scoreAddi = 4; // 유니크 에디 크뎀도 매우 좋음
        else scoreAddi = 2;
    } else if (adiGrade === '에픽') {
        // 에픽이라도 공/마 2줄급(20 이상)이면 유니크급 대우
        if (validAtt >= 20 || adiValidLines >= 2) scoreAddi = 2;
        else scoreAddi = 1;
    }

    // 2-4. 추가옵션 (Max 5)
    // 어깨장식은 추옵이 없으므로 만점 처리
    if (slot.includes("어깨")) {
        scoreFlame = 5;
    } else {
        const ao = item.item_add_option || {};
        const fStr = parseInt(ao.str || "0") + (parseInt(ao.attack_power || "0") * 4) + (parseInt(ao.all_stat || "0") * 10);
        const fDex = parseInt(ao.dex || "0") + (parseInt(ao.attack_power || "0") * 4) + (parseInt(ao.all_stat || "0") * 10);
        const fInt = parseInt(ao.int || "0") + (parseInt(ao.magic_power || "0") * 4) + (parseInt(ao.all_stat || "0") * 10);
        const fLuk = parseInt(ao.luk || "0") + (parseInt(ao.attack_power || "0") * 4) + (parseInt(ao.all_stat || "0") * 10);
        const fHP = (parseInt(ao.max_hp || "0") / 21) + (parseInt(ao.attack_power || "0") * 4) + (parseInt(ao.all_stat || "0") * 10);
        const flame = Math.floor(Math.max(fStr, fDex, fInt, fLuk, fHP));

        // 26성 장비는 추옵 만점
        if (sf >= 25) scoreFlame = 5;
        else if (sf >= 24) scoreFlame = 4;
        else if (flame >= 150) scoreFlame = 5;
        else if (flame >= 130) scoreFlame = 4;
        else if (flame >= 110) scoreFlame = 3;
        else if (flame >= 90) scoreFlame = 2;
        else if (flame >= 70) scoreFlame = 1;
    }

    // === 3. 슬롯별 점수 합산 ===
    let totalScore = 0;

    // 3-1. 보조무기 / 엠블렘 (먼저 체크!)
    if (slot.includes("보조무기") || slot.includes("엠블렘")) {
        totalScore = (scorePot + scoreAddi) * 2;
    }
    // 3-2. 무기
    else if (slot.includes("무기")) {
        let base = 0;
        if (name.includes("제네시스")) base = 11;
        else if (name.includes("데스티니")) base = 15;

        if (base > 0) {
            totalScore = base + scorePot + scoreAddi + scoreFlame;
        } else {
            totalScore = scoreSF + scorePot + scoreAddi + scoreFlame;
        }
    }
    // 3-3. 반지 / 하트
    else if (slot.includes("반지") || slot.includes("심장") || slot.includes("기계 심장")) {
        totalScore = (scoreSF + scorePot + scoreAddi) * 1.35;
    }
    // 3-4. 포켓
    else if (slot.includes("포켓")) {
        let base = 0;
        if (name.includes("마도서")) base = 10;
        totalScore = base + (scoreFlame * 2);
    }
    // 3-5. 그 외
    else {
        totalScore = scoreSF + scorePot + scoreAddi + scoreFlame;
    }

    // === 4. 최종 등급 산정 ===
    const total = Math.round(totalScore);
    if (total >= 19) return 'SS';
    if (total >= 16) return 'S';
    if (total >= 12) return 'A';
    if (total >= 8) return 'B';
    if (total >= 5) return 'C';
    return 'F';
}

export function getMaxStarforce(level: number): number {
    if (level <= 94) return 5;
    if (level <= 107) return 8;
    if (level <= 117) return 10;
    if (level <= 127) return 15;
    if (level <= 137) return 20;
    return 25;
}

export function diagnoseItemDeeply(item: any, job?: string): string[] {
    const slot = item.item_equipment_slot || "";
    const itemName = item.item_name || "";

    const specialItemConfig = getSpecialItemConfig(itemName);
    if (specialItemConfig) {
        return [specialItemConfig.hexaComment];
    }

    if (slot.includes("모자")) {
        return diagnoseHat(item, job);
    }

    if (slot.includes("장갑")) {
        return diagnoseGlove(item, job);
    }

    if (slot.includes("무기") || slot.includes("블레이드") || slot.includes("엠블렘")) {
        return diagnoseWeapon(item, job);
    }

    if (["상의", "하의", "한벌옷", "신발", "망토", "어깨장식"].some(s => slot.includes(s))) {
        return diagnoseArmor(item, job);
    }

    if (["반지", "펜던트", "얼굴장식", "눈장식", "귀고리", "벨트", "기계 심장", "뱃지", "훈장", "포켓"].some(s => slot.includes(s))) {
        return diagnoseAccessory(item, job);
    }

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

export function diagnoseEquipment(items: any[], mainStat: string, attType: string, targetMode: 'HUNTING' | 'BOSS', currentDropRate: number, job?: string): EquipmentReport {
    const result: EquipmentReport = {
        starforce: [],
        potential: [],
        additional: [],
        general: [],
        good: [],
        scoreDeduction: 0,
        itemGrades: {}
    };

    if (!items || items.length === 0) {
        result.general.push("장착 중인 장비 정보를 불러올 수 없습니다.");
        return result;
    }

    items.forEach((item: any) => {
        const comments = diagnoseItemDeeply(item, job);
        const itemName = item.item_name || "";
        const slot = item.item_equipment_slot || "";

        // 점수 기반 등급 평가
        const uniqueKey = `${slot}_${itemName}`;
        result.itemGrades[uniqueKey] = evaluateGradeByScore(item, attType);

        comments.forEach(comment => {
            const displayComment = `[${slot}] ${itemName}: ${comment}`;

            if (comment.includes("[미달]") || comment.includes("[경고]") || comment.includes("[치명적]") || comment.includes("[망작]") || comment.includes("[강화 필요]") || comment.includes("[환불 필요]") || comment.includes("[비추천]")) {
                if (comment.includes("스타포스")) result.starforce.push(displayComment);
                else if (comment.includes("잠재")) result.potential.push(displayComment);
                else if (comment.includes("에디")) result.additional.push(displayComment);
                else result.general.push(displayComment);
                result.scoreDeduction += 5;
            }
            else if (comment.includes("[주의]") || comment.includes("[옵션 아쉬움]") || comment.includes("[등급업 시급]") || comment.includes("[속 빈 강정]") || comment.includes("[강화 권장]") || comment.includes("[소울 업글 권장]")) {
                if (comment.includes("스타포스")) result.starforce.push(displayComment);
                else if (comment.includes("잠재")) result.potential.push(displayComment);
                else if (comment.includes("에디")) result.additional.push(displayComment);
                else result.general.push(displayComment);
                result.scoreDeduction += 2;
            }
            else if (comment.includes("[아쉬움]") || comment.includes("[애매함]") || comment.includes("[체험판]") || comment.includes("[입문]") || comment.includes("[성장 교차점]") || comment.includes("[미래 지향적]")) {
                result.general.push(displayComment);
                result.scoreDeduction += 1;
            }
            else {
                result.good.push(displayComment);
            }
        });

        const starforce = parseInt(item.starforce || "0");
        const isSuperior = itemName.includes("타일런트") || itemName.includes("노바") || itemName.includes("헬리시움");
        const isEventRing = ["테네브리스", "SS급", "어웨이크", "글로리온", "카오스", "벤젼스", "결속의", "이터널 플레임", "어드벤처 딥다크", "오닉스", "코스모스", "이벤트 링", "어드벤처", "시너지", "쥬얼", "다크 크리티컬"].some(k => itemName.includes(k));
        const isCantStarforce = ["훈장", "뱃지", "포켓 아이템", "엠블렘", "보조무기", "기계 심장"].some(s => slot.includes(s));

        const level = item.item_base_option?.base_equipment_level || 0;
        const maxSf = getMaxStarforce(level);

        if (starforce < 12 && !isSuperior && !isEventRing && !isCantStarforce) {
            if (maxSf >= 12) {
                const advice = `[${slot}] ${itemName}: [성장 조언] 스타포스 12성은 가성비가 매우 좋습니다. 우선 12성까지 강화를 추천합니다.`;
                if (!result.starforce.some(c => c.includes(itemName) && (c.includes("12성") || c.includes("강화 필요")))) {
                    result.starforce.push(advice);
                    result.scoreDeduction += 2;
                }
            } else if (starforce < maxSf) {
                const advice = `[${slot}] ${itemName}: [성장 조언] 이 장비는 최대 ${maxSf}성까지 강화 가능합니다. 풀강을 추천합니다.`;
                if (!result.starforce.some(c => c.includes(itemName) && (c.includes("풀강") || c.includes("강화 필요")))) {
                    result.starforce.push(advice);
                    result.scoreDeduction += 2;
                }
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
