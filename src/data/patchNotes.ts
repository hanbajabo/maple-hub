export interface PatchNote {
    version: string;
    date: string;
    title: string;
    changes: string[];
}

export const PATCH_NOTES: PatchNote[] = [
    {
        version: "1.1.0",
        date: "2025-11-28",
        title: "보스 진단 시스템 대규모 업데이트",
        changes: [
            "럭키 아이템(카오스 벨룸 모자 등) 로직 개선 및 세트 효과 우선순위 적용",
            "방어구 방향성 진단(4단계)에 '패스' 버튼 추가",
            "장신구 주문서 진단 기준 완화 (32급 → 30급) 및 가이드 강화",
            "어드벤처 딥다크 크리티컬 링: 성장 진단 통과 / 18성 단계 교체 권장 로직 적용",
            "타일런트 아이템 스타포스 기준 완화 (10성 → 5성/7성)",
            "SS급 쥬얼링: 주문서 작 진단 예외 처리 (자동 통과)",
            "아케인/어센틱 심볼 성장 비용(레벨업/졸업) 계산 기능 추가",
            "사이트 보안 강화 및 성능 최적화"
        ]
    }
];
