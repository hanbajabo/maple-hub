import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Swords, Gift, Gamepad2, ShoppingBag, Star, Sparkles, ChevronRight, Wrench, AlertCircle, Home } from 'lucide-react';

export const metadata: Metadata = {
    title: '테스트월드 업데이트 1.2.205 패치노트 정리 | 메이플 AI',
    description: '2026년 8월 13일 테스트월드 클라이언트 1.2.205 업데이트! 신규 보스 벨로나, 울티마 유물 탐사 미니게임, 모멘텀 패스 PLUS, 마스터라벨 개편 등 핵심 내용을 한눈에 정리했습니다.',
};

const TOC = [
    { id: 'boss-vellona', label: '신규 보스: 벨로나' },
    { id: 'event-fanatic', label: '[이벤트] 광신도의 자격' },
    { id: 'minigame-artifact', label: '[미니게임] 울티마 유물 탐사' },
    { id: 'event-merchant', label: '[사냥] 상인단의 물자 지원 III' },
    { id: 'momentum-pass', label: '모멘텀 패스 PLUS' },
    { id: 'crimson-farm', label: '크림슨 메카베리 농장' },
    { id: 'pcroom', label: '프리미엄 PC방 이벤트' },
    { id: 'story-ch3', label: '[스토리] 미션 울티마 챕터3' },
    { id: 'masterlabel', label: '마스터라벨 개편 + 플러스' },
    { id: 'skill-fix', label: '스킬 수정 사항' },
    { id: 'improvements', label: '개선 / 오류 수정' },
];

