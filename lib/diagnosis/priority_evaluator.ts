import { EquipmentItem } from './types';
import { getStarforce, calculateFlameScore } from './utils';
import { JOB_RECOMMENDATIONS } from '../job_recommendations';
import { isAmazingEnhancementItem } from '../amazing_enhancement_table';

export interface PriorityItem {
    item: EquipmentItem;
    priorityScore: number;
    type: 'STARFORCE' | 'POTENTIAL' | 'ADDITIONAL' | 'FLAME' | 'SCROLL';
    currentStatus: string;
    targetStatus: string;
    costEstimate: string;
    efficiencyLabel: string;
    rank: 1 | 2 | 3; // 1: Must Do, 2: Recommended, 3: End Game
}

/**
 * 유효 옵션 줄 수를 계산하는 헬퍼 함수
 */
function countValidLines(lines: string[], type: 'WSE' | 'ARMOR' | 'GLOVE' | 'HAT', job?: string): { count: number, hasIED: number, hasCool: number, hasCritDmg: number } {
    let count = 0;
    let hasIED = 0;
    let hasCool = 0;
    let hasCritDmg = 0;
    const normalizedJob = job ? job.replace(/\s/g, "") : "";

    lines.forEach(line => {
        if (!line) return;

        // WSE: 공/마, 보공, 방무
        if (type === 'WSE') {
            if (line.includes('공격력') || line.includes('마력') || line.includes('보스 몬스터')) {
                count++;
            } else if (line.includes('몬스터 방어율 무시')) {
                count++;
                hasIED++;
            }
            // 데벤져는 HP가 WSE 유효옵일 수 있음 (엠블렘 등)
            if (normalizedJob === '데몬어벤져' && line.includes('최대 HP')) {
                count++;
            }
        }
        // 장갑: 크뎀, 주스탯
        else if (type === 'GLOVE') {
            if (line.includes('크리티컬 데미지')) {
                count++;
                hasCritDmg++;
            } else if (line.includes('올스탯') || line.includes('모든 스탯') || (job && line.includes('STR')) || (job && line.includes('DEX')) || (job && line.includes('INT')) || (job && line.includes('LUK'))) {
                // 주스탯 로직은 간단하게 처리 (직업 정보 없으면 올스탯만)
                count++;
            }
            // 데벤져 HP
            if (normalizedJob === '데몬어벤져' && line.includes('최대 HP')) {
                count++;
            }
        }
        // 모자: 쿨감, 주스탯
        else if (type === 'HAT') {
            if (line.includes('재사용 대기시간')) {
                count++;
                hasCool++;
            } else if (line.includes('올스탯') || line.includes('모든 스탯') || (job && line.includes('STR')) || (job && line.includes('DEX')) || (job && line.includes('INT')) || (job && line.includes('LUK'))) {
                count++;
            }
            // 데벤져 HP
            if (normalizedJob === '데몬어벤져' && line.includes('최대 HP')) {
                count++;
            }
        }
        // 방어구/장신구: 주스탯
        else {
            if (normalizedJob === '데몬어벤져') {
                // 데몬어벤져는 HP가 주스탯
                // 정규식 완화: "최대 HP" 뒤에 숫자%가 오면 잡음
                if (line.match(/최대 HP.*?(\d+)%/)) {
                    count++;
                }
            } else if (normalizedJob === '제논') {
                // 제논: 올스탯, STR, DEX, LUK 모두 유효
                if (line.includes('올스탯') || line.includes('모든 스탯') || line.includes('STR') || line.includes('DEX') || line.includes('LUK')) {
                    count++;
                }
            } else {
                // 일반 직업
                if (line.includes('올스탯') || line.includes('모든 스탯') || (job && line.includes('STR')) || (job && line.includes('DEX')) || (job && line.includes('INT')) || (job && line.includes('LUK'))) {
                    count++;
                }
            }
        }
    });

    return { count, hasIED, hasCool, hasCritDmg };
}

