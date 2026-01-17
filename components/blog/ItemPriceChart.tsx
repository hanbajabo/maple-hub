'use client';

import { useState, useMemo } from 'react';
import { ChevronDown, TrendingDown, TrendingUp, Minus } from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { PriceData } from '@/lib/parsePriceData';

interface ItemPriceChartProps {
    data: PriceData[];
}

export default function ItemPriceChart({ data }: ItemPriceChartProps) {
    // 데이터 구조 확인
    console.log('=== 파싱된 날짜 목록 ===');
    console.log(data.map(d => d.date).join(', '));
    console.log('전체 데이터 개수:', data.length);

    // 모든 아이템 목록
    const allItems = useMemo(() => {
        const items = new Set<string>();

        // 제외할 아이템 키워드 목록
        const excludedKeywords = ['부티크', '블랙하트', '솜사탕', '신마석', '연마석', '웨폰'];

        data.forEach((day) => {
            Object.keys(day.items).forEach((item) => {
                // 제외 키워드가 포함되지 않은 아이템만 추가
                if (!excludedKeywords.some(keyword => item.includes(keyword))) {
                    items.add(item);
                }
            });
        });
        console.log('=== 전체 아이템 목록 ===');
        console.log(Array.from(items).sort().join(', '));
        return Array.from(items).sort();
    }, [data]);

    const [selectedItem, setSelectedItem] = useState(
        allItems.includes('거공') ? '거공' : allItems[0]
    );

    // 선택된 아이템의 데이터
    const itemData = useMemo(() => {
        return data.map((day) => {
            // 날짜 형식 안전성 검사 (YYYY-MM-DD)
            if (!day.date || day.date.length < 10) return null;

            const priceInfo = day.items[selectedItem] || {};
            // 데이터가 아예 없는 날은 제외하고 싶다면 아래 조건을 강화할 수 있음
            // 현재는 날짜만 있으면 표시 (데이터 없으면 - 표시)

            return {
                date: day.date,
                displayDate: day.date.slice(5).replace('-', '/'),
                challenger: priceInfo.challenger || null,
                main: priceInfo.main || null,
            };
        }).filter((item): item is NonNullable<typeof item> => item !== null);
    }, [data, selectedItem]);

    const isEthernel = selectedItem.startsWith('에테르넬');

    const itemDisplayName: Record<string, string> = {
        '거공': '거대한 공포',
        '고근': '고통의 근원',
        '커포': '커맨더 포스 이어링',
        '루컨마': '루즈 컨트롤 머신 마크',
        '마깃안': '마력이 깃든 안대',
        '몽벨': '몽환의 벨트',
        '마도서': '저주받은 마도서',
        '미트라': '미트라의 분노',
        '창뱃': '창세의 뱃지',
        '가엔링': '가디언 엔젤 링',
        '데브팬': '데이브레이크 펜던트',
        '블빈마': '블랙빈 마크',
        '파풀마': '파풀라투스 마크',
        '분자벨': '분노한 자쿰의 벨트',
        '리4': '리스트레인트 링 4레벨',
        '컨4': '컨티뉴어스 링 4레벨',
        '트왈마': '트와일라이트 마크',
        '에스텔라': '에스텔라 이어링',
        '도미': '도미네이터 펜던트',
    };

    return (
        <div className="w-full bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 sm:p-8 my-8 shadow-2xl">
            {/* 헤더 */}
            <div className="mb-6">
                <h3 className="text-2xl font-black text-white mb-2">
                    📊 아이템 시세 추적
                </h3>
                <p className="text-sm text-slate-400 mb-4">
                    {isEthernel ? '에테르넬 평균 가격' : '챌린저스 vs 본섭 가격 비교'}
                </p>

                {/* 아이템 선택 */}
                <select
                    value={selectedItem}
                    onChange={(e) => setSelectedItem(e.target.value)}
                    className="w-full sm:w-auto bg-slate-700 border-2 border-slate-600 text-white py-2 px-4 rounded-lg font-bold cursor-pointer hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {allItems.map((item) => (
                        <option key={item} value={item}>
                            {itemDisplayName[item] || item}
                        </option>
                    ))}
                </select>
            </div>

            {/* 가격 데이터 테이블 */}
            <div className="overflow-x-auto">
                <div className="bg-slate-900/50 rounded-xl border border-slate-700 overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-800/50 border-b border-slate-700">
                                <th className="text-left p-4 text-white font-bold">날짜</th>
                                {!isEthernel && (
                                    <th className="text-right p-4 text-red-400 font-bold">챌린저스</th>
                                )}
                                <th className="text-right p-4 text-blue-400 font-bold">
                                    {isEthernel ? '본섭 평균 가격' : '본섭'}
                                </th>
                                {!isEthernel && (
                                    <th className="text-right p-4 text-yellow-400 font-bold">차이</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {itemData.map((row, index) => {
                                // 부동소수점 오차 방지를 위해 toFixed 사용 후 parseFloat
                                const diffVal = row.challenger && row.main ? row.challenger - row.main : 0;
                                // 소수점 첫째 자리까지만 표시 (필요시 정수로 표시)
                                const diff = parseFloat(diffVal.toFixed(1));

                                const diffPercent = row.challenger && row.main && row.main > 0
                                    ? ((diff / row.main) * 100).toFixed(1)
                                    : '0';

                                return (<tr
                                    key={row.date}
                                    className={`border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors ${index === itemData.length - 1 ? 'bg-blue-900/10' : ''
                                        }`}
                                >
                                    <td className="p-4 text-slate-300 font-medium">
                                        {row.displayDate}
                                        {index === itemData.length - 1 && (
                                            <span className="ml-2 text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">최신</span>
                                        )}
                                    </td>
                                    {!isEthernel && (
                                        <td className="p-4 text-right text-red-400 font-bold">
                                            {row.challenger ? `${row.challenger}억` : '-'}
                                        </td>
                                    )}
                                    <td className="p-4 text-right text-blue-400 font-bold">
                                        {row.main ? `${row.main}억` : '-'}
                                    </td>
                                    {!isEthernel && (
                                        <td className="p-4 text-right">
                                            {row.challenger && row.main ? (
                                                <div className="flex flex-col items-end">
                                                    <span className={`font-bold ${diff > 0 ? 'text-red-400' : diff < 0 ? 'text-green-400' : 'text-slate-400'}`}>
                                                        {diff > 0 ? '+' : ''}{diff}억
                                                    </span>
                                                    <span className="text-xs text-slate-500">
                                                        ({diffPercent}%)
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-slate-600">-</span>
                                            )}
                                        </td>
                                    )}
                                </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 요약 통계 */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {itemData.length > 0 && (
                    <>
                        <div key="stat-start" className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                            <p className="text-xs text-slate-400 mb-2">시작 가격 (1/1)</p>
                            {!isEthernel ? (
                                <div className="space-y-1">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-red-400 font-bold">챌린저스</span>
                                        <span className="text-lg font-bold text-white">{itemData[0].challenger || '-'}억</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-blue-400 font-bold">본섭</span>
                                        <span className="text-lg font-bold text-white">{itemData[0].main || '-'}억</span>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-lg font-bold text-white">
                                    {itemData[0].main}억
                                </p>
                            )}
                        </div>

                        <div key="stat-current" className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                            <p className="text-xs text-slate-400 mb-2">현재 가격 ({itemData[itemData.length - 1].displayDate})</p>
                            {!isEthernel ? (
                                <div className="space-y-1">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-red-400 font-bold">챌린저스</span>
                                        <span className="text-lg font-bold text-white">{itemData[itemData.length - 1].challenger || '-'}억</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-blue-400 font-bold">본섭</span>
                                        <span className="text-lg font-bold text-white">{itemData[itemData.length - 1].main || '-'}억</span>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-lg font-bold text-white">
                                    {itemData[itemData.length - 1].main}억
                                </p>
                            )}
                        </div>

                        <div key="stat-change" className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                            <p className="text-xs text-slate-400 mb-2">변화율</p>
                            {!isEthernel ? (
                                <div className="space-y-1">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-red-400 font-bold">챌린저스</span>
                                        <span className={`text-lg font-bold ${((itemData[itemData.length - 1].challenger || 0) - (itemData[0].challenger || 0)) > 0
                                            ? 'text-red-400' : 'text-green-400'
                                            }`}>
                                            {(() => {
                                                const start = itemData[0].challenger || 0;
                                                const end = itemData[itemData.length - 1].challenger || 0;
                                                const change = start > 0 ? ((end - start) / start * 100).toFixed(1) : '0';
                                                return `${parseFloat(change) > 0 ? '+' : ''}${change}%`;
                                            })()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-blue-400 font-bold">본섭</span>
                                        <span className={`text-lg font-bold ${((itemData[itemData.length - 1].main || 0) - (itemData[0].main || 0)) > 0
                                            ? 'text-red-400' : 'text-green-400'
                                            }`}>
                                            {(() => {
                                                const start = itemData[0].main || 0;
                                                const end = itemData[itemData.length - 1].main || 0;
                                                const change = start > 0 ? ((end - start) / start * 100).toFixed(1) : '0';
                                                return `${parseFloat(change) > 0 ? '+' : ''}${change}%`;
                                            })()}
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <p className={`text-lg font-bold ${((itemData[itemData.length - 1].main || 0) - (itemData[0].main || 0)) > 0
                                    ? 'text-red-400' : 'text-green-400'
                                    }`}>
                                    {(() => {
                                        const start = itemData[0].main || 0;
                                        const end = itemData[itemData.length - 1].main || 0;
                                        const change = start > 0 ? ((end - start) / start * 100).toFixed(1) : '0';
                                        return `${parseFloat(change) > 0 ? '+' : ''}${change}%`;
                                    })()}
                                </p>
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* 시각화 차트 추가 */}
            <div className="mt-8 pt-8 border-t border-slate-700">
                <h4 className="text-lg font-bold text-white mb-4">📈 가격 추이 그래프</h4>
                <div className="h-[300px] w-full bg-slate-900/50 rounded-xl p-4 border border-slate-700">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={itemData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                            <XAxis
                                dataKey="displayDate"
                                tick={{ fill: '#94a3b8', fontSize: 12 }}
                                stroke="#475569"
                                tickMargin={10}
                            />
                            <YAxis
                                tick={{ fill: '#94a3b8', fontSize: 12 }}
                                stroke="#475569"
                                tickFormatter={(value) => `${value}억`}
                                domain={['auto', 'auto']}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#0f172a',
                                    border: '1px solid #334155',
                                    borderRadius: '8px',
                                    color: '#f1f5f9'
                                }}
                                formatter={(value: any) => [`${value}억`, '']}
                                labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                            />
                            <Legend wrapperStyle={{ paddingTop: '10px' }} />
                            {!isEthernel && (
                                <Line
                                    type="monotone"
                                    dataKey="challenger"
                                    name="챌린저스"
                                    stroke="#ef4444"
                                    strokeWidth={3}
                                    dot={{ fill: '#ef4444', r: 3 }}
                                    activeDot={{ r: 5 }}
                                    connectNulls
                                />
                            )}
                            <Line
                                type="monotone"
                                dataKey="main"
                                name={isEthernel ? "본섭 평균 가격" : "본섭"}
                                stroke="#3b82f6"
                                strokeWidth={3}
                                dot={{ fill: '#3b82f6', r: 3 }}
                                activeDot={{ r: 5 }}
                                connectNulls
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 안내 */}
            <div className="mt-6 bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <p className="text-sm text-blue-200/90 text-center">
                    💡 위 표의 행을 클릭하거나 차트에 마우스를 올려 상세 정보를 확인하세요
                </p>
            </div>
        </div>
    );
}
