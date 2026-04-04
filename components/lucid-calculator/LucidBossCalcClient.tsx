"use client";
import React, { useState, useEffect } from 'react';
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

function levelPenalty(bossLv: number, playerLv: number) {
  const diff = bossLv - playerLv;
  if (diff <= 0) return 1.0;
  if (diff === 1) return 0.98;
  if (diff === 2) return 0.95;
  if (diff === 3) return 0.93;
  return Math.max(0, 0.90 - 0.10 * Math.floor((diff - 4) / 4));
}

function pctFontSize(str: string) {
  if (str.length <= 4) return '26px';
  if (str.length <= 5) return '21px';
  return '17px';
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

    const newResults = BOSSES.map((boss) => {
      const p = levelPenalty(boss.lv, pLv);
      const diff = boss.lv - pLv;
      const convCP = baseCP * p * coolMult;
      const pct = (convCP / boss.cut) * 100;
      const pass = pct >= 100;
      const pctStr = Math.round(pct) + '%';
      const reduction = Math.round((1 - p) * 100);

      const penaltyText = diff <= 0 ? '레벨 페널티 없음' : `${diff}레벨 미달 → 최종 데미지 ${reduction}% 감소`;
      const verdictText = pass ? `✅ 격파 가능 · ${pctStr} 달성` : `❌ 격파 불가 · ${pctStr} 달성`;

      const filled = (Math.min(pct, 100) / 100) * CIRC;

      return {
        ...boss,
        pct,
        pass,
        pctStr,
        penaltyText,
        verdictText,
        diff,
        filled
      };
    });

    setResults(newResults);
    setCalculated(true);

    setTimeout(() => {
      document.getElementById('lc-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') calculate();
  };

  return (
    <div className="lucid-calc-wrapper">
      <div className="lc-container">
        {/* SVG gradient defs (invisible) */}
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
                  <div className={`lc-verdict-badge ${res.pass ? 'pass' : 'fail'}`}>{res.verdictText}</div>
                  <div className={`lc-penalty-info ${res.diff <= 0 ? 'no-penalty' : ''}`}>{res.penaltyText}</div>
                </div>
              ))}
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
