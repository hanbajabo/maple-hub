import {
  Space, SpecDie, DiceAnalysis,
  MONSTER_META, SPEC_DIE_META, QUESTION_EV, START_BONUS
} from './types';
import { calcLanding } from './board';

function getFert(space: Space, fertMult: number): number {
  if (space.type === 'question') {
    return Math.round(QUESTION_EV * MONSTER_META[space.monster].mult * fertMult);
  }
  if (space.type === 'rocket' || space.type === 'jumppad' ||
      space.type === 'mole2' || space.type === 'mole3') {
    return space.moveUsed ? Math.round(100 * MONSTER_META[space.monster].mult * fertMult) : 0;
  }
  return Math.round(space.fert * MONSTER_META[space.monster].mult * fertMult);
}

function resolveChain(
  rawPos: number, board: Space[]
): { finalPos: number; chainNote: string | null } {
  const sp = board[rawPos];
  if (sp.moveUsed) return { finalPos: rawPos, chainNote: null };
  if (sp.type === 'rocket') {
    const { pos } = calcLanding(rawPos, 10);
    return { finalPos: pos, chainNote: '🚀 로켓 +10칸' };
  }
  if (sp.type === 'jumppad') {
    const { pos } = calcLanding(rawPos, 3);
    return { finalPos: pos, chainNote: '🟩 점프대 +3칸' };
  }
  if (sp.type === 'mole2') {
    const { pos } = calcLanding(rawPos, -2);
    return { finalPos: pos, chainNote: '🐭 두더지 -2칸' };
  }
  if (sp.type === 'mole3') {
    const { pos } = calcLanding(rawPos, -3);
    return { finalPos: pos, chainNote: '🐭 두더지 -3칸' };
  }
  return { finalPos: rawPos, chainNote: null };
}

export function analyzeDie(
  dieIndex: number,
  dieValue: number,
  specEffect: SpecDie | null,
  currentPos: number,
  board: Space[]
): DiceAnalysis {
  let finalMove = dieValue;
  let fertMult = 1;
  const notes: string[] = [];

  if (specEffect !== null) {
    switch (specEffect) {
      case 1: finalMove = dieValue * 2; break;
      case 2: finalMove = dieValue * 3; break;
      case 3: fertMult = 2; notes.push('비료 ×2 적용'); break;
      case 4: finalMove = dieValue - 5; break;
      case 5: finalMove = dieValue - 10; break;
      case 6: finalMove = dieValue * -3; break;
    }
    notes.push(`특수주사위: ${SPEC_DIE_META[specEffect].desc}`);
  }

  const { pos: rawLandPos, crossedStart } = calcLanding(currentPos, finalMove);
  const { finalPos: landPos, chainNote } = resolveChain(rawLandPos, board);
  if (chainNote) notes.push(chainNote);

  const isBacktrack = (move: number) => move < 0 && crossedStart;
  const backtrack = isBacktrack(finalMove);
  if (backtrack) notes.push('🔄 빽도! START 역통과 → +400 비료');
  if (crossedStart && finalMove > 0) notes.push('✅ START 통과 → +400 비료');

  const landSpace = board[landPos];
  const fert = getFert(landSpace, fertMult);
  const startBonus = crossedStart ? START_BONUS : 0;
  const total = fert + startBonus;

  if (landSpace.monster !== 'none') {
    notes.push(`${MONSTER_META[landSpace.monster].icon} ${MONSTER_META[landSpace.monster].label} → 비료 ${MONSTER_META[landSpace.monster].mult}배`);
  }
  if (landSpace.hasSpecDie) notes.push('🎲 특수 주사위 획득!');

  // Scoring: total fert + special die value bonus
  const SPEC_DIE_BONUS = 400; // 특수 주사위 1개의 기대 추가 이득 (빽도 메타 ~500, 평균 ~400)
  let score = total;
  if (landSpace.hasSpecDie) score += SPEC_DIE_BONUS;
  // Penalize mole unless backtrack nets positive
  if ((landPos === rawLandPos) && (landSpace.type === 'mole2' || landSpace.type === 'mole3') && !landSpace.moveUsed) {
    score -= 200;
  }

  return {
    dieIndex,
    dieValue,
    specEffect,
    move: finalMove,
    rawLandPos,
    landPos,
    landSpace,
    fert,
    startBonus,
    total,
    crossedStart,
    notes,
    score,
    isBacktrack: backtrack,
  };
}

