"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
    const [shockwave, setShockwave] = useState<'player' | 'boss' | null>(null);
    const [turn, setTurn] = useState(0);
    const [isShaking, setIsShaking] = useState(false);

    // 모바일 뒤로가기 처리
    const onCloseRef = React.useRef(onClose);

    // onClose가 변경되어도 useEffect가 재실행되지 않도록 ref 업데이트
    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            // 현재 상태가 이미 모달 오픈 상태가 아니면 히스토리 추가
            if (!window.history.state?.modalOpen) {
                window.history.pushState({ modalOpen: true }, '', window.location.href);
            }

            const handlePopState = () => {
                // 뒤로가기 이벤트가 발생하면 모달 닫기
                if (onCloseRef.current) {
                    onCloseRef.current();
                }
            };

            window.addEventListener('popstate', handlePopState);

            return () => {
                window.removeEventListener('popstate', handlePopState);
                // cleanup 시 history.back()을 호출하지 않음 (자동 닫힘 방지)
            };
        }
    }, [isOpen]);

    // 닫기 버튼 핸들러: 직접 닫는 대신 뒤로가기를 실행하여 popstate 이벤트를 유도하거나 히스토리를 정리함
    const handleClose = () => {
        window.history.back();
    };

    useEffect(() => {
        if (isOpen) {
            setBattleState('ready');
            setPlayerHp(maxPlayerHpValue);
            setBossHp(maxBossHpValue);
            setIsPlayerAttacking(false);
            setIsBossAttacking(false);
            setPlayerDamageText(null);
            setBossDamageText(null);
            setShockwave(null);
            setTurn(0);
            setIsShaking(false);

            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        } else {
            // Restore body scroll
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, maxPlayerHpValue, maxBossHpValue]);

    // 턴이 바뀔 때마다 부드럽게 흔들림 효과 적용
    useEffect(() => {
        if (battleState === 'fighting' && (playerDamageText !== null || bossDamageText !== null)) {
            setIsShaking(true);
            const timer = setTimeout(() => setIsShaking(false), 300);
            return () => clearTimeout(timer);
        }
    }, [turn, battleState, playerDamageText, bossDamageText]);

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
            setTurn(prev => prev + 1);
            const currentTurn = turn + 1;

            if (isPlayerTurn) {
                setIsPlayerAttacking(true);
                setShockwave('player');

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
                        setShockwave(null);
                    }, 400); // 타격 후 0.4초 뒤 복귀

                    if (currentBossHp <= 0) {
                        setBossHp(0);
                        setBattleState('victory');
                        clearInterval(battleInterval);
                        return;
                    }
                }, 250); // 0.25초 만에 타격
            } else {
                setIsBossAttacking(true);
                setShockwave('boss');

                setTimeout(() => {
                    const numHits = Math.floor(Math.random() * 3) + 3;
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
                        setShockwave(null);
                    }, 400); // 타격 후 0.4초 뒤 복귀

                    if (currentPlayerHp <= 0) {
                        setPlayerHp(0);
                        setBattleState('defeat');
                        clearInterval(battleInterval);
                        return;
                    }
                }, 250); // 0.25초 만에 타격
            }

            if (turn >= maxTurns) {
                setBattleState('defeat');
                clearInterval(battleInterval);
                return;
            }

            isPlayerTurn = !isPlayerTurn;
        }, 800); // 0.8초 간격 (적당한 빠름)
    };

    if (!isOpen) return null;

    const modalContent = createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black p-2 sm:p-4">
            <div
                className={`bg-slate-900 border border-slate-700 rounded-xl sm:rounded-2xl w-full max-w-3xl max-h-[95vh] sm:max-h-[90vh] flex flex-col shadow-2xl transition-all ${isShaking ? 'animate-screen-shake scale-105' : 'scale-100'}`}
            >
                <div className="flex items-center justify-between p-3 sm:p-6 border-b border-slate-800 bg-gradient-to-r from-red-950/30 to-orange-950/30">
                    <div>
                        <h2 className="text-lg sm:text-2xl font-bold text-white flex items-center gap-2">
                            <Swords className="w-4 h-4 sm:w-6 sm:h-6 text-red-500" />
                            보스 전투
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-400 mt-1">{bossName}</p>
                    </div>
                    <button onClick={handleClose} className="p-1.5 sm:p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                        <X size={20} className="sm:w-6 sm:h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4">
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

                    <div className="relative h-64 sm:h-96 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-xl border-2 border-slate-800 overflow-hidden">
                        {/* Dynamic Background */}
                        <div className={`absolute inset-0 transition-all duration-150 ${isPlayerAttacking ? 'bg-gradient-to-r from-cyan-500/40 to-transparent' : isBossAttacking ? 'bg-gradient-to-l from-red-500/40 to-transparent' : 'bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1),transparent_70%)]'}`}></div>

                        {/* Shockwave Effect */}
                        {shockwave && (
                            <div className={`absolute inset-0 ${shockwave === 'player' ? 'animate-shockwave-right' : 'animate-shockwave-left'}`}>
                                <div className="absolute inset-0 bg-gradient-radial from-white/30 to-transparent"></div>
                            </div>
                        )}

                        <div className="absolute bottom-12 sm:bottom-20 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent opacity-50"></div>

                        {/* Player Character with Varied Attacks */}
                        <div className={`absolute left-8 sm:left-24 bottom-12 sm:bottom-20 transition-all duration-200 z-20 ${isPlayerAttacking
                            ? turn % 3 === 1
                                ? 'translate-x-24 sm:translate-x-40 -translate-y-6 sm:-translate-y-10 rotate-8'
                                : turn % 3 === 2
                                    ? 'translate-x-28 sm:translate-x-48 translate-y-1 scale-105'
                                    : 'translate-x-20 sm:translate-x-32 translate-y-2 scale-125 -rotate-2'
                            : 'translate-x-0 translate-y-0 rotate-0 scale-100'
                            } ${isBossAttacking ? 'animate-hit-shake' : ''}`}>
                            <div className="relative w-32 h-32 sm:w-56 sm:h-56">
                                {playerImage ? (
                                    <img src={playerImage} alt="Player" className={`w-full h-full object-contain drop-shadow-[0_0_20px_rgba(0,255,255,0.8)] scale-x-[-1] transition-all ${isPlayerAttacking ? 'brightness-150 saturate-150' : ''}`} />
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

                        {/* Boss Monster with Varied Attacks */}
                        <div className={`absolute right-8 sm:right-24 bottom-12 sm:bottom-20 transition-all duration-200 ${isBossAttacking
                            ? turn % 3 === 1
                                ? '-translate-x-24 sm:-translate-x-40 -translate-y-6 sm:-translate-y-10 -rotate-8'
                                : turn % 3 === 2
                                    ? '-translate-x-28 sm:-translate-x-48 translate-y-1 scale-105'
                                    : '-translate-x-20 sm:-translate-x-32 translate-y-2 scale-125 rotate-2'
                            : 'translate-x-0 translate-y-0 rotate-0 scale-100'
                            } ${isPlayerAttacking ? 'animate-hit-shake' : ''} ${battleState === 'victory' ? 'opacity-0 scale-0 rotate-180' : 'opacity-100 scale-100'}`}>
                            <div className="relative w-32 h-32 sm:w-56 sm:h-56">
                                {bossImage ? (
                                    <img src={bossImage} alt={bossName} className={`w-full h-full object-contain drop-shadow-[0_0_20px_rgba(255,0,0,0.8)] transition-all ${isBossAttacking ? 'brightness-150 saturate-150' : ''}`} />
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

                        {/* Enhanced Impact Effects */}
                        {isPlayerAttacking && (
                            <div className="absolute right-1/3 top-1/2 -translate-y-1/2 z-30">
                                <div className="animate-impact-burst text-yellow-500" style={{ fontSize: '100px' }}>💥</div>
                                <div className="absolute inset-0 text-6xl animate-ping text-yellow-400 opacity-60">💥</div>
                                <div className="absolute inset-0 text-7xl animate-ping-slow text-orange-400 opacity-40">💥</div>
                            </div>
                        )}
                        {isBossAttacking && (
                            <div className="absolute left-1/3 top-1/2 -translate-y-1/2 z-30">
                                <div className="animate-impact-burst text-orange-500" style={{ fontSize: '100px' }}>💥</div>
                                <div className="absolute inset-0 text-6xl animate-ping text-orange-400 opacity-60">💥</div>
                                <div className="absolute inset-0 text-7xl animate-ping-slow text-red-400 opacity-40">💥</div>
                            </div>
                        )}

                        {/* Victory Overlay Removed - Boss animation is enough */}

                        {/* Defeat Overlay */}
                        {battleState === 'defeat' && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md animate-fade-in z-40">
                                <div className="text-center">
                                    <div className="text-8xl font-black text-red-500 mb-6 animate-shake-continuous" style={{ textShadow: '0 0 50px rgba(255,0,0,1), -4px -4px 0 black, 4px -4px 0 black, -4px 4px 0 black, 4px 4px 0 black' }}>
                                        💀 패배 💀
                                    </div>
                                    <div className="text-4xl font-bold text-white mb-2" style={{ textShadow: '-3px -3px 0 black, 3px -3px 0 black, -3px 3px 0 black, 3px 3px 0 black' }}>
                                        모의 전투 패배
                                    </div>
                                    <div className="text-xl text-red-400" style={{ textShadow: '-2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 2px 2px 0 black' }}>
                                        더 강해져서 돌아오세요!
                                    </div>
                                </div>
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
                        <button onClick={startBattle} className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 hover:scale-105">
                            <Swords className="w-5 h-5" />
                            전투 시작!
                        </button>
                    )}
                    {battleState === 'fighting' && (
                        <div className="text-center py-2">
                            <div className="inline-block animate-pulse text-yellow-500 font-bold text-lg">⚔️ 전투 중...</div>
                        </div>
                    )}
                    {battleState === 'victory' && (
                        <div className="space-y-2">
                            <div className="flex gap-2">
                                <button onClick={handleClose} className="flex-1 px-6 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-bold rounded-lg transition-all hover:scale-105">
                                    다른 보스 선택
                                </button>
                                <button onClick={handleClose} className="flex-1 px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-colors">닫기</button>
                            </div>
                        </div>
                    )}
                    {battleState === 'defeat' && (
                        <div className="space-y-2">
                            <div className="flex gap-2">
                                <button onClick={() => { setBattleState('ready'); setPlayerHp(maxPlayerHpValue); setBossHp(maxBossHpValue); }} className="flex-1 px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-all hover:scale-105">다시 도전</button>
                                <button onClick={handleClose} className="flex-1 px-6 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-bold rounded-lg transition-colors">
                                    다른 보스 선택
                                </button>
                            </div>
                            <button onClick={handleClose} className="w-full px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-colors">닫기</button>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                @keyframes screen-shake {
                    0%, 100% { transform: translate(0, 0) scale(1.05); }
                    10% { transform: translate(-6px, 2px) scale(1.05); }
                    20% { transform: translate(6px, -2px) scale(1.05); }
                    30% { transform: translate(-6px, -2px) scale(1.05); }
                    40% { transform: translate(6px, 2px) scale(1.05); }
                    50% { transform: translate(-6px, 2px) scale(1.05); }
                    60% { transform: translate(6px, -2px) scale(1.05); }
                    70% { transform: translate(-6px, -2px) scale(1.05); }
                    80% { transform: translate(6px, 2px) scale(1.05); }
                    90% { transform: translate(-6px, 2px) scale(1.05); }
                }
                @keyframes hit-shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-15px); }
                    20%, 40%, 60%, 80% { transform: translateX(15px); }
                }
                @keyframes shake-continuous {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                @keyframes damage-float {
                    0% { opacity: 1; transform: translateY(0) scale(1.5); }
                    50% { opacity: 1; transform: translateY(-40px) scale(1.8); }
                    100% { opacity: 0; transform: translateY(-100px) scale(1); }
                }
                @keyframes impact-burst {
                    0% { transform: scale(0.3) rotate(0deg); opacity: 0; }
                    50% { transform: scale(1.5) rotate(180deg); opacity: 1; }
                    100% { transform: scale(1) rotate(360deg); opacity: 0.7; }
                }
                @keyframes ping-slow {
                    75%, 100% { transform: scale(2); opacity: 0; }
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: scale(0.8); }
                    to { opacity: 1; transform: scale(1); }
                }
                @keyframes victory-bounce {
                    0%, 100% { transform: translateY(0) scale(1); }
                    50% { transform: translateY(-30px) scale(1.1); }
                }
                @keyframes pulse-slow {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                @keyframes shockwave-right {
                    0% { transform: scale(0) translateX(-50%); opacity: 1; }
                    100% { transform: scale(3) translateX(50%); opacity: 0; }
                }
                @keyframes shockwave-left {
                    0% { transform: scale(0) translateX(50%); opacity: 1; }
                    100% { transform: scale(3) translateX(-50%); opacity: 0; }
                }
                
                .animate-screen-shake {
                    animation: screen-shake 0.2s ease-in-out;
                }
                .animate-hit-shake {
                    animation: hit-shake 0.3s ease-in-out;
                }
                .animate-shake-continuous {
                    animation: shake-continuous 0.5s ease-in-out infinite;
                }
                .animate-damage-float {
                    animation: damage-float 1s ease-out forwards;
                }
                .animate-impact-burst {
                    animation: impact-burst 0.3s ease-out;
                }
                .animate-ping-slow {
                    animation: ping-slow 1s cubic-bezier(0, 0, 0.2, 1) infinite;
                }
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out;
                }
                .animate-victory-bounce {
                    animation: victory-bounce 1.5s ease-in-out infinite;
                }
                .animate-pulse-slow {
                    animation: pulse-slow 2s ease-in-out infinite;
                }
                .animate-shockwave-right {
                    animation: shockwave-right 0.5s ease-out;
                }
                .animate-shockwave-left {
                    animation: shockwave-left 0.5s ease-out;
                }
                
                .damage-number {
                    font-size: 2rem;
                    font-weight: 900;
                    color: white;
                    text-shadow: 
                        -3px -3px 0 black,
                        3px -3px 0 black,
                        -3px 3px 0 black,
                        3px 3px 0 black,
                        -3px -3px 0 black,
                        3px 3px 0 black;
                }
            `}</style>
        </div>,
        document.body
    );

    return modalContent;
}
