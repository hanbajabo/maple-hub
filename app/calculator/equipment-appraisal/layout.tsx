import { Metadata } from "next";

export const metadata: Metadata = {
    title: "메이플스토리 장비 기댓값 진단기 (Beta) | 단풍이의 메이플 AI",
    description: "착용 중인 모든 장비의 노작 시세, 스타포스, 잠재능력을 종합 분석하여 총 직작 기댓값을 정밀 산출합니다.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
