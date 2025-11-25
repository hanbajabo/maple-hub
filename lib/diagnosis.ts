import {
    LINK_DB,
    LINK_SKILL_JOBS,
    UNION_DB_CHECK,
    UNION_STAT_JOBS,
    JOB_META_DATA,
    GRADE_SCORE,
    ABILITY_DB
} from '../src/data/diagnosisData';

// === 상수 정의 ===
const STARFORCE_CHECK_SLOTS = ["모자", "상의", "하의", "한벌옷", "신발", "장갑", "망토", "어깨장식", "얼굴장식", "눈장식", "귀고리", "반지", "펜던트", "벨트"];
const SPECIAL_RING_KEYWORDS = ["웨폰퍼프", "리스트레인트", "리스크테이커", "컨티뉴어스"];
const EVENT_RING_KEYWORDS = ["테네브리스", "SS급", "어웨이크", "글로리온", "카오스", "벤젼스", "결속의"];

// === 타입 정의 ===
interface DiagnosisResult {
    bad: string[];
    good: string[];
    scoreDeduction: number;
}

interface EquipmentReport {
    starforce: string[];
    potential: string[];
    additional: string[];
    general: string[];
    good: string[];
    scoreDeduction: number;
}

// === 1. 링크 스킬 진단 ===
function diagnoseLinkSkill(targetMode: 'HUNTING' | 'BOSS', linkData: any): DiagnosisResult {
    const result: DiagnosisResult = { bad: [], good: [], scoreDeduction: 0 };

    const myLinks = [
        ...(linkData.character_link_skill?.map((s: any) => s.skill_name) || []),
        linkData.character_owned_link_skill?.skill_name
    ].filter(Boolean);

    const targetLinks = targetMode === 'HUNTING' ? LINK_DB.HUNTING : LINK_DB.BOSS;
    const missingLinks = targetLinks.filter(s => !myLinks.includes(s));

    if (missingLinks.length > 0) {
        const label = targetMode === 'HUNTING' ? "사냥용" : "보스/데미지";
        const deductionPerLink = targetMode === 'BOSS' ? 5 : 3;

        const missingWithJobs = missingLinks.map(link => `${link} (${LINK_SKILL_JOBS[link] || '?'})`);
        result.bad.push(`${label} 필수 링크 누락 (${missingLinks.length}개)`);
        missingWithJobs.forEach(linkWithJob => {
            result.bad.push(`  - ${linkWithJob}`);
        });
        result.scoreDeduction += (missingLinks.length * deductionPerLink);
    } else {
        result.good.push("필수 링크 스킬을 모두 갖추고 있습니다!");
    }

    return result;
}

// === 2. 유니온 진단 ===
function diagnoseUnion(targetMode: 'HUNTING' | 'BOSS', unionData: any, mainStat: string): DiagnosisResult {
    const result: DiagnosisResult = { bad: [], good: [], scoreDeduction: 0 };
    const myBlocks = unionData.union_block?.map((b: any) => b.block_class) || [];

    // 2-1. 필수 유니온
    const targetUnion = targetMode === 'HUNTING' ? UNION_DB_CHECK.HUNTING : UNION_DB_CHECK.BOSS;
    const missingUnion = targetUnion.filter(u => !myBlocks.includes(u));

    if (missingUnion.length > 0) {
        result.bad.push(`필수 유니온 대원 누락: ${missingUnion.join(", ")}`);
        result.scoreDeduction += (missingUnion.length * 2);
    } else {
        result.good.push("필수 유니온 대원을 모두 배치했습니다.");
    }

    // 2-2. 주스탯 유니온
    if (mainStat !== 'ALL' && mainStat !== 'HP') {
        const statJobs = UNION_STAT_JOBS[mainStat] || [];
        const placedStatJobs = statJobs.filter(job => myBlocks.includes(job));

        if (placedStatJobs.length < 3) {
            result.bad.push(`${mainStat} 증가 유니온 대원이 부족합니다 (${placedStatJobs.length}명).`);
            const missingStatJobs = statJobs.filter(job => !myBlocks.includes(job)).slice(0, 3);
            result.bad.push(`추천: ${missingStatJobs.join(", ")}`);
            result.scoreDeduction += 5;
        } else {
            result.good.push(`${mainStat} 증가 유니온 대원이 잘 배치되어 있습니다.`);
        }
    }

    return result;
}

