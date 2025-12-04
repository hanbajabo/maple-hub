"use client";

import React, { useState, useEffect } from 'react';
import { X, Swords, Shield, Zap } from 'lucide-react';

interface BossBattleModalProps {
    isOpen: boolean;
    onClose: () => void;
    bossName: string;
    bossCp: number;
    playerCp: number;
    playerImage?: string;
    bossImage?: string;
    playerStats?: {
        attack: number;
        bossDamage: number;
        ied: number;
        critRate: number;
        critDamage: number;
    };
}

export default function BossBattleModal({
    isOpen,
    onClose,
    bossName,
    bossCp,
    playerCp,
    playerImage,
    bossImage,
    playerStats
}: BossBattleModalProps) {
    const maxPlayerHpValue = Math.max(100000, Math.floor(playerCp * 0.1));
    const maxBossHpValue = Math.max(100000, Math.floor(bossCp * 0.1));

    const [battleState, setBattleState] = useState<'ready' | 'fighting' | 'victory' | 'defeat'>('ready');
    const [playerHp, setPlayerHp] = useState(maxPlayerHpValue);
    const [bossHp, setBossHp] = useState(maxBossHpValue);
    const [isPlayerAttacking, setIsPlayerAttacking] = useState(false);
    const [isBossAttacking, setIsBossAttacking] = useState(false);
    const [playerDamageText, setPlayerDamageText] = useState<number | null>(null);
    const [bossDamageText, setBossDamageText] = useState<number | null>(null);

    useEffect(() => {
        if (isOpen) {
            setBattleState('ready');
            setPlayerHp(maxPlayerHpValue);
            setBossHp(maxBossHpValue);
            setIsPlayerAttacking(false);
            setIsBossAttacking(false);
            setPlayerDamageText(null);
            setBossDamageText(null);
        }
    }, [isOpen, maxPlayerHpValue, maxBossHpValue]);

    const startBattle = () => {
        setBattleState('fighting');
        simulateBattle();
    };

    const simulateBattle = () => {
        let currentPlayerHp = maxPlayerHpValue;
        let currentBossHp = maxBossHpValue;

        const playerBaseDamage = Math.floor(playerCp * 0.005);
        const bossBaseDamage = Math.floor(bossCp * 0.005);

        let turn = 0;
        const maxTurns = 50;
        let isPlayerTurn = true;

        const battleInterval = setInterval(() => {
            turn++;

            if (isPlayerTurn) {
                setIsPlayerAttacking(true);

                setTimeout(() => {
                    const numHits = Math.floor(Math.random() * 3) + 3;
                    let totalDamage = 0;

                    for (let i = 0; i < numHits; i++) {
                        const damage = Math.floor(playerBaseDamage * (0.8 + Math.random() * 0.4));
                        totalDamage += damage;
                    }

                    currentBossHp -= totalDamage;
                    setBossDamageText(totalDamage);
                    setBossHp(Math.max(0, currentBossHp));

                    setTimeout(() => {
                        setBossDamageText(null);
                        setIsPlayerAttacking(false);
                    }, 800);

                    if (currentBossHp <= 0) {
                        setBossHp(0);
                        setBattleState('victory');
                        clearInterval(battleInterval);
                        return;
                    }
                }, 300);
            } else {
                setIsBossAttacking(true);

                setTimeout(() => {
                    const numHits = Math.floor(Math.random() * 3) + 3; // 3-5타 (플레이어와 동일)
                    let totalDamage = 0;

                    for (let i = 0; i < numHits; i++) {
                        const damage = Math.floor(bossBaseDamage * (0.8 + Math.random() * 0.4));
                        totalDamage += damage;
                    }

                    currentPlayerHp -= totalDamage;
                    setPlayerDamageText(totalDamage);
                    setPlayerHp(Math.max(0, currentPlayerHp));

                    setTimeout(() => {
                        setPlayerDamageText(null);
                        setIsBossAttacking(false);
                    }, 800);

                    if (currentPlayerHp <= 0) {
                        setPlayerHp(0);
                        setBattleState('defeat');
                        clearInterval(battleInterval);
                        return;
                    }
                }, 300);
            }

            if (turn >= maxTurns) {
                setBattleState('defeat');
                clearInterval(battleInterval);
                return;
            }

            isPlayerTurn = !isPlayerTurn;
        }, 1200);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl">
                <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-gradient-to-r from-red-950/30 to-orange-950/30">
                    <div>
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Swords className="w-6 h-6 text-red-500" />
                            보스 전투
                        </h2>
                        <p className="text-sm text-slate-400 mt-1">{bossName}</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-bold text-cyan-400">내 캐릭터</span>
                                <span className="text-xs text-slate-400">{playerHp.toLocaleString()} / {maxPlayerHpValue.toLocaleString()}</span>
                            </div>
                            <div className="h-4 bg-slate-950 rounded-full overflow-hidden border border-cyan-700/50">
                                <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300" style={{ width: `${(playerHp / maxPlayerHpValue) * 100}%` }} />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-bold text-red-400">{bossName.split(' (')[0]}</span>
                                <span className="text-xs text-slate-400">{bossHp.toLocaleString()} / {maxBossHpValue.toLocaleString()}</span>
                            </div>
                            <div className="h-4 bg-slate-950 rounded-full overflow-hidden border border-red-700/50">
                                <div className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-300" style={{ width: `${(bossHp / maxBossHpValue) * 100}%` }} />
                            </div>
                        </div>
                    </div>

                    <div className="relative h-96 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-xl border-2 border-slate-800 overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1),transparent_70%)]"></div>
                        <div className="absolute bottom-20 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent opacity-50"></div>

                        <div className={`absolute left-24 bottom-20 transition-all duration-300 ${isPlayerAttacking ? 'translate-x-32' : 'translate-x-0'} ${isBossAttacking ? 'animate-shake' : ''}`}>
                            <div className="relative w-56 h-56">
                                {playerImage ? (
                                    <img src={playerImage} alt="Player" className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(0,255,255,0.8)] scale-x-[-1]" />
                                ) : (
                                    <div className="w-full h-full bg-cyan-500/20 border-2 border-cyan-500 rounded-lg flex items-center justify-center">
                                        <Shield className="w-24 h-24 text-cyan-400" />
                                    </div>
                                )}
                                {playerDamageText !== null && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full animate-damage-float">
                                        <span className="damage-number">{playerDamageText.toLocaleString()}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={`absolute right-24 bottom-20 transition-all duration-300 ${isBossAttacking ? '-translate-x-32' : 'translate-x-0'} ${isPlayerAttacking ? 'animate-shake' : ''}`}>
                            <div className="relative w-56 h-56">
                                {bossImage ? (
                                    <img src={bossImage} alt={bossName} className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(255,0,0,0.8)]" />
                                ) : (
                                    <div className="w-full h-full bg-red-500/20 border-2 border-red-500 rounded-lg flex items-center justify-center">
                                        <Zap className="w-24 h-24 text-red-400" />
                                    </div>
                                )}
                                {bossDamageText !== null && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full animate-damage-float">
                                        <span className="damage-number">{bossDamageText.toLocaleString()}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {isPlayerAttacking && (
                            <div className="absolute right-1/3 top-1/2 -translate-y-1/2">
                                <div className="text-6xl animate-ping text-yellow-500 opacity-75">💥</div>
                            </div>
                        )}
                        {isBossAttacking && (
                            <div className="absolute left-1/3 top-1/2 -translate-y-1/2">
                                <div className="text-6xl animate-ping text-orange-500 opacity-75">💥</div>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-950/50 p-3 rounded-lg border border-cyan-900/30">
                            <div className="text-xs text-slate-500 mb-1">내 전투력</div>
                            <div className="text-lg font-bold text-cyan-400">{(playerCp / 10000).toFixed(1)}만</div>
                        </div>
                        <div className="bg-slate-950/50 p-3 rounded-lg border border-red-900/30">
                            <div className="text-xs text-slate-500 mb-1">보스 전투력</div>
                            <div className="text-lg font-bold text-red-400">{(bossCp / 10000).toFixed(1)}만</div>
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-slate-800 bg-slate-950/50">
                    {battleState === 'ready' && (
                        <button onClick={startBattle} className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2">
                            <Swords className="w-5 h-5" />
                            전투 시작!
                        </button>
                    )}
                    {battleState === 'fighting' && (
                        <div className="text-center py-2">
                            <div className="inline-block animate-pulse text-yellow-500 font-bold">⚔️ 전투 중...</div>
                        </div>
                    )}
                    {battleState === 'victory' && (
                        <div className="space-y-2">
                            <div className="text-center text-2xl font-bold text-yellow-500 animate-bounce">🎉 승리! 🎉</div>
                            <button onClick={onClose} className="w-full px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-colors">닫기</button>
                        </div>
                    )}
                    {battleState === 'defeat' && (
                        <div className="space-y-2">
                            <div className="text-center text-xl font-bold text-red-500">💀 패배...</div>
                            <div className="flex gap-2">
                                <button onClick={() => { setBattleState('ready'); setPlayerHp(maxPlayerHpValue); setBossHp(maxBossHpValue); }} className="flex-1 px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-colors">다시 도전</button>
                                <button onClick={onClose} className="flex-1 px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-colors">닫기</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-10px); }
                    75% { transform: translateX(10px); }
                }
                @keyframes damage-float {
                    0% { opacity: 1; transform: translateY(0) scale(1); }
                    50% { opacity: 1; transform: translateY(-30px) scale(1.2); }
                    100% { opacity: 0; transform: translateY(-80px) scale(0.8); }
                }
                .animate-shake {
                    animation: shake 0.3s ease-in-out;
                }
                .animate-damage-float {
                    animation: damage-float 1s ease-out forwards;
                }
                
                /* 데미지 숫자 스타일 */
                .damage-number {
                    font-size: 2.5rem;
                    font-weight: 900;
                    color: white;
                    text-shadow: 
                        -2px -2px 0 black,
                        2px -2px 0 black,
                        -2px 2px 0 black,
                        2px 2px 0 black,
                        -2px 0 0 black,
                        2px 0 0 black,
                        0 -2px 0 black,
                        0 2px 0 black;
                    font-family: Arial Black, sans-serif;
                }
            `}</style>
        </div>
    );
}
