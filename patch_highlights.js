const fs = require('fs');
const f = 'C:/Users/USER/Desktop/maple-colosseum/maple-hub/app/blog/ultima-squad-minigame-guide/page.tsx';
let c = fs.readFileSync(f, 'utf8');

const anchor = `                        {/* 1. 단계별 장비 기본 스탯 (전체 너비 대형 종합 테이블) */}\r\n                        <div className="mb-6">\r\n                                <table`;

const replacement = `                        {/* 1. 단계별 장비 기본 스탯 (전체 너비 대형 종합 테이블) */}\r\n                        <div className="mb-6">\r\n                            {/* 본섭 변경 안내 배너 */}\r\n                            <div className="mb-3 p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl flex items-start gap-2.5">\r\n                                <span className="text-amber-400 text-base mt-0.5 shrink-0">⚠️</span>\r\n                                <div className="text-xs sm:text-sm leading-relaxed space-y-1">\r\n                                    <p className="text-amber-300 font-bold">본섭 출시 후 착용 레벨 변경 안내</p>\r\n                                    <p className="text-slate-300">착용 레벨이 테섭 대비 본섭 출시 시 일부 변경되었습니다. 아래 수치는 본섭 기준으로 업데이트되었으나, 일부 단계는 추가 실측이 필요합니다.</p>\r\n                                    <ul className="text-slate-400 space-y-0.5 list-disc list-inside mt-1">\r\n                                        <li><span className="text-white font-semibold">3단계</span>: 테섭 <span className="line-through text-slate-500">Lv. 15 이상</span> → 본섭 <span className="text-emerald-300 font-bold">Lv. 12 이상</span> <span className="text-emerald-400">(본섭 실측 확인)</span></li>\r\n                                        <li><span className="text-yellow-300 font-semibold">그 외 단계</span>: 본섭 변경 여부 <span className="text-yellow-300 font-bold">추가 실측 확인 필요</span></li>\r\n                                    </ul>\r\n                                </div>\r\n                            </div>\r\n                                <table`;

if (c.includes(anchor)) {
  c = c.replace(anchor, replacement);
  fs.writeFileSync(f, c, 'utf8');
  console.log('SUCCESS: banner inserted');
} else {
  console.log('NOT FOUND');
  // Try to find the anchor with LF only
  const anchor2 = `                        {/* 1. 단계별 장비 기본 스탯 (전체 너비 대형 종합 테이블) */}\n                        <div className="mb-6">\n                                <table`;
  if (c.includes(anchor2)) {
    console.log('Found with LF');
  } else {
    console.log('Checking content around line 750...');
    const idx = c.indexOf('1. 단계별 장비 기본 스탯');
    console.log('Found at:', idx);
    if (idx > 0) console.log(JSON.stringify(c.substring(idx - 50, idx + 200)));
  }
}
