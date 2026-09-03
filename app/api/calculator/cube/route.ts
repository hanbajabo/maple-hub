import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import {
    getPotentialResetCost,
    getAdditionalPotentialResetCost,
    getPotentialUpgradeRate,
    getPotentialGuaranteeCount,
    CUBE_DEFINITIONS,
    PotentialCubeType,
} from '@/lib/cube_db';
import {
    parseOptionString,
    combineStats,
    formatMeso,
    StatType,
    ParsedOption,
} from '@/lib/potential-calculator';

// DB Cache
let POTENTIAL_DB: any = null;

function findPotentialDBPath(): string | null {
    const candidates = [
        path.join(process.cwd(), 'data', 'potential-option-tables.json'),
        path.join(process.cwd(), 'maple-hub', 'data', 'potential-option-tables.json'),
        path.join(__dirname, '..', '..', '..', '..', 'data', 'potential-option-tables.json'),
        path.join(__dirname, '..', '..', '..', 'data', 'potential-option-tables.json'),
        path.join('C:', 'Users', 'USER', 'Desktop', 'maple-colosseum', 'maple-hub', 'data', 'potential-option-tables.json')
    ];
    for (const p of candidates) {
        try {
            if (fs.existsSync(p)) return p;
        } catch (e) {}
    }
    return null;
}

function getDB(): any {
    if (POTENTIAL_DB) return POTENTIAL_DB;
    try {
        const filePath = findPotentialDBPath();
        if (filePath) {
            POTENTIAL_DB = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            return POTENTIAL_DB;
        }
    } catch (e) {
        console.error('Failed to read potential db:', e);
    }
    return null;
}

type GradeEn = 'RARE' | 'EPIC' | 'UNIQUE' | 'LEGENDARY';
type GradeKo = '레어' | '에픽' | '유니크' | '레전드리';

function toEnglishGrade(g: string): GradeEn {
    const s = String(g).toUpperCase();
    if (s === '레전드리' || s === 'LEGENDARY') return 'LEGENDARY';
    if (s === '유니크' || s === 'UNIQUE') return 'UNIQUE';
    if (s === '에픽' || s === 'EPIC') return 'EPIC';
    return 'RARE';
}

function toKoreanGrade(g: string): GradeKo {
    const s = toEnglishGrade(g);
    if (s === 'LEGENDARY') return '레전드리';
    if (s === 'UNIQUE') return '유니크';
    if (s === 'EPIC') return '에픽';
    return '레어';
}

const GRADE_ORDER: GradeEn[] = ['RARE', 'EPIC', 'UNIQUE', 'LEGENDARY'];

