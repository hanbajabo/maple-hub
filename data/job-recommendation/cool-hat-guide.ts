/**
 * 쿨타임 감소 모자(쿨뚝) 추천 가이드
 * 출처: https://maple.ai.kr/guide/cooltime-hat-guide
 * 
 * 분석 기준: 레벨 280+, 전투력 4억 이상 (초고스펙 유저 데이터)
 * 
 * 판단 기준:
 * - 추천 (O): 사용률 60% 이상
 * - 선택 (△): 사용률 30% ~ 60%
 * - 비추천 (X): 사용률 30% 미만
 */

export type CoolHatRecommendation = 'O' | '△' | 'X';

export interface CoolHatGuide {
    job: string;
    recommendation: CoolHatRecommendation;
    usageRate: number;
    note: string;
}

export const COOL_HAT_GUIDE_DATA: CoolHatGuide[] = [
    { job: '아크메이지(불,독)', recommendation: 'O', usageRate: 100, note: '쿨뚝 필수' },
    { job: '플레임위자드', recommendation: 'O', usageRate: 100, note: '쿨뚝 필수' },
    { job: '루미너스', recommendation: 'O', usageRate: 100, note: '쿨뚝 필수' },
    { job: '배틀메이지', recommendation: 'O', usageRate: 94.5, note: '쿨뚝 강력 추천' },
    { job: '은월', recommendation: 'O', usageRate: 84.5, note: '쿨뚝 강력 추천' },
    { job: '미하일', recommendation: 'O', usageRate: 81.8, note: '쿨뚝 강력 추천' },
    { job: '다크나이트', recommendation: 'O', usageRate: 78.8, note: '쿨뚝 강력 추천' },
    { job: '렌', recommendation: 'O', usageRate: 78.0, note: '쿨뚝 강력 추천' },
    { job: '카이저', recommendation: 'O', usageRate: 77.8, note: '쿨뚝 강력 추천' },
    { job: '듀얼블레이드', recommendation: 'O', usageRate: 100, note: '쿨뚝 필수' },
    { job: '와일드헌터', recommendation: 'O', usageRate: 96.0, note: '쿨뚝 강력 추천' },
    { job: '패스파인더', recommendation: 'O', usageRate: 81.8, note: '쿨뚝 강력 추천' },
    { job: '캐논슈터', recommendation: 'O', usageRate: 66.7, note: '쿨뚝 추천' },
    { job: '에반', recommendation: 'O', usageRate: 100, note: '쿨뚝 필수' },
    { job: '메카닉', recommendation: 'O', usageRate: 100, note: '쿨뚝 필수' },
    { job: '일리움', recommendation: 'O', usageRate: 83.7, note: '쿨뚝 강력 추천' },
    { job: '라라', recommendation: 'O', usageRate: 82.4, note: '쿨뚝 강력 추천' },
    { job: '아크', recommendation: 'O', usageRate: 70.4, note: '쿨뚝 추천' },
    { job: '호영', recommendation: 'O', usageRate: 70.0, note: '쿨뚝 추천' },
    { job: '제논', recommendation: 'O', usageRate: 68.8, note: '쿨뚝 추천' },
    { job: '키네시스', recommendation: 'O', usageRate: 60.0, note: '쿨뚝 추천' },

    { job: '윈드브레이커', recommendation: '△', usageRate: 58.6, note: '쿨뚝 선택형' },
    { job: '아델', recommendation: '△', usageRate: 57.1, note: '쿨뚝 선택형' },
    { job: '팬텀', recommendation: '△', usageRate: 55.6, note: '쿨뚝 선택형' },
    { job: '제로', recommendation: '△', usageRate: 42.9, note: '쿨뚝 선택형' },
    { job: '팔라딘', recommendation: '△', usageRate: 38.9, note: '쿨뚝 선택형' },
    { job: '카인', recommendation: '△', usageRate: 37.5, note: '쿨뚝 선택형' },
    { job: '히어로', recommendation: '△', usageRate: 33.3, note: '쿨뚝 선택형' },

    { job: '나이트로드', recommendation: 'X', usageRate: 29.7, note: '쿨뚝 비추천' },
    { job: '섀도어', recommendation: 'X', usageRate: 23.5, note: '쿨뚝 비추천' },
    { job: '나이트워커', recommendation: 'X', usageRate: 21.4, note: '쿨뚝 비추천' },
    { job: '데몬슬레이어', recommendation: 'X', usageRate: 20.0, note: '쿨뚝 비추천' },
    { job: '데몬어벤져', recommendation: 'X', usageRate: 20.0, note: '쿨뚝 비추천' },
    { job: '아크메이지(썬,콜)', recommendation: 'X', usageRate: 18.5, note: '쿨뚝 비추천' },
    { job: '비숍', recommendation: 'X', usageRate: 17.2, note: '쿨뚝 비추천' },
    { job: '소울마스터', recommendation: 'X', usageRate: 14.3, note: '쿨뚝 비추천' },
    { job: '바이퍼', recommendation: 'X', usageRate: 13.3, note: '쿨뚝 비추천' },
    { job: '칼리', recommendation: 'X', usageRate: 12.5, note: '쿨뚝 비추천' },
    { job: '카데나', recommendation: 'X', usageRate: 10.0, note: '쿨뚝 비추천' },
    { job: '메르세데스', recommendation: 'X', usageRate: 9.1, note: '쿨뚝 비추천' },
    { job: '보우마스터', recommendation: 'X', usageRate: 8.3, note: '쿨뚝 비추천' },
    { job: '신궁', recommendation: 'X', usageRate: 7.7, note: '쿨뚝 비추천' },
    { job: '엔젤릭버스터', recommendation: 'X', usageRate: 7.1, note: '쿨뚝 비추천' },
    { job: '스트라이커', recommendation: 'X', usageRate: 5.9, note: '쿨뚝 비추천' },
    { job: '아란', recommendation: 'X', usageRate: 3.7, note: '쿨뚝 비추천' },
    { job: '블래스터', recommendation: 'X', usageRate: 0.0, note: '쿨뚝 비추천' },
    { job: '캡틴', recommendation: 'X', usageRate: 0.0, note: '쿨뚝 비추천' }
];

