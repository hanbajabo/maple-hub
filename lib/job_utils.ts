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
    const normalized = jobName.replace(/\s/g, ""); // 공백 제거 후 비교

    if (normalized.includes('아크메이지')) return true;
    if (normalized.includes('비숍')) return true;
    if (normalized.includes('플레임위자드')) return true;
    if (normalized.includes('에반')) return true;
    if (normalized.includes('루미너스')) return true;
    if (normalized.includes('배틀메이지')) return true;
    if (normalized.includes('키네시스')) return true;
    if (normalized.includes('일리움')) return true;
    if (normalized.includes('라라')) return true;
    if (normalized.includes('비스트테이머')) return true;
    if (normalized.includes('린')) return true;

    return MAGIC_ATTACK_JOBS.includes(jobName);
}

export function getJobMainStat(jobName: string): string[] {
    if (!jobName) return ['STR', 'DEX', 'INT', 'LUK']; // 정보 없으면 모두 유효 처리

    const normalized = jobName.replace(/\s/g, "");

    if (normalized.includes('데몬어벤져')) return ['HP'];
    if (normalized.includes('제논')) return ['STR', 'DEX', 'LUK'];

    // INT Jobs (Magic jobs)
    if (isMagicJob(jobName)) {
        return ['INT'];
    }

    // STR Jobs
    if (['히어로', '팔라딘', '다크나이트', '소울마스터', '미하일', '블래스터', '데몬슬레이어', '아란', '카이저', '아델', '제로', '바이퍼', '캐논슈터', '캐논마스터', '스트라이커', '은월', '아크', '렌'].some(k => normalized.includes(k))) {
        return ['STR'];
    }
    // DEX Jobs
    if (['보우마스터', '신궁', '패스파인더', '윈드브레이커', '와일드헌터', '메르세데스', '카인', '캡틴', '메카닉', '엔젤릭버스터'].some(k => normalized.includes(k))) {
        return ['DEX'];
    }
    // LUK Jobs
    if (['나이트로드', '섀도어', '듀얼블레이드', '듀얼블레이더', '나이트워커', '팬텀', '카데나', '칼리', '호영'].some(k => normalized.includes(k))) {
        return ['LUK'];
    }

    return ['STR', 'DEX', 'INT', 'LUK']; // Fallback
}
