/**
 * useCharacterSearch Hook
 * 캐릭터 검색 및 데이터 로딩 로직
 */

import { useState } from 'react';
import {
    getOcid,
    getCharacterBasic,
    getCharacterItemEquipment,
    getCharacterStat,
    getCharacterUnion,
    getCharacterLinkSkill,
    getUserUnionRaider,
} from '@/lib/nexon';

interface CharacterData {
    character_name: string;
    character_level: number;
    character_class: string;
    character_image: string;
    world_name: string;
}

interface FinalStat {
    stat_name: string;
    stat_value: string;
}

interface StatData {
    final_stat: FinalStat[];
}

interface UnionData {
    union_level: number;
    union_grade: string;
}

export interface ItemData {
    item_equipment_slot: string;
    item_name: string;
    item_icon: string;
    potential_option_grade: string;
    additional_potential_option_grade: string;
    starforce: string;
    potential_option_1: string;
    potential_option_2: string;
    potential_option_3: string;
    additional_potential_option_1: string;
    additional_potential_option_2: string;
    additional_potential_option_3: string;
    [key: string]: any;
}

export function useCharacterSearch() {
    const [nickname, setNickname] = useState('');
    const [character, setCharacter] = useState<CharacterData | null>(null);
    const [equipment, setEquipment] = useState<ItemData[]>([]);
    const [stats, setStats] = useState<StatData | null>(null);
    const [union, setUnion] = useState<UnionData | null>(null);
    const [ocid, setOcid] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [linkSkillData, setLinkSkillData] = useState<any>(null);
    const [unionRaiderData, setUnionRaiderData] = useState<any>(null);

    const handleSearch = async () => {
        setLoading(true);
        setError('');

        try {
            // 1. Get OCID
            const ocidData = await getOcid(nickname);
            if (!ocidData?.ocid) {
                setError('캐릭터를 찾을 수 없습니다.');
                setLoading(false);
                return;
            }
            setOcid(ocidData.ocid);

            // 2. Get Character Basic Info
            const basicData = await getCharacterBasic(ocidData.ocid);
            if (!basicData?.character_name) {
                setError('캐릭터 정보를 가져올 수 없습니다.');
                setLoading(false);
                return;
            }
            setCharacter(basicData);

            // 3. Get Equipment
            const equipmentData = await getCharacterItemEquipment(ocidData.ocid);
            setEquipment(equipmentData?.item_equipment || []);

            // 4. Get Stats
            const statsData = await getCharacterStat(ocidData.ocid);
            setStats(statsData);

            // 5. Get Union
            const unionData = await getCharacterUnion(ocidData.ocid);
            setUnion(unionData);

            // 6. Get Link Skills
            const linkSkills = await getCharacterLinkSkill(ocidData.ocid);
            setLinkSkillData(linkSkills);

            // 7. Get Union Raider
            const unionRaider = await getUserUnionRaider(ocidData.ocid);
            setUnionRaiderData(unionRaider);

        } catch (err: any) {
            console.error('Search error:', err);
            setError(err.message || '오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setCharacter(null);
        setEquipment([]);
        setStats(null);
        setUnion(null);
        setOcid('');
        setError('');
        setLinkSkillData(null);
        setUnionRaiderData(null);
    };

    return {
        // State
        nickname,
        character,
        equipment,
        stats,
        union,
        ocid,
        loading,
        error,
        linkSkillData,
        unionRaiderData,

        // Actions
        setNickname,
        handleSearch,
        reset,
        setEquipment,
    };
}
