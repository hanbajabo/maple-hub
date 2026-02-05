import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '메이플 전술 훈련소 (M.T.C) - 게임 시스템 기획서',
    description: '스펙과 실력의 간극을 메우는 실전 시뮬레이션 DLC 제안서',
    robots: 'noindex, nofollow',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
