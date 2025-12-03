import { isMagicJob, getJobMainStat } from '../job_utils';
import { isAmazingEnhancementItem } from '../amazing_enhancement_table';

export interface TotalCheckupResult {
    starforce: {
        average: number;
        count22: number;
        count17: number;
        totalSlots: number;
        targetSlots: number; // 17부위
    };
    wse: { // Weapon, Secondary, Emblem
        potential: {
            gradeCount: Record<string, number>;
            validLines: number; // 보공, 방무, 공/마%
            totalLines: number;
        };
        additional: {
            gradeCount: Record<string, number>;
            validLines: number; // 공/마%
            totalLines: number;
        };
        iedLines: number; // 방무 줄 수 합계
    };
    armorAcc: { // Armor, Accessory, Heart
        potential: {
            gradeCount: Record<string, number>;
            validLines: number; // 주스탯, 올스탯, 크뎀, 쿨감
            totalLines: number;
            hatCooltime: number; // 초
            gloveCritDmg: number; // 줄
        };
        additional: {
            gradeCount: Record<string, number>;
            validLines: number; // 공마상수, 주스탯%
            totalLines: number;
        };
    };
    setEffect: {
        activeSets: string[];
        luckyItemApplied: boolean;
        brokenSets: string[]; // 깨진 세트 (예: 3카 4앱 등 애매한 상태)
        setDetails: Record<string, string[]>; // 세트별 포함된 아이템 목록
    };
}

