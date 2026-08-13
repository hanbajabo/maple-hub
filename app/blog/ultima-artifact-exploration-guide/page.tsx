import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Home, ChevronRight, Map, Gift, Zap, Star, AlertTriangle, CheckCircle, Trophy, Clock, Pickaxe } from 'lucide-react';

export const metadata: Metadata = {
    title: '울티마 유물 탐사 완벽 공략 — 지도 크기별 사냥량·보상 총정리 | 메이플 AI',
    description: '8월 20일 추가! 울티마 유물 탐사 이벤트 완벽 공략. 5x5 / 10x10 / 15x15 지도 크기별 하루 필요 사냥량, 최대 획득 보상, 특수 유물 활용법, 플레이 스타일별 추천 전략까지 한눈에 정리.',
};

const MAP_DATA = [
    {
        size: '5×5',
        color: 'green',
        emoji: '🟢',
        tag: '라이트 유저',
        tagSub: '일퀘만으로 완주 가능',
        ceiling: '12,500마리',
        realEst: '8,000~9,000마리',
        daily: '3,000마리',
        dailySub: '일퀘 컷만으로 충분',
        fixedSlots: 11,
        fixed: [
            { name: '화이트 에디셔널 큐브', count: '1개', color: 'purple' },
            { name: '블랙 큐브', count: '2개', color: 'blue' },
            { name: '솔 에르다 조각 교환권', count: '8개', color: 'amber' },
        ],
        restSlots: 14,
        rest: [
            { name: '상급 EXP 교환권', count: '8개 (최대)', color: 'green' },
            { name: '희미한 솔 에르다의 기운', count: '6개', color: 'slate' },
        ],
        totalRewards: [
            { name: '화에디 큐브', value: '10개' },
            { name: '블랙 큐브', value: '20개' },
            { name: '솔 에르다 조각 (배치+완성)', value: '80+150개' },
        ],
        notice: '⚠️ 5×5 디메리트: 고대의 화약통이 등장하지 않습니다! 자동 9칸 탐색 효과를 볼 수 없어 특수 유물의 재미가 반감됩니다.',
        tip: '스페셜 봄은 아직 밝혀지지 않은 밀집 구역에 바로 사용하면 화에디·블큐를 2배 획득할 확률이 높습니다.',
        id: 'map-5x5',
    },
    {
        size: '10×10',
        color: 'blue',
        emoji: '🔵',
        tag: '미들 유저',
        tagSub: '황금 밸런스 · 가성비 1위',
        ceiling: '50,000마리',
        realEst: '25,000~30,000마리',
        daily: '9,000~11,000마리',
        dailySub: '일퀘 + 30분~1시간 추가 사냥',
        fixedSlots: 18,
        fixed: [
            { name: '화이트 에디셔널 큐브', count: '2개', color: 'purple' },
            { name: '블랙 큐브', count: '4개', color: 'blue' },
            { name: '솔 에르다 조각 교환권', count: '12개', color: 'amber' },
        ],
        restSlots: 82,
        rest: [
            { name: '상급 EXP 교환권', count: '30개 (최대)', color: 'green' },
            { name: '희미한 솔 에르다의 기운', count: '52개', color: 'slate' },
        ],
        totalRewards: [
            { name: '화에디 큐브', value: '20개' },
            { name: '블랙 큐브', value: '40개' },
            { name: '솔 에르다 조각 (배치+완성)', value: '120+250개' },
        ],
        notice: '💡 스페셜 봄 주의: 맵이 넓어 빈칸에 쓰면 EXP·기운만 2배가 됩니다.',
        tip: '레이저/화약통으로 외곽을 먼저 깎아낸 뒤, 보상이 밀집된 남은 구역 중앙에 스페셜 봄을 사용하세요.',
        id: 'map-10x10',
    },
    {
        size: '15×15',
        color: 'purple',
        emoji: '🟣',
        tag: '헤비 유저',
        tagSub: '최대 보상 · 황금 열쇠 로또',
        ceiling: '112,500마리',
        realEst: '55,000~70,000마리',
        daily: '2만~2.5만 마리',
        dailySub: '매일 1재획 이상 필요',
        fixedSlots: 29,
        fixed: [
            { name: '화이트 에디셔널 큐브', count: '3개', color: 'purple' },
            { name: '블랙 큐브', count: '6개', color: 'blue' },
            { name: '솔 에르다 조각 교환권', count: '20개', color: 'amber' },
        ],
        restSlots: 196,
        rest: [
            { name: '상급 EXP 교환권', count: '50개 (최대)', color: 'green' },
            { name: '희미한 솔 에르다의 기운', count: '146개', color: 'slate' },
        ],
        totalRewards: [
            { name: '화에디 큐브', value: '30개' },
            { name: '블랙 큐브', value: '60개' },
            { name: '솔 에르다 조각 (배치+완성)', value: '200+400개' },
        ],
        notice: '🎰 황금 열쇠 로또: 발동 시 225칸(11만 2,500마리 분량)을 즉시 탐색. 15×15에서 효과 극대화!',
        tip: '특수 유물(레이저, 폭탄, 황금 열쇠)의 효율이 대형 지도에서 극대화됩니다.',
        id: 'map-15x15',
    },
];

