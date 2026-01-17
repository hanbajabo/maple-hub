'use client';

import { useState } from 'react';
import { List } from 'lucide-react';

// 데이터 타입 정의
interface RankingData {
    rank: number;
    name: string;
    price: number;
    season?: string;
}

// 시즌별 데이터를 별도 파일로 import하는 대신 여기에 모두 정의
const seasonData: { [key: string]: RankingData[] } = {
    '1': [
        // 시즌1 TOP 100
        { rank: 1, name: '라라', price: 30000000 },
        { rank: 2, name: '스타', price: 29000000 },
        { rank: 3, name: '전사', price: 28000000 },
        { rank: 4, name: '해적', price: 24242424 },
        { rank: 5, name: '비숍', price: 22222222 },
        { rank: 6, name: '하트', price: 21000000 },
        { rank: 7, name: '루나', price: 20340000 },
        { rank: 8, name: '사과', price: 18888888 },
        { rank: 9, name: '겨울', price: 17777777 },
        { rank: 10, name: '팬텀', price: 15500000 },
        { rank: 11, name: '아란', price: 15000000 },
        { rank: 12, name: '세계', price: 15000000 },
        { rank: 13, name: '궁수', price: 15000000 },
        { rank: 14, name: '이별', price: 15000000 },
        { rank: 15, name: '여신', price: 14000000 },
        { rank: 16, name: '아이', price: 14000000 },
        { rank: 17, name: '아크', price: 13120000 },
        { rank: 18, name: '여우', price: 13000000 },
        { rank: 19, name: '소리', price: 12300000 },
        { rank: 20, name: '나나', price: 12000000 },
        { rank: 21, name: '아델', price: 11070000 },
        { rank: 22, name: '우정', price: 11000000 },
        { rank: 23, name: '호영', price: 10820523 },
        { rank: 24, name: '토끼', price: 10500000 },
        { rank: 25, name: '나로', price: 10150523 },
        { rank: 26, name: '시프', price: 10160000 },
        { rank: 27, name: '가을', price: 10010000 },
        { rank: 28, name: '전설', price: 10000000 },
        { rank: 29, name: '딸기', price: 9999999 },
        { rank: 30, name: '민트', price: 9999999 },
        { rank: 31, name: '허니', price: 9010000 },
        { rank: 32, name: '수지', price: 9000000 },
        { rank: 33, name: '나워', price: 9000000 },
        { rank: 34, name: '칼리', price: 9000000 },
        { rank: 35, name: '마리', price: 8754444 },
        { rank: 36, name: '베리', price: 8580000 },
        { rank: 37, name: '백호', price: 8510000 },
        { rank: 38, name: '루비', price: 8360000 },
        { rank: 39, name: '로즈', price: 8080000 },
        { rank: 40, name: '인형', price: 8060000 },
        { rank: 41, name: '야옹', price: 8040000 },
        { rank: 42, name: '뮤즈', price: 8020000 },
        { rank: 43, name: '뉴비', price: 8000000 },
        { rank: 44, name: '바비', price: 8000000 },
        { rank: 45, name: '카링', price: 8000000 },
        { rank: 46, name: '해피', price: 8000000 },
        { rank: 47, name: '바나나', price: 7660000 },
        { rank: 48, name: '코코', price: 7601557 },
        { rank: 49, name: '자유', price: 7540000 },
        { rank: 50, name: '애기', price: 7500000 },
        { rank: 51, name: '리즈', price: 7500000 },
        { rank: 52, name: '노아', price: 7200000 },
        { rank: 53, name: '태연', price: 7060000 },
        { rank: 54, name: '마왕', price: 7020000 },
        { rank: 55, name: '카나', price: 7000002 },
        { rank: 56, name: '나라', price: 7000000 },
        { rank: 57, name: '유나', price: 7000000 },
        { rank: 58, name: '시크', price: 7000000 },
        { rank: 59, name: '라임', price: 7000000 },
        { rank: 60, name: '키키', price: 7000000 },
        { rank: 61, name: '우연', price: 7000000 },
        { rank: 62, name: '오즈', price: 6880000 },
        { rank: 63, name: '귀신', price: 6800000 },
        { rank: 64, name: '비비', price: 6740999 },
        { rank: 65, name: '장원영', price: 6700000 },
        { rank: 66, name: '설윤', price: 6700000 },
        { rank: 67, name: '오이', price: 6666666 },
        { rank: 68, name: '조아', price: 6623666 },
        { rank: 69, name: '닌자', price: 6600000 },
        { rank: 70, name: '은월', price: 6560000 },
        { rank: 71, name: '배트', price: 6510000 },
        { rank: 72, name: '미래', price: 6503333 },
        { rank: 73, name: '섀도어', price: 6500000 },
        { rank: 74, name: '젤리', price: 66200000 },
        { rank: 75, name: '유이', price: 6400000 },
        { rank: 76, name: '큐트', price: 6390000 },
        { rank: 77, name: '키스', price: 6370000 },
        { rank: 78, name: '애인', price: 6300000 },
        { rank: 79, name: '유키', price: 6100000 },
        { rank: 80, name: '암살', price: 6090000 },
        { rank: 81, name: '뽀뽀', price: 6081111 },
        { rank: 82, name: '모찌', price: 6060000 },
        { rank: 83, name: '공주', price: 6030000 },
        { rank: 84, name: '마린', price: 6000000 },
        { rank: 85, name: '수호', price: 6000000 },
        { rank: 86, name: '팔라딘', price: 6000000 },
        { rank: 87, name: '크림', price: 6000000 },
        { rank: 88, name: '캐시', price: 6000000 },
        { rank: 89, name: '레이', price: 6000000 },
        { rank: 90, name: '카이저', price: 6000000 },
        { rank: 91, name: '리리', price: 6000000 },
        { rank: 92, name: '캡틴', price: 5800000 },
        { rank: 93, name: '미녀', price: 5780000 },
        { rank: 94, name: '바람', price: 5730000 },
        { rank: 95, name: '네네', price: 5700000 },
        { rank: 96, name: '누리', price: 5694444 },
        { rank: 97, name: '도쿄', price: 5600000 },
        { rank: 98, name: '소원', price: 5600000 },
        { rank: 99, name: '미아', price: 5585555 },
        { rank: 100, name: '카린', price: 5555555 },
    ],
    '2': [
        // 시즌2 TOP 100
        { rank: 1, name: '소녀', price: 12000000 },
        { rank: 2, name: '조로', price: 11110000 },
        { rank: 3, name: '해적', price: 10001000 },
        { rank: 4, name: '선녀', price: 9000000 },
        { rank: 5, name: '가을', price: 8200000 },
        { rank: 6, name: '제니', price: 7300000 },
        { rank: 7, name: '소년', price: 6200000 },
        { rank: 8, name: '하니', price: 6200000 },
        { rank: 9, name: '아란', price: 5500000 },
        { rank: 10, name: '캡틴', price: 5500000 },
        { rank: 11, name: '호두', price: 5300000 },
        { rank: 12, name: '괴도', price: 5300000 },
        { rank: 13, name: '코코', price: 5200000 },
        { rank: 14, name: '연인', price: 5000000 },
        { rank: 15, name: '소울마스터', price: 5000000 },
        { rank: 16, name: '이유', price: 5000000 },
        { rank: 17, name: '아잉', price: 4900000 },
        { rank: 18, name: '모모', price: 4500000 },
        { rank: 19, name: '제리', price: 4400000 },
        { rank: 20, name: '카라', price: 4150000 },
        { rank: 21, name: '귀신', price: 4050000 },
        { rank: 22, name: '추억', price: 4000000 },
        { rank: 23, name: '애인', price: 4000000 },
        { rank: 24, name: '재원', price: 4000000 },
        { rank: 25, name: '미키', price: 3750000 },
        { rank: 26, name: '일리움', price: 3700000 },
        { rank: 27, name: '천상', price: 3550000 },
        { rank: 28, name: '미나', price: 3411111 },
        { rank: 29, name: '고수', price: 3400000 },
        { rank: 30, name: '앵두', price: 3400000 },
        { rank: 31, name: '디즈니', price: 3400000 },
        { rank: 32, name: '유키', price: 3380000 },
        { rank: 33, name: '바비', price: 3300000 },
        { rank: 34, name: '학살', price: 3300000 },
        { rank: 35, name: '포커', price: 3200000 },
        { rank: 36, name: '블루', price: 3200000 },
        { rank: 37, name: '룰루', price: 3150000 },
        { rank: 38, name: '주스', price: 3100000 },
        { rank: 39, name: '나워', price: 3050000 },
        { rank: 40, name: '보이', price: 3050000 },
        { rank: 41, name: '파이', price: 3050000 },
        { rank: 42, name: '다정', price: 3050000 },
        { rank: 43, name: '미쿠', price: 3050000 },
        { rank: 44, name: '시인', price: 3000000 },
        { rank: 45, name: '구찌', price: 3000000 },
        { rank: 46, name: '미호', price: 2921943 },
        { rank: 47, name: '지디', price: 2900000 },
        { rank: 48, name: '꼬꼬', price: 2900000 },
        { rank: 49, name: '배찌', price: 2890000 },
        { rank: 50, name: '뽀뽀', price: 2890000 },
        { rank: 51, name: '번개', price: 2700000 },
        { rank: 52, name: '지니', price: 2700000 },
        { rank: 53, name: '히히', price: 2700000 },
        { rank: 54, name: '거미', price: 2650000 },
        { rank: 55, name: '레이', price: 2605555 },
        { rank: 56, name: '기억', price: 2555555 },
        { rank: 57, name: '아영', price: 2550000 },
        { rank: 58, name: '핑크빈', price: 2500000 },
        { rank: 59, name: '바로', price: 2500000 },
        { rank: 60, name: '데드', price: 2500000 },
        { rank: 61, name: '악당', price: 2450000 },
        { rank: 62, name: '모래', price: 2450000 },
        { rank: 63, name: '이서', price: 2420000 },
        { rank: 64, name: '쓰레기', price: 2400000 },
        { rank: 65, name: '뚱이', price: 2400000 },
        { rank: 66, name: '모델', price: 2350000 },
        { rank: 67, name: '나연', price: 2350000 },
        { rank: 68, name: '팬더', price: 2300000 },
        { rank: 69, name: '다크나이트', price: 2300000 },
        { rank: 70, name: '비트', price: 2300000 },
        { rank: 71, name: '마루', price: 2267900 },
        { rank: 72, name: '샤이', price: 2250000 },
        { rank: 73, name: '랭커', price: 2200000 },
        { rank: 74, name: '미녀', price: 2151004 },
        { rank: 75, name: '오뎅', price: 2150000 },
        { rank: 76, name: '레디', price: 2150000 },
        { rank: 77, name: '보미', price: 2150000 },
        { rank: 78, name: '간지', price: 2150000 },
        { rank: 79, name: '도시', price: 2150000 },
        { rank: 80, name: '우이', price: 2100000 },
        { rank: 81, name: '패스파인더', price: 2100000 },
        { rank: 82, name: '부끄', price: 2100000 },
        { rank: 83, name: '첫눈', price: 2050000 },
        { rank: 84, name: '현석', price: 2050000 },
        { rank: 85, name: '사이', price: 2050000 },
        { rank: 86, name: '깨비', price: 2050000 },
        { rank: 87, name: '잔나', price: 2050000 },
        { rank: 88, name: '가수', price: 2050000 },
        { rank: 89, name: '연우', price: 2000000 },
        { rank: 90, name: '지젤', price: 2000000 },
        { rank: 91, name: '청하', price: 2000000 },
        { rank: 92, name: '민아', price: 2000000 },
        { rank: 93, name: '비버', price: 2000000 },
        { rank: 94, name: '포이', price: 2000000 },
        { rank: 95, name: '데이', price: 2000000 },
        { rank: 96, name: '시루', price: 2000000 },
        { rank: 97, name: '애정', price: 2000000 },
        { rank: 98, name: '뿌까', price: 2000000 },
        { rank: 99, name: '마하', price: 2000000 },
        { rank: 100, name: '울프', price: 2000000 },
    ],
    '2.5': [
        // 시즌2.5 (운영자 직접 판매) TOP 100
        { rank: 1, name: '세구', price: 6200000 },
        { rank: 2, name: '시은', price: 4800000 },
        { rank: 3, name: '개화', price: 3000000 },
        { rank: 4, name: '푸리나', price: 2750000 },
        { rank: 5, name: '토가', price: 2700000 },
        { rank: 6, name: '릴카', price: 2550000 },
        { rank: 7, name: '호동', price: 2550000 },
        { rank: 8, name: '히루', price: 2400000 },
        { rank: 9, name: '프릴', price: 2150000 },
        { rank: 10, name: '하코', price: 2000000 },
        { rank: 11, name: '관객', price: 1850000 },
        { rank: 12, name: '체다', price: 1850000 },
        { rank: 13, name: '프하', price: 1850000 },
        { rank: 14, name: '시너지', price: 1800000 },
        { rank: 15, name: '진스', price: 1800000 },
        { rank: 16, name: '이응', price: 1700000 },
        { rank: 17, name: '누렁', price: 1600000 },
        { rank: 18, name: '살상', price: 1560000 },
        { rank: 19, name: '몬스터컬렉션', price: 1550000 },
        { rank: 20, name: '견자희', price: 1500000 },
        { rank: 21, name: '흉수', price: 1500000 },
        { rank: 22, name: '이블린', price: 1350000 },
        { rank: 23, name: '득득', price: 1340000 },
        { rank: 24, name: '톰보이', price: 1210000 },
        { rank: 25, name: '다츠', price: 1200000 },
        { rank: 26, name: '레오나', price: 1200000 },
        { rank: 27, name: '영롱', price: 1200000 },
        { rank: 28, name: '애봄', price: 1190000 },
        { rank: 29, name: '똥손', price: 1160000 },
        { rank: 30, name: '적멸', price: 1150000 },
        { rank: 31, name: '실바', price: 1150000 },
        { rank: 32, name: '뚱땡이', price: 1135000 },
        { rank: 33, name: '베키', price: 1110000 },
        { rank: 34, name: '규호', price: 1100000 },
        { rank: 35, name: '삼봉', price: 1100000 },
        { rank: 36, name: '수입', price: 1100000 },
        { rank: 37, name: '춘천', price: 1100000 },
        { rank: 38, name: '미담', price: 1050000 },
        { rank: 39, name: '한예지', price: 1050000 },
        { rank: 40, name: '권태광', price: 1000000 },
        { rank: 41, name: '단초', price: 1000000 },
        { rank: 42, name: '달솜', price: 1000000 },
        { rank: 43, name: '무다', price: 1000000 },
        { rank: 44, name: '포차코', price: 1000000 },
        { rank: 45, name: 'DICE', price: 980000 },
        { rank: 46, name: '크바', price: 950000 },
        { rank: 47, name: '대범', price: 950000 },
        { rank: 48, name: '릴리에', price: 920000 },
        { rank: 49, name: '쪼니', price: 920000 },
        { rank: 50, name: '카나타', price: 920000 },
        { rank: 51, name: '투어스', price: 920000 },
        { rank: 52, name: '쉐레', price: 918888 },
        { rank: 53, name: '꽃봄', price: 910000 },
        { rank: 54, name: '나츠키', price: 910000 },
        { rank: 55, name: '암영', price: 910000 },
        { rank: 56, name: '애온', price: 910000 },
        { rank: 57, name: '쿠퍼', price: 910000 },
        { rank: 58, name: '한아밍', price: 910000 },
        { rank: 59, name: '네엥', price: 900000 },
        { rank: 60, name: 'Lynn', price: 900000 },
        { rank: 61, name: '이녀', price: 900000 },
        { rank: 62, name: '쇼우', price: 898888 },
        { rank: 63, name: '우리은행', price: 890000 },
        { rank: 64, name: '코코미', price: 888888 },
        { rank: 65, name: '이뀨', price: 880000 },
        { rank: 66, name: '실피드', price: 870000 },
        { rank: 67, name: '쩐다', price: 870000 },
        { rank: 68, name: '또솜', price: 860000 },
        { rank: 69, name: '소백', price: 850000 },
        { rank: 70, name: '차도', price: 850000 },
        { rank: 71, name: '난감', price: 840000 },
        { rank: 72, name: '따투', price: 825000 },
        { rank: 73, name: '말왕', price: 820000 },
        { rank: 74, name: '통역', price: 820000 },
        { rank: 75, name: '구르미', price: 810000 },
        { rank: 76, name: '맹꽁이', price: 810000 },
        { rank: 77, name: '하으', price: 800000 },
        { rank: 78, name: '플러팅', price: 800000 },
        { rank: 79, name: '십자', price: 800000 },
        { rank: 80, name: '러즈', price: 800000 },
        { rank: 81, name: '도을', price: 800000 },
        { rank: 82, name: '누니', price: 800000 },
        { rank: 83, name: '국룰', price: 800000 },
        { rank: 84, name: '러지', price: 790000 },
        { rank: 85, name: '부당', price: 790000 },
        { rank: 86, name: '쿠다', price: 790000 },
        { rank: 87, name: '키요', price: 790000 },
        { rank: 88, name: '버텨', price: 780000 },
        { rank: 89, name: '윤재', price: 780000 },
        { rank: 90, name: '헤에', price: 780000 },
        { rank: 91, name: '트리거', price: 770000 },
        { rank: 92, name: '침실', price: 770000 },
        { rank: 93, name: '영채', price: 770000 },
        { rank: 94, name: '박다영', price: 770000 },
        { rank: 95, name: '고파', price: 770000 },
        { rank: 96, name: '온실', price: 760000 },
        { rank: 97, name: '혁진', price: 760000 },
        { rank: 98, name: '떼끼', price: 750597 },
        { rank: 99, name: '디스코', price: 750000 },
        { rank: 100, name: '라폼', price: 740000 },
    ],
    '3': [
        // 시즌3 TOP 100
        { rank: 1, name: '여우', price: 15700000 },
        { rank: 2, name: '라라', price: 13000000 },
        { rank: 3, name: '초코', price: 12777777 },
        { rank: 4, name: '토끼', price: 9999999 },
        { rank: 5, name: '제로', price: 9999999 },
        { rank: 6, name: '설윤', price: 8000000 },
        { rank: 7, name: '윈터', price: 7000000 },
        { rank: 8, name: '루루', price: 7000000 },
        { rank: 9, name: '메리', price: 6510000 },
        { rank: 10, name: '레몬', price: 6000000 },
        { rank: 11, name: '닌자', price: 6000000 },
        { rank: 12, name: '민트', price: 5700000 },
        { rank: 13, name: '루미너스', price: 5500000 },
        { rank: 14, name: '캡틴', price: 5500000 },
        { rank: 15, name: '시크', price: 5000000 },
        { rank: 16, name: '키스', price: 5000000 },
        { rank: 17, name: '호두', price: 5000000 },
        { rank: 18, name: '신궁', price: 4950000 },
        { rank: 19, name: '유리', price: 4950000 },
        { rank: 20, name: '채영', price: 4855555 },
        { rank: 21, name: '다정', price: 4750000 },
        { rank: 22, name: '카이저', price: 4650000 },
        { rank: 23, name: '궁수', price: 4444440 },
        { rank: 24, name: '데몬', price: 4350000 },
        { rank: 25, name: '모카', price: 4300000 },
        { rank: 26, name: '하쿠', price: 4150000 },
        { rank: 27, name: '왕자', price: 4100000 },
        { rank: 28, name: '소망', price: 4100000 },
        { rank: 29, name: '메르', price: 4100000 },
        { rank: 30, name: '고수', price: 4100000 },
        { rank: 31, name: '여왕', price: 4000000 },
        { rank: 32, name: '앵두', price: 4000000 },
        { rank: 33, name: '라임', price: 4000000 },
        { rank: 34, name: '오즈', price: 3800000 },
        { rank: 35, name: '소원', price: 3760000 },
        { rank: 36, name: '일리움', price: 3700000 },
        { rank: 37, name: '번개', price: 3700000 },
        { rank: 38, name: '펀치', price: 3700000 },
        { rank: 39, name: '소울마스터', price: 3550000 },
        { rank: 40, name: '카호', price: 3550000 },
        { rank: 41, name: '모모', price: 3550000 },
        { rank: 42, name: '채원', price: 3500000 },
        { rank: 43, name: '차은우', price: 3500000 },
        { rank: 44, name: '연우', price: 3450000 },
        { rank: 45, name: '나무', price: 3300000 },
        { rank: 46, name: '소다', price: 3300000 },
        { rank: 47, name: '메이', price: 3270000 },
        { rank: 48, name: '노아', price: 3200000 },
        { rank: 49, name: '설리', price: 3150000 },
        { rank: 50, name: '바나나', price: 3110000 },
        { rank: 51, name: '지혜', price: 3050000 },
        { rank: 52, name: '초딩', price: 3050000 },
        { rank: 53, name: '무사', price: 3050000 },
        { rank: 54, name: '도쿄', price: 3000000 },
        { rank: 55, name: '공룡', price: 3000000 },
        { rank: 56, name: '스커', price: 3000000 },
        { rank: 57, name: '화랑', price: 3000000 },
        { rank: 58, name: '다빈', price: 2952664 },
        { rank: 59, name: '언니', price: 2950000 },
        { rank: 60, name: '카라', price: 2950000 },
        { rank: 61, name: '브이', price: 2950000 },
        { rank: 62, name: '파랑', price: 2850000 },
        { rank: 63, name: '엘사', price: 2800000 },
        { rank: 64, name: '보우마스터', price: 2800000 },
        { rank: 65, name: '창모', price: 2800000 },
        { rank: 66, name: '시간', price: 2800000 },
        { rank: 67, name: '주먹', price: 2750000 },
        { rank: 68, name: '깜찍', price: 2710000 },
        { rank: 69, name: '해원', price: 2700000 },
        { rank: 70, name: '수영', price: 2600000 },
        { rank: 71, name: '소금', price: 2600000 },
        { rank: 72, name: '다솜', price: 2600000 },
        { rank: 73, name: '추억', price: 2600000 },
        { rank: 74, name: '물개', price: 2550000 },
        { rank: 75, name: '지젤', price: 2500000 },
        { rank: 76, name: '유에', price: 2500000 },
        { rank: 77, name: '나노', price: 2500000 },
        { rank: 78, name: '미스', price: 2500000 },
        { rank: 79, name: '청순', price: 2450000 },
        { rank: 80, name: '냥이', price: 2450000 },
        { rank: 81, name: '박보영', price: 2400212 },
        { rank: 82, name: '글자', price: 2400000 },
        { rank: 83, name: '카카', price: 2400000 },
        { rank: 84, name: '패황', price: 2400000 },
        { rank: 85, name: '너구리', price: 2400000 },
        { rank: 86, name: '시드', price: 2400000 },
        { rank: 87, name: '히히', price: 2380000 },
        { rank: 88, name: '메소', price: 2355555 },
        { rank: 89, name: '멜론', price: 2350000 },
        { rank: 90, name: '어둠', price: 2350000 },
        { rank: 91, name: '피자', price: 2300000 },
        { rank: 92, name: '애정', price: 2300000 },
        { rank: 93, name: '유카', price: 2300000 },
        { rank: 94, name: '아이린', price: 2300000 },
        { rank: 95, name: '파이', price: 2250000 },
        { rank: 96, name: '재미', price: 2222223 },
        { rank: 97, name: '달콤', price: 2200000 },
        { rank: 98, name: '분노', price: 2200000 },
        { rank: 99, name: '버블', price: 2200000 },
        { rank: 100, name: '꼬리', price: 2180000 },
    ],
    4: [
        // 시즌4 TOP 100
        { rank: 1, name: '아이', price: 19100000 },
        { rank: 2, name: '해적', price: 11500000 },
        { rank: 3, name: '메리', price: 10000000 },
        { rank: 4, name: '시프', price: 10000000 },
        { rank: 5, name: '치즈', price: 10000000 },
        { rank: 6, name: '카리나', price: 9500000 },
        { rank: 7, name: '기사', price: 8700000 },
        { rank: 8, name: '다크', price: 8500000 },
        { rank: 9, name: '하니', price: 8500000 },
        { rank: 10, name: '루시', price: 8320000 },
        { rank: 11, name: '비비', price: 8100000 },
        { rank: 12, name: '소년', price: 8100000 },
        { rank: 13, name: '토끼', price: 8000000 },
        { rank: 14, name: '보스', price: 7600000 },
        { rank: 15, name: '캡틴', price: 7000000 },
        { rank: 16, name: '왕자', price: 6700000 },
        { rank: 17, name: '바람', price: 6600000 },
        { rank: 18, name: '자두', price: 6500000 },
        { rank: 19, name: '인형', price: 6200000 },
        { rank: 20, name: '데몬', price: 6200000 },
        { rank: 21, name: '벨라', price: 6150000 },
        { rank: 22, name: '꼬꼬', price: 6000000 },
        { rank: 23, name: '히히', price: 5900000 },
        { rank: 24, name: 'Love', price: 5900000 },
        { rank: 25, name: '요요', price: 5700000 },
        { rank: 26, name: '애기', price: 5700000 },
        { rank: 27, name: '바비', price: 5600000 },
        { rank: 28, name: '미래', price: 5350000 },
        { rank: 29, name: '용사', price: 5300000 },
        { rank: 30, name: '섀도어', price: 5300000 },
        { rank: 31, name: '귀신', price: 5300000 },
        { rank: 32, name: '호날두', price: 5200000 },
        { rank: 33, name: '허니', price: 5200000 },
        { rank: 34, name: '망고', price: 5050505 },
        { rank: 35, name: '채원', price: 5000801 },
        { rank: 36, name: '스키', price: 5000000 },
        { rank: 37, name: '가오', price: 5000000 },
        { rank: 38, name: '희망', price: 5000000 },
        { rank: 39, name: '사슴', price: 4850000 },
        { rank: 40, name: '홍련', price: 4750000 },
        { rank: 41, name: '애교', price: 4700000 },
        { rank: 42, name: '닌자', price: 4500000 },
        { rank: 43, name: '주인', price: 4500000 },
        { rank: 44, name: '파이', price: 4400000 },
        { rank: 45, name: '날개', price: 4149999 },
        { rank: 46, name: '단풍', price: 4100000 },
        { rank: 47, name: '추억', price: 4050000 },
        { rank: 48, name: '주디', price: 4050000 },
        { rank: 49, name: '레아', price: 4000000 },
        { rank: 50, name: '군주', price: 4000000 },
        { rank: 51, name: '여유', price: 4000000 },
        { rank: 52, name: '예나', price: 3950000 },
        { rank: 53, name: '아이린', price: 3950000 },
        { rank: 54, name: '고래', price: 3950000 },
        { rank: 55, name: 'kiss', price: 3833333 },
        { rank: 56, name: '돼지', price: 3850000 },
        { rank: 57, name: '자기', price: 3800000 },
        { rank: 58, name: '빅뱅', price: 3750000 },
        { rank: 59, name: '블루', price: 3750000 },
        { rank: 60, name: '앨리스', price: 3700000 },
        { rank: 61, name: '애정', price: 3700000 },
        { rank: 62, name: '뽀또', price: 3650000 },
        { rank: 63, name: '악동', price: 3600000 },
        { rank: 64, name: '로아', price: 3550000 },
        { rank: 65, name: '악어', price: 3500000 },
        { rank: 66, name: '우이', price: 3500000 },
        { rank: 67, name: '리프', price: 3500000 },
        { rank: 68, name: '누리', price: 3500000 },
        { rank: 69, name: '나무', price: 3500000 },
        { rank: 70, name: '데이', price: 3500000 },
        { rank: 71, name: '네코', price: 3500000 },
        { rank: 72, name: '리오', price: 3450000 },
        { rank: 73, name: '판다', price: 3400000 },
        { rank: 74, name: '죠스', price: 3400000 },
        { rank: 75, name: '바드', price: 3350000 },
        { rank: 76, name: '윤하', price: 3300000 },
        { rank: 77, name: '니아', price: 3300000 },
        { rank: 78, name: '오빠', price: 3300000 },
        { rank: 79, name: '선녀', price: 3250000 },
        { rank: 80, name: '보미', price: 3250000 },
        { rank: 81, name: '구찌', price: 3200000 },
        { rank: 82, name: '달콤', price: 3200000 },
        { rank: 83, name: '미코', price: 3200000 },
        { rank: 84, name: '청하', price: 3150000 },
        { rank: 85, name: '폭탄', price: 3150000 },
        { rank: 86, name: '무무', price: 3100000 },
        { rank: 87, name: '하마', price: 3100000 },
        { rank: 88, name: '괴물', price: 3100000 },
        { rank: 89, name: '고수', price: 3050000 },
        { rank: 90, name: '꾸꾸', price: 3050000 },
        { rank: 91, name: '아영', price: 3000000 },
        { rank: 92, name: '시드', price: 3000000 },
        { rank: 93, name: '이수', price: 3000000 },
        { rank: 94, name: '안개', price: 3000000 },
        { rank: 95, name: '마신', price: 3000000 },
        { rank: 96, name: '채아', price: 3000000 },
        { rank: 97, name: '하하', price: 3000000 },
        { rank: 98, name: '설리', price: 3000000 },
        { rank: 99, name: '미스', price: 3000000 },
        { rank: 100, name: '니니', price: 2951818 },
    ],
    5: [
        // 시즌5 TOP 100
        { rank: 1, name: '여름', price: 18000000 },
        { rank: 2, name: '아크', price: 15500000 },
        { rank: 3, name: '토끼', price: 11000000 },
        { rank: 4, name: '늑대', price: 9000000 },
        { rank: 5, name: '보스', price: 8500000 },
        { rank: 6, name: '해피', price: 6800000 },
        { rank: 7, name: '하니', price: 6300000 },
        { rank: 8, name: '수아', price: 5600000 },
        { rank: 9, name: '팔라딘', price: 5500000 },
        { rank: 10, name: '추억', price: 5100000 },
        { rank: 11, name: '미로', price: 5000000 },
        { rank: 12, name: '귀신', price: 5000000 },
        { rank: 13, name: '구구', price: 4250000 },
        { rank: 14, name: '로로', price: 4100000 },
        { rank: 15, name: '레제', price: 4000000 },
        { rank: 16, name: '데이', price: 3945678 },
        { rank: 17, name: '소주', price: 3800000 },
        { rank: 18, name: '여보', price: 3780000 },
        { rank: 19, name: '아영', price: 3600000 },
        { rank: 20, name: '소울', price: 3450000 },
        { rank: 21, name: '봄비', price: 3400000 },
        { rank: 22, name: '설리', price: 3250000 },
        { rank: 23, name: '마키마', price: 3200000 },
        { rank: 24, name: '연기', price: 3150000 },
        { rank: 25, name: '심쿵', price: 3150000 },
        { rank: 26, name: '라임', price: 3100000 },
        { rank: 27, name: '키드', price: 3100000 },
        { rank: 28, name: '채영', price: 3000000 },
        { rank: 29, name: '호빵', price: 3000000 },
        { rank: 30, name: '고수', price: 3000000 },
        { rank: 31, name: '지성', price: 3000000 },
        { rank: 32, name: '파이리', price: 3000000 },
        { rank: 33, name: '시간', price: 2950000 },
        { rank: 34, name: '연화', price: 2950000 },
        { rank: 35, name: '믹스', price: 2900000 },
        { rank: 36, name: '펀치', price: 2900000 },
        { rank: 37, name: '비숑', price: 2800000 },
        { rank: 38, name: '보이', price: 2800000 },
        { rank: 39, name: '포이', price: 2750000 },
        { rank: 40, name: '노예', price: 2700000 },
        { rank: 41, name: '소연', price: 2700000 },
        { rank: 42, name: '피스', price: 2650000 },
        { rank: 43, name: '보우', price: 2650000 },
        { rank: 44, name: '퍼즐', price: 2600000 },
        { rank: 45, name: '고래', price: 2600000 },
        { rank: 46, name: '큐브', price: 2600000 },
        { rank: 47, name: '기사', price: 2590000 },
        { rank: 48, name: '저주', price: 2500000 },
        { rank: 49, name: '샤이', price: 2500000 },
        { rank: 50, name: '달콤', price: 2500000 },
        { rank: 51, name: '판다', price: 2450000 },
        { rank: 52, name: '섀도어', price: 2400000 },
        { rank: 53, name: '순결', price: 2300000 },
        { rank: 54, name: '태풍', price: 2300000 },
        { rank: 55, name: '라이', price: 2300000 },
        { rank: 56, name: '박보영', price: 2260000 },
        { rank: 57, name: '체스', price: 2250000 },
        { rank: 58, name: '버블', price: 2250000 },
        { rank: 59, name: '세로', price: 2230000 },
        { rank: 60, name: '호랑', price: 2207777 },
        { rank: 61, name: '알파', price: 2200000 },
        { rank: 62, name: '피구', price: 2200000 },
        { rank: 63, name: '사유', price: 2200000 },
        { rank: 64, name: '형님', price: 2161111 },
        { rank: 65, name: '인경', price: 2150000 },
        { rank: 66, name: '보미', price: 2150000 },
        { rank: 67, name: '달이', price: 2150000 },
        { rank: 68, name: '사장', price: 2150000 },
        { rank: 69, name: '레아', price: 2100000 },
        { rank: 70, name: '서영', price: 2100000 },
        { rank: 71, name: '전기', price: 2100000 },
        { rank: 72, name: '수피', price: 2050000 },
        { rank: 73, name: '수인', price: 2000000 },
        { rank: 74, name: '블래스터', price: 2000000 },
        { rank: 75, name: '멜로디', price: 2000000 },
        { rank: 76, name: '주영', price: 2000000 },
        { rank: 77, name: '감자', price: 2000000 },
        { rank: 78, name: '파피', price: 1950000 },
        { rank: 79, name: '투투', price: 1900000 },
        { rank: 80, name: '스우', price: 1900000 },
        { rank: 81, name: '자연', price: 1900000 },
        { rank: 82, name: '코비', price: 1900000 },
        { rank: 83, name: '제비', price: 1850000 },
        { rank: 84, name: '로또', price: 1808585 },
        { rank: 85, name: '꿀밤', price: 1750000 },
        { rank: 86, name: '소영', price: 1700000 },
        { rank: 87, name: '레어', price: 1700000 },
        { rank: 88, name: '콩떡', price: 1700000 },
        { rank: 89, name: '재현', price: 1650000 },
        { rank: 90, name: '진구', price: 1650000 },
        { rank: 91, name: '쿠미', price: 1650000 },
        { rank: 92, name: '모아', price: 1650000 },
        { rank: 93, name: '렌렌', price: 1650000 },
        { rank: 94, name: '첫눈', price: 1600000 },
        { rank: 95, name: '록시', price: 1600000 },
        { rank: 96, name: '쯔위', price: 1600000 },
        { rank: 97, name: '소니', price: 1600000 },
        { rank: 98, name: '현석', price: 1600000 },
        { rank: 99, name: '장인', price: 1600000 },
        { rank: 100, name: '찰떡', price: 1550000 },
    ],
};

