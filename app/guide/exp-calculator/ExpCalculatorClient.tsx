'use client';

import Link from 'next/link';
import { ArrowLeft, Calculator, TrendingUp, Clock, Download, Info, Zap, Calendar } from 'lucide-react';
import { useState, useMemo } from 'react';
import * as XLSX from 'xlsx';
import { HUNTING_EXP_DATA, getHuntingDataForLevel, formatHuntingTime } from '@/data/hunting-exp-rates';

// 경험치 데이터 (레벨 200~260)
const EXP_DATA = [
    { level: 200, requiredExp: 2207026470, increaseRate: 286.44, cumulativeExp: 13669361700 },
    { level: 201, requiredExp: 2471869646, increaseRate: 12, cumulativeExp: 16141231346 },
    { level: 202, requiredExp: 2768494003, increaseRate: 12, cumulativeExp: 18909725349 },
    { level: 203, requiredExp: 3100713283, increaseRate: 12, cumulativeExp: 22010438632 },
    { level: 204, requiredExp: 3472798876, increaseRate: 12, cumulativeExp: 25483237508 },
    { level: 205, requiredExp: 3889534741, increaseRate: 12, cumulativeExp: 29372772249 },
    { level: 206, requiredExp: 4356278909, increaseRate: 12, cumulativeExp: 33729051158 },
    { level: 207, requiredExp: 4879032378, increaseRate: 12, cumulativeExp: 38608083536 },
    { level: 208, requiredExp: 5464516263, increaseRate: 12, cumulativeExp: 44072599799 },
    { level: 209, requiredExp: 6120258214, increaseRate: 12, cumulativeExp: 50192858013 },
    { level: 210, requiredExp: 7956335678, increaseRate: 30, cumulativeExp: 58149193691 },
    { level: 211, requiredExp: 8831532602, increaseRate: 11, cumulativeExp: 66980726293 },
    { level: 212, requiredExp: 9803001188, increaseRate: 11, cumulativeExp: 76783727481 },
    { level: 213, requiredExp: 10881331318, increaseRate: 11, cumulativeExp: 87665059159 },
    { level: 214, requiredExp: 12078277762, increaseRate: 11, cumulativeExp: 99743336561 },
    { level: 215, requiredExp: 15701761090, increaseRate: 30, cumulativeExp: 115445097651 },
    { level: 216, requiredExp: 17114919588, increaseRate: 9, cumulativeExp: 132560017239 },
    { level: 217, requiredExp: 18655262350, increaseRate: 9, cumulativeExp: 151215279589 },
    { level: 218, requiredExp: 20334235961, increaseRate: 9, cumulativeExp: 171549515550 },
    { level: 219, requiredExp: 22164317197, increaseRate: 9, cumulativeExp: 193713832747 },
    { level: 220, requiredExp: 28813612356, increaseRate: 30, cumulativeExp: 222527445103 },
    { level: 221, requiredExp: 30830565220, increaseRate: 7, cumulativeExp: 253358010323 },
    { level: 222, requiredExp: 32988704785, increaseRate: 7, cumulativeExp: 286346715108 },
    { level: 223, requiredExp: 35297914119, increaseRate: 7, cumulativeExp: 321644629227 },
    { level: 224, requiredExp: 37768768107, increaseRate: 7, cumulativeExp: 359413397334 },
    { level: 225, requiredExp: 49099398539, increaseRate: 30, cumulativeExp: 408512795873 },
    { level: 226, requiredExp: 52536356436, increaseRate: 7, cumulativeExp: 461049152309 },
    { level: 227, requiredExp: 56213901386, increaseRate: 7, cumulativeExp: 517263053695 },
    { level: 228, requiredExp: 60148874483, increaseRate: 7, cumulativeExp: 577411928178 },
    { level: 229, requiredExp: 64359295696, increaseRate: 7, cumulativeExp: 641771223874 },
    { level: 230, requiredExp: 83667084404, increaseRate: 30, cumulativeExp: 725438308278 },
    { level: 231, requiredExp: 86177096936, increaseRate: 3, cumulativeExp: 811615405214 },
    { level: 232, requiredExp: 88762409844, increaseRate: 3, cumulativeExp: 900377815058 },
    { level: 233, requiredExp: 91425282139, increaseRate: 3, cumulativeExp: 991803097197 },
    { level: 234, requiredExp: 94168040603, increaseRate: 3, cumulativeExp: 1085971137800 },
    { level: 235, requiredExp: 122418452783, increaseRate: 30, cumulativeExp: 1208389590583 },
    { level: 236, requiredExp: 126091006366, increaseRate: 3, cumulativeExp: 1334480596949 },
    { level: 237, requiredExp: 129873736556, increaseRate: 3, cumulativeExp: 1464354333505 },
    { level: 238, requiredExp: 133769948652, increaseRate: 3, cumulativeExp: 1598124282157 },
    { level: 239, requiredExp: 137783047111, increaseRate: 3, cumulativeExp: 1735907329268 },
    { level: 240, requiredExp: 179117961244, increaseRate: 30, cumulativeExp: 1915025290512 },
    { level: 241, requiredExp: 184491500081, increaseRate: 3, cumulativeExp: 2099516790593 },
    { level: 242, requiredExp: 190026245083, increaseRate: 3, cumulativeExp: 2289543035676 },
    { level: 243, requiredExp: 195727032435, increaseRate: 3, cumulativeExp: 2485270068111 },
    { level: 244, requiredExp: 201598843408, increaseRate: 3, cumulativeExp: 2686868911519 },
    { level: 245, requiredExp: 262078496430, increaseRate: 30, cumulativeExp: 2948947407949 },
    { level: 246, requiredExp: 269940851322, increaseRate: 3, cumulativeExp: 3218888259271 },
    { level: 247, requiredExp: 278039076861, increaseRate: 3, cumulativeExp: 3496927336132 },
    { level: 248, requiredExp: 286380249166, increaseRate: 3, cumulativeExp: 3783307585298 },
    { level: 249, requiredExp: 294971656640, increaseRate: 3, cumulativeExp: 4078279241938 },
    { level: 250, requiredExp: 442457484960, increaseRate: 50, cumulativeExp: 4520736726898 },
    { level: 251, requiredExp: 455731209508, increaseRate: 3, cumulativeExp: 4976467936406 },
    { level: 252, requiredExp: 469403145793, increaseRate: 3, cumulativeExp: 5445871082199 },
    { level: 253, requiredExp: 483485240166, increaseRate: 3, cumulativeExp: 5929356322365 },
    { level: 254, requiredExp: 497989797370, increaseRate: 3, cumulativeExp: 6427346119735 },
    { level: 255, requiredExp: 512929491291, increaseRate: 3, cumulativeExp: 6940275611026 },
    { level: 256, requiredExp: 528317376029, increaseRate: 3, cumulativeExp: 7468592987055 },
    { level: 257, requiredExp: 544166897309, increaseRate: 3, cumulativeExp: 8012759884364 },
    { level: 258, requiredExp: 560491904228, increaseRate: 3, cumulativeExp: 8573251788592 },
    { level: 259, requiredExp: 577306661354, increaseRate: 3, cumulativeExp: 9150558449946 },
    { level: 260, requiredExp: 1731919984062, increaseRate: 200, cumulativeExp: 10882478434008 },
    { level: 261, requiredExp: 1749239183902, increaseRate: 1, cumulativeExp: 12631717617910 },
    { level: 262, requiredExp: 1766731575741, increaseRate: 1, cumulativeExp: 14398449193651 },
    { level: 263, requiredExp: 1784398891498, increaseRate: 1, cumulativeExp: 16182848085149 },
    { level: 264, requiredExp: 1802242880412, increaseRate: 1, cumulativeExp: 17985090965561 },
    { level: 265, requiredExp: 2342915744535, increaseRate: 30, cumulativeExp: 20328006710096 },
    { level: 266, requiredExp: 2366344901980, increaseRate: 1, cumulativeExp: 22694351612076 },
    { level: 267, requiredExp: 2390008350999, increaseRate: 1, cumulativeExp: 25084359963075 },
    { level: 268, requiredExp: 2413908434508, increaseRate: 1, cumulativeExp: 27498268397583 },
    { level: 269, requiredExp: 2438047518853, increaseRate: 1, cumulativeExp: 29936315916436 },
    { level: 270, requiredExp: 5412465491853, increaseRate: 122, cumulativeExp: 35348781408289 },
    { level: 271, requiredExp: 5466590146771, increaseRate: 1, cumulativeExp: 40815371555360 },
    { level: 272, requiredExp: 5521256048238, increaseRate: 1, cumulativeExp: 46336627603298 },
    { level: 273, requiredExp: 5576468608720, increaseRate: 1, cumulativeExp: 51913096212018 },
    { level: 274, requiredExp: 5632233294807, increaseRate: 1, cumulativeExp: 57545329506825 },
    { level: 275, requiredExp: 11377111255510, increaseRate: 102, cumulativeExp: 68922440762335 },
    { level: 276, requiredExp: 12514822381061, increaseRate: 10, cumulativeExp: 81437263143396 },
    { level: 277, requiredExp: 13766304619167, increaseRate: 10, cumulativeExp: 95203567762563 },
    { level: 278, requiredExp: 15142935081083, increaseRate: 10, cumulativeExp: 110346502843647 },
    { level: 279, requiredExp: 16657228589191, increaseRate: 10, cumulativeExp: 127003731431838 },
    { level: 280, requiredExp: 33647601750165, increaseRate: 102, cumulativeExp: 160651333182004 },
    { level: 281, requiredExp: 37012361925181, increaseRate: 10, cumulativeExp: 197663695107187 },
    { level: 282, requiredExp: 40713598117699, increaseRate: 10, cumulativeExp: 245897266628153 },
    { level: 283, requiredExp: 44784957929468, increaseRate: 10, cumulativeExp: 290682224557624 },
    { level: 284, requiredExp: 49263453722414, increaseRate: 10, cumulativeExp: 339945678280042 },
    { level: 285, requiredExp: 99512176519276, increaseRate: 102, cumulativeExp: 439457854799318 },
    { level: 286, requiredExp: 109463394171203, increaseRate: 10, cumulativeExp: 548921248970521 },
    { level: 287, requiredExp: 120409733588323, increaseRate: 10, cumulativeExp: 669330982558844 },
    { level: 288, requiredExp: 132450706947155, increaseRate: 10, cumulativeExp: 801781689505999 },
    { level: 289, requiredExp: 145695777641870, increaseRate: 10, cumulativeExp: 947477467147869 },
    { level: 290, requiredExp: 294305470836577, increaseRate: 102, cumulativeExp: 1241782937984446 },
    { level: 291, requiredExp: 323736017920234, increaseRate: 10, cumulativeExp: 1565518955904680 },
    { level: 292, requiredExp: 356109619712257, increaseRate: 10, cumulativeExp: 1921628575616937 },
    { level: 293, requiredExp: 391720581683482, increaseRate: 10, cumulativeExp: 2313349157299419 },
    { level: 294, requiredExp: 430892639851830, increaseRate: 10, cumulativeExp: 2744241797151249 },
    { level: 295, requiredExp: 870403132500696, increaseRate: 102, cumulativeExp: 3614644929651945 },
    { level: 296, requiredExp: 957443445750765, increaseRate: 10, cumulativeExp: 4572088375402710 },
    { level: 297, requiredExp: 1053187790325841, increaseRate: 10, cumulativeExp: 5625276165728551 },
    { level: 298, requiredExp: 1158506569358425, increaseRate: 10, cumulativeExp: 6783782735086976 },
    { level: 299, requiredExp: 1737759854037637, increaseRate: 50, cumulativeExp: 8521542589124813 },
];

