import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Home, ChevronRight, Map, Gift, Zap, Star, AlertTriangle, CheckCircle, Trophy, Clock, Pickaxe } from 'lucide-react';
import UltimaCalculator from '@/components/UltimaCalculator';

export const metadata: Metadata = {
    title: '울티마 유물 탐사 완벽 공략 — 지도 크기별 사냥량·보상 총정리 | 메이플 AI',
    description: '8월 20일 추가! 울티마 유물 탐사 이벤트 완벽 공략. 5x5 / 10x10 / 15x15 지도 크기별 하루 필요 사냥량, 최대 획득 보상, 특수 유물 활용법, 플레이 스타일별 추천 전략까지 한눈에 정리.',
};

const MAP_DATA = [
    {
        "size": "5×5",
        "color": "green",
        "emoji": "🟢",
        "tag": "라이트 유저",
        "tagSub": "보상 배치 최대 8칸 제한",
        "ceiling": "12,500마리 (1회 천장)",
        "realEst": "약 5,500마리 (1회)",
        "realTotalEst": "약 5.5만 마리 (10회)",
        "daily": "하루 약 2,000마리",
        "dailySub": "",
        "maxRewardSlots": 8,
        "fixedSlots": 8,
        "fixed": [
            {
                "name": "화이트 에디셔널 큐브",
                "count": "1개 (1칸)",
                "color": "purple"
            },
            {
                "name": "블랙 큐브",
                "count": "2개 (2칸)",
                "color": "blue"
            },
            {
                "name": "솔 에르다 조각 교환권",
                "count": "5개 (5칸)",
                "color": "amber"
            }
        ],
        "restSlots": 0,
        "rest": [
            {
                "name": "조각/EXP/기운 등",
                "count": "합계 8칸 초과 불가",
                "color": "green"
            }
        ],
        "totalRewards": [
            {
                "name": "화에디 큐브",
                "value": "10개",
                "highlight": true
            },
            {
                "name": "블랙 큐브",
                "value": "20개",
                "highlight": true
            },
            {
                "name": "솔 에르다 조각",
                "value": "50개"
            },
            {
                "name": "솔 에르다 조각 (완성 보상)",
                "value": "150개"
            },
            {
                "name": "총 획득 조각 (배치+완성)",
                "value": "200개",
                "highlight": true
            }
        ],
        "notice": "⚠️ 5×5 핵심 디메리트: 지도 내 보상 배치가 [최대 8칸]으로 제한되며, 고대의 화약통이 등장하지 않습니다.",
        "tip": "8칸이 빽빽하게 모여있으므로 스페셜 봄을 던졌을 때 큐브 2배를 획득할 확률이 매우 높습니다.",
        "id": "map-5x5"
    },
    {
        "size": "10×10",
        "color": "blue",
        "emoji": "🔵",
        "tag": "미들 유저",
        "tagSub": "보상 배치 최대 32칸 제한",
        "ceiling": "50,000마리 (1회 천장)",
        "realEst": "약 36,000마리 (1회)",
        "realTotalEst": "약 36만 마리 (10회)",
        "daily": "하루 약 13,000마리",
        "dailySub": "",
        "maxRewardSlots": 32,
        "fixedSlots": 18,
        "fixed": [
            {
                "name": "화이트 에디셔널 큐브",
                "count": "2개 (2칸)",
                "color": "purple"
            },
            {
                "name": "블랙 큐브",
                "count": "4개 (4칸)",
                "color": "blue"
            },
            {
                "name": "솔 에르다 조각 교환권",
                "count": "12개 (12칸)",
                "color": "amber"
            }
        ],
        "restSlots": 14,
        "rest": [
            {
                "name": "상급 EXP 교환권 20개입",
                "count": "14칸 (EXP 280개)",
                "color": "green"
            },
            {
                "name": "또는 솔 에르다 기운 5개입",
                "count": "원하는 비율로 14칸",
                "color": "slate"
            }
        ],
        "totalRewards": [
            {
                "name": "화에디 큐브",
                "value": "20개",
                "highlight": true
            },
            {
                "name": "블랙 큐브",
                "value": "40개",
                "highlight": true
            },
            {
                "name": "솔 에르다 조각",
                "value": "120개"
            },
            {
                "name": "솔 에르다 조각 (완성 보상)",
                "value": "250개"
            },
            {
                "name": "총 획득 조각 (배치+완성)",
                "value": "370개",
                "highlight": true
            },
            {
                "name": "상급 EXP 교환권 (최대배치)",
                "value": "2,800개"
            }
        ],
        "notice": "💡 10×10 보상 배치: 총 100칸 중 [최대 32칸]까지 보상을 구성할 수 있습니다.",
        "tip": "레이저/화약통으로 외곽을 먼저 깎아낸 뒤, 보상이 밀집된 남은 구역 중앙에 스페셜 봄을 사용하세요.",
        "id": "map-10x10"
    },
    {
        "size": "15×15",
        "color": "purple",
        "emoji": "🟣",
        "tag": "헤비 유저",
        "tagSub": "보상 배치 최대 72칸 제한",
        "ceiling": "112,500마리 (1회 천장)",
        "realEst": "약 88,500마리 (1회)",
        "realTotalEst": "약 88.5만 마리 (10회)",
        "daily": "하루 약 31,600마리",
        "dailySub": "",
        "maxRewardSlots": 72,
        "fixedSlots": 29,
        "fixed": [
            {
                "name": "화이트 에디셔널 큐브",
                "count": "3개 (3칸)",
                "color": "purple"
            },
            {
                "name": "블랙 큐브",
                "count": "6개 (6칸)",
                "color": "blue"
            },
            {
                "name": "솔 에르다 조각 교환권",
                "count": "20개 (20칸)",
                "color": "amber"
            }
        ],
        "restSlots": 43,
        "rest": [
            {
                "name": "상급 EXP 교환권 20개입",
                "count": "43칸 (EXP 860개)",
                "color": "green"
            },
            {
                "name": "또는 솔 에르다 기운 5개입",
                "count": "원하는 비율로 43칸",
                "color": "slate"
            }
        ],
        "totalRewards": [
            {
                "name": "화에디 큐브",
                "value": "30개",
                "highlight": true
            },
            {
                "name": "블랙 큐브",
                "value": "60개",
                "highlight": true
            },
            {
                "name": "솔 에르다 조각",
                "value": "200개"
            },
            {
                "name": "솔 에르다 조각 (완성 보상)",
                "value": "400개"
            },
            {
                "name": "총 획득 조각 (배치+완성)",
                "value": "600개",
                "highlight": true
            },
            {
                "name": "상급 EXP 교환권 (최대배치)",
                "value": "8,600개"
            }
        ],
        "notice": "🎰 15×15 보상 배치: 총 225칸 중 [최대 72칸]까지 대량의 보상을 자유롭게 채워넣을 수 있습니다.",
        "tip": "특수 유물(레이저, 폭탄, 황금 열쇠)의 효율이 대형 지도에서 극대화됩니다.",
        "id": "map-15x15"
    }
];

