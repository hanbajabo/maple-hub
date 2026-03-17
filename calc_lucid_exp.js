const EXP_DATA = [
    { level: 260, req: 1731919984062, cum: 10882478434008 },
    { level: 261, req: 1749239183902, cum: 12631717617910 },
    { level: 262, req: 1766731575741, cum: 14398449193651 },
    { level: 263, req: 1784398891498, cum: 16182848085149 },
    { level: 264, req: 1802242880412, cum: 17985090965561 },
    { level: 265, req: 2342915744535, cum: 20328006710096 },
    { level: 266, req: 2366344901980, cum: 22694351612076 },
    { level: 267, req: 2390008350999, cum: 25084359963075 },
    { level: 268, req: 2413908434508, cum: 27498268397583 },
    { level: 269, req: 2438047518853, cum: 29936315916436 },
    { level: 270, req: 5412465491853, cum: 35348781408289 },
    { level: 271, req: 5466590146771, cum: 40815371555360 },
    { level: 272, req: 5521256048238, cum: 46336627603298 },
    { level: 273, req: 5576468608720, cum: 51913096212018 },
    { level: 274, req: 5632233294807, cum: 57545329506825 },
    { level: 275, req: 11377111255510, cum: 68922440762335 },
    { level: 276, req: 12514822381061, cum: 81437263143396 },
    { level: 277, req: 13766304619167, cum: 95203567762563 },
    { level: 278, req: 15142935081083, cum: 110346502843647 },
    { level: 279, req: 16657228589191, cum: 127003731431838 },
    { level: 280, req: 33647601750165, cum: 160651333182004 },
    { level: 281, req: 37012361925181, cum: 197663695107187 },
    { level: 282, req: 40713598117699, cum: 245897266628153 },
    { level: 283, req: 44784957929468, cum: 290682224557624 },
    { level: 284, req: 49263453722414, cum: 339945678280042 },
    { level: 285, req: 99512176519276, cum: 439457854799318 },
    { level: 286, req: 109463394171203, cum: 548921248970521 },
    { level: 287, req: 120409733588323, cum: 669330982558844 },
    { level: 288, req: 132450706947155, cum: 801781689505999 },
    { level: 289, req: 145695777641870, cum: 947477467147869 },
    { level: 290, req: 294305470836577, cum: 1241782937984446 },
    { level: 291, req: 323736017920234, cum: 1565518955904680 },
    { level: 292, req: 356109619712257, cum: 1921628575616937 },
    { level: 293, req: 391720581683482, cum: 2313349157299419 },
    { level: 294, req: 430892639851830, cum: 2744241797151249 },
    { level: 295, req: 870403132500696, cum: 3614644929651945 },
    { level: 296, req: 957443445750765, cum: 4572088375402710 },
];

function calcFinalLevel(startLevel, gainedExp) {
    const startData = EXP_DATA.find(d => d.level === startLevel);
    if (!startData) return null;
    const targetCum = startData.cum + gainedExp;
    for (let i = 0; i < EXP_DATA.length - 1; i++) {
        const curr = EXP_DATA[i];
        const next = EXP_DATA[i + 1];
        if (targetCum >= curr.cum && targetCum < next.cum) {
            const progress = ((targetCum - curr.cum) / curr.req * 100).toFixed(1);
            const levelsGained = curr.level - startLevel;
            const totalGained = levelsGained + parseFloat(progress) / 100;
            return { finalLevel: curr.level, progress, levelsGained, totalGained: totalGained.toFixed(2) };
        }
    }
    return null;
}

const cases = [
    { startLevel: 260, dreamEater: 25881925, totalExp: 48103117110000 },
    { startLevel: 265, dreamEater: 30854610, totalExp: 57351141310000 },
    { startLevel: 270, dreamEater: 36078500, totalExp: 67060270500000 },
    { startLevel: 275, dreamEater: 42863600, totalExp: 79673365650000 },
    { startLevel: 280, dreamEater: 51540400, totalExp: 95800234420000 },
    { startLevel: 285, dreamEater: 66666666, totalExp: 123913313100000 },
    { startLevel: 290, dreamEater: 89155715, totalExp: 165716423550000 },
    { startLevel: 295, dreamEater: 104963900, totalExp: 195100539220000 },
];

console.log("시작레벨 | 드림이터EXP | 최종레벨 | 진행% | 레벨+");
cases.forEach(c => {
    const r = calcFinalLevel(c.startLevel, c.totalExp);
    if (r) {
        console.log(`LV.${c.startLevel} | ${c.dreamEater.toLocaleString()} | LV.${r.finalLevel} | ${r.progress}% | +${r.totalGained}`);
    }
});
