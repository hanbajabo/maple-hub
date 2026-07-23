const fs = require('fs');
const f = 'C:/Users/USER/Desktop/maple-colosseum/maple-hub/app/blog/ultima-squad-minigame-guide/page.tsx';
let c = fs.readFileSync(f, 'utf8');

const target = `                            <div className="bg-slate-950/70 border border-blue-500/40 rounded-xl p-3.5">\r\n                                <p className="font-bold text-blue-300 text-sm mb-1.5 flex items-center gap-1.5">\r\n                                    <span>🛍️</span> <span>카오스 코인샵 구성품 수량 2배 증량</span>\r\n                                </p>`;

const newSection = `                            <div className="bg-slate-950/70 border border-orange-500/40 rounded-xl p-3.5">\r\n                                <p className="font-bold text-orange-300 text-sm mb-1.5 flex items-center gap-1.5">\r\n                                    <span>👕</span> <span>장비 착용 레벨 제한 변경 (본섭 기준 하향)</span>\r\n                                </p>\r\n                                <ul className="space-y-1 text-slate-300">\r\n                                    <li>• 2단계 장비: <span className="line-through text-slate-500">Lv. 8 이상</span> ➔ <strong className="text-orange-300 font-bold">Lv. 6 이상</strong> 착용 가능</li>\r\n                                    <li>• 3단계 장비: <span className="line-through text-slate-500">Lv. 15 이상</span> ➔ <strong className="text-orange-300 font-bold">Lv. 12 이상</strong> 착용 가능</li>\r\n                                    <li>• 4~5단계 장비: 본섭 변경 여부 <strong className="text-red-400 font-bold">추가 실측 확인 필요</strong> (테섭 기준 Lv. 22, Lv. 28)</li>\r\n                                </ul>\r\n                            </div>\r\n\r\n                            <div className="bg-slate-950/70 border border-blue-500/40 rounded-xl p-3.5">\r\n                                <p className="font-bold text-blue-300 text-sm mb-1.5 flex items-center gap-1.5">\r\n                                    <span>🛍️</span> <span>카오스 코인샵 구성품 수량 2배 증량</span>\r\n                                </p>`;

if (c.includes(target)) {
    c = c.replace(target, newSection);
    fs.writeFileSync(f, c, 'utf8');
    console.log('SUCCESS');
} else {
    // Try LF only
    const targetLF = target.replace(/\r\n/g, '\n');
    const newSectionLF = newSection.replace(/\r\n/g, '\n');
    if (c.includes(targetLF)) {
        c = c.replace(targetLF, newSectionLF);
        fs.writeFileSync(f, c, 'utf8');
        console.log('SUCCESS (LF)');
    } else {
        console.log('NOT FOUND');
    }
}
