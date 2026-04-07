"use client";
import React, { useState } from 'react';
import AdBanner from '../AdSense/AdBanner';
import './lucid-calc.css';

const BOSSES = [
  { name: '카오스 자쿰', lv: 10, cut: 9000,   emoji: '🪦', useCoolMult: true  },
  { name: '카오스 벨룸', lv: 30, cut: 80800,  emoji: '🐉', useCoolMult: true  },
  { name: '하드 루시드', lv: 60, cut: 355000, emoji: '👁️', useCoolMult: false },
];

// 나린사람님 제공 DPM 표 (허수아비 딜사이클 기준)
// 열 순서: Lv.1+, Lv.10+, Lv.20+, Lv.45+
const DPM_TABLE = [
  [49397696,  79807910,  94230322, 106206323],  // 쿨감 0초
  [51494891,  81884468,  96294268, 108270269],  // 쿨감 1초
  [53922452,  84288218,  98683466, 110659467],  // 쿨감 2초
  [56762972,  87100957, 101479229, 113455230],  // 쿨감 3초
  [60129076,  90434230, 104792437, 116768439],  // 쿨감 4초
  [64178439,  94444195, 108778326, 120754328],  // 쿨감 5초
  [66431276,  96674222, 110994414, 122970416],  // 쿨감 6초
  [68940004,  99157607, 113462311, 125438312],  // 쿨감 7초
  [71749781, 101939059, 116226453, 128202455],  // 쿨감 8초
  [74917055, 105074466, 119342387, 131318389],  // 쿨감 9초
];

function getDpmCol(playerLv: number): number {
  if (playerLv >= 45) return 3;
  if (playerLv >= 20) return 2;
  if (playerLv >= 10) return 1;
  return 0;
}

function calcCoolMult(playerLv: number, coolSec: number): number {
  const col = getDpmCol(playerLv);
  return DPM_TABLE[coolSec][col] / DPM_TABLE[0][col];
}

const CIRC = 2 * Math.PI * 36;



function levelPenalty(bossLv: number, playerLv: number) {
  const diff = bossLv - playerLv;
  if (diff <= 0) return 1.0;
  if (diff === 1) return 0.98;
  if (diff === 2) return 0.95;
  if (diff === 3) return 0.93;
  // 4레벨마다 3레벨 기준(7%) 대비 10%p씩 추가 감소
  return Math.max(0, 0.93 - 0.10 * Math.ceil((diff - 3) / 4));
}

function pctFontSize(str: string) {
  if (str.length <= 3) return '24px';  // "99%"  → 3자리
  if (str.length <= 4) return '19px';  // "999%" → 4자리
  if (str.length <= 5) return '14px';  // "9999%" → 5자리
  return '11px';                        // "99999%" → 6자리 이상
}

