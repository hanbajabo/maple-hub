import type { Metadata } from 'next';
import AbilityGuideClient from './AbilityGuideClient';

export const metadata: Metadata = {
    title: '직업별 어빌리티 추천 가이드 - 메이플 AI',
    description: '전직업 추천 어빌리티 완벽 정리. 보스용/상태이상/버프지속 최적화',
};

export default function AbilityGuidePage() {
    return <AbilityGuideClient />;
}
