import CrimsonMecaberryCalculatorClient from "../../../components/crimson-mecaberry-calculator/CrimsonMecaberryCalculatorClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "크림슨 메카베리 농장 계산기 | 메이플 AI",
    description: "모멘텀 패스 PLUS 크림슨 메카베리 농장 입장권의 경험치 획득량과 레벨업을 계산해보세요. 280~299레벨 지원.",
};

export default function CrimsonMecaberryCalculatorPage() {
    return (
        <main className="w-full h-full min-h-screen">
            <CrimsonMecaberryCalculatorClient />
        </main>
    );
}