// === 3. 어빌리티 진단 ===
function diagnoseAbility(targetMode: 'HUNTING' | 'BOSS', abilityData: any, myClass: string): DiagnosisResult {
    const result: DiagnosisResult = { bad: [], good: [], scoreDeduction: 0 };
    const myAbility = abilityData.ability_info || abilityData.ability_preset_1?.ability_info || [];
    myAbility.sort((a: any, b: any) => parseInt(a.ability_no) - parseInt(b.ability_no));
    const myAbilityLines = myAbility.map((a: any) => a.ability_value);

    if (targetMode === 'HUNTING') {
        // 사냥용 어빌리티 진단
        const line1 = myAbilityLines[0] || "";
        const line2 = myAbilityLines[1] || "";
        const line3 = myAbilityLines[2] || "";

        // 첫째줄: 드롭 20% or 메획 20%
        const checkLine1 = (line: string) => (line.includes("아이템 드롭률") || line.includes("메소 획득량")) && line.includes("20%");

        // 둘째/셋째줄: 드롭 15% or 메획 15% (일몹뎀 조건 삭제)
        const checkLine23 = (line: string) => (line.includes("아이템 드롭률") || line.includes("메소 획득량")) && line.includes("15%");

        let passCount = 0;

        // 첫째줄 체크
        if (checkLine1(line1)) passCount++;
        else {
            result.bad.push("첫째줄: 아이템 드롭률 20% 또는 메소 획득량 20% 옵션이 아닙니다.");
            result.scoreDeduction += 2;
        }

        // 둘째줄 체크
        if (checkLine23(line2)) passCount++;

        // 셋째줄 체크
        if (checkLine23(line3)) passCount++;

        if (passCount >= 2) {
            result.good.push("사냥용 어빌리티(드롭/메획) 세팅이 훌륭합니다!");
        } else if (passCount === 1 && checkLine1(line1)) {
            result.bad.push("추천: 둘째/셋째줄에 드롭 또는 메획 15%를 뽑아보세요.");
            result.scoreDeduction += 1;
        } else if (passCount === 0) {
            result.bad.push("추천: 첫줄(드롭/메획 20%), 2~3줄(드롭/메획 15%) 세팅을 맞춰보세요.");
        }
    } else {
        // 보스용 어빌리티 진단
        const presets = ABILITY_DB[myClass];

        if (!presets) {
            result.good.push("해당 직업의 추천 어빌리티 데이터가 없습니다.");
            return result;
        }

        const myLine1 = myAbilityLines[0] || "";
        const myLine2 = myAbilityLines[1] || "";
        const myLine3 = myAbilityLines[2] || "";

        // 등급 정보 가져오기
        const myGrade1 = myAbility[0]?.ability_grade || "";
        const myGrade2 = myAbility[1]?.ability_grade || "";
        const myGrade3 = myAbility[2]?.ability_grade || "";

        // 키워드 매칭 함수 (단순 포함 여부 확인)
        const checkMatch = (myLine: string, recLine: string) => {
            if (recLine.includes("보스")) return myLine.includes("보스");
            if (recLine.includes("재사용")) return myLine.includes("재사용");
            if (recLine.includes("패시브")) return myLine.includes("패시브");
            if (recLine.includes("버프")) return myLine.includes("버프");
            if (recLine.includes("크리티컬")) return myLine.includes("크리티컬");
            if (recLine.includes("상태 이상")) return myLine.includes("상태");
            if (recLine.includes("공격력")) return myLine.includes("공격력");
            if (recLine.includes("마력")) return myLine.includes("마력");
            return false;
        };

        let bestMatchCount = -1;
        let bestPresetName = "";

        // 가장 잘 맞는 프리셋 찾기
        for (const preset of presets) {
            let matchCount = 0;
            const recLines = preset.options;

            // 첫줄 비교 (레전드리 등급 필수)
            if (myGrade1 === "레전드리" && checkMatch(myLine1, recLines[0])) matchCount++;

            // 2,3줄 비교 (순서 상관 없음, 유니크 이상 필수, 중복 매칭 방지)
            const mySubLines = [
                { line: myLine2, grade: myGrade2 },
                { line: myLine3, grade: myGrade3 }
            ];
            const recSubLines = [recLines[1], recLines[2]];
            const usedRecIndices = new Set<number>();

            let subMatchCount = 0;

            for (const mySub of mySubLines) {
                // 유니크 이상인지 확인 (레전드리도 포함)
                const isHighGrade = mySub.grade === "유니크" || mySub.grade === "레전드리";
                if (!isHighGrade) continue;

                for (let i = 0; i < recSubLines.length; i++) {
                    if (usedRecIndices.has(i)) continue;

                    if (checkMatch(mySub.line, recSubLines[i])) {
                        subMatchCount++;
                        usedRecIndices.add(i);
                        break;
                    }
                }
            }
            matchCount += subMatchCount;

            if (matchCount > bestMatchCount) {
                bestMatchCount = matchCount;
                bestPresetName = preset.type;
            }
        }

        if (bestMatchCount >= 2) {
            result.good.push(`추천 어빌리티 세팅(${bestPresetName})을 잘 따르고 있습니다.`);
        } else {
            result.bad.push("추천 어빌리티 세팅과 차이가 있습니다.");
            result.bad.push(`현재 첫째줄: ${myLine1}`);
            if (presets.length > 0) {
                result.bad.push(`추천 첫째줄: ${presets[0].options[0]}`);
            }
            result.scoreDeduction += 5;
        }
    }

    return result;
}

