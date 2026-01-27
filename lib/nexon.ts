"use server";

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
async function nexonFetch(endpoint: string, params: Record<string, any> = {}, revalidate = 3600, retries = 3): Promise<any> {
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
            },
            next: { revalidate } // 동적 캐시 시간 적용
        });

        if (response.status === 429) {
            if (retries > 0) {
                console.warn(`Rate limit exceeded for ${endpoint}. Retrying in 1 second... (${retries} attempts left)`);
                await new Promise(resolve => setTimeout(resolve, 1000));
                return nexonFetch(endpoint, params, revalidate, retries - 1);
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

export const getCharacterBasic = async (ocid: string) => {
    // 기본 정보는 날짜 없이 조회 (최신 기준)
    const res = await nexonFetch('/maplestory/v1/character/basic', { ocid }, 0);
    return res.data;
};

export const getCharacterStat = async (ocid: string) => {
    const res = await nexonFetch('/maplestory/v1/character/stat', { ocid }, 0);
    return res.data;
};

export const getCharacterItemEquipment = async (ocid: string) => {
    const res = await nexonFetch('/maplestory/v1/character/item-equipment', { ocid }, 0);
    return res.data;
};

export const getCharacterLinkSkill = async (ocid: string) => {
    const res = await nexonFetch('/maplestory/v1/character/link-skill', { ocid }, 0);
    return res.data;
};

export const getCharacterAbility = async (ocid: string) => {
    const res = await nexonFetch('/maplestory/v1/character/ability', { ocid }, 0);
    return res.data;
};

export const getCharacterHyperStat = async (ocid: string) => {
    const res = await nexonFetch('/maplestory/v1/character/hyper-stat', { ocid }, 0);
    return res.data;
};

export const getUserUnionRaider = async (ocid: string) => {
    const res = await nexonFetch('/maplestory/v1/user/union-raider', { ocid }, 0);
    return res.data;
};

export const getCharacterUnion = async (ocid: string) => {
    const res = await nexonFetch('/maplestory/v1/user/union', { ocid }, 0);
    return res.data;
};

export const getCharacterHexaMatrix = async (ocid: string) => {
    const res = await nexonFetch('/maplestory/v1/character/hexamatrix', { ocid }, 0);
    return res.data;
};

export const getCharacterHexaMatrixStat = async (ocid: string) => {
    const res = await nexonFetch('/maplestory/v1/character/hexamatrix-stat', { ocid }, 0);
    return res.data;
};

// 유니온 아티팩트 정보 조회
export const getUserUnionArtifact = async (ocid: string) => {
    const res = await nexonFetch('/maplestory/v1/user/union-artifact', { ocid }, 0);
    return res.data;
};

// 유니온 챔피언 정보 조회
export const getUserUnionChampion = async (ocid: string) => {
    const res = await nexonFetch('/maplestory/v1/user/union-champion', { ocid }, 0);
    return res.data;
};

// 심볼 장비 정보 조회
export const getCharacterSymbolEquipment = async (ocid: string) => {
    const res = await nexonFetch('/maplestory/v1/character/symbol-equipment', { ocid }, 0);
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

// ============== 랭킹 API ==============

// 종합 랭킹 정보 조회
export const getOverallRanking = async (date?: string, world_name?: string, world_type?: string, class_name?: string, ocid?: string, page?: number) => {
    const params: Record<string, any> = {
        date: date || getValidDate()
    };
    if (world_name) params.world_name = world_name;
    if (world_type) params.world_type = world_type;
    if (class_name) params.class = class_name;
    if (ocid) params.ocid = ocid;
    if (page) params.page = page;

    const res = await nexonFetch('/maplestory/v1/ranking/overall', params, 82800);
    return res.data;
};

// 유니온 랭킹 정보 조회
export const getUnionRanking = async (date?: string, world_name?: string, ocid?: string, page?: number) => {
    const params: Record<string, any> = {
        date: date || getValidDate()
    };
    if (world_name) params.world_name = world_name;
    if (ocid) params.ocid = ocid;
    if (page) params.page = page;

    const res = await nexonFetch('/maplestory/v1/ranking/union', params, 82800);
    return res.data;
};

// 길드 랭킹 정보 조회
export const getGuildRanking = async (date?: string, world_name?: string, guild_name?: string, page?: number) => {
    const params: Record<string, any> = {
        date: date || getValidDate(),
        ranking_type: 0 // 0: 주간 명성치, 1: 플래그 레이스, 2: 지하 수로
    };
    if (world_name) params.world_name = world_name;
    if (guild_name) params.guild_name = guild_name;
    if (page) params.page = page;

    const res = await nexonFetch('/maplestory/v1/ranking/guild', params, 82800);
    return res.data;
};

// 무릉도장 랭킹 정보 조회
export const getDojangRanking = async (date?: string, world_name?: string, difficulty?: number, class_name?: string, ocid?: string, page?: number) => {
    const params: Record<string, any> = {
        date: date || getValidDate(),
        difficulty: difficulty ?? 0 // 0: 일반, 1: 통달
    };
    if (world_name) params.world_name = world_name;
    if (class_name) params.class = class_name;
    if (ocid) params.ocid = ocid;
    if (page) params.page = page;

    const res = await nexonFetch('/maplestory/v1/ranking/dojang', params, 82800);
    return res.data;
};

// 더 시드 랭킹 정보 조회
export const getTheSeedRanking = async (date?: string, world_name?: string, ocid?: string, page?: number) => {
    const params: Record<string, any> = {
        date: date || getValidDate()
    };
    if (world_name) params.world_name = world_name;
    if (ocid) params.ocid = ocid;
    if (page) params.page = page;

    const res = await nexonFetch('/maplestory/v1/ranking/theseed', params, 82800);
    return res.data;
};

// 업적 랭킹 정보 조회
export const getAchievementRanking = async (date?: string, ocid?: string, page?: number) => {
    const params: Record<string, any> = {
        date: date || getValidDate()
    };
    if (ocid) params.ocid = ocid;
    if (page) params.page = page;

    const res = await nexonFetch('/maplestory/v1/ranking/achievement', params, 82800);
    return res.data;
};
