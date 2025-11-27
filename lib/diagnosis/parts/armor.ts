import { diagnoseEpicPotential } from './common';
import { diagnoseScroll } from './scroll';
import { getJobMainStat } from '../../job_utils';

/**
 * 🛡️ 방어구(Armor) 전용 진단 로직
 * - 상의/하의: 에테르넬 vs 파프니르 비교
 * - 한벌옷: 잠재능력 손해 경고
 * - 신발/망토/견장: 앱솔랩스 vs 아케인셰이드 vs 에테르넬 효율 비교
 */
export function diagnoseArmor(item: any, job?: string): string[] {
    const comments: string[] = [];
    const itemName = item.item_name || "";
    const slot = item.item_equipment_slot || "";
    const starforce = parseInt(item.starforce || "0");
    const potentialGrade = item.potential_option_grade;

    // 직업별 주스탯 및 공/마 타입 결정
    const mainStats = getJobMainStat(job || "");
    const isMagic = mainStats.includes('INT') && !mainStats.includes('STR'); // 대략적인 마법사 판별 (제논, 데벤져 고려)
    const attType = isMagic ? "마력" : "공격력";

    // 0. 주문서 작 진단 (Scroll)
    const scrollComments = diagnoseScroll(item);
    comments.push(...scrollComments);

    // 1. 상의 / 하의 (Top / Bottom)
    if (slot === "상의" || slot === "하의") {
        if (itemName.includes("에테르넬")) {
            if (starforce >= 21) {
                comments.push(`[최종 졸업] <b>21성</b> 이상 에테르넬은 카루타의 시대를 끝낸 유일한 아이템입니다. 압도적입니다.`);
            } else if (starforce >= 17) {
                comments.push(`[차세대 종결] 파프니르 <b>22성</b>을 넘어서는 스펙입니다. <b>21성</b> 이상을 목표로 하세요.`);
            }
        } else if (itemName.includes("하이네스") || itemName.includes("이글아이") || itemName.includes("트릭스터")) { // 카루타
            if (starforce >= 22) {
                comments.push(`[현역 최강] 에테르넬 전까지 대체 불가입니다. 평생 써도 무방한 명품입니다.`);
            } else if (starforce >= 17) {
                comments.push(`[국민 세팅] 카루타 상/하의는 가성비와 성능 모두 훌륭합니다.`);
            }
        }
    }

    // 2. 한벌옷 (Overall) - 경고
    if (slot === "한벌옷") {
        const level = item.item_base_option?.base_equipment_level || 0;
        if (level >= 160) { // 앱솔/아케인 한벌옷
            comments.push(`[비추천] 상의+하의 구성보다 잠재능력(주스탯%)에서 큰 손해를 봅니다. 카루타 상/하의 착용을 권장합니다.`);
        }
    }

    // 3. 신발 / 망토 / 어깨장식 (Shoes / Cape / Shoulder)
    if (slot === "신발" || slot === "망토" || slot === "어깨장식") {
        if (itemName.includes("앱솔랩스")) {
            if (starforce >= 22) {
                comments.push(`[가성비 제왕] <b>22성</b> 앱솔랩스는 <b>17성</b> 아케인보다 공격력이 월등히 높습니다. 현명한 선택입니다.`);
            } else if (starforce >= 17) {
                comments.push(`[국민 세팅] <b>17성</b> 앱솔은 가성비가 좋지만, 추후 <b>22성 앱솔</b>이나 <b>18성 아케인</b>으로 넘어가면 공격력이 대폭 상승합니다.`);
            }
        } else if (itemName.includes("아케인셰이드")) {
            if (starforce >= 22) {
                comments.push(`[졸업] <b>22성</b> 아케인... 더 이상 바랄 게 없는 엔드 스펙입니다.`);
            } else if (starforce >= 18) {
                comments.push(`[성장 교차점] <b>18성</b>부터는 깡공격력이 높아져 <b>22성</b> 앱솔과의 격차를 줄일 수 있습니다.`);
            } else if (starforce === 17) {
                comments.push(`[미래 지향적] 당장은 <b>22성</b> 앱솔보다 약할 수 있지만, <b>22성</b>을 바라보는 잠재력 있는 템셋팅입니다.`);
            }
        } else if (itemName.includes("에테르넬")) {
            if (starforce >= 17) {
                comments.push(`[최상위 포식자] 에테르넬 세트는 존재만으로도 강력합니다.`);
            }
        }
    }

    // 4. 잠재능력 (Potential) 진단
    const potentials = [item.potential_option_1, item.potential_option_2, item.potential_option_3].filter(Boolean);

    if (potentialGrade === '레전드리' || potentialGrade === '유니크') {
        // 주스탯 % 계산 - 직업 주스탯만 계산
        let statPct = 0;

        potentials.forEach(l => {
            if (l) {
                const match = l.match(/(\d+)%/);
                if (match) {
                    // 올스탯은 항상 포함
                    if (l.includes('올스탯')) {
                        statPct += parseInt(match[1]);
                    } else {
                        // 직업 주스탯과 일치하는 경우만 합산
                        mainStats.forEach(stat => {
                            if (l.includes(stat)) {
                                statPct += parseInt(match[1]);
                            }
                        });
                    }
                }
            }
        });

        if (potentialGrade === '레전드리') {
            if (statPct >= 30) {
                comments.push(`[잠재 졸업] <b>주스탯 ${statPct}%</b>! 완벽한 3줄 정옵입니다.`);
            } else if (statPct >= 27) {
                comments.push(`[고스펙 잠재] <b>주스탯 ${statPct}%</b>! 상위권 스펙입니다.`);
            } else if (statPct >= 21) {
                comments.push(`[표준 잠재] <b>주스탯 ${statPct}%</b>는 레전드리 표준입니다.`);
            } else if (statPct > 0) {
                comments.push(`[잠재 미흡] 레전드리 등급이지만 주스탯이 <b>${statPct}%</b>로 낮습니다. 21% 이상 권장합니다.`);
            }
        } else if (potentialGrade === '유니크') {
            if (statPct >= 15) {
                comments.push(`[유니크 종결] <b>주스탯 ${statPct}%</b>! 유니크 최상급 옵션입니다.`);
            } else if (statPct >= 12) {
                comments.push(`[유니크 준수] <b>주스탯 ${statPct}%</b>는 괜찮은 수치입니다.`);
            } else if (statPct > 0) {
                comments.push(`[유니크 아쉬움] 주스탯이 <b>${statPct}%</b>로 낮습니다. 15% 이상 권장합니다.`);
            }
        }
    } else if (potentialGrade === '에픽') {
        const epicComments = diagnoseEpicPotential(potentialGrade, potentials);
        comments.push(...epicComments);
    }

    // 5. 에디셔널 진단 (Additional Potential)
    const adiGrade = item.additional_potential_option_grade;
    const adiLines = [item.additional_potential_option_1, item.additional_potential_option_2, item.additional_potential_option_3];

    // 에디셔널 공/마 및 주스탯% 수치 계산
    let adiAtt = 0;
    let adiMagic = 0;
    let adiStatPct = 0;

    adiLines.forEach(l => {
        if (l) {
            if (l.includes("공격력")) {
                const match = l.match(/\+(\d+)/);
                if (match) adiAtt += parseInt(match[1]);
            }
            if (l.includes("마력")) {
                const match = l.match(/\+(\d+)/);
                if (match) adiMagic += parseInt(match[1]);
            }
            // 주스탯 % 체크 (직업 주스탯 및 올스탯만)
            const matchPct = l.match(/(\d+)%/);
            if (matchPct) {
                if (l.includes("올스탯")) {
                    adiStatPct += parseInt(matchPct[1]);
                } else {
                    mainStats.forEach(stat => {
                        if (l.includes(stat)) {
                            adiStatPct += parseInt(matchPct[1]);
                        }
                    });
                }
            }
        }
    });

    // 직업에 맞는 공/마만 유효로 인정
    const validAdiAtt = isMagic ? adiMagic : adiAtt;

    if (potentialGrade === "레전드리" && (!adiGrade || adiGrade === "레어")) {
        if (adiStatPct > 0) {
            comments.push(`[가성비 굿] 에디셔널에서 <b>주스탯 %</b>를 챙기셨네요. 공/마 10만큼이나 훌륭한 가성비 옵션입니다.`);
        } else if (validAdiAtt >= 10) {
            comments.push(`[가성비 굿] 에디셔널에서 ${attType} <b>+${validAdiAtt}</b>을 챙기셨네요. 레어 등급에서는 최선의 선택입니다. 아주 알뜰하시군요!`);
        } else {
            comments.push(`[속 빈 강정] 윗잠은 레전드리지만 에디셔널이 부실합니다. 에디 ${attType}이나 주스탯 %를 챙겨주세요.`);
        }
    } else if (adiGrade === "유니크") {
        if (adiStatPct > 0 && validAdiAtt > 0) {
            comments.push(`[에디 유니크] 에디셔널 <b>주스탯 ${adiStatPct}%</b>와 <b>${attType} +${validAdiAtt}</b>! 유효 옵션을 알차게 챙기셨습니다.`);
        } else if (adiStatPct > 0) {
            comments.push(`[에디 유니크] 에디셔널 <b>주스탯 ${adiStatPct}%</b>! 유니크 등급다운 훌륭한 옵션입니다.`);
        } else if (validAdiAtt >= 10) {
            comments.push(`[에디 유니크] 에디셔널 ${attType} <b>+${validAdiAtt}</b>! 든든한 옵션입니다.`);
        } else {
            comments.push(`[옵션 아쉬움] 에디셔널 유니크 등급이지만 유효 옵션이 부족합니다. 큐브로 스펙업을 노려보세요.`);
        }
    } else if (adiGrade === "에픽") {
        if (adiStatPct > 0) comments.push(`[에디 에픽] 에디셔널 <b>주스탯 ${adiStatPct}%</b>! 아주 든든한 옵션입니다.`);
        else if (validAdiAtt >= 10) comments.push(`[에디 에픽] 에디셔널 ${attType}를 잘 챙기셨습니다. 든든합니다.`);
    }

    // 6. 공통: 추옵 진단 (Flame)
    // 환생의 불꽃 사용 가능 부위: 무기, 모자, 상의, 하의, 신발, 망토, 장갑
    // 어깨장식(견장)은 환생의 불꽃 사용 불가
    if (slot !== "어깨장식") {
        const addOpts = item.item_add_option || {};

        const str = parseInt(addOpts.str || "0");
        const dex = parseInt(addOpts.dex || "0");
        const int = parseInt(addOpts.int || "0");
        const luk = parseInt(addOpts.luk || "0");
        const att = parseInt(addOpts.attack_power || "0");
        const magic = parseInt(addOpts.magic_power || "0");
        const allStat = parseInt(addOpts.all_stat || "0");

        // 깡추옵 + 공마*4 + 올스탯*10
        const scoreSTR = str + (att * 4) + (allStat * 10);
        const scoreDEX = dex + (att * 4) + (allStat * 10);
        const scoreINT = int + (magic * 4) + (allStat * 10);
        const scoreLUK = luk + (att * 4) + (allStat * 10);

        const score = Math.max(scoreSTR, scoreDEX, scoreINT, scoreLUK);

        if (score >= 160) comments.push(`[극추옵] <b>160급</b> 이상! 초고스펙용 종결 추옵입니다.`);
        else if (score >= 130) comments.push(`[고추옵] <b>130급</b> 이상! 고스펙용으로 훌륭합니다.`);
        else if (score >= 100) comments.push(`[합격점] <b>100급</b> 이상! 실전에서 사용하기 적절합니다.`);
        else if (score < 80 && item.item_base_option?.base_equipment_level >= 140) {
            comments.push(`[환불 필요] <b>80급</b> 미만입니다. 환생의 불꽃 작업이 필요합니다.`);
        }
    }

    return comments;
}
