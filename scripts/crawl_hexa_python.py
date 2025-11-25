import requests
import re
import json
import time

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

EXCLUDED_SKILLS = ["솔 야누스", "솔 야누스: 새벽", "헥사 스텟", "헥사: 스텟"]

def crawl_job(job_name):
    url = f"https://maple.gg/jobs/{job_name}/skills?power=100m-200m&level=260%2B"
    print(f"Crawling {job_name}...")
    
    try:
        response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
        if response.status_code != 200:
            print(f"Failed to fetch {job_name}: {response.status_code}")
            return None
            
        text = response.text
        
        # Extract skills using regex based on the observed pattern
        # Pattern: - 1Skill NameLv 29.6
        # Or: - 1Skill Name VILv 29.6
        
        # We look for lines starting with "- " followed by a number, then skill name, then "Lv", then number
        # Note: The text from read_url_content was markdown-ified, but raw HTML might be different.
        # Let's try to find the specific structure in HTML or just parse the text if we can get it.
        # Since we are using requests, we get raw HTML.
        
        # In raw HTML, it likely looks like:
        # <div class="...">Skill Name</div> ... <div class="...">Lv 29.6</div>
        
        # Let's use a simple regex on the HTML content to find skill blocks
        # Based on previous observation, skills are listed with names and levels.
        
        # Let's look for the "6차 평균 레벨" section and extract from there.
        if "6차 평균 레벨" not in text:
            print(f"Could not find 6th job section for {job_name}")
            return None
            
        # Split by "6차 평균 레벨" and take the second part
        parts = text.split("6차 평균 레벨")
        if len(parts) < 2:
            return None
            
        content = parts[1]
        
        # Truncate at next section (usually 5차 or something else, or just take first 5000 chars)
        content = content[:10000]
        
        skills = []
        
        # Regex to find skill name and level
        # This is tricky without a proper HTML parser, but let's try to find patterns like:
        # <span>Skill Name</span> ... <span>Lv 12.3</span>
        # Or just text patterns.
        
        # Let's try to use the pattern we saw in read_url_content output:
        # It seems to be a list.
        
        # Actually, let's use a robust HTML parser if possible, but standard library only has html.parser
        from html.parser import HTMLParser

        class SkillParser(HTMLParser):
            def __init__(self):
                super().__init__()
                self.in_skill_section = False
                self.skills = []
                self.current_skill = {}
                self.collecting_name = False
                self.collecting_level = False
                self.div_count = 0
                
            def handle_starttag(self, tag, attrs):
                if tag == 'div':
                    self.div_count += 1
                
            def handle_endtag(self, tag):
                if tag == 'div':
                    self.div_count -= 1

            def handle_data(self, data):
                data = data.strip()
                if not data: return
                
                # Check for level pattern
                if re.match(r'^\d+\.\d+$', data):
                    if self.current_skill.get('name'):
                        self.current_skill['averageLevel'] = data
                        if not any(ex in self.current_skill['name'] for ex in EXCLUDED_SKILLS):
                            self.skills.append(self.current_skill.copy())
                        self.current_skill = {}
                elif data == 'Lv':
                    pass
                elif not re.match(r'^\d+$', data) and data != '전체': # Skill name candidate
                    # Ignore "광고" etc
                    if '광고' not in data and 'AD' not in data:
                        self.current_skill['name'] = data

        parser = SkillParser()
        parser.feed(content)
        return parser.skills
        
    except Exception as e:
        print(f"Error crawling {job_name}: {e}")
        return None

all_data = []

for job in JOBS:
    skills = crawl_job(job)
    if skills:
        print(f"  Found {len(skills)} skills for {job}")
        all_data.append({
            "job": job,
            "skills": skills
        })
    time.sleep(1)

with open('hexa_skills_data.json', 'w', encoding='utf-8') as f:
    json.dump(all_data, f, ensure_ascii=False, indent=2)

print("Done!")
