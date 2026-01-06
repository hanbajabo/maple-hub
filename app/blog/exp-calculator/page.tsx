import { Metadata } from 'next';
import ExpCalculatorClient from './ExpCalculatorClient';

export const metadata: Metadata = {
    title: '경험치 계산기 (Lv.200~300) - 메이플 AI',
    description: '메이플스토리 200~300 레벨 구간 경험치 계산기. 목표 레벨까지 필요한 경험치와 예상 소요 시간을 계산하세요.',
};

export default function ExpCalculatorPage() {
    return <ExpCalculatorClient />;
}
