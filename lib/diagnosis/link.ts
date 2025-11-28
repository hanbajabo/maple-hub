import { LINK_DB, LINK_SKILL_JOBS } from '../../src/data/diagnosisData';
import { DiagnosisResult } from './types';

// 중첩 가능한 링크 스킬과 최대 레벨 정의
const STACKABLE_LINKS: Record<string, number> = {
    "임피리컬 널리지": 6, // 모험가 법사
    "시프 커닝": 6,      // 모험가 도적
    "파이렛 블레스": 6,   // 모험가 해적
    "인빈서블 빌리프": 6, // 모험가 전사
    "어드벤쳐러 큐리어스": 6, // 모험가 궁수
    "시그너스 블레스": 10, // 시그너스
    "스피릿 오브 프리덤": 8, // 레지스탕스
};

// === 1. 링크 스킬 진단 ===
export function diagnoseLinkSkill(targetMode: 'HUNTING' | 'BOSS', linkData: any): DiagnosisResult {
    const result: DiagnosisResult = { bad: [], good: [], scoreDeduction: 0 };

    // 1. 내 링크 스킬 정보 수집 (이름 -> 레벨 합산)
    const myLinkMap = new Map<string, number>();

    const addLink = (name: string, level: number) => {
        if (!name) return;
        // 이름 공백 제거 등 정규화 (필요 시)
        const normalizedName = name.trim();
        const current = myLinkMap.get(normalizedName) || 0;
        myLinkMap.set(normalizedName, current + level);
    };

    // 보유 스킬 (내 직업 링크)
    if (linkData.character_owned_link_skill) {
        addLink(linkData.character_owned_link_skill.skill_name, linkData.character_owned_link_skill.skill_level);
    }

    // 장착 스킬 (다른 직업 링크)
    linkData.character_link_skill?.forEach((s: any) => {
        addLink(s.skill_name, s.skill_level);
    });

    const targetLinks = targetMode === 'HUNTING' ? LINK_DB.HUNTING : LINK_DB.BOSS;

    targetLinks.forEach(requiredLink => {
        const myLevel = myLinkMap.get(requiredLink) || 0;
        const maxLevel = STACKABLE_LINKS[requiredLink] || 2; // 기본 2렙

        if (myLevel === 0) {
            // 아예 없음
            const jobName = LINK_SKILL_JOBS[requiredLink] || '?';
            const label = targetMode === 'HUNTING' ? "사냥용" : "보스용";
            const deduction = targetMode === 'BOSS' ? 5 : 3;

            result.bad.push(`${label} 필수: ${requiredLink} (${jobName}) 누락`);
            result.scoreDeduction += deduction;
        } else if (myLevel < maxLevel) {
            // 있긴 한데 만렙이 아님 (중첩 링크의 경우 중요)
            const jobName = LINK_SKILL_JOBS[requiredLink] || '?';
            // 6렙 만렙인 스킬들은 1렙당 1점 정도 감점? (너무 가혹하지 않게)
            // 일단 경고 메시지만 명확히
            result.bad.push(`${requiredLink} 레벨 부족 (Lv.${myLevel}/${maxLevel}) - ${jobName} 중첩 필요`);

            // 점수 감점은 중첩 스킬인 경우에만 소폭 적용
            if (STACKABLE_LINKS[requiredLink]) {
                result.scoreDeduction += 1;
            }
        }
    });

    if (result.bad.length === 0) {
        result.good.push("필수 링크 스킬을 완벽하게 갖추고 있습니다!");
    }

    return result;
}
