'use client';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  Space, MonsterType, SpaceType, GameState,
  SPACE_META, MONSTER_META, SPEC_DIE_META, CUMULATIVE_REWARDS, SpecDie,
} from './types';
import { createDefaultBoard, buildGridCells } from './board';
import { analyzeDie, getBestSequenceForDice, BestPathResult } from './engine';

const DICE_FACES = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

// ── Chip ──────────────────────────────────────────────────────
function Chip({ text, color }: { text: string; color: string }) {
  return (
    <span style={{ background: color + '28', color, border: `1px solid ${color}55` }}
      className="text-sm px-3 py-1 rounded-full font-bold whitespace-nowrap">
      {text}
    </span>
  );
}

// ── 비료 금액별 색상 테마 (게임 UI 반영) ──────────────────────
const FERT_THEME: Record<number, { bg: string; color: string; border: string }> = {
  100: { bg: '#334155', color: '#cbd5e1', border: '#475569' },  // 회색 느낌
  200: { bg: '#0f766e', color: '#99f6e4', border: '#115e59' },  // 청록
  300: { bg: '#172554', color: '#60a5fa', border: '#1e40af' },  // 진한 파란색
  400: { bg: '#1e3a8a', color: '#93c5fd', border: '#3b82f6' },  // 살짝 파란색
  500: { bg: '#4c1d95', color: '#c4b5fd', border: '#7c3aed' },  // 살짝 보라색
  600: { bg: '#4a044e', color: '#f5d0fe', border: '#a21caf' },  // 완전 보라색
};

// ── Board Cell (large) ─────────────────────────────────────────
function BoardCell({ space, isPlayer, isSelected, isHighlight, editMode, onClick }: {
  space: Space; isPlayer: boolean; isSelected: boolean; isHighlight: boolean;
  editMode: boolean; onClick: () => void;
}) {
  const meta = SPACE_META[space.type];
  const mon = MONSTER_META[space.monster];
  const hasMonster = space.monster !== 'none';
  const isMoveTile = ['rocket', 'jumppad', 'mole2', 'mole3'].includes(space.type);
  const isFertTile = space.type === 'fert' || space.type === 'start';
  const effectiveFert = isFertTile ? Math.round(space.fert * mon.mult) : 0;
  const hasSpecDie = space.hasSpecDie;

  // 비료 금액별 테마 (몬스터 없을 때)
  const fertTheme = isFertTile && !hasMonster ? FERT_THEME[space.fert] : null;
  const cellBg   = isPlayer ? '#dc2626' : isSelected ? '#1e1b4b' : fertTheme ? fertTheme.bg   : meta.bg;
  const cellBorder = isPlayer ? '#fca5a5' : isSelected ? '#fbbf24' : isHighlight ? '#60a5fa'
                   : fertTheme ? fertTheme.border : '#ffffff20';
  const cellTextColor = fertTheme ? fertTheme.color : meta.color;

  const baseLabel =
    space.type === 'start' ? 'START' :
    space.type === 'rocket' ? '🚀+10' :
    space.type === 'jumppad' ? '+3칸' :
    space.type === 'mole2' ? '-2칸' :
    space.type === 'mole3' ? '-3칸' :
    space.type === 'question' ? '?' : null;

  return (
    <button
      onClick={onClick}
      style={{ background: cellBg, borderColor: cellBorder }}
      className={`relative flex flex-col items-center justify-center w-full aspect-square rounded-[4px] md:rounded-xl border md:border-2 transition-all
        ${isPlayer ? 'shadow-[0_0_8px_#ef4444] md:shadow-[0_0_16px_#ef4444]' : ''}
        ${fertTheme ? `shadow-[0_0_4px_${fertTheme.border}60] md:shadow-[0_0_6px_${fertTheme.border}60]` : ''}
        ${editMode ? 'cursor-crosshair hover:brightness-125' : 'cursor-pointer hover:brightness-110'}`}
    >
      {isPlayer && <div className="absolute inset-0 rounded-[4px] md:rounded-xl bg-red-400/20 border-2 border-red-300 animate-pulse pointer-events-none" />}
      {hasMonster && <div className="absolute -top-1 -right-1 md:-top-3 md:-right-3 text-[14px] md:text-3xl z-20 drop-shadow-lg select-none">{mon.icon}</div>}
      {hasSpecDie && (
        <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 text-[8px] md:text-xl z-20 drop-shadow-md select-none bg-blue-900/90 rounded-full w-4 h-4 md:w-8 md:h-8 flex items-center justify-center border md:border-2 border-blue-400 shadow-[0_0_4px_rgba(96,165,250,0.7)] md:shadow-[0_0_12px_rgba(96,165,250,0.7)]">
          🎲
        </div>
      )}
      {space.moveUsed && isMoveTile && <div className="absolute top-0.5 left-0.5 md:top-1 md:left-1 w-1 h-1 md:w-2 md:h-2 rounded-full bg-gray-500" />}
      {isPlayer && <div className="absolute -top-2 -left-2 md:-top-4 md:-left-3 text-base md:text-3xl z-30 select-none drop-shadow-xl">👤</div>}

      {/* 비료칸 + 몬스터: 취소선 + 실제 획득량 */}
      {isFertTile && hasMonster ? (
        <div className="flex flex-col items-center select-none">
          {space.type === 'start' && <span className="text-[5px] md:text-[10px] font-black mb-0 md:mb-0.5 leading-none px-0.5 md:px-1 py-[1px] md:py-0.5 bg-black/20 rounded text-[#f5d0fe]">START</span>}
          <span style={{ color: fertTheme?.color ?? '#9ca3af' }} className="text-[6px] md:text-[10px] line-through leading-none opacity-60">+{space.fert}</span>
          <span style={{ color: mon.color }} className="font-black text-[9px] sm:text-[10px] md:text-lg leading-tight">+{effectiveFert}</span>
          <span style={{ color: mon.color }} className="text-[5px] md:text-[10px] leading-none font-bold">×{mon.mult}</span>
        </div>
      ) : baseLabel ? (
        <div className="flex flex-col items-center select-none">
          <span style={{ color: cellTextColor }} 
            className={`font-black leading-tight text-center px-0.5 ${space.type === 'question' ? 'text-lg md:text-4xl' : 'text-[7px] md:text-base'}`}>
            {baseLabel}
          </span>
          {space.type === 'start' && <span style={{ color: cellTextColor }} className="text-[5px] md:text-xs leading-none mt-0.5 opacity-80">+{space.fert}</span>}
        </div>
      ) : (
        <span style={{ color: cellTextColor }} className="font-black text-[9px] sm:text-[10px] md:text-lg leading-tight text-center select-none">+{space.fert}</span>
      )}

      <span className="text-gray-500 text-[5px] md:text-[10px] leading-none mt-0.5 select-none">#{space.id}</span>
    </button>
  );
}