const LOWER_GRADE_MAP: Record<GradeEn, string> = {
    LEGENDARY: 'UNIQUE',
    UNIQUE: 'EPIC',
    EPIC: 'RARE',
    RARE: 'NORMAL'
};

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            goalType = 'GRADE_UP_AND_OPTION', // 'GRADE_UP' | 'OPTION' | 'GRADE_UP_AND_OPTION'
            method = 'POTENTIAL',
            cubeType = 'MESO_RESET',
            isMiracleTime = false,
            useCeiling = true,
            equip = '무기',
            level = 200,
            startGrade = 'LEGENDARY',
            targetGrade = 'LEGENDARY',
            mode = 'lines', // 'lines' | 'stats'
            line1 = '',
            line2 = '',
            line3 = '',
            unordered = true,
            targetStats = {}
        } = body;

        const db = getDB();
        if (!db) {
            return NextResponse.json({ error: '옵션 데이터베이스를 로드할 수 없습니다.' }, { status: 500 });
        }

        const validMethod = method === 'ADDI_POTENTIAL' ? 'ADDI_POTENTIAL' : 'POTENTIAL';
        const normStartGrade = toEnglishGrade(startGrade);
        const normTargetGrade = toEnglishGrade(targetGrade);

        let matchedLevel = '200';
        if (level >= 250) matchedLevel = '250';
        else if (level >= 200) matchedLevel = '200';
        else if (level >= 160) matchedLevel = '160';
        else matchedLevel = '150';

        const equipMap = db[validMethod] || {};
        const levelMap = equipMap[equip] || equipMap['무기'] || {};
        const equipData = levelMap[matchedLevel] || levelMap['200'] || levelMap['160'] || levelMap['150'];

        if (!equipData) {
            return NextResponse.json({ error: `[${equip}] 장비 데이터를 찾을 수 없습니다.` }, { status: 404 });
        }

        const targetGradeData = equipData[normTargetGrade];
        if (!targetGradeData) {
            return NextResponse.json({ error: `[${normTargetGrade}] 등급 데이터를 찾을 수 없습니다.` }, { status: 404 });
        }

        // Available options for UI dropdown
        const currentGradeOptionsRaw: { name: string; probability: number }[] = targetGradeData[normTargetGrade] || [];
        const lowerGrade = LOWER_GRADE_MAP[normTargetGrade];
        const lowerGradeOptionsRaw: { name: string; probability: number }[] = lowerGrade ? (targetGradeData[lowerGrade] || []) : [];

        const availableOptions = Array.from(new Set([
            ...currentGradeOptionsRaw.map(o => o.name),
            ...lowerGradeOptionsRaw.map(o => o.name)
        ]));

        const numLevel = parseInt(matchedLevel, 10);
        const activeCubeDef = CUBE_DEFINITIONS[cubeType as PotentialCubeType] || (validMethod === 'ADDI_POTENTIAL' ? CUBE_DEFINITIONS.ADDI_MESO_RESET : CUBE_DEFINITIONS.MESO_RESET);

        // Calculate Grade-Up Cost if needed (GRADE_UP or GRADE_UP_AND_OPTION)
        const startIndex = GRADE_ORDER.indexOf(normStartGrade);
        const targetIndex = GRADE_ORDER.indexOf(normTargetGrade);

        let gradeUpAttempts = 0;
        let gradeUpCostMeso = 0;
        let gradeUpMaxCeilCostMeso = 0;
        let lastStepPercentile = 50;

        const gradeUpSteps: {
            from: string;
            to: string;
            rate: number;
            ceil: number;
            avgAttempts: number;
            exactAvgAttempts: number;
            percentile: number;
            costPerTry: number;
            costPerTryText: string;
            avgCost: number;
            avgCostText: string;
            intAttemptsCost: number;
            intAttemptsCostText: string;
            maxCeilCost: number;
            maxCeilCostText: string;
            cubeName: string;
        }[] = [];

        if (goalType !== 'OPTION' && startIndex !== -1 && targetIndex !== -1 && startIndex < targetIndex) {
            for (let i = startIndex; i < targetIndex; i++) {
                const curTier = GRADE_ORDER[i];
                const nextTier = GRADE_ORDER[i + 1];
                const curKor = toKoreanGrade(curTier) as '레어' | '에픽' | '유니크';
                const nextKor = toKoreanGrade(nextTier);

                const rate = getPotentialUpgradeRate(curKor, nextKor, activeCubeDef.id, isMiracleTime);
                const ceil = useCeiling ? getPotentialGuaranteeCount(curKor, nextKor, activeCubeDef.id) : 0;

                const costPerTry = activeCubeDef.costType === 'MESO'
                    ? (validMethod === 'POTENTIAL' ? getPotentialResetCost(numLevel, curKor) : getAdditionalPotentialResetCost(numLevel, curKor))
                    : 0;

                const p = rate / 100;
                let exactAvgAttempts = 0;
                if (p > 0) {
                    if (ceil > 0) {
                        // Truncated geometric expectation: (1 - (1-p)^N) / p
                        exactAvgAttempts = (1 - Math.pow(1 - p, ceil)) / p;
                    } else {
                        exactAvgAttempts = 1 / p;
                    }
                }

                const roundedAttempts = Math.round(exactAvgAttempts);
                const percentile = p > 0 ? (1 - Math.pow(1 - p, exactAvgAttempts)) * 100 : 0;
                lastStepPercentile = percentile;

                const avgCost = Math.round(exactAvgAttempts * costPerTry);
                const intAttemptsCost = roundedAttempts * costPerTry;
                const maxCeilCost = ceil * costPerTry;

                gradeUpAttempts += exactAvgAttempts;
                gradeUpCostMeso += avgCost;
                gradeUpMaxCeilCostMeso += maxCeilCost;

                gradeUpSteps.push({
                    from: curKor,
                    to: nextKor,
                    rate,
                    ceil,
                    avgAttempts: roundedAttempts,
                    exactAvgAttempts,
                    percentile: parseFloat(percentile.toFixed(2)),
                    costPerTry,
                    costPerTryText: formatMeso(costPerTry),
                    avgCost,
                    avgCostText: formatMeso(avgCost),
                    intAttemptsCost,
                    intAttemptsCostText: formatMeso(intAttemptsCost),
                    maxCeilCost,
                    maxCeilCostText: formatMeso(maxCeilCost),
                    cubeName: activeCubeDef.name
                });
            }
        }

        // Option Rolling Math Solver (if goalType === 'OPTION' or 'GRADE_UP_AND_OPTION')
        let totalProb = 0;
        let expectedAttempts = 0;
        let rollingCostMeso = 0;
        let combinations: {
            line1: string;
            line2: string;
            line3: string;
            probability: number;
            probabilityPercent: string;
            sharePercent: string;
        }[] = [];

        const targetKor = toKoreanGrade(normTargetGrade);
        const startKor = toKoreanGrade(normStartGrade);

        // Displayed single attempt cost: for GRADE_UP mode, show startGrade cost; for others, show targetGrade cost
        const costOnce = validMethod === 'POTENTIAL'
            ? (goalType === 'GRADE_UP' ? (gradeUpSteps[0]?.costPerTry || getPotentialResetCost(numLevel, startKor)) : getPotentialResetCost(numLevel, targetKor))
            : (goalType === 'GRADE_UP' ? (gradeUpSteps[0]?.costPerTry || getAdditionalPotentialResetCost(numLevel, startKor)) : getAdditionalPotentialResetCost(numLevel, targetKor));

        if (goalType !== 'GRADE_UP') {
            const curPool: ParsedOption[] = currentGradeOptionsRaw.map(e => parseOptionString(e.name, e.probability));
            const lowPool: ParsedOption[] = lowerGradeOptionsRaw.map(e => parseOptionString(e.name, e.probability));

            // mesu.live 공식 줄별 등급 가중치 (potential.getOptionGrade API 기준)
            // 일반 잠재: 2줄=20%/80%, 3줄=5%/95% (전 등급 동일)
            // 에디셔널: 등급별로 현재등급 가중치가 다름
            let l2cur = 0.20, l2low = 0.80, l3cur = 0.05, l3low = 0.95;
            if (validMethod === 'ADDI_POTENTIAL') {
                if (normTargetGrade === 'LEGENDARY') { l2cur = 0.004975; l2low = 0.995025; l3cur = 0.004975; l3low = 0.995025; }
                else if (normTargetGrade === 'UNIQUE') { l2cur = 0.019608; l2low = 0.980392; l3cur = 0.019608; l3low = 0.980392; }
                else { l2cur = 0.047619; l2low = 0.952381; l3cur = 0.047619; l3low = 0.952381; } // EPIC
            }

            const line1Pool: ParsedOption[] = curPool.map(o => ({ ...o, probability: o.probability * 1.0 }));
            const line2Pool: ParsedOption[] = [
                ...curPool.map(o => ({ ...o, probability: o.probability * l2cur })),
                ...lowPool.map(o => ({ ...o, probability: o.probability * l2low }))
            ];
            const line3Pool: ParsedOption[] = [
                ...curPool.map(o => ({ ...o, probability: o.probability * l3cur })),
                ...lowPool.map(o => ({ ...o, probability: o.probability * l3low }))
            ];

            interface TargetCriteria {
                rawName: string;
                parsed: ParsedOption;
                isAny: boolean;
            }

            function createTargetCriteria(line: string): TargetCriteria {
                if (!line || line === 'ANY') {
                    return { rawName: line || 'ANY', parsed: { id: 0, rawName: 'ANY', probability: 0, stats: {} }, isAny: true };
                }
                const parsed = parseOptionString(line, 1);
                return { rawName: line, parsed, isAny: false };
            }

            function isBetterOrEqual(candidate: ParsedOption, target: TargetCriteria): boolean {
                if (target.isAny) return true;
                if (target.parsed.isDecentSkill || target.parsed.isInvincibleAfterHit) {
                    return candidate.rawName.includes(target.rawName) || target.rawName.includes(candidate.rawName);
                }
                const targetStatEntries = Object.entries(target.parsed.stats);
                if (targetStatEntries.length === 0) {
                    return candidate.rawName.includes(target.rawName);
                }
                for (const [key, targetVal] of targetStatEntries) {
                    const statKey = key as StatType;
                    const candVal = candidate.stats[statKey] ?? 0;
                    if (candVal < (targetVal as number)) {
                        return false;
                    }
                }
                return true;
            }

            function matchesLineCriteria(
                c: [ParsedOption, ParsedOption, ParsedOption],
                t: [TargetCriteria, TargetCriteria, TargetCriteria],
                isUnordered: boolean
            ): boolean {
                if (!isUnordered) {
                    return isBetterOrEqual(c[0], t[0]) &&
                           isBetterOrEqual(c[1], t[1]) &&
                           isBetterOrEqual(c[2], t[2]);
                }
                if (isBetterOrEqual(c[0], t[0]) && isBetterOrEqual(c[1], t[1]) && isBetterOrEqual(c[2], t[2])) return true;
                if (isBetterOrEqual(c[0], t[0]) && isBetterOrEqual(c[1], t[2]) && isBetterOrEqual(c[2], t[1])) return true;
                if (isBetterOrEqual(c[0], t[1]) && isBetterOrEqual(c[1], t[0]) && isBetterOrEqual(c[2], t[2])) return true;
                if (isBetterOrEqual(c[0], t[1]) && isBetterOrEqual(c[1], t[2]) && isBetterOrEqual(c[2], t[0])) return true;
                if (isBetterOrEqual(c[0], t[2]) && isBetterOrEqual(c[1], t[0]) && isBetterOrEqual(c[2], t[1])) return true;
                if (isBetterOrEqual(c[0], t[2]) && isBetterOrEqual(c[1], t[1]) && isBetterOrEqual(c[2], t[0])) return true;
                return false;
            }

            const targetCriteriaList: [TargetCriteria, TargetCriteria, TargetCriteria] = [
                createTargetCriteria(line1),
                createTargetCriteria(line2),
                createTargetCriteria(line3)
            ];
            const hasLineCriteria = targetCriteriaList.some(t => !t.isAny);
            const hasStatsCriteria = Object.keys(targetStats).length > 0 && Object.values(targetStats).some(v => Number(v) > 0);

            const combinationMap = new Map<string, number>();

            function matchCriteria(opt1: ParsedOption, opt2: ParsedOption, opt3: ParsedOption, stats: Partial<Record<StatType, number>>) {
                if (mode === 'lines') {
                    if (!hasLineCriteria) return true;
                    return matchesLineCriteria([opt1, opt2, opt3], targetCriteriaList, unordered);
                } else {
                    if (!hasStatsCriteria) return true;
                    const allPct = stats['ALL %'] ?? 0;
                    for (const [k, v] of Object.entries(targetStats)) {
                        const reqVal = Number(v);
                        if (reqVal <= 0) continue;
                        let cur = stats[k as StatType] ?? 0;
                        if (['STR %', 'DEX %', 'INT %', 'LUK %'].includes(k)) cur += allPct;
                        if (cur < reqVal) return false;
                    }
                    return true;
                }
            }

            for (const opt1 of line1Pool) {
                const stats1 = opt1.stats;

                let filteredLine2 = line2Pool;
                let removedP2 = 0;
                if (opt1.isDecentSkill || opt1.isInvincibleAfterHit) {
                    filteredLine2 = line2Pool.filter(o => !(o.isDecentSkill || o.isInvincibleAfterHit));
                    removedP2 = line2Pool.filter(o => o.isDecentSkill || o.isInvincibleAfterHit).reduce((sum, o) => sum + o.probability, 0);
                }
                const normFactor2 = removedP2 > 0 && removedP2 < 1 ? 1 / (1 - removedP2) : 1;

                for (const opt2 of filteredLine2) {
                    const p2 = opt2.probability * normFactor2;
                    const stats2 = combineStats(stats1, opt2.stats);

                    const hasDecent = opt1.isDecentSkill || opt2.isDecentSkill;
                    const hasInvinAfter = opt1.isInvincibleAfterHit || opt2.isInvincibleAfterHit;
                    let filteredLine3 = line3Pool;
                    let removedP3 = 0;

                    if (hasDecent || hasInvinAfter) {
                        filteredLine3 = line3Pool.filter(o => !(hasDecent && o.isDecentSkill) && !(hasInvinAfter && o.isInvincibleAfterHit));
                        removedP3 = line3Pool.filter(o => (hasDecent && o.isDecentSkill) || (hasInvinAfter && o.isInvincibleAfterHit)).reduce((sum, o) => sum + o.probability, 0);
                    }
                    const normFactor3 = removedP3 > 0 && removedP3 < 1 ? 1 / (1 - removedP3) : 1;

                    for (const opt3 of filteredLine3) {
                        const p3 = opt3.probability * normFactor3;
                        const stats3 = combineStats(stats2, opt3.stats);

                        if (matchCriteria(opt1, opt2, opt3, stats3)) {
                            const combProb = opt1.probability * p2 * p3;
                            totalProb += combProb;
                            const comboKey = `${opt1.rawName} ||| ${opt2.rawName} ||| ${opt3.rawName}`;
                            combinationMap.set(comboKey, (combinationMap.get(comboKey) || 0) + combProb);
                        }
                    }
                }
            }

            combinations = Array.from(combinationMap.entries())
                .map(([key, prob]) => {
                    const [l1, l2, l3] = key.split(' ||| ');
                    return {
                        line1: l1,
                        line2: l2,
                        line3: l3,
                        probability: prob,
                        probabilityPercent: `${(prob * 100).toFixed(8)}%`,
                        sharePercent: totalProb > 0 ? `${((prob / totalProb) * 100).toFixed(2)}%` : '0%'
                    };
                })
                .sort((a, b) => b.probability - a.probability);

            expectedAttempts = totalProb > 0 ? Math.round(1 / totalProb) : 0;
            const targetCostOnce = validMethod === 'POTENTIAL'
                ? getPotentialResetCost(numLevel, targetKor)
                : getAdditionalPotentialResetCost(numLevel, targetKor);
            rollingCostMeso = expectedAttempts * targetCostOnce;
        }

        const grandTotalMeso = gradeUpCostMeso + rollingCostMeso;
        const grandTotalAttempts = Math.round(gradeUpAttempts) + expectedAttempts;

        return NextResponse.json({
            success: true,
            goalType,
            cubeType: activeCubeDef.id,
            cubeName: activeCubeDef.name,
            isMiracleTime,
            useCeiling,
            probability: totalProb,
            probabilityPercent: totalProb > 0 ? `${(totalProb * 100).toFixed(4)}%` : '-',
            expectedAttempts,
            costPerAttempt: costOnce,
            costPerAttemptText: formatMeso(costOnce),
            rollingCostMeso,
            rollingCostText: formatMeso(rollingCostMeso),
            gradeUpAttempts: Math.round(gradeUpAttempts),
            gradeUpAttemptsExact: parseFloat(gradeUpAttempts.toFixed(2)),
            gradeUpPercentile: parseFloat(lastStepPercentile.toFixed(2)),
            gradeUpCostMeso,
            gradeUpCostText: formatMeso(gradeUpCostMeso),
            gradeUpMaxCeilCostMeso,
            gradeUpMaxCeilCostText: formatMeso(gradeUpMaxCeilCostMeso),
            gradeUpSteps,
            grandTotalAttempts,
            grandTotalMeso,
            grandTotalText: formatMeso(grandTotalMeso),
            combinations,
            availableOptions,
            currentGradeOptions: currentGradeOptionsRaw,
            lowerGradeOptions: lowerGradeOptionsRaw
        });

    } catch (err: any) {
        console.error('Cube Calculator API Error:', err);
        return NextResponse.json({ error: err.message || '계산 처리 중 오류가 발생했습니다.' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const method = searchParams.get('method') || 'POTENTIAL';
        const equip = searchParams.get('equip') || '무기';
        const level = parseInt(searchParams.get('level') || '200', 10);
        const grade = searchParams.get('grade') || 'LEGENDARY';

        const db = getDB();
        if (!db) {
            return NextResponse.json({ error: 'DB 로드 실패' }, { status: 500 });
        }

        const validMethod = method === 'ADDI_POTENTIAL' ? 'ADDI_POTENTIAL' : 'POTENTIAL';
        const normGrade = toEnglishGrade(grade);

        let matchedLevel = '200';
        if (level >= 250) matchedLevel = '250';
        else if (level >= 200) matchedLevel = '200';
        else if (level >= 160) matchedLevel = '160';
        else matchedLevel = '150';

        const equipMap = db[validMethod] || {};
        const levelMap = equipMap[equip] || equipMap['무기'] || {};
        const equipData = levelMap[matchedLevel] || levelMap['200'] || levelMap['160'] || levelMap['150'];

        if (!equipData || !equipData[normGrade]) {
            return NextResponse.json({ availableOptions: [] });
        }

        const currentOptions: { name: string; probability: number }[] = equipData[normGrade][normGrade] || [];
        const lowerGrade = LOWER_GRADE_MAP[normGrade];
        const lowerOptions: { name: string; probability: number }[] = lowerGrade ? (equipData[normGrade][lowerGrade] || []) : [];

        const allOptions = Array.from(new Set([
            ...currentOptions.map(o => o.name),
            ...lowerOptions.map(o => o.name)
        ]));

        return NextResponse.json({
            availableOptions: allOptions,
            currentGradeOptions: currentOptions,
            lowerGradeOptions: lowerOptions
        });
    } catch (e: any) {
        console.error('[GET /api/calculator/cube] error:', e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
