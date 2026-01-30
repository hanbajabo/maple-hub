import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '메이플 경험치 상품 효율 완벽 분석 | 모멘텀 패스 효율, 챌린저스 듀오 효율, 익스프레스 패스 효율, 에픽 던전 효율 비교',
    description: '메이플스토리 경험치 상품 가성비 완벽 분석! 모멘텀 패스 효율, 챌린저스 듀오 효율, 익스프레스 패스 효율, 에픽 던전 효율, 메카베리 효율, 몬파 효율, 익부 효율을 상급 EXP로 환산하여 레벨대별 최적화 전략을 제시합니다.',
    keywords: '메이플스토리, 경험치 효율, 모멘텀 패스 효율, 챌린저스 듀오 효율, 익스프레스 패스 효율, 에픽 던전 효율, 메카베리 효율, 악몽선경 효율, 몬스터파크 효율, 몬파 효율, 익부 효율, 익스트림부스터 효율, 챌린저스 EXP 듀오, 상급 EXP, 가성비, 레벨업, 메카베리 농장, 에픽 던전, 메이플 가이드',
    openGraph: {
        title: '메이플 경험치 상품 효율 완벽 분석 | 모멘텀 패스, 챌린저스 듀오, 익스프레스 패스, 에픽 던전, 메카베리, 몬파 효율',
        description: '모멘텀 패스 효율, 챌린저스 듀오 효율, 익스프레스 패스 효율, 에픽 던전 효율, 메카베리 효율, 몬파 효율 완벽 비교! 레벨대별 최적화 전략',
        type: 'article',
    },
};

export default function ExpProductEfficiencyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
