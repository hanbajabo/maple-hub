import React from 'react';

export const Stage6Guide: React.FC = () => {
    return (
        <div className="space-y-3">
            <div className="text-center py-4">
                <div className="text-6xl mb-3">🎉</div>
                <p className="text-emerald-400 text-xl font-bold mb-2">
                    축하합니다!
                </p>
                <p className="text-slate-300 text-sm">
                    아이템 드롭률 <span className="text-indigo-400 font-bold">200%</span>를 달성하셨습니다.
                </p>
            </div>

            <div className="bg-slate-950/50 p-3 rounded border border-slate-800">
                <h5 className="text-slate-200 text-sm font-bold mb-2">🎯 다음 목표</h5>
                <ul className="space-y-1 text-xs text-slate-400">
                    <li>✅ 메소 획득량 100% 달성됨</li>
                    <li>✅ 아이템 드롭률 200% 달성됨</li>
                    <li className="pt-2 text-slate-300">→ 이제 <span className="text-yellow-400">보스 세팅</span>이나 <span className="text-purple-400">스탯 업그레이드</span>에 집중하세요!</li>
                </ul>
            </div>

            <div className="bg-emerald-950/20 p-3 rounded border border-emerald-700/30 text-center">
                <p className="text-emerald-300 text-sm font-bold">
                    사냥 세팅 완벽 달성! 🏆
                </p>
                <p className="text-xs text-slate-400 mt-1">
                    효율적인 사냥으로 많은 메소를 벌어보세요!
                </p>
            </div>
        </div>
    );
};
