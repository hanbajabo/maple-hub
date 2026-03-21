import { Metadata } from "next";
import HuntingFieldCalculatorClient from "./HuntingFieldCalculatorClient";

export const metadata: Metadata = {
    title: "메이플스토리 추천 사냥터 계산기 | 메이플 AI",
    description:
        "내 레벨과 경험치 보너스를 입력하면 30분 기준 경험치 효율 TOP 20 사냥터를 추천해드립니다.",
};

export default function Page() {
    return <HuntingFieldCalculatorClient />;
}
