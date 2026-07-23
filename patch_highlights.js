const fs = require('fs');
const f = 'C:/Users/USER/Desktop/maple-colosseum/maple-hub/app/blog/ultima-squad-minigame-guide/page.tsx';
let c = fs.readFileSync(f, 'utf8');

const target1 = `본섭 출시 후 착용 렙제가 변경되면서 <strong className="text-white">3단계(Lv. 12)</strong>와 <strong className="text-white">4단계(Lv. 22 테섭 기준)</strong> 구간의 갭이 생각보다 큽니다.`;
const target2 = `큐브를 최대한 아껴두고, <strong className="text-emerald-300">에픽 잠재능력 2줄이 붙는 4단계 아이템부터 본격적으로 잠재능력을 뽑는 것</strong>을 강력히 추천합니다.`;

const replace1 = `본섭 출시 후 착용 렙제가 변경되면서 장비 렙제가 낮아졌습니다. 장비 교체 주기가 빨라지면서 큐브를 최대한 아껴두는 것이 좋습니다.`;
const replace2 = `<strong className="text-emerald-300">에픽 잠재능력 2줄이 붙는 4단계 아이템부터 본격적으로 잠재능력을 뽑는 것</strong>을 강력히 추천합니다.`;

if (c.includes(target1) && c.includes(target2)) {
    c = c.replace(target1, replace1);
    c = c.replace(target2, replace2);
    fs.writeFileSync(f, c, 'utf8');
    console.log('SUCCESS');
} else {
    console.log('NOT FOUND');
}