export function diagnoseTotalCheckup(items: any[], job: string): TotalCheckupResult {
    const result: TotalCheckupResult = {
        starforce: { average: 0, count22: 0, count17: 0, totalSlots: 0, targetSlots: 17 },
        wse: {
            potential: { gradeCount: {}, validLines: 0, totalLines: 9 },
            additional: { gradeCount: {}, validLines: 0, totalLines: 9 },
            iedLines: 0
        },
        armorAcc: {
            potential: { gradeCount: {}, validLines: 0, totalLines: 51, hatCooltime: 0, gloveCritDmg: 0 },
            additional: { gradeCount: {}, validLines: 0, totalLines: 51 }
        },
        setEffect: { activeSets: [], luckyItemApplied: false, brokenSets: [], setDetails: {} }
    };

    if (!items || items.length === 0) return result;

    const isMagic = isMagicJob(job);
    const mainStats = getJobMainStat(job);

    // 1. 스타포스 진단 (17부위)
    let sfSum = 0;
    let sfCount = 0;

    // 아이템 분류 및 데이터 추출
    const setCounts: Record<string, number> = {};
    const setItems: Record<string, string[]> = {};
    let luckyItemCount = 0;
    let luckyItemName = "";

    items.forEach(item => {
        const slot = item.item_equipment_slot;
        const name = item.item_name;
        const sf = parseInt(item.starforce || "0");
        const potGrade = item.potential_option_grade || "없음";
        const addPotGrade = item.additional_potential_option_grade || "없음";

        // 스타포스 집계 (대상 부위만)
        const isSfTarget =
            slot === '무기' ||
            ['모자', '상의', '하의', '장갑', '신발', '망토'].includes(slot) ||
            ['어깨장식', '얼굴장식', '눈장식', '귀고리', '벨트', '펜던트'].includes(slot) ||
            slot === '반지';

        const isSeedRing = item.special_ring_level > 0;
        const isEventRing = [
            "테네브리스", "SS급", "어웨이크", "글로리온", "카오스", "벤젼스", "결속의", "이터널 플레임",
            "어드벤처 딥다크", "오닉스", "코스모스", "이벤트 링", "어드벤처", "시너지", "쥬얼", "다크 크리티컬"
        ].some(k => name.includes(k));
        const isSpecialRing = ["어비스 헌터스 링", "크리티컬 링"].some(k => name.includes(k));

        if (isSfTarget && !isSeedRing && !isEventRing && !isSpecialRing) {
            sfSum += sf;
            sfCount++;

            const isAmazingEnhancement = isAmazingEnhancementItem(item);
            if (isAmazingEnhancement) {
                if (sf >= 12) result.starforce.count22++; // 놀장 12성 = 22성급
                else if (sf >= 5) result.starforce.count17++; // 놀장 5성 = 17성급
            } else {
                if (sf >= 22) result.starforce.count22++;
                else if (sf >= 17) result.starforce.count17++;
            }
        }

        // 잠재능력 집계
        const potentials = [item.potential_option_1, item.potential_option_2, item.potential_option_3];
        const addPotentials = [item.additional_potential_option_1, item.additional_potential_option_2, item.additional_potential_option_3];

        const isWSE = slot === '무기' || slot === '보조무기' || slot === '엠블렘' || item.item_equipment_part === '보조무기' || slot === '방패';

        if (isWSE) {
            // WSE 잠재
            result.wse.potential.gradeCount[potGrade] = (result.wse.potential.gradeCount[potGrade] || 0) + 1;
            potentials.forEach(line => {
                if (!line) return;
                const isBoss = line.includes('보스 몬스터');
                const isIED = line.includes('방어율 무시');
                const isAttPct = (isMagic ? line.includes('마력') : line.includes('공격력')) && line.includes('%');
                // 렙당공 제외, 데미지% 제외

                if (isBoss || isIED || isAttPct) {
                    result.wse.potential.validLines++;
                }

                if (isIED) {
                    result.wse.iedLines = (result.wse.iedLines || 0) + 1;
                }
            });

            // WSE 에디
            result.wse.additional.gradeCount[addPotGrade] = (result.wse.additional.gradeCount[addPotGrade] || 0) + 1;
            addPotentials.forEach(line => {
                if (!line) return;
                if ((isMagic ? line.includes('마력') : line.includes('공격력')) && line.includes('%')) {
                    result.wse.additional.validLines++;
                }
                if (line.includes('보스 몬스터')) {
                    result.wse.additional.validLines++;
                }
            });
        } else {
            // 방어구/장신구/하트 잠재 (훈장, 뱃지, 포켓 제외)
            if (slot !== '훈장' && slot !== '뱃지' && slot !== '포켓 아이템') {
                result.armorAcc.potential.gradeCount[potGrade] = (result.armorAcc.potential.gradeCount[potGrade] || 0) + 1;

                potentials.forEach(line => {
                    if (!line) return;
                    // 유효 옵션: 주스탯%, 올스탯%, 쿨감, 크뎀, 렙당 주스탯
                    let isStat = false;
                    if (line.includes('올스탯') || line.includes('모든 스탯')) {
                        isStat = true;
                    } else if (line.includes('최대 HP')) {
                        // 데몬어벤져 HP 처리
                        isStat = mainStats.some(stat => stat.includes('HP'));
                    } else {
                        isStat = mainStats.some(stat => stat !== 'HP' && stat !== '최대HP' && line.includes(stat));
                    }

                    const isPct = line.includes('%');
                    const isPerLevelStat = line.includes('10레벨 당') && (
                        mainStats.some(stat => stat !== 'HP' && stat !== '최대HP' && line.includes(stat)) ||
                        (mainStats.some(stat => stat.includes('HP')) && line.includes('최대 HP'))
                    );
                    const isCool = line.includes('재사용 대기시간');
                    const isCrit = line.includes('크리티컬 데미지');

                    if ((isStat && isPct) || isPerLevelStat || isCool || isCrit) {
                        result.armorAcc.potential.validLines++;
                    }

                    if (slot === '모자' && isCool) {
                        const sec = parseInt(line.replace(/[^0-9]/g, '')) || 0;
                        result.armorAcc.potential.hatCooltime += sec;
                    }
                    if (slot === '장갑' && isCrit) {
                        result.armorAcc.potential.gloveCritDmg++;
                    }
                });

                // 방어구/장신구 에디
                result.armorAcc.additional.gradeCount[addPotGrade] = (result.armorAcc.additional.gradeCount[addPotGrade] || 0) + 1;
                addPotentials.forEach(line => {
                    if (!line) return;
                    // 유효 옵션: 공/마 상수, 주스탯%, 크뎀(장갑), 쿨감(모자), 렙당 주스탯
                    const isAttFlat = (isMagic ? line.includes('마력') : line.includes('공격력')) && !line.includes('%');

                    let isStatPct = false;
                    if (line.includes('%')) {
                        if (line.includes('올스탯') || line.includes('모든 스탯')) {
                            isStatPct = true;
                        } else if (line.includes('최대 HP')) {
                            // 데몬어벤져 HP 처리
                            isStatPct = mainStats.some(stat => stat.includes('HP'));
                        } else {
                            isStatPct = mainStats.some(stat => stat !== 'HP' && stat !== '최대HP' && line.includes(stat));
                        }
                    }

                    const isCrit = line.includes('크리티컬 데미지');
                    const isCool = line.includes('재사용 대기시간');
                    const isLevelStat = line.includes('캐릭터 기준 9레벨 당');

                    if (isAttFlat || isStatPct || isCrit || isCool || isLevelStat) {
                        result.armorAcc.additional.validLines++;
                    }

                    if (slot === '모자' && isCool) {
                        const sec = parseInt(line.replace(/[^0-9]/g, '')) || 0;
                        result.armorAcc.potential.hatCooltime += sec; // 윗잠/아랫잠 합산
                    }
                    if (slot === '장갑' && isCrit) {
                        result.armorAcc.potential.gloveCritDmg++; // 윗잠/아랫잠 합산
                    }
                });
            }
        }

        // 세트 효과 카운팅
        if (name.includes('카루타') || name.includes('하이네스') || name.includes('이글아이') || name.includes('트릭스터') || name.includes('파프니르')) incrementSet(setCounts, setItems, '카루타', name);
        if (name.includes('앱솔랩스')) incrementSet(setCounts, setItems, '앱솔랩스', name);
        if (name.includes('아케인셰이드')) incrementSet(setCounts, setItems, '아케인셰이드', name);
        if (name.includes('에테르넬')) incrementSet(setCounts, setItems, '에테르넬', name);
        if (name.includes('마이스터')) incrementSet(setCounts, setItems, '마이스터', name);

        // 여명 세트
        if (name.includes('트와일라이트 마크') || name.includes('에스텔라 이어링') || name.includes('가디언 엔젤 링') || name.includes('데이브레이크 펜던트')) {
            incrementSet(setCounts, setItems, '여명', name);
        }

        // 보스 장신구 세트 (주요 아이템)
        const bossAccList = [
            '응축된 힘의 결정석', '아쿠아틱 레터 눈장식', '데아 시두스 이어링', '실버블라썸 링', '고귀한 이피아의 반지',
            '혼테일의 목걸이', '카오스 혼테일의 목걸이', '매커네이터 펜던트', '도미네이터 펜던트',
            '골든 클로버 벨트', '분노한 자쿰의 벨트', '로얄 블랙메탈 숄더', '핑크빛 성배', '크리스탈 웬투스 뱃지', '지옥의 불꽃'
        ];
        if (bossAccList.some(acc => name === acc || name.includes(acc))) {
            incrementSet(setCounts, setItems, '보스 장신구', name);
        }

        if (name.includes('칠흑') || isPitchBoss(name)) incrementSet(setCounts, setItems, '칠흑', name);
        if (isBrilliantBoss(name)) incrementSet(setCounts, setItems, '광휘의 보스', name);

        // 럭키 아이템 체크 (제네시스, 데스티니, 카오스 모자 4종)
        const isGenesisOrDestiny = name.includes('제네시스') || name.includes('데스티니');
        const isChaosHat = [
            '카오스 벨룸의 헬름', '카오스 피에르 모자', '카오스 반반 투구', '카오스 퀸의 티아라'
        ].some(k => name === k || name.includes(k));

        if (isGenesisOrDestiny || isChaosHat) {
            luckyItemCount++;
            luckyItemName = name;
        }
    });

    // 스타포스 평균 계산
    if (sfCount > 0) {
        result.starforce.average = parseFloat((sfSum / sfCount).toFixed(1));
        result.starforce.totalSlots = sfCount;
    }

    // 세트 효과 분석 (럭키 아이템 적용)
    // 럭키 아이템은 3세트 이상인 세트에만 적용되며,
    // 여러 개의 럭키 아이템이 있어도 하나의 세트에는 1개만 적용됨.
    // 럭키 아이템이 여러 개일 경우, 우선순위가 높은 세트부터 차례대로 적용됨.
    if (luckyItemCount > 0) {
        result.setEffect.luckyItemApplied = true;

        // 세트 우선순위 정의 (높은 레벨/티어 순)
        // * 장신구 세트(칠흑, 여명, 보스 장신구)는 럭키 아이템(무기) 적용 대상 아님
        const setPriority: Record<string, number> = {
            '에테르넬': 100,
            '아케인셰이드': 80,
            '앱솔랩스': 60,
            '카루타': 50,
            '마이스터': 40
        };

        // 3세트 이상인 세트만 필터링 및 정렬
        const candidateSets = Object.keys(setCounts)
            .filter(set => setCounts[set] >= 3)
            .sort((a, b) => (setPriority[b] || 0) - (setPriority[a] || 0));

        // 럭키 아이템 개수만큼 상위 세트에 +1 적용
        // candidateSets에 있는 세트만 적용됨 (우선순위 맵에 없는 세트는 제외됨)
        for (let i = 0; i < Math.min(luckyItemCount, candidateSets.length); i++) {
            const targetSet = candidateSets[i];
            if (setPriority[targetSet]) { // 우선순위 목록에 있는 세트만 적용
                setCounts[targetSet]++;
                // 럭키 아이템도 목록에 추가
                if (!setItems[targetSet]) setItems[targetSet] = [];
                setItems[targetSet].push(`${luckyItemName} (럭키 아이템)`);
            }
        }
    }

    // 활성화된 세트 찾기
    for (const set in setCounts) {
        const count = setCounts[set];
        if (set === '카루타' && count >= 3) result.setEffect.activeSets.push(`카루타 ${count}셋`);
        if (set === '앱솔랩스' && count >= 4) result.setEffect.activeSets.push(`앱솔랩스 ${count}셋`);
        if (set === '아케인셰이드' && count >= 4) result.setEffect.activeSets.push(`아케인 ${count}셋`);
        if (set === '에테르넬' && count >= 2) result.setEffect.activeSets.push(`에테르넬 ${count}셋`);
        if (set === '마이스터' && count >= 3) result.setEffect.activeSets.push(`마이스터 ${count}셋`);
        if (set === '여명' && count >= 2) result.setEffect.activeSets.push(`여명 ${count}셋`);
        if (set === '보스 장신구' && count >= 3) result.setEffect.activeSets.push(`보스 장신구 ${count}셋`);
        if (set === '칠흑' && count >= 2) result.setEffect.activeSets.push(`칠흑 ${count}셋`);
        if (set === '광휘의 보스' && count >= 2) result.setEffect.activeSets.push(`광휘의 보스 ${count}셋`);
    }

    result.setEffect.setDetails = setItems;

    return result;
}

function incrementSet(counts: Record<string, number>, items: Record<string, string[]>, set: string, itemName: string) {
    counts[set] = (counts[set] || 0) + 1;
    if (!items[set]) items[set] = [];
    items[set].push(itemName);
}

function isPitchBoss(name: string): boolean {
    const pitchBossSet = [
        '창세의 뱃지', '저주받은 마도서', '미트라의 분노',
        '고통의 근원', '몽환의 벨트', '루즈 컨트롤 머신 마크', '마력이 깃든 안대',
        '커맨더 포스 이어링', '거대한 공포',
        '블랙 하트', '블랙하트', '컴플리트 언더컨트롤', '컴플리트언더컨트롤',
        '저주받은 적의 마도서', '저주받은 청의 마도서', '저주받은 녹의 마도서', '저주받은 황의 마도서'
    ];
    return pitchBossSet.some(p => name.includes(p));
}

function isBrilliantBoss(name: string): boolean {
    const brilliantBossSet = [
        '근원의 속삭임', '죽음의 맹세', '불멸의 유산'
    ];
    return brilliantBossSet.some(p => name.includes(p));
}
