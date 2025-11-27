import type { Metadata } from 'next';
import SeedRingGuideClient from './SeedRingGuideClient';

export const metadata: Metadata = {
    title: '직업별 시드링 추천 가이드 - 메이플 AI',
    description: '리레 vs 컨티 완벽 가이드. 레벨 280+, 전투력 4억 이상 초고스펙 유저 실제 데이터 기반.',
};

export default function SeedRingGuidePage() {
    return <SeedRingGuideClient />;
}