export default function TestworldUpdate1205Page() {
    return (
        <main className="w-full min-h-screen bg-[#080711] text-slate-100 py-12 px-4">
            {/* 배경 블러 */}
            <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-violet-900/10 rounded-full blur-[120px] pointer-events-none z-0" />
            <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none z-0" />

            {/* 네비게이션 */}
            <div className="max-w-4xl mx-auto relative z-10 flex items-center gap-3 mb-8">
                <Link prefetch={false} href="/blog" className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 hover:bg-slate-800/80 border border-slate-700/50 hover:border-violet-500/50 rounded-xl text-sm font-bold text-violet-300 hover:text-violet-200 transition-all shadow-sm group">
                    <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                    <span>블로그 홈</span>
                </Link>
                <Link prefetch={false} href="/" className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 hover:bg-slate-800/80 border border-slate-700/50 hover:border-slate-600 rounded-xl text-sm font-bold text-slate-300 hover:text-white transition-all shadow-sm">
                    <Home className="w-4 h-4" />
                    <span>메인 홈</span>
                </Link>
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* 헤더 */}
                <div className="mb-8">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-900/50 text-red-300 border border-red-700/50 font-semibold">테스트월드</span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-violet-900/50 text-violet-300 border border-violet-700/50 font-semibold">패치노트</span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800/60 text-slate-400 border border-slate-700/50 font-semibold">2026.08.13</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black mb-3 bg-gradient-to-r from-red-400 via-orange-400 to-violet-400 bg-clip-text text-transparent leading-tight">
                        테스트월드 1.2.205 패치노트 정리
                    </h1>
                    <p className="text-slate-300 text-sm sm:text-base border-l-4 border-red-500 pl-4 py-1 bg-red-950/20 rounded-r">
                        신규 보스 <strong className="text-red-300">벨로나</strong> 추가, <strong className="text-amber-300">울티마 유물 탐사</strong> 미니게임, <strong className="text-violet-300">마스터라벨 개편</strong> 등 핵심 내용을 한눈에 정리했습니다.
                    </p>
                </div>

                {/* 목차 */}
                <div className="mb-10 bg-slate-900/60 border border-slate-700/50 rounded-2xl p-5 shadow-lg">
                    <h2 className="font-bold text-slate-100 text-sm mb-4 flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-violet-400" />
                        목차
                    </h2>
                    <ul className="space-y-1.5">
                        {TOC.map((item) => (
                            <li key={item.id}>
                                <a href={`#${item.id}`} className="flex items-center gap-2 text-sm text-slate-400 hover:text-violet-300 transition-colors group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-violet-600 group-hover:bg-violet-400 transition-colors shrink-0" />
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ──────────────────────────────────────────────── */}
                {/* 1. 신규 보스: 벨로나 */}
                {/* ──────────────────────────────────────────────── */}
                <section id="boss-vellona" className="mb-10 scroll-mt-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-red-900/40 border border-red-700/50">
                            <Swords className="w-5 h-5 text-red-400" />
                        </div>
                        <h2 className="text-xl font-black text-red-300">신규 보스: 벨로나</h2>
                    </div>
                    <div className="bg-slate-900/60 border border-red-900/40 rounded-2xl p-5 space-y-4">
                        <p className="text-slate-300 text-sm leading-relaxed">
                            죽음의 문턱에서 살아있음을 느끼는 다르모어의 사도. 저주받은 도끼를 휘두르는 광기 어린 보스입니다.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/50">
                                <h3 className="font-bold text-white text-sm mb-2">📌 참여 조건</h3>
                                <ul className="text-slate-300 text-xs space-y-1">
                                    <li>• <span className="text-red-300 font-semibold">[솔라툼] 솔라툼의 진실</span> 퀘스트 완료</li>
                                    <li>• 280레벨 이상 캐릭터</li>
                                    <li>• 입장: 솔라툼 골짜기 ＞ 추방자의 협곡 게이트</li>
                                </ul>
                            </div>
                            <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/50">
                                <h3 className="font-bold text-white text-sm mb-2">⚠️ 하드 모드 일정</h3>
                                <ul className="text-slate-300 text-xs space-y-1">
                                    <li>• 정식 서버 오픈: <span className="text-amber-300 font-semibold">8월 21일(금) 오후 7시</span> 이후</li>
                                    <li>• 도전 가능 시간은 변경될 수 있음</li>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-white text-sm mb-2">🗺️ 추가되는 지역 / 퀘스트</h3>
                            <div className="grid sm:grid-cols-2 gap-3">
                                <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/40">
                                    <p className="text-xs font-semibold text-slate-300 mb-1">신규 맵</p>
                                    <ul className="text-xs text-slate-400 space-y-0.5">
                                        <li>• 솔라툼 골짜기</li>
                                        <li>• 추방자의 협곡</li>
                                        <li>• 테네아 신전</li>
                                    </ul>
                                </div>
                                <div className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/40">
                                    <p className="text-xs font-semibold text-slate-300 mb-1">신규 퀘스트</p>
                                    <ul className="text-xs text-slate-400 space-y-0.5">
                                        <li>• [솔라툼] 밀서</li>
                                        <li>• [솔라툼] 두 개의 죽음</li>
                                        <li>• [솔라툼] 신을 사냥하는 자</li>
                                        <li>• [솔라툼] 솔라툼의 진실</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-white text-sm mb-2">🎁 주요 드롭 아이템</h3>
                            <div className="flex flex-wrap gap-2">
                                {['굶주리는 핏빛 원혼', '벨로나로이드', '저주받은 원혼의 잔재', '광기의 에테르넬 방어구 상자', '벨로나의 소울 조각'].map(item => (
                                    <span key={item} className="text-xs px-2.5 py-1 bg-red-900/30 border border-red-800/50 rounded-full text-red-200">{item}</span>
                                ))}
                            </div>
                            <p className="text-xs text-slate-500 mt-2">※ 광기의 에테르넬 방어구 상자: 에테르넬 장갑/신발/망토 중 1개 획득</p>
                        </div>

                        <div>
                            <h3 className="font-bold text-white text-sm mb-2">✨ 벨로나 소울 스킬</h3>
                            <div className="flex flex-wrap gap-2">
                                {['드레드 레이스', '크리핑 데스'].map(sk => (
                                    <span key={sk} className="text-xs px-2.5 py-1 bg-violet-900/30 border border-violet-800/50 rounded-full text-violet-200">{sk}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ──────────────────────────────────────────────── */}
                {/* 2. 보스 격파 이벤트 */}
                {/* ──────────────────────────────────────────────── */}
                <section id="event-fanatic" className="mb-10 scroll-mt-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-orange-900/40 border border-orange-700/50">
                            <Gift className="w-5 h-5 text-orange-400" />
                        </div>
                        <h2 className="text-xl font-black text-orange-300">[보스 격파 이벤트] 광신도의 자격</h2>
                    </div>
                    <div className="bg-slate-900/60 border border-orange-900/40 rounded-2xl p-5 space-y-4">
                        <div className="grid sm:grid-cols-2 gap-3 text-xs">
                            <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50">
                                <p className="font-semibold text-slate-300 mb-1">📅 기간</p>
                                <p className="text-slate-400">일반 격파: <span className="text-orange-300">8/20(목) 점검 후 ~ 9/16(수)</span></p>
                                <p className="text-slate-400">1인 선착순: <span className="text-amber-300">8/27(목) 오후 7시 ~ 9/16(수)</span></p>
                            </div>
                            <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50">
                                <p className="font-semibold text-slate-300 mb-1">👤 참여 대상</p>
                                <p className="text-slate-400">280레벨 이상 (제로: 챕터2 완료)</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-white text-sm mb-3">🎁 일반 격파 보상</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-xs border-collapse min-w-[460px]">
                                    <thead>
                                        <tr className="bg-slate-800/80 text-slate-300">
                                            <th className="p-2 border border-slate-700 text-left font-bold">조건</th>
                                            <th className="p-2 border border-slate-700 text-left font-bold">보상</th>
                                            <th className="p-2 border border-slate-700 text-left font-bold">유효 기간</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-slate-900/40">
                                            <td className="p-2 border border-slate-700 text-slate-300">벨로나 (이지) 격파</td>
                                            <td className="p-2 border border-slate-700 text-orange-300 font-semibold">벨로나 액션 데미지 스킨 (유닛)</td>
                                            <td className="p-2 border border-slate-700 text-slate-400">9/17(목) 오전 2시</td>
                                        </tr>
                                        <tr className="bg-slate-950/40">
                                            <td className="p-2 border border-slate-700 text-slate-300">벨로나 (노멀) 격파</td>
                                            <td className="p-2 border border-slate-700 text-amber-300 font-semibold">심연의 틈</td>
                                            <td className="p-2 border border-slate-700 text-slate-400">영구</td>
                                        </tr>
                                        <tr className="bg-slate-900/40">
                                            <td className="p-2 border border-slate-700 text-slate-300">벨로나 (하드) 격파</td>
                                            <td className="p-2 border border-slate-700 text-red-300 font-semibold">벨로나 명찰/말풍선 반지 교환권</td>
                                            <td className="p-2 border border-slate-700 text-slate-400">9/17(목) 오전 2시</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="bg-amber-950/30 border border-amber-800/40 rounded-xl p-3">
                            <p className="text-xs font-bold text-amber-300 mb-1">🏆 1인 선착순 격파 (하드, 월드 통합 10명)</p>
                            <p className="text-xs text-slate-300">약자멸시 칭호 / 광신도의 처형 피니시 어택 이펙트 / 저주로 물든 제단 커스텀 배경</p>
                            <p className="text-xs text-slate-500 mt-1">※ 8/27 이전 입장 후 이후 클리어 시 선착순 미션 불가</p>
                        </div>
                    </div>
                </section>

                {/* ──────────────────────────────────────────────── */}
                {/* 3. 울티마 유물 탐사 */}
                {/* ──────────────────────────────────────────────── */}
                <section id="minigame-artifact" className="mb-10 scroll-mt-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-yellow-900/40 border border-yellow-700/50">
                            <Gamepad2 className="w-5 h-5 text-yellow-400" />
                        </div>
                        <h2 className="text-xl font-black text-yellow-300">[미니게임] 울티마 유물 탐사</h2>
                    </div>
                    <div className="bg-slate-900/60 border border-yellow-900/40 rounded-2xl p-5 space-y-4">
                        <p className="text-slate-300 text-sm leading-relaxed">
                            5x5 / 10x10 / 15x15 크기의 유물 지도를 선택하여 레벨 범위 몬스터 <strong className="text-yellow-300">500마리 처치마다 칸 1개 탐색</strong>. 보상이 배치된 칸을 모두 탐색하면 완성!
                        </p>

                        <div className="grid sm:grid-cols-3 gap-3">
                            {[
                                { size: '5×5', color: 'green', points: '최대 10개 지도' },
                                { size: '10×10', color: 'blue', points: '최대 10개 지도' },
                                { size: '15×15', color: 'purple', points: '최대 10개 지도' },
                            ].map(({ size, color }) => (
                                <div key={size} className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50 text-center">
                                    <p className="font-black text-lg text-white">{size}</p>
                                    <p className="text-xs text-slate-400 mt-1">유물 지도</p>
                                </div>
                            ))}
                        </div>

                        <div>
                            <h3 className="font-bold text-white text-sm mb-3">🎁 완성 보상</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-xs border-collapse min-w-[420px]">
                                    <thead>
                                        <tr className="bg-slate-800/80 text-slate-300">
                                            <th className="p-2 border border-slate-700 text-left">보상</th>
                                            <th className="p-2 border border-slate-700 text-center">5×5</th>
                                            <th className="p-2 border border-slate-700 text-center">10×10</th>
                                            <th className="p-2 border border-slate-700 text-center">15×15</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { name: '솔 에르다', v5: '1개', v10: '2개', v15: '3개' },
                                            { name: '상급 EXP 교환권', v5: '300개', v10: '500개', v15: '800개' },
                                            { name: '솔 에르다 조각 교환권', v5: '15개', v10: '25개', v15: '40개' },
                                        ].map((r) => (
                                            <tr key={r.name} className="odd:bg-slate-900/40 even:bg-slate-950/40">
                                                <td className="p-2 border border-slate-700 text-yellow-200 font-semibold">{r.name}</td>
                                                <td className="p-2 border border-slate-700 text-center text-slate-300">{r.v5}</td>
                                                <td className="p-2 border border-slate-700 text-center text-slate-300">{r.v10}</td>
                                                <td className="p-2 border border-slate-700 text-center text-slate-300">{r.v15}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-white text-sm mb-2">💣 특수 유물 아이템</h3>
                            <div className="grid sm:grid-cols-2 gap-2">
                                {[
                                    { name: '울티마 스페셜 봄', effect: '3×3 탐색 + 보상 2배', type: '수동' },
                                    { name: '울티마 봄', effect: '3×3 범위 탐색', type: '수동' },
                                    { name: '울티마 레이저 X', effect: '가로 전체 탐색', type: '수동' },
                                    { name: '울티마 레이저 Y', effect: '세로 전체 탐색', type: '수동' },
                                    { name: '고대의 화약통', effect: '3×3 자동 탐색 (5×5 불가)', type: '자동' },
                                    { name: '고대의 황금 열쇠', effect: '모든 칸 즉시 탐색', type: '자동' },
                                ].map((item) => (
                                    <div key={item.name} className="bg-slate-800/40 rounded-lg p-2.5 border border-slate-700/40 flex justify-between items-start gap-2">
                                        <div>
                                            <p className="text-xs font-semibold text-yellow-200">{item.name}</p>
                                            <p className="text-xs text-slate-400 mt-0.5">{item.effect}</p>
                                        </div>
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold shrink-0 ${item.type === '자동' ? 'bg-red-900/50 text-red-300 border border-red-800/50' : 'bg-blue-900/50 text-blue-300 border border-blue-800/50'}`}>
                                            {item.type}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ──────────────────────────────────────────────── */}
                {/* 4. 상인단의 물자 지원 III */}
                {/* ──────────────────────────────────────────────── */}
                <section id="event-merchant" className="mb-10 scroll-mt-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-emerald-900/40 border border-emerald-700/50">
                            <ShoppingBag className="w-5 h-5 text-emerald-400" />
                        </div>
                        <h2 className="text-xl font-black text-emerald-300">[사냥 이벤트] 상인단의 물자 지원 III</h2>
                    </div>
                    <div className="bg-slate-900/60 border border-emerald-900/40 rounded-2xl p-5 space-y-4">
                        <p className="text-slate-300 text-sm leading-relaxed">
                            레벨 범위 사냥터에서 몬스터를 처치하면 게이지가 쌓이고, 완충 시 <strong className="text-emerald-300">그림자 상인단의 상자</strong>가 소환됩니다.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="bg-slate-800/60 rounded-xl p-4 border border-emerald-900/30">
                                <p className="text-xs font-bold text-emerald-300 mb-2">🎁 일반 물자 (500마리)</p>
                                <ul className="text-xs text-slate-300 space-y-1">
                                    <li>• 일일 10회 충전, 최대 50회 누적</li>
                                    <li>• 상자 처치 시 경험치 획득</li>
                                    <li>• 폭탄으로 주변 몬스터 공격</li>
                                </ul>
                            </div>
                            <div className="bg-slate-800/60 rounded-xl p-4 border border-amber-900/30">
                                <p className="text-xs font-bold text-amber-300 mb-2">⭐ 특수 물자 (2500마리)</p>
                                <ul className="text-xs text-slate-300 space-y-1">
                                    <li>• ID당 일일 1회 충전, 최대 5회 누적</li>
                                    <li>• 특급 상자: 더 많은 경험치</li>
                                    <li>• + 솔 에르다의 기운 / 조각 교환권</li>
                                </ul>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500">※ 280레벨 이상 몬스터 사냥터에서 더 많은 경험치 / 특급 상자는 등급 상승으로 보상 추가 증가</p>
                    </div>
                </section>

                {/* ──────────────────────────────────────────────── */}
                {/* 5. 모멘텀 패스 PLUS */}
                {/* ──────────────────────────────────────────────── */}
                <section id="momentum-pass" className="mb-10 scroll-mt-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-sky-900/40 border border-sky-700/50">
                            <Sparkles className="w-5 h-5 text-sky-400" />
                        </div>
                        <h2 className="text-xl font-black text-sky-300">모멘텀 패스 PLUS</h2>
                    </div>
                    <div className="bg-slate-900/60 border border-sky-900/40 rounded-2xl p-5 space-y-4">
                        <div className="grid sm:grid-cols-2 gap-3">
                            <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50 text-xs">
                                <p className="font-semibold text-slate-300 mb-1">👤 참여 대상</p>
                                <p className="text-slate-400">280레벨 이상 / 명의당 1캐릭터</p>
                            </div>
                            <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50 text-xs">
                                <p className="font-semibold text-slate-300 mb-1">📅 기간</p>
                                <p className="text-slate-400">8/20(목) 점검 후 ~ 9/16(수)</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-white text-sm mb-1">📈 레벨 구조</h3>
                            <p className="text-xs text-slate-400 mb-3">레벨 0~10 / 주당 최대 2,500포인트 / 레벨당 750포인트 필요</p>
                            <div className="bg-slate-800/40 rounded-xl p-3 border border-slate-700/40">
                                <p className="text-xs font-semibold text-slate-300 mb-2">주요 주간 미션 (포인트)</p>
                                <div className="flex flex-wrap gap-2 text-xs">
                                    {[
                                        '어센틱 심볼 퀘스트 최대 400p',
                                        '몬스터파크 1회당 300p',
                                        '에픽 던전 1회 300p',
                                        '사냥 5,000마리 400p',
                                        '사냥 추가 5천~4만 마리 300p씩',
                                    ].map(m => (
                                        <span key={m} className="px-2 py-1 bg-sky-900/30 border border-sky-800/40 rounded-full text-sky-200">{m}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50">
                            <h3 className="font-bold text-white text-sm mb-2">💳 패스 상품 (넥슨캐시 전용)</h3>
                            <div className="flex flex-wrap gap-2 text-xs">
                                <span className="px-2.5 py-1 bg-blue-900/40 border border-blue-700/50 rounded-full text-blue-200">프리미엄 모멘텀 패스 29,800캐시</span>
                                <span className="px-2.5 py-1 bg-purple-900/40 border border-purple-700/50 rounded-full text-purple-200">프라임 모멘텀 패스 39,800캐시</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-white text-sm mb-2">🏆 레벨 10 달성 시 주요 보상 (프라임 기준)</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs text-center">
                                {['크림슨 메카베리 농장 입장권', '상급 EXP 교환권', '경험치 4배 쿠폰(30분)', 'VIP 부스터', 'VIP 사우나 이용권'].map(r => (
                                    <div key={r} className="bg-slate-800/40 rounded-lg p-2 border border-slate-700/40 text-slate-300 leading-tight">{r}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ──────────────────────────────────────────────── */}
                {/* 6. 크림슨 메카베리 농장 */}
                {/* ──────────────────────────────────────────────── */}
                <section id="crimson-farm" className="mb-10 scroll-mt-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-rose-900/40 border border-rose-700/50">
                            <Star className="w-5 h-5 text-rose-400" />
                        </div>
                        <h2 className="text-xl font-black text-rose-300">크림슨 메카베리 농장</h2>
                    </div>
                    <div className="bg-slate-900/60 border border-rose-900/40 rounded-2xl p-5 space-y-3">
                        <p className="text-slate-300 text-sm">모멘텀 패스 PLUS에서 <strong className="text-rose-300">입장권</strong>을 받아 입장하는 이벤트 전용 사냥터입니다.</p>
                        <div className="grid sm:grid-cols-2 gap-3 text-xs">
                            <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50">
                                <p className="font-semibold text-slate-300 mb-1">📌 조건</p>
                                <p className="text-slate-400">280레벨 이상 ~ 300레벨 미만</p>
                            </div>
                            <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50">
                                <p className="font-semibold text-slate-300 mb-1">⏱️ 진행 방식</p>
                                <p className="text-slate-400">30분 제한 / 크림슨 메카베리 군단 처치</p>
                                <p className="text-slate-400">복구율 100% → 자동 퇴장</p>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500">※ 추가 경험치 효과 미적용 / 입장권 사용 후 24시간 유효 / 슈피겔버스트 전용 스킬 사용 가능</p>
                    </div>
                </section>

                {/* ──────────────────────────────────────────────── */}
                {/* 7. 프리미엄 PC방 */}
                {/* ──────────────────────────────────────────────── */}
                <section id="pcroom" className="mb-10 scroll-mt-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-teal-900/40 border border-teal-700/50">
                            <Gift className="w-5 h-5 text-teal-400" />
                        </div>
                        <h2 className="text-xl font-black text-teal-300">프리미엄 PC방 접속보상 이벤트</h2>
                    </div>
                    <div className="bg-slate-900/60 border border-teal-900/40 rounded-2xl p-5 space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <h3 className="font-bold text-white text-xs mb-2">📅 기간</h3>
                                <p className="text-xs text-slate-400">접속 보상: <span className="text-teal-300">8/21(금) 0시 ~ 9/17(목)</span></p>
                                <p className="text-xs text-slate-400">기프트샵: <span className="text-teal-300">8/20(목) 점검 후 ~ 9/16(수)</span></p>
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-xs mb-2">⭐ 스페셜 혜택</h3>
                                <p className="text-xs text-slate-400">추가 경험치 <span className="text-emerald-300 font-semibold">+50%</span></p>
                                <p className="text-xs text-slate-400">프리미엄 코인 획득 → 주간 750개 한도</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-white text-sm mb-2">💰 총 누적 접속 보상</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-xs border-collapse min-w-[420px]">
                                    <thead>
                                        <tr className="bg-slate-800/80 text-slate-300">
                                            <th className="p-2 border border-slate-700 text-left">누적 시간</th>
                                            <th className="p-2 border border-slate-700 text-left">보상</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { time: '15시간', reward: '달콤한 정령(30일) 상자 + 벌룬 후드 세트 교환권' },
                                            { time: '30시간', reward: '마네킹 교환권 + 상급 EXP 교환권 1,000개' },
                                            { time: '45시간', reward: '솔 에르다 5개 + 상급 EXP 교환권 2,000개' },
                                            { time: '60시간', reward: '솔 에르다 조각 교환권 400개 + 상급 EXP 교환권 3,000개' },
                                        ].map(r => (
                                            <tr key={r.time} className="odd:bg-slate-900/40 even:bg-slate-950/40">
                                                <td className="p-2 border border-slate-700 text-teal-300 font-bold whitespace-nowrap">{r.time}</td>
                                                <td className="p-2 border border-slate-700 text-slate-300">{r.reward}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-white text-sm mb-2">🏪 프리미엄 기프트샵 (주요 아이템)</h3>
                            <div className="flex flex-wrap gap-2 text-xs">
                                <span className="px-2.5 py-1 bg-amber-900/30 border border-amber-700/40 rounded-full text-amber-200">솔 에르다 70코인 (주간 2개)</span>
                                <span className="px-2.5 py-1 bg-blue-900/30 border border-blue-700/40 rounded-full text-blue-200">카르마 블랙 큐브 30코인 (주간 3개)</span>
                                <span className="px-2.5 py-1 bg-purple-900/30 border border-purple-700/40 rounded-full text-purple-200">카르마 화이트 에디셔널 큐브 50코인 (주간 3개)</span>
                                <span className="px-2.5 py-1 bg-slate-700/60 border border-slate-600/40 rounded-full text-slate-200">VIP 부스터 10코인 / VIP 사우나 30코인</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ──────────────────────────────────────────────── */}
                {/* 8. 미션 울티마 챕터3 */}
                {/* ──────────────────────────────────────────────── */}
                <section id="story-ch3" className="mb-10 scroll-mt-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-indigo-900/40 border border-indigo-700/50">
                            <Star className="w-5 h-5 text-indigo-400" />
                        </div>
                        <h2 className="text-xl font-black text-indigo-300">[스토리 퀘스트] 미션 울티마 – 챕터3</h2>
                    </div>
                    <div className="bg-slate-900/60 border border-indigo-900/40 rounded-2xl p-5 space-y-3">
                        <p className="text-slate-300 text-sm leading-relaxed">
                            혼란에 휩싸인 울티마 폴리스. 대적자가 생명의 탑 정상으로 향하며 제른 다르모어와의 최후의 결전이 펼쳐집니다.
                        </p>
                        <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50">
                            <p className="text-xs font-semibold text-slate-300 mb-1">📌 참여 조건</p>
                            <p className="text-xs text-slate-400">[미션 울티마] 생명의 낙인 완료 + 101레벨 이상 (제로: 챕터2 완료)</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-300 mb-2">추가 퀘스트 목록</p>
                            <div className="flex flex-wrap gap-1.5">
                                {['낙인의 의미', '숨겨진 힘의 근원', '스펙터 약화', '가온의 각오', '저주의 늪', '처형인, 벨로나', '다시 만난 파괴자', '떠오른 태양', '생명의 탑으로', '마지막 기회', '소중한 것을 지키기 위해', '결전', '전해지지 못한 마음', '모든 경계를 허물고'].map(q => (
                                    <span key={q} className="text-xs px-2 py-0.5 bg-indigo-900/30 border border-indigo-800/40 rounded text-indigo-200">{q}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ──────────────────────────────────────────────── */}
                {/* 9. 마스터라벨 개편 */}
                {/* ──────────────────────────────────────────────── */}
                <section id="masterlabel" className="mb-10 scroll-mt-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-pink-900/40 border border-pink-700/50">
                            <Star className="w-5 h-5 text-pink-400" />
                        </div>
                        <h2 className="text-xl font-black text-pink-300">마스터라벨 개편 + 플러스</h2>
                    </div>
                    <div className="bg-slate-900/60 border border-pink-900/40 rounded-2xl p-5 space-y-5">
                        <div>
                            <h3 className="font-bold text-white text-sm mb-3">📋 마스터라벨 개편 핵심 변경</h3>
                            <div className="space-y-2 text-sm">
                                {[
                                    { icon: '✅', text: '능력치 확률 부여 → 모두 확정 부여로 변경' },
                                    { icon: '✅', text: '능력치 유효 기간 190일 확정 부여' },
                                    { icon: '✅', text: '부위별 아이템 지급 → 마스터라벨 세트 선택권 지급으로 변경 (7일 유효)' },
                                    { icon: '✅', text: '마스터라벨 획득 확률 약 25% 상향' },
                                    { icon: '❌', text: '마스터피스 판매 종료' },
                                ].map(({ icon, text }) => (
                                    <div key={text} className="flex items-start gap-2">
                                        <span className="shrink-0">{icon}</span>
                                        <p className="text-slate-300 text-xs">{text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-white text-sm mb-2">📊 확률 변경 (레드라벨 기준)</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-xs border-collapse min-w-[320px]">
                                    <thead>
                                        <tr className="bg-slate-800/80 text-slate-300">
                                            <th className="p-2 border border-slate-700 text-left">항목</th>
                                            <th className="p-2 border border-slate-700 text-center">기존</th>
                                            <th className="p-2 border border-slate-700 text-center">변경</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-slate-900/40">
                                            <td className="p-2 border border-slate-700 text-slate-300">레드라벨 마스터라벨</td>
                                            <td className="p-2 border border-slate-700 text-center text-slate-400">12.42%</td>
                                            <td className="p-2 border border-slate-700 text-center text-green-300 font-bold">15.52%</td>
                                        </tr>
                                        <tr className="bg-slate-950/40">
                                            <td className="p-2 border border-slate-700 text-slate-300">블랙라벨 마스터라벨</td>
                                            <td className="p-2 border border-slate-700 text-center text-slate-400">22.33%</td>
                                            <td className="p-2 border border-slate-700 text-center text-green-300 font-bold">27.91%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-white text-sm mb-3">⭐ 마스터라벨 플러스 (캐시샵)</h3>
                            <div className="grid sm:grid-cols-2 gap-3">
                                <div className="bg-slate-800/60 rounded-xl p-3 border border-blue-900/30">
                                    <p className="text-xs font-bold text-blue-300 mb-1">성장 플러스 (30,000캐시)</p>
                                    <div className="text-xs text-slate-400 space-y-0.5">
                                        <p>1개: +25% / 2개: +40% / 3개: +55%</p>
                                        <p>4개: +70% / <span className="text-emerald-300 font-bold">5개: +100%</span> 추가 경험치</p>
                                    </div>
                                </div>
                                <div className="bg-slate-800/60 rounded-xl p-3 border border-red-900/30">
                                    <p className="text-xs font-bold text-red-300 mb-1">전투 플러스 (40,000캐시)</p>
                                    <div className="text-xs text-slate-400 space-y-0.5">
                                        <p>1개: 공/마 +10, 올스탯 +15</p>
                                        <p>5개: <span className="text-red-300 font-bold">공/마 +60, 올스탯 +140, HP/MP +7000</span></p>
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 mt-2">※ 90일 유효 / 캐릭터 단위 적용 / 능력치 유효 기간이 남은 마스터라벨 착용 시에만 적용</p>
                        </div>
                    </div>
                </section>

                {/* ──────────────────────────────────────────────── */}
                {/* 10. 스킬 수정 */}
                {/* ──────────────────────────────────────────────── */}
                <section id="skill-fix" className="mb-10 scroll-mt-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-cyan-900/40 border border-cyan-700/50">
                            <Wrench className="w-5 h-5 text-cyan-400" />
                        </div>
                        <h2 className="text-xl font-black text-cyan-300">스킬 수정 사항</h2>
                    </div>
                    <div className="bg-slate-900/60 border border-cyan-900/40 rounded-2xl p-5 space-y-3">
                        <div className="bg-amber-950/30 border border-amber-800/40 rounded-xl p-3 mb-2">
                            <p className="text-xs font-bold text-amber-300 mb-1">🔧 공통 주요 수정</p>
                            <ul className="text-xs text-slate-300 space-y-1">
                                <li>• 매그너스/검은 마법사에서 얼티밋 다크 사이트 등 일부 스킬 사용 불가 현상 수정</li>
                                <li>• 루나 게더링: 줄/사다리에서 자동 사용 시 반복 문구 출력 현상 수정</li>
                                <li>• 솔 헤카테: 재사용 대기시간 비정상 적용 수정</li>
                                <li>• 맵 이동 시 일정 시간마다 준비되는 스킬 시간 비정상 적용 완화</li>
                            </ul>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-2">
                            {[
                                { job: '히어로', fix: '레이지 익스플로젼 시전 동작 수정' },
                                { job: '다크나이트', fix: '챔피언 레이드 다크니스 오브 그레이스 태그 수정' },
                                { job: '아크메이지(썬콜)', fix: '썬더 스피어/엘퀴네스 보상 몬스터 타격 불가 처리' },
                                { job: '보우마스터/신궁', fix: '리트리트 샷 키다운 중 스킬 사용 가능 현상 수정' },
                                { job: '나이트로드', fix: '쉐도우 리츄얼 MP 비정상 소비 수정' },
                                { job: '루미너스', fix: '트와일라잇 노바 클라이언트 종료 현상 수정' },
                                { job: '아란', fix: '콤보 어빌리티 맵 이동 시 콤보 획득 오류 완화' },
                                { job: '아크', fix: '원초의 격류 격류 발생 조건 오류 수정' },
                                { job: '아델', fix: '맵 이동 시 에테르 획득 오류 완화' },
                                { job: '칼리', fix: '헥스:차크람 퓨리 키다운 중 스킬 사용 현상 수정' },
                            ].map(({ job, fix }) => (
                                <div key={job} className="bg-slate-800/40 rounded-lg p-2.5 border border-slate-700/40">
                                    <p className="text-xs font-semibold text-cyan-300">{job}</p>
                                    <p className="text-xs text-slate-400 mt-0.5">{fix}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ──────────────────────────────────────────────── */}
                {/* 11. 개선 / 오류 수정 */}
                {/* ──────────────────────────────────────────────── */}
                <section id="improvements" className="mb-10 scroll-mt-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-600/50">
                            <AlertCircle className="w-5 h-5 text-slate-400" />
                        </div>
                        <h2 className="text-xl font-black text-slate-300">개선 사항 / 오류 수정</h2>
                    </div>
                    <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-5 space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-sm font-bold text-slate-200 mb-2">🛒 메이플 옥션 대대적 개선</h3>
                                <ul className="text-xs text-slate-400 space-y-1">
                                    <li>• <span className="text-white">다크 모드</span> 추가</li>
                                    <li>• <span className="text-white">검색 태그 기능</span> 추가 (#마라벨, #스라벨 등)</li>
                                    <li>• 코디 카테고리 상위 메뉴로 변경</li>
                                    <li>• 클라이언트 TAB키 필터 이동 지원</li>
                                    <li>• 저가 판매 등록 시 경고 메시지 추가</li>
                                    <li>• 코디 카테고리에 능력치 유효기간 필터 추가</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-200 mb-2">🎨 염색하기 UI 개선</h3>
                                <ul className="text-xs text-slate-400 space-y-1">
                                    <li>• ESC 메뉴에 [치장 염색] 버튼 추가</li>
                                    <li>• 프리즘 사용 시 [미리보기] 버튼 추가</li>
                                    <li>• 미리보기 3배 확대 버튼 추가</li>
                                    <li>• 여러 아이템 동시 컬러 변경 후 한번에 적용 가능</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-200 mb-2">⚙️ 스킬 반복 입력 개선</h3>
                                <ul className="text-xs text-slate-400 space-y-1">
                                    <li>• 종류 선택 → <span className="text-white">대기시간/반복시간 직접 수정</span> 방식으로 변경</li>
                                    <li>• 불필요한 반복 스킬 다수 제외 처리</li>
                                    <li>• 챔피언 레이드 태그 시 해당 캐릭터 반복 입력 적용</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-200 mb-2">📌 기타 주요 개선</h3>
                                <ul className="text-xs text-slate-400 space-y-1">
                                    <li>• 챔피언 코인 다음달 7일까지 사용 가능으로 변경</li>
                                    <li>• VIP 사우나/MVP 리조트 채널 점검 시 자동 채널 이동</li>
                                    <li>• 마스터라벨 개편 개별 변경</li>
                                    <li>• Yellow 메이플ID 패널티 아이콘 표시 개선</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 원문 링크 */}
                <div className="mb-8 p-4 bg-slate-900/60 border border-slate-700/50 rounded-2xl text-sm text-slate-400 text-center">
                    📎 원문 출처:&nbsp;
                    <a
                        href="https://maplestory.nexon.com/testworld/news/all/193"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-violet-400 hover:text-violet-300 underline"
                    >
                        메이플스토리 테스트월드 공식 패치노트 (1.2.205)
                    </a>
                </div>

                {/* 블로그 홈으로 */}
                <div className="mt-4">
                    <Link
                        href="/blog"
                        prefetch={false}
                        className="flex items-center justify-center gap-2 w-full bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600/50 hover:border-violet-500/50 text-slate-200 hover:text-white font-bold py-4 rounded-xl transition-all shadow-md group"
                    >
                        <span>블로그 홈으로 돌아가기</span>
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </main>
    );
}
