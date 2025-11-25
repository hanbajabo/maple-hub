import asyncio
from playwright.async_api import async_playwright
import json
import time

# 전체 직업 목록
JOBS = [
    "히어로", "팔라딘", "다크나이트",
    "아크메이지(불,독)", "아크메이지(썬,콜)", "비숍",
    "보우마스터", "신궁", "패스파인더",
    "나이트로드", "섀도어", "듀얼블레이더",
    "바이퍼", "캡틴", "캐논마스터",
    "미하일", "소울마스터", "플레임위자드", "윈드브레이커", "나이트워커", "스트라이커",
    "아란", "에반", "루미너스", "메르세데스", "팬텀", "은월",
    "블래스터", "배틀메이지", "와일드헌터", "메카닉", "제논",
    "데몬슬레이어", "데몬어벤져",
    "카이저", "카인", "카데나", "엔젤릭버스터",
    "아델", "일리움", "아크", "칼리",
    "호영", "라라", "렌",
    "키네시스", "제로"
]

# 제외할 스킬 목록 (솔 야누스, 솔야누스 새벽, 헥사 스텟)
EXCLUDED_SKILLS = [
    "솔 야누스", "솔 야누스: 새벽", "헥사 스텟", "헥사: 스텟"
]

async def crawl_job_hexa_skills(page, job_name):
    """특정 직업의 헥사 스킬 우선순위를 크롤링"""
    print(f"\n크롤링 시작: {job_name}")
    
    # URL 생성 (260+ 레벨, 100m-200m 전투력)
    url = f"https://maple.gg/jobs/{job_name}/skills?power=100m-200m&level=260%2B"
    
    try:
        await page.goto(url, wait_until="domcontentloaded", timeout=30000)
        await asyncio.sleep(3)  # 데이터 로딩 대기
        
        # 6차 스킬 데이터 추출
        skills_data = await page.evaluate("""
            () => {
                const skills = [];
                const excludedSkills = ["솔 야누스", "솔 야누스: 새벽", "헥사 스텟", "헥사: 스텟"];
                let startElement = Array.from(document.querySelectorAll('div, button')).find(el => el.textContent.includes('6차 평균 레벨'));
                
                if (startElement) {
                    let currentNode = startElement.nextSibling;
                    while(currentNode && currentNode.nodeName !== 'BUTTON') currentNode = currentNode.nextSibling; // Skip to first button
                    while(currentNode && currentNode.nodeName === 'BUTTON') currentNode = currentNode.nextSibling; // Skip buttons
                    
                    let currentSkill = {};
                    while (currentNode) {
                        if (currentNode.nodeType === 3 && currentNode.textContent.trim() !== "" && currentNode.textContent.trim() !== "Lv") { // Text node
                            const text = currentNode.textContent.trim();
                            if (!isNaN(parseFloat(text)) && text.includes('.')) { // Level (contains decimal)
                                if (currentSkill.name) {
                                    currentSkill.averageLevel = text;
                                    if (!excludedSkills.some(ex => currentSkill.name.includes(ex))) {
                                        skills.push({...currentSkill});
                                    }
                                    currentSkill = {};
                                }
                            } else if (isNaN(parseInt(text))) { // Skill name (not a number)
                                currentSkill.name = text;
                            }
                        }
                        
                        if (currentNode.nodeName === 'DIV' && currentNode.className && currentNode.className.includes('ad-container')) break; // Stop before ads
                        currentNode = currentNode.nextSibling;
                    }
                }
                return skills;
            }
        """)
        
        if not skills_data:
            print(f"  ⚠️ {job_name}: 스킬 데이터를 찾을 수 없습니다")
            return None
        
        print(f"  ✅ {job_name}: {len(skills_data)}개 스킬 수집 완료")
        return {
            "job": job_name,
            "skills": skills_data,
            "url": url,
            "crawled_at": time.strftime("%Y-%m-%d %H:%M:%S")
        }
        
    except Exception as e:
        print(f"  ❌ {job_name} 크롤링 실패: {str(e)}")
        return None

async def main():
    """메인 크롤링 함수"""
    print("="*60)
    print("Maple.gg 전 직업 6차 스킬 우선순위 크롤링 시작")
    print("="*60)
    
    all_data = []
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)  # 디버깅용 headless=False
        context = await browser.new_context()
        page = await context.new_page()
        
        # 모든 직업 크롤링
        for i, job in enumerate(JOBS, 1):
            print(f"\n[{i}/{len(JOBS)}] {job} 크롤링 중...")
            
            job_data = await crawl_job_hexa_skills(page, job)
            if job_data:
                all_data.append(job_data)
            
            # 서버 부하 방지를 위한 대기
            if i < len(JOBS):
                await asyncio.sleep(2)
        
        await browser.close()
    
    # 결과 저장
    output_file = "hexa_skills_priority_data.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(all_data, f, ensure_ascii=False, indent=2)
    
    print("\n" + "="*60)
    print(f"크롤링 완료!")
    print(f"총 {len(all_data)}/{len(JOBS)} 직업 데이터 수집")
    print(f"저장 위치: {output_file}")
    print("="*60)

if __name__ == "__main__":
    asyncio.run(main())
