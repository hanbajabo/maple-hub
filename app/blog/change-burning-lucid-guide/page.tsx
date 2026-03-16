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

            {/* 메인 콘텐츠 영역 (break-keep 추가로 모바일 단어 끊김 방지) */}
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 break-keep">

                {/* Title */}
                <header className="mb-10">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
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
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-tight text-balance">
                        🦋 체인지 버닝: 루시드<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400">
                            효율 완전 분석 공략 가이드
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

                            {/* 체인지 버닝 매니지먼트 추가 */}
                            <div className="bg-purple-900/40 border border-purple-500/40 rounded-xl p-4 mt-6">
                                <p className="text-purple-200 font-black mb-3 flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-purple-400" /> 체인지 버닝 매니지먼트
                                </p>
                                <div className="rounded-xl overflow-hidden border border-purple-500/30 mb-4 bg-slate-950">
                                    <Image
                                        src="/images/blog/testworld-23rd-anniversary/lucid-management.png"
                                        alt="체인지 버닝 매니지먼트 UI"
                                        width={600}
                                        height={250}
                                        className="w-full h-auto object-contain mx-auto"
                                    />
                                    <p className="text-[11px] text-slate-500 text-center py-1.5 bg-slate-900/80 ring-1 ring-inset ring-slate-800">
                                        ▲ 체인지 버닝 매니지먼트 UI — 인벤토리·스킬·단축키 통합 관리
                                    </p>
                                </div>
                                <div className="space-y-2.5">
                                    <p className="text-slate-300 text-sm leading-relaxed">
                                        체인지 버닝을 지정한 캐릭터로 이벤트 리스트에서 <span className="text-white font-bold">‘체인지 버닝 매니지먼트’</span>를 클릭하면 통합 관리 UI를 열 수 있습니다.
                                    </p>
                                    <ul className="text-xs sm:text-sm text-slate-400 space-y-1 bg-slate-900/50 p-3 rounded-lg border border-purple-500/20">
                                        <li className="flex items-center gap-2">✨ <span className="text-purple-300 font-bold">인벤토리:</span> 루시드 전용 장비 및 소비 아이템 관리</li>
                                        <li className="flex items-center gap-2">📖 <span className="text-purple-300 font-bold">스킬:</span> 루시드 전용 스킬 확인 및 강화 정보</li>
                                        <li className="flex items-center gap-2">⌨️ <span className="text-purple-300 font-bold">단축키:</span> 루시드 전용 단축키 세팅 UI 열기</li>
                                    </ul>
                                    <p className="text-purple-300/80 text-[11px] sm:text-xs">
                                        ※ 루시드의 모든 장착 장비와 스킬, 키세팅은 본캐와 별도로 여기서 모두 관리합니다.
                                    </p>
                                </div>
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

                            {/* 침식 몬스터 이미지 추가 */}
                            <div className="mb-4 rounded-xl overflow-hidden border border-indigo-500/20 shadow-lg">
                                <Image
                                    src="/images/blog/testworld-23rd-anniversary/nightmare-monsters.png"
                                    alt="드림 이터, 악몽 끄나풀, 악몽의 근원"
                                    width={1200}
                                    height={400}
                                    className="w-full h-auto"
                                />
                            </div>

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

                        {/* 끄나풀 효율 팁 추가 */}
                        <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-4 mb-4">
                            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                                💡 <span className="text-orange-300 font-bold">악몽의 끄나풀</span>은 드림 이터보다 <span className="text-yellow-400 font-bold">마리당 EXP가 2.6배</span> 높습니다. 침식 발동 즉시 전원 처치를 해야 최대 효율이며, 침식 중 맵을 이동하거나 변신이 해제되면 침식이 중단됩니다.
                            </p>
                        </div>

                        {/* 루시드 드림 이터 사냥 소요 시간 (이동됨) */}
                        <div className="bg-slate-900/60 border border-indigo-500/30 rounded-xl p-4 mb-6">
                            <p className="text-indigo-200 font-black mb-3 text-sm flex items-center gap-1.5">
                                <Clock className="w-4 h-4" /> 루시드 드림 이터 사냥 소요 시간 분석
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div className="rounded-lg overflow-hidden border border-indigo-500/20">
                                    <Image
                                        src="/images/blog/testworld-23rd-anniversary/hunt-time-1.png"
                                        alt="드림 이터 사냥 측정 시작"
                                        width={600}
                                        height={300}
                                        className="w-full h-auto"
                                    />
                                    <p className="text-[10px] text-slate-500 text-center py-1 bg-slate-900">▲ 전투 측정 시작 (250/1,250)</p>
                                </div>
                                <div className="rounded-lg overflow-hidden border border-indigo-500/20">
                                    <Image
                                        src="/images/blog/testworld-23rd-anniversary/hunt-time-2.png"
                                        alt="드림 이터 1,250마리(침식 1회) 측정 완료"
                                        width={600}
                                        height={300}
                                        className="w-full h-auto"
                                    />
                                    <p className="text-[10px] text-slate-500 text-center py-1 bg-slate-900">▲ 드림 이터 1,250마리(침식 1회분) 소요: 약 4분</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <p className="text-white font-bold text-xs sm:text-sm">⏱️ 주간 숙제(25,000마리) 완료 시간 계산</p>
                                <div className="bg-indigo-900/40 border border-indigo-500/30 rounded-lg p-3 space-y-2">
                                    <div className="flex justify-between text-xs sm:text-sm">
                                        <span className="text-slate-200">1,000마리당 소요 시간</span>
                                        <span className="text-cyan-400 font-bold underline underline-offset-4 decoration-cyan-500/30">약 4분</span>
                                    </div>
                                    <div className="flex justify-between text-xs sm:text-sm">
                                        <span className="text-slate-200">25,000마리 산출식</span>
                                        <span className="text-white font-medium italic">25 × 4분 = 100분</span>
                                    </div>
                                    <div className="border-t border-indigo-500/40 pt-2 flex justify-between items-center text-sm sm:text-base">
                                        <span className="text-white font-black">최종 소요 시간</span>
                                        <span className="text-yellow-300 font-black drop-shadow-[0_0_5px_rgba(253,224,71,0.3)]">1시간 40분</span>
                                    </div>
                                </div>
                                <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                                    • 악몽의 근원 처치 및 침식 발동 대기 시간까지 포함하면 대략 <span className="text-white font-black">1재획(2시간)</span> 정도 소요될 것으로 예상됩니다.<br />
                                    • <span className="text-slate-400 italic">(기준 : 카르시온 사냥터 숨이 멎는 소리 동굴 4)</span>
                                </p>
                            </div>
                        </div>

                        {/* 누적 경험치 정산 시스템 설명 추가 */}
                        <div className="mb-5 overflow-hidden rounded-xl border border-blue-500/30">
                            <Image
                                src="/images/blog/testworld-23rd-anniversary/exp-transfer.png"
                                alt="루시드 누적 경험치 획득 시스템 설명"
                                width={1200}
                                height={300}
                                className="w-full h-auto object-cover"
                            />
                            <div className="bg-blue-900/20 p-4 border-t border-blue-500/30">
                                <p className="text-blue-300 font-black text-sm mb-2 flex items-center gap-1.5">
                                    <Star className="w-4 h-4" /> 누적 경험치 정산 시스템
                                </p>
                                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                                    루시드로 드림 이터 및 악몽 침식(근원, 끄나풀)을 사냥하여 획득한 <span className="text-white font-bold">대량의 캐릭터 경험치</span>는 <span className="text-yellow-400 font-bold">CHANGE STATUS 창 하단</span>에 실시간으로 누적됩니다.<br />
                                    이렇게 누적된 폭풍 경험치는 <span className="text-cyan-300 font-bold">루시드 상태를 해제하고 본캐(내 캐릭터)로 돌아갈 때 한 번에 결산되어 실제 경험치 바에 적용</span>됩니다! 잠시 마을로 돌아가 폭업의 뽕맛을 느껴보세요! 🚀
                                </p>
                            </div>
                        </div>



                        <div className="bg-yellow-900/20 border border-yellow-500/40 rounded-xl p-4">
                            <p className="text-yellow-300 font-bold text-sm flex items-center gap-1 mb-1">
                                <AlertCircle className="w-4 h-4" /> 주의사항
                            </p>
                            <ul className="space-y-1 text-xs text-slate-300">
                                <li>• 악몽 침식 진행 중에는 드림 이터가 생성되지 않음</li>
                                <li>• 맵 이동 또는 변신 해제 시 침식 중단 → 재변신 시 이어서 진행 가능</li>
                                <li><span className="text-red-300 font-bold">• 루시드</span>는 일반 필드 몬스터로는 경험치를 얻지 못함 (드림 이터/근원/끄나풀만 가능)</li>
                                <li><span className="text-green-300 font-bold">• 본캐(내 캐릭터)</span>는 필드 몬스터들의 경험치 도핑 효과를 그대로 온전히 얻음</li>
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
                                <table className="w-full text-xs sm:text-sm whitespace-nowrap">
                                    <thead>
                                        <tr className="bg-pink-900/40 text-pink-200">
                                            <th className="px-4 py-2.5 text-left font-black">미션</th>
                                            <th className="px-4 py-2.5 text-right font-black whitespace-nowrap">루시드 EXP</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-pink-900/30">
                                        {[
                                            ['악몽의 숲 5/10/15/20/25회 완료', '10만 → 12만 → 14만 → 16만 → 18만'],
                                            ['악몽의 근원 1/5/10회 처치', '10만 → 12만 → 16만'],
                                            ['악몽의 끄나풀 400/1,500/2,500마리 처치', '10만 → 14만 → 18만'],
                                            ['드림 이터 4,500/8,000/11,000/13,500마리 처치', '12만 → 14만 → 16만 → 18만'],
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
                                <table className="w-full text-xs sm:text-sm whitespace-nowrap">
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
                                            ['몽환의 장비 에픽/유니크/레전드리 획득', '30만 / 40만 / 70만'],
                                            ['몽환의 결정 에픽/유니크/레전드리 획득', '20만 / 30만 / 50만'],
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
                        {/* 보상 강조 문구 추가 */}
                        <div className="mt-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4 text-center">
                            <p className="text-white text-sm sm:text-base font-black">
                                <span className="text-yellow-400">🚀 핵심 보상:</span> <span className="text-cyan-300">본캐(내 캐릭터)</span>는 자신의 레벨에 맞게 보정된 <span className="text-green-400">대량의 경험치</span>를 얻을 수 있습니다.
                            </p>
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

                        {/* 최고 레벨 강조 */}
                        <div className="mb-4 bg-violet-500/20 border border-violet-500/40 rounded-xl py-3 px-4 text-center">
                            <p className="text-violet-200 text-lg font-black italic tracking-wider">
                                🦋 루시드 최고 레벨 : <span className="text-white text-2xl ml-1">LV.100</span>
                            </p>
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
                                <table className="w-full text-xs sm:text-sm whitespace-nowrap">
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
                            <table className="w-full text-xs sm:text-sm whitespace-nowrap">
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
                                <table className="w-full text-xs sm:text-sm whitespace-nowrap">
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

                        {/* 몽환의 장비 예시 이미지 */}
                        <div className="mb-6 rounded-xl overflow-hidden border border-amber-500/30 max-w-md mx-auto">
                            <Image
                                src="/images/blog/testworld-23rd-anniversary/dream-equipment.png"
                                alt="몽환의 전령 (에픽) 아이템 정보 예시"
                                width={600}
                                height={600}
                                className="w-full h-auto object-cover"
                            />
                            <p className="text-xs text-slate-500 text-center px-2 py-1.5 bg-slate-900/80">▲ 몽환의 장비 예시 (에픽 등급) — 등급에 따라 결정 슬롯 개수가 달라집니다.</p>
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
                            <table className="w-full text-xs sm:text-sm whitespace-nowrap">
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

                {/* ★ 공략 파트: 경험치 효율 분석 */}
                <section className="mb-10">
                    <div className="bg-gradient-to-br from-orange-950/60 to-amber-950/60 border-2 border-orange-500/60 rounded-2xl p-4 sm:p-6 lg:p-8">
                        {/* 섹션 헤더 */}
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-11 h-11 bg-orange-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <span className="text-2xl">📊</span>
                            </div>
                            <div>
                                <p className="text-xs text-orange-300/70 font-bold uppercase tracking-widest">STRATEGY</p>
                                <h2 className="text-xl sm:text-2xl font-black text-orange-300">경험치 효율 완전 분석</h2>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm mb-8 ml-14">LV.289 / LV.290 기준 실측 데이터 — 단락별 핵심 설명 후 전체 표를 확인하세요</p>

                        {/* ────── 단락 1: 기본 단위 ────── */}
                        <div className="mb-6">
                            <h3 className="text-base font-black text-slate-200 mb-3 flex items-center gap-2">
                                <span className="px-2 py-0.5 bg-slate-700 rounded-md text-xs text-slate-300 font-bold">① ~ ③</span>
                                기본 단위 — 몬스터 1마리·1회당 EXP
                            </h3>
                            <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-4 text-sm text-slate-300 leading-relaxed mb-3">
                                <p>사냥터에서 루시드로 변신하면 세 종류의 특수 몬스터가 등장합니다.</p>
                                <ul className="mt-2 space-y-1.5">
                                    <li><span className="text-white font-bold">① 드림 이터:</span> 기본 등장 몬스터. 처치 시 루시드 EXP + 본캐 경험치 동시 획득.</li>
                                    <li><span className="text-white font-bold">② 악몽 침식 (끄나풀):</span> 드림 이터 1,250마리 처치 시 자동 소환. 드림 이터보다 <span className="text-orange-300 font-bold">약 2.6배 높은 EXP!</span></li>
                                    <li><span className="text-white font-bold">③ 악몽의 근원:</span> 침식 발동마다 1마리 등장. 단일 처치 기준 가장 높은 EXP를 줍니다.</li>
                                </ul>
                            </div>

                            {/* 몬스터 이미지 추가 */}
                            <div className="mb-4 rounded-xl overflow-hidden border border-slate-700 shadow-lg shadow-black/50">
                                <img 
                                    src="/images/blog/change-burning-lucid-guide/monsters-basic-unit.png" 
                                    alt="드림 이터, 악몽 꼬나풀, 악몽의 근원" 
                                    className="w-full h-auto object-cover"
                                />
                            </div>

                            {/* 기준 몬스터 안내 */}
                            <div className="flex flex-wrap items-center gap-2 mb-2 text-xs text-slate-400">
                                <span className="bg-slate-800 border border-slate-600 rounded-md px-2 py-1">
                                    📌 기준 몬스터 EXP (LV.289): <span className="text-cyan-300 font-bold">4,265,489</span>
                                </span>
                                <span className="bg-slate-800 border border-slate-600 rounded-md px-2 py-1">
                                    📌 기준 몬스터 EXP (LV.290): <span className="text-cyan-300 font-bold">4,793,318</span>
                                </span>
                                <span className="text-slate-600">— 배율은 각 레벨 기준 몬스터 대비</span>
                            </div>
                            <div className="overflow-x-auto rounded-xl border border-slate-700">
                                <table className="w-full text-xs sm:text-sm whitespace-nowrap">
                                    <thead>
                                        <tr className="bg-slate-800 text-slate-400 text-xs">
                                            <th className="px-4 py-2.5 text-left font-bold">몬스터</th>
                                            <th className="px-4 py-2.5 text-right font-bold">LV.289 EXP</th>
                                            <th className="px-4 py-2.5 text-right font-bold">LV.290 EXP</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-700/50">
                                        <tr className="bg-slate-800/60">
                                            <td className="px-4 py-3 font-black text-slate-200">① 드림 이터</td>
                                            <td className="px-4 py-3 text-right">
                                                <p className="font-mono font-bold text-slate-200">75,499,155</p>
                                                <span className="inline-block mt-1 px-1.5 py-0.5 bg-slate-700 rounded text-[11px] font-bold text-cyan-300">× 17.7배</span>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <p className="font-mono font-bold text-slate-200">89,155,715</p>
                                                <span className="inline-block mt-1 px-1.5 py-0.5 bg-slate-700 rounded text-[11px] font-bold text-cyan-300">× 18.6배</span>
                                            </td>
                                        </tr>
                                        <tr className="bg-orange-900/20">
                                            <td className="px-4 py-3 font-black text-orange-200">② 끄나풀 <span className="text-orange-300/60 font-normal text-xs">(악몽 침식)</span></td>
                                            <td className="px-4 py-3 text-right">
                                                <p className="font-mono font-bold text-orange-200">196,297,804</p>
                                                <span className="inline-block mt-1 px-1.5 py-0.5 bg-orange-900/50 rounded text-[11px] font-bold text-orange-300">× 46.02배</span>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <p className="font-mono font-bold text-orange-200">231,804,858</p>
                                                <span className="inline-block mt-1 px-1.5 py-0.5 bg-orange-900/50 rounded text-[11px] font-bold text-orange-300">× 48.36배</span>
                                            </td>
                                        </tr>
                                        <tr className="bg-red-900/15">
                                            <td className="px-4 py-3 font-black text-red-200">③ 악몽의 근원</td>
                                            <td className="px-4 py-3 text-right">
                                                <p className="font-mono font-bold text-red-200">2,264,974,659</p>
                                                <span className="inline-block mt-1 px-1.5 py-0.5 bg-red-900/50 rounded text-[11px] font-bold text-red-300">× 531배</span>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <p className="font-mono font-bold text-red-200">2,674,671,444</p>
                                                <span className="inline-block mt-1 px-1.5 py-0.5 bg-red-900/50 rounded text-[11px] font-bold text-red-300">× 558배</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* ────── 단락 2: 주간 사냥 ────── */}
                        <div className="mb-6">
                            <h3 className="text-base font-black text-slate-200 mb-3 flex items-center gap-2">
                                <span className="px-2 py-0.5 bg-indigo-900/60 rounded-md text-xs text-indigo-300 font-bold">④ ~ ⑥</span>
                                주간 사냥 — 1주일 동안 얼마나 벌 수 있을까?
                            </h3>
                            <div className="bg-slate-900/60 border border-indigo-500/30 rounded-xl p-4 text-sm text-slate-300 leading-relaxed mb-3">
                                <p>매주 목요일 0시, 드림 이터 처치 가능 수 <span className="text-white font-bold">25,000마리가 추가</span>됩니다. 이 25,000마리를 전부 소진하면 악몽 침식이 정확히 <span className="text-orange-300 font-bold">20번 발동</span>되고, 침식당 끄나풀 200마리 × 20회 = <span className="text-orange-300 font-bold">총 4,000마리</span>의 끄나풀을 처치할 수 있습니다.</p>
                            </div>
                            <div className="overflow-x-auto rounded-xl border border-slate-700 mb-3">
                                <table className="w-full text-xs sm:text-sm whitespace-nowrap">
                                    <thead>
                                        <tr className="bg-indigo-900/40 text-indigo-200 text-xs">
                                            <th className="px-4 py-2.5 text-left font-bold">주간 사냥 (단위: 1주일)</th>
                                            <th className="px-4 py-2.5 text-right font-bold">LV.289 획득 EXP</th>
                                            <th className="px-4 py-2.5 text-right font-bold">LV.290 획득 EXP</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-700/50">
                                        <tr className="bg-slate-800/60">
                                            <td className="px-4 py-3 font-black text-slate-200">④ 드림 이터 <span className="text-slate-400 font-normal text-xs">(25,000마리)</span></td>
                                            <td className="px-4 py-3 text-right">
                                                <p className="font-mono font-bold text-slate-200">1,887,478,875,000</p>
                                                <p className="text-[11px] text-slate-400 mt-0.5">약 1조 8,874억</p>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <p className="font-mono font-bold text-slate-200">2,228,892,875,000</p>
                                                <p className="text-[11px] text-slate-400 mt-0.5">약 2조 2,288억</p>
                                            </td>
                                        </tr>
                                        <tr className="bg-orange-900/20">
                                            <td className="px-4 py-3 font-black text-orange-200">⑤ 끄나풀 <span className="text-orange-300/60 font-normal text-xs">(4,000마리)</span></td>
                                            <td className="px-4 py-3 text-right">
                                                <p className="font-mono font-bold text-orange-200">785,191,216,000</p>
                                                <p className="text-[11px] text-orange-300/70 mt-0.5">약 7,851억</p>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <p className="font-mono font-bold text-orange-200">927,219,432,000</p>
                                                <p className="text-[11px] text-orange-300/70 mt-0.5">약 9,272억</p>
                                            </td>
                                        </tr>
                                        <tr className="bg-slate-800/60">
                                            <td className="px-4 py-3 font-black text-red-200">⑥ 악몽의 근원 <span className="text-red-300/60 font-normal text-xs">(20회)</span></td>
                                            <td className="px-4 py-3 text-right">
                                                <p className="font-mono font-bold text-slate-200">45,299,493,180</p>
                                                <p className="text-[11px] text-slate-400 mt-0.5">약 452억</p>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <p className="font-mono font-bold text-slate-200">53,493,428,880</p>
                                                <p className="text-[11px] text-slate-400 mt-0.5">약 534억</p>
                                            </td>
                                        </tr>
                                        <tr className="bg-indigo-900/30 border-t-2 border-indigo-500/50">
                                            <td className="px-4 py-3 font-black text-indigo-300">주간 사냥 경험치 합계 <span className="text-indigo-400/80 font-normal text-xs">(④+⑤+⑥)</span></td>
                                            <td className="px-4 py-3 text-right">
                                                <p className="font-mono font-bold text-indigo-200">2,717,969,584,180</p>
                                                <p className="text-[11px] text-indigo-300/70 mt-0.5">약 2조 7,180억</p>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <p className="font-mono font-bold text-indigo-200">3,209,605,735,880</p>
                                                <p className="text-[11px] text-indigo-300/70 mt-0.5">약 3조 2,096억</p>
                                            </td>
                                        </tr>
                                        <tr className="bg-slate-800/40">
                                            <td className="px-4 py-3 font-bold text-slate-300">주간 사냥만으로 오르는 %</td>
                                            <td className="px-4 py-3 text-right">
                                                <span className="inline-block px-2 py-1 bg-green-900/30 border border-green-500/40 text-green-400 font-bold rounded text-xs">
                                                    🚀 약 1.86% 상승
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <span className="inline-block px-2 py-1 bg-green-900/30 border border-green-500/40 text-green-400 font-bold rounded text-xs">
                                                    🚀 약 1.09% 상승
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="bg-orange-900/20 border border-orange-500/30 rounded-xl px-4 py-3 text-xs text-orange-200">
                                💡 끄나풀은 드림 이터보다 마리당 EXP가 2.6배 높습니다. 침식 발동 즉시 전원 처치를 해야 최대 효율이며, 침식 중 맵을 이동하거나 변신이 해제되면 침식이 중단됩니다.
                            </div>

                            {/* 루시드 드림 이터 사냥 소요 시간 (전략 파트 추가) */}
                            <div className="bg-slate-900/60 border border-indigo-500/30 rounded-xl p-4 mt-6">
                                <p className="text-indigo-200 font-black mb-3 text-sm flex items-center gap-1.5">
                                    <Clock className="w-4 h-4" /> 루시드 드림 이터 사냥 소요 시간 분석
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                    <div className="rounded-lg overflow-hidden border border-indigo-500/20">
                                        <Image
                                            src="/images/blog/testworld-23rd-anniversary/hunt-time-1.png"
                                            alt="드림 이터 사냥 측정 시작"
                                            width={600}
                                            height={300}
                                            className="w-full h-auto"
                                        />
                                        <p className="text-[10px] text-slate-500 text-center py-1 bg-slate-900">▲ 전투 측정 시작 (250/1,250)</p>
                                    </div>
                                    <div className="rounded-lg overflow-hidden border border-indigo-500/20">
                                        <Image
                                            src="/images/blog/testworld-23rd-anniversary/hunt-time-2.png"
                                            alt="드림 이터 1,250마리(침식 1회) 측정 완료"
                                            width={600}
                                            height={300}
                                            className="w-full h-auto"
                                        />
                                        <p className="text-[10px] text-slate-500 text-center py-1 bg-slate-900">▲ 드림 이터 1,250마리(침식 1회분) 소요: 약 4분</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <p className="text-white font-bold text-xs sm:text-sm">⏱️ 주간 숙제(25,000마리) 완료 시간 계산</p>
                                    <div className="bg-indigo-900/40 border border-indigo-500/30 rounded-lg p-3 space-y-2">
                                        <div className="flex justify-between text-xs sm:text-sm">
                                            <span className="text-slate-200">1,000마리당 소요 시간</span>
                                            <span className="text-cyan-400 font-bold underline underline-offset-4 decoration-cyan-500/30">약 4분</span>
                                        </div>
                                        <div className="flex justify-between text-xs sm:text-sm">
                                            <span className="text-slate-200">25,000마리 산출식</span>
                                            <span className="text-white font-medium italic">25 × 4분 = 100분</span>
                                        </div>
                                        <div className="border-t border-indigo-500/40 pt-2 flex justify-between items-center text-sm sm:text-base">
                                            <span className="text-white font-black">최종 소요 시간</span>
                                            <span className="text-yellow-300 font-black drop-shadow-[0_0_5px_rgba(253,224,71,0.3)]">1시간 40분</span>
                                        </div>
                                    </div>
                                    <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                                        • 악몽의 근원 처치 및 침식 발동 대기 시간까지 포함하면 대략 <span className="text-white font-black">1재획(2시간)</span> 정도 소요될 것으로 예상됩니다.<br />
                                        • <span className="text-slate-400 italic">(기준 : 카르시온 사냥터 숨이 멎는 소리 동굴 4)</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ────── 단락 3: 주간 미션 ────── */}
                        <div className="mb-6">
                            <h3 className="text-base font-black text-slate-200 mb-3 flex items-center gap-2">
                                <span className="px-2 py-0.5 bg-pink-900/60 rounded-md text-xs text-pink-300 font-bold">⑦ ~ ⑨</span>
                                주간·시즌 미션 — EXP의 또 다른 거대한 원천
                            </h3>
                            {/* 미션 이미지 추가 */}
                            <div className="mb-4 rounded-xl overflow-hidden border border-pink-500/20 shadow-lg shadow-black/50">
                                <img 
                                    src="/images/blog/change-burning-lucid-guide/missions.png" 
                                    alt="주간 미션 및 시즌 미션 UI" 
                                    className="w-full h-auto object-cover"
                                />
                            </div>

                            <div className="bg-slate-900/60 border border-pink-500/30 rounded-xl p-4 text-sm text-slate-300 leading-relaxed mb-3">
                                <p><span className="text-white font-bold">주간 미션을 1주 올클리어</span>하면 약 <span className="text-pink-300 font-bold">6조 3천억(LV.289 기준)</span>의 경험치가 지급됩니다. 이는 주간 사냥(④~⑥ 합산 약 2조 7천억)보다 <span className="text-yellow-300 font-bold">2배 이상</span> 많은 양입니다.</p>
                                <ul className="mt-2.5 space-y-1.5">
                                    <li><span className="text-white font-bold">⑦ 주간 미션 1주 올클리어:</span> 미션 EXP만으로 약 6조 3천억</li>
                                    <li><span className="text-white font-bold">⑧ 13주 누적 올클리어:</span> 위 × 13주 = 약 82조 4천억</li>
                                    <li><span className="text-white font-bold">⑨ 시즌 미션 올클리어:</span> 이벤트 기간 내 1회성 보상 약 22조 6천억</li>
                                </ul>
                            </div>

                            <div className="overflow-x-auto rounded-xl border border-slate-700 mb-3">
                                <table className="w-full text-xs sm:text-sm whitespace-nowrap">
                                    <thead>
                                        <tr className="bg-pink-900/40 text-pink-200 text-xs">
                                            <th className="px-4 py-2.5 text-left font-bold w-[250px]">분류</th>
                                            <th className="px-4 py-2.5 text-right font-bold w-[200px]">LV.289</th>
                                            <th className="px-4 py-2.5 text-right font-bold w-[200px]">LV.290</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-700/50">
                                        <tr className="bg-pink-900/20 border-t-2 border-pink-500/50">
                                            <td className="px-4 py-3 font-black text-pink-300">미션 보상 경험치 합계 <span className="text-pink-400/80 font-normal text-xs">(⑧+⑨)</span></td>
                                            <td className="px-4 py-3 text-right">
                                                <p className="font-mono font-bold text-pink-200">105,094,816,800,000</p>
                                                <p className="text-[11px] text-pink-300/70 mt-0.5">약 105조 948억</p>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <p className="font-mono font-bold text-pink-200">124,104,769,200,000</p>
                                                <p className="text-[11px] text-pink-300/70 mt-0.5">약 124조 1,047억</p>
                                            </td>
                                        </tr>
                                        <tr className="bg-slate-800/40">
                                            <td className="px-4 py-3 font-bold text-slate-300">미션 완료만으로 오르는 %</td>
                                            <td className="px-4 py-3 text-right">
                                                <span className="inline-block px-2 py-1 bg-green-900/30 border border-green-500/40 text-green-400 font-bold rounded text-xs">
                                                    🚀 약 72.13% 상승
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <span className="inline-block px-2 py-1 bg-green-900/30 border border-green-500/40 text-green-400 font-bold rounded text-xs">
                                                    🚀 약 42.17% 상승
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="bg-pink-900/20 border border-pink-500/30 rounded-xl px-4 py-3 text-xs text-pink-200">
                                💡 미션은 주 1회 초기화되므로 매주 빠짐없이 올클리어하는 것이 핵심입니다. 미션 EXP가 사냥 EXP보다 훨씬 크기 때문에 미션을 우선시하세요!
                            </div>
                        </div>

                        {/* ────── 단락 4: 최종 결산 ────── */}
                        <div className="mb-8">
                            <h3 className="text-base font-black text-slate-200 mb-3 flex items-center gap-2">
                                <span className="px-2 py-0.5 bg-yellow-900/60 rounded-md text-xs text-yellow-300 font-bold">⑩ ~ ⑫</span>
                                최종 결산 — 이벤트 13주 동안 얼마나 성장할까?
                            </h3>
                            <div className="grid sm:grid-cols-3 gap-3 mb-3">
                                {[
                                    { label: '⑩ 순수 미션 합산', sub: '⑧ + ⑨', lv289: '약 105조 948억', lv290: '약 124조 1,047억', up289: '+72.13%', up290: '+42.17%', color: 'border-yellow-500/40 bg-yellow-900/15' },
                                    { label: '🔥 ⑪ 1주 단기 결산', sub: '사냥 + 미션 합산', lv289: '약 9조 598억', lv290: '약 10조 6,986억', up289: '매주 +6.22%', up290: '매주 +3.64%', color: 'border-orange-500/50 bg-orange-900/25' },
                                    { label: '🔥 ⑫ 13주 졸업 결산', sub: '(사냥 × 13) + ⑧ + ⑨', lv289: '약 140조 4,284억', lv290: '약 165조 8,296억', up289: '+96.38% 성장', up290: '+56.35% 성장', color: 'border-yellow-400/60 bg-gradient-to-br from-orange-900/30 to-yellow-900/20' },
                                ].map((item, i) => (
                                    <div key={i} className={`rounded-xl border p-3 ${item.color}`}>
                                        <p className="text-yellow-200 font-black text-xs mb-0.5">{item.label}</p>
                                        <p className="text-slate-500 text-[10px] mb-2">{item.sub}</p>
                                        <div className="space-y-1.5">
                                            <div>
                                                <p className="text-[10px] text-slate-400">LV.289</p>
                                                <p className="text-yellow-300 font-bold text-xs">{item.lv289}</p>
                                                <p className="text-green-400 text-xs font-black">🚀 {item.up289}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-slate-400">LV.290</p>
                                                <p className="text-yellow-300 font-bold text-xs">{item.lv290}</p>
                                                <p className="text-green-400 text-xs font-black">🚀 {item.up290}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl px-4 py-3 text-xs text-yellow-200">
                                🎯 13주 동안 매주 사냥 풀파밍 + 미션 올클리어를 유지하면 <span className="text-white font-black">LV.289 기준 약 96%, LV.290 기준 약 56%</span>의 경험치 상승을 기대할 수 있습니다!
                            </div>
                        </div>

                        {/* ────── 전체 데이터 표 ────── */}
                        <div className="mb-4">
                            <h3 className="text-base font-black text-slate-200 mb-3 flex items-center gap-2">
                                <span className="text-orange-400">📋</span> 전체 수치 표
                                <span className="text-xs text-slate-500 font-normal">(LV.289 / LV.290 기준)</span>
                            </h3>
                            <div className="flex flex-wrap gap-2 mb-3">
                                <span className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900/60 rounded-lg px-2.5 py-1.5 border border-slate-700"><span className="w-2.5 h-2.5 rounded-sm bg-slate-700 inline-block"></span> 기본 단위</span>
                                <span className="flex items-center gap-1.5 text-xs text-orange-200 bg-orange-900/30 rounded-lg px-2.5 py-1.5 border border-orange-500/40"><span className="w-2.5 h-2.5 rounded-sm bg-orange-500/60 inline-block"></span> 🔥 핵심 항목</span>
                                <span className="flex items-center gap-1.5 text-xs text-yellow-200 bg-yellow-900/30 rounded-lg px-2.5 py-1.5 border border-yellow-500/40"><span className="w-2.5 h-2.5 rounded-sm bg-yellow-500/60 inline-block"></span> 🚀 누적/결산 항목</span>
                            </div>
                        </div>

                        {/* 테이블 */}
                        <div className="overflow-x-auto rounded-xl border border-slate-700">
                            <table className="w-full text-xs sm:text-sm whitespace-nowrap">
                                <thead>
                                    <tr className="bg-slate-800 text-slate-400 text-xs">
                                        <th className="px-4 py-2.5 text-left font-bold w-[300px]">분류 (전체 정리)</th>
                                        <th className="px-4 py-2.5 text-right font-bold w-[220px]">LV.289 획득 경험치</th>
                                        <th className="px-4 py-2.5 text-right font-bold w-[220px]">LV.290 획득 경험치</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700/50">
                                    {/* 1. 기본 단위 */}
                                    <tr className="bg-slate-800/60">
                                        <td className="px-4 py-3 font-black text-slate-200">① 드림 이터 <span className="text-slate-500 font-normal text-xs">(1마리)</span></td>
                                        <td className="px-4 py-3 text-right">
                                            <p className="font-mono font-bold text-slate-200">75,499,155</p>
                                            <p className="text-[11px] text-slate-400 mt-0.5"><span className="text-cyan-300">× 17.7배</span></p>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <p className="font-mono font-bold text-slate-200">89,155,715</p>
                                            <p className="text-[11px] text-slate-400 mt-0.5"><span className="text-cyan-300">× 18.6배</span></p>
                                        </td>
                                    </tr>
                                    <tr className="bg-orange-900/20">
                                        <td className="px-4 py-3 font-black text-orange-200">② 악몽 침식(끄나풀) <span className="text-orange-300/60 font-normal text-xs">(1마리)</span></td>
                                        <td className="px-4 py-3 text-right">
                                            <p className="font-mono font-bold text-orange-200">196,297,804</p>
                                            <p className="text-[11px] text-orange-300/70 mt-0.5"><span className="text-orange-300">× 46.02배</span></p>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <p className="font-mono font-bold text-orange-200">231,804,858</p>
                                            <p className="text-[11px] text-orange-300/70 mt-0.5"><span className="text-orange-300">× 48.36배</span></p>
                                        </td>
                                    </tr>
                                    <tr className="bg-red-900/15">
                                        <td className="px-4 py-3 font-black text-red-200">③ 악몽의 근원 <span className="text-red-300/60 font-normal text-xs">(1회)</span></td>
                                        <td className="px-4 py-3 text-right">
                                            <p className="font-mono font-bold text-red-200">2,264,974,659</p>
                                            <p className="text-[11px] text-red-300/70 mt-0.5"><span className="text-red-300">× 531배</span></p>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <p className="font-mono font-bold text-red-200">2,674,671,444</p>
                                            <p className="text-[11px] text-red-300/70 mt-0.5"><span className="text-red-300">× 558배</span></p>
                                        </td>
                                    </tr>

                                    {/* 2. 주간 사냥 */}
                                    <tr className="bg-indigo-900/40 text-indigo-300">
                                        <td colSpan={3} className="px-4 py-1.5 text-xs font-black tracking-widest text-center">— 주간 사냥 —</td>
                                    </tr>
                                    <tr className="bg-slate-800/60">
                                        <td className="px-4 py-3 font-black text-slate-200">④ 드림 이터 <span className="text-slate-500 font-normal text-xs">(주간 25,000마리)</span></td>
                                        <td className="px-4 py-3 text-right">
                                            <p className="font-mono font-bold text-slate-200">1,887,478,875,000</p>
                                            <p className="text-[11px] text-slate-400 mt-0.5">약 1조 8,874억</p>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <p className="font-mono font-bold text-slate-200">2,228,892,875,000</p>
                                            <p className="text-[11px] text-slate-400 mt-0.5">약 2조 2,288억</p>
                                        </td>
                                    </tr>
                                    <tr className="bg-orange-900/20 border-l-2 border-orange-500/50">
                                        <td className="px-4 py-3 font-black text-orange-200">🔥 ⑤ 악몽 침식 <span className="text-orange-300/60 font-normal text-xs">(주간 4,000마리)</span></td>
                                        <td className="px-4 py-3 text-right">
                                            <p className="font-mono font-bold text-orange-200">785,191,216,000</p>
                                            <p className="text-[11px] text-orange-300/70 mt-0.5">약 7,851억</p>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <p className="font-mono font-bold text-orange-200">927,219,432,000</p>
                                            <p className="text-[11px] text-orange-300/70 mt-0.5">약 9,272억</p>
                                        </td>
                                    </tr>
                                    <tr className="bg-slate-800/60">
                                        <td className="px-4 py-3 font-black text-red-200">⑥ 악몽의 근원 <span className="text-red-300/60 font-normal text-xs">(주간 20회)</span></td>
                                        <td className="px-4 py-3 text-right">
                                            <p className="font-mono font-bold text-slate-200">45,299,493,180</p>
                                            <p className="text-[11px] text-slate-400 mt-0.5">약 452억</p>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <p className="font-mono font-bold text-slate-200">53,493,428,880</p>
                                            <p className="text-[11px] text-slate-400 mt-0.5">약 534억</p>
                                        </td>
                                    </tr>

                                    {/* 3. 주간 미션 */}
                                    <tr className="bg-pink-900/40 text-pink-300">
                                        <td colSpan={3} className="px-4 py-1.5 text-xs font-black tracking-widest text-center">— 주·시즌 미션 —</td>
                                    </tr>
                                    <tr className="bg-pink-900/10">
                                        <td className="px-4 py-3 font-black text-pink-200">⑦ 주간 미션 <span className="text-pink-300/50 font-normal text-xs">(1주 올클리어)</span></td>
                                        <td className="px-4 py-3 text-right">
                                            <p className="font-mono font-bold text-pink-200">6,341,928,600,000</p>
                                            <p className="text-[11px] text-pink-300/70 mt-0.5">약 6조 3,419억</p>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <p className="font-mono font-bold text-pink-200">7,489,080,900,000</p>
                                            <p className="text-[11px] text-pink-300/70 mt-0.5">약 7조 4,890억</p>
                                        </td>
                                    </tr>
                                    <tr className="bg-pink-900/15">
                                        <td className="px-4 py-3 font-black text-pink-200">⑧ 주간 미션 <span className="text-pink-300/50 font-normal text-xs">(13주 누적 올클리어)</span></td>
                                        <td className="px-4 py-3 text-right">
                                            <p className="font-mono font-bold text-pink-200">82,445,071,800,000</p>
                                            <p className="text-[11px] text-pink-300/70 mt-0.5">약 82조 4,450억</p>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <p className="font-mono font-bold text-pink-200">97,358,051,700,000</p>
                                            <p className="text-[11px] text-pink-300/70 mt-0.5">약 97조 3,580억</p>
                                        </td>
                                    </tr>
                                    <tr className="bg-pink-900/20">
                                        <td className="px-4 py-3 font-black text-pink-200">⑨ 시즌 미션 <span className="text-pink-300/50 font-normal text-xs">(이벤트 기간 1회 보상)</span></td>
                                        <td className="px-4 py-3 text-right">
                                            <p className="font-mono font-bold text-pink-200">22,649,745,000,000</p>
                                            <p className="text-[11px] text-pink-300/70 mt-0.5">약 22조 6,497억</p>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <p className="font-mono font-bold text-pink-200">26,746,717,500,000</p>
                                            <p className="text-[11px] text-pink-300/70 mt-0.5">약 26조 7,467억</p>
                                        </td>
                                    </tr>

                                    {/* 4. 최종 결산 */}
                                    <tr className="bg-yellow-900/40 text-yellow-300">
                                        <td colSpan={3} className="px-4 py-1.5 text-xs font-black tracking-widest text-center">— 최종 결산 —</td>
                                    </tr>
                                    {/* ⑩ 최종 미션 보상 */}
                                    <tr className="bg-yellow-900/10">
                                        <td className="px-4 py-3 font-black text-yellow-200">⑩ 최종 미션 합계 <span className="text-yellow-300/50 font-normal text-xs">(⑧+⑨ 순수 미션)</span></td>
                                        <td className="px-4 py-3 text-right">
                                            <p className="font-mono font-bold text-yellow-200">105,094,816,800,000</p>
                                            <p className="text-[11px] text-yellow-400/60 mt-0.5">약 105조 948억</p>
                                            <span className="inline-block mt-1 px-1.5 py-0.5 bg-green-900/40 text-[10px] font-bold text-green-400 rounded">🚀 +72.13% 상승</span>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <p className="font-mono font-bold text-yellow-200">124,104,769,200,000</p>
                                            <p className="text-[11px] text-yellow-400/60 mt-0.5">약 124조 1,047억</p>
                                            <span className="inline-block mt-1 px-1.5 py-0.5 bg-green-900/40 text-[10px] font-bold text-green-400 rounded">🚀 +42.17% 상승</span>
                                        </td>
                                    </tr>
                                    {/* ⑪ 1주일 단기 결산 */}
                                    <tr className="bg-green-900/20 border-l-2 border-green-500/50">
                                        <td className="px-4 py-3 font-black text-green-300">🔥 ⑪ 1주일 단기 결산 <span className="text-green-400/60 font-normal text-xs block mt-1">(④+⑤+⑥+⑦) 사냥+미션</span></td>
                                        <td className="px-4 py-3 text-right">
                                            <p className="font-mono font-bold text-green-200">9,059,898,184,180</p>
                                            <p className="text-[11px] text-green-400/60 mt-0.5">약 9조 598억</p>
                                            <span className="inline-block mt-1 px-1.5 py-0.5 bg-green-900/60 text-[10px] font-bold text-green-300 border border-green-600/50 rounded">🚀 매주 +6.22% 성장</span>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <p className="font-mono font-bold text-green-200">10,698,686,635,880</p>
                                            <p className="text-[11px] text-green-400/60 mt-0.5">약 10조 6,986억</p>
                                            <span className="inline-block mt-1 px-1.5 py-0.5 bg-green-900/60 text-[10px] font-bold text-green-300 border border-green-600/50 rounded">🚀 매주 +3.64% 성장</span>
                                        </td>
                                    </tr>
                                    {/* ⑫ 13주 최종 졸업 결산 */}
                                    <tr className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-l-2 border-yellow-400">
                                        <td className="px-4 py-4 font-black text-yellow-300 text-base">
                                            🔥 ⑫ 13주 최종 졸업 결산 🔥<span className="text-yellow-400/60 font-normal text-[11px] block mt-1">((④+⑤+⑥) × 13주) + ⑧ + ⑨</span>
                                        </td>
                                        <td className="px-4 py-4 text-right">
                                            <p className="font-mono font-black text-yellow-300 text-base">140,428,421,394,340</p>
                                            <p className="text-xs text-yellow-400/80 mt-0.5 mb-1.5">약 140조 4,284억</p>
                                            <span className="inline-block px-2 py-1 bg-yellow-900/60 text-xs font-black text-yellow-300 border border-yellow-600/50 rounded-lg shadow-inner">🏆 +96.38% 성장!</span>
                                        </td>
                                        <td className="px-4 py-4 text-right">
                                            <p className="font-mono font-black text-yellow-300 text-base">165,829,643,766,440</p>
                                            <p className="text-xs text-yellow-400/80 mt-0.5 mb-1.5">약 165조 8,296억</p>
                                            <span className="inline-block px-2 py-1 bg-yellow-900/60 text-xs font-black text-yellow-300 border border-yellow-600/50 rounded-lg shadow-inner">🏆 +56.35% 성장!</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>


                        {/* 경험치 도핑 안내 + 표 미반영 안내 */}
                        <div className="mt-3 space-y-3">
                            {/* 경험치 도핑 안내 */}
                            <div className="bg-blue-900/20 border border-blue-500/40 rounded-xl p-4">
                                <p className="text-blue-300 font-black text-sm mb-2 flex items-center gap-2">
                                    <span>💊</span> 경험치 도핑 & 버프 적용 안내
                                </p>
                                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                                    <div>
                                        <p className="text-red-300 font-bold mb-1.5">❌ 경험치 효과 적용 안 됨</p>
                                        <ul className="space-y-1 text-slate-300">
                                            <li className="flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></span>
                                                드림 이터
                                            </li>
                                            <li className="flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></span>
                                                악몽 침식 (끄나풀)
                                            </li>
                                            <li className="flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></span>
                                                악몽의 근원
                                            </li>
                                        </ul>
                                        <p className="text-slate-500 mt-1.5">※ 위 3종은 어떤 경험치 버프·도핑을 사용해도 추가 경험치가 적용되지 않습니다.</p>
                                    </div>
                                    <div>
                                        <p className="text-green-300 font-bold mb-1.5">✅ 경험치 효과 적용 됨!</p>
                                        <ul className="space-y-1 text-slate-300">
                                            <li className="flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"></span>
                                                일반 필드 몬스터 <span className="text-slate-500">(루시드 변신 상태로 사냥)</span>
                                            </li>
                                        </ul>
                                        <div className="mt-2 text-slate-300">
                                            루시드로 변신한 상태에서 <span className="text-white font-bold">일반 필드 몬스터</span>를 사냥하면 경험치 도핑이 그대로 적용됩니다.
                                            <div className="mt-2.5 bg-green-500/20 border border-green-500/40 rounded-lg p-3 text-center shadow-lg shadow-green-900/20">
                                                <p className="text-sm font-black text-green-300">본캐 레벨업을 더 빨리 하고 싶다면</p>
                                                <p className="text-sm font-bold text-green-100 mt-1">경험치 3배 쿠폰·정령의 펜던트·VIP경험치 버프 등 <span className="text-yellow-300">모든 버프를 챙기고 사냥하세요!</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 표 미반영 안내 */}
                            <div className="bg-purple-900/20 border border-purple-500/40 rounded-xl p-4">
                                <p className="text-purple-300 font-black text-sm mb-2 flex items-center gap-2">
                                    <span>⚠️</span> 이 표에 포함되지 않은 추가 경험치
                                </p>
                                <p className="text-slate-300 text-xs leading-relaxed">
                                    위 표는 <span className="text-white font-bold">드림 이터·악몽 침식·악몽의 근원·주간 미션·시즌 미션</span>의 EXP만 계산한 수치입니다.<br />
                                    루시드로 변신한 상태에서 사냥하는 <span className="text-yellow-300 font-bold">일반 필드 몬스터 경험치는 포함되어 있지 않습니다.</span>
                                </p>
                                <div className="mt-2.5 bg-purple-900/30 rounded-lg px-3 py-2 text-xs text-purple-200">
                                    🚀 즉, <span className="text-white font-black">실제로 얻을 수 있는 총 경험치는 이 표보다 훨씬 많습니다!</span><br />
                                    드림 이터 사냥 중 틈틈이 일반 몬스터도 처치하면서 경험치 도핑까지 챙기면 훨씬 더 빠른 레벨업이 가능합니다.
                                </div>
                            </div>
                        </div>

                        {/* LV.295 추가 분석 표 */}
                        <div className="bg-slate-900/80 border border-cyan-500/40 rounded-xl overflow-hidden mt-8 shadow-xl shadow-cyan-900/20">
                            <div className="bg-cyan-900/30 p-4 border-b border-cyan-500/30 text-center sm:text-left">
                                <h3 className="text-lg font-black text-cyan-300 mb-1">
                                    📊 LV.295 체인지 버닝 : 루시드 이벤트 최종 분석표
                                </h3>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs">
                                    <span className="text-cyan-100">기준 레벨: <strong className="text-white">LV.295</strong> <span className="text-cyan-400/80">(필요 경험치: 870,403,132,500,696)</span></span>
                                    <span className="hidden sm:inline-block text-cyan-500/50">|</span>
                                    <span className="text-cyan-100">기본 몬스터 경험치: <strong className="text-white">5,643,220</strong> <span className="text-cyan-400/80">(기어드락 기준)</span></span>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-xs sm:text-sm text-left whitespace-nowrap">
                                    <thead>
                                        <tr className="bg-cyan-900/20 text-cyan-400 border-b border-cyan-500/30">
                                            <th className="px-4 py-3 font-bold w-[120px]">분류</th>
                                            <th className="px-4 py-3 font-bold">세부 항목</th>
                                            <th className="px-4 py-3 font-bold text-right">획득 경험치 (EXP)</th>
                                            <th className="px-4 py-3 font-bold text-right">일반 몹 환산 / 상승률</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-cyan-900/30 border-b-2 border-cyan-500/30">
                                        <tr className="hover:bg-cyan-900/10 transition-colors">
                                            <td className="px-4 py-3 font-bold text-slate-300">[1] 몬스터 배율</td>
                                            <td className="px-4 py-3 text-slate-300">드림 이터 / 침식 / 근원</td>
                                            <td className="px-4 py-3 text-right font-mono text-cyan-100">1.04억 / 2.72억 / 31.4억</td>
                                            <td className="px-4 py-3 text-right font-mono text-cyan-300">18.6배 / 48.3배 / 558배</td>
                                        </tr>
                                        <tr className="hover:bg-cyan-900/10 transition-colors">
                                            <td className="px-4 py-3 font-bold text-slate-300">[2] 주간 사냥</td>
                                            <td className="px-4 py-3 text-slate-300">주간 2.5만 마리 사냥<span className="text-slate-500 text-[11px] block">(이터+침식+근원)</span></td>
                                            <td className="px-4 py-3 text-right font-mono font-bold text-cyan-100">약 3조 7,787억</td>
                                            <td className="px-4 py-3 text-right text-slate-300">일반 몹 66.9만 마리 분량<span className="block text-green-400 font-bold mt-0.5">(매주 +0.43%)</span></td>
                                        </tr>
                                        <tr className="hover:bg-cyan-900/10 transition-colors">
                                            <td className="px-4 py-3 font-bold text-slate-300">[3] 주간 보상</td>
                                            <td className="px-4 py-3 text-slate-300">주간 미션 <span className="text-slate-500 text-[11px]">(1주 차)</span></td>
                                            <td className="px-4 py-3 text-right font-mono font-bold text-cyan-100">약 8조 8,169억</td>
                                            <td className="px-4 py-3 text-right text-slate-300">일반 몹 156만 마리 분량<span className="block text-green-400 font-bold mt-0.5">(매주 +1.01%)</span></td>
                                        </tr>
                                        <tr className="bg-cyan-900/20 border-l-2 border-cyan-400">
                                            <td className="px-4 py-3 font-black text-cyan-200">[4] 1주일 합계</td>
                                            <td className="px-4 py-3 text-cyan-100">[2] 사냥 + [3] 보상</td>
                                            <td className="px-4 py-3 text-right font-mono font-bold text-yellow-300">약 12조 5,956억</td>
                                            <td className="px-4 py-3 text-right"><span className="inline-block bg-green-900/40 text-green-400 border border-green-500/30 px-2 py-1 rounded text-xs font-black">🚀 매주 총 +1.44% 상승</span></td>
                                        </tr>
                                    </tbody>
                                    <tbody className="divide-y divide-cyan-900/30">
                                        <tr className="bg-blue-900/10 hover:bg-blue-900/20 transition-colors">
                                            <td className="px-4 py-3 font-bold text-blue-200">[5] 미션 총합</td>
                                            <td className="px-4 py-3 text-slate-300">13주 주간 + 시즌 미션</td>
                                            <td className="px-4 py-3 text-right font-mono font-bold text-blue-200">약 146조 1,097억</td>
                                            <td className="px-4 py-3 text-right text-green-400 font-bold">순수 보상만 +16.78%</td>
                                        </tr>
                                        <tr className="bg-gradient-to-r from-cyan-900/40 to-blue-900/30 border-l-2 border-blue-400">
                                            <td className="px-4 py-4 font-black text-yellow-300">[6] 최종 졸업</td>
                                            <td className="px-4 py-4 text-yellow-100">13주 사냥 + 모든 미션</td>
                                            <td className="px-4 py-4 text-right">
                                                <span className="font-mono font-black text-yellow-300 text-sm block">약 195조 2,328억</span>
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <span className="inline-block bg-yellow-900/60 text-yellow-300 border border-yellow-500/50 px-2 py-1.5 rounded-lg shadow font-black">🏆 최종 합계 +22.43%</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* 표 출처 표시 */}
                            <div className="bg-cyan-950/30 px-4 py-2.5 border-t border-cyan-900/50 flex justify-end">
                                <a 
                                    href="https://www.inven.co.kr/board/maple/2304/47101" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-xs font-medium text-cyan-300/80 hover:text-cyan-200 transition-colors hover:underline underline-offset-2 inline-flex items-center gap-1"
                                >
                                    자료 참고: 메이플 인벤 '법사캐' 님의 글
                                </a>
                            </div>
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
                            <p className="text-slate-700 text-xs text-center leading-relaxed">
                                #체인지버닝루시드 #메이플스토리23주년 #루시드이벤트 #악몽의숲 #드림샤드샵 #몽환의장비 #몽환의시련 #악몽제어 #드림이터<br />
                                #체인지버닝루시드효율 #체인지버닝루시드공략 #버닝루시드공략 #버닝루시드효율 #루시드버닝공략 #루시드버닝효율 #루시드버닝본캐 #루시드버닝부캐<br />
                                #메이플23주년 #메이플23주년이벤트 #메이플폭업 #메이플경험치이벤트 #루시드경험치 #드림패스 #악몽침식 #악몽의끄나풀<br />
                                #몽환의장비옵션 #몽환의결정 #악몽의드림캐쳐 #숲의근원 #루시드변신 #루시드스킬 #루시드코디 #루시드데미지스킨
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
