import { StatType } from '../lib/potential-calculator';

export function getValidStatTypesForClass(characterClass: string): StatType[] {
    const commonStats: StatType[] = [
        'BOSS_DAMAGE', 'IGNORE_DEFENSE', 'CRITICAL_DAMAGE', 
        'COOL_DOWN', 'ITEM_DROP', 'MESO_OBTAIN', 'DAMAGE', 'ALL %'
    ];
    
    // 제논 (올스탯%만 주스탯으로 인정, 단일 STR/DEX/LUK%는 유효 옵션에서 제외)
    if (characterClass === '제논') {
        return [...commonStats, 'ATTACK %', 'ATTACK'];
    }
    
    // 데몬어벤져
    if (characterClass === '데몬어벤져') {
        return [...commonStats, 'HP %', 'ATTACK %', 'ATTACK'];
    }
    
    // 마력 직업군 (법사 등)
    const mageClasses = ['아크메이지(불,독)', '아크메이지(썬,콜)', '비숍', '플레임위자드', '에반', '루미너스', '배틀메이지', '키네시스', '일리움', '라라', '레테', '린'];
    if (mageClasses.some(m => characterClass.includes(m))) {
        return [...commonStats, 'INT %', 'MAGIC_ATTACK %', 'MAGIC_ATTACK', 'INT_PER_LEVEL'];
    }
    
    // 궁수/해적(DEX)
    const dexClasses = ['보우마스터', '신궁', '패스파인더', '윈드브레이커', '메르세데스', '와일드헌터', '카인', '캡틴', '메카닉', '엔젤릭버스터'];
    if (dexClasses.some(d => characterClass.includes(d))) {
        return [...commonStats, 'DEX %', 'ATTACK %', 'ATTACK', 'DEX_PER_LEVEL'];
    }
    
    // 도적(LUK)
    const lukClasses = ['나이트로드', '섀도어', '듀얼블레이드', '듀얼블레이더', '나이트워커', '팬텀', '카데나', '칼리', '호영'];
    if (lukClasses.some(l => characterClass.includes(l))) {
        return [...commonStats, 'LUK %', 'ATTACK %', 'ATTACK', 'LUK_PER_LEVEL'];
    }
    
    // 해적(STR) - 바이퍼, 캐논슈터, 스트라이커, 은월, 아크
    // 전사(STR) - 히어로, 팔라딘, 다크나이트, 소울마스터, 미하일, 아란, 블래스터, 데몬슬레이어, 카이저, 아델, 제로, 렌
    // Default to STR
    return [...commonStats, 'STR %', 'ATTACK %', 'ATTACK', 'STR_PER_LEVEL'];
}

export function getMainStatTypesForClass(characterClass: string): { pct: StatType[], flat: StatType[], perLevel: StatType[] } {
    if (characterClass === '제논') return { pct: ['ALL %'], flat: ['ALL'], perLevel: [] };
    if (characterClass === '데몬어벤져') return { pct: ['HP %'], flat: ['HP'], perLevel: [] };
    
    const mageClasses = ['아크메이지(불,독)', '아크메이지(썬,콜)', '비숍', '플레임위자드', '에반', '루미너스', '배틀메이지', '키네시스', '일리움', '라라', '레테', '린'];
    if (mageClasses.some(m => characterClass.includes(m))) return { pct: ['INT %'], flat: ['INT'], perLevel: ['INT_PER_LEVEL'] };
    
    const dexClasses = ['보우마스터', '신궁', '패스파인더', '윈드브레이커', '메르세데스', '와일드헌터', '카인', '캡틴', '메카닉', '엔젤릭버스터'];
    if (dexClasses.some(d => characterClass.includes(d))) return { pct: ['DEX %'], flat: ['DEX'], perLevel: ['DEX_PER_LEVEL'] };
    
    const lukClasses = ['나이트로드', '섀도어', '듀얼블레이드', '듀얼블레이더', '나이트워커', '팬텀', '카데나', '칼리', '호영'];
    if (lukClasses.some(l => characterClass.includes(l))) return { pct: ['LUK %'], flat: ['LUK'], perLevel: ['LUK_PER_LEVEL'] };
    
    return { pct: ['STR %'], flat: ['STR'], perLevel: ['STR_PER_LEVEL'] };
}