export function evaluateUpgradePriority(items: EquipmentItem[], job?: string): PriorityItem[] {
    const priorities: PriorityItem[] = [];
    const normalizedJob = job ? job.replace(/\s/g, "") : "";

    items.forEach(item => {
        if (!item.item_name) return;

        const slot = item.item_equipment_slot;
        const name = item.item_name;

        // === 펜살리르/우트가르드 장비 교체 권장 ===
        const isPensalir = name.includes('펜살리르') || name.includes('우트가르드');
        if (isPensalir) {
            let targetEquipment = '';
            if (slot.includes('무기')) {
                targetEquipment = '아케인셰이드 무기';
            } else if (slot.includes('모자') || slot.includes('한벌옷')) {
                targetEquipment = '루타비스(카루타) 세트';
            } else {
                targetEquipment = '앱솔/아케인 장비';
            }

            priorities.push({
                item,
                priorityScore: 1000, // 최고 우선순위
                type: 'STARFORCE',
                currentStatus: '펜살리르 (성능 부족)',
                targetStatus: `${targetEquipment}로 교체`,
                costEstimate: '장비 교체 필수',
                efficiencyLabel: '🚨 장비 교체 필수',
                rank: 1 // Must Do
            });
            return; // 다른 평가 skip
        }

        // === 특수 아이템 필터링 ===
        if (name.includes('정령의 펜던트')) return;

        const potentialLines = [item.potential_option_1, item.potential_option_2, item.potential_option_3].filter((s): s is string => !!s);
        const adiLines = [item.additional_potential_option_1, item.additional_potential_option_2, item.additional_potential_option_3].filter((s): s is string => !!s);

        const isFarmingItem = potentialLines.some(l => l.includes('아이템 드롭률') || l.includes('메소 획득량'));
        if (isFarmingItem) return;

        const isSeedRing = name.includes('리스트레인트') || name.includes('웨폰퍼프') || name.includes('컨티뉴어스') || name.includes('리스크테이커') || name.includes('링 오브 썸') || name.includes('크라이시스');
        const isEventRing = name.includes('이벤트') || name.includes('테네브리스') || name.includes('어웨이크') || name.includes('글로리온') || name.includes('이터널 플레임') || name.includes('결속') || name.includes('시너지') || name.includes('코스모스') || name.includes('벤젼스') || name.includes('카오스') || name.includes('오닉스') || name.includes('딥다크') || name.includes('SS급');

        const isStarforceImmune =
            slot.includes('엠블렘') ||
            slot.includes('뱃지') ||
            slot.includes('훈장') ||
            slot.includes('포켓') ||
            (slot.includes('보조무기') && !slot.includes('방패')) ||
            (slot.includes('반지') && (isEventRing || isSeedRing)) ||
            name.includes('칠요의 뱃지');

        const isFlameImmune =
            slot.includes('엠블렘') ||
            slot.includes('보조무기') ||
            slot.includes('뱃지') ||
            slot.includes('훈장') ||
            slot.includes('반지') ||
            slot.includes('기계 심장') ||
            slot.includes('어깨장식');

        const isDeepDark = name.includes('딥다크');
        const isPotentialImmune =
            isSeedRing ||
            isDeepDark ||
            slot.includes('훈장') ||
            slot.includes('뱃지') ||
            slot.includes('포켓') ||
            name.includes('칠요의 뱃지');

        const starforce = getStarforce(item);
        const isWeapon = slot.includes('무기') && !slot.includes('보조');
        const isEmblem = slot.includes('엠블렘');
        const isSubWeapon = slot.includes('보조무기');
        const isWSE = isWeapon || isEmblem || isSubWeapon;
        const isGlove = slot.includes('장갑');
        const isHat = slot.includes('모자');

        // === 1. 스타포스 평가 ===
        // 놀장강 아이템은 더 이상 구할 수 없으므로 스타포스 평가 스킵
        const isAmazingEnhancement = isAmazingEnhancementItem(item);

        if (!isStarforceImmune && !isAmazingEnhancement) {
            if (slot.includes('기계 심장')) {
                if (name.includes('페어리') || name.includes('티타늄')) {
                    if (starforce < 8) {
                        priorities.push({
                            item, priorityScore: 95 - starforce, type: 'STARFORCE',
                            currentStatus: `${starforce}성`, targetStatus: '8성 (최대치)',
                            costEstimate: '저렴', efficiencyLabel: '필수 강화', rank: 1
                        });
                    }
                } else if (name.includes('리튬') || name.includes('골드') || name.includes('크리스탈') || name.includes('아이언')) {
                    priorities.push({
                        item, priorityScore: 90, type: 'STARFORCE',
                        currentStatus: name, targetStatus: '페어리/티타늄 하트',
                        costEstimate: '보통', efficiencyLabel: '장비 교체 시급', rank: 1
                    });
                } else if (name.includes('플라즈마')) {
                    if (starforce < 17) {
                        priorities.push({
                            item, priorityScore: 80 - starforce, type: 'STARFORCE',
                            currentStatus: `${starforce}성`, targetStatus: '17성',
                            costEstimate: '보통', efficiencyLabel: '스펙업 필수', rank: 2
                        });
                    } else if (starforce < 20) {
                        priorities.push({
                            item, priorityScore: 50 + (starforce - 17), type: 'STARFORCE',
                            currentStatus: `${starforce}성`, targetStatus: '20성 (최대치)',
                            costEstimate: '높음', efficiencyLabel: '엔드급 도전', rank: 3
                        });
                    }
                }
            } else {
                if (starforce < 10) {
                    priorities.push({
                        item, priorityScore: 100 - starforce, type: 'STARFORCE',
                        currentStatus: `${starforce}성`, targetStatus: '10성',
                        costEstimate: '매우 저렴', efficiencyLabel: '가성비 최강', rank: 1
                    });
                } else if (starforce < 12) {
                    priorities.push({
                        item, priorityScore: 90 - starforce, type: 'STARFORCE',
                        currentStatus: `${starforce}성`, targetStatus: '12성',
                        costEstimate: '저렴', efficiencyLabel: '기본 매너', rank: 1
                    });
                } else if (starforce < 17) {
                    if (!name.includes('타일런트')) {
                        priorities.push({
                            item, priorityScore: 80 - starforce, type: 'STARFORCE',
                            currentStatus: `${starforce}성`, targetStatus: '17성',
                            costEstimate: '보통', efficiencyLabel: '스펙업 필수', rank: 2
                        });
                    }
                } else if (starforce < 18) {
                    if (!name.includes('타일런트')) {
                        priorities.push({
                            item, priorityScore: 60, type: 'STARFORCE',
                            currentStatus: `${starforce}성`, targetStatus: '18성',
                            costEstimate: '다소 높음', efficiencyLabel: '안전한 스펙업', rank: 2
                        });
                    }
                } else if (starforce < 22) {
                    if (!name.includes('타일런트') && !name.includes('탈벨')) {
                        priorities.push({
                            item, priorityScore: 40 + (starforce - 18), type: 'STARFORCE',
                            currentStatus: `${starforce}성`, targetStatus: '22성',
                            costEstimate: '매우 높음', efficiencyLabel: '엔드급 도전', rank: 3
                        });
                    }
                }
            }
        }

        // === 2. 잠재능력 (윗잠) 평가 ===
        if (!isPotentialImmune) {
            const grade = item.potential_option_grade;

            // 2-1. WSE (무보엠)
            if (isWSE) {
                if (!grade || grade === '레어') {
                    priorities.push({
                        item, priorityScore: 95, type: 'POTENTIAL',
                        currentStatus: grade || '없음', targetStatus: '에픽 (공/마 6%)',
                        costEstimate: '저렴', efficiencyLabel: '기본 공격력 확보', rank: 1
                    });
                } else if (grade === '에픽') {
                    priorities.push({
                        item, priorityScore: 85, type: 'POTENTIAL',
                        currentStatus: '에픽', targetStatus: '유니크 (공/마 9%↑)',
                        costEstimate: '보통', efficiencyLabel: '스펙업 필수', rank: 1
                    });
                } else if (grade === '유니크') {
                    const { count } = countValidLines(potentialLines, 'WSE', normalizedJob);
                    if (count < 2) {
                        priorities.push({
                            item, priorityScore: 80, type: 'POTENTIAL',
                            currentStatus: '유니크 (유효옵 부족)', targetStatus: '유효 2줄',
                            costEstimate: '보통', efficiencyLabel: '옵션 재설정 필요', rank: 1
                        });
                    } else {
                        priorities.push({
                            item, priorityScore: 70, type: 'POTENTIAL',
                            currentStatus: '유니크', targetStatus: '레전드리',
                            costEstimate: '높음', efficiencyLabel: '졸업급 스펙업', rank: 2
                        });
                    }
                } else if (grade === '레전드리') {
                    const { count, hasIED } = countValidLines(potentialLines, 'WSE', normalizedJob);

                    // 방무 과다 체크 (2줄 이상이면 1줄로 줄이기 권장)
                    if (hasIED >= 2) {
                        priorities.push({
                            item, priorityScore: 65, type: 'POTENTIAL',
                            currentStatus: '방무 과다 (2줄↑)', targetStatus: '방무 1줄 이하 + 공/보공',
                            costEstimate: '높음', efficiencyLabel: '옵션 최적화', rank: 2
                        });
                    } else if (count < 3) {
                        const targetMsg = isEmblem ? '유효 3줄 (공공공 등)' : '유효 3줄 (보보공 등)';
                        priorities.push({
                            item, priorityScore: 60, type: 'POTENTIAL',
                            currentStatus: `유효 ${count}줄`, targetStatus: targetMsg,
                            costEstimate: '매우 높음', efficiencyLabel: '엔드급 도전', rank: 3
                        });
                    }
                }
            }
            // 2-2. 장갑 (크뎀)
            else if (isGlove) {
                if (!grade || grade === '레어') {
                    priorities.push({
                        item, priorityScore: 88, type: 'POTENTIAL',
                        currentStatus: grade || '없음', targetStatus: '에픽 (주스탯 9%)',
                        costEstimate: '저렴', efficiencyLabel: '기본 스탯 확보', rank: 1
                    });
                } else if (grade !== '레전드리') {
                    priorities.push({
                        item, priorityScore: 75, type: 'POTENTIAL',
                        currentStatus: grade, targetStatus: '레전드리 (크뎀)',
                        costEstimate: '높음', efficiencyLabel: '크뎀 확보 필수', rank: 2
                    });
                } else { // 레전드리
                    const { hasCritDmg, count } = countValidLines(potentialLines, 'GLOVE', normalizedJob); // count는 크뎀+주스탯 포함

                    if (hasCritDmg < 1) {
                        priorities.push({
                            item, priorityScore: 80, type: 'POTENTIAL',
                            currentStatus: '레전드리 (잡옵)', targetStatus: '크리티컬 데미지 1줄',
                            costEstimate: '보통', efficiencyLabel: '옵션 재설정 시급', rank: 1
                        });
                    } else if (hasCritDmg === 1) {
                        // 크뎀 1줄인데 주스탯이 없는 경우 (count는 크뎀 포함이므로 1이면 크뎀만 있는 것)
                        // countValidLines에서 GLOVE 타입은 크뎀과 주스탯을 모두 count함
                        if (count < 2) {
                            priorities.push({
                                item, priorityScore: 60, type: 'POTENTIAL',
                                currentStatus: '크뎀 1줄', targetStatus: '크뎀 1줄 + 주스탯',
                                costEstimate: '높음', efficiencyLabel: '추가 스펙업', rank: 2
                            });
                        } else {
                            // 크뎀 1줄 + 주스탯 있음 -> 쌍크뎀 도전
                            priorities.push({
                                item, priorityScore: 45, type: 'POTENTIAL',
                                currentStatus: '크뎀 1줄 + 주스탯', targetStatus: '쌍크뎀 (크뎀 2줄)',
                                costEstimate: '매우 높음', efficiencyLabel: '엔드급 도전', rank: 3
                            });
                        }
                    } else if (hasCritDmg < 2) {
                        // 이 경우는 위에서 처리됨 (hasCritDmg === 1)
                    }
                }
            }
            // 2-3. 모자 (쿨감)
            else if (isHat) {
                const recommendation = Object.entries(JOB_RECOMMENDATIONS).find(([k, v]) => k.replace(/\s/g, "") === normalizedJob)?.[1];
                const needsCool = recommendation && recommendation.hat.startsWith('cool_');

                if (needsCool) {
                    if (grade !== '레전드리') {
                        priorities.push({
                            item, priorityScore: 75, type: 'POTENTIAL',
                            currentStatus: grade || '없음', targetStatus: '레전드리 (쿨감)',
                            costEstimate: '높음', efficiencyLabel: '쿨타임 감소 필수', rank: 2
                        });
                    } else {
                        const { hasCool } = countValidLines(potentialLines, 'HAT', normalizedJob);
                        if (hasCool < 1) {
                            priorities.push({
                                item, priorityScore: 80, type: 'POTENTIAL',
                                currentStatus: '레전드리 (잡옵)', targetStatus: '쿨타임 감소',
                                costEstimate: '보통', efficiencyLabel: '옵션 재설정 시급', rank: 1
                            });
                        } else {
                            // 쿨감 수치 확인 (2초 이상 권장 등) - 여기선 단순 줄 수나 존재 여부만 체크
                            // 더 깊은 로직은 나중에 추가 가능
                        }
                    }
                } else {
                    // 쿨감 필요 없는 직업은 일반 방어구 로직
                    if (!grade || grade === '레어') {
                        priorities.push({
                            item, priorityScore: 88, type: 'POTENTIAL',
                            currentStatus: grade || '없음', targetStatus: '에픽 (주스탯 9%)',
                            costEstimate: '저렴', efficiencyLabel: '기본 스탯 확보', rank: 1
                        });
                    } else if (grade === '에픽') {
                        priorities.push({
                            item, priorityScore: 60, type: 'POTENTIAL',
                            currentStatus: '에픽', targetStatus: '유니크 (15%↑)',
                            costEstimate: '보통', efficiencyLabel: '스펙업 권장', rank: 2
                        });
                    } else if (grade === '유니크') {
                        priorities.push({
                            item, priorityScore: 50, type: 'POTENTIAL',
                            currentStatus: '유니크', targetStatus: '레전드리 (21%↑)',
                            costEstimate: '높음', efficiencyLabel: '고스펙 도전', rank: 3
                        });
                    }
                }
            }
            // 2-4. 일반 방어구/장신구
            else {
                if (!grade || grade === '레어') {
                    priorities.push({
                        item, priorityScore: 88, type: 'POTENTIAL',
                        currentStatus: grade || '없음', targetStatus: '에픽 (주스탯 9%)',
                        costEstimate: '저렴', efficiencyLabel: '기본 스탯 확보', rank: 1
                    });
                } else if (grade === '에픽') {
                    priorities.push({
                        item, priorityScore: 60, type: 'POTENTIAL',
                        currentStatus: '에픽', targetStatus: '유니크 (15%↑)',
                        costEstimate: '보통', efficiencyLabel: '스펙업 권장', rank: 2
                    });
                } else if (grade === '유니크') {
                    priorities.push({
                        item, priorityScore: 50, type: 'POTENTIAL',
                        currentStatus: '유니크', targetStatus: '레전드리 (21%↑)',
                        costEstimate: '높음', efficiencyLabel: '고스펙 도전', rank: 3
                    });
                } else if (grade === '레전드리') {
                    // 유효옵 3줄 도전
                    // 주스탯 % 합계 계산 로직이 필요하지만, 여기선 단순 줄 수로 근사
                    const { count } = countValidLines(potentialLines, 'ARMOR', normalizedJob); // ARMOR 타입으로 주스탯 카운트
                    if (count < 3) {
                        priorities.push({
                            item, priorityScore: 45, type: 'POTENTIAL',
                            currentStatus: `유효 ${count}줄`, targetStatus: '유효 3줄 (27%↑)',
                            costEstimate: '매우 높음', efficiencyLabel: '극 종결 스펙', rank: 3
                        });
                    }
                }
            }
        }

        // === 3. 에디셔널 잠재능력 평가 ===
        if (!isPotentialImmune) {
            const grade = item.additional_potential_option_grade;

            // 3-1. WSE (무보엠)
            if (isWSE) {
                const hasAttAdi = adiLines.some(l => l.includes('공격력') || l.includes('마력'));

                if (!grade || (grade === '레어' && !hasAttAdi)) {
                    priorities.push({
                        item, priorityScore: 92, type: 'ADDITIONAL',
                        currentStatus: '공/마 없음', targetStatus: '레어 (공/마 +10)',
                        costEstimate: '매우 저렴', efficiencyLabel: '가성비 최강', rank: 1
                    });
                } else if (grade === '레어') {
                    priorities.push({
                        item, priorityScore: 75, type: 'ADDITIONAL',
                        currentStatus: '레어', targetStatus: '에픽 (공/마 6%)',
                        costEstimate: '보통', efficiencyLabel: '스펙업 필수', rank: 2
                    });
                } else if (grade === '에픽') {
                    priorities.push({
                        item, priorityScore: 65, type: 'ADDITIONAL',
                        currentStatus: '에픽', targetStatus: '유니크 (공/마 9%↑)',
                        costEstimate: '높음', efficiencyLabel: '고스펙 도전', rank: 3
                    });
                } else if (grade === '유니크') {
                    priorities.push({
                        item, priorityScore: 55, type: 'ADDITIONAL',
                        currentStatus: '유니크', targetStatus: '레전드리 (공/마 12%↑)',
                        costEstimate: '매우 높음', efficiencyLabel: '초고스펙 도전', rank: 3
                    });
                } else if (grade === '레전드리') {
                    // 유효 2줄 이상
                    const { count } = countValidLines(adiLines, 'WSE', normalizedJob);
                    if (count < 2) {
                        priorities.push({
                            item, priorityScore: 50, type: 'ADDITIONAL',
                            currentStatus: `유효 ${count}줄`, targetStatus: '유효 2줄 (21%↑)',
                            costEstimate: '매우 높음', efficiencyLabel: '엔드급 도전', rank: 3
                        });
                    }
                }
            }
            // 3-2. 방어구/장신구
            else if (!slot.includes('훈장') && !slot.includes('뱃지') && !slot.includes('포켓')) {
                const hasAttAdi = adiLines.some(l => l.includes('공격력') || l.includes('마력'));

                if (!grade || (grade === '레어' && !hasAttAdi)) {
                    priorities.push({
                        item, priorityScore: 65, type: 'ADDITIONAL',
                        currentStatus: '공/마 없음', targetStatus: '공/마 +10',
                        costEstimate: '저렴', efficiencyLabel: '소소한 스펙업', rank: 2
                    });
                } else if (grade === '레어') {
                    priorities.push({
                        item, priorityScore: 40, type: 'ADDITIONAL',
                        currentStatus: '레어', targetStatus: '에픽 (주스탯 4% / 공마)',
                        costEstimate: '보통', efficiencyLabel: '추가 스펙업', rank: 3
                    });
                } else if (grade === '에픽') {
                    // 에픽 2줄 (공10/공3 등) 또는 유니크 도전
                    priorities.push({
                        item, priorityScore: 30, type: 'ADDITIONAL',
                        currentStatus: '에픽', targetStatus: '유니크 (주스탯/공마)',
                        costEstimate: '높음', efficiencyLabel: '고스펙 도전', rank: 3
                    });
                }
            }
        }

        // === 4. 추가옵션 (환불) 평가 ===
        if (!isFlameImmune) {
            const isBossGear =
                name.includes('앱솔') || name.includes('아케인') || name.includes('카루타') || name.includes('파프니르') ||
                name.includes('에테르넬') || name.includes('트와일라이트') || name.includes('데이브레이크') || name.includes('에스텔라') ||
                name.includes('거대한 공포') || name.includes('고통의 근원') || name.includes('창세의 뱃지') ||
                name.includes('마력이 깃든 안대') || name.includes('몽환의 벨트') || name.includes('루즈 컨트롤') ||
                name.includes('블랙 하트');

            if (isBossGear && !name.includes('블랙 하트')) {
                const flameScore = calculateFlameScore(item, job);

                if (flameScore < 60 && !isWeapon) {
                    priorities.push({
                        item, priorityScore: 82, type: 'FLAME',
                        currentStatus: `${flameScore}급`, targetStatus: '80급 이상',
                        costEstimate: '저렴', efficiencyLabel: '추옵 재설정 시급', rank: 1
                    });
                } else if (flameScore < 80 && !isWeapon) {
                    priorities.push({
                        item, priorityScore: 60, type: 'FLAME',
                        currentStatus: `${flameScore}급`, targetStatus: '100급 도전',
                        costEstimate: '보통', efficiencyLabel: '추가 스탯 확보', rank: 2
                    });
                } else if (flameScore < 100 && !isWeapon) {
                    priorities.push({
                        item, priorityScore: 40, type: 'FLAME',
                        currentStatus: `${flameScore}급`, targetStatus: '극추옵 도전',
                        costEstimate: '높음', efficiencyLabel: '엔드급 도전', rank: 3
                    });
                }
            }
        }

    });

    return priorities.sort((a, b) => b.priorityScore - a.priorityScore);
}
