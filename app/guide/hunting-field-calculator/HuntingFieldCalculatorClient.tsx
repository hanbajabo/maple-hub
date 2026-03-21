"use client";

import { useState, useMemo } from "react";
import huntingData from "@/src/data/hunting_fields_200_300.json";
import { EXP_DATA } from "@/app/guide/exp-calculator/exp-data";
import { InArticleAd } from "@/components/AdSense";

// ─── 타입 ────────────────────────────────────────────────────────────────────

interface Monster {
    name: string;
    level: number;
}

interface MapEntry {
    level: number;
    region: string;
    map: string;
    count: number;
    monster_list: Monster[];
    exp_origin: number;
    exp_mult: number;
    exp: number;
    type: string;
    force: number;
    avg_exp: number; // 1젠당 평균 경험치 (1분 = 8젠)
}

// ─── 유틸 ──────────────────────────────────────────────────────────

const REGION_NAMES: Record<string, string> = {
    // 아케인포스 지역
    yeoro: "소멸의 여로",
    chewchew: "츄츄 아일랜드",
    yamyam: "얌얌 아일랜드",
    reversecity: "리버스 시티",
    lacheln: "레헬른",
    arcana: "아르카나",
    morass: "모라스",
    esperia: "에스페라",
    sellas: "셀라스",
    moonbridge: "문브릿지",
    labyrinth: "고통의 미궁",
    limen: "리멘",
    // 어센틱(그란디스) 지역
    cernium: "세르니움",
    arcs: "호텔 아르크스",
    odium: "오디움",
    dowonkyung: "도원경",
    arteria: "아르테리아",
    carcion: "카르시온",
    tallahart: "탈라하트",
    geardrak: "기어드락",
};

const TYPE_NAMES: Record<string, string> = {
    arcane: "아케인",
    authentic: "어센틱",
    grandis: "그란디스",
};

function getRegionLabel(region: string): string {
    return REGION_NAMES[region] ?? region;
}

function getTypeLabel(type: string): string {
    return TYPE_NAMES[type] ?? type;
}

function getForceLabel(type: string): string {
    if (type === "arcane") return "아케인포스";
    if (type === "authentic") return "어센틱포스";
    return "그란디스포스";
}

function formatExp(val: number): string {
    if (val >= 1_000_000_000_000)
        return `${(val / 1_000_000_000_000).toFixed(2)}조`;
    if (val >= 100_000_000) return `${(val / 100_000_000).toLocaleString("ko-KR", { maximumFractionDigits: 2 })}억`;
    if (val >= 10_000) return `${(val / 10_000).toLocaleString("ko-KR", { maximumFractionDigits: 1 })}만`;
    return val.toLocaleString("ko-KR");
}

function getRankIcon(rank: number): string {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `${rank}`;
}

function getTypeColor(type: string): string {
    if (type === "arcane") return "#6bcbff";
    if (type === "authentic") return "#ffd47a";
    return "#b39ddb";
}

function getTypeBg(type: string): string {
    if (type === "arcane") return "rgba(107,203,255,0.12)";
    if (type === "authentic") return "rgba(255,212,122,0.12)";
    return "rgba(179,157,219,0.12)";
}

// ─── 메인 컴포넌트 ─────────────────────────────────────────────────────────────

// 사냥터 고유 키
function fieldKey(m: MapEntry): string {
    return `${m.region}::${m.map}`;
}