// 몬스터파크 경험치 데이터 (레벨별)
const MONSTER_PARK_EXP = [
    { minLevel: 200, maxLevel: 209, exp: 359915080, area: '소멸의 여로' },
    { minLevel: 210, maxLevel: 219, exp: 1285078680, area: '츄츄 아일랜드' },
    { minLevel: 220, maxLevel: 224, exp: 3217660990, area: '레헬른' },
    { minLevel: 225, maxLevel: 229, exp: 4707573370, area: '아르카나' },
    { minLevel: 230, maxLevel: 234, exp: 5993511040, area: '모라스' },
    { minLevel: 235, maxLevel: 239, exp: 6919667370, area: '에스페라' },
    { minLevel: 240, maxLevel: 244, exp: 8712814920, area: '셀라스' },
    { minLevel: 245, maxLevel: 249, exp: 11716616500, area: '문브릿지' },
    { minLevel: 250, maxLevel: 254, exp: 14058901000, area: '고통의 미궁' },
    { minLevel: 255, maxLevel: 259, exp: 15552557400, area: '리멘' },
    // 어센틱포스 지역 (260~)
    { minLevel: 260, maxLevel: 264, exp: 37474604460, area: '세르니움' },
    { minLevel: 265, maxLevel: 269, exp: 44435446300, area: '호텔 아르크스' },
    { minLevel: 270, maxLevel: 274, exp: 52818835200, area: '오디움' },
    { minLevel: 275, maxLevel: 279, exp: 76639838000, area: '도원경' },
    { minLevel: 280, maxLevel: 284, exp: 107204032000, area: '아르테리아' },
    { minLevel: 285, maxLevel: 289, exp: 156017856000, area: '카르시온' },
    { minLevel: 290, maxLevel: 300, exp: 218575316000, area: '탈라하트' },
];

// 레벨에 따른 몬스터파크 경험치 가져오기
const getMonsterParkExp = (level: number): { exp: number; area: string } => {
    // 레벨에 맞는 가장 높은 경험치의 던전 찾기
    const validDungeons = MONSTER_PARK_EXP.filter(
        mp => level >= mp.minLevel && level <= mp.maxLevel
    ).sort((a, b) => b.exp - a.exp);

    if (validDungeons.length > 0) {
        return { exp: validDungeons[0].exp, area: validDungeons[0].area };
    }
    return { exp: 0, area: '해당 없음' };
};

// 그란디스 일일 퀘스트 경험치 데이터 (레벨 기반)
const GRANDIS_DAILY_QUEST = [
    { minLevel: 260, maxLevel: 264, exp: 16455682080, area: '세르니움' },
    { minLevel: 265, maxLevel: 269, exp: 19371792600, area: '호텔 아르크스' },
    { minLevel: 270, maxLevel: 274, exp: 23246151120, area: '오디움' },
    { minLevel: 275, maxLevel: 279, exp: 32127015480, area: '도원경' },
    { minLevel: 280, maxLevel: 284, exp: 38593455264, area: '아르테리아' },
    { minLevel: 285, maxLevel: 289, exp: 45635222880, area: '카르시온' },
    { minLevel: 290, maxLevel: 300, exp: 89730912960, area: '탈라하트' },
];

// 레벨에 따른 그란디스 일일 퀘스트 경험치 가져오기 (현재 레벨 이하 모든 지역 합계)
const getGrandisDailyQuest = (level: number): { exp: number; areas: string[] } => {
    const validQuests = GRANDIS_DAILY_QUEST.filter(
        q => level >= q.minLevel
    );

    if (validQuests.length > 0) {
        const totalExp = validQuests.reduce((sum, q) => sum + q.exp, 0);
        const areas = validQuests.map(q => q.area);
        return { exp: totalExp, areas };
    }
    return { exp: 0, areas: [] };
};

// 아케인 일일 퀘스트 경험치 데이터 (아케인심볼)
const ARCANE_DAILY_QUEST = [
    { minLevel: 200, maxLevel: 209, exp: 732132258, area: '소멸의 여로' },
    { minLevel: 210, maxLevel: 219, exp: 2141658246, area: '츄츄 아일랜드' },
    { minLevel: 220, maxLevel: 224, exp: 3189098250, area: '레헬른' },
    { minLevel: 225, maxLevel: 229, exp: 3305187639, area: '아르카나' },
    { minLevel: 230, maxLevel: 234, exp: 4398266165, area: '모라스' },
    { minLevel: 235, maxLevel: 239, exp: 4530843954, area: '에스페라' },
    // 셀라스(240~244)는 일일 퀘스트 없음 (몬스터파크만 존재)
    { minLevel: 245, maxLevel: 249, exp: 8397548775, area: '문브릿지' },
    { minLevel: 250, maxLevel: 254, exp: 9057690000, area: '고통의 미궁' },
    { minLevel: 255, maxLevel: 259, exp: 10225741680, area: '리멘' },
];

// 레벨에 따른 아케인 일일 퀘스트 경험치 가져오기 (현재 레벨 이하 모든 지역 합계)
const getArcaneDailyQuest = (level: number): { exp: number; areas: string[] } => {
    const validQuests = ARCANE_DAILY_QUEST.filter(
        q => level >= q.minLevel
    );

    if (validQuests.length > 0) {
        const totalExp = validQuests.reduce((sum, q) => sum + q.exp, 0);
        const areas = validQuests.map(q => q.area);
        return { exp: totalExp, areas };
    }
    return { exp: 0, areas: [] };
};
// 하이마운틴 경험치 데이터 (레벨별, %)
const HIGH_MOUNTAIN_EXP = [
    { level: 260, basic: 15.0700, stage1: 75.3500, stage2: 135.6300 },
    { level: 261, basic: 15.1323, stage1: 75.6615, stage2: 136.1907 },
    { level: 262, basic: 15.1976, stage1: 75.9880, stage2: 136.7784 },
    { level: 263, basic: 15.2544, stage1: 76.2720, stage2: 137.2896 },
    { level: 264, basic: 15.3420, stage1: 76.7100, stage2: 138.0780 },
    { level: 265, basic: 13.2783, stage1: 66.3915, stage2: 119.5047 },
    { level: 266, basic: 13.3286, stage1: 66.6430, stage2: 119.9574 },
    { level: 267, basic: 13.3765, stage1: 66.8825, stage2: 120.3885 },
    { level: 268, basic: 13.4429, stage1: 67.2145, stage2: 120.9861 },
    { level: 269, basic: 13.4862, stage1: 67.4310, stage2: 121.3758 },
    { level: 270, basic: 6.3557, stage1: 31.7785, stage2: 57.2013 },
    { level: 271, basic: 6.5909, stage1: 32.9545, stage2: 59.3181 },
    { level: 272, basic: 6.6090, stage1: 33.0450, stage2: 59.4810 },
    { level: 273, basic: 6.9004, stage1: 34.5020, stage2: 62.1036 },
    { level: 274, basic: 6.9351, stage1: 34.6755, stage2: 62.4159 },
    { level: 275, basic: 3.8586, stage1: 19.2930, stage2: 34.7274 },
    { level: 276, basic: 3.5518, stage1: 17.7590, stage2: 31.9662 },
    { level: 277, basic: 3.2761, stage1: 16.3805, stage2: 29.4849 },
    { level: 278, basic: 3.0146, stage1: 15.0730, stage2: 27.1314 },
    { level: 279, basic: 2.7772, stage1: 13.8860, stage2: 24.9948 },
    { level: 280, basic: 1.5442, stage1: 7.7210, stage2: 13.8978 },
    { level: 281, basic: 1.4230, stage1: 7.1150, stage2: 12.8070 },
    { level: 282, basic: 1.3091, stage1: 6.5455, stage2: 11.7819 },
    { level: 283, basic: 1.2062, stage1: 6.0310, stage2: 10.8558 },
    { level: 284, basic: 1.1095, stage1: 5.5475, stage2: 9.9855 },
    { level: 285, basic: 0.6174, stage1: 3.0870, stage2: 5.5566 },
    { level: 286, basic: 0.5679, stage1: 2.8395, stage2: 5.1111 },
    { level: 287, basic: 0.5229, stage1: 2.6145, stage2: 4.7061 },
    { level: 288, basic: 0.4815, stage1: 2.4075, stage2: 4.3335 },
    { level: 289, basic: 0.4427, stage1: 2.2135, stage2: 3.9843 },
    { level: 290, basic: 0.2463, stage1: 1.2315, stage2: 2.2167 },
    { level: 291, basic: 0.2264, stage1: 1.1320, stage2: 2.0376 },
    { level: 292, basic: 0.2084, stage1: 1.0420, stage2: 1.8756 },
    { level: 293, basic: 0.1917, stage1: 0.9585, stage2: 1.7253 },
    { level: 294, basic: 0.1763, stage1: 0.8815, stage2: 1.5867 },
    { level: 295, basic: 0.0873, stage1: 0.4365, stage2: 0.7857 },
    { level: 296, basic: 0.0793, stage1: 0.3965, stage2: 0.7137 },
    { level: 297, basic: 0.0721, stage1: 0.3605, stage2: 0.6489 },
    { level: 298, basic: 0.0656, stage1: 0.3280, stage2: 0.5904 },
    { level: 299, basic: 0.0437, stage1: 0.2185, stage2: 0.3933 },
];