// === 공통: 스타포스 체크 ===
function checkStarforce(item: any, slot: string, itemName: string, targetStar: number, result: EquipmentReport) {
    const star = parseInt(item.starforce || "0");
    if (star < targetStar) {
        result.starforce.push(`[${slot}] ${itemName}: 스타포스 ${targetStar}성 미만입니다 (${star}성).`);
        result.scoreDeduction += 2;
    }
}

// === 공통: 잠재능력 체크 ===
interface PotentialCheckOptions {
    minGrade: number; // 0:없음, 1:레어, 2:에픽, 3:유니크, 4:레전
    passGrade: number; // 이 등급 이상이면 옵션 검사 패스
    requiredOption: string | string[]; // 필수 포함 옵션 키워드 (예: "공격력%") 또는 키워드 배열 (OR 조건)
}

function checkPotential(item: any, slot: string, itemName: string, mainStat: string, attType: string, result: EquipmentReport, options: PotentialCheckOptions) {
    const potGrade = item.potential_option_grade;
    const potScore = GRADE_SCORE[potGrade] || 0;
    const potLines = [item.potential_option_1, item.potential_option_2, item.potential_option_3];

    if (!potGrade) {
        result.potential.push(`[${slot}] ${itemName}: 잠재능력이 없습니다.`);
        result.scoreDeduction += 2;
        return;
    }

    if (potScore < options.minGrade) {
        result.potential.push(`[${slot}] ${itemName}: 잠재능력이 에픽 등급 미만입니다.`);
        result.scoreDeduction += 2;
        return;
    }

    // 패스 등급 이상이면 통과
    if (potScore >= options.passGrade) return;

    // 옵션 검사 (OR 조건 지원)
    const reqs = Array.isArray(options.requiredOption) ? options.requiredOption : [options.requiredOption];

    const valid = reqs.some(req => {
        if (req.includes("%")) {
            // % 옵션 검사 (예: 공격력%, STR%)
            const keyword = req.replace("%", "");
            return potLines.some(l => {
                if (!l) return false;
                if (keyword === "HP") return l.includes("HP") && l.includes("%");
                return (l.includes(keyword) || l.includes("올스탯")) && l.includes("%");
            });
        } else {
            // 일반 옵션 검사
            return potLines.some(l => l && l.includes(req));
        }
    });

    if (!valid) {
        const reqText = reqs.join(" 또는 ");
        result.potential.push(`[${slot}] ${itemName}: 잠재능력에 ${reqText} 옵션이 없습니다.`);
        result.scoreDeduction += 1;
    }
}

