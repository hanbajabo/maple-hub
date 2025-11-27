'use client';

import Link from 'next/link';
import { ArrowLeft, Gift, Search, Info } from 'lucide-react';
import { useState } from 'react';
import BOSS_REWARD_DATA from '@/src/data/boss_reward_data.json';

export default function BossRewardsClient() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = searchTerm
        ? BOSS_REWARD_DATA.filter(data => data.name.includes(searchTerm))
        : BOSS_REWARD_DATA;

    // Function to get image source (always local now)
    const getImageSrc = (name: string) => {
        return `/images/boss_rewards/${name.replace(/[\/\?<>\\:\*\|":]/g, '_')}.png`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Link href="/guide" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">가이드 목록으로</span>
                    </Link>
                    <h1 className="text-3xl sm:text-4xl font-black text-white flex items-center gap-3">
                        <Gift className="w-8 h-8 text-yellow-500" />
                        보스별 주요 보상 가이드
                    </h1>
                    <p className="text-slate-400 mt-2">메이플스토리 모든 보스의 주요 보상과 드롭 아이템 총정리</p>
                </div>
            </div>

            <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-4 mb-8 sticky top-32 z-10 backdrop-blur-md shadow-xl">
                    <div className="flex items-center gap-4">
                        <Search className="w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="보스 이름 검색..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 bg-slate-900 text-white border border-slate-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-yellow-500 placeholder-slate-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredData.map((boss) => (
                        <div key={boss.name} className="bg-slate-800/40 border border-slate-700 rounded-xl overflow-hidden hover:border-yellow-500/50 transition-all hover:bg-slate-800/60 group shadow-lg">
                            <div className="p-4 border-b border-slate-700 bg-slate-900/30 flex justify-between items-center">
                                <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">{boss.name}</h3>
                            </div>

                            <div className="p-4">
                                <div className="aspect-video w-full bg-slate-900 rounded-lg overflow-hidden mb-4 border border-slate-700/50 relative group-hover:border-yellow-500/30 transition-colors">
                                    <img
                                        src={getImageSrc(boss.name)}
                                        alt={`${boss.name} 보상`}
                                        className="w-full h-full object-contain"
                                        loading="lazy"
                                        onError={(e) => {
                                            // Fallback if image fails to load
                                            e.currentTarget.style.display = 'none';
                                            e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                                            e.currentTarget.parentElement!.innerHTML = '<span class="text-slate-500 text-sm">이미지 없음</span>';
                                        }}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <h4 className="text-sm font-bold text-slate-300 flex items-center gap-2">
                                        <Gift className="w-4 h-4 text-yellow-500" />
                                        주요 보상
                                    </h4>
                                    <p className="text-sm text-slate-400 leading-relaxed break-keep">
                                        {boss.rewards || '주요 보상 정보가 없습니다.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredData.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-slate-500 text-lg">검색 결과가 없습니다.</p>
                    </div>
                )}

                <div className="mt-12 p-6 bg-slate-800/30 rounded-xl border border-slate-700">
                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                        <Info className="w-5 h-5 text-blue-400" />
                        참고 사항
                    </h3>
                    <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
                        <li>보스 보상은 난이도에 따라 다를 수 있습니다.</li>
                        <li>일부 보상은 확률적으로 드롭됩니다.</li>
                        <li>데이터 출처: 메이플스토리 공식 가이드</li>
                    </ul>
                </div>
            </article>
        </div>
    );
}
