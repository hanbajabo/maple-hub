import BlueberryCalculatorClient from "../../../components/blueberry-calculator/BlueberryCalculatorClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "미호의 블루베리 농장 계산기 | 메이플 AI",
    description: "챌린저스 월드 시즌4 블루베리 농장의 경험치 획득량과 레벨업을 계산해보세요.",
};

export default function BlueberryCalculatorPage() {
    return (
        <main className="w-full h-full min-h-screen">
            <BlueberryCalculatorClient />
        </main>
    );
}
