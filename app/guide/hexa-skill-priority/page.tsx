import type { Metadata } from 'next';
import HexaSkillGuideClient from './HexaSkillGuideClient';

export const metadata: Metadata = {
    title: '직업별 헥사 스킬 우선순위 가이드 - 메이플 AI',
    description: '전투력 1억~4억 고스펙 유저 실제 데이터 기반. 전직업 6차 스킬 강화 우선순위 완벽 정리.',
};

export default function HexaSkillPriorityPage() {
    return <HexaSkillGuideClient />;
}
