'use client';
import Link from 'next/link';
import { Calendar, ArrowLeft, Sword, Zap, Package, Coins, Shield, Star, Trophy, Info, TrendingUp, Target, Clock } from 'lucide-react';

export default function UltimaSquadStrategyGuidePage() {
    return (
        <div className="min-h-screen bg-[#070610] text-slate-100 pb-24 font-sans leading-relaxed">
            {/* 배경 장식 */}
            <div className="fixed top-0 left-1/3 w-[600px] h-[600px] bg-orange-900/10 rounded-full blur-[140px] pointer-events-none z-0" />
            <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-900/8 rounded-full blur-[100px] pointer-events-none z-0" />
            <div className="fixed top-1/2 left-0 w-[300px] h-[300px] bg-red-900/5 rounded-full blur-[80px] pointer-events-none z-0" />

            {/* 헤더 */}
            <header className="w-full max-w-7xl flex justify-between items-center px-4 sm:px-6 py-3.5 sm:py-4 sticky top-0 z-50 bg-[#070610]/90 backdrop-blur-md border-b border-slate-800/80 mx-auto">
                <Link prefetch={false} href="/blog" className="flex items-center gap-2 hover:opacity-80 transition-opacity text-orange-400 font-semibold group text-sm sm:text-base">
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:-translate-x-1 transition-transform" />
                    <span>블로그 홈으로</span>
                </Link>
            </header>

            <main className="max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-12 relative z-10">

                {/* 타이틀 섹션 */}
                <div className="mb-12">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="flex items-center gap-1.5 px-3.5 py-1 text-xs font-semibold bg-orange-500/10 text-orange-300 border border-orange-500/30 rounded-full">
                            <Calendar className="w-3.5 h-3.5" /> 2026.07.23 ~ 08.19
                        </span>
                        <span className="px-3.5 py-1 text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded-full">🎮 미니게임 이벤트</span>
                        <span className="px-3.5 py-1 text-xs font-bold bg-green-500/10 text-green-300 border border-green-500/20 rounded-full">📊 실측 데이터 기반</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-5 leading-tight break-keep">
                        <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                            울티마 스쿼드 효율 전략 가이드
                        </span>
                    </h1>
                    <p className="text-base md:text-lg text-slate-300 mb-8 leading-relaxed break-keep border-l-4 border-orange-500 pl-5 py-2 bg-orange-950/10 rounded-r-lg">
                        LV1부터 2구역 후반까지의 <strong className="text-orange-300">실전 성장 로드맵</strong>을 실측 데이터 기반으로 정리했습니다.<br />
                        <span className="text-amber-300">언제 무엇을 준비해야 하는지</span> 한눈에 확인하세요!
                    </p>

                    {/* 목차 */}
                    <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 sm:p-6 backdrop-blur-sm shadow-xl">
                        <p className="text-base font-bold text-slate-200 mb-4 flex items-center gap-2">
                            <Package className="w-5 h-5 text-orange-400" /> 📑 목차
                        </p>
                        <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                            {[
                                { num: '01', color: 'text-orange-400', href: '#roadmap', label: '성장 로드맵 & 주요 마일스톤' },
                                { num: '02', color: 'text-amber-400', href: '#equipment', label: '아이템 장착 레벨 & 최적 추옵' },
                                { num: '03', color: 'text-yellow-400', href: '#gold', label: '사냥터별 골드 수급 (2구역)' },
                                { num: '04', color: 'text-emerald-400', href: '#exp', label: '사냥터별 경험치 효율 (실측)' },
                                { num: '05', color: 'text-blue-400', href: '#stage', label: '스테이지별 클리어 실측 기록' },
                                { num: '06', color: 'text-purple-400', href: '#tips', label: '핵심 운영 팁 정리' },
                            ].map(({ num, color, href, label }) => (
                                <li key={href} className="flex items-center gap-2 bg-slate-950/20 p-2.5 rounded-lg border border-slate-800/40 hover:border-orange-500/30 transition-colors">
                                    <span className={`${color} font-mono font-bold`}>{num}</span>
                                    <a href={href} className="text-slate-300 hover:text-white transition-colors">{label}</a>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>

                {/* 1. 성장 로드맵 */}
                <section id="roadmap" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-4 sm:p-8 backdrop-blur-sm shadow-lg">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                        <TrendingUp className="w-6 h-6 text-orange-400" />
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-100">1. 성장 로드맵 & 주요 마일스톤</h2>
                    </div>

                    <p className="text-sm text-slate-400 mb-5">⚠️ 미리 골드를 모아두는 것이 핵심입니다. 각 마일스톤 전에 충분한 골드를 확보해 두세요!</p>

                    <div className="space-y-3">
                        {[
                            {
                                phase: 'LV 1 ~ 7',
                                color: 'border-slate-600 bg-slate-900/50',
                                titleColor: 'text-slate-300',
                                badge: 'bg-slate-700 text-slate-300',
                                icon: '🗡️',
                                title: '전사 1인 초반 운영',
                                items: [
                                    '처음에는 전사 1명으로 시작 — 초반 사냥터는 1-1 ~ 1-3 반복',
                                    'LV.2 달성 시 첫 스킬 「오라 블레이드」 해금 (공격 스킬) — 즉시 장착',
                                    'LV.10 달성 시 「아이언 바디」 해금 (방어 스킬) — 즉시 장착',
                                    '1-4 이상 클리어를 목표로 레벨업 반복',
                                ]
                            },
                            {
                                phase: 'LV 8 ~ 15',
                                color: 'border-emerald-500/40 bg-emerald-950/20',
                                titleColor: 'text-emerald-300',
                                badge: 'bg-emerald-900/50 text-emerald-300',
                                icon: '🏹',
                                title: '궁수 영입 — 1-6 클리어 후 50만 골드 필요',
                                items: [
                                    '1-6 스테이지 클리어 후 궁수 영입 가능 (비용: 50만 골드)',
                                    'LV.8 달성 시 2단계 장비(레어) 착용 가능',
                                    '궁수 LV.2 달성 시 「차지드 애로우」 (공격 스킬) 즉시 장착',
                                    '영입 직후 1-7 ~ 2-2 반복으로 빠른 레벨업 진행',
                                ]
                            },
                            {
                                phase: 'LV 22',
                                color: 'border-amber-500/40 bg-amber-950/20',
                                titleColor: 'text-amber-300',
                                badge: 'bg-amber-900/50 text-amber-300',
                                icon: '📦',
                                title: '4단계 아이템 착용 가능 — 이전부터 준비!',
                                items: [
                                    'LV.22가 되는 순간 4단계(에픽) 장비를 착용할 수 있습니다',
                                    '사냥 중 획득하거나 큐브로 미리 굴려서 좋은 옵션의 4단계 장비 준비',
                                    '전사: 방어구 2개에 방어력 +20 잠재 → 생존력 대폭 상승',
                                    '궁수: 무기 + 방어구 2개 세팅이 DPS 및 생존 최적화',
                                    '4단계 착용 레벨 달성 즉시 장착하면 다음 스테이지 돌파에 큰 도움!',
                                ]
                            },
                            {
                                phase: 'LV 25 전후',
                                color: 'border-blue-500/40 bg-blue-950/20',
                                titleColor: 'text-blue-300',
                                badge: 'bg-blue-900/50 text-blue-300',
                                icon: '⚔️',
                                title: '2-6 클리어 후 마법사 영입 — 400만 골드 필요',
                                items: [
                                    '마법사 영입은 2-6 스테이지 클리어 후 해금됩니다',
                                    '마법사 영입 비용: 400만 골드 (미리 모아두기!)',
                                    '마법사 LV.7 달성 시 「힐」 스킬 해금 → 파티 회복으로 생존력 대폭 향상',
                                    '마법사 LV.17 달성 시 「헤븐즈 도어(부활)」 스킬 해금',
                                    '마법사는 3단계 풀셋 장착을 최대한 빨리 완료하는 것이 목표',
                                ]
                            },
                            {
                                phase: 'LV 26 ~ 27+',
                                color: 'border-purple-500/40 bg-purple-950/20',
                                titleColor: 'text-purple-300',
                                badge: 'bg-purple-900/50 text-purple-300',
                                icon: '🏆',
                                title: '2-9 돌파 & 2-10(보스 아르카나 정령) 극적 클리어 단계',
                                items: [
                                    '전사 LV.26 + 궁수 LV.25 + 마법사 LV.16으로 2-8 극적 클리어 성공 (실측)',
                                    '전사 LV.27 + 궁수 LV.26(4단계풀셋) + 마법사 LV.18(3단계풀셋) 세팅 달성',
                                    '🔑 핵심 수동 컨트롤: 마법사 힐+공격으로 버티다가 사망 시 부활 스킬로 스위칭 ➔ 부활 후 다시 공격 스킬로 체인징!',
                                    '궁수 보스전 전용 「폭풍의 시」 체인징 스킬 컨트롤 병행 (2-9 10회 재도전 끝에 극적 클리어)',
                                    '🎉 2-10 보스 클리어 세팅: 전사 Lv.28 (5단계 무기+방어스킬) + 궁수 Lv.28 (5단계 모자+볼텍스/폭시) + 마법사 Lv.21 (힐/공격/부활 3단 스위칭) 8회 재도전 끝에 2-10 아르카나 정령 보스 최종 돌파 성공!',
                                ]
                            },
                            {
                                phase: 'LV 28~30+ (3지역)',
                                color: 'border-amber-500/40 bg-amber-950/20',
                                titleColor: 'text-amber-300',
                                badge: 'bg-amber-900/50 text-amber-300',
                                icon: '⚔️',
                                title: '3지역 진입 & 스킬 3슬롯 풀세팅 단계',
                                items: [
                                    '2-10 아르카나 정령 보스 클리어 후 스킬 3슬롯 확장 해금!',
                                    '전사: 스킬 3개 장착 (해머 + 오라 + 디바이드 / 5단계 무기+방어구 1개)',
                                    '궁수: 스킬 3개 장착 (공격스킬 2개 + 폭풍의 시 / 5단계 모자+4단계 풀셋)',
                                    '마법사: 스킬 3개 장착 (힐링 + 공격 + 미스틱도어 / 3단계 풀셋)',
                                    '🎉 3인 스쿼드 전원 스킬 3개 풀장착 세팅으로 3-1 돌파 성공! (3-1 기준 30% 골획증 시 910G/3-2 975G 파밍)',
                                ]
                            },
                        ].map((item, idx) => (
                            <div key={idx} className={`border ${item.color} rounded-xl p-4 sm:p-5`}>
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-xl">{item.icon}</span>
                                    <div>
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${item.badge} mr-2`}>{item.phase}</span>
                                        <span className={`font-bold text-base ${item.titleColor}`}>{item.title}</span>
                                    </div>
                                </div>
                                <ul className="space-y-1.5">
                                    {item.items.map((point, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                            <span className="text-slate-500 mt-0.5 shrink-0">›</span>
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* 골드 준비 요약 */}
                    <div className="mt-6 bg-yellow-950/30 border border-yellow-500/30 rounded-xl p-4">
                        <p className="text-yellow-300 font-bold text-sm mb-3 flex items-center gap-2">
                            <Coins className="w-4 h-4" /> 💰 주요 지출 골드 요약 (미리 준비!)
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                                { label: '궁수 영입', cost: '50만 골드', timing: '1-6 클리어 후', color: 'text-emerald-300' },
                                { label: '마법사 영입', cost: '400만 골드', timing: '2-6 클리어 후', color: 'text-purple-300' },
                                { label: '골획증 +25%', cost: '1,330만 골드 (누적)', timing: '가능한 빨리', color: 'text-yellow-300' },
                            ].map((item, i) => (
                                <div key={i} className="bg-slate-900/60 rounded-lg p-3 text-center">
                                    <p className={`font-bold text-base ${item.color}`}>{item.cost}</p>
                                    <p className="text-slate-300 text-xs font-semibold mt-1">{item.label}</p>
                                    <p className="text-slate-500 text-xs mt-0.5">{item.timing}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 2. 아이템 장착 레벨 & 최적 추옵 */}
                <section id="equipment" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-4 sm:p-8 backdrop-blur-sm shadow-lg">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                        <Star className="w-6 h-6 text-amber-400" />
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-100">2. 아이템 장착 레벨 & 최적 추옵</h2>
                    </div>

                    {/* 단계별 장착 레벨 */}
                    <h3 className="font-bold text-slate-200 mb-3 text-base flex items-center gap-2">
                        <Package className="w-4 h-4 text-amber-400" /> 단계별 아이템 착용 가능 레벨 & 스탯
                    </h3>
                    <div className="overflow-x-auto mb-8">
                        <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[520px]">
                            <thead>
                                <tr className="bg-slate-800 text-slate-100 border-b border-slate-600">
                                    <th className="p-2.5 sm:p-3 border border-slate-700 font-bold text-white">장비 단계</th>
                                    <th className="p-2.5 sm:p-3 border border-slate-700 font-bold text-amber-300">착용 레벨</th>
                                    <th className="p-2.5 sm:p-3 border border-slate-700 font-bold text-rose-300 text-center">무기 기본 공</th>
                                    <th className="p-2.5 sm:p-3 border border-slate-700 font-bold text-sky-200">방어구 기본 스탯</th>
                                    <th className="p-2.5 sm:p-3 border border-slate-700 font-bold text-emerald-300">추옵 (실측)</th>
                                    <th className="p-2.5 sm:p-3 border border-slate-700 font-bold text-yellow-300 text-right">분해 골드</th>
                                </tr>
                            </thead>
                            <tbody className="text-white">
                                {[
                                    { stage: '1단계', lv: '제한 없음', atk: '+9', armor: 'HP +45 / 방어력 +5', pot: '무기 공/마 +4 / 방어구 HP +10, 방어력 +4', price: '660 G', highlight: false },
                                    { stage: '2단계', lv: 'LV.8 이상', atk: '+14', armor: 'HP +74 / 방어력 +10', pot: '무기 공/마 +4 / 방어구 HP +12, 방어력 +4', price: '1,400 G', highlight: false },
                                    { stage: '3단계', lv: 'LV.15 이상', atk: '+20', armor: 'HP +112 / 방어력 +15', pot: '무기 공/마 +4 / 방어구 HP +16, 방어력 +4', price: '2,970 G', highlight: false },
                                    { stage: '4단계 ⭐', lv: 'LV.22 이상', atk: '+25', armor: 'HP +158 / 방어력 +20', pot: '무기 공/마 +4 / 방어구 HP +34, 방어력 +4 확인', price: '6,300 G', highlight: true },
                                    { stage: '5단계 ⭐', lv: 'LV.28 이상', atk: '+32', armor: 'HP +231 / 방어력 +25', pot: '무기 공/마 +6 / 방어구 HP +38, 방어력 +4 확인', price: '13,370 G', highlight: true },
                                    { stage: '6단계~', lv: '미확인', atk: '미확인', armor: '미확인', pot: '미확인', price: '미확인', highlight: false },
                                ].map((row, idx) => (
                                    <tr key={row.stage} className={`${row.highlight ? 'bg-amber-950/40 ring-1 ring-amber-500/40' : idx % 2 === 0 ? 'bg-slate-900/60' : 'bg-slate-950/60'}`}>
                                        <td className={`p-2.5 sm:p-3 border border-slate-700 font-extrabold ${row.highlight ? 'text-amber-300' : 'text-white'}`}>{row.stage}</td>
                                        <td className="p-2.5 sm:p-3 border border-slate-700 font-bold text-amber-400">{row.lv}</td>
                                        <td className="p-2.5 sm:p-3 border border-slate-700 text-center font-extrabold text-rose-400">{row.atk}</td>
                                        <td className="p-2.5 sm:p-3 border border-slate-700 text-xs sm:text-sm font-medium text-slate-100">{row.armor}</td>
                                        <td className="p-2.5 sm:p-3 border border-slate-700 text-xs sm:text-sm font-semibold text-emerald-300">{row.pot}</td>
                                        <td className="p-2.5 sm:p-3 border border-slate-700 text-xs sm:text-sm font-mono font-bold text-yellow-300 text-right">{row.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* 직업별 최적 추옵 조합 */}
                    <h3 className="font-bold text-slate-200 mb-3 text-base flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400" /> 직업별 최적 잠재능력(추옵) 조합 (실측 기반)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        {[
                            {
                                job: '⚔️ 전사',
                                color: 'border-red-500/40 bg-red-950/20',
                                titleColor: 'text-red-300',
                                badge: 'bg-red-900/50 text-red-300',
                                items: [
                                    { slot: '무기', rec: '공격력 +9 (에픽 최대)' },
                                    { slot: '방어구 ①', rec: '방어력 +20 (에픽 최대)' },
                                    { slot: '방어구 ②', rec: '방어력 +20 (에픽 최대)' },
                                    { slot: '방어구 ③', rec: '방어력 +20 또는 HP +170' },
                                ],
                                tip: '전사는 방어력이 생존에 직결! 방어구 추옵은 방어력 +20이 최우선.'
                            },
                            {
                                job: '🏹 궁수',
                                color: 'border-emerald-500/40 bg-emerald-950/20',
                                titleColor: 'text-emerald-300',
                                badge: 'bg-emerald-900/50 text-emerald-300',
                                items: [
                                    { slot: '무기', rec: '공격력 +9 (에픽 최대)' },
                                    { slot: '방어구 ①', rec: '공격력 +9 또는 방어력 +20' },
                                    { slot: '방어구 ②', rec: '공격력 +9 또는 방어력 +20' },
                                ],
                                tip: '궁수는 딜러 역할 — 무기 공격력이 DPS에 가장 중요.'
                            },
                            {
                                job: '🔮 마법사',
                                color: 'border-purple-500/40 bg-purple-950/20',
                                titleColor: 'text-purple-300',
                                badge: 'bg-purple-900/50 text-purple-300',
                                items: [
                                    { slot: '전체 슬롯', rec: '3단계 아이템 풀셋 우선' },
                                    { slot: '추옵 목표', rec: '마력 +5 (레어 최대)' },
                                ],
                                tip: '마법사는 힐/부활 역할이 핵심. 4단계 착용 레벨 달성 전까지 3단계 풀셋으로 운영.'
                            },
                        ].map((item, i) => (
                            <div key={i} className={`border ${item.color} rounded-xl p-4`}>
                                <p className={`font-bold text-base ${item.titleColor} mb-3`}>{item.job}</p>
                                <ul className="space-y-2 mb-3">
                                    {item.items.map((slot, j) => (
                                        <li key={j} className="text-xs">
                                            <span className={`font-bold px-1.5 py-0.5 rounded text-xs mr-2 ${item.badge}`}>{slot.slot}</span>
                                            <span className="text-slate-200">{slot.rec}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-xs text-slate-400 border-t border-slate-700/50 pt-2">{item.tip}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-slate-900/80 p-4 rounded-xl border border-purple-500/40 text-xs sm:text-sm text-slate-200 space-y-2 leading-relaxed shadow-lg">
                        <p className="font-bold text-purple-300 text-sm mb-2 flex items-center gap-1.5">
                            <span>🎲</span>
                            <span>잠재능력 실측 핵심 데이터 & 규칙</span>
                        </p>
                        <p className="text-slate-200">※ 잠재능력은 무기와 방어구 구분 없이 동일하게 적용됩니다. <span className="text-slate-400">(예: 방어구에서도 공격력/마력 획득 가능)</span></p>
                        <p className="text-slate-200">※ <strong className="text-yellow-300 font-bold">공격력과 마력 옵션은 별도로 존재</strong>합니다. <span className="text-slate-400">(전사/궁수는 <strong className="text-white">공격력</strong>, 마법사는 <strong className="text-purple-300">마력</strong> 유효)</span></p>
                        <p className="text-slate-200">※ <strong className="text-emerald-300 font-bold">공/마+%는 에픽 무기 잠재능력에서만 뜨는 것으로 확인</strong> / <strong className="text-sky-300 font-bold">방어구에서는 크확+2%까지 뜨는 것으로 확인</strong></p>
                        <p className="text-slate-300 text-xs pt-1 border-t border-slate-700/60">※ 에픽 등급(4단계~5단계) 기준 공/마 최대 수치: <strong className="text-amber-300">+9 (고정) / +2% (퍼센트)</strong> (5단계 동일 등급 추정)</p>
                    </div>
                </section>

                {/* 3. 사냥터별 골드 수급 */}
                <section id="gold" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-4 sm:p-8 backdrop-blur-sm shadow-lg">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                        <Coins className="w-6 h-6 text-yellow-400" />
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-100">3. 사냥터별 골드 수급 (2구역 실측)</h2>
                    </div>

                    <div className="bg-yellow-950/20 border border-yellow-500/30 rounded-xl p-4 mb-5">
                        <p className="text-yellow-300 text-sm font-semibold mb-1">💡 골드 수급 핵심 전략</p>
                        <p className="text-slate-300 text-sm">높은 스테이지일수록 골드 수급이 늘어납니다. <strong className="text-amber-300">클리어 가능한 가장 높은 스테이지</strong>에서 반복 사냥하는 것이 기본 원칙입니다.<br />골드 획득량 증가(골획증) 강화를 빠르게 진행할수록 누적 수익 차이가 커집니다!</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[520px] shadow-md">
                            <thead>
                                <tr className="bg-slate-800 text-slate-100 border-b border-slate-600">
                                    <th className="p-2 sm:p-2.5 border border-slate-700 font-bold text-white">스테이지</th>
                                    <th className="p-2 sm:p-2.5 border border-slate-700 font-bold text-slate-100 text-center">기본 골드</th>
                                    <th className="p-2 sm:p-2.5 border border-slate-700 font-bold text-slate-300 text-center">+5%</th>
                                    <th className="p-2 sm:p-2.5 border border-slate-700 font-bold text-slate-300 text-center">+10%</th>
                                    <th className="p-2 sm:p-2.5 border border-slate-700 font-bold text-slate-300 text-center">+20%</th>
                                    <th className="p-2 sm:p-2.5 border border-slate-700 font-bold text-slate-200 text-center">+25%</th>
                                    <th className="p-2 sm:p-2.5 border border-slate-700 font-bold text-amber-300 text-center">+30% (최대) ★</th>
                                </tr>
                            </thead>
                            <tbody className="text-white">
                                {[
                                    { stage: '2-1', base: '400G', p5: '420G', p10: '440G', p20: '480G', p25: '500G', p30: '520G', highlight: false },
                                    { stage: '2-2', base: '430G', p5: '451G', p10: '473G', p20: '516G', p25: '537G', p30: '559G', highlight: false },
                                    { stage: '2-3', base: '460G', p5: '483G', p10: '506G', p20: '552G', p25: '575G', p30: '598G', highlight: false },
                                    { stage: '2-4', base: '490G', p5: '514G', p10: '539G', p20: '588G', p25: '612G', p30: '637G', highlight: false },
                                    { stage: '2-5', base: '520G', p5: '546G', p10: '572G', p20: '624G', p25: '650G', p30: '676G', highlight: false },
                                    { stage: '2-6', base: '550G', p5: '577G', p10: '605G', p20: '660G', p25: '687G', p30: '715G', highlight: false },
                                    { stage: '2-7 ⭐', base: '580G', p5: '609G', p10: '638G', p20: '696G', p25: '725G', p30: '754G', highlight: true },
                                    { stage: '2-8', base: '610G', p5: '640G', p10: '671G', p20: '732G', p25: '762G', p30: '793G', highlight: false },
                                    { stage: '2-9', base: '640G', p5: '672G', p10: '704G', p20: '768G', p25: '800G', p30: '832G', highlight: false },
                                    { stage: '3-1', base: '700G', p5: '735G', p10: '770G', p20: '840G', p25: '875G', p30: '910G', highlight: false },
                                    { stage: '3-2 ⭐', base: '750G', p5: '788G', p10: '825G', p20: '900G', p25: '938G', p30: '975G', highlight: true },
                                ].map((row, idx) => (
                                    <tr key={row.stage} className={`${row.highlight ? 'bg-yellow-950/40 ring-1 ring-yellow-500/40' : idx % 2 === 0 ? 'bg-slate-900/60' : 'bg-slate-950/60'}`}>
                                        <td className={`p-2 sm:p-2.5 border border-slate-700 font-extrabold ${row.highlight ? 'text-yellow-300' : 'text-white'}`}>{row.stage}</td>
                                        <td className="p-2 sm:p-2.5 border border-slate-700 text-center font-semibold text-slate-100">{row.base}</td>
                                        <td className="p-2 sm:p-2.5 border border-slate-700 text-center font-semibold text-slate-300">{row.p5}</td>
                                        <td className="p-2 sm:p-2.5 border border-slate-700 text-center font-semibold text-slate-300">{row.p10}</td>
                                        <td className="p-2 sm:p-2.5 border border-slate-700 text-center font-semibold text-slate-300">{row.p20}</td>
                                        <td className="p-2 sm:p-2.5 border border-slate-700 text-center font-semibold text-slate-200">{row.p25}</td>
                                        <td className={`p-2 sm:p-2.5 border border-slate-700 text-center font-extrabold ${row.highlight ? 'text-yellow-300' : 'text-amber-300'}`}>{row.p30}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">⭐ 2-7이 현재 클리어 가능한 가장 높은 안정 스테이지 (전사 Lv.25 + 궁수 Lv.24 + 마법사 Lv.15 기준)</p>

                    {/* 골획증 투자 가이드 */}
                    <div className="mt-6 bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                        <p className="text-slate-200 font-bold text-sm mb-3">💰 골드 획득량 증가(골획증) 투자 우선순위</p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-xs min-w-[360px]">
                                <thead>
                                    <tr className="text-slate-400">
                                        <th className="text-left p-1.5 border-b border-slate-700">단계</th>
                                        <th className="text-center p-1.5 border-b border-slate-700">누적 비용</th>
                                        <th className="text-center p-1.5 border-b border-slate-700">2-7 기준 수익</th>
                                        <th className="text-left p-1.5 border-b border-slate-700">투자 추천도</th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-300">
                                    {[
                                        { lv: '+5%', cost: '30만G', income: '609G/판', rec: '✅ 바로 투자', color: '' },
                                        { lv: '+10%', cost: '80만G', income: '638G/판', rec: '✅ 바로 투자', color: '' },
                                        { lv: '+15%', cost: '180만G', income: '667G/판', rec: '✅ 빠른 투자', color: '' },
                                        { lv: '+20%', cost: '330만G', income: '696G/판', rec: '✅ 마법사 영입 후', color: '' },
                                        { lv: '+25%', cost: '1,330만G', income: '725G/판', rec: '⭐ 핵심 목표', color: 'text-yellow-300 font-bold' },
                                        { lv: '+30%', cost: '3,330만G', income: '754G/판', rec: '🔒 장기 목표', color: '' },
                                    ].map((row, i) => (
                                        <tr key={i} className={i % 2 === 0 ? 'bg-slate-900/20' : ''}>
                                            <td className={`p-1.5 ${row.color}`}>{row.lv}</td>
                                            <td className="p-1.5 text-center">{row.cost}</td>
                                            <td className="p-1.5 text-center">{row.income}</td>
                                            <td className={`p-1.5 ${row.color || 'text-slate-400'}`}>{row.rec}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* 4. 사냥터별 경험치 효율 */}
                <section id="exp" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-4 sm:p-8 backdrop-blur-sm shadow-lg">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                        <TrendingUp className="w-6 h-6 text-emerald-400" />
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-100">4. 사냥터별 경험치 효율 (10분 실측)</h2>
                    </div>

                    <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4 mb-5 text-sm">
                        <p className="text-emerald-300 font-semibold mb-1">📌 측정 조건</p>
                        <p className="text-slate-300">3인 스쿼드 (전사 Lv.25~26 + 궁수 Lv.24~25 + 마법사 Lv.15) 기준, 10분 자동 사냥 실측값입니다.</p>
                    </div>

                    <div className="overflow-x-auto mb-6">
                        <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[480px]">
                            <thead>
                                <tr className="bg-slate-800/50 text-slate-300">
                                    <th className="p-2 sm:p-3 border border-slate-700 font-semibold">사냥 조건</th>
                                    <th className="p-2 sm:p-3 border border-slate-700 font-semibold text-center">전사</th>
                                    <th className="p-2 sm:p-3 border border-slate-700 font-semibold text-center">궁수</th>
                                    <th className="p-2 sm:p-3 border border-slate-700 font-semibold text-center">마법사</th>
                                    <th className="p-2 sm:p-3 border border-slate-700 font-semibold">비고</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-300">
                                {[
                                    { cond: 'LV25전사+LV25궁수+LV15마법사 / 2-2 반복', w: '+2%', a: '+3%', m: '+6%', note: '⭐ 빠른 처치로 궁수·마법사 경험치 극대화', highlight: true },
                                    { cond: 'LV25전사+LV24궁수+LV15마법사 / 2-3 반복', w: '+2%', a: '+2%', m: '+5%', note: '3인 스쿼드 기본 사냥', highlight: false },
                                    { cond: 'LV25전사+LV24궁수+LV15마법사 / 2-7 반복', w: '+2%', a: '+2%', m: '+4%', note: '골드 수급 최고 (725G) + 경험치 병행', highlight: false },
                                ].map((row, idx) => (
                                    <tr key={idx} className={row.highlight ? 'bg-emerald-950/30 ring-1 ring-emerald-500/30' : idx % 2 === 0 ? 'bg-slate-900/30' : 'bg-slate-950/30'}>
                                        <td className="p-2 sm:p-3 border border-slate-700 text-slate-300">{row.cond}</td>
                                        <td className="p-2 sm:p-3 border border-slate-700 text-center font-bold text-amber-300">{row.w}</td>
                                        <td className="p-2 sm:p-3 border border-slate-700 text-center font-bold text-emerald-300">{row.a}</td>
                                        <td className={`p-2 sm:p-3 border border-slate-700 text-center font-bold ${row.highlight ? 'text-yellow-300' : 'text-purple-300'}`}>{row.m}</td>
                                        <td className="p-2 sm:p-3 border border-slate-700 text-slate-400 text-xs">{row.note}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* 레벨별 추천 사냥터 */}
                    <h3 className="font-bold text-slate-200 mb-3 text-base flex items-center gap-2">
                        <Target className="w-4 h-4 text-emerald-400" /> 레벨별 추천 사냥터
                    </h3>
                    <div className="space-y-2">
                        {[
                            { lv: 'LV 1 ~ 15 (전사 1인)', stage: '1구역 (1-1 ~ 1-9)', color: 'border-slate-600', tag: '초반', tagColor: 'bg-slate-700 text-slate-300', tip: '1구역에서 꾸준히 사냥하며 클리어 가능한 가장 높은 스테이지 반복' },
                            { lv: 'LV 15 ~ 22 (전사+궁수)', stage: '2-1 ~ 2-3 반복', color: 'border-blue-500/40', tag: '중반', tagColor: 'bg-blue-900/50 text-blue-300', tip: '2인 조합으로 2-3까지 안정 클리어 가능. 이때부터 4단계 장비 준비 시작' },
                            { lv: 'LV 22 ~ 24 (전사+궁수, 4단계 장비)', stage: '2-4 ~ 2-6 도전', color: 'border-amber-500/40', tag: '성장기', tagColor: 'bg-amber-900/50 text-amber-300', tip: '4단계 장비 착용 후 난이도 상승. 전사 방어구 추옵(방어력+20)이 핵심' },
                            { lv: 'LV 24 ~ 26 (3인 스쿼드)', stage: '2-7 반복 (골드+경험치 병행)', color: 'border-yellow-500/40', tag: '효율기', tagColor: 'bg-yellow-900/50 text-yellow-300', tip: '2-7이 현재 골드 수급과 경험치 효율의 균형이 가장 좋은 사냥터 (725G/판)' },
                            { lv: 'LV 26+ (더 높은 스펙)', stage: '2-8 이상 도전', color: 'border-orange-500/40', tag: '후반', tagColor: 'bg-orange-900/50 text-orange-300', tip: '2-8 클리어 (겨우겨우). 2-9는 추가 레벨업 + 스킬 해금 필요' },
                        ].map((item, i) => (
                            <div key={i} className={`border ${item.color} rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-start gap-3`}>
                                <div className="shrink-0">
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.tagColor}`}>{item.tag}</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <span className="text-sm font-bold text-slate-200">{item.lv}</span>
                                        <span className="text-xs text-slate-500">→</span>
                                        <span className="text-sm font-bold text-amber-300">{item.stage}</span>
                                    </div>
                                    <p className="text-xs text-slate-400">{item.tip}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. 스테이지별 클리어 실측 기록 */}
                <section id="stage" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-4 sm:p-8 backdrop-blur-sm shadow-lg">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                        <Trophy className="w-6 h-6 text-orange-400" />
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-100">5. 스테이지별 클리어 실측 기록</h2>
                    </div>

                    <p className="text-sm text-slate-400 mb-4">아래 데이터는 모두 실제 플레이를 통해 수집된 기록입니다.</p>

                    {/* 2인 (전사+궁수) */}
                    <h3 className="font-bold text-slate-200 mb-3 text-sm flex items-center gap-2">
                        <span className="bg-slate-700 text-slate-300 text-xs px-2 py-0.5 rounded-full">2인 스쿼드</span> 전사 + 궁수
                    </h3>
                    <div className="overflow-x-auto mb-6">
                        <table className="w-full text-left border-collapse text-xs min-w-[480px]">
                            <thead>
                                <tr className="bg-slate-800/50 text-slate-300">
                                    <th className="p-2 border border-slate-700">레벨</th>
                                    <th className="p-2 border border-slate-700">장비</th>
                                    <th className="p-2 border border-slate-700">최고 클리어</th>
                                    <th className="p-2 border border-slate-700">비고</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-300">
                                {[
                                    { lv: 'LV18전사 + LV17궁수', gear: '3단계 (방어+공격 / 공격2개)', clear: '2-2', note: '2-3 실패 (스펙 부족)', ok: false },
                                    { lv: 'LV20전사 + LV19궁수', gear: '3단계 (방어+공격 / 공격2개)', clear: '2-3', note: '전사 20레벨로 탱킹력 확보 후 클리어', ok: true },
                                    { lv: 'LV21전사 + LV20궁수', gear: '전사 해머 스킬 / 궁수 공격2개', clear: '2-3', note: '2-4 실패 (스펙 벽 확인)', ok: false },
                                    { lv: 'LV22전사 + LV21궁수', gear: '전사 4단계 방어구2개 (방어+20×2)', clear: '2-4', note: '성공! 4단계 방어구+방어력 잠재 세팅이 핵심', ok: true },
                                    { lv: 'LV22전사 + LV22궁수', gear: '궁수 4단계 무기+방어구1개', clear: '2-4', note: '2-5 실패 — 추가 레벨업 필요', ok: false },
                                    { lv: 'LV23전사 + LV22궁수', gear: '궁수 4단계 무기+방어구1개', clear: '2-5', note: '전사 LV.23 달성 후 돌파 성공', ok: true },
                                    { lv: 'LV23전사 + LV23궁수', gear: '전사 4단계 방어구2개 / 궁수 4단계 무기+방어구2개', clear: '2-5', note: '2-6 실패 — 레벨/스펙 벽', ok: false },
                                    { lv: 'LV24전사 + LV23궁수', gear: '전사 4단계 방어구2개 / 궁수 4단계 무기+방어구2개', clear: '2-6', note: '극적으로 성공! (겨우겨우)', ok: true },
                                ].map((row, idx) => (
                                    <tr 
                                        key={idx} 
                                        className={
                                            row.ok 
                                                ? 'bg-emerald-950/40 border-l-4 border-l-emerald-400 ring-1 ring-emerald-500/30 font-semibold' 
                                                : idx % 2 === 0 ? 'bg-slate-900/30' : 'bg-slate-950/30'
                                        }
                                    >
                                        <td className={`p-2 border border-slate-700 font-bold whitespace-nowrap ${row.ok ? 'text-emerald-200' : 'text-white'}`}>{row.lv}</td>
                                        <td className={`p-2 border border-slate-700 ${row.ok ? 'text-slate-200' : 'text-slate-400'}`}>{row.gear}</td>
                                        <td className="p-2 border border-slate-700 font-semibold whitespace-nowrap">
                                            {row.ok ? (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 text-xs shadow-sm">
                                                    ✅ {row.clear} 돌파!
                                                </span>
                                            ) : (
                                                <span className="text-slate-300 text-xs">
                                                    {row.clear}
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-2 border border-slate-700 text-xs">
                                            {row.ok ? (
                                                <span className="text-emerald-300 font-bold">{row.note}</span>
                                            ) : (
                                                <span className="text-red-400 font-medium">{row.note}</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* 3인 (전사+궁수+마법사) */}
                    <h3 className="font-bold text-slate-200 mb-3 text-sm flex items-center gap-2">
                        <span className="bg-purple-900/50 text-purple-300 text-xs px-2 py-0.5 rounded-full">3인 스쿼드</span> 전사 + 궁수 + 마법사
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs min-w-[480px]">
                            <thead>
                                <tr className="bg-slate-800/50 text-slate-300">
                                    <th className="p-2 border border-slate-700">레벨</th>
                                    <th className="p-2 border border-slate-700">장비 세팅</th>
                                    <th className="p-2 border border-slate-700">최고 클리어</th>
                                    <th className="p-2 border border-slate-700">비고</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-300">
                                {[
                                    { lv: 'LV24전사+LV23궁수+LV7마법사', gear: '전사 4단계 방어구2개 / 궁수 4단계 무기+방어구2개 / 마법사 힐', clear: '2-6', note: '2-7 실패 — 마법사 저레벨(Lv.7) 한계', ok: false },
                                    { lv: 'LV25전사+LV24궁수+LV15마법사', gear: '전사 4단계 방어구2개 / 궁수 4단계 무기+방어구2개 / 마법사 3단계풀셋', clear: '2-7', note: '성공! 마법사 Lv.15+3단계풀셋 조합으로 2-7 돌파', ok: true },
                                    { lv: 'LV25전사+LV25궁수+LV15마법사', gear: '전사 4단계 방어구2개 / 궁수 4단계 무기+방어구2개 / 마법사 3단계풀셋', clear: '2-7', note: '2-8 실패 — 추가 스펙업 필요', ok: false },
                                    { lv: 'LV26전사+LV25궁수+LV16마법사', gear: '전사 4단계 무기+방어구2개 / 궁수 4단계 무기+방어구2개 / 마법사 3단계풀셋', clear: '2-8', note: '겨우겨우 성공! 전사 4단계 무기까지 풀세팅이 핵심', ok: true },
                                    { lv: 'LV26전사+LV25궁수+LV17마법사', gear: '전사 4단계 무기+방어구2개 / 궁수 4단계 무기+방어구2개 / 마법사 3단계풀셋(힐+부활)', clear: '2-8', note: '2-9 실패 — 부활 스킬 해금에도 벽 확인', ok: false },
                                    { lv: 'LV26전사+LV26궁수+LV18마법사', gear: '전사 4단계 무기+방어구2개 / 궁수 4단계 풀셋 / 마법사 3단계풀셋(힐+부활)', clear: '2-8', note: '2-9 실패 — 궁수 4단계 풀셋 및 마법사 Lv.18 스펙업에도 2-9 벽 확인', ok: false },
                                    { lv: 'LV27전사+LV26궁수+LV18마법사', gear: '전사 4단계 무기+방어구2개 / 궁수 4단계 풀셋 / 마법사 3단계풀셋(힐+공격 ➔ 사망 시 부활 수동 스위칭)', clear: '2-9', note: '10회 수동 컨트롤 재도전 끝에 2-9 극적 돌파 성공! (마법사 부활 스위칭 핵심)', ok: true },
                                    { lv: 'LV28전사+LV26궁수+LV18마법사', gear: '전사 4단계 무기+방어구2개 / 궁수 4단계 풀셋(보스 폭시) / 마법사 3단계풀셋(체인+힐 ➔ 사망시 부활 수동 스위칭)', clear: '2-9', note: '2-10 (2구역 아르카나 정령 보스) 실패 — 전사 Lv.28 & 섬세한 수동 스위칭 컨트롤에도 불구하고 보스전 스펙 벽 확인', ok: false },
                                    { lv: 'LV28전사+LV28궁수+LV21마법사', gear: '전사 5단계무기+4단계방어구2개(방어+해머) / 궁수 5단계모자+4단계풀셋(볼텍스+폭시) / 마법사 3단계풀셋(힐+공격 ➔ 사망시 부활 수동 스위칭)', clear: '2-10 (보스)', note: '대성공! 🎉 (뭔가 될 것 같은 느낌이 들어서 계속 반복 재도전 끝에 대략 8번쯤 도전했을 쯤 성공! 2-10 아르카나 정령 보스 극적 클리어!)', ok: true },
                                    { lv: 'LV28전사+LV28궁수+LV21마법사', gear: '전사 5단계무기+5단계방어구1개+4단계방어구1개(해머+오라+디바이드) / 궁수 5단계모자+4단계풀셋(공격2개+폭시) / 마법사 3단계풀셋(힐+공격+도어)', clear: '3-1', note: '성공! 🎉 2-10 보스 클리어 후 스킬 3개 슬롯 해금! 3인 전원 스킬 3개 장착 세팅으로 3-1 돌파 성공!', ok: true },
                                ].map((row, idx) => (
                                    <tr 
                                        key={idx} 
                                        className={
                                            row.ok 
                                                ? 'bg-emerald-950/40 border-l-4 border-l-emerald-400 ring-1 ring-emerald-500/30 font-semibold' 
                                                : idx % 2 === 0 ? 'bg-slate-900/30' : 'bg-slate-950/30'
                                        }
                                    >
                                        <td className={`p-2 border border-slate-700 font-bold whitespace-nowrap ${row.ok ? 'text-emerald-200' : 'text-white'}`}>{row.lv}</td>
                                        <td className={`p-2 border border-slate-700 ${row.ok ? 'text-slate-200' : 'text-slate-400'}`}>{row.gear}</td>
                                        <td className="p-2 border border-slate-700 font-semibold whitespace-nowrap">
                                            {row.ok ? (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 text-xs shadow-sm">
                                                    ✅ {row.clear} 돌파!
                                                </span>
                                            ) : (
                                                <span className="text-slate-300 text-xs">
                                                    {row.clear}
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-2 border border-slate-700 text-xs">
                                            {row.ok ? (
                                                <span className="text-emerald-300 font-bold">{row.note}</span>
                                            ) : (
                                                <span className="text-red-400 font-medium">{row.note}</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* 6. 핵심 운영 팁 */}
                <section id="tips" className="mb-14 scroll-mt-24 bg-slate-900/20 border border-slate-800/60 rounded-2xl p-4 sm:p-8 backdrop-blur-sm shadow-lg">
                    <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                        <Zap className="w-6 h-6 text-yellow-400" />
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-100">6. 핵심 운영 팁 정리</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            {
                                icon: '💰',
                                title: '골드 모으기가 최우선',
                                color: 'border-yellow-500/40 bg-yellow-950/20',
                                titleColor: 'text-yellow-300',
                                points: [
                                    '궁수 영입(1-6 클리어 후 50만G)과 마법사 영입(2-6 클리어 후 400만G) 비용을 미리 준비',
                                    '골드 획득량 증가(골획증)는 +25%까지 투자하면 장기적으로 가장 효율적 (누적 1,330만G)',
                                    '오프라인 상태에서도 EXP+골드는 쌓이므로 항상 높은 스테이지 유지',
                                ]
                            },
                            {
                                icon: '🎯',
                                title: '장비 세팅 우선순위',
                                color: 'border-amber-500/40 bg-amber-950/20',
                                titleColor: 'text-amber-300',
                                points: [
                                    'LV.8 달성 시 2단계 장비(레어), LV.15 달성 시 3단계 장비(레어) 착용',
                                    'LV.22 달성 전에 4단계 장비(에픽) 미리 준비해두기 (큐브 굴리기)',
                                    '전사: 방어구 추옵 「방어력 +20」 × 2개가 생존에 핵심',
                                    '궁수: 무기 추옵 「공격력 +9」가 DPS에 가장 중요',
                                    '마법사: 4단계 착용 전까지 3단계 풀셋으로 운영',
                                ]
                            },
                            {
                                icon: '⚔️',
                                title: '스킬 장착 타이밍',
                                color: 'border-red-500/40 bg-red-950/20',
                                titleColor: 'text-red-300',
                                points: [
                                    '전사: LV.2 오라블레이드(공격) → LV.10 아이언바디(방어) → LV.21 블래스드해머 장착',
                                    '궁수: LV.2 차지드애로우(공격) → LV.15 폭풍의시 장착 후 반복 사냥',
                                    '마법사: LV.7 힐(회복) 즉시 장착 → LV.17 헤븐즈도어(부활) 장착',
                                    '스킬 슬롯 2칸 확장(150만G, 1-10 클리어 후)을 통해 전략 폭 확대',
                                ]
                            },
                            {
                                icon: '🏠',
                                title: '오프라인 보상 극대화',
                                color: 'border-blue-500/40 bg-blue-950/20',
                                titleColor: 'text-blue-300',
                                points: [
                                    '기본 오프라인 누적 시간: 16시간 (유틸리티로 최대 24시간까지 확장 가능)',
                                    '오프라인 누적 시간 확장 투자는 초반부터 적극 권장',
                                    '장비·큐브·카오스 코인은 온라인 접속 상태에서만 획득 가능',
                                    '오프라인 중 EXP+골드는 자동 적립되므로 자기 전에 접속 확인!',
                                ]
                            },
                            {
                                icon: '📈',
                                title: '경험치 효율 극대화 사냥터 선택법',
                                color: 'border-emerald-500/40 bg-emerald-950/20',
                                titleColor: 'text-emerald-300',
                                points: [
                                    '2-2 반복: 경험치 최고 효율 (마법사 +6%/10분, 궁수 +3%/10분)',
                                    '2-7 반복: 골드 수급(725G) + 경험치(마법사 +4%) 균형 최고',
                                    '마법사 초보 단계(LV.15~20)에서는 낮은 스테이지 반복으로 빠른 레벨업 가능',
                                    '클리어 가능한 스테이지 중 가장 높은 곳이 항상 최적 사냥터',
                                ]
                            },
                            {
                                icon: '🏆',
                                title: '전체 진행 흐름 요약',
                                color: 'border-orange-500/40 bg-orange-950/20',
                                titleColor: 'text-orange-300',
                                points: [
                                    '① 전사 1-6 클리어 ➔ 궁수 영입(50만G) ➔ LV.8에서 2단계 장비 세팅',
                                    '② 2인 스쿼드로 2-4~2-5 클리어 ➔ LV.22에서 4단계 장비 착용',
                                    '③ 2-6 클리어 ➔ 마법사 영입(400만G) ➔ 마법사 빠른 성장',
                                    '④ 마법사 LV.15+3단계풀셋 달성 ➔ 2-7 클리어 (안정 파밍 구간 진입)',
                                    '⑤ 전사 LV.26+4단계 무기 ➔ 2-8 클리어 (2-9 도전 준비)',
                                ]
                            },
                        ].map((item, i) => (
                            <div key={i} className={`border ${item.color} rounded-xl p-4`}>
                                <p className={`font-bold text-sm ${item.titleColor} mb-3 flex items-center gap-2`}>
                                    <span>{item.icon}</span>
                                    <span>{item.title}</span>
                                </p>
                                <ul className="space-y-1.5">
                                    {item.points.map((pt, j) => (
                                        <li key={j} className="text-xs text-slate-300 flex items-start gap-1.5">
                                            <span className="text-slate-500 mt-0.5 shrink-0">›</span>
                                            <span>{pt}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* 관련 글 링크 */}
                    <div className="mt-8 bg-slate-950/60 border border-orange-500/20 rounded-xl p-4">
                        <p className="text-orange-300 font-bold text-sm mb-3">📌 관련 상세 공략 보기</p>
                        <Link
                            href="/blog/ultima-squad-minigame-guide"
                            className="flex items-center gap-2 text-sm text-slate-300 hover:text-orange-300 transition-colors group"
                        >
                            <span className="text-orange-400 group-hover:translate-x-1 transition-transform">→</span>
                            울티마 스쿼드 완벽 공략 (전체 데이터 포함)
                        </Link>
                    </div>
                </section>

            </main>
        </div>
    );
}