// === 공통: 에디셔널 잠재능력 체크 ===
interface AdditionalCheckOptions {
    minGrade: number;
    passGrade: number;
    requiredOption: string; // "SPECIAL_ARMOR_CHECK" 또는 일반 키워드
}

function checkAdditionalPotential(item: any, slot: string, itemName: string, mainStat: string, attType: string, result: EquipmentReport, options: AdditionalCheckOptions) {
    const adiGrade = item.additional_potential_option_grade;
    const adiScore = GRADE_SCORE[adiGrade] || 0;
    const adiLines = [item.additional_potential_option_1, item.additional_potential_option_2, item.additional_potential_option_3];

    if (!adiGrade) {
        result.additional.push(`[${slot}] ${itemName}: 에디셔널 잠재능력이 없습니다.`);
        result.scoreDeduction += 2;
        return;
    }

    if (adiScore < options.minGrade) {
        // 레어 미만(없음)은 위에서 걸러지지만 혹시 몰라 유지
        return;
    }

    if (adiScore >= options.passGrade) return;

    // 방어구/장신구 특수 로직
    if (options.requiredOption === "SPECIAL_ARMOR_CHECK") {
        if (adiScore === 1) { // 레어
            const hasAtt10 = adiLines.some(l => {
                if (!l || !l.includes(attType)) return false;
                const val = parseInt(l.replace(/[^0-9]/g, '')) || 0;
                return val >= 10;
            });
            if (!hasAtt10) {
                result.additional.push(`[${slot}] ${itemName}: 에디셔널(레어)에 ${attType} +10 이상 옵션이 없습니다.`);
                result.scoreDeduction += 1;
            }
        } else if (adiScore >= 2) { // 에픽 이상
            const hasValidOption = adiLines.some(l => {
                if (!l) return false;
                if (l.includes(attType)) {
                    const val = parseInt(l.replace(/[^0-9]/g, '')) || 0;
                    if (val >= 10) return true;
                }
                if (l.includes("%")) {
                    return mainStat === "HP" ? l.includes("HP") : (l.includes(mainStat) || l.includes("올스탯"));
                }
                return false;
            });
            if (!hasValidOption) {
                result.additional.push(`[${slot}] ${itemName}: 에디셔널(에픽+)에 ${attType} +10 또는 주스탯% 옵션이 없습니다.`);
                result.scoreDeduction += 1;
            }
        }
    } else {
        // 일반 키워드 검사 (WSE 등)
        const req = options.requiredOption;
        const valid = adiLines.some(l => l && l.includes(req));
        if (!valid) {
            result.additional.push(`[${slot}] ${itemName}: 에디셔널에 ${req} 옵션이 없습니다.`);
            result.scoreDeduction += 1;
        }
    }
}

