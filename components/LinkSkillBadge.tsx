import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { getCharacterLinkSkill } from '../lib/nexon';

interface LinkSkill {
    skill_name: string;
    skill_level: number;
    skill_description?: string;
}

// 링크 스킬별 직업 매핑
const LINK_SKILL_JOBS: Record<string, string> = {
    "임피리컬 널리지": "모험가 마법사",
    "어드벤쳐러 큐리어스": "모험가 궁수",
    "시프 커닝": "모험가 도적",
    "파이렛 블레스": "모험가 해적",
    "시그너스 블레스": "시그너스 기사단",
    "하이브리드 로직": "제논",
    "데몬스 퓨리": "데몬슬레이어",
    "와일드 레이지": "데몬어벤져",
    "퍼미에이트": "루미너스",
    "엘프의 축복": "메르세데스",
    "데들리 인스팅트": "팬텀",
    "구사일생": "은월",
    "룬 퍼시스턴스": "에반",
    "콤보킬 어드밴티지": "아란",
    "아이언 윌": "카이저",
    "소울 컨트랙트": "엔젤릭버스터",
    "판단": "키네시스",
    "전투의 흐름": "일리움",
    "무아": "아크",
    "노블레스": "아델",
    "스피릿 오브 프리덤": "레지스탕스",
    "인텐시브 인썰트": "카데나",
    "자신감": "호영",
    "자연의 벗": "라라",
    "이레이즈": "카인",
    "프라이어 프리퍼레이션": "카인",
    "이네이트 기프트": "칼리",
    "륀느의 축복": "제로",
    "빛의 수호": "미하일",
    "소울 레이지": "소울마스터",
    "스피릿 오브 플레임": "플레임위자드",
    "엘리멘탈 엑스퍼트": "모험가 마법사(전체)",
    "인빈서블 빌리프": "모험가 전사",
};

export default function LinkSkillBadge({ ocid, initialData, refreshKey }: { ocid: string, initialData?: any, refreshKey?: number }) {
    const [skills, setSkills] = useState<LinkSkill[]>([]);
    const [loading, setLoading] = useState(!initialData);
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (initialData) {
            const list: LinkSkill[] = [];
            if (initialData.character_owned_link_skill) {
                list.push(initialData.character_owned_link_skill);
            }
            if (initialData.character_link_skill) {
                list.push(...initialData.character_link_skill);
            }
            const uniqueSkills = Array.from(new Map(list.map(item => [item.skill_name, item])).values());
            setSkills(uniqueSkills);
            setLoading(false);
            return;
        }

        if (!ocid) return;
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await getCharacterLinkSkill(ocid);
                const list: LinkSkill[] = [];
                if (res.character_owned_link_skill) {
                    list.push(res.character_owned_link_skill);
                }
                if (res.character_link_skill) {
                    list.push(...res.character_link_skill);
                }
                const uniqueSkills = Array.from(new Map(list.map(item => [item.skill_name, item])).values());
                setSkills(uniqueSkills);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [ocid, initialData, refreshKey]);

    if (loading) return <div className="w-full h-full flex items-center justify-center bg-slate-800/50 rounded-xl border border-slate-700 animate-pulse"></div>;

    return (
        <>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full h-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-slate-200 font-bold transition-all cursor-pointer shadow-sm hover:shadow-md hover:border-slate-500`}
            >
                <span className="text-lg">🔗</span>
                <span className="text-sm">링크 스킬</span>
                <span className="text-xs bg-slate-950 px-1.5 py-0.5 rounded text-slate-400">{skills.length}</span>
            </div>

            {isOpen && mounted && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4" onClick={() => setIsOpen(false)}>
                    <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-4 w-full max-w-md animate-in fade-in slide-in-from-top-2" onClick={e => e.stopPropagation()}>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-300 mb-2 border-b border-slate-800 pb-2 flex justify-between items-center">
                            <span>장착 중인 링크 스킬</span>
                            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-slate-300">✕</button>
                        </h4>
                        <div className="flex flex-col gap-1 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
                            {skills.length > 0 ? skills.map((skill, idx) => (
                                <div key={idx} className="flex justify-between items-center p-2 rounded bg-slate-950/50 border border-slate-800/50 hover:bg-slate-800 transition-colors">
                                    <div className="flex flex-col">
                                        <span className="text-xs sm:text-sm font-bold text-slate-200">{LINK_SKILL_JOBS[skill.skill_name] || '직업 정보 없음'}</span>
                                        <span className="text-[10px] sm:text-[11px] text-slate-400">{skill.skill_name}</span>
                                    </div>
                                    <span className="text-[10px] font-bold bg-slate-900 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">
                                        Lv.{skill.skill_level}
                                    </span>
                                </div>
                            )) : <span className="text-xs text-slate-500 w-full text-center py-4">장착된 스킬이 없습니다.</span>}
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}