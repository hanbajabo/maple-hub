import React from 'react';

interface TierDef {
    name: string;
    min: number;
    max?: number; // 다음 티어 시작점 (Master 이상은 없음)
    percent: string;
    color: string;
    bg: string;
    desc: string;
    hasDivisions: boolean; // 세부 등급(1~5) 여부
}

// 티어 데이터 정의 (높은 순)
export const TIERS: TierDef[] = [
    { name: "LEGEND", min: 1500000000, percent: "0.01%", color: "text-amber-500", bg: "bg-amber-950/40 border-amber-500/50", desc: "신화 속의 존재", hasDivisions: false },
    { name: "CHALLENGER", min: 1000000000, max: 1500000000, percent: "0.1%", color: "text-red-500", bg: "bg-red-950/40 border-red-500/50", desc: "메이플월드의 정점", hasDivisions: false },
    { name: "GRAND MASTER", min: 500000000, max: 1000000000, percent: "1%", color: "text-red-400", bg: "bg-red-900/30 border-red-400/30", desc: "초월자급 스펙", hasDivisions: false },
    { name: "MASTER", min: 250000000, max: 500000000, percent: "3%", color: "text-purple-400", bg: "bg-purple-900/30 border-purple-400/30", desc: "진정한 고인물", hasDivisions: false },
    // 이하 세부 등급 존재
    { name: "DIAMOND", min: 100000000, max: 250000000, percent: "10%", color: "text-cyan-400", bg: "bg-cyan-900/30 border-cyan-400/30", desc: "카링 / 칼로스 / 익스우", hasDivisions: true },
    { name: "PLATINUM", min: 50000000, max: 100000000, percent: "20%", color: "text-emerald-400", bg: "bg-emerald-900/30 border-emerald-400/30", desc: "검은 마법사 / 세렌 파티", hasDivisions: true },
    { name: "GOLD", min: 20000000, max: 50000000, percent: "40%", color: "text-yellow-400", bg: "bg-yellow-900/30 border-yellow-400/30", desc: "하드 보스 (루/윌/진) 파티", hasDivisions: true },
    { name: "SILVER", min: 10000000, max: 20000000, percent: "60%", color: "text-slate-300", bg: "bg-slate-700/40 border-slate-500/30", desc: "노말 루시드/윌 파티", hasDivisions: true },
    { name: "BRONZE", min: 5000000, max: 10000000, percent: "80%", color: "text-amber-600", bg: "bg-amber-900/30 border-amber-700/30", desc: "스우/데미안 솔플", hasDivisions: true },
    { name: "IRON", min: 0, max: 5000000, percent: "99%", color: "text-stone-500", bg: "bg-stone-800/40 border-stone-600/30", desc: "카루타 / 하매 도전", hasDivisions: true },
];

