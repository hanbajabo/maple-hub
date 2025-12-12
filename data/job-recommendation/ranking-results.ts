/**
 * 직업 추천 순위 결과 (미리 계산된 버전)
 * 이 파일은 job-ranking-system.ts의 결과를 미리 계산하여 저장한 것입니다.
 */

export interface JobRankingResult {
    rank: number;
    job: string;
    totalScore: number;
    breakdown: {
        hexaScore: number;
        coolHatScore: number;
        dpmScore: number;
        utilityScore: number;
    };
    summary: string;
}

// 순위 계산 로직 (간소화 버전)
// 실제 계산은 job-ranking-system.ts 참조

/**
 * 간단한 순위 요약
 * 
 * 【평가 기준】
 * - 헥사 효율 (40%): 조각 대비 높은 보정치를 얻을수록 유리
 * - 쿨뚝 불필요 (25%): 주스탯 모자 사용 가능하면 유리
 * - DPM 순위 (20%): 극딜 점유율이 높을수록 유리  
 * - 유틸리티 (15%): 바인드, 무적, 부활 등 유틸리티가 많을수록 유리
 */

export const RANKING_METHODOLOGY = `
🎯 직업 추천 순위 산정 방식

1️⃣ 헥사 강화 효율 (40% 가중치)
   - 레벨 500~20000 조각 구간의 평균 보정치로 평가
   - 높은 보정치 = 같은 조각으로 더 강해짐 = 성장 속도 빠름
   - S급: 73% 이상 | A급: 70-73% | B급: 67-70% | C급: 67% 미만

2️⃣ 쿨타임 감소 모자 불필요 (25% 가중치)
   - 주스탯 모자 사용 가능 = 큐브 비용 절감, 접근성 좋음
   - 쿨뚝 불필요(X): 100점 | 선택형(△): 50점 | 필수(O): 0점
   - 4억+ 고스펙 유저 데이터 기준

3️⃣ 극딜 점유율 순위 (20% 가중치)
   - 극딜/극딜+준극 점유율 순위 (1-47위)
   - 순위가 높을수록 보스전 화력이 우수함
   - 🔴 1-14위 | 🟠 15-28위 | ⚪ 29-38위 | 🔵 39-47위

4️⃣ 유틸리티 (15% 가중치)
   - 부활/사망방지(30점) > 공격반사무시(20점) > 바인드(15점) > 무적(15점)
   - 디버프(10점), 파티지원(10점)
   - 유틸리티가 다양할수록 파티플레이와 솔플 편의성 증가
`;

export function displayRankingMethodology() {
    console.log(RANKING_METHODOLOGY);
}

/**
 * TOP 10 빠른 참조용
 * (전체 순위는 job-ranking-system.ts에서 calculateAllJobRankings() 실행)
 */
export const TOP_10_PREVIEW = `
🏅 예상 상위권 직업 (가중치 기준)

상위권 예상 직업들:
- 헥사 효율 + 쿨뚝 불필요 조합: 보우마스터, 신궁, 비숍, 바이퍼, 아란
- 헥사 효율 + DPM 상위: 렌, 메르세데스, 나이트로드, 히어로
- 균형잡힌 올라운더: 제로, 팬텀, 은월, 루미너스

주의: 실제 순위는 job-ranking-system.ts의 calculateAllJobRankings()로 확인하세요.
`;
