'use client';

import Link from 'next/link';
import { ArrowLeft, CalendarX, CalendarCheck, ShoppingBag, Swords, Sparkles, Star, Gift, AlertCircle, CheckCircle } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

// ──────────────────────────────────────────
// 데이터 정의
// ──────────────────────────────────────────

const SCHEDULE = [
    {
        date: '2026.08.19',
        type: 'end',
        label: '종료',
        color: 'red',
        items: [
            {
                category: '이벤트',
                icon: '🎪',
                list: ['울티마 스쿼드', '상인단의 물자 지원 II', '메이플포인트 샵', '모멘텀 패스'],
            },
            {
                category: '캐시샵',
                icon: '🛍️',
                list: ['부티크 기프트', '상반기 BEST 프리미엄 헤어&성형 쿠폰'],
            },
        ],
    },
    {
        date: '2026.08.20',
        type: 'start',
        label: '시작',
        color: 'green',
        items: [
            {
                category: '신규 보스',
                icon: '⚔️',
                list: ['벨로나 (Lv.280 이상 / 최대 3인 / 이지·노멀·하드)'],
                highlight: true,
            },
            {
                category: '이벤트',
                icon: '🎪',
                list: [
                    '광신도의 자격 (일반)',
                    '울티마 유물 탐사',
                    '상인단의 물자 지원 III',
                    '모멘텀 패스 PLUS (크림슨 메카베리 농장 포함)',
                    '프리미엄 기프트샵 & 스페셜 PC방 혜택',
                ],
            },
            {
                category: '스토리',
                icon: '📖',
                list: ['미션 울티마 — 챕터 3'],
            },
            {
                category: '캐시샵',
                icon: '🛍️',
                list: [
                    '마스터피스 20기 <마스터 어밴든 세트>',
                    '메이플 로얄 스타일 160기',
                    '신규 프리미엄 헤어&성형 쿠폰',
                    '프리미엄 모멘텀 패스 (29,800 캐시) / 프라임 모멘텀 패스 (39,800 캐시)',
                    '마스터라벨 성장 플러스 (30,000 캐시)',
                    '마스터라벨 전투 플러스 (40,000 캐시)',
                ],
            },
        ],
    },
    {
        date: '2026.08.20',
        type: 'end',
        label: '종료',
        color: 'red',
        items: [
            {
                category: '이벤트',
                icon: '🎪',
                list: ['프리미엄 PC방 접속 보상 이벤트 & 기프트샵 (기존)'],
            },
        ],
    },
    {
        date: '2026.08.21',
        type: 'start',
        label: '시작',
        color: 'green',
        items: [
            {
                category: '이벤트',
                icon: '🎪',
                list: ['신규 프리미엄 PC방 누적 접속 보상 이벤트'],
            },
        ],
    },
    {
        date: '2026.08.26',
        type: 'end',
        label: '종료',
        color: 'red',
        items: [
            {
                category: '이벤트',
                icon: '🎪',
                list: ['메이플스토리M 렌 레벨 달성 이벤트'],
            },
        ],
    },
    {
        date: '2026.08.27',
        type: 'start',
        label: '시작',
        color: 'green',
        items: [
            {
                category: '이벤트',
                icon: '🎪',
                list: ['광신도의 자격 (1인 선착순 미션)'],
            },
        ],
    },
    {
        date: '2026.09.15',
        type: 'end',
        label: '종료',
        color: 'red',
        items: [
            {
                category: '캐시샵',
                icon: '🛍️',
                list: ['제네시스 패스 & 제네시스 패스 PLUS', '몬스터파크 핸즈 이용권'],
            },
        ],
    },
    {
        date: '2026.09.16',
        type: 'end',
        label: '종료',
        color: 'red',
        items: [
            {
                category: '이벤트',
                icon: '🎪',
                list: [
                    '메이린 격파',
                    '챌린저스 패스',
                    '하이퍼 버닝 MAX/블링크/BEYOND',
                    '아이템 버닝 PLUS',
                    '울티마 작전 일지',
                    '에테리온 아티팩트',
                    '신입 용병 지원 미션',
                    '연합 토큰샵 & 현상금 의뢰',
                    '의문의 결계',
                    '모멘텀 패스',
                    '헤이즐의 부탁',
                    '광신도의 자격 (전체)',
                    '울티마 유물 탐사',
                    '물자 지원 III',
                    '모멘텀 패스 PLUS',
                    '기프트샵 & 스페셜 PC방 혜택',
                ],
            },
            {
                category: '캐시샵',
                icon: '🛍️',
                list: [
                    '스페셜 루나 크리스탈',
                    '전 직업 일러스트 컬렉션(전종)',
                    '보스 컬렉션(벨로나 포함)',
                    '전 직업 헤어&성형 쿠폰',
                    '프리미엄/프라임 모멘텀 패스',
                ],
            },
        ],
    },
    {
        date: '2026.09.17',
        type: 'end',
        label: '종료',
        color: 'red',
        items: [
            {
                category: '이벤트',
                icon: '🎪',
                list: ['챌린저스 월드 시즌4', '신규 프리미엄 PC방 누적 접속 보상'],
            },
            {
                category: '캐시샵',
                icon: '🛍️',
                list: ['메이플 로얄 스타일 160기', '신규 프리미엄 헤어&성형 쿠폰'],
            },
        ],
    },
    {
        date: '2026.12.16',
        type: 'end',
        label: '종료',
        color: 'red',
        items: [
            {
                category: '이벤트',
                icon: '🎪',
                list: ['VIP 사우나'],
            },
        ],
    },
    {
        date: '상시',
        type: 'always',
        label: '상시',
        color: 'slate',
        items: [
            {
                category: '캐시샵 (상시 진행/판매)',
                icon: '🛍️',
                list: [
                    '반투명 장비 (신규)',
                    '마스터라벨 성장/전투 플러스 (신규)',
                    '컬러링 프리즘 프로 & 무기 이펙트 프리즘',
                    '메이플 로얄스타일 (※마스터피스는 8/20 이후 판매 종료)',
                    '프리미엄/초이스 헤어&성형 쿠폰',
                    '위습의 원더베리 & 루나 크리스탈',
                    '추가옵션/잠재능력 전승 스크롤',
                    '성별 변경 쿠폰',
                ],
            },
        ],
    },
];

