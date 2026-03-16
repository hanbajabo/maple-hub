import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Clock, AlertCircle, Star, ChevronRight, Gift, Zap, Shield } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export const metadata: Metadata = {
    title: '체인지 버닝: 루시드 완전 공략 | 악몽의 숲·드림 샤드샵까지 총정리 | 메이플스토리',
    description: '23주년 신규 이벤트! 루시드로 변신해 캐릭터 경험치까지 획득하는 체인지 버닝: 루시드 완벽 정리. 악몽 제어, 악몽의 숲 공략, 몽환의 장비, 드림 샤드샵까지 한 번에!',
    openGraph: {
        title: '체인지 버닝: 루시드 완전 공략 | 메이플스토리 23주년',
        description: '루시드로 변신해 경험치를 획득하는 23주년 이벤트. 악몽 제어·악몽의 숲·드림 샤드샵 완벽 정리.',
        images: [{ url: 'https://maple.ai.kr/images/og/change-burning-lucid-guide.png', width: 1200, height: 630 }],
    },
};

export default function ChangeBurningLucidGuide() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 text-white">
            {/* Header */}
            <div className="border-b border-purple-900/50 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">블로그로 돌아가기</span>
                    </Link>
                </div>
            </div>

            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

                {/* Title */}
                <header className="mb-10">
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-bold rounded-full">이벤트 가이드</span>
                        <span className="px-3 py-1 bg-pink-500/20 text-pink-300 text-xs font-bold rounded-full flex items-center gap-1">
                            <Star className="w-3 h-3" /> 23주년 핵심
                        </span>
                        <span className="text-slate-500 text-sm flex items-center gap-1"><Calendar className="w-3 h-3" /> 2026년 3월 16일</span>
                        <span className="text-slate-500 text-sm flex items-center gap-1"><Clock className="w-3 h-3" /> 15분</span>
                    </div>
                    {/* 메인 배너 이미지 */}
                    <div className="mb-5 rounded-2xl overflow-hidden border border-purple-500/30">
                        <Image
                            src="/images/blog/testworld-23rd-anniversary/change-burning-lucid.png"
                            alt="체인지 버닝: 루시드 이벤트 배너"
                            width={1200}
                            height={400}
                            className="w-full h-auto object-cover"
                            priority
                        />
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                        🦋 체인지 버닝: 루시드<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400">
                            완전 공략 가이드
                        </span>
                    </h1>
                    <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                        <span className="text-purple-300 font-bold">루시드로 변신</span>해 내 캐릭터 경험치까지 함께 올리는 23주년 신규 이벤트!<br />
                        악몽 제어부터 악몽의 숲 공략, 드림 샤드샵까지 모든 것을 정리했습니다.
                    </p>
                </header>

                {/* 요약 카드 */}
                <div className="mb-10 bg-gradient-to-br from-purple-900/40 via-violet-900/30 to-pink-900/30 border-2 border-purple-500/50 rounded-2xl p-5 sm:p-7 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
                    <div className="relative z-10">
                        <h2 className="text-xl font-black text-purple-300 mb-4 flex items-center gap-2">
                            📋 이벤트 핵심 요약
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                { label: '이벤트 기간', value: '3월 19일(목) ~ 6월 17일(수) 23:59', color: 'text-green-400' },
                                { label: '참여 조건', value: '200레벨 + 아케인포스 퀘스트 완료', color: 'text-yellow-400' },
                                { label: '참여 가능 서버', value: '본섭 + 챌린저스 월드 모두 가능', color: 'text-blue-400' },
                                { label: '주간 드림 이터', value: '매주 목요일 0시 25,000마리 추가', color: 'text-pink-400' },
                            ].map((item, i) => (
                                <div key={i} className="bg-slate-900/60 rounded-xl p-3 border border-purple-500/20">
                                    <p className="text-slate-400 text-xs mb-1">{item.label}</p>
                                    <p className={`font-bold text-sm ${item.color}`}>{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ① 체인지 버닝: 루시드 */}
                <section className="mb-10">
                    <div className="bg-gradient-to-br from-purple-900/50 to-violet-900/50 border-2 border-purple-500/50 rounded-2xl p-4 sm:p-6 lg:p-8">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-11 h-11 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <span className="text-2xl">🦋</span>
                            </div>
                            <div>
                                <p className="text-xs text-purple-300/70 font-bold uppercase tracking-widest">STEP 1</p>
                                <h2 className="text-xl sm:text-2xl font-black text-purple-300">체인지 버닝: 루시드 참여 방법</h2>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* 핵심 주의 배너 */}
                            <div className="bg-gradient-to-r from-red-900/60 to-rose-900/60 border-2 border-red-400/70 rounded-xl p-4 flex items-center gap-3">
                                <AlertCircle className="w-7 h-7 text-red-400 flex-shrink-0" />
                                <div>
                                    <p className="text-red-300 font-black text-base leading-tight">명의 내 <span className="text-white text-lg">1개 캐릭터만</span> 참여 가능!</p>
                                    <p className="text-red-200/70 text-xs mt-0.5">한 번 지정한 캐릭터로만 진행되며, 삭제 시 루시드 Lv.1부터 재시작됩니다.</p>
                                </div>
                            </div>

                            <div className="bg-slate-900/60 border border-purple-500/30 rounded-xl p-4">
                                <p className="text-purple-200 font-black mb-2">📌 참여 방법</p>
                                <ul className="space-y-1.5 text-sm text-slate-300">
                                    <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />이벤트 리스트 → '체인지 버닝: 루시드' 선택 → [참여하기]</li>
                                    <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />또는 <span className="text-white font-bold">&lt;석촌호수&gt;</span> NPC '루시드'에게 말 걸기</li>
                                    <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />버닝 캐릭터, 챌린저스 월드에서도 참여 가능</li>
                                </ul>
                            </div>

                            <div className="bg-slate-900/60 border border-pink-500/30 rounded-xl p-4">
                                <p className="text-pink-200 font-black mb-3">🔄 루시드 변신 조건</p>
                                <ul className="space-y-2 text-sm text-slate-300 mb-4">
                                    <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />마을: <span className="text-white font-bold">조건 없이 상시 변신 가능</span></li>
                                    <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />아케인리버/그란디스 레벨 범위 사냥터에서 변신 가능</li>
                                    <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />처치 가능한 <span className="text-red-400 font-bold">드림 이터가 0마리</span>이면 변신 해제 <span className="text-slate-500">(단, 악몽 침식 진행 중엔 유지)</span></li>
                                </ul>

                                {/* 드림 이터 적립 설명 */}
                                <div className="bg-green-900/20 border border-green-500/40 rounded-xl p-4">
                                    <p className="text-green-300 font-black text-sm mb-2 flex items-center gap-1.5">
                                        <span>🐛</span> 드림 이터 — 주간 적립 방식
                                    </p>
                                    <p className="text-slate-300 text-sm mb-3 leading-relaxed">
                                        매주 목요일 0시에 <span className="text-green-400 font-bold">25,000마리</span>가 추가됩니다.<br />
                                        단, <span className="text-white font-bold">초기화(리셋)가 아닌 누적 적립</span> 방식입니다.<br />
                                        이번 주에 다 못 잡았다면 <span className="text-yellow-400 font-bold">남은 마릿수가 이월</span>되고 다음 주 25,000마리가 더해집니다.
                                    </p>
                                    <div className="space-y-1.5 text-xs">
                                        <p className="text-slate-400 font-bold mb-1">📋 예시</p>
                                        <div className="flex flex-wrap items-start gap-1.5 bg-slate-900/60 rounded-lg px-3 py-2">
                                            <span className="text-slate-500 font-bold w-10 flex-shrink-0">1주차</span>
                                            <span className="text-slate-300 flex-1">25,000 추가 → 10,000마리만 처치</span>
                                            <span className="text-yellow-400 font-bold w-full sm:w-auto sm:ml-auto">→ 15,000 이월</span>
                                        </div>
                                        <div className="flex flex-wrap items-start gap-1.5 bg-slate-900/60 rounded-lg px-3 py-2">
                                            <span className="text-slate-500 font-bold w-10 flex-shrink-0">2주차</span>
                                            <span className="text-slate-300 flex-1">25,000 추가 + 15,000 이월</span>
                                            <span className="text-green-400 font-bold w-full sm:w-auto sm:ml-auto">= 총 40,000마리 가능</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-violet-900/30 border border-violet-500/40 rounded-xl p-4">
                                <p className="text-violet-200 font-black mb-3">⚔️ 루시드 전용 스킬 (주요)</p>
                                {/* 변신 UI + 스킬창 이미지 - 세로 배치 */}
                                <div className="space-y-3 mb-3">
                                    <div className="rounded-xl overflow-hidden border border-violet-500/20">
                                        <Image
                                            src="/images/blog/testworld-23rd-anniversary/change-lucid-system.png"
                                            alt="체인지 루시드 스킬 설명 및 CHANGE STATUS UI"
                                            width={1000}
                                            height={300}
                                            className="w-full h-auto object-cover"
                                        />
                                        <p className="text-xs text-slate-500 text-center px-2 py-1 bg-slate-900/80">▲ 체인지: 루시드 스킬 설명 & CHANGE STATUS UI (드림 이터 잔여 마릿수 확인 가능)</p>
                                    </div>
                                    <div className="rounded-xl overflow-hidden border border-violet-500/20">
                                        <Image
                                            src="/images/blog/testworld-23rd-anniversary/lucid-skill.png"
                                            alt="루시드 전용 스킬창"
                                            width={600}
                                            height={700}
                                            className="w-full h-auto object-cover"
                                        />
                                        <p className="text-xs text-slate-500 text-center px-2 py-1 bg-slate-900/80">▲ 루시드 전용 스킬창 (초보자 스킬창에서 확인)</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                                    {['윔지컬 드림', '드림라이트 스탭', '드림 더스트', '판타즈멀 왈츠', '일루전 블룸', '일루전 드래곤', '나이트메어 러쉬', '루시드 드림', '가든 오브 이터널 드림', '엘리멘탈 판타즘', '피니스 솜니아 (Lv.45)'].map((skill, i) => (
                                        <div key={i} className="bg-slate-900/70 rounded-lg px-2.5 py-1.5 text-center text-slate-300 border border-violet-500/20 font-medium">{skill}</div>
                                    ))}
                                </div>
                                <p className="text-slate-400 text-xs mt-3">※ 데미지: 사냥터에서는 내 캐릭터 전투력 기반 / 몽환의 시련·악몽의 숲에서는 루시드 전용 능력치 기반</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ② 악몽 제어 */}
                <section className="mb-10">
                    <div className="bg-gradient-to-br from-slate-800/80 to-indigo-900/40 border-2 border-indigo-500/50 rounded-2xl p-4 sm:p-6 lg:p-8">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-11 h-11 bg-indigo-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Zap className="w-6 h-6 text-indigo-400" />
                            </div>
                            <div>
                                <p className="text-xs text-indigo-300/70 font-bold uppercase tracking-widest">STEP 2</p>
                                <h2 className="text-xl sm:text-2xl font-black text-indigo-300">악몽 제어 — 사냥터 핵심</h2>
                            </div>
                        </div>

                        <p className="text-slate-300 text-sm mb-5 leading-relaxed">
                            아케인리버/그란디스 <span className="text-white font-bold">레벨 범위 사냥터</span>에서 루시드로 변신하면 <span className="text-yellow-400 font-bold">드림 이터</span>가 등장합니다.<br />
                            드림 이터를 처치하면 루시드 EXP + <span className="text-green-400 font-bold">내 캐릭터 레벨에 맞는 경험치</span>가 함께 지급됩니다!
                        </p>

                        {/* 악몽 제어 실제 화면 */}
                        <div className="mb-5 rounded-xl overflow-hidden border border-indigo-500/30">
                            <Image
                                src="/images/blog/testworld-23rd-anniversary/nightmare-control.png"
                                alt="악몽 제어 - 악몽의 근원 등장 & CHANGE STATUS"
                                width={1200}
                                height={500}
                                className="w-full h-auto object-cover"
                            />
                            <p className="text-xs text-slate-500 text-center px-2 py-1.5 bg-slate-900/80">▲ 드림 이터 1,250마리 처치 시 악몽의 근원 등장 / CHANGE STATUS에서 잔여 드림 이터 수 확인 가능</p>
                        </div>

                        {/* 악몽 침식 흐름 */}
                        <div className="bg-slate-900/60 border border-indigo-500/30 rounded-xl p-4 sm:p-5 mb-4">
                            <p className="text-indigo-200 font-black mb-3">🌀 악몽 침식 발동 순서</p>
                            {/* 모바일: 2열 그리드, sm 이상: 가로 흐름 */}
                            <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2 items-center justify-center text-center text-sm">
                                {[
                                    { label: '드림 이터', sub: '1,250마리 처치', color: 'bg-blue-900/50 border-blue-500/40 text-blue-300' },
                                    { label: '악몽의 근원', sub: '1마리 등장', color: 'bg-red-900/50 border-red-500/40 text-red-300' },
                                    { label: '악몽의 끄나풀', sub: '40마리 × 5회', color: 'bg-orange-900/50 border-orange-500/40 text-orange-300' },
                                    { label: '침식 종료', sub: '드림 이터 재등장', color: 'bg-green-900/50 border-green-500/40 text-green-300' },
                                ].map((item, i, arr) => (
                                    <>
                                        <div key={i} className={`rounded-xl px-3 py-2 border ${item.color}`}>
                                            <p className="font-black text-xs sm:text-sm">{item.label}</p>
                                            <p className="text-xs opacity-80">{item.sub}</p>
                                        </div>
                                        {i < arr.length - 1 && <p key={`arrow-${i}`} className="hidden sm:block text-slate-500 text-xl font-black">→</p>}
                                    </>
                                ))}
                            </div>
                            <p className="text-slate-500 text-xs mt-2 text-center">순서대로 반복됩니다</p>
                        </div>

                        <div className="bg-yellow-900/20 border border-yellow-500/40 rounded-xl p-4">
                            <p className="text-yellow-300 font-bold text-sm flex items-center gap-1 mb-1">
                                <AlertCircle className="w-4 h-4" /> 주의사항
                            </p>
                            <ul className="space-y-1 text-xs text-slate-300">
                                <li>• 악몽 침식 진행 중에는 드림 이터가 생성되지 않음</li>
                                <li>• 맵 이동 또는 변신 해제 시 침식 중단 → 재변신 시 이어서 진행 가능</li>
                                <li>• 루시드는 일반 필드 몬스터로는 경험치를 얻지 못함 (드림 이터/근원/끄나풀만 가능)</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* ③ 루시드 드림 미션 */}
                <section className="mb-10">
                    <div className="bg-gradient-to-br from-pink-900/40 to-rose-900/40 border-2 border-pink-500/50 rounded-2xl p-4 sm:p-6 lg:p-8">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-11 h-11 bg-pink-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Gift className="w-6 h-6 text-pink-400" />
                            </div>
                            <div>
                                <p className="text-xs text-pink-300/70 font-bold uppercase tracking-widest">STEP 3</p>
                                <h2 className="text-xl sm:text-2xl font-black text-pink-300">루시드 드림 미션 & 보상</h2>
                            </div>
                        </div>

                        {/* 루시드 드림 UI 이미지 */}
                        <div className="mb-5 rounded-xl overflow-hidden border border-pink-500/30">
                            <Image
                                src="/images/blog/testworld-23rd-anniversary/lucid-growth.png"
                                alt="루시드 드림 UI - 나의 루시드 탭"
                                width={1200}
                                height={600}
                                className="w-full h-auto object-cover"
                            />
                            <p className="text-xs text-slate-500 text-center px-2 py-1.5 bg-slate-900/80">▲ 루시드 드림 UI / 나의 루시드 탭 — 드림 이터 잔여 마릿수·EXP·드림 패스 확인</p>
                        </div>

                        {/* 주간 미션 */}
                        <div className="mb-5">
                            <p className="text-white font-black mb-3">📅 주간 미션 (매주 목요일 0시 초기화 | 최대 210만 EXP)</p>
                            <div className="overflow-x-auto rounded-xl border border-pink-500/30">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-pink-900/40 text-pink-200">
                                            <th className="px-4 py-2.5 text-left font-black">미션</th>
                                            <th className="px-4 py-2.5 text-right font-black whitespace-nowrap">루시드 EXP</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-pink-900/30">
                                        {[
                                            ['악몽의 숲 5/10/15/20/25회 완료', '100K → 120K → 140K → 160K → 180K'],
                                            ['악몽의 근원 1/5/10회 처치', '100K → 120K → 160K'],
                                            ['악몽의 끄나풀 400/1,500/2,500마리 처치', '100K → 140K → 180K'],
                                            ['드림 이터 4,500/8,000/11,000/13,500마리 처치', '120K → 140K → 160K → 180K'],
                                        ].map(([mission, exp], i) => (
                                            <tr key={i} className="bg-slate-900/40 hover:bg-slate-900/70 transition-colors">
                                                <td className="px-4 py-2.5 text-slate-300">{mission}</td>
                                                <td className="px-4 py-2.5 text-right text-pink-300 font-bold whitespace-nowrap">{exp}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* 시즌 미션 */}
                        <div>
                            <p className="text-white font-black mb-3">🏆 시즌 미션 (이벤트 기간 내 1회)</p>
                            <div className="overflow-x-auto rounded-xl border border-rose-500/30">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-rose-900/40 text-rose-200">
                                            <th className="px-4 py-2.5 text-left font-black">미션</th>
                                            <th className="px-4 py-2.5 text-right font-black whitespace-nowrap">루시드 EXP</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-rose-900/30">
                                        {[
                                            ['루시드로 자쿰 처치', '350,000'],
                                            ['루시드로 벨룸 처치', '500,000'],
                                            ['루시드로 루시드 처치', '700,000'],
                                            ['루시드로 헬레나 처치', '1,100,000'],
                                            ['몽환의 장비 에픽/유니크/레전드리 획득', '300K / 400K / 700K'],
                                            ['몽환의 결정 에픽/유니크/레전드리 획득', '200K / 300K / 500K'],
                                            ['루시드 레벨 70 달성', '350,000'],
                                            ['드림 이터 누적 22만마리 처치', '500,000'],
                                            ['악몽의 숲 누적 300회 완료', '700,000'],
                                            ['악몽의 근원 누적 200번 처치', '900,000'],
                                        ].map(([mission, exp], i) => (
                                            <tr key={i} className="bg-slate-900/40 hover:bg-slate-900/70 transition-colors">
                                                <td className="px-4 py-2.5 text-slate-300">{mission}</td>
                                                <td className="px-4 py-2.5 text-right text-rose-300 font-bold whitespace-nowrap">{exp}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ④ 드림 기프트 (레벨 보상) */}
                <section className="mb-10">
                    <div className="bg-gradient-to-br from-violet-900/40 to-purple-900/40 border-2 border-violet-500/50 rounded-2xl p-4 sm:p-6 lg:p-8">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-11 h-11 bg-violet-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <span className="text-2xl">🎁</span>
                            </div>
                            <div>
                                <p className="text-xs text-violet-300/70 font-bold uppercase tracking-widest">STEP 4</p>
                                <h2 className="text-xl sm:text-2xl font-black text-violet-300">드림 기프트 — 루시드 레벨 보상</h2>
                            </div>
                        </div>

                        {/* 드림 기프트 UI 이미지 */}
                        <div className="mb-5 rounded-xl overflow-hidden border border-violet-500/30">
                            <Image
                                src="/images/blog/testworld-23rd-anniversary/dream-gift.png"
                                alt="루시드 드림 기프트 UI - 레벨별 보상 확인"
                                width={1200}
                                height={700}
                                className="w-full h-auto object-cover"
                            />
                            <p className="text-xs text-slate-500 text-center px-2 py-1.5 bg-slate-900/80">▲ 드림 기프트 탭 — Lv.10부터 100까지 단계별 보상 확인 가능</p>
                        </div>

                        {/* 주요 보상 하이라이트 */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                            {[
                                { lv: '20', reward: '루시드 데미지 스킨 (유닛)', color: 'border-sky-500/40 bg-sky-900/20 text-sky-300' },
                                { lv: '30', reward: '메르세데스 베개 교환권', color: 'border-pink-500/40 bg-pink-900/20 text-pink-300' },
                                { lv: '40', reward: '루시드와 함께한 추억 (영구)', color: 'border-purple-500/40 bg-purple-900/20 text-purple-300' },
                                { lv: '60', reward: '강력한 소환수 라이딩 (영구) 교환권', color: 'border-yellow-500/40 bg-yellow-900/20 text-yellow-300' },
                                { lv: '80', reward: '루시드 명찰/말풍선 반지 교환권', color: 'border-rose-500/40 bg-rose-900/20 text-rose-300' },
                                { lv: '100', reward: '전설 성장의 비약 (200~279) + 홈 테마', color: 'border-amber-500/50 bg-amber-900/20 text-amber-300' },
                            ].map((item, i) => (
                                <div key={i} className={`rounded-xl border p-3 ${item.color}`}>
                                    <p className="text-2xl font-black mb-1">Lv.{item.lv}</p>
                                    <p className="text-xs font-semibold">{item.reward}</p>
                                </div>
                            ))}
                        </div>

                        {/* 루시드 보상 (장비류) */}
                        <div className="bg-slate-900/60 border border-violet-500/30 rounded-xl p-4">
                            <p className="text-violet-200 font-black mb-3">⚔️ 루시드 장비 보상 (레벨별)</p>
                            <div className="overflow-x-auto">
                                <table className="w-full text-xs sm:text-sm">
                                    <thead>
                                        <tr className="bg-violet-900/40 text-violet-200">
                                            <th className="px-3 py-2 text-left font-black">레벨</th>
                                            <th className="px-3 py-2 text-left font-black">보상</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-violet-900/30">
                                        {[
                                            ['10~45', '악몽의 드림캐쳐 교환권 3~5개 (각 레벨)'],
                                            ['40', '의문의 몽환의 결정 상자 (에픽) 1개'],
                                            ['55', '의문의 몽환의 결정 상자 (에픽) 2개'],
                                            ['65', '의문의 몽환의 결정 상자 (유니크) 1개'],
                                            ['70', '악몽의 드림캐쳐 10개'],
                                            ['75', '의문의 몽환의 결정 상자 (유니크) 2개'],
                                            ['80', '몽환의 결정 선택 상자 (유니크)'],
                                            ['85', '몽환의 장비 선택 상자 (유니크)'],
                                            ['90', '의문의 몽환의 결정 상자 (레전드리)'],
                                            ['95', '몽환의 장비 선택 상자 (레전드리)'],
                                            ['100', '몽환의 결정 선택 상자 (레전드리)'],
                                        ].map(([lv, reward], i) => (
                                            <tr key={i} className="bg-slate-900/40">
                                                <td className="px-3 py-2 font-black text-violet-300">Lv.{lv}</td>
                                                <td className="px-3 py-2 text-slate-300">{reward}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ⑤ 악몽의 숲 */}
                <section className="mb-10">
                    <div className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-2 border-emerald-500/50 rounded-2xl p-4 sm:p-6 lg:p-8">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-11 h-11 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <span className="text-2xl">🌲</span>
                            </div>
                            <div>
                                <p className="text-xs text-emerald-300/70 font-bold uppercase tracking-widest">STEP 5</p>
                                <h2 className="text-xl sm:text-2xl font-black text-emerald-300">악몽의 숲 공략</h2>
                            </div>
                        </div>

                        <p className="text-slate-300 text-sm mb-5 leading-relaxed">
                            이벤트 리스트 → '악몽의 숲' → 입장. 입장 즉시 루시드로 변신되며 해제 불가.<br />
                            <span className="text-yellow-400 font-bold">악몽의 드림캐쳐 1개</span>를 소모해 탐색하며, 매일 5개씩 자동 지급됩니다 (최대 30개 보유).
                        </p>

                        {/* 악몽의 숲 입장 UI 이미지 */}
                        <div className="mb-5 rounded-xl overflow-hidden border border-emerald-500/30">
                            <Image
                                src="/images/blog/testworld-23rd-anniversary/nightmare-forest.jpg"
                                alt="악몽의 숲 입장 UI"
                                width={1200}
                                height={800}
                                className="w-full h-auto object-cover"
                            />
                            <p className="text-xs text-slate-500 text-center px-2 py-1.5 bg-slate-900/80">▲ 악몽의 숲 입장 UI — 드림캐쳐 보유 개수·현재 단계·입장 버튼 확인</p>
                        </div>

                        {/* 단계 테이블 */}
                        <div className="mb-5 overflow-x-auto rounded-xl border border-emerald-500/30">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-emerald-900/40 text-emerald-200">
                                        <th className="px-4 py-2.5 text-left font-black">루시드 레벨</th>
                                        <th className="px-4 py-2.5 text-left font-black">악몽의 숲 단계</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-emerald-900/30">
                                    {[
                                        ['1~19', '1단계'],
                                        ['20~39', '2단계'],
                                        ['40~59', '3단계'],
                                        ['60~79', '4단계'],
                                        ['80~100', '5단계'],
                                    ].map(([lv, stage], i) => (
                                        <tr key={i} className="bg-slate-900/40">
                                            <td className="px-4 py-2.5 text-slate-300 font-bold">{lv}</td>
                                            <td className="px-4 py-2.5 text-emerald-300 font-bold">{stage}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* 숲의 근원 확률 */}
                        <div className="bg-slate-900/60 border border-emerald-500/30 rounded-xl p-4">
                            <p className="text-emerald-200 font-black mb-3">🎲 숲의 근원 등급 확률</p>
                            <div className="overflow-x-auto">
                                <table className="w-full text-xs">
                                    <thead>
                                        <tr className="bg-emerald-900/40 text-emerald-200">
                                            <th className="px-3 py-2 text-left font-black">단계</th>
                                            <th className="px-3 py-2 text-center">노멀</th>
                                            <th className="px-3 py-2 text-center">레어</th>
                                            <th className="px-3 py-2 text-center">에픽</th>
                                            <th className="px-3 py-2 text-center text-yellow-300">유니크</th>
                                            <th className="px-3 py-2 text-center text-orange-300">레전드리</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-emerald-900/20">
                                        {[
                                            ['1단계', '55%', '40%', '4.35%', '0.649%', '0.001%'],
                                            ['2단계', '10%', '55%', '33%', '1.998%', '0.002%'],
                                            ['3단계', '-', '19%', '65%', '15%', '1%'],
                                            ['4단계', '-', '3%', '55%', '40.5%', '1.5%'],
                                            ['5단계', '-', '-', '44%', '52%', '4%'],
                                        ].map((row, i) => (
                                            <tr key={i} className="bg-slate-900/40 text-slate-300">
                                                <td className="px-3 py-2 font-black text-emerald-300">{row[0]}</td>
                                                {row.slice(1).map((v, j) => <td key={j} className="px-3 py-2 text-center">{v}</td>)}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-slate-500 text-xs mt-2">※ 숲의 근원 처치 시 등급에 따라 몽환의 장비/결정/파편 획득</p>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="6849727140" className="my-10" />

                {/* ⑥ 몽환의 장비 */}
                <section className="mb-10">
                    <div className="bg-gradient-to-br from-amber-900/40 to-orange-900/40 border-2 border-amber-500/50 rounded-2xl p-4 sm:p-6 lg:p-8">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-11 h-11 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Shield className="w-6 h-6 text-amber-400" />
                            </div>
                            <div>
                                <p className="text-xs text-amber-300/70 font-bold uppercase tracking-widest">STEP 6</p>
                                <h2 className="text-xl sm:text-2xl font-black text-amber-300">몽환의 장비 & 결정</h2>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4 mb-4">
                            {/* 장비 종류 */}
                            <div className="bg-slate-900/60 border border-amber-500/30 rounded-xl p-4">
                                <p className="text-amber-200 font-black mb-3">🗡️ 몽환의 장비 종류</p>
                                <div className="space-y-2 text-sm">
                                    {[
                                        { type: '무기', name: '몽환의 전령', opt: '마력 증가' },
                                        { type: '반지', name: '몽환의 근원', opt: '크리티컬 확률 증가' },
                                        { type: '펜던트', name: '몽환의 경계', opt: '최대 HP 증가' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 bg-amber-900/20 rounded-lg px-3 py-2 border border-amber-500/20">
                                            <span className="text-amber-300 font-black text-xs w-12">{item.type}</span>
                                            <span className="text-white font-bold">{item.name}</span>
                                            <span className="text-slate-400 text-xs ml-auto">{item.opt}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 강화 단계 */}
                            <div className="bg-slate-900/60 border border-orange-500/30 rounded-xl p-4">
                                <p className="text-orange-200 font-black mb-3">⬆️ 등급별 강화 슬롯</p>
                                <div className="space-y-2 text-sm">
                                    {[
                                        { grade: '노멀', info: '강화 불가 / 결정 슬롯 없음' },
                                        { grade: '레어', info: '+12 / 결정 슬롯 1개' },
                                        { grade: '에픽', info: '+12 / 결정 슬롯 2개' },
                                        { grade: '유니크', info: '+12 / 결정 슬롯 3개' },
                                        { grade: '레전드리', info: '+12 / 결정 슬롯 4개' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 bg-orange-900/20 rounded-lg px-3 py-2 border border-orange-500/20">
                                            <span className="text-orange-300 font-black text-xs w-16">{item.grade}</span>
                                            <span className="text-slate-300 text-xs">{item.info}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 몽환의 결정 */}
                        <div className="bg-slate-900/60 border border-yellow-500/30 rounded-xl p-4">
                            <p className="text-yellow-200 font-black mb-2">💎 몽환의 결정 옵션</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {['마력 증가', '마력% 증가', '최대 HP 증가', '최대 HP% 증가', '숙련도 증가', '크리티컬 확률 증가', '크리티컬 데미지 증가', '스킬 재사용 대기시간 감소'].map((opt, i) => (
                                    <span key={i} className="px-2 py-1 bg-yellow-900/30 border border-yellow-500/30 text-yellow-200 text-xs rounded-lg">{opt}</span>
                                ))}
                            </div>
                            <p className="text-slate-400 text-xs">• 레어/에픽: 옵션 1개 | 유니크/레전드리: 옵션 2개<br />
                            • 같은 등급 결정 3개 합성 → 상위 등급 제작 (확률 성공)</p>
                        </div>
                    </div>
                </section>

                {/* ⑦ 몽환의 시련 */}
                <section className="mb-10">
                    <div className="bg-gradient-to-br from-red-900/40 to-rose-900/40 border-2 border-red-500/50 rounded-2xl p-4 sm:p-6 lg:p-8">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-11 h-11 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <span className="text-2xl">👹</span>
                            </div>
                            <div>
                                <p className="text-xs text-red-300/70 font-bold uppercase tracking-widest">STEP 7</p>
                                <h2 className="text-xl sm:text-2xl font-black text-red-300">몽환의 시련 — 보스 공략</h2>
                            </div>
                        </div>

                        <p className="text-slate-300 text-sm mb-5">
                            루시드 전용 보스를 처치하여 <span className="text-yellow-400 font-bold">내 캐릭터 & 루시드 전용 보상</span>을 획득합니다.<br />
                            주간 보스 제한에 포함되지 않으며, 기존 보스 보상도 지급되지 않습니다.
                        </p>

                        {/* 몽환의 시련 UI 이미지 */}
                        <div className="mb-5 rounded-xl overflow-hidden border border-red-500/30">
                            <Image
                                src="/images/blog/testworld-23rd-anniversary/dream-trial.jpg"
                                alt="몽환의 시련 UI - 자쿰, 벨룸, 루시드, 헬레나 보스"
                                width={900}
                                height={800}
                                className="w-full h-auto object-cover"
                            />
                            <p className="text-xs text-slate-500 text-center px-2 py-1.5 bg-slate-900/80">▲ 몽환의 시련 UI — 헬레나 노멀·나이트메어는 4월 업데이트 예정 (COMING SOON)</p>
                        </div>

                        {/* 모바일: 카드형, sm+: 테이블 */}
                        <div className="space-y-2 sm:hidden mb-4">
                            {[
                                ['자쿰 (카오스)', '체인지 루시드 로이드 교환권', '의문의 몽환의 결정 상자(에픽)'],
                                ['벨룸 (카오스)', '드림 라이트 뱅글 교환권', '의문의 몽환의 결정 상자(유니크)'],
                                ['루시드 (하드)', '악몽의 주인 훈장 교환권', '몽환의 장비 선택 상자(유니크)'],
                                ['헬레나 (노멀)', '솜터진 헬레나 인형 + LUCID 칭호', '몽환의 결정 선택 상자(유니크)'],
                                ['헬레나 (나이트메어)', '몽환의 나비 피니시 어택 이펙트', '몽환의 결정 선택 상자(레전드리)'],
                            ].map(([miss, myR, lucR], i) => (
                                <div key={i} className="bg-slate-900/50 border border-red-500/20 rounded-xl p-3">
                                    <p className="text-red-300 font-black text-sm mb-1.5">{miss}</p>
                                    <div className="space-y-1">
                                        <p className="text-xs text-slate-400">내 캐릭터: <span className="text-slate-200">{myR}</span></p>
                                        <p className="text-xs text-slate-400">루시드 보상: <span className="text-slate-200">{lucR}</span></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="hidden sm:block overflow-x-auto rounded-xl border border-red-500/30 mb-4">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-red-900/40 text-red-200">
                                        <th className="px-3 py-2.5 text-left font-black">미션</th>
                                        <th className="px-3 py-2.5 text-left font-black">내 캐릭터 보상</th>
                                        <th className="px-3 py-2.5 text-left font-black">루시드 보상</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-red-900/30">
                                    {[
                                        ['자쿰 (카오스)', '체인지 루시드 로이드 교환권', '의문의 몽환의 결정 상자(에픽)'],
                                        ['벨룸 (카오스)', '드림 라이트 뱅글 교환권', '의문의 몽환의 결정 상자(유니크)'],
                                        ['루시드 (하드)', '악몽의 주인 훈장 교환권', '몽환의 장비 선택 상자(유니크)'],
                                        ['헬레나 (노멀)', '솜터진 헬레나 인형 + LUCID 칭호', '몽환의 결정 선택 상자(유니크)'],
                                        ['헬레나 (나이트메어)', '몽환의 나비 피니시 어택 이펙트', '몽환의 결정 선택 상자(레전드리)'],
                                    ].map(([miss, myR, lucR], i) => (
                                        <tr key={i} className="bg-slate-900/40 hover:bg-slate-900/70 transition-colors">
                                            <td className="px-3 py-2.5 font-bold text-red-300 whitespace-nowrap">{miss}</td>
                                            <td className="px-3 py-2.5 text-slate-300 text-xs">{myR}</td>
                                            <td className="px-3 py-2.5 text-slate-300 text-xs">{lucR}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-slate-500 text-xs">※ 헬레나 나이트메어 난이도는 4월 업데이트 예정 | 보상은 1회 수령 (메이플ID 기준)</p>
                    </div>
                </section>

                {/* ⑧ 드림 샤드샵 */}
                <section className="mb-10">
                    <div className="bg-gradient-to-br from-cyan-900/40 to-teal-900/40 border-2 border-cyan-500/50 rounded-2xl p-4 sm:p-6 lg:p-8">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-11 h-11 bg-cyan-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <span className="text-2xl">🛒</span>
                            </div>
                            <div>
                                <p className="text-xs text-cyan-300/70 font-bold uppercase tracking-widest">STEP 8</p>
                                <h2 className="text-xl sm:text-2xl font-black text-cyan-300">드림 샤드샵</h2>
                            </div>
                        </div>

                        <p className="text-slate-300 text-sm mb-5">
                            루시드 레벨 보상으로 얻은 <span className="text-cyan-400 font-bold">드림 샤드</span>를 사용하는 상점입니다.<br />
                            이벤트 참여 캐릭터가 있는 명의의 <span className="text-white font-bold">200레벨 이상 캐릭터 모두</span>가 이용 가능하며, 구매 현황은 명의 공유됩니다.
                        </p>

                        {/* 드림 샤드샵 이미지 */}
                        <div className="mb-5 rounded-xl overflow-hidden border border-cyan-500/30">
                            <Image
                                src="/images/blog/testworld-23rd-anniversary/dream-shard-shop.png"
                                alt="드림 샤드샵 - 판매 아이템 목록"
                                width={600}
                                height={700}
                                className="w-full h-auto object-cover max-w-md mx-auto block"
                            />
                            <p className="text-xs text-slate-500 text-center px-2 py-1.5 bg-slate-900/80">▲ 드림 샤드샵 — 드림 샤드 소모량 및 남은 구매 수량 확인 가능</p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-3">
                            {[
                                { name: '대적자의 블랙 큐브', note: '제네시스/데스티니/아스트라 전용', color: 'border-slate-500/40 bg-slate-800/40 text-slate-200' },
                                { name: '대적자의 화이트 에디셔널 큐브', note: '제네시스/데스티니/아스트라 전용', color: 'border-slate-500/40 bg-slate-800/40 text-slate-200' },
                                { name: '대적자의 심연의 환생의 불꽃', note: '제네시스/데스티니 무기 전용', color: 'border-orange-500/30 bg-orange-900/20 text-orange-200' },
                                { name: '솔 에르다', note: '260레벨 & 6차 전직 완료 필요', color: 'border-yellow-500/30 bg-yellow-900/20 text-yellow-200' },
                                { name: '솔 에르다 조각', note: '교환 불가 / 영구 아이템', color: 'border-blue-500/30 bg-blue-900/20 text-blue-200' },
                            ].map((item, i) => (
                                <div key={i} className={`rounded-xl border p-3 ${item.color}`}>
                                    <p className="font-black text-sm mb-0.5">{item.name}</p>
                                    <p className="text-xs opacity-70">{item.note}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 bg-yellow-900/20 border border-yellow-500/40 rounded-xl p-3">
                            <p className="text-yellow-300 text-xs font-bold flex items-start gap-1">
                                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                                대적자 큐브/불꽃은 '[제네시스 무기] 힘의 해방, 두번째' 퀘스트 완료 캐릭터만 구매 가능<br />
                                솔 에르다 조각을 제외한 구매 아이템은 6월 18일(목) 오전 2시까지만 사용 가능
                            </p>
                        </div>
                    </div>
                </section>

                {/* 최종 요약 체크리스트 */}
                <section className="mb-10">
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-purple-500/60 rounded-2xl p-4 sm:p-6 lg:p-8">
                        <h2 className="text-xl sm:text-2xl font-black mb-6 text-center flex items-center justify-center gap-2 text-purple-300">
                            <Star className="w-6 h-6" /> 체인지 버닝 루시드 핵심 체크리스트
                        </h2>
                        <div className="space-y-3">
                            {[
                                { step: '참여 등록', desc: '이벤트 리스트 또는 석촌호수 NPC 루시드에게 참여 신청 (3/19 이후)', color: 'bg-purple-900/30 border-purple-500/40 text-purple-400' },
                                { step: '주간 사냥', desc: '매주 드림 이터 최대 25,000마리 처치 → 악몽 침식 반복으로 루시드·본캐 EXP 획득', color: 'bg-indigo-900/30 border-indigo-500/40 text-indigo-400' },
                                { step: '주간 미션', desc: '악몽의 숲 25회 + 악몽의 근원 10회 + 끄나풀 2,500마리 + 드림 이터 13,500마리로 주간 210만 EXP 풀파밍', color: 'bg-pink-900/30 border-pink-500/40 text-pink-400' },
                                { step: '악몽의 숲', desc: '매일 드림캐쳐 5개 자동 지급 (최대 30개). 모두 사용해 몽환의 장비/결정/파편 파밍', color: 'bg-emerald-900/30 border-emerald-500/40 text-emerald-400' },
                                { step: '몽환의 시련', desc: '자쿰→벨룸→루시드→헬레나 순서로 도전해 전용 코스튬·훈장·칭호 획득', color: 'bg-red-900/30 border-red-500/40 text-red-400' },
                                { step: '드림 기프트', desc: 'Lv.100 달성 시 전설 성장의 비약(200~279) + 메이플 홈 테마! 루시드 성장 집중', color: 'bg-amber-900/30 border-amber-500/40 text-amber-400' },
                            ].map((item, i) => (
                                <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border ${item.color.split(' ').slice(0, 2).join(' ')}`}>
                                    <span className={`text-lg font-black flex-shrink-0 ${item.color.split(' ')[2]}`}>{i + 1}</span>
                                    <div>
                                        <p className={`font-black text-sm ${item.color.split(' ')[2]}`}>{item.step}</p>
                                        <p className="text-white text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-700 text-center">
                            <p className="text-white text-lg font-bold mb-1">루시드 Lv.100까지 함께 달려봐요! 🦋</p>
                            <p className="text-slate-400 text-sm">이벤트 기간: 2026년 3월 19일(목) ~ 6월 17일(수)</p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-700">
                            <p className="text-slate-700 text-xs text-center">
                                #체인지버닝루시드 #메이플스토리23주년 #루시드이벤트 #악몽의숲 #드림샤드샵 #몽환의장비 #몽환의시련 #악몽제어 #드림이터
                            </p>
                        </div>
                    </div>
                </section>

                {/* Footer CTA */}
                <div className="border-t border-slate-700 pt-8 mt-12 text-center">
                    <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-500 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        블로그 메인으로
                    </Link>
                </div>
            </article>
        </div>
    );
}