// 앵글러 컴퍼니 경험치 데이터 (레벨별, %)
const ANGLER_COMPANY_EXP = [
    { level: 270, basic: 9.5335, stage1: 47.6675, stage2: 85.8015 },
    { level: 271, basic: 9.8864, stage1: 49.4320, stage2: 88.9776 },
    { level: 272, basic: 9.9135, stage1: 49.5675, stage2: 89.2215 },
    { level: 273, basic: 10.3506, stage1: 51.7530, stage2: 93.1554 },
    { level: 274, basic: 10.4026, stage1: 52.0130, stage2: 93.6234 },
    { level: 275, basic: 5.7879, stage1: 28.9395, stage2: 52.0911 },
    { level: 276, basic: 5.3277, stage1: 26.6385, stage2: 47.9493 },
    { level: 277, basic: 4.9142, stage1: 24.5710, stage2: 44.2278 },
    { level: 278, basic: 4.5219, stage1: 22.6095, stage2: 40.6971 },
    { level: 279, basic: 4.1658, stage1: 20.8290, stage2: 37.4922 },
    { level: 280, basic: 2.3164, stage1: 11.5820, stage2: 20.8476 },
    { level: 281, basic: 2.1346, stage1: 10.6730, stage2: 19.2114 },
    { level: 282, basic: 1.9637, stage1: 9.8185, stage2: 17.6733 },
    { level: 283, basic: 1.8093, stage1: 9.0465, stage2: 16.2837 },
    { level: 284, basic: 1.6643, stage1: 8.3215, stage2: 14.9787 },
    { level: 285, basic: 0.9261, stage1: 4.6305, stage2: 8.3349 },
    { level: 286, basic: 0.8518, stage1: 4.2590, stage2: 7.6662 },
    { level: 287, basic: 0.7843, stage1: 3.9215, stage2: 7.0587 },
    { level: 288, basic: 0.7223, stage1: 3.6115, stage2: 6.5007 },
    { level: 289, basic: 0.6641, stage1: 3.3205, stage2: 5.9769 },
    { level: 290, basic: 0.3694, stage1: 1.8470, stage2: 3.3246 },
    { level: 291, basic: 0.3396, stage1: 1.6980, stage2: 3.0564 },
    { level: 292, basic: 0.3126, stage1: 1.5630, stage2: 2.8134 },
    { level: 293, basic: 0.2875, stage1: 1.4375, stage2: 2.5875 },
    { level: 294, basic: 0.2644, stage1: 1.3220, stage2: 2.3796 },
    { level: 295, basic: 0.1309, stage1: 0.6545, stage2: 1.1781 },
    { level: 296, basic: 0.1190, stage1: 0.5950, stage2: 1.0710 },
    { level: 297, basic: 0.1082, stage1: 0.5410, stage2: 0.9738 },
    { level: 298, basic: 0.0984, stage1: 0.4920, stage2: 0.8856 },
    { level: 299, basic: 0.0656, stage1: 0.3280, stage2: 0.5904 },
];

// 악몽선경 경험치 데이터 (레벨별, %)
const NIGHTMARE_GARDEN_EXP = [
    { level: 280, basic: 3.0885, stage1: 15.4425, stage2: 27.7965 },
    { level: 281, basic: 2.8461, stage1: 14.2305, stage2: 25.6149 },
    { level: 282, basic: 2.6183, stage1: 13.0915, stage2: 23.5647 },
    { level: 283, basic: 2.4124, stage1: 12.0620, stage2: 21.7116 },
    { level: 284, basic: 2.2191, stage1: 11.0955, stage2: 19.9719 },
    { level: 285, basic: 1.2348, stage1: 6.1740, stage2: 11.1132 },
    { level: 286, basic: 1.1357, stage1: 5.6785, stage2: 10.2213 },
    { level: 287, basic: 1.0458, stage1: 5.2290, stage2: 9.4122 },
    { level: 288, basic: 0.9631, stage1: 4.8155, stage2: 8.6679 },
    { level: 289, basic: 0.8854, stage1: 4.4270, stage2: 7.9686 },
    { level: 290, basic: 0.4925, stage1: 2.4625, stage2: 4.4325 },
    { level: 291, basic: 0.4528, stage1: 2.2640, stage2: 4.0752 },
    { level: 292, basic: 0.4168, stage1: 2.0840, stage2: 3.7512 },
    { level: 293, basic: 0.3833, stage1: 1.9165, stage2: 3.4497 },
    { level: 294, basic: 0.3526, stage1: 1.7630, stage2: 3.1734 },
    { level: 295, basic: 0.1745, stage1: 0.8725, stage2: 1.5705 },
    { level: 296, basic: 0.1587, stage1: 0.7935, stage2: 1.4283 },
    { level: 297, basic: 0.1442, stage1: 0.7210, stage2: 1.2978 },
    { level: 298, basic: 0.1311, stage1: 0.6555, stage2: 1.1799 },
    { level: 299, basic: 0.0874, stage1: 0.4370, stage2: 0.7866 },
];

// 익스트림 몬스터파크 경험치 데이터 (레벨별, %)
// 몬파 이벤트 스킬이 적용됨
// 일주일에 1회 플레이 가능
const EXTREME_MONSTER_PARK_EXP = [
    { level: 260, base: 15.31 }, { level: 261, base: 15.22 }, { level: 262, base: 15.13 }, { level: 263, base: 15.03 }, { level: 264, base: 14.94 },
    { level: 265, base: 15.00 }, { level: 266, base: 14.91 }, { level: 267, base: 14.81 }, { level: 268, base: 14.72 }, { level: 269, base: 14.63 },
    { level: 270, base: 10.48 }, { level: 271, base: 10.41 }, { level: 272, base: 10.25 }, { level: 273, base: 10.28 }, { level: 274, base: 10.22 },
    { level: 275, base: 6.66 }, { level: 276, base: 6.08 }, { level: 277, base: 5.55 }, { level: 278, base: 5.05 }, { level: 279, base: 4.61 },
    { level: 280, base: 2.65 }, { level: 281, base: 2.41 }, { level: 282, base: 2.20 }, { level: 283, base: 2.01 }, { level: 284, base: 1.83 },
    { level: 285, base: 1.07 }, { level: 286, base: 0.97 }, { level: 287, base: 0.89 }, { level: 288, base: 0.80 }, { level: 289, base: 0.74 },
    { level: 290, base: 0.31 }, { level: 291, base: 0.28 }, { level: 292, base: 0.26 }, { level: 293, base: 0.24 }, { level: 294, base: 0.22 },
    { level: 295, base: 0.10 }, { level: 296, base: 0.10 }, { level: 297, base: 0.09 }, { level: 298, base: 0.09 }, { level: 299, base: 0.06 },
];

