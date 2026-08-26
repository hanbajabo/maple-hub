'use client';

import { useState, useMemo, useEffect } from 'react';
import { ChevronDown, BarChart3, Clock, ArrowUpDown } from 'lucide-react';
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

type PeriodType = '7d' | '14d' | '30d' | '90d' | 'all';

export default function ItemPriceChart({ data }: ItemPriceChartProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // 아이템 카테고리 정의
    const itemCategories = {
        '칠흑 세트': ['거공', '고근', '커포', '루컨마', '마깃안', '몽벨', '마도서', '미트라', '창뱃', '언더컨트롤', '블랙하트(스카)'],
        '광휘 세트': ['근원의 속삭임', '죽음의 맹세', '불멸의 유산', '황홀한 악몽', '굶주리는 핏빛 원혼'],
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
        '근원의 속삭임': '근원의 속삭임',
        '죽음의 맹세': '죽음의 맹세',
        '불멸의 유산': '불멸의 유산',
        '황홀한 악몽': '황홀한 악몽',
        '굶주리는 핏빛 원혼': '굶주리는 핏빛 원혼',
    };

    // 모든 아이템 목록
    const allItems = useMemo(() => {
        const items = new Set<string>();
        const excludedKeywords = ['부티크', '솜사탕', '웨폰', '리3', '컨3', '프리렌', '슈타르크', '페른'];

        const recentDays = data.slice(-30);
        recentDays.forEach((day) => {
            Object.keys(day.items).forEach((item) => {
                if (!excludedKeywords.some(keyword => item.includes(keyword))) {
                    items.add(item);
                }
            });
        });

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
    const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('30d');
    const [isTableExpanded, setIsTableExpanded] = useState(false);

    // 에테르넬 가격 비교용 상태
    const ethernelDays = useMemo(() => {
        return data.filter(d => d.ethernelByJob && d.ethernelByJob.length > 0);
    }, [data]);
    const [ethBaseIndex, setEthBaseIndex] = useState(0);
    const [ethTargetIndex, setEthTargetIndex] = useState(-1);

    // 품목 변경 시 테이블 접기 초기화
    useEffect(() => {
        setIsTableExpanded(false);
    }, [selectedItem]);

    const filteredItems = useMemo(() => {
        if (selectedCategory === '전체') {
            return allItems;
        }
        const categoryItems = itemCategories[selectedCategory as keyof typeof itemCategories] || [];
        return allItems.filter(item => categoryItems.includes(item));
    }, [selectedCategory, allItems]);

    // 전체 아이템 시세 시계열 데이터
    const allItemData = useMemo(() => {
        return data.map((day) => {
            if (!day.date || day.date.length < 10) return null;

            let priceInfo = { ...(day.items[selectedItem] || {}) };
            
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

    // 기간 필터에 따른 데이터
    const chartData = useMemo(() => {
        if (selectedPeriod === '7d') return allItemData.slice(-7);
        if (selectedPeriod === '14d') return allItemData.slice(-14);
        if (selectedPeriod === '30d') return allItemData.slice(-30);
        if (selectedPeriod === '90d') return allItemData.slice(-90);
        return allItemData;
    }, [allItemData, selectedPeriod]);

    // X축 눈금 자동 조절
    const xAxisInterval = useMemo(() => {
        const len = chartData.length;
        if (selectedPeriod === '7d' || selectedPeriod === '14d') return 0;
        if (selectedPeriod === '30d') return Math.max(1, Math.floor(len / 6));
        if (selectedPeriod === '90d') return Math.max(2, Math.floor(len / 6));
        return Math.max(4, Math.floor(len / 8));
    }, [selectedPeriod, chartData.length]);

    // 기간 통계
    const periodStats = useMemo(() => {
        if (chartData.length === 0) return null;
        const mainPrices = chartData.map(d => d.main).filter((p): p is number => p !== null && p > 0);
        if (mainPrices.length === 0) return null;

        const min = Math.min(...mainPrices);
        const max = Math.max(...mainPrices);
        const first = mainPrices[0];
        const last = mainPrices[mainPrices.length - 1];
        const changeRate = first > 0 ? ((last - first) / first * 100).toFixed(1) : '0';

        const formatShort = (v: number) => {
            if (v < 1 && v > 0) return `${Math.round(v * 10000).toLocaleString()}만`;
            return `${v}억`;
        };

        return { min: formatShort(min), max: formatShort(max), changeRate };
    }, [chartData]);

    const isEthernel = selectedItem.startsWith('에테르넬');
    const scaniaItems = ['신마석(스카)', '연마석(스카)', '블랙하트(스카)'];
    const isScania = scaniaItems.includes(selectedItem);
    const mainServerLabel = isScania ? '스카니아' : '본섭';

    const tableData = useMemo(() => {
        const reversed = [...allItemData].reverse();
        if (!isTableExpanded) {
            return reversed.slice(0, 14);
        }
        return reversed;
    }, [allItemData, isTableExpanded]);

    return (
        <div className="w-full bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-slate-700 p-3 sm:p-6 md:p-8 my-3 sm:my-8 shadow-2xl overflow-hidden">
            {/* 상단 컨트롤 헤더 */}
            <div className="mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 mb-3.5 sm:mb-4">
                    <div>
                        <h3 className="text-lg sm:text-2xl font-black text-white flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 flex-shrink-0" />
                            <span>아이템 시세 추적</span>
                        </h3>
                        <p className="text-[11px] sm:text-sm text-slate-400 mt-0.5">
                            {isEthernel
                                ? '에테르넬 5직업군 평균 시세 추이'
                                : `챌린저스 vs ${mainServerLabel} 실시간 가격 비교`
                            }
                        </p>
                    </div>

                    {/* 아이템 선택 드롭다운 */}
                    <div className="w-full sm:w-auto">
                        <select
                            value={selectedItem}
                            onChange={(e) => setSelectedItem(e.target.value)}
                            className="w-full sm:w-64 bg-slate-950 border-2 border-blue-500/50 text-white py-2 px-3 sm:py-2.5 sm:px-3.5 rounded-xl font-bold cursor-pointer hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm shadow-md"
                        >
                            {filteredItems.map((item) => (
                                <option key={item} value={item}>
                                    {itemDisplayName[item] || item}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* 카테고리 칩 (모바일 가로 스크롤) */}
                <div className="flex overflow-x-auto no-scrollbar gap-1.5 pb-1 sm:flex-wrap touch-pan-x">
                    {['전체', '칠흑 세트', '광휘 세트', '에테르넬', '장신구', '기타 아이템'].map((category) => (
                        <button
                            key={category}
                            onClick={() => {
                                setSelectedCategory(category);
                                const newFilteredItems = category === '전체'
                                    ? allItems
                                    : allItems.filter(item =>
                                        (itemCategories[category as keyof typeof itemCategories] || []).includes(item)
                                    );
                                if (newFilteredItems.length > 0) {
                                    setSelectedItem(newFilteredItems[0]);
                                }
                            }}
                            className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                                selectedCategory === category
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-900/50'
                                    : 'bg-slate-700/70 text-slate-300 hover:bg-slate-600 hover:text-white'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* 📈 그래프 영역 */}
            <div className="bg-slate-950/80 rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-slate-700/80 mb-6 sm:mb-8 shadow-inner">
                {/* 차트 상단 툴바: 기간 선택 버튼 & 스탯 박스 */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 mb-4 pb-3 border-b border-slate-800">
                    {/* 기간 선택 버튼 (모바일 5열 균등 분할) */}
                    <div className="w-full sm:w-auto">
                        <div className="grid grid-cols-5 gap-1 sm:flex sm:items-center sm:gap-1.5">
                            {(
                                [
                                    { key: '7d', label: '7일' },
                                    { key: '14d', label: '14일' },
                                    { key: '30d', label: '1개월' },
                                    { key: '90d', label: '3개월' },
                                    { key: 'all', label: '전체' },
                                ] as const
                            ).map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setSelectedPeriod(tab.key)}
                                    className={`py-1 sm:py-1.5 px-1 sm:px-3 rounded-lg text-[11px] sm:text-xs font-bold text-center transition-all ${
                                        selectedPeriod === tab.key
                                            ? 'bg-blue-500 text-white shadow-sm ring-1 ring-blue-400'
                                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 기간 내 가격 요약 스탯 */}
                    {periodStats && (
                        <div className="grid grid-cols-3 sm:flex sm:items-center gap-1.5 sm:gap-3 text-[10px] sm:text-xs bg-slate-900/90 px-2.5 py-1.5 rounded-lg border border-slate-800 text-center sm:text-left">
                            <div>
                                <span className="text-slate-400">최저:</span>{' '}
                                <span className="text-emerald-400 font-bold">{periodStats.min}</span>
                            </div>
                            <div className="border-x border-slate-700/50 sm:border-x-0 sm:h-3 sm:w-px sm:bg-slate-700">
                                <span className="text-slate-400">최고:</span>{' '}
                                <span className="text-red-400 font-bold">{periodStats.max}</span>
                            </div>
                            <div>
                                <span className="text-slate-400">변동:</span>{' '}
                                <span className={`font-bold ${
                                    Number(periodStats.changeRate) > 0 
                                        ? 'text-red-400' 
                                        : Number(periodStats.changeRate) < 0 
                                            ? 'text-emerald-400' 
                                            : 'text-slate-300'
                                }`}>
                                    {Number(periodStats.changeRate) > 0 ? '+' : ''}{periodStats.changeRate}%
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* 실제 Recharts 그래프 */}
                <div className="h-[240px] sm:h-[320px] w-full -ml-2 sm:ml-0">
                    {isMounted ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: -22 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                                <XAxis
                                    dataKey="displayDate"
                                    tick={{ fill: '#94a3b8', fontSize: 10 }}
                                    stroke="#475569"
                                    interval={xAxisInterval}
                                    tickMargin={6}
                                />
                                <YAxis
                                    tick={{ fill: '#94a3b8', fontSize: 10 }}
                                    stroke="#475569"
                                    tickFormatter={(value) => `${value}억`}
                                    domain={['auto', 'auto']}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#090d16',
                                        border: '1px solid #3b82f6',
                                        borderRadius: '10px',
                                        color: '#f1f5f9',
                                        boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                                        fontSize: '11px',
                                        padding: '8px 12px',
                                    }}
                                    formatter={(value: any) => {
                                        const num = Number(value);
                                        if (num < 1 && num > 0) {
                                            return [`${Math.round(num * 10000).toLocaleString()}만 (${num}억)`, ''];
                                        }
                                        return [`${value}억`, ''];
                                    }}
                                    labelFormatter={(label, payload) => {
                                        if (payload && payload.length > 0 && payload[0].payload) {
                                            const rawDate = payload[0].payload.date;
                                            return `📅 ${rawDate} (${label})`;
                                        }
                                        return label;
                                    }}
                                />
                                <Legend wrapperStyle={{ paddingTop: '8px', fontSize: '11px' }} />
                                {!isEthernel && (
                                    <Line
                                        type="monotone"
                                        dataKey="challenger"
                                        name="챌린저스"
                                        stroke="#ef4444"
                                        strokeWidth={2}
                                        dot={chartData.length <= 20 ? { fill: '#ef4444', r: 2 } : false}
                                        activeDot={{ r: 4 }}
                                        connectNulls
                                    />
                                )}
                                <Line
                                    type="monotone"
                                    dataKey="main"
                                    name={isEthernel ? "본섭 평균 가격" : mainServerLabel}
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    dot={chartData.length <= 20 ? { fill: '#3b82f6', r: 2 } : false}
                                    activeDot={{ r: 4 }}
                                    connectNulls
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">
                            차트 로딩 중...
                        </div>
                    )}
                </div>
            </div>

            {/* 📋 일자별 시세 상세 내역 */}
            <div className="mt-6 sm:mt-8">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <h4 className="text-xs sm:text-base font-bold text-white flex items-center gap-1.5">
                        <span>📋</span> 일자별 시세 내역
                        <span className="text-[11px] text-slate-400 font-normal">
                            ({isTableExpanded ? `전체 ${allItemData.length}일` : `최신 14일`})
                        </span>
                    </h4>
                </div>

                <div className="bg-slate-900/60 rounded-xl border border-slate-700 overflow-hidden shadow-md">
                    <div className="overflow-x-auto">
                        <table className="w-full text-xs sm:text-sm">
                            <thead>
                                <tr className="bg-slate-800/80 border-b border-slate-700 text-slate-300">
                                    <th className="text-left p-2.5 sm:p-3.5 font-bold sticky left-0 bg-slate-800/95 z-10 whitespace-nowrap">날짜</th>
                                    {!isEthernel && (
                                        <th className="text-right p-2.5 sm:p-3.5 text-red-400 font-bold whitespace-nowrap">챌린저스</th>
                                    )}
                                    <th className="text-right p-2.5 sm:p-3.5 text-blue-400 font-bold whitespace-nowrap">
                                        {isEthernel ? '본섭 평균' : mainServerLabel}
                                    </th>
                                    {!isEthernel && (
                                        <th className="text-right p-2.5 sm:p-3.5 text-amber-300 font-bold whitespace-nowrap">차이 (챌-본)</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((row, index) => {
                                    const isFirst = index === 0;
                                    const diffVal = row.challenger && row.main ? row.challenger - row.main : 0;
                                    const diff = parseFloat(diffVal.toFixed(2));
                                    const diffPercent = row.challenger && row.main && row.main > 0
                                        ? ((diff / row.main) * 100).toFixed(1)
                                        : '0';

                                    const formatVal = (val: number | null) => {
                                        if (val === null || val === undefined) return '-';
                                        if (val < 1 && val > 0) return `${Math.round(val * 10000).toLocaleString()}만`;
                                        return `${val}억`;
                                    };

                                    return (
                                        <tr
                                            key={`${row.date}-${index}`}
                                            className={`border-b border-slate-800/80 hover:bg-slate-800/40 transition-colors ${
                                                isFirst ? 'bg-blue-950/20' : ''
                                            }`}
                                        >
                                            <td className="p-2.5 sm:p-3.5 text-slate-200 font-medium whitespace-nowrap sticky left-0 bg-slate-900/95 z-10">
                                                {row.date}
                                                {isFirst && (
                                                    <span className="ml-1.5 text-[9px] sm:text-[10px] bg-blue-500/20 text-blue-400 px-1 py-0.5 rounded font-bold">최신</span>
                                                )}
                                            </td>
                                            {!isEthernel && (
                                                <td className="p-2.5 sm:p-3.5 text-right text-red-400 font-bold whitespace-nowrap">
                                                    {formatVal(row.challenger)}
                                                </td>
                                            )}
                                            <td className="p-2.5 sm:p-3.5 text-right text-blue-400 font-bold whitespace-nowrap">
                                                {formatVal(row.main)}
                                            </td>
                                            {!isEthernel && (
                                                <td className="p-2.5 sm:p-3.5 text-right whitespace-nowrap">
                                                    {row.challenger && row.main ? (
                                                        <div className="flex flex-col items-end">
                                                            <span className={`font-bold ${diff > 0 ? 'text-red-400' : diff < 0 ? 'text-emerald-400' : 'text-slate-400'}`}>
                                                                {diff > 0 ? '+' : ''}{diff}억
                                                            </span>
                                                            <span className="text-[10px] text-slate-400">
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

                    {allItemData.length > 14 && (
                        <div className="p-2.5 sm:p-3 bg-slate-950/60 border-t border-slate-800 text-center">
                            <button
                                onClick={() => setIsTableExpanded(!isTableExpanded)}
                                className="inline-flex items-center gap-1 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors py-1.5 px-3 rounded-lg bg-blue-950/40 border border-blue-800/50 hover:bg-blue-900/40"
                            >
                                <ChevronDown className={`w-3.5 h-3.5 transform transition-transform ${isTableExpanded ? 'rotate-180' : ''}`} />
                                <span>{isTableExpanded ? '과거 시세 접기' : `과거 시세 전체 보기 (+${allItemData.length - 14}일)`}</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* ⚔️ 에테르넬 직업별 시세표 (최신 본섭 기준) */}
            {data.length > 0 && data[data.length - 1].ethernelByJob && data[data.length - 1].ethernelByJob!.length > 0 && (
                <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-slate-700">
                    <div className="flex items-center justify-between mb-1.5">
                        <h4 className="text-sm sm:text-xl font-black text-white flex items-center gap-1.5">
                            ⚔️ 에테르넬 직업별 시세 (최신)
                        </h4>
                        <span className="text-[11px] text-blue-400 font-semibold">{data[data.length - 1].date} 기준</span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-400 mb-3">
                        👈 모바일에서는 표를 좌우로 스크롤하여 5개 직업군 시세를 확인하세요 👉
                    </p>

                    <div className="overflow-x-auto">
                        <div className="bg-slate-900/60 rounded-xl border border-slate-700 overflow-hidden inline-block min-w-full">
                            <table className="w-full text-xs sm:text-sm">
                                <thead>
                                    <tr className="bg-slate-800/80 border-b border-slate-700">
                                        <th className="text-left p-2.5 sm:p-3.5 text-white font-bold sticky left-0 bg-slate-800/95 z-10 whitespace-nowrap">부위</th>
                                        <th className="text-right p-2.5 sm:p-3.5 text-red-400 font-bold whitespace-nowrap">전사</th>
                                        <th className="text-right p-2.5 sm:p-3.5 text-blue-400 font-bold whitespace-nowrap">마법사</th>
                                        <th className="text-right p-2.5 sm:p-3.5 text-green-400 font-bold whitespace-nowrap">궁수</th>
                                        <th className="text-right p-2.5 sm:p-3.5 text-purple-400 font-bold whitespace-nowrap">도적</th>
                                        <th className="text-right p-2.5 sm:p-3.5 text-orange-400 font-bold whitespace-nowrap">해적</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data[data.length - 1].ethernelByJob!.map((item, index) => {
                                        const formatPrice = (val: number) => {
                                            if (!val || val <= 0) return '-';
                                            if (val < 1) {
                                                return `${Math.round(val * 10000).toLocaleString()}만`;
                                            }
                                            return `${val}억`;
                                        };

                                        return (
                                            <tr
                                                key={item.item}
                                                className={`border-b border-slate-800/80 hover:bg-slate-800/30 transition-colors ${
                                                    index % 2 === 0 ? 'bg-slate-900/30' : ''
                                                }`}
                                            >
                                                <td className="p-2.5 sm:p-3.5 text-white font-bold sticky left-0 bg-slate-900/95 z-10 whitespace-nowrap">
                                                    에테르넬 {item.item}
                                                </td>
                                                <td className="p-2.5 sm:p-3.5 text-right text-red-300 font-bold whitespace-nowrap">{formatPrice(item.warrior)}</td>
                                                <td className="p-2.5 sm:p-3.5 text-right text-blue-300 font-bold whitespace-nowrap">{formatPrice(item.mage)}</td>
                                                <td className="p-2.5 sm:p-3.5 text-right text-green-300 font-bold whitespace-nowrap">{formatPrice(item.archer)}</td>
                                                <td className="p-2.5 sm:p-3.5 text-right text-purple-300 font-bold whitespace-nowrap">{formatPrice(item.thief)}</td>
                                                <td className="p-2.5 sm:p-3.5 text-right text-orange-300 font-bold whitespace-nowrap">{formatPrice(item.pirate)}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mt-3 p-2.5 sm:p-3 bg-purple-950/30 border border-purple-800/40 rounded-xl text-[11px] sm:text-xs text-purple-200/80">
                        💡 <strong>모자·상의·하의·견장</strong>은 <strong>수천만 메소대(0.15~0.27억)</strong>, <strong>장갑·신발·망토</strong>는 <strong>11~13억대</strong>에 거래됩니다.
                    </div>

                    {/* 에테르넬 인터랙티브 가격 변화 비교 */}
                    {(() => {
                        if (ethernelDays.length === 0) return null;

                        const effectiveBaseIdx = Math.max(0, Math.min(ethBaseIndex, ethernelDays.length - 1));
                        const effectiveTargetIdx = ethTargetIndex === -1 
                            ? ethernelDays.length - 1 
                            : Math.max(0, Math.min(ethTargetIndex, ethernelDays.length - 1));

                        const baseDay = ethernelDays[effectiveBaseIdx];
                        const targetDay = ethernelDays[effectiveTargetIdx];

                        if (!baseDay || !targetDay || !baseDay.ethernelByJob || !targetDay.ethernelByJob) return null;

                        const armorItems = ['모자', '상의', '하의', '견장'];
                        const expensiveItems = ['신발', '장갑', '망토'];

                        const calculateGroupAverage = (items: NonNullable<typeof baseDay.ethernelByJob>, group: string[]) => {
                            const filtered = items.filter(item => group.includes(item.item));
                            if (filtered.length === 0) return 0;

                            const total = filtered.reduce((sum, item) => {
                                const validJobs = [item.warrior, item.mage, item.archer, item.thief, item.pirate].filter(p => p > 0);
                                if (validJobs.length === 0) return sum;
                                const jobAvg = validJobs.reduce((a, b) => a + b, 0) / validJobs.length;
                                return sum + jobAvg;
                            }, 0);

                            return parseFloat((total / filtered.length).toFixed(2));
                        };

                        const armorStart = calculateGroupAverage(baseDay.ethernelByJob, armorItems);
                        const armorEnd = calculateGroupAverage(targetDay.ethernelByJob, armorItems);
                        const armorDiff = parseFloat((armorEnd - armorStart).toFixed(2));
                        const armorChange = armorStart > 0 ? ((armorEnd - armorStart) / armorStart * 100).toFixed(1) : '0';

                        const expensiveStart = calculateGroupAverage(baseDay.ethernelByJob, expensiveItems);
                        const expensiveEnd = calculateGroupAverage(targetDay.ethernelByJob, expensiveItems);
                        const expensiveDiff = parseFloat((expensiveEnd - expensiveStart).toFixed(2));
                        const expensiveChange = expensiveStart > 0 ? ((expensiveEnd - expensiveStart) / expensiveStart * 100).toFixed(1) : '0';

                        const formatDisplayVal = (val: number) => {
                            if (val < 1 && val > 0) return `${Math.round(val * 10000).toLocaleString()}만 (${val}억)`;
                            return `${val}억`;
                        };

                        const baseDateDisplay = baseDay.date;
                        const targetDateDisplay = targetDay.date;

                        return (
                            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-700">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3.5">
                                    <div>
                                        <h5 className="text-sm sm:text-lg font-bold text-white flex items-center gap-1.5">
                                            📈 에테르넬 평균 가격 변화 비교
                                        </h5>
                                        <p className="text-[11px] sm:text-xs text-slate-400">
                                            원하는 기준 날짜와 비교 날짜를 선택하여 변동률을 확인하세요.
                                        </p>
                                    </div>

                                    {/* 빠른 프리셋 버튼 */}
                                    <div className="grid grid-cols-5 gap-1 w-full sm:flex sm:w-auto">
                                        {[
                                            { label: '연초', idx: 0 },
                                            { label: '3달전', idx: Math.max(0, ethernelDays.length - 90) },
                                            { label: '1달전', idx: Math.max(0, ethernelDays.length - 30) },
                                            { label: '14일전', idx: Math.max(0, ethernelDays.length - 14) },
                                            { label: '7일전', idx: Math.max(0, ethernelDays.length - 7) },
                                        ].map((preset) => (
                                            <button
                                                key={preset.label}
                                                onClick={() => {
                                                    setEthBaseIndex(preset.idx);
                                                    setEthTargetIndex(-1);
                                                }}
                                                className={`py-1 px-1.5 sm:px-2.5 rounded text-[10px] sm:text-[11px] font-bold text-center transition-all ${
                                                    ethBaseIndex === preset.idx && ethTargetIndex === -1
                                                        ? 'bg-purple-600 text-white shadow-sm ring-1 ring-purple-400'
                                                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                                                }`}
                                            >
                                                {preset.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* 날짜 선택 드롭다운 */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4 p-2.5 sm:p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl">
                                    <div>
                                        <label className="block text-[11px] sm:text-xs font-bold text-slate-300 mb-1">
                                            📅 시작 기준일:
                                        </label>
                                        <select
                                            value={effectiveBaseIdx}
                                            onChange={(e) => setEthBaseIndex(Number(e.target.value))}
                                            className="w-full bg-slate-900 border border-slate-700 text-slate-200 py-1.5 px-2.5 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-purple-500 cursor-pointer"
                                        >
                                            {ethernelDays.map((d, idx) => (
                                                <option key={d.date} value={idx}>
                                                    {d.date} {idx === 0 ? '(추적 시작일)' : ''}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] sm:text-xs font-bold text-slate-300 mb-1">
                                            📅 비교 종료일:
                                        </label>
                                        <select
                                            value={effectiveTargetIdx}
                                            onChange={(e) => setEthTargetIndex(Number(e.target.value))}
                                            className="w-full bg-slate-900 border border-slate-700 text-slate-200 py-1.5 px-2.5 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-purple-500 cursor-pointer"
                                        >
                                            {ethernelDays.map((d, idx) => (
                                                <option key={d.date} value={idx}>
                                                    {d.date} {idx === ethernelDays.length - 1 ? '(최신)' : ''}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* 결과 카드 2종 */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4">
                                    {/* 방어구 그룹 */}
                                    <div className="bg-slate-800/40 rounded-xl border border-blue-500/30 p-3 sm:p-4 shadow-md">
                                        <h6 className="text-xs sm:text-sm font-bold text-blue-400 mb-2 flex items-center gap-1">
                                            🛡️ 방어구 (모자/상의/하의/견장)
                                        </h6>
                                        <div className="space-y-1.5 text-xs sm:text-sm">
                                            <div className="flex justify-between items-center">
                                                <span className="text-slate-400">기준 ({baseDateDisplay})</span>
                                                <span className="font-bold text-white">{formatDisplayVal(armorStart)}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-slate-400">비교 ({targetDateDisplay})</span>
                                                <span className="font-bold text-white">{formatDisplayVal(armorEnd)}</span>
                                            </div>
                                            <div className="flex justify-between items-center pt-2 border-t border-slate-700/80">
                                                <span className="text-[11px] text-slate-400 font-medium">
                                                    변화량 ({armorDiff > 0 ? `+${armorDiff}` : armorDiff}억)
                                                </span>
                                                <span className={`text-sm sm:text-base font-black ${
                                                    Number(armorChange) > 0 
                                                        ? 'text-red-400' 
                                                        : Number(armorChange) < 0 
                                                            ? 'text-emerald-400' 
                                                            : 'text-slate-300'
                                                }`}>
                                                    {Number(armorChange) > 0 ? '+' : ''}{armorChange}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 고가 장비 그룹 */}
                                    <div className="bg-slate-800/40 rounded-xl border border-amber-500/30 p-3 sm:p-4 shadow-md">
                                        <h6 className="text-xs sm:text-sm font-bold text-amber-400 mb-2 flex items-center gap-1">
                                            💎 고가 장비 (신발/장갑/망토)
                                        </h6>
                                        <div className="space-y-1.5 text-xs sm:text-sm">
                                            <div className="flex justify-between items-center">
                                                <span className="text-slate-400">기준 ({baseDateDisplay})</span>
                                                <span className="font-bold text-white">{formatDisplayVal(expensiveStart)}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-slate-400">비교 ({targetDateDisplay})</span>
                                                <span className="font-bold text-white">{formatDisplayVal(expensiveEnd)}</span>
                                            </div>
                                            <div className="flex justify-between items-center pt-2 border-t border-slate-700/80">
                                                <span className="text-[11px] text-slate-400 font-medium">
                                                    변화량 ({expensiveDiff > 0 ? `+${expensiveDiff}` : expensiveDiff}억)
                                                </span>
                                                <span className={`text-sm sm:text-base font-black ${
                                                    Number(expensiveChange) > 0 
                                                        ? 'text-red-400' 
                                                        : Number(expensiveChange) < 0 
                                                            ? 'text-emerald-400' 
                                                            : 'text-slate-300'
                                                }`}>
                                                    {Number(expensiveChange) > 0 ? '+' : ''}{expensiveChange}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })()}
                </div>
            )}
        </div>
    );
}
