import { Metadata } from 'next';
import ExpCalculatorClient from './ExpCalculatorClient';

export const metadata: Metadata = {
    title: '메이플스토리 경험치 계산기 | Lv.200~300 레벨업 소요 시간 계산 - 메이플 AI',
    description: '메이플스토리 경험치 계산기. 200~300 레벨 구간 목표 레벨까지 필요한 경험치와 예상 소요 일수를 계산하세요. 몬스터파크, 아케인·그란디스 일퀘, 하이퍼버닝, 체인지버닝 루시드 이벤트까지 한번에 반영.',
    keywords: [
        '메이플스토리 경험치 계산기',
        '메이플 경험치 계산기',
        '메이플 레벨업 계산기',
        '메이플 경험치 표',
        '메이플 200 260 경험치',
        '메이플 260 280 경험치',
        '메이플 하이퍼버닝 경험치',
        '메이플 버닝비욘드 경험치',
        '체인지버닝 루시드 경험치',
        '메이플 몬스터파크 경험치',
        '메이플 레벨업 소요 시간',
        '메이플 285 경험치',
        '메이플 290 경험치',
        '메이플 아케인포스 경험치',
        '메이플 그란디스 경험치',
    ],
    openGraph: {
        title: '메이플스토리 경험치 계산기 | Lv.200~300 - 메이플 AI',
        description: '목표 레벨까지 필요한 경험치와 예상 소요 일수를 한번에 계산. 하이퍼버닝·체인지버닝 루시드 반영.',
        url: 'https://maple.ai.kr/guide/exp-calculator',
        siteName: '메이플 AI',
        locale: 'ko_KR',
        type: 'website',
    },
    alternates: {
        canonical: 'https://maple.ai.kr/guide/exp-calculator',
    },
};

export default function ExpCalculatorPage() {
    return <ExpCalculatorClient />;
}