interface TopRankingTableProps {
    className?: string;
}

export default function TopRankingTable({ className = '' }: TopRankingTableProps) {
    const [selectedSeason, setSelectedSeason] = useState<string>('전체');
    const [searchQuery, setSearchQuery] = useState<string>('');

    // 현재 선택된 시즌 데이터
    const allData = selectedSeason === '전체'
        ? Object.entries(seasonData).flatMap(([season, data]) =>
            data.map(item => ({ ...item, season }))
        )
        : (seasonData[selectedSeason] || []).map(item => ({ ...item, season: selectedSeason }));

    // 검색 필터링
    const currentData = searchQuery.trim()
        ? allData.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase().trim()))
        : allData;

    // 가격 포맷 함수
    const formatPrice = (price: number) => {
        if (price >= 10000000) {
            const value = price / 10000000;
            return `${value.toFixed(value % 1 === 0 ? 0 : 2)}천만`;
        } else if (price >= 1000000) {
            const value = price / 10000;
            return `${value.toFixed(0)}만`;
        }
        return price.toLocaleString();
    };

    // 순위별 색상
    const getRankColor = (rank: number) => {
        if (rank === 1) return 'text-yellow-400 font-black';
        if (rank === 2) return 'text-slate-300 font-bold';
        if (rank === 3) return 'text-orange-400 font-bold';
        if (rank <= 10) return 'text-blue-400 font-semibold';
        if (rank <= 20) return 'text-purple-400';
        if (rank <= 50) return 'text-green-400';
        return 'text-slate-400';
    };

    // 시즌별 설명
    const getSeasonNote = (season: string) => {
        const notes: { [key: string]: string } = {
            '전체': '모든 시즌의 데이터를 통합하여 보여줍니다. 검색 기능으로 원하는 닉네임을 찾아보세요!',
            '1': '뉴네임 옥션 최초 시즌으로, 가장 높은 낙찰가를 기록했습니다.',
            '2': '전반적으로 가격이 안정화된 시즌입니다.',
            '2.5': '운영자가 직접 판매한 특별 시즌입니다.',
            '3': '감성 단어와 동물 닉네임의 인기가 상승한 시즌입니다.',
            '4': '역대 2위 최고가를 기록하며 뉴네임 옥션의 인기가 재상승했습니다.',
            '5': '계절/감성 단어의 가치가 재평가받은 시즌입니다.',
        };
        return notes[season] || '';
    };

    return (
        <section className={`mb-12 ${className}`}>
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
                <List className="w-8 h-8 text-indigo-400" />
                시즌별 TOP 100 닉네임 완전 정리
            </h2>

            <p className="text-slate-300 leading-relaxed mb-6">
                시즌별로 <strong className="text-yellow-400">가장 인기있었던 닉네임 100개</strong>를 순위와 낙찰가와 함께 확인하세요.
            </p>

            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="닉네임 검색... (예: 라라, 토끼, 메리)"
                        className="w-full px-4 py-3 pl-12 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    />
                    <svg
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
                {searchQuery && (
                    <p className="text-sm text-slate-400 mt-2">
                        검색 결과: <span className="text-white font-bold">{currentData.length}</span>개의 닉네임 발견
                    </p>
                )}
            </div>

            {/* Season Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
                {['전체', '1', '2', '2.5', '3', '4', '5'].map((season) => (
                    <button
                        key={season}
                        onClick={() => setSelectedSeason(season)}
                        className={`px-6 py-3 rounded-lg font-bold transition-all ${selectedSeason === season
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                            : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-white'
                            }`}
                    >
                        {season === '전체' ? '🌟 전체' : `시즌 ${season}`}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="bg-slate-800/30 border border-slate-700 rounded-xl overflow-hidden">
                {/* Table Header */}
                <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-b border-slate-700">
                    <div className="grid grid-cols-12 gap-4 p-4 font-bold text-white">
                        <div className="col-span-2 text-center">순위</div>
                        <div className="col-span-6">닉네임</div>
                        <div className="col-span-4 text-right">낙찰가</div>
                    </div>
                </div>

                {/* Table Body - Scrollable */}
                <div className="max-h-[600px] overflow-y-auto">
                    {currentData.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <svg className="w-16 h-16 text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-slate-400 text-lg font-semibold">검색 결과가 없습니다</p>
                            <p className="text-slate-500 text-sm mt-2">다른 키워드로 검색해보세요</p>
                        </div>
                    ) : (
                        currentData.map((item) => (
                            <div
                                key={`${selectedSeason}-${item.rank}-${item.name}`}
                                className="grid grid-cols-12 gap-4 p-4 border-b border-slate-800/50 hover:bg-slate-700/30 transition-colors"
                            >
                                <div className={`col-span-2 text-center font-bold ${getRankColor(item.rank)}`}>
                                    {item.rank === 1 && '👑 '}
                                    {item.rank === 2 && '🥈 '}
                                    {item.rank === 3 && '🥉 '}
                                    #{item.rank}
                                </div>
                                <div className="col-span-6 text-white font-semibold flex items-center gap-2">
                                    <span>{item.name}</span>
                                    {selectedSeason === '전체' && (
                                        <span className={`px-2 py-0.5 text-xs rounded ${item.season === '1' ? 'bg-yellow-500/20 text-yellow-300' :
                                            item.season === '2' ? 'bg-blue-500/20 text-blue-300' :
                                                item.season === '2.5' ? 'bg-cyan-500/20 text-cyan-300' :
                                                    item.season === '3' ? 'bg-pink-500/20 text-pink-300' :
                                                        item.season === '4' ? 'bg-purple-500/20 text-purple-300' :
                                                            'bg-green-500/20 text-green-300'
                                            }`}>
                                            S{item.season}
                                        </span>
                                    )}
                                </div>
                                <div className="col-span-4 text-right">
                                    <span className={`font-bold ${item.price >= 10000000 ? 'text-yellow-400' :
                                        item.price >= 7000000 ? 'text-blue-400' :
                                            item.price >= 3000000 ? 'text-green-400' :
                                                'text-slate-300'
                                        }`}>
                                        {formatPrice(item.price)}
                                    </span>
                                    <span className="text-slate-500 text-sm ml-2">
                                        ({item.price.toLocaleString()}메소)
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer Note */}
                <div className="bg-slate-900/50 border-t border-slate-700 p-4">
                    <p className="text-slate-400 text-sm mb-0">
                        💡 <strong className="text-white">시즌{selectedSeason}</strong>: {getSeasonNote(selectedSeason)}
                    </p>
                </div>
            </div>
        </section>
    );
}
