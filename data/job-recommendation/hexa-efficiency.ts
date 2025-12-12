/**
 * 전직업 헥사강화 효율표
 * 출처: https://www.inven.co.kr/board/maple/2304/46416
 * 
 * 각 조각 단위별 보정치(%)와 필요한 조각 개수 정보
 * 단위: 500, 1000, 2000, 5000, 10000, 15000, 20000 조각
 */

export interface HexaEfficiencyLevel {
    correction: number; // 보정치 (%)
    fragments: number;  // 필요 조각 개수
}

export interface HexaEfficiency {
    job: string;
    level500: HexaEfficiencyLevel;
    level1000: HexaEfficiencyLevel;
    level2000: HexaEfficiencyLevel;
    level5000: HexaEfficiencyLevel;
    level10000: HexaEfficiencyLevel;
    level15000: HexaEfficiencyLevel;
    level20000: HexaEfficiencyLevel;
}

export const HEXA_EFFICIENCY_DATA: HexaEfficiency[] = [
    {
        job: '아크메이지(썬,콜)',
        level500: { correction: 67.27, fragments: 547 },
        level1000: { correction: 70.37, fragments: 1048 },
        level2000: { correction: 74.08, fragments: 2103 },
        level5000: { correction: 80.29, fragments: 4992 },
        level10000: { correction: 87.60, fragments: 10202 },
        level15000: { correction: 92.10, fragments: 15740 },
        level20000: { correction: 95.14, fragments: 20960 }
    },
    {
        job: '윈드브레이커',
        level500: { correction: 66.68, fragments: 515 },
        level1000: { correction: 69.59, fragments: 1023 },
        level2000: { correction: 73.98, fragments: 2188 },
        level5000: { correction: 80.72, fragments: 5224 },
        level10000: { correction: 87.70, fragments: 10364 },
        level15000: { correction: 92.82, fragments: 15710 },
        level20000: { correction: 95.53, fragments: 20493 }
    },
    {
        job: '은월',
        level500: { correction: 66.33, fragments: 510 },
        level1000: { correction: 69.70, fragments: 1026 },
        level2000: { correction: 73.88, fragments: 2098 },
        level5000: { correction: 81.03, fragments: 5171 },
        level10000: { correction: 88.98, fragments: 10497 },
        level15000: { correction: 92.39, fragments: 14865 },
        level20000: { correction: 95.73, fragments: 20838 }
    },
    {
        job: '배틀메이지',
        level500: { correction: 67.58, fragments: 498 },
        level1000: { correction: 70.70, fragments: 1042 },
        level2000: { correction: 73.85, fragments: 2123 },
        level5000: { correction: 79.76, fragments: 5219 },
        level10000: { correction: 85.11, fragments: 9636 },
        level15000: { correction: 90.47, fragments: 15565 },
        level20000: { correction: 93.98, fragments: 20263 }
    },
    {
        job: '키네시스',
        level500: { correction: 66.47, fragments: 515 },
        level1000: { correction: 69.66, fragments: 996 },
        level2000: { correction: 73.77, fragments: 2028 },
        level5000: { correction: 81.31, fragments: 5226 },
        level10000: { correction: 88.45, fragments: 10305 },
        level15000: { correction: 92.52, fragments: 14897 },
        level20000: { correction: 96.33, fragments: 20401 }
    },
    {
        job: '캡틴',
        level500: { correction: 66.12, fragments: 511 },
        level1000: { correction: 69.53, fragments: 1019 },
        level2000: { correction: 73.60, fragments: 2053 },
        level5000: { correction: 81.32, fragments: 5221 },
        level10000: { correction: 89.25, fragments: 10482 },
        level15000: { correction: 93.28, fragments: 15737 },
        level20000: { correction: 95.59, fragments: 19920 }
    },
    {
        job: '아크',
        level500: { correction: 66.38, fragments: 503 },
        level1000: { correction: 69.70, fragments: 1027 },
        level2000: { correction: 73.15, fragments: 1919 },
        level5000: { correction: 81.85, fragments: 5201 },
        level10000: { correction: 90.01, fragments: 10409 },
        level15000: { correction: 94.36, fragments: 15737 },
        level20000: { correction: 96.36, fragments: 19852 }
    },
    {
        job: '메카닉',
        level500: { correction: 65.42, fragments: 487 },
        level1000: { correction: 69.00, fragments: 1038 },
        level2000: { correction: 73.04, fragments: 2086 },
        level5000: { correction: 80.01, fragments: 5186 },
        level10000: { correction: 86.93, fragments: 10398 },
        level15000: { correction: 90.56, fragments: 14285 },
        level20000: { correction: 94.49, fragments: 19855 }
    },
    {
        job: '렌',
        level500: { correction: 65.32, fragments: 530 },
        level1000: { correction: 68.84, fragments: 1046 },
        level2000: { correction: 72.86, fragments: 2080 },
        level5000: { correction: 80.44, fragments: 5278 },
        level10000: { correction: 88.01, fragments: 10412 },
        level15000: { correction: 91.51, fragments: 14475 },
        level20000: { correction: 95.56, fragments: 20995 }
    },
    {
        job: '제로',
        level500: { correction: 63.55, fragments: 521 },
        level1000: { correction: 67.50, fragments: 1030 },
        level2000: { correction: 72.60, fragments: 1956 },
        level5000: { correction: 83.47, fragments: 5210 },
        level10000: { correction: 91.54, fragments: 10306 },
        level15000: { correction: 95.26, fragments: 15653 },
        level20000: { correction: 97.41, fragments: 20785 }
    },
    {
        job: '블래스터',
        level500: { correction: 64.88, fragments: 505 },
        level1000: { correction: 68.48, fragments: 1039 },
        level2000: { correction: 72.41, fragments: 2048 },
        level5000: { correction: 80.13, fragments: 5216 },
        level10000: { correction: 87.69, fragments: 10177 },
        level15000: { correction: 92.42, fragments: 14980 },
        level20000: { correction: 96.14, fragments: 20985 }
    },
    {
        job: '나이트워커',
        level500: { correction: 64.30, fragments: 493 },
        level1000: { correction: 68.62, fragments: 1192 },
        level2000: { correction: 72.35, fragments: 2099 },
        level5000: { correction: 79.92, fragments: 5126 },
        level10000: { correction: 87.15, fragments: 10456 },
        level15000: { correction: 91.49, fragments: 15617 },
        level20000: { correction: 93.85, fragments: 19154 }
    },
    {
        job: '팬텀',
        level500: { correction: 64.83, fragments: 489 },
        level1000: { correction: 68.34, fragments: 1038 },
        level2000: { correction: 72.22, fragments: 2164 },
        level5000: { correction: 79.00, fragments: 5237 },
        level10000: { correction: 85.82, fragments: 10142 },
        level15000: { correction: 90.65, fragments: 15320 },
        level20000: { correction: 94.33, fragments: 20300 }
    },
    {
        job: '섀도어',
        level500: { correction: 62.92, fragments: 503 },
        level1000: { correction: 67.11, fragments: 1043 },
        level2000: { correction: 72.22, fragments: 2077 },
        level5000: { correction: 81.13, fragments: 5186 },
        level10000: { correction: 89.23, fragments: 10427 },
        level15000: { correction: 92.49, fragments: 14305 },
        level20000: { correction: 96.26, fragments: 20082 }
    },
    {
        job: '아크메이지(불,독)',
        level500: { correction: 63.83, fragments: 497 },
        level1000: { correction: 67.72, fragments: 1036 },
        level2000: { correction: 71.98, fragments: 2138 },
        level5000: { correction: 79.66, fragments: 5271 },
        level10000: { correction: 87.41, fragments: 10154 },
        level15000: { correction: 91.46, fragments: 14632 },
        level20000: { correction: 95.78, fragments: 20960 }
    },
    {
        job: '카데나',
        level500: { correction: 63.16, fragments: 521 },
        level1000: { correction: 66.80, fragments: 1041 },
        level2000: { correction: 71.51, fragments: 2087 },
        level5000: { correction: 80.14, fragments: 5133 },
        level10000: { correction: 88.40, fragments: 10300 },
        level15000: { correction: 92.23, fragments: 15023 },
        level20000: { correction: 95.51, fragments: 20725 }
    },
    {
        job: '히어로',
        level500: { correction: 61.73, fragments: 535 },
        level1000: { correction: 65.33, fragments: 996 },
        level2000: { correction: 71.19, fragments: 2145 },
        level5000: { correction: 80.33, fragments: 5226 },
        level10000: { correction: 88.74, fragments: 10480 },
        level15000: { correction: 93.20, fragments: 15497 },
        level20000: { correction: 96.34, fragments: 19977 }
    },
    {
        job: '데몬슬레이어',
        level500: { correction: 63.40, fragments: 504 },
        level1000: { correction: 66.60, fragments: 1027 },
        level2000: { correction: 70.63, fragments: 2084 },
        level5000: { correction: 77.38, fragments: 4952 },
        level10000: { correction: 85.78, fragments: 10415 },
        level15000: { correction: 90.85, fragments: 15403 },
        level20000: { correction: 94.60, fragments: 20480 }
    },
    {
        job: '데몬어벤져',
        level500: { correction: 61.63, fragments: 495 },
        level1000: { correction: 65.98, fragments: 1038 },
        level2000: { correction: 70.31, fragments: 2072 },
        level5000: { correction: 78.39, fragments: 5141 },
        level10000: { correction: 86.78, fragments: 10332 },
        level15000: { correction: 91.92, fragments: 15667 },
        level20000: { correction: 95.62, fragments: 20895 }
    },
    {
        job: '카이저',
        level500: { correction: 62.26, fragments: 517 },
        level1000: { correction: 65.64, fragments: 1003 },
        level2000: { correction: 70.22, fragments: 2038 },
        level5000: { correction: 78.53, fragments: 5184 },
        level10000: { correction: 86.85, fragments: 10407 },
        level15000: { correction: 92.54, fragments: 15538 },
        level20000: { correction: 95.11, fragments: 19768 }
    },
    {
        job: '플레임위자드',
        level500: { correction: 62.60, fragments: 487 },
        level1000: { correction: 66.51, fragments: 1030 },
        level2000: { correction: 70.17, fragments: 1918 },
        level5000: { correction: 78.02, fragments: 5231 },
        level10000: { correction: 85.38, fragments: 9860 },
        level15000: { correction: 90.31, fragments: 15118 },
        level20000: { correction: 94.27, fragments: 20545 }
    },
    {
        job: '루미너스',
        level500: { correction: 61.25, fragments: 512 },
        level1000: { correction: 64.66, fragments: 970 },
        level2000: { correction: 70.11, fragments: 2061 },
        level5000: { correction: 78.64, fragments: 5226 },
        level10000: { correction: 86.37, fragments: 10370 },
        level15000: { correction: 91.45, fragments: 15453 },
        level20000: { correction: 95.20, fragments: 20838 }
    },
    {
        job: '신궁',
        level500: { correction: 62.35, fragments: 522 },
        level1000: { correction: 65.61, fragments: 1032 },
        level2000: { correction: 70.10, fragments: 2078 },
        level5000: { correction: 77.32, fragments: 5015 },
        level10000: { correction: 86.30, fragments: 10431 },
        level15000: { correction: 92.15, fragments: 15692 },
        level20000: { correction: 95.44, fragments: 20900 }
    },
    {
        job: '제논',
        level500: { correction: 62.76, fragments: 531 },
        level1000: { correction: 65.99, fragments: 1027 },
        level2000: { correction: 70.07, fragments: 2095 },
        level5000: { correction: 77.09, fragments: 5238 },
        level10000: { correction: 84.88, fragments: 10487 },
        level15000: { correction: 90.01, fragments: 15712 },
        level20000: { correction: 93.21, fragments: 19617 }
    },
    {
        job: '와일드헌터',
        level500: { correction: 62.40, fragments: 516 },
        level1000: { correction: 66.00, fragments: 1047 },
        level2000: { correction: 70.05, fragments: 1943 },
        level5000: { correction: 78.95, fragments: 5203 },
        level10000: { correction: 87.08, fragments: 10125 },
        level15000: { correction: 91.99, fragments: 15541 },
        level20000: { correction: 94.99, fragments: 20827 }
    },
    {
        job: '일리움',
        level500: { correction: 59.42, fragments: 486 },
        level1000: { correction: 64.24, fragments: 1046 },
        level2000: { correction: 70.04, fragments: 2095 },
        level5000: { correction: 80.49, fragments: 5243 },
        level10000: { correction: 89.85, fragments: 10424 },
        level15000: { correction: 93.49, fragments: 14916 },
        level20000: { correction: 96.22, fragments: 19359 }
    },
    {
        job: '듀얼블레이드',
        level500: { correction: 62.96, fragments: 526 },
        level1000: { correction: 66.13, fragments: 990 },
        level2000: { correction: 69.78, fragments: 1975 },
        level5000: { correction: 77.40, fragments: 5117 },
        level10000: { correction: 85.31, fragments: 10497 },
        level15000: { correction: 89.46, fragments: 14573 },
        level20000: { correction: 93.83, fragments: 19805 }
    },
    {
        job: '아델',
        level500: { correction: 61.02, fragments: 508 },
        level1000: { correction: 64.83, fragments: 1036 },
        level2000: { correction: 69.74, fragments: 2133 },
        level5000: { correction: 78.12, fragments: 5243 },
        level10000: { correction: 86.85, fragments: 10476 },
        level15000: { correction: 91.57, fragments: 15382 },
        level20000: { correction: 94.96, fragments: 20282 }
    },
    {
        job: '소울마스터',
        level500: { correction: 61.41, fragments: 539 },
        level1000: { correction: 64.90, fragments: 1046 },
        level2000: { correction: 69.50, fragments: 2085 },
        level5000: { correction: 78.05, fragments: 5226 },
        level10000: { correction: 85.59, fragments: 9891 },
        level15000: { correction: 91.89, fragments: 15669 },
        level20000: { correction: 95.20, fragments: 19970 }
    },
    {
        job: '다크나이트',
        level500: { correction: 60.86, fragments: 500 },
        level1000: { correction: 64.97, fragments: 1039 },
        level2000: { correction: 69.42, fragments: 2061 },
        level5000: { correction: 77.83, fragments: 5184 },
        level10000: { correction: 85.55, fragments: 9731 },
        level15000: { correction: 92.12, fragments: 15698 },
        level20000: { correction: 94.86, fragments: 19853 }
    },
    {
        job: '보우마스터',
        level500: { correction: 60.81, fragments: 510 },
        level1000: { correction: 64.89, fragments: 1043 },
        level2000: { correction: 69.39, fragments: 2143 },
        level5000: { correction: 76.92, fragments: 5019 },
        level10000: { correction: 86.13, fragments: 10482 },
        level15000: { correction: 90.97, fragments: 15740 },
        level20000: { correction: 94.57, fragments: 20860 }
    },
    {
        job: '엔젤릭버스터',
        level500: { correction: 60.32, fragments: 524 },
        level1000: { correction: 64.26, fragments: 1047 },
        level2000: { correction: 69.37, fragments: 2068 },
        level5000: { correction: 79.24, fragments: 5183 },
        level10000: { correction: 88.59, fragments: 10340 },
        level15000: { correction: 92.80, fragments: 15455 },
        level20000: { correction: 95.01, fragments: 19270 }
    },
    {
        job: '아란',
        level500: { correction: 59.95, fragments: 500 },
        level1000: { correction: 64.06, fragments: 1011 },
        level2000: { correction: 69.10, fragments: 2068 },
        level5000: { correction: 77.12, fragments: 4941 },
        level10000: { correction: 87.04, fragments: 10467 },
        level15000: { correction: 91.58, fragments: 15598 },
        level20000: { correction: 95.13, fragments: 20845 }
    },
    {
        job: '호영',
        level500: { correction: 60.69, fragments: 506 },
        level1000: { correction: 63.75, fragments: 989 },
        level2000: { correction: 69.07, fragments: 2092 },
        level5000: { correction: 77.20, fragments: 4936 },
        level10000: { correction: 87.23, fragments: 10496 },
        level15000: { correction: 92.53, fragments: 15585 },
        level20000: { correction: 95.50, fragments: 20520 }
    },
    {
        job: '카인',
        level500: { correction: 59.68, fragments: 496 },
        level1000: { correction: 63.85, fragments: 1005 },
        level2000: { correction: 68.96, fragments: 2088 },
        level5000: { correction: 78.77, fragments: 5218 },
        level10000: { correction: 87.97, fragments: 10186 },
        level15000: { correction: 92.72, fragments: 15120 },
        level20000: { correction: 96.35, fragments: 20595 }
    },
    {
        job: '칼리',
        level500: { correction: 60.46, fragments: 513 },
        level1000: { correction: 63.91, fragments: 995 },
        level2000: { correction: 68.88, fragments: 2061 },
        level5000: { correction: 77.66, fragments: 5146 },
        level10000: { correction: 85.29, fragments: 10002 },
        level15000: { correction: 89.59, fragments: 14400 },
        level20000: { correction: 94.19, fragments: 20988 }
    },
    {
        job: '나이트로드',
        level500: { correction: 61.41, fragments: 545 },
        level1000: { correction: 64.62, fragments: 978 },
        level2000: { correction: 68.72, fragments: 1918 },
        level5000: { correction: 76.74, fragments: 5046 },
        level10000: { correction: 85.41, fragments: 10260 },
        level15000: { correction: 89.99, fragments: 14961 },
        level20000: { correction: 93.52, fragments: 19580 }
    },
    {
        job: '패스파인더',
        level500: { correction: 60.69, fragments: 521 },
        level1000: { correction: 64.94, fragments: 1203 },
        level2000: { correction: 68.65, fragments: 2052 },
        level5000: { correction: 77.49, fragments: 5246 },
        level10000: { correction: 86.55, fragments: 10289 },
        level15000: { correction: 91.62, fragments: 15701 },
        level20000: { correction: 94.27, fragments: 19248 }
    },
    {
        job: '비숍',
        level500: { correction: 60.50, fragments: 532 },
        level1000: { correction: 64.74, fragments: 1239 },
        level2000: { correction: 68.43, fragments: 2083 },
        level5000: { correction: 77.02, fragments: 5243 },
        level10000: { correction: 84.89, fragments: 10178 },
        level15000: { correction: 90.98, fragments: 15744 },
        level20000: { correction: 94.86, fragments: 20545 }
    },
    {
        job: '팔라딘',
        level500: { correction: 60.02, fragments: 500 },
        level1000: { correction: 63.60, fragments: 1057 },
        level2000: { correction: 68.20, fragments: 2028 },
        level5000: { correction: 76.49, fragments: 5207 },
        level10000: { correction: 84.68, fragments: 10411 },
        level15000: { correction: 89.70, fragments: 15043 },
        level20000: { correction: 93.65, fragments: 19988 }
    },
    {
        job: '메르세데스',
        level500: { correction: 58.63, fragments: 510 },
        level1000: { correction: 62.05, fragments: 980 },
        level2000: { correction: 67.45, fragments: 2189 },
        level5000: { correction: 75.16, fragments: 5048 },
        level10000: { correction: 84.86, fragments: 10467 },
        level15000: { correction: 90.35, fragments: 15730 },
        level20000: { correction: 94.31, fragments: 20935 }
    },
    {
        job: '라라',
        level500: { correction: 58.16, fragments: 501 },
        level1000: { correction: 61.91, fragments: 993 },
        level2000: { correction: 67.32, fragments: 2008 },
        level5000: { correction: 76.96, fragments: 5131 },
        level10000: { correction: 86.68, fragments: 10437 },
        level15000: { correction: 91.47, fragments: 15738 },
        level20000: { correction: 94.05, fragments: 19765 }
    },
    {
        job: '바이퍼',
        level500: { correction: 58.35, fragments: 510 },
        level1000: { correction: 62.45, fragments: 1022 },
        level2000: { correction: 67.25, fragments: 2046 },
        level5000: { correction: 76.86, fragments: 5291 },
        level10000: { correction: 86.17, fragments: 10252 },
        level15000: { correction: 92.01, fragments: 15522 },
        level20000: { correction: 94.93, fragments: 19785 }
    },
    {
        job: '캐논슈터',
        level500: { correction: 58.72, fragments: 510 },
        level1000: { correction: 62.57, fragments: 1049 },
        level2000: { correction: 67.03, fragments: 1971 },
        level5000: { correction: 76.95, fragments: 5218 },
        level10000: { correction: 86.47, fragments: 10458 },
        level15000: { correction: 91.92, fragments: 15644 },
        level20000: { correction: 95.13, fragments: 20735 }
    },
    {
        job: '미하일',
        level500: { correction: 58.83, fragments: 516 },
        level1000: { correction: 62.45, fragments: 1049 },
        level2000: { correction: 66.87, fragments: 2092 },
        level5000: { correction: 74.51, fragments: 5143 },
        level10000: { correction: 82.34, fragments: 9974 },
        level15000: { correction: 89.33, fragments: 15705 },
        level20000: { correction: 94.09, fragments: 20869 }
    },
    {
        job: '스트라이커',
        level500: { correction: 57.22, fragments: 516 },
        level1000: { correction: 60.80, fragments: 964 },
        level2000: { correction: 66.32, fragments: 2068 },
        level5000: { correction: 75.19, fragments: 5011 },
        level10000: { correction: 85.70, fragments: 10444 },
        level15000: { correction: 91.40, fragments: 15711 },
        level20000: { correction: 94.13, fragments: 19978 }
    },
    {
        job: '에반',
        level500: { correction: 55.01, fragments: 510 },
        level1000: { correction: 58.75, fragments: 1043 },
        level2000: { correction: 64.00, fragments: 2333 },
        level5000: { correction: 72.38, fragments: 5213 },
        level10000: { correction: 81.38, fragments: 9856 },
        level15000: { correction: 90.07, fragments: 15744 },
        level20000: { correction: 94.23, fragments: 20754 }
    }
];

