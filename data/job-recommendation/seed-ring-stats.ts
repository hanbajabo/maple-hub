/**
 * 직업별 시드링 사용 통계 (전투력 4억 이상 기준)
 * 
 * 데이터 제공: MapleScouter (2025.12.12)
 * 
 * 주요 필드:
 * - restraint: 리스트레인트 링 사용률 (%)
 * - continuous: 컨티뉴어스 링 사용률 (%)
 * - weaponPuff: 웨폰퍼프 링 (S/I/D/L 합산) 사용률 (%)
 * - others: 그 외 (링썸, 리스크테이커 등)
 */

export interface SeedRingStat {
    job: string;
    restraint: number;  // 리레링
    continuous: number; // 컨티링
    weaponPuff: number; // 웨폰퍼프
    riskTaker: number;  // 리스크테이커
    ringOfSum: number;  // 링 오브 썸
    note: string;       // 특이사항 (주요 사용 링 요약)
}

export const SEED_RING_STATS: SeedRingStat[] = [
    { job: '히어로', restraint: 92.2, continuous: 1.0, weaponPuff: 6.9, riskTaker: 0, ringOfSum: 0, note: '리레링 압도적 (92%)' },
    { job: '팔라딘', restraint: 90.0, continuous: 0, weaponPuff: 7.1, riskTaker: 2.9, ringOfSum: 0, note: '리레링 압도적 (90%)' },
    { job: '다크나이트', restraint: 27.3, continuous: 72.7, weaponPuff: 0, riskTaker: 0, ringOfSum: 0, note: '컨티링 위주 (73%)' },
    { job: '아크메이지(불,독)', restraint: 4.5, continuous: 95.5, weaponPuff: 0, riskTaker: 0, ringOfSum: 0, note: '컨티링 필수 수준 (96%)' },
    { job: '아크메이지(썬,콜)', restraint: 92.4, continuous: 2.9, weaponPuff: 4.8, riskTaker: 0, ringOfSum: 0, note: '리레링 압도적 (92%)' },
    { job: '비숍', restraint: 63.1, continuous: 30.4, weaponPuff: 6.5, riskTaker: 0, ringOfSum: 0, note: '리레링 위주이나 컨티링도 30% 사용' },
    { job: '보우마스터', restraint: 14.0, continuous: 86.0, weaponPuff: 0, riskTaker: 0, ringOfSum: 0, note: '컨티링 압도적 (86%)' },
    { job: '신궁', restraint: 88.9, continuous: 5.6, weaponPuff: 5.6, riskTaker: 0, ringOfSum: 0, note: '리레링 압도적 (89%)' },
    { job: '패스파인더', restraint: 90.9, continuous: 5.5, weaponPuff: 3.6, riskTaker: 0, ringOfSum: 0, note: '리레링 압도적 (91%)' },
    { job: '나이트로드', restraint: 94.7, continuous: 0.7, weaponPuff: 0.3, riskTaker: 0, ringOfSum: 4.3, note: '리레링 필수 수준 (95%)' },
    { job: '섀도어', restraint: 79.7, continuous: 14.1, weaponPuff: 6.3, riskTaker: 0, ringOfSum: 0, note: '리레링 위주 (80%)' },
    { job: '듀얼블레이드', restraint: 92.4, continuous: 0, weaponPuff: 7.6, riskTaker: 0, ringOfSum: 0, note: '리레링 압도적 (92%)' },
    { job: '바이퍼', restraint: 34.0, continuous: 66.0, weaponPuff: 0, riskTaker: 0, ringOfSum: 0, note: '컨티링 선호 (66%)' },
    { job: '캡틴', restraint: 69.6, continuous: 30.4, weaponPuff: 0, riskTaker: 0, ringOfSum: 0, note: '리레링 선호 (70%)' },
    { job: '캐논마스터', restraint: 91.7, continuous: 0, weaponPuff: 8.3, riskTaker: 0, ringOfSum: 0, note: '리레링 압도적 (92%)' },
    { job: '미하일', restraint: 68.8, continuous: 31.3, weaponPuff: 0, riskTaker: 0, ringOfSum: 0, note: '리레링 선호 (69%)' },
    { job: '소울마스터', restraint: 86.2, continuous: 6.2, weaponPuff: 7.7, riskTaker: 0, ringOfSum: 0, note: '리레링 압도적 (86%)' },
    { job: '플레임위자드', restraint: 90.9, continuous: 4.5, weaponPuff: 4.5, riskTaker: 0, ringOfSum: 0, note: '리레링 압도적 (91%)' },
    { job: '윈드브레이커', restraint: 81.5, continuous: 11.1, weaponPuff: 6.2, riskTaker: 1.2, ringOfSum: 0, note: '리레링 선호 (82%)' },
    { job: '나이트워커', restraint: 91.8, continuous: 0, weaponPuff: 2.4, riskTaker: 0, ringOfSum: 5.9, note: '리레링 압도적 (92%)' },
    { job: '스트라이커', restraint: 23.5, continuous: 76.5, weaponPuff: 0, riskTaker: 0, ringOfSum: 0, note: '컨티링 위주 (77%)' },
    { job: '아란', restraint: 95.2, continuous: 0, weaponPuff: 4.8, riskTaker: 0, ringOfSum: 0, note: '리레링 필수 수준 (95%)' },
    { job: '에반', restraint: 4.5, continuous: 95.5, weaponPuff: 0, riskTaker: 0, ringOfSum: 0, note: '컨티링 필수 수준 (96%)' },
    { job: '루미너스', restraint: 86.2, continuous: 10.3, weaponPuff: 3.5, riskTaker: 0, ringOfSum: 0, note: '리레링 압도적 (86%)' },
    { job: '메르세데스', restraint: 94.3, continuous: 0, weaponPuff: 5.7, riskTaker: 0, ringOfSum: 0, note: '리레링 필수 수준 (94%)' },
    { job: '팬텀', restraint: 20.5, continuous: 77.8, weaponPuff: 1.7, riskTaker: 0, ringOfSum: 0, note: '컨티링 위주 (78%)' },
    { job: '은월', restraint: 91.1, continuous: 3.6, weaponPuff: 5.4, riskTaker: 0, ringOfSum: 0, note: '리레링 압도적 (91%)' },
    { job: '블래스터', restraint: 26.1, continuous: 69.6, weaponPuff: 4.3, riskTaker: 0, ringOfSum: 0, note: '컨티링 선호 (70%)' },
    { job: '배틀메이지', restraint: 64.3, continuous: 21.4, weaponPuff: 14.3, riskTaker: 0, ringOfSum: 0, note: '리레링 선호 (64%)' },
    { job: '와일드헌터', restraint: 83.3, continuous: 0, weaponPuff: 16.7, riskTaker: 0, ringOfSum: 0, note: '리레링 압도적 (83%)' },
    { job: '메카닉', restraint: 40.0, continuous: 60.0, weaponPuff: 0, riskTaker: 0, ringOfSum: 0, note: '컨티링 선호 (60%)' },
    { job: '제논', restraint: 97.4, continuous: 1.3, weaponPuff: 0, riskTaker: 0, ringOfSum: 1.3, note: '리레링 필수 수준 (97%)' },
    { job: '데몬슬레이어', restraint: 85.0, continuous: 12.5, weaponPuff: 2.5, riskTaker: 0, ringOfSum: 0, note: '리레링 압도적 (85%)' },
    { job: '데몬어벤져', restraint: 27.9, continuous: 71.3, weaponPuff: 0.8, riskTaker: 0, ringOfSum: 0, note: '컨티링 위주 (71%)' },
    { job: '카이저', restraint: 0, continuous: 100.0, weaponPuff: 0, riskTaker: 0, ringOfSum: 0, note: '컨티링 필수 (100%)' },
    { job: '카인', restraint: 88.6, continuous: 0, weaponPuff: 9.1, riskTaker: 0, ringOfSum: 2.3, note: '리레링 압도적 (89%)' },
    { job: '카데나', restraint: 85.4, continuous: 6.3, weaponPuff: 8.3, riskTaker: 0, ringOfSum: 0, note: '리레링 압도적 (85%)' },
    { job: '엔젤릭버스터', restraint: 83.0, continuous: 6.8, weaponPuff: 10.2, riskTaker: 0, ringOfSum: 0, note: '리레링 압도적 (83%)' },
    { job: '아델', restraint: 95.0, continuous: 0.5, weaponPuff: 4.5, riskTaker: 0, ringOfSum: 0, note: '리레링 필수 수준 (95%)' },
    { job: '일리움', restraint: 32.0, continuous: 64.0, weaponPuff: 4.0, riskTaker: 0, ringOfSum: 0, note: '컨티링 선호 (64%)' },
    { job: '아크', restraint: 94.4, continuous: 0, weaponPuff: 5.6, riskTaker: 0, ringOfSum: 0, note: '리레링 필수 수준 (94%)' },
    { job: '칼리', restraint: 87.0, continuous: 13.0, weaponPuff: 0, riskTaker: 0, ringOfSum: 0, note: '리레링 압도적 (87%)' },
    { job: '호영', restraint: 92.3, continuous: 0, weaponPuff: 0, riskTaker: 1.9, ringOfSum: 5.8, note: '리레링 필수 수준 (92%)' },
    { job: '라라', restraint: 88.5, continuous: 11.5, weaponPuff: 0, riskTaker: 0, ringOfSum: 0, note: '리레링 압도적 (89%)' },
    { job: '렌', restraint: 91.6, continuous: 2.1, weaponPuff: 6.3, riskTaker: 0, ringOfSum: 0, note: '리레링 필수 수준 (92%)' },
    { job: '키네시스', restraint: 84.2, continuous: 5.3, weaponPuff: 10.5, riskTaker: 0, ringOfSum: 0, note: '리레링 압도적 (84%)' },
    { job: '제로', restraint: 8.3, continuous: 91.7, weaponPuff: 0, riskTaker: 0, ringOfSum: 0, note: '컨티링 압도적 (92%)' }
];

/**
 * 직업명으로 시드링 통계 조회
 */
export function getSeedRingStat(jobName: string): SeedRingStat | undefined {
    return SEED_RING_STATS.find(item => item.job === jobName);
}
