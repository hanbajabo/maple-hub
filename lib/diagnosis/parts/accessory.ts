
import { diagnoseEpicPotential, checkPensalirAndWarn } from './common';

import { diagnoseScroll } from './scroll';
import { getJobMainStat } from '../../job_utils';
import { EVENT_RING_MESSAGES } from '../../config/message_templates';
import { EquipmentItem } from '../types';
import { getStarforce, calculateFlameScore, getSeedRingLevel } from '../utils';
import { isAmazingEnhancementItem } from '../../amazing_enhancement_table';
import {
    getMaxStarforce,
    STARFORCE_TIERS,
    SUPERIOR_STARFORCE,
    MAIN_POTENTIAL_STAT,
    ADDITIONAL_POTENTIAL_STAT,
    ARMOR_FLAME_SCORE,
    SPECIAL_RING_KEYWORDS,
    DAWN_BOSS_KEYWORDS,
    EVENT_RING_KEYWORDS,
    SPECIAL_NON_UPGRADABLE_RINGS,
    PITCH_BOSS_KEYWORDS,
    MECHANICAL_HEART_KEYWORDS,
    STAT_CONVERSION,
    SPECIAL_STARFORCE_GOALS,
    getPotentialCriteria,
    getMainPotentialGrade
} from '../../config/unified_criteria';

/**
 * 💍 장신구(Accessory) 전용 진단 로직
 * - 시드링 레벨 및 종류 평가
 * - 여명 보스 세트 가치 평가
 * - 광부 아이템 (드랍/메획) 진단
 * - 기계 심장 (Heart) 진단
 */
