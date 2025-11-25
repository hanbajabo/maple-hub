import { EquipmentItem, Issue } from '../types';
import { checkSetItems } from '../utils';

export const evaluateStage1 = (equipment: EquipmentItem[], isGenesisWeapon: boolean) => {
    // 보스 장신구 세트
    // * 가디언 엔젤 링은 '여명의'가 붙은 경우 제외해야 함
    const bossSetKeywords = [
        "도미네이터", "혼테일", "매커네이터", // 펜던트
        "웬투스", // 뱃지
        "응축된힘", // 얼굴장식
        "아쿠아틱", "블랙빈마크", "파풀라투스마크", // 눈장식
        "지옥의불꽃", "데아시두스", // 귀고리
        "실버블라썸", "고귀한이피아", "가디언엔젤링", // 반지
        "골든클로버", "분노한자쿰", // 벨트
        "블랙메탈", // 어깨장식
        "성배", "영생의돌" // 포켓
    ];
    const bossSetCount = checkSetItems(equipment, bossSetKeywords, ["여명의"]);

    // 여명의 보스 세트
    const dawnSetKeywords = [
        "여명의가디언엔젤링", // 반지
        "데이브레이크", // 펜던트
        "트와일라이트", // 얼굴장식
        "에스텔라" // 귀고리
    ];
    const dawnSetCount = checkSetItems(equipment, dawnSetKeywords);

    // 칠흑의 보스 세트
    const pitchedSetKeywords = [
        "루즈컨트롤", // 얼굴장식
        "마력이깃든안대", // 눈장식
        "거대한공포", // 반지
        "저주받은적의마도서", "저주받은청의마도서", "저주받은녹의마도서", "저주받은황의마도서", // 포켓 (색상별)
        "블랙하트", "컴플리트언더컨트롤", // 기계 심장
        "몽환의벨트", // 벨트
        "고통의근원", // 펜던트
        "창세의뱃지", // 뱃지
        "커맨더포스", // 귀고리
        "미트라의분노" // 엠블렘
    ];
    const pitchedSetCount = checkSetItems(equipment, pitchedSetKeywords);

    // 광휘의 보스 세트
    const brilliantSetKeywords = [
        "근원의속삭임", // 반지
        "죽음의맹세", // 펜던트
        "불멸의유산" // 훈장
    ];
    const brilliantSetCount = checkSetItems(equipment, brilliantSetKeywords);

    // 마이스터 세트 (기존 유지)
    const meisterSetCount = checkSetItems(equipment, ["마이스터"]);

    const setCounts = { bossSetCount, dawnSetCount, pitchedSetCount, meisterSetCount, brilliantSetCount };

    let setSatisfiedCount = 0;
    if (bossSetCount >= 5) setSatisfiedCount++;
    if (dawnSetCount >= 2) setSatisfiedCount++;
    if (pitchedSetCount >= 2) setSatisfiedCount++;
    if (meisterSetCount >= 3) setSatisfiedCount++;
    if (brilliantSetCount >= 1) setSatisfiedCount++;

    const exceptionSatisfied = bossSetCount >= 9 || dawnSetCount >= 4 || pitchedSetCount >= 4 || (isGenesisWeapon && meisterSetCount >= 3);

    const issues: Issue[] = [];
    if (setSatisfiedCount < 2 && !exceptionSatisfied) {
        issues.push({ type: 'set_effect', message: "세트 효과 조건 미달 (보스5/여명2/칠흑2/마이스터3/광휘1 중 2개 이상 또는 예외 조건)" });
    }

    const isPassed = issues.length === 0;

    return { setCounts, setSatisfiedCount, exceptionSatisfied, issues, isPassed };
};
