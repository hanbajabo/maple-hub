/**
 * 유튜버 전직업 추천순위
 * 출처: 유튜버 챌린저스 하드 세렌 기준 직업 추천
 * 기준: 저스펙 체급, 극딜 비중, 쌀피엠(저레벨 헥사 구간 효율), 쿨감 의존도, 유틸리티, 시너지 등 종합
 */

export interface YoutuberJobRanking {
    rank: number;
    job: string;
    score: number;
    rawScore: string;
    reason: string;
}

export const YOUTUBER_JOB_RANKING: YoutuberJobRanking[] = [
    // S+급 - 만점 (10점)
    {
        rank: 1,
        job: '일리움',
        score: 10.0,
        rawScore: '[원점수 7점/7점]',
        reason: '하드 세렌 최소컷(체급) 압도적 1위. 유틸/생존력 만점, 쿨감 의존도 낮음, 쌀피엠 순위 준수. 모든 지표에서 감점 요인이 없는 유일한 만점 직업.'
    },

    // S급 - 최상위 (9.5점)
    {
        rank: 2,
        job: '렌',
        score: 9.5,
        rawScore: '[원점수 6점]',
        reason: '저스펙 체급 최상위, 극딜 비중 2등, 쌀피엠 9등. 쿨감 의존도가 약간 있으나(감점 1), 장점이 이를 압도함.'
    },
    {
        rank: 3,
        job: '보우마스터',
        score: 9.5,
        rawScore: '[원점수 6점]',
        reason: '쿨감 의존도가 매우 낮고(가산점 2), 보스 공략 난이도가 굉장히 쉬움. 쌀피엠은 낮지만 보스전 안정성이 최고라 고득점.'
    },
    {
        rank: 4,
        job: '아크메이지(썬,콜)',
        score: 9.5,
        rawScore: '[원점수 6점]',
        reason: '쌀피엠 효율 전체 1위. 극딜 비중 높고 난이도 쉬움. 유챔 및 부캐용으로 육각형에 가까운 직업.'
    },
    {
        rank: 5,
        job: '아란',
        score: 9.5,
        rawScore: '[원점수 6점]',
        reason: '쿨감이 아예 필요 없음(가산점 2). 극딜 비중 높고 생존 유틸(프리드 등) 우수. 챌린저스 맞춤형 전사.'
    },

    // A+급 - 상위권 (9.0점)
    {
        rank: 6,
        job: '배틀메이지',
        score: 9.0,
        rawScore: '[원점수 5점]',
        reason: '체급은 낮지만(-2점), 쌀피엠 효율 최상위(4등, +2점), 시너지(+2점), 낮은 쿨감 의존도(+2점)로 상위권 등극.'
    },
    {
        rank: 7,
        job: '은월',
        score: 9.0,
        rawScore: '[원점수 5점]',
        reason: '쌀피엠 효율 3등(+2점). 유틸(소혼결계/프리드) 완벽. 쿨감 의존도가 있으나 성능이 워낙 출중함.'
    },
    {
        rank: 8,
        job: '비숍',
        score: 9.0,
        rawScore: '[원점수 5점]',
        reason: '솔플 체급(-2점)과 쌀피엠 효율(-1점)은 낮음. 그러나 압도적인 시너지(+3점)와 유틸(+2점)로 상위권 유지.'
    },
    {
        rank: 9,
        job: '메르세데스',
        score: 9.0,
        rawScore: '[원점수 5점]',
        reason: '심한 너프를 받았으나 기본 체급(+2점)과 극딜 비중 3위(+2점)가 워낙 좋아 챌섭에서 키울만 함. (단, 쌀피엠은 하위권).'
    },

    // A급 - 준수 (7-8점)
    {
        rank: 10,
        job: '윈드브레이커',
        score: 8.0,
        rawScore: '[원점수 4점]',
        reason: '체급 좋고(+1점) 쌀피엠 2등(+2점). 쿨감 의존도가 높아 감점(-2점)되었으나 유틸과 기본 성능이 훌륭함.'
    },
    {
        rank: 11,
        job: '소울마스터',
        score: 7.0,
        rawScore: '[원점수 3점]',
        reason: '체급은 낮으나(-2점), 극딜 비중 높고 쿨감 의존도가 낮아(+2점) 점수 회복. 무난함의 정석.'
    },
    {
        rank: 12,
        job: '아크',
        score: 7.0,
        rawScore: '[원점수 3점]',
        reason: '쌀피엠/극딜 상위권. 재사용 사용(-1점) 및 난이도 상승(-1점)으로 감점되었으나 여전히 준수함.'
    },
    {
        rank: 13,
        job: '캡틴',
        score: 7.0,
        rawScore: '[원점수 3점]',
        reason: '쌀피엠(저레벨 헥사) 6등(+1점). 쿨감 의존도 낮음(+1점). 하지만 아직 많은 유저들이 하지 않기에 정보가 다수 부족해서 감점.'
    },
    {
        rank: 14,
        job: '팔라딘',
        score: 7.0,
        rawScore: '[원점수 3점]',
        reason: '파티 시너지는 만점(+3점)이지만, 솔플 체급(-2점)과 쌀피엠(저레벨 헥사)(-1점)이 너무 낮아 점수 하락.'
    },

    // B급 - 평균 (5-6점)
    {
        rank: 15,
        job: '라라',
        score: 6.0,
        rawScore: '[원점수 2점]',
        reason: '쌀피엠(저레벨 헥사)이 42등(-1점)으로 낮게 평가됨. 쿨감 낮고(+1점) 쉬워서(+1점) 뉴비 추천.'
    },
    {
        rank: 16,
        job: '바이퍼',
        score: 6.0,
        rawScore: '[원점수 2점]',
        reason: '쌀피엠(저레벨 헥사) 43등(-2점). 쿨감 필요 없고(+2점) 쉬운 난이도(+2점)로 기본 점수는 챙김.'
    },
    {
        rank: 17,
        job: '카인',
        score: 6.0,
        rawScore: '[원점수 2점]',
        reason: '체급은 좋으나(+1점), 딜 사이클이 어렵고(-1점) 쌀피엠(저레벨 헥사)이 나쁨.'
    },
    {
        rank: 18,
        job: '캐논슈터',
        score: 6.0,
        rawScore: '[원점수 2점]',
        reason: '쌀피엠(저레벨 헥사) 낮음(-2점). 쿨감/난이도 무난함(+1점씩). 하드 세렌 상성은 좋음.'
    },
    {
        rank: 19,
        job: '플레임위자드',
        score: 6.0,
        rawScore: '[원점수 2점]',
        reason: '쿨감 의존도가 매우 높음(-2점). 기본 성능은 준수하나 쿨뚝 세팅이 필수.'
    },
    {
        rank: 20,
        job: '스트라이커',
        score: 5.5,
        rawScore: '[원점수 1점]',
        reason: '체급은 좋으나(+2점), 쌀피엠 46등(-2점)에 극딜 비중 꼴등(-2점). 피로도 대비 효율이 너무 나쁨.'
    },
    {
        rank: 21,
        job: '루미너스',
        score: 5.0,
        rawScore: '[원점수 0점]',
        reason: '최소컷 높고 쿨감/재사용 모두 필요해(-2점, -1점) 세팅 난이도가 높음. 0점이지만, 비추천 직업보다는 나음.'
    },

    // C급 - 평균 이하 (4-5점)
    {
        rank: 22,
        job: '제로',
        score: 4.5,
        rawScore: '',
        reason: '성능은 좋으나 딜 사이클 어렵고 쿨 의존도 있음.'
    },
    {
        rank: 23,
        job: '호영',
        score: 4.5,
        rawScore: '',
        reason: '구조 개선됐으나 쌀피엠 순위가 낮음.'
    },
    {
        rank: 24,
        job: '듀얼블레이드',
        score: 4.5,
        rawScore: '',
        reason: '성능 준수하나 쿨감 의존도가 높은 편.'
    },
    {
        rank: 25,
        job: '섀도어',
        score: 4.5,
        rawScore: '',
        reason: '딜 좋으나 손목 아픔, 극딜 비중 낮음.'
    },
    {
        rank: 26,
        job: '나이트로드',
        score: 4.5,
        rawScore: '',
        reason: '극딜 1황이나 저스펙 효율 안 좋고 쌀피엠 순위 낮음.'
    },
    {
        rank: 27,
        job: '아크메이지(불,독)',
        score: 4.5,
        rawScore: '',
        reason: '벞지 이슈는 해결됐으나 쿨뚝 의존도가 여전히 높음.'
    },
    {
        rank: 28,
        job: '와일드헌터',
        score: 4.5,
        rawScore: '',
        reason: '쉽고 세지만 쿨감 의존도가 매우 높음.'
    },
    {
        rank: 29,
        job: '팬텀',
        score: 4.5,
        rawScore: '',
        reason: '쿨감 없으면 체급 급락. 고점 플레이 까다로움.'
    },
    {
        rank: 30,
        job: '카데나',
        score: 4.5,
        rawScore: '',
        reason: '딜은 1등이나 난이도가 메이플 최고 수준 (뉴비 비추).'
    },
    {
        rank: 31,
        job: '칼리',
        score: 4.5,
        rawScore: '',
        reason: '너프 후 고저점 심하고 피로도 높음.'
    },
    {
        rank: 32,
        job: '제논',
        score: 4.5,
        rawScore: '',
        reason: '쿨감 의존도 높아졌고 올스탯 매물 구하기 힘듦.'
    },
    {
        rank: 33,
        job: '신궁',
        score: 4.5,
        rawScore: '',
        reason: '답답한 조작감, 세렌 보스 기록 안 좋음. 쿨감 낮은 것이 장점이나 추천하기 어려움'
    },
    {
        rank: 34,
        job: '패스파인더',
        score: 4.5,
        rawScore: '',
        reason: '조작감 별로고 쿨감 의존도 꽤 높음.'
    },
    {
        rank: 35,
        job: '카이저',
        score: 4.5,
        rawScore: '',
        reason: '5초 쿨 없으면 딜 안 나옴. 쿨뚝 필수 직업.'
    },
    {
        rank: 36,
        job: '아델',
        score: 3.0,
        rawScore: '[원점수 -2점]',
        reason: '쌀피엠(저레벨 헥사) 낮고 2초 뚝 필수. 재사용까지 써야 해서 챌린저스에서 힘듦.'
    },
    {
        rank: 37,
        job: '엔젤릭버스터',
        score: 3.0,
        rawScore: '',
        reason: '유틸 좋고 쉬우나 딜 체급이 너무 낮음 (최근 평가 하락).'
    },
    {
        rank: 38,
        job: '다크나이트',
        score: 2.5,
        rawScore: '[원점수 -3점]',
        reason: '최소컷이 너무 높고(5.1~5.2), 극딜 비중 낮고, 쿨감 의존도 심함(-2점). 리인카 스킬이 좋지만 비추천'
    },
    {
        rank: 39,
        job: '미하일',
        score: 2.0,
        rawScore: '',
        reason: '쌀피엠 순위가 낮고, 쿨뚝 의존도가 높고, 리레링(극딜) 사용량도 낮으며 체급도 높지 않아 비추천'
    },
    {
        rank: 40,
        job: '데몬어벤져',
        score: 2.0,
        rawScore: '',
        reason: 'HP 아이템을 사용하는 유일한 직업으로 리스크가 매우 클 수 있음.'
    },
    {
        rank: 41,
        job: '나이트워커',
        score: 2.0,
        rawScore: '',
        reason: '체급이 많이 떨어진다는 평가가 많고, 특유의 조작감이 불호가 많음'
    },
    {
        rank: 42,
        job: '데몬슬레이어',
        score: 2.0,
        rawScore: '',
        reason: '딜 체급이 엄청 약하다는 평가가 많음. 비추천'
    },
    {
        rank: 43,
        job: '히어로',
        score: 1.5,
        rawScore: '',
        reason: '현재 체급이 매우 낮다는 평가가 많고, 고스펙 유저의 이탈이 두드러짐.'
    },
    {
        rank: 44,
        job: '블래스터',
        score: 1.5,
        rawScore: '',
        reason: '보스/사냥 컨트롤이 최상위권으로 매우 어려움. 블래스터의 조작감 하나만으로도 불호가 매우 많음.'
    },
    {
        rank: 45,
        job: '키네시스',
        score: 1.5,
        rawScore: '',
        reason: '스펙 높아도 약하다는 평가가 많음. 체급도 높지 않은 편이라는 평가가 많아서 비추천'
    },
    {
        rank: 46,
        job: '메카닉',
        score: 1.5,
        rawScore: '',
        reason: '쿨뚝 필수, 체급이 낮음, 조작감이 불호가 많은 편. 유저 수도 적어서 비추천'
    },
    {
        rank: 47,
        job: '에반',
        score: 1.0,
        rawScore: '[최하위]',
        reason: '쌀피엠 꼴등, 난이도 최상, 극딜 낮음. 챌린저스 월드에서는 비추천 직업'
    }
];

