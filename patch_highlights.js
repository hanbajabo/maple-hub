const fs = require('fs');
const f = 'C:/Users/USER/Desktop/maple-colosseum/maple-hub/app/blog/ultima-squad-minigame-guide/page.tsx';
let c = fs.readFileSync(f, 'utf8');

const oldTip = `                                <li>\r\n                                    <strong className="text-yellow-300">💡 훈련용 큐브 절약 팁</strong>: \r\n                                    3단계 아이템부터는 잠재능력이 <strong className="text-white">2줄</strong>이 나오기 때문에, 이때 큐브로 2줄 유효 옵션을 뽑는 것이 핵심입니다. \r\n                                    하지만 생각보다 원하는 옵션이 잘 안 나와 큐브 소모량이 매우 큽니다. 따라서 <strong className="text-white">2단계 아이템 구간에서는 최대한 큐브 사용을 자제하고 아껴두는 것</strong>이 훨씬 유리합니다.\r\n                                </li>`;

const newTip = `                                <li>\r\n                                    <strong className="text-yellow-300">💡 훈련용 큐브 절약 팁</strong>: \r\n                                    3단계 아이템부터는 잠재능력이 <strong className="text-white">2줄</strong>이 나오기 때문에, 이때 큐브로 2줄 유효 옵션을 뽑는 것이 핵심입니다. \r\n                                    하지만 생각보다 원하는 옵션이 잘 안 나와 큐브 소모량이 매우 큽니다. 따라서 <strong className="text-white">2단계 아이템 구간에서는 최대한 큐브 사용을 자제하고 아껴두는 것</strong>이 훨씬 유리합니다.\r\n                                </li>\r\n                                <li className="list-none -ml-4">\r\n                                    <div className="mt-2 p-3 bg-purple-950/40 border border-purple-500/30 rounded-xl flex items-start gap-2.5">\r\n                                        <span className="text-purple-300 text-base mt-0.5 shrink-0">⭐</span>\r\n                                        <div className="text-xs sm:text-sm leading-relaxed space-y-1.5">\r\n                                            <p className="text-purple-200 font-bold">본섭 기준 큐브 사용 전략 추천</p>\r\n                                            <p className="text-slate-300">본섭 출시 후 착용 렙제가 변경되면서 <strong className="text-white">3단계(Lv. 12)</strong>와 <strong className="text-white">4단계(Lv. 22 테섭 기준)</strong> 구간의 갭이 생각보다 큽니다.</p>\r\n                                            <p className="text-slate-300">큐브를 최대한 아껴두고, <strong className="text-emerald-300">에픽 잠재능력 2줄이 붙는 4단계 아이템부터 본격적으로 잠재능력을 뽑는 것</strong>을 강력히 추천합니다.</p>\r\n                                            <div className="flex flex-wrap gap-2 mt-1.5">\r\n                                                <span className="px-2.5 py-1 bg-slate-800 rounded-lg text-xs text-slate-400 font-medium">1~3단계: 큐브 자제 💤</span>\r\n                                                <span className="px-2.5 py-1 bg-emerald-900/50 border border-emerald-600/30 rounded-lg text-xs text-emerald-300 font-bold">4단계(에픽) 이상부터 집중 투자 ✅</span>\r\n                                            </div>\r\n                                        </div>\r\n                                    </div>\r\n                                </li>`;

if (c.includes(oldTip)) {
  c = c.replace(oldTip, newTip);
  fs.writeFileSync(f, c, 'utf8');
  console.log('SUCCESS');
} else {
  console.log('NOT FOUND - checking raw content...');
  const idx = c.indexOf('훈련용 큐브 절약 팁');
  if (idx > 0) console.log(JSON.stringify(c.substring(idx - 100, idx + 300)));
}