// === 4-1. 무기/보조/엠블렘(WSE) 진단 ===
function diagnoseWSE(item: any, slot: string, itemName: string, mainStat: string, attType: string, result: EquipmentReport) {
    const potGrade = item.potential_option_grade;
    const potScore = GRADE_SCORE[potGrade] || 0;
    const potLines = [item.potential_option_1, item.potential_option_2, item.potential_option_3];

    const adiGrade = item.additional_potential_option_grade;
    const adiScore = GRADE_SCORE[adiGrade] || 0;
    const adiLines = [item.additional_potential_option_1, item.additional_potential_option_2, item.additional_potential_option_3];

    // ========== 1순위: 엠블렘 ==========
    if (slot === "엠블렘") {
        // 등급 체크: 유니크 or 레전드리인가?
        if (potScore < 3) { // 유니크 미만
            result.potential.push(`[${slot}] ${itemName}: 잠재능력이 유니크 미만입니다 (${potGrade || "없음"}). 카르마 유니크 잠재능력 부여 주문서로 유니크를 만드세요.`);
            result.scoreDeduction += 5;
        } else if (potScore === 3) { // 유니크
            // 공격력/마력 % 옵션이 15% 이상인가?
            const attPercentLines = potLines.filter(l => l && l.includes(attType) && l.includes("%"));
            const totalAttPercent = attPercentLines.reduce((sum, line) => {
                const match = line.match(/(\d+)%/);
                return sum + (match ? parseInt(match[1]) : 0);
            }, 0);

            if (totalAttPercent >= 12) {
                result.good.push(`[${slot}] ${itemName}: 유니크 ${attType}% ${totalAttPercent}% (사용 가능)`);
            } else {
                result.potential.push(`[${slot}] ${itemName}: 유니크 ${attType}% 옵션이 12% 미만입니다 (${totalAttPercent}%). 큐브로 12% 이상을 만드세요.`);
                result.scoreDeduction += 2;
            }

            result.general.push(`💡 [${slot}] 목표: 이벤트 큐브로 레전드리 등급을 달성하고, 레전드리에서 ${attType} % 12% 이상을 목표로 하세요.`);
        } else { // 레전드리
            const attPercentLines = potLines.filter(l => l && l.includes(attType) && l.includes("%"));
            const totalAttPercent = attPercentLines.reduce((sum, line) => {
                const match = line.match(/(\d+)%/);
                return sum + (match ? parseInt(match[1]) : 0);
            }, 0);

            if (totalAttPercent >= 12) {
                result.good.push(`[${slot}] ${itemName}: 레전드리 ${attType}% ${totalAttPercent}% (훌륭!)`);
            } else {
                result.potential.push(`[${slot}] ${itemName}: 레전드리지만 ${attType}% 옵션이 12% 미만입니다 (${totalAttPercent}%).`);
                result.scoreDeduction += 1;
            }
        }

        // 에디셔널: 에픽 이상, 공/마 % 옵션 확인
        if (adiScore < 2) { // 에픽 미만
            result.additional.push(`[${slot}] ${itemName}: 에디셔널이 에픽 미만입니다 (${adiGrade || "없음"}).`);
            result.scoreDeduction += 2;
        } else {
            const hasAttPercent = adiLines.some(l => l && l.includes(attType) && l.includes("%"));
            if (!hasAttPercent) {
                result.additional.push(`[${slot}] ${itemName}: 에디셔널에 ${attType}% 옵션이 없습니다.`);
                result.scoreDeduction += 1;
            } else {
                result.good.push(`[${slot}] ${itemName}: 에디셔널 ${attType}% 옵션 보유`);
            }
        }
    }

    // ========== 2순위: 무기 ==========
    else if (slot === "무기") {
        // 도전자 무기 체크
        if (itemName.includes("도전자")) {
            result.good.push(`[${slot}] 도전자 무기를 사용 중입니다. 무기 진단을 패스합니다.`);
            return;
        }

        // 정석 루트 (회수용): 17~22성 쌍레/레유 매물
        const star = parseInt(item.starforce || "0");
        if (star < 17) {
            result.starforce.push(`[${slot}] ${itemName}: 스타포스가 17성 미만입니다 (${star}성). 17~22성 쌍레/레유 매물을 구매하세요.`);
            result.scoreDeduction += 5;
        }

        // 잠재능력: 보보방, 보보공, 보방공 등 유효 3줄
        if (potScore < 3) { // 유니크 미만
            result.potential.push(`[${slot}] ${itemName}: 잠재능력이 유니크 미만입니다. 쌍레/레유 매물 구매를 권장합니다.`);
            result.scoreDeduction += 3;
        } else {
            const validOptions = ["보스 몬스터 공격", "방어율 무시", attType];
            const validLineCount = potLines.filter(l => {
                if (!l) return false;
                return validOptions.some(opt => l.includes(opt));
            }).length;

            if (validLineCount < 2) {
                result.potential.push(`[${slot}] ${itemName}: 유효 잠재 옵션(보공/방무/${attType})이 2줄 미만입니다 (${validLineCount}줄).`);
                result.scoreDeduction += 2;
            } else {
                result.good.push(`[${slot}] ${itemName}: 유효 잠재 ${validLineCount}줄 (보공/방무/${attType})`);
            }
        }

        // 추가옵션: 2추(공격력 6단계) + 보공/뎀/올스탯 OR 1추(공격력 7단계)
        const addOpts = item.item_add_option || {};
        const attKey = attType === "마력" ? "magic_power" : "attack_power";
        const addAttVal = parseInt(addOpts[attKey] || "0");

        if (addAttVal === 0) {
            result.general.push(`[${slot}] ${itemName}: 추가옵션에 ${attType} 옵션이 없습니다.`);
            result.scoreDeduction += 3;
        } else if (addAttVal < 36) { // 6단계 미만
            result.general.push(`[${slot}] ${itemName}: 추가옵션 ${attType} ${addAttVal} (6단계(36) 이상 권장)`);
            result.scoreDeduction += 1;
        }

        // 작: 주문서 15%작 필수
        const scrollUpgrade = parseInt(item.scroll_upgrade || "0");
        if (scrollUpgrade < 8) { // 15%작 성공 시 최소 8단계 이상
            result.general.push(`[${slot}] ${itemName}: 주문서 강화 ${scrollUpgrade}단계 (15%작 사용 권장)`);
        }
    }

    // ========== 3순위: 보조무기 ==========
    else if (slot === "보조무기") {
        result.general.push(`💡 [${slot}] 직접 제작 금지! 경매장에서 레전드리/유니크 이상 구매를 권장합니다.`);

        // 임시 사용: 블랙보조무기 + 유니크 잠재능력 부여 주문서
        const isTemporary = itemName.includes("블랙") && potScore >= 2 && potScore <= 3;

        if (isTemporary) {
            result.general.push(`[${slot}] ${itemName}: 임시 블랙보조무기를 사용 중입니다.`);
        }

        // 잠재능력: 유니크 이상, 공/마% or 보공% 1줄 이상 필수
        if (potScore < 3) { // 유니크 미만
            result.potential.push(`[${slot}] ${itemName}: 잠재능력이 유니크 미만입니다 (${potGrade || "없음"}). 경매장에서 유니크 이상 구매를 권장합니다.`);
            result.scoreDeduction += 4;
        } else {
            const hasAttOrBoss = potLines.some(l => {
                if (!l) return false;
                return l.includes(attType + "%") || l.includes("보스 몬스터 공격") || l.includes("방어율 무시");
            });

            if (!hasAttOrBoss) {
                result.potential.push(`[${slot}] ${itemName}: ${attType}% 또는 보공% 또는 방무% 옵션이 1줄도 없습니다.`);
                result.scoreDeduction += 2;
            } else {
                result.good.push(`[${slot}] ${itemName}: 유효 잠재 옵션 보유 (${attType}%/보공%/방무%)`);
            }
        }

        // 에디셔널: 레어 이상, 공/마 옵션 무조건 포함
        if (adiScore < 1) { // 레어 미만
            result.additional.push(`[${slot}] ${itemName}: 에디셔널이 레어 미만입니다 (${adiGrade || "없음"}).`);
            result.scoreDeduction + 2;
        } else {
            const hasAtt = adiLines.some(l => {
                if (!l) return false;
                return l.includes(attType);
            });

            if (!hasAtt) {
                result.additional.push(`[${slot}] ${itemName}: 에디셔널에 ${attType} 옵션이 없습니다.`);
                result.scoreDeduction += 1;
            } else {
                result.good.push(`[${slot}] ${itemName}: 에디셔널 ${attType} 옵션 보유`);
            }
        }
    }
}

