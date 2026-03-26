import { Space, SpaceType, TOTAL_SPACES } from './types';

// Board layout (clockwise from START=0 going counter-clockwise)
// 0=START(BR), 1-9=bottom going left, 10=BL(Rocket)
// 11-19=left going up, 20=TL(specdie+400)
// 21-29=top going right, 30=TR(question)
// 31-39=right going down

const DEFAULTS: { type: SpaceType; fert: number }[] = [
  { type: 'start',   fert: 100 }, // 0  START
  { type: 'fert',    fert: 100 }, // 1
  { type: 'fert',    fert: 100 }, // 2
  { type: 'fert',    fert: 100 }, // 3
  { type: 'fert',    fert: 100 }, // 4
  { type: 'fert',    fert: 100 }, // 5
  { type: 'fert',    fert: 100 }, // 6
  { type: 'fert',    fert: 100 }, // 7
  { type: 'fert',    fert: 100 }, // 8
  { type: 'fert',    fert: 100 }, // 9
  { type: 'rocket',  fert: 0   }, // 10 BL corner - Rocket
  { type: 'fert',    fert: 100 }, // 11
  { type: 'fert',    fert: 100 }, // 12
  { type: 'fert',    fert: 100 }, // 13
  { type: 'fert',    fert: 100 }, // 14
  { type: 'fert',    fert: 100 }, // 15
  { type: 'fert',    fert: 100 }, // 16
  { type: 'fert',    fert: 100 }, // 17
  { type: 'fert',    fert: 100 }, // 18
  { type: 'fert',    fert: 100 }, // 19
  { type: 'fert',    fert: 100 }, // 20 TL corner
  { type: 'fert',    fert: 100 }, // 21
  { type: 'fert',    fert: 100 }, // 22
  { type: 'fert',    fert: 100 }, // 23
  { type: 'fert',    fert: 100 }, // 24
  { type: 'fert',    fert: 100 }, // 25
  { type: 'fert',    fert: 100 }, // 26
  { type: 'fert',    fert: 100 }, // 27
  { type: 'fert',    fert: 100 }, // 28
  { type: 'fert',    fert: 100 }, // 29
  { type: 'question',fert: 0   }, // 30 TR corner - 물음표
  { type: 'fert',    fert: 100 }, // 31
  { type: 'fert',    fert: 100 }, // 32
  { type: 'fert',    fert: 100 }, // 33
  { type: 'fert',    fert: 100 }, // 34
  { type: 'fert',    fert: 100 }, // 35
  { type: 'fert',    fert: 100 }, // 36
  { type: 'fert',    fert: 100 }, // 37
  { type: 'fert',    fert: 100 }, // 38
  { type: 'fert',    fert: 100 }, // 39
];

export function createDefaultBoard(): Space[] {
  return DEFAULTS.map((d, i) => ({
    id: i,
    type: d.type,
    fert: d.fert,
    monster: 'none',
    moveUsed: false,
    hasSpecDie: false,
  }));
}

// Visual board row/column layout (11×11 grid)
// Top row   : positions [20,21,22,23,24,25,26,27,28,29,30]  (left→right)
// Left col  : positions [19,18,17,16,15,14,13,12,11]        (top→bottom, rows 2-10)
// Bottom row: positions [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0] (left→right)
// Right col : positions [31,32,33,34,35,36,37,38,39]        (top→bottom, rows 2-10)

export type GridCell = { pos: number | null; row: number; col: number };

export function buildGridCells(): GridCell[] {
  const cells: GridCell[] = [];
  // top row (row 0)
  const topRow = [20,21,22,23,24,25,26,27,28,29,30];
  topRow.forEach((p,c) => cells.push({ pos: p, row: 0, col: c }));
  // inner rows (rows 1-9)
  for (let r = 1; r <= 9; r++) {
    // left column (col 0)
    const leftPos = 20 - r; // 19, 18, ... 11
    cells.push({ pos: leftPos, row: r, col: 0 });
    // inner cells
    for (let c = 1; c <= 9; c++) {
      cells.push({ pos: null, row: r, col: c });
    }
    // right column (col 10)
    const rightPos = 30 + r; // 31, 32, ... 39
    cells.push({ pos: rightPos, row: r, col: 10 });
  }
  // bottom row (row 10)
  const bottomRow = [10,9,8,7,6,5,4,3,2,1,0];
  bottomRow.forEach((p,c) => cells.push({ pos: p, row: 10, col: c }));
  return cells;
}

export function calcLanding(pos: number, move: number): { pos: number; crossedStart: boolean } {
  const raw = pos + move;
  const newPos = ((raw % TOTAL_SPACES) + TOTAL_SPACES) % TOTAL_SPACES;
  const crossedStart =
    (move > 0 && raw >= TOTAL_SPACES) ||
    (move < 0 && raw < 0);
  return { pos: newPos, crossedStart };
}
