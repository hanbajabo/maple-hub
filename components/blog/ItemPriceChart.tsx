'use client';

import { useState, useMemo, useEffect } from 'react';
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
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // 아이템 카테고리 정의
    const itemCategories = {
        '칠흑 세트': ['거공', '고근', '커포', '루컨마', '마깃안', '몽벨', '마도서', '미트라', '창뱃', '언더컨트롤', '블랙하트(스카)'],
        '광휘 세트': ['근원의 속삭임', '죽음의 맹세', '불멸의 유산', '황홀한 악몽'],
        '에테르넬': ['에테르넬 모자', '에테르넬 상의', '에테르넬 하의', '에테르넬 견장', '에테르넬 신발', '에테르넬 장갑', '에테르넬 망토'],
        '장신구': ['가엔링', '데브팬', '블빈마', '파풀마', '분자벨', '트왈마', '에스텔라', '도미'],
        '기타 아이템': ['컨4', '리4', '자석펫', '불안정한 시간의 파편', '신마석(스카)', '연마석(스카)', '익셉셔널 벨트', '익셉셔널 얼장', '익셉셔널 눈장', '익셉셔널 훈장', '에리온의 조각', '아델레', '카이', '쁘띠 스노우'],
    };

    // 아이템 표시 이름 매핑
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
        '언더컨트롤': '컴플리트 언더컨트롤',
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
        '자석펫': '자석펫 (7기 평균값)',
        '불안정한 시간의 파편': '불안정한 시간의 파편',
        '블랙하트(스카)': '블랙하트 (스카니아)',
        '신마석(스카)': '신마석 (스카니아)',
        '연마석(스카)': '연마석 (스카니아)',
        '아델레': '자석펫 아델레',
        '카이': '자석펫 카이',
        '쁘띠 스노우': '자석펫 쁘띠 스노우',
        '익셉셔널 벨트': '익셉셔널 벨트',
        '익셉셔널 얼장': '익셉셔널 얼굴장식',
        '익셉셔널 눈장': '익셉셔널 눈장식',
        '익셉셔널 훈장': '익셉셔널 훈장',
        '에리온의 조각': '에리온의 조각',
    };

    // 모든 아이템 목록
    const allItems = useMemo(() => {
        const items = new Set<string>();

        // 제외할 아이템 키워드 목록
        const excludedKeywords = ['부티크', '솜사탕', '웨폰', '리3', '컨3', '프리렌', '슈타르크', '페른'];

        // 최근 7일 내에 데이터가 한 번이라도 있었던 아이템만 추출 (데이터 누락 방지)
        const recentDays = data.slice(-7);

        recentDays.forEach((day) => {
            Object.keys(day.items).forEach((item) => {
                // 제외 키워드가 포함되지 않은 아이템만 추가
                if (!excludedKeywords.some(keyword => item.includes(keyword))) {
                    items.add(item);
                }
            });
        });

        // 칠흑, 광휘, 에테르넬 필수 품목은 데이터가 없어도 항상 목록에 유지 (기본값 설정 목적)
        const essentialItems = [
            ...Object.values(itemCategories['칠흑 세트']),
            ...Object.values(itemCategories['광휘 세트']),
            ...Object.values(itemCategories['에테르넬']),
        ];
        
        essentialItems.forEach(item => {
            if (!excludedKeywords.some(keyword => item.includes(keyword))) {
                items.add(item);
            }
        });

        return Array.from(items).sort((a, b) => {
            const nameA = itemDisplayName[a] || a;
            const nameB = itemDisplayName[b] || b;
            return nameA.localeCompare(nameB, 'ko');
        });
    }, [data]);

    const [selectedCategory, setSelectedCategory] = useState<string>('전체');
    const [selectedItem, setSelectedItem] = useState(
        allItems.includes('거공') ? '거공' : allItems[0]
    );
    const [isTableExpanded, setIsTableExpanded] = useState(false);
    const [baselineDateIndex, setBaselineDateIndex] = useState(0); // 기준 날짜 인덱스 (0 = 첫 번째 날짜)

    // 품목이 변경될 때 테이블 접기 초기화
    useEffect(() => {
        setIsTableExpanded(false);
    }, [selectedItem]);

    // 현재 카테고리에 맞는 아이템 목록
    const filteredItems = useMemo(() => {
        if (selectedCategory === '전체') {
            return allItems;
        }
        const categoryItems = itemCategories[selectedCategory as keyof typeof itemCategories] || [];
        return allItems.filter(item => categoryItems.includes(item));
    }, [selectedCategory, allItems]);

    // 선택된 아이템의 데이터
    const itemData = useMemo(() => {
        return data.map((day) => {
            // 날짜 형식 안전성 검사 (YYYY-MM-DD)
            if (!day.date || day.date.length < 10) return null;

            let priceInfo = { ...(day.items[selectedItem] || {}) };
            
            // 자석펫 3종(아델레, 카이, 쁘띠 스노우)이고 해당 데이터가 없으면, '자석펫'(7기 평균값) 데이터 사용
            const individualPets = ['아델레', '카이', '쁘띠 스노우'];
            if (individualPets.includes(selectedItem)) {
                const avgPriceInfo = day.items['자석펫'] || {};
                if (priceInfo.main === undefined || priceInfo.main === null) {
                    priceInfo.main = avgPriceInfo.main;
                }
                if (priceInfo.challenger === undefined || priceInfo.challenger === null) {
                    priceInfo.challenger = avgPriceInfo.challenger;
                }
            }

            return {
                date: day.date,
                displayDate: day.date.slice(5).replace('-', '/'),
                challenger: priceInfo.challenger || null,
                main: priceInfo.main || null,
            };
        }).filter((item): item is NonNullable<typeof item> => item !== null);
    }, [data, selectedItem]);

    const isEthernel = selectedItem.startsWith('에테르넬');

    // 스카니아 전용 아이템 여부 (해당 아이템의 'main' 가격이 스카니아 기준인지 여부)
    const scaniaItems = ['신마석(스카)', '연마석(스카)', '블랙하트(스카)'];
    const isScania = scaniaItems.includes(selectedItem);
    // 'main' 컬럼의 서버 레이블
    const mainServerLabel = isScania ? '스카니아' : '본섭';

    return (
        <div className="w-full bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-4 sm:p-6 md:p-8 my-4 sm:my-8 shadow-2xl">
            {/* 헤더 */}
            <div className="mb-6">
                <h3 className="text-2xl font-black text-white mb-2">
                    📊 아이템 시세 추적
                </h3>
                <p className="text-sm text-slate-400 mb-4">
                    {isEthernel
                        ? '에테르넬 평균 가격 (5개 직업군 평균, 본섭) - 하단 표에서 직업별 상세 가격 확인'
                        : `챌린저스 vs ${mainServerLabel} 가격 비교`
                    }
                </p>

                {/* 카테고리 필터 */}
                <div className="mb-4 flex flex-wrap gap-1.5 sm:gap-2">
                    {['전체', '칠흑 세트', '광휘 세트', '에테르넬', '장신구', '기타 아이템'].map((category) => (
                        <button
                            key={category}
                            onClick={() => {
                                setSelectedCategory(category);
                                // 카테고리 변경 시 첫 번째 아이템으로 자동 선택
                                const newFilteredItems = category === '전체'
                                    ? allItems
                                    : allItems.filter(item =>
                                        (itemCategories[category as keyof typeof itemCategories] || []).includes(item)
                                    );
                                if (newFilteredItems.length > 0) {
                                    setSelectedItem(newFilteredItems[0]);
                                }
                            }}
                            className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${selectedCategory === category
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* 아이템 선택 */}
                <select
                    value={selectedItem}
                    onChange={(e) => setSelectedItem(e.target.value)}
                    className="w-full sm:w-auto bg-slate-700 border-2 border-slate-600 text-white py-2 px-4 rounded-lg font-bold cursor-pointer hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {filteredItems.map((item) => (
                        <option key={item} value={item}>
                            {itemDisplayName[item] || item}
                        </option>
                    ))}
                </select>
            </div>

            {/* 가격 데이터 테이블 */}
            <div className="overflow-x-auto">
                <div className="bg-slate-900/50 rounded-xl border border-slate-700 overflow-hidden">
                    <table className="w-full text-xs sm:text-sm">
                        <thead>
                            <tr className="bg-slate-800/50 border-b border-slate-700">
                                <th className="text-left p-2 sm:p-4 text-white font-bold">날짜</th>
                                {!isEthernel && (
                                    <th className="text-right p-2 sm:p-4 text-red-400 font-bold">챌린저스</th>
                                )}
                                <th className="text-right p-2 sm:p-4 text-blue-400 font-bold">
                                    {isEthernel ? '본섭 평균' : mainServerLabel}
                                </th>
                                {!isEthernel && (
                                    <th className="text-right p-2 sm:p-4 text-yellow-400 font-bold">차이</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {itemData.map((row, index) => {
                                const isStartOfMonth = row.date.endsWith('-01');
                                const isFirst = index === 0;
                                const isLatest = index >= itemData.length - 3;
                                const isVisibleWhenCollapsed = isFirst || isStartOfMonth || isLatest;
                                const isLastRow = index === itemData.length - 1;

                                if (!isTableExpanded && itemData.length > 5 && !isVisibleWhenCollapsed) {
                                    // 여러 등성이에 숨겨진 데이터가 있을 수 있는데, 사용자가 원하는 대로
                                    // 마지막 숨겨진 위치(즉, 최신 데이터 3개 바로 위)에 "더보기" 버튼을 하나만 표시합니다.
                                    const lastHiddenIndex = itemData.findLastIndex((r, idx) => !(idx === 0 || r.date.endsWith('-01') || idx >= itemData.length - 3));

                                    if (index === lastHiddenIndex) {
                                        return (
                                            <tr key="collapsed-indicator" className="bg-slate-800/30 border-b border-slate-700/50">
                                                <td colSpan={isEthernel ? 2 : 4} className="p-0">
                                                    <button 
                                                        onClick={() => setIsTableExpanded(true)}
                                                        className="w-full h-full p-3 flex items-center justify-center gap-2 text-slate-400 hover:text-blue-400 hover:bg-slate-800/50 transition-colors text-xs sm:text-sm"
                                                    >
                                                        <span className="flex-1 h-px bg-slate-700/50"></span>
                                                        <span className="px-3 flex items-center gap-1 font-bold">
                                                            <ChevronDown size={14} />
                                                            모든 날짜 데이터 더보기
                                                        </span>
                                                        <span className="flex-1 h-px bg-slate-700/50"></span>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    }
                                    return null;
                                }

                                // 부동소수점 오차 방지를 위해 toFixed 사용 후 parseFloat
                                const diffVal = row.challenger && row.main ? row.challenger - row.main : 0;
                                // 소수점 첫째 자리까지만 표시 (필요시 정수로 표시)
                                const diff = parseFloat(diffVal.toFixed(1));

                                const diffPercent = row.challenger && row.main && row.main > 0
                                    ? ((diff / row.main) * 100).toFixed(1)
                                    : '0';

                                return (<tr
                                    key={`${row.date}-${index}`}
                                    className={`border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors ${isLastRow ? 'bg-blue-900/10' : ''
                                        }`}
                                >
                                    <td className="p-2 sm:p-4 text-slate-300 font-medium whitespace-nowrap">
                                        {row.displayDate}
                                        {isLastRow && (
                                            <span className="ml-1 sm:ml-2 text-[10px] sm:text-xs bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded">최신</span>
                                        )}
                                    </td>
                                    {!isEthernel && (
                                        <td className="p-2 sm:p-4 text-right text-red-400 font-bold whitespace-nowrap">
                                            {row.challenger ? `${row.challenger}억` : '-'}
                                        </td>
                                    )}
                                    <td className="p-2 sm:p-4 text-right text-blue-400 font-bold whitespace-nowrap">
                                        {row.main ? `${row.main}억` : '-'}
                                    </td>
                                    {!isEthernel && (
                                        <td className="p-2 sm:p-4 text-right whitespace-nowrap">
                                            {row.challenger && row.main ? (
                                                <div className="flex flex-col items-end">
                                                    <span className={`font-bold ${diff > 0 ? 'text-red-400' : diff < 0 ? 'text-green-400' : 'text-slate-400'}`}>
                                                        {diff > 0 ? '+' : ''}{diff}억
                                                    </span>
                                                    <span className="text-[10px] sm:text-xs text-slate-500">
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
                {isTableExpanded && itemData.length > 5 && (
                    <div className="mt-3 flex justify-center">
                        <button
                            onClick={() => setIsTableExpanded(false)}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 px-5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors flex items-center gap-2"
                        >
                            <ChevronDown className="rotate-180" size={16} />
                            표 간략히 보기
                        </button>
                    </div>
                )}
            </div>

            {/* 요약 통계 */}
            <div className="mt-6 space-y-4">
                {/* 기준 날짜 선택 */}
                {itemData.length > 1 && (
                    <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/50 rounded-xl p-4">
                        <label className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                            <span className="text-sm font-bold text-purple-300 whitespace-nowrap">📅 기준 날짜 선택:</span>
                            <select
                                value={baselineDateIndex}
                                onChange={(e) => setBaselineDateIndex(Number(e.target.value))}
                                className="w-full sm:flex-1 bg-slate-700 border-2 border-purple-500/50 text-white py-2 px-3 rounded-lg font-bold cursor-pointer hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                            >
                                {itemData.map((item, index) => (
                                    <option key={item.date} value={index}>
                                        {item.displayDate} {index === 0 && '(추적 시작일)'} {index === itemData.length - 1 && '(최신)'}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <p className="text-xs text-purple-200/70 mt-2">
                            💡 선택한 날짜를 기준으로 현재 가격과 변화율이 계산됩니다
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {itemData.length > 0 && (
                        <>
                            <div key="stat-start" className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                                <p className="text-xs text-slate-400 mb-2">기준 가격 ({itemData[baselineDateIndex].displayDate})</p>
                                {!isEthernel ? (
                                    <div className="space-y-1">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-red-400 font-bold">챌린저스</span>
                                            <span className="text-lg font-bold text-white">{itemData[baselineDateIndex].challenger || '-'}억</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-blue-400 font-bold">{mainServerLabel}</span>
                                            <span className="text-lg font-bold text-white">{itemData[baselineDateIndex].main || '-'}억</span>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-lg font-bold text-white">
                                        {itemData[baselineDateIndex].main}억
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
                                            <span className="text-sm text-blue-400 font-bold">{mainServerLabel}</span>
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
                                            <span className={`text-lg font-bold ${((itemData[itemData.length - 1].challenger || 0) - (itemData[baselineDateIndex].challenger || 0)) > 0
                                                ? 'text-red-400' : 'text-green-400'
                                                }`}>
                                                {(() => {
                                                    const start = itemData[baselineDateIndex].challenger || 0;
                                                    const end = itemData[itemData.length - 1].challenger || 0;
                                                    const change = start > 0 ? ((end - start) / start * 100).toFixed(1) : '0';
                                                    return `${parseFloat(change) > 0 ? '+' : ''}${change}%`;
                                                })()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-blue-400 font-bold">{mainServerLabel}</span>
                                            <span className={`text-lg font-bold ${((itemData[itemData.length - 1].main || 0) - (itemData[baselineDateIndex].main || 0)) > 0
                                                ? 'text-red-400' : 'text-green-400'
                                                }`}>
                                                {(() => {
                                                    const start = itemData[baselineDateIndex].main || 0;
                                                    const end = itemData[itemData.length - 1].main || 0;
                                                    const change = start > 0 ? ((end - start) / start * 100).toFixed(1) : '0';
                                                    return `${parseFloat(change) > 0 ? '+' : ''}${change}%`;
                                                })()}
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <p className={`text-lg font-bold ${((itemData[itemData.length - 1].main || 0) - (itemData[baselineDateIndex].main || 0)) > 0
                                        ? 'text-red-400' : 'text-green-400'
                                        }`}>
                                        {(() => {
                                            const start = itemData[baselineDateIndex].main || 0;
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
            </div>

            {/* 시각화 차트 추가 */}
            <div className="mt-8 pt-8 border-t border-slate-700">
                <h4 className="text-lg font-bold text-white mb-4 flex flex-wrap items-center gap-2">
                    📈 가격 추이 그래프
                    <span className="text-sm font-normal text-slate-300/80 mt-1 sm:mt-0">
                        (추적 아이템: {itemDisplayName[selectedItem] || selectedItem})
                    </span>
                </h4>
                <div className="h-[300px] w-full bg-slate-900/50 rounded-xl p-4 border border-slate-700">
                    {isMounted ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={itemData.slice(baselineDateIndex)} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
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
                                    name={isEthernel ? "본섭 평균 가격" : mainServerLabel}
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    dot={{ fill: '#3b82f6', r: 3 }}
                                    activeDot={{ r: 5 }}
                                    connectNulls
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-500">
                            Loading Chart...
                        </div>
                    )}
                </div>
            </div>

            {/* 안내 */}
            <div className="mt-6 bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <p className="text-sm text-blue-200/90 text-center">
                    💡 위 표의 행을 클릭하거나 차트에 마우스를 올려 상세 정보를 확인하세요
                </p>
            </div>

            {/* 에테르넬 직업별 가격표 (최신 데이터만) */}
            {data.length > 0 && data[data.length - 1].ethernelByJob && data[data.length - 1].ethernelByJob!.length > 0 && (
                <div className="mt-12 pt-8 border-t border-slate-700">
                    <h4 className="text-2xl font-black text-white mb-4 flex items-center gap-2">
                        ⚔️ 에테르넬 장비 직업별 가격 (본섭)
                    </h4>
                    <p className="text-sm text-slate-300 mb-6">
                        최근 업데이트: <span className="text-blue-400 font-bold">{data[data.length - 1].date}</span> - 각 직업군별 에테르넬 장비 가격을 한눈에 확인하세요
                    </p>

                    {/* 모바일 스크롤 힌트 */}
                    <div className="md:hidden text-center mb-2">
                        <p className="text-xs text-slate-500">
                            ← 좌우로 스크롤하여 모든 직업 확인 →
                        </p>
                    </div>

                    <div className="overflow-x-auto overflow-y-visible" style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}>
                        <div className="bg-slate-900/50 rounded-xl border border-slate-700 overflow-hidden inline-block min-w-full">
                            <table className="w-full text-xs sm:text-sm" style={{ minWidth: '600px' }}>
                                <thead>
                                    <tr className="bg-slate-800/50 border-b border-slate-700">
                                        <th className="text-left p-3 sm:p-4 text-white font-bold sticky left-0 bg-slate-800/50">아이템</th>
                                        <th className="text-right p-3 sm:p-4 text-red-400 font-bold whitespace-nowrap">전사</th>
                                        <th className="text-right p-3 sm:p-4 text-blue-400 font-bold whitespace-nowrap">마법사</th>
                                        <th className="text-right p-3 sm:p-4 text-green-400 font-bold whitespace-nowrap">궁수</th>
                                        <th className="text-right p-3 sm:p-4 text-purple-400 font-bold whitespace-nowrap">도적</th>
                                        <th className="text-right p-3 sm:p-4 text-orange-400 font-bold whitespace-nowrap">해적</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data[data.length - 1].ethernelByJob!.map((item, index) => (
                                        <tr
                                            key={item.item}
                                            className={`border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors ${index % 2 === 0 ? 'bg-slate-900/20' : ''
                                                }`}
                                        >
                                            <td className="p-3 sm:p-4 text-white font-semibold sticky left-0 bg-slate-900/90 whitespace-nowrap">
                                                에테르넬 {item.item}
                                            </td>
                                            <td className="p-3 sm:p-4 text-right text-red-300 font-bold whitespace-nowrap">
                                                {item.warrior}억
                                            </td>
                                            <td className="p-3 sm:p-4 text-right text-blue-300 font-bold whitespace-nowrap">
                                                {item.mage}억
                                            </td>
                                            <td className="p-3 sm:p-4 text-right text-green-300 font-bold whitespace-nowrap">
                                                {item.archer}억
                                            </td>
                                            <td className="p-3 sm:p-4 text-right text-purple-300 font-bold whitespace-nowrap">
                                                {item.thief}억
                                            </td>
                                            <td className="p-3 sm:p-4 text-right text-orange-300 font-bold whitespace-nowrap">
                                                {item.pirate}억
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* 가격대별 색상 안내 */}
                    <div className="mt-6 bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                        <p className="text-sm text-purple-200/90 text-center">
                            💡 직업에 따라 에테르넬 장비 가격이 다릅니다. 내 직업에 맞는 가격을 확인하세요!
                        </p>
                    </div>

                    {/* 에테르넬 가격 변화 통계 */}
                    {data.length > 0 && data[baselineDateIndex].ethernelByJob && data[data.length - 1].ethernelByJob && (
                        <div className="mt-8 pt-6 border-t border-slate-700">
                            <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                                <h5 className="text-lg font-bold text-white">
                                    📈 에테르넬 평균 가격 변화 ({data[baselineDateIndex].date.slice(5).replace('-', '/')} → {data[data.length - 1].date.slice(5).replace('-', '/')})
                                </h5>
                                {baselineDateIndex !== 0 && (
                                    <span className="text-xs bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full border border-purple-500/50">
                                        📅 기준: {data[baselineDateIndex].date.slice(5).replace('-', '/')}
                                    </span>
                                )}
                            </div>
                            {baselineDateIndex === 0 && itemData.length > 1 && (
                                <p className="text-xs text-slate-400 mb-4 bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                                    💡 <strong className="text-blue-300">위쪽의 "📅 기준 날짜 선택"</strong>을 사용하면 원하는 날짜 기준으로 가격 변화를 확인할 수 있습니다
                                </p>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {(() => {
                                    const firstDay = data[baselineDateIndex].ethernelByJob!;
                                    const lastDay = data[data.length - 1].ethernelByJob!;

                                    // 그룹1: 모자, 상의, 하의, 견장 (방어구)
                                    const armorItems = ['모자', '상의', '하의', '견장'];
                                    // 그룹2: 신발, 장갑, 망토 (고가 장비)
                                    const expensiveItems = ['신발', '장갑', '망토'];

                                    const calculateGroupAverage = (items: typeof firstDay, group: string[]) => {
                                        const filtered = items.filter(item => group.includes(item.item));
                                        if (filtered.length === 0) return 0;

                                        const total = filtered.reduce((sum, item) => {
                                            const jobAvg = (item.warrior + item.mage + item.archer + item.thief + item.pirate) / 5;
                                            return sum + jobAvg;
                                        }, 0);

                                        return parseFloat((total / filtered.length).toFixed(2));
                                    };

                                    const armorStart = calculateGroupAverage(firstDay, armorItems);
                                    const armorEnd = calculateGroupAverage(lastDay, armorItems);
                                    const armorChange = armorStart > 0 ? ((armorEnd - armorStart) / armorStart * 100).toFixed(1) : '0';

                                    const expensiveStart = calculateGroupAverage(firstDay, expensiveItems);
                                    const expensiveEnd = calculateGroupAverage(lastDay, expensiveItems);
                                    const expensiveChange = expensiveStart > 0 ? ((expensiveEnd - expensiveStart) / expensiveStart * 100).toFixed(1) : '0';

                                    return (
                                        <>
                                            {/* 방어구 그룹 */}
                                            <div className="bg-slate-800/40 rounded-lg border border-blue-500/30 p-4">
                                                <h6 className="text-sm font-bold text-blue-400 mb-3">
                                                    🛡️ 방어구 (모자/상의/하의/견장)
                                                </h6>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xs text-slate-400">시작 ({data[baselineDateIndex].date.slice(5).replace('-', '/')})</span>
                                                        <span className="text-base font-bold text-white">{armorStart}억</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xs text-slate-400">현재 ({data[data.length - 1].date.slice(5).replace('-', '/')})</span>
                                                        <span className="text-base font-bold text-white">{armorEnd}억</span>
                                                    </div>
                                                    <div className="flex justify-between items-center pt-2 border-t border-slate-700">
                                                        <span className="text-xs text-slate-400">변화율</span>
                                                        <span className={`text-lg font-bold ${parseFloat(armorChange) > 0 ? 'text-red-400' : parseFloat(armorChange) < 0 ? 'text-green-400' : 'text-slate-400'}`}>
                                                            {parseFloat(armorChange) > 0 ? '+' : ''}{armorChange}%
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* 고가 장비 그룹 */}
                                            <div className="bg-slate-800/40 rounded-lg border border-yellow-500/30 p-4">
                                                <h6 className="text-sm font-bold text-yellow-400 mb-3">
                                                    💎 고가 장비 (신발/장갑/망토)
                                                </h6>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xs text-slate-400">시작 ({data[baselineDateIndex].date.slice(5).replace('-', '/')})</span>
                                                        <span className="text-base font-bold text-white">{expensiveStart}억</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xs text-slate-400">현재 ({data[data.length - 1].date.slice(5).replace('-', '/')})</span>
                                                        <span className="text-base font-bold text-white">{expensiveEnd}억</span>
                                                    </div>
                                                    <div className="flex justify-between items-center pt-2 border-t border-slate-700">
                                                        <span className="text-xs text-slate-400">변화율</span>
                                                        <span className={`text-lg font-bold ${parseFloat(expensiveChange) > 0 ? 'text-red-400' : parseFloat(expensiveChange) < 0 ? 'text-green-400' : 'text-slate-400'}`}>
                                                            {parseFloat(expensiveChange) > 0 ? '+' : ''}{expensiveChange}%
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
