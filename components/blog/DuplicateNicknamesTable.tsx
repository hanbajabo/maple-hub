'use client';

import React, { useState } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface PriceHistory {
    s: string;
    p: string;
}

interface NicknameData {
    id: number;
    nickname: string;
    history: PriceHistory[];
    changeRate: number;
}

const data: NicknameData[] = [
    { id: 1, nickname: "🍂 가을", history: [{ s: 'S1', p: '1,001만' }, { s: 'S2', p: '820만' }], changeRate: -18.1 },
    { id: 2, nickname: "🥥 코코", history: [{ s: 'S1', p: '760만' }, { s: 'S2', p: '520만' }], changeRate: -31.6 },
    { id: 3, nickname: "⚔️ 아란", history: [{ s: 'S1', p: '1,500만' }, { s: 'S2', p: '550만' }], changeRate: -63.3 },
    { id: 4, nickname: "🌿 민트", history: [{ s: 'S1', p: '999만' }, { s: 'S3', p: '570만' }], changeRate: -42.9 },
    { id: 5, nickname: "🎀 루루", history: [{ s: 'S2', p: '315만' }, { s: 'S3', p: '700만' }], changeRate: 122.2 },
    { id: 6, nickname: "🌰 호두", history: [{ s: 'S2', p: '530만' }, { s: 'S3', p: '500만' }], changeRate: -5.7 },
    { id: 7, nickname: "🌊 노아", history: [{ s: 'S1', p: '720만' }, { s: 'S3', p: '320만' }], changeRate: -55.6 },
    { id: 8, nickname: "💖 바비", history: [{ s: 'S1', p: '800만' }, { s: 'S2', p: '330만' }, { s: 'S4', p: '560만' }], changeRate: -30.0 },
    { id: 9, nickname: "❄️ 유키", history: [{ s: 'S1', p: '610만' }, { s: 'S2', p: '338만' }], changeRate: -44.6 },
    { id: 10, nickname: "⚡ 레이", history: [{ s: 'S1', p: '600만' }, { s: 'S2', p: '260만' }], changeRate: -56.7 },
    { id: 11, nickname: "🎮 나워", history: [{ s: 'S1', p: '900만' }, { s: 'S2', p: '305만' }], changeRate: -66.1 },
    { id: 12, nickname: "🍌 바나나", history: [{ s: 'S1', p: '766만' }, { s: 'S3', p: '311만' }], changeRate: -59.4 },
    { id: 13, nickname: "🗼 도쿄", history: [{ s: 'S1', p: '560만' }, { s: 'S3', p: '300만' }], changeRate: -46.4 },
    { id: 14, nickname: "🧙 오즈", history: [{ s: 'S1', p: '688만' }, { s: 'S3', p: '380만' }], changeRate: -44.8 },
    { id: 15, nickname: "🍑 모모", history: [{ s: 'S2', p: '450만' }, { s: 'S3', p: '355만' }], changeRate: -21.1 },
    { id: 16, nickname: "🥋 고수", history: [{ s: 'S2', p: '340만' }, { s: 'S3', p: '410만' }, { s: 'S4', p: '305만' }, { s: 'S5', p: '300만' }], changeRate: -11.8 },
    { id: 17, nickname: "🌟 일리움", history: [{ s: 'S2', p: '370만' }, { s: 'S3', p: '370만' }], changeRate: 0.0 },
    { id: 18, nickname: "🍒 앵두", history: [{ s: 'S2', p: '340만' }, { s: 'S3', p: '400만' }], changeRate: 17.6 },
    { id: 19, nickname: "😄 히히", history: [{ s: 'S2', p: '270만' }, { s: 'S3', p: '238만' }, { s: 'S4', p: '590만' }], changeRate: 118.5 },
    { id: 20, nickname: "💝 다정", history: [{ s: 'S2', p: '305만' }, { s: 'S3', p: '475만' }], changeRate: 55.7 },
    { id: 21, nickname: "🥧 파이", history: [{ s: 'S2', p: '305만' }, { s: 'S3', p: '225만' }, { s: 'S4', p: '440만' }], changeRate: 44.3 },
    { id: 22, nickname: "⚡ 번개", history: [{ s: 'S2', p: '270만' }, { s: 'S3', p: '370만' }], changeRate: 37.0 },
    { id: 23, nickname: "💙 블루", history: [{ s: 'S2', p: '320만' }, { s: 'S4', p: '375만' }], changeRate: 17.2 },
    { id: 24, nickname: "🌸 연우", history: [{ s: 'S2', p: '200만' }, { s: 'S3', p: '345만' }], changeRate: 72.5 },
    { id: 25, nickname: "💫 지젤", history: [{ s: 'S2', p: '200만' }, { s: 'S3', p: '250만' }], changeRate: 25.0 },
    { id: 26, nickname: "🎤 청하", history: [{ s: 'S2', p: '200만' }, { s: 'S4', p: '315만' }], changeRate: 57.5 },
    { id: 27, nickname: "🌠 소원", history: [{ s: 'S1', p: '560만' }, { s: 'S3', p: '376만' }], changeRate: -32.9 },
    { id: 28, nickname: "🌬️ 바람", history: [{ s: 'S1', p: '573만' }, { s: 'S4', p: '660만' }], changeRate: 15.2 },
    { id: 29, nickname: "🎎 인형", history: [{ s: 'S1', p: '806만' }, { s: 'S4', p: '620만' }], changeRate: -23.1 },
    { id: 30, nickname: "🍯 허니", history: [{ s: 'S1', p: '901만' }, { s: 'S4', p: '520만' }], changeRate: -42.3 },
    { id: 31, nickname: "👼 애기", history: [{ s: 'S1', p: '750만' }, { s: 'S4', p: '570만' }], changeRate: -24.0 },
    { id: 32, nickname: "🗡️ 시프", history: [{ s: 'S1', p: '1,016만' }, { s: 'S4', p: '1,000만' }], changeRate: -1.6 },
    { id: 33, nickname: "⚔️ 닌자", history: [{ s: 'S1', p: '660만' }, { s: 'S3', p: '600만' }, { s: 'S4', p: '450만' }], changeRate: -31.8 },
    { id: 34, nickname: "💑 애인", history: [{ s: 'S1', p: '630만' }, { s: 'S2', p: '400만' }], changeRate: -36.5 },
    { id: 35, nickname: "💋 뽀뽀", history: [{ s: 'S1', p: '608만' }, { s: 'S2', p: '289만' }], changeRate: -52.5 },
    { id: 36, nickname: "🐼 판다", history: [{ s: 'S4', p: '340만' }, { s: 'S5', p: '245만' }], changeRate: -27.9 },
    { id: 37, nickname: "😊 해피", history: [{ s: 'S1', p: '800만' }, { s: 'S5', p: '680만' }], changeRate: -15.0 },
    { id: 38, nickname: "🍋 라임", history: [{ s: 'S1', p: '700만' }, { s: 'S3', p: '400만' }, { s: 'S5', p: '310만' }], changeRate: -55.7 },
    { id: 39, nickname: "🛡️ 팔라딘", history: [{ s: 'S1', p: '600만' }, { s: 'S5', p: '550만' }], changeRate: -8.3 },
    { id: 40, nickname: "🎯 시크", history: [{ s: 'S1', p: '700만' }, { s: 'S3', p: '500만' }], changeRate: -28.6 },
    { id: 41, nickname: "💋 키스", history: [{ s: 'S1', p: '637만' }, { s: 'S3', p: '500만' }], changeRate: -21.5 },
    { id: 42, nickname: "👑 카이저", history: [{ s: 'S1', p: '600만' }, { s: 'S3', p: '465만' }], changeRate: -22.5 },
    { id: 43, nickname: "🏹 궁수", history: [{ s: 'S1', p: '1,500만' }, { s: 'S3', p: '444만' }], changeRate: -70.4 },
    { id: 44, nickname: "😈 데몬", history: [{ s: 'S3', p: '435만' }, { s: 'S4', p: '620만' }], changeRate: 42.5 },
    { id: 45, nickname: "✨ 소울마스터", history: [{ s: 'S2', p: '500만' }, { s: 'S3', p: '355만' }], changeRate: -29.0 },
    { id: 46, nickname: "🤴 왕자", history: [{ s: 'S3', p: '410만' }, { s: 'S4', p: '670만' }], changeRate: 63.4 },
    { id: 47, nickname: "👦 소년", history: [{ s: 'S2', p: '620만' }, { s: 'S4', p: '810만' }], changeRate: 30.6 },
    { id: 48, nickname: "🌟 채원", history: [{ s: 'S3', p: '350만' }, { s: 'S4', p: '500만' }], changeRate: 42.9 },
    { id: 49, nickname: "💫 설리", history: [{ s: 'S3', p: '315만' }, { s: 'S4', p: '300만' }, { s: 'S5', p: '325만' }], changeRate: 3.2 },
    { id: 50, nickname: "🎭 카라", history: [{ s: 'S2', p: '415만' }, { s: 'S3', p: '295만' }], changeRate: -28.9 },
    { id: 51, nickname: "👨 보이", history: [{ s: 'S2', p: '305만' }, { s: 'S5', p: '280만' }], changeRate: -8.2 },
    { id: 52, nickname: "🌺 포이", history: [{ s: 'S2', p: '200만' }, { s: 'S5', p: '275만' }], changeRate: 37.5 },
    { id: 53, nickname: "🌅 데이", history: [{ s: 'S2', p: '200만' }, { s: 'S4', p: '350만' }, { s: 'S5', p: '394만' }], changeRate: 97.0 },
    { id: 54, nickname: "⏰ 시간", history: [{ s: 'S3', p: '280만' }, { s: 'S5', p: '295만' }], changeRate: 5.4 },
    { id: 55, nickname: "🌲 나무", history: [{ s: 'S3', p: '330만' }, { s: 'S4', p: '350만' }], changeRate: 6.1 },
    { id: 56, nickname: "🌸 우이", history: [{ s: 'S2', p: '210만' }, { s: 'S4', p: '350만' }], changeRate: 66.7 },
    { id: 57, nickname: "🌍 누리", history: [{ s: 'S1', p: '569만' }, { s: 'S4', p: '350만' }], changeRate: -38.5 },
    { id: 58, nickname: "🌱 시드", history: [{ s: 'S3', p: '240만' }, { s: 'S4', p: '300만' }], changeRate: 25.0 },
    { id: 59, nickname: "👸 아이린", history: [{ s: 'S3', p: '230만' }, { s: 'S4', p: '395만' }], changeRate: 71.7 },
    { id: 60, nickname: "🎀 채영", history: [{ s: 'S3', p: '485만' }, { s: 'S5', p: '300만' }], changeRate: -38.1 },
    { id: 61, nickname: "😊 샤이", history: [{ s: 'S2', p: '225만' }, { s: 'S5', p: '250만' }], changeRate: 11.1 },
    { id: 62, nickname: "💎 레아", history: [{ s: 'S4', p: '400만' }, { s: 'S5', p: '210만' }], changeRate: -47.5 },
    { id: 63, nickname: "🌼 보미", history: [{ s: 'S2', p: '215만' }, { s: 'S4', p: '325만' }, { s: 'S5', p: '215만' }], changeRate: 0.0 },
    { id: 64, nickname: "👊 펀치", history: [{ s: 'S3', p: '370만' }, { s: 'S5', p: '290만' }], changeRate: -21.6 },
    { id: 65, nickname: "⭐ 박보영", history: [{ s: 'S3', p: '240만' }, { s: 'S5', p: '226만' }], changeRate: -5.8 },
    { id: 66, nickname: "💗 애정", history: [{ s: 'S2', p: '200만' }, { s: 'S3', p: '230만' }, { s: 'S4', p: '370만' }], changeRate: 85.0 },
    { id: 67, nickname: "🍰 달콤", history: [{ s: 'S3', p: '220만' }, { s: 'S4', p: '320만' }, { s: 'S5', p: '250만' }], changeRate: 13.6 },
    { id: 68, nickname: "👗 미스", history: [{ s: 'S3', p: '250만' }, { s: 'S4', p: '300만' }], changeRate: 20.0 },
    { id: 69, nickname: "❄️ 첫눈", history: [{ s: 'S2', p: '205만' }, { s: 'S5', p: '160만' }], changeRate: -22.0 },
    { id: 70, nickname: "🎤 현석", history: [{ s: 'S2', p: '205만' }, { s: 'S5', p: '160만' }], changeRate: -22.0 },
    { id: 71, nickname: "🧚 선녀", history: [{ s: 'S2', p: '900만' }, { s: 'S4', p: '325만' }], changeRate: -63.9 },
    { id: 72, nickname: "👜 구찌", history: [{ s: 'S2', p: '300만' }, { s: 'S4', p: '320만' }], changeRate: 6.7 },
    { id: 73, nickname: "🎀 룰루", history: [{ s: 'S2', p: '315만' }, { s: 'S3', p: '700만' }], changeRate: 122.2 },
    { id: 74, nickname: "💕 조아", history: [{ s: 'S1', p: '662만' }, { s: 'S3', p: '203만' }], changeRate: -69.4 },
    { id: 75, nickname: "🐰 뿌까", history: [{ s: 'S2', p: '200만' }, { s: 'S3', p: '130만' }], changeRate: -35.0 },
    { id: 76, nickname: "⚡ 마하", history: [{ s: 'S2', p: '200만' }, { s: 'S4', p: '295만' }], changeRate: 47.5 },
    { id: 77, nickname: "🐺 울프", history: [{ s: 'S2', p: '200만' }, { s: 'S4', p: '180만' }], changeRate: -10.0 },
    { id: 78, nickname: "💭 기억", history: [{ s: 'S2', p: '255만' }, { s: 'S4', p: '123만' }], changeRate: -51.8 },
    { id: 79, nickname: "🎵 비비", history: [{ s: 'S1', p: '674만' }, { s: 'S4', p: '810만' }], changeRate: 20.2 },
];

