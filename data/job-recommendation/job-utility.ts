/**
 * 직업별 유틸리티 스킬 정보
 * 
 * 구분:
 * - 능력치 감소: 적의 공격력, 방어력, 명중률 등을 감소시키는 디버프
 * - 버프 불능: 적의 버프를 차단
 * - 버프 해제: 적의 버프를 제거
 * - 버프 무시: 적의 특정 버프(공격 반사 등)를 무시
 * - 상태이상 무시: 특정 상태이상을 무시
 * - 행동 불능: 적을 일정 시간 행동 불능 상태로 만듦
 * - 무적: 자신 또는 파티원을 무적 상태로 만듦
 * - 사망 1회 방지: 사망 시 부활 또는 생존
 * - 부활: 파티원 부활
 * - 기타: 기타 유용한 유틸리티
 */

export type UtilityCategory =
    | '능력치 감소'
    | '버프 불능'
    | '버프 해제'
    | '버프 무시'
    | '상태이상 무시'
    | '행동 불능'
    | '무적'
    | '사망 1회 방지'
    | '부활'
    | '기타';

export interface JobUtility {
    job: string;
    category: UtilityCategory;
    skillName: string;
    effect: string;
}

export const JOB_UTILITY_DATA: JobUtility[] = [
    // 히어로
    { job: '히어로', category: '능력치 감소', skillName: '스카링 소드', effect: '자상 디버프 (명중률 -20%, 공격력 -30%)' },
    { job: '히어로', category: '능력치 감소', skillName: '인사이징/인사이징 VI', effect: '크리티컬 데미지 26% 증가 (파티원 11%)' },
    { job: '히어로', category: '버프 불능', skillName: '매직 크래쉬', effect: '22초간 버프 차단' },
    { job: '히어로', category: '버프 해제', skillName: '매직 크래쉬', effect: '공격력/마력 증가, 방어력 증가, 하드 스킨 해제' },
    { job: '히어로', category: '버프 무시', skillName: '스피릿 블레이드', effect: '적의 공격 반사 무시' },
    { job: '히어로', category: '행동 불능', skillName: '스피릿 칼리버', effect: '10초 (절대 행동 불가)' },
    { job: '히어로', category: '무적', skillName: '콤보 데스폴트', effect: '시전 중 약 1.7초 무적' },
    { job: '히어로', category: '무적', skillName: '스피릿 칼리버', effect: '시전 중 절대 무적' },

    // 팔라딘
    { job: '팔라딘', category: '능력치 감소', skillName: '페이지 오더', effect: '6초 동안 이동속도 -20' },
    { job: '팔라딘', category: '능력치 감소', skillName: '노블 디맨드', effect: '80초 동안 공격력&방어력 -50%, 8초 동안 명중률 -50%' },
    { job: '팔라딘', category: '버프 불능', skillName: '매직 크래쉬', effect: '22초 간 버프 효과 제한' },
    { job: '팔라딘', category: '버프 해제', skillName: '매직 크래쉬, 스마이트', effect: '공격력/마력 증가, 방어력 증가, 하드 스킨 해제' },
    { job: '팔라딘', category: '버프 무시', skillName: '디바인 저지먼트-신성 낙인', effect: '폭발 공격 한정 물리 공격 무효화와 공격 반사 무시' },
    { job: '팔라딘', category: '버프 무시', skillName: '블래스드 해머, 마이티 묠니르', effect: '공격 반사로 인한 피해만 무시' },
    { job: '팔라딘', category: '상태이상 무시', skillName: '그랜드 크로스', effect: '기절 상태이상 무시' },
    { job: '팔라딘', category: '행동 불능', skillName: '스마이트', effect: '10초' },
    { job: '팔라딘', category: '무적', skillName: '가디언 스피릿', effect: '가장 가까운 파티원 부활 후 10초' },
    { job: '팔라딘', category: '무적', skillName: '새크로생티티', effect: '30초, 재사용 시 즉시 종료' },
    { job: '팔라딘', category: '기타', skillName: '디바인 차지, 디바인 스티그마', effect: '10초 동안 침묵' },
    { job: '팔라딘', category: '기타', skillName: '파라쇼크 가드', effect: '자신을 제외한 파티원의 피격 데미지 -20% 및 가드 확률 +20%' },
    { job: '팔라딘', category: '기타', skillName: '가디언 스피릿', effect: '가장 가까운 파티원 부활' },

    // 다크나이트
    { job: '다크나이트', category: '버프 불능', skillName: '매직 크래쉬', effect: '22초 간 버프 효과 제한' },
    { job: '다크나이트', category: '버프 해제', skillName: '매직 크래쉬', effect: '공격력/마력 증가, 방어력 증가, 하드 스킨 해제' },
    { job: '다크나이트', category: '버프 무시', skillName: '리인카네이션', effect: '발동 후 40초 동안 공격 무시&공격 반사 무시' },
    { job: '다크나이트', category: '무적', skillName: '리인카네이션', effect: '사망 시 부활 후 2(쿼터)/8(하프)/40(풀)초' },
    { job: '다크나이트', category: '사망 1회 방지', skillName: '리인카네이션', effect: 'HP, MP를 완전히 회복하며 부활' },

    // 소울마스터
    { job: '소울마스터', category: '능력치 감소', skillName: '트루 사이트', effect: '방어력 -10%~20%, 최종 피해량 +5%~15% (60~80초)' },
    { job: '소울마스터', category: '버프 무시', skillName: '엘리시온', effect: '30초간 균열 공격은 공격 반사/무효화 무시' },
    { job: '소울마스터', category: '행동 불능', skillName: '소울 페네트레이션', effect: '10초 (데미지에 따라 최대 20초까지 증가)' },
    { job: '소울마스터', category: '무적', skillName: '소울 이클립스', effect: '시전 중 무적' },
    { job: '소울마스터', category: '무적', skillName: '솔루나 디바이드', effect: '시전 중 무적' },
    { job: '소울마스터', category: '무적', skillName: '블레이징 어썰트 / 러스터 차지', effect: '시전 중 무적' },

    // 미하일
    { job: '미하일', category: '능력치 감소', skillName: '소울 어썰트', effect: '20~40% 확률로 10초 간 명중률 -30%' },
    { job: '미하일', category: '능력치 감소', skillName: '샤이닝 크로스 / 인스톨', effect: '30%(일반) 또는 100%(인스톨) 확률로 10초 간 명중률 -30%' },
    { job: '미하일', category: '능력치 감소', skillName: '데들리 차지', effect: '60초간 적이 받는 데미지 10% 증가' },
    { job: '미하일', category: '버프 불능', skillName: '매직 크래쉬', effect: '22초 간 버프 효과 제한' },
    { job: '미하일', category: '버프 해제', skillName: '매직 크래쉬', effect: '공격력/마력 증가, 방어력 증가, 하드 스킨 해제' },
    { job: '미하일', category: '버프 무시', skillName: '로얄 가드-반격 충격파', effect: '공격 무효 및 공격 반사 무시' },
    { job: '미하일', category: '무적', skillName: '로얄 가드', effect: '가드 성공 시 4초 간 무적' },
    { job: '미하일', category: '기타', skillName: '소울 링크', effect: '파티원에게 로얄 가드 공격력의 50%, 소울 인듀어 내성의 20%, 방어력의 30% 공유' },

    // 블래스터
    { job: '블래스터', category: '행동 불능', skillName: '리볼빙 벙커', effect: '몬스터 제압 시 10.5초간 행동 불능' },
    { job: '블래스터', category: '무적', skillName: '스피릿 오브 프리덤', effect: '부활 후 2초(~8초)간 무적, 맵 이동 시 해제' },
    { job: '블래스터', category: '무적', skillName: '디펜스 오버드라이브', effect: '시전 중 3초간 무적' },
    { job: '블래스터', category: '무적', skillName: '하이퍼 매그넘 펀치', effect: '시전 후 2초간 무적' },
    { job: '블래스터', category: '무적', skillName: '버닝 브레이커', effect: '준비 및 돌진 동작 중 8초간 무적' },

    // 데몬슬레이어
    { job: '데몬슬레이어', category: '능력치 감소', skillName: '데빌 크라이', effect: '20초간 공격력 -20%, 방어력 -15%, 명중률 -20%' },
    { job: '데몬슬레이어', category: '버프 무시', skillName: '메타모포시스 (하이퍼)', effect: '인핸스 습득 시 지속시간의 20%간 공격 무효화, 공격 반사 효과 무시' },
    { job: '데몬슬레이어', category: '행동 불능', skillName: '다크 바인드', effect: '10초' },
    { job: '데몬슬레이어', category: '무적', skillName: '메타모포시스, 블러디 레이븐', effect: '시전 중 무적' },
    { job: '데몬슬레이어', category: '기타', skillName: '데몬 임팩트', effect: '공격 시 20초 간 이동속도 감소' },

    // 데몬어벤져
    { job: '데몬어벤져', category: '능력치 감소', skillName: '아머 브레이크', effect: '60초 동안 적의 방어율 30% 감소' },
    { job: '데몬어벤져', category: '버프 무시', skillName: '데몬 프렌지, 디멘션 소드, 레버넌트', effect: '물리 공격 무효화/공격 반사 버프 무시' },
    { job: '데몬어벤져', category: '행동 불능', skillName: '블러디 임프리즌', effect: '10초, 최대 20초' },
    { job: '데몬어벤져', category: '무적', skillName: '블러디 실드', effect: '시전 중 3초간 무적' },
    { job: '데몬어벤져', category: '기타', skillName: '레버넌트', effect: '15(18)초 동안 HP가 1 미만으로 내려가지 않음(불사)' },

    // 아란
    { job: '아란', category: '능력치 감소', skillName: '스노우 차지', effect: '이동 속도 감소(-20~-40) 및 적이 받는 데미지 10% 증가' },
    { job: '아란', category: '버프 무시', skillName: '브랜디쉬 마하', effect: '커맨드(↓↓+공격) 사용 시 공반/공무 무시' },
    { job: '아란', category: '행동 불능', skillName: '글레이셜 프리즌', effect: '10초 (데미지에 따라 최대 100% 증가, 즉 20초)' },
    { job: '아란', category: '무적', skillName: '부스트 엔드-헌터즈 타겟팅', effect: '아드레날린 중 키다운 시 최대 5초 무적' },
    { job: '아란', category: '무적', skillName: '마하의 가호', effect: '시전 즉시 2초간 무적' },

    // 카이저
    { job: '카이저', category: '능력치 감소', skillName: '기가 슬래셔', effect: '피격 시 슬로우 디버프' },
    { job: '카이저', category: '버프 무시', skillName: '파이널 피규레이션', effect: '60초간 공격 무시, 공격 반사 무시' },
    { job: '카이저', category: '버프 무시', skillName: '마제스티 오브 카이저', effect: '30초간 공격 무시, 공격 반사 무시' },
    { job: '카이저', category: '무적', skillName: '드래고닉 이지스', effect: '시전 중 3초간 무적' },
    { job: '카이저', category: '사망 1회 방지', skillName: '판테온', effect: '사망 1회 방지(비숍의 헤븐즈 도어와 중첩 X)' },
    { job: '카이저', category: '기타', skillName: '마제스티 오브 카이저', effect: '재사용 대기시간 50% 감소(하이퍼, 5차 스킬 제외)' },

    // 아델
    { job: '아델', category: '행동 불능', skillName: '스콜', effect: '10초 동안 행동 불능 상태 부여' },
    { job: '아델', category: '무적', skillName: '다이크', effect: '1초 간 무적' },
    { job: '아델', category: '무적', skillName: '인피니트', effect: '시전 및 해제 동작 중 무적' },

    // 렌
    { job: '렌', category: '행동 불능', skillName: '매화검 5초식 : 천매지박', effect: '10초 동안 행동 불능 상태 부여' },
    { job: '렌', category: '무적', skillName: '매화검 4초식 : 영인', effect: '3초 간 무적' },
    { job: '렌', category: '사망 1회 방지', skillName: '화중군자', effect: '부활 후 4.5초간 무적' },

    // 제로
    { job: '제로', category: '능력치 감소', skillName: '아머 스플릿', effect: '1스택 당 방어율 10% 감소 (최대 5스택 50%)' },
    { job: '제로', category: '능력치 감소', skillName: '타임 디스토션', effect: '30초간 영역 내 적이 받는 데미지 25% 증가' },
    { job: '제로', category: '버프 해제', skillName: '타임 디스토션', effect: '30초간 4초마다 영역 내 적 버프 해제' },
    { job: '제로', category: '행동 불능', skillName: '크리티컬 바인드', effect: '4초 (저항 35초)' },
    { job: '제로', category: '행동 불능', skillName: '리미트 브레이크', effect: '10~20초' },
    { job: '제로', category: '행동 불능', skillName: '쉐도우 레인', effect: '시전 시간(약 6초) 동안 행동 불가' },
    { job: '제로', category: '무적', skillName: '타임 홀딩', effect: '10초간 무적' },
    { job: '제로', category: '무적', skillName: '조인트 어택', effect: '시전 시간 동안 무적' },
    { job: '제로', category: '사망 1회 방지', skillName: '타임 리와인드', effect: '부활 후 2초간 무적' },
    { job: '제로', category: '기타', skillName: '타임 디스토션', effect: '30초간 4초마다 파티원 상태이상 해제, 공속 1단계 증가' },

    // 아크메이지(불/독)
    { job: '아크메이지(불/독)', category: '능력치 감소', skillName: '플레임 헤이즈', effect: '10초 동안 이동속도 -50%' },
    { job: '아크메이지(불/독)', category: '버프 무시', skillName: '파이어 오라, 메기도 플레임', effect: '적의 공격 무력화 및 공격반사를 무시하고 공격' },
    { job: '아크메이지(불/독)', category: '버프 무시', skillName: '도트 퍼니셔, 포이즌 노바, 퓨리 오브 이프리트', effect: '공격반사로 인한 피해 무시' },
    { job: '아크메이지(불/독)', category: '무적', skillName: '에테리얼 폼', effect: '시전 중 3초' },
    { job: '아크메이지(불/독)', category: '기타', skillName: '플레임 헤이즈', effect: '10초 동안 무력화' },

    // 아크메이지(썬/콜)
    { job: '아크메이지(썬/콜)', category: '능력치 감소', skillName: '프리징 브레스', effect: '마법 방어력 -30%, 물리 방어력 -15%' },
    { job: '아크메이지(썬/콜)', category: '행동 불능', skillName: '프리징 브레스', effect: '10초' },
    { job: '아크메이지(썬/콜)', category: '무적', skillName: '프리징 브레스', effect: '시전 중, 최대 10초' },
    { job: '아크메이지(썬/콜)', category: '무적', skillName: '에테리얼 폼', effect: '시전 중 3초' },
    { job: '아크메이지(썬/콜)', category: '기타', skillName: '빙결 중첩', effect: '적 빙결 중첩 시 슬로우' },

    // 비숍
    { job: '비숍', category: '능력치 감소', skillName: '엔젤릭 터치', effect: '60초 동안 방어율 44% 감소' },
    { job: '비숍', category: '무적', skillName: '에테리얼 폼', effect: '시전 중 3초' },
    { job: '비숍', category: '부활', skillName: '리저렉션', effect: '파티원 부활 (+8초 간 무적)' },
    { job: '비숍', category: '사망 1회 방지', skillName: '헤븐즈 도어', effect: '파티원 사망 1회 방지 (재적용 대기시간 10분)' },
    { job: '비숍', category: '기타', skillName: '디스펠', effect: '대부분의 상태이상 해제 가능' },

    // 플레임위자드
    { job: '플레임위자드', category: '행동 불능', skillName: '마엘스트롬', effect: '10초 동안 행동 불능 상태 부여' },
    { job: '플레임위자드', category: '무적', skillName: '카타클리즘', effect: '시전 중 무적' },
    { job: '플레임위자드', category: '무적', skillName: '에테리얼 폼', effect: '시전 시 3초간 무적' },
    { job: '플레임위자드', category: '사망 1회 방지', skillName: '본 피닉스', effect: '사망 시 HP 50% 회복 후 3초간 무적' },

    // 배틀메이지
    { job: '배틀메이지', category: '능력치 감소', skillName: '디버프 오라', effect: '2초 후 60초 간 방어율 -20%, 속성 내성 -0%~10%, 최종 데미지 +0%~10%' },
    { job: '배틀메이지', category: '버프 무시', skillName: '데스, 다크 제네시스', effect: '공격 반사 무시' },
    { job: '배틀메이지', category: '무적', skillName: '스피릿 오브 프리덤', effect: '부활 시 2초 동안 피해를 받지 않는다' },
    { job: '배틀메이지', category: '무적', skillName: '어비셜 라이트닝', effect: '시전 시 무적' },
    { job: '배틀메이지', category: '무적', skillName: '에테리얼 폼', effect: '시전 시 3초간 무적' },
    { job: '배틀메이지', category: '기타', skillName: '쉘터', effect: '아군 무적 및 최대 HP 비례 피해 -10%~20% 효과를 주는 공간 생성' },
    { job: '배틀메이지', category: '기타', skillName: '블루 오라-디스펠 매직', effect: '5초마다 아군의 상태 이상 1종 해제' },

    // 에반
    { job: '에반', category: '무적', skillName: '드래곤 마스터', effect: '미르 탑승 시 최대 10초간 무적' },
    { job: '에반', category: '무적', skillName: '에테리얼 폼', effect: '시전 시 3초간 무적' },

    // 루미너스
    { job: '루미너스', category: '행동 불능', skillName: '아마겟돈', effect: '10초' },
    { job: '루미너스', category: '무적', skillName: '라이트랜스포밍', effect: '바디 어택 및 오브젝트 회피' },
    { job: '루미너스', category: '무적', skillName: '루멘 셰이드', effect: '3초' },
    { job: '루미너스', category: '무적', skillName: '에테리얼 폼', effect: '3초' },
    { job: '루미너스', category: '기타', skillName: '파워 오브 라이트', effect: '암흑 상태이상 무시' },

    // 일리움
    { job: '일리움', category: '능력치 감소', skillName: '커스 마크', effect: '중첩당 방어율 -4%, 최대 5중첩(-20%)' },
    { job: '일리움', category: '무적', skillName: '프라이멀 프로텍션', effect: '블레스 마크 1중첩당 0.6초 무적, 최소 4초 최대 10초' },
    { job: '일리움', category: '무적', skillName: '롱기누스 존', effect: '시전 중 무적' },
    { job: '일리움', category: '무적', skillName: '에테리얼 폼', effect: '시전 중 3초간 무적' },

    // 라라
    { job: '라라', category: '능력치 감소', skillName: '아름드리 나무', effect: '방어율 15% 감소' },
    { job: '라라', category: '행동 불능', skillName: '넝쿨 타래', effect: '10초 지속' },
    { job: '라라', category: '무적', skillName: '에테리얼 폼', effect: '3초 지속' },
    { job: '라라', category: '사망 1회 방지', skillName: '화중군자', effect: '부활 후 4.5초간 무적' },
    { job: '라라', category: '기타', skillName: '아름드리 나무', effect: '영역 안에서 1.3초마다 라라(및 파티원)의 상태이상 해제' },
    { job: '라라', category: '기타', skillName: '발현 : 햇살 가득 안은 터', effect: '영역 안에서 파티원의 데미지 25% 증가' },
    { job: '라라', category: '기타', skillName: '발현 : 바람 그네', effect: '영역 안에서 파티원의 공격 속도 1단계, 이동 속도 및 점프력 20 증가' },

    // 키네시스
    { job: '키네시스', category: '능력치 감소', skillName: '싸이킥 포스', effect: '10초 간 키네시스 최종 피해량 +20%' },
    { job: '키네시스', category: '능력치 감소', skillName: '얼티메이트-메테리얼, 싸이킥 그랩2, 싸이킥 샷', effect: '30초 동안 방어율 15% 감소, 이동속도 30% 감소' },
    { job: '키네시스', category: '버프 해제', skillName: '얼티메이트-딥 임팩트', effect: '모든 버프 해제 (해제 당한 적은 120초간 저항)' },
    { job: '키네시스', category: '행동 불능', skillName: '사이코 메트리', effect: '10~20초' },
    { job: '키네시스', category: '무적', skillName: '에버싸이킥', effect: '시전 중 무적' },
    { job: '키네시스', category: '무적', skillName: '에테리얼 폼', effect: '시전 중 3초간 무적' }
];

