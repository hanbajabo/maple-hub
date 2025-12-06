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
    let bossSetCount = checkSetItems(equipment, bossSetKeywords, ["여명의"]);

    // 여명의 보스 세트
    const dawnSetKeywords = [
        "여명의가디언엔젤링", // 반지 (이름에 '여명의'가 붙은 것만 여명 세트 인정)
        "데이브레이크펜던트", "데이브레이크", // 펜던트
        "트와일라이트마크", "트와일라이트", // 얼굴장식
        "에스텔라이어링", "에스텔라" // 귀고리
    ];
    let dawnSetCount = checkSetItems(equipment, dawnSetKeywords);

    // 칠흑의 보스 세트
    const pitchedSetKeywords = [
        "루즈컨트롤머신마크", "루즈 컨트롤 머신 마크", "루즈컨트롤", // 얼굴장식
        "마력이깃든안대", "마력이 깃든 안대", // 눈장식
        "거대한공포", "거대한 공포", // 반지
        "저주받은적의마도서", "저주받은청의마도서", "저주받은녹의마도서", "저주받은황의마도서", // 포켓 (풀네임)
        "저주받은 적의 마도서", "저주받은 청의 마도서", "저주받은 녹의 마도서", "저주받은 황의 마도서", // 포켓 (띄어쓰기)
        "마도서", // 포켓 (범용)
        "블랙하트", "블랙 하트", "컴플리트언더컨트롤", "컴플리트 언더컨트롤", // 기계 심장
        "몽환의벨트", "몽환의 벨트", // 벨트
        "고통의근원", "고통의 근원", // 펜던트
        "창세의뱃지", "창세의 뱃지", // 뱃지
        "커맨더포스이어링", "커맨더 포스 이어링", "커맨더포스", // 귀고리
        "미트라의분노", "미트라의 분노", "미트라" // 엠블렘
    ];
    let pitchedSetCount = checkSetItems(equipment, pitchedSetKeywords);

    // 광휘의 보스 세트
    const brilliantSetKeywords = [
        "근원의속삭임", // 반지
        "죽음의맹세", // 펜던트
        "불멸의유산" // 훈장
    ];
    let brilliantSetCount = checkSetItems(equipment, brilliantSetKeywords);

    // 마이스터 세트
    const meisterSetKeywords = [
        "마이스터링", "마이스터 링",
        "마이스터이어링", "마이스터 이어링",
        "마이스터숄더", "마이스터 숄더"
    ];
    let meisterSetCount = checkSetItems(equipment, meisterSetKeywords);

    // 럭키 아이템 (제네시스 무기) 처리
    // * 제네시스 무기는 '무기'가 포함된 세트에만 적용됨 (보스/여명/칠흑은 장신구 세트라 적용 X)
    // * 마이스터 세트는 무기가 포함되어 있으므로 적용 가능
    if (isGenesisWeapon && meisterSetCount >= 3) {
        meisterSetCount++;
    }

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
