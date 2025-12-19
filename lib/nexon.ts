"use server";

import { unstable_cache } from 'next/cache';

const API_KEY = process.env.NEXON_API_KEY || '';
const BASE_URL = process.env.NEXON_API_URL || 'https://open.api.nexon.com';

// 한국 시간(KST) 기준 유효한 날짜 반환 함수
// 넥슨 API는 매일 오전 1시(KST)에 전날 데이터를 갱신함
// 따라서 오전 0시~1시 사이에는 전전날 데이터를 조회해야 함
const getValidDate = (): string => {
    const now = new Date();
    // 1. UTC 시간 계산
    const utc = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
    // 2. KST(UTC+9) 시간 계산
    const kstDiff = 9 * 60 * 60 * 1000;
    const kst = new Date(utc + kstDiff);

    const kstHour = kst.getHours();

    // 3. 날짜 조정
    // 오전 1시 이전이면 2일 전 데이터 조회 (아직 어제 데이터 갱신 안됨)
    // 오전 1시 이후면 1일 전 데이터 조회 (어제 데이터 갱신 완료)
    if (kstHour < 1) {
        kst.setDate(kst.getDate() - 2);
    } else {
        kst.setDate(kst.getDate() - 1);
    }

    // 4. YYYY-MM-DD 포맷팅
    const year = kst.getFullYear();
    const month = String(kst.getMonth() + 1).padStart(2, '0');
    const day = String(kst.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

// 강력한 캐시 방지 Fetch 함수
async function nexonFetch(endpoint: string, params: Record<string, any> = {}, retries = 3): Promise<any> {
    if (!API_KEY) {
        console.error("❌ NEXON_API_KEY is missing in environment variables!");
        throw new Error("API Key is missing");
    }

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

        if (response.status === 429) {
            if (retries > 0) {
                console.warn(`Rate limit exceeded for ${endpoint}. Retrying in 1 second... (${retries} attempts left)`);
                await new Promise(resolve => setTimeout(resolve, 1000));
                return nexonFetch(endpoint, params, retries - 1);
            }
        }

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`API Error (${response.status}): ${errorText}`);
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

export const getCharacterBasic = unstable_cache(
    async (ocid: string) => {
        // 기본 정보는 날짜 없이 조회 (최신 기준)
        const res = await nexonFetch('/maplestory/v1/character/basic', { ocid });
        return res.data;
    },
    ['character-basic'],
    { revalidate: 3600 } // 1시간 캐시
);

export const getCharacterStat = unstable_cache(
    async (ocid: string) => {
        const res = await nexonFetch('/maplestory/v1/character/stat', { ocid });
        return res.data;
    },
    ['character-stat'],
    { revalidate: 3600 }
);

export const getCharacterItemEquipment = unstable_cache(
    async (ocid: string) => {
        const res = await nexonFetch('/maplestory/v1/character/item-equipment', { ocid });
        return res.data;
    },
    ['character-item-equipment'],
    { revalidate: 3600 }
);



export const getCharacterLinkSkill = unstable_cache(
    async (ocid: string) => {
        const res = await nexonFetch('/maplestory/v1/character/link-skill', { ocid });
        return res.data;
    },
    ['character-link-skill'],
    { revalidate: 3600 }
);

export const getCharacterAbility = unstable_cache(
    async (ocid: string) => {
        const res = await nexonFetch('/maplestory/v1/character/ability', { ocid });
        return res.data;
    },
    ['character-ability'],
    { revalidate: 3600 }
);

export const getCharacterHyperStat = unstable_cache(
    async (ocid: string) => {
        const res = await nexonFetch('/maplestory/v1/character/hyper-stat', { ocid });
        return res.data;
    },
    ['character-hyper-stat'],
    { revalidate: 3600 }
);

export const getUserUnionRaider = unstable_cache(
    async (ocid: string) => {
        const res = await nexonFetch('/maplestory/v1/user/union-raider', { ocid });
        return res.data;
    },
    ['user-union-raider'],
    { revalidate: 3600 }
);

export const getCharacterUnion = unstable_cache(
    async (ocid: string) => {
        const res = await nexonFetch('/maplestory/v1/user/union', { ocid });
        return res.data;
    },
    ['character-union'],
    { revalidate: 3600 }
);

export const getCharacterHexaMatrix = unstable_cache(
    async (ocid: string) => {
        const res = await nexonFetch('/maplestory/v1/character/hexamatrix', { ocid });
        return res.data;
    },
    ['character-hexamatrix'],
    { revalidate: 3600 }
);

export const getCharacterHexaMatrixStat = unstable_cache(
    async (ocid: string) => {
        const res = await nexonFetch('/maplestory/v1/character/hexamatrix-stat', { ocid });
        return res.data;
    },
    ['character-hexamatrix-stat'],
    { revalidate: 3600 }
);

// 유니온 아티팩트 정보 조회
export const getUserUnionArtifact = unstable_cache(
    async (ocid: string) => {
        const res = await nexonFetch('/maplestory/v1/user/union-artifact', { ocid });
        return res.data;
    },
    ['user-union-artifact'],
    { revalidate: 3600 }
);

// 유니온 챔피언 정보 조회
export const getUserUnionChampion = unstable_cache(
    async (ocid: string) => {
        const res = await nexonFetch('/maplestory/v1/user/union-champion', { ocid });
        return res.data;
    },
    ['user-union-champion'],
    { revalidate: 3600 }
);

// 심볼 장비 정보 조회
export const getCharacterSymbolEquipment = unstable_cache(
    async (ocid: string) => {
        const res = await nexonFetch('/maplestory/v1/character/symbol-equipment', { ocid });
        return res.data;
    },
    ['character-symbol-equipment'],
    { revalidate: 3600 }
);

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
