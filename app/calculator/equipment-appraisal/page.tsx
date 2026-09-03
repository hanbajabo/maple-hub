"use client";
import React, { useState } from 'react';
import { getOcid, getCharacterBasic, getCharacterItemEquipment } from '@/lib/nexon';
import { ItemData } from '@/app/page';
import TotalDiagnosisModal from '@/components/TotalDiagnosisModal';
import { Calculator, Search, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { AdBanner } from '@/components/AdSense';

export default function EquipmentAppraisalPage() {
    const [nickname, setNickname] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    const [equipment, setEquipment] = useState<(ItemData | null)[]>([]);
    const [characterClass, setCharacterClass] = useState('');
    const [characterInfo, setCharacterInfo] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSearch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!nickname.trim()) return;

        setIsLoading(true);
        setError('');
        
        try {
            const ocid = await getOcid(nickname);
            const [basic, equip] = await Promise.all([
                getCharacterBasic(ocid),
                getCharacterItemEquipment(ocid)
            ]);

            setCharacterInfo(basic);
            setCharacterClass(basic.character_class);
            setEquipment(equip.item_equipment || []);
            setIsModalOpen(true);
        } catch (err) {
            setError('캐릭터 정보를 불러올 수 없습니다. 닉네임을 확인해주세요.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 pt-24 relative overflow-x-hidden">
            {/* 은은한 배경 이미지 */}
            <div 
                className="fixed inset-0 bg-cover bg-center pointer-events-none opacity-12 filter contrast-110 brightness-90"
                style={{ backgroundImage: "url('/images/appraisal_bg.jpg')" }}
            />
            {/* 부드러운 오버레이 그라데이션 */}
            <div className="fixed inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/80 to-slate-950 pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-3 sm:space-y-4">
                    <div className="flex justify-center mx-auto mb-3 sm:mb-4">
                        <Image src="/images/meso_icon.png" alt="Meso Icon" width={64} height={64} className="w-12 h-12 sm:w-16 sm:h-16 drop-shadow-lg" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-md text-center break-keep leading-snug px-2">
                        <span>메이플스토리 장비 기댓값 진단기</span>{' '}
                        <span className="inline-block text-xs sm:text-sm font-extrabold text-maple-orange bg-orange-500/15 border border-maple-orange/40 px-2 py-0.5 rounded-full tracking-wide align-middle whitespace-nowrap shadow-sm ml-1">
                            Beta
                        </span>
                    </h1>
                    <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-xl mx-auto leading-relaxed break-keep px-2">
                        캐릭터가 착용 중인 모든 장비의 노작 시세, 스타포스, 잠재능력을 종합하여 
                        해당 스펙을 맞추기 위해 필요한 <strong className="text-maple-orange font-bold">총 기댓값(메소)</strong>을 계산합니다.
                    </p>
                </div>

                {/* Search Box */}
                <div className="bg-slate-900/85 p-4 sm:p-6 md:p-8 rounded-2xl border border-slate-700/80 backdrop-blur-md shadow-2xl">
                    <form onSubmit={handleSearch} className="flex gap-2 max-w-lg mx-auto">
                        <div className="relative flex-1 min-w-0">
                            <input
                                type="text"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                placeholder="캐릭터 닉네임 입력..."
                                className="w-full bg-slate-950/80 border border-slate-700 text-white px-3 sm:px-4 py-2.5 sm:py-3 pl-9 sm:pl-11 rounded-xl focus:outline-none focus:border-maple-orange focus:ring-1 focus:ring-maple-orange transition-all placeholder:text-slate-500 text-sm sm:text-base"
                            />
                            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2" />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading || !nickname.trim()}
                            className="bg-maple-orange hover:bg-orange-500 disabled:opacity-50 disabled:hover:bg-maple-orange text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap shadow-lg shadow-maple-orange/20 text-sm sm:text-base shrink-0"
                        >
                            {isLoading ? <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" /> : '진단하기'}
                        </button>
                    </form>
                    <p className="text-center text-xs text-slate-400 mt-3.5 flex items-center justify-center gap-1.5">
                        <span className="text-amber-400">💡</span>
                        <span>혹시 진단 창에서 결과 값이 바로 나오지 않는다면 창 내의 <strong className="text-yellow-400">'다시 감정하기'</strong> 버튼을 눌러주세요.</span>
                    </p>
                    {error && (
                        <p className="text-red-400 text-center mt-3 text-sm bg-red-400/10 py-2 rounded-lg">{error}</p>
                    )}
                </div>

                {/* Info */}
                <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-300">
                    <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700/60 backdrop-blur-sm shadow-lg">
                        <h3 className="font-bold text-white mb-2 flex items-center gap-2">📊 실시간 경매장 시세</h3>
                        <p className="text-slate-400">스카니아 서버 기준 최신 노작 아이템 시세를 반영하여 계산합니다.</p>
                    </div>
                    <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700/60 backdrop-blur-sm shadow-lg">
                        <h3 className="font-bold text-white mb-2 flex items-center gap-2">⭐ 스타포스 기댓값</h3>
                        <p className="text-slate-400">파괴 방지 최적화 경로 및 하락 방지 로직이 모두 적용된 기댓값입니다.</p>
                    </div>
                    <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700/60 backdrop-blur-sm shadow-lg">
                        <h3 className="font-bold text-white mb-2 flex items-center gap-2">🎲 큐브 기댓값</h3>
                        <p className="text-slate-400">직업별 유효 주스탯을 자동 판별하여 등급업 및 3줄 유효 기댓값을 산출합니다.</p>
                    </div>
                </div>

                {/* Google AdSense Banner */}
                <div className="pt-2">
                    <AdBanner dataAdSlot="8162808816" className="w-full" />
                </div>
            </div>

            {equipment.length > 0 && (
                <TotalDiagnosisModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    equipmentGrid={equipment}
                    characterClass={characterClass}
                    characterInfo={characterInfo}
                />
            )}
        </div>
    );
}
