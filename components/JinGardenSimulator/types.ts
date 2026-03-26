export type SpaceType = 'start' | 'fert' | 'rocket' | 'jumppad' | 'mole2' | 'mole3' | 'question';
export type MonsterType = 'none' | 'golden' | 'poison' | 'mystery';
export type SpecDie = 1 | 2 | 3 | 4 | 5 | 6;

export interface Space {
  id: number;
  type: SpaceType;
  fert: number;
  monster: MonsterType;
  moveUsed: boolean;
  hasSpecDie: boolean;
}

export interface DiceAnalysis {
  dieIndex: number;
  dieValue: number;
  specEffect: SpecDie | null;
  move: number;
  rawLandPos: number;
  landPos: number;
  landSpace: Space;
  fert: number;
  startBonus: number;
  total: number;
  crossedStart: boolean;
  notes: string[];
  score: number;
  isBacktrack: boolean;
}

export interface GameState {
  position: number;
  fertilizer: number;
  specialDiceCount: number;
  diceRolled: number;
  lap: number;
  rolledDice: number[];
  rolledSpecDice: (SpecDie | null)[];
  diceUsed: boolean[];
  movesThisSet: number;
  mysteryBeeTurnsLeft: number | null;
}

export const SPACE_META: Record<SpaceType, { label: string; color: string; bg: string }> = {
  start:   { label: 'START',    color: '#ff6b6b', bg: '#7f1d1d' },
  fert:    { label: '비료',     color: '#c4b5fd', bg: '#4c1d95' },
  rocket:  { label: '🚀 +10칸', color: '#fbbf24', bg: '#78350f' },
  jumppad: { label: '🟩 +3칸',  color: '#34d399', bg: '#064e3b' },
  mole2:   { label: '🐭 -2칸',  color: '#9ca3af', bg: '#374151' },
  mole3:   { label: '🐭 -3칸',  color: '#6b7280', bg: '#1f2937' },
  question:{ label: '❓',       color: '#f9a8d4', bg: '#831843' },
};

export const MONSTER_META: Record<MonsterType, { label: string; icon: string; mult: number; color: string }> = {
  none:    { label: '없음',       icon: '',   mult: 1,   color: 'transparent' },
  golden:  { label: '황금벌',    icon: '🐝', mult: 2,   color: '#fbbf24' },
  poison:  { label: '독 호문',   icon: '☠️', mult: 0.5, color: '#6b7280' },
  mystery: { label: '신비한 벌', icon: '✨🐝', mult: 3, color: '#a78bfa' },
};

export const SPEC_DIE_META: Record<SpecDie, { label: string; desc: string; color: string }> = {
  1: { label: '×2',    desc: '주사위 숫자 ×2',        color: '#60a5fa' },
  2: { label: '×3',    desc: '주사위 숫자 ×3',        color: '#34d399' },
  3: { label: '비료×2', desc: '착지 칸 비료 ×2',    color: '#fbbf24' },
  4: { label: '-5',    desc: '주사위 숫자 -5',        color: '#f87171' },
  5: { label: '-10',   desc: '주사위 숫자 -10',       color: '#ef4444' },
  6: { label: '빽도',  desc: '주사위 ×(-3) 역방향',   color: '#a78bfa' },
};

export const CUMULATIVE_REWARDS = [
  { count: 15, items: '🌸 꽃 아이템 + 상급 EXP 교환권 500장' },
  { count: 30, items: '☠️ 독호문 라이딩 교환권 + 익스트림 성장비약' },
  { count: 45, items: '🏷️ 신비한 정원 칭호 + 상급 EXP 교환권 500장' },
  { count: 60, items: '📸 추억 교환권 + 익스트림 성장비약' },
  { count: 75, items: '🤖 정원사 진로이드 + 상급 EXP 교환권 1000장' },
  { count: 90, items: '👗 의상 세트 교환권 + 익스트림 성장비약' },
];

export const TOTAL_SPACES = 40;
export const START_BONUS = 400;
export const QUESTION_EV = 232; // 5%×50 + 45%×100 + 45%×300 + 5%×1000
