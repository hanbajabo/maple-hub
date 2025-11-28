"use server";

const API_KEY = process.env.NEXON_API_KEY || '';
const BASE_URL = process.env.NEXON_API_URL || 'https://open.api.nexon.com';

// 한국 시간(KST) 기준 어제 날짜 반환 함수
const getYesterday = (): string => {
    const now = new Date();
    // 1. UTC 시간 계산
    const utc = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
    // 2. KST(UTC+9) 시간 계산
    const kstDiff = 9 * 60 * 60 * 1000;
    const kst = new Date(utc + kstDiff);

    // 3. 하루 전으로 설정
    kst.setDate(kst.getDate() - 1);

    // 4. YYYY-MM-DD 포맷팅
    const year = kst.getFullYear();
    const month = String(kst.getMonth() + 1).padStart(2, '0');
    const day = String(kst.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

// 강력한 캐시 방지 Fetch 함수
async function nexonFetch(endpoint: string, params: Record<string, any> = {}) {
    try {
        // 1. 무작위 난수 생성 (브라우저가 URL을 기억하지 못하게 함)
        const uniqueId = `${Date.now()}_${Math.floor(Math.random() * 10000)}`;

        const queryParams = new URLSearchParams({
            ...params,
            '_': uniqueId // 넥슨 서버는 이걸 무시하지만, 브라우저는 새로운 주소로 인식함
        });

        console.log(`Fetching New Data: ${endpoint}?${queryParams.toString()}`); // 디버깅용 로그

        const response = await fetch(`${BASE_URL}${endpoint}?${queryParams.toString()}`, {
            method: 'GET',
            headers: {
                'x-nxopen-api-key': API_KEY,
                'Content-Type': 'application/json',
                // ★ 캐시 방지 헤더 3대장 강제 주입
                'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
                'Pragma': 'no-cache',
                'Expires': '0'
            },
            cache: 'no-store', // Next.js 캐시 끄기
            next: { revalidate: 0 } // ISR 끄기
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return { data };

    } catch (error) {
        console.error(`Fetch Error (${endpoint}):`, error);
        throw error;
    }
}

// --- API 호출 함수들 ---

export const getOcid = async (characterName: string) => {
    const res = await nexonFetch('/maplestory/v1/id', { character_name: characterName });
    return res.data.ocid;
};

export const getCharacterBasic = async (ocid: string) => {
    const res = await nexonFetch('/maplestory/v1/character/basic', { ocid });
    return res.data;
};

export const getCharacterStat = async (ocid: string) => {
    const res = await nexonFetch('/maplestory/v1/character/stat', { ocid });
    return res.data;
};

export const getCharacterItemEquipment = async (ocid: string) => {
    const res = await nexonFetch('/maplestory/v1/character/item-equipment', { ocid });
    return res.data;
};



export const getCharacterLinkSkill = async (ocid: string) => {
    const res = await nexonFetch('/maplestory/v1/character/link-skill', { ocid });
    return res.data;
};

export const getCharacterAbility = async (ocid: string) => {
    const res = await nexonFetch('/maplestory/v1/character/ability', { ocid });
    return res.data;
};

export const getCharacterHyperStat = async (ocid: string) => {
    const res = await nexonFetch('/maplestory/v1/character/hyper-stat', { ocid });
    return res.data;
};

export const getUserUnionRaider = async (ocid: string) => {
    const res = await nexonFetch('/maplestory/v1/user/union-raider', { ocid });
    return res.data;
};

export const getCharacterUnion = async (ocid: string) => {
    const res = await nexonFetch('/maplestory/v1/user/union', { ocid });
    return res.data;
};

export const getCharacterHexaMatrix = async (ocid: string) => {
    const res = await nexonFetch('/maplestory/v1/character/hexamatrix', { ocid });
    return res.data;
};

export const getCharacterHexaMatrixStat = async (ocid: string) => {
    const res = await nexonFetch('/maplestory/v1/character/hexamatrix-stat', { ocid });
    return res.data;
};

// 유니온 아티팩트 정보 조회
export const getUserUnionArtifact = async (ocid: string) =>
    nexonFetch('/maplestory/v1/user/union-artifact', { ocid });

// 유니온 챔피언 정보 조회
export const getUserUnionChampion = async (ocid: string) =>
    nexonFetch('/maplestory/v1/user/union-champion', { ocid });

// 심볼 장비 정보 조회
export const getCharacterSymbolEquipment = async (ocid: string) => {
    const res = await nexonFetch('/maplestory/v1/character/symbol-equipment', { ocid });
    return res.data;
};

// 공지사항 목록 조회
export const getNoticeList = async () => {
    const res = await nexonFetch('/maplestory/v1/notice', {});
    return res.data;
};

// 업데이트 목록 조회
export const getUpdateList = async () => {
    const res = await nexonFetch('/maplestory/v1/notice-update', {});
    return res.data;
};

// 진행 중 이벤트 목록 조회
export const getEventList = async () => {
    const res = await nexonFetch('/maplestory/v1/notice-event', {});
    return res.data;
};