// ── Board Grid ─────────────────────────────────────────────────
function BoardGrid({ board, playerPos, highlightPos, editMode, onCellClick, children }: {
  board: Space[]; playerPos: number;
  highlightPos: number | null; editMode: boolean; onCellClick: (id: number) => void;
  children?: React.ReactNode;
}) {
  const cells = useMemo(() => buildGridCells(), []);
  return (
    <div className="w-full">
      <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
        <div className="relative grid gap-0.5 sm:gap-1 mx-auto min-w-[350px] md:min-w-[700px] lg:min-w-full" style={{ gridTemplateColumns: 'repeat(11, 1fr)' }}>
        {/* 내측 9x9 공간 레이아웃: 자식 컨텐츠(주사위 입력 등) 렌더링 (PC 전용) */}
        {children && (
          <div style={{ gridRow: '2 / 11', gridColumn: '2 / 11' }} className="hidden md:flex items-center justify-center p-2 sm:p-5 pointer-events-none z-10">
            <div className="pointer-events-auto w-full max-w-2xl shadow-2xl rounded-2xl">
              {children}
            </div>
          </div>
        )}

        {cells.map((cell, i) => {
        if (cell.pos === null) return null; // 빈 공간은 단일 div로 처리했으므로 무시

        const space = board[cell.pos];
        return (
          <div key={i} style={{ gridRow: cell.row + 1, gridColumn: cell.col + 1 }}>
            <BoardCell
              space={space}
              isPlayer={playerPos === cell.pos}
              isSelected={false}
              isHighlight={highlightPos === cell.pos}
              editMode={editMode}
              onClick={() => onCellClick(cell.pos!)}
            />
          </div>
        );
      })}
      </div>
    </div>
    {/* 모바일 하단 렌더링 */}
    {children && (
      <div className="md:hidden mt-4 w-full">
        {children}
      </div>
    )}
  </div>
  );
}

