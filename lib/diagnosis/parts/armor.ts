import { diagnoseEpicPotential, checkPensalirAndWarn } from './common';
import { diagnoseScroll } from './scroll';
import { getJobMainStat } from '../../job_utils';
import {
    STARFORCE_TIERS,
    MAIN_POTENTIAL_STAT,
    ADDITIONAL_POTENTIAL_STAT,
    ARMOR_FLAME_SCORE,
    STAT_CONVERSION,
    SPECIAL_STARFORCE_GOALS,
    getPotentialCriteria,
    getMainPotentialGrade,
} from '../../config/unified_criteria';

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

    // 🚨 펜살리르 체크 - 펜살리르면 여기서 종료
    const pensalirWarning = checkPensalirAndWarn(itemName, 'armor');
    if (pensalirWarning) return pensalirWarning;

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
            if (starforce >= STARFORCE_TIERS.MAX) {
                comments.push(`[신화의 경지] <b>${starforce}성</b> 에테르넬...?! 이건 메이플스토리의 역사를 새로 쓰는 아이템입니다. 전 서버 유일무이한 스펙일 수 있습니다.`);
            } else if (starforce === 24) {
                comments.push(`[초월적 스펙] <b>24성</b> 에테르넬! 운영자도 놀랄만한 기적의 아이템입니다.`);
            } else if (starforce === 23) {
                comments.push(`[전설의 시작] <b>23성</b> 에테르넬은 그 자체로 하나의 전설입니다. 압도적인 위용을 자랑합니다.`);
            } else if (starforce === STARFORCE_TIERS.ENDGAME) {
                comments.push(`[완벽한 졸업] <b>${STARFORCE_TIERS.ENDGAME}성</b> 에테르넬은 카루타의 시대를 완전히 끝낸 최종 종결템입니다.`);
            } else if (starforce === STARFORCE_TIERS.NEAR_ENDGAME) {
                comments.push(`[해방급 스펙] <b>${STARFORCE_TIERS.NEAR_ENDGAME}성</b> 에테르넬은 매우 훌륭한 선택입니다. ${STARFORCE_TIERS.ENDGAME}성을 도전할지 고민되시겠군요.`);
            } else if (starforce >= STARFORCE_TIERS.CROSSOVER) {
                comments.push(`[고급 세팅] <b>${starforce}성</b> 에테르넬은 준수한 성능입니다. ${STARFORCE_TIERS.NEAR_ENDGAME}성 이상을 목표로 하세요.`);
            } else if (starforce === STARFORCE_TIERS.STANDARD) {
                comments.push(`[차세대 종결] 파프니르 <b>${STARFORCE_TIERS.ENDGAME}성</b>을 넘어서는 스펙입니다. <b>${STARFORCE_TIERS.NEAR_ENDGAME}성</b> 이상을 목표로 하세요.`);
            }
        } else if (itemName.includes("하이네스") || itemName.includes("이글아이") || itemName.includes("트릭스터")) { // 카루타
            if (starforce >= STARFORCE_TIERS.MAX) {
                comments.push(`[전설의 카루타] <b>${starforce}성</b>...?! 이 정도면 에테르넬도 부럽지 않은 괴물 같은 성능입니다.`);
            } else if (starforce === 24) {
                comments.push(`[기적의 강화] <b>24성</b> 카루타! 수많은 파괴를 딛고 탄생한 역작입니다.`);
            } else if (starforce === 23) {
                comments.push(`[초고스펙] <b>23성</b> 카루타는 가성비와 성능의 정점입니다. 평생 쓰셔도 됩니다.`);
            } else if (starforce === STARFORCE_TIERS.ENDGAME) {
                comments.push(`[현역 최강] 에테르넬 전까지 대체 불가입니다. 평생 써도 무방한 명품입니다.`);
            } else if (starforce === STARFORCE_TIERS.NEAR_ENDGAME) {
                comments.push(`[고효율 세팅] <b>${STARFORCE_TIERS.NEAR_ENDGAME}성</b> 카루타는 가성비가 매우 좋습니다. ${STARFORCE_TIERS.ENDGAME}성을 도전해볼 만한 가치가 있습니다.`);
            } else if (starforce >= STARFORCE_TIERS.CROSSOVER) {
                comments.push(`[고급 세팅] <b>${starforce}성</b> 카루타는 준수한 성능입니다. ${STARFORCE_TIERS.ENDGAME}성을 목표로 하세요.`);
            } else if (starforce === STARFORCE_TIERS.STANDARD) {
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
        if (itemName.includes('펜살리르')) {
            comments.push(`[교체 추천] 펜살리르 ${slot}보다 <b>앱솔랩스/아케인셰이드 ${slot}</b>이 훨씬 좋습니다. 교체를 고려해보세요.`);
        } else if (itemName.includes("앱솔랩스")) {
            if (starforce >= 23) {
                comments.push(`[앱솔의 한계 돌파] <b>${starforce}성</b> 앱솔랩스...?! 애정이 가득 담긴 아이템이군요. 대단합니다.`);
            } else if (starforce === STARFORCE_TIERS.ENDGAME) {
                comments.push(`[가성비 제왕] <b>${STARFORCE_TIERS.ENDGAME}성</b> 앱솔랩스는 <b>${STARFORCE_TIERS.STANDARD}성</b> 아케인보다 공격력이 월등히 높습니다. 현명한 선택입니다.`);
            } else if (starforce === STARFORCE_TIERS.NEAR_ENDGAME) {
                comments.push(`[준수한 고스펙] <b>${STARFORCE_TIERS.NEAR_ENDGAME}성</b> 앱솔랩스는 가성비 좋게 사용하기 좋습니다.`);
            } else if (starforce >= STARFORCE_TIERS.CROSSOVER) {
                comments.push(`[고급 세팅] <b>${starforce}성</b> 앱솔은 준수한 성능입니다. ${STARFORCE_TIERS.ENDGAME}성이나 아케인으로 업그레이드를 고려해보세요.`);
            } else if (starforce === STARFORCE_TIERS.STANDARD) {
                comments.push(`[국민 세팅] <b>${STARFORCE_TIERS.STANDARD}성</b> 앱솔은 가성비가 좋지만, 추후 <b>${STARFORCE_TIERS.ENDGAME}성 앱솔</b>이나 <b>${STARFORCE_TIERS.CROSSOVER}성 아케인</b>으로 넘어가면 공격력이 대폭 상승합니다.`);
            }
        } else if (itemName.includes("아케인셰이드")) {
            if (starforce >= STARFORCE_TIERS.MAX) {
                comments.push(`[아케인의 정점] <b>${starforce}성</b> 아케인...?! 칠흙 세트 부럽지 않은 압도적인 깡스펙입니다.`);
            } else if (starforce >= 23) {
                comments.push(`[초월급 아케인] <b>${starforce}성</b> 아케인은 정말 보기 드문 귀한 아이템입니다.`);
            } else if (starforce === STARFORCE_TIERS.ENDGAME) {
                comments.push(`[졸업] <b>${STARFORCE_TIERS.ENDGAME}성</b> 아케인... 더 이상 바랄 게 없는 엔드 스펙입니다.`);
            } else if (starforce === STARFORCE_TIERS.NEAR_ENDGAME) {
                comments.push(`[준종결] <b>${STARFORCE_TIERS.NEAR_ENDGAME}성</b> 아케인은 충분히 강력합니다. ${STARFORCE_TIERS.ENDGAME}성 도전을 추천합니다.`);
            } else if (starforce >= STARFORCE_TIERS.CROSSOVER) {
                comments.push(`[성장 교차점] <b>${STARFORCE_TIERS.CROSSOVER}성</b>부터는 깡공격력이 높아져 <b>${STARFORCE_TIERS.ENDGAME}성</b> 앱솔과의 격차를 줄일 수 있습니다.`);
            } else if (starforce === STARFORCE_TIERS.STANDARD) {
                comments.push(`[미래 지향적] 당장은 <b>${STARFORCE_TIERS.ENDGAME}성</b> 앱솔보다 약할 수 있지만, <b>${STARFORCE_TIERS.ENDGAME}성</b>을 바라보는 잠재력 있는 템셋팅입니다.`);
            }
        } else if (itemName.includes("에테르넬")) {
            if (starforce >= STARFORCE_TIERS.MAX) {
                comments.push(`[신화의 경지] <b>${starforce}성</b> 에테르넬...?! 이건 메이플스토리의 역사를 새로 쓰는 아이템입니다.`);
            } else if (starforce === 24) {
                comments.push(`[초월적 스펙] <b>24성</b> 에테르넬! 운영자도 놀랄만한 기적의 아이템입니다.`);
            } else if (starforce === 23) {
                comments.push(`[전설의 시작] <b>23성</b> 에테르넬은 그 자체로 하나의 전설입니다.`);
            } else if (starforce === STARFORCE_TIERS.ENDGAME) {
                comments.push(`[완벽한 졸업] <b>${STARFORCE_TIERS.ENDGAME}성</b> 에테르넬은 최종 종결템입니다.`);
            } else if (starforce === STARFORCE_TIERS.NEAR_ENDGAME) {
                comments.push(`[해방급 스펙] <b>${STARFORCE_TIERS.NEAR_ENDGAME}성</b> 에테르넬은 매우 훌륭한 선택입니다.`);
            } else if (starforce >= STARFORCE_TIERS.CROSSOVER) {
                comments.push(`[고급 세팅] <b>${starforce}성</b> 에테르넬은 준수한 성능입니다. ${STARFORCE_TIERS.ENDGAME}성을 목표로 하세요.`);
            } else if (starforce === STARFORCE_TIERS.STANDARD) {
                comments.push(`[최상위 포식자] 에테르넬 세트는 존재만으로도 강력합니다.`);
            }
        } else if (itemName.includes("로얄 블랙메탈 숄더")) {
            if (starforce >= SPECIAL_STARFORCE_GOALS.ROYAL_BLACK_METAL) {
                comments.push(`[거쳐가는 단계] <b>${starforce}성</b>이면 충분합니다. 추후 <b>앱솔랩스</b>나 <b>아케인셰이드</b> 견장으로 넘어가세요.`);
            } else {
                comments.push(`[성장 조언] 가성비 좋게 <b>${SPECIAL_STARFORCE_GOALS.ROYAL_BLACK_METAL}성</b>까지만 강화해서 쓰다가 상위 견장으로 교체하는 것을 추천합니다.`);
            }
        }
    }

    // 4. 잠재능력 (Potential) 진단
    const potentials = [item.potential_option_1, item.potential_option_2, item.potential_option_3].filter(Boolean);

    if (itemName.includes('펜살리르')) {
        comments.push(`[교체 권장] 펜살리르 장비에 잠재능력 투자는 비효율적입니다. 앱솔랩스/아케인셰이드로 교체하세요.`);
    } else if (potentialGrade === '레전드리' || potentialGrade === '유니크') {
        // 주스탯 % 계산 - 직업 주스탯만 계산
        let statPct = 0;

        potentials.forEach(l => {
            if (l) {
                const match = l.match(/(\d+)%/);
                if (match) {
                    // 올스탯은 항상 포함
                    if (l.includes('올스탯')) {
                        statPct += parseInt(match[1]);
                    }
                    // HP%는 데몬어벤져만 주스탯으로 인정
                    else if (l.includes('HP') && l.includes('%')) {
                        if (job && job.includes('데몬어벤져')) {
                            statPct += parseInt(match[1]);
                        }
                    }
                    // 직업 주스탯과 일치하는 경우만 합산
                    else {
                        mainStats.forEach(stat => {
                            if (l.includes(stat)) {
                                statPct += parseInt(match[1]);
                            }
                        });
                    }
                }
                // 렙당 주스탯 (유효 라인 인정)
                if (l.includes("캐릭터 기준 9레벨 당")) {
                    const isMainStat = l.includes("올스탯") || mainStats.some(stat => l.includes(stat));
                    if (isMainStat) {
                        if (l.includes("+1")) statPct += 3; // 렙당 1 = 3%
                        if (l.includes("+2")) statPct += 6; // 렙당 2 = 6%
                    }
                }
            }
        });

        if (potentialGrade === '레전드리') {
            // 레벨별 기준 적용
            const itemLevel = item.item_base_option?.base_equipment_level || 150;
            const is201Plus = itemLevel >= 201;
            const tier = is201Plus ? '201~250제' : '71~200제';

            // 통합 기준 사용 (제논 자동 판별)
            const criteria = getPotentialCriteria(itemLevel, job);

            if (statPct >= criteria.MYTHIC) {
                comments.push(`[신화급 잠재] <b>주스탯 ${statPct}%</b>! 올이탈... 이건 기적입니다. (${tier})`);
            } else if (statPct >= criteria.ENDGAME_HIGH) {
                comments.push(`[초월급 잠재] <b>주스탯 ${statPct}%</b>! 쌍이탈 옵션(${criteria.ENDGAME_HIGH}% 이상)입니다. (${tier})`);
            } else if (statPct >= criteria.ENDGAME) {
                comments.push(`[잠재 졸업] <b>주스탯 ${statPct}%</b>!완벽한 졸업급 정옵입니다. (${tier})`);
            } else if (statPct >= criteria.GOOD) {
                comments.push(`[표준 잠재] <b>주스탯 ${statPct}%</b>는 레전드리 표준입니다. (${tier})`);
            } else if (statPct > 0) {
                comments.push(`[잠재 미흡] 레전드리 등급이지만 주스탯이 <b>${statPct}%</b>로 낮습니다. ${criteria.GOOD}% 이상 권장합니다.`);
            }
        } else if (potentialGrade === '유니크' || potentialGrade === '에픽') {
            const itemLevel = item.item_base_option?.base_equipment_level || 150;
            const tier = itemLevel >= 201 ? '201~250제' : '71~200제';

            // 통합 평가 함수 사용 (제논 자동 처리)
            const gradeLabel = getMainPotentialGrade(statPct, potentialGrade, itemLevel, job);

            // 제논일 경우 주스탯 대신 올스탯 표기
            const isXenon = job && (job.includes('제논') || job.replace(/\s/g, '').includes('제논'));
            const statLabel = isXenon ? '올스탯' : '주스탯';

            if (gradeLabel !== '아쉬움' && gradeLabel !== '부족' && gradeLabel !== '보통') {
                comments.push(`[${gradeLabel}] <b>${statLabel} ${statPct}%</b>! ${potentialGrade} 등급에서 훌륭한 수치입니다. (${tier})`);
            } else if (statPct > 0) {
                comments.push(`[${gradeLabel}] ${statLabel}이 <b>${statPct}%</b>입니다. 조금 더 높은 수치를 노려보세요.`);
            }
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
                    }
                    // HP%는 데몬어벤져만 주스탯으로 인정
                    else if (l.includes('HP') && l.includes('%')) {
                        if (job && job.includes('데몬어벤져')) {
                            adiStatPct += parseInt(matchPct[1]);
                        }
                    }
                    else {
                        mainStats.forEach(stat => {
                            if (l.includes(stat)) {
                                adiStatPct += parseInt(matchPct[1]);
                            }
                        });
                    }
                }
                // 렙당 주스탯 (유효 라인 인정)
                if (l.includes("레벨 당")) {
                    const isMainStat = l.includes("올스탯") || mainStats.some(stat => l.includes(stat));
                    if (isMainStat) {
                        if (l.includes("+1")) adiStatPct += 3; // 렙당 1 = 3%
                        if (l.includes("+2")) adiStatPct += 6; // 렙당 2 = 6%
                    }
                }
            }
        });

        // 직업에 맞는 공/마만 유효로 인정
        const validAdiAtt = isMagic ? adiMagic : adiAtt;

        // 공/마를 주스탯%로 환산하여 합산
        // 공/마 1 = 주스탯 4, 주스탯 10 = 1%
        const attEquiv = (validAdiAtt * 4) / 10;
        const totalAdiStatPct = adiStatPct + attEquiv;

        if (potentialGrade === "레전드리" && (!adiGrade || adiGrade === "레어")) {
            if (adiStatPct > 0) {
                comments.push(`[가성비 굿] 에디셔널에서 <b>주스탯 %</b>를 챙기셨네요. 공/마 10만큼이나 훌륭한 가성비 옵션입니다.`);
            } else if (validAdiAtt >= 10) {
                comments.push(`[가성비 굿] 에디셔널에서 ${attType} <b>+${validAdiAtt}</b>을 챙기셨네요. 레어 등급에서는 최선의 선택입니다. 아주 알뜰하시군요!`);
            } else {
                comments.push(`[속 빈 강정] 윗잠은 레전드리지만 에디셔널이 부실합니다. 에디 ${attType}이나 주스탯 %를 챙겨주세요.`);
            }
        } else if (adiGrade === "유니크") {
            if (totalAdiStatPct > 0 && validAdiAtt > 0) {
                comments.push(`[에디 유니크] 에디셔널 <b>주스탯 ${Math.round(totalAdiStatPct)}%</b>급 효율! 유효 옵션을 알차게 챙기셨습니다.`);
            } else if (totalAdiStatPct > 0) {
                comments.push(`[에디 유니크] 에디셔널 <b>주스탯 ${Math.round(totalAdiStatPct)}%</b>급 효율! 유니크 등급다운 훌륭한 옵션입니다.`);
            } else if (validAdiAtt >= 10) {
                comments.push(`[에디 유니크] 에디셔널 ${attType} <b>+${validAdiAtt}</b>! 든든한 옵션입니다.`);
            } else {
                comments.push(`[옵션 아쉬움] 에디셔널 유니크 등급이지만 유효 옵션이 부족합니다. 큐브로 스펙업을 노려보세요.`);
            }
        } else if (adiGrade === "레전드리") {
            if (totalAdiStatPct >= 21) {
                comments.push(`[에디 종결] 에디셔널 <b>주스탯 ${Math.round(totalAdiStatPct)}%</b>! 전 서버급 초고스펙 옵션입니다.`);
            } else if (totalAdiStatPct >= 14) {
                comments.push(`[에디 준종결] 에디셔널 <b>주스탯 ${Math.round(totalAdiStatPct)}%</b>! 아주 훌륭한 준종결급 스펙입니다.`);
            } else if (validAdiAtt >= 12 && adiStatPct === 0) {
                // 공/마만 있고 주스탯%가 없는 경우
                comments.push(`[에디 레전드리] 에디셔널 ${attType} <b>+${validAdiAtt}</b>! 든든한 옵션입니다.`);
            } else if (totalAdiStatPct >= 10) {
                comments.push(`[에디 레전드리] 에디셔널 <b>주스탯 ${Math.round(totalAdiStatPct)}%</b>급 효율! 준수한 옵션입니다.`);
            } else {
                comments.push(`[옵션 아쉬움] 에디셔널 레전드리 등급이지만 유효 옵션이 조금 아쉽습니다.`);
            }
        } else if (adiGrade === "에픽") {
            if (totalAdiStatPct > 0) comments.push(`[에디 에픽] 에디셔널 <b>주스탯 ${Math.round(totalAdiStatPct)}%</b>급 효율! 아주 든든한 옵션입니다.`);
            else if (validAdiAtt >= 10) comments.push(`[에디 에픽] 에디셔널 ${attType}를 잘 챙기셨습니다. 든든합니다.`);
        }

        // 6. 공통: 추옵 진단 (Flame)
        // 환생의 불꽃 사용 가능 부위: 무기, 모자, 상의, 하의, 신발, 망토, 장갑
        // 어깨장식(견장)은 환생의 불꽃 사용 불가
        if (itemName.includes('펜살리르')) {
            comments.push(`[교체 권장] 펜살리르 장비에 환생의 불꽃 투자는 비효율적입니다. 앱솔랩스/아케인셰이드로 교체하세요.`);
        } else if (slot !== "어깨장식") {
            const addOpts = item.item_add_option || {};

            const str = parseInt(addOpts.str || "0");
            const dex = parseInt(addOpts.dex || "0");
            const int = parseInt(addOpts.int || "0");
            const luk = parseInt(addOpts.luk || "0");
            const hp = parseInt(addOpts.max_hp || "0"); // HP 추가 (데몬어벤져용)
            const att = parseInt(addOpts.attack_power || "0");
            const magic = parseInt(addOpts.magic_power || "0");
            const allStat = parseInt(addOpts.all_stat || "0");

            // 깡추옵 + 공마*4 + 올스탯*10
            const scoreSTR = str + (att * 4) + (allStat * 10);
            const scoreDEX = dex + (att * 4) + (allStat * 10);
            const scoreINT = int + (magic * 4) + (allStat * 10);
            const scoreLUK = luk + (att * 4) + (allStat * 10);
            // HP는 21당 주스탯 1 효율 (이미지 기준)
            const scoreHP = (hp / 21) + (att * 4) + (allStat * 10);

            const score = Math.floor(Math.max(scoreSTR, scoreDEX, scoreINT, scoreLUK, scoreHP));

            const level = item.item_base_option?.base_equipment_level || 0;

            if (level >= 250) {
                if (score >= 190) comments.push(`[종결] <b>${score}급</b> (${level}제)! 전 서버급 신화적인 추옵입니다.`);
                else if (score >= 180) comments.push(`[종결급] <b>${score}급</b> (${level}제)! 더 이상 바랄 게 없는 완벽한 추옵입니다.`);
                else if (score >= 170) comments.push(`[최상급 옵션] <b>${score}급</b> (${level}제)! 최상위권 유저들도 부러워할 수치입니다.`);
                else if (score >= 160) comments.push(`[많이 좋음] <b>${score}급</b> (${level}제)! 아주 훌륭한 고스펙용 추옵입니다.`);
                else if (score >= 150) comments.push(`[꽤 좋음] <b>${score}급</b> (${level}제)! 어디 가서 꿀리지 않는 좋은 추옵입니다.`);
                else if (score >= 140) comments.push(`[좋음] <b>${score}급</b> (${level}제)! 실전에서 사용하기 좋습니다.`);
                else if (score >= 130) comments.push(`[준수] <b>${score}급</b> (${level}제)! 무난하게 사용 가능합니다.`);
                else if (score >= 120) comments.push(`[보통] <b>${score}급</b> (${level}제)! 임시로 쓰기 적절합니다.`);
                else if (score >= 110) comments.push(`[아쉬움] <b>${score}급</b> (${level}제)! 조금 더 높은 추옵을 노려보세요.`);
                else if (score >= 100) comments.push(`[부캐용] <b>${score}급</b> (${level}제)! 본캐용으로는 아쉽습니다.`);
                else comments.push(`[환불 필요] <b>${score}급</b> (${level}제) 미만입니다. 환생의 불꽃 작업이 필요합니다.`);
            } else if (level >= 200) {
                if (score >= 170) comments.push(`[종결급] <b>${score}급</b> (${level}제)! 더 이상 바랄 게 없는 완벽한 추옵입니다.`);
                else if (score >= 160) comments.push(`[최상급 옵션] <b>${score}급</b> (${level}제)! 최상위권 유저들도 부러워할 수치입니다.`);
                else if (score >= 150) comments.push(`[많이 좋음] <b>${score}급</b> (${level}제)! 아주 훌륭한 고스펙용 추옵입니다.`);
                else if (score >= 140) comments.push(`[꽤 좋음] <b>${score}급</b> (${level}제)! 어디 가서 꿀리지 않는 좋은 추옵입니다.`);
                else if (score >= 130) comments.push(`[좋음] <b>${score}급</b> (${level}제)! 실전에서 사용하기 좋습니다.`);
                else if (score >= 120) comments.push(`[준수] <b>${score}급</b> (${level}제)! 무난하게 사용 가능합니다.`);
                else if (score >= 110) comments.push(`[보통] <b>${score}급</b> (${level}제)! 임시로 쓰기 적절합니다.`);
                else if (score >= 100) comments.push(`[부캐용] <b>${score}급</b> (${level}제)! 본캐용으로는 아쉽습니다.`);
                else comments.push(`[환불 필요] <b>${score}급</b> (${level}제) 미만입니다. 환생의 불꽃 작업이 필요합니다.`);
            } else if (level >= 160) {
                if (score >= 150) comments.push(`[종결급] <b>${score}급</b> (${level}제)! 더 이상 바랄 게 없는 완벽한 추옵입니다.`);
                else if (score >= 140) comments.push(`[최상급 좋음] <b>${score}급</b> (${level}제)! 최상위권 유저들도 부러워할 수치입니다.`);
                else if (score >= 130) comments.push(`[많이 좋음] <b>${score}급</b> (${level}제)! 아주 훌륭한 고스펙용 추옵입니다.`);
                else if (score >= 120) comments.push(`[좋음] <b>${score}급</b> (${level}제)! 실전에서 사용하기 좋습니다.`);
                else if (score >= 110) comments.push(`[준수] <b>${score}급</b> (${level}제)! 무난하게 사용 가능합니다.`);
                else if (score >= 100) comments.push(`[보통] <b>${score}급</b> (${level}제)! 임시로 쓰기 적절합니다.`);
                else comments.push(`[환불 필요] <b>${score}급</b> (${level}제) 미만입니다. 환생의 불꽃 작업이 필요합니다.`);
            } else {
                // 140~150 and below
                if (score >= 150) comments.push(`[종결급] <b>${score}급</b> (${level}제)! 더 이상 바랄 게 없는 완벽한 추옵입니다.`);
                else if (score >= 140) comments.push(`[최상급 좋음] <b>${score}급</b> (${level}제)! 최상위권 유저들도 부러워할 수치입니다.`);
                else if (score >= 130) comments.push(`[많이 좋음] <b>${score}급</b> (${level}제)! 아주 훌륭한 고스펙용 추옵입니다.`);
                else if (score >= 120) comments.push(`[좋음] <b>${score}급</b> (${level}제)! 실전에서 사용하기 좋습니다.`);
                else if (score >= 110) comments.push(`[준수] <b>${score}급</b> (${level}제)! 무난하게 사용 가능합니다.`);
                else if (score >= 100) comments.push(`[보통] <b>${score}급</b> (${level}제)! 임시로 쓰기 적절합니다.`);
                else if (level >= 140) comments.push(`[환불 필요] <b>${score}급</b> (${level}제) 미만입니다. 환생의 불꽃 작업이 필요합니다.`);
            }
        }

        return comments;
    }
}
