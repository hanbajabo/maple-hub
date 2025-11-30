import BossTierGuideClient from "./BossTierGuideClient";

export const metadata = {
    title: "보스 티어 가이드 - 메이플 AI",
    description: "메이플스토리 보스 몬스터의 난이도별 티어(금별, 은별, 동별, 납별)를 정리한 완벽 공략 가이드입니다.",
};

export default function BossTierGuidePage() {
    return <BossTierGuideClient />;
}
