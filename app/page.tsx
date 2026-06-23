"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { JOB_META_DATA } from "@/src/data/diagnosisData";
import { useSearchParams } from "next/navigation";
import { toPng } from "html-to-image";
import { Search, RefreshCw, Swords, Camera, X, Star, List, TrendingUp } from "lucide-react";
import { getOcid, getCharacterBasic, getCharacterItemEquipment, getCharacterStat, getCharacterUnion, getCharacterLinkSkill, getUserUnionRaider } from "../lib/nexon";
import { calculateCumulativeExpectedCost } from "../lib/starforce_db";
import { diagnoseEquipment } from "../lib/diagnosis/equipment";
import { EquipmentReport } from "../lib/diagnosis/types";

import LinkSkillBadge from "../components/LinkSkillBadge";
import UnionDiagnostic from "../components/UnionDiagnostic";
import HexaWidget from "../components/HexaWidget";
import ArtifactBadge from "../components/ArtifactBadge";
import ChampionBadge from "../components/ChampionBadge";
import SymbolBadge from "../components/SymbolBadge";
import ItemDiagnosis from "../components/ItemDiagnosis";
import AbilityWidget from "../components/AbilityWidget";


import RecommendedGuides from "../components/RecommendedGuides";
import Footer from "../components/Footer";
import MapleStoryTrivia from "../components/MapleStoryTrivia";

import CombatPowerRank, { TIERS } from "../components/CombatPowerRank";
import WeaponDiagnosisModal from "../components/WeaponDiagnosisModal";
import EquipmentOverviewModal from "../components/EquipmentOverviewModal";
import MainEquipmentGrid from "../components/MainEquipmentGrid";
import PatchNotesModal from "../components/PatchNotesModal";

interface CharacterData {
  character_name: string;
  character_level: number;
  character_class: string;
  character_image: string;
  world_name: string;
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
  item_base_option: {
    str: string;
    dex: string;
    int: string;
    luk: string;
    max_hp: string;
    max_mp: string;
    attack_power: string;
    magic_power: string;
    armor: string;
    speed: string;
    jump: string;
    boss_damage: string;
    ignore_monster_armor: string;
    all_stat: string;
    max_hp_rate: string;
    max_mp_rate: string;
    base_equipment_level: number;
  };
  item_add_option: {
    str: string;
    dex: string;
    int: string;
    luk: string;
    max_hp: string;
    max_mp: string;
    attack_power: string;
    magic_power: string;
    armor: string;
    speed: string;
    jump: string;
    boss_damage: string;
    damage: string;
    all_stat: string;
    equipment_level_decrease: string;
  };
  upgrade_count: string;
  item_etc_option: {
    str: string;
    dex: string;
    int: string;
    luk: string;
    max_hp: string;
    max_mp: string;
    attack_power: string;
    magic_power: string;
    armor: string;
    speed: string;
    jump: string;
  };
  item_starforce_option?: {
    str: string;
    dex: string;
    int: string;
    luk: string;
    max_hp: string;
    max_mp: string;
    attack_power: string;
    magic_power: string;
    armor: string;
    speed: string;
    jump: string;
  };
  starforce_scroll_flag: string;
  cuttable_count: string;
  special_ring_level?: number;
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



interface SearchParamHandlerProps {
  onSearch: (name: string) => void;
  currentNickname: string;
}

function SearchParamHandler({ onSearch, currentNickname }: SearchParamHandlerProps) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const nameParam = searchParams.get("name");
    if (nameParam && nameParam !== currentNickname) {
      onSearch(nameParam);
    }
  }, [searchParams, currentNickname, onSearch]);

  return null;
}

