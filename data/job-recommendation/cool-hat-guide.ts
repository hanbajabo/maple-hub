/**
 * 쿨타임 감소 모자(쿨뚝) 추천 가이드
 * 
 * 분석 기준: 레벨 280+, 전투력 4억 이상 (초고스펙 유저 데이터)
 * 
 * 판단 기준(쿨타임 감소 모자 -2초 이상 사용 비율):
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
    { job: '히어로', recommendation: 'O', usageRate: 92.5, note: '압도적 사용률. 쿨뚝 필수' },
    { job: '팔라딘', recommendation: '△', usageRate: 58.4, note: '반반이지만 쿨뚝 채용률이 꽤 높음' },
    { job: '다크나이트', recommendation: 'O', usageRate: 98.7, note: '안 쓰면 간첩 수준' },
    { job: '아크메이지(불,독)', recommendation: 'O', usageRate: 100, note: '데이터상 전원 사용 중' },
    { job: '아크메이지(썬,콜)', recommendation: '△', usageRate: 52.7, note: '취향의 영역' },
    { job: '비숍', recommendation: 'X', usageRate: 22.0, note: '주스탯 모자가 정배' },
    { job: '보우마스터', recommendation: 'X', usageRate: 5.1, note: '쿨뚝 효율 없음' },
    { job: '신궁', recommendation: 'X', usageRate: 11.1, note: '쿨뚝 효율 없음' },
    { job: '패스파인더', recommendation: 'O', usageRate: 91.1, note: '고스펙은 거의 다 쿨뚝 사용' },
    { job: '나이트로드', recommendation: '△', usageRate: 36.9, note: '의외로 고스펙에서 쿨뚝 채용률이 있음' },
    { job: '섀도어', recommendation: 'O', usageRate: 98.5, note: '쿨뚝 필수' },
    { job: '듀얼블레이드', recommendation: 'O', usageRate: 100, note: '쿨뚝 필수' }, // 원본 자료명 유지 (듀블)
    { job: '바이퍼', recommendation: 'X', usageRate: 18.5, note: '주스탯 모자가 정배' },
    { job: '캡틴', recommendation: '△', usageRate: 45.8, note: '취향 차이' },
    { job: '캐논마스터', recommendation: 'O', usageRate: 62.7, note: '고스펙은 쿨뚝 선호' },
    { job: '미하일', recommendation: 'O', usageRate: 87.5, note: '쿨뚝 필수' },
    { job: '소울마스터', recommendation: '△', usageRate: 44.1, note: '취향 차이' },
    { job: '플레임위자드', recommendation: 'O', usageRate: 91.3, note: '쿨뚝 필수' },
    { job: '윈드브레이커', recommendation: 'O', usageRate: 97.6, note: '쿨뚝 필수' },
    { job: '나이트워커', recommendation: 'X', usageRate: 28.7, note: '주스탯 모자가 정배 (아슬아슬하게 비추천)' },
    { job: '스트라이커', recommendation: 'O', usageRate: 70.6, note: '쿨뚝 선호' },
    { job: '아란', recommendation: 'X', usageRate: 17.2, note: '주스탯 모자가 정배' },
    { job: '에반', recommendation: 'O', usageRate: 88.1, note: '쿨뚝 필수' },
    { job: '루미너스', recommendation: 'O', usageRate: 100, note: '쿨뚝 필수' },
    { job: '메르세데스', recommendation: 'O', usageRate: 93.3, note: '쿨뚝 필수' },
    { job: '팬텀', recommendation: 'O', usageRate: 100, note: '쿨뚝 필수' },
    { job: '은월', recommendation: 'O', usageRate: 98.3, note: '쿨뚝 필수' },
    { job: '블래스터', recommendation: 'X', usageRate: 21.7, note: '주스탯 모자가 정배' },
    { job: '배틀메이지', recommendation: '△', usageRate: 33.3, note: '취향 차이 (간당간당하게 선택)' },
    { job: '와일드헌터', recommendation: 'O', usageRate: 92.3, note: '쿨뚝 필수' },
    { job: '메카닉', recommendation: 'O', usageRate: 100, note: '쿨뚝 필수' },
    { job: '제논', recommendation: 'O', usageRate: 82.5, note: '쿨뚝 필수' },
    { job: '데몬슬레이어', recommendation: 'X', usageRate: 23.8, note: '주스탯 모자가 정배' },
    { job: '데몬어벤져', recommendation: 'O', usageRate: 94.4, note: '쿨뚝 필수' },
    { job: '카이저', recommendation: 'O', usageRate: 84.4, note: '쿨뚝 필수' },
    { job: '카인', recommendation: 'O', usageRate: 81.8, note: '쿨뚝 필수' },
    { job: '카데나', recommendation: 'O', usageRate: 100, note: '쿨뚝 필수' },
    { job: '엔젤릭버스터', recommendation: 'O', usageRate: 98.4, note: '쿨뚝 필수' },
    { job: '아델', recommendation: 'O', usageRate: 99.0, note: '쿨뚝 필수' },
    { job: '일리움', recommendation: 'O', usageRate: 61.5, note: '쿨뚝 선호 (턱걸이 추천)' },
    { job: '아크', recommendation: 'O', usageRate: 94.5, note: '쿨뚝 필수' },
    { job: '칼리', recommendation: 'O', usageRate: 100, note: '쿨뚝 필수' },
    { job: '호영', recommendation: '△', usageRate: 30.8, note: '딱 30% 턱걸이 선택' },
    { job: '라라', recommendation: '△', usageRate: 48.1, note: '취향 차이' },
    { job: '렌', recommendation: 'O', usageRate: 89.6, note: '쿨뚝 필수 (고스펙 기준)' },
    { job: '키네시스', recommendation: 'X', usageRate: 25.0, note: '주스탯 모자가 정배' },
    { job: '제로', recommendation: 'O', usageRate: 100, note: '쿨뚝 필수' }
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
