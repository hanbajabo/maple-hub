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
}

export default function WeaponDiagnosisModal({ item, onClose }: WeaponDiagnosisModalProps) {
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
        setCommentary(generateItemCommentary(item));

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

    // 데스티니 무기 전용 UI (유지)
    if (item && item.item_name.includes('데스티니')) {
        return createPortal(
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4" onClick={handleClose}>
                {/* ... (기존 데스티니 무기 UI 코드 유지) ... */}
                <div
                    className="relative w-full max-w-2xl p-5 sm:p-12 rounded-3xl overflow-hidden shadow-2xl text-center border border-purple-500/30 mx-4"
                    style={{
                        background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
                        boxShadow: '0 0 50px rgba(139, 92, 246, 0.3)'
                    }}
                    onClick={e => e.stopPropagation()}
                >
                    <div className="absolute inset-0 bg-[url('https://maplestory.io/api/wzimg/Effect/BasicEff.img/LevelUp/0')] opacity-10 bg-cover bg-center animate-pulse pointer-events-none"></div>
                    <div className="relative z-10 mb-4 sm:mb-8 inline-block">
                        <div className="absolute inset-0 bg-purple-500 blur-2xl opacity-50 rounded-full animate-pulse"></div>
                        <img src={item.item_icon} alt={item.item_name} className="w-20 h-20 sm:w-32 sm:h-32 object-contain relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                    </div>
                    <h2 className="relative z-10 text-xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-purple-200 mb-1 sm:mb-2 drop-shadow-lg whitespace-nowrap">{item.item_name}</h2>
                    <div className="relative z-10 text-purple-300 font-bold text-xs sm:text-xl mb-6 sm:mb-10 tracking-widest">DESTINY WEAPON</div>
                    <div className="relative z-10 bg-black/40 backdrop-blur-sm p-4 sm:p-8 rounded-2xl border border-purple-500/20 mb-6 sm:mb-8">
                        <p className="text-base sm:text-3xl font-bold text-white mb-2 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)] break-keep">평가 불가의 초월적 아이템입니다.</p>
                        <p className="text-purple-200 text-xs sm:text-lg mt-2 sm:mt-4 break-keep">이 아이템은 기존의 상식을 뛰어넘는 힘을 가지고 있습니다.<br className="hidden sm:block" /> 더 이상의 진단은 무의미합니다.</p>
                    </div>
                    <button onClick={handleClose} className="relative z-10 px-6 py-2 sm:px-10 sm:py-3 bg-purple-600 hover:bg-purple-500 text-white text-sm sm:text-base font-bold rounded-full transition-all shadow-[0_0_20px_rgba(147,51,234,0.5)] hover:shadow-[0_0_30px_rgba(147,51,234,0.8)]">전설을 확인했습니다</button>
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
