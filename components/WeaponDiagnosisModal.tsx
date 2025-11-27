import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
    evaluateStarforce,
    evaluateArmorStarforce,
    evaluatePotential,
    evaluateWeaponFlame,
    evaluateArmorFlame,
    ItemEvaluationResult
} from '../lib/item_evaluator';
import { generateItemCommentary } from '../lib/ai-commentary';
import AICommentary from './AICommentary';
import ItemCard from './ItemCard';

interface WeaponDiagnosisModalProps {
    item: any; // ItemData type
    onClose: () => void;
    characterClass: string;
}

export default function WeaponDiagnosisModal({ item, onClose, characterClass }: WeaponDiagnosisModalProps) {
    const [result, setResult] = useState<ItemEvaluationResult | null>(null);
    const [commentary, setCommentary] = useState("");

    // 히스토리 관리 및 스크롤 방지
    useEffect(() => {
        if (item) {
            window.history.pushState({ modal: 'weaponDiagnosis' }, '', window.location.href);
            document.body.style.overflow = 'hidden';

            const handlePopState = () => {
                onClose();
            };

            window.addEventListener('popstate', handlePopState);

            return () => {
                document.body.style.overflow = 'unset';
                window.removeEventListener('popstate', handlePopState);
            };
        }
    }, [item, onClose]);

    const handleClose = () => {
        window.history.back();
    };

    // 아이템 타입 판별
    const getEquipmentType = (item: any): '무기' | '방어구' | '장신구' | '보조무기' | '엠블렘' => {
        const slot = item.item_equipment_slot;
        const name = item.item_name;

        if (slot === '엠블렘' || slot === 'Emblem' || name.includes('엠블렘')) return '엠블렘';
        if (slot === '보조무기' || slot === 'Sub Weapon' || slot === 'SubWeapon' || name.includes('보조무기') || item.item_equipment_part === '보조무기') return '보조무기';
        if (name.includes('라즐리') || name.includes('라피스')) return '무기';

        const subWeaponKeywords = ['카타라', '방패', '마도서', '여우구슬', '단검용 검집', '부적', '로잘리오', '쇠사슬', '마법화살', '소울링', '매그넘', '손목보호대', '조준기', '쥬얼', '그립', '화약통', '무게추', '문서', '매직윙', '수정구', '오브', '카드', '호루라기', '노리개', '선추'];
        if (subWeaponKeywords.some(kw => name.includes(kw)) && slot !== '무기' && slot !== 'Weapon' && slot !== 'Weapoon') return '보조무기';

        if (slot === '무기' || slot === 'Weapon') return '무기';

        // 장신구 분류
        const accessorySlots = ['귀고리', '펜던트', '벨트', '포켓 아이템', '뱃지', '훈장', '어깨장식', '반지'];
        if (accessorySlots.includes(slot)) return '장신구';

        return '방어구';
    };

    const type = item ? getEquipmentType(item) : '무기';

    useEffect(() => {
        if (!item) return;

        // AI 분석 멘트 생성
        setCommentary(generateItemCommentary(item, characterClass));

        // 1. 스타포스 진단
        let sfResult = null;
        const starforce = parseInt(item.starforce || "0");

        if (type === '무기') {
            sfResult = evaluateStarforce(starforce, 22, item.item_name);
        } else if (type === '방어구' || type === '장신구') {
            // 방어구/장신구는 별도 평가
            sfResult = evaluateArmorStarforce(starforce);
        } else {
            sfResult = {
                current_star: 0,
                target_star: 0,
                success_rate: 0,
                destroy_risk: 0,
                avg_destroy_count: 0,
                evaluation: '안전',
                recommendation: '해당 아이템은 스타포스 강화 대상이 아닙니다.'
            };
        }

        // 2. 잠재능력 진단
        const potentials = [
            item.potential_option_1,
            item.potential_option_2,
            item.potential_option_3
        ].filter(Boolean);

        let potResult;
        if (!item.potential_option_grade || potentials.length === 0) {
            // 잠재능력이 없는 경우
            potResult = {
                current_grade: '레어' as const,
                target_grade: '레전드리' as const,
                upgrade_rate: 0,
                ceiling_count: 0,
                ceiling_cost: 0,
                avg_cost: 0,
                options_score: 0,
                good_options: [],
                recommendation: '이 아이템에는 잠재능력이 설정되지 않았습니다.'
            };
        } else {
            potResult = evaluatePotential(
                'main',
                item.potential_option_grade,
                potentials,
                item.item_base_option.base_equipment_level,
                type,
                item.item_equipment_slot
            );
        }

        // 3. 에디셔널 진단
        const addPotentials = [
            item.additional_potential_option_1,
            item.additional_potential_option_2,
            item.additional_potential_option_3
        ].filter(Boolean);

        let addPotResult;
        if (!item.additional_potential_option_grade || addPotentials.length === 0) {
            // 에디셔널이 없는 경우
            addPotResult = {
                current_grade: '레어' as const,
                target_grade: '레전드리' as const,
                upgrade_rate: 0,
                ceiling_count: 0,
                ceiling_cost: 0,
                avg_cost: 0,
                options_score: 0,
                good_options: [],
                recommendation: '이 아이템에는 에디셔널 잠재능력이 설정되지 않았습니다.'
            };
        } else {
            addPotResult = evaluatePotential(
                'additional',
                item.additional_potential_option_grade,
                addPotentials,
                item.item_base_option.base_equipment_level,
                type,
                item.item_equipment_slot
            );
        }

        // 4. 추옵 진단
        let flameResult = null;

        // 추가옵션이 붙지 않는 부위 목록 (반지, 엠블렘, 보조무기, 뱃지, 훈장, 심장, 어깨장식)
        const noFlameSlots = ['반지', '엠블렘', '보조무기', '뱃지', '훈장', '기계 심장', '기계심장', '어깨장식'];
        const isNoFlameSlot = noFlameSlots.some(slot => item.item_equipment_slot.includes(slot) || item.item_equipment_slot === slot);

        // 추가옵션 존재 여부 확인
        const hasAddOption = item.item_add_option && Object.values(item.item_add_option).some((val: any) => val !== "0" && val !== 0);

        if (isNoFlameSlot) {
            flameResult = {
                tier: 0,
                is_weapon: false,
                score: 0,
                evaluation: '해당 없음',
                recommendation: '이 부위는 추가옵션이 부여되지 않습니다.'
            };
        } else if (!hasAddOption) {
            // 추가옵션이 아예 없는 경우
            flameResult = {
                tier: 0,
                is_weapon: false,
                score: 0,
                evaluation: '미설정',
                recommendation: '이 아이템에는 추가옵션이 존재하지 않습니다. 환생의 불꽃을 사용하여 추가옵션을 부여해보세요.'
            };
        } else if (type === '무기' || (type === '보조무기' && item.item_name.includes('라피스'))) {
            const level = item.item_base_option.base_equipment_level;
            const baseAtt = Number(item.item_base_option.attack_power);
            const addAtt = Number(item.item_add_option.attack_power);

            let tier = 0;
            if (baseAtt > 0 && addAtt > 0) {
                const k = Math.floor(level / 40) + 1;
                for (let step = 7; step >= 3; step--) {
                    const multiplier = Math.pow(1.1, step - 3);
                    const percentage = k * step * multiplier;
                    const calculated = Math.ceil((baseAtt * percentage) / 100);
                    if (Math.abs(calculated - addAtt) <= 1) {
                        tier = 8 - step;
                        break;
                    }
                }
            }

            const addOptionsList = [];
            if (addAtt > 0) addOptionsList.push(`공격력 +${addAtt}`);
            if (item.item_add_option.boss_damage !== "0") addOptionsList.push(`보공 +${item.item_add_option.boss_damage}%`);
            if (item.item_add_option.damage !== "0") addOptionsList.push(`데미지 +${item.item_add_option.damage}%`);
            if (item.item_add_option.all_stat !== "0") addOptionsList.push(`올스탯 +${item.item_add_option.all_stat}%`);

            flameResult = evaluateWeaponFlame(tier, addOptionsList, item.item_name);
        } else if (type === '보조무기' || type === '엠블렘') {
            // 보조무기와 엠블렘은 추가옵션이 붙지 않음
            flameResult = {
                tier: 0,
                is_weapon: false,
                score: 0,
                evaluation: '준수',
                recommendation: '이 아이템은 추가옵션이 부여되지 않습니다.'
            };
        } else {
            // 방어구/장신구 추가옵션 평가
            const level = item.item_base_option.base_equipment_level;
            const add = item.item_add_option;

            const str = Number(add.str) || 0;
            const dex = Number(add.dex) || 0;
            const int = Number(add.int) || 0;
            const luk = Number(add.luk) || 0;
            const att = Number(add.attack_power) || 0;
            const magic = Number(add.magic_power) || 0;
            const allStat = Number(add.all_stat) || 0;

            const scoreSTR = str + (att * 4) + (allStat * 10);
            const scoreDEX = dex + (att * 4) + (allStat * 10);
            const scoreINT = int + (magic * 4) + (allStat * 10);
            const scoreLUK = luk + (att * 4) + (allStat * 10);

            const maxScore = Math.max(scoreSTR, scoreDEX, scoreINT, scoreLUK);

            flameResult = evaluateArmorFlame(level, maxScore);
        }

        setResult({
            starforce: sfResult as any,
            potential: potResult,
            additional_potential: addPotResult,
            flame: flameResult as any,
            summary: ''
        });

    }, [item]);

    // 데스티니 무기 전용 UI (웅장한 리디자인)
    if (item && item.item_name.includes('데스티니')) {
        return createPortal(
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 overflow-hidden" onClick={handleClose}>
                {/* 배경 애니메이션 효과 */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black animate-spin opacity-50" style={{ animationDuration: '60s' }}></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://maplestory.io/api/wzimg/Effect/BasicEff.img/LevelUp/0')] opacity-5 bg-cover bg-center mix-blend-screen"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-black/80"></div>
                </div>

                <div
                    className="relative w-full max-w-3xl p-8 sm:p-16 rounded-[3rem] overflow-hidden text-center border border-purple-400/30 mx-4 transform transition-all hover:scale-[1.02] duration-500"
                    style={{
                        background: 'linear-gradient(180deg, rgba(15, 12, 41, 0.9) 0%, rgba(48, 43, 99, 0.9) 50%, rgba(36, 36, 62, 0.9) 100%)',
                        boxShadow: '0 0 80px rgba(147, 51, 234, 0.4), inset 0 0 30px rgba(147, 51, 234, 0.2)'
                    }}
                    onClick={e => e.stopPropagation()}
                >
                    {/* 장식용 테두리 */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-70"></div>
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-70"></div>

                    {/* 아이콘 섹션 */}
                    <div className="relative z-10 mb-8 sm:mb-12 inline-block group">
                        <div className="absolute inset-0 bg-purple-600 blur-[60px] opacity-40 rounded-full animate-pulse group-hover:opacity-60 transition-opacity duration-700"></div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-400 to-fuchsia-400 blur-[40px] opacity-30 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                        <div className="relative">
                            <img
                                src={item.item_icon}
                                alt={item.item_name}
                                className="w-24 h-24 sm:w-40 sm:h-40 object-contain relative z-10 drop-shadow-[0_0_25px_rgba(255,255,255,0.6)] transform group-hover:scale-110 transition-transform duration-500"
                            />
                            {/* 후광 효과 */}
                            <div className="absolute -inset-4 border-2 border-purple-300/30 rounded-full animate-spin opacity-50" style={{ animationDuration: '10s', animationDirection: 'reverse' }}></div>
                            <div className="absolute -inset-8 border border-purple-300/10 rounded-full animate-spin opacity-30" style={{ animationDuration: '15s' }}></div>
                        </div>
                    </div>

                    {/* 텍스트 섹션 */}
                    <div className="relative z-10 space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-purple-100 to-purple-300 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)] tracking-tight">
                                {item.item_name}
                            </h2>
                            <div className="flex items-center justify-center gap-3 opacity-80">
                                <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-purple-400"></span>
                                <span className="text-purple-300 font-bold text-sm sm:text-lg tracking-[0.3em] uppercase">Destiny Weapon</span>
                                <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-purple-400"></span>
                            </div>
                        </div>

                        <div className="py-8 px-4 relative">
                            <div className="absolute inset-0 bg-purple-500/5 blur-xl rounded-full transform scale-x-150"></div>
                            <p className="relative text-xl sm:text-4xl font-bold text-white mb-4 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)] leading-relaxed break-keep">
                                "데이터의 범주를 넘어선<br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 to-purple-300">초월적 존재</span>입니다."
                            </p>
                            <p className="relative text-purple-200 text-sm sm:text-xl font-medium leading-relaxed opacity-90 break-keep">
                                단풍이 AI조차 감히 평가할 수 없는<br />
                                절대적인 힘이 느껴집니다.
                            </p>
                        </div>
                    </div>

                    {/* 버튼 섹션 */}
                    <div className="mt-8 sm:mt-12 relative z-10">
                        <button
                            onClick={handleClose}
                            className="group relative px-8 py-3 sm:px-12 sm:py-4 bg-transparent overflow-hidden rounded-full transition-all hover:scale-105"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-fuchsia-600 to-purple-700 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
                            <span className="relative text-white text-base sm:text-lg font-bold tracking-wider flex items-center justify-center gap-2">
                                <span>✨</span> 전설을 경배합니다 <span>✨</span>
                            </span>
                            <div className="absolute inset-0 rounded-full ring-2 ring-white/20 group-hover:ring-white/50 transition-all duration-500"></div>
                        </button>
                    </div>
                </div>
            </div>,
            document.body
        );
    }

    if (!item || !result) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={handleClose}>
            <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-7xl p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar" onClick={e => e.stopPropagation()}>

                {/* Close Button */}
                <button onClick={handleClose} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column: Item Card Visual */}
                    <div className="w-full lg:w-[400px] shrink-0">
                        <ItemCard item={item} />
                    </div>

                    {/* Right Column: Diagnosis Results */}
                    <div className="flex-1 space-y-6">
                        {/* AI Commentary Section */}
                        <div className="mb-2">
                            <AICommentary text={commentary} />
                        </div>

                        <div className="mb-4">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                ⚔️ 정밀 진단 리포트
                            </h2>
                            <p className="text-slate-400 text-sm">해당 아이템의 스펙을 분석한 결과입니다.</p>
                        </div>

                        {/* 1. Starforce Section */}
                        {(type === '무기' || type === '방어구' || type === '장신구') && (
                            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                                    <span>⭐</span> 스타포스 진단
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400">현재 상태</span>
                                        <span className="text-white font-bold text-lg">{result.starforce.current_star}성</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400">{type === '무기' ? '위험도 평가' : '품질 평가'}</span>
                                        <span className={`font-bold px-2 py-0.5 rounded ${['종결', '최고', '훌륭', '안전'].includes(result.starforce.evaluation) ? 'bg-green-500/20 text-green-400' :
                                            ['좋음', '준수'].includes(result.starforce.evaluation) ? 'bg-blue-500/20 text-blue-400' :
                                                ['보통'].includes(result.starforce.evaluation) ? 'bg-yellow-500/20 text-yellow-400' :
                                                    'bg-red-500/20 text-red-400'
                                            }`}>
                                            {result.starforce.evaluation}
                                        </span>
                                    </div>
                                    <div className="bg-slate-900/50 p-3 rounded-lg text-sm text-slate-300 mt-2">
                                        {result.starforce.recommendation}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 2. Flame Section */}
                        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                            <h3 className="text-xl font-bold text-lime-400 mb-4 flex items-center gap-2">
                                <span>🔥</span> 추가옵션 진단
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">{result.flame.is_weapon ? '추옵 등급' : '옵션 급수'}</span>
                                    <span className="text-white font-bold text-lg">
                                        {result.flame.is_weapon
                                            ? (result.flame.tier > 0 ? `${result.flame.tier}추` : '알 수 없음')
                                            : (result.flame.score > 0 ? `${result.flame.score}급` : '옵션 없음')
                                        }
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">평가</span>
                                    <span className={`font-bold px-2 py-0.5 rounded ${result.flame.evaluation === '종결' ? 'bg-green-500/20 text-green-400' : result.flame.evaluation === '준수' ? 'bg-blue-500/20 text-blue-400' : result.flame.evaluation === '보통' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                                        {result.flame.evaluation}
                                    </span>
                                </div>
                                <div className="bg-slate-900/50 p-3 rounded-lg text-sm text-slate-300 mt-2">
                                    {result.flame.recommendation}
                                </div>
                            </div>
                        </div>

                        {/* 3. Potential Section */}
                        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                            <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                                <span>🔮</span> 잠재능력 진단
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">현재 등급</span>
                                    <span className="text-white font-bold">{result.potential.current_grade}</span>
                                </div>

                                <div className="bg-slate-900/50 p-3 rounded-lg text-sm text-slate-300 mt-2">
                                    {result.potential.recommendation}
                                </div>
                            </div>
                        </div>

                        {/* 4. Additional Potential Section */}
                        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                            <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                                <span>💠</span> 에디셔널 진단
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">현재 등급</span>
                                    <span className="text-white font-bold">{result.additional_potential.current_grade}</span>
                                </div>

                                <div className="bg-slate-900/50 p-3 rounded-lg text-sm text-slate-300 mt-2">
                                    {result.additional_potential.recommendation}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