export default function LucidBossCalcClient() {
  const [lv, setLv] = useState('');
  const [ma, setMa] = useState('');
  const [cd, setCd] = useState('');
  const [mp, setMp] = useState('');
  const [cr, setCr] = useState('');
  const [cool, setCool] = useState('');

  const [results, setResults] = useState<any[]>([]);
  const [calculated, setCalculated] = useState(false);
  const [parsedStats, setParsedStats] = useState<any>(null);

  const [optVals, setOptVals] = useState<Record<string, string>>({
    cr: '10',
    cd: '5',
    mpAbs: '100',
    mpPct: '1',
    cool: '1',
    ma: '5',
  });

  const calculate = () => {
    const pLv = parseFloat(lv);
    const pMp = parseFloat(mp);
    const pMa = parseFloat(ma);
    const pCr = parseFloat(cr);
    const pCd = parseFloat(cd);

    if ([pLv, pMp, pMa, pCr, pCd].some((v) => isNaN(v))) {
      alert('모든 스탯을 입력해 주세요!');
      return;
    }

    const baseCP = pMp * (45 + (pMa / 100) * 7.5) * (1 + (pCr / 100) * (pCd / 100 - 1));
    const coolSec = isNaN(parseInt(cool)) || parseInt(cool) < 0 ? 0 : Math.min(parseInt(cool), 9);
    const coolMult = calcCoolMult(pLv, coolSec);

    // 보스 결과
    const newResults = BOSSES.map((boss) => {
      const p = levelPenalty(boss.lv, pLv);
      const diff = boss.lv - pLv;
      // 하드 루시드는 순수 전투력 기준 (쿨감 배율 미적용)
      const convCP = baseCP * p * (boss.useCoolMult ? coolMult : 1);
      const pct = (convCP / boss.cut) * 100;
      const pass = pct >= 100;
      const pctStr = Math.round(pct) + '%';
      const reduction = Math.round((1 - p) * 100);
      const penaltyText = diff <= 0 ? '레벨 페널티 없음' : `${diff}레벨 미달 → 최종 데미지 ${reduction}% 감소`;
      const filled = (Math.min(pct, 100) / 100) * CIRC;
      return { ...boss, pct, pass, pctStr, penaltyText, diff, filled };
    });

    setResults(newResults);
    setParsedStats({ pLv, pMa, pCd, pMp, pCr, coolSec, coolMult });
    setCalculated(true);

    setTimeout(() => {
      document.getElementById('lc-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') calculate();
  };

  // 파생 상태 계산 (효율 및 순위)
  let effGains: Record<string, number> = {};
  let effWarnings: Record<string, string> = {};

  if (calculated && parsedStats) {
    const { pMa, pCd, pMp, pCr, coolSec, coolMult } = parsedStats;
    const A = 45 + (pMa / 100) * 7.5;
    const crRatio = pCr / 100;
    const cdRatio = pCd / 100;
    const B = 1 + crRatio * (cdRatio - 1);

    // cr
    const valCr = parseFloat(optVals.cr) || 0;
    if (pCr >= 100 || valCr <= 0) {
      effGains.cr = 0;
      effWarnings.cr = pCr >= 100 ? '이미 최대 (100%)' : '';
    } else {
      const newCR = Math.min(pCr + valCr, 100);
      const newB_cr = 1 + (newCR / 100) * (cdRatio - 1);
      effGains.cr = B > 0 ? ((newB_cr / B) - 1) * 100 : 0;
      if (pCr + valCr > 100) effWarnings.cr = `실제 +${100 - pCr}% 적용`;
    }

    // cd
    const valCd = parseFloat(optVals.cd) || 0;
    const newB_cd = 1 + crRatio * ((pCd + valCd) / 100 - 1);
    effGains.cd = B > 0 ? ((newB_cd / B) - 1) * 100 : 0;
    if (pCr === 0 && valCd > 0) effWarnings.cd = '크확 0% → 효과 없음';

    // mpAbs
    const valMpAbs = parseFloat(optVals.mpAbs) || 0;
    effGains.mpAbs = pMp > 0 ? (valMpAbs / pMp) * 100 : 0;

    // mpPct
    const valMpPct = parseFloat(optVals.mpPct) || 0;
    effGains.mpPct = valMpPct;

    // ma
    const valMa = parseFloat(optVals.ma) || 0;
    if (pMa >= 100 || valMa <= 0) {
      effGains.ma = 0;
      effWarnings.ma = pMa >= 100 ? '이미 최대 (100%)' : '';
    } else {
      const newMA = Math.min(pMa + valMa, 100);
      const newA = 45 + (newMA / 100) * 7.5;
      effGains.ma = ((newA / A) - 1) * 100;
      if (pMa + valMa > 100) effWarnings.ma = `실제 +${(100 - pMa).toFixed(1).replace(/\.0$/, '')}% 적용`;
    }

    // cool
    const valCool = parseFloat(optVals.cool) || 0;
    if (coolSec >= 9 || valCool <= 0) {
      effGains.cool = 0;
      effWarnings.cool = coolSec >= 9 ? '이미 최대 (9초)' : '';
    } else {
      const targetSec = Math.min(Math.floor(coolSec + valCool), 9);
      const newCoolMult = calcCoolMult(parsedStats.pLv, targetSec);
      effGains.cool = ((newCoolMult / coolMult) - 1) * 100;
      if (coolSec + valCool > 9) effWarnings.cool = `실제 +${9 - coolSec}초 적용`;
    }
  }

  const BASE_OPTIONS = [
    { key: 'cr',    prefix: '+', suffix: '% 크리티컬 확률',  icon: '🎯', color: '#f472b6' },
    { key: 'cd',    prefix: '+', suffix: '% 크리티컬 데미지', icon: '⚡', color: '#fb923c' },
    { key: 'mpAbs', prefix: '+', suffix: ' 마력',           icon: '💜', color: '#a855f7' },
    { key: 'mpPct', prefix: '+', suffix: '% 마력',          icon: '✨', color: '#c084fc' },
    { key: 'cool',  prefix: '+', suffix: '초 쿨타임 감소',    icon: '⏱️', color: '#60a5fa' },
    { key: 'ma',    prefix: '+', suffix: '% 숙련도',         icon: '📖', color: '#34d399' },
  ];

  // 효율 순위 정렬
  const sortedOptions = calculated && parsedStats
    ? [...BASE_OPTIONS].sort((a, b) => (effGains[b.key] ?? 0) - (effGains[a.key] ?? 0))
    : BASE_OPTIONS;
  const maxGain = calculated ? Math.max(...BASE_OPTIONS.map(o => effGains[o.key] ?? 0), 0.001) : 1;

  return (
    <div className="lucid-calc-wrapper">
      <div className="lc-container">
        {/* SVG gradient defs */}
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <linearGradient id="grad-pass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="grad-fail" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#fb7185" />
            </linearGradient>
          </defs>
        </svg>

        {/* Hero */}
        <div className="lc-hero">
          <div className="lc-hero-badge">⚔️ MapleStory</div>
          <h1>루시드 보스 계산기</h1>
          <p>[체인지 버닝 : 루시드] 보스 최소컷 계산기</p>
        </div>

        {/* 상단 광고 */}
        <div className="my-6 w-full flex justify-center">
          <div className="w-full max-w-[728px]">
            <AdBanner dataAdSlot="4331375010" />
          </div>
        </div>

        {/* Input */}
        <div className="lc-card" onKeyDown={handleKeyDown}>
          <div className="lc-section-label">루시드 스탯 입력</div>
          <div className="lc-stat-grid">
            <div className="lc-stat-cell">
              <div className="lc-stat-label">루시드 레벨</div>
              <div className="lc-stat-input-wrap">
                <input className="lc-stat-input" type="number" value={lv} onChange={(e) => setLv(e.target.value)} min="1" max="100" placeholder="0" />
              </div>
            </div>
            <div className="lc-stat-cell">
              <div className="lc-stat-label">숙련도</div>
              <div className="lc-stat-input-wrap">
                <input className="lc-stat-input" type="number" value={ma} onChange={(e) => setMa(e.target.value)} min="0" max="100" placeholder="0" />
                <span className="lc-stat-unit">%</span>
              </div>
            </div>
            <div className="lc-stat-cell">
              <div className="lc-stat-label">크리티컬 데미지</div>
              <div className="lc-stat-input-wrap">
                <input className="lc-stat-input" type="number" value={cd} onChange={(e) => setCd(e.target.value)} min="0" placeholder="0" />
                <span className="lc-stat-unit">%</span>
              </div>
            </div>
            <div className="lc-stat-cell">
              <div className="lc-stat-label">마력</div>
              <div className="lc-stat-input-wrap">
                <input className="lc-stat-input" type="number" value={mp} onChange={(e) => setMp(e.target.value)} min="0" placeholder="0" />
              </div>
            </div>
            <div className="lc-stat-cell">
              <div className="lc-stat-label">크리티컬 확률</div>
              <div className="lc-stat-input-wrap">
                <input className="lc-stat-input" type="number" value={cr} onChange={(e) => setCr(e.target.value)} min="0" max="100" placeholder="0" />
                <span className="lc-stat-unit">%</span>
              </div>
            </div>
            <div className="lc-stat-cell">
              <div className="lc-stat-label">재사용 대기시간 감소</div>
              <div className="lc-stat-input-wrap">
                <input className="lc-stat-input" type="number" value={cool} onChange={(e) => setCool(e.target.value)} min="0" max="9" placeholder="0" />
                <span className="lc-stat-unit">초</span>
              </div>
            </div>
          </div>
          <div className="lc-note">루시드 능력치는 루시드 전용 컨텐츠에서만 적용됩니다.</div>
          <button className="lc-btn-calc" onClick={calculate}>격파 가능성 계산하기</button>
        </div>

        {/* Results */}
        {calculated && (
          <div className="lc-results" id="lc-results">
            {/* 계산 후 노출되는 중간 광고 */}
            <div className="mb-6 w-full flex justify-center">
              <div className="w-full max-w-[728px]">
                <AdBanner dataAdSlot="8162808816" />
              </div>
            </div>

            <div className="lc-boss-grid">
              {results.map((res, i) => (
                <div key={i} className={`lc-boss-card ${res.pass ? 'pass' : 'fail'}`}>
                  <div className="lc-boss-header">
                    <div className="lc-boss-name-wrap">
                      <span className="lc-boss-name">{res.name}</span>
                    </div>
                    <span className="lc-boss-lv">Lv.{res.lv}</span>
                  </div>
                  <div className="lc-pct-wrap">
                    <svg className="lc-ring-svg" viewBox="0 0 80 80">
                      <circle className="lc-ring-track" cx="40" cy="40" r="36" />
                      <circle className={`lc-ring-fill ${res.pass ? 'pass' : 'fail'}`} cx="40" cy="40" r="36"
                        strokeDasharray={`${res.filled.toFixed(2)} ${CIRC.toFixed(2)}`}
                        strokeDashoffset="0" />
                    </svg>
                    <div className="lc-pct-center">
                      <div className={`lc-pct-num ${res.pass ? 'pass' : 'fail'}`} style={{ fontSize: pctFontSize(res.pctStr) }}>{res.pctStr}</div>
                      <div className="lc-pct-sub">격파 가능성</div>
                    </div>
                  </div>
                  <div className={`lc-verdict-badge ${res.pass ? 'pass' : 'fail'}`}>
                    <span className="lc-verdict-result">{res.pass ? '✅ 격파 가능' : '❌ 격파 불가'}</span>
                    <span className="lc-verdict-pct">{res.pctStr} 달성</span>
                  </div>
                  <div className={`lc-penalty-info ${res.diff <= 0 ? 'no-penalty' : ''}`}>{res.penaltyText}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 업그레이드 효율 비교 ── */}
        {calculated && (
          <div className="lc-card lc-eff-card">
            <div className="lc-eff-header">
              <div className="lc-section-label" style={{ marginBottom: 0 }}>스탯 업그레이드 효율 비교</div>
              <div className="lc-eff-subtitle">현재 스펙 기준 · CP 증가율 순위</div>
            </div>

            <div className="lc-eff-list">
              {sortedOptions.map((opt, idx) => {
                const gain = effGains[opt.key] ?? 0;
                const warn = effWarnings[opt.key];
                const isMaxed = gain === 0 && !!warn;
                const barWidth = isMaxed ? 0 : (gain / maxGain) * 100;
                const isBest = idx === 0 && !isMaxed;

                return (
                  <div key={opt.key} className={`lc-eff-item${isBest ? ' best' : ''}${isMaxed ? ' maxed' : ''}`}>
                    {/* 순위 */}
                    <div className="lc-eff-rank">
                      {isBest ? '🏆' : isMaxed ? '—' : `${idx + 1}`}
                    </div>

                    {/* 아이콘 + 라벨 */}
                    <div className="lc-eff-info">
                      <div className="lc-eff-name-row" style={{ display: 'flex', alignItems: 'center' }}>
                        <span className="lc-eff-icon">{opt.icon}</span>
                        <span className="lc-eff-inline-name">
                          <span>{opt.prefix}</span>
                          <input 
                            type="number"
                            className="lc-eff-inline-input"
                            style={{ borderBottom: `2px solid ${opt.color}` }}
                            value={optVals[opt.key]}
                            onChange={(e) => setOptVals({ ...optVals, [opt.key]: e.target.value })}
                          />
                          <span>{opt.suffix}</span>
                        </span>
                      </div>
                      {/* 바 */}
                      {!isMaxed && (
                        <div className="lc-eff-bar-wrap">
                          <div
                            className="lc-eff-bar"
                            style={{
                              width: `${barWidth}%`,
                              background: opt.color,
                              boxShadow: isBest ? `0 0 8px ${opt.color}` : 'none',
                            }}
                          />
                        </div>
                      )}
                      {warn && (
                        <div className="lc-eff-warn">{warn}</div>
                      )}
                    </div>

                    {/* 수치 */}
                    <div className="lc-eff-value" style={{ color: isMaxed ? 'var(--text-dim)' : opt.color }}>
                      {isMaxed ? '—' : `+${gain.toFixed(2)}%`}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lc-eff-note">
              ※ CP 증가율 기준 단순 비교입니다. 실제 업그레이드 비용/난이도는 고려되지 않습니다.
            </div>
          </div>
        )}

        {/* 계산 후 노출되는 하단 광고 */}
        {calculated && (
            <div className="mt-8 w-full flex justify-center">
              <div className="w-full max-w-[728px]">
                <AdBanner dataAdSlot="6849727140" />
              </div>
            </div>
        )}

        {/* ── 계산 공식 및 정보 ── */}
        <div className="lc-card lc-info-card" style={{ marginTop: '24px' }}>
          <div className="lc-section-label" style={{ marginBottom: '20px' }}>계산 공식 및 페널티 정보</div>
          
          <div className="lc-info-grid" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* 공식 */}
            <div className="lc-eff-item" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '20px' }}>
              <div className="lc-eff-name-row" style={{ marginBottom: '12px' }}>
                <span className="lc-eff-icon" style={{ fontSize: '20px' }}>🧮</span>
                <span className="lc-eff-name" style={{ fontSize: '16px', fontWeight: 900, color: 'var(--pink)' }}>계산 공식</span>
              </div>
              <div style={{ width: '100%', borderLeft: '3px solid rgba(236, 72, 153, 0.4)', margin: '4px 0 14px', color: 'var(--text)', fontSize: '13.5px', lineHeight: 1.8, background: 'rgba(255,255,255,0.03)', padding: '14px 18px', borderRadius: '0 12px 12px 0', letterSpacing: '-0.02em', wordBreak: 'keep-all' }}>
                <div><strong style={{ color: 'var(--pink-soft)' }}>1. 기본 CP (전투력) :</strong> 마력 × <span style={{ opacity: 0.85 }}>(45 + 숙련도% × 0.075)</span> × <span style={{ opacity: 0.85 }}>{'{ 1 + 크확% × (크뎀% - 1) }'}</span></div>
                <div style={{ marginTop: '8px' }}><strong style={{ color: 'var(--pink-soft)' }}>2. 최종 CP :</strong> 기본 CP × <span style={{ color: 'var(--danger)', fontWeight: 700 }}>레벨 페널티</span> × <span style={{ color: 'var(--success)', fontWeight: 700 }}>쿨타임 감소 배율</span></div>
              </div>
              <div className="lc-eff-note" style={{ borderTop: 'none', margin: '0', padding: '0', fontSize: '12px' }}>
                 ※ 쿨타임 감소는 1초당 약 2%~3%의 최종 데미지 상승으로 차등 환산되어 적용됩니다.
              </div>
            </div>

            {/* 보스 정보 */}
            <div className="lc-eff-item" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '20px' }}>
              <div className="lc-eff-name-row" style={{ marginBottom: '16px' }}>
                <span className="lc-eff-icon" style={{ fontSize: '20px' }}>👑</span>
                <span className="lc-eff-name" style={{ fontSize: '16px', fontWeight: 900, color: '#fcd34d' }}>보스별 권장 정보</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', width: '100%' }}>
                <div style={{ background: 'rgba(0,0,0,0.25)', padding: '16px 18px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ fontSize: '15px', fontWeight: 900, color: 'var(--text)', marginBottom: '8px' }}>카오스 자쿰</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-dim)', marginBottom: '4px', fontWeight: 500 }}>요구 레벨 : Lv. 10</div>
                  <div style={{ fontSize: '13px', color: 'var(--success)', fontWeight: 800 }}>최소 전투력 : 9,000</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.25)', padding: '16px 18px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ fontSize: '15px', fontWeight: 900, color: 'var(--text)', marginBottom: '8px' }}>카오스 벨룸</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-dim)', marginBottom: '4px', fontWeight: 500 }}>요구 레벨 : Lv. 30</div>
                  <div style={{ fontSize: '13px', color: 'var(--success)', fontWeight: 800 }}>최소 전투력 : 80,800</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.25)', padding: '16px 18px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ fontSize: '15px', fontWeight: 900, color: 'var(--text)', marginBottom: '8px' }}>하드 루시드</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-dim)', marginBottom: '4px', fontWeight: 500 }}>요구 레벨 : Lv. 60</div>
                  <div style={{ fontSize: '13px', color: 'var(--success)', fontWeight: 800 }}>최소 전투력 : 355,000</div>
                </div>
              </div>
              {/* 업데이트 내역 */}
              <div style={{ marginTop: '16px', padding: '14px 16px', background: 'rgba(252,211,77,0.06)', border: '1px solid rgba(252,211,77,0.2)', borderRadius: '10px', fontSize: '12px', color: 'var(--text-dim)', lineHeight: 1.8 }}>
                <div style={{ fontWeight: 800, color: '#fcd34d', marginBottom: '6px', fontSize: '12.5px' }}>📋 업데이트 내역 (2026.04.07)</div>
                <div>· 하드 루시드 최소컷 : 373,000 → <strong style={{ color: 'var(--text)' }}>355,000</strong> 으로 재측정 반영</div>
                <div>· 레벨 페널티 기준 정정 : 4레벨 부족부터 3레벨 기준(7%)에 10%p씩 추가 감소 적용</div>
                <div>· 쿨감 배율 : 플레이어 레벨別 개방 스킬 기준 DPM 표로 교체 (Lv.1/10/20/45 구간)</div>
                <div style={{ marginTop: '4px', color: 'rgba(252,211,77,0.6)', fontSize: '11px' }}>※ 원본 데이터 출처 : 메이플 인벤 '나린사람'님</div>
              </div>
            </div>

            {/* 하드 루시드 3페이즈 딜사이클 */}
            <div className="lc-eff-item" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '20px' }}>
              <div className="lc-eff-name-row" style={{ marginBottom: '14px' }}>
                <span className="lc-eff-icon" style={{ fontSize: '20px' }}>⚔️</span>
                <span className="lc-eff-name" style={{ fontSize: '16px', fontWeight: 900, color: '#c084fc' }}>하드 루시드 3페이즈 딜사이클 (40초)</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '16px', lineHeight: 1.6, wordBreak: 'keep-all', width: '100%' }}>
                최소컷 측정의 기준이 된 <strong>40초 딜사이클</strong>입니다. 액션 딜레이 합계 20.85초를 제외한 나머지 시간은 드림 더스트(공격 간격 0.09초)로 채웁니다.
              </p>
              <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '16px' }}>
                {[
                  { skill: '렌드 레버리',          count: '3회',  color: '#c084fc' },
                  { skill: '페어리 더스트',         count: '3회',  color: '#c084fc' },
                  { skill: '엘리멘탈 판타즘',        count: '3회',  color: '#a78bfa' },
                  { skill: '일루전 드래곤',          count: '1회',  color: '#818cf8' },
                  { skill: '가든 오브 이터널 드림',   count: '1회',  color: '#818cf8' },
                  { skill: '피니스 솜니아',          count: '1회',  color: '#818cf8' },
                ].map(({ skill, count, color }) => (
                  <div key={skill} style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '10px', padding: '12px 14px', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: 'var(--text)', fontWeight: 600 }}>{skill}</span>
                    <span style={{ fontSize: '13px', color, fontWeight: 800 }}>{count}</span>
                  </div>
                ))}
              </div>
              <div style={{ width: '100%', background: 'rgba(192,132,252,0.07)', border: '1px solid rgba(192,132,252,0.25)', borderRadius: '10px', padding: '14px 16px', fontSize: '12.5px', lineHeight: 1.9, color: 'var(--text-dim)' }}>
                <div><span style={{ color: '#c084fc', fontWeight: 700 }}>총 액션 딜레이</span> : 20.85초</div>
                <div><span style={{ color: '#c084fc', fontWeight: 700 }}>드림 더스트 채움 시간</span> : 40.00 − 20.85 = <strong style={{ color: 'var(--text)' }}>19.15초</strong></div>
                <div><span style={{ color: '#c084fc', fontWeight: 700 }}>드림 더스트 타격 횟수</span> : 19.15 ÷ 0.09 = <strong style={{ color: 'var(--text)' }}>약 212회</strong></div>
              </div>
            </div>

            {/* 페널티 */}
            <div className="lc-eff-item" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '20px' }}>
              <div className="lc-eff-name-row" style={{ marginBottom: '10px' }}>
                <span className="lc-eff-icon" style={{ fontSize: '20px' }}>📉</span>
                <span className="lc-eff-name" style={{ fontSize: '16px', fontWeight: 900, color: 'var(--danger)' }}>레벨 페널티 (데미지 반감)</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '16px', lineHeight: 1.6, wordBreak: 'keep-all', width: '100%' }}>
                보스 요구 레벨보다 플레이어 레벨이 낮을 경우, 아래 표와 같이 <strong>최종 데미지가 감소</strong>합니다.<br/>
                <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>(4레벨 부족 구간부터는 매 4레벨 부족 시마다 10%씩 추가 감소)</span>
              </p>
              
              <div style={{ width: '100%', background: 'rgba(0,0,0,0.25)', borderRadius: '12px', padding: '6px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', textAlign: 'center', borderCollapse: 'collapse', fontSize: '13px', color: 'var(--text)', minWidth: '400px' }}>
                    <thead>
                      <tr style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', fontSize: '12.5px' }}>
                        <th style={{ padding: '12px 14px', fontWeight: 800, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>레벨 차이</th>
                        <th style={{ padding: '12px 14px', fontWeight: 800, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>최종 배율</th>
                        <th style={{ padding: '12px 14px', fontWeight: 800, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>감소율 (페널티)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <td style={{ padding: '12px 14px', color: 'var(--success)', fontWeight: 800 }}>0 이하 (동레벨 이상)</td>
                        <td style={{ padding: '12px 14px', fontWeight: 800 }}>100%</td>
                        <td style={{ padding: '12px 14px', color: 'var(--text-muted)' }}>0%</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <td style={{ padding: '12px 14px', fontWeight: 600 }}>1 레벨 부족</td>
                        <td style={{ padding: '12px 14px', fontWeight: 600 }}>98%</td>
                        <td style={{ padding: '12px 14px', color: 'var(--danger)', fontWeight: 700 }}>-2%</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <td style={{ padding: '12px 14px', fontWeight: 600 }}>2 레벨 부족</td>
                        <td style={{ padding: '12px 14px', fontWeight: 600 }}>95%</td>
                        <td style={{ padding: '12px 14px', color: 'var(--danger)', fontWeight: 700 }}>-5%</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <td style={{ padding: '12px 14px', fontWeight: 600 }}>3 레벨 부족</td>
                        <td style={{ padding: '12px 14px', fontWeight: 600 }}>93%</td>
                        <td style={{ padding: '12px 14px', color: 'var(--danger)', fontWeight: 700 }}>-7%</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <td style={{ padding: '12px 14px', fontWeight: 600 }}>4~7 레벨 부족</td>
                        <td style={{ padding: '12px 14px', fontWeight: 600 }}>83%</td>
                        <td style={{ padding: '12px 14px', color: 'var(--danger)', fontWeight: 700 }}>-17%</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <td style={{ padding: '12px 14px', fontWeight: 600 }}>8~11 레벨 부족</td>
                        <td style={{ padding: '12px 14px', fontWeight: 600 }}>73%</td>
                        <td style={{ padding: '12px 14px', color: 'var(--danger)', fontWeight: 700 }}>-27%</td>
                      </tr>
                      <tr>
                        <td style={{ padding: '12px 14px', fontWeight: 600 }}>12~15 레벨 부족</td>
                        <td style={{ padding: '12px 14px', fontWeight: 600 }}>63%</td>
                        <td style={{ padding: '12px 14px', color: 'var(--danger)', fontWeight: 700 }}>-37%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="lc-footer-note">
          출처 및 참고자료 : <a href="https://www.inven.co.kr/board/maple/2304/47201?my=chu" target="_blank" rel="noreferrer">메이플 인벤 '나린사람'님의 작성글</a>
        </div>

      </div>
    </div>
  );
}
