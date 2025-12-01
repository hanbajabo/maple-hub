/**
 * 아이템 분류 시스템 (Item Classifier)
 * 
 * 모든 아이템 식별 로직을 중앙 집중식으로 관리합니다.
 * 새로운 아이템 키워드를 추가할 때 이 파일만 수정하면 전체 시스템에 반영됩니다.
 */

// ============================================================================
// 아이템 세트별 분류
// ============================================================================

/**
 * 펜살리르/우트가르드 아이템인지 확인
 * - 펜살리르: 120레벨 세트 장비
 * - 우트가르드: 펜살리르 세트의 무기 이름
 */
export const isPensalirItem = (itemName: string): boolean => {
    if (!itemName) return false;
    return itemName.includes('펜살리르') || itemName.includes('우트가르드');
};

/**
 * 아케인셰이드 아이템인지 확인
 * - 200레벨 최상위 세트 장비
 */
export const isArcaneItem = (itemName: string): boolean => {
    if (!itemName) return false;
    return itemName.includes('아케인셰이드');
};

/**
 * 제네시스 무기/방어구인지 확인
 * - 검은 마법사 격파 보상 아이템
 */
export const isGenesisItem = (itemName: string): boolean => {
    if (!itemName) return false;
    return itemName.includes('제네시스');
};

/**
 * 앱솔랩스 아이템인지 확인
 * - 160레벨 세트 장비
 */
export const isAbsoLabItem = (itemName: string): boolean => {
    if (!itemName) return false;
    return itemName.includes('앱솔랩스');
};

/**
 * 파프니르 아이템인지 확인
 * - 150레벨 세트 장비 (루트 어비스)
 */
export const isFafnirItem = (itemName: string): boolean => {
    if (!itemName) return false;
    return itemName.includes('파프니르');
};

/**
 * 에테르넬 세트인지 확인
 * - 최상위 방어구 세트
 */
export const isEternalItem = (itemName: string): boolean => {
    if (!itemName) return false;
    return itemName.includes('에테르넬');
};

/**
 * 도전자 세트인지 확인
 * - 신규/복귀 유저용 스타터 장비
 */
export const isChallengerItem = (itemName: string): boolean => {
    if (!itemName) return false;
    return itemName.includes('도전자');
};

// ============================================================================
// 보스 장신구 분류
// ============================================================================

/**
 * 광휘의 보스 세트 (상급)
 */
export const isBrilliantBossItem = (itemName: string): boolean => {
    if (!itemName) return false;
    const brilliantBossSet = ['근원의 속삭임', '죽음의 맹세', '불멸의 유산'];
    return brilliantBossSet.some(name => itemName.includes(name));
};

/**
 * 칠흑의 보스 세트 (최상급)
 */
export const isPitchBossItem = (itemName: string): boolean => {
    if (!itemName) return false;
    const pitchBossSet = [
        '창세의 뱃지', '저주받은 마도서', '미트라의 분노',
        '고통의 근원', '몽환의 벨트', '루즈 컨트롤 머신 마크', '마력이 깃든 안대',
        '커맨더 포스 이어링', '거대한 공포'
    ];
    return pitchBossSet.some(name => itemName.includes(name));
};

/**
 * 여명의 보스 세트 (중급)
 */
export const isDawnBossItem = (itemName: string): boolean => {
    if (!itemName) return false;
    const dawnSet = ['트와일라이트 마크', '에스텔라 이어링', '데이브레이크 펜던트', '여명의 가디언 엔젤 링'];
    return dawnSet.some(name => itemName.includes(name));
};

// ============================================================================
// 특수 무기 분류
// ============================================================================

/**
 * 제로 무기인지 확인
 */
export const isZeroWeapon = (itemName: string): boolean => {
    if (!itemName) return false;
    return itemName.includes('라피스') || itemName.includes('라즐리');
};

// ============================================================================
// 아이템 등급 판별 (종합)
// ============================================================================

/**
 * 명품/고급 아이템인지 확인
 */
export const isLuxuryItem = (itemName: string): boolean => {
    return isGenesisItem(itemName) ||
        isEternalItem(itemName) ||
        isPitchBossItem(itemName) ||
        isBrilliantBossItem(itemName);
};

/**
 * 종결급 아이템인지 확인
 */
export const isEndGameItem = (itemName: string): boolean => {
    return isGenesisItem(itemName) ||
        isEternalItem(itemName) ||
        isPitchBossItem(itemName) ||
        isBrilliantBossItem(itemName) ||
        isArcaneItem(itemName);
};

/**
 * 스타터/입문용 아이템인지 확인
 */
export const isStarterItem = (itemName: string): boolean => {
    return isChallengerItem(itemName);
};

/**
 * 투자 비권장 아이템인지 확인 (교체 대상)
 */
export const isReplaceableItem = (itemName: string): boolean => {
    return isPensalirItem(itemName);
};

// ============================================================================
// 유틸리티 함수
// ============================================================================

/**
 * 아이템의 티어(등급)를 문자열로 반환
 */
export const getItemTier = (itemName: string): string => {
    if (isGenesisItem(itemName)) return '최상급 (제네시스)';
    if (isEternalItem(itemName)) return '최상급 (에테르넬)';
    if (isPitchBossItem(itemName)) return '상급 (칠흑)';
    if (isBrilliantBossItem(itemName)) return '상급 (광휘)';
    if (isArcaneItem(itemName)) return '상급 (아케인셰이드)';
    if (isDawnBossItem(itemName)) return '중급 (여명)';
    if (isAbsoLabItem(itemName)) return '중급 (앱솔랩스)';
    if (isFafnirItem(itemName)) return '중급 (파프니르)';
    if (isPensalirItem(itemName)) return '하급 (펜살리르/우트가르드)';
    if (isChallengerItem(itemName)) return '입문 (도전자)';
    return '일반';
};
