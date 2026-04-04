import LucidBossCalcClient from "../../../components/lucid-calculator/LucidBossCalcClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "[체인지 버닝 : 루시드] 보스 최소컷 계산기 | 메이플 AI",
    description: "루시드 보스 레벨, 숙련도, 마력 등을 입력해 보스 격파 가능성을 계산해보세요.",
};

export default function LucidBossPage() {
    return (
        <main className="w-full h-full min-h-screen">
            <LucidBossCalcClient />
        </main>
    );
}