export function diagnoseAccessory(item: EquipmentItem, job?: string): string[] {
    const comments: string[] = [];
    const itemName = item.item_name || "";
    const slot = item.item_equipment_slot || "";
    const starforce = getStarforce(item);
    const level = item.item_base_option?.base_equipment_level || 0;
    const potentials = [item.potential_option_1, item.potential_option_2, item.potential_option_3].filter((s): s is string => !!s);

    // 🚨 펜살리르 체크 - 펜살리르면 여기서 종료
    const pensalirWarning = checkPensalirAndWarn(itemName, 'armor');
    if (pensalirWarning) return pensalirWarning;

    // 직업별 주스탯 및 공/마 타입 결정
    const mainStats = getJobMainStat(job || "");
    const isMagic = mainStats.includes('INT') && !mainStats.includes('STR'); // 대략적인 마법사 판별 (제논, 데벤져 고려)
    const attType = isMagic ? "마력" : "공격력";

    // 이벤트링 체크 (주문서 적용 불가)
    const isEventRing = EVENT_RING_KEYWORDS.some(k => itemName.includes(k));
    const isSpecialRing = SPECIAL_NON_UPGRADABLE_RINGS.some(k => itemName.includes(k));

    // 0. 주문서 작 진단 (Scroll) - 기계 심장, 뱃지, 훈장, 포켓, 이벤트링, 특수링, 놀장강 제외
    if (!slot.includes("기계 심장") && !slot.includes("뱃지") && !slot.includes("훈장") && !slot.includes("포켓") && !isEventRing && !isSpecialRing && !isAmazingEnhancementItem(item)) {
        const scrollComments = diagnoseScroll(item);
        comments.push(...scrollComments);
    }

    // 🎁 이벤트링 잠재능력 진단
    if (isEventRing) {
        const potGrade = item.potential_option_grade || '없음';
        if (potGrade === '레어' || potGrade === '에픽' || potGrade === '없음') {
            // 에픽 이하: 레전드리 주문서 + 명장의 큐브 추천
            const messages = EVENT_RING_MESSAGES.UPGRADE_TO_LEGENDARY;
            comments.push(messages[Math.floor(Math.random() * messages.length)]);
        } else if (potGrade === '유니크') {
            // 유니크: 레전드리 업그레이드 권장
            const messages = EVENT_RING_MESSAGES.UPGRADE_FROM_UNIQUE;
            comments.push(messages[Math.floor(Math.random() * messages.length)]);
        }
    }

    if (isSpecialRing) {
        comments.push(`[특수 링] 자체 옵션이 우수한 특수 반지입니다. (스타포스/주문서/잠재 불가능)`);
        return comments;
    }

    // 0. 기계 심장 (Mechanical Heart)
    if (slot.includes("기계 심장")) {
        if (itemName.includes("컴플리트 언더컨트롤")) {
            comments.push(`[최강의 심장] 현존하는 메이플스토리 최강의 심장입니다. 더 이상 바랄 게 없습니다.`);
        } else if (itemName.includes("플라즈마")) {
            if (starforce >= 20) comments.push(`[준종결] <b>20성</b> 플라즈마 하트! 페어리 하트를 뛰어넘는 강력한 스펙을 완성하셨습니다.`);
            else comments.push(`[성장 가능성] 플라즈마 하트는 <b>20성</b> 이상 강화해야 진가를 발휘합니다. 강화를 도전해보세요!`);
        } else if (itemName.includes("블랙")) {
            comments.push(`[전설의 아이템] 단종된 블랙 하트입니다. 남은 기간 동안 최강의 가성비를 누리세요.`);
        } else if (itemName.includes("리퀴드메탈")) {
            comments.push(`[주의] 놀장 12성이 아니라면 가치가 낮습니다. 플라즈마 하트로 승계도 불가능하니 주의하세요.`);
        } else if (itemName.includes("페어리") || itemName.includes("티타늄") || itemName.includes("리튬") || itemName.includes("골드")) {
            if (starforce >= 8) comments.push(`[국민 하트] 가성비 하트의 최대 성능(<b>8성</b>)입니다. 추후 '플라즈마 하트'로 승계를 목표로 하세요.`);
            else comments.push(`[강화 권장] 이 하트는 <b>8성</b>이 한계입니다. 비용이 저렴하니 <b>8성</b>까지 꽉 채워주세요.`);
        }

        // 하트 작 진단 (주문서)
        const scrollCount = parseInt(item.scroll_upgrade || "0");
        const etcAtt = parseInt(item.item_etc_option?.attack_power || "0");
        const etcMagic = parseInt(item.item_etc_option?.magic_power || "0");

        // 직업에 맞는 공격력/마력만 체크
        const currentAtt = isMagic ? etcMagic : etcAtt;
        const otherAtt = isMagic ? etcAtt : etcMagic;

        if (currentAtt >= scrollCount * 9) {
            comments.push(`[매지컬/스페셜 완작] 주문서 작이 완벽합니다. 더 이상 손댈 곳이 없습니다.`);
        } else if (currentAtt <= scrollCount * 3 && scrollCount > 0) {
            comments.push(`[주흔 작] 임시용 주흔 작입니다. 좋은 하트에는 매지컬/스페셜 주문서를 써주세요.`);
        } else if (otherAtt > currentAtt && scrollCount > 0) {
            comments.push(`[작 실수] 직업에 맞지 않는 주문서가 발린 것 같습니다. (${isMagic ? '공격력' : '마력'} 작)`);
        }

        return comments; // 하트는 여기서 종료
    }

    // 1. 시드링 (Seed Ring)
    const isSeedRing = SPECIAL_RING_KEYWORDS.some(k => itemName.includes(k));
    if (isSeedRing) {
        const level = getSeedRingLevel(item);

        if (itemName.includes("리스트레인트") || itemName.includes("웨폰퍼프") || itemName.includes("컨티뉴어스")) {
            if (level >= 4) comments.push(`[졸업] <b>4레벨</b>(혹은 그 이상) 특수 링입니다. 일반적인 종결 스펙입니다.`);
            else if (level === 3) comments.push(`[현역] <b>3레벨</b> 링은 가성비 좋게 실전에서 사용 가능합니다.`);
            else comments.push(`[체험판] 성능 체감이 어렵습니다. <b>3레벨</b> 이상 구매를 권장합니다.`);
        }
    }

    // 2. 여명 보스 세트 (Dawn Boss Set)
    if (DAWN_BOSS_KEYWORDS.some(k => itemName.includes(k))) {
        comments.push(`[여명 세트] 칠흑으로 넘어가기 전 최고의 가성비 세팅입니다. 2세트/4세트 효과를 챙겨보세요.`);
    }

    // 3. 광부 아이템 (Hunting)
    // 귀고리, 반지, 펜던트, 눈장식, 얼굴장식
    if (slot.includes("귀고리") || slot.includes("반지") || slot.includes("펜던트") || slot.includes("눈장식") || slot.includes("얼굴장식")) {
        const dropLines = potentials.filter(l => l && l.includes("아이템 드롭률")).length;
        const mesoLines = potentials.filter(l => l && l.includes("메소 획득량")).length;

        if (dropLines + mesoLines === 3) {
            // 드/메 3줄 - 초특급 반응!
            if (dropLines === 3) {
                comments.push(`[광부의 신] <b>드롭률 3줄</b>...?! 메이플 역사에 길이 남을 전설의 광부템입니다! 이 아이템은 박물관에 전시해야 합니다!`);
            } else if (mesoLines === 3) {
                comments.push(`[메소 황제] <b>메소 획득량 3줄</b>! 이건 장비가 아니라 금광입니다. 길드원들이 시샘할 엄청난 아이템이에요!`);
            } else {
                comments.push(`[광부 초종결] <b>드/메 3줄 완벽</b>! 전 서버를 통틀어도 보기 힘든 사냥 최종 병기입니다. 절대 팔지 마세요!`);
            }
        } else if (dropLines + mesoLines === 2) {
            comments.push(`[광부 종결] 사냥용 종결 아이템입니다. (드/메 2줄)`);
        } else if (dropLines + mesoLines === 1) {
            // 주스탯과 섞여있으면 하이브리드
            const hasStat = potentials.some(l => l && (l.includes("올스탯") || mainStats.some(stat => l.includes(stat))));
            if (hasStat) {
                comments.push(`[고스펙 광부] 사냥 딜과 보상을 동시에 챙기는 하이브리드 아이템입니다.`);
            } else {
                comments.push(`[광부 입문] 사냥용 기본 아이템입니다.`);
            }
        }
    }

    // 4. 칠흑의 보스 세트 (Pitch Boss)
    // 마도서, 몽벨, 루컨마, 마깃안, 거공, 고근 등
    const isPitch = PITCH_BOSS_KEYWORDS.some(k => itemName.includes(k));
    const isTyrant = itemName.includes("타일런트");

    if (isPitch) {
        comments.push(`[칠흑] 메이플스토리 최상위 '칠흑의 보스 세트' 파츠입니다. 존재만으로도 영롱합니다.`);

        // 칠흑 전용 스타포스 진단
        if (!slot.includes("뱃지") && !slot.includes("포켓") && !slot.includes("엠블렘")) {
            if (starforce >= STARFORCE_TIERS.MAX) comments.push(`[신화의 경지] <b>${starforce}성</b> 칠흑...?! 이건 메이플스토리의 역사를 새로 쓰는 아이템입니다. 전 서버 유일무이한 스펙일 수 있습니다.`);
            else if (starforce === 24) comments.push(`[초월적 스펙] <b>24성</b> 칠흑이라니... 운영자도 놀랄만한 기적의 아이템입니다.`);
            else if (starforce === 23) comments.push(`[전설의 시작] <b>23성</b> 칠흑은 그 자체로 하나의 전설입니다. 압도적인 위용을 자랑합니다.`);
            else if (starforce === STARFORCE_TIERS.ENDGAME) comments.push(`[칠흑 졸업] <b>${STARFORCE_TIERS.ENDGAME}성</b> 칠흑... 서버 내 최상위 포식자입니다.`);
            else if (starforce >= STARFORCE_TIERS.CROSSOVER) comments.push(`[칠흑 고스펙] <b>${STARFORCE_TIERS.CROSSOVER}성</b> 이상 칠흑은 <b>${STARFORCE_TIERS.ENDGAME}성</b> 여명보다 강력합니다.`);
            else if (starforce === STARFORCE_TIERS.STANDARD) comments.push(`[아쉬움] 칠흑의 성능을 100% 끌어내려면 <b>${STARFORCE_TIERS.ENDGAME}성</b>이 권장됩니다. (파괴 리스크 주의)`);
        }
    } else if (isTyrant) {
        // 타일런트 (슈페리얼) 전용 진단
        comments.push(`[슈페리얼] 타일런트 아이템은 별 하나하나의 가치가 매우 높습니다.`);
        if (starforce >= SUPERIOR_STARFORCE.MAX) comments.push(`[종결급] <b>${SUPERIOR_STARFORCE.MAX}성</b> 타일런트! 전설적인 수치입니다. 더 이상 바랄 게 없습니다.`);
        else if (starforce >= 14) comments.push(`[엄청 좋음] <b>14성</b> 타일런트! 매우 강력한 성능을 자랑합니다.`);
        else if (starforce >= 13) comments.push(`[고성능] <b>13성</b> 타일런트! 현역으로 충분히 강력합니다.`);
        else if (starforce >= SUPERIOR_STARFORCE.EXCELLENT) comments.push(`[준종결] <b>${SUPERIOR_STARFORCE.EXCELLENT}성</b> 타일런트! ${STARFORCE_TIERS.ENDGAME}성 일반 아이템과 맞먹는 성능입니다.`);
        else if (starforce >= 10) comments.push(`[고스펙] <b>10성</b> 이상 타일런트는 ${STARFORCE_TIERS.NEAR_ENDGAME}성급 성능을 냅니다.`);
        else if (starforce >= SUPERIOR_STARFORCE.MINIMUM) comments.push(`[가성비] <b>${SUPERIOR_STARFORCE.MINIMUM}성</b> 타일런트는 ${STARFORCE_TIERS.STANDARD}성 일반 아이템과 비슷한 효율을 냅니다.`);
        else comments.push(`[강화 필요] 슈페리얼 아이템은 <b>${SUPERIOR_STARFORCE.MINIMUM}성</b> 이상 강화해야 진가를 발휘합니다.`);
    }

    // 5. 일반 스타포스 진단 (시드링, 뱃지, 훈장, 포켓, 이벤트링, 특수링 제외)
    if (!isSeedRing && !isEventRing && !isSpecialRing && !slot.includes("뱃지") && !slot.includes("훈장") && !slot.includes("포켓") && !slot.includes("엠블렘")) {
        if (!isPitch && !isTyrant) { // 칠흑과 타일런트는 위에서 별도 처리
            // 놀장강(Amazing Enhancement) 정확한 감지
            const isAmazingEnhancement = isAmazingEnhancementItem(item);

            if (isAmazingEnhancement) {
                // 놀장강 효율 계산 (5성=17성급, 10성=20성급, 12성=22성급)
                let gradeLabel = "좋음";

                if (starforce >= 12) {
                    gradeLabel = "종결";
                    comments.push(`[${gradeLabel}] 놀장강 <b>${starforce}성</b> = 일반 <b>22성급 효율</b>! 슈페리얼 장비의 끝판왕입니다. 더 이상 스타포스 강화가 불가능하며, 이미 최고 성능입니다.`);
                } else if (starforce >= 10) {
                    gradeLabel = "우수";
                    comments.push(`[${gradeLabel}] 놀장강 <b>${starforce}성</b> = 일반 <b>20성급 효율</b>! 매우 훌륭합니다. <b>12성</b>(22성급)을 최종 목표로 하세요.`);
                } else {
                    gradeLabel = "좋음";
                    comments.push(`[${gradeLabel}] 놀장강 <b>${starforce}성</b> = 일반 <b>17성급 효율</b>! 우수한 성능입니다. <b>12성</b>(22성급)을 목표로 하세요.`);
                }
            } else {
                // 일반 스타포스
                const maxSf = getMaxStarforce(level);

                if (starforce >= maxSf) {
                    if (maxSf < 15) { // 10성, 5성, 8성 등 낮은 한계
                        comments.push(`[거쳐가는 단계] <b>${starforce}성</b>(최대치)입니다. 유니온/링크 육성용으로 적합하며, 더 높은 스펙을 위해서는 상위 레벨 아이템(예: 트와일라이트 마크, 마이스터링 등)으로 교체를 권장합니다.`);
                    } else if (maxSf < STARFORCE_TIERS.ENDGAME) {
                        comments.push(`[한계 도달] <b>${starforce}성</b>(최대치)입니다. 이 아이템에서 챙길 수 있는 최대 스펙입니다.`);
                    } else {
                        // 25성 한계인 경우 (보통 22성에서 졸업함)
                        if (starforce >= STARFORCE_TIERS.MAX) comments.push(`[신화의 경지] <b>${starforce}성</b>! 이건 메이플스토리의 역사를 새로 쓰는 아이템입니다.`);
                        else if (starforce === 24) comments.push(`[초월적 스펙] <b>24성</b>! 운영자도 놀랄만한 기적의 아이템입니다.`);
                        else if (starforce === 23) comments.push(`[전설의 시작] <b>23성</b>! 압도적인 위용을 자랑합니다.`);
                        else if (starforce === STARFORCE_TIERS.ENDGAME) comments.push(`[졸업] <b>${starforce}성</b>! 더 이상 바랄 게 없는 종결급 수치입니다.`);
                        else comments.push(`[고스펙] <b>${starforce}성</b>! 훌륭합니다. (최대 ${STARFORCE_TIERS.MAX}성 가능)`);
                    }
                } else {
                    if (starforce >= STARFORCE_TIERS.ENDGAME) comments.push(`[졸업] 장신구 <b>${starforce}성</b>! 더 이상 바랄 게 없습니다.`);
                    else if (starforce >= 20) comments.push(`[준종결] <b>${starforce}성</b> 이상으로 훌륭한 스펙입니다.`);
                    else if (starforce >= STARFORCE_TIERS.STANDARD) comments.push(`[국민 세팅] <b>${starforce}성</b> 장신구는 가성비가 좋습니다.`);
                    else if (starforce >= STARFORCE_TIERS.ENTRY) {
                        if (maxSf < STARFORCE_TIERS.STANDARD) {
                            comments.push(`[성장 조언] 현재 <b>${starforce}성</b>입니다. 이 아이템은 최대 <b>${maxSf}성</b>이 한계이므로, 스펙업을 원하시면 상위 장비로 교체해야 합니다.`);
                        } else {
                            // 여명 세트인지 확인
                            const isDawnBoss = DAWN_BOSS_KEYWORDS.some(k => itemName.includes(k));
                            if (isDawnBoss) {
                                comments.push(`[가성비 구간] <b>${starforce}성</b>! 여명 세트로 임시 사용하기 좋은 수치입니다. <b>${STARFORCE_TIERS.STANDARD}성</b>까지 강화하면 칠흑으로 넘어가기 전까지 충분히 사용할 수 있습니다.`);
                            } else {
                                comments.push(`[입문 단계] <b>${starforce}성</b>. 거쳐가는 장비라면 적당하지만, 본캐용이라면 <b>${STARFORCE_TIERS.STANDARD}성</b>을 목표로 하세요.`);
                            }
                        }
                    }
                    else {
                        const targetMin = Math.min(STARFORCE_TIERS.ENTRY, maxSf);
                        const targetMax = Math.min(STARFORCE_TIERS.COST_EFFECTIVE, maxSf);

                        if (targetMin === targetMax) {
                            comments.push(`[강화 필요] 스타포스 수치가 낮습니다. <b>${targetMin}성</b>(최대치)까지 강화를 권장합니다.`);
                        } else {
                            comments.push(`[강화 필요] 스타포스 수치가 낮습니다. 최소 <b>${targetMin}~${targetMax}성</b>은 맞춰주세요.`);
                        }
                    }
                }
            }
        }
    }

    // 6. 잠재능력 진단 (주스탯%)
    const potentialGrade = item.potential_option_grade;

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
            // 렙당 주스탯 (유효 라인 인정)
            if (l.includes("캐릭터 기준 9레벨 당")) {
                const isMainStat = l.includes("올스탯") || mainStats.some(stat => l.includes(stat));
                if (isMainStat) {
                    if (l.includes("+1")) statPct += STAT_CONVERSION.LEVEL_STAT_1_TO_PERCENT; // 렙당 1 = 3%
                    if (l.includes("+2")) statPct += STAT_CONVERSION.LEVEL_STAT_2_TO_PERCENT; // 렙당 2 = 6%
                }
            }
        }
    });

    if (potentialGrade === "레전드리" || potentialGrade === "유니크" || potentialGrade === "에픽") {
        const itemLevel = item.item_base_option?.base_equipment_level || 0;

        // 통합 평가 함수 사용 (제논 자동 처리)
        const gradeLabel = getMainPotentialGrade(statPct, potentialGrade, itemLevel, job);

        // 제논일 경우 주스탯 대신 올스탯 표기
        const isXenon = job && (job.includes('제논') || job.replace(/\s/g, '').includes('제논'));
        const statLabel = isXenon ? '올스탯' : '주스탯';

        if (gradeLabel !== '아쉬움' && gradeLabel !== '부족' && gradeLabel !== '보통' && gradeLabel !== '미흡') {
            comments.push(`[${gradeLabel}] <b>${statLabel} ${statPct}%</b>! ${potentialGrade} 등급에서 훌륭한 수치입니다.`);
        } else if (statPct > 0) {
            comments.push(`[${gradeLabel}] ${potentialGrade} 등급이지만 ${statLabel}이 <b>${statPct}%</b>로 낮습니다.`);
        } else if (potentialGrade === '에픽') {
            // 에픽인데 스탯이 0인 경우 (잡옵) - 기존 로직 유지
            const epicComments = diagnoseEpicPotential(potentialGrade, potentials, job);
            comments.push(...epicComments);
        }
    }

    // 7. 에디셔널 진단
    const adiGrade = item.additional_potential_option_grade;
    const adiLines = [item.additional_potential_option_1, item.additional_potential_option_2, item.additional_potential_option_3].filter((s): s is string => !!s);

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
            // 렙당 주스탯 (유효 라인 인정)
            if (l.includes("레벨 당")) {
                const isMainStat = l.includes("올스탯") || mainStats.some(stat => l.includes(stat));
                if (isMainStat) {
                    if (l.includes("+1")) adiStatPct += STAT_CONVERSION.LEVEL_STAT_1_TO_PERCENT; // 렙당 1 = 3%
                    if (l.includes("+2")) adiStatPct += STAT_CONVERSION.LEVEL_STAT_2_TO_PERCENT; // 렙당 2 = 6%
                }
            }
        }
    })

        ;

    // 직업에 맞는 공/마만 유효로 인정
    const validAdiAtt = isMagic ? adiMagic : adiAtt;

    // 공/마를 주스탯%로 환산하여 합산
    // 공/마 1 = 주스탯 4, 주스탯 10 = 1%
    // 따라서 공/마 15 = 주스탯 60 = 6%
    const attEquiv = (validAdiAtt * STAT_CONVERSION.ATT_TO_STAT) / STAT_CONVERSION.STAT_TO_PERCENT;
    const totalAdiStatPct = adiStatPct + attEquiv;

    if (potentialGrade === "레전드리" && (!adiGrade || adiGrade === "레어")) {
        if (adiStatPct > 0 && validAdiAtt > 0) {
            comments.push(`[가성비 굿] 에디셔널에서 <b>주스탯 ${adiStatPct}%</b>와 <b>${attType} +${validAdiAtt}</b>을 모두 챙기셨네요. 아주 알뜰한 세팅입니다.`);
        } else if (adiStatPct > 0) {
            comments.push(`[가성비 굿] 에디셔널에서 <b>주스탯 ${adiStatPct}%</b>를 챙기셨네요. ${attType} 10만큼이나 훌륭한 가성비 옵션입니다.`);
        } else if (validAdiAtt >= 10) {
            comments.push(`[가성비 굿] 에디셔널에서 ${attType} <b>+${validAdiAtt}</b>을 챙기셨네요. 레어 등급에서는 최선의 선택입니다. 아주 알뜰하시군요!`);
        } else {
            comments.push(`[속 빈 강정] 윗잠은 레전드리지만 에디셔널이 부실합니다. 에디 ${attType}이나 주스탯 %를 챙겨주세요.`);
        }
    } else if (adiGrade === "유니크") {
        // 유니크 에디셔널 평가 추가
        if (totalAdiStatPct > 0 && validAdiAtt > 0) {
            comments.push(`[에디 유니크] 에디셔널 <b>주스탯 ${Math.round(totalAdiStatPct)}%</b>급 효율! 유효 옵션을 꽉 채운 훌륭한 아이템입니다.`);
        } else if (totalAdiStatPct > 0) {
            comments.push(`[에디 유니크] 에디셔널 <b>주스탯 ${Math.round(totalAdiStatPct)}%</b>급 효율! 유니크 등급에서 훌륭한 옵션입니다.`);
        } else if (validAdiAtt >= 10) {
            comments.push(`[에디 유니크] 에디셔널 ${attType} <b>+${validAdiAtt}</b>! 든든한 옵션입니다.`);
        }
    } else if (adiGrade === "레전드리") {
        if (totalAdiStatPct >= ADDITIONAL_POTENTIAL_STAT.LEGENDARY.EXCELLENT) {
            comments.push(`[에디 종결] 에디셔널 <b>주스탯 ${Math.round(totalAdiStatPct)}%</b>! 전 서버급 초고스펙 옵션입니다.`);
        } else if (totalAdiStatPct >= ADDITIONAL_POTENTIAL_STAT.LEGENDARY.GREAT) {
            comments.push(`[에디 준종결] 에디셔널 <b>주스탯 ${Math.round(totalAdiStatPct)}%</b>! 아주 훌륭한 준종결급 스펙입니다.`);
        } else if (validAdiAtt >= 12 && adiStatPct === 0) {
            // 공/마만 있고 주스탯%가 없는 경우
            comments.push(`[에디 레전드리] 에디셔널 ${attType} <b>+${validAdiAtt}</b>! 든든한 옵션입니다.`);
        } else if (totalAdiStatPct >= ADDITIONAL_POTENTIAL_STAT.LEGENDARY.DECENT) {
            comments.push(`[에디 레전드리] 에디셔널 <b>주스탯 ${Math.round(totalAdiStatPct)}%</b>급 효율! 준수한 옵션입니다.`);
        } else {
            comments.push(`[옵션 아쉬움] 에디셔널 레전드리 등급이지만 유효 옵션이 조금 아쉽습니다.`);
        }
    } else if (adiGrade === "에픽") {
        if (totalAdiStatPct > 0 && validAdiAtt > 0) comments.push(`[에디 에픽] <b>주스탯 ${Math.round(totalAdiStatPct)}%</b>급 효율! 에픽에서 챙길 수 있는 건 다 챙기셨네요.`);
        else if (totalAdiStatPct > 0) comments.push(`[에디 에픽] 에디셔널 <b>주스탯 ${Math.round(totalAdiStatPct)}%</b>급 효율! 아주 든든한 옵션입니다.`);
        else if (validAdiAtt >= 10) comments.push(`[에디 에픽] 에디셔널 ${attType}를 잘 챙기셨습니다. 든든합니다.`);
    } else if (adiGrade === "레어") {
        // 잠재 등급과 무관하게 에디 레어 평가
        if (validAdiAtt >= 10) {
            comments.push(`[에디 레어] 에디셔널 ${attType} <b>+${validAdiAtt}</b>! 레어치고는 괜찮습니다. 에픽 이상으로 등급업하시면 더 좋습니다.`);
        } else if (validAdiAtt >= 6 || adiStatPct > 0) {
            comments.push(`[에디 레어] 에디셔널을 어느 정도 챙기셨네요. 에픽 이상으로 등급업이 권장됩니다.`);
        } else {
            comments.push(`[에디 부족] 에디셔널이 레어 등급입니다. 에픽 이상으로 등급업이 필요합니다.`);
        }
    }

    // 8. 추옵 진단
    if (!slot.includes("반지") && !slot.includes("견장") && !slot.includes("뱃지") && !slot.includes("훈장") && !slot.includes("엠블렘")) {
        const score = calculateFlameScore(item, job);

        const level = item.item_base_option?.base_equipment_level || 0;

        if (level >= 250) {
            if (score >= 190) comments.push(`[종결] <b>${score}급</b> (${level}제)! 전 서버급 신화적인 추옵입니다.`);
            else if (score >= ARMOR_FLAME_SCORE.LEVEL_250.EXCELLENT) comments.push(`[종결급] <b>${score}급</b> (${level}제)! 더 이상 바랄 게 없는 완벽한 추옵입니다.`);
            else if (score >= ARMOR_FLAME_SCORE.LEVEL_250.DECENT) comments.push(`[최상급 옵션] <b>${score}급</b> (${level}제)! 최상위권 유저들도 부러워할 수치입니다.`);
            else if (score >= 160) comments.push(`[많이 좋음] <b>${score}급</b> (${level}제)! 아주 훌륭한 고스펙용 추옵입니다.`);
            else if (score >= 150) comments.push(`[꽤 좋음] <b>${score}급</b> (${level}제)! 어디 가서 꿀리지 않는 좋은 추옵입니다.`);
            else if (score >= 140) comments.push(`[좋음] <b>${score}급</b> (${level}제)! 실전에서 사용하기 좋습니다.`);
            else if (score >= 130) comments.push(`[준수] <b>${score}급</b> (${level}제)! 무난하게 사용 가능합니다.`);
            else if (score >= 120) comments.push(`[보통] <b>${score}급</b> (${level}제)! 임시로 쓰기 적절합니다.`);
            else if (score >= 110) comments.push(`[아쉬움] <b>${score}급</b> (${level}제)! 조금 더 높은 추옵을 노려보세요.`);
            else if (score >= 100) comments.push(`[부캐용] <b>${score}급</b> (${level}제)! 본캐용으로는 아쉽습니다.`);
            else comments.push(`[환불 필요] <b>${score}급</b> (${level}제) 미만입니다. 환생의 불꽃 작업이 필요합니다.`);
        } else if (level >= 200) {
            if (score >= ARMOR_FLAME_SCORE.LEVEL_200.EXCELLENT) comments.push(`[종결급] <b>${score}급</b> (${level}제)! 더 이상 바랄 게 없는 완벽한 추옵입니다.`);
            else if (score >= 160) comments.push(`[최상급 옵션] <b>${score}급</b> (${level}제)! 최상위권 유저들도 부러워할 수치입니다.`);
            else if (score >= ARMOR_FLAME_SCORE.LEVEL_200.GREAT) comments.push(`[많이 좋음] <b>${score}급</b> (${level}제)! 아주 훌륭한 고스펙용 추옵입니다.`);
            else if (score >= ARMOR_FLAME_SCORE.LEVEL_200.DECENT) comments.push(`[꽤 좋음] <b>${score}급</b> (${level}제)! 어디 가서 꿀리지 않는 좋은 추옵입니다.`);
            else if (score >= 130) comments.push(`[좋음] <b>${score}급</b> (${level}제)! 실전에서 사용하기 좋습니다.`);
            else if (score >= ARMOR_FLAME_SCORE.LEVEL_200.NORMAL) comments.push(`[준수] <b>${score}급</b> (${level}제)! 무난하게 사용 가능합니다.`);
            else if (score >= 110) comments.push(`[보통] <b>${score}급</b> (${level}제)! 임시로 쓰기 적절합니다.`);
            else if (score >= 100) comments.push(`[부캐용] <b>${score}급</b> (${level}제)! 본캐용으로는 아쉽습니다.`);
            else comments.push(`[환불 필요] <b>${score}급</b> (${level}제) 미만입니다. 환생의 불꽃 작업이 필요합니다.`);
        } else if (level >= 160) {
            if (score >= 150) comments.push(`[종결급] <b>${score}급</b> (${level}제)! 더 이상 바랄 게 없는 완벽한 추옵입니다.`);
            else if (score >= ARMOR_FLAME_SCORE.LEVEL_160.EXCELLENT) comments.push(`[최상급 좋음] <b>${score}급</b> (${level}제)! 최상위권 유저들도 부러워할 수치입니다.`);
            else if (score >= 130) comments.push(`[많이 좋음] <b>${score}급</b> (${level}제)! 아주 훌륭한 고스펙용 추옵입니다.`);
            else if (score >= ARMOR_FLAME_SCORE.LEVEL_160.DECENT) comments.push(`[좋음] <b>${score}급</b> (${level}제)! 실전에서 사용하기 좋습니다.`);
            else if (score >= 110) comments.push(`[준수] <b>${score}급</b> (${level}제)! 무난하게 사용 가능합니다.`);
            else if (score >= 100) comments.push(`[보통] <b>${score}급</b> (${level}제)! 임시로 쓰기 적절합니다.`);
            else comments.push(`[환불 필요] <b>${score}급</b> (${level}제) 미만입니다. 환생의 불꽃 작업이 필요합니다.`);
        } else {
            // 140~150 and below
            if (score >= 150) comments.push(`[종결급] <b>${score}급</b> (${level}제)! 더 이상 바랄 게 없는 완벽한 추옵입니다.`);
            else if (score >= ARMOR_FLAME_SCORE.LEVEL_140.EXCELLENT) comments.push(`[최상급 좋음] <b>${score}급</b> (${level}제)! 최상위권 유저들도 부러워할 수치입니다.`);
            else if (score >= 130) comments.push(`[많이 좋음] <b>${score}급</b> (${level}제)! 아주 훌륭한 고스펙용 추옵입니다.`);
            else if (score >= ARMOR_FLAME_SCORE.LEVEL_140.GREAT) comments.push(`[좋음] <b>${score}급</b> (${level}제)! 실전에서 사용하기 좋습니다.`);
            else if (score >= 110) comments.push(`[준수] <b>${score}급</b> (${level}제)! 무난하게 사용 가능합니다.`);
            else if (score >= ARMOR_FLAME_SCORE.LEVEL_140.DECENT) comments.push(`[보통] <b>${score}급</b> (${level}제)! 임시로 쓰기 적절합니다.`);
            else if (level >= 140) comments.push(`[환불 필요] <b>${score}급</b> (${level}제) 미만입니다. 환생의 불꽃 작업이 필요합니다.`);
        }
    }

    return comments;
}
