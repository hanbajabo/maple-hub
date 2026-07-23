const fs = require('fs');
const f = 'C:/Users/USER/Desktop/maple-colosseum/maple-hub/app/blog/ultima-squad-minigame-guide/page.tsx';
let c = fs.readFileSync(f, 'utf8');

// The map block starts at byte 163218 inside the file
// Find the exact anchor string
const anchor = `].map((row, idx) => {\r\n                                            const isSuccess = row.note.includes('성공') && !row.note.includes('실패');`;
const si = c.indexOf(anchor);
console.log('anchor found at:', si);

if (si === -1) {
  console.log('ERROR: anchor not found');
  process.exit(1);
}

// Find the end of the map block (the closing })} after the last </tr>)
const blockStart = si;
// Find closing })} 
const endAnchor = `                                        })}\r\n                                    </tbody>`;
const ei = c.indexOf(endAnchor, blockStart);
console.log('end found at:', ei);

if (ei === -1) {
  console.log('ERROR: end anchor not found');
  process.exit(1);
}

const newMapBlock = `].map((row, idx) => {
                                            const isFailRed = 'failRed' in row && Boolean(row.failRed);
                                            const isSuccess = !isFailRed && ('isGreen' in row ? Boolean(row.isGreen) : (row.note.includes('성공') && !row.note.includes('실패')));
                                            return (
                                                <tr
                                                    key={idx}
                                                    className={
                                                        isFailRed
                                                            ? 'bg-rose-950/40 border-l-4 border-l-rose-500 ring-1 ring-rose-500/40 font-semibold'
                                                            : isSuccess
                                                            ? 'bg-emerald-950/40 border-l-4 border-l-emerald-400 ring-1 ring-emerald-500/30 font-semibold'
                                                            : idx % 2 === 0 ? 'bg-slate-900/30' : 'bg-slate-950/30'
                                                    }
                                                >
                                                    <td className={\`p-2 sm:p-3 border border-slate-700 font-bold whitespace-nowrap \${isFailRed ? 'text-rose-300' : isSuccess ? 'text-emerald-200' : 'text-white'}\`}>
                                                        {row.lv}
                                                    </td>
                                                    <td className={\`p-2 sm:p-3 border border-slate-700 \${isFailRed ? 'text-rose-200/90' : isSuccess ? 'text-slate-200' : 'text-slate-300'}\`}>
                                                        {row.gear}
                                                    </td>
                                                    <td className="p-2 sm:p-3 border border-slate-700 font-semibold whitespace-nowrap">
                                                        {isFailRed ? (
                                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40 text-xs shadow-sm">
                                                                {row.clear}
                                                            </span>
                                                        ) : isSuccess ? (
                                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 text-xs shadow-sm">
                                                                {row.clear.startsWith('✅') ? row.clear : \`✅ \${row.clear} 클리어!\`}
                                                            </span>
                                                        ) : (
                                                            <span className="text-slate-300 text-xs">
                                                                {row.clear}
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="p-2 sm:p-3 border border-slate-700 text-xs">
                                                        {isFailRed ? (
                                                            <span className="text-rose-300 font-bold">{row.note}</span>
                                                        ) : isSuccess ? (
                                                            <span className="text-emerald-300 font-bold">{row.note}</span>
                                                        ) : (
                                                            <span className="text-red-400 font-medium">{row.note}</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>`;

c = c.slice(0, si) + newMapBlock + c.slice(ei + endAnchor.length);
fs.writeFileSync(f, c, 'utf8');
console.log('SUCCESS: map block replaced!');
