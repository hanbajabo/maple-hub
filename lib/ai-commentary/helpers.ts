/**
 * AI 코멘터리 헬퍼 함수
 */

/**
 * 배열에서 랜덤하게 하나를 선택
 */
export function pick<T>(opts: T[]): T {
    return opts[Math.floor(Math.random() * opts.length)];
}

/**
 * 놀장강 아이템의 등급 환산 (5성=17성급, 10성=20성급, 12성=22성급)
 */
export function getAmazingEquivalentStar(stars: number): number {
    if (stars >= 12) return 22;
    if (stars >= 10) return 20;
    if (stars >= 5) return 17;
    return stars;
}

/**
 * 이벤트 링 키워드 리스트
 */
export const EVENT_RING_KEYWORDS = [
    "테네브리스",
    "SS급",
    "어웨이크",
    "글로리온",
    "카오스",
    "벤젼스",
    "결속의",
    "이터널 플레임",
    "어드벤처 딥다크",
    "오닉스",
    "코스모스",
];