/**
 * 직업명으로 유틸리티 정보 조회
 */
export function getJobUtilities(jobName: string): JobUtility[] {
    return JOB_UTILITY_DATA.filter(item => item.job === jobName);
}

/**
 * 직업의 특정 카테고리 유틸리티 조회
 */
export function getJobUtilitiesByCategory(jobName: string, category: UtilityCategory): JobUtility[] {
    return JOB_UTILITY_DATA.filter(item => item.job === jobName && item.category === category);
}

/**
 * 카테고리별 직업 목록 조회
 */
export function getJobsByUtilityCategory(category: UtilityCategory): string[] {
    const jobs = new Set<string>();
    JOB_UTILITY_DATA.filter(item => item.category === category).forEach(item => {
        jobs.add(item.job);
    });
    return Array.from(jobs);
}

/**
 * 직업의 유틸리티 점수 계산 (유틸리티 개수 기반)
 */
export function getUtilityScore(jobName: string): number {
    return getJobUtilities(jobName).length;
}

/**
 * 직업의 유틸리티 카테고리별 개수
 */
export function getUtilityCategoryCount(jobName: string): Record<UtilityCategory, number> {
    const utilities = getJobUtilities(jobName);
    const counts: Record<UtilityCategory, number> = {
        '능력치 감소': 0,
        '버프 불능': 0,
        '버프 해제': 0,
        '버프 무시': 0,
        '상태이상 무시': 0,
        '행동 불능': 0,
        '무적': 0,
        '사망 1회 방지': 0,
        '부활': 0,
        '기타': 0
    };

    utilities.forEach(util => {
        counts[util.category]++;
    });

    return counts;
}

