'use client';
import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { UNIT_DATABASE } from '../../components/Game/GameData';
import { PhaserGameRef } from '../../components/Game/PhaserGame';

const PhaserGame = dynamic(() => import('../../components/Game/PhaserGame'), { ssr: false });

export default function GamePage() {
    const gameRef = useRef<PhaserGameRef>(null);
    const [gold, setGold] = useState(100);
    const [level, setLevel] = useState(1);
    const [exp, setExp] = useState(0);
    const [requiredExp, setRequiredExp] = useState(100);
    const [showJobGacha, setShowJobGacha] = useState(false);
    const [availableJobs, setAvailableJobs] = useState<string[]>([]);
    const [currentJob, setCurrentJob] = useState('hero');

    const handleGoldUpdate = (amount: number) => {
        setGold(prev => prev + amount);
    };

    const handleLevelUp = (newLevel: number) => {
        setLevel(newLevel);
    };

    const handleExpUpdate = (currentExp: number, required: number) => {
        setExp(currentExp);
        setRequiredExp(required);
    };

    const handleJobGacha = () => {
        if (gold < 10) {
            alert('골드가 부족합니다! (필요: 10골드)');
            return;
        }

        setGold(gold - 10);

        const jobKeys = ['hero_warrior', 'paladin', 'dark_knight', 'bowmaster', 'marksman',
            'night_lord', 'shadower', 'arch_mage_fp', 'bishop', 'buccaneer'];
        const shuffled = jobKeys.sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, 3);
        setAvailableJobs(selected);
        setShowJobGacha(true);
    };

    const handleJobSelect = (jobId: string) => {
        if (gameRef.current) {
            gameRef.current.changeJob(jobId);
            setCurrentJob(jobId);
        }
        setShowJobGacha(false);
    };

    const handleUpgrade = (type: 'attack' | 'attackSpeed' | 'critRate', cost: number) => {
        if (gold < cost) {
            alert(`골드가 부족합니다! (현재: ${gold}, 필요: ${cost})`);
            return;
        }

        setGold(gold - cost);

        if (gameRef.current) {
            const upgradeData = {
                id: type,
                name: type === 'attack' ? '공격력 강화' : type === 'attackSpeed' ? '공격속도 강화' : '치명타 강화',
                description: type === 'attack' ? '공격력 +10%' : type === 'attackSpeed' ? '공격속도 +5%' : '치명타 +5%',
                tier: 1,
                cost: cost,
                type: 'STAT' as const,
                statType: type,
                value: type === 'attack' ? 0.1 : type === 'attackSpeed' ? 0.05 : 5,
                color: type === 'attack' ? '⚔️' : type === 'attackSpeed' ? '⚡' : '💥'
            };
            gameRef.current.upgradeHero(upgradeData);
        }
    };

    return (
        <div className="min-h-screen bg-[url('/images/game/colosseum_bg.png')] bg-cover bg-center bg-fixed p-4 font-sans">
            {/* Dark overlay for readability */}
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-0"></div>

            <div className="relative z-10 max-w-[1400px] mx-auto">
                <header className="mb-8 text-center">
                    <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 drop-shadow-[0_2px_10px_rgba(255,165,0,0.5)] tracking-tight">
                        MAPLE COLOSSEUM
                    </h1>
                    <p className="text-gray-400 mt-2 font-light tracking-widest uppercase text-sm">Infinite Battle Arena</p>
                </header>

                {/* Top Bar: Stats */}
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                    {/* EXP Bar Section */}
                    <div className="flex-1 p-5 bg-gray-900/60 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                            <div className="flex justify-between mb-3 items-end">
                                <span className="text-white font-bold text-2xl flex items-center gap-3">
                                    <span className="bg-gradient-to-br from-blue-600 to-blue-800 px-3 py-1 rounded-lg text-sm shadow-lg border border-blue-400/30">LV. {level}</span>
                                </span>
                                <span className="text-blue-300 font-mono font-bold tracking-wider text-sm">
                                    <span className="text-white">{exp}</span> / {requiredExp} EXP
                                </span>
                            </div>
                            <div className="w-full h-4 bg-gray-950 rounded-full overflow-hidden border border-white/5 shadow-inner">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.6)] relative"
                                    style={{ width: `${(exp / requiredExp) * 100}%` }}
                                >
                                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gold Section */}
                    <div className="p-5 bg-gray-900/60 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl min-w-[240px] flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10 text-yellow-400 text-4xl font-black drop-shadow-lg flex items-center gap-3">
                            <span className="filter drop-shadow-md">💰</span>
                            <span className="tracking-tight">{gold.toLocaleString()}</span>
                            <span className="text-lg text-yellow-600 font-bold mt-2">G</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Game Area */}
                    <div className="lg:col-span-3 rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-800/80 relative">
                        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] z-20"></div>
                        <PhaserGame
                            ref={gameRef}
                            onGoldUpdate={handleGoldUpdate}
                            onLevelUp={handleLevelUp}
                            onExpUpdate={handleExpUpdate}
                        />
                    </div>

                    {/* Controls Area */}
                    <div className="space-y-6">
                        {/* Job Gacha Card */}
                        <div className="bg-gray-900/80 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl">
                            <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2 uppercase tracking-wider">
                                <span className="text-2xl">🎰</span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Class Change</span>
                            </h2>
                            <button
                                onClick={handleJobGacha}
                                className="w-full py-5 rounded-2xl font-bold text-xl border-b-[6px] transform transition-all active:scale-[0.98] active:border-b-0 active:translate-y-[6px]
                                         bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 border-indigo-900 text-white 
                                         hover:brightness-110 shadow-xl group relative overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <span>🎲</span> 직업 뽑기 <span className="text-sm bg-black/20 px-2 py-1 rounded">10 G</span>
                                </span>
                                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                            </button>

                            <div className="mt-5 p-4 bg-black/40 rounded-2xl text-center border border-white/5 relative overflow-hidden">
                                <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Current Class</div>
                                <div className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 font-black text-2xl">
                                    {UNIT_DATABASE[currentJob]?.name || currentJob}
                                </div>
                            </div>
                        </div>

                        {/* Upgrade Card */}
                        <div className="bg-gray-900/80 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl">
                            <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2 uppercase tracking-wider">
                                <span className="text-2xl">⚡</span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Power Up</span>
                            </h2>
                            <div className="space-y-3">
                                <UpgradeButton
                                    label="공격력 +10%"
                                    cost={5}
                                    color="red"
                                    icon="⚔️"
                                    onClick={() => handleUpgrade('attack', 5)}
                                />
                                <UpgradeButton
                                    label="공격속도 +5%"
                                    cost={8}
                                    color="blue"
                                    icon="⚡"
                                    onClick={() => handleUpgrade('attackSpeed', 8)}
                                />
                                <UpgradeButton
                                    label="치명타 +5%"
                                    cost={10}
                                    color="purple"
                                    icon="💥"
                                    onClick={() => handleUpgrade('critRate', 10)}
                                />
                            </div>
                        </div>

                        {/* Info Card */}
                        <div className="bg-gray-900/40 backdrop-blur-md p-5 rounded-2xl text-sm text-gray-400 border border-white/5 shadow-lg">
                            <p className="flex items-center gap-3 mb-2">
                                <span className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500">💡</span>
                                <span>몬스터 처치 = 골드 + 경험치</span>
                            </p>
                            <p className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500">🎯</span>
                                <span>원하는 직업이 나올 때까지!</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Modal */}
                {showJobGacha && (
                    <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
                        <div className="bg-gradient-to-br from-gray-900 to-slate-950 p-8 rounded-[2rem] border border-yellow-500/30 max-w-5xl w-full shadow-2xl relative overflow-hidden">
                            {/* Background effects */}
                            <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/game/colosseum_bg.png')] opacity-20 bg-cover mix-blend-overlay"></div>
                            <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
                            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

                            <div className="relative z-10">
                                <h2 className="text-6xl font-black text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-200 drop-shadow-lg animate-pulse">
                                    SELECT YOUR DESTINY
                                </h2>
                                <p className="text-gray-400 text-center mb-12 text-lg font-light tracking-[0.5em] uppercase">Choose one class to proceed</p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {availableJobs.map(jobId => {
                                        const jobData = UNIT_DATABASE[jobId];
                                        return (
                                            <button
                                                key={jobId}
                                                onClick={() => handleJobSelect(jobId)}
                                                className="group relative bg-gray-800/50 p-1 rounded-3xl hover:-translate-y-2 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                <div className="bg-gray-900/90 backdrop-blur-xl rounded-[1.3rem] p-8 h-full flex flex-col items-center border border-white/10 group-hover:border-yellow-500/50 transition-colors relative z-10">
                                                    <div className="text-9xl mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 filter drop-shadow-2xl">{jobData.color}</div>

                                                    <div className="text-center mb-6">
                                                        <div className="text-white font-black text-3xl mb-1 group-hover:text-yellow-400 transition-colors">{jobData.name}</div>
                                                        <div className="text-yellow-600 text-xs font-bold uppercase tracking-[0.2em]">{jobData.job}</div>
                                                    </div>

                                                    <div className="w-full bg-black/40 rounded-xl p-4 mt-auto border border-white/5 group-hover:bg-yellow-900/20 transition-colors">
                                                        <div className="text-yellow-300 text-sm font-bold mb-1 flex items-center justify-center gap-2">
                                                            <span>★</span> {jobData.skillName}
                                                        </div>
                                                        <div className="text-gray-400 text-xs text-center leading-relaxed">{jobData.skillDesc}</div>
                                                    </div>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function UpgradeButton({ label, cost, color, icon, onClick }: { label: string, cost: number, color: string, icon: string, onClick: () => void }) {
    const colorClasses: Record<string, string> = {
        red: 'from-red-600 to-red-800 border-red-900 hover:shadow-red-500/30',
        blue: 'from-blue-600 to-blue-800 border-blue-900 hover:shadow-blue-500/30',
        purple: 'from-purple-600 to-purple-800 border-purple-900 hover:shadow-purple-500/30',
    };

    return (
        <button
            onClick={onClick}
            className={`w-full bg-gradient-to-r ${colorClasses[color]} 
                      text-white font-bold py-4 px-5 rounded-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] 
                      border-b-[4px] active:border-b-0 active:translate-y-[4px] shadow-lg flex items-center justify-between group`}
        >
            <div className="flex items-center gap-4">
                <span className="text-2xl group-hover:rotate-12 transition-transform filter drop-shadow-md">{icon}</span>
                <span className="text-shadow-sm tracking-wide">{label}</span>
            </div>
            <span className="bg-black/30 px-3 py-1.5 rounded-lg text-yellow-300 text-sm font-mono border border-white/10">
                {cost} G
            </span>
        </button>
    );
}