export function analyzeAllOptions(
  dieIndex: number,
  dieValue: number,
  hasSpecDice: boolean,
  currentPos: number,
  board: Space[]
): DiceAnalysis[] {
  const results: DiceAnalysis[] = [];
  results.push(analyzeDie(dieIndex, dieValue, null, currentPos, board));
  if (hasSpecDice) {
    for (let e = 1; e <= 6; e++) {
      results.push(analyzeDie(dieIndex, dieValue, e as SpecDie, currentPos, board));
    }
  }
  return results;
}

export interface BestPathResult {
  sequence: DiceAnalysis[];
  totalScore: number;
}

export function getBestSequenceForDice(
  diceVals: number[],
  specVals: (SpecDie | null)[],
  usedIndices: boolean[],
  startPos: number,
  board: Space[],
  initialMysteryTurns: number | null
): BestPathResult | null {
  const remainingIndices = [0, 1, 2].filter(i => !usedIndices[i]);
  if (remainingIndices.length === 0) return null;

  let bestResult: BestPathResult | null = null;
  let maxScore = -Infinity;

  function dfs(
    currentPos: number,
    currentBoard: Space[],
    remIndices: number[],
    path: DiceAnalysis[],
    currentScore: number,
    mysTurns: number | null
  ) {
    if (remIndices.length === 0) {
      if (currentScore > maxScore) {
        maxScore = currentScore;
        bestResult = { sequence: [...path], totalScore: currentScore };
      }
      return;
    }

    for (let i = 0; i < remIndices.length; i++) {
      const dieIdx = remIndices[i];
      const val = diceVals[dieIdx];
      const spec = specVals[dieIdx];
      const nextRem = [...remIndices.slice(0, i), ...remIndices.slice(i + 1)];

      let clonedBoard = currentBoard.map(s => ({ ...s }));
      let nextMysTurns = mysTurns !== null ? mysTurns - 1 : null;
      if (nextMysTurns !== null && nextMysTurns < 0) {
        clonedBoard = clonedBoard.map(s => s.monster === 'mystery' ? { ...s, monster: 'none' } : s);
        nextMysTurns = null;
      }

      const analysis = analyzeDie(dieIdx, val, spec, currentPos, clonedBoard);
      
      const rawSpace = clonedBoard[analysis.rawLandPos];
      if (['rocket', 'jumppad', 'mole2', 'mole3'].includes(rawSpace.type) && !rawSpace.moveUsed) {
        clonedBoard[analysis.rawLandPos] = { ...rawSpace, moveUsed: true };
      }
      
      if (['golden', 'poison', 'mystery'].includes(clonedBoard[analysis.rawLandPos].monster)) {
        if (clonedBoard[analysis.rawLandPos].monster === 'mystery') nextMysTurns = null;
        clonedBoard[analysis.rawLandPos] = { ...clonedBoard[analysis.rawLandPos], monster: 'none' };
      }

      if (analysis.crossedStart) {
        clonedBoard = clonedBoard.map(s => {
          if (['rocket', 'jumppad', 'mole2', 'mole3'].includes(s.type)) return { ...s, moveUsed: false };
          return s;
        });
      }

      dfs(analysis.landPos, clonedBoard, nextRem, [...path, analysis], currentScore + analysis.score, nextMysTurns);
    }
  }

  dfs(startPos, board, remainingIndices, [], 0, initialMysteryTurns);
  return bestResult;
}
