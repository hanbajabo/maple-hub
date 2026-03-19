'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowLeft, ShoppingCart, TrendingUp, Settings, Sword, Code2, AlertTriangle, CheckCircle, XCircle, ArrowUpCircle, Info } from 'lucide-react';
import { InArticleAd } from '@/components/AdSense';

export default function March19PatchnoteChanges2026Page() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pb-20">
            {/* Header */}
            <header className="w-full max-w-7xl flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4 sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 mx-auto">
                <Link href="/blog" className="flex items-center gap-2 hover:opacity-80 transition-opacity text-purple-400">
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-base md:text-lg font-bold">블로그로 돌아가기</span>
                </Link>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Title Section */}
                <div className="mb-8 sm:mb-12">
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                        <span className="text-sm sm:text-base text-slate-400">2026년 3월 19일</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6 leading-tight">
                        <span className="text-3xl mr-2">📋</span>
                        <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                            3월 19일 본섭 패치노트 핵심 변경사항 총정리
                        </span>
                    </h1>

                    <p className="text-sm sm:text-base md:text-lg text-slate-300 mb-6 leading-relaxed break-keep">
                        본섭 패치노트로 넘어오면서 변경되거나 기습 추가된 핵심 내용들을 한눈에 파악하기 쉽게 카테고리별로 총정리해 드립니다. 콘텐츠 대본 작성이나 사이트 데이터 갱신에 바로 활용하실 수 있도록 구성했습니다.
                    </p>

                    {/* 목차 */}
                    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 mb-6">
                        <p className="text-sm font-bold text-slate-300 mb-3">📑 목차</p>
                        <ol className="space-y-1.5 text-sm">
                            <li><a href="#economy" className="flex items-center gap-2 text-yellow-300 hover:text-yellow-200 transition-colors"><span className="text-slate-500">01</span> 💰 아이템 시세 및 경제 관련 (핵심 파급력)</a></li>
                            <li><a href="#event" className="flex items-center gap-2 text-pink-300 hover:text-pink-200 transition-colors"><span className="text-slate-500">02</span> 📈 메인 이벤트: 체인지 버닝 루시드</a></li>
                            <li><a href="#system" className="flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition-colors"><span className="text-slate-500">03</span> 🛠️ 시스템 및 편의성</a></li>
                            <li><a href="#boss" className="flex items-center gap-2 text-red-300 hover:text-red-200 transition-colors"><span className="text-slate-500">04</span> ⚔️ 보스 및 직업 스킬</a></li>
                            <li><a href="#api" className="flex items-center gap-2 text-green-300 hover:text-green-200 transition-colors"><span className="text-slate-500">05</span> 💻 Open API 업데이트</a></li>
                        </ol>
                    </div>
                </div>

                {/* ① 아이템 시세 및 경제 */}
                <section id="economy" className="mb-12 lg:mb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <ShoppingCart className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400" />
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400">
                            1. 아이템 시세 및 경제 관련
                        </h2>
                    </div>
                    <p className="text-sm sm:text-base text-slate-400 mb-6 ml-1 break-keep">
                        시장 경제와 유저들의 스펙업 메타에 직접적인 영향을 미치는 가장 중요한 변경점들입니다.
                    </p>

                    {/* 전승 스크롤 */}
                    <div className="bg-yellow-900/15 border border-yellow-500/40 rounded-2xl p-5 sm:p-6 mb-5">
                        <h3 className="text-base sm:text-lg font-bold text-yellow-300 mb-4 flex items-center gap-2">
                            <ArrowUpCircle className="w-5 h-5 shrink-0" />
                            전승 스크롤 거래 가능 및 리스크 추가
                        </h3>
                        
                        {/* 전승 스크롤 이미지 */}
                        <div className="mb-6 rounded-xl border border-slate-700 shadow-xl shadow-yellow-900/10 bg-slate-900/50 flex justify-center p-4">
                            <Image
                                src="/images/blog/march-19-patchnote-changes-2026/transfer-scroll.png"
                                alt="잠재능력 전승 스크롤 아이템 상세 설명"
                                width={600}
                                height={800}
                                className="max-w-full h-auto rounded-lg shadow-lg"
                            />
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="bg-slate-800/60 rounded-xl p-4 text-sm">
                                <p className="font-bold text-green-400 mb-1.5 flex items-center gap-1.5"><CheckCircle className="w-4 h-4" /> 교환</p>
                                <p className="text-slate-300">구매 후 <span className="font-bold text-white">1회 교환 가능</span> (유저 간 거래 활성화 예상)</p>
                            </div>
                            <div className="bg-slate-800/60 rounded-xl p-4 text-sm">
                                <p className="font-bold text-red-400 mb-1.5 flex items-center gap-1.5"><XCircle className="w-4 h-4" /> 파괴</p>
                                <p className="text-slate-300">추옵/잠재능력 추출 시 <span className="font-bold text-white">원본 장비 즉시 파괴</span></p>
                            </div>
                            <div className="bg-slate-800/60 rounded-xl p-4 text-sm">
                                <p className="font-bold text-red-400 mb-1.5 flex items-center gap-1.5"><XCircle className="w-4 h-4" /> 재추출 불가</p>
                                <p className="text-slate-300">한 번 전승받은 장비는 <span className="font-bold text-white">두 번 다시 추출 불가</span></p>
                            </div>
                            <div className="bg-slate-800/60 rounded-xl p-4 text-sm">
                                <p className="font-bold text-orange-400 mb-1.5 flex items-center gap-1.5"><AlertTriangle className="w-4 h-4" /> 가위 제한</p>
                                <p className="text-slate-300">가위 무제한 장비(파퀘 등)에 전승 시 <span className="font-bold text-white">가위 횟수 10회로 강제 고정</span></p>
                            </div>
                        </div>
                    </div>

                    {/* 메멘토 큐브 */}
                    <div className="bg-purple-900/15 border border-purple-500/40 rounded-2xl p-5 sm:p-6 mb-5">
                        <h3 className="text-base sm:text-lg font-bold text-purple-300 mb-4 flex items-center gap-2">
                            <Info className="w-5 h-5 shrink-0" />
                            신규 큐브(메멘토) 획득 및 사용 제한
                        </h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex gap-3 bg-slate-800/60 rounded-xl p-4">
                                <span className="shrink-0 text-purple-400 font-bold mt-0.5">📌</span>
                                <div>
                                    <p className="font-bold text-white mb-1">드랍률 고정</p>
                                    <p className="text-slate-300">보스 드랍 신규 큐브 3종은 아이템 드롭률 증가(아획) 수치에 <span className="text-red-300 font-bold">영향 받지 않고 개수 고정</span></p>
                                </div>
                            </div>
                            <div className="flex gap-3 bg-slate-800/60 rounded-xl p-4">
                                <span className="shrink-0 text-red-400 font-bold mt-0.5">🚫</span>
                                <div>
                                    <p className="font-bold text-white mb-1">전승 불가</p>
                                    <p className="text-slate-300">메멘토 각인이 적용된 장비는 <span className="text-red-300 font-bold">장비 전승 시스템 이용 원천 차단</span></p>
                                </div>
                            </div>
                        </div>

                        {/* 메멘토 각인 상세 규칙 */}
                        <div className="mt-4 bg-red-900/10 border border-red-500/20 rounded-xl p-4">
                            <p className="text-xs font-bold text-red-300 mb-3 flex items-center gap-1.5">
                                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                                메멘토 각인 상세 규칙
                            </p>
                            <ul className="space-y-2 text-xs text-slate-300">
                                <li className="flex gap-2">
                                    <span className="shrink-0 text-red-400 mt-0.5">▸</span>
                                    <span>메멘토 큐브 사용 시 장비에 <span className="font-bold text-white">&#39;메멘토 각인&#39;</span> 상태 부여 → 교환 속성 무관하게 <span className="font-bold text-red-300">30일간 거래 불가</span></span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="shrink-0 text-red-400 mt-0.5">▸</span>
                                    <span>메멘토 각인 장비에는 <span className="font-bold text-white">플래티넘/카르마/실버 카르마의 가위, 쉐어 네임 택 사용 불가</span></span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="shrink-0 text-red-400 mt-0.5">▸</span>
                                    <span>메멘토 각인 장비에는 <span className="font-bold text-white">장비 전승 시스템 이용 불가</span></span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="shrink-0 text-yellow-400 mt-0.5">↺</span>
                                    <span>이미 각인된 장비에 메멘토 큐브를 추가 사용 시, <span className="font-bold text-white">30일 타이머가 사용 시점 기준으로 갱신</span>됩니다.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* 🧊 메멘토 큐브 보스 드랍 및 확률 총정리 */}
                    <div className="bg-slate-800/40 border border-blue-500/30 rounded-2xl p-5 sm:p-6 mb-5">
                        <h3 className="text-base sm:text-lg font-bold text-blue-300 mb-5 flex items-center gap-2">
                            🧊 신규 아이템 &#39;메멘토 큐브&#39; 보스 드랍 및 확률 총정리
                        </h3>

                        {/* 등급업 확률 */}
                        <div className="mb-5">
                            <h4 className="text-sm font-bold text-blue-200 mb-3 flex items-center gap-2">
                                📊 1. 메멘토 큐브 등급업 및 옵션 확률
                            </h4>
                             <div className="mb-4 rounded-xl border border-slate-700 shadow-xl shadow-blue-900/10 bg-slate-900">
                                <Image
                                    src="/images/blog/march-19-patchnote-changes-2026/memento-cubes.png"
                                    alt="메멘토 브론즈 에디셔널 큐브 / 실버 큐브 / 골드 큐브 아이템 설명"
                                    width={1200}
                                    height={600}
                                    className="w-full h-auto"
                                    style={{ display: 'block' }}
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                                <div className="bg-slate-700/50 rounded-xl p-4 border border-orange-500/20">
                                    <p className="font-bold text-orange-300 mb-1.5">🥉 메멘토 브론즈 에디셔널 큐브</p>
                                    <p className="text-slate-400 text-xs">= <span className="text-white font-semibold">수상한 에디셔널 큐브</span>와 동일</p>
                                </div>
                                <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-400/20">
                                    <p className="font-bold text-slate-300 mb-1.5">🥈 메멘토 실버 큐브</p>
                                    <p className="text-slate-400 text-xs">= <span className="text-white font-semibold">장인의 큐브</span>와 동일</p>
                                </div>
                                <div className="bg-slate-700/50 rounded-xl p-4 border border-yellow-500/20">
                                    <p className="font-bold text-yellow-300 mb-1.5">🥇 메멘토 골드 큐브</p>
                                    <p className="text-slate-400 text-xs">= <span className="text-white font-semibold">명장의 큐브</span>와 동일</p>
                                </div>
                            </div>
                            <div className="mt-3 bg-orange-900/10 border border-orange-500/20 rounded-xl p-3 text-xs text-slate-400">
                                ※ 골드·실버·브론즈 에디셔널 큐브 모두 재설정 시 <span className="text-white font-semibold">&#39;기존 옵션&#39;과 &#39;재설정된 옵션&#39; 중 선택 가능</span>하나, <span className="text-red-300 font-semibold">등급 상승 보장 시스템(천장)은 적용되지 않습니다.</span>
                            </div>
                        </div>

                        {/* 보스 드랍 개수 표 */}
                        <div>
                            <h4 className="text-sm font-bold text-blue-200 mb-3 flex items-center gap-2">
                                ⚔️ 2. 메멘토 큐브 보스별 드랍 개수
                            </h4>
                            <div className="space-y-2 mb-3">
                                <div className="bg-blue-900/10 border border-blue-500/20 rounded-xl p-3 text-xs text-slate-400">
                                    ※ 큐브 보상의 개수는 <span className="text-white font-semibold">아이템 드롭률 증가(아획) 옵션과 무관하게 고정 획득</span>됩니다.
                                </div>
                                <div className="bg-red-900/10 border border-red-500/30 rounded-xl p-3 text-xs flex items-center gap-2">
                                    <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                                    <span className="text-slate-300">보스 드랍 메멘토 큐브는 <span className="font-bold text-red-300">착용 레벨 200 이하 아이템에만 사용 가능</span>합니다.</span>
                                </div>
                            </div>
                            <div className="overflow-x-auto rounded-xl border border-slate-700">
                                <table className="w-full text-xs sm:text-sm text-left min-w-[420px]">
                                    <thead className="bg-slate-800 text-slate-200">
                                        <tr>
                                            <th className="px-4 py-3">보스 난이도</th>
                                            <th className="px-3 py-3 text-center text-yellow-300 whitespace-nowrap">🥇 골드</th>
                                            <th className="px-3 py-3 text-center text-slate-300 whitespace-nowrap">🥈 실버</th>
                                            <th className="px-3 py-3 text-center text-orange-300 whitespace-nowrap">🥉 브론즈</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-700/50 bg-slate-900/40 text-slate-300">
                                        <tr>
                                            <td className="px-4 py-2.5 text-xs sm:text-sm">카루타, 하드 매그너스, 카오스 파풀라투스</td>
                                            <td className="px-3 py-2.5 text-center text-slate-500">0</td>
                                            <td className="px-3 py-2.5 text-center text-slate-500">0</td>
                                            <td className="px-3 py-2.5 text-center font-bold text-orange-300">1</td>
                                        </tr>
                                        <tr className="bg-slate-800/20">
                                            <td className="px-4 py-2.5 text-xs sm:text-sm">노말 스우, 노말 데미안, 노말 가엔슬, 이지 루시드, 이지 윌</td>
                                            <td className="px-3 py-2.5 text-center text-slate-500">0</td>
                                            <td className="px-3 py-2.5 text-center text-slate-500">0</td>
                                            <td className="px-3 py-2.5 text-center font-bold text-orange-300">3</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2.5 text-xs sm:text-sm">노말 루시드, 노말 윌, 노말 더스크, 노말 듄켈, 노말 진힐라</td>
                                            <td className="px-3 py-2.5 text-center text-slate-500">0</td>
                                            <td className="px-3 py-2.5 text-center text-slate-500">0</td>
                                            <td className="px-3 py-2.5 text-center font-bold text-orange-300">5</td>
                                        </tr>
                                        <tr className="bg-slate-800/20">
                                            <td className="px-4 py-2.5 text-xs sm:text-sm">하드 스우, 하드 데미안</td>
                                            <td className="px-3 py-2.5 text-center text-slate-500">0</td>
                                            <td className="px-3 py-2.5 text-center font-bold text-slate-300">1</td>
                                            <td className="px-3 py-2.5 text-center font-bold text-orange-300">6</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-2.5 text-xs sm:text-sm">하드 루시드, 하드 윌, 카오스 더스크, 하드 듄켈, 하드 진힐라, 카오스 가엔슬</td>
                                            <td className="px-3 py-2.5 text-center text-slate-500">0</td>
                                            <td className="px-3 py-2.5 text-center font-bold text-slate-300">2</td>
                                            <td className="px-3 py-2.5 text-center font-bold text-orange-300">8</td>
                                        </tr>
                                        <tr className="bg-yellow-900/10">
                                            <td className="px-4 py-2.5 font-bold text-white text-xs sm:text-sm">노말 세렌</td>
                                            <td className="px-3 py-2.5 text-center font-bold text-yellow-300">1</td>
                                            <td className="px-3 py-2.5 text-center text-slate-500">0</td>
                                            <td className="px-3 py-2.5 text-center font-bold text-orange-300">5</td>
                                        </tr>
                                        <tr className="bg-yellow-900/15">
                                            <td className="px-4 py-3 font-bold text-white text-xs sm:text-sm">하드 세렌, 이지 칼로스, 이지 대적자, 이지 카링</td>
                                            <td className="px-3 py-3 text-center font-bold text-yellow-300 text-base">2</td>
                                            <td className="px-3 py-3 text-center text-slate-500">0</td>
                                            <td className="px-3 py-3 text-center font-bold text-orange-300 text-base">8</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* 주간 보스돌이 루트별 누적 획득량 */}
                    <div className="bg-slate-800/40 border border-green-500/20 rounded-2xl p-5 sm:p-6 mb-5">
                        <h3 className="text-base sm:text-lg font-bold text-green-300 mb-4 flex items-center gap-2">
                            📅 주간 보스돌이 루트별 누적 획득량
                        </h3>
                        <p className="text-xs text-slate-400 mb-3">주간 보스를 모두 클리어했을 때 해당 루트에서 얻을 수 있는 메멘토 큐브 총량입니다.</p>
                        <div className="overflow-x-auto rounded-xl border border-slate-700">
                            <table className="w-full text-xs sm:text-sm text-left min-w-[400px]">
                                <thead className="bg-slate-800 text-slate-200">
                                    <tr>
                                        <th className="px-4 py-3">보스돌이 루트</th>
                                        <th className="px-3 py-3 text-center text-yellow-300 whitespace-nowrap">🥇 골드</th>
                                        <th className="px-3 py-3 text-center text-slate-300 whitespace-nowrap">🥈 실버</th>
                                        <th className="px-3 py-3 text-center text-orange-300 whitespace-nowrap">🥉 브론즈</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700/50 bg-slate-900/40 text-slate-300">
                                    <tr>
                                        <td className="px-4 py-2.5 font-medium">이지루시드돌이</td>
                                        <td className="px-3 py-2.5 text-center text-slate-500">0</td>
                                        <td className="px-3 py-2.5 text-center text-slate-500">0</td>
                                        <td className="px-3 py-2.5 text-center font-bold text-orange-300">18</td>
                                    </tr>
                                    <tr className="bg-slate-800/20">
                                        <td className="px-4 py-2.5 font-medium">하스데돌이 <span className="text-slate-500 text-xs">(노말 진힐라 제외)</span></td>
                                        <td className="px-3 py-2.5 text-center text-slate-500">0</td>
                                        <td className="px-3 py-2.5 text-center font-bold text-slate-300">2</td>
                                        <td className="px-3 py-2.5 text-center font-bold text-orange-300">40</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2.5 font-medium">하드검밑솔돌이</td>
                                        <td className="px-3 py-2.5 text-center text-slate-500">0</td>
                                        <td className="px-3 py-2.5 text-center font-bold text-slate-300">14</td>
                                        <td className="px-3 py-2.5 text-center font-bold text-orange-300">64</td>
                                    </tr>
                                    <tr className="bg-slate-800/20">
                                        <td className="px-4 py-2.5 font-medium">이지대적자돌이</td>
                                        <td className="px-3 py-2.5 text-center font-bold text-yellow-300">5</td>
                                        <td className="px-3 py-2.5 text-center font-bold text-slate-300">14</td>
                                        <td className="px-3 py-2.5 text-center font-bold text-orange-300">81</td>
                                    </tr>
                                    <tr className="bg-yellow-900/10">
                                        <td className="px-4 py-2.5 font-bold text-white">하드세렌돌이</td>
                                        <td className="px-3 py-2.5 text-center font-bold text-yellow-300">6</td>
                                        <td className="px-3 py-2.5 text-center font-bold text-slate-300">14</td>
                                        <td className="px-3 py-2.5 text-center font-bold text-orange-300">85</td>
                                    </tr>
                                    <tr className="bg-yellow-900/15">
                                        <td className="px-4 py-3 font-black text-yellow-300">이지카링돌이</td>
                                        <td className="px-3 py-3 text-center font-black text-yellow-300 text-base">8</td>
                                        <td className="px-3 py-3 text-center font-bold text-slate-300 text-base">14</td>
                                        <td className="px-3 py-3 text-center font-black text-orange-300 text-base">90</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* 이벤트 상점 & 유니온 코인샵 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 text-sm">
                            <h3 className="font-bold text-yellow-300 mb-3 border-b border-slate-700 pb-2">🎟️ 이벤트 상점 변화</h3>
                            <ul className="space-y-2 text-slate-300">
                                <li className="flex gap-2">
                                    <span className="shrink-0 text-slate-500">▸</span>
                                    <span><span className="font-bold text-white">기프트 티켓 상점:</span> 브론즈 에디셔널 큐브가 <span className="text-orange-300 font-bold">'카르마'(교환 불가)</span>로 처리됨</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="shrink-0 text-slate-500">▸</span>
                                    <span><span className="font-bold text-white">메소샵:</span> VIP 버프(경험치), VIP 버프(능력치) <span className="text-green-400 font-bold">신규 추가</span></span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 text-sm">
                            <h3 className="font-bold text-orange-300 mb-3 border-b border-slate-700 pb-2">🔥 유니온 코인샵 텍스트 픽스</h3>
                            <p className="text-slate-300">단종 아이템이 영원한 환생의 불꽃이 아닌 <span className="font-bold text-white">&#39;카르마 영원한 환생의 불꽃&#39;</span>으로 텍스트 정정</p>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* ② 체인지 버닝 루시드 */}
                <section id="event" className="mb-12 lg:mb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-pink-400" />
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-pink-400">
                            2. 체인지 버닝: 루시드 (초반 보상 대떡상 & 피로도 완화)
                        </h2>
                    </div>

                    <div className="bg-pink-900/15 border border-pink-500/30 rounded-xl p-4 mb-6 text-sm">
                        <p className="text-slate-300 break-keep">
                            테섭 유저들의 피드백을 적극 수용하여 <span className="font-bold text-pink-300">보상의 질이 대폭 올라가고 피로도가 줄었습니다.</span>
                            단순 반복 보상을 핵심 성장 아이템으로 교체하여 성장의 재미를 확 끌어올렸습니다.
                        </p>
                    </div>

                    {/* 보상 대폭 상향 */}
                    <div className="bg-slate-800/50 border border-pink-500/30 rounded-2xl p-5 sm:p-6 mb-5">
                        <h3 className="text-base sm:text-lg font-bold text-yellow-300 mb-4 flex items-center gap-2">
                            🎁 루시드 보상 상향 및 질적 교환 내역
                        </h3>
                        <div className="overflow-x-auto rounded-xl border border-slate-700">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-800 text-slate-200">
                                    <tr>
                                        <th className="px-4 py-3 w-1/4">레벨</th>
                                        <th className="px-4 py-3 text-slate-400 line-through w-1/3">기존 (테섭)</th>
                                        <th className="px-4 py-3 text-green-400 w-5/12">변경 (본섭)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700/50 bg-slate-900/40">
                                    <tr>
                                        <td className="px-4 py-3 font-bold text-white text-center">20Lv</td>
                                        <td className="px-4 py-3 text-slate-400 line-through">드림캐쳐 3개</td>
                                        <td className="px-4 py-3 font-bold text-green-400">몽환의 장비 선택 상자 (에픽) 1개</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-bold text-white text-center">30Lv</td>
                                        <td className="px-4 py-3 text-slate-400 line-through">드림캐쳐 3개</td>
                                        <td className="px-4 py-3 font-bold text-green-400">의문의 몽환의 결정 상자 (에픽) 2개</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-bold text-white text-center">40Lv</td>
                                        <td className="px-4 py-3 text-slate-400 line-through">에픽 결정 상자 1개</td>
                                        <td className="px-4 py-3 font-bold text-cyan-400">유니크 결정 상자 1개 ↑</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-bold text-white text-center">70Lv</td>
                                        <td className="px-4 py-3 text-slate-400 line-through">드림캐쳐 10개</td>
                                        <td className="px-4 py-3 font-bold text-yellow-300">유니크 결정 상자 2개 🎉</td>
                                    </tr>
                                    <tr className="bg-yellow-900/20">
                                        <td className="px-4 py-4 font-black text-yellow-400 text-center">100Lv</td>
                                        <td className="px-4 py-4 text-slate-400 line-through">레전드리 결정 상자 1개</td>
                                        <td className="px-4 py-4 font-black text-yellow-300 text-lg italic">레전드리 결정 상자 3개 (3배!) 🎉</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-slate-400 mt-3 ml-1 italic">* 초반부터 지루하게 드림캐쳐만 받던 구조에서, 장비와 결정을 빠르게 수급하는 구조로 개선되었습니다.</p>
                    </div>

                    {/* 피로도 완화 및 경험치 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                        <div className="bg-cyan-900/15 border border-cyan-500/30 rounded-2xl p-5">
                            <h3 className="text-base font-bold text-cyan-300 mb-3 flex items-center gap-2">
                                ✨ 피로도 및 경험치 개선
                            </h3>
                            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                                <li className="flex gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                                    <span><span className="font-bold text-white">피로도 완화:</span> 악몽의 숲 스테이지 <span className="text-cyan-300 font-bold">3단계 → 2단계 축소</span></span>
                                </li>
                                <li className="flex gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                                    <span><span className="font-bold text-white">경험치 보장:</span> 100레벨 달성 후에도 <span className="text-green-400 font-bold">드림 패스 구매 시</span> 내 캐릭터 경험치 획득 가능 명시</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-orange-900/15 border border-orange-500/30 rounded-2xl p-5">
                            <h3 className="text-base font-bold text-orange-300 mb-3 flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5 shrink-0" />
                                오버스펙 캡 (제한)
                            </h3>
                            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                                <li className="flex gap-2">
                                    <span className="shrink-0 text-orange-400 font-bold mt-0.5">⚠</span>
                                    <span><span className="font-bold text-white">쿨감 제한:</span> 몽환의 결정 쿨타임 감소 옵션 <span className="text-orange-300 font-bold">최대 9초 감소 가능, 5초 미만 감소 불가</span></span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="shrink-0 text-orange-400 font-bold mt-0.5">⚠</span>
                                    <span><span className="font-bold text-white">로직 명시:</span> 유니크/레전드리 합성 시 <span className="font-bold text-white">동일 옵션 중복 등장 가능</span> 소수점 로직 확정</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* ③ 시스템 및 편의성 */}
                <section id="system" className="mb-12 lg:mb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <Settings className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-400">
                            3. 시스템 및 편의성
                        </h2>
                    </div>

                    {/* 스마트 중단 */}
                    <div className="bg-cyan-900/15 border border-cyan-500/30 rounded-2xl p-5 sm:p-6 mb-5">
                        <h3 className="text-base sm:text-lg font-bold text-cyan-300 mb-4 flex items-center gap-2">
                            <Settings className="w-5 h-5 shrink-0" />
                            자동 강화 &#39;스마트 중단&#39; 기능 도입
                        </h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex gap-3 bg-slate-800/60 rounded-xl p-4">
                                <span className="shrink-0 text-cyan-400 mt-0.5">✦</span>
                                <div>
                                    <p className="font-bold text-white mb-1">전투력 기반 중단</p>
                                    <p className="text-slate-300">기존보다 전투력이 오르면 알아서 강화를 멈추는 기능 추가 <span className="text-slate-400">(단, 장착 가능 아이템 & 선택 기능이 있는 환생의 불꽃/큐브만 가능)</span></p>
                                </div>
                            </div>
                            <div className="flex gap-3 bg-slate-800/60 rounded-xl p-4">
                                <span className="shrink-0 text-green-400 mt-0.5">✦</span>
                                <div>
                                    <p className="font-bold text-white mb-1">정확한 타겟팅</p>
                                    <p className="text-slate-300">목표 수치(합산)보다 높게 뜨거나, 목표 추옵을 달성하면 낭비 없이 딱 멈춤. <span className="font-bold text-cyan-300">올스탯%도 주스탯%와 합산</span>되어 스마트하게 계산</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 연무장 */}
                    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 sm:p-6 mb-5">
                        <h3 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-2">
                            ⚔️ 연무장 (전투 분석 전당) 실전 패치
                        </h3>
                        <div className="overflow-x-auto rounded-xl border border-slate-700">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-800 text-slate-200">
                                    <tr>
                                        <th className="px-4 py-3 w-1/3">항목</th>
                                        <th className="px-4 py-3 text-slate-400 line-through w-1/3">테섭</th>
                                        <th className="px-4 py-3 text-green-400 w-1/3">본섭 (변경)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700/50 bg-slate-900/40">
                                    <tr>
                                        <td className="px-4 py-3 font-bold text-white">입장 컷</td>
                                        <td className="px-4 py-3 text-slate-400 line-through">전투력 1억</td>
                                        <td className="px-4 py-3 font-bold text-orange-300">전투력 3억 ↑</td>
                                    </tr>
                                    <tr className="bg-green-900/10">
                                        <td className="px-4 py-3 font-bold text-white">실전 세팅</td>
                                        <td className="px-4 py-3 text-slate-400 line-through">화살/표창, 칭호 가방, 도핑 금지</td>
                                        <td className="px-4 py-3 font-bold text-green-400">전면 허용 ✓</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 font-bold text-white">어뷰징 방지</td>
                                        <td className="px-4 py-3 text-slate-400">-</td>
                                        <td className="px-4 py-3 text-cyan-300">리플레이 추천 1일 1회 제한 추가</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* 업적 단종 */}
                    <div className="bg-red-900/10 border border-red-500/30 rounded-xl p-4 text-sm">
                        <p className="font-bold text-red-300 mb-1 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 shrink-0" />
                            업적 단종
                        </p>
                        <p className="text-slate-300">스타캐치 시스템 완전 삭제로 인해 관련 업적이 <span className="font-bold text-white">&#39;추억&#39; 탭으로 이동</span> (더 이상 달성 불가)</p>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* ④ 보스 및 직업 스킬 */}
                <section id="boss" className="mb-12 lg:mb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <Sword className="w-8 h-8 sm:w-10 sm:h-10 text-red-400" />
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-400">
                            4. 보스 및 직업 스킬
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {/* 세렌 */}
                        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl shrink-0">☀️</span>
                                <div className="text-sm">
                                    <p className="font-bold text-white mb-1">선택받은 세렌 (난이도 하락)</p>
                                    <p className="text-slate-300">2페이즈 여명에서 바인드를 걸면 <span className="font-bold text-green-400">&#39;네로타의 현신&#39; 패턴이 즉시 증발</span>하는 큰 너프 적용 → 클리어 난이도 대폭 하락 예상</p>
                                </div>
                            </div>
                        </div>

                        {/* 데몬 직업 */}
                        <div className="bg-green-900/10 border border-green-500/30 rounded-2xl p-5">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl shrink-0">😈</span>
                                <div className="text-sm">
                                    <p className="font-bold text-white mb-1">데몬 직업군 상향</p>
                                    <p className="text-slate-300"><span className="font-bold text-green-400">&#39;아스트라 인퓨전&#39; 스킬</span>이 <span className="font-bold text-white">펫 자동 버프(즐겨찾기)</span>에 등록 가능해짐</p>
                                </div>
                            </div>
                        </div>

                        {/* 보스 효과음 */}
                        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl shrink-0">🔊</span>
                                <div className="text-sm">
                                    <p className="font-bold text-white mb-2">보스 효과음 대거 교체</p>
                                    <ul className="space-y-1 text-slate-300">
                                        <li>▸ <span className="font-bold">세렌:</span> 태양의 분노 효과음 변경</li>
                                        <li>▸ <span className="font-bold">칼로스:</span> 분노/포효 효과음 변경</li>
                                        <li>▸ <span className="font-bold">카링:</span> 도올 패턴 효과음 변경</li>
                                    </ul>
                                    <p className="text-slate-400 text-xs mt-2">즉사기 및 위협 패턴 사운드 전반이 변경됨</p>
                                </div>
                            </div>
                        </div>

                        {/* 버그 수정 */}
                        <div className="bg-red-900/10 border border-red-500/30 rounded-2xl p-5">
                            <div className="flex items-start gap-3">
                                <span className="text-2xl shrink-0">🐛</span>
                                <div className="text-sm">
                                    <p className="font-bold text-red-300 mb-2">치명적 버그 수정</p>
                                    <ul className="space-y-1 text-slate-300">
                                        <li className="flex gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                                            <span>최초의 대적자 공중 부양 버그 긴급 수정</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                                            <span>카이 크로노 브레이크 사용 시 클라이언트 튕김 버그 긴급 수정</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <InArticleAd dataAdSlot="8162808816" className="my-10" />

                {/* ⑤ Open API */}
                <section id="api" className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <Code2 className="w-8 h-8 sm:w-10 sm:h-10 text-green-400" />
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-400">
                            5. Open API 업데이트 항목
                        </h2>
                    </div>
                    <p className="text-sm text-slate-400 mb-6 ml-1">데이터 연동 시 즉각적인 갱신이 필요한 API 변경점입니다.</p>

                    <div className="space-y-4">
                        <div className="bg-green-900/10 border border-green-500/30 rounded-2xl p-5">
                            <h3 className="text-base font-bold text-green-300 mb-3 flex items-center gap-2">
                                <ArrowUpCircle className="w-5 h-5 shrink-0" />
                                조회 항목 추가
                            </h3>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li className="flex gap-2">
                                    <span className="shrink-0 text-green-500 font-bold">+</span>
                                    <span>예비 특수 반지 장착 정보</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="shrink-0 text-green-500 font-bold">+</span>
                                    <span>장착 펫 정보 내 <span className="font-bold text-white">&#39;펫장비 유효 기간&#39;</span></span>
                                </li>
                                <li className="flex gap-2">
                                    <span className="shrink-0 text-green-500 font-bold">+</span>
                                    <span>확률 정보 내 <span className="font-bold text-white">신규 큐브 3종(브론즈 에디/실버/골드) 사용 결과</span></span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-orange-900/10 border border-orange-500/30 rounded-2xl p-5">
                            <h3 className="text-base font-bold text-orange-300 mb-3 flex items-center gap-2">
                                <Settings className="w-5 h-5 shrink-0" />
                                조회 로직 변경
                            </h3>
                            <div className="flex gap-3 bg-slate-800/50 rounded-xl p-4 text-sm">
                                <span className="shrink-0 text-orange-400 mt-0.5">▸</span>
                                <p className="text-slate-300">스타포스 정보 조회 시 <span className="font-bold text-white">&#39;스타캐치&#39; 항목이 일괄 <code className="bg-slate-700 px-1 rounded text-orange-300">null</code>로 조회</span>되도록 변경</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="mb-8">
                    <div className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 border-2 border-blue-500/50 rounded-xl p-6 sm:p-8 text-center">
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">3월 19일 업데이트, 완벽하게 활용하고 계신가요?</h3>
                        <p className="text-sm sm:text-base text-slate-300 mb-6">
                            메이플 AI에서 내 캐릭터를 진단하고 이번 패치에 맞는 최적의 스펙업 루트를 찾아보세요!
                        </p>
                        <Link href="/">
                            <button className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-bold rounded-xl transition-all shadow-xl hover:-translate-y-1">
                                무료 캐릭터 진단 시작하기
                            </button>
                        </Link>
                    </div>
                </section>

                {/* Keywords for SEO */}
                <div className="mt-12 pt-8 border-t border-slate-800/50 flex flex-wrap gap-x-4 gap-y-2 justify-center">
                    {[
                        '메이플스토리', '메이플', '패치노트', '본섭', '3월19일', '업데이트',
                        '전승스크롤', '메멘토큐브', '체인지버닝', '루시드', '보상상향',
                        '스마트중단', '연무장', '세렌', '데몬', '아스트라인퓨전',
                        'OpenAPI', '아이템시세', '경제', '강화', '큐브', '가위제한',
                        '드림기프트', '몽환의결정', '루시드이벤트', '메이플패치',
                        '메이플공략', '메이플육성', '메이플스킬', '메이플보스'
                    ].map((keyword) => (
                        <span key={keyword} className="text-slate-500 text-xs sm:text-sm hover:text-purple-400 transition-colors cursor-default">
                            #{keyword}
                        </span>
                    ))}
                </div>
            </main>
        </div>
    );
}