/**
 * 특정 유틸리티 보유 여부 확인
 */
export function hasUtilityCategory(jobName: string, category: UtilityCategory): boolean {
    return JOB_UTILITY_DATA.some(item => item.job === jobName && item.category === category);
}

/**
 * 주요 유틸리티 보유 여부 체크
 */
export function getUtilityFlags(jobName: string) {
    return {
        hasDebuff: hasUtilityCategory(jobName, '능력치 감소'),
        hasBuffBlock: hasUtilityCategory(jobName, '버프 불능'),
        hasBuffRemove: hasUtilityCategory(jobName, '버프 해제'),
        hasBuffIgnore: hasUtilityCategory(jobName, '버프 무시'),
        hasCrowdControl: hasUtilityCategory(jobName, '행동 불능'),
        hasInvincibility: hasUtilityCategory(jobName, '무적'),
        hasRevive: hasUtilityCategory(jobName, '사망 1회 방지') || hasUtilityCategory(jobName, '부활'),
        hasPartySupport: getJobUtilitiesByCategory(jobName, '기타').some(util =>
            util.effect.includes('파티원') || util.effect.includes('아군')
        )
    };
}

/**
 * 유틸리티 가치 점수 계산 (가중치 적용)
 * 보스전에서 중요한 유틸리티에 높은 가중치
 */
export function getUtilityValueScore(jobName: string): number {
    const flags = getUtilityFlags(jobName);
    const counts = getUtilityCategoryCount(jobName);

    let score = 0;

    // 카테고리별 가중치
    score += counts['능력치 감소'] * 10;      // 디버프
    score += counts['버프 불능'] * 15;        // 버프 차단 (보스전 유용)
    score += counts['버프 해제'] * 15;        // 버프 해제 (보스전 유용)
    score += counts['버프 무시'] * 20;        // 공격 반사 무시 (매우 유용)
    score += counts['행동 불능'] * 15;        // 바인드
    score += counts['무적'] * 12;             // 생존력
    score += counts['사망 1회 방지'] * 25;    // 부활/생존 (매우 중요)
    score += counts['부활'] * 30;             // 파티원 부활 (최고 가치)
    score += counts['기타'] * 8;              // 기타 유틸

    return score;
}

/**
 * 데이터에 포함된 직업 목록
 */
export function getAvailableJobs(): string[] {
    const jobs = new Set<string>();
    JOB_UTILITY_DATA.forEach(item => {
        jobs.add(item.job);
    });
    return Array.from(jobs).sort();
}
