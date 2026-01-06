import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Target, Calculator, Flame, Crown } from 'lucide-react';

export const metadata: Metadata = {
    title: '추가옵션(추옵) 완벽 가이드 - 메이플 AI',
    description: '무기 1추/2추/3추 판단법, 방어구 급수 계산기, 데몬어벤져/제논 특수 계산식까지 완벽 정리.',
};

const WEAPON_TIERS = [
    {
        tier: '1추 (Tier 1)',
        description: '추가 공격력이 해당 무기 테이블의 최고 수치',
        grade: '완벽',
        advice: '완벽한 추옵입니다. 절대 버리지 마세요!',
        color: 'gold'
    },
    {
        tier: '2추 (Tier 2)',
        description: '1추 바로 다음 단계',
        grade: '우수',
        advice: '사용하기에 충분히 좋은 추옵입니다.',
        color: 'purple'
    },
    {
        tier: '3추 이하 (Tier 3+)',
        description: '그 이하 수치',
        grade: '아쉬움',
        advice: '무기에는 아쉬운 수치입니다. 영환불/강환불로 2추 이상을 노려보세요.',
        color: 'blue'
    }
];

const ARMOR_GRADES = [
    {
        grade: '160급 이상',
        tier: '초고스펙',
        description: '종결급 추옵',
        color: 'gold'
    },
    {
        grade: '130 ~ 150급',
        tier: '고스펙',
        description: '상위권 추옵',
        color: 'purple'
    },
    {
        grade: '100 ~ 120급',
        tier: '합격',
        description: '앱솔/아케인 고추옵 기준',
        color: 'green'
    },
    {
        grade: '80 ~ 90급',
        tier: '가성비',
        description: '부캐용/임시 사용',
        color: 'blue'
    },
    {
        grade: '80급 미만',
        tier: '미달',
        description: '환생의 불꽃 작업 필요',
        color: 'red'
    }
];

const ARCANE_WEAPON_STATS = [
    { name: '가즈', type: '아대', base: 149, t1: 92, t2: 72, t3: 55, t4: 40, t5: 27 },
    { name: '피스톨', type: '건', base: 216, t1: 133, t2: 104, t3: 79, t4: 58, t5: 39 },
    { name: '에너지체인', type: '에너지소드', base: 221, t1: 136, t2: 106, t3: 81, t4: 59, t5: 40 },
    { name: '클로', type: '너클', base: 221, t1: 136, t2: 106, t3: 81, t4: 59, t5: 40 },
    { name: '엘라하', type: '건틀렛 리볼버', base: 221, t1: 136, t2: 106, t3: 81, t4: 59, t5: 40 },
    { name: '소울슈터', type: '소울슈터', base: 221, t1: 136, t2: 106, t3: 81, t4: 59, t5: 40 },
    { name: '폴암', type: '폴암', base: 264, t1: 163, t2: 127, t3: 96, t4: 70, t5: 48 },
    { name: '에인션트 보우', type: '에인션트 보우', base: 276, t1: 170, t2: 133, t3: 101, t4: 73, t5: 50 },
    { name: '초선', type: '부채', base: 276, t1: 170, t2: 133, t3: 101, t4: 73, t5: 50 },
    { name: '보우', type: '활', base: 276, t1: 170, t2: 133, t3: 101, t4: 73, t5: 50 },
    { name: '브레스 슈터', type: '브레스 슈터', base: 276, t1: 170, t2: 133, t3: 101, t4: 73, t5: 50 },
    { name: '듀얼보우건', type: '듀얼보우건', base: 276, t1: 170, t2: 133, t3: 101, t4: 73, t5: 50 },
    { name: '대거', type: '단검', base: 276, t1: 170, t2: 133, t3: 101, t4: 73, t5: 50 },
    { name: '체인', type: '체인', base: 276, t1: 170, t2: 133, t3: 101, t4: 73, t5: 50 },
    { name: '세이버', type: '한손검', base: 283, t1: 175, t2: 136, t3: 103, t4: 75, t5: 51 },
    { name: '엑스', type: '한손도끼', base: 283, t1: 175, t2: 136, t3: 103, t4: 75, t5: 51 },
    { name: '해머', type: '한손둔기', base: 283, t1: 175, t2: 136, t3: 103, t4: 75, t5: 51 },
    { name: '케인', type: '케인', base: 283, t1: 175, t2: 136, t3: 103, t4: 75, t5: 51 },
    { name: '크로스보우', type: '석궁', base: 283, t1: 175, t2: 136, t3: 103, t4: 75, t5: 51 },
    { name: '라피스 9형', type: '대검 (제로)', base: 297, t1: 131, t2: 95, t3: 65, t4: 40, t5: 18 },
    { name: '라즐리 9형', type: '태도 (제로)', base: 293, t1: 131, t2: 95, t3: 65, t4: 40, t5: 18 },
    { name: '튜너', type: '튜너', base: 295, t1: 182, t2: 142, t3: 108, t4: 78, t5: 54 },
    { name: '스피어', type: '창', base: 295, t1: 182, t2: 142, t3: 108, t4: 78, t5: 54 },
    { name: '투핸드소드', type: '두손검', base: 295, t1: 182, t2: 142, t3: 108, t4: 78, t5: 54 },
    { name: '투핸드액스', type: '두손도끼', base: 295, t1: 182, t2: 142, t3: 108, t4: 78, t5: 54 },
    { name: '투핸드해머', type: '두손둔기', base: 295, t1: 182, t2: 142, t3: 108, t4: 78, t5: 54 },
    { name: '데스페라도', type: '데스페라도', base: 295, t1: 182, t2: 142, t3: 108, t4: 78, t5: 54 },
    { name: '시즈건', type: '핸드캐논', base: 302, t1: 186, t2: 145, t3: 110, t4: 80, t5: 55 },
    { name: '완드', type: '완드', base: 347, t1: 214, t2: 167, t3: 126, t4: 92, t5: 63 },
    { name: '샤이닝로드', type: '샤이닝로드', base: 347, t1: 214, t2: 167, t3: 126, t4: 92, t5: 63 },
    { name: 'ESP리미터', type: 'ESP리미터', base: 347, t1: 214, t2: 167, t3: 126, t4: 92, t5: 63 },
    { name: '매직 건틀렛', type: '매직 건틀렛', base: 347, t1: 214, t2: 167, t3: 126, t4: 92, t5: 63 },
    { name: '스태프', type: '스태프', base: 353, t1: 218, t2: 170, t3: 129, t4: 94, t5: 64 },
];

