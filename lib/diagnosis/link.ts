import { LINK_DB, LINK_SKILL_JOBS } from '../../src/data/diagnosisData';
import { DiagnosisResult } from './types';

// === 1. 링크 스킬 진단 ===
export function diagnoseLinkSkill(targetMode: 'HUNTING' | 'BOSS', linkData: any): DiagnosisResult {
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
