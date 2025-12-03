import React from 'react';

interface Stage1ContentProps {
    setCounts?: any;
    isGenesisWeapon?: boolean;
}

export const Stage1Content: React.FC<Stage1ContentProps> = ({ setCounts, isGenesisWeapon }) => {
    // 세트 효과 만족 여부 헬퍼
    const isSetSatisfied = (count: number, target: number) => count >= target;

    return (
        <div className="space-y-3 text-sm">
            <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                <div className="mb-3">
                    <h4 className="text-green-400 font-bold mb-2 flex items-center gap-2 text-lg">
                        <span>🧩</span> 기본 조건 (2개 이상 만족)
                    </h4>
                    <ul className="space-y-1 text-slate-300 pl-1">
                        <li className={`flex items-center gap-2 ${isSetSatisfied(setCounts?.bossSetCount, 5) ? 'text-green-300 font-bold' : ''}`}>
                            <span>{isSetSatisfied(setCounts?.bossSetCount, 5) ? '✅' : '•'}</span>
                            <span>보스 장신구 5세트 이상 <span className="text-slate-500">(현재: {setCounts?.bossSetCount || 0}개)</span></span>
                        </li>
                        <li className={`flex items-center gap-2 ${isSetSatisfied(setCounts?.dawnSetCount, 2) ? 'text-green-300 font-bold' : ''}`}>
                            <span>{isSetSatisfied(setCounts?.dawnSetCount, 2) ? '✅' : '•'}</span>
                            <span>여명의 보스 2세트 이상 <span className="text-slate-500">(현재: {setCounts?.dawnSetCount || 0}개)</span></span>
                        </li>
                        <li className={`flex items-center gap-2 ${isSetSatisfied(setCounts?.pitchedSetCount, 2) ? 'text-green-300 font-bold' : ''}`}>
                            <span>{isSetSatisfied(setCounts?.pitchedSetCount, 2) ? '✅' : '•'}</span>
                            <span>칠흑의 보스 2세트 이상 <span className="text-slate-500">(현재: {setCounts?.pitchedSetCount || 0}개)</span></span>
                        </li>
                        <li className={`flex items-center gap-2 ${isSetSatisfied(setCounts?.meisterSetCount, 3) ? 'text-green-300 font-bold' : ''}`}>
                            <span>{isSetSatisfied(setCounts?.meisterSetCount, 3) ? '✅' : '•'}</span>
                            <span>마이스터 3세트 이상 <span className="text-slate-500">(현재: {setCounts?.meisterSetCount || 0}개)</span></span>
                        </li>
                        <li className={`flex items-center gap-2 ${isSetSatisfied(setCounts?.brilliantSetCount, 1) ? 'text-green-300 font-bold' : ''}`}>
                            <span>{isSetSatisfied(setCounts?.brilliantSetCount, 1) ? '✅' : '•'}</span>
                            <span>광휘의 보스 1세트 이상 <span className="text-slate-500">(현재: {setCounts?.brilliantSetCount || 0}개)</span></span>
                        </li>
                    </ul>
                </div>

                <div className="pt-2 border-t border-slate-800">
                    <h4 className="text-green-400 font-bold mb-2 flex items-center gap-2 text-lg">
                        <span>🔓</span> 또는 예외 조건 (1개 이상 만족)
                    </h4>
                    <ul className="space-y-1 text-slate-300 pl-1">
                        <li className={`flex items-center gap-2 ${isSetSatisfied(setCounts?.bossSetCount, 9) ? 'text-green-300 font-bold' : ''}`}>
                            <span>{isSetSatisfied(setCounts?.bossSetCount, 9) ? '✅' : '•'}</span>
                            <span>보스 장신구 9세트 이상 <span className="text-slate-500">(현재: {setCounts?.bossSetCount || 0}개)</span></span>
                        </li>
                        <li className={`flex items-center gap-2 ${isSetSatisfied(setCounts?.dawnSetCount, 4) ? 'text-green-300 font-bold' : ''}`}>
                            <span>{isSetSatisfied(setCounts?.dawnSetCount, 4) ? '✅' : '•'}</span>
                            <span>여명의 보스 4세트 이상 <span className="text-slate-500">(현재: {setCounts?.dawnSetCount || 0}개)</span></span>
                        </li>
                        <li className={`flex items-center gap-2 ${isSetSatisfied(setCounts?.pitchedSetCount, 4) ? 'text-green-300 font-bold' : ''}`}>
                            <span>{isSetSatisfied(setCounts?.pitchedSetCount, 4) ? '✅' : '•'}</span>
                            <span>칠흑의 보스 4세트 이상 <span className="text-slate-500">(현재: {setCounts?.pitchedSetCount || 0}개)</span></span>
                        </li>
                        <li className={`flex items-center gap-2 ${isGenesisWeapon && isSetSatisfied(setCounts?.meisterSetCount, 3) ? 'text-green-300 font-bold' : ''}`}>
                            <span>{isGenesisWeapon && isSetSatisfied(setCounts?.meisterSetCount, 3) ? '✅' : '•'}</span>
                            <span>제네시스 무기 + 마이스터 3세트 이상 <span className="text-slate-500">(무기: {isGenesisWeapon ? '✅' : '❌'}, 마이스터: {setCounts?.meisterSetCount || 0}개)</span></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