export default function HuntingFieldCalculatorClient() {
    const [level, setLevel] = useState<string>("230");
    const [bonusExp, setBonusExp] = useState<string>("0");
    const [selected, setSelected] = useState<(MapEntry & { rank: number; exp30min: number; pct30min: number; burning: number }) | null>(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [burningFields, setBurningFields] = useState<Record<string, number>>({});

    const levelNum = parseInt(level) || 0;
    const bonusNum = parseFloat(bonusExp) || 0;

    // 해당 레벨의 required EXP
    const levelExpData = useMemo(() => {
        return EXP_DATA.find((d) => d.level === levelNum) ?? null;
    }, [levelNum]);

    // 검색 시 버닝 초기화
    const handleSearch = () => {
        if (levelNum >= 200 && levelNum < 300) {
            setBurningFields({});
            setHasSearched(true);
        }
    };

    // 버닝 변경 핸들러
    const handleBurning = (key: string, delta: number) => {
        setBurningFields((prev) => {
            const cur = prev[key] ?? 0;
            const next = Math.max(0, Math.min(10, cur + delta));
            return { ...prev, [key]: next };
        });
    };

    // 전체 맵 목록 (버닝 적용 전 기준)
    const allMaps: MapEntry[] = useMemo(() => {
        if (!hasSearched || levelNum < 200 || levelNum >= 300) return [];
        const raw = (huntingData as Record<string, { status: string; data?: { map: MapEntry[] } }>)[
            String(levelNum)
        ];
        if (!raw || raw.status !== "OK" || !raw.data) return [];
        return raw.data.map;
    }, [hasSearched, levelNum]);

    // TOP 20 계산 (버닝 포함 실시간 재정렬)
    const top20: (MapEntry & { rank: number; exp30min: number; pct30min: number; burning: number })[] = useMemo(() => {
        if (allMaps.length === 0) return [];
        const reqExp = levelExpData?.requiredExp ?? 1;

        const withExp = allMaps.map((m) => {
            const burning = burningFields[fieldKey(m)] ?? 0;
            // avg_exp = 1젠당 경험치, 1분 = 8젠 → 30분치
            // 버닝은 합적용: N단계 = +N×10% (버닝 1→+10%, 버닝 10→+100%)
            const base30 = m.avg_exp * 8 * 30;
            const withBonus = base30 * (1 + bonusNum / 100 + burning * 0.1);
            const pct = (withBonus / reqExp) * 100;
            return { ...m, exp30min: withBonus, pct30min: pct, burning };
        });

        return withExp
            .sort((a, b) => b.exp30min - a.exp30min)
            .slice(0, 20)
            .map((m, i) => ({ ...m, rank: i + 1 }));
    }, [allMaps, burningFields, bonusNum, levelExpData]);

    return (
        <div style={{ minHeight: "100vh", background: "#0b0e1a", color: "#e8eaf6", fontFamily: "'Noto Sans KR', sans-serif", padding: "0 0 80px 0" }}>
            {/* 헤더 */}
            <div className="px-5 py-8 sm:py-10" style={{ background: "linear-gradient(135deg, #1a1f3a 0%, #0f1629 100%)", borderBottom: "1px solid rgba(99,102,241,0.3)" }}>
                <div className="max-w-[900px] mx-auto">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-2">
                        <span className="text-3xl sm:text-4xl text-left block sm:inline">🗺️</span>
                        <h1 className="text-2xl sm:text-[28px] font-extrabold m-0 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400" style={{ letterSpacing: "-0.02em" }}>
                            메이플스토리 추천 사냥터 계산기
                        </h1>
                    </div>
                    <p className="text-sm mt-1" style={{ color: "#94a3b8" }}>레벨과 추가 경험치 %를 입력하면 30분 기준 경험치 효율 TOP 20 사냥터를 추천해드려요</p>
                </div>
            </div>

            <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px 0" }}>
                {/* 상단 광고 */}
                <div style={{ marginBottom: 32 }}>
                    <InArticleAd dataAdSlot="6849727140" />
                </div>

                {/* 입력 카드 */}
                <div className="p-5 sm:p-8 mb-8 shadow-[0_8px_40px_rgba(99,102,241,0.12)] rounded-3xl" style={{ background: "linear-gradient(135deg,rgba(30,35,70,0.95),rgba(20,25,55,0.95))", border: "1px solid rgba(99,102,241,0.35)" }}>
                    <h2 style={{ color: "#818cf8", fontSize: 16, fontWeight: 700, margin: "0 0 24px 0", letterSpacing: "0.05em", textTransform: "uppercase" }}>📊 캐릭터 정보 입력</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        {/* 레벨 */}
                        <div>
                            <label style={{ display: "block", color: "#94a3b8", fontSize: 13, fontWeight: 600, marginBottom: 8, height: 20 }}>캐릭터 레벨</label>
                            <input
                                type="number"
                                min={200}
                                max={299}
                                value={level}
                                onChange={(e) => { setLevel(e.target.value); setHasSearched(false); }}
                                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                placeholder="200 ~ 299"
                                style={{ width: "100%", background: "rgba(15,20,50,0.8)", border: "1.5px solid rgba(99,102,241,0.4)", borderRadius: 12, padding: "14px 16px", color: "#e8eaf6", fontSize: 18, fontWeight: 700, outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
                                onFocus={(e) => (e.target.style.borderColor = "#818cf8")}
                                onBlur={(e) => (e.target.style.borderColor = "rgba(99,102,241,0.4)")}
                            />
                            {levelNum > 0 && (levelNum < 200 || levelNum >= 300) && (
                                <p style={{ color: "#f87171", fontSize: 12, margin: "6px 0 0 4px" }}>레벨은 200~299 사이여야 합니다</p>
                            )}
                        </div>

                        {/* 추가 경험치 % */}
                        <div>
                            <label style={{ display: "block", color: "#94a3b8", fontSize: 13, fontWeight: 600, marginBottom: 8, height: 20 }}>추가 경험치 (%)</label>
                            <div style={{ position: "relative" }}>
                                <input
                                    type="number"
                                    min={0}
                                    max={500}
                                    step={1}
                                    value={bonusExp}
                                    onChange={(e) => { setBonusExp(e.target.value); setHasSearched(false); }}
                                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                    placeholder="0"
                                    style={{ width: "100%", background: "rgba(15,20,50,0.8)", border: "1.5px solid rgba(99,102,241,0.4)", borderRadius: 12, padding: "14px 44px 14px 16px", color: "#e8eaf6", fontSize: 18, fontWeight: 700, outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
                                    onFocus={(e) => (e.target.style.borderColor = "#818cf8")}
                                    onBlur={(e) => (e.target.style.borderColor = "rgba(99,102,241,0.4)")}
                                />
                                <span style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", color: "#818cf8", fontWeight: 700, fontSize: 16 }}>%</span>
                            </div>
                        </div>
                    </div>

                    {/* 안내 + 버튼 한 행 */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
                        <p style={{ color: "#64748b", fontSize: 12, margin: 0 }}>💡 버닝, 파티 보너스, 이벤트 등 합산된 추가 경험치 %를 입력하세요</p>
                        <button
                            onClick={handleSearch}
                            disabled={levelNum < 200 || levelNum >= 300}
                            className="w-full sm:w-auto shrink-0 transition-all duration-200"
                            style={{ 
                                background: levelNum >= 200 && levelNum < 300 ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "rgba(99,102,241,0.2)", 
                                border: "none", 
                                borderRadius: 12, 
                                padding: "12px 28px", 
                                color: levelNum >= 200 && levelNum < 300 ? "#fff" : "#64748b", 
                                fontSize: 15, 
                                fontWeight: 700, 
                                cursor: levelNum >= 200 && levelNum < 300 ? "pointer" : "not-allowed", 
                                whiteSpace: "nowrap", 
                                boxShadow: levelNum >= 200 && levelNum < 300 ? "0 4px 20px rgba(99,102,241,0.4)" : "none" 
                            }}
                        >
                            🔍 추천 받기
                        </button>
                    </div>

                    {/* 레벨업 필요 경험치 표시 */}
                    {levelExpData && (
                        <div style={{ marginTop: 20, padding: "12px 16px", background: "rgba(99,102,241,0.08)", borderRadius: 10, border: "1px solid rgba(99,102,241,0.2)", display: "flex", gap: 24, flexWrap: "wrap" }}>
                            <span style={{ color: "#94a3b8", fontSize: 13 }}>
                                <span style={{ color: "#818cf8", fontWeight: 700 }}>{levelNum}레벨</span> 레벨업 필요 경험치:{" "}
                                <span style={{ color: "#c4b5fd", fontWeight: 700 }}>{formatExp(levelExpData.requiredExp)}</span>
                            </span>
                            {bonusNum > 0 && (
                                <span style={{ color: "#94a3b8", fontSize: 13 }}>
                                    추가 경험치 <span style={{ color: "#34d399", fontWeight: 700 }}>+{bonusNum}%</span> 적용 중
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* TOP 20 결과 */}
                {hasSearched && (
                    <div>
                        {/* 결과 상단 중간 광고 */}
                        <div style={{ marginBottom: 32 }}>
                            <InArticleAd dataAdSlot="8162808816" />
                        </div>

                        <h2 className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-4">
                            <span className="text-xl sm:text-2xl font-black">🏆</span>
                            <span className="text-lg sm:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                                추천 사냥터 TOP 20
                            </span>
                            <span className="text-[11px] sm:text-sm text-[#64748b] font-normal sm:ml-1">— 30분 기준 경험치 효율 순</span>
                        </h2>

                        {top20.length === 0 ? (
                            <div style={{ textAlign: "center", padding: 60, color: "#64748b" }}>
                                <div style={{ fontSize: 48, marginBottom: 12 }}>🤔</div>
                                <p>해당 레벨의 사냥터 데이터가 없습니다</p>
                            </div>
                        ) : (
                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                {top20.map((field) => {
                                    const key = fieldKey(field);
                                    const burning = burningFields[key] ?? 0;
                                    return (
                                    <div
                                        key={key}
                                        className="p-4 sm:px-[22px] sm:py-[18px] w-full box-border rounded-2xl transition-all duration-200"
                                        style={{ background: field.rank <= 3 ? `linear-gradient(135deg, ${getTypeBg(field.type)}, rgba(20,25,55,0.95))` : "rgba(20,25,55,0.85)", border: `1.5px solid ${field.rank === 1 ? "rgba(251,191,36,0.5)" : field.rank === 2 ? "rgba(148,163,184,0.4)" : field.rank === 3 ? "rgba(180,120,60,0.4)" : "rgba(99,102,241,0.2)"}` }}
                                    >
                                        {/* 메인 행 */}
                                        <div
                                            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-14 cursor-pointer"
                                            onClick={() => setSelected(field)}
                                        >
                                            <div className="flex items-center gap-4 flex-1 w-full">
                                                {/* 순위 */}
                                                <div style={{ minWidth: 36, textAlign: "center", fontSize: field.rank <= 3 ? 24 : 15, fontWeight: 800, color: field.rank <= 3 ? undefined : "#818cf8" }}>
                                                    {getRankIcon(field.rank)}
                                                </div>

                                                {/* 이름 & 지역 */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5">
                                                        <span className="text-base sm:text-lg font-bold text-[#e8eaf6] truncate max-w-[180px] sm:max-w-none">{field.map}</span>
                                                        <span className="text-[10px] sm:text-xs font-semibold py-0.5 px-1.5 rounded-md" style={{ color: getTypeColor(field.type), background: getTypeBg(field.type), border: `1px solid ${getTypeColor(field.type)}40` }}>
                                                            📍 {getRegionLabel(field.region)}
                                                        </span>
                                                        {burning > 0 && (
                                                            <span className="text-[10px] sm:text-xs font-bold py-0.5 px-1.5 rounded-md text-[#fb923c] bg-[#fb923c1f] border border-[#fb923c4d]">
                                                                🔥 버닝 {burning}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                                                        <span className="text-xs text-[#94a3b8]">몬스터 Lv.{field.level}</span>
                                                        <span className="text-xs text-[#94a3b8]">🐾 {field.count}마리 / 최대 {(field.count * 240).toLocaleString()}</span>
                                                        <span className="text-xs" style={{ color: getTypeColor(field.type) }}>⚡ {getForceLabel(field.type)} {field.force}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* 경험치 정보 */}
                                            <div className="w-full sm:w-auto flex sm:flex-col justify-between items-end sm:text-right sm:min-w-[130px] border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0 mt-1 sm:mt-0">
                                                <div className="text-left sm:text-right block sm:hidden">
                                                    <div className="text-[11px] text-[#64748b]">{levelNum}레벨 기준</div>
                                                    <div className="text-xs text-[#94a3b8]">30분 경험치</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-lg sm:text-xl font-extrabold tabular-nums" style={{ color: burning > 0 ? "#fb923c" : "#34d399" }}>
                                                        {formatExp(Math.round(field.exp30min))}
                                                    </div>
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        <span className="text-[13px] sm:text-sm font-bold text-[#fbbf24]">{field.pct30min.toFixed(2)}%</span>
                                                        <span className="hidden sm:inline text-[11px] text-[#64748b]">{levelNum}L</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 버닝필드 입력 바 */}
                                        <div
                                            className="mt-3 pt-3 flex flex-wrap items-center gap-2 sm:gap-3"
                                            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <span style={{ fontSize: 12, color: "#94a3b8", whiteSpace: "nowrap" }}>🔥 버닝필드</span>
                                            <div style={{ display: "flex", alignItems: "center", gap: 0, background: "rgba(15,20,50,0.6)", borderRadius: 8, border: "1px solid rgba(251,146,60,0.3)", overflow: "hidden" }}>
                                                <button
                                                    onClick={() => handleBurning(key, -1)}
                                                    disabled={burning <= 0}
                                                    style={{ width: 28, height: 28, background: "transparent", border: "none", color: burning <= 0 ? "#475569" : "#fb923c", fontSize: 16, fontWeight: 700, cursor: burning <= 0 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "color 0.15s" }}
                                                >−</button>
                                                <span style={{ minWidth: 22, textAlign: "center", fontSize: 13, fontWeight: 700, color: burning > 0 ? "#fb923c" : "#64748b", padding: "0 2px" }}>{burning}</span>
                                                <button
                                                    onClick={() => handleBurning(key, 1)}
                                                    disabled={burning >= 10}
                                                    style={{ width: 28, height: 28, background: "transparent", border: "none", color: burning >= 10 ? "#475569" : "#fb923c", fontSize: 16, fontWeight: 700, cursor: burning >= 10 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "color 0.15s" }}
                                                >+</button>
                                            </div>
                                            <span className="text-[10px] sm:text-xs text-[#64748b]">(1단계=+10%, 10단계=+100%, 추가에 합산)</span>
                                        </div>
                                    </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* 클릭 안내 */}
                        {top20.length > 0 && (
                            <p style={{ textAlign: "center", color: "#475569", fontSize: 13, marginTop: 16 }}>
                                💡 사냥터를 클릭하면 상세 정보를 볼 수 있어요
                            </p>
                        )}
                    </div>
                )}
                {/* 계산기 측정 방식 설명 */}
                <div className="mt-10 p-5 sm:p-6 bg-[#0f143299] rounded-2xl border border-white/5 shadow-inner">
                    <h3 className="text-base font-bold text-white mb-3">ℹ️ 이 메이플스토리 사냥터 계산기는 이렇게 측정됩니다.</h3>
                    <ul className="m-0 pl-5 text-[13px] sm:text-sm text-[#f1f5f9] leading-relaxed list-disc">
                        <li className="mb-1.5"><strong className="text-white">기본 젠 기준:</strong> 일반적인 몬스터 리젠 시간은 7.5초이므로, <strong className="text-white">1분당 8젠(리젠)</strong>을 기준으로 계산합니다.</li>
                        <li className="mb-1.5"><strong className="text-white">최대 마릿수 가정:</strong> 맵에 스폰되는 최대 수치를 남김없이 사냥한다는 <strong className="text-white">&quot;풀젠 컷&quot;</strong>을 전제로 계산합니다.</li>
                        <li className="mb-1.5"><strong className="text-white">버닝필드 합산:</strong> 직업별/이벤트별 추가 경험치에 사냥터별 버닝 경험치를 <strong className="text-white">합적용</strong>하여 최종 30분 기대 경험치를 보여줍니다.</li>
                        <li><strong className="text-white">주의 안내:</strong> 본인의 직업, 빌드 숙련도에 따라 편차가 생길 수 있으므로 객관적 최대치 기준의 <strong className="text-white">참고용 지표</strong>로 활용해 주세요.</li>
                    </ul>
                </div>

                {/* 계산기 이용 방법 설명 (추가 경험치 확인 방법) */}
                <div className="mt-5 p-5 sm:p-6 bg-[#0f143299] rounded-2xl border border-white/5">
                    <h3 className="text-base font-bold text-white mb-3">📖 추가 경험치(%) 확인 및 제대로 이용하는 방법</h3>
                    <ol className="m-0 pl-5 text-[13px] sm:text-sm text-[#f1f5f9] leading-relaxed list-decimal">
                        <li style={{ marginBottom: 6 }}>
                            <strong style={{ color: "#ffffff" }}>사냥 세팅 착용:</strong> 평소 사냥 시 착용하는 <strong style={{ color: "#ffffff" }}>정령의 펜던트, 혈맹의 반지, 쑥쑥 새싹(칭호)</strong> 등 경험치 장비를 모두 착용합니다.
                        </li>
                        <li style={{ marginBottom: 6 }}>
                            <strong style={{ color: "#ffffff" }}>사냥 버프 가동:</strong> <strong style={{ color: "#ffffff" }}>경험치 3배 쿠폰, VIP 경험치 쿠폰, 쓸만한 홀리 심볼, 익스트림 골드</strong> 등 사냥할 때 쓰는 온갖 버프를 전부 켭니다.
                        </li>
                        <li style={{ marginBottom: 6 }}>
                            <strong style={{ color: "#ffffff" }}>추가 경험치량 확인:</strong> 그 상태에서 <span style={{ color: "#818cf8", fontWeight: 700 }}>전체 메뉴 → 캐릭터 정보 → 상세 스탯 탭</span>에서 <strong style={{ color: "#fbbf24", background: "rgba(251,191,36,0.15)", padding: "2px 6px", borderRadius: 6 }}>&quot;추가 경험치 획득&quot;</strong> 수치를 확인하고 그 수치 그대로 검색창에 입력합니다.
                            <div style={{ marginTop: 12, marginBottom: 16 }}>
                                <img 
                                    src="/images/tools/exp-check.png" 
                                    alt="메이플스토리 상세 스탯 창에서 추가 경험치 획득 수치 확인하는 방법" 
                                    style={{ maxWidth: 500, width: "100%", borderRadius: 10, border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }} 
                                />
                            </div>
                        </li>
                        <li>
                            <strong style={{ color: "#ffffff" }}>버닝필드 개별 조절:</strong> 동일한 서버라도 맵마다 남은 <strong style={{ color: "#ffffff" }}>버닝필드(1~10단계)</strong>가 다르므로, 리스트에 나온 추천 사냥터 카드에서 직접 단계를 올리거나 내리며 본인 서버 사정에 맞는 최고 효율 사냥터를 비교해 보세요.
                            <div style={{ marginTop: 12, marginBottom: 8 }}>
                                <img 
                                    src="/images/tools/burning-check.png" 
                                    alt="메이플스토리 사냥터 버닝필드 조절 가이드" 
                                    style={{ maxWidth: 400, width: "100%", borderRadius: 10, border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }} 
                                />
                            </div>
                        </li>
                    </ol>
                </div>

                {/* 구글 애드센스 광고 영역 */}
                <div style={{ marginTop: 40 }}>
                    <InArticleAd dataAdSlot="8162808816" />
                </div>
            </div>

            {/* 상세 모달 */}
            {selected && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-end sm:items-center justify-center p-0 sm:p-5"
                    onClick={() => setSelected(null)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-gradient-to-br from-[#1a1f3a] to-[#0f1629] w-full max-w-[540px] rounded-t-[32px] sm:rounded-[32px] p-8 sm:p-10 shadow-2xl relative overflow-y-auto max-h-[95vh]"
                        style={{ 
                            border: `2px solid ${getTypeColor(selected.type)}40`, 
                            boxShadow: `0 20px 80px rgba(0,0,0,0.6), 0 0 60px ${getTypeColor(selected.type)}15` 
                        }}
                    >
                        {/* 닫기 버튼 (모바일용 가이드바) */}
                        <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-6 block sm:hidden" />
                        {/* 모달 헤더 */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                            <div>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                                    <span style={{ fontSize: 11, fontWeight: 600, color: getTypeColor(selected.type), background: getTypeBg(selected.type), border: `1px solid ${getTypeColor(selected.type)}40`, borderRadius: 6, padding: "2px 8px" }}>
                                        {getTypeLabel(selected.type)}
                                    </span>
                                    <span style={{ fontSize: 11, color: "#64748b" }}>#{selected.rank}위</span>
                                </div>
                                <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#e8eaf6" }}>{selected.map}</h3>
                                <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 13 }}>📍 {getRegionLabel(selected.region)}</p>
                            </div>
                            <button
                                onClick={() => setSelected(null)}
                                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, width: 36, height: 36, color: "#94a3b8", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                            >
                                ×
                            </button>
                        </div>

                        {/* 상세 정보 그리드 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 mb-5">
                            {[
                                { label: "몬스터 레벨", value: `Lv. ${selected.level}`, icon: "⚔️" },
                                { label: "몬스터 수 (30분당 최대)", value: `${(selected.count * 240).toLocaleString()}마리`, icon: "🐾" },
                                { label: getForceLabel(selected.type), value: `${selected.force}`, icon: "⚡" },
                                { label: "레벨 경험치 보정", value: `×${(selected.exp_mult / 100 + 1).toFixed(2)} (${selected.exp_mult > 0 ? "+" : ""}${selected.exp_mult}%)`, icon: "📈" },
                                { label: "마리당 기본 경험치", value: formatExp(selected.exp), icon: "💰" },
                                { label: "분당 평균 경험치", value: formatExp(selected.avg_exp * 8), icon: "⏱️" },
                            ].map((item) => (
                                <div key={item.label} className="bg-indigo-500/5 border border-indigo-500/10 rounded-[14px] p-3.5 sm:p-4 transition-colors hover:bg-indigo-500/10">
                                    <div className="text-[10px] sm:text-[11px] text-[#64748b] mb-1 font-semibold uppercase tracking-wider">{item.icon} {item.label}</div>
                                    <div className="text-sm sm:text-base font-bold text-[#e8eaf6]">{item.value}</div>
                                </div>
                            ))}
                        </div>

                        {/* 30분 경험치 하이라이트 */}
                        <div className="bg-gradient-to-br from-[#34d3991a] to-[#10b9810d] border border-[#34d3994d] rounded-2xl p-5 sm:p-6 mb-5">
                            <div className="text-xs sm:text-[13px] text-[#94a3b8] mb-1.5 flex items-center gap-1.5 font-medium">
                                <span className="text-emerald-400">⏰</span> 30분 예상 획득 경험치 <span className="text-[11px] text-[#64748b]">(추가 {bonusNum}% 적용)</span>
                            </div>
                            <div className="text-2xl sm:text-[32px] font-black tracking-tight text-[#34d399] leading-tight mb-2">
                                {formatExp(Math.round(selected.exp30min))}
                            </div>
                            {levelExpData && (
                                <div className="text-sm sm:text-base font-bold text-[#fbbf24] flex items-center gap-2">
                                    <span className="text-[11px] px-1.5 py-0.5 bg-yellow-400/10 border border-yellow-400/20 rounded text-yellow-400 uppercase">Current</span>
                                    {levelNum}레벨 기준 {selected.pct30min.toFixed(3)}%
                                </div>
                            )}
                        </div>

                        {/* 몬스터 목록 */}
                        <div>
                            <div style={{ fontSize: 13, color: "#64748b", marginBottom: 8 }}>🗡️ 출현 몬스터</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                {selected.monster_list.map((m, i) => (
                                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(15,20,50,0.5)", borderRadius: 8, padding: "8px 12px" }}>
                                        <span style={{ color: "#e8eaf6", fontSize: 14 }}>{m.name}</span>
                                        <span style={{ color: "#64748b", fontSize: 12 }}>Lv. {m.level}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