// ── Cell Editor ───────────────────────────────────────────────
function CellEditor({ space, board, setBoard, onClose }: {
  space: Space; board: Space[]; setBoard: (b: Space[]) => void; onClose: () => void;
}) {
  const isFertEditable = ['fert', 'specdie'].includes(space.type);
  const isMoleable = !['start', 'rocket', 'jumppad', 'question'].includes(space.type);
  const update = (patch: Partial<Space>) => setBoard(board.map(s => s.id === space.id ? { ...s, ...patch } : s));
  const setMole = (type: 'mole2' | 'mole3' | 'fert') => {
    if (type === 'fert') {
      update({ type: 'fert', fert: 100 });
    } else {
      const cleaned = board.map(s => s.type === type ? { ...s, type: 'fert' as SpaceType, fert: 100 } : s);
      cleaned[space.id] = { ...cleaned[space.id], type, fert: 0 };
      setBoard(cleaned);
    }
  };

  return (
    <div className="bg-gray-800 border-2 border-yellow-600/60 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-base"
            style={{ background: SPACE_META[space.type].bg, color: SPACE_META[space.type].color }}>
            #{space.id}
          </div>
          <div>
            <span className="text-white font-black text-lg">#{space.id}번 칸</span>
            <span style={{ color: SPACE_META[space.type].color }} className="text-sm ml-2">{SPACE_META[space.type].label}</span>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl w-9 h-9 flex items-center justify-center rounded-xl bg-gray-700 hover:bg-gray-600">✕</button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {/* Mole toggle */}
        {isMoleable && (
          <div>
            <div className="text-gray-300 text-sm font-bold mb-2">🐭 두더지</div>
            <div className="flex flex-col gap-1.5">
              {[{ key: 'fert', label: '효과 없음' }, { key: 'mole2', label: '−2칸' }, { key: 'mole3', label: '−3칸' }].map(opt => (
                <button key={opt.key} onClick={() => setMole(opt.key as 'mole2' | 'mole3' | 'fert')}
                  className={`py-2 text-sm font-bold rounded-xl border-2 transition-all
                    ${space.type === opt.key || (opt.key === 'fert' && !['mole2', 'mole3'].includes(space.type))
                      ? 'bg-gray-500 border-white text-white' : 'bg-gray-900 border-gray-600 text-gray-400 hover:border-gray-400'}`}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Fertilizer */}
        {(isFertEditable || space.type === 'fert') && (
          <div>
            <div className="text-gray-300 text-sm font-bold mb-2">🌿 비료 수량</div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {[100, 200, 300, 400, 500, 600].map(v => (
                <button key={v} onClick={() => update({ fert: v })}
                  className={`px-3 py-1.5 text-sm font-bold rounded-xl border-2 transition-all
                    ${space.fert === v ? 'bg-purple-600 border-purple-300 text-white' : 'bg-gray-900 border-gray-600 text-gray-300 hover:border-purple-500'}`}>
                  {v}
                </button>
              ))}
            </div>
            <input type="number" value={space.fert || ''}
              onChange={e => update({ fert: Math.max(0, parseInt(e.target.value) || 0) })}
              placeholder="직접 입력..."
              className="w-full bg-gray-900 text-white text-sm px-3 py-2 rounded-xl border-2 border-gray-600 focus:outline-none focus:border-purple-500" />
          </div>
        )}

        {/* Monster */}
        <div>
          <div className="text-gray-300 text-sm font-bold mb-2">👾 몬스터</div>
          <div className="flex flex-col gap-1.5">
            {(['none', 'golden', 'poison', 'mystery'] as MonsterType[]).map(m => {
              const meta = MONSTER_META[m];
              return (
                <button key={m} onClick={() => update({ monster: m })}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 text-sm transition-all
                    ${space.monster === m
                      ? 'border-yellow-400 bg-yellow-900/40 text-yellow-100'
                      : 'border-gray-600 bg-gray-900 text-gray-300 hover:border-gray-400'}`}>
                  <span className="text-xl">{meta.icon || '—'}</span>
                  <span className="font-bold">{meta.label}</span>
                  {m !== 'none' && <span className="ml-auto text-gray-500 text-xs">×{meta.mult}</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Dice Picker ────────────────────────────────────────────────
function DiePicker({ label, value, onChange }: { label: string; value: number | null; onChange: (v: number) => void }) {
  return (
    <div className="flex-1 flex flex-row md:flex-col items-center bg-gray-900/40 md:bg-transparent p-2 md:p-0 rounded-xl md:rounded-none border border-gray-800 md:border-none gap-2 md:gap-0">
      <div className="w-[60px] md:w-auto shrink-0 text-left md:text-center">
        <div className="text-gray-300 text-xs md:text-base font-bold md:mb-2 leading-tight">{label}</div>
        <div className={`md:hidden text-[9px] font-black mt-1 bg-gray-800/80 px-1 py-0.5 rounded text-center inline-block ${value ? 'text-purple-300' : 'text-gray-500'}`}>
          {value ? `눈금 ${value}` : '대기중'}
        </div>
      </div>
      <div className="flex-1 grid grid-cols-6 md:grid-cols-3 gap-1 md:gap-2 w-full">
        {DICE_FACES.map((face, i) => {
          const v = i + 1;
          return (
            <button key={v} onClick={() => onChange(v)}
              className={`aspect-square flex items-center justify-center text-2xl md:text-5xl rounded-lg md:rounded-2xl border-2 transition-all hover:scale-105 active:scale-95
                ${value === v
                  ? 'bg-purple-600 border-purple-300 shadow-lg md:shadow-xl shadow-purple-900/60'
                  : 'bg-gray-800 border-gray-600 hover:border-purple-500 hover:bg-gray-700'}`}>
              <span className="mb-0.5 md:mb-0">{face}</span>
            </button>
          );
        })}
      </div>
      <div className={`hidden md:block text-center text-base font-black mt-2 ${value ? 'text-purple-300' : 'text-gray-700'}`}>
        {value ? `눈금 ${value}` : '미선택'}
      </div>
    </div>
  );
}

// ── Strategy Guide ────────────────────────────────────────────
function StrategyGuide() {
  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      <div className="bg-purple-950/50 rounded-2xl p-6 border-2 border-purple-700/40">
        <h3 className="text-purple-300 font-black text-xl mb-4">🎲 특수 주사위 — 언제 쓸까?</h3>
        <div className="space-y-3">
          {[
            { icon: '🟡', title: '비료×2 (효과 #3)', desc: '400~600비료 칸 바로 앞에 있을 때 사용. 착지 비료 2배 획득.' },
            { icon: '🟢', title: '×3 (효과 #2)', desc: '멀리 있는 고비료 칸이나 특주 지급 칸에 도달할 때.' },
            { icon: '🟣', title: '빽도 ×(−3) (효과 #6)', desc: '1~5번 칸에 있을 때 사용 → START 역통과 +400보너스 + 착지비료!' },
            { icon: '🔴', title: '−5 / −10 (효과 #4,5)', desc: '두더지 칸을 피하거나, 빽도 조건 생성 보조.' },
            { icon: '🔵', title: '×2 (효과 #1)', desc: '중거리 고비료 칸 도달용. ×3이 없을 때의 차선책.' },
          ].map(item => (
            <div key={item.title} className="flex gap-4 bg-gray-900/60 rounded-xl p-4">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <div className="text-white font-bold text-base">{item.title}</div>
                <div className="text-gray-400 text-sm mt-1">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-violet-950/50 rounded-2xl p-6 border-2 border-violet-700/40">
        <h3 className="text-violet-300 font-black text-xl mb-4">🔄 빽도 메타</h3>
        <div className="bg-violet-900/30 rounded-xl p-4 mb-4 text-base text-gray-200 leading-relaxed">
          특주 <strong className="text-yellow-300">×(−3)</strong>은 뒤로 이동합니다.<br />
          1~5번 칸에서 쓰면 역방향으로 START를 통과해<br />
          <strong className="text-yellow-300">+400 비료 보너스</strong> + 착지 칸 비료를 동시에 획득!
        </div>
        <table className="w-full text-base">
          <thead>
            <tr className="text-gray-500 text-sm border-b border-gray-700">
              <th className="text-left pb-2 pr-4">위치</th>
              <th className="text-left pb-2 pr-4">눈금</th>
              <th className="text-left pb-2 pr-4">이동</th>
              <th className="text-left pb-2">효과</th>
            </tr>
          </thead>
          <tbody>
            {[
              { pos: '#1', die: '1', move: '−3', land: '#38', note: 'START 역통과 +400' },
              { pos: '#5', die: '2', move: '−6', land: '#39', note: 'START 역통과 +400' },
              { pos: '#2', die: '3', move: '−9', land: '#33', note: 'START 역통과 +400' },
              { pos: '#3', die: '1', move: '−3', land: '#40→역통과', note: 'START 역통과 +400' },
            ].map((ex, i) => (
              <tr key={i} className="border-b border-gray-800">
                <td className="text-purple-300 font-black py-2.5 pr-4">{ex.pos}</td>
                <td className="py-2.5 pr-4">{ex.die}눈</td>
                <td className="text-red-300 py-2.5 pr-4">{ex.move}칸</td>
                <td className="text-yellow-300 py-2.5 text-sm">{ex.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-amber-950/50 rounded-2xl p-6 border-2 border-amber-700/40">
        <h3 className="text-amber-300 font-black text-xl mb-4">🐝 몬스터 전략</h3>
        <div className="space-y-3">
          {Object.entries(MONSTER_META).filter(([k]) => k !== 'none').map(([k, m]) => (
            <div key={k} className="flex gap-4 bg-gray-900/50 rounded-xl p-4">
              <span className="text-4xl">{m.icon}</span>
              <div>
                <div className="text-white font-bold text-base">{m.label} <span className="text-gray-400">(×{m.mult})</span></div>
                <div className="text-gray-400 text-sm mt-1">
                  {k === 'mystery' ? '10회 내 착지 못 하면 소멸! 최우선 목표. 특주 비료×2 조합 시 ×6 효과.' :
                    k === 'golden' ? '착지 비료 2배. 특주 비료×2와 조합하면 4배.' :
                      '착지 비료 절반. 가능하면 다른 주사위로 피하세요.'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────
const INITIAL_GAME: GameState = {
  position: 0, fertilizer: 0, specialDiceCount: 0,
  diceRolled: 0, lap: 1, rolledDice: [], rolledSpecDice: [], diceUsed: [], movesThisSet: 0,
  mysteryBeeTurnsLeft: null, 
};

const FERT_CYCLE = [100, 200, 300, 400, 500, 600];
const MONSTER_CYCLE: MonsterType[] = ['none', 'golden', 'poison', 'mystery'];

export default function JinGardenSimulator() {
  const [board, setBoard] = useState<Space[]>(() => createDefaultBoard());
  const [game, setGame] = useState<GameState>(INITIAL_GAME);
  const [isLoaded, setIsLoaded] = useState(false);

  // 로컬 스토리지에서 상태 불러오기
  useEffect(() => {
    const savedBoard = localStorage.getItem('jinGardenBoard');
    const savedGame = localStorage.getItem('jinGardenGame');
    if (savedBoard) {
      try { setBoard(JSON.parse(savedBoard)); } catch (e) { console.error('Failed to parse board', e); }
    }
    if (savedGame) {
      try { setGame(JSON.parse(savedGame)); } catch (e) { console.error('Failed to parse game', e); }
    }
    setIsLoaded(true);
  }, []);

  // 상태 변경 시 로컬 스토리지에 자동 저장
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('jinGardenBoard', JSON.stringify(board));
    }
  }, [board, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('jinGardenGame', JSON.stringify(game));
    }
  }, [game, isLoaded]);
  const [tab, setTab] = useState<'sim' | 'guide'>('sim');
  const [editMode, setEditMode] = useState(false);
  const [editSubMode, setEditSubMode] = useState<'fert' | 'monster' | 'mole' | 'specdie'>('fert');
  const [inputDice, setInputDice] = useState<(number | null)[]>([null, null, null]);
  const [inputSpecDice, setInputSpecDice] = useState<(SpecDie | null)[]>([null, null, null]);
  const [highlightPos, setHighlightPos] = useState<number | null>(null);
  const [posEditing, setPosEditing] = useState(false);
  const [posInput, setPosInput] = useState('');
  const [fertEditing, setFertEditing] = useState(false);
  const [fertInput, setFertInput] = useState('');
  const [specEditing, setSpecEditing] = useState(false);
  const [specInput, setSpecInput] = useState('');
  const [diceRolledEditing, setDiceRolledEditing] = useState(false);
  const [diceRolledInput, setDiceRolledInput] = useState('');

  const analysisActive = game.rolledDice.length > 0;
  const allUsed = analysisActive && game.diceUsed.every(Boolean);
  const diceReady = inputDice.every(v => v !== null);

  const bestPath = useMemo(() => {
    if (!analysisActive || allUsed) return null;
    return getBestSequenceForDice(game.rolledDice, game.rolledSpecDice, game.diceUsed, game.position, board, game.mysteryBeeTurnsLeft);
  }, [analysisActive, allUsed, game.rolledDice, game.rolledSpecDice, game.diceUsed, game.position, board, game.mysteryBeeTurnsLeft]);

  const evAnalysis = useMemo(() => {
    if (!analysisActive || allUsed || game.specialDiceCount === 0) return null;
    const baseBest = getBestSequenceForDice(game.rolledDice, game.rolledSpecDice, game.diceUsed, game.position, board, game.mysteryBeeTurnsLeft);
    if (!baseBest) return null;
    const baseScore = baseBest.totalScore;

    const recommendations = [];
    for (let i = 0; i < game.rolledDice.length; i++) {
      if (game.diceUsed[i] || game.rolledSpecDice[i] !== null) continue;
      
      let sumSpecScore = 0;
      let maxSpecScore = -Infinity;
      let bestSpecEffect: SpecDie | null = null;
      let worstSpecScore = Infinity;

      for (const effect of [1, 2, 3, 4, 5, 6] as SpecDie[]) {
        const tempSpecDice = [...game.rolledSpecDice];
        tempSpecDice[i] = effect;
        const res = getBestSequenceForDice(game.rolledDice, tempSpecDice, game.diceUsed, game.position, board, game.mysteryBeeTurnsLeft);
        const s = res ? res.totalScore : baseScore;
        sumSpecScore += s;
        if (s > maxSpecScore) { maxSpecScore = s; bestSpecEffect = effect; }
        if (s < worstSpecScore) worstSpecScore = s;
      }
      
      const avgScore = sumSpecScore / 6;
      const evGain = avgScore - baseScore;
      recommendations.push({ dieIndex: i, evGain, maxScore: maxSpecScore, 
        maxGain: maxSpecScore - baseScore, worstGain: worstSpecScore - baseScore, bestEffect: bestSpecEffect });
    }

    if (recommendations.length === 0) return null;
    recommendations.sort((a, b) => b.evGain - a.evGain);
    const bestRec = recommendations[0];
    if (bestRec.evGain <= 0) return null;

    return bestRec;
  }, [analysisActive, allUsed, game.rolledDice, game.rolledSpecDice, game.diceUsed, game.position, board, game.specialDiceCount, game.mysteryBeeTurnsLeft]);

  const handleCellClick = (id: number) => {
    if (!editMode) {
      setGame(g => ({ ...g, position: id }));
      setHighlightPos(null);
      return;
    }
    const space = board[id];
    if (editSubMode === 'fert') {
      // 비료 칸만 순환
      if (!['fert', 'start'].includes(space.type)) return;
      const idx = FERT_CYCLE.indexOf(space.fert);
      const next = FERT_CYCLE[(idx + 1) % FERT_CYCLE.length];
      setBoard(board.map(s => s.id === id ? { ...s, fert: next } : s));
    } else if (editSubMode === 'monster') {
      if (space.type !== 'fert') return;
      const idx = MONSTER_CYCLE.indexOf(space.monster);
      const next = MONSTER_CYCLE[(idx + 1) % MONSTER_CYCLE.length];
      setBoard(board.map(s => s.id === id ? { ...s, monster: next } : s));
      
      if (next === 'mystery') {
        setGame(g => ({ ...g, mysteryBeeTurnsLeft: 10 }));
      } else if ((space.monster as any) === 'mystery' && (next as any) !== 'mystery') {
        if (!board.some(s => (s.monster as any) === 'mystery')) {
          setGame(g => ({ ...g, mysteryBeeTurnsLeft: null }));
        }
      }
    } else if (editSubMode === 'specdie') {
      if (['rocket', 'mole2', 'mole3'].includes(space.type)) return;
      setBoard(board.map(s => s.id === id ? { ...s, hasSpecDie: !s.hasSpecDie } : s));
    } else {
      // 이동 효과 순환 (고정 칸 제외: start, rocket, question)
      if (['start', 'rocket', 'question'].includes(space.type)) return;
      const MOVE_CYCLE: SpaceType[] = ['fert', 'mole2', 'mole3', 'jumppad'];
      const cur: SpaceType = ['mole2', 'mole3', 'jumppad'].includes(space.type) ? space.type : 'fert';
      const nextType = MOVE_CYCLE[(MOVE_CYCLE.indexOf(cur) + 1) % MOVE_CYCLE.length];
      if (nextType === 'mole2' || nextType === 'mole3' || nextType === 'jumppad') {
        // 동일 유형은 1개만 존재하도록 기존 것 제거
        const cleaned = board.map(s => s.type === nextType ? { ...s, type: 'fert' as SpaceType, fert: 100 } : s);
        cleaned[id] = { ...cleaned[id], type: nextType, fert: 0 };
        setBoard(cleaned);
      } else {
        setBoard(board.map(s => s.id === id ? { ...s, type: 'fert', fert: 100 } : s));
      }
    }
  };

  const confirmDice = () => {
    if (!diceReady) return;
    setGame(g => ({ ...g, rolledDice: inputDice as number[], rolledSpecDice: inputSpecDice, diceUsed: [false, false, false], movesThisSet: 0 }));
    setHighlightPos(null);
  };

  const resetRound = () => {
    setInputDice([null, null, null]);
    setInputSpecDice([null, null, null]);
    setGame(g => ({ ...g, rolledDice: [], rolledSpecDice: [], diceUsed: [], movesThisSet: 0 }));
    setHighlightPos(null);
  };

  const applyPathToGame = useCallback((path: import('./engine').BestPathResult) => {
    let currentBoard = [...board];
    let pos = game.position;
    let fert = game.fertilizer;
    let specDice = game.specialDiceCount;
    let lap = game.lap;
    let mysTurns = game.mysteryBeeTurnsLeft;
    const newUsed = [...game.diceUsed];
    let addedRolled = 0;

    for (const step of path.sequence) {
      if (newUsed[step.dieIndex]) continue;
      
      if (mysTurns !== null) {
        mysTurns--;
        if (mysTurns < 0) {
          currentBoard = currentBoard.map(s => s.monster === 'mystery' ? { ...s, monster: 'none' as MonsterType } : s);
          mysTurns = null;
        }
      }

      const rawSpace = currentBoard[step.rawLandPos];
      if (['rocket', 'jumppad', 'mole2', 'mole3'].includes(rawSpace.type) && !rawSpace.moveUsed) {
        currentBoard[step.rawLandPos] = { ...rawSpace, moveUsed: true };
      }
      
      const rawSpaceAfter = currentBoard[step.rawLandPos];
      if (['golden', 'poison', 'mystery'].includes(rawSpaceAfter.monster)) {
        if (rawSpaceAfter.monster === 'mystery') mysTurns = null;
        currentBoard[step.rawLandPos] = { ...rawSpaceAfter, monster: 'none' as MonsterType };
      }

      if (step.crossedStart) {
        lap++;
        currentBoard = currentBoard.map(s => {
          if (['rocket', 'jumppad', 'mole2', 'mole3'].includes(s.type)) return { ...s, moveUsed: false };
          return s;
        });
      }
      pos = step.landPos;
      fert += step.total;
      
      // 특수 주사위 차감 (사용 시)
      if (step.specEffect) {
        specDice = Math.max(0, specDice - 1);
      }
      
      // 특수 주사위 획득 (착지 칸에 있을 시)
      if (currentBoard[step.landPos].hasSpecDie) {
        specDice += 1;
        currentBoard[step.landPos] = { ...currentBoard[step.landPos], hasSpecDie: false };
      }

      newUsed[step.dieIndex] = true;
      addedRolled++;
    }

    setBoard(currentBoard);
    setGame(g => ({
      ...g,
      position: pos,
      fertilizer: fert,
      specialDiceCount: specDice,
      diceRolled: g.diceRolled + addedRolled,
      diceUsed: newUsed,
      lap,
      movesThisSet: g.movesThisSet + addedRolled,
      mysteryBeeTurnsLeft: mysTurns,
    }));
    setHighlightPos(pos);
  }, [game, board]);

  const nextReward = CUMULATIVE_REWARDS.find(r => r.count > game.diceRolled);
  const lastReward = [...CUMULATIVE_REWARDS].reverse().find(r => r.count <= game.diceRolled);

  return (
    <div className="max-w-6xl mx-auto" style={{ fontFamily: 'var(--font-noto-sans-kr), sans-serif' }}>

      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 mb-4 md:mb-5">
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-purple-400 via-pink-300 to-purple-300 bg-clip-text text-transparent">
            🌸 진의 신비한 정원 계산기
          </h1>
          <p className="text-gray-500 text-xs md:text-sm mt-0.5">주사위 입력 → 최적 선택 계산기</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button onClick={() => { 
            if (confirm('보드판을 정말 초기화하시겠습니까?')) {
              const defaultBoard = createDefaultBoard();
              setBoard(defaultBoard); 
              setGame(g => ({ ...g, mysteryBeeTurnsLeft: null })); 
            }
          }}
            className="flex-1 md:flex-none px-3 md:px-4 py-2 bg-gray-800 hover:bg-gray-700 border-2 border-gray-700 text-gray-300 text-xs md:text-sm font-bold rounded-lg md:rounded-xl">
            보드 초기화
          </button>
          <button onClick={() => { 
            if (confirm('현재 진행 상황(위치, 비료, 주사위 등)을 초기화하시겠습니까?')) {
              setGame(INITIAL_GAME); 
              setInputDice([null, null, null]); 
              setHighlightPos(null); 
            }
          }}
            className="flex-1 md:flex-none px-3 md:px-4 py-2 bg-red-950 hover:bg-red-900 border-2 border-red-800 text-red-400 text-xs md:text-sm font-bold rounded-lg md:rounded-xl">
            게임 초기화
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-4">
        {/* Position */}
        <div className="bg-gray-900 border-2 border-gray-700 rounded-xl md:rounded-2xl p-3 md:p-4 text-center">
          <div className="text-gray-500 text-xs md:text-sm mb-0.5 md:mb-1">📍 현재 위치</div>
          {posEditing ? (
            <input autoFocus type="number" min={0} max={39} value={posInput}
              onChange={e => setPosInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  const n = parseInt(posInput);
                  if (!isNaN(n) && n >= 0 && n <= 39) setGame(g => ({ ...g, position: n }));
                  setPosEditing(false);
                }
                if (e.key === 'Escape') setPosEditing(false);
              }}
              onBlur={() => {
                const n = parseInt(posInput);
                if (!isNaN(n) && n >= 0 && n <= 39) setGame(g => ({ ...g, position: n }));
                setPosEditing(false);
              }}
              className="w-16 md:w-24 bg-gray-800 text-purple-300 font-black text-xl md:text-2xl text-center rounded-lg md:rounded-xl border-2 border-purple-500 focus:outline-none mx-auto block" />
          ) : (
            <button
              onClick={() => { setPosInput(String(game.position)); setPosEditing(true); }}
              className="text-purple-300 font-black text-2xl md:text-3xl hover:text-purple-200 w-full block">
              #{game.position}
            </button>
          )}
          <div className="text-gray-600 text-[9px] md:text-[10px] mt-1">클릭하여 변경</div>
        </div>

        {/* Fertilizer */}
        <div className="bg-gray-900 border-2 border-gray-700 rounded-xl md:rounded-2xl p-3 md:p-4 text-center">
          <div className="text-gray-500 text-xs md:text-sm mb-0.5 md:mb-1">🌿 성장 비료</div>
          {fertEditing ? (
            <input autoFocus type="number" value={fertInput}
              onChange={e => setFertInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  const n = parseInt(fertInput.replace(/,/g, ''));
                  if (!isNaN(n)) setGame(g => ({ ...g, fertilizer: n }));
                  setFertEditing(false);
                }
                if (e.key === 'Escape') setFertEditing(false);
              }}
              onBlur={() => {
                const n = parseInt(fertInput.replace(/,/g, ''));
                if (!isNaN(n)) setGame(g => ({ ...g, fertilizer: n }));
                setFertEditing(false);
              }}
              className="w-full bg-gray-800 text-green-300 font-black text-xl md:text-2xl text-center rounded-lg md:rounded-xl border-2 border-green-500 focus:outline-none" />
          ) : (
            <button onClick={() => { setFertInput(String(game.fertilizer)); setFertEditing(true); }}
              className="text-green-300 font-black text-2xl md:text-3xl hover:text-green-200 block w-full whitespace-nowrap overflow-hidden">
              {game.fertilizer.toLocaleString()}개
            </button>
          )}
          <div className="text-gray-600 text-[9px] md:text-[10px] mt-1">클릭하여 변경</div>
        </div>

        {/* Special Dice */}
        <div className="bg-gray-900 border-2 border-gray-700 rounded-xl md:rounded-2xl p-3 md:p-4 text-center">
          <div className="text-gray-500 text-xs md:text-sm mb-0.5 md:mb-1">🎲 특수 주사위</div>
          {specEditing ? (
            <input autoFocus type="number" value={specInput}
              onChange={e => setSpecInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  const n = parseInt(specInput);
                  if (!isNaN(n)) setGame(g => ({ ...g, specialDiceCount: Math.max(0, n) }));
                  setSpecEditing(false);
                }
                if (e.key === 'Escape') setSpecEditing(false);
              }}
              onBlur={() => {
                const n = parseInt(specInput);
                if (!isNaN(n)) setGame(g => ({ ...g, specialDiceCount: Math.max(0, n) }));
                setSpecEditing(false);
              }}
              className="w-16 md:w-20 bg-gray-800 text-yellow-300 font-black text-xl md:text-2xl text-center rounded-lg md:rounded-xl border-2 border-yellow-500 focus:outline-none mx-auto block" />
          ) : (
            <button onClick={() => { setSpecInput(String(game.specialDiceCount)); setSpecEditing(true); }}
              className="text-yellow-300 font-black text-2xl md:text-3xl hover:text-yellow-200 block w-full">
              {game.specialDiceCount}개
            </button>
          )}
          <div className="text-gray-600 text-[9px] md:text-[10px] mt-1">클릭하여 변경</div>
        </div>

        {/* Dice Rolled */}
        <div className="bg-gray-900 border-2 border-gray-700 rounded-xl md:rounded-2xl p-3 md:p-4 text-center">
          <div className="text-gray-500 text-xs md:text-sm mb-0.5 md:mb-1">🎯 누적 굴린 수</div>
          {diceRolledEditing ? (
            <input autoFocus type="number" value={diceRolledInput}
              onChange={e => setDiceRolledInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  const n = parseInt(diceRolledInput);
                  if (!isNaN(n)) setGame(g => ({ ...g, diceRolled: Math.max(0, n) }));
                  setDiceRolledEditing(false);
                }
                if (e.key === 'Escape') setDiceRolledEditing(false);
              }}
              onBlur={() => {
                const n = parseInt(diceRolledInput);
                if (!isNaN(n)) setGame(g => ({ ...g, diceRolled: Math.max(0, n) }));
                setDiceRolledEditing(false);
              }}
              className="w-16 md:w-20 bg-gray-800 text-pink-300 font-black text-xl md:text-2xl text-center rounded-lg md:rounded-xl border-2 border-pink-500 focus:outline-none mx-auto block" />
          ) : (
            <button onClick={() => { setDiceRolledInput(String(game.diceRolled)); setDiceRolledEditing(true); }}
              className="text-pink-300 font-black text-2xl md:text-3xl hover:text-pink-200 block w-full">
              {game.diceRolled}개
            </button>
          )}
          <div className="text-gray-600 text-[9px] md:text-[10px] mt-1">클릭하여 변경</div>
        </div>
      </div>


      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex gap-2">
          {([['sim', '🎲 주사위 계산기'], ['guide', '📖 전략 가이드']] as const).map(([t, label]) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl text-sm sm:text-base font-black border-2 transition-all
                ${tab === t ? 'bg-purple-700 border-purple-400 text-white shadow-[0_0_20px_rgba(147,51,234,0.3)] scale-[1.02]' : 'bg-gray-950/50 border-gray-800 text-gray-500 hover:border-gray-600 hover:text-gray-300'}`}>
              {label}
            </button>
          ))}
        </div>
        
        {/* 안내 문구 (PC/태블릿에서만 표시) */}
        <div className="hidden md:flex items-center gap-3 ml-auto px-5 py-3 bg-gradient-to-r from-purple-900/30 to-blue-900/20 border border-purple-700/30 rounded-2xl shadow-inner backdrop-blur-sm">
          <span className="text-xl animate-bounce-subtle">✨</span>
          <p className="text-xs sm:text-sm font-bold text-purple-300 leading-tight">
            <span className="text-white">편집 모드</span>를 사용해 내 인게임 보드판과 <span className="text-yellow-400">똑같이 맞춰보세요!</span><br/>
            <span className="text-[10px] text-purple-400 font-medium opacity-80">몬스터, 비료 점수, 두더지 위치를 드래그/클릭으로 자유롭게 바꿀 수 있습니다.</span>
          </p>
        </div>
      </div>

      {tab === 'sim' && (
        <div className="space-y-5">

          {/* === FULL-WIDTH BOARD === */}
          <div className="bg-gray-900 border-2 border-purple-800/60 rounded-2xl p-4">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-purple-300 text-lg font-bold">보드판</span>
                <span className="bg-purple-900/50 text-purple-300 text-sm px-3 py-1 rounded-full font-bold shadow-sm">바퀴 {game.lap}</span>
                <span className="bg-gray-800 text-gray-300 text-sm px-3 py-1 rounded-full font-bold shadow-sm">#{game.position}번 위치</span>
                
                {/* 신비한 벌 카운터 UI */}
                
                {/* 신비한 벌 카운터 UI */}
                {game.mysteryBeeTurnsLeft !== null && (
                  <div className="flex flex-wrap items-center bg-gray-900 border border-pink-700/60 rounded-full px-2 py-1 ml-2 shadow-inner gap-1">
                    <span className="text-sm font-bold text-pink-400 pl-2 pr-2">✨ 신비한벌 (소멸: {game.mysteryBeeTurnsLeft}회)</span>
                    <div className="flex items-center gap-1 border-l border-gray-700 pl-2">
                       <button onClick={() => setGame(g => ({ ...g, mysteryBeeTurnsLeft: Math.max(0, (g.mysteryBeeTurnsLeft || 0) - 1) }))}
                         className="w-6 h-6 flex items-center justify-center rounded-full bg-pink-900/60 hover:bg-pink-800 text-pink-300 font-black">−</button>
                       <button onClick={() => setGame(g => ({ ...g, mysteryBeeTurnsLeft: (g.mysteryBeeTurnsLeft || 0) + 1 }))}
                         className="w-6 h-6 flex items-center justify-center rounded-full bg-pink-900/60 hover:bg-pink-800 text-pink-300 font-black">+</button>
                       <button onClick={() => setGame(g => ({ ...g, mysteryBeeTurnsLeft: null }))} 
                         className="ml-1 px-2 py-0.5 bg-gray-800 text-gray-400 hover:text-red-400 text-xs rounded-full">끄기</button>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {!editMode && <span className="text-blue-400 text-[10px] sm:text-sm">📍 칸 클릭 = 말 위치 이동</span>}
                {editMode && (
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Sub-mode buttons */}
                    {([
                      ['fert',    '🌿 비료',   '클릭마다 100→200→300→400→500→600 순환'],
                      ['monster', '👾 몬스터', '클릭마다 없음→황금벌→독호문→신비한벌 순환'],
                      ['mole',    '🐭 이동효과', '클릭마다 없음→-2칸→-3칸→+3칸 순환'],
                      ['specdie', '🎲 특주', '특수 주사위 획득 칸 지정 (1개만 존재 가능)'],
                    ] as const).map(([m, label, tip]) => (
                      <button key={m}
                        title={tip}
                        onClick={() => setEditSubMode(m)}
                        className={`px-3 py-1.5 rounded-xl text-sm font-bold border-2 transition-all
                          ${editSubMode === m
                            ? 'bg-yellow-700 border-yellow-400 text-white'
                            : 'bg-gray-800 border-gray-600 text-gray-400 hover:border-yellow-500'}`}>
                        {label}
                      </button>
                    ))}
                  </div>
                )}
                <button onClick={() => setEditMode(v => !v)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all
                    ${editMode
                      ? 'bg-orange-700 border-orange-400 text-white'
                      : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-yellow-500 hover:text-yellow-400'}`}>
                  ✏️ {editMode ? '편집 종료' : '편집 모드'}
                </button>
              </div>
            </div>

            {/* Sub-mode hint */}
            {editMode && (
              <div className="mb-2 text-sm font-bold rounded-xl px-3 py-2 bg-yellow-900/30 border border-yellow-700/40 flex flex-wrap gap-x-4 gap-y-1">
                {editSubMode === 'fert' && <span className="text-yellow-300">🌿 비료 모드: 비료 칸을 클릭하면 <strong>100→...→500→600→100</strong> 순환합니다</span>}
                {editSubMode === 'monster' && <span className="text-yellow-300">👾 몬스터 모드: 칸을 클릭하면 <strong>없음→🐝황금벌(×2)→☠️독호문(×0.5)→✨신비한벌(×3)</strong> 순환합니다</span>}
                {editSubMode === 'mole' && <span className="text-yellow-300">🐭 이동효과 모드: 칸을 클릭하면 <strong>없음→-2칸→-3칸→+3칸(점프대)→없음</strong> 순환합니다 (유형당 1칸만 배치)</span>}
                {editSubMode === 'specdie' && <span className="text-yellow-300">🎲 특수주사위 모드: 칸을 클릭하면 해당 칸을 <strong>🎲+특수주사위</strong> 칸으로 덮어씁니다. (보드에 1개만 존재 가능)</span>}
              </div>
            )}

            <BoardGrid board={board} playerPos={game.position}
              highlightPos={highlightPos} editMode={editMode} onCellClick={handleCellClick}>
              {/* 주사위 입력 UI를 Board 가운데에 배치 */}
              <div className="bg-gray-900 border-2 border-purple-700/60 rounded-2xl p-4 md:p-5 w-full md:max-h-[60vh] md:overflow-y-auto bg-opacity-95 md:backdrop-blur-sm shadow-xl shadow-purple-900/40 custom-scrollbar">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-purple-300 font-black text-xl">🎲 주사위 결과 입력</div>
                    <div className="text-gray-500 text-sm mt-0.5">인게임에서 굴린 눈금 3개를 선택하세요</div>
                  </div>
                  {(analysisActive || inputDice.some(v => v !== null)) && (
                    <button onClick={resetRound}
                      className="text-sm text-yellow-400 hover:text-white border-2 border-yellow-700/80 rounded-xl px-3 py-1.5 hover:border-yellow-500 bg-gray-900 shrink-0 font-bold transition-all shadow-[0_0_8px_rgba(234,179,8,0.3)]">
                      🔄 새로 입력
                    </button>
                  )}
                </div>

                {!analysisActive ? (
                  <>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4 mb-3 md:mb-5">
                      {[0, 1, 2].map(i => (
                        <DiePicker key={i} label={`주사위 ${i + 1}`} value={inputDice[i]}
                          onChange={v => setInputDice(prev => { const n = [...prev]; n[i] = v; return n; })} />
                      ))}
                    </div>
                    <button onClick={confirmDice} disabled={!diceReady}
                      className={`w-full py-3 md:py-4 rounded-xl md:rounded-2xl text-base md:text-lg font-black transition-all
                        ${diceReady
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-xl shadow-purple-900/50'
                          : 'bg-gray-800 text-gray-600 cursor-not-allowed'}`}>
                      {diceReady ? '✅ 최적 경로 분석하기' : '주사위 3개를 모두 입력하세요'}
                    </button>
                  </>
                ) : (
                  <div className="space-y-3 md:space-y-4 mt-2">
                    <div className={`text-center text-sm md:text-lg font-black py-2 md:py-4 rounded-xl flex flex-col items-center justify-center gap-1 md:gap-2 ${allUsed ? 'bg-green-900/20 border-2 border-green-600' : 'bg-purple-900/30 text-purple-300 border border-purple-800'}`}>
                      {allUsed ? (
                        <>
                          <span className="text-green-400">✅ 주사위 3개를 모두 사용했습니다!</span>
                          <button onClick={resetRound} className="mt-1 px-4 md:px-8 py-2 md:py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white text-xs md:text-base rounded-xl shadow-[0_0_15px_rgba(34,197,94,0.5)] transition-all">
                            다음 주사위 3개 입력하기
                          </button>
                        </>
                      ) : (
                        <span>분석 완료 — (특수 주사위를 반영할 수 있습니다)</span>
                      )}
                    </div>

                    {!allUsed && (
                      <div className="flex flex-col md:flex-row gap-2 md:gap-3">
                        {game.rolledDice.map((val, i) => (
                          <div key={i} className={`flex-1 flex flex-row md:flex-col items-center bg-gray-900 border-2 rounded-xl p-2 md:p-3 transition-colors ${game.rolledSpecDice[i] ? 'border-yellow-600 shadow-[0_0_10px_rgba(202,138,4,0.3)]' : 'border-purple-500/30'}`}>
                            <div className="w-[60px] md:w-full flex flex-col items-center justify-center shrink-0 border-r border-gray-700 md:border-r-0 md:border-b-0 pr-2 md:pr-0">
                              <span className="text-gray-400 text-[10px] md:text-xs font-bold md:mb-1 w-full text-center">주사위 {i + 1}</span>
                              <span className="text-3xl md:text-5xl md:bg-gray-800 md:border-2 border-purple-500/50 md:rounded-xl md:aspect-square flex items-center justify-center text-purple-300 font-black md:shadow-lg mt-0.5 w-full">
                                {DICE_FACES[val - 1]}
                              </span>
                            </div>
                            <div className="flex-1 w-full pl-3 md:pl-0 mt-0 md:mt-2 relative flex flex-col justify-center">
                              <span className="text-yellow-500 font-bold bg-gray-800 border border-gray-700 rounded px-1.5 py-0.5 text-[9px] self-start md:self-auto md:absolute md:-top-7 md:right-1 z-10 hidden md:inline-block">특주 입력</span>
                              <span className="md:hidden text-yellow-500 font-bold mb-1 text-[9px]">특수 주사위 추가 (선택)</span>
                              <select value={game.rolledSpecDice[i] || ''} onChange={e => {
                                const s = e.target.value ? Number(e.target.value) as SpecDie : null;
                                setGame(g => {
                                  const n = [...g.rolledSpecDice];
                                  n[i] = s;
                                  return { ...g, rolledSpecDice: n };
                                });
                              }} 
                               className={`w-full font-bold rounded-lg px-2 py-1.5 md:py-1 border outline-none text-[11px] md:text-xs text-center cursor-pointer appearance-none ${game.rolledSpecDice[i] ? 'bg-yellow-900/40 text-yellow-300 border-yellow-500/50' : 'bg-gray-800 text-gray-400 border-gray-600 hover:border-yellow-600/50'}`}>
                                 <option value="">적용 안함</option>
                                 {([1, 2, 3, 4, 5, 6] as SpecDie[]).map(spec => (
                                   <option key={spec} value={spec}>{SPEC_DIE_META[spec].label}</option>
                                 ))}
                              </select>
                              <div className="absolute right-2 top-auto bottom-[9px] md:top-1/2 md:-translate-y-1/2 md:bottom-auto pointer-events-none text-[8px] md:text-[10px] text-gray-500">▼</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="text-gray-400 text-center text-[11px] md:text-sm mb-3 md:mb-4">
                      확인 버튼을 누르면 인게임처럼 점수와 위치가 자동 기록됩니다.<br className="hidden md:block" />아래의 최적 경로를 확인 후 적용하세요.
                    </div>

                    {!allUsed && evAnalysis && (
                      <div className="bg-yellow-900/10 border border-yellow-700/50 rounded-xl p-3 md:p-4 flex flex-col items-center mb-3 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-yellow-600/20 text-yellow-300 text-[8px] md:text-[10px] font-black px-1.5 py-0.5 rounded-bl-[4px]">기댓값 분석기</div>
                        <div className="text-yellow-300 font-bold mb-1 flex items-center gap-1.5">
                          <span className="text-sm md:text-lg">💡 추천: 특수 주사위 굴리기</span>
                        </div>
                        <div className="text-gray-300 text-[11px] md:text-sm text-center">
                          현재 패에서는 <strong className="text-yellow-400 font-black">[주사위 {evAnalysis.dieIndex + 1}]</strong>에 특수 주사위를 굴리면
                          평균 <strong className="text-green-400">+{Math.round(evAnalysis.evGain)}</strong>의 이득이 예상됩니다!
                        </div>
                      </div>
                    )}

                    {!allUsed && bestPath && (
                      <div className="bg-gray-800 border-2 border-purple-500/30 p-3 md:p-5 rounded-2xl flex flex-col items-center shadow-lg">
                        <div className="text-gray-300 font-bold mb-2 md:mb-4 flex items-center justify-between w-full text-xs sm:text-base">
                          <span>🌟 추천 이동 순서</span>
                          <span className="text-blue-300 font-black text-xs sm:text-lg">결과 획득 비료: <span className="text-yellow-400 text-sm md:text-lg">+{bestPath.totalScore}</span></span>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2 mb-3 md:mb-4 bg-gray-900 p-2 sm:p-4 rounded-xl border border-gray-700 w-full">
                          {bestPath.sequence.map((step: any, i: number) => (
                            <React.Fragment key={i}>
                              <div className="flex flex-col items-center">
                                <span className="text-[9px] md:text-[10px] text-purple-400/80 font-bold mb-0.5 md:mb-1">주사위 {step.dieIndex + 1}</span>
                                <div className={`bg-gray-800 border-2 rounded-lg md:rounded-xl px-1.5 py-1 md:px-3 md:py-1.5 flex items-center gap-1.5 md:gap-2 shadow-lg ${step.specEffect ? 'border-yellow-500/60' : 'border-blue-500/50'}`}>
                                  <span className={`${step.specEffect ? 'text-yellow-300' : 'text-blue-300'} font-black text-xl md:text-4xl`}>{DICE_FACES[step.dieValue - 1]}</span>
                                  {step.specEffect && <span className="text-yellow-400 border-yellow-700/50 text-[8px] md:text-[10px] font-black leading-tight text-left border-l pl-1.5 md:pl-2">특주<br/>{SPEC_DIE_META[step.specEffect as SpecDie].label}</span>}
                                </div>
                              </div>
                              {i < bestPath.sequence.length - 1 && <span className="text-gray-600 text-sm md:text-xl font-black mt-3 md:mt-4">▶</span>}
                            </React.Fragment>
                          ))}
                        </div>
                        <button onClick={() => applyPathToGame(bestPath!)}
                          className="w-full py-2.5 sm:py-3.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm md:text-base font-bold shadow-[0_0_10px_rgba(147,51,234,0.4)] transition-all">
                          ✅ 위 경로로 내 보드 기록하기
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </BoardGrid>

            {/* Legend 부분 및 수동 비료 추가 (하단 콤팩트 배치) */}
            <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-gray-800 pt-4">
              <div className="flex flex-wrap gap-x-4 gap-y-2 items-center">
                {Object.entries(SPACE_META).map(([type, m]) => (
                  <div key={type} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded" style={{ background: m.bg, border: `1.5px solid ${m.color}` }} />
                    <span className="text-gray-500 text-xs font-medium">{m.label}</span>
                  </div>
                ))}
                <div className="flex items-center gap-1.5 ml-1">
                  <span className="text-xs text-gray-500">몬스터칸:</span>
                  <span className="text-[10px] text-gray-400">비료(취소선) → 실제(×배율) 표시</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-green-500/70 font-bold text-xs">🌿 수동 비료 보정:</span>
                <div className="flex gap-1.5">
                  {[100, 300, 600].map(v => (
                    <button key={v} onClick={() => setGame(g => ({ ...g, fertilizer: g.fertilizer + v }))}
                      className="px-2 py-1 bg-gray-800 hover:bg-green-900/50 text-green-400 text-xs font-bold rounded-lg border border-gray-700 hover:border-green-700 transition-colors">
                      +{v}
                    </button>
                  ))}
                  <button onClick={() => setGame(g => ({ ...g, fertilizer: g.fertilizer + 400 }))}
                    className="px-2 py-1 bg-gray-800 hover:bg-yellow-900/50 text-yellow-400 text-xs font-bold rounded-lg border border-gray-700 hover:border-yellow-700 transition-colors">
                    +400
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'guide' && <StrategyGuide />}
    </div>
  );
}