/**
 * 직업명으로 헥사 효율 정보 조회
 */
export function getHexaEfficiencyByJob(jobName: string): HexaEfficiency | undefined {
    return HEXA_EFFICIENCY_DATA.find(item => item.job === jobName);
}

/**
 * 특정 조각 레벨에서의 효율 점수 계산
 * 보정치 기준으로 점수 계산 (0-100점)
 */
export function getHexaEfficiencyScore(jobName: string, level: keyof Omit<HexaEfficiency, 'job'>): number {
    const efficiency = getHexaEfficiencyByJob(jobName);
    if (!efficiency) return 0;

    const correction = efficiency[level].correction;
    // 보정치를 점수로 변환 (보정치가 높을수록 효율이 좋음)
    return correction;
}

/**
 * 평균 헥사 효율 계산 (모든 레벨의 평균 보정치)
 */
export function getAverageHexaEfficiency(jobName: string): number {
    const efficiency = getHexaEfficiencyByJob(jobName);
    if (!efficiency) return 0;

    const corrections = [
        efficiency.level500.correction,
        efficiency.level1000.correction,
        efficiency.level2000.correction,
        efficiency.level5000.correction,
        efficiency.level10000.correction,
        efficiency.level15000.correction,
        efficiency.level20000.correction
    ];

    return corrections.reduce((sum, val) => sum + val, 0) / corrections.length;
}

/**
 * 헥사 효율 순위별 정렬 (특정 레벨 기준)
 */
export function sortJobsByHexaEfficiency(level: keyof Omit<HexaEfficiency, 'job'>): HexaEfficiency[] {
    return [...HEXA_EFFICIENCY_DATA].sort((a, b) =>
        b[level].correction - a[level].correction
    );
}
