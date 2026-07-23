const fs = require('fs');
const f = 'C:/Users/USER/Desktop/maple-colosseum/maple-hub/app/blog/ultima-squad-minigame-guide/page.tsx';
let c = fs.readFileSync(f, 'utf8');

const target = `<p className="text-slate-300">본섭 출시 후 착용 렙제가 변경되면서 장비 렙제가 낮아졌습니다. 장비 교체 주기가 빨라지면서 큐브를 최대한 아껴두는 것이 좋습니다.</p>\r\n                                            <p className="text-slate-300"><strong className="text-emerald-300">에픽 잠재능력 2줄이 붙는 4단계 아이템부터 본격적으로 잠재능력을 뽑는 것</strong>을 강력히 추천합니다.</p>\r\n                                            <div className="flex flex-wrap gap-2 mt-1.5">\r\n                                                <span className="px-2.5 py-1 bg-slate-800 rounded-lg text-xs text-slate-400 font-medium">1~3단계: 큐브 자제 💤</span>\r\n                                                <span className="px-2.5 py-1 bg-emerald-900/50 border border-emerald-600/30 rounded-lg text-xs text-emerald-300 font-bold">4단계(에픽) 이상부터 집중 투자 ✅</span>\r\n                                            </div>`;

const replace = `<p className="text-slate-300">본섭 출시 후 착용 렙제가 변경되면서 장비 렙제가 낮아졌습니다.</p>\r\n                                            <p className="text-slate-300">장비 교체 주기가 빨라지면서 큐브를 최대한 아껴두는 것이 좋습니다.</p>\r\n                                            <p className="text-slate-300"><strong className="text-emerald-300">에픽 잠재능력 2줄이 붙는 4단계 아이템부터 본격적으로 잠재능력을 뽑는 것</strong>을 추천합니다.</p>`;

if (c.includes(target)) {
    c = c.replace(target, replace);
    fs.writeFileSync(f, c, 'utf8');
    console.log('SUCCESS');
} else {
    // try line by line approach if exact block string fails
    console.log('NOT FOUND, trying partial approach');
    let c2 = fs.readFileSync(f, 'utf8');
    
    // Line 1 split
    const old1 = `<p className="text-slate-300">본섭 출시 후 착용 렙제가 변경되면서 장비 렙제가 낮아졌습니다. 장비 교체 주기가 빨라지면서 큐브를 최대한 아껴두는 것이 좋습니다.</p>`;
    const new1 = `<p className="text-slate-300">본섭 출시 후 착용 렙제가 변경되면서 장비 렙제가 낮아졌습니다.</p>\r\n                                            <p className="text-slate-300">장비 교체 주기가 빨라지면서 큐브를 최대한 아껴두는 것이 좋습니다.</p>`;
    if(c2.includes(old1)) {
        c2 = c2.replace(old1, new1);
        console.log('Replaced Line 1');
    }
    
    // Line 2 modification
    const old2 = `<p className="text-slate-300"><strong className="text-emerald-300">에픽 잠재능력 2줄이 붙는 4단계 아이템부터 본격적으로 잠재능력을 뽑는 것</strong>을 강력히 추천합니다.</p>`;
    const new2 = `<p className="text-slate-300"><strong className="text-emerald-300">에픽 잠재능력 2줄이 붙는 4단계 아이템부터 본격적으로 잠재능력을 뽑는 것</strong>을 추천합니다.</p>`;
    if(c2.includes(old2)) {
        c2 = c2.replace(old2, new2);
        console.log('Replaced Line 2');
    }

    // Removing the div block
    const divBlockStart = `<div className="flex flex-wrap gap-2 mt-1.5">`;
    const divBlockEnd = `4단계(에픽) 이상부터 집중 투자 ✅</span>\r\n                                            </div>`;
    
    const idxStart = c2.indexOf(divBlockStart);
    const idxEnd = c2.indexOf(divBlockEnd, idxStart);
    
    if (idxStart !== -1 && idxEnd !== -1) {
        c2 = c2.slice(0, idxStart) + c2.slice(idxEnd + divBlockEnd.length);
        console.log('Removed div block');
    }
    
    fs.writeFileSync(f, c2, 'utf8');
    console.log('SUCCESS (partial)');
}