/**
 * 직업명으로 쿨뚝 추천 정보 조회
 */
export function getCoolHatRecommendation(jobName: string): CoolHatGuide | undefined {
    return COOL_HAT_GUIDE_DATA.find(item => item.job === jobName);
}

/**
 * 쿨뚝 추천도별 직업 수 통계
 */
export function getCoolHatStats() {
    const recommended = COOL_HAT_GUIDE_DATA.filter(item => item.recommendation === 'O').length;
    const optional = COOL_HAT_GUIDE_DATA.filter(item => item.recommendation === '△').length;
    const notRecommended = COOL_HAT_GUIDE_DATA.filter(item => item.recommendation === 'X').length;

    return {
        total: COOL_HAT_GUIDE_DATA.length,
        recommended,
        optional,
        notRecommended,
        categories: {
            'O': { count: recommended, label: '추천 (60%+)' },
            '△': { count: optional, label: '선택 (30-60%)' },
            'X': { count: notRecommended, label: '비추천 (30% 미만)' }
        }
    };
}

/**
 * 추천도 이모지 가져오기
 */
export function getRecommendationEmoji(recommendation: CoolHatRecommendation): string {
    switch (recommendation) {
        case 'O': return '✅';
        case '△': return '⚠️';
        case 'X': return '❌';
        default: return '❓';
    }
}

/**
 * 추천도 레이블 가져오기
 */
export function getRecommendationLabel(recommendation: CoolHatRecommendation): string {
    switch (recommendation) {
        case 'O': return '추천';
        case '△': return '선택';
        case 'X': return '비추천';
        default: return '알 수 없음';
    }
}
