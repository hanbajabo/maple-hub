/**
 * 제네시스 무기 해방 계산기 데이터
 */

export interface BossDifficulty {
    difficulty: string;
    traces: number; // 어둠의 흔적
}

export interface Boss {
    id: string;
    name: string;
    image: string; // 보스 이미지 경로
    difficulties: BossDifficulty[];
    isMonthly?: boolean; // 월간 보스 여부 (기본값: false)
}

export interface QuestStage {
    stage: number;
    bossName: string;
    requiredTraces: number;
}

export interface Season {
    name: string;
    startDate: Date;
    endDate: Date;
    bossResetDay: number; // 0=일요일, 4=목요일
}

// 보스 데이터
export const BOSSES: Boss[] = [
    {
        id: 'suu',
        name: '스우',
        image: '/images/bosses/lotus.png',
        difficulties: [
            { difficulty: '노멀', traces: 10 },
            { difficulty: '하드', traces: 50 },
            { difficulty: '익스트림', traces: 50 },
        ],
    },
    {
        id: 'damien',
        name: '데미안',
        image: '/images/bosses/damien.png',
        difficulties: [
            { difficulty: '노멀', traces: 10 },
            { difficulty: '하드', traces: 50 },
        ],
    },
    {
        id: 'lucid',
        name: '루시드',
        image: '/images/bosses/lucid.png',
        difficulties: [
            { difficulty: '이지', traces: 15 },
            { difficulty: '노멀', traces: 20 },
            { difficulty: '하드', traces: 65 },
        ],
    },
    {
        id: 'will',
        name: '윌',
        image: '/images/bosses/will.png',
        difficulties: [
            { difficulty: '이지', traces: 15 },
            { difficulty: '노멀', traces: 25 },
            { difficulty: '하드', traces: 75 },
        ],
    },
    {
        id: 'dusk',
        name: '더스크',
        image: '/images/bosses/dusk.png',
        difficulties: [
            { difficulty: '노멀', traces: 20 },
            { difficulty: '카오스', traces: 65 },
        ],
    },
    {
        id: 'dunkel',
        name: '듄켈',
        image: '/images/bosses/dunkel.png',
        difficulties: [
            { difficulty: '노멀', traces: 25 },
            { difficulty: '하드', traces: 75 },
        ],
    },
    {
        id: 'verus-hilla',
        name: '진 힐라',
        image: '/images/bosses/jin-hilla.png',
        difficulties: [
            { difficulty: '노멀', traces: 45 },
            { difficulty: '하드', traces: 90 },
        ],
    },
    {
        id: 'black-mage',
        name: '검은 마법사',
        image: '/images/bosses/black-mage.png',
        isMonthly: true, // 월간 보스
        difficulties: [
            { difficulty: '하드', traces: 600 },
            { difficulty: '익스트림', traces: 600 },
        ],
    },
];

// 해방 퀘스트 단계
export const QUEST_STAGES: QuestStage[] = [
    { stage: 1, bossName: '반 레온', requiredTraces: 500 },
    { stage: 2, bossName: '아카이럼', requiredTraces: 500 },
    { stage: 3, bossName: '매그너스', requiredTraces: 500 },
    { stage: 4, bossName: '스우', requiredTraces: 1000 },
    { stage: 5, bossName: '데미안', requiredTraces: 1000 },
    { stage: 6, bossName: '윌', requiredTraces: 1000 },
    { stage: 7, bossName: '루시드', requiredTraces: 1000 },
    { stage: 8, bossName: '진 힐라', requiredTraces: 1000 },
];

// 챌린저스 시즌3
export const SEASON_3: Season = {
    name: '챌린저스 시즌3',
    startDate: new Date('2025-12-18'),
    endDate: new Date('2026-04-16'),
    bossResetDay: 4, // 목요일
};

// 총 필요 어둠의 흔적
export const TOTAL_REQUIRED_TRACES = QUEST_STAGES.reduce(
    (sum, stage) => sum + stage.requiredTraces,
    0
); // 6500

// 어둠의 흔적 최대 보유량
export const MAX_TRACES = 3000;