// === 4-2. 방어구/장신구 진단 ===
function diagnoseArmorAndAccessory(item: any, slot: string, itemName: string, mainStat: string, attType: string, isEventRing: boolean, result: EquipmentReport) {
    // 1. 스타포스 (이벤트링 제외)
    if (!isEventRing) {
        checkStarforce(item, slot, itemName, 12, result);
    }

    // 2. 잠재능력
    // 에픽 이상 필수, 에픽 이상이면 주스탯% 확인
    // 모자: 쿨감 허용, 장갑: 크뎀 허용
    let requiredOptions: string | string[] = mainStat === "HP" ? "HP%" : `${mainStat}%`;

    if (slot.includes("모자")) {
        requiredOptions = [requiredOptions as string, "재사용 대기시간"];
    } else if (slot.includes("장갑")) {
        requiredOptions = [requiredOptions as string, "크리티컬 데미지"];
    }

    checkPotential(item, slot, itemName, mainStat, attType, result, {
        minGrade: 2, // 에픽
        passGrade: 99, // 패스 없음 (모두 검사)
        requiredOption: requiredOptions
    });

    // 3. 에디셔널
    // 레어 이상 필수, 레어면 공10, 에픽이면 공10 or 주스탯%
    checkAdditionalPotential(item, slot, itemName, mainStat, attType, result, {
        minGrade: 1, // 레어
        passGrade: 99, // 패스 없음
        requiredOption: "SPECIAL_ARMOR_CHECK" // 특수 로직 적용
    });
}

