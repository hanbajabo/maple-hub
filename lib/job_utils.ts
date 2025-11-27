export const MAGIC_ATTACK_JOBS = [
    '아크메이지(불,독)',
    '아크메이지(썬,콜)',
    '비숍',
    '플레임위자드',
    '에반',
    '루미너스',
    '배틀메이지',
    '키네시스',
    '일리움',
    '라라',
    '비스트테이머',
    '린'
];

export function isMagicJob(jobName: string): boolean {
    if (!jobName) return false;
    return MAGIC_ATTACK_JOBS.includes(jobName);
}

export function getJobMainStat(jobName: string): string[] {
    if (!jobName) return ['STR', 'DEX', 'INT', 'LUK']; // 정보 없으면 모두 유효 처리

    if (jobName === '데몬어벤져') return ['HP'];
    if (jobName === '제논') return ['STR', 'DEX', 'LUK'];

    // STR Jobs
    if (['히어로', '팔라딘', '다크나이트', '소울마스터', '미하일', '블래스터', '데몬슬레이어', '아란', '카이저', '아델', '제로', '바이퍼', '캐논슈터', '스트라이커', '은월', '아크'].includes(jobName)) {
        return ['STR'];
    }
    // DEX Jobs
    if (['보우마스터', '신궁', '패스파인더', '윈드브레이커', '와일드헌터', '메르세데스', '카인', '캡틴', '메카닉', '엔젤릭버스터'].includes(jobName)) {
        return ['DEX'];
    }
    // INT Jobs (Magic jobs usually)
    if (MAGIC_ATTACK_JOBS.includes(jobName)) {
        return ['INT'];
    }
    // LUK Jobs
    if (['나이트로드', '섀도어', '듀얼블레이드', '나이트워커', '팬텀', '카데나', '칼리', '호영'].includes(jobName)) {
        return ['LUK'];
    }

    return ['STR', 'DEX', 'INT', 'LUK']; // Fallback
}
