import { LINK_DB, LINK_SKILL_JOBS } from '../../src/data/diagnosisData';
import { DiagnosisResult } from './types';

// 중첩 가능한 링크 스킬과 최대 레벨 정의
const STACKABLE_LINKS: Record<string, number> = {
    "임피리컬 널리지": 6, // 모험가 법사
    "시프 커닝": 6,      // 모험가 도적
    "파이렛 블레스": 6,   // 모험가 해적
    "인빈서블 빌리프": 6, // 모험가 전사
    "어드벤쳐러 큐리어스": 6, // 모험가 궁수
    "시그너스 블레스": 10, // 시그너스
    "스피릿 오브 프리덤": 8, // 레지스탕스
};

// 직업별 고유 링크 스킬 매핑
const NATIVE_LINK_SKILLS: Record<string, string> = {
    // 모험가 도적
    "나이트로드": "시프 커닝",
    "섀도어": "시프 커닝",
    "듀얼블레이드": "시프 커닝",
    "듀얼블레이더": "시프 커닝",
    // 모험가 마법사
    "아크메이지(불,독)": "임피리컬 널리지",
    "불독": "임피리컬 널리지",
    "아크메이지(썬,콜)": "임피리컬 널리지",
    "썬콜": "임피리컬 널리지",
    "비숍": "임피리컬 널리지",
    // 모험가 해적
    "바이퍼": "파이렛 블레스",
    "캡틴": "파이렛 블레스",
    "캐논슈터": "파이렛 블레스",
    "캐논마스터": "파이렛 블레스",
    // 모험가 전사
    "히어로": "인빈서블 빌리프",
    "팔라딘": "인빈서블 빌리프",
    "다크나이트": "인빈서블 빌리프",
    // 모험가 궁수
    "보우마스터": "어드벤쳐러 큐리어스",
    "신궁": "어드벤쳐러 큐리어스",
    "패스파인더": "어드벤쳐러 큐리어스",
    // 시그너스 (시그너스 블레스)
    "소울마스터": "시그너스 블레스",
    "플레임위자드": "시그너스 블레스",
    "윈드브레이커": "시그너스 블레스",
    "나이트워커": "시그너스 블레스",
    "스트라이커": "시그너스 블레스",
    // 레지스탕스 (스피릿 오브 프리덤)
    "블래스터": "스피릿 오브 프리덤",
    "배틀메이지": "스피릿 오브 프리덤",
    "와일드헌터": "스피릿 오브 프리덤",
    "메카닉": "스피릿 오브 프리덤",
    // 데몬
    "데몬슬레이어": "데몬스 퓨리",
    "데몬어벤져": "와일드 레이지",
    // 영웅
    "메르세데스": "엘프의 축복",
    "아란": "콤보킬 어드밴티지",
    "팬텀": "데들리 인스팅트",
    "루미너스": "퍼미에이트",
    "에반": "룬 퍼시스턴스",
    "은월": "구사일생",
    // 노바
    "카이저": "아이언 윌",
    "카인": "프라이어 프리퍼레이션",
    "카데나": "인텐시브 인썰트",
    "엔젤릭버스터": "소울 컨트랙트",
    // 레프
    "아델": "노블레스",
    "일리움": "전투의 흐름",
    "아크": "무아",
    "칼리": "이네이트 기프트",
    // 아니마
    "호영": "자신감",
    "라라": "자연의 벗",
    // 기타
    "키네시스": "판단",
    "제로": "륀느의 축복",
    "미하일": "빛의 수호",
    "제논": "하이브리드 로직"
};