export default function ExpCalculatorClient() {
    const [currentLevel, setCurrentLevel] = useState(200);
    const [currentLevelExp, setCurrentLevelExp] = useState(0); // 현재 레벨 진행도 (%)
    const [targetLevel, setTargetLevel] = useState(210);
    const [useHyperBurning, setUseHyperBurning] = useState(false); // 하이퍼버닝 사용 여부
    const [useBurningBeyond, setUseBurningBeyond] = useState(false); // 버닝 비욘드 (Lv.260~270 1+1) 사용 여부

    // 사냥 효율 입력 방식 (3가지 모드)
    const [huntingMode, setHuntingMode] = useState<'percent' | 'manual' | 'namuwiki'>('namuwiki'); // 사냥 모드
    const [dailyLevelPercent, setDailyLevelPercent] = useState(20); // 하루 올릴 경험치 % (0~100)
    const [huntingExpPerHour, setHuntingExpPerHour] = useState(0); // 시간당 사냥 경험치 (직접 입력)
    const [dailyHuntingHours, setDailyHuntingHours] = useState(3); // 하루 사냥 시간


    const [monsterParkCount, setMonsterParkCount] = useState(2); // 몬스터파크 횟수 (하루 0~7회)
    const [mpEventSkillLevel, setMpEventSkillLevel] = useState(0); // 몬파 이벤트 스킬 레벨 (0~6)
    const [arcaneEventSkillLevel, setArcaneEventSkillLevel] = useState(0); // 아케인 이벤트 스킬 레벨 (0~6)
    const [grandisEventSkillLevel, setGrandisEventSkillLevel] = useState(0); // 그란디스 이벤트 스킬 레벨 (0~6)
    const [useSundayMPBonus, setUseSundayMPBonus] = useState(true); // 일요일 몬파 보너스 사용 여부
    const [useSundayMaple, setUseSundayMaple] = useState(false); // 썬데이 메이플 이벤트 사용 여부
    const [useArcaneQuest, setUseArcaneQuest] = useState(true); // 아케인 일일 퀘스트 사용 여부
    const [useGrandisQuest, setUseGrandisQuest] = useState(true); // 그란디스 일일 퀘스트 사용 여부

    const [dailyQuestExp, setDailyQuestExp] = useState(0); // 일일 퀘스트 경험치 (극한의 마수, 우르스 등)

    const [useExtremeMonsterPark, setUseExtremeMonsterPark] = useState(false); // 익스트림 몬스터파크 사용 여부

    // 에픽 던전 (하이마운틴)
    const [useHighMountain, setUseHighMountain] = useState(false);
    const [highMountainReward, setHighMountainReward] = useState<'basic' | 'stage1' | 'stage2'>('basic');

    // 에픽 던전 (앵글러 컴퍼니)
    const [useAnglerCompany, setUseAnglerCompany] = useState(false);
    const [anglerCompanyReward, setAnglerCompanyReward] = useState<'basic' | 'stage1' | 'stage2'>('basic');

    // 에픽 던전 (악몽선경)
    const [useNightmareGarden, setUseNightmareGarden] = useState(false);
    const [nightmareGardenReward, setNightmareGardenReward] = useState<'basic' | 'stage1' | 'stage2'>('basic');

    // 현재 레벨의 몬스터파크 경험치 (일요일 보너스 고려)
    const monsterParkData = useMemo(() => getMonsterParkExp(currentLevel), [currentLevel]);
    // 일요일 보너스 계산 + 이벤트 스킬 보너스
    // - 이벤트 스킬:1/2/3/4/5/6 → 10/20/40/60/80/100%
    const monsterParkEventBonus = mpEventSkillLevel === 0 ? 0 :
        mpEventSkillLevel === 1 ? 0.1 :
            mpEventSkillLevel === 2 ? 0.2 :
                mpEventSkillLevel === 3 ? 0.4 :
                    mpEventSkillLevel === 4 ? 0.6 :
                        mpEventSkillLevel === 5 ? 0.8 : 1.0;
    const mondayToSaturdayMultiplier = 1.0 + monsterParkEventBonus;
    const sundayMultiplier = (useSundayMPBonus ? 1.5 : 1.0) + monsterParkEventBonus;
    // 주간 평균 (썬데이 메이플 제외)
    const baseAverageWeeklyMultiplier = (mondayToSaturdayMultiplier * 6 + sundayMultiplier) / 7;

    // 썬데이 메이플은 전체 기간 중 1일만 추가 보너스로 계산
    // 예상 소요 일수를 알아야 정확하지만, 여기서는 몬파 일일 경험치만 필요하므로 기본 배율 사용
    const dailyMonsterParkExp = monsterParkData.exp * monsterParkCount * baseAverageWeeklyMultiplier;

    // 아케인 일퀘 이벤트 스킬 보너스 (1/2/3/4/5/6 → 5/10/20/30/40/50%)
    const arcaneQuestEventBonus = arcaneEventSkillLevel === 0 ? 0 :
        arcaneEventSkillLevel === 1 ? 0.05 :
            arcaneEventSkillLevel === 2 ? 0.1 :
                arcaneEventSkillLevel === 3 ? 0.2 :
                    arcaneEventSkillLevel === 4 ? 0.3 :
                        arcaneEventSkillLevel === 5 ? 0.4 : 0.5;

    // 그란디스 일퀘 이벤트 스킬 보너스 (1/2/3/4/5/6 → 5/10/20/30/40/50%)
    const grandisQuestEventBonus = grandisEventSkillLevel === 0 ? 0 :
        grandisEventSkillLevel === 1 ? 0.05 :
            grandisEventSkillLevel === 2 ? 0.1 :
                grandisEventSkillLevel === 3 ? 0.2 :
                    grandisEventSkillLevel === 4 ? 0.3 :
                        grandisEventSkillLevel === 5 ? 0.4 : 0.5;

    // 목표 레벨 기준의 아케인 일일 퀘스트 경험치 (현재~목표 레벨의 모든 퀘스트)
    const arcaneQuestData = useMemo(() => getArcaneDailyQuest(targetLevel), [targetLevel]);
    const dailyArcaneQuestExp = useArcaneQuest ? arcaneQuestData.exp * (1 + arcaneQuestEventBonus) : 0;

    // 목표 레벨 기준의 그란디스 일일 퀘스트 경험치 (현재~목표 레벨의 모든 퀘스트)
    const grandisQuestData = useMemo(() => getGrandisDailyQuest(targetLevel), [targetLevel]);
    const dailyGrandisQuestExp = useGrandisQuest ? grandisQuestData.exp * (1 + grandisQuestEventBonus) : 0;

    // 필요 경험치 계산 (레벨별 몬스터파크 변경 반영)
    const calculatedData = useMemo(() => {
        if (currentLevel >= targetLevel) {
            return {
                totalExpNeeded: 0,
                daysNeeded: 0,
                hoursNeeded: 0,
                levelBreakdown: [],
                monsterParkBreakdown: [],
            };
        }

        let totalExpNeeded = 0;
        const levelBreakdown = [];

        // 현재 레벨의 남은 경험치 계산
        const currentLevelData = EXP_DATA.find(d => d.level === currentLevel);
        if (currentLevelData) {
            const currentLevelRemaining = currentLevelData.requiredExp * (100 - currentLevelExp) / 100;
            totalExpNeeded += currentLevelRemaining;
            levelBreakdown.push({
                level: currentLevel,
                expNeeded: currentLevelRemaining,
                percentage: 100 - currentLevelExp,
            });
        }

        // 중간 레벨들의 경험치
        for (let lv = currentLevel + 1; lv < targetLevel; lv++) {
            const levelData = EXP_DATA.find(d => d.level === lv);
            if (levelData) {
                totalExpNeeded += levelData.requiredExp;
                levelBreakdown.push({
                    level: lv,
                    expNeeded: levelData.requiredExp,
                    percentage: 100,
                });
            }
        }

        // 일별 시뮬레이션 (레벨별 몬스터파크 변경 반영)
        let daysNeeded = 0;
        let hoursNeeded = 0;
        let totalHuntingHours = 0;
        const monsterParkBreakdown: Array<{ level: number; area: string; exp: number; days: number }> = [];

        if ((huntingMode === 'percent' && dailyLevelPercent > 0) || (huntingMode === 'manual' && huntingExpPerHour > 0) || (huntingMode === 'namuwiki' && dailyHuntingHours > 0) || dailyQuestExp > 0 || monsterParkCount > 0 || useArcaneQuest || useGrandisQuest || useHighMountain || useAnglerCompany || useNightmareGarden) {
            let remainingExp = totalExpNeeded;
            let currentSimLevel = currentLevel;
            let currentSimLevelProgress = currentLevelExp; // 현재 레벨 진행도
            let dayCount = 0;
            let currentMonsterParkArea = '';
            let monsterParkDayCount = 0;

            while (remainingExp > 0 && currentSimLevel < targetLevel) {
                // 현재 레벨의 몬스터파크 가져오기 (일요일 보너스 포함)
                const mpData = getMonsterParkExp(currentSimLevel);
                const dailyMonsterParkExpSim = mpData.exp * monsterParkCount * baseAverageWeeklyMultiplier;

                // 현재 레벨의 아케인 퀘스트 가져오기
                const aqData = getArcaneDailyQuest(currentSimLevel);
                const dailyArcaneQuestExpSim = useArcaneQuest ? aqData.exp : 0;

                // 현재 레벨의 그란디스 퀘스트 가져오기
                const gqData = getGrandisDailyQuest(currentSimLevel);
                const dailyGrandisQuestExpSim = useGrandisQuest ? gqData.exp : 0;

                // 에픽 던전 (하이마운틴) 주간 경험치 -> 일일 평균으로 환산
                let dailyHighMountainExpSim = 0;

                // 데이터 유효성 검사 (0이면 적용 불가)
                const nightmareData = NIGHTMARE_GARDEN_EXP.find(d => d.level === currentSimLevel);
                const isNightmareValid = nightmareData && nightmareData.basic > 0;

                // 앵글러 컴퍼니를 사용하고 270레벨 이상이면 하이마운틴 경험치는 제외 (중복 획득 불가)
                // 악몽선경을 사용하고 280레벨 이상이며 데이터가 유효하면 하이마운틴 경험치는 제외
                const skipHighMountain = (useAnglerCompany && currentSimLevel >= 270) || (useNightmareGarden && currentSimLevel >= 280 && isNightmareValid);

                if (useHighMountain && currentSimLevel >= 260 && !skipHighMountain) {
                    const hmData = HIGH_MOUNTAIN_EXP.find(d => d.level === currentSimLevel);
                    if (hmData) {
                        const levelTotalExp = EXP_DATA.find(d => d.level === currentSimLevel)?.requiredExp || 0;
                        const percent = highMountainReward === 'basic' ? hmData.basic :
                            highMountainReward === 'stage1' ? hmData.stage1 : hmData.stage2;

                        // 주간 획득 경험치
                        const weeklyExp = levelTotalExp * (percent / 100);
                        // 일일 평균
                        dailyHighMountainExpSim = weeklyExp / 7;
                    }
                }

                // 에픽 던전 (앵글러 컴퍼니) 주간 경험치 -> 일일 평균으로 환산
                let dailyAnglerCompanyExpSim = 0;
                // 악몽선경을 사용하고 280레벨 이상이며 데이터가 유효하면 앵글러 컴퍼니 경험치는 제외 (중복 획득 불가)
                const skipAnglerCompany = useNightmareGarden && currentSimLevel >= 280 && isNightmareValid;

                if (useAnglerCompany && currentSimLevel >= 270 && !skipAnglerCompany) {
                    const acData = ANGLER_COMPANY_EXP.find(d => d.level === currentSimLevel);
                    if (acData) {
                        const levelTotalExp = EXP_DATA.find(d => d.level === currentSimLevel)?.requiredExp || 0;
                        const percent = anglerCompanyReward === 'basic' ? acData.basic :
                            anglerCompanyReward === 'stage1' ? acData.stage1 : acData.stage2;

                        // 주간 획득 경험치
                        const weeklyExp = levelTotalExp * (percent / 100);
                        // 일일 평균
                        dailyAnglerCompanyExpSim = weeklyExp / 7;
                    }
                }

                // 에픽 던전 (악몽선경) 주간 경험치 -> 일일 평균으로 환산
                let dailyNightmareGardenExpSim = 0;
                if (useNightmareGarden && currentSimLevel >= 280) {
                    const ngData = NIGHTMARE_GARDEN_EXP.find(d => d.level === currentSimLevel);
                    if (ngData && ngData.basic > 0) { // 데이터가 있는 경우만
                        const levelTotalExp = EXP_DATA.find(d => d.level === currentSimLevel)?.requiredExp || 0;
                        const percent = nightmareGardenReward === 'basic' ? ngData.basic :
                            nightmareGardenReward === 'stage1' ? ngData.stage1 : ngData.stage2;

                        // 주간 획득 경험치
                        const weeklyExp = levelTotalExp * (percent / 100);
                        // 일일 평균
                        dailyNightmareGardenExpSim = weeklyExp / 7;
                    }
                }

                // 익스트림 몬스터파크 (주간 1회) -> 일일 평균으로 환산
                let dailyExtremeMpExpSim = 0;
                if (useExtremeMonsterPark && currentSimLevel >= 260 && currentSimLevel < 300) {
                    const empData = EXTREME_MONSTER_PARK_EXP.find(d => d.level === currentSimLevel);
                    if (empData) {
                        const levelTotalExp = EXP_DATA.find(d => d.level === currentSimLevel)?.requiredExp || 0;
                        // 이벤트 스킬 보너스 적용 (10/20/40/60/80/100%)
                        // Note: mpEventSkillLevel은 일반 몬파 로직에서 0.1, 0.2... 로 변환해서 사용중이므로 동일 로직 적용 필요
                        // mpEventSkillLevel 값을 다시 가져와서 계산
                        const empBonus = mpEventSkillLevel === 0 ? 0 :
                            mpEventSkillLevel === 1 ? 0.05 : // 익몬은 1단계가 5%가 아니라 표에 따르면 5% 단위인듯 하지만 유저 요청은 "이벤트 스킬 레벨 적용"
                                mpEventSkillLevel === 2 ? 0.1 :
                                    mpEventSkillLevel === 3 ? 0.2 :
                                        mpEventSkillLevel === 4 ? 0.3 :
                                            mpEventSkillLevel === 5 ? 0.4 : 0.5;
                        // 유저가 제공한 표에는 "1레벨 (5%)", "2레벨 (10%)" ... 라고 되어 있음.
                        // 일반 몬파 스킬 효율(10/20/40..)과 다를 수 있음. 유저 표를 따름.

                        const bonusMultiplier = 1 + empBonus;

                        // 주간 획득 경험치 = 기본경험치 * (1 + 보너스)
                        // 표의 수치는 "기본 경험치"에 대한 %가 아니라, 레벨업 통에 대한 %임.
                        const weeklyExp = levelTotalExp * (empData.base / 100) * bonusMultiplier;

                        dailyExtremeMpExpSim = weeklyExp / 7;
                    }
                }

                // 몬스터파크 지역이 바뀌면 기록
                if (mpData.area !== currentMonsterParkArea && monsterParkCount > 0) {
                    if (currentMonsterParkArea && monsterParkDayCount > 0) {
                        // 이전 몬스터파크 기록 저장
                        const prevMpData = monsterParkBreakdown[monsterParkBreakdown.length - 1];
                        if (prevMpData) {
                            prevMpData.days = monsterParkDayCount;
                        }
                    }
                    // 새로운 몬스터파크 시작
                    monsterParkBreakdown.push({
                        level: currentSimLevel,
                        area: mpData.area,
                        exp: mpData.exp,
                        days: 0,
                    });
                    currentMonsterParkArea = mpData.area;
                    monsterParkDayCount = 0;
                }

                // 하루 총 경험치 계산
                let dailyHuntingExp = 0;

                if (huntingMode === 'percent' && dailyLevelPercent > 0) {
                    // % 모드: 현재 레벨 필요 경험치의 %
                    const currentLevelDataSim = EXP_DATA.find(d => d.level === currentSimLevel);
                    if (currentLevelDataSim) {
                        dailyHuntingExp = currentLevelDataSim.requiredExp * (dailyLevelPercent / 100);
                    }
                } else if (huntingMode === 'manual') {
                    // 직접 입력 모드: 사용자가 입력한 시간당 경험치 사용
                    dailyHuntingExp = huntingExpPerHour * dailyHuntingHours;
                } else if (huntingMode === 'namuwiki') {
                    // 나무위키 기준 모드: 레벨별 시간당 경험치 자동 계산
                    const huntingData = getHuntingDataForLevel(currentSimLevel);
                    if (huntingData) {
                        // 억 단위를 실제 숫자로 변환 (예: 73억 → 7,300,000,000)
                        const expPerHourInEok = huntingData.expPerHour;
                        const actualExpPerHour = expPerHourInEok * 100000000; // 억 → 숫자
                        dailyHuntingExp = actualExpPerHour * dailyHuntingHours;
                    }
                }

                const dailyTotalExp = dailyHuntingExp + dailyQuestExp + dailyMonsterParkExpSim + dailyArcaneQuestExpSim + dailyGrandisQuestExpSim + dailyHighMountainExpSim + dailyAnglerCompanyExpSim + dailyNightmareGardenExpSim + dailyExtremeMpExpSim;

                if (dailyTotalExp <= 0) break;

                // 현재 레벨에서 다음 레벨까지 필요한 경험치
                const currentLevelDataSim = EXP_DATA.find(d => d.level === currentSimLevel);
                if (!currentLevelDataSim) break;

                const expToNextLevel = currentLevelDataSim.requiredExp * (100 - currentSimLevelProgress) / 100;

                // 이 레벨에서 필요한 일수
                const daysForThisLevel = expToNextLevel / dailyTotalExp;
                dayCount += daysForThisLevel;
                totalHuntingHours += daysForThisLevel * dailyHuntingHours;
                monsterParkDayCount += daysForThisLevel;
                remainingExp -= expToNextLevel;

                // 다음 레벨로 (하이퍼버닝/버닝 비욘드 고려)
                let levelUpBonus = 1;
                if (useHyperBurning && currentSimLevel >= 200 && currentSimLevel < 260) {
                    levelUpBonus = 5; // 1+4
                } else if (useBurningBeyond && currentSimLevel >= 260 && currentSimLevel < 270) {
                    levelUpBonus = 2; // 1+1
                }
                currentSimLevel += levelUpBonus;
                currentSimLevelProgress = 0;
            }

            // 마지막 몬스터파크 일수 저장
            if (monsterParkBreakdown.length > 0 && monsterParkDayCount > 0) {
                monsterParkBreakdown[monsterParkBreakdown.length - 1].days = monsterParkDayCount;
            }

            // 썬데이 메이플 보너스 적용 (전체 기간 중 1일만)
            if (useSundayMaple && monsterParkCount > 0) {
                // 썬데이 메이플 하루의 추가 보너스: (4배 - 1.5배) = 2.5배 추가
                // 현재 레벨의 몬파로 계산
                const sundayMapleExtraExp = monsterParkData.exp * monsterParkCount * 2.5;
                const dailyAvgExp = (huntingExpPerHour * dailyHuntingHours) + dailyQuestExp + dailyMonsterParkExp + dailyArcaneQuestExp + dailyGrandisQuestExp;
                if (dailyAvgExp > 0) {
                    // 썬데이 메이플로 줄어드는 일수
                    const daysSaved = sundayMapleExtraExp / dailyAvgExp;
                    daysNeeded = Math.max(0, dayCount - daysSaved);
                } else {
                    daysNeeded = dayCount;
                }
            } else {
                daysNeeded = dayCount;
            }

            hoursNeeded = totalHuntingHours;
        }

        return {
            totalExpNeeded,
            daysNeeded,
            hoursNeeded,
            levelBreakdown,
            monsterParkBreakdown,
        };
    }, [currentLevel, currentLevelExp, targetLevel, huntingMode, dailyLevelPercent, huntingExpPerHour, dailyQuestExp, dailyHuntingHours, monsterParkCount, mpEventSkillLevel, arcaneEventSkillLevel, grandisEventSkillLevel, useSundayMPBonus, useSundayMaple, useArcaneQuest, useGrandisQuest, useHyperBurning, useBurningBeyond, useHighMountain, highMountainReward, useAnglerCompany, anglerCompanyReward, useNightmareGarden, nightmareGardenReward, useExtremeMonsterPark]);

    // 숫자 포맷팅
    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('ko-KR').format(Math.round(num));
    };

    // 억 단위 포맷팅
    const formatExpInEok = (exp: number) => {
        const eok = exp / 100000000;
        if (eok >= 10000) {
            return `${(eok / 10000).toFixed(2)}조`;
        } else if (eok >= 1) {
            return `${eok.toFixed(2)}억`;
        } else {
            return formatNumber(exp);
        }
    };

    // 엑셀 내보내기
    const exportToExcel = () => {
        const worksheetData = [
            ['레벨 구간', '필요 경험치', '진행률 (%)'],
            ...calculatedData.levelBreakdown.map(item => [
                `Lv.${item.level} → ${item.level + 1}`,
                item.expNeeded,
                `${item.percentage.toFixed(1)}%`,
            ]),
            [],
            ['총 필요 경험치', calculatedData.totalExpNeeded],
            ['예상 소요 일수', calculatedData.daysNeeded > 0 ? `${calculatedData.daysNeeded.toFixed(1)}일` : '-'],
            ['예상 소요 시간', calculatedData.hoursNeeded > 0 ? `${calculatedData.hoursNeeded.toFixed(1)}시간` : '-'],
        ];

        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, '경험치 계산');

        XLSX.writeFile(workbook, `메이플_경험치계산_Lv${currentLevel}to${targetLevel}.xlsx`);
    };

    return (
        <div className="min-h-screen bg-[#1a1b1e] text-slate-200">
            {/* 헤더 */}
            <div className="sticky top-0 z-50 bg-[#1a1b1e]/80 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                            <span>메인으로</span>
                        </Link>
                        <button
                            onClick={exportToExcel}
                            disabled={calculatedData.totalExpNeeded === 0}
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 rounded-lg transition-colors text-sm font-medium"
                        >
                            <Download className="w-4 h-4" />
                            엑셀 내보내기
                        </button>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                            <Calculator className="w-8 h-8 text-blue-500" />
                            경험치 계산기
                        </h1>
                        <p className="text-slate-400 text-sm">
                            Lv.200~300 구간 목표 레벨까지 필요한 경험치와 예상 소요 시간을 계산하세요.
                        </p>
                    </div>
                </div>
            </div>

            {/* 메인 컨텐츠 */}
            <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {/* 좌측: 입력 섹션 */}
                    <div className="space-y-6">
                        {/* 레벨 설정 */}
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
                            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-blue-500" />
                                레벨 설정
                            </h2>
                            <div className="space-y-4">
                                {/* 현재 레벨 */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-sm font-medium text-slate-300">
                                            현재 레벨
                                        </label>
                                        <span className="text-2xl font-bold text-blue-400">
                                            Lv.{currentLevel}
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min="200"
                                        max="299"
                                        step="1"
                                        value={currentLevel}
                                        onChange={(e) => {
                                            const newLevel = Number(e.target.value);
                                            setCurrentLevel(newLevel);
                                            if (newLevel >= targetLevel) {
                                                setTargetLevel(Math.min(300, newLevel + 1));
                                            }
                                        }}
                                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                    />
                                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                                        <span>200</span>
                                        <span>299</span>
                                    </div>
                                </div>

                                {/* 현재 레벨 진행도 */}
                                <div>
                                    <label className="text-sm font-medium text-slate-300 mb-2 block">
                                        현재 레벨 진행도 (%)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="99"
                                        step="1"
                                        value={currentLevelExp}
                                        onChange={(e) => setCurrentLevelExp(Math.min(99, Math.max(0, Number(e.target.value))))}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="0"
                                    />
                                    <div className="mt-2 h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                                            style={{ width: `${currentLevelExp}%` }}
                                        />
                                    </div>
                                </div>

                                {/* 목표 레벨 */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-sm font-medium text-slate-300">
                                            목표 레벨
                                        </label>
                                        <span className="text-2xl font-bold text-purple-400">
                                            Lv.{targetLevel}
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min={currentLevel + 1}
                                        max="300"
                                        step="1"
                                        value={targetLevel}
                                        onChange={(e) => setTargetLevel(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                                    />
                                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                                        <span>{currentLevel + 1}</span>
                                        <span>300</span>
                                    </div>
                                </div>

                                {/* 하이퍼버닝 */}
                                {currentLevel < 260 && targetLevel > 200 && (
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={useHyperBurning}
                                                onChange={(e) => setUseHyperBurning(e.target.checked)}
                                                className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-red-600 focus:ring-red-500 focus:ring-offset-slate-900"
                                            />
                                            🔥 하이퍼버닝 (Lv.200~260)
                                        </label>
                                        {useHyperBurning && (
                                            <div className="mt-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                                                <p className="text-xs text-red-300 font-bold">
                                                    ⚡ 1레벨업 = 5레벨업! (+4 보너스)
                                                </p>
                                                <p className="text-xs text-red-300 mt-1">
                                                    예: 200→201 달성 시 → 실제 200→205
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* 버닝 비욘드 (Lv.260~270) */}
                                {currentLevel < 270 && targetLevel >= 260 && (
                                    <div className="pt-4 border-t border-slate-800">
                                        <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={useBurningBeyond}
                                                onChange={(e) => setUseBurningBeyond(e.target.checked)}
                                                className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-purple-600 focus:ring-purple-500 focus:ring-offset-slate-900"
                                            />
                                            ✨ 버닝 비욘드 (Lv.260~270)
                                        </label>
                                        {useBurningBeyond && (
                                            <div className="mt-2 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                                                <p className="text-xs text-purple-300 font-bold">
                                                    🚀 1레벨업 = 2레벨업! (+1 보너스)
                                                </p>
                                                <p className="text-xs text-purple-300 mt-1">
                                                    예: 260→261 달성 시 → 실제 260→262
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 사냥 효율 설정 */}
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
                            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Zap className="w-5 h-5 text-yellow-500" />
                                사냥 효율 설정
                            </h2>
                            <div className="space-y-4">
                                {/* 입력 방식 토글 (3가지) */}
                                <div className="grid grid-cols-3 gap-2 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                                    <button
                                        onClick={() => setHuntingMode('namuwiki')}
                                        className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${huntingMode === 'namuwiki'
                                            ? 'bg-blue-600 text-white shadow-lg'
                                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                            }`}
                                    >
                                        📖 나무위키
                                    </button>
                                    <button
                                        onClick={() => setHuntingMode('manual')}
                                        className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${huntingMode === 'manual'
                                            ? 'bg-yellow-600 text-white shadow-lg'
                                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                            }`}
                                    >
                                        ⏱️ 직접입력
                                    </button>
                                    <button
                                        onClick={() => setHuntingMode('percent')}
                                        className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${huntingMode === 'percent'
                                            ? 'bg-purple-600 text-white shadow-lg'
                                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                            }`}
                                    >
                                        📊 하루 %
                                    </button>
                                </div>

                                {/* 퍼센트 모드 */}
                                {huntingMode === 'percent' ? (
                                    <div>
                                        <label className="text-sm font-medium text-slate-300 mb-2 block">
                                            하루 올릴 경험치 (%)
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            step="1"
                                            value={dailyLevelPercent}
                                            onChange={(e) => {
                                                const val = e.target.value === '' ? 0 : Math.max(0, Math.min(100, Number(e.target.value)));
                                                setDailyLevelPercent(val);
                                            }}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                                            placeholder="20"
                                        />
                                        <p className="text-xs text-yellow-400 mt-2">
                                            💡 현재 레벨 필요 경험치의 {dailyLevelPercent}%를 하루에 획득
                                        </p>
                                    </div>
                                ) : huntingMode === 'namuwiki' ? (
                                    <>
                                        {/* 나무위키 기준 모드 */}
                                        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                                            <p className="text-sm text-blue-300 font-bold mb-2">
                                                📖 나무위키 기준 사냥 시간 자동 계산
                                            </p>
                                            <p className="text-xs text-blue-200">
                                                레벨별 시간당 경험치가 자동으로 적용됩니다. (평균 기준)
                                            </p>
                                        </div>

                                        {/* 하루 사냥 시간 */}
                                        <div>
                                            <label className="text-sm font-medium text-slate-300 mb-2 block">
                                                하루 사냥 시간 (시간)
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                max="24"
                                                step="0.5"
                                                value={dailyHuntingHours}
                                                onChange={(e) => {
                                                    const val = e.target.value === '' ? 0 : Math.max(0, Math.min(24, Number(e.target.value)));
                                                    setDailyHuntingHours(val);
                                                }}
                                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                                placeholder="3"
                                            />
                                        </div>

                                    </>
                                ) : (
                                    <>
                                        {/* 직접 입력 모드 */}
                                        <div>
                                            <label className="text-sm font-medium text-slate-300 mb-2 block">
                                                시간당 사냥 경험치
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                step="100000000"
                                                value={huntingExpPerHour}
                                                onChange={(e) => {
                                                    const val = e.target.value === '' ? 0 : Math.max(0, Number(e.target.value));
                                                    setHuntingExpPerHour(val);
                                                }}
                                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                                                placeholder="예: 10000000000 (100억)"
                                            />
                                            {huntingExpPerHour > 0 && (
                                                <p className="text-xs text-slate-500 mt-1">
                                                    시간당 약 {formatExpInEok(huntingExpPerHour)}
                                                </p>
                                            )}
                                        </div>

                                        {/* 하루 사냥 시간 */}
                                        <div>
                                            <label className="text-sm font-medium text-slate-300 mb-2 block">
                                                하루 사냥 시간 (시간)
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                max="24"
                                                step="0.5"
                                                value={dailyHuntingHours}
                                                onChange={(e) => {
                                                    const val = e.target.value === '' ? 0 : Math.max(0, Math.min(24, Number(e.target.value)));
                                                    setDailyHuntingHours(val);
                                                }}
                                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                                                placeholder="3"
                                            />
                                        </div>
                                    </>
                                )}

                                {/* 몬스터파크 횟수 */}
                                <div>
                                    <label className="text-sm font-medium text-slate-300 mb-2 block">
                                        몬스터파크 (하루 무료 2회, 최대 7회)
                                    </label>
                                    <select
                                        value={monsterParkCount}
                                        onChange={(e) => setMonsterParkCount(Number(e.target.value))}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                                    >
                                        {[0, 1, 2, 3, 4, 5, 6, 7].map(count => (
                                            <option key={count} value={count}>
                                                {count}회 {count === 0 ? '(안 함)' : count === 2 ? '(무료)' : ''}
                                            </option>
                                        ))}
                                    </select>

                                    {/* 몬파 이벤트 스킬 레벨 */}
                                    <div className="mt-3">
                                        <label className="text-sm font-medium text-purple-300 mb-2 block">
                                            🎮 몬파 이벤트 스킬 레벨
                                        </label>
                                        <select
                                            value={mpEventSkillLevel}
                                            onChange={(e) => setMpEventSkillLevel(Number(e.target.value))}
                                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                                        >
                                            <option value={0}>0 (보너스 없음)</option>
                                            <option value={1}>1 (+10%)</option>
                                            <option value={2}>2 (+20%)</option>
                                            <option value={3}>3 (+40%)</option>
                                            <option value={4}>4 (+60%)</option>
                                            <option value={5}>5 (+80%)</option>
                                            <option value={6}>6 (+100%, 2배!)</option>
                                        </select>
                                    </div>

                                    {monsterParkCount > 0 && (
                                        <>
                                            <div className="mt-2 p-2 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                                                <p className="text-xs text-purple-300">
                                                    📍 {monsterParkData.area} ({formatExpInEok(monsterParkData.exp)}/회)
                                                </p>
                                                <p className="text-xs text-purple-300 mt-1">
                                                    💰 하루 총 경험치: {formatExpInEok(dailyMonsterParkExp)}
                                                </p>
                                            </div>

                                            {/* 일요일 몬파 보너스 */}
                                            <div className="mt-2">
                                                <label className="flex items-center gap-2 text-xs font-medium text-purple-300 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={useSundayMPBonus}
                                                        onChange={(e) => setUseSundayMPBonus(e.target.checked)}
                                                        className="w-3 h-3 rounded bg-slate-800 border-slate-700 text-purple-600 focus:ring-purple-500 focus:ring-offset-slate-900"
                                                    />
                                                    ☀️ 일요일 보너스 포함 (+50%)
                                                </label>
                                                {useSundayMPBonus && (
                                                    <p className="text-xs text-purple-400 mt-1 ml-5">
                                                        평균 약 +7.1% 증가 효과
                                                    </p>
                                                )}
                                            </div>

                                            {/* 썬데이 메이플 이벤트 */}
                                            {useSundayMPBonus && (
                                                <div className="mt-2">
                                                    <label className="flex items-center gap-2 text-xs font-medium text-purple-300 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={useSundayMaple}
                                                            onChange={(e) => setUseSundayMaple(e.target.checked)}
                                                            className="w-3 h-3 rounded bg-slate-800 border-slate-700 text-yellow-600 focus:ring-yellow-500 focus:ring-offset-slate-900"
                                                        />
                                                        🎁 썬데이 메이플 (+250% 추가, 1번만!)
                                                    </label>
                                                    {useSundayMaple && (
                                                        <div className="mt-1 ml-5 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded">
                                                            <p className="text-xs text-yellow-300 font-bold">
                                                                ⚡ 특정 일요일 1일만 400% (4배!)
                                                            </p>
                                                            <p className="text-xs text-yellow-300 mt-1">
                                                                전체 기간 중 1일분 보너스 적용
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {/* 몬스터파크 변경 내역 */}
                                            {calculatedData.monsterParkBreakdown.length > 0 && (
                                                <div className="mt-2 space-y-2">
                                                    <p className="text-xs font-bold text-purple-300 flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        몬스터파크 변경 내역
                                                    </p>
                                                    {calculatedData.monsterParkBreakdown.map((mp, index) => (
                                                        <div
                                                            key={index}
                                                            className="bg-purple-900/20 border border-purple-700/50 rounded p-2"
                                                        >
                                                            <div className="flex items-center justify-between mb-1">
                                                                <span className="text-xs font-bold text-purple-200">
                                                                    📍 {mp.area}
                                                                </span>
                                                                <span className="text-xs text-purple-300">
                                                                    Lv.{mp.level}~
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center justify-between text-xs">
                                                                <span className="text-purple-300">
                                                                    {formatExpInEok(mp.exp)}/회 × {monsterParkCount}회
                                                                </span>
                                                                <span className="text-purple-400 font-bold">
                                                                    약 {mp.days.toFixed(1)}일
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <div className="p-2 bg-purple-500/10 border border-purple-500/30 rounded">
                                                        <p className="text-xs text-purple-300">
                                                            💡 레벨업하면서 몬스터파크가 자동으로 변경됩니다!
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>

                                {/* 익스트림 몬스터파크 */}
                                {targetLevel >= 260 && (
                                    <div className="pt-4 border-t border-slate-800">
                                        <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={useExtremeMonsterPark}
                                                onChange={(e) => setUseExtremeMonsterPark(e.target.checked)}
                                                className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-red-500 focus:ring-red-400 focus:ring-offset-slate-900"
                                            />
                                            👹 익스트림 몬스터파크 (주간 1회)
                                        </label>
                                        {useExtremeMonsterPark && (
                                            <p className="text-xs text-slate-400 pl-6">
                                                몬파 이벤트 스킬 보너스가 적용됩니다.
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* 아케인 일일 퀘스트 */}
                                {arcaneQuestData.exp > 0 && (
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={useArcaneQuest}
                                                onChange={(e) => setUseArcaneQuest(e.target.checked)}
                                                className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900"
                                            />
                                            아케인 일일 퀘스트 (월드당 1회)
                                        </label>

                                        {/* 아케인 일퀘 이벤트 스킬 레벨 */}
                                        <div className="mt-2">
                                            <label className="text-xs font-medium text-blue-300 mb-1 block">
                                                🎮 아케인 이벤트 스킬
                                            </label>
                                            <select
                                                value={arcaneEventSkillLevel}
                                                onChange={(e) => setArcaneEventSkillLevel(Number(e.target.value))}
                                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-blue-500 transition-colors"
                                            >
                                                <option value={0}>0 (보너스 없음)</option>
                                                <option value={1}>1 (+5%)</option>
                                                <option value={2}>2 (+10%)</option>
                                                <option value={3}>3 (+20%)</option>
                                                <option value={4}>4 (+30%)</option>
                                                <option value={5}>5 (+40%)</option>
                                                <option value={6}>6 (+50%)</option>
                                            </select>
                                        </div>

                                        {useArcaneQuest && arcaneQuestData.areas.length > 0 && (
                                            <div className="mt-2 p-2 bg-blue-500/10 border border-blue-500/30 rounded-lg space-y-1">
                                                <p className="text-xs text-blue-300 font-bold">
                                                    💎 총 {arcaneQuestData.areas.length}개 지역: {formatExpInEok(arcaneQuestData.exp)}
                                                </p>
                                                <p className="text-xs text-blue-200">
                                                    📖 {arcaneQuestData.areas.join(', ')}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* 그란디스 일일 퀘스트 */}
                                {targetLevel >= 260 && grandisQuestData.exp > 0 && (
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={useGrandisQuest}
                                                onChange={(e) => setUseGrandisQuest(e.target.checked)}
                                                className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-slate-900"
                                            />
                                            그란디스 일일 퀘스트 (월드당 1회)
                                        </label>

                                        {/* 그란디스 일퀘 이벤트 스킬 레벨 */}
                                        <div className="mt-2">
                                            <label className="text-xs font-medium text-emerald-300 mb-1 block">
                                                🎮 그란디스 이벤트 스킬
                                            </label>
                                            <select
                                                value={grandisEventSkillLevel}
                                                onChange={(e) => setGrandisEventSkillLevel(Number(e.target.value))}
                                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500 transition-colors"
                                            >
                                                <option value={0}>0 (보너스 없음)</option>
                                                <option value={1}>1 (+5%)</option>
                                                <option value={2}>2 (+10%)</option>
                                                <option value={3}>3 (+20%)</option>
                                                <option value={4}>4 (+30%)</option>
                                                <option value={5}>5 (+40%)</option>
                                                <option value={6}>6 (+50%)</option>
                                            </select>
                                        </div>

                                        {useGrandisQuest && grandisQuestData.areas.length > 0 && (
                                            <div className="mt-2 p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg space-y-1">
                                                <p className="text-xs text-emerald-300 font-bold">
                                                    💎 총 {grandisQuestData.areas.length}개 지역: {formatExpInEok(grandisQuestData.exp)}
                                                </p>
                                                <p className="text-xs text-emerald-200">
                                                    🗺️ {grandisQuestData.areas.join(', ')}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* 에픽 던전 (하이마운틴) */}
                                {targetLevel >= 260 && (
                                    <div className="pt-4 border-t border-slate-800">
                                        <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={useHighMountain}
                                                onChange={(e) => setUseHighMountain(e.target.checked)}
                                                className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900"
                                            />
                                            🏔️ 에픽 던전 : 하이마운틴 (주간)
                                        </label>

                                        {useHighMountain && (
                                            <div className="mt-2 pl-6 space-y-2">
                                                <div className="grid grid-cols-1 gap-2">
                                                    <button
                                                        onClick={() => setHighMountainReward('basic')}
                                                        className={`px-3 py-2 rounded-lg text-xs text-left border transition-all ${highMountainReward === 'basic'
                                                            ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                                                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                                                            }`}
                                                    >
                                                        <div className="font-bold">기본 보상</div>
                                                        <div className="text-[10px] opacity-70">메이플포인트 0</div>
                                                    </button>
                                                    <button
                                                        onClick={() => setHighMountainReward('stage1')}
                                                        className={`px-3 py-2 rounded-lg text-xs text-left border transition-all ${highMountainReward === 'stage1'
                                                            ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                                                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                                                            }`}
                                                    >
                                                        <div className="font-bold">EXP 1단계 (약 5배)</div>
                                                        <div className="text-[10px] opacity-70">7,500 메이플포인트</div>
                                                    </button>
                                                    <button
                                                        onClick={() => setHighMountainReward('stage2')}
                                                        className={`px-3 py-2 rounded-lg text-xs text-left border transition-all ${highMountainReward === 'stage2'
                                                            ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                                                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                                                            }`}
                                                    >
                                                        <div className="font-bold">EXP 2단계 (약 9배)</div>
                                                        <div className="text-[10px] opacity-70">30,000 메이플포인트</div>
                                                    </button>
                                                </div>
                                                <div className="p-2 bg-indigo-500/10 border border-indigo-500/30 rounded text-xs text-indigo-300">
                                                    <p>주 1회 획득 경험치를 7로 나누어 일일 평균에 반영합니다.</p>
                                                    {currentLevel >= 260 && (
                                                        <p className="mt-1 font-bold">
                                                            현재 레벨 기준 주간 {
                                                                HIGH_MOUNTAIN_EXP.find(d => d.level === currentLevel)
                                                                    ? (highMountainReward === 'basic' ? HIGH_MOUNTAIN_EXP.find(d => d.level === currentLevel)?.basic
                                                                        : highMountainReward === 'stage1' ? HIGH_MOUNTAIN_EXP.find(d => d.level === currentLevel)?.stage1
                                                                            : HIGH_MOUNTAIN_EXP.find(d => d.level === currentLevel)?.stage2)?.toFixed(2)
                                                                    : 0
                                                            }% 획득
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* 에픽 던전 (앵글러 컴퍼니) */}
                                {targetLevel >= 270 && (
                                    <div className="pt-4 border-t border-slate-800">
                                        <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={useAnglerCompany}
                                                onChange={(e) => setUseAnglerCompany(e.target.checked)}
                                                className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-rose-600 focus:ring-rose-500 focus:ring-offset-slate-900"
                                            />
                                            🏭 에픽 던전 : 앵글러 컴퍼니 (주간)
                                        </label>

                                        {useAnglerCompany && (
                                            <div className="mt-2 pl-6 space-y-2">
                                                <div className="grid grid-cols-1 gap-2">
                                                    <button
                                                        onClick={() => setAnglerCompanyReward('basic')}
                                                        className={`px-3 py-2 rounded-lg text-xs text-left border transition-all ${anglerCompanyReward === 'basic'
                                                            ? 'bg-rose-600/20 border-rose-500 text-rose-300'
                                                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                                                            }`}
                                                    >
                                                        <div className="font-bold">기본 보상</div>
                                                        <div className="text-[10px] opacity-70">메이플포인트 0</div>
                                                    </button>
                                                    <button
                                                        onClick={() => setAnglerCompanyReward('stage1')}
                                                        className={`px-3 py-2 rounded-lg text-xs text-left border transition-all ${anglerCompanyReward === 'stage1'
                                                            ? 'bg-rose-600/20 border-rose-500 text-rose-300'
                                                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                                                            }`}
                                                    >
                                                        <div className="font-bold">EXP 1단계 (약 5배)</div>
                                                        <div className="text-[10px] opacity-70">10,000 메이플포인트</div>
                                                    </button>
                                                    <button
                                                        onClick={() => setAnglerCompanyReward('stage2')}
                                                        className={`px-3 py-2 rounded-lg text-xs text-left border transition-all ${anglerCompanyReward === 'stage2'
                                                            ? 'bg-rose-600/20 border-rose-500 text-rose-300'
                                                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                                                            }`}
                                                    >
                                                        <div className="font-bold">EXP 2단계 (약 9배)</div>
                                                        <div className="text-[10px] opacity-70">40,000 메이플포인트</div>
                                                    </button>
                                                </div>
                                                <div className="p-2 bg-rose-500/10 border border-rose-500/30 rounded text-xs text-rose-300">
                                                    <p>주 1회 획득 경험치를 7로 나누어 일일 평균에 반영합니다.</p>
                                                    {currentLevel >= 270 && (
                                                        <p className="mt-1 font-bold">
                                                            현재 레벨 기준 주간 {
                                                                ANGLER_COMPANY_EXP.find(d => d.level === currentLevel)
                                                                    ? (anglerCompanyReward === 'basic' ? ANGLER_COMPANY_EXP.find(d => d.level === currentLevel)?.basic
                                                                        : anglerCompanyReward === 'stage1' ? ANGLER_COMPANY_EXP.find(d => d.level === currentLevel)?.stage1
                                                                            : ANGLER_COMPANY_EXP.find(d => d.level === currentLevel)?.stage2)?.toFixed(2)
                                                                    : 0
                                                            }% 획득
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* 에픽 던전 (악몽선경) */}
                                {targetLevel >= 280 && (
                                    <div className="pt-4 border-t border-slate-800">
                                        <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={useNightmareGarden}
                                                onChange={(e) => setUseNightmareGarden(e.target.checked)}
                                                className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-purple-500 focus:ring-purple-400 focus:ring-offset-slate-900"
                                            />
                                            🌌 에픽 던전 : 악몽선경 (주간)
                                        </label>

                                        {useNightmareGarden && (
                                            <div className="mt-2 pl-6 space-y-2">
                                                <div className="grid grid-cols-1 gap-2">
                                                    <button
                                                        onClick={() => setNightmareGardenReward('basic')}
                                                        className={`px-3 py-2 rounded-lg text-xs text-left border transition-all ${nightmareGardenReward === 'basic'
                                                            ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                                                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                                                            }`}
                                                    >
                                                        <div className="font-bold">기본 보상</div>
                                                        <div className="text-[10px] opacity-70">메이플포인트 0</div>
                                                    </button>
                                                    <button
                                                        onClick={() => setNightmareGardenReward('stage1')}
                                                        className={`px-3 py-2 rounded-lg text-xs text-left border transition-all ${nightmareGardenReward === 'stage1'
                                                            ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                                                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                                                            }`}
                                                    >
                                                        <div className="font-bold">EXP 1단계 (약 5배)</div>
                                                        <div className="text-[10px] opacity-70">7,500 메이플포인트</div>
                                                    </button>
                                                    <button
                                                        onClick={() => setNightmareGardenReward('stage2')}
                                                        className={`px-3 py-2 rounded-lg text-xs text-left border transition-all ${nightmareGardenReward === 'stage2'
                                                            ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                                                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                                                            }`}
                                                    >
                                                        <div className="font-bold">EXP 2단계 (약 9배)</div>
                                                        <div className="text-[10px] opacity-70">30,000 메이플포인트</div>
                                                    </button>
                                                </div>
                                                <div className="p-2 bg-purple-500/10 border border-purple-500/30 rounded text-xs text-purple-300">
                                                    <p>주 1회 획득 경험치를 7로 나누어 일일 평균에 반영합니다. (Lv.280부터 적용)</p>
                                                    {currentLevel >= 280 && (
                                                        <p className="mt-1 font-bold">
                                                            현재 레벨 기준 주간 {
                                                                NIGHTMARE_GARDEN_EXP.find(d => d.level === currentLevel)
                                                                    ? (nightmareGardenReward === 'basic' ? NIGHTMARE_GARDEN_EXP.find(d => d.level === currentLevel)?.basic
                                                                        : nightmareGardenReward === 'stage1' ? NIGHTMARE_GARDEN_EXP.find(d => d.level === currentLevel)?.stage1
                                                                            : NIGHTMARE_GARDEN_EXP.find(d => d.level === currentLevel)?.stage2)?.toFixed(4)
                                                                    : 0
                                                            }% 획득
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                                <div>
                                    <label className="text-sm font-medium text-slate-300 mb-2 block">
                                        기타 일일 경험치
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="100000000"
                                        value={dailyQuestExp}
                                        onChange={(e) => setDailyQuestExp(Number(e.target.value))}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                                        placeholder="예: 5000000000 (50억)"
                                    />
                                    {dailyQuestExp > 0 && (
                                        <p className="text-xs text-slate-500 mt-1">
                                            일일 약 {formatExpInEok(dailyQuestExp)}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                                <p className="text-xs text-blue-300 flex items-start gap-2">
                                    <Info className="w-4 h-4 shrink-0 mt-0.5" />
                                    <span>
                                        사냥 효율을 입력하면 목표 레벨까지 예상 소요 시간을 계산합니다.
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 우측: 결과 섹션 */}
                    <div className="space-y-6">
                        {/* 계산 결과 요약 */}
                        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 shadow-lg text-white">
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Calculator className="w-5 h-5" />
                                계산 결과
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-blue-100 mb-1">레벨 구간</p>
                                    <p className="text-2xl font-bold">
                                        Lv.{currentLevel} → Lv.{targetLevel}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-blue-100 mb-1">총 필요 경험치</p>
                                    <p className="text-3xl font-bold">
                                        {formatExpInEok(calculatedData.totalExpNeeded)}
                                    </p>
                                    <p className="text-xs text-blue-100 mt-1">
                                        {formatNumber(calculatedData.totalExpNeeded)}
                                    </p>
                                </div>
                                {calculatedData.daysNeeded > 0 && (
                                    <>
                                        <div className="border-t border-white/20 pt-4">
                                            <p className="text-sm text-blue-100 mb-1 flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                예상 소요 일수
                                            </p>
                                            <p className="text-2xl font-bold">
                                                약 {calculatedData.daysNeeded.toFixed(1)}일
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-blue-100 mb-1 flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                순수 사냥 시간
                                            </p>
                                            <p className="text-2xl font-bold">
                                                약 {calculatedData.hoursNeeded > 0 ? calculatedData.hoursNeeded.toFixed(1) : '-'}시간
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* 레벨별 상세 내역 */}
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
                            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-green-500" />
                                레벨별 상세 내역
                            </h2>
                            <div className="max-h-[500px] overflow-y-auto space-y-2 pr-2">
                                {calculatedData.levelBreakdown.length > 0 ? (
                                    calculatedData.levelBreakdown.map((item, index) => (
                                        <div
                                            key={index}
                                            className="bg-slate-800 border border-slate-700 rounded-lg p-3 hover:border-blue-500/50 transition-colors"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-bold text-white">
                                                    Lv.{item.level} → {item.level + 1}
                                                </span>
                                                <span className="text-xs text-slate-400">
                                                    {item.percentage.toFixed(1)}%
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-slate-400">
                                                    {formatExpInEok(item.expNeeded)}
                                                </span>
                                                <span className="text-xs text-slate-500">
                                                    {formatNumber(item.expNeeded)}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-10 text-slate-500">
                                        <Info className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                        <p>레벨 설정을 확인해주세요.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* 📊 사냥 소요 시간 참고표 */}
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
                            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-orange-500" />
                                사냥 소요 시간 참고표 (나무위키 기준)
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-slate-400">
                                    <thead className="text-[10px] sm:text-xs text-slate-300 uppercase bg-slate-800">
                                        <tr>
                                            <th className="px-2 py-2 sm:px-4 sm:py-3 rounded-l-lg whitespace-nowrap">구간</th>
                                            <th className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap">레벨당 시간</th>
                                            <th className="px-2 py-2 sm:px-4 sm:py-3 whitespace-nowrap">예상 소요</th>
                                            <th className="px-2 py-2 sm:px-4 sm:py-3 rounded-r-lg whitespace-nowrap hidden sm:table-cell">추천 사냥터</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-[11px] sm:text-sm">
                                        {HUNTING_EXP_DATA.filter(d => (d.startLevel >= currentLevel && d.startLevel < targetLevel) || (d.endLevel > currentLevel && d.endLevel <= targetLevel) || (d.startLevel <= currentLevel && d.endLevel >= targetLevel)).slice(0, 5).map((data, index) => {
                                            // 예상 일수 계산 (해당 구간 전체)
                                            const avgMinutes = (data.minTimePerLevel + data.maxTimePerLevel) / 2;
                                            const levelCount = Math.min(data.endLevel, targetLevel) - Math.max(data.startLevel, currentLevel);
                                            const totalMinutes = avgMinutes * levelCount;
                                            const daysNeeded = dailyHuntingHours > 0 ? totalMinutes / (dailyHuntingHours * 60) : 0;

                                            if (levelCount <= 0) return null;

                                            return (
                                                <tr key={index} className="border-b border-slate-800 hover:bg-slate-800/50">
                                                    <td className="px-2 py-2 sm:px-4 sm:py-3 font-medium text-white whitespace-nowrap">
                                                        {data.startLevel}~{data.endLevel}
                                                        {/* 모바일에서만 사냥터 표시 */}
                                                        <div className="sm:hidden text-[10px] text-slate-500 font-normal mt-0.5 truncate max-w-[80px]">
                                                            {data.huntingGrounds[0]}
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-2 sm:px-4 sm:py-3">
                                                        <div className="text-slate-300 whitespace-nowrap">{formatHuntingTime(avgMinutes)}</div>
                                                        <div className="text-[10px] sm:text-xs text-slate-500 whitespace-nowrap">
                                                            {data.minTimePerLevel}~{data.maxTimePerLevel}분
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-2 sm:px-4 sm:py-3 text-orange-400 font-bold whitespace-nowrap">
                                                        {daysNeeded > 0 ? (
                                                            <>
                                                                {daysNeeded.toFixed(1)}일
                                                                <span className="text-[10px] sm:text-xs font-normal text-slate-500 block">
                                                                    (일 {dailyHuntingHours}시간)
                                                                </span>
                                                            </>
                                                        ) : '-'}
                                                    </td>
                                                    <td className="px-2 py-2 sm:px-4 sm:py-3 text-xs hidden sm:table-cell">
                                                        {data.huntingGrounds[0]}
                                                        {data.huntingGrounds.length > 1 && ` 외 ${data.huntingGrounds.length - 1}`}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700 text-xs text-slate-400 space-y-2">
                                    <div className="font-bold text-slate-300 mb-1 flex items-center gap-2">
                                        <Info className="w-3 h-3" />
                                        산정 기준 상세
                                    </div>
                                    <ul className="space-y-1.5 list-disc list-inside">
                                        <li>
                                            <strong className="text-slate-300">기본 조건:</strong> 3배 경쿠 풀도핑, 최적 지형, 원킬/원젠, 버닝 1단계
                                        </li>
                                        <li>
                                            <strong className="text-slate-300">솔 야누스:</strong> 264이하 미개방, 265+ 1강, 280+ 10강, 285+ 20강, 290+ 30강
                                        </li>
                                        <li>
                                            <strong className="text-slate-300">PC방 효과:</strong> 미포함 (PC방 사냥 시 약 1.05배 기대)
                                        </li>
                                        <li>
                                            <strong className="text-slate-300">이벤트 효과:</strong> 부스터/이벤트 필드 효과 등 미포함 (포함 시 약 2.2배 기대)
                                        </li>
                                        <li className="text-slate-500 pt-1 list-none pl-0">
                                            ※ 직업, 사냥터에 따라 차이가 있을 수 있으니 단순 참고용으로 확인해주세요.
                                        </li>
                                    </ul>
                                    <div className="mt-2 text-right">
                                        <a
                                            href="https://namu.wiki/w/%EB%A9%94%EC%9D%B4%ED%94%8C%EC%8A%A4%ED%86%A0%EB%A6%AC/%EB%A0%88%EB%B2%A8#s-5"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-blue-400 hover:text-blue-300 hover:underline inline-flex items-center gap-1 transition-colors"
                                        >
                                            🔗 나무위키 원문 보기
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 하단 안내 */}
                <div className="mt-8 bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                    <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                        <Info className="w-4 h-4 text-blue-500" />
                        사용 안내
                    </h3>
                    <ul className="text-xs text-slate-400 space-y-2">
                        <li>• <strong className="text-slate-300">레벨 200~300</strong> 구간의 경험치 데이터를 기반으로 계산됩니다.</li>
                        <li>• <strong className="text-slate-300">시간당 사냥 경험치</strong>는 본인의 사냥터에서 1시간 동안 획득하는 평균 경험치를 입력하세요.</li>
                        <li>• <strong className="text-slate-300">몬스터파크</strong>는 하루 무료 2회, 최대 7회까지 가능합니다. 현재 레벨에 맞는 던전이 자동으로 계산됩니다.</li>
                        <li>• <strong className="text-slate-300">기타 일일 경험치</strong>에는 극한의 마수, 우르스, 에르다 등을 포함할 수 있습니다.</li>
                        <li>• 계산 결과는 <strong className="text-slate-300">엑셀로 내보내기</strong>하여 저장할 수 있습니다.</li>
                    </ul>
                </div>
            </main >
        </div >
    );
}
