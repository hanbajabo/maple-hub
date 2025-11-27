import { UNION_DB_CHECK, UNION_STAT_JOBS } from '../../src/data/diagnosisData';
import { DiagnosisResult } from './types';

// === 2. 유니온 진단 ===
export function diagnoseUnion(targetMode: 'HUNTING' | 'BOSS', unionData: any, mainStat: string): DiagnosisResult {
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