/**
 * 직업명으로 유튜버 순위 조회
 */
export function getYoutuberRanking(jobName: string): YoutuberJobRanking | undefined {
    return YOUTUBER_JOB_RANKING.find(item => item.job === jobName);
}

/**
 * 유튜버 순위 통계
 */
export function getYoutuberRankingStats() {
    const sPlus = YOUTUBER_JOB_RANKING.filter(j => j.score >= 10.0).length;
    const s = YOUTUBER_JOB_RANKING.filter(j => j.score >= 9.0 && j.score < 10.0).length;
    const aPlus = YOUTUBER_JOB_RANKING.filter(j => j.score >= 8.0 && j.score < 9.0).length;
    const a = YOUTUBER_JOB_RANKING.filter(j => j.score >= 7.0 && j.score < 8.0).length;
    const b = YOUTUBER_JOB_RANKING.filter(j => j.score >= 5.0 && j.score < 7.0).length;
    const c = YOUTUBER_JOB_RANKING.filter(j => j.score >= 4.0 && j.score < 5.0).length;
    const d = YOUTUBER_JOB_RANKING.filter(j => j.score >= 2.5 && j.score < 4.0).length;
    const f = YOUTUBER_JOB_RANKING.filter(j => j.score < 2.5).length;

    return {
        total: YOUTUBER_JOB_RANKING.length,
        sPlus, s, aPlus, a, b, c, d, f,
        tiers: {
            'S+': { count: sPlus, range: '10.0점' },
            'S': { count: s, range: '9.0-9.9점' },
            'A+': { count: aPlus, range: '8.0-8.9점' },
            'A': { count: a, range: '7.0-7.9점' },
            'B': { count: b, range: '5.0-6.9점' },
            'C': { count: c, range: '4.0-4.9점' },
            'D': { count: d, range: '2.5-3.9점' },
            'F': { count: f, range: '1.0-2.4점' }
        }
    };
}