// ──────────────────────────────────────────
// 색상 헬퍼
// ──────────────────────────────────────────
function colorSet(color: string) {
    if (color === 'green') return {
        badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
        dot: 'bg-emerald-400',
        line: 'border-emerald-500/30',
        card: 'border-emerald-500/20 bg-emerald-950/10',
        icon: <CalendarCheck className="w-4 h-4 text-emerald-400" />,
    };
    if (color === 'red') return {
        badge: 'bg-red-500/20 text-red-400 border-red-500/40',
        dot: 'bg-red-400',
        line: 'border-red-500/30',
        card: 'border-red-500/20 bg-red-950/10',
        icon: <CalendarX className="w-4 h-4 text-red-400" />,
    };
    return {
        badge: 'bg-slate-500/20 text-slate-400 border-slate-500/40',
        dot: 'bg-slate-400',
        line: 'border-slate-500/30',
        card: 'border-slate-500/20 bg-slate-800/20',
        icon: <Star className="w-4 h-4 text-slate-400" />,
    };
}

// ──────────────────────────────────────────
// 메인 컴포넌트
// ──────────────────────────────────────────
export default function August2026UpdateSchedule() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">

            {/* 상단 네비 */}
            <div className="border-b border-slate-800 bg-slate-950/60 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
                    <Link prefetch={false} href="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
                        <ArrowLeft className="w-4 h-4" />
                        블로그로 돌아가기
                    </Link>
                </div>
            </div>

            <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

                {/* 헤더 */}
                <header className="mb-10">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full border border-blue-500/30">업데이트 소식</span>
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-full border border-purple-500/30">8월 패치</span>
                        <span className="text-slate-500 text-xs">2026년 8월 18일</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 leading-tight">
                        📅 8월 업데이트 일정 완벽 정리
                    </h1>
                    <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                        신규 보스 벨로나, 모멘텀 패스 PLUS, 미션 울티마 챕터 3까지!<br className="hidden sm:block" />
                        8월~9월 주요 시작·종료 일정을 한눈에 확인하세요.
                    </p>
                </header>

                {/* 핵심 요약 카드 */}
                <section className="mb-10 bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-slate-900 border border-purple-500/40 rounded-2xl p-5 sm:p-6">
                    <h2 className="text-base sm:text-lg font-black text-purple-300 mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 animate-pulse" />
                        ⚡ 이번 업데이트 핵심 요약
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                            { icon: '⚔️', label: '신규 보스', value: '벨로나 (8/20)', color: 'text-red-300' },
                            { icon: '🌀', label: '신규 이벤트', value: '모멘텀 패스 PLUS', color: 'text-blue-300' },
                            { icon: '📖', label: '신규 스토리', value: '미션 울티마 챕터 3', color: 'text-yellow-300' },
                            { icon: '🛍️', label: '신규 캐시샵', value: '마스터피스 20기', color: 'text-purple-300' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 bg-slate-900/60 rounded-xl px-4 py-3 border border-slate-700/50">
                                <span className="text-2xl">{item.icon}</span>
                                <div>
                                    <div className="text-xs text-slate-400 font-semibold">{item.label}</div>
                                    <div className={`text-sm font-bold ${item.color}`}>{item.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <InArticleAd dataAdSlot="6849727140" />

                {/* 타임라인 */}
                <section className="mb-10">
                    <h2 className="text-lg sm:text-xl font-black text-white mb-6 flex items-center gap-2">
                        <Gift className="w-5 h-5 text-yellow-400" />
                        📋 날짜별 상세 일정
                    </h2>

                    <div className="relative">
                        {/* 세로 타임라인 선 */}
                        <div className="absolute left-[18px] sm:left-[22px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-700 via-slate-600 to-transparent rounded-full" />

                        <div className="space-y-6">
                            {SCHEDULE.map((entry, idx) => {
                                const cs = colorSet(entry.color);
                                return (
                                    <div key={idx} className="relative pl-10 sm:pl-14">
                                        {/* 타임라인 점 */}
                                        <div className={`absolute left-[13px] sm:left-[17px] top-1.5 w-2.5 h-2.5 rounded-full ${cs.dot} shadow-md ring-2 ring-slate-950`} />

                                        {/* 날짜 + 배지 */}
                                        <div className="flex flex-wrap items-center gap-2 mb-3">
                                            <span className="text-white font-black text-base sm:text-lg">{entry.date}</span>
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${cs.badge}`}>
                                                {cs.icon}
                                                {entry.label}
                                            </span>
                                        </div>

                                        {/* 카테고리별 아이템 */}
                                        <div className={`border rounded-xl overflow-hidden ${cs.card}`}>
                                            {entry.items.map((group, gi) => (
                                                <div key={gi} className={`${gi > 0 ? 'border-t border-slate-700/40' : ''}`}>
                                                    {/* 카테고리 헤더 */}
                                                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/40">
                                                        <span className="text-base">{group.icon}</span>
                                                        <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">{group.category}</span>
                                                    </div>
                                                    {/* 아이템 목록 */}
                                                    <ul className="px-4 py-3 space-y-1.5">
                                                        {group.list.map((item, ii) => (
                                                            <li key={ii} className="flex items-start gap-2 text-sm text-slate-200 leading-snug">
                                                                <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${cs.dot} opacity-80`} />
                                                                <span className={(group as any).highlight ? 'text-yellow-200 font-semibold' : ''}>
                                                                    {item}
                                                                    {item.includes('모멘텀 패스 PLUS') && (
                                                                        <Link
                                                                            prefetch={false}
                                                                            href="/blog/momentum-pass-plus-guide"
                                                                            className="ml-2 inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 bg-purple-500/30 text-purple-300 border border-purple-500/40 rounded-full hover:bg-purple-500/50 transition-colors"
                                                                        >
                                                                            가이드 보기 →
                                                                        </Link>
                                                                    )}
                                                                    {item.includes('울티마 유물 탐사') && (
                                                                        <Link
                                                                            prefetch={false}
                                                                            href="/blog/ultima-artifact-exploration-guide"
                                                                            className="ml-2 inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-full hover:bg-amber-500/50 transition-colors"
                                                                        >
                                                                            가이드 보기 →
                                                                        </Link>
                                                                    )}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="6849727140" />

                {/* 마스터라벨 플러스 상세 */}
                <section className="mb-10">
                    <h2 className="text-lg sm:text-xl font-black text-white mb-5 flex items-center gap-2">
                        <span>🏷️</span> 신규 캐시샵: 마스터라벨 플러스
                    </h2>

                    {/* 판매 정보 */}
                    <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/20 border border-indigo-500/40 rounded-2xl p-5 mb-4">
                        <div className="text-xs text-indigo-300 font-bold uppercase tracking-wider mb-3">📅 2026.08.20 점검 후 판매 시작</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                            <div className="bg-slate-900/60 border border-emerald-500/30 rounded-xl p-4 text-center">
                                <div className="text-xs text-slate-400 mb-1">마스터라벨 성장 플러스</div>
                                <div className="text-xl font-black text-emerald-300">30,000 캐시</div>
                                <div className="text-xs text-emerald-400/70 mt-1">추가 경험치 효과</div>
                            </div>
                            <div className="bg-slate-900/60 border border-red-500/30 rounded-xl p-4 text-center">
                                <div className="text-xs text-slate-400 mb-1">마스터라벨 전투 플러스</div>
                                <div className="text-xl font-black text-red-300">40,000 캐시</div>
                                <div className="text-xs text-red-400/70 mt-1">공격력·올스탯 효과</div>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                            <span className="bg-slate-800/60 px-2.5 py-1 rounded-full">📍 캐시샵 &gt; 스페셜 &gt; 스페셜</span>
                            <span className="bg-slate-800/60 px-2.5 py-1 rounded-full">⏳ 효과 기간 90일</span>
                            <span className="bg-slate-800/60 px-2.5 py-1 rounded-full">🔒 넥슨캐시 전용 · 교환 불가</span>
                        </div>
                    </div>

                    {/* 효과 표 */}
                    <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl overflow-hidden mb-4">
                        <div className="bg-slate-800/80 px-4 py-2.5">
                            <span className="text-sm font-black text-white">📊 착용 개수별 효과</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-xs sm:text-sm text-left min-w-[500px]">
                                <thead>
                                    <tr className="border-b border-slate-700 bg-slate-800/40">
                                        <th className="px-3 py-2.5 text-center text-slate-400 font-bold whitespace-nowrap">착용 개수</th>
                                        <th className="px-3 py-2.5 text-emerald-300 font-bold whitespace-nowrap">성장 플러스 효과</th>
                                        <th className="px-3 py-2.5 text-red-300 font-bold whitespace-nowrap">전투 플러스 효과</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700/40">
                                    {[
                                        { count: '1개', growth: '추가 경험치 25%', combat: '공격력/마력 +10, 올스탯 +15, 최대 HP/MP +750' },
                                        { count: '2개', growth: '추가 경험치 40%', combat: '공격력/마력 +20, 올스탯 +40, 최대 HP/MP +2,000' },
                                        { count: '3개', growth: '추가 경험치 55%', combat: '공격력/마력 +30, 올스탯 +65, 최대 HP/MP +3,250' },
                                        { count: '4개', growth: '추가 경험치 70%', combat: '공격력/마력 +40, 올스탯 +90, 최대 HP/MP +4,500' },
                                        { count: '5개', growth: '추가 경험치 100%', combat: '공격력/마력 +60, 올스탯 +140, 최대 HP/MP +7,000', highlight: true },
                                    ].map((row, i) => (
                                        <tr key={i} className={`transition-colors ${(row as any).highlight ? 'bg-yellow-900/20' : 'hover:bg-slate-800/20'}`}>
                                            <td className={`px-3 py-2.5 text-center font-black ${(row as any).highlight ? 'text-yellow-300' : 'text-slate-300'}`}>{row.count}</td>
                                            <td className={`px-3 py-2.5 font-semibold ${(row as any).highlight ? 'text-emerald-300' : 'text-emerald-400/80'}`}>{row.growth}</td>
                                            <td className={`px-3 py-2.5 ${(row as any).highlight ? 'text-red-300' : 'text-slate-300'}`}>{row.combat}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* 유의사항 */}
                    <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 space-y-1.5 text-xs text-slate-300">
                        <div className="font-bold text-slate-100 mb-2">⚠️ 유의사항</div>
                        <p>• 마스터라벨 플러스는 <strong className="text-emerald-300">월드 단위</strong>로 적용됩니다. (계정 내 동일 월드 모든 캐릭터 공유)</p>
                        <p>• 챌린저스 월드에서 월드 리프 시, 잔여 기간이 남은 마스터라벨 플러스를 <strong className="text-amber-300">추출권으로 변환</strong>할 수 있습니다. (리프 후 사용 시 재활성화 / 활성화 중인 월드라면 기간 합산)</p>
                        <p>• 능력치 유효 기간이 만료되지 않은 마스터라벨 착용 시에만 효과 적용됩니다.</p>
                        <p>• 동일 세트 여부와 관계없이 <strong className="text-white">착용 중인 개수</strong>에 따라 단계별 효과가 적용됩니다.</p>
                        <p>• 적용 중 재구매는 불가하며, <strong className="text-white">적용 기간 종료 후</strong> 다시 구매할 수 있습니다.</p>
                        <p>• 이벤트 리스트 캐시탭에서 착용 개수·획득 능력치·적용 기간을 확인할 수 있습니다.</p>
                    </div>
                </section>

                {/* 주의사항 */}

                <section className="mb-10 bg-amber-900/20 border border-amber-500/30 rounded-2xl p-5">
                    <h2 className="text-base font-black text-amber-300 mb-3 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        ⚠️ 주의사항
                    </h2>
                    <ul className="space-y-2 text-sm text-slate-300">
                        <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /><span>일정은 공식 공지 기준이며, 점검 시간에 따라 실제 적용 시간이 달라질 수 있습니다.</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /><span>모멘텀 패스 PLUS는 <strong className="text-white">캐릭터당 1회</strong> 참여 가능하며, 참여 후 변경이 불가합니다.</span></li>
                        <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /><span>마스터피스는 8/20 이후 상시 판매 목록에서 종료됩니다.</span></li>
                    </ul>
                </section>

                {/* 관련 글 */}
                <section>
                    <h2 className="text-lg font-black text-white mb-4">📚 관련 가이드</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Link prefetch={false} href="/blog/momentum-pass-plus-guide" className="bg-slate-900/60 border border-slate-700 rounded-xl p-4 hover:border-purple-500/50 hover:bg-slate-800/50 transition-all group">
                            <div className="text-xs text-purple-400 mb-1 font-semibold">이벤트 가이드</div>
                            <div className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">🌀 모멘텀 패스 PLUS 완벽 가이드</div>
                        </Link>
                        <Link prefetch={false} href="/blog/ultima-artifact-exploration-guide" className="bg-slate-900/60 border border-slate-700 rounded-xl p-4 hover:border-amber-500/50 hover:bg-slate-800/50 transition-all group">
                            <div className="text-xs text-amber-400 mb-1 font-semibold">이벤트 가이드</div>
                            <div className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">🗺️ 울티마 유물 탐사 완벽 공략</div>
                        </Link>
                        <Link prefetch={false} href="/blog/challengers-pass-efficiency-2026" className="bg-slate-900/60 border border-slate-700 rounded-xl p-4 hover:border-blue-500/50 hover:bg-slate-800/50 transition-all group">
                            <div className="text-xs text-blue-400 mb-1 font-semibold">이벤트 가이드</div>
                            <div className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">🏆 챌린저스 패스 효율 완벽 분석</div>
                        </Link>
                        <Link prefetch={false} href="/blog/testworld-update-1-2-205" className="bg-slate-900/60 border border-slate-700 rounded-xl p-4 hover:border-red-500/50 hover:bg-slate-800/50 transition-all group">
                            <div className="text-xs text-red-400 mb-1 font-semibold">업데이트 소식</div>
                            <div className="text-sm font-bold text-white group-hover:text-red-300 transition-colors">⚔️ 테스트월드 1.2.205 패치노트 정리</div>
                        </Link>
                    </div>
                </section>

            </article>
        </div>
    );
}