// === 1. 링크 스킬 진단 ===
export function diagnoseLinkSkill(targetMode: 'HUNTING' | 'BOSS', linkData: any, userJob?: string): DiagnosisResult {
    const result: DiagnosisResult = { bad: [], good: [], scoreDeduction: 0 };

    // 1. 내 링크 스킬 정보 수집 (이름 -> 레벨 합산)
    const myLinkMap = new Map<string, number>();

    const addLink = (name: string, level: number) => {
        if (!name) return;
        // 이름 공백 제거 등 정규화
        let normalizedName = name.trim();

        // 괄호가 있는 경우 (예: "시프 커닝(듀얼블레이드)") 처리
        if (normalizedName.includes('(')) {
            const baseName = normalizedName.split('(')[0].trim();
            // 중첩 가능한 스킬이거나 진단 DB에 있는 스킬이면 베이스 이름 사용
            if (STACKABLE_LINKS[baseName]) {
                normalizedName = baseName;
            }
        }

        const current = myLinkMap.get(normalizedName) || 0;
        myLinkMap.set(normalizedName, current + level);
    };

    // 보유 스킬 (내 직업 링크)
    if (linkData.character_owned_link_skill) {
        addLink(linkData.character_owned_link_skill.skill_name, linkData.character_owned_link_skill.skill_level);
    }

    // 장착 스킬 (다른 직업 링크)
    linkData.character_link_skill?.forEach((s: any) => {
        addLink(s.skill_name, s.skill_level);
    });

    // ★ 본인 직업 고유 링크 스킬 보정
    // API에서 본인 링크 스킬이 누락되거나 레벨이 낮게 나올 경우를 대비해
    // 본인 직업에 해당하는 링크 스킬은 최소 2레벨(120레벨 이상 가정)로 간주
    if (userJob) {
        const nativeLink = NATIVE_LINK_SKILLS[userJob];
        if (nativeLink) {
            const currentLevel = myLinkMap.get(nativeLink) || 0;
            // 본인 링크는 기본적으로 가지고 있으므로, 0레벨이면 2레벨로 추가
            // 이미 있으면(중첩 등으로), 그대로 둠. 단, 본인꺼가 포함 안되어있을 수 있으므로
            // 만약 currentLevel이 0이면 2로 설정.
            // 만약 currentLevel이 있는데, 이게 다른 캐릭꺼만 합친건지 알 수 없지만,
            // 보통 본인꺼는 owned_link_skill에 있어야 함.
            // 안전하게: currentLevel이 0이면 2로 설정.
            if (currentLevel === 0) {
                myLinkMap.set(nativeLink, 2);
            } else {
                // 이미 레벨이 있다면, 본인 것이 포함되어 있는지 확인이 어렵지만
                // 보통 owned가 있으면 포함됨. owned가 없어서 0이었을 테니.
                // 혹시 owned가 누락되었는데 다른 캐릭꺼(예: 도적2)만 있어서 2레벨인 경우,
                // 실제로는 2(본인) + 2(타인) = 4여야 할 수도 있음.
                // 하지만 API 데이터 신뢰성 문제로 복잡하게 계산하기보다,
                // "누락" 판정만 막기 위해 최소 존재 여부만 보장.
            }
        }
    }

    const targetLinks = targetMode === 'HUNTING' ? LINK_DB.HUNTING : LINK_DB.BOSS;

    targetLinks.forEach(requiredLink => {
        const myLevel = myLinkMap.get(requiredLink) || 0;
        const maxLevel = STACKABLE_LINKS[requiredLink] || 2; // 기본 2렙

        if (myLevel === 0) {
            // 아예 없음
            const jobName = LINK_SKILL_JOBS[requiredLink] || '?';
            const label = targetMode === 'HUNTING' ? "사냥용" : "보스용";
            const deduction = targetMode === 'BOSS' ? 5 : 3;

            result.bad.push(`${label} 필수: ${requiredLink} (${jobName}) 누락`);
            result.scoreDeduction += deduction;
        } else if (myLevel < maxLevel) {
            // 있긴 한데 만렙이 아님 (중첩 링크의 경우 중요)
            const jobName = LINK_SKILL_JOBS[requiredLink] || '?';
            // 6렙 만렙인 스킬들은 1렙당 1점 정도 감점? (너무 가혹하지 않게)
            // 일단 경고 메시지만 명확히
            result.bad.push(`${requiredLink} 레벨 부족 (Lv.${myLevel}/${maxLevel}) - ${jobName} 중첩 필요`);

            // 점수 감점은 중첩 스킬인 경우에만 소폭 적용
            if (STACKABLE_LINKS[requiredLink]) {
                result.scoreDeduction += 1;
            }
        }
    });

    if (result.bad.length === 0) {
        result.good.push("필수 링크 스킬을 완벽하게 갖추고 있습니다!");
    }

    return result;
}