export default function CombatPowerRank({ combatPower }: { combatPower: string | number }) {
    const cp = typeof combatPower === 'string' ? parseInt(combatPower.replace(/,/g, '')) : combatPower;

    if (!cp && cp !== 0) return null;

    // 1. 내 티어 찾기
    const tier = TIERS.find(t => cp >= t.min) || TIERS[TIERS.length - 1];

    // 2. 세부 등급(Division) 계산
    let division = 0;
    let nextGoal = 0;
    let currentProgress = 0;
    let nextLabel = "";

    if (tier.hasDivisions && tier.max !== undefined) {
        const range = tier.max - tier.min;
        const divisionRange = range / 5; // 5등분
        const myPosition = cp - tier.min;

        // 0~19%: 5등급, 80~100%: 1등급
        // 등급 계산 (5 - (위치 / 구간))
        // 예: 위치가 90%면 5 - 4 = 1등급
        const rawDiv = 5 - Math.floor(myPosition / divisionRange);
        division = Math.max(1, Math.min(5, rawDiv));

        // 다음 목표 계산 (다음 등급 or 다음 티어)
        // 현재 등급의 상한선
        const currentDivMax = tier.min + (5 - division + 1) * divisionRange;

        if (division === 1) {
            // 1등급이면 다음 목표는 다음 티어
            nextGoal = tier.max;
            // 다음 티어 찾기
            const tierIndex = TIERS.indexOf(tier);
            const nextTierObj = TIERS[tierIndex - 1];
            nextLabel = nextTierObj ? `${nextTierObj.name} 승급` : "MAX";
        } else {
            // 아니면 다음 등급 (예: 4 -> 3)
            nextGoal = currentDivMax;
            nextLabel = `${tier.name} ${division - 1}`;
        }

        // 현재 등급 내에서의 진행률
        // 현재 등급 시작점
        const currentDivMin = tier.min + (5 - division) * divisionRange;
        currentProgress = ((cp - currentDivMin) / divisionRange) * 100;

    } else {
        // 마스터 이상 (세부 등급 없음)
        const tierIndex = TIERS.indexOf(tier);
        const nextTierObj = TIERS[tierIndex - 1];
        if (nextTierObj) {
            nextGoal = nextTierObj.min;
            nextLabel = nextTierObj.name;
            currentProgress = ((cp - tier.min) / (nextTierObj.min - tier.min)) * 100;
        } else {
            currentProgress = 100; // 챌린저스 탑
            nextLabel = "End Game";
        }
    }

    // 숫자 포맷팅
    const formatNum = (n: number) => new Intl.NumberFormat('ko-KR', { notation: "compact", maximumFractionDigits: 1 }).format(n);

    // 보스 데이터 정의 (전투력 기준 오름차순)
    const BOSS_DATA = [
        { name: "자쿰 (EASY)", cp: 3000 },
        { name: "자쿰 (NORMAL)", cp: 20000 },
        { name: "피에르 (NORMAL)", cp: 100000 },
        { name: "반반 (NORMAL)", cp: 100000 },
        { name: "블러디퀸 (NORMAL)", cp: 100000 },
        { name: "반 레온 (NORMAL)", cp: 100000 },
        { name: "혼테일 (EASY)", cp: 120000 },
        { name: "매그너스 (EASY)", cp: 150000 },
        { name: "힐라 (NORMAL)", cp: 150000 },
        { name: "벨룸 (NORMAL)", cp: 150000 },
        { name: "혼테일 (NORMAL)", cp: 150000 },
        { name: "아카이럼 (EASY)", cp: 150000 },
        { name: "파풀라투스 (EASY)", cp: 300000 },
        { name: "반 레온 (EASY)", cp: 300000 },
        { name: "반 레온 (HARD)", cp: 300000 },
        { name: "아카이럼 (NORMAL)", cp: 300000 },
        { name: "카웅 (NORMAL)", cp: 400000 },
        { name: "혼테일 (CHAOS)", cp: 400000 },
        { name: "핑크빈 (NORMAL)", cp: 400000 },
        { name: "매그너스 (NORMAL)", cp: 400000 },
        { name: "시그너스 (EASY)", cp: 400000 },
        { name: "시그너스 (NORMAL)", cp: 600000 },
        { name: "힐라 (HARD)", cp: 800000 },
        { name: "자쿰 (CHAOS)", cp: 900000 },
        { name: "파풀라투스 (NORMAL)", cp: 1500000 },
        { name: "피에르 (CHAOS)", cp: 3000000 },
        { name: "반반 (CHAOS)", cp: 3000000 },
        { name: "블러디퀸 (CHAOS)", cp: 3000000 },
        { name: "매그너스 (HARD)", cp: 3000000 },
        { name: "벨룸 (CHAOS)", cp: 5000000 },
        { name: "파풀라투스 (CHAOS)", cp: 6000000 },
        { name: "스우 (NORMAL)", cp: 7000000 },
        { name: "데미안 (NORMAL)", cp: 8000000 },
        { name: "가디언 엔젤 슬라임 (NORMAL)", cp: 8000000 },
        { name: "루시드 (EASY)", cp: 12000000 },
        { name: "윌 (EASY)", cp: 12000000 },
        { name: "더스크 (NORMAL)", cp: 16000000 },
        { name: "듄켈 (NORMAL)", cp: 18000000 },
        { name: "스우 (HARD)", cp: 19000000 },
        { name: "데미안 (HARD)", cp: 20000000 },
        { name: "루시드 (NORMAL)", cp: 20000000 },
        { name: "윌 (NORMAL)", cp: 25000000 },
        { name: "진 힐라 (NORMAL)", cp: 30000000 },
        { name: "루시드 (HARD)", cp: 40000000 },
        { name: "윌 (HARD)", cp: 40000000 },
        { name: "더스크 (CHAOS)", cp: 40000000 },
        { name: "듄켈 (HARD)", cp: 40000000 },
        { name: "진 힐라 (HARD)", cp: 50000000 },
        { name: "세렌 (NORMAL)", cp: 80000000 },
        { name: "최초의 대적자 (EASY)", cp: 90000000 },
        { name: "검은 마법사 (HARD)", cp: 120000000 },
        { name: "감시자 칼로스 (EASY)", cp: 120000000 },
        { name: "선택받은 세렌 (HARD)", cp: 180000000 },
        { name: "카링 (EASY)", cp: 250000000 },
        { name: "감시자 칼로스 (NORMAL)", cp: 250000000 },
        { name: "최초의 대적자 (NORMAL)", cp: 300000000 },
        { name: "스우 (EXTREME)", cp: 340000000 },
        { name: "카링 (NORMAL)", cp: 600000000 },
        { name: "림보 (NORMAL)", cp: 700000000 },
        { name: "감시자 칼로스 (CHAOS)", cp: 700000000 },
        { name: "발드릭스 (NORMAL)", cp: 800000000 },
        { name: "검은 마법사 (EXTREME)", cp: 800000000 },
        { name: "카링 (HARD)", cp: 1000000000 },
        { name: "선택받은 세렌 (EXTREME)", cp: 1100000000 },
        { name: "최초의 대적자 (HARD)", cp: 1200000000 },
        { name: "림보 (HARD)", cp: 1400000000 },
        { name: "감시자 칼로스 (EXTREME)", cp: 1600000000 },
        { name: "발드릭스 (HARD)", cp: 1700000000 },
        { name: "카링 (EXTREME)", cp: 2500000000 },
        { name: "최초의 대적자 (EXTREME)", cp: 3000000000 },
    ];

    // 추천 보스 필터링 (내 전투력 ~ 내 전투력 * 1.5 범위)
    // 단, 너무 낮은 보스는 제외 (내 전투력의 50% 미만은 제외)
    const recommendedBosses = BOSS_DATA.filter(b => b.cp <= cp && b.cp >= cp * 0.1).slice(-4).reverse();

    // 가장 근접한 도전 목표 보스 찾기 (내 전투력보다 높은 첫 번째 보스)
    const challengeBoss = BOSS_DATA.find(b => b.cp > cp);
    const challengeText = challengeBoss ? `${challengeBoss.name} 도전!` : tier.desc;

    return (
        <div className={`mt-4 p-6 rounded-xl border ${tier.bg} backdrop-blur-sm relative overflow-hidden shadow-lg group`}>

            {/* 배경 효과 */}
            <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[60px] opacity-20 ${tier.color.replace('text-', 'bg-')}`}></div>

            <div className="flex justify-between items-end mb-5 relative z-10">
                <div>
                    <h3 className="text-xs text-slate-400 font-bold mb-1 tracking-widest uppercase">Combat Power Tier</h3>
                    <div className="flex items-baseline gap-2">
                        <div className={`text-4xl font-black italic tracking-tighter ${tier.color} drop-shadow-sm`}>
                            {tier.name} {tier.hasDivisions && <span className="text-3xl not-italic">{division}</span>}
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                        <span className="bg-slate-950/50 px-2.5 py-1 rounded text-xs font-bold text-slate-400 border border-slate-700/50">상위 {tier.percent}</span>
                        <span className="text-sm text-slate-200 font-bold tracking-tight animate-pulse">{challengeText}</span>
                    </div>
                </div>

                <div className="text-right">
                    <div className="text-xs text-slate-500 font-bold uppercase mb-1">Next Goal</div>
                    {nextGoal > 0 ? (
                        <>
                            <div className="text-base font-bold text-slate-200">{nextLabel}</div>
                            <div className="text-xs text-slate-400">
                                +{formatNum(nextGoal - cp)} 필요
                            </div>
                        </>
                    ) : (
                        <div className="text-base font-bold text-yellow-500 animate-pulse">TOP RANKER</div>
                    )}
                </div>
            </div>

            {/* 진행도 게이지 */}
            <div className="relative h-4 bg-slate-950 rounded-full overflow-hidden border border-slate-800/50 z-10">
                {/* 눈금선 */}
                <div className="absolute inset-0 flex justify-between px-1 pointer-events-none z-20">
                    <div className="w-[1px] h-full bg-white/5 opacity-20"></div>
                    <div className="w-[1px] h-full bg-white/5 opacity-20"></div>
                    <div className="w-[1px] h-full bg-white/5 opacity-20"></div>
                </div>

                <div
                    className={`absolute top-0 left-0 h-full transition-all duration-1000 ease-out flex items-center justify-end px-1 ${tier.color.replace('text-', 'bg-')}`}
                    style={{ width: `${Math.min(currentProgress, 100)}%`, opacity: 0.8 }}
                >
                    <div className="w-1 h-1 bg-white rounded-full shadow-lg animate-ping opacity-50"></div>
                </div>
            </div>
            <div className="flex justify-between mt-1.5 px-0.5 mb-5">
                <span className="text-[10px] text-slate-500 font-mono">{formatNum(tier.hasDivisions ? (nextGoal - (tier.max! - tier.min!) / 5) : tier.min)}</span>
                <span className="text-[10px] text-slate-500 font-mono">{formatNum(nextGoal)}</span>
            </div>

            {/* 추천 보스 섹션 */}
            <div className="pt-4 border-t border-white/5 relative z-10">
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Clearable Bosses</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {recommendedBosses.map((boss, idx) => (
                        <div key={idx} className="bg-black/20 rounded px-3 py-2.5 flex justify-between items-center border border-white/5 hover:bg-white/5 transition-colors">
                            <span className="text-sm text-slate-200 font-medium truncate">{boss.name}</span>
                            <span className="text-xs text-slate-500">{formatNum(boss.cp)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
