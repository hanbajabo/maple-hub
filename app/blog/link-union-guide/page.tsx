import type { Metadata } from 'next';
import LinkUnionGuideClient from './LinkUnionGuideClient';

export const metadata: Metadata = {
    title: '🌟 메이플스토리 링크 & 유니온 육성 가이드 - 효율적인 육성 순서 완벽 정리',
    description: '링크 스킬과 유니온 캐릭터 육성 순서를 완벽 정리! 경험치 링크 vs 딜 링크, 140레벨 vs 200레벨 목표, 보스용 엔드급 링크 세팅까지 모든 것을 알려드립니다.',
};

export default function LinkUnionGuidePage() {
    return <LinkUnionGuideClient />;
}