// === 4. 장비 진단 (통합) ===
function diagnoseEquipment(items: any[], mainStat: string, attType: string, targetMode: 'HUNTING' | 'BOSS', currentDropRate: number): EquipmentReport {
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

    let totalDropRate = 0;

    items.forEach((item: any) => {
        const slot = item.item_equipment_slot;
        const itemName = item.item_name;

        // 사냥 모드일 때 드롭률 계산 (잠재능력) & 드롭템 패스 처리
        let hasDropOption = false;
        if (targetMode === 'HUNTING') {
            const potLines = [
                item.potential_option_1, item.potential_option_2, item.potential_option_3,
                item.additional_potential_option_1, item.additional_potential_option_2, item.additional_potential_option_3
            ];
            potLines.forEach(line => {
                if (line && line.includes("아이템 드롭률") && line.includes("%")) {
                    const match = line.match(/(\d+)%/);
                    if (match) totalDropRate += parseInt(match[1]);
                    hasDropOption = true;
                }
            });

            // 드롭률 옵션이 있는 아이템은 사냥용 세팅에서 무조건 통과 (스타포스 등 검사 생략)
            if (hasDropOption) return;
        }

        // 특수 스킬 반지 예외 처리 (전체 패스)
        if (SPECIAL_RING_KEYWORDS.some(k => itemName.includes(k))) return;

        // [예외 처리] 실버블라썸 링 (스타포스 12성 불가) & 정령의 펜던트 (잠재/에디 없음)
        // 사냥 모드일 때 특히 유효하지만, 보스 모드에서도 굳이 경고할 필요 없음 (특수 아이템 취급)
        if (itemName.includes("실버블라썸 링") || itemName.includes("정령의 펜던트")) return;

        // 이벤트 링 여부 확인
        const isEventRing = EVENT_RING_KEYWORDS.some(k => itemName.includes(k));

        // 분류별 진단 실행
        if (slot === "무기" || slot === "보조무기" || slot === "엠블렘") {
            diagnoseWSE(item, slot, itemName, mainStat, attType, result);
        } else if (STARFORCE_CHECK_SLOTS.some(s => slot.includes(s))) {
            // 방어구 및 장신구 (반지 포함)
            diagnoseArmorAndAccessory(item, slot, itemName, mainStat, attType, isEventRing, result);
        }
    });

    // 사냥 모드 드롭률 체크 (67% 미만 시 경고)
    // currentDropRate는 스탯창 기준 총 드롭률 (장비+어빌+유니온 등 포함)
    if (targetMode === 'HUNTING' && currentDropRate < 67) {
        result.general.push(`현재 아이템 드롭률이 ${currentDropRate}%입니다. (메소 확정 드롭을 위해 67% 이상 권장)`);
        result.general.push("💡 [드롭률 67% 달성 꿀팁]");
        result.general.push("1. 어빌리티: 첫째줄 아이템 드롭률 20% (레전드리)");
        result.general.push("2. 쓸만한 홀리심볼: 최대 24% (5차 스킬 코어 강화)");
        result.general.push("3. 유니온 아티팩트: 최대 12% (아티팩트 레벨업)");
        result.general.push("4. 재물 획득의 비약: 20% (사냥 시 필수 도핑)");
        result.general.push("👉 위 방법들을 조합하여 67%를 맞춰보세요!");
        result.scoreDeduction += 5;
    } else if (targetMode === 'HUNTING') {
        result.good.push(`아이템 드롭률 ${currentDropRate}%로 메소가 확정 드롭됩니다!`);
    }

    const hasAnyBad = result.starforce.length > 0 || result.potential.length > 0 || result.additional.length > 0 || result.general.length > 0;
    if (!hasAnyBad && items.length > 0) {
        result.good.push("장비 세팅 1단계(기초)를 완벽하게 통과했습니다! 🎉");
    }

    return result;
}

