"use client";

import React from 'react';
import { Sparkles, Zap, Smartphone, Bug, ArrowLeft, Swords } from 'lucide-react';
import Link from 'next/link';

export default function PatchNotesPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-4 sm:p-8 font-sans">
            <div className="max-w-3xl mx-auto">
                <Link href="/" className="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors group">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    메인으로 돌아가기
                </Link>

                <header className="mb-12 text-center">
                    <div className="inline-block p-3 bg-slate-900 rounded-2xl mb-4 border border-slate-800 shadow-xl">
                        <Swords className="w-10 h-10 text-orange-500" />
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 mb-4 tracking-tight">
                        패치노트
                    </h1>
                    <p className="text-slate-400 text-lg">단풍이의 메이플 AI 업데이트 기록</p>
                </header>

                <div className="space-y-8">
                    {/* v1.2.3 */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8 hover:border-orange-500/30 transition-all shadow-lg relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Zap className="w-32 h-32 text-orange-500" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-2 border-b border-slate-800 pb-4">
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-bold border border-orange-500/30 shadow-[0_0_10px_rgba(249,115,22,0.2)]">v1.2.3</span>
                                    <h2 className="text-2xl font-bold text-white">보스 전투 시스템 대격변</h2>
                                </div>
                                <span className="text-slate-500 text-sm font-mono">2025. 12. 05</span>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="flex items-center text-lg font-bold text-cyan-400 mb-3">
                                        <Smartphone className="w-5 h-5 mr-2" />
                                        모바일 경험 혁신
                                    </h3>
                                    <ul className="space-y-2 text-slate-300 ml-1">
                                        <li className="flex items-start">
                                            <span className="mr-2 text-cyan-500/50">•</span>
                                            <span><span className="font-semibold text-white">뒤로가기 완벽 지원:</span> 이제 모바일 기기의 뒤로가기 버튼으로 전투 모달을 자연스럽게 닫을 수 있습니다. 실수로 페이지를 이탈하는 일은 이제 그만!</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2 text-cyan-500/50">•</span>
                                            <span><span className="font-semibold text-white">반응형 UI 개선:</span> 작은 화면에서도 캐릭터와 보스가 겹치지 않도록 배치를 최적화하여 쾌적한 전투 환경을 제공합니다.</span>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="flex items-center text-lg font-bold text-red-400 mb-3">
                                        <Zap className="w-5 h-5 mr-2" />
                                        전투 연출 강화
                                    </h3>
                                    <ul className="space-y-2 text-slate-300 ml-1">
                                        <li className="flex items-start">
                                            <span className="mr-2 text-red-500/50">•</span>
                                            <span><span className="font-semibold text-white">타격감 업그레이드:</span> 공격 적중 시 화면이 부드럽게 흔들리는 효과(Screen Shake)를 추가하여 타격감을 극대화했습니다.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2 text-red-500/50">•</span>
                                            <span><span className="font-semibold text-white">최적의 템포:</span> 전투 속도를 0.8초 간격으로 조정하여, 너무 빠르지도 느리지도 않은 쫄깃한 긴장감을 선사합니다.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2 text-red-500/50">•</span>
                                            <span><span className="font-semibold text-white">부드러운 애니메이션:</span> 화면 끊김 현상을 제거하여 훨씬 자연스럽고 몰입감 있는 전투를 감상할 수 있습니다.</span>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="flex items-center text-lg font-bold text-green-400 mb-3">
                                        <Bug className="w-5 h-5 mr-2" />
                                        버그 수정
                                    </h3>
                                    <ul className="space-y-2 text-slate-300 ml-1">
                                        <li className="flex items-start">
                                            <span className="mr-2 text-green-500/50">•</span>
                                            <span>보스 전투 진입 시 발생하던 렌더링 오류(Portal Error)를 해결했습니다.</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2 text-green-500/50">•</span>
                                            <span>승리 시 불필요한 오버레이가 화면을 가리던 문제를 수정했습니다.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="mt-12 text-center text-slate-600 text-sm">
                    © 2025 Maple AI. All rights reserved.
                </footer>
            </div>
        </div>
    );
}