data.forEach(item => {
    // Map simplified history keys 's' and 'p' to 'season' and 'price' if needed, but we can use them directly
});

export default function DuplicateNicknamesTable() {
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

    const sortedData = React.useMemo(() => {
        let sortableItems = [...data];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (sortConfig.key === 'changeRate') {
                    if (a.changeRate < b.changeRate) {
                        return sortConfig.direction === 'asc' ? -1 : 1;
                    }
                    if (a.changeRate > b.changeRate) {
                        return sortConfig.direction === 'asc' ? 1 : -1;
                    }
                    return 0;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [sortConfig]);

    const requestSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'desc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'desc') {
            direction = 'asc';
        }
        setSortConfig({ key, direction });
    };

    const getSeasonColor = (season: string) => {
        switch (season) {
            case 'S1': return 'text-yellow-400';
            case 'S2': return 'text-blue-400';
            case 'S3': return 'text-pink-400';
            case 'S4': return 'text-cyan-400';
            case 'S5': return 'text-green-400';
            default: return 'text-slate-400';
        }
    };

    const getChangeColor = (rate: number) => {
        if (rate > 0) return 'text-green-400';
        if (rate < 0) {
            if (rate > -10) return 'text-orange-400'; // Minor decrease
            return 'text-red-400'; // Major decrease
        }
        return 'text-slate-400';
    };

    return (
        <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-3 sm:p-6 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-cyan-400 mb-3 sm:mb-4 flex items-center gap-2">
                📊 TOP 100 내 중복 등장 닉네임
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mb-3 sm:mb-4">
                위에서 상세히 분석한 닉네임 외에도 시즌별 TOP 100 순위 내에서 2회 이상 등장한 닉네임들입니다.
            </p>

            <div className="overflow-x-auto -mx-3 sm:mx-0">
                <table className="w-full text-xs sm:text-sm min-w-[500px]">
                    <thead className="bg-slate-900/50 border-b border-slate-600">
                        <tr>
                            <th className="p-2 sm:p-3 text-left text-cyan-400 font-bold">닉네임</th>
                            <th className="p-2 sm:p-3 text-center text-cyan-400 font-bold">시즌별 가격</th>
                            <th
                                className="p-2 sm:p-3 text-right text-cyan-400 font-bold cursor-pointer hover:bg-slate-800/50 transition-colors"
                                onClick={() => requestSort('changeRate')}
                            >
                                <div className="flex justify-end items-center gap-1 group">
                                    변동률
                                    <div className="flex flex-col">
                                        <ArrowUp className={`w-3 h-3 ${sortConfig?.key === 'changeRate' && sortConfig.direction === 'asc' ? 'text-cyan-400' : 'text-slate-600 group-hover:text-slate-400'}`} />
                                        <ArrowDown className={`w-3 h-3 ${sortConfig?.key === 'changeRate' && sortConfig.direction === 'desc' ? 'text-cyan-400' : 'text-slate-600 group-hover:text-slate-400'}`} />
                                    </div>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {sortedData.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-700/20 transition-colors">
                                <td className="p-2 sm:p-3 text-white font-semibold whitespace-nowrap">{item.nickname}</td>
                                <td className="p-2 sm:p-3 text-center text-slate-300">
                                    <div className="flex flex-wrap justify-center gap-x-1 gap-y-1">
                                        {item.history.map((h: any, idx) => (
                                            <React.Fragment key={idx}>
                                                <span className="whitespace-nowrap">
                                                    <span className={`font-bold ${getSeasonColor(h.s)}`}>{h.s}</span> {h.p}
                                                </span>
                                                {idx < item.history.length - 1 && <span className="text-slate-600">→</span>}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </td>
                                <td className="p-2 sm:p-3 text-right font-bold whitespace-nowrap">
                                    <span className={getChangeColor(item.changeRate)}>
                                        {item.changeRate > 0 ? '+' : ''}{item.changeRate}%
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