const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; badge: string }> = {
        gold: { bg: 'bg-yellow-500/20', border: 'border-yellow-500/50', text: 'text-yellow-300', badge: 'bg-yellow-500/30 text-yellow-200' },
        purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', badge: 'bg-purple-500/20 text-purple-300' },
        green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', badge: 'bg-green-500/20 text-green-300' },
        blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', badge: 'bg-blue-500/20 text-blue-300' },
        red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', badge: 'bg-red-500/20 text-red-300' },
    };
    return colors[color] || colors.green;
};

export default function BonusStatGuidePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Link href="/guide" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">가이드 목록으로</span>
                    </Link>
                    <h1 className="text-3xl sm:text-4xl font-black text-white">추가옵션(추옵) 완벽 가이드</h1>
                    <p className="text-slate-400 mt-2">무기 1추/2추, 방어구 급수 계산법 완벽 정리</p>
                </div>
            </div>

            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center gap-4 mb-8 p-4 bg-slate-800/30 rounded-xl border border-slate-700">
                    <img src="/images/maple-ai-logo.jpg" alt="단풍이" className="w-12 h-12 rounded-full object-cover" />
                    <div>
                        <div className="font-bold text-white">메이플 AI 단풍이</div>
                        <div className="text-sm text-slate-400">추가옵션 완벽 분석</div>
                    </div>
                </div>

                <section className="prose prose-invert max-w-none mb-12">
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6 mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <Target className="w-6 h-6 text-orange-400" />
                            추가옵션이란?
                        </h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            추가옵션(추옵)은 <strong className="text-white">환생의 불꽃</strong>으로 장비에 붙는 랜덤 옵션입니다.
                        </p>
                        <p className="text-slate-300 leading-relaxed">
                            무기는 <strong className="text-yellow-400">추가 공격력</strong>, 방어구는 <strong className="text-green-400">주스탯/공격력/올스탯%</strong>이 중요합니다!
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-6 mt-12 flex items-center gap-2">
                        <Crown className="w-6 h-6 text-yellow-400" />
                        무기 추가옵션 (1추/2추/3추)
                    </h2>

                    <div className="space-y-4">
                        {WEAPON_TIERS.map((item, idx) => {
                            const colors = getColorClasses(item.color);
                            return (
                                <div key={idx} className={`${colors.bg} border ${colors.border} rounded-xl p-6`}>
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-bold text-white">{item.tier}</h3>
                                                <span className={`px-3 py-1 rounded-full text-sm font-bold ${colors.badge}`}>
                                                    {item.grade}
                                                </span>
                                            </div>
                                            <p className="text-slate-300 text-sm">{item.description}</p>
                                        </div>
                                    </div>
                                    <div className={`mt-3 pt-3 border-t border-slate-700 ${colors.text} font-medium text-sm`}>
                                        💡 {item.advice}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-6 mt-12 flex items-center gap-2">
                        <Target className="w-6 h-6 text-purple-400" />
                        아케인셰이드 무기 추가옵션 표
                    </h2>

                    <div className="bg-slate-800/40 border border-slate-700 rounded-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-xs sm:text-sm text-left">
                                <thead className="bg-slate-900/50 text-slate-400 font-medium border-b border-slate-700">
                                    <tr>
                                        <th className="px-2 sm:px-4 py-3 whitespace-nowrap">무기 이름</th>
                                        <th className="px-2 sm:px-4 py-3 whitespace-nowrap">분류</th>
                                        <th className="px-2 sm:px-4 py-3 whitespace-nowrap text-center">기본 공/마</th>
                                        <th className="px-2 sm:px-4 py-3 whitespace-nowrap text-center text-yellow-400 bg-yellow-500/10">1추</th>
                                        <th className="px-2 sm:px-4 py-3 whitespace-nowrap text-center text-purple-400 bg-purple-500/10">2추</th>
                                        <th className="px-2 sm:px-4 py-3 whitespace-nowrap text-center text-blue-400">3추</th>
                                        <th className="px-2 sm:px-4 py-3 whitespace-nowrap text-center text-slate-500">4추</th>
                                        <th className="px-2 sm:px-4 py-3 whitespace-nowrap text-center text-slate-600">5추</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700">
                                    {ARCANE_WEAPON_STATS.map((weapon, idx) => (
                                        <tr key={idx} className="hover:bg-slate-700/30 transition-colors">
                                            <td className="px-2 sm:px-4 py-3 font-bold text-white whitespace-nowrap">{weapon.name}</td>
                                            <td className="px-2 sm:px-4 py-3 text-slate-400 whitespace-nowrap">{weapon.type}</td>
                                            <td className="px-2 sm:px-4 py-3 text-center text-slate-300 font-mono">{weapon.base}</td>
                                            <td className="px-2 sm:px-4 py-3 text-center font-bold text-yellow-400 bg-yellow-500/5 font-mono">+{weapon.t1}</td>
                                            <td className="px-2 sm:px-4 py-3 text-center font-bold text-purple-400 bg-purple-500/5 font-mono">+{weapon.t2}</td>
                                            <td className="px-2 sm:px-4 py-3 text-center text-blue-400 font-mono">+{weapon.t3}</td>
                                            <td className="px-2 sm:px-4 py-3 text-center text-slate-500 font-mono">+{weapon.t4}</td>
                                            <td className="px-2 sm:px-4 py-3 text-center text-slate-600 font-mono">+{weapon.t5}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-3 bg-slate-900/30 border-t border-slate-700 text-xs text-slate-500 text-center">
                            * 모바일에서는 좌우로 스크롤하여 확인할 수 있습니다.
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-6 mt-12 flex items-center gap-2">
                        <Calculator className="w-6 h-6 text-blue-400" />
                        방어구 '급(Tier)' 계산기
                    </h2>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-6">
                        <h3 className="text-lg font-bold text-white mb-3">계산 공식</h3>
                        <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-yellow-400">
                            급수 = (추가 주스탯) + (추가 공격력 × 4) + (올스탯% × 10)
                        </div>
                        <p className="text-slate-300 text-sm mt-3">
                            예: STR +30, 공격력 +4, 올스탯 +3% → 30 + (4×4) + (3×10) = <strong className="text-yellow-400">76급</strong>
                        </p>
                    </div>

                    <div className="space-y-4">
                        {ARMOR_GRADES.map((item, idx) => {
                            const colors = getColorClasses(item.color);
                            return (
                                <div key={idx} className={`${colors.bg} border ${colors.border} rounded-xl p-6`}>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-bold text-white">{item.grade}</h3>
                                                <span className={`px-3 py-1 rounded-full text-sm font-bold ${colors.badge}`}>
                                                    {item.tier}
                                                </span>
                                            </div>
                                            <p className="text-slate-300 text-sm">{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-6 mt-12 flex items-center gap-2">
                        <Flame className="w-6 h-6 text-red-400" />
                        직업별 특수 계산식
                    </h2>

                    <div className="space-y-4">
                        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-3">데몬어벤져 (HP 기반)</h3>
                            <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-yellow-400 mb-3">
                                급수 = (추가 HP ÷ 17.5) + (공격력 × 4)
                            </div>
                            <p className="text-slate-300 text-sm">
                                <strong className="text-red-400">깡 HP 수치</strong>가 높게 붙은 아이템이 1티어입니다.
                                올스탯% 효율은 상대적으로 낮습니다.
                            </p>
                        </div>

                        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-white mb-3">제논 (All Stat 기반)</h3>
                            <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-yellow-400 mb-3">
                                급수 = (STR + DEX + LUK) + (공격력 × 4) + (올스탯% × 20)
                            </div>
                            <p className="text-slate-300 text-sm mb-4">
                                제논은 <strong className="text-purple-400">올스탯% 효율이 매우 높습니다</strong> (깡패!).
                                올스탯%가 높게 붙은 아이템이 고추옵입니다.
                            </p>

                            <div className="mt-4 pt-4 border-t border-purple-500/30">
                                <h4 className="text-lg font-bold text-white mb-3">제논 레벨별 급수 기준</h4>

                                <div className="bg-slate-900/50 rounded-lg p-4 mb-3">
                                    <div className="text-sm font-bold text-blue-300 mb-2">💙 뉴비/주보캐/저-중자본용</div>
                                    <div className="grid grid-cols-2 gap-2 text-sm text-slate-300">
                                        <div>• 140제 → <span className="text-yellow-400 font-bold">220급</span></div>
                                        <div>• 150제 → <span className="text-yellow-400 font-bold">230급</span></div>
                                        <div>• 160제 → <span className="text-yellow-400 font-bold">240급</span></div>
                                        <div>• 200제 → <span className="text-yellow-400 font-bold">280급</span></div>
                                        <div className="col-span-2">• 250제 → <span className="text-yellow-400 font-bold">330급</span></div>
                                    </div>
                                    <p className="text-xs text-slate-400 mt-2">💡 10레벨당 10급씩 올라간다고 보면 됩니다.</p>
                                </div>

                                <div className="bg-slate-900/50 rounded-lg p-4">
                                    <div className="text-sm font-bold text-yellow-300 mb-2">💎 고자본용</div>
                                    <p className="text-sm text-slate-300">
                                        140제 <span className="text-yellow-400 font-bold">240급</span>을 시작으로 저자본용에서 <strong className="text-yellow-400">+20~30</strong> 하시면 됩니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-6 mt-12">핵심 팁</h2>

                    <div className="space-y-4">
                        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2">🔥 무기는 무조건 2추 이상!</h4>
                            <p className="text-slate-300 text-sm">
                                무기는 <strong className="text-yellow-400">추가 공격력</strong>이 가장 중요합니다.
                                3추 이하는 영환불/강환불로 다시 작업하세요!
                            </p>
                        </div>

                        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2">✅ 방어구는 100급 이상 목표</h4>
                            <p className="text-slate-300 text-sm">
                                앱솔/아케인 장비는 <strong className="text-green-400">100급 이상</strong>이면 합격점!
                                130급 이상부터 고스펙으로 인정받습니다.
                            </p>
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2">💡 환생의 불꽃 종류</h4>
                            <ul className="text-slate-300 text-sm space-y-1">
                                <li>• <strong className="text-yellow-400">영환불 (영생의 불꽃)</strong>: 최고 옵션 (가장 비쌈)</li>
                                <li>• <strong className="text-blue-400">강환불 (강력한 환생)</strong>: 중간 옵션 (가성비 좋음)</li>
                                <li>• <strong className="text-slate-400">일반 환불</strong>: 낮은 옵션 (비추천)</li>
                            </ul>
                        </div>

                        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
                            <h4 className="font-bold text-white mb-2">🎯 직업별 팁</h4>
                            <ul className="text-slate-300 text-sm space-y-1">
                                <li>• <strong className="text-red-400">데몬어벤져</strong>: HP 옵션 최우선!</li>
                                <li>• <strong className="text-purple-400">제논</strong>: 올스탯% 효율 2배! (일반 직업의 20배)</li>
                                <li>• <strong className="text-green-400">일반 직업</strong>: 주스탯 + 공격력 + 올스탯% 조합</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <div className="mt-16 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-white mb-4">내 장비 추가옵션 확인하기</h3>
                    <p className="text-slate-300 mb-6">
                        메이플 AI로 내 캐릭터를 진단하면 장비별 추가옵션 급수와 개선 방향을 확인할 수 있습니다
                    </p>
                    <Link href="/" className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-colors shadow-lg">
                        지금 진단 받기 →
                    </Link>
                </div>
            </article>
        </div>
    );
}
