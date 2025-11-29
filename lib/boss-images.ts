export const BOSS_IMAGES = {
    ZAKUM: '/images/bosses/zakum.png',
    MAGNUS: '/images/bosses/magnus.png',
    HILLA: '/images/bosses/hilla.png',
    PAPULATUS: '/images/bosses/papulatus.png',
    PIERRE: '/images/bosses/pierre.png',
    BANBAN: '/images/bosses/banban.png',
    BLOODY_QUEEN: '/images/bosses/bloody-queen.png',
    VELLUM: '/images/bosses/vellum.png',
    PINK_BEAN: '/images/bosses/pink-bean.png',
    CYGNUS: '/images/bosses/cygnus.png',
    LOTUS: '/images/bosses/lotus.png',
    DAMIEN: '/images/bosses/damien.png',
    GUARDIAN_ANGEL_SLIME: '/images/bosses/guardian-angel-slime.png',
    LUCID: '/images/bosses/lucid.png',
    WILL: '/images/bosses/will.png',
    DUSK: '/images/bosses/dusk.png',
    DUNKEL: '/images/bosses/dunkel.png',
    JIN_HILLA: '/images/bosses/jin-hilla.png',
    BLACK_MAGE: '/images/bosses/black-mage.png',
    SEREN: '/images/bosses/seren.png',
    KALOS: '/images/bosses/kalos.png',
    KALING: '/images/bosses/kaling.png',
    LIMBO: '/images/bosses/limbo.png',
    HORNTAIL: '/images/bosses/horntail.png',
    ARKARIUM: '/images/bosses/arkarium.png',
    VON_LEON: '/images/bosses/von-leon.png',
    BALDRIX: '/images/bosses/baldrix.png',
    BALROG: '/images/bosses/balrog.png',
    MONSTER_PARK_EXTREME: '/images/bosses/monster-park-extreme.png',
    FIRST_ADVERSARY: '/images/bosses/first-adversary.png',
    KAWOONG: '/images/bosses/kawoong.png',
} as const;

export type BossImageKey = keyof typeof BOSS_IMAGES;

// 한글 이름으로 이미지 경로 찾기 (유틸리티)
export const getBossImage = (koreanName: string): string => {
    const map: Record<string, string> = {
        "자쿰": BOSS_IMAGES.ZAKUM,
        "매그너스": BOSS_IMAGES.MAGNUS,
        "힐라": BOSS_IMAGES.HILLA,
        "파풀라투스": BOSS_IMAGES.PAPULATUS,
        "피에르": BOSS_IMAGES.PIERRE,
        "반반": BOSS_IMAGES.BANBAN,
        "블러디퀸": BOSS_IMAGES.BLOODY_QUEEN,
        "블러디 퀸": BOSS_IMAGES.BLOODY_QUEEN,
        "벨룸": BOSS_IMAGES.VELLUM,
        "핑크빈": BOSS_IMAGES.PINK_BEAN,
        "시그너스": BOSS_IMAGES.CYGNUS,
        "스우": BOSS_IMAGES.LOTUS,
        "데미안": BOSS_IMAGES.DAMIEN,
        "가디언 엔젤 슬라임": BOSS_IMAGES.GUARDIAN_ANGEL_SLIME,
        "가엔슬": BOSS_IMAGES.GUARDIAN_ANGEL_SLIME,
        "루시드": BOSS_IMAGES.LUCID,
        "윌": BOSS_IMAGES.WILL,
        "더스크": BOSS_IMAGES.DUSK,
        "듄켈": BOSS_IMAGES.DUNKEL,
        "친위대장 듄켈": BOSS_IMAGES.DUNKEL,
        "진 힐라": BOSS_IMAGES.JIN_HILLA,
        "진힐라": BOSS_IMAGES.JIN_HILLA,
        "검은 마법사": BOSS_IMAGES.BLACK_MAGE,
        "검은마법사": BOSS_IMAGES.BLACK_MAGE,
        "세렌": BOSS_IMAGES.SEREN,
        "선택받은 세렌": BOSS_IMAGES.SEREN,
        "칼로스": BOSS_IMAGES.KALOS,
        "감시자 칼로스": BOSS_IMAGES.KALOS,
        "카링": BOSS_IMAGES.KALING,
        "림보": BOSS_IMAGES.LIMBO,
        "혼테일": BOSS_IMAGES.HORNTAIL,
        "아카이럼": BOSS_IMAGES.ARKARIUM,
        "반 레온": BOSS_IMAGES.VON_LEON,
        "반레온": BOSS_IMAGES.VON_LEON,
        "발드릭스": BOSS_IMAGES.BALDRIX,
        "발록": BOSS_IMAGES.BALROG,
        "마왕 발록": BOSS_IMAGES.BALROG,
        "몬스터파크 익스트림": BOSS_IMAGES.MONSTER_PARK_EXTREME,
        "최초의 대적자": BOSS_IMAGES.FIRST_ADVERSARY,
        "카웅": BOSS_IMAGES.KAWOONG,
    };

    // 공백 제거 후 검색 시도
    const normalized = koreanName.replace(/\s+/g, '');
    for (const key in map) {
        if (key.replace(/\s+/g, '') === normalized) {
            return map[key];
        }
    }

    return ''; // 이미지가 없을 경우 빈 문자열 반환
};