export default function UltimaArtifactGuide() {
    return (
        <main className="w-full min-h-screen bg-[#080711] text-slate-100 py-12 px-4">
            <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-amber-900/10 rounded-full blur-[140px] pointer-events-none z-0" />
            <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-900/10 rounded-full blur-[140px] pointer-events-none z-0" />

            {/* 네비게이션 */}
            <div className="max-w-4xl mx-auto relative z-10 flex items-center gap-3 mb-8">
                <Link prefetch={false} href="/blog" className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 hover:bg-slate-800/80 border border-slate-700/50 hover:border-amber-500/50 rounded-xl text-sm font-bold text-amber-300 hover:text-amber-200 transition-all group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>블로그 홈</span>
                </Link>
                <Link prefetch={false} href="/" className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 hover:bg-slate-800/80 border border-slate-700/50 rounded-xl text-sm font-bold text-slate-300 hover:text-white transition-all">
                    <Home className="w-4 h-4" />
                    <span>메인 홈</span>
                </Link>
            </div>

            <div className="max-w-4xl mx-auto relative z-10">

                {/* 헤더 */}
                <div className="mb-8">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-900/50 text-amber-300 border border-amber-700/50 font-semibold">이벤트 가이드</span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-violet-900/50 text-violet-300 border border-violet-700/50 font-semibold">미니게임</span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800/60 text-slate-400 border border-slate-700/50 font-semibold">8월 20일 ~ 9월 16일</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black mb-3 leading-tight">
                        <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
                            울티마 유물 탐사 완벽 공략
                        </span>
                    </h1>
                    <p className="text-slate-300 text-sm sm:text-base border-l-4 border-amber-500 pl-4 py-1 bg-amber-950/20 rounded-r">
                        지도 크기별 <strong className="text-amber-300">하루 필요 사냥량</strong>부터 <strong className="text-yellow-300">최대 보상 총합</strong>,{' '}
                        <strong className="text-orange-300">특수 유물 활용법</strong>까지 한눈에 정리했습니다.
                    </p>

                    {/* 대표 이미지 */}
                    <div className="mt-6 relative w-full overflow-hidden rounded-2xl border border-amber-500/30 bg-slate-900/80 p-3 sm:p-4 text-center shadow-xl">
                        <img 
                            src="/images/blog/ultima-artifact-map.png" 
                            alt="울티마 유물 탐사 지도 선택 (소형 5x5 / 중형 10x10 / 대형 15x15)" 
                            className="w-full max-w-md mx-auto rounded-xl object-contain shadow-lg border border-slate-700/50" 
                        />
                        <p className="text-xs text-slate-400 mt-2 font-medium">▲ 울티마 유물 지도 선택 인게임 화면 (소형 5x5 / 중형 10x10 / 대형 15x15)</p>
                    </div>
                </div>

                {/* 목차 */}
                <div className="mb-10 bg-slate-900/60 border border-slate-700/50 rounded-2xl p-5">
                    <h2 className="font-bold text-slate-100 text-sm mb-4 flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-amber-400" /> 목차
                    </h2>
                    <ul className="space-y-1.5">
                        {[
                            { id: 'overview', label: '이벤트 핵심 구조' },
                            { id: 'comparison', label: '지도 크기별 비교표 (10판 완주 기준)' },
                            { id: 'map-5x5', label: '5×5 지도 — 라이트 유저용' },
                            { id: 'map-10x10', label: '10×10 지도 — 황금 밸런스' },
                            { id: 'map-15x15', label: '15×15 지도 — 헤비 사냥러용' },
                            { id: 'special-items', label: '특수 유물 활용법' },
                            { id: 'rewards-setup', label: '보상 배치 우선순위' },
                            { id: 'summary', label: '플레이 타입별 최종 추천' },
                        ].map((item) => (
                            <li key={item.id}>
                                <a href={`#${item.id}`} className="flex items-center gap-2 text-sm text-slate-400 hover:text-amber-300 transition-colors group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-700 group-hover:bg-amber-400 transition-colors shrink-0" />
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 1. 이벤트 핵심 구조 */}
                <section id="overview" className="mb-10 scroll-mt-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-amber-900/40 border border-amber-700/50">
                            <Pickaxe className="w-5 h-5 text-amber-400" />
                        </div>
                        <h2 className="text-xl font-black text-amber-300">이벤트 핵심 구조</h2>
                    </div>
                    <div className="bg-slate-900/60 border border-amber-900/40 rounded-2xl p-5 space-y-4">
                        <div className="grid sm:grid-cols-3 gap-3">
                            {[
                                { icon: '🗓️', label: '이벤트 기간', value: '8/20(목) ~ 9/16(수)', sub: '총 28일' },
                                { icon: '🗺️', label: '지도 획득', value: '최대 10개', sub: '시작 1개 + 3일마다 1개' },
                                { icon: '👣', label: '기본 탐색', value: '500마리 = 1칸', sub: '레벨 범위 몬스터 기준' },
                            ].map(({ icon, label, value, sub }) => (
                                <div key={label} className="bg-slate-800/60 rounded-xl p-4 border border-amber-900/30 text-center">
                                    <div className="text-2xl mb-1">{icon}</div>
                                    <p className="text-xs text-slate-400 mb-1">{label}</p>
                                    <p className="font-black text-white text-sm">{value}</p>
                                    <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
                                </div>
                            ))}
                        </div>
                        <div className="bg-amber-950/30 border border-amber-800/40 rounded-xl p-4">
                            <p className="text-xs font-bold text-amber-300 mb-2">⚠️ 반드시 알아야 할 규칙</p>
                            <ul className="text-xs text-slate-300 space-y-1.5">
                                <li className="flex items-start gap-2"><span className="text-amber-400 shrink-0 mt-0.5">•</span>현재 진행 중인 지도를 <strong className="text-amber-200">완성해야만</strong> 다음 지도를 시작할 수 있습니다.</li>
                                <li className="flex items-start gap-2"><span className="text-amber-400 shrink-0 mt-0.5">•</span>지도가 완성되면 보유 중인 <strong className="text-red-300">특수 유물은 즉시 초기화</strong>됩니다. 완성 전에 모두 사용하세요!</li>
                                <li className="flex items-start gap-2"><span className="text-amber-400 shrink-0 mt-0.5">•</span>지도 크기 및 보상 설정은 시작 후 <strong className="text-white">변경 불가</strong>입니다.</li>
                                <li className="flex items-start gap-2"><span className="text-amber-400 shrink-0 mt-0.5">•</span>모든 보상은 이벤트 종료(9/16) 전까지 개별 수령 가능합니다.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 2. 비교표 */}
                <section id="comparison" className="mb-10 scroll-mt-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-blue-900/40 border border-blue-700/50">
                            <Map className="w-5 h-5 text-blue-400" />
                        </div>
                        <h2 className="text-xl font-black text-blue-300">지도 크기별 비교표 (10판 완주 기준)</h2>
                    </div>
                    <div className="bg-slate-900/60 border border-blue-900/40 rounded-2xl p-5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-xs border-collapse min-w-[520px]">
                                <thead>
                                    <tr className="bg-slate-800/80">
                                        <th className="p-3 border border-slate-700 text-left text-slate-300 font-bold">구분</th>
                                        <th className="p-3 border border-slate-700 text-center text-green-300 font-bold">5×5</th>
                                        <th className="p-3 border border-slate-700 text-center text-blue-300 font-bold">10×10</th>
                                        <th className="p-3 border border-slate-700 text-center text-purple-300 font-bold">15×15</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { label: '총 칸 수 (1회 / 10회)', v5: '25 / 250칸', v10: '100 / 1,000칸', v15: '225 / 2,250칸' },
                                        { label: '순수 천장 (10회 합산)', v5: '12만 5천 마리', v10: '50만 마리', v15: '112만 5천 마리' },
                                        { label: '실제 예상 처치 수', v5: '8~9만 마리', v10: '25~30만 마리', v15: '55~70만 마리' },
                                        { label: '⭐ 하루 권장 사냥량', v5: '약 3,000마리', v10: '약 1만 마리', v15: '약 2만~2.5만 마리', highlight: true },
                                        { label: '블랙 큐브 (최대)', v5: '20개', v10: '40개', v15: '60개' },
                                        { label: '화에디 큐브 (최대)', v5: '10개', v10: '20개', v15: '30개' },
                                        { label: '조각 교환권 배치 (최대)', v5: '80개', v10: '120개', v15: '200개' },
                                        { label: '완성 보상 — 솔 에르다', v5: '10개', v10: '20개', v15: '30개' },
                                        { label: '완성 보상 — 상급 EXP', v5: '3,000개', v10: '5,000개', v15: '8,000개' },
                                        { label: '완성 보상 — 조각 교환권', v5: '150개', v10: '250개', v15: '400개' },
                                        { label: '고대의 화약통 등장', v5: '❌ 미등장', v10: '✅ 등장', v15: '✅ 등장' },
                                    ].map((row, i) => (
                                        <tr key={i} className={row.highlight ? 'bg-amber-950/30' : i % 2 === 0 ? 'bg-slate-900/40' : 'bg-slate-950/40'}>
                                            <td className={`p-2.5 border border-slate-700 ${row.highlight ? 'text-amber-200 font-bold' : 'text-slate-300'}`}>{row.label}</td>
                                            <td className={`p-2.5 border border-slate-700 text-center ${row.highlight ? 'text-green-300 font-bold' : 'text-slate-400'}`}>{row.v5}</td>
                                            <td className={`p-2.5 border border-slate-700 text-center ${row.highlight ? 'text-blue-300 font-bold' : 'text-slate-400'}`}>{row.v10}</td>
                                            <td className={`p-2.5 border border-slate-700 text-center ${row.highlight ? 'text-purple-300 font-bold' : 'text-slate-400'}`}>{row.v15}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-slate-500 mt-3">※ 실제 예상 처치 수는 특수 유물 드롭률·황금 열쇠 등 변수 반영 기준 (순수 천장 대비 약 40~60% 감소 추정)</p>
                    </div>
                </section>

                {/* 3~5. 지도별 상세 */}
                {MAP_DATA.map((map) => (
                    <section key={map.id} id={map.id} className="mb-10 scroll-mt-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`p-2 rounded-xl bg-${map.color}-900/40 border border-${map.color}-700/50`}>
                                <Map className={`w-5 h-5 text-${map.color}-400`} />
                            </div>
                            <div>
                                <h2 className={`text-xl font-black text-${map.color}-300`}>{map.size} 지도</h2>
                                <p className="text-xs text-slate-400">{map.tag} · {map.tagSub}</p>
                            </div>
                        </div>
                        <div className={`bg-slate-900/60 border border-${map.color}-900/40 rounded-2xl p-5 space-y-5`}>
                            {/* 사냥량 */}
                            <div>
                                <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                                    <Clock className={`w-4 h-4 text-${map.color}-400`} /> 사냥량 분석
                                </h3>
                                <div className="grid sm:grid-cols-3 gap-3 text-center text-xs">
                                    <div className={`bg-slate-800/60 rounded-xl p-3 border border-${map.color}-900/30`}>
                                        <p className="text-slate-400 mb-1">1판 순수 천장</p>
                                        <p className="font-black text-lg text-white">{map.ceiling}</p>
                                    </div>
                                    <div className={`bg-slate-800/60 rounded-xl p-3 border border-${map.color}-900/30`}>
                                        <p className="text-slate-400 mb-1">1판 실제 예상</p>
                                        <p className={`font-black text-base text-${map.color}-300`}>{map.realEst}</p>
                                    </div>
                                    <div className="bg-amber-950/40 rounded-xl p-3 border border-amber-800/40">
                                        <p className="text-slate-400 mb-1">⭐ 하루 권장</p>
                                        <p className="font-black text-base text-amber-300">{map.daily}</p>
                                        <p className="text-slate-500 text-[10px] mt-0.5">{map.dailySub}</p>
                                    </div>
                                </div>
                            </div>
                            {/* 보상 배치 */}
                            <div>
                                <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                                    <Gift className={`w-4 h-4 text-${map.color}-400`} /> 최적 보상 배치 ({map.size.replace('×','x')} = {map.fixedSlots + map.restSlots}칸 기준)
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                                    <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/40">
                                        <p className="text-slate-300 font-bold mb-2">🔒 필수 고정 배치 ({map.fixedSlots}칸)</p>
                                        <ul className="space-y-1 text-slate-400">
                                            {map.fixed.map((f) => (
                                                <li key={f.name}>• {f.name} <span className={`text-${f.color}-300 font-bold`}>{f.count}</span></li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/40">
                                        <p className="text-slate-300 font-bold mb-2">📦 나머지 채우기 ({map.restSlots}칸)</p>
                                        <ul className="space-y-1 text-slate-400">
                                            {map.rest.map((r) => (
                                                <li key={r.name}>• {r.name} <span className={`text-${r.color}-300 font-bold`}>{r.count}</span></li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* 10판 총 보상 */}
                            <div className={`bg-${map.color}-950/20 border border-${map.color}-800/30 rounded-xl p-4`}>
                                <p className={`text-xs font-bold text-${map.color}-300 mb-2`}>🏆 10판 완주 시 총 보상 (완성 보상: 조각 교환권 선택 시)</p>
                                <div className="flex flex-wrap gap-2">
                                    {map.totalRewards.map(({ name, value }) => (
                                        <div key={name} className={`bg-${map.color}-900/30 border border-${map.color}-800/40 rounded-lg px-3 py-2 text-center`}>
                                            <p className={`text-xs font-bold text-${map.color}-200`}>{value}</p>
                                            <p className="text-xs text-slate-400">{name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* 주의/팁 */}
                            <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-3 space-y-1.5">
                                <p className="text-xs text-slate-300">{map.notice}</p>
                                <p className="text-xs text-slate-400">💡 {map.tip}</p>
                            </div>
                        </div>
                    </section>
                ))}

                {/* 6. 특수 유물 */}
                <section id="special-items" className="mb-10 scroll-mt-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-yellow-900/40 border border-yellow-700/50">
                            <Zap className="w-5 h-5 text-yellow-400" />
                        </div>
                        <h2 className="text-xl font-black text-yellow-300">특수 유물 활용법</h2>
                    </div>
                    <div className="bg-slate-900/60 border border-yellow-900/40 rounded-2xl p-5 space-y-4">
                        <div className="grid sm:grid-cols-2 gap-3">
                            {[
                                { name: '⭐ 울티마 스페셜 봄', type: '수동', color: 'amber', effect: '지정 칸 중심 3×3 탐색 + 아이템 있으면 2배 획득', tip: '보상 미탐색 밀집 구역 중앙에 사용 → 큐브 2배 획득 노리기' },
                                { name: '울티마 봄', type: '수동', color: 'orange', effect: '지정 칸 중심 3×3 범위 탐색', tip: '어느 미탐색 구역에나 사용 가능. 칸 아껴두지 말고 바로 사용.' },
                                { name: '울티마 레이저 X', type: '수동', color: 'red', effect: '지정 칸의 가로 전체 탐색', tip: '15×15 기준 1발 = 15칸(7,500마리 분). 가장 긴 미탐색 줄에 사용.' },
                                { name: '울티마 레이저 Y', type: '수동', color: 'pink', effect: '지정 칸의 세로 전체 탐색', tip: '레이저 X와 동일 전략. 미탐색이 가장 긴 세로 줄에 사용.' },
                                { name: '고대의 화약통', type: '자동', color: 'slate', effect: '발견 즉시 3×3 자동 탐색 (5×5 불가)', tip: '10×10 이상에서만 등장. 예상치 못한 9칸 보너스 효과!' },
                                { name: '🔑 고대의 황금 열쇠', type: '자동', color: 'yellow', effect: '발견 즉시 지도의 모든 칸 탐색', tip: '즉시 완성! 15×15에서 효과가 가장 높음 (225칸 = 11.25만 마리 분).' },
                            ].map((item) => (
                                <div key={item.name} className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/40 space-y-1.5">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className={`text-xs font-bold text-${item.color}-300`}>{item.name}</p>
                                        <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${item.type === '자동' ? 'bg-red-900/50 text-red-300 border border-red-800/50' : 'bg-blue-900/50 text-blue-300 border border-blue-800/50'}`}>
                                            {item.type}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-400">{item.effect}</p>
                                    <p className={`text-xs text-${item.color}-200/80 bg-${item.color}-950/30 rounded p-1.5`}>💡 {item.tip}</p>
                                </div>
                            ))}
                        </div>
                        <div className="bg-red-950/30 border border-red-800/40 rounded-xl p-4">
                            <p className="text-xs font-bold text-red-300 mb-2 flex items-center gap-1.5">
                                <AlertTriangle className="w-4 h-4" /> 완성 직전 필수 행동
                            </p>
                            <p className="text-xs text-slate-300">
                                지도 완성 직전, 보유 중인 <strong className="text-red-200">수동 특수 유물(봄, 레이저)을 반드시 모두 사용</strong>한 후 마지막 칸을 채우세요.
                                지도가 완성되는 순간 <strong className="text-red-300">모든 특수 유물이 자동 초기화</strong>되어 사라집니다!
                            </p>
                        </div>
                    </div>
                </section>

                {/* 7. 보상 배치 우선순위 */}
                <section id="rewards-setup" className="mb-10 scroll-mt-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-violet-900/40 border border-violet-700/50">
                            <Star className="w-5 h-5 text-violet-400" />
                        </div>
                        <h2 className="text-xl font-black text-violet-300">보상 배치 우선순위</h2>
                    </div>
                    <div className="bg-slate-900/60 border border-violet-900/40 rounded-2xl p-5 space-y-3">
                        <p className="text-xs text-slate-400 mb-2">탐사 시작 전 배치할 보상을 정할 때 아래 순서대로 최대치를 채워 넣으세요.</p>
                        {[
                            { num: 1, name: '대적자의 화이트 에디셔널 큐브', reason: '가장 희소하고 가격이 높음. 무조건 최대치 배치.', color: 'purple' },
                            { num: 2, name: '대적자의 블랙 큐브', reason: '실용성 1위. 최대치 배치.', color: 'blue' },
                            { num: 3, name: '솔 에르다 조각 교환권', reason: '6차 스킬 필수 재화. 최대치 배치.', color: 'amber' },
                            { num: 4, name: '상급 EXP 교환권 / 솔 에르다의 기운', reason: '남은 칸 채우기. 본인 육성 상황에 맞게 선택.', color: 'green' },
                        ].map(({ num, name, reason, color }) => (
                            <div key={num} className="flex items-start gap-3 bg-slate-800/40 rounded-xl p-3 border border-slate-700/40">
                                <div className={`w-8 h-8 rounded-full bg-${color}-900/50 border border-${color}-700/50 flex items-center justify-center shrink-0`}>
                                    <span className={`text-xs font-black text-${color}-300`}>{num}</span>
                                </div>
                                <div>
                                    <p className={`text-xs font-bold text-${color}-300`}>{name}</p>
                                    <p className="text-xs text-slate-400 mt-0.5">{reason}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 8. 최종 추천 */}
                <section id="summary" className="mb-10 scroll-mt-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-teal-900/40 border border-teal-700/50">
                            <Trophy className="w-5 h-5 text-teal-400" />
                        </div>
                        <h2 className="text-xl font-black text-teal-300">플레이 타입별 최종 추천</h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            {
                                type: '라이트 유저',
                                condition: '일일 퀘스트 3천 마리만 컷',
                                recommend: '5×5',
                                color: 'green',
                                emoji: '🟢',
                                reason: '10×10 선택 시 기간 내 10판 완주를 못 해 최종 보상 손실이 날 수 있습니다.',
                                actions: ['5×5 지도 10판 완주', '하루 3,000마리로 충분', '일퀘만 해도 OK'],
                            },
                            {
                                type: '미들 유저',
                                condition: '일퀘 + 하루 30분~1시간 추가 사냥',
                                recommend: '10×10',
                                color: 'blue',
                                emoji: '🔵',
                                reason: '보상 총량과 사냥 부담 사이의 황금비율. 가장 가성비 좋은 선택입니다.',
                                actions: ['10×10 지도 10판', '하루 약 1만 마리', '화약통+레이저 시너지'],
                            },
                            {
                                type: '헤비 유저',
                                condition: '매일 1재획 이상 (하루 2~4시간 사냥)',
                                recommend: '15×15',
                                color: 'purple',
                                emoji: '🟣',
                                reason: '큐브·조각 최대치를 뽑아낼 수 있는 유일한 선택. 황금 열쇠 로또도 기대하세요.',
                                actions: ['15×15 지도 10판', '하루 2만~2.5만 마리', '황금 열쇠 기대'],
                            },
                        ].map(({ type, condition, recommend, color, emoji, reason, actions }) => (
                            <div key={type} className={`bg-slate-900/60 border border-${color}-900/40 rounded-2xl p-5`}>
                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                    <span className="text-xl">{emoji}</span>
                                    <div>
                                        <p className={`font-black text-${color}-300 text-base`}>{type}</p>
                                        <p className="text-xs text-slate-400">{condition}</p>
                                    </div>
                                    <span className={`ml-auto text-sm font-black px-4 py-1.5 rounded-full bg-${color}-900/50 border border-${color}-700/50 text-${color}-200`}>
                                        → {recommend} 선택
                                    </span>
                                </div>
                                <p className="text-xs text-slate-400 mb-3">{reason}</p>
                                <div className="flex flex-wrap gap-2">
                                    {actions.map((a) => (
                                        <span key={a} className={`text-xs px-2.5 py-1 bg-${color}-900/30 border border-${color}-800/40 rounded-full text-${color}-200 flex items-center gap-1`}>
                                            <CheckCircle className="w-3 h-3" />{a}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 핵심 요약 */}
                <div className="mb-8 bg-gradient-to-r from-amber-950/40 via-slate-900/60 to-violet-950/40 border border-amber-700/30 rounded-2xl p-6">
                    <h3 className="font-black text-amber-300 text-base mb-4 text-center">⚡ 한줄 핵심 요약</h3>
                    <ul className="space-y-2 text-sm">
                        {[
                            '지도 크기는 본인 하루 사냥량에 맞게 선택 — 완주 못 하면 손해!',
                            '보상 배치: 화에디 → 블큐 → 조각 → EXP 순으로 최대치 배치',
                            '울티마 스페셜 봄은 보상 밀집 미탐색 구역 중앙에 사용해 2배 획득',
                            '지도 완성 직전 수동 유물(봄, 레이저) 모두 소비 후 마지막 칸 열기!',
                            '황금 열쇠 뜨면 즉시 전 칸 완성 — 15×15에서 효과 극대화',
                        ].map((tip, i) => (
                            <li key={i} className="flex items-start gap-2 text-slate-300">
                                <span className="text-amber-400 font-bold shrink-0">{i + 1}.</span>
                                {tip}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 원문 */}
                <div className="mb-8 p-4 bg-slate-900/60 border border-slate-700/50 rounded-2xl text-sm text-slate-400 text-center">
                    📎 이벤트 원문:&nbsp;
                    <a href="https://maplestory.nexon.com/testworld/news/all/193" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 underline">
                        메이플스토리 테스트월드 공식 패치노트 (1.2.205)
                    </a>
                </div>

                <Link prefetch={false} href="/blog" className="flex items-center justify-center gap-2 w-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600/50 hover:border-amber-500/50 text-slate-200 hover:text-white font-bold py-4 rounded-xl transition-all group">
                    <span>블로그 홈으로 돌아가기</span>
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </Link>
            </div>
        </main>
    );
}