export default function Home() {

  const [nickname, setNickname] = useState("");
  const [character, setCharacter] = useState<CharacterData | null>(null);
  const [equipment, setEquipment] = useState<ItemData[]>([]);
  const [stats, setStats] = useState<StatData | null>(null);
  const [union, setUnion] = useState<UnionData | null>(null);
  const [ocid, setOcid] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [linkSkillData, setLinkSkillData] = useState<any>(null);
  const [unionRaiderData, setUnionRaiderData] = useState<any>(null);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [isPatchNotesOpen, setIsPatchNotesOpen] = useState(false);

  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedWeapon, setSelectedWeapon] = useState<ItemData | null>(null);
  const [diagnosisReport, setDiagnosisReport] = useState<EquipmentReport | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const favoritesRef = useRef<HTMLDivElement>(null);

  // Favorites state
  const [favorites, setFavorites] = useState<Array<{ name: string, world: string, level: number, job: string }>>([]);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('maple-ai-favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load favorites:', e);
      }
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('maple-ai-favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Close favorites dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (favoritesRef.current && !favoritesRef.current.contains(event.target as Node)) {
        setIsFavoritesOpen(false);
      }
    };

    if (isFavoritesOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFavoritesOpen]);

  // 즐겨찾기 드롭다운 열릴 때 히스토리에 상태 추가, 뒤로가기로 닫기
  useEffect(() => {
    if (isFavoritesOpen) {
      // 히스토리에 즐겨찾기 상태 추가
      window.history.pushState({ favorites: true }, '');

      const handlePopState = () => {
        // 뒤로가기 시 즐겨찾기 닫기
        setIsFavoritesOpen(false);
      };

      window.addEventListener('popstate', handlePopState);

      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [isFavoritesOpen]);


  // Check if current character is favorited
  const isFavorited = character && favorites.some(f => f.name === character.character_name && f.world === character.world_name);

  // Add to favorites
  const addToFavorites = () => {
    if (!character) return;
    const newFav = {
      name: character.character_name,
      world: character.world_name,
      level: character.character_level,
      job: character.character_class
    };
    setFavorites(prev => [...prev, newFav]);
  };

  // Remove from favorites
  const removeFromFavorites = () => {
    if (!character) return;
    setFavorites(prev => prev.filter(f => !(f.name === character.character_name && f.world === character.world_name)));
  };

  // Load favorite character
  const loadFavorite = async (favName: string) => {
    setNickname(favName);
    setIsFavoritesOpen(false);

    // Directly trigger search with the favorite name
    setLoading(true);
    setError("");
    setCharacter(null);
    setEquipment([]);
    setStats(null);
    setUnion(null);
    setLinkSkillData(null);
    setUnionRaiderData(null);

    try {
      const ocid = await getOcid(favName);
      setOcid(ocid);

      const [
        basicInfo,
        equipmentInfo,
        statInfo,
        unionInfo,
        linkSkill,
        unionRaider
      ] = await Promise.all([
        getCharacterBasic(ocid),
        getCharacterItemEquipment(ocid),
        getCharacterStat(ocid),
        getCharacterUnion(ocid),
        getCharacterLinkSkill(ocid),
        getUserUnionRaider(ocid)
      ]);

      setCharacter(basicInfo);

      if (equipmentInfo && equipmentInfo.item_equipment) {
        setEquipment(equipmentInfo.item_equipment);
      }

      setStats(statInfo);
      setUnion(unionInfo);
      setLinkSkillData(linkSkill);
      setUnionRaiderData(unionRaider);

      if (equipmentInfo && equipmentInfo.item_equipment && basicInfo) {
        const characterClass = basicInfo.character_class;
        let jobData = JOB_META_DATA[characterClass];

        if (!jobData) {
          const normalizedClass = characterClass.replace(/\s/g, "");
          const foundKey = Object.keys(JOB_META_DATA).find(key => key.replace(/\s/g, "") === normalizedClass);
          if (foundKey) {
            jobData = JOB_META_DATA[foundKey];
          }
        }

        if (!jobData) {
          if (characterClass.includes("데몬어벤져") || characterClass.includes("데몬 어벤져")) {
            jobData = { stat: "HP", att: "공격력" };
          } else if (characterClass.includes("제논")) {
            jobData = { stat: "ALL", att: "공격력" };
          } else if (characterClass.includes("아크메이지") || characterClass.includes("비숍") || characterClass.includes("플레임위자드") || characterClass.includes("에반") || characterClass.includes("루미너스") || characterClass.includes("배틀메이지") || characterClass.includes("키네시스") || characterClass.includes("일리움") || characterClass.includes("라라")) {
            jobData = { stat: "INT", att: "마력" };
          } else if (characterClass.includes("보우마스터") || characterClass.includes("신궁") || characterClass.includes("패스파인더") || characterClass.includes("윈드브레이커") || characterClass.includes("와일드헌터") || characterClass.includes("메르세데스") || characterClass.includes("카인") || characterClass.includes("엔젤릭버스터") || characterClass.includes("캡틴") || characterClass.includes("메카닉")) {
            jobData = { stat: "DEX", att: "공격력" };
          } else if (characterClass.includes("나이트로드") || characterClass.includes("섀도어") || characterClass.includes("듀얼블레이드") || characterClass.includes("나이트워커") || characterClass.includes("팬텀") || characterClass.includes("카데나") || characterClass.includes("호영") || characterClass.includes("칼리")) {
            jobData = { stat: "LUK", att: "공격력" };
          } else {
            jobData = { stat: "STR", att: "공격력" };
          }
        }

        const mainStat = jobData.stat;
        const attType = jobData.att === "마력" ? "magic" : "attack";
        const dropStat = statInfo?.final_stat?.find((s: FinalStat) => s.stat_name === "아이템 드롭률");
        const currentDropRate = dropStat ? parseInt(dropStat.stat_value || "0") : 0;

        const report = diagnoseEquipment(
          equipmentInfo.item_equipment,
          mainStat,
          attType,
          'HUNTING',
          currentDropRate,
          characterClass
        );

        setDiagnosisReport(report);
      }

    } catch (err: any) {
      console.error(err);
      if (err?.message?.includes("Too Many Requests") || err?.message?.includes("요청이 너무 많습니다")) {
        setError("RATE_LIMIT");
      } else {
        setError("캐릭터를 찾을 수 없거나 정보를 불러오는데 실패했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };





  const handleSearch = async (targetName?: string | unknown) => {
    const searchName = typeof targetName === 'string' ? targetName : nickname;
    if (!searchName.trim()) return;

    setLoading(true);
    setError("");
    setCharacter(null);
    setEquipment([]);
    setStats(null);
    setUnion(null);
    setLinkSkillData(null);
    setUnionRaiderData(null);

    try {
      const ocid = await getOcid(searchName);
      setOcid(ocid);

      // 모든 데이터를 병렬로 동시에 요청하여 속도 최적화
      const [
        basicInfo,
        equipmentInfo,
        statInfo,
        unionInfo,
        linkSkill,
        unionRaider
      ] = await Promise.all([
        getCharacterBasic(ocid),
        getCharacterItemEquipment(ocid),
        getCharacterStat(ocid),
        getCharacterUnion(ocid),
        getCharacterLinkSkill(ocid),
        getUserUnionRaider(ocid)
      ]);

      setCharacter(basicInfo);

      if (equipmentInfo && equipmentInfo.item_equipment) {
        setEquipment(equipmentInfo.item_equipment);
      }

      setStats(statInfo);
      setUnion(unionInfo);
      setLinkSkillData(linkSkill);
      setUnionRaiderData(unionRaider);

      // 장비 진단 리포트 생성
      if (equipmentInfo && equipmentInfo.item_equipment && basicInfo) {
        const characterClass = basicInfo.character_class;
        let jobData = JOB_META_DATA[characterClass];

        // 직업명 정규화 및 재시도
        if (!jobData) {
          const normalizedClass = characterClass.replace(/\s/g, "");
          const foundKey = Object.keys(JOB_META_DATA).find(key => key.replace(/\s/g, "") === normalizedClass);
          if (foundKey) {
            jobData = JOB_META_DATA[foundKey];
          }
        }

        // 추론 로직 (데몬어벤져 우선 체크)
        if (!jobData) {
          if (characterClass.includes("데몬어벤져") || characterClass.includes("데몬 어벤져")) {
            jobData = { stat: "HP", att: "공격력" };
          } else if (characterClass.includes("제논")) {
            jobData = { stat: "ALL", att: "공격력" };
          } else if (characterClass.includes("아크메이지") || characterClass.includes("비숍") || characterClass.includes("플레임위자드") || characterClass.includes("에반") || characterClass.includes("루미너스") || characterClass.includes("배틀메이지") || characterClass.includes("키네시스") || characterClass.includes("일리움") || characterClass.includes("라라")) {
            jobData = { stat: "INT", att: "마력" };
          } else if (characterClass.includes("보우마스터") || characterClass.includes("신궁") || characterClass.includes("패스파인더") || characterClass.includes("윈드브레이커") || characterClass.includes("와일드헌터") || characterClass.includes("메르세데스") || characterClass.includes("카인") || characterClass.includes("엔젤릭버스터") || characterClass.includes("캡틴") || characterClass.includes("메카닉")) {
            jobData = { stat: "DEX", att: "공격력" };
          } else if (characterClass.includes("나이트로드") || characterClass.includes("섀도어") || characterClass.includes("듀얼블레이드") || characterClass.includes("나이트워커") || characterClass.includes("팬텀") || characterClass.includes("카데나") || characterClass.includes("호영") || characterClass.includes("칼리")) {
            jobData = { stat: "LUK", att: "공격력" };
          } else {
            // 기본값 (전사 계열 등)
            jobData = { stat: "STR", att: "공격력" };
          }
        }

        const mainStat = jobData.stat;
        const attType = jobData.att === "마력" ? "magic" : "attack";

        // 드롭률 정보
        const dropStat = statInfo?.final_stat?.find((s: FinalStat) => s.stat_name === "아이템 드롭률");
        const currentDropRate = dropStat ? parseInt(dropStat.stat_value || "0") : 0;

        // 장비 진단 실행
        const report = diagnoseEquipment(
          equipmentInfo.item_equipment,
          mainStat,
          attType,
          'HUNTING', // 기본 모드
          currentDropRate,
          characterClass
        );

        setDiagnosisReport(report);
      }

    } catch (err: any) {
      console.error(err);
      // Check if it's a Rate Limit error
      if (err?.message?.includes("Too Many Requests") || err?.message?.includes("요청이 너무 많습니다")) {
        setError("RATE_LIMIT");
      } else {
        setError("캐릭터를 찾을 수 없거나 정보를 불러오는데 실패했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    if (!ocid) return;
    setRefreshKey(prev => prev + 1);
    handleSearch();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };



  const getStatValue = (statName: string) => {
    if (!stats) return "0";
    // Exact match first
    let stat = stats.final_stat.find(s => s.stat_name === statName);
    // If not found, try partial match for specific cases like IED
    if (!stat && statName === "몬스터 방어율 무시") {
      stat = stats.final_stat.find(s => s.stat_name.includes("방어율"));
    }
    return stat ? stat.stat_value : "0";
  };

  const formatNumber = (value: string | number) => {
    return Number(value).toLocaleString();
  };

  // Smart Stat Logic
  const getMainStatInfo = () => {
    if (!stats) return { name: "STR", value: "0" };

    const str = Number(getStatValue("STR"));
    const dex = Number(getStatValue("DEX"));
    const int = Number(getStatValue("INT"));
    const luk = Number(getStatValue("LUK"));

    const maxVal = Math.max(str, dex, int, luk);

    if (maxVal === str) return { name: "STR", value: str };
    if (maxVal === dex) return { name: "DEX", value: dex };
    if (maxVal === int) return { name: "INT", value: int };
    return { name: "LUK", value: luk };
  };

  // Calculate Total Attack/Magic % from equipment potentials with breakdown
  const calculateTotalAttackPercent = () => {
    let totalAttPct = 0;
    let totalMagicPct = 0;
    const attBreakdown: { item: string, value: number }[] = [];
    const magicBreakdown: { item: string, value: number }[] = [];

    equipment.forEach(item => {
      const potentials = [
        item.potential_option_1, item.potential_option_2, item.potential_option_3,
        item.additional_potential_option_1, item.additional_potential_option_2, item.additional_potential_option_3
      ];

      let itemAttTotal = 0;
      let itemMagicTotal = 0;

      potentials.forEach(opt => {
        if (!opt) return;
        // Check for Attack Power %
        if (opt.includes("공격력") && opt.includes("%")) {
          const match = opt.match(/(\d+)%/);
          if (match) {
            const val = Number(match[1]);
            totalAttPct += val;
            itemAttTotal += val;
          }
        }
        // Check for Magic Power %
        if (opt.includes("마력") && opt.includes("%")) {
          const match = opt.match(/(\d+)%/);
          if (match) {
            const val = Number(match[1]);
            totalMagicPct += val;
            itemMagicTotal += val;
          }
        }
      });

      if (itemAttTotal > 0) {
        attBreakdown.push({ item: item.item_name, value: itemAttTotal });
      }
      if (itemMagicTotal > 0) {
        magicBreakdown.push({ item: item.item_name, value: itemMagicTotal });
      }
    });

    return { totalAttPct, totalMagicPct, attBreakdown, magicBreakdown };
  };

  const mainStat = getMainStatInfo();

  // Calculate Total Main Stat % with breakdown
  const calculateTotalStatPercent = (statName: string) => {
    let totalPct = 0;
    const breakdown: { item: string, value: number }[] = [];

    equipment.forEach(item => {
      const potentials = [
        item.potential_option_1, item.potential_option_2, item.potential_option_3,
        item.additional_potential_option_1, item.additional_potential_option_2, item.additional_potential_option_3
      ];

      let itemTotal = 0;

      potentials.forEach(opt => {
        if (!opt) return;

        // 1. Check for Specific Stat % (e.g., STR : +12%)
        // We check if the option contains the statName (e.g. "STR") AND "%"
        // Also exclude "모든" to avoid "모든 스킬" etc. unless it is "올스탯" which is handled below.
        if (opt.includes(statName) && opt.includes("%") && !opt.includes("모든")) {
          const match = opt.match(/(\d+)%/);
          if (match) {
            const val = Number(match[1]);
            itemTotal += val;
          }
        }

        // 2. Check for All Stat % (올스탯)
        if (opt.includes("올스탯") && opt.includes("%")) {
          const match = opt.match(/(\d+)%/);
          if (match) {
            const val = Number(match[1]);
            itemTotal += val;
          }
        }
      });

      if (itemTotal > 0) {
        totalPct += itemTotal;
        breakdown.push({ item: item.item_name, value: itemTotal });
      }
    });
    return { totalPct, breakdown };
  };

  const mainStatResult = calculateTotalStatPercent(mainStat.name);
  const mainStatPct = mainStatResult.totalPct;

  // Calculate breakdown for other stats with robust parsing (ignoring spaces)
  const calculateStatBreakdown = (statKeywords: string[], unit: string = "%") => {
    let total = 0;
    const breakdown: { item: string, value: number }[] = [];

    equipment.forEach(item => {
      const potentials = [
        item.potential_option_1, item.potential_option_2, item.potential_option_3,
        item.additional_potential_option_1, item.additional_potential_option_2, item.additional_potential_option_3
      ];

      let itemTotal = 0;

      potentials.forEach(opt => {
        if (!opt) return;

        // Normalize option text by removing spaces for robust matching
        const normalizedOpt = opt.replace(/\s+/g, "");

        // Check if option contains any of the keywords (keywords should also be space-less)
        const matchesKeyword = statKeywords.some(keyword =>
          normalizedOpt.includes(keyword.replace(/\s+/g, ""))
        );

        if (matchesKeyword && opt.includes(unit)) {
          const regex = new RegExp(`(\\d+)${unit}`);
          const match = opt.match(regex);
          if (match) {
            const val = Number(match[1]);
            total += val;
            itemTotal += val;
          }
        }
      });

      if (itemTotal > 0) {
        breakdown.push({ item: item.item_name, value: itemTotal });
      }
    });

    return { total, breakdown };
  };

  const bossDmgResult = calculateStatBreakdown(["보스몬스터공격시데미지", "보스몬스터데미지"]);
  const ignoreDefResult = calculateStatBreakdown(["몬스터방어율무시", "방어율무시"]);
  const critDmgResult = calculateStatBreakdown(["크리티컬데미지"]);
  const cooldownResult = calculateStatBreakdown(["재사용대기시간미적용"]);
  const buffDurResult = calculateStatBreakdown(["버프스킬의지속시간", "버프지속시간"]);
  const dropRateResult = calculateStatBreakdown(["아이템드롭률"]);
  const mesoRateResult = calculateStatBreakdown(["메소획득량"]);
  const statusDmgResult = calculateStatBreakdown(["상태이상에걸린적", "상태이상데미지"]);
  const cooldownSecResult = calculateStatBreakdown(["재사용대기시간"], "초");
  const expRateResult = calculateStatBreakdown(["경험치", "경험치획득"]);
  const critRateResult = calculateStatBreakdown(["크리티컬확률"]);

  const cooldownReductionSec = getStatValue("재사용 대기시간 감소 (초)"); // Need to check exact stat name from API
  const expRate = getStatValue("경험치 획득");
  const critRate = getStatValue("크리티컬 확률");

  const combatPower = getStatValue("전투력");
  const ignoreDefense = getStatValue("몬스터 방어율 무시");

  // New Stats
  const cooldownReduction = getStatValue("재사용 대기시간 미적용");
  const buffDuration = getStatValue("버프 지속시간");
  const itemDropRate = getStatValue("아이템 드롭률");
  const mesoDropRate = getStatValue("메소 획득량");
  const statusDamage = getStatValue("상태이상 추가 데미지");

  // Attack Info
  const attackResult = calculateTotalAttackPercent();
  const { totalAttPct, totalMagicPct, attBreakdown, magicBreakdown } = attackResult;
  const isMagic = mainStat.name === "INT"; // Fallback logic if we can't decide by %
  // Decide which % to show: if INT user, likely Magic %, else Attack %. 
  // Or just show the higher one as requested.
  const showMagic = totalMagicPct > totalAttPct || (totalMagicPct === totalAttPct && mainStat.name === "INT");
  const displayAttPct = showMagic ? totalMagicPct : totalAttPct;
  const displayAttName = showMagic ? "마력" : "공격력";
  const displayAttBreakdown = showMagic ? magicBreakdown : attBreakdown;

  // Total Attack/Magic Value (Raw Value from Stat)
  // Note: "공격력" or "마력" in FinalStat is usually the total raw value.
  const totalAttackValue = getStatValue(displayAttName);



  // Equipment diagnosis effect
  useEffect(() => {
    if (equipment.length > 0 && stats && character) {
      const mainStatInfo = getMainStatInfo();
      const attPct = calculateTotalAttackPercent();
      const dropRate = parseFloat(getStatValue("아이템 드롭률").replace("%", ""));

      const report = diagnoseEquipment(
        equipment,
        mainStatInfo.name,
        attPct.totalAttPct > attPct.totalMagicPct ? 'attack' : 'magic',
        'BOSS',
        dropRate,
        character.character_class // 🔥 FIXED: Pass job to enable Demon Avenger detection
      );

      setDiagnosisReport(report);
    }
  }, [equipment, stats, character]);

  // Equipment Sorting Logic
  const sortEquipment = (items: ItemData[]) => {
    // We will create a grid that grows as needed, but start with the requested rows.
    // Row 1: Weapon, Sub, Emblem, Hat, Shoulder
    // Row 2: Top, Bottom, Glove, Shoe, Cape
    // Row 3: Face, Eye, Earring, Pendant1, Pendant2
    // Row 4: Ring1, Ring2, Ring3, Ring4(Special), Belt
    // Row 5+: Others

    const sorted: (ItemData | null)[] = Array(20).fill(null); // First 4 rows (5 cols * 4 rows = 20 slots)
    const etcItems: ItemData[] = [];

    // Helper to find item by slot name
    const findItem = (slot: string) => items.find(i => i.item_equipment_slot === slot);
    const findItems = (slot: string) => items.filter(i => i.item_equipment_slot === slot);
    // Helper for slots that might have numbers (like Ring1, Ring2)
    const findItemsIncludes = (slot: string) => items.filter(i => i.item_equipment_slot.includes(slot));

    // Row 1
    sorted[0] = findItem("무기") || null;
    sorted[1] = findItem("보조무기") || null;
    sorted[2] = findItem("엠블렘") || null;
    sorted[3] = findItem("모자") || null;
    sorted[4] = findItem("어깨장식") || null;

    // Row 2
    sorted[5] = findItem("상의") || null;
    sorted[6] = findItem("하의") || null;
    sorted[7] = findItem("장갑") || null;
    sorted[8] = findItem("신발") || null;
    sorted[9] = findItem("망토") || null;

    // Row 3
    sorted[10] = findItem("얼굴장식") || null;
    sorted[11] = findItem("눈장식") || null;
    sorted[12] = findItem("귀고리") || null;
    const pendants = findItemsIncludes("펜던트"); // Pendants can be 펜던트, 펜던트2
    sorted[13] = pendants[0] || null;
    sorted[14] = pendants[1] || null;

    // Row 4: Rings & Belt
    const rings = findItemsIncludes("반지"); // Rings are 반지1, 반지2, etc.
    const specialRingNames = ["리스트레인트", "웨폰퍼프", "리스크테이커", "링 오브 썸", "크라이시스", "오버패스", "듀라빌리티", "레벨퍼프", "헬스컷", "리미트", "마나컷"];
    let normalRings: ItemData[] = [];
    let specialRing: ItemData | null = null;

    rings.forEach(r => {
      if (specialRingNames.some(name => r.item_name.includes(name))) {
        if (!specialRing) specialRing = r;
        else normalRings.push(r);
      } else {
        normalRings.push(r);
      }
    });

    // Fill Ring slots (15, 16, 17)
    for (let i = 0; i < 3; i++) {
      if (normalRings.length > 0) {
        sorted[15 + i] = normalRings.shift() || null;
      }
    }

    // Fill 4th Ring slot (18) - Special Ring priority
    if (specialRing) {
      sorted[18] = specialRing;
    } else if (normalRings.length > 0) {
      sorted[18] = normalRings.shift() || null;
    }

    sorted[19] = findItem("벨트") || null;

    // Row 5: Pocket, Heart, Badge, Medal, Title
    sorted[20] = findItem("포켓 아이템") || null;
    sorted[21] = findItem("기계 심장") || findItem("기계심장") || null;
    sorted[22] = findItem("뱃지") || null;
    sorted[23] = findItem("훈장") || null;
    sorted[24] = findItem("칭호") || null;

    // Collect remaining items for Row 6+
    const sortedIds = new Set(sorted.filter(i => i).map(i => i!.item_name + i!.item_equipment_slot));

    items.forEach(item => {
      const id = item.item_name + item.item_equipment_slot;
      if (!sortedIds.has(id)) {
        etcItems.push(item);
      }
    });

    // Combine sorted grid with etc items
    const finalGrid = [...sorted];
    etcItems.forEach(item => finalGrid.push(item));

    return finalGrid;
  };

  const equipmentGrid = sortEquipment(equipment);



  // Helper for Starforce Expected Cost
  const getStarforceValueLabel = (item: ItemData) => {
    if (item.starforce === "0") return null;

    const level = item.item_base_option.base_equipment_level;
    const currentStar = parseInt(item.starforce);

    // Calculate expected cost from 0 to currentStar
    // Applying ALL discounts: MVP Diamond (10%), PC Cafe (5%), Sunday Maple (30%), Starcatch
    const cost = calculateCumulativeExpectedCost(level, currentStar, {
      starcatch: true,
      mvpDiscount: 0.1,
      pcCafe: true,
      sundayMaple: true
    });

    if (cost === 0) return null;

    // Format cost (e.g. 1.5경, 12.5조, 12.5억, 3,500만)
    if (cost >= 10000000000000000) { // 10^16 (Gyeong)
      const gyeong = cost / 10000000000000000;
      return `${gyeong.toFixed(2)}경 메소`;
    } else if (cost >= 1000000000000) { // 10^12 (Jo)
      const jo = cost / 1000000000000;
      return `${jo.toFixed(2)}조 메소`;
    } else if (cost >= 100000000) { // 10^8 (Eok)
      const eok = cost / 100000000;
      return `${eok.toFixed(1)}억 메소`;
    } else {
      const tenThousand = cost / 10000;
      return `${Math.round(tenThousand).toLocaleString()}만 메소`;
    }
  };



  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center p-0 sm:p-8 overflow-x-hidden w-full">
      <Suspense fallback={null}>
        <SearchParamHandler
          onSearch={(name) => {
            setNickname(name);
            handleSearch(name);
          }}
          currentNickname={nickname}
        />
      </Suspense>
      {/* Header */}


      {/* Character Search Section - Wrapped to prevent ad insertion between title and search */}
      <div className="no-ads-section w-full flex flex-col items-center">
        {/* Title and Description - Hide when character is loaded */}
        {
          !character && (
            <div className="text-center space-y-4 sm:space-y-6 px-4 mb-8 sm:mb-12">
              {/* Main Title with Gradient */}
              <div className="relative">
                <h2 className="text-4xl sm:text-7xl font-black bg-gradient-to-r from-maple-orange via-yellow-400 to-orange-500 bg-clip-text text-transparent drop-shadow-2xl animate-in fade-in slide-in-from-top-4 duration-700">
                  캐릭터 검색
                </h2>
                {/* Glowing effect */}
                <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-r from-maple-orange via-yellow-400 to-orange-500 -z-10"></div>
              </div>

              {/* Subtitle with better styling */}
              <p className="text-sm sm:text-2xl text-slate-300 font-medium leading-relaxed animate-in fade-in slide-in-from-top-6 duration-700 delay-150">
                메이플스토리의 캐릭터 정보를 <span className="text-maple-orange font-bold">한 눈에 확인</span>하고,<br className="hidden sm:block" />
                <span className="text-yellow-400 font-bold">AI 기반 진단</span>까지 받아보세요
              </p>
            </div>
          )
        }

        {/* Search Input Area with enhanced design */}
        <div className="w-full max-w-4xl relative z-[50] px-4 sm:px-0">
          {/* Glow effect behind search bar */}
          {!character && (
            <div className="absolute inset-0 bg-gradient-to-r from-maple-orange/20 via-yellow-400/20 to-orange-500/20 blur-2xl -z-10 animate-pulse"></div>
          )}

          <div className="w-full relative flex items-center gap-2 sm:gap-3">
            <div className="relative w-full group">
              {/* Animated border gradient */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-maple-orange via-yellow-400 to-orange-500 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-75 group-focus-within:opacity-100 blur transition duration-500"></div>

              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="캐릭터 닉네임을 입력하세요"
                className="relative w-full h-12 sm:h-20 pl-5 sm:pl-8 pr-12 sm:pr-16 rounded-xl sm:rounded-2xl bg-slate-900/50 border-2 border-slate-700 focus:border-maple-orange focus:ring-2 focus:ring-maple-orange/50 outline-none text-base sm:text-2xl placeholder:text-slate-400 transition-all font-medium"
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 text-slate-400 hover:text-maple-orange hover:scale-110 transition-all bg-slate-800 hover:bg-maple-orange/10 rounded-lg"
              >
                <Search size={20} className="sm:w-8 sm:h-8" />
              </button>
            </div>

            <button
              onClick={handleRefresh}
              className="relative h-12 w-12 sm:h-20 sm:w-20 shrink-0 bg-slate-900 border-2 border-slate-800 rounded-xl sm:rounded-2xl flex items-center justify-center text-slate-400 hover:text-maple-orange hover:border-maple-orange transition-all group overflow-hidden"
              title="실시간 갱신"
            >
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-maple-orange/0 to-maple-orange/0 group-hover:from-maple-orange/10 group-hover:to-yellow-400/10 transition-all"></div>
              <RefreshCw size={20} className={`sm:w-8 sm:h-8 transition-all relative z-10 ${loading ? 'animate-spin text-maple-orange' : 'group-hover:rotate-180'}`} />
            </button>

            {/* Favorites Button with Dropdown */}
            <div className="relative" ref={favoritesRef}>
              <button
                onClick={() => setIsFavoritesOpen(!isFavoritesOpen)}
                className={`relative h-12 w-12 sm:h-20 sm:w-20 shrink-0 bg-slate-900 border-2 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all group overflow-hidden ${favorites.length > 0 ? 'border-yellow-500/50 hover:border-yellow-400' : 'border-slate-800 hover:border-maple-orange'
                  }`}
                title="즐겨찾기"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-500/0 to-slate-500/0 group-hover:from-slate-500/10 group-hover:to-slate-400/10 transition-all"></div>
                <List size={20} className={`sm:w-8 sm:h-8 transition-all relative z-10 ${favorites.length > 0 ? 'text-yellow-400' : 'text-slate-400 group-hover:text-slate-300'}`} />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center shadow-lg border-2 border-slate-900">
                    {favorites.length}
                  </span>
                )}
              </button>

              {/* Favorites Dropdown */}
              {isFavoritesOpen && (
                <div className="absolute right-2 sm:right-0 top-full mt-2 min-w-[280px] max-w-[90vw] sm:w-80 sm:max-w-none bg-slate-900 border-2 border-yellow-500/50 rounded-xl shadow-2xl overflow-hidden" style={{ zIndex: 99999 }}>

                  <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 px-4 py-3 border-b border-yellow-500/30">
                    <h3 className="font-bold text-yellow-400 flex items-center gap-2">
                      <Star size={16} className="fill-yellow-400" />
                      즐겨찾기 ({favorites.length})
                    </h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto custom-scrollbar">
                    {favorites.length === 0 ? (
                      <div className="p-6 text-center text-slate-500">
                        <Star size={32} className="mx-auto mb-2 opacity-30" />
                        <p className="text-sm">즐겨찾기가 비어있습니다</p>
                        <p className="text-xs mt-1">캐릭터 검색 후 ⭐ 버튼을 눌러보세요</p>
                      </div>
                    ) : (
                      favorites.map((fav, idx) => (
                        <div
                          key={idx}
                          onClick={() => loadFavorite(fav.name)}
                          className="px-3 sm:px-4 py-3 hover:bg-slate-800/50 cursor-pointer transition-colors border-b border-slate-800 last:border-b-0 flex items-start gap-2 group"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-white group-hover:text-yellow-400 transition-colors truncate text-sm sm:text-base">
                              {fav.name}
                            </div>
                            <div className="text-[10px] sm:text-xs text-slate-400 mt-1 flex flex-wrap gap-x-2 gap-y-0.5">
                              <span>{fav.world}</span>
                              <span>·</span>
                              <span>Lv.{fav.level}</span>
                              <span>·</span>
                              <span className="truncate">{fav.job}</span>
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setFavorites(prev => prev.filter((_, i) => i !== idx));
                            }}
                            className="text-slate-500 hover:text-red-400 transition-colors p-1 shrink-0"
                            title="삭제"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Add/Remove Favorite Button (shown when character is loaded) */}
            {character && (
              <button
                onClick={isFavorited ? removeFromFavorites : addToFavorites}
                className={`relative h-12 w-12 sm:h-20 sm:w-20 shrink-0 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all group overflow-hidden border-2 ${isFavorited
                  ? 'bg-yellow-500/10 border-yellow-500 hover:bg-yellow-500/20'
                  : 'bg-slate-900 border-slate-800 hover:border-yellow-400'
                  }`}
                title={isFavorited ? "즐겨찾기 해제" : "즐겨찾기 추가"}
              >
                <Star
                  size={20}
                  className={`sm:w-8 sm:h-8 transition-all relative z-10 ${isFavorited
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-slate-400 group-hover:text-yellow-400 group-hover:fill-yellow-400/20'
                    }`}
                />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Info text - Enhanced styling */}
      <div className="w-[calc(100%-2rem)] sm:w-full max-w-4xl flex items-center gap-2 bg-orange-950/30 border border-orange-500/30 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 mt-4 sm:mt-6 mb-8 sm:mb-10 mx-auto">
        <span className="text-xl sm:text-2xl">💡</span>
        <p className="text-xs sm:text-base text-orange-300 font-medium text-center">
          인게임에서 <strong className="text-orange-400">[캐시샵 입장]</strong> 또는 <strong className="text-orange-400">[재접속]</strong> 후 대략 1분 후 갱신 버튼을 누르면 최신 정보가 반영됩니다.
        </p>
      </div>

      {
        error && (
          error === "RATE_LIMIT" ? (
            <div className="w-full max-w-4xl mt-4 p-6 bg-gradient-to-br from-orange-950/50 to-yellow-950/50 border-2 border-orange-500/50 rounded-2xl animate-in fade-in slide-in-from-top-2 shadow-2xl shadow-orange-900/30">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="relative">
                  <div className="text-6xl animate-bounce">⏱️</div>
                  <div className="absolute inset-0 blur-xl bg-orange-500/30 animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-orange-300 mb-2">
                    현재 너무 많은 요청으로
                  </h3>
                  <p className="text-base sm:text-lg text-orange-200 font-medium mb-1">
                    잠시 후 다시 시도해주세요
                  </p>
                  <p className="text-sm sm:text-base text-orange-400/80 italic mt-3">
                    (이용해주셔서 항상 감사합니다 💛)
                  </p>
                </div>
                <button
                  onClick={() => setError("")}
                  className="mt-2 px-6 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-orange-500/50 hover:scale-105"
                >
                  확인
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-4xl mt-4 p-4 bg-red-950/50 border border-red-500/50 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 shadow-lg shadow-red-900/20">
              <span className="text-2xl">🚫</span>
              <div className="flex flex-col">
                <p className="text-red-200 font-bold text-lg">검색 실패</p>
                <p className="text-red-300/90 text-sm">{error}</p>
              </div>
              <button
                onClick={() => setError("")}
                className="ml-auto p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-300"
              >
                <X size={20} />
              </button>
            </div>
          )
        )
      }


      {/* Site Introduction Section - Only show when no character */}
      {
        !character && !loading && (
          <section className="w-full sm:max-w-5xl mb-16 px-4 sm:px-6">
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 sm:p-10 border border-slate-700 shadow-2xl">
              {/* Main Title */}
              <div className="text-center mb-8 flex flex-col items-center">
                <img src="/images/maple-ai-logo.jpg" alt="메이플 AI" className="w-24 h-24 sm:w-32 sm:h-32 mb-6 object-contain drop-shadow-[0_0_15px_rgba(255,165,0,0.5)]" />
                <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 bg-gradient-to-r from-maple-orange via-yellow-400 to-maple-orange bg-clip-text text-transparent">
                  메이플 AI
                </h1>
                <p className="text-lg sm:text-xl text-slate-300 font-medium">
                  메이플스토리 캐릭터 종합 분석 및 성장 가이드 플랫폼
                </p>
                <button
                  onClick={() => setIsPatchNotesOpen(true)}
                  className="mt-4 text-sm text-slate-400 hover:text-maple-orange underline underline-offset-4 transition-colors flex items-center gap-1"
                >
                  <span>📢</span>
                  단풍이의 메이플 AI 패치내용 보기
                </button>
              </div>

              {/* What is this site */}
              <div className="mb-8 bg-slate-950/50 rounded-xl p-6 border border-slate-700/50">
                <h2 className="text-2xl sm:text-3xl font-bold text-maple-orange mb-4 flex items-center gap-2">
                  <span className="text-3xl">🎮</span>
                  메이플 AI란?
                </h2>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-4">
                  메이플 AI는 <strong className="text-white">넥슨 오픈 API</strong>와 <strong className="text-white">AI 기술</strong>을 활용하여 메이플스토리 캐릭터의 장비, 스탯, 심볼, 유니온, 링크스킬 등 모든 정보를 실시간으로 분석하고 진단하는 <strong className="text-white">AI 기반 캐릭터 분석 플랫폼</strong>입니다.
                </p>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                  초보자부터 고스펙 유저까지, 모든 메이플 유저가 자신의 캐릭터를 객관적으로 평가하고 효율적인 성장 방향을 찾을 수 있도록 돕는 것이 저희의 목표입니다.
                </p>
              </div>

              {/* Main Features */}
              <div className="mb-8 bg-slate-950/50 rounded-xl p-6 border border-slate-700/50">
                <h2 className="text-2xl sm:text-3xl font-bold text-maple-orange mb-6 flex items-center gap-2">
                  <span className="text-3xl">⚡</span>
                  주요 기능
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/30">
                    <h3 className="text-lg font-bold text-yellow-400 mb-2 flex items-center gap-2">
                      <span>📊</span> 실시간 캐릭터 정보 조회
                    </h3>
                    <p className="text-sm text-slate-400">
                      닉네임 검색만으로 장비, 스탯, 어빌리티, 유니온, 링크스킬 등 모든 캐릭터 정보를 한눈에 확인할 수 있습니다.
                    </p>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/30">
                    <h3 className="text-lg font-bold text-yellow-400 mb-2 flex items-center gap-2">
                      <span>🎯</span> 보스 장비 단계별 진단
                    </h3>
                    <p className="text-sm text-slate-400">
                      9단계 세분화된 진단 시스템으로 현재 캐릭터의 보스 장비 수준을 정확히 평가하고, 다음 성장 목표를 제시합니다.
                    </p>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/30">
                    <h3 className="text-lg font-bold text-yellow-400 mb-2 flex items-center gap-2">
                      <span>🔍</span> 장비 상세 분석
                    </h3>
                    <p className="text-sm text-slate-400">
                      스타포스, 잠재능력, 에디셔널, 추가옵션, 주문서 작업 상태를 종합적으로 분석하여 개선이 필요한 부분을 정확히 알려드립니다.
                    </p>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/30">
                    <h3 className="text-lg font-bold text-yellow-400 mb-2 flex items-center gap-2">
                      <span>💎</span> 전투력 티어 시스템
                    </h3>
                    <p className="text-sm text-slate-400">
                      전투력을 기반으로 아이언부터 챌린저까지 세분화된 티어로 분류하여 현재 위치와 성장 목표를 명확하게 파악할 수 있습니다.
                    </p>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/30">
                    <h3 className="text-lg font-bold text-yellow-400 mb-2 flex items-center gap-2">
                      <span>🌟</span> 헥사 스탯 가이드
                    </h3>
                    <p className="text-sm text-slate-400">
                      6차 전직 헥사 스탯의 강화 수준과 직업별 최적화 우선순위를 분석하여 스탯 포인트 투자 방향을 안내합니다.
                    </p>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/30">
                    <h3 className="text-lg font-bold text-yellow-400 mb-2 flex items-center gap-2">
                      <span>🔗</span> 유니온/링크스킬 진단
                    </h3>
                    <p className="text-sm text-slate-400">
                      유니온 대원 보유 현황과 링크스킬 구성을 분석하여 직업에 맞는 최적의 세팅을 추천하고, 부족한 부분을 개선할 수 있도록 돕습니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* How to Use */}
              <div className="mb-8 bg-slate-950/50 rounded-xl p-6 border border-slate-700/50">
                <h2 className="text-2xl sm:text-3xl font-bold text-maple-orange mb-6 flex items-center gap-2">
                  <span className="text-3xl">📖</span>
                  이용 방법
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-maple-orange rounded-full flex items-center justify-center text-white font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">캐릭터 검색</h3>
                      <p className="text-sm text-slate-400">
                        상단 검색창에 분석하고 싶은 <strong className="text-slate-300">메이플스토리 캐릭터 닉네임</strong>을 입력하고 검색합니다. 모든 월드의 캐릭터를 검색할 수 있습니다.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-maple-orange rounded-full flex items-center justify-center text-white font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">정보 조회 및 진단</h3>
                      <p className="text-sm text-slate-400">
                        검색 결과로 캐릭터의 <strong className="text-slate-300">장비, 스탯, 전투력, 유니온, 링크스킬, 심볼, 헥사 스탯</strong> 등 모든 정보가 자동으로 표시됩니다. 각 항목을 클릭하면 상세 정보를 확인할 수 있습니다.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-maple-orange rounded-full flex items-center justify-center text-white font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">보스 템 진단 확인</h3>
                      <p className="text-sm text-slate-400">
                        우측 하단의 <strong className="text-slate-300">"보스용 진단" 또는 "사냥용 진단"</strong> 탭에서 캐릭터의 현재 장비 수준을 9단계로 세분화하여 진단받을 수 있습니다. 각 단계별 목표와 개선 사항이 상세히 안내됩니다.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-maple-orange rounded-full flex items-center justify-center text-white font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">실시간 갱신</h3>
                      <p className="text-sm text-slate-400">
                        <strong className="text-slate-300">게임 내에서 캐시샵에 입장하거나 재접속</strong>한 후, 검색창 옆의 새로고침 버튼을 누르면 최신 정보로 업데이트됩니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Purpose */}
              <div className="bg-slate-950/50 rounded-xl p-6 border border-slate-700/50">
                <h2 className="text-2xl sm:text-3xl font-bold text-maple-orange mb-4 flex items-center gap-2">
                  <span className="text-3xl">🎯</span>
                  서비스 목적
                </h2>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-4">
                  메이플스토리는 방대한 콘텐츠와 복잡한 성장 시스템으로 인해 <strong className="text-white">초보자가 진입하기 어렵고, 중급 유저도 다음 성장 방향을 결정하기 힘든</strong> 게임입니다.
                </p>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-4">
                  메이플 AI는 이러한 문제를 해결하기 위해 <strong className="text-white">AI 기반의 객관적이고 구체적인 데이터 분석</strong>을 제공하며, 모든 유저가 자신의 캐릭터 상태를 정확히 파악하고 <strong className="text-white">효율적인 투자 우선순위</strong>를 결정할 수 있도록 돕습니다.
                </p>
                <div className="bg-maple-orange/10 border border-maple-orange/30 rounded-lg p-4 mt-4">
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    💡 <strong className="text-maple-orange">커뮤니티 기여</strong>: 메이플 AI는 비영리 프로젝트로, 메이플스토리 커뮤니티의 성장과 신규 유저 유입에 기여하는 것을 최우선 목표로 합니다. 모든 기능은 무료로 제공되며, 광고 수익은 서버 유지비와 개선 작업에만 사용됩니다.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )
      }

      {/* Recommended Guides Section - Only show when no character */}
      {
        !character && !loading && (
          <section className="w-full sm:max-w-5xl mb-16 px-4 sm:px-6">
            <RecommendedGuides />


          </section>
        )
      }



      {/* Result Section */}
      <section ref={resultRef} className="w-full xl:max-w-[1920px] px-0 sm:px-4 mb-16 flex flex-col xl:flex-row gap-4 sm:gap-6 items-stretch">
        {loading && (
          <div className="w-full text-center text-gray-400 animate-pulse py-8">
            정보를 불러오는 중...
          </div>
        )}



        {character && !loading && (
          // Key Remounting: refreshKey가 바뀌면 이 div 내부의 모든 컴포넌트가 재생성됨
          <div key={refreshKey} className="contents">
            {/* Left Panel: Character Profile & Equipment */}
            <div className="w-full xl:w-[28%] flex flex-col gap-2 sm:gap-3">
              {/* Character Profile Card */}
              <div className="relative z-0 rounded-none sm:rounded-3xl shadow-2xl shadow-black/50 mx-0 sm:mx-0">
                {/* Background Container - Handles clipping for background effects */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950 rounded-none sm:rounded-3xl border-y sm:border border-slate-800 overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://maplestory.io/api/GMS/249/map/100000000/render/0')] bg-cover bg-center opacity-5 blur-sm grayscale"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/80 to-slate-950"></div>
                </div>

                {/* Content Container - No overflow hidden to allow popups/dropdowns to show */}
                <div className="relative z-10 flex flex-col items-center p-3 sm:p-3 pb-4 sm:pb-4 gap-2 sm:gap-3">
                  {/* Header Info - Compact Single Line Layout */}
                  <div className="flex flex-row items-center justify-center gap-2 sm:gap-3 w-full flex-wrap">
                    <span className="bg-slate-800/80 backdrop-blur-sm text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-slate-400 border border-slate-700 shadow-sm">{character.world_name}</span>
                    <h3 className="text-xl sm:text-3xl font-black text-white drop-shadow-lg tracking-tight">{character.character_name}</h3>
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-sm font-medium text-slate-400 bg-slate-950/50 px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg border border-slate-800/50 shadow-inner">
                      <span className="text-slate-500">Lv.</span>
                      <span className="text-slate-200 font-bold">{character.character_level}</span>
                      <span className="w-px h-3 bg-slate-700 mx-1"></span>
                      <span className="text-maple-orange text-[10px] sm:text-sm">{character.character_class}</span>
                    </div>
                  </div>

                  {/* Character Image Area - Fixed Size Container */}
                  <div className="relative w-full flex justify-center items-center my-1 sm:my-2">
                    {/* Fixed size image container with overflow hidden to crop whitespace */}
                    <div
                      className="relative w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] overflow-hidden rounded-2xl border border-slate-800/50 bg-slate-950/30 shadow-inner"
                    >
                      <div className="absolute inset-0 bg-maple-orange/5 rounded-full blur-[30px]"></div>
                      <div className="relative w-full h-full flex items-center justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={character.character_image}
                          alt={character.character_name}
                          className="w-full h-full object-contain scale-[2.0] translate-y-2 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:scale-[2.1]"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Badges Grid */}
                  {ocid && (
                    <div className="w-full grid grid-cols-2 gap-0.5 mt-1 sm:mt-2 relative z-20">
                      <LinkSkillBadge ocid={ocid} initialData={linkSkillData} refreshKey={refreshKey} />
                      <UnionDiagnostic ocid={ocid} initialData={unionRaiderData} refreshKey={refreshKey} myClass={character.character_class} unionLevel={union?.union_level} />
                      <ArtifactBadge ocid={ocid} refreshKey={refreshKey} />
                      <ChampionBadge ocid={ocid} refreshKey={refreshKey} />
                      <div className="col-span-2">
                        <AbilityWidget ocid={ocid} refreshKey={refreshKey} />
                      </div>
                      <div className="col-span-2">
                        <SymbolBadge ocid={ocid} refreshKey={refreshKey} />
                      </div>
                      <div className="col-span-2">
                        <ItemDiagnosis
                          ocid={ocid}
                          worldName={character.world_name}
                          equipment={equipment}
                          refreshKey={refreshKey}
                          characterClass={character.character_class}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Equipment Grid Section */}
              {equipment.length > 0 && (
                <MainEquipmentGrid
                  equipmentGrid={equipmentGrid}
                  setSelectedWeapon={setSelectedWeapon}
                  setIsOverviewOpen={setIsOverviewOpen}
                  itemGrades={diagnosisReport?.itemGrades}
                />
              )}
            </div>

            {/* Middle Panel: Core Spec Dashboard */}
            {stats && (
              <div className="w-full xl:w-[42%] flex flex-col gap-3 sm:gap-4 animate-in fade-in slide-in-from-bottom-6 delay-200">
                {/* Card 1: Combat Power */}
                {(() => {
                  // Calculate tier for dynamic coloring
                  const cp = typeof combatPower === 'string' ? parseInt(combatPower.replace(/,/g, '')) : Number(combatPower);
                  const currentTier = TIERS.find(t => cp >= t.min) || TIERS[TIERS.length - 1];

                  // Extract base color from tier.color (e.g., "cyan-400" from "text-cyan-400")
                  const tierColorClass = currentTier.color.replace('text-', '');

                  return (
                    <div className={`relative bg-slate-900 rounded-xl sm:rounded-2xl p-3 sm:p-4 border shadow-lg flex flex-col justify-center items-center gap-2 sm:gap-4 min-h-[160px] sm:min-h-[220px] overflow-hidden group transition-all duration-500 border-${tierColorClass}/30 hover:border-${tierColorClass}/50`} style={{ borderColor: `rgb(var(--tw-${tierColorClass}-rgb) / 0.3)` }}>
                      {/* Ambient Background */}
                      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] pointer-events-none opacity-20`} style={{
                        background: `radial-gradient(circle at center, rgb(var(--tw-${tierColorClass}-rgb) / 0.15), transparent 70%)`
                      }}></div>
                      <div className={`absolute top-0 w-full h-px bg-gradient-to-r from-transparent to-transparent`} style={{
                        background: `linear-gradient(to right, transparent, rgb(var(--tw-${tierColorClass}-rgb) / 0.3), transparent)`
                      }}></div>
                      <div className={`absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent to-transparent`} style={{
                        background: `linear-gradient(to right, transparent, rgb(var(--tw-${tierColorClass}-rgb) / 0.3), transparent)`
                      }}></div>

                      {/* Main Content */}
                      <div className="relative flex flex-col items-center">
                        <div className="flex items-center gap-1.5 sm:gap-3 flex-wrap justify-center">
                          <Swords className={`w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 ${currentTier.color} drop-shadow-lg`} />
                          <span className="text-lg sm:text-2xl md:text-3xl text-slate-400 font-bold drop-shadow-md">전투력 :</span>
                          <span className={`text-xl sm:text-3xl md:text-4xl font-black ${currentTier.color} tracking-tight drop-shadow-lg`}>
                            {(() => {
                              const num = typeof combatPower === 'string' ? parseInt(combatPower.replace(/,/g, '')) : Number(combatPower);
                              if (isNaN(num)) return "0";
                              if (num < 10000) return num.toLocaleString();
                              const eok = Math.floor(num / 100000000);
                              const man = Math.floor((num % 100000000) / 10000);
                              const remainder = num % 10000;
                              let result = "";
                              if (eok > 0) result += `${eok}억 `;
                              if (man > 0) result += `${man}만 `;
                              if (remainder > 0) result += `${remainder}`;
                              return result.trim();
                            })()}
                          </span>
                        </div>
                      </div>

                      {/* Rank Component */}
                      <div className="w-full px-0 sm:px-2 relative">
                        <CombatPowerRank combatPower={combatPower} characterImage={character?.character_image} />
                      </div>
                    </div>
                  );
                })()}

                {/* Detailed Stats Panel - Flex-1 to fill height */}
                <div className="flex-1 bg-slate-900 rounded-3xl p-3 sm:p-4 border border-slate-800 shadow-xl flex flex-col gap-3 justify-start">

                  {/* Row 1: Main Stat & Att % */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Card 2: Main Stat */}
                    <div className="relative bg-slate-800 rounded-2xl p-3 sm:p-4 border border-slate-700 hover:bg-slate-750 transition-colors flex flex-col justify-center items-center gap-1">
                      <span className="text-xs sm:text-sm text-gray-400 font-medium">총 {mainStat.name}</span>
                      <div className="flex flex-col items-center">
                        <div className="relative group inline-block rounded px-2 py-1 -mx-2 -my-1 hover:bg-slate-700/50 transition-colors">
                          <span className="text-lg sm:text-2xl font-bold text-white group-hover:text-green-400 group-hover:drop-shadow-lg group-hover:drop-shadow-green-500/50 cursor-help transition-colors">
                            {formatNumber(mainStat.value)}
                          </span>

                          {/* Tooltip */}
                          {mainStatResult.breakdown.length > 0 && (
                            <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-64 sm:w-96 bg-slate-950 border border-green-500 rounded-lg p-3 sm:p-4 shadow-2xl z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200">
                              <div className="text-[10px] sm:text-xs font-bold text-slate-300 mb-2 border-b border-slate-700 pb-2">
                                📊 {mainStat.name}% 장비 출처
                              </div>
                              <div className="space-y-1 max-h-[300px] sm:max-h-[600px] overflow-y-auto custom-scrollbar pointer-events-none group-hover:pointer-events-auto">
                                {mainStatResult.breakdown.map((entry, idx) => (
                                  <div key={idx} className="flex justify-between items-center text-[10px] sm:text-xs">
                                    <span className="text-slate-400 truncate flex-1">{entry.item}</span>
                                    <span className="text-green-400 font-mono ml-2">+{entry.value}%</span>
                                  </div>
                                ))}
                              </div>
                              <div className="mt-2 pt-2 border-t border-slate-700 flex justify-between text-[10px] sm:text-xs font-bold">
                                <span className="text-slate-300">총합</span>
                                <span className="text-green-300">{mainStatPct}%</span>
                              </div>
                            </div>
                          )}
                        </div>

                        <span className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                          {mainStat.name} %: {mainStatPct}%
                        </span>
                      </div>
                    </div>

                    {/* Card 3: Total Attack/Magic % */}
                    <div className="relative bg-slate-800 rounded-2xl p-3 sm:p-4 border border-slate-700 hover:bg-slate-750 transition-colors flex flex-col justify-center items-center gap-1">
                      <span className="text-xs sm:text-sm text-gray-400 font-medium">총 {displayAttName} %</span>
                      <div className="flex flex-col items-center">
                        <div className="relative group inline-block rounded px-2 py-1 -mx-2 -my-1 hover:bg-slate-700/50 transition-colors">
                          <span className="text-lg sm:text-2xl font-bold text-white text-center break-all group-hover:text-orange-400 group-hover:drop-shadow-lg group-hover:drop-shadow-orange-500/50 cursor-help transition-colors">
                            {displayAttPct}%
                          </span>

                          {/* Tooltip */}
                          {displayAttBreakdown.length > 0 && (
                            <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-96 bg-slate-950 border border-orange-500 rounded-lg p-4 shadow-2xl z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200">
                              <div className="text-xs font-bold text-slate-300 mb-2 border-b border-slate-700 pb-2">
                                ⚔️ {displayAttName}% 장비 출처
                              </div>
                              <div className="space-y-1 max-h-[600px] overflow-y-auto custom-scrollbar pointer-events-none group-hover:pointer-events-auto">
                                {displayAttBreakdown.map((entry, idx) => (
                                  <div key={idx} className="flex justify-between items-center text-xs">
                                    <span className="text-slate-400 truncate flex-1">{entry.item}</span>
                                    <span className="text-orange-400 font-mono ml-2">+{entry.value}%</span>
                                  </div>
                                ))}
                              </div>
                              <div className="mt-2 pt-2 border-t border-slate-700 flex justify-between text-xs font-bold">
                                <span className="text-slate-300">총합</span>
                                <span className="text-orange-300">{displayAttPct}%</span>
                              </div>
                            </div>
                          )}
                        </div>

                        <span className="text-sm text-gray-500 mt-1">
                          총 {displayAttName}: {formatNumber(totalAttackValue)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card 4: Core 3 Elements */}
                  <div className="bg-slate-800 rounded-2xl py-3 px-4 border border-slate-700 hover:bg-slate-750 transition-colors w-full grid grid-cols-3 gap-2 text-center divide-x divide-slate-700 items-center">
                    {/* Boss Damage */}
                    <div className="relative flex flex-col gap-1 items-center">
                      <span className="text-xs sm:text-sm text-gray-400">보스 데미지</span>
                      <div className="relative group inline-block rounded px-2 py-1 -mx-2 -my-1 hover:bg-slate-700/50 transition-colors">
                        <span className="text-base sm:text-lg font-bold text-white group-hover:text-red-400 group-hover:drop-shadow-lg cursor-help transition-colors whitespace-nowrap">
                          {getStatValue("보스 몬스터 데미지")}%
                        </span>

                        <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-96 bg-slate-950 border border-red-500 rounded-lg p-4 shadow-2xl z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200">
                          <div className="text-sm font-bold text-slate-200 mb-2 text-center border-b border-slate-700 pb-2">
                            💀 보스 몬스터 데미지
                          </div>

                          <div className="text-xs font-bold text-slate-400 mb-2">장비 아이템에서 적용 중인 수치:</div>

                          {bossDmgResult.breakdown.length > 0 ? (
                            <div className="mb-3">
                              <div className="space-y-1 ml-2 max-h-[300px] overflow-y-auto custom-scrollbar pointer-events-none group-hover:pointer-events-auto">
                                {bossDmgResult.breakdown.map((entry, idx) => (
                                  <div key={idx} className="flex justify-center items-center gap-4 text-xs">
                                    <span className="text-slate-300">{entry.item}</span>
                                    <span className="text-red-400 font-mono font-bold">+{entry.value}%</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="mb-3 text-xs text-slate-500 text-center">장비에서 적용되는 수치 없음</div>
                          )}

                          <div className="text-center pt-3 border-t border-slate-700">
                            <span className="text-2xl font-black">
                              <span className="text-red-400">{bossDmgResult.total}%</span>
                              <span className="text-slate-300"> + </span>
                              <span className="text-white">{Number(getStatValue("보스 몬스터 데미지")) - bossDmgResult.total}%</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Ignore Defense */}
                    <div className="relative flex flex-col gap-1 items-center">
                      <span className="text-xs sm:text-sm text-gray-400">방어율 무시</span>
                      <div className="relative group inline-block rounded px-2 py-1 -mx-2 -my-1 hover:bg-slate-700/50 transition-colors">
                        <span className="text-base sm:text-lg font-bold text-white group-hover:text-purple-400 group-hover:drop-shadow-lg cursor-help transition-colors whitespace-nowrap">
                          {ignoreDefense}%
                        </span>

                        <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-96 bg-slate-950 border border-purple-500 rounded-lg p-4 shadow-2xl z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200">
                          <div className="text-sm font-bold text-slate-200 mb-2 text-center border-b border-slate-700 pb-2">
                            🛡️ 방어율 무시
                          </div>

                          <div className="text-xs font-bold text-slate-400 mb-2">장비 아이템에서 적용 중인 수치:</div>

                          {ignoreDefResult.breakdown.length > 0 ? (
                            <div className="mb-3">
                              <div className="space-y-1 ml-2 max-h-[300px] overflow-y-auto custom-scrollbar pointer-events-none group-hover:pointer-events-auto">
                                {ignoreDefResult.breakdown.map((entry, idx) => (
                                  <div key={idx} className="flex justify-center items-center gap-4 text-xs">
                                    <span className="text-slate-300">{entry.item}</span>
                                    <span className="text-purple-400 font-mono font-bold">+{entry.value}%</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="mb-3 text-xs text-slate-500 text-center">장비에서 적용되는 수치 없음</div>
                          )}

                          <div className="text-center pt-3 border-t border-slate-700">
                            <span className="text-2xl font-black">
                              <span className="text-purple-400">{ignoreDefResult.total}%</span>
                              <span className="text-slate-300"> + </span>
                              <span className="text-white">{Number(ignoreDefense) - ignoreDefResult.total}%</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Critical Damage */}
                    <div className="relative flex flex-col gap-1 items-center">
                      <span className="text-xs sm:text-sm text-gray-400">크리티컬 데미지</span>
                      <div className="relative group inline-block rounded px-2 py-1 -mx-2 -my-1 hover:bg-slate-700/50 transition-colors">
                        <span className="text-base sm:text-lg font-bold text-white group-hover:text-yellow-400 group-hover:drop-shadow-lg cursor-help transition-colors whitespace-nowrap">
                          {getStatValue("크리티컬 데미지")}%
                        </span>

                        <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-96 bg-slate-950 border border-yellow-500 rounded-lg p-4 shadow-2xl z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200">
                          <div className="text-sm font-bold text-slate-200 mb-2 text-center border-b border-slate-700 pb-2">
                            💥 크리티컬 데미지
                          </div>

                          <div className="text-xs font-bold text-slate-400 mb-2">장비 아이템에서 적용 중인 수치:</div>

                          {critDmgResult.breakdown.length > 0 ? (
                            <div className="mb-3">
                              <div className="space-y-1 ml-2 max-h-[300px] overflow-y-auto custom-scrollbar pointer-events-none group-hover:pointer-events-auto">
                                {critDmgResult.breakdown.map((entry, idx) => (
                                  <div key={idx} className="flex justify-center items-center gap-4 text-xs">
                                    <span className="text-slate-300">{entry.item}</span>
                                    <span className="text-yellow-400 font-mono font-bold">+{entry.value}%</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="mb-3 text-xs text-slate-500 text-center">장비에서 적용되는 수치 없음</div>
                          )}

                          <div className="text-center pt-3 border-t border-slate-700">
                            <span className="text-2xl font-black">
                              <span className="text-yellow-400">{critDmgResult.total}%</span>
                              <span className="text-slate-300"> + </span>
                              <span className="text-white">{Number(getStatValue("크리티컬 데미지")) - critDmgResult.total}%</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 5: Advanced Stats (Union, Drop, etc) */}
                  <div className="bg-slate-800 rounded-2xl p-3 sm:p-4 border border-slate-700 hover:bg-slate-750 transition-colors w-full grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 text-center">
                    {/* 1. Union Level */}
                    <UnionDiagnostic
                      ocid={ocid}
                      initialData={unionRaiderData}
                      refreshKey={refreshKey}
                      myClass={character.character_class}
                      unionLevel={union?.union_level}
                    >
                      <div className="flex flex-col gap-0.5 p-2 bg-slate-900/50 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer group h-full justify-center items-center">
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] sm:text-xs text-gray-400 group-hover:text-slate-300">유니온 레벨</span>
                          <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">🔍</span>
                        </div>
                        <span className="text-base sm:text-lg font-bold text-yellow-400 group-hover:text-yellow-300">{union ? union.union_level : "-"}</span>
                      </div>
                    </UnionDiagnostic>
                    {/* 2. Buff Duration */}
                    <div className="relative flex flex-col gap-1 p-2 bg-slate-900/50 rounded-lg items-center group hover:bg-slate-700/50 cursor-help transition-colors">
                      <span className="text-xs text-gray-400">버프 지속 시간</span>
                      <span className="text-lg font-bold text-white group-hover:text-cyan-400 group-hover:drop-shadow-lg transition-colors">
                        {buffDuration}%
                      </span>

                      {(() => {
                        const totalValue = Number(String(buffDuration).replace(/[^0-9.]/g, '')) || 0;
                        const equipmentTotal = buffDurResult.total;
                        const otherValue = Math.max(0, totalValue - equipmentTotal);

                        if (totalValue <= 0) return null;

                        return (
                          <div
                            className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-80 bg-slate-950 border border-cyan-500 rounded-lg p-4 shadow-2xl z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200"
                            onWheel={(e) => e.stopPropagation()}
                          >
                            <div className="text-center font-bold text-white mb-3 pb-2 border-b border-slate-700 flex justify-center items-center gap-2">
                              <span>⏳</span>
                              <span>버프 지속 시간</span>
                            </div>
                            <div className="text-center text-xs text-gray-400 mb-2">장비 아이템에서 적용 중인 수치:</div>
                            <div className="space-y-1 max-h-[300px] overflow-y-auto custom-scrollbar mb-4">
                              {buffDurResult.breakdown.length > 0 ? (
                                buffDurResult.breakdown.map((entry, idx) => (
                                  <div key={idx} className="flex justify-between items-center text-xs px-2">
                                    <span className="text-slate-400 truncate flex-1 text-left">{entry.item}</span>
                                    <span className="text-cyan-400 font-mono ml-2">+{entry.value}%</span>
                                  </div>
                                ))
                              ) : (
                                <div className="text-center text-xs text-slate-600 py-2">장비에서 적용되는 수치 없음</div>
                              )}
                            </div>
                            <div className="pt-3 border-t border-slate-700 text-center flex justify-center items-center gap-2">
                              <span className="text-2xl font-bold text-cyan-400">{equipmentTotal}%</span>
                              <span className="text-xl font-bold text-slate-500">+</span>
                              <span className="text-2xl font-bold text-white">{Number(otherValue.toFixed(2))}%</span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* 3. Critical Rate */}
                    <div className="relative flex flex-col gap-1 p-2 bg-slate-900/50 rounded-lg items-center group hover:bg-slate-700/50 cursor-help transition-colors">
                      <span className="text-xs text-gray-400">크리티컬 확률</span>
                      <span className="text-lg font-bold text-white group-hover:text-red-400 group-hover:drop-shadow-lg transition-colors">
                        {critRate}%
                      </span>

                      {(() => {
                        const totalValue = Number(String(critRate).replace(/[^0-9.]/g, '')) || 0;
                        const equipmentTotal = critRateResult.total;
                        const otherValue = Math.max(0, totalValue - equipmentTotal);

                        if (totalValue <= 0) return null;

                        return (
                          <div
                            className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-80 bg-slate-950 border border-red-500 rounded-lg p-4 shadow-2xl z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200"
                            onWheel={(e) => e.stopPropagation()}
                          >
                            <div className="text-center font-bold text-white mb-3 pb-2 border-b border-slate-700 flex justify-center items-center gap-2">
                              <span>🎯</span>
                              <span>크리티컬 확률</span>
                            </div>
                            <div className="text-center text-xs text-gray-400 mb-2">장비 아이템에서 적용 중인 수치:</div>
                            <div className="space-y-1 max-h-[300px] overflow-y-auto custom-scrollbar mb-4">
                              {critRateResult.breakdown.length > 0 ? (
                                critRateResult.breakdown.map((entry, idx) => (
                                  <div key={idx} className="flex justify-between items-center text-xs px-2">
                                    <span className="text-slate-400 truncate flex-1 text-left">{entry.item}</span>
                                    <span className="text-red-400 font-mono ml-2">+{entry.value}%</span>
                                  </div>
                                ))
                              ) : (
                                <div className="text-center text-xs text-slate-600 py-2">장비에서 적용되는 수치 없음</div>
                              )}
                            </div>
                            <div className="pt-3 border-t border-slate-700 text-center flex justify-center items-center gap-2">
                              <span className="text-2xl font-bold text-red-400">{equipmentTotal}%</span>
                              <span className="text-xl font-bold text-slate-500">+</span>
                              <span className="text-2xl font-bold text-white">{Number(otherValue.toFixed(2))}%</span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* 4. Cooldown Reduction (Sec) */}
                    <div className="relative flex flex-col gap-1 p-2 bg-slate-900/50 rounded-lg items-center group hover:bg-slate-700/50 cursor-help transition-colors">
                      <span className="text-xs text-gray-400">재사용 대기시간 감소</span>
                      <span className="text-lg font-bold text-white group-hover:text-emerald-400 group-hover:drop-shadow-lg transition-colors">
                        -{cooldownReductionSec}초
                      </span>

                      {(() => {
                        const totalValue = Number(String(cooldownReductionSec).replace(/[^0-9.]/g, '')) || 0;
                        const equipmentTotal = cooldownSecResult.total;
                        const otherValue = Math.max(0, totalValue - equipmentTotal);

                        if (totalValue <= 0) return null;

                        return (
                          <div
                            className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-80 bg-slate-950 border border-emerald-500 rounded-lg p-4 shadow-2xl z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200"
                            onWheel={(e) => e.stopPropagation()}
                          >
                            <div className="text-center font-bold text-white mb-3 pb-2 border-b border-slate-700 flex justify-center items-center gap-2">
                              <span>⌛</span>
                              <span>재사용 대기시간 감소</span>
                            </div>
                            <div className="text-center text-xs text-gray-400 mb-2">장비 아이템에서 적용 중인 수치:</div>
                            <div className="space-y-1 max-h-[300px] overflow-y-auto custom-scrollbar mb-4">
                              {cooldownSecResult.breakdown.length > 0 ? (
                                cooldownSecResult.breakdown.map((entry, idx) => (
                                  <div key={idx} className="flex justify-center items-center gap-4 text-xs">
                                    <span className="text-slate-400">{entry.item}</span>
                                    <span className="text-emerald-400 font-mono font-bold">-{entry.value}초</span>
                                  </div>
                                ))
                              ) : (
                                <div className="text-center text-xs text-slate-600 py-2">장비에서 적용되는 수치 없음</div>
                              )}
                            </div>
                            <div className="pt-3 border-t border-slate-700 text-center flex justify-center items-center gap-2">
                              <span className="text-2xl font-bold text-emerald-400">-{equipmentTotal}초</span>
                              <span className="text-xl font-bold text-slate-500">+</span>
                              <span className="text-2xl font-bold text-white">-{Number(otherValue.toFixed(2))}초</span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* 5. Cooldown Skip Chance (Original) */}
                    <div className="relative flex flex-col gap-1 p-2 bg-slate-900/50 rounded-lg items-center group hover:bg-slate-700/50 cursor-help transition-colors">
                      <span className="text-xs text-gray-400">재사용 대기시간 미적용</span>
                      <span className="text-lg font-bold text-white group-hover:text-blue-400 group-hover:drop-shadow-lg transition-colors">
                        {cooldownReduction}%
                      </span>

                      {(() => {
                        const totalValue = Number(String(cooldownReduction).replace(/[^0-9.]/g, '')) || 0;
                        const equipmentTotal = cooldownResult.total;
                        const otherValue = Math.max(0, totalValue - equipmentTotal);

                        if (totalValue <= 0) return null;

                        return (
                          <div
                            className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-80 bg-slate-950 border border-blue-500 rounded-lg p-4 shadow-2xl z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200"
                            onWheel={(e) => e.stopPropagation()}
                          >
                            <div className="text-center font-bold text-white mb-3 pb-2 border-b border-slate-700 flex justify-center items-center gap-2">
                              <span>⏱️</span>
                              <span>재사용 대기시간 미적용</span>
                            </div>
                            <div className="text-center text-xs text-gray-400 mb-2">장비 아이템에서 적용 중인 수치:</div>
                            <div className="space-y-1 max-h-[300px] overflow-y-auto custom-scrollbar mb-4">
                              {cooldownResult.breakdown.length > 0 ? (
                                cooldownResult.breakdown.map((entry, idx) => (
                                  <div key={idx} className="flex justify-between items-center text-xs px-2">
                                    <span className="text-slate-400 truncate flex-1 text-left">{entry.item}</span>
                                    <span className="text-blue-400 font-mono ml-2">+{entry.value}%</span>
                                  </div>
                                ))
                              ) : (
                                <div className="text-center text-xs text-slate-600 py-2">장비에서 적용되는 수치 없음</div>
                              )}
                            </div>
                            <div className="pt-3 border-t border-slate-700 text-center flex justify-center items-center gap-2">
                              <span className="text-2xl font-bold text-blue-400">{equipmentTotal}%</span>
                              <span className="text-xl font-bold text-slate-500">+</span>
                              <span className="text-2xl font-bold text-white">{Number(otherValue.toFixed(2))}%</span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* 6. Status Damage */}
                    <div className="relative flex flex-col gap-1 p-2 bg-slate-900/50 rounded-lg items-center group hover:bg-slate-700/50 cursor-help transition-colors">
                      <span className="text-xs text-gray-400">상태이상 데미지</span>
                      <span className="text-lg font-bold text-white group-hover:text-pink-400 group-hover:drop-shadow-lg transition-colors">
                        {statusDamage}%
                      </span>

                      {(() => {
                        const totalValue = Number(String(statusDamage).replace(/[^0-9.]/g, '')) || 0;
                        const equipmentTotal = statusDmgResult.total;
                        const otherValue = Math.max(0, totalValue - equipmentTotal);

                        if (totalValue <= 0) return null;

                        return (
                          <div
                            className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-80 bg-slate-950 border border-pink-500 rounded-lg p-4 shadow-2xl z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200"
                            onWheel={(e) => e.stopPropagation()}
                          >
                            <div className="text-center font-bold text-white mb-3 pb-2 border-b border-slate-700 flex justify-center items-center gap-2">
                              <span>🌀</span>
                              <span>상태이상 데미지</span>
                            </div>
                            <div className="text-center text-xs text-gray-400 mb-2">장비 아이템에서 적용 중인 수치:</div>
                            <div className="space-y-1 max-h-[300px] overflow-y-auto custom-scrollbar mb-4">
                              {statusDmgResult.breakdown.length > 0 ? (
                                statusDmgResult.breakdown.map((entry, idx) => (
                                  <div key={idx} className="flex justify-between items-center text-xs px-2">
                                    <span className="text-slate-400 truncate flex-1 text-left">{entry.item}</span>
                                    <span className="text-pink-400 font-mono ml-2">+{entry.value}%</span>
                                  </div>
                                ))
                              ) : (
                                <div className="text-center text-xs text-slate-600 py-2">장비에서 적용되는 수치 없음</div>
                              )}
                            </div>
                            <div className="pt-3 border-t border-slate-700 text-center flex justify-center items-center gap-2">
                              <span className="text-2xl font-bold text-pink-400">{equipmentTotal}%</span>
                              <span className="text-xl font-bold text-slate-500">+</span>
                              <span className="text-2xl font-bold text-white">{Number(otherValue.toFixed(2))}%</span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* 7. Item Drop Rate */}
                    <div className="relative flex flex-col gap-1 p-2 bg-slate-900/50 rounded-lg items-center group hover:bg-slate-700/50 cursor-help transition-colors">
                      <span className="text-xs text-gray-400">아이템 드롭률</span>
                      <span className="text-lg font-bold text-white group-hover:text-indigo-400 group-hover:drop-shadow-lg transition-colors">
                        {itemDropRate}%
                      </span>

                      {(() => {
                        const totalValue = Number(String(itemDropRate).replace(/[^0-9.]/g, '')) || 0;
                        const equipmentTotal = dropRateResult.total;
                        const otherValue = Math.max(0, totalValue - equipmentTotal);

                        if (totalValue <= 0) return null;

                        return (
                          <div
                            className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-80 bg-slate-950 border border-indigo-500 rounded-lg p-4 shadow-2xl z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200"
                            onWheel={(e) => e.stopPropagation()}
                          >
                            <div className="text-center font-bold text-white mb-3 pb-2 border-b border-slate-700 flex justify-center items-center gap-2">
                              <span>💎</span>
                              <span>아이템 드롭률</span>
                            </div>
                            <div className="text-center text-xs text-gray-400 mb-2">장비 아이템에서 적용 중인 수치:</div>
                            <div className="space-y-1 max-h-[300px] overflow-y-auto custom-scrollbar mb-4">
                              {dropRateResult.breakdown.length > 0 ? (
                                dropRateResult.breakdown.map((entry, idx) => (
                                  <div key={idx} className="flex justify-between items-center text-xs px-2">
                                    <span className="text-slate-400 truncate flex-1 text-left">{entry.item}</span>
                                    <span className="text-indigo-400 font-mono ml-2">+{entry.value}%</span>
                                  </div>
                                ))
                              ) : (
                                <div className="text-center text-xs text-slate-600 py-2">장비에서 적용되는 수치 없음</div>
                              )}
                            </div>
                            <div className="pt-3 border-t border-slate-700 text-center flex justify-center items-center gap-2">
                              <span className="text-2xl font-bold text-indigo-400">{equipmentTotal}%</span>
                              <span className="text-xl font-bold text-slate-500">+</span>
                              <span className="text-2xl font-bold text-white">{Number(otherValue.toFixed(2))}%</span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* 8. Meso Acquisition */}
                    <div className="relative flex flex-col gap-1 p-2 bg-slate-900/50 rounded-lg items-center group hover:bg-slate-700/50 cursor-help transition-colors">
                      <span className="text-xs text-gray-400">메소 획득량</span>
                      <span className="text-lg font-bold text-white group-hover:text-yellow-400 group-hover:drop-shadow-lg transition-colors">
                        {mesoDropRate}%
                      </span>

                      {(() => {
                        const totalValue = Number(String(mesoDropRate).replace(/[^0-9.]/g, '')) || 0;
                        const equipmentTotal = mesoRateResult.total;
                        const otherValue = Math.max(0, totalValue - equipmentTotal);

                        if (totalValue <= 0) return null;

                        return (
                          <div
                            className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-80 bg-slate-950 border border-yellow-500 rounded-lg p-4 shadow-2xl z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200"
                            onWheel={(e) => e.stopPropagation()}
                          >
                            <div className="text-center font-bold text-white mb-3 pb-2 border-b border-slate-700 flex justify-center items-center gap-2">
                              <span>💰</span>
                              <span>메소 획득량</span>
                            </div>
                            <div className="text-center text-xs text-gray-400 mb-2">장비 아이템에서 적용 중인 수치:</div>
                            <div className="space-y-1 max-h-[300px] overflow-y-auto custom-scrollbar mb-4">
                              {mesoRateResult.breakdown.length > 0 ? (
                                mesoRateResult.breakdown.map((entry, idx) => (
                                  <div key={idx} className="flex justify-between items-center text-xs px-2">
                                    <span className="text-slate-400 truncate flex-1 text-left">{entry.item}</span>
                                    <span className="text-yellow-400 font-mono ml-2">+{entry.value}%</span>
                                  </div>
                                ))
                              ) : (
                                <div className="text-center text-xs text-slate-600 py-2">장비에서 적용되는 수치 없음</div>
                              )}
                            </div>
                            <div className="pt-3 border-t border-slate-700 text-center flex justify-center items-center gap-2">
                              <span className="text-2xl font-bold text-yellow-400">{equipmentTotal}%</span>
                              <span className="text-xl font-bold text-slate-500">+</span>
                              <span className="text-2xl font-bold text-white">{Number(otherValue.toFixed(2))}%</span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* 9. EXP Rate */}
                    <div className="relative flex flex-col gap-1 p-2 bg-slate-900/50 rounded-lg items-center group hover:bg-slate-700/50 cursor-help transition-colors">
                      <span className="text-xs text-gray-400">추가 경험치 획득</span>
                      <span className="text-lg font-bold text-white group-hover:text-lime-400 group-hover:drop-shadow-lg transition-colors">
                        {expRate}%
                      </span>

                      {(() => {
                        const totalValue = Number(String(expRate).replace(/[^0-9.]/g, '')) || 0;
                        const equipmentTotal = expRateResult.total;
                        const otherValue = Math.max(0, totalValue - equipmentTotal);

                        if (totalValue <= 0) return null;

                        return (
                          <div
                            className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-80 bg-slate-950 border border-lime-500 rounded-lg p-4 shadow-2xl z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200"
                            onWheel={(e) => e.stopPropagation()}
                          >
                            <div className="text-center font-bold text-white mb-3 pb-2 border-b border-slate-700 flex justify-center items-center gap-2">
                              <span>📈</span>
                              <span>추가 경험치 획득</span>
                            </div>
                            <div className="text-center text-xs text-gray-400 mb-2">장비 아이템에서 적용 중인 수치:</div>
                            <div className="space-y-1 max-h-[300px] overflow-y-auto custom-scrollbar mb-4">
                              {expRateResult.breakdown.length > 0 ? (
                                expRateResult.breakdown.map((entry, idx) => (
                                  <div key={idx} className="flex justify-between items-center text-xs px-2">
                                    <span className="text-slate-400 truncate flex-1 text-left">{entry.item}</span>
                                    <span className="text-lime-400 font-mono ml-2">+{entry.value}%</span>
                                  </div>
                                ))
                              ) : (
                                <div className="text-center text-xs text-slate-600 py-2">장비에서 적용되는 수치 없음</div>
                              )}
                            </div>
                            <div className="pt-3 border-t border-slate-700 text-center flex justify-center items-center gap-2">
                              <span className="text-2xl font-bold text-lime-400">{equipmentTotal}%</span>
                              <span className="text-xl font-bold text-slate-500">+</span>
                              <span className="text-2xl font-bold text-white">{Number(otherValue.toFixed(2))}%</span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Right Panel: Hexa Widget */}
            <div className="w-full xl:w-[30%] flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-6 delay-300">
              <HexaWidget ocid={ocid} refreshKey={refreshKey} />
            </div>
          </div>
        )}

      </section>

      {/* Equipment Overview Modal */}
      < EquipmentOverviewModal
        isOpen={isOverviewOpen}
        onClose={() => setIsOverviewOpen(false)}
        equipmentGrid={equipmentGrid}
        setSelectedWeapon={setSelectedWeapon}
      />

      <PatchNotesModal
        isOpen={isPatchNotesOpen}
        onClose={() => setIsPatchNotesOpen(false)}
      />

      {/* Trivia Section */}
      <MapleStoryTrivia />

      {/* Footer */}
      {/* Footer */}
      <Footer />
      {/* Weapon Diagnosis Modal */}
      {
        selectedWeapon && (
          <WeaponDiagnosisModal
            item={selectedWeapon}
            onClose={() => setSelectedWeapon(null)}
            characterClass={character?.character_class || ""}
          />
        )
      }
    </main >
  );
}