// === 메인 분석 함수 ===
export function analyze(characterData: any, targetMode: 'HUNTING' | 'BOSS', bossStage?: number): any {
    const { basic, item, stat, union, link, ability, hexaMatrix, hexaStat } = characterData;
    const myClass = basic.character_class;
    const jobData = JOB_META_DATA[myClass] || { stat: "STR", att: "공격력" };
    const mainStat = jobData.stat;
    const attType = jobData.att;

    // 1. 링크 스킬
    const linkResult = diagnoseLinkSkill(targetMode, link);

    // 2. 유니온
    const unionResult = diagnoseUnion(targetMode, union, mainStat);

    // 3. 어빌리티
    const abilityResult = diagnoseAbility(targetMode, ability, myClass);

    // 4. 장비 (아이템)
    const equipment = item.item_equipment || [];
    // 드롭률 정보 (사냥용 진단 시 필요할 수 있음)
    const dropStat = stat.final_stat?.find((s: any) => s.stat_name === "아이템 드롭률");
    const currentDropRate = dropStat ? parseInt(dropStat.stat_value || "0") : 0;

    const equipmentResult = diagnoseEquipment(equipment, mainStat, attType, targetMode, currentDropRate);

    // 종합 점수 계산 (100점 만점)
    let totalScore = 100;
    totalScore -= linkResult.scoreDeduction;
    totalScore -= unionResult.scoreDeduction;
    totalScore -= abilityResult.scoreDeduction;
    totalScore -= equipmentResult.scoreDeduction;

    if (totalScore < 0) totalScore = 0;

    // 티어 산정 (보스 진단의 stage를 고려)
    let tier = "B";

    if (targetMode === 'BOSS' && bossStage !== undefined) {
        // 보스 모드에서는 stage를 고려하여 등급 산정
        // Stage 9 (모든 단계 완료) = SSS 보장
        // Stage 8 = 최소 SS, 최대 SSS
        // Stage 7 = 최소 S, 최대 SS
        // Stage 6 = 최소 A, 최대 S
        // Stage 5 이하 = 점수만으로 판정

        if (bossStage >= 9) {
            // 9단계 완료: 무조건 SSS
            tier = "SSS";
        } else if (bossStage === 8) {
            // 8단계 진행중: SS ~ SSS
            tier = totalScore >= 95 ? "SSS" : "SS";
        } else if (bossStage === 7) {
            // 7단계 진행중: S ~ SS
            tier = totalScore >= 95 ? "SS" : totalScore >= 85 ? "S" : "A";
        } else if (bossStage === 6) {
            // 6단계 진행중: A ~ S
            tier = totalScore >= 90 ? "S" : totalScore >= 75 ? "A" : "B";
        } else {
            // 5단계 이하: 점수만으로 판정 (최대 A)
            if (totalScore >= 85) tier = "A";
            else if (totalScore >= 70) tier = "B";
            else tier = "C";
        }
    } else {
        // 사냥 모드 또는 stage 정보가 없는 경우: 기존 점수 기반 판정
        if (totalScore >= 100) tier = "SSS";
        else if (totalScore >= 90) tier = "SS";
        else if (totalScore >= 75) tier = "S";
        else if (totalScore >= 60) tier = "A";
    }

    return {
        tier,
        score: totalScore,
        bossStage: bossStage, // 보스 진단 단계 정보 포함
        stats: {
            dropRate: currentDropRate
        },
        sections: {
            link: linkResult,
            union: unionResult,
            ability: abilityResult,
            equipment: equipmentResult
        }
    };
}
