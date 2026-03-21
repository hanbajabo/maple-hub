const fs = require('fs');
const path = require('path');

const regions = [
  'yeoro', 'reversecity', 'chewchew', 'yamyam',
  'lacheln', 'arcana', 'morass', 'espera', 'sellas',
  'moonbridge', 'labyrinth', 'limen',
  'cernium', 'arcs', 'odium', 'dowonkyung',
  'arteria', 'carcion', 'tallahart', 'geardrak'
];

async function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

async function scrape() {
    const results = {};
    for (let level = 200; level <= 299; level++) {
        if (level % 10 === 0) console.log(`Fetching level ${level}...`);
        results[String(level)] = { status: "OK", data: { map: [] } };
        
        for (const region of regions) {
            const formData = new FormData();
            formData.append('level', String(level));
            formData.append('field_type', region);
            formData.append('character_name', '');

            try {
                const res = await fetch('https://mapleroad.kr/lib/calculator/field', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                    }
                });
                
                if (res.ok) {
                    const text = await res.text();
                    let json;
                    try { json = JSON.parse(text); } catch (e) {}
                    
                    if (json && json.data && json.data.map && Array.isArray(json.data.map)) {
                        for (const map of json.data.map) {
                            if (!map.region) map.region = region;
                            results[String(level)].data.map.push(map);
                        }
                    }
                }
            } catch (err) {
                console.error(`Error level ${level} region ${region}:`, err.message);
            }
        }
    }
    
    fs.writeFileSync(
        path.join(__dirname, 'hunting_fields_200_300.json'),
        JSON.stringify(results, null, 2),
        'utf8'
    );
    console.log("Done scraping new full map data!");
}

scrape();
