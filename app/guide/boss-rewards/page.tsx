import { Metadata } from 'next';
import BossRewardsClient from './BossRewardsClient';

export const metadata: Metadata = {
    title: '보스별 주요 보상 가이드 - 메이플 AI',
    description: '메이플스토리 모든 보스의 주요 보상과 드롭 아이템을 한눈에 확인하세요.',
};

export default function BossRewardsPage() {
    return <BossRewardsClient />;
}
