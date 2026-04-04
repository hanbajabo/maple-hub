"use client";
import React, { useState } from 'react';
import './lucid-calc.css';

const BOSSES = [
  { name: '카오스 자쿰', lv: 10, cut: 9000, emoji: '🪦' },
  { name: '카오스 벨룸', lv: 30, cut: 80800, emoji: '🐉' },
  { name: '하드 루시드', lv: 60, cut: 373000, emoji: '👁️' },
];

const COOL_TABLE = [
  { sec: 0, mult: 1.0000 },
  { sec: 1, mult: 1.0194 },
  { sec: 2, mult: 1.0419 },
  { sec: 3, mult: 1.0683 },
  { sec: 4, mult: 1.0994 },
  { sec: 5, mult: 1.1370 },
  { sec: 6, mult: 1.1578 },
  { sec: 7, mult: 1.1811 },
  { sec: 8, mult: 1.2071 },
  { sec: 9, mult: 1.2364 },
];

const CIRC = 2 * Math.PI * 36;

const UPGRADE_OPTIONS = [
  { key: 'cr10',    label: '+10% 크리티컬 확률',  icon: '🎯', color: '#f472b6' },
  { key: 'cd5',     label: '+5% 크리티컬 데미지', icon: '⚡', color: '#fb923c' },
  { key: 'mp100',   label: '+100 마력',           icon: '💜', color: '#a855f7' },
  { key: 'mp1pct',  label: '+1% 마력',            icon: '✨', color: '#c084fc' },
  { key: 'cool1',   label: '+1초 쿨타임 감소',    icon: '⏱️', color: '#60a5fa' },
  { key: 'ma5',     label: '+5% 숙련도',          icon: '📖', color: '#34d399' },
];

function levelPenalty(bossLv: number, playerLv: number) {
  const diff = bossLv - playerLv;
  if (diff <= 0) return 1.0;
  if (diff === 1) return 0.98;
  if (diff === 2) return 0.95;
  if (diff === 3) return 0.93;
  return Math.max(0, 0.90 - 0.10 * Math.floor((diff - 4) / 4));
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
  const [effGains, setEffGains] = useState<Record<string, number>>({});
  const [effWarnings, setEffWarnings] = useState<Record<string, string>>({});
  const [calculated, setCalculated] = useState(false);

  const calculate = () => {
    const pLv = parseFloat(lv);
    const pM = parseFloat(mp);
    const pMa = parseFloat(ma);
    const pCr = parseFloat(cr);
    const pCd = parseFloat(cd);

    if ([pLv, pM, pMa, pCr, pCd].some((v) => isNaN(v))) {
      alert('모든 스탯을 입력해 주세요!');
      return;
    }

    const baseCP = pM * (45 + (pMa / 100) * 7.5) * (1 + (pCr / 100) * (pCd / 100 - 1));
    const coolSec = isNaN(parseInt(cool)) || parseInt(cool) < 0 ? 0 : Math.min(parseInt(cool), 9);
    const coolMult = COOL_TABLE[coolSec].mult;

    // 보스 결과
    const newResults = BOSSES.map((boss) => {
      const p = levelPenalty(boss.lv, pLv);
      const diff = boss.lv - pLv;
      const convCP = baseCP * p * coolMult;
      const pct = (convCP / boss.cut) * 100;
      const pass = pct >= 100;
      const pctStr = Math.round(pct) + '%';
      const reduction = Math.round((1 - p) * 100);
      const penaltyText = diff <= 0 ? '레벨 페널티 없음' : `${diff}레벨 미달 → 최종 데미지 ${reduction}% 감소`;
      const filled = (Math.min(pct, 100) / 100) * CIRC;
      return { ...boss, pct, pass, pctStr, penaltyText, diff, filled };
    });

    // 효율 계산
    const A = 45 + (pMa / 100) * 7.5;
    const crRatio = pCr / 100;
    const cdRatio = pCd / 100;
    const B = 1 + crRatio * (cdRatio - 1);
    const gains: Record<string, number> = {};
    const warnings: Record<string, string> = {};

    // +10% 크리티컬 확률 (100% 초과 불가)
    if (pCr >= 100) {
      gains['cr10'] = 0;
      warnings['cr10'] = '이미 최대 (100%)';
    } else {
      const newCR = Math.min(pCr + 10, 100);
      const newB_cr = 1 + (newCR / 100) * (cdRatio - 1);
      gains['cr10'] = B > 0 ? ((newB_cr / B) - 1) * 100 : 0;
      if (pCr + 10 > 100) warnings['cr10'] = `실제 +${100 - pCr}% 적용`;
    }

    // +5% 크리티컬 데미지
    const newB_cd = 1 + crRatio * ((pCd + 5) / 100 - 1);
    gains['cd5'] = B > 0 ? ((newB_cd / B) - 1) * 100 : 0;
    if (pCr === 0) warnings['cd5'] = '크확 0% → 효과 없음';

    // +100 마력
    gains['mp100'] = (100 / pM) * 100;

    // +1% 마력
    gains['mp1pct'] = 1.0;

    // +5% 숙련도 (100% 초과 불가)
    if (pMa >= 100) {
      gains['ma5'] = 0;
      warnings['ma5'] = '이미 최대 (100%)';
    } else {
      const newMA = Math.min(pMa + 5, 100);
      const newA = 45 + (newMA / 100) * 7.5;
      gains['ma5'] = ((newA / A) - 1) * 100;
      if (pMa + 5 > 100) warnings['ma5'] = `실제 +${100 - pMa}% 적용`;
    }

    // +1초 쿨타임 감소
    if (coolSec >= 9) {
      gains['cool1'] = 0;
      warnings['cool1'] = '이미 최대 (9초)';
    } else {
      gains['cool1'] = ((COOL_TABLE[coolSec + 1].mult / coolMult) - 1) * 100;
    }

    setResults(newResults);
    setEffGains(gains);
    setEffWarnings(warnings);
    setCalculated(true);

    setTimeout(() => {
      document.getElementById('lc-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') calculate();
  };

  // 효율 순위 정렬
  const sortedOptions = calculated
    ? [...UPGRADE_OPTIONS].sort((a, b) => (effGains[b.key] ?? 0) - (effGains[a.key] ?? 0))
    : UPGRADE_OPTIONS;
  const maxGain = calculated ? Math.max(...UPGRADE_OPTIONS.map(o => effGains[o.key] ?? 0), 0.001) : 1;

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
            <div className="lc-boss-grid">
              {results.map((res, i) => (
                <div key={i} className={`lc-boss-card ${res.pass ? 'pass' : 'fail'}`}>
                  <div className="lc-boss-header">
                    <div className="lc-boss-name-wrap">
                      <span className="lc-boss-emoji">{res.emoji}</span>
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
                      <div className="lc-eff-name-row">
                        <span className="lc-eff-icon">{opt.icon}</span>
                        <span className="lc-eff-name">{opt.label}</span>
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

        {/* Footer */}
        <div className="lc-footer-note">
          출처 및 참고자료 : <a href="https://www.inven.co.kr/board/maple/2304/47201?my=chu" target="_blank" rel="noreferrer">메이플 인벤 '나린사람'님의 작성글</a>
        </div>

      </div>
    </div>
  );
}
