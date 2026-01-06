'use client';

import Link from 'next/link';
import { ArrowLeft, Gift, Search, Info } from 'lucide-react';
import { useState } from 'react';
import BOSS_REWARD_DATA from '@/src/data/boss_reward_data.json';
import { getBossImage } from '@/lib/boss-images';

export default function BossRewardsClient() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = searchTerm
        ? BOSS_REWARD_DATA.filter(data => data.name.includes(searchTerm))
        : BOSS_REWARD_DATA;

    // 보상 이미지 (기존 public/images/boss_rewards 폴더 사용)
    const getRewardImageSrc = (name: string) => {
        return `/images/boss_rewards/${name.replace(/[\/\?<>\\:\*\|":]/g, '_')}.png`;
    };

    return (
        <div className="min-h-screen bg-[#1a1b1e] text-slate-200">
            {/* 헤더 */}
            <div className="sticky top-0 z-50 bg-[#1a1b1e]/80 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <Link href="/guide" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                            <span>가이드 홈</span>
                        </Link>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                                <Gift className="w-8 h-8 text-yellow-500" />
                                보스별 주요 보상
                            </h1>
                            <p className="text-slate-400 mt-1 text-sm">
                                메이플스토리의 모든 보스 몬스터와 주요 드롭 아이템을 확인하세요.
                            </p>
                        </div>
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                                type="text"
                                placeholder="보스 이름 검색..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-yellow-500 transition-colors"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* 메인 컨텐츠 */}
            <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-6">
                    {filteredData.map((boss) => {
                        const rewardsList = boss.rewards ? boss.rewards.split(',').map(r => r.trim()) : [];
                        const bossImage = getBossImage(boss.name);
                        const rewardImage = getRewardImageSrc(boss.name);

                        return (
                            <div key={boss.name} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-yellow-500/50 transition-all shadow-lg flex flex-col lg:flex-row h-auto lg:h-64">
                                {/* 1. 보스 일러스트 영역 (좌측) - 약 12% (최소 140px) */}
                                <div className="lg:w-[12%] bg-slate-950 relative overflow-hidden group min-w-[140px] border-b lg:border-b-0 lg:border-r border-slate-800 shrink-0 h-48 lg:h-full">
                                    {/* 배경 블러 효과 */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center opacity-30 blur-sm scale-110 transition-transform duration-700 group-hover:scale-125"
                                        style={{ backgroundImage: `url(${bossImage})` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                                    {/* 실제 보스 이미지 및 이름 */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-between p-3 z-10">
                                        {/* 이미지를 최대한 크게 (flex-1) */}
                                        <div className="w-full flex-1 flex items-center justify-center overflow-hidden">
                                            <img
                                                src={bossImage}
                                                alt={boss.name}
                                                className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-110"
                                                onError={(e) => e.currentTarget.style.display = 'none'}
                                            />
                                        </div>
                                        {/* 이름은 하단에 고정 */}
                                        <h3 className="text-sm font-black text-white text-center leading-tight drop-shadow-md group-hover:text-yellow-400 transition-colors mt-2 shrink-0">
                                            {boss.name}
                                        </h3>
                                    </div>
                                </div>

                                {/* 2. 보상 목록 텍스트 (중앙) - 약 28% */}
                                <div className="p-4 lg:w-[28%] flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-900/30 shrink-0 h-auto lg:h-full">
                                    <h4 className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider flex items-center gap-1">
                                        <Gift className="w-3 h-3" />
                                        Reward List
                                    </h4>
                                    <div className="flex flex-wrap gap-1.5">
                                        {rewardsList.length > 0 ? (
                                            rewardsList.map((reward, idx) => (
                                                <span key={idx} className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[11px] text-slate-300 hover:bg-slate-700 hover:text-white transition-colors cursor-default">
                                                    {reward}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-slate-600 text-xs">보상 정보 없음</span>
                                        )}
                                    </div>
                                </div>

                                {/* 3. 보상 스크린샷 (우측) - 나머지 (약 60%) */}
                                <div className="flex-1 bg-white flex items-center justify-center overflow-hidden relative h-64 lg:h-full">
                                    {/* 이미지 컨테이너 - 패딩 없이 꽉 차게 */}
                                    <div className="w-full h-full flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500">
                                        <img
                                            src={rewardImage}
                                            alt={`${boss.name} 보상 목록`}
                                            className="w-full h-full object-contain"
                                            loading="lazy"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                                e.currentTarget.parentElement!.innerHTML = '<div class="flex flex-col items-center gap-2 text-slate-400"><span class="text-2xl">🖼️</span><span class="text-sm">보상 이미지가 없습니다</span></div>';
                                                e.currentTarget.parentElement!.classList.add('bg-slate-800');
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filteredData.length === 0 && (
                    <div className="text-center py-20 text-slate-500">
                        <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>검색 결과가 없습니다.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