export default function UltimaArtifactGuide() {
    return (
        <main className="w-full min-h-screen bg-[#080711] text-white py-8 sm:py-12 px-4">
            <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-amber-900/10 rounded-full blur-[140px] pointer-events-none z-0" />
            <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-900/10 rounded-full blur-[140px] pointer-events-none z-0" />

            {/* 네비게이션 */}
            <div className="max-w-4xl mx-auto relative z-10 flex items-center gap-3 mb-8">
                <Link prefetch={false} href="/blog" className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 hover:bg-slate-800/80 border border-slate-700/50 hover:border-amber-500/50 rounded-xl text-sm font-bold text-amber-300 hover:text-amber-200 transition-all group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>블로그 홈</span>
                </Link>
                <Link prefetch={false} href="/" className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 hover:bg-slate-800/80 border border-slate-700/50 rounded-xl text-sm font-bold text-white hover:text-white transition-all">
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
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800/60 text-slate-200 border border-slate-700/50 font-semibold">8월 20일 ~ 9월 16일</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black mb-3 leading-tight">
                        <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
                            울티마 유물 탐사 완벽 공략
                        </span>
                    </h1>
                    <p className="text-white text-sm sm:text-base border-l-4 border-amber-500 pl-4 py-1 bg-amber-950/20 rounded-r">
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
                        <p className="text-xs text-slate-200 mt-2 font-medium">▲ 울티마 유물 지도 선택 인게임 화면 (소형 5x5 / 중형 10x10 / 대형 15x15)</p>
                    </div>
                </div>

                {/* 목차 */}
                <div className="mb-10 bg-slate-900/60 border border-slate-700/50 rounded-2xl p-4 sm:p-5">
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
                                <a href={`#${item.id}`} className="flex items-center gap-2 text-sm text-slate-200 hover:text-amber-300 transition-colors group">
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
                    <div className="bg-slate-900/60 border border-amber-900/40 rounded-2xl p-4 sm:p-5 space-y-4">
                        <div className="grid sm:grid-cols-3 gap-3">
                            <div className="bg-slate-800/60 rounded-xl p-3 sm:p-4 border border-amber-900/30 text-center">
                                <div className="text-2xl mb-1">🗓️</div>
                                <p className="text-xs text-slate-200 mb-1">이벤트 기간</p>
                                <p className="font-black text-white text-sm">8/20(목) ~ 9/16(수)</p>
                                <p className="text-xs text-white mt-0.5">총 28일</p>
                            </div>

                            {/* 지도 획득 (특별 강조) */}
                            <div className="bg-gradient-to-b from-amber-950/70 via-slate-900/90 to-amber-950/70 rounded-xl p-3 sm:p-4 border-2 border-amber-400/80 text-center shadow-lg shadow-amber-950/50 relative overflow-hidden group">
                                <div className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-bl-lg shadow">
                                    ★ 핵심 규칙
                                </div>
                                <div className="text-2xl mb-1">🗺️</div>
                                <p className="text-xs font-bold text-amber-300 mb-1">지도 획득</p>
                                <p className="font-black text-amber-200 text-base drop-shadow">최대 10개</p>
                                <p className="text-xs font-bold text-amber-300/90 mt-1 bg-amber-950/60 border border-amber-700/50 rounded-lg py-1 px-2">
                                    시작 1개 + 3일마다 1개 (최대 10개)
                                </p>
                            </div>

                            <div className="bg-slate-800/60 rounded-xl p-3 sm:p-4 border border-amber-900/30 text-center">
                                <div className="text-2xl mb-1">👣</div>
                                <p className="text-xs text-slate-200 mb-1">기본 탐색</p>
                                <p className="font-black text-white text-sm">500마리 = 1칸</p>
                                <p className="text-xs text-white mt-0.5">레벨 범위 몬스터 기준</p>
                            </div>
                        </div>
                        {/* 지도 크기별 탐색 화면 이미지 */}
                        <div className="relative w-full overflow-hidden rounded-xl border border-slate-700/50 bg-slate-900/80 p-3 text-center shadow-lg">
                            <img 
                                src="/images/blog/ultima-artifact-maps-comparison.png" 
                                alt="울티마 유물 탐사 보상 설정 및 15x15 대형 지도 탐색 인게임 화면" 
                                className="w-full max-w-2xl mx-auto rounded-lg object-contain border border-slate-700/50" 
                            />
                            <p className="text-xs text-slate-200 mt-2 font-medium">▲ 유물 지도 보상 설정 화면(좌) 및 15x15 대형 지도 탐색 인게임 화면(우)</p>
                        </div>

                        <div className="bg-amber-950/30 border border-amber-800/40 rounded-xl p-3 sm:p-4">
                            <p className="text-xs font-bold text-amber-300 mb-2">⚠️ 반드시 알아야 할 규칙</p>
                            <ul className="text-xs text-white space-y-1.5">
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
                    <div className="bg-slate-900/60 border border-blue-900/40 rounded-2xl p-4 sm:p-5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-xs border-collapse whitespace-nowrap min-w-[520px]">
                                <thead>
                                    <tr className="bg-slate-800/80">
                                        <th className="p-3 border border-slate-700 text-left text-white font-bold">구분</th>
                                        <th className="p-3 border border-slate-700 text-center text-green-300 font-bold">5×5</th>
                                        <th className="p-3 border border-slate-700 text-center text-blue-300 font-bold">10×10</th>
                                        <th className="p-3 border border-slate-700 text-center text-purple-300 font-bold">15×15</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(() => {
                                        const rows = [
                                            { label: '전체 칸 수', v5: '25칸', v10: '100칸', v15: '225칸', type: 'normal' },
                                            { label: '⭐ 보상 배치 가능 칸 수 (1판당)', v5: '최대 8칸 (32%)', v10: '최대 32칸 (32%)', v15: '최대 72칸 (32%)', type: 'highlight' },
                                            { label: '1회 순수 천장 (지도 1개)', v5: '12,500마리', v10: '50,000마리', v15: '112,500마리', type: 'normal' },
                                            { label: '1회 AI 예상 (특수 유물 반영)', v5: '약 4.5천 ~ 6.5천 마리', v10: '약 1.8만 ~ 2.5만 마리', v15: '약 4만 ~ 5.5만 마리', type: 'highlight' },
                                            { label: '10회 완주 총 예상 사냥량', v5: '약 4.5만 ~ 6.5만 마리', v10: '약 18만 ~ 25만 마리', v15: '약 40만 ~ 55만 마리', type: 'normal' },
                                            { label: '⭐ 하루 권장 사냥량 (28일 완주)', v5: '약 1,800 ~ 2,300마리', v10: '약 6,500 ~ 8,000마리', v15: '약 1.5만 ~ 1.8만 마리', type: 'highlight' },
                                            { label: '1순위: 화이트 에디 큐브 배치 (1회/10회)', v5: '✨ 1개 / 10개 (전부 획득)', v10: '✨ 2개 / 20개 (전부 획득)', v15: '✨ 3개 / 30개 (전부 획득)', type: 'p1' },
                                            { label: '2순위: 블랙 큐브 배치 (1회/10회)', v5: '✨ 2개 / 20개 (전부 획득)', v10: '✨ 4개 / 40개 (전부 획득)', v15: '✨ 6개 / 60개 (전부 획득)', type: 'p2' },
                                            { label: '3순위: 솔 에르다 조각 배치 (1회/10회)', v5: '5개 / 50개 (칸제한 5개만)', v10: '✨ 12개 / 120개 (전부 획득)', v15: '✨ 20개 / 200개 (전부 획득)', type: 'p3' },
                                            { label: '4순위: 상급 EXP 교환권 배치 (1회/10회)', v5: '0개 (배치 자리 없음)', v10: '280개 / 2,800개 (14칸)', v15: '860개 / 8,600개 (43칸)', type: 'p4' },
                                            { label: '5순위: 희미한 솔 에르다 기운 (1회/10회)', v5: '0개 (배치 자리 없음)', v10: '70개 / 700개 (14칸)', v15: '215개 / 2,150개 (43칸)', type: 'p5' },
                                            { label: '🎁 완성 보상 (3종 중 택1 · 1회 / 10회)', v5: '— 3종 중 1개 선택 —', v10: '— 3종 중 1개 선택 —', v15: '— 3종 중 1개 선택 —', type: 'highlight' },
                                            { label: '└ 완성 보상: 솔 에르다 선택 시', v5: '1개 / 10개', v10: '2개 / 20개', v15: '3개 / 30개', type: 'normal' },
                                            { label: '└ 완성 보상: 상급 EXP 선택 시', v5: '300개 / 3,000개', v10: '500개 / 5,000개', v15: '800개 / 8,000개', type: 'normal' },
                                            { label: '└ 완성 보상: 조각 교환권 선택 시', v5: '15개 / 150개', v10: '25개 / 250개', v15: '40개 / 400개', type: 'normal' },
                                            { label: '고대의 화약통 등장', v5: '❌ 미등장', v10: '✅ 등장', v15: '✅ 등장', type: 'normal' },
                                        ];
                                        const trClass = (type: string, i: number) => {
                                            if (type === 'highlight') return 'bg-amber-950/40 border-amber-500/50';
                                            if (type === 'p1') return 'bg-purple-950/70 border-purple-600/60';
                                            if (type === 'p2') return 'bg-blue-950/70 border-blue-600/60';
                                            if (type === 'p3') return 'bg-amber-950/70 border-amber-600/60';
                                            if (type === 'p4') return 'bg-emerald-950/70 border-emerald-600/60';
                                            if (type === 'p5') return 'bg-cyan-950/70 border-cyan-600/60';
                                            return i % 2 === 0 ? 'bg-slate-900/40' : 'bg-slate-950/40';
                                        };
                                        const labelClass = (type: string) => {
                                            if (type === 'highlight') return 'p-2.5 border border-slate-700 text-amber-200 font-bold';
                                            if (type === 'p1') return 'p-2.5 border border-purple-700/80 text-purple-200 font-bold bg-purple-900/40';
                                            if (type === 'p2') return 'p-2.5 border border-blue-700/80 text-blue-200 font-bold bg-blue-900/40';
                                            if (type === 'p3') return 'p-2.5 border border-amber-700/80 text-amber-200 font-bold bg-amber-900/40';
                                            if (type === 'p4') return 'p-2.5 border border-emerald-700/80 text-emerald-200 font-bold bg-emerald-900/40';
                                            if (type === 'p5') return 'p-2.5 border border-cyan-700/80 text-cyan-200 font-bold bg-cyan-900/40';
                                            return 'p-2.5 border border-slate-700 text-white';
                                        };
                                        const cellClass = (type: string, col: 'v5' | 'v10' | 'v15') => {
                                            const base = 'p-2.5 text-center font-bold';
                                            if (type === 'highlight') return `${base} border border-slate-700 ${col === 'v5' ? 'text-green-300' : col === 'v10' ? 'text-blue-300' : 'text-purple-300'}`;
                                            if (type === 'p1') return `${base} border border-purple-700/80 text-purple-100 bg-purple-900/20`;
                                            if (type === 'p2') return `${base} border border-blue-700/80 text-blue-100 bg-blue-900/20`;
                                            if (type === 'p3') return `${base} border border-amber-700/80 text-amber-100 bg-amber-900/20`;
                                            if (type === 'p4') return `${base} border border-emerald-700/80 text-emerald-100 bg-emerald-900/20`;
                                            if (type === 'p5') return `${base} border border-cyan-700/80 text-cyan-100 bg-cyan-900/20`;
                                            return 'p-2.5 border border-slate-700 text-center text-slate-200';
                                        };
                                        return rows.map((row, i) => (
                                            <tr key={i} className={trClass(row.type, i)}>
                                                <td className={labelClass(row.type)}>{row.label}</td>
                                                <td className={cellClass(row.type, 'v5')}>{row.v5}</td>
                                                <td className={cellClass(row.type, 'v10')}>{row.v10}</td>
                                                <td className={cellClass(row.type, 'v15')}>{row.v15}</td>
                                            </tr>
                                        ));
                                    })()}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-white mt-3">※ 하루 천장 사냥량: 이벤트 총 28일 동안 10회 완주 순수 천장 사냥량을 일 단위로 나눈 수치 (특수 유물 제외 순수 천장 기준)</p>
                    </div>

                    {/* 특수 유물 상세 안내 */}
                    <div className="mt-8 bg-slate-900/80 border border-violet-900/50 rounded-2xl p-4 sm:p-5 space-y-4">
                        <div className="flex items-center gap-2 mb-1">
                            <Zap className="w-5 h-5 text-yellow-400" />
                            <h3 className="text-lg font-black text-amber-300">💣 특수 유물 상세 안내</h3>
                        </div>

                        {/* 특수 유물 보유 슬롯 바 인게임 이미지 */}
                        <div className="relative w-full overflow-hidden rounded-xl border border-amber-500/30 bg-slate-900/90 p-3 text-center shadow-lg">
                            <img 
                                src="/images/blog/ultima-artifact-special-items.png" 
                                alt="울티마 특수 유물 명칭(울티마 봄, 스페셜 울티마 봄, 울티마 레이저 X, 울티마 레이저 Y) 슬롯 바 인게임 화면" 
                                className="w-full max-w-lg mx-auto rounded-lg object-contain border border-slate-700/50" 
                            />
                            <p className="text-xs text-slate-200 mt-2 font-medium">▲ 특수 유물 명칭 구분 슬롯 바 (왼쪽부터 울티마 봄 / 스페셜 울티마 봄 / 울티마 레이저 X / 울티마 레이저 Y)</p>
                        </div>

                        {/* 개요 요약 */}
                        <div className="bg-violet-950/30 border border-violet-800/40 rounded-xl p-3.5 space-y-1.5 text-xs text-white">
                            <p className="flex items-start gap-2"><span className="text-yellow-400 font-bold shrink-0">•</span>레벨 범위 몬스터를 처치하면 정해진 확률로 특수 유물이 드롭되며, 지도 탐색 중 숨겨진 칸에서도 발견됩니다.</p>
                            <p className="flex items-start gap-2"><span className="text-yellow-400 font-bold shrink-0">•</span>사용 또는 발동 시 한 번에 여러 칸을 탐색하여 지도 완주를 극적으로 단축시킵니다.</p>
                            <p className="flex items-start gap-2"><span className="text-red-400 font-bold shrink-0">•</span><strong className="text-red-300">주의:</strong> 진행 중인 지도가 있을 때만 획득 가능하며, 지도 완성 시 보유 중인 특수 유물은 즉시 초기화됩니다!</p>
                        </div>

                        {/* 특수 유물 6종 테이블 */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-xs border-collapse whitespace-nowrap min-w-[580px]">
                                <thead>
                                    <tr className="bg-slate-800/90 text-amber-300">
                                        <th className="p-2.5 border border-slate-700 text-left font-bold w-1/4">아이템명</th>
                                        <th className="p-2.5 border border-slate-700 text-center font-bold">획득 경로</th>
                                        <th className="p-2.5 border border-slate-700 text-center font-bold">발동 유형</th>
                                        <th className="p-2.5 border border-slate-700 text-left font-bold w-2/5">효과</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-amber-950/40 border-amber-800/50">
                                        <td className="p-2.5 border border-amber-800/60 font-bold text-yellow-300">✨ 울티마 스페셜 봄</td>
                                        <td className="p-2.5 border border-amber-800/60 text-center text-slate-200">몬스터 드롭</td>
                                        <td className="p-2.5 border border-amber-800/60 text-center font-bold text-amber-400">수동 (클릭)</td>
                                        <td className="p-2.5 border border-amber-800/60 text-amber-100">
                                            지정한 칸 중심 <strong className="text-yellow-300">3x3 범위(9칸)</strong> 모든 칸 탐색 + <strong className="text-amber-300">아이템 2배 획득</strong>
                                        </td>
                                    </tr>
                                    <tr className="bg-slate-900/60">
                                        <td className="p-2.5 border border-slate-700 font-bold text-orange-300">💣 울티마 봄</td>
                                        <td className="p-2.5 border border-slate-700 text-center text-slate-200">몬스터 드롭</td>
                                        <td className="p-2.5 border border-slate-700 text-center font-bold text-amber-400">수동 (클릭)</td>
                                        <td className="p-2.5 border border-slate-700 text-slate-200">지정한 칸 중심으로 <strong>3x3 범위(9칸)</strong>의 모든 칸 탐색</td>
                                    </tr>
                                    <tr className="bg-slate-950/60">
                                        <td className="p-2.5 border border-slate-700 font-bold text-cyan-300">⚡ 울티마 레이저 X</td>
                                        <td className="p-2.5 border border-slate-700 text-center text-slate-200">몬스터 드롭</td>
                                        <td className="p-2.5 border border-slate-700 text-center font-bold text-amber-400">수동 (클릭)</td>
                                        <td className="p-2.5 border border-slate-700 text-slate-200">지정한 칸의 <strong>가로(X축) 전체 칸</strong> 탐색</td>
                                    </tr>
                                    <tr className="bg-slate-900/60">
                                        <td className="p-2.5 border border-slate-700 font-bold text-blue-300">⚡ 울티마 레이저 Y</td>
                                        <td className="p-2.5 border border-slate-700 text-center text-slate-200">몬스터 드롭</td>
                                        <td className="p-2.5 border border-slate-700 text-center font-bold text-amber-400">수동 (클릭)</td>
                                        <td className="p-2.5 border border-slate-700 text-slate-200">지정한 칸의 <strong>세로(Y축) 전체 칸</strong> 탐색</td>
                                    </tr>
                                    <tr className="bg-slate-950/60">
                                        <td className="p-2.5 border border-slate-700 font-bold text-rose-300">💥 고대의 화약통</td>
                                        <td className="p-2.5 border border-slate-700 text-center text-slate-200">지도 칸 탐색 시 등장</td>
                                        <td className="p-2.5 border border-slate-700 text-center font-bold text-rose-400">자동 (발견 즉시)</td>
                                        <td className="p-2.5 border border-slate-700 text-slate-200">발견 즉시 해당 칸 중심 <strong>3x3 범위(9칸)</strong> 모든 칸 탐색</td>
                                    </tr>
                                    <tr className="bg-amber-950/50 border-amber-700/60">
                                        <td className="p-2.5 border border-amber-800/60 font-bold text-yellow-300">🔑 고대의 황금 열쇠</td>
                                        <td className="p-2.5 border border-amber-800/60 text-center text-slate-200">지도 칸 탐색 시 등장</td>
                                        <td className="p-2.5 border border-amber-800/60 text-center font-bold text-amber-400">자동 (발견 즉시)</td>
                                        <td className="p-2.5 border border-amber-800/60 text-yellow-200 font-bold">
                                            발견 즉시 <strong className="text-yellow-300">지도 전체 모든 칸을 즉시 탐색 완료!</strong>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* 특수 유물 필수 유의사항 */}
                        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3.5 text-xs text-white space-y-1">
                            <p className="text-amber-300 font-bold mb-1.5">📌 유의사항 및 핵심 팁</p>
                            <p className="flex items-start gap-1.5"><span className="text-slate-400">•</span>특수 유물은 누적 탐색 횟수 상한을 달성한 경우 더 이상 드롭되지 않습니다.</p>
                            <p className="flex items-start gap-1.5"><span className="text-slate-400">•</span><strong>고대의 화약통</strong>은 <strong className="text-red-300">5x5 소형 지도에서는 등장하지 않습니다.</strong></p>
                            <p className="flex items-start gap-1.5"><span className="text-amber-400">•</span><strong className="text-yellow-300">울티마 스페셜 봄</strong>으로 보상을 획득하면 설정한 보상 총량과 별개로 <strong>2배 보상을 보너스로 누적 수령</strong>할 수 있습니다.</p>
                        </div>
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
                                <p className="text-xs text-slate-200">{map.tag} · {map.tagSub}</p>
                            </div>
                        </div>
                        <div className={`bg-slate-900/60 border border-white/20 rounded-2xl p-4 sm:p-5 space-y-5 shadow-lg`}>
                            {/* 사냥량 */}
                            <UltimaCalculator mapSize={map.size} ceiling={map.ceiling} color={map.color} />
                            {/* 보상 배치 */}
                            <div>
                                <h3 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                                    <Gift className={`w-4 h-4 text-${map.color}-400`} /> 최적 보상 배치 (1판당 최대 {map.maxRewardSlots}칸 배치 기준)
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                                    <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/40">
                                        <p className="text-white font-bold mb-2">🔒 필수 고정 배치 ({map.fixedSlots}칸)</p>
                                        <ul className="space-y-1 text-slate-200">
                                            {map.fixed.map((f) => (
                                                <li key={f.name}>• {f.name} <span className={`text-${f.color}-300 font-bold`}>{f.count}</span></li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/40">
                                        <p className="text-white font-bold mb-2">📦 나머지 채우기 ({map.restSlots}칸)</p>
                                        <ul className="space-y-1 text-slate-200">
                                            {map.rest.map((r) => (
                                                <li key={r.name}>• {r.name} <span className={`text-${r.color}-300 font-bold`}>{r.count}</span></li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* 10판 총 보상 */}
                            <div className={`bg-${map.color}-950/20 border border-${map.color}-800/30 rounded-xl p-3 sm:p-4`}>
                                <p className={`text-xs font-bold text-${map.color}-300 mb-2`}>🏆 10판 완주 시 총 보상 (완성 보상: 조각 교환권 선택 시)</p>
                                <div className="flex flex-wrap gap-2">
                                    {map.totalRewards.map((reward) => (
                                        <div key={reward.name} className={`px-3 py-2 text-center rounded-lg ${reward.highlight ? 'bg-amber-900/40 border border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.2)]' : `bg-${map.color}-900/30 border border-${map.color}-800/40`}`}>
                                            <p className={`text-xs font-black ${reward.highlight ? 'text-amber-300' : `text-${map.color}-200`}`}>{reward.value}</p>
                                            <p className={`text-xs mt-0.5 ${reward.highlight ? 'text-amber-100 font-bold' : 'text-slate-200'}`}>{reward.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* 주의/팁 */}
                            <div className="bg-slate-800/40 border border-slate-700/40 rounded-xl p-3 space-y-1.5">
                                <p className="text-xs text-white">{map.notice}</p>
                                <p className="text-xs text-slate-200">💡 {map.tip}</p>
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
                    <div className="bg-slate-900/60 border border-yellow-900/40 rounded-2xl p-4 sm:p-5 space-y-4">
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
                                    <p className="text-xs text-slate-200">{item.effect}</p>
                                    <p className={`text-xs text-${item.color}-200/80 bg-${item.color}-950/30 rounded p-1.5`}>💡 {item.tip}</p>
                                </div>
                            ))}
                        </div>
                        <div className="bg-red-950/30 border border-red-800/40 rounded-xl p-4">
                            <p className="text-xs font-bold text-red-300 mb-2 flex items-center gap-1.5">
                                <AlertTriangle className="w-4 h-4" /> 완성 직전 필수 행동
                            </p>
                            <p className="text-xs text-white">
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
                    <div className="bg-slate-900/60 border border-violet-900/40 rounded-2xl p-4 sm:p-5 space-y-3">
                        <p className="text-xs text-slate-200 mb-2">탐사 시작 전 배치할 보상을 정할 때 아래 순서대로 최대치를 채워 넣으세요.</p>
                        {[
                            { num: 1, name: '1순위: 대적자의 화이트 에디셔널 큐브', reason: '가장 희소하고 가격이 높음 → 5x5 / 10x10 / 15x15 모두 100% 풀배치 가능! ✨', color: 'purple' },
                            { num: 2, name: '2순위: 대적자의 블랙 큐브', reason: '실용성 1위 필수재 → 5x5 / 10x10 / 15x15 모두 100% 풀배치 가능! ✨', color: 'blue' },
                            { num: 3, name: '3순위: 솔 에르다 조각 교환권', reason: '6차 필수 재화 → 10x10, 15x15는 100% 풀배치! (5x5는 8칸 제한으로 5개만 배치)', color: 'amber' },
                            { num: 4, name: '4순위: 상급 EXP 교환권 (20개입)', reason: '남은 배치 칸 채우기 1지망 → 10x10 (14칸 = EXP 280개), 15x15 (43칸 = EXP 860개)', color: 'green' },
                            { num: 5, name: '5순위: 희미한 솔 에르다의 기운 (5개입)', reason: 'EXP 대신 선택할 보조 재화 → 10x10 (14칸 = 기운 70개), 15x15 (43칸 = 기운 215개)', color: 'slate' },
                        ].map(({ num, name, reason, color }) => (
                            <div key={num} className="flex items-start gap-3 bg-slate-800/40 rounded-xl p-3 border border-slate-700/40">
                                <div className={`w-8 h-8 rounded-full bg-${color}-900/50 border border-${color}-700/50 flex items-center justify-center shrink-0`}>
                                    <span className={`text-xs font-black text-${color}-300`}>{num}</span>
                                </div>
                                <div>
                                    <p className={`text-xs font-bold text-${color}-300`}>{name}</p>
                                    <p className="text-xs text-slate-200 mt-0.5">{reason}</p>
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
                                        <p className="text-xs text-slate-200">{condition}</p>
                                    </div>
                                    <span className={`ml-auto text-sm font-black px-4 py-1.5 rounded-full bg-${color}-900/50 border border-${color}-700/50 text-${color}-200`}>
                                        → {recommend} 선택
                                    </span>
                                </div>
                                <p className="text-xs text-slate-200 mb-3">{reason}</p>
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
                            <li key={i} className="flex items-start gap-2 text-white">
                                <span className="text-amber-400 font-bold shrink-0">{i + 1}.</span>
                                {tip}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 원문 */}
                <div className="mb-8 p-4 bg-slate-900/60 border border-slate-700/50 rounded-2xl text-sm text-slate-200 text-center">
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
